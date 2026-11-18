-- OWNER-RUN FIX. Review and run manually in Saturday's SQL Editor.
-- The existing project denies public-schema USAGE to service_role, despite
-- the new CSCA table SELECT and RPC EXECUTE grants. API calls then fail 42501.
-- Only the server role is granted schema usage; no browser grants or data changes.
BEGIN;
GRANT USAGE ON SCHEMA public TO service_role;
COMMIT;

SELECT has_schema_privilege('service_role','public','USAGE') AS schema_usage,
  has_table_privilege('service_role','public.saturday_csca_question_sets','SELECT') AS table_select,
  has_function_privilege('service_role','public.saturday_csca_start_full_attempt(uuid,text,text[],text,text)','EXECUTE') AS rpc_execute;
