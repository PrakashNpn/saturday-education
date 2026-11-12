-- MANUAL ONLY. Run the whole file once in Supabase SQL Editor as database owner.
-- Creates one empty table (19 columns); no existing IMAT content is changed.
-- Do not use prisma migrate/db push for this change.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';

CREATE TABLE public.imat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL UNIQUE,
  bank_version text NOT NULL CHECK (length(bank_version) BETWEEN 1 AND 100),
  full_name text NOT NULL CHECK (length(btrim(full_name)) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (length(email) BETWEEN 3 AND 254 AND email = lower(email)),
  phone text NOT NULL CHECK (phone ~ '^\+[1-9][0-9]{5,14}$'),
  locale text NOT NULL CHECK (locale IN ('en','th','my','vi','fil','id')),
  exam_mode text NOT NULL CHECK (exam_mode IN ('mock','paper')),
  paper_slug text,
  score numeric(7,2) NOT NULL,
  maximum_score numeric(7,2) NOT NULL CHECK (maximum_score > 0),
  question_count smallint NOT NULL CHECK (question_count > 0),
  correct_count smallint NOT NULL CHECK (correct_count >= 0),
  incorrect_count smallint NOT NULL CHECK (incorrect_count >= 0),
  unanswered_count smallint NOT NULL CHECK (unanswered_count >= 0),
  completed_at timestamptz NOT NULL,
  consent_version text NOT NULL CHECK (consent_version = 'imat-results-v1'),
  consented_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (correct_count + incorrect_count + unanswered_count = question_count),
  CHECK (score <= maximum_score),
  CHECK ((exam_mode = 'mock' AND paper_slug IS NULL)
    OR (exam_mode = 'paper' AND nullif(btrim(paper_slug),'') IS NOT NULL))
);
CREATE INDEX imat_leads_email_idx ON public.imat_leads(email);
CREATE INDEX imat_leads_created_at_idx ON public.imat_leads(created_at);

ALTER TABLE public.imat_leads ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.imat_leads FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.imat_leads TO service_role;
-- No browser-access policies. The API writes through the existing authorised
-- server database connection; no public/anonymous insert permission is needed.

SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname='public' AND tablename='imat_leads';
COMMIT;
