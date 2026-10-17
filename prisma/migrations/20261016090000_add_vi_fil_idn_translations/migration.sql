-- Adds Vietnamese (vi), Filipino (fil) and Indonesian (idn) translation columns,
-- the same way the Thai (_th) and Burmese (_my) columns were added.
--
-- Run this in the Supabase SQL editor BEFORE deploying the code that reads the new
-- columns. It only adds nullable TEXT columns, so the running site is unaffected:
-- an empty column simply falls back to the English text.
-- It is safe to run more than once (IF NOT EXISTS), including after a Prisma
-- migration that already added them.

-- AlterTable
ALTER TABLE "countries"
  ADD COLUMN IF NOT EXISTS "tagline_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "tagline_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "tagline_idn" TEXT,
  ADD COLUMN IF NOT EXISTS "overview_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "overview_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "overview_idn" TEXT;

-- AlterTable
ALTER TABLE "country_advantages"
  ADD COLUMN IF NOT EXISTS "title_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "title_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "title_idn" TEXT,
  ADD COLUMN IF NOT EXISTS "description_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "description_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "description_idn" TEXT;

-- AlterTable
ALTER TABLE "country_process_steps"
  ADD COLUMN IF NOT EXISTS "title_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "title_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "title_idn" TEXT,
  ADD COLUMN IF NOT EXISTS "description_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "description_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "description_idn" TEXT;

-- AlterTable
ALTER TABLE "country_faqs"
  ADD COLUMN IF NOT EXISTS "question_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "question_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "question_idn" TEXT,
  ADD COLUMN IF NOT EXISTS "answer_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "answer_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "answer_idn" TEXT;

-- Roll back (only if you need to undo this; it deletes any translations in the columns):
-- ALTER TABLE "countries"
--   DROP COLUMN IF EXISTS "tagline_vi",
--   DROP COLUMN IF EXISTS "tagline_fil",
--   DROP COLUMN IF EXISTS "tagline_idn",
--   DROP COLUMN IF EXISTS "overview_vi",
--   DROP COLUMN IF EXISTS "overview_fil",
--   DROP COLUMN IF EXISTS "overview_idn";
-- ALTER TABLE "country_advantages"
--   DROP COLUMN IF EXISTS "title_vi",
--   DROP COLUMN IF EXISTS "title_fil",
--   DROP COLUMN IF EXISTS "title_idn",
--   DROP COLUMN IF EXISTS "description_vi",
--   DROP COLUMN IF EXISTS "description_fil",
--   DROP COLUMN IF EXISTS "description_idn";
-- ALTER TABLE "country_process_steps"
--   DROP COLUMN IF EXISTS "title_vi",
--   DROP COLUMN IF EXISTS "title_fil",
--   DROP COLUMN IF EXISTS "title_idn",
--   DROP COLUMN IF EXISTS "description_vi",
--   DROP COLUMN IF EXISTS "description_fil",
--   DROP COLUMN IF EXISTS "description_idn";
-- ALTER TABLE "country_faqs"
--   DROP COLUMN IF EXISTS "question_vi",
--   DROP COLUMN IF EXISTS "question_fil",
--   DROP COLUMN IF EXISTS "question_idn",
--   DROP COLUMN IF EXISTS "answer_vi",
--   DROP COLUMN IF EXISTS "answer_fil",
--   DROP COLUMN IF EXISTS "answer_idn";
