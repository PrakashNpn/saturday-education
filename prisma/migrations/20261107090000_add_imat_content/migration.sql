-- MANUAL ONLY: run once in the Supabase SQL editor as the database owner.
-- Adds empty IMAT content tables only. No seed data or existing-table changes.
-- An existing IMAT table causes an error and rolls back the entire transaction;
-- this deliberately avoids silently accepting an incompatible existing schema.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';

CREATE TABLE public.imat_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL CHECK (btrim(reference) <> ''),
  source_kind text NOT NULL CHECK (source_kind IN ('official', 'original', 'development')),
  source_url text,
  local_file_path text,
  file_sha256 text CHECK (file_sha256 ~ '^[0-9a-f]{64}$'),
  retrieved_at timestamptz,
  -- Do not treat public download availability as permission evidence.
  reuse_status text NOT NULL DEFAULT 'unconfirmed'
    CHECK (reuse_status IN ('unconfirmed', 'permitted', 'restricted')),
  reuse_evidence text,
  corrections_status text NOT NULL DEFAULT 'pending'
    CHECK (corrections_status IN ('pending', 'checked', 'corrections-found')),
  corrections_notes text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (reuse_status <> 'permitted' OR nullif(btrim(reuse_evidence), '') IS NOT NULL)
);

CREATE TABLE public.imat_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text NOT NULL CHECK (btrim(title) <> ''),
  exam_year smallint CHECK (exam_year BETWEEN 2011 AND 2100),
  -- Variant distinguishes a published all-A version from a candidate booklet.
  variant text NOT NULL DEFAULT 'published' CHECK (btrim(variant) <> ''),
  source_id uuid NOT NULL REFERENCES public.imat_sources(id) ON DELETE RESTRICT,
  question_count smallint CHECK (question_count > 0),
  duration_minutes smallint CHECK (duration_minutes > 0),
  correct_score numeric(5,2) CHECK (correct_score > 0),
  incorrect_score numeric(5,2) CHECK (incorrect_score <= 0),
  blank_score numeric(5,2) NOT NULL DEFAULT 0 CHECK (blank_score = 0),
  format_evidence text,
  content_version integer NOT NULL DEFAULT 1 CHECK (content_version > 0),
  is_development boolean NOT NULL DEFAULT false,
  -- Draft records may have unknown rules; never copy the current blueprint by default.
  is_published boolean NOT NULL DEFAULT false,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (exam_year, variant),
  CHECK (NOT is_published OR (
    question_count IS NOT NULL AND duration_minutes IS NOT NULL
    AND correct_score IS NOT NULL AND incorrect_score IS NOT NULL
    AND nullif(btrim(format_evidence), '') IS NOT NULL
    AND nullif(btrim(reviewed_by), '') IS NOT NULL AND reviewed_at IS NOT NULL
  ))
);
CREATE INDEX imat_papers_source_idx ON public.imat_papers(source_id);
CREATE INDEX imat_papers_published_year_idx ON public.imat_papers(is_published, exam_year);

CREATE TABLE public.imat_paper_sections (
  paper_id uuid NOT NULL REFERENCES public.imat_papers(id) ON DELETE RESTRICT,
  section_key text NOT NULL CHECK (section_key IN ('reading','reasoning','biology','chemistry','physicsMath')),
  position smallint NOT NULL CHECK (position BETWEEN 1 AND 5),
  question_count smallint NOT NULL CHECK (question_count > 0),
  -- Older combined general-knowledge/reasoning sections may use 'reasoning';
  -- keep their original heading here instead of pretending they use today's split.
  source_heading text NOT NULL CHECK (btrim(source_heading) <> ''),
  PRIMARY KEY (paper_id, section_key),
  UNIQUE (paper_id, position)
);

CREATE TABLE public.imat_passages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id uuid NOT NULL REFERENCES public.imat_papers(id) ON DELETE RESTRICT,
  reference text NOT NULL CHECK (btrim(reference) <> ''),
  body text,
  attribution text,
  -- Image JSON: {src, alt, width, height}; importer validates local asset paths and dimensions.
  image jsonb CHECK (image IS NULL OR jsonb_typeof(image) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (paper_id, id),
  UNIQUE (paper_id, reference),
  CHECK (nullif(btrim(body), '') IS NOT NULL OR image IS NOT NULL)
);

