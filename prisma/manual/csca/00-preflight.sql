-- READ ONLY. Run in Saturday's intended Supabase project before setup.
-- Expected: 3 roles; zero Saturday CSCA objects. No credentials are displayed.
SELECT current_database() AS database_name,current_user AS database_role;
SELECT rolname,rolbypassrls FROM pg_roles WHERE rolname IN ('anon','authenticated','service_role') ORDER BY rolname;
SELECT n.nspname,c.relname,c.relkind FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='public' AND left(c.relname,14)='saturday_csca_' ORDER BY c.relname;
SELECT n.nspname,p.proname,pg_get_function_identity_arguments(p.oid) AS arguments
  FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
  WHERE n.nspname='public' AND left(p.proname,14)='saturday_csca_' ORDER BY p.proname;
