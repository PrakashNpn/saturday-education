-- MANUAL ONLY: run this file once in Supabase SQL Editor as the database owner.
-- Creates ONE empty table with 16 columns. Existing tables/data are untouched.
-- Do not run prisma migrate/db push. Do not rerun after successful creation.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';

CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_key text NOT NULL CHECK (length(event_key) BETWEEN 1 AND 120),
  full_name text NOT NULL CHECK (length(btrim(full_name)) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (length(email) BETWEEN 3 AND 254 AND email = lower(email)),
  phone text NOT NULL CHECK (phone ~ '^\+[1-9][0-9]{5,14}$'),
  locale text NOT NULL CHECK (locale IN ('en','th','my','vi','fil','id')),
  destination text NOT NULL DEFAULT 'canada',
  registration_source text NOT NULL DEFAULT 'event_qr',
  firmli_form_number text NOT NULL CHECK (length(firmli_form_number) BETWEEN 1 AND 100),
  firmli_utm_number text NOT NULL CHECK (length(firmli_utm_number) BETWEEN 1 AND 100),
  consent_version text NOT NULL CHECK (length(consent_version) BETWEEN 1 AND 100),
  consented_at timestamptz NOT NULL DEFAULT now(),
  crm_status text NOT NULL DEFAULT 'pending' CHECK (crm_status IN ('pending','synced','failed','skipped')),
  crm_error text,
  crm_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT event_registrations_event_key_email_key UNIQUE (event_key, email)
);
CREATE INDEX event_registrations_event_key_created_at_idx ON public.event_registrations(event_key, created_at);
CREATE INDEX event_registrations_crm_status_idx ON public.event_registrations(crm_status);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.event_registrations FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.event_registrations TO service_role;
-- No browser policies: registration writes go through the authorised server DB connection.

SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname='public' AND tablename='event_registrations';
COMMIT;