CREATE TABLE public.imat_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE CHECK (btrim(stable_key) <> ''),
  paper_id uuid NOT NULL REFERENCES public.imat_papers(id) ON DELETE RESTRICT,
  original_number smallint NOT NULL CHECK (original_number > 0),
  source_page smallint CHECK (source_page > 0),
  -- Null section/prompt permits importing a review index before transcription.
  section_key text,
  passage_id uuid,
  prompt text,
  image jsonb CHECK (image IS NULL OR jsonb_typeof(image) = 'object'),
  shuffle_options boolean NOT NULL DEFAULT false,
  mock_eligible boolean NOT NULL DEFAULT false,
  review_status text NOT NULL DEFAULT 'draft' CHECK (review_status IN ('draft','reviewed','withdrawn')),
  reviewed_by text,
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (paper_id, original_number),
  FOREIGN KEY (paper_id, section_key) REFERENCES public.imat_paper_sections(paper_id, section_key) ON DELETE RESTRICT,
  FOREIGN KEY (paper_id, passage_id) REFERENCES public.imat_passages(paper_id, id) ON DELETE RESTRICT,
  CHECK (review_status <> 'reviewed' OR (
    nullif(btrim(prompt), '') IS NOT NULL AND section_key IS NOT NULL
    AND nullif(btrim(reviewed_by), '') IS NOT NULL AND reviewed_at IS NOT NULL
  )),
  CHECK (NOT mock_eligible OR review_status = 'reviewed')
);
CREATE INDEX imat_questions_passage_idx ON public.imat_questions(paper_id, passage_id);
CREATE INDEX imat_questions_mock_idx ON public.imat_questions(section_key) WHERE mock_eligible;

CREATE TABLE public.imat_question_options (
  question_id uuid NOT NULL REFERENCES public.imat_questions(id) ON DELETE RESTRICT,
  -- Stable source key, not the displayed label after shuffling.
  option_key text NOT NULL CHECK (option_key IN ('A','B','C','D','E')),
  body text,
  image jsonb CHECK (image IS NULL OR jsonb_typeof(image) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (question_id, option_key),
  CHECK (nullif(btrim(body), '') IS NOT NULL OR image IS NOT NULL)
);

CREATE TABLE public.imat_answer_keys (
  question_id uuid PRIMARY KEY REFERENCES public.imat_questions(id) ON DELETE RESTRICT,
  correct_option_key text NOT NULL,
  evidence_reference text NOT NULL CHECK (btrim(evidence_reference) <> ''),
  evidence_url text,
  evidence_page smallint CHECK (evidence_page > 0),
  review_status text NOT NULL DEFAULT 'draft' CHECK (review_status IN ('draft','reviewed')),
  reviewed_by text,
  reviewed_at timestamptz,
  -- Explanations are editorial, not automatically official or reviewed with the key.
  explanation text,
  explanation_reviewed_by text,
  explanation_reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (question_id, correct_option_key)
    REFERENCES public.imat_question_options(question_id, option_key) ON DELETE RESTRICT,
  CHECK (review_status <> 'reviewed' OR (
    nullif(btrim(reviewed_by), '') IS NOT NULL AND reviewed_at IS NOT NULL
  )),
  CHECK (explanation_reviewed_at IS NULL OR (
    nullif(btrim(explanation), '') IS NOT NULL
    AND nullif(btrim(explanation_reviewed_by), '') IS NOT NULL
  ))
);

-- Scope privileges and RLS to these new tables only. No browser-access policies.
-- Prisma/server code must read via an authorised server-side database role.
DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'imat_sources','imat_papers','imat_paper_sections','imat_passages',
    'imat_questions','imat_question_options','imat_answer_keys'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC, anon, authenticated', table_name);
    EXECUTE format('GRANT SELECT ON TABLE public.%I TO service_role', table_name);
  END LOOP;
END $$;

COMMIT;
