-- MANUAL ONLY: run once in the Supabase SQL editor as the database owner.
-- Creates English-only SEO/AEO guide tables. No seed data.
-- An existing guides / guide_faqs table causes an error and rolls back the
-- entire transaction (avoids silently accepting an incompatible schema).
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';

CREATE TABLE public.guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE
    CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text NOT NULL CHECK (btrim(title) <> ''),
  seo_title text NOT NULL CHECK (btrim(seo_title) <> ''),
  meta_description text NOT NULL CHECK (btrim(meta_description) <> ''),
  answer_box text,
  body_markdown text NOT NULL DEFAULT '',
  sources_markdown text,
  primary_keyword text,
  keywords text,
  related_destination_slug text
    CHECK (
      related_destination_slug IS NULL
      OR related_destination_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    ),
  author_name text NOT NULL DEFAULT 'David Dhakal'
    CHECK (btrim(author_name) <> ''),
  author_title text NOT NULL DEFAULT 'Founder & CEO, Saturday Education Consulting'
    CHECK (btrim(author_title) <> ''),
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  sources_checked_at date,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    NOT is_published
    OR (
      published_at IS NOT NULL
      AND btrim(body_markdown) <> ''
      AND btrim(meta_description) <> ''
    )
  )
);

CREATE INDEX guides_published_sort_idx
  ON public.guides (is_published, sort_order, published_at DESC);

CREATE TABLE public.guide_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id uuid NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  question text NOT NULL CHECK (btrim(question) <> ''),
  answer text NOT NULL CHECK (btrim(answer) <> ''),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX guide_faqs_guide_sort_idx
  ON public.guide_faqs (guide_id, sort_order);

COMMIT;

-- Optional verify (run after commit):
-- SELECT tablename FROM pg_tables
-- WHERE schemaname = 'public' AND tablename IN ('guides', 'guide_faqs')
-- ORDER BY tablename;
