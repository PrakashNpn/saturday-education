-- Adds nullable translation columns for the country work-rights text.
-- Only ADDS columns: no existing column or row is changed, nothing is dropped.
-- Safe to re-run (IF NOT EXISTS). Run in the Supabase SQL editor BEFORE deploying
-- the code that selects these columns (the destination page errors until they exist).
--
-- Suffix `_idn` = Indonesian (the site locale code is `id`).

ALTER TABLE "countries"
  ADD COLUMN IF NOT EXISTS "work_rights_th" TEXT,
  ADD COLUMN IF NOT EXISTS "work_rights_my" TEXT,
  ADD COLUMN IF NOT EXISTS "work_rights_vi" TEXT,
  ADD COLUMN IF NOT EXISTS "work_rights_fil" TEXT,
  ADD COLUMN IF NOT EXISTS "work_rights_idn" TEXT;

-- Rollback (only if you ever need it; this would delete the translations):
-- ALTER TABLE "countries"
--   DROP COLUMN IF EXISTS "work_rights_th",
--   DROP COLUMN IF EXISTS "work_rights_my",
--   DROP COLUMN IF EXISTS "work_rights_vi",
--   DROP COLUMN IF EXISTS "work_rights_fil",
--   DROP COLUMN IF EXISTS "work_rights_idn";
