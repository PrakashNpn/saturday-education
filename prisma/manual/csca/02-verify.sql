-- Read-only verification. No activation or test attempts.
DO $verify$
DECLARE item record; role_name text;
BEGIN
  IF (SELECT count(*) FROM public.saturday_csca_subjects)<>5
    OR (SELECT count(*) FROM public.saturday_csca_question_sets)<>1
    OR NOT EXISTS(SELECT 1 FROM public.saturday_csca_question_sets WHERE id='csca-20261101-b3c005994d7d2e7c' AND status='draft' AND manifest_sha256='b3c005994d7d2e7c42b4cbe5a57d75a291f9dc295f6523c9d3c8ac45d25f34cc')
    OR (SELECT count(*) FROM public.saturday_csca_questions WHERE question_set_id='csca-20261101-b3c005994d7d2e7c')<>1433
    OR (SELECT count(*) FROM public.saturday_csca_answer_keys WHERE question_set_id='csca-20261101-b3c005994d7d2e7c')<>1433
    OR (SELECT count(*) FROM public.saturday_csca_questions WHERE question_set_id='csca-20261101-b3c005994d7d2e7c' AND diagram_svg IS NOT NULL)<>36
    THEN RAISE EXCEPTION 'Draft content/count verification failed'; END IF;
  IF (SELECT md5(string_agg(question_id||':'||content_sha256,E'\n' ORDER BY question_id COLLATE "C")) FROM public.saturday_csca_questions WHERE question_set_id='csca-20261101-b3c005994d7d2e7c') IS DISTINCT FROM '2e0a177cf1d07293e861e2bc2abb8185'
    OR (SELECT md5(string_agg(question_id||':'||correct_option||':'||explanation_text,E'\n' ORDER BY question_id COLLATE "C")) FROM public.saturday_csca_answer_keys WHERE question_set_id='csca-20261101-b3c005994d7d2e7c') IS DISTINCT FROM '830a6a752076586a64b2c0accc8c39e2'
    THEN RAISE EXCEPTION 'Content/key fingerprint mismatch'; END IF;
  IF (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind='r' AND left(c.relname,14)='saturday_csca_')<>9 THEN RAISE EXCEPTION 'Expected nine Saturday tables'; END IF;
  FOR item IN SELECT c.oid,c.relname,c.relrowsecurity FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='public' AND c.relkind='r' AND left(c.relname,14)='saturday_csca_' LOOP
    IF NOT item.relrowsecurity THEN RAISE EXCEPTION 'RLS disabled: %',item.relname; END IF;
    FOREACH role_name IN ARRAY ARRAY['anon','authenticated'] LOOP
      IF has_table_privilege(role_name,item.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER') THEN RAISE EXCEPTION 'Browser table access: %',item.relname; END IF;
    END LOOP;
    IF NOT has_table_privilege('service_role',item.oid,'SELECT') OR has_table_privilege('service_role',item.oid,'DELETE,TRUNCATE') THEN RAISE EXCEPTION 'Incorrect service access: %',item.relname; END IF;
  END LOOP;
  FOR item IN SELECT p.oid,p.proname FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE n.nspname='public' AND left(p.proname,14)='saturday_csca_' LOOP
    IF has_function_privilege('anon',item.oid,'EXECUTE') OR has_function_privilege('authenticated',item.oid,'EXECUTE') THEN RAISE EXCEPTION 'Browser RPC access: %',item.proname; END IF;
  END LOOP;
END $verify$;
SELECT subject_id,count(*) AS questions,count(diagram_svg) AS diagrams FROM public.saturday_csca_questions GROUP BY subject_id ORDER BY subject_id;
SELECT id,status,manifest_sha256 FROM public.saturday_csca_question_sets;
