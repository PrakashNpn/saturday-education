-- Records whether each lead reached the Firmli CRM, so a failed sync can be found
-- and added by hand. Run this in the Supabase SQL editor BEFORE deploying the code
-- that writes these columns. All three are nullable, so existing rows are untouched
-- (NULL means the lead was saved before this tracking existed).
--
--   crm_status     'synced' | 'failed' | 'skipped' (skipped: Firmli is not configured)
--   crm_error      the last error message when the sync failed
--   crm_synced_at  when the sync finished (success or failure)

ALTER TABLE "consultations"
  ADD COLUMN IF NOT EXISTS "crm_status" TEXT,
  ADD COLUMN IF NOT EXISTS "crm_error" TEXT,
  ADD COLUMN IF NOT EXISTS "crm_synced_at" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "consultations_crm_status_idx" ON "consultations" ("crm_status");
