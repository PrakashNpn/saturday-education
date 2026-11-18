-- OWNER-RUN PROPOSAL. Saturday-only objects. Fails on any name conflict.
-- No question imports, activation, emails, jobs, or changes to Think Asia/IMAT.
BEGIN;
SET LOCAL lock_timeout='5s';
SET LOCAL statement_timeout='90s';
-- PROPOSAL ONLY. The user reviews and runs this manually; never auto-run.
-- New CSCA objects only. Existing assessments/bookings/schema grants are untouched.
-- Plain CREATE intentionally aborts on name conflicts rather than modifying an existing object.

CREATE FUNCTION public.saturday_csca_valid_options(value jsonb)
RETURNS boolean LANGUAGE plpgsql IMMUTABLE SET search_path = '' AS $$
DECLARE item jsonb; seen text[] := ARRAY[]::text[]; normalized text[] := ARRAY[]::text[];
BEGIN
  IF value IS NULL OR jsonb_typeof(value) <> 'array' THEN RETURN false; END IF;
  IF jsonb_array_length(value) <> 4 THEN RETURN false; END IF;
  FOR item IN SELECT * FROM jsonb_array_elements(value) LOOP
    IF jsonb_typeof(item) <> 'object' THEN RETURN false; END IF;
    IF jsonb_typeof(item->'key') IS DISTINCT FROM 'string'
       OR jsonb_typeof(item->'text') IS DISTINCT FROM 'string' THEN RETURN false; END IF;
    IF item->>'key' NOT IN ('A','B','C','D') OR btrim(item->>'text') = ''
       OR item->>'key' = ANY(seen)
       OR lower(btrim(item->>'text')) = ANY(normalized) THEN RETURN false; END IF;
    IF (item - 'key' - 'text') <> '{}'::jsonb THEN RETURN false; END IF;
    seen := array_append(seen,item->>'key');
    normalized := array_append(normalized,lower(btrim(item->>'text')));
  END LOOP;
  RETURN true;
END $$;

CREATE TABLE public.saturday_csca_subjects (
  id text PRIMARY KEY CHECK (id IN ('chinese-stem','chinese-humanities','math','physics','chemistry')),
  subject_group text NOT NULL CHECK (subject_group IN ('chinese','math','physics','chemistry')),
  label text NOT NULL CHECK (btrim(label) <> ''),
  language_code text NOT NULL CHECK (language_code IN ('zh-Hans','en')),
  UNIQUE (id,subject_group),
  CHECK (subject_group = CASE WHEN id IN ('chinese-stem','chinese-humanities') THEN 'chinese' ELSE id END)
);

CREATE TABLE public.saturday_csca_question_sets (
  id text PRIMARY KEY CHECK (id ~ '^csca-[0-9]{8}-[a-f0-9]{16}$'),
  review_date date NOT NULL,
  manifest_sha256 text NOT NULL UNIQUE CHECK (manifest_sha256 ~ '^[a-f0-9]{64}$'),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','retired')),
  expected_counts jsonb NOT NULL CHECK (jsonb_typeof(expected_counts) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  activated_at timestamptz,
  CHECK ((status = 'draft' AND activated_at IS NULL) OR (status IN ('active','retired') AND activated_at IS NOT NULL))
);
CREATE UNIQUE INDEX saturday_csca_one_active_question_set ON public.saturday_csca_question_sets ((status)) WHERE status = 'active';

CREATE TABLE public.saturday_csca_questions (
  question_set_id text NOT NULL REFERENCES public.saturday_csca_question_sets(id) ON DELETE RESTRICT,
  question_id text NOT NULL CHECK (btrim(question_id) <> ''),
  subject_id text NOT NULL REFERENCES public.saturday_csca_subjects(id) ON DELETE RESTRICT,
  language_code text NOT NULL CHECK (language_code IN ('zh-Hans','en')),
  question_text text NOT NULL CHECK (btrim(question_text) <> ''),
  options jsonb NOT NULL CHECK (public.saturday_csca_valid_options(options)),
  passage_text text,
  topic text, -- NULL means not classified; do not invent curriculum tags.
  difficulty text CHECK (difficulty IN ('easy','medium','hard')),
  source_metadata jsonb NOT NULL CHECK (jsonb_typeof(source_metadata) = 'object'),
  source_record_sha256 text NOT NULL CHECK (source_record_sha256 ~ '^[a-f0-9]{64}$'),
  content_sha256 text NOT NULL CHECK (content_sha256 ~ '^[a-f0-9]{64}$'),
  PRIMARY KEY (question_set_id,question_id),
  UNIQUE (question_set_id,question_id,subject_id),
  CHECK (language_code = CASE WHEN subject_id IN ('chinese-stem','chinese-humanities') THEN 'zh-Hans' ELSE 'en' END)
);
CREATE INDEX saturday_csca_questions_subject_idx ON public.saturday_csca_questions (question_set_id,subject_id);

-- No browser role receives access, including to questions without answer keys.
CREATE TABLE public.saturday_csca_answer_keys (
  question_set_id text NOT NULL,
  question_id text NOT NULL,
  correct_option text NOT NULL CHECK (correct_option IN ('A','B','C','D')),
  explanation_text text NOT NULL CHECK (btrim(explanation_text) <> ''),
  explanation_language_code text NOT NULL CHECK (explanation_language_code IN ('en','zh-Hans')),
  review_metadata jsonb NOT NULL CHECK (jsonb_typeof(review_metadata) = 'object'),
  PRIMARY KEY (question_set_id,question_id),
  FOREIGN KEY (question_set_id,question_id) REFERENCES public.saturday_csca_questions(question_set_id,question_id) ON DELETE RESTRICT
);

-- Question content and keys are append-only. Corrections use a new release.
CREATE FUNCTION public.saturday_csca_guard_content()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE release_status text;
BEGIN
  IF TG_OP <> 'INSERT' THEN
    RAISE EXCEPTION 'CSCA content is immutable; create a new question set';
  END IF;
  SELECT status INTO release_status FROM public.saturday_csca_question_sets WHERE id = NEW.question_set_id FOR SHARE;
  IF release_status IS DISTINCT FROM 'draft' THEN
    RAISE EXCEPTION 'CSCA questions and keys can only be inserted into a draft set';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER saturday_csca_questions_immutable BEFORE INSERT OR UPDATE OR DELETE ON public.saturday_csca_questions
  FOR EACH ROW EXECUTE FUNCTION public.saturday_csca_guard_content();
CREATE TRIGGER saturday_csca_answer_keys_immutable BEFORE INSERT OR UPDATE OR DELETE ON public.saturday_csca_answer_keys
  FOR EACH ROW EXECUTE FUNCTION public.saturday_csca_guard_content();

CREATE TABLE public.saturday_csca_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_set_id text NOT NULL REFERENCES public.saturday_csca_question_sets(id) ON DELETE RESTRICT,
  access_token_sha256 text NOT NULL UNIQUE CHECK (access_token_sha256 ~ '^[a-f0-9]{64}$'),
  kind text NOT NULL CHECK (kind IN ('subject','combined')),
  mode text NOT NULL CHECK (mode IN ('timed','practice')),
  status text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','abandoned','expired')),
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now()+interval '24 hours'),
  completed_at timestamptz,
  UNIQUE (id,question_set_id),
  CHECK (kind <> 'combined' OR mode = 'timed'),
  CHECK (expires_at > started_at),
  CHECK ((status = 'completed') = (completed_at IS NOT NULL)),
  CHECK (completed_at IS NULL OR completed_at >= started_at)
);
CREATE INDEX saturday_csca_attempts_status_expiry_idx ON public.saturday_csca_attempts (status,expires_at);

CREATE TABLE public.saturday_csca_attempt_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL,
  question_set_id text NOT NULL,
  paper_number smallint NOT NULL CHECK (paper_number BETWEEN 1 AND 4),
  subject_id text NOT NULL,
  subject_group text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','submitted','timed_out')),
  question_count smallint NOT NULL CHECK (question_count BETWEEN 1 AND 200),
  time_limit_seconds integer CHECK (time_limit_seconds BETWEEN 1 AND 86400), -- NULL for untimed practice.
  started_at timestamptz,
  deadline_at timestamptz,
  submitted_at timestamptz,
  correct_count smallint,
  incorrect_count smallint,
  skipped_count smallint,
  score_percent numeric(5,2) GENERATED ALWAYS AS (round(100.0*correct_count/question_count,2)) STORED,
  UNIQUE (attempt_id,paper_number),
  UNIQUE (attempt_id,subject_group), -- At most one Chinese variant in an attempt.
  UNIQUE (id,question_set_id,subject_id),
  FOREIGN KEY (attempt_id,question_set_id) REFERENCES public.saturday_csca_attempts(id,question_set_id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id,subject_group) REFERENCES public.saturday_csca_subjects(id,subject_group) ON DELETE RESTRICT,
  CHECK ((status = 'pending' AND started_at IS NULL AND deadline_at IS NULL)
      OR (status <> 'pending' AND started_at IS NOT NULL)),
  CHECK (deadline_at IS NULL OR (time_limit_seconds IS NOT NULL AND started_at IS NOT NULL
      AND deadline_at = started_at + time_limit_seconds*interval '1 second')),
  CHECK (status = 'pending' OR (time_limit_seconds IS NULL) = (deadline_at IS NULL)),
  CHECK ((status IN ('submitted','timed_out')) = (submitted_at IS NOT NULL)),
  CHECK (submitted_at IS NULL OR submitted_at >= started_at),
  CHECK (status <> 'timed_out' OR (deadline_at IS NOT NULL AND submitted_at >= deadline_at)),
  CHECK ((status IN ('pending','in_progress') AND correct_count IS NULL AND incorrect_count IS NULL AND skipped_count IS NULL)
      OR (status IN ('submitted','timed_out') AND correct_count IS NOT NULL AND incorrect_count IS NOT NULL AND skipped_count IS NOT NULL
        AND correct_count >= 0 AND incorrect_count >= 0 AND skipped_count >= 0
        AND correct_count+incorrect_count+skipped_count = question_count))
);
CREATE UNIQUE INDEX saturday_csca_one_running_paper_per_attempt ON public.saturday_csca_attempt_papers(attempt_id) WHERE status = 'in_progress';

CREATE TABLE public.saturday_csca_attempt_responses (
  paper_id uuid NOT NULL,
  question_set_id text NOT NULL,
  subject_id text NOT NULL,
  position smallint NOT NULL CHECK (position BETWEEN 1 AND 200),
  question_id text NOT NULL,
  selected_option text CHECK (selected_option IN ('A','B','C','D')),
  flagged boolean NOT NULL DEFAULT false,
  saved_at timestamptz NOT NULL DEFAULT now(),
  is_correct boolean, -- NULL until server grades the paper; false for a skipped answer.
  PRIMARY KEY (paper_id,position),
  UNIQUE (paper_id,question_id),
  FOREIGN KEY (paper_id,question_set_id,subject_id) REFERENCES public.saturday_csca_attempt_papers(id,question_set_id,subject_id) ON DELETE CASCADE,
  FOREIGN KEY (question_set_id,question_id,subject_id) REFERENCES public.saturday_csca_questions(question_set_id,question_id,subject_id) ON DELETE RESTRICT,
  FOREIGN KEY (question_set_id,question_id) REFERENCES public.saturday_csca_answer_keys(question_set_id,question_id) ON DELETE RESTRICT,
  CHECK (selected_option IS NOT NULL OR is_correct IS DISTINCT FROM true)
);

-- One contact submission per attempt. No cross-attempt email deduplication or marketing linkage.
CREATE TABLE public.saturday_csca_attempt_contacts (
  attempt_id uuid PRIMARY KEY REFERENCES public.saturday_csca_attempts(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND position('@' in email)>1),
  phone text CHECK (phone IS NULL OR char_length(btrim(phone)) BETWEEN 1 AND 40),
  result_email_requested boolean NOT NULL DEFAULT false,
  captured_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.saturday_csca_email_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES public.saturday_csca_attempt_contacts(attempt_id) ON DELETE CASCADE,
  recipient_email text NOT NULL CHECK (char_length(recipient_email) BETWEEN 3 AND 254 AND position('@' in recipient_email)>1),
  template_version text NOT NULL CHECK (btrim(template_version) <> ''),
  idempotency_key text NOT NULL UNIQUE CHECK (char_length(idempotency_key) BETWEEN 1 AND 256),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','retry','accepted','delivered','failed','bounced','cancelled')),
  delivery_attempts integer NOT NULL DEFAULT 0 CHECK (delivery_attempts >= 0),
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  locked_until timestamptz,
  provider_message_id text UNIQUE,
  last_error_code text, -- Sanitised code only, never raw provider payload/credentials.
  created_at timestamptz NOT NULL DEFAULT now(),
  accepted_at timestamptz,
  delivered_at timestamptz,
  CHECK (status <> 'processing' OR locked_until IS NOT NULL),
  CHECK (status NOT IN ('accepted','delivered','bounced') OR (provider_message_id IS NOT NULL AND accepted_at IS NOT NULL)),
  CHECK (status <> 'delivered' OR delivered_at IS NOT NULL),
  CHECK (delivered_at IS NULL OR (accepted_at IS NOT NULL AND delivered_at >= accepted_at))
);
CREATE INDEX saturday_csca_email_due_idx ON public.saturday_csca_email_deliveries(next_attempt_at) WHERE status IN ('pending','retry');
CREATE INDEX saturday_csca_email_attempt_idx ON public.saturday_csca_email_deliveries(attempt_id);

-- Explicit privileges apply only to these newly created objects.
ALTER TABLE public.saturday_csca_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_question_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_attempt_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_attempt_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_attempt_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saturday_csca_email_deliveries ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.saturday_csca_subjects,public.saturday_csca_question_sets,public.saturday_csca_questions,public.saturday_csca_answer_keys,
  public.saturday_csca_attempts,public.saturday_csca_attempt_papers,public.saturday_csca_attempt_responses,public.saturday_csca_attempt_contacts,public.saturday_csca_email_deliveries
  FROM PUBLIC,anon,authenticated,service_role;
GRANT SELECT ON public.saturday_csca_subjects,public.saturday_csca_question_sets,public.saturday_csca_questions,public.saturday_csca_answer_keys TO service_role;
GRANT SELECT,INSERT,UPDATE ON public.saturday_csca_attempts,public.saturday_csca_attempt_papers,public.saturday_csca_attempt_responses,
  public.saturday_csca_attempt_contacts,public.saturday_csca_email_deliveries TO service_role;
REVOKE ALL ON FUNCTION public.saturday_csca_valid_options(jsonb),public.saturday_csca_guard_content() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.saturday_csca_valid_options(jsonb),public.saturday_csca_guard_content() TO service_role;

-- REVIEW PROPOSAL ONLY. User runs manually after reviewing; never auto-run.
-- Requires the previously imported schema. Does NOT activate or alter content.
-- Plain CREATE/ADD intentionally abort on an already-applied or conflicting object.
ALTER TABLE public.saturday_csca_attempt_papers ADD COLUMN draft_revision bigint NOT NULL DEFAULT 0 CHECK (draft_revision >= 0);

-- Called within the attempt lock by saturday_csca_update_attempt. Only service_role can execute.
CREATE FUNCTION public.saturday_csca_finish_paper(p_paper_id uuid, p_now timestamptz)
RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE p public.saturday_csca_attempt_papers%ROWTYPE; n_correct integer; n_skipped integer;
BEGIN
  SELECT * INTO STRICT p FROM public.saturday_csca_attempt_papers WHERE id=p_paper_id FOR UPDATE;
  IF p.status <> 'in_progress' THEN RETURN; END IF;
  UPDATE public.saturday_csca_attempt_responses r SET is_correct=coalesce(r.selected_option=k.correct_option,false)
  FROM public.saturday_csca_answer_keys k
  WHERE r.paper_id=p.id AND k.question_set_id=r.question_set_id AND k.question_id=r.question_id;
  SELECT count(*) FILTER (WHERE is_correct), count(*) FILTER (WHERE selected_option IS NULL)
    INTO n_correct,n_skipped FROM public.saturday_csca_attempt_responses WHERE paper_id=p.id;
  UPDATE public.saturday_csca_attempt_papers SET
    status=CASE WHEN p.deadline_at IS NOT NULL AND p_now>=p.deadline_at THEN 'timed_out' ELSE 'submitted' END,
    submitted_at=p_now, correct_count=n_correct, skipped_count=n_skipped,
    incorrect_count=p.question_count-n_correct-n_skipped, draft_revision=draft_revision+1
  WHERE id=p.id;
  IF NOT EXISTS (SELECT 1 FROM public.saturday_csca_attempt_papers WHERE attempt_id=p.attempt_id AND status IN ('pending','in_progress')) THEN
    UPDATE public.saturday_csca_attempts SET status='completed',completed_at=p_now WHERE id=p.attempt_id;
  END IF;
END $$;

-- Explicit DTO projection: keys/explanations only when the WHOLE attempt is complete.
CREATE FUNCTION public.saturday_csca_session_view(p_attempt_id uuid, p_access_hash text)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE a public.saturday_csca_attempts%ROWTYPE; p public.saturday_csca_attempt_papers%ROWTYPE;
  phase text; subjects jsonb; questions jsonb; answers jsonb; flags jsonb; results jsonb; result jsonb;
BEGIN
  SELECT * INTO a FROM public.saturday_csca_attempts WHERE id=p_attempt_id AND access_token_sha256=p_access_hash;
  IF NOT FOUND THEN RAISE EXCEPTION 'CSCA_DENIED'; END IF;
  IF a.expires_at<=clock_timestamp() OR a.status IN ('expired','abandoned') THEN RAISE EXCEPTION 'CSCA_EXPIRED'; END IF;
  SELECT * INTO STRICT p FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id
    ORDER BY (status='in_progress') DESC, (status IN ('submitted','timed_out')) DESC, paper_number DESC LIMIT 1;
  phase := CASE WHEN a.status='completed' THEN 'results' WHEN p.status='in_progress' THEN 'test' ELSE 'break' END;
  SELECT jsonb_agg(subject_id ORDER BY paper_number) INTO subjects FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id;
  SELECT coalesce(jsonb_agg(r.selected_option ORDER BY r.position),'[]'::jsonb),
    coalesce(jsonb_agg(r.position-1 ORDER BY r.position) FILTER (WHERE r.flagged),'[]'::jsonb)
    INTO answers,flags FROM public.saturday_csca_attempt_responses r WHERE r.paper_id=p.id;
  questions := '[]'::jsonb;
  IF phase='test' THEN
    SELECT jsonb_agg(jsonb_strip_nulls(jsonb_build_object('id',q.question_id,'text',q.question_text,
      'topic',coalesce(q.topic,'Mixed practice'),'options',q.options,'passage',q.passage_text)) ORDER BY r.position)
    INTO questions FROM public.saturday_csca_attempt_responses r JOIN public.saturday_csca_questions q
      ON q.question_set_id=r.question_set_id AND q.question_id=r.question_id WHERE r.paper_id=p.id;
  END IF;
  result := jsonb_build_object('token',a.id::text||'.'||p.id::text,'revision',p.draft_revision,
    'kind',a.kind,'mode',a.mode,'subjects',subjects,'paper',p.paper_number-1,'phase',phase,
    'deadline',CASE WHEN phase='test' THEN extract(epoch FROM p.deadline_at)*1000 ELSE NULL END,
    'serverNow',extract(epoch FROM clock_timestamp())*1000,'questions',questions,
    'answers',answers,'flags',flags,'expired',p.status='timed_out');
  IF phase='results' THEN
    SELECT jsonb_agg(jsonb_build_object('subject',paper.subject_id,'correct',paper.correct_count,
      'answered',paper.question_count-paper.skipped_count,'total',paper.question_count,
      'score',round(100.0*paper.correct_count/paper.question_count),'expired',paper.status='timed_out',
      'questions',(SELECT jsonb_agg(
        jsonb_strip_nulls(jsonb_build_object('id',q.question_id,'text',q.question_text,'topic',coalesce(q.topic,'Mixed practice'),
          'options',q.options,'passage',q.passage_text)) ||
        jsonb_build_object('answer',k.correct_option,'selected',r.selected_option,'correct',r.is_correct,'explanation',k.explanation_text)
        ORDER BY r.position)
        FROM public.saturday_csca_attempt_responses r JOIN public.saturday_csca_questions q ON q.question_set_id=r.question_set_id AND q.question_id=r.question_id
        JOIN public.saturday_csca_answer_keys k ON k.question_set_id=r.question_set_id AND k.question_id=r.question_id WHERE r.paper_id=paper.id))
      ORDER BY paper.paper_number) INTO results FROM public.saturday_csca_attempt_papers paper WHERE paper.attempt_id=a.id;
    result := result || jsonb_build_object('results',results);
  END IF;
  RETURN result;
END $$;

CREATE FUNCTION public.saturday_csca_update_attempt(p_attempt_id uuid, p_access_hash text, p_action text,
  p_paper_id uuid DEFAULT NULL, p_expected_revision bigint DEFAULT NULL, p_answers jsonb DEFAULT NULL, p_flags jsonb DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE a public.saturday_csca_attempts%ROWTYPE; p public.saturday_csca_attempt_papers%ROWTYPE;
  current_p public.saturday_csca_attempt_papers%ROWTYPE; t timestamptz; item jsonb;
BEGIN
  IF p_action IS NULL OR p_action NOT IN ('resume','save','submit','next') THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  -- Serialize start, autosave, submission and next across retries/tabs/instances.
  SELECT * INTO a FROM public.saturday_csca_attempts WHERE id=p_attempt_id AND access_token_sha256=p_access_hash FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'CSCA_DENIED'; END IF;
  t := clock_timestamp(); -- Take time AFTER waiting on the row lock.
  IF a.expires_at<=t OR a.status IN ('expired','abandoned') THEN RAISE EXCEPTION 'CSCA_EXPIRED'; END IF;
  SELECT * INTO current_p FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id AND status='in_progress' FOR UPDATE;
  IF FOUND AND current_p.deadline_at IS NOT NULL AND t>=current_p.deadline_at THEN
    -- Late payloads never replace answers received before the deadline.
    PERFORM public.saturday_csca_finish_paper(current_p.id,t);
    RETURN public.saturday_csca_session_view(a.id,p_access_hash);
  END IF;
  IF p_action='resume' THEN RETURN public.saturday_csca_session_view(a.id,p_access_hash); END IF;
  SELECT * INTO p FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id AND id=p_paper_id FOR UPDATE;
  IF NOT FOUND OR p.status='pending' THEN RAISE EXCEPTION 'CSCA_DENIED'; END IF;
  IF a.status='completed' THEN RETURN public.saturday_csca_session_view(a.id,p_access_hash); END IF;
  IF p_action='next' THEN
    IF p.status='in_progress' THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
    -- A duplicate next with the previous paper context returns the running paper.
    IF current_p.id IS NOT NULL THEN RETURN public.saturday_csca_session_view(a.id,p_access_hash); END IF;
    -- Only the most recently closed paper may start its immediate successor.
    IF EXISTS (SELECT 1 FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id AND paper_number>p.paper_number AND status<>'pending') THEN
      RETURN public.saturday_csca_session_view(a.id,p_access_hash);
    END IF;
    UPDATE public.saturday_csca_attempt_papers SET status='in_progress',started_at=t,
      deadline_at=CASE WHEN time_limit_seconds IS NOT NULL THEN t+time_limit_seconds*interval '1 second' ELSE NULL END
      WHERE attempt_id=a.id AND paper_number=p.paper_number+1 AND status='pending';
    RETURN public.saturday_csca_session_view(a.id,p_access_hash);
  END IF;
  IF p.status<>'in_progress' THEN RETURN public.saturday_csca_session_view(a.id,p_access_hash); END IF;
  IF p_expected_revision IS DISTINCT FROM p.draft_revision THEN RAISE EXCEPTION 'CSCA_CONFLICT'; END IF;
  IF jsonb_typeof(p_answers) IS DISTINCT FROM 'array' OR jsonb_typeof(p_flags) IS DISTINCT FROM 'array' THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  IF jsonb_array_length(p_answers)<>p.question_count OR jsonb_array_length(p_flags)>p.question_count THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  FOR item IN SELECT * FROM jsonb_array_elements(p_answers) LOOP
    IF item<>'null'::jsonb AND (jsonb_typeof(item)<>'string' OR (item#>>'{}') NOT IN ('A','B','C','D')) THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  END LOOP;
  FOR item IN SELECT * FROM jsonb_array_elements(p_flags) LOOP
    IF jsonb_typeof(item)<>'number' OR (item#>>'{}') !~ '^[0-9]+$' THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
    IF (item#>>'{}')::numeric>=p.question_count THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  END LOOP;
  UPDATE public.saturday_csca_attempt_responses r SET selected_option=p_answers->>(r.position-1),
    flagged=p_flags @> jsonb_build_array(r.position-1),saved_at=t WHERE r.paper_id=p.id;
  UPDATE public.saturday_csca_attempt_papers SET draft_revision=draft_revision+1 WHERE id=p.id;
  IF p_action='submit' THEN PERFORM public.saturday_csca_finish_paper(p.id,t); END IF;
  RETURN public.saturday_csca_session_view(a.id,p_access_hash);
END $$;

CREATE FUNCTION public.saturday_csca_start_attempt(p_attempt_id uuid,p_access_hash text,p_subjects text[],p_mode text,p_kind text,
  p_question_count integer DEFAULT 5,p_time_limit_seconds integer DEFAULT 600,p_preview_set_id text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE a public.saturday_csca_attempts%ROWTYPE; release_id text; subject text; paper_id uuid; ordinal integer:=0;
  inserted integer; selected_count integer; t timestamptz; groups integer;
BEGIN
  IF p_attempt_id IS NULL OR p_access_hash IS NULL OR p_access_hash !~ '^[a-f0-9]{64}$'
    OR p_kind IS NULL OR p_kind NOT IN ('subject','combined') OR p_mode IS NULL OR p_mode NOT IN ('timed','practice')
    OR p_question_count IS NULL OR p_question_count NOT BETWEEN 1 AND 200
    OR p_time_limit_seconds IS NULL OR p_time_limit_seconds NOT BETWEEN 1 AND 86400 THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  -- Idempotent client-generated attempt ID. Ownership is still required.
  SELECT * INTO a FROM public.saturday_csca_attempts WHERE id=p_attempt_id;
  IF FOUND THEN RETURN public.saturday_csca_update_attempt(p_attempt_id,p_access_hash,'resume'); END IF;
  IF p_subjects IS NULL OR cardinality(p_subjects) NOT BETWEEN 1 AND 4
    OR (p_kind='subject' AND cardinality(p_subjects)<>1)
    OR (p_kind='combined' AND (cardinality(p_subjects)<2 OR p_mode<>'timed')) THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  SELECT count(DISTINCT subject_group) INTO groups FROM public.saturday_csca_subjects WHERE id=ANY(p_subjects);
  IF groups<>cardinality(p_subjects) THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  -- Content tables deliberately grant only SELECT to service_role.
  -- Do not use FOR SHARE here (it requires UPDATE privileges). Content is immutable;
  -- pin the release visible at selection time even if an admin retires it later.
  SELECT id INTO release_id FROM public.saturday_csca_question_sets
    WHERE (p_preview_set_id IS NULL AND status='active') OR (p_preview_set_id IS NOT NULL AND id=p_preview_set_id AND status='draft');
  IF release_id IS NULL THEN RAISE EXCEPTION 'CSCA_UNAVAILABLE'; END IF;
  t:=clock_timestamp();
  INSERT INTO public.saturday_csca_attempts(id,question_set_id,access_token_sha256,kind,mode,started_at,expires_at)
    VALUES(p_attempt_id,release_id,p_access_hash,p_kind,p_mode,t,t+interval '24 hours') ON CONFLICT(id) DO NOTHING;
  GET DIAGNOSTICS inserted=ROW_COUNT;
  IF inserted=0 THEN RETURN public.saturday_csca_update_attempt(p_attempt_id,p_access_hash,'resume'); END IF;
  -- Hold the same parent lock used by all update requests.
  PERFORM 1 FROM public.saturday_csca_attempts WHERE id=p_attempt_id FOR UPDATE;
  FOREACH subject IN ARRAY p_subjects LOOP
    ordinal:=ordinal+1;
    INSERT INTO public.saturday_csca_attempt_papers(attempt_id,question_set_id,paper_number,subject_id,subject_group,question_count,time_limit_seconds)
      SELECT p_attempt_id,release_id,ordinal,id,subject_group,p_question_count,
        CASE WHEN p_mode='timed' THEN p_time_limit_seconds ELSE NULL END FROM public.saturday_csca_subjects WHERE id=subject RETURNING id INTO paper_id;
    INSERT INTO public.saturday_csca_attempt_responses(paper_id,question_set_id,subject_id,position,question_id)
      SELECT paper_id,release_id,subject,row_number() OVER ()::smallint,chosen.question_id FROM (
        SELECT q.question_id FROM public.saturday_csca_questions q JOIN public.saturday_csca_answer_keys k
          ON k.question_set_id=q.question_set_id AND k.question_id=q.question_id
          WHERE q.question_set_id=release_id AND q.subject_id=subject ORDER BY random() LIMIT p_question_count
      ) chosen;
    GET DIAGNOSTICS selected_count=ROW_COUNT;
    IF selected_count<>p_question_count THEN RAISE EXCEPTION 'CSCA_UNAVAILABLE'; END IF;
  END LOOP;
  -- Countdown begins only after assignments have been prepared.
  t:=clock_timestamp();
  UPDATE public.saturday_csca_attempt_papers SET status='in_progress',started_at=t,
    deadline_at=CASE WHEN time_limit_seconds IS NOT NULL THEN t+time_limit_seconds*interval '1 second' ELSE NULL END
    WHERE attempt_id=p_attempt_id AND paper_number=1;
  RETURN public.saturday_csca_session_view(p_attempt_id,p_access_hash);
END $$;

REVOKE ALL ON FUNCTION public.saturday_csca_finish_paper(uuid,timestamptz),public.saturday_csca_session_view(uuid,text),
  public.saturday_csca_update_attempt(uuid,text,text,uuid,bigint,jsonb,jsonb),public.saturday_csca_start_attempt(uuid,text,text[],text,text,integer,integer,text)
  FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.saturday_csca_finish_paper(uuid,timestamptz),public.saturday_csca_session_view(uuid,text),
  public.saturday_csca_update_attempt(uuid,text,text,uuid,bigint,jsonb,jsonb),public.saturday_csca_start_attempt(uuid,text,text[],text,text,integer,integer,text)
  TO service_role;

-- PROPOSAL ONLY. User reviews and executes manually. No content/release activation.
-- Requires the previously applied CSCA schema and session-rpcs proposal.
-- Freeze the actual provider message, so retries cannot change recipient/body/from.
ALTER TABLE public.saturday_csca_email_deliveries ADD COLUMN message_payload jsonb CHECK (message_payload IS NULL OR jsonb_typeof(message_payload)='object');

-- Preserve the original projection as a private service helper. Replace the public
-- function body in place, preserving its OID so cached callers use the gate as well.
CREATE FUNCTION public.saturday_csca_session_view_internal_v1(p_attempt_id uuid, p_access_hash text)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE a public.saturday_csca_attempts%ROWTYPE; p public.saturday_csca_attempt_papers%ROWTYPE;
  phase text; subjects jsonb; questions jsonb; answers jsonb; flags jsonb; results jsonb; result jsonb;
BEGIN
  SELECT * INTO a FROM public.saturday_csca_attempts WHERE id=p_attempt_id AND access_token_sha256=p_access_hash;
  IF NOT FOUND THEN RAISE EXCEPTION 'CSCA_DENIED'; END IF;
  IF a.expires_at<=clock_timestamp() OR a.status IN ('expired','abandoned') THEN RAISE EXCEPTION 'CSCA_EXPIRED'; END IF;
  SELECT * INTO STRICT p FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id
    ORDER BY (status='in_progress') DESC, (status IN ('submitted','timed_out')) DESC, paper_number DESC LIMIT 1;
  phase := CASE WHEN a.status='completed' THEN 'results' WHEN p.status='in_progress' THEN 'test' ELSE 'break' END;
  SELECT jsonb_agg(subject_id ORDER BY paper_number) INTO subjects FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id;
  SELECT coalesce(jsonb_agg(r.selected_option ORDER BY r.position),'[]'::jsonb),
    coalesce(jsonb_agg(r.position-1 ORDER BY r.position) FILTER (WHERE r.flagged),'[]'::jsonb)
    INTO answers,flags FROM public.saturday_csca_attempt_responses r WHERE r.paper_id=p.id;
  questions := '[]'::jsonb;
  IF phase='test' THEN
    SELECT jsonb_agg(jsonb_strip_nulls(jsonb_build_object('id',q.question_id,'text',q.question_text,
      'topic',coalesce(q.topic,'Mixed practice'),'options',q.options,'passage',q.passage_text)) ORDER BY r.position)
    INTO questions FROM public.saturday_csca_attempt_responses r JOIN public.saturday_csca_questions q
      ON q.question_set_id=r.question_set_id AND q.question_id=r.question_id WHERE r.paper_id=p.id;
  END IF;
  result := jsonb_build_object('token',a.id::text||'.'||p.id::text,'revision',p.draft_revision,
    'kind',a.kind,'mode',a.mode,'subjects',subjects,'paper',p.paper_number-1,'phase',phase,
    'deadline',CASE WHEN phase='test' THEN extract(epoch FROM p.deadline_at)*1000 ELSE NULL END,
    'serverNow',extract(epoch FROM clock_timestamp())*1000,'questions',questions,
    'answers',answers,'flags',flags,'expired',p.status='timed_out');
  IF phase='results' THEN
    SELECT jsonb_agg(jsonb_build_object('subject',paper.subject_id,'correct',paper.correct_count,
      'answered',paper.question_count-paper.skipped_count,'total',paper.question_count,
      'score',round(100.0*paper.correct_count/paper.question_count),'expired',paper.status='timed_out',
      'questions',(SELECT jsonb_agg(
        jsonb_strip_nulls(jsonb_build_object('id',q.question_id,'text',q.question_text,'topic',coalesce(q.topic,'Mixed practice'),
          'options',q.options,'passage',q.passage_text)) ||
        jsonb_build_object('answer',k.correct_option,'selected',r.selected_option,'correct',r.is_correct,'explanation',k.explanation_text)
        ORDER BY r.position)
        FROM public.saturday_csca_attempt_responses r JOIN public.saturday_csca_questions q ON q.question_set_id=r.question_set_id AND q.question_id=r.question_id
        JOIN public.saturday_csca_answer_keys k ON k.question_set_id=r.question_set_id AND k.question_id=r.question_id WHERE r.paper_id=paper.id))
      ORDER BY paper.paper_number) INTO results FROM public.saturday_csca_attempt_papers paper WHERE paper.attempt_id=a.id;
    result := result || jsonb_build_object('results',results);
  END IF;
  RETURN result;
END $$;

CREATE OR REPLACE FUNCTION public.saturday_csca_session_view(p_attempt_id uuid,p_access_hash text)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE result jsonb; captured boolean; email_status text;
BEGIN
  result:=public.saturday_csca_session_view_internal_v1(p_attempt_id,p_access_hash);
  SELECT EXISTS(SELECT 1 FROM public.saturday_csca_attempt_contacts WHERE attempt_id=p_attempt_id) INTO captured;
  IF result->>'phase'='results' AND NOT captured THEN
    result:=(result-'results')||jsonb_build_object('phase','contact');
  END IF;
  result:=result||jsonb_build_object('contactSaved',captured);
  IF captured THEN
    SELECT status INTO email_status FROM public.saturday_csca_email_deliveries WHERE attempt_id=p_attempt_id AND template_version='saturday-csca-result-v1' ORDER BY created_at LIMIT 1;
    IF email_status IS NOT NULL THEN result:=result||jsonb_build_object('emailStatus',email_status); END IF;
  END IF;
  RETURN result;
END $$;

CREATE FUNCTION public.saturday_csca_capture_contact(p_attempt_id uuid,p_access_hash text,p_name text,p_email text,p_phone text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE a public.saturday_csca_attempts%ROWTYPE; c public.saturday_csca_attempt_contacts%ROWTYPE; clean_name text; clean_email text; clean_phone text;
BEGIN
  SELECT * INTO a FROM public.saturday_csca_attempts WHERE id=p_attempt_id AND access_token_sha256=p_access_hash FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'CSCA_DENIED'; END IF;
  IF a.expires_at<=clock_timestamp() THEN RAISE EXCEPTION 'CSCA_EXPIRED'; END IF;
  IF a.status<>'completed' OR EXISTS(SELECT 1 FROM public.saturday_csca_attempt_papers WHERE attempt_id=a.id AND status NOT IN ('submitted','timed_out')) THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  clean_name:=btrim(p_name); clean_email:=lower(btrim(p_email)); clean_phone:=nullif(btrim(p_phone),'');
  IF clean_name IS NULL OR char_length(clean_name) NOT BETWEEN 1 AND 120 OR clean_name~'[[:cntrl:]]'
    OR clean_email IS NULL OR char_length(clean_email)>254 OR clean_email!~'^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    OR (clean_phone IS NOT NULL AND clean_phone!~'^[+][1-9][0-9]{6,14}$') THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  SELECT * INTO c FROM public.saturday_csca_attempt_contacts WHERE attempt_id=a.id;
  IF FOUND THEN
    IF c.name IS DISTINCT FROM clean_name OR c.email IS DISTINCT FROM clean_email OR c.phone IS DISTINCT FROM clean_phone THEN RAISE EXCEPTION 'CSCA_CONTACT_CONFLICT'; END IF;
  ELSE
    INSERT INTO public.saturday_csca_attempt_contacts(attempt_id,name,email,phone,result_email_requested)
      VALUES(a.id,clean_name,clean_email,clean_phone,true);
  END IF;
  INSERT INTO public.saturday_csca_email_deliveries(attempt_id,recipient_email,template_version,idempotency_key)
    VALUES(a.id,clean_email,'saturday-csca-result-v1','saturday-csca-result/v1/'||a.id::text) ON CONFLICT(idempotency_key) DO NOTHING;
  RETURN public.saturday_csca_session_view(a.id,p_access_hash);
END $$;

-- Worker-only functions; never expose an email address or message through the browser API.
CREATE FUNCTION public.saturday_csca_claim_result_email(p_attempt_id uuid DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE job public.saturday_csca_email_deliveries%ROWTYPE; t timestamptz:=clock_timestamp(); summary jsonb;
BEGIN
  -- Stop well inside Resend's 24h idempotency window, including crashed-worker retries.
  UPDATE public.saturday_csca_email_deliveries SET status='failed',last_error_code='RETRY_LIMIT',locked_until=NULL
    WHERE template_version='saturday-csca-result-v1' AND (p_attempt_id IS NULL OR attempt_id=p_attempt_id)
      AND (status IN ('pending','retry') OR (status='processing' AND locked_until<=t))
      AND (created_at<=t-interval '23 hours' OR delivery_attempts>=5);
  SELECT * INTO job FROM public.saturday_csca_email_deliveries
    WHERE template_version='saturday-csca-result-v1' AND (p_attempt_id IS NULL OR attempt_id=p_attempt_id)
      AND created_at>t-interval '23 hours' AND delivery_attempts<5
      AND ((status IN ('pending','retry') AND next_attempt_at<=t) OR (status='processing' AND locked_until<=t))
    ORDER BY next_attempt_at,created_at LIMIT 1 FOR UPDATE SKIP LOCKED;
  IF NOT FOUND THEN RETURN NULL; END IF;
  UPDATE public.saturday_csca_email_deliveries SET status='processing',delivery_attempts=delivery_attempts+1,locked_until=t+interval '2 minutes'
    WHERE id=job.id RETURNING * INTO job;
  SELECT jsonb_build_object('name',c.name,'email',job.recipient_email,'completedAt',a.completed_at,
    'papers',(SELECT jsonb_agg(jsonb_build_object('subject',p.subject_id,'correct',p.correct_count,'incorrect',p.incorrect_count,
      'skipped',p.skipped_count,'total',p.question_count,'score',round(p.score_percent)) ORDER BY p.paper_number)
      FROM public.saturday_csca_attempt_papers p WHERE p.attempt_id=a.id)) INTO summary
    FROM public.saturday_csca_attempts a JOIN public.saturday_csca_attempt_contacts c ON c.attempt_id=a.id
    WHERE a.id=job.attempt_id AND a.status='completed' AND c.result_email_requested;
  IF summary IS NULL THEN
    UPDATE public.saturday_csca_email_deliveries SET status='failed',last_error_code='INVALID_ATTEMPT',locked_until=NULL WHERE id=job.id;
    RETURN NULL;
  END IF;
  RETURN jsonb_build_object('id',job.id,'generation',job.delivery_attempts,'idempotencyKey',job.idempotency_key,'summary',summary,'payload',job.message_payload);
END $$;

CREATE FUNCTION public.saturday_csca_prepare_result_email(p_delivery_id uuid,p_generation integer,p_payload jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE job public.saturday_csca_email_deliveries%ROWTYPE; field text;
BEGIN
  SELECT * INTO job FROM public.saturday_csca_email_deliveries WHERE id=p_delivery_id FOR UPDATE;
  IF NOT FOUND OR job.status<>'processing' OR job.delivery_attempts IS DISTINCT FROM p_generation OR job.locked_until<=clock_timestamp() THEN RETURN NULL; END IF;
  IF job.message_payload IS NOT NULL THEN RETURN job.message_payload; END IF;
  IF jsonb_typeof(p_payload) IS DISTINCT FROM 'object' THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  IF (p_payload-'from'-'to'-'reply_to'-'subject'-'html'-'text')<>'{}'::jsonb THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  FOREACH field IN ARRAY ARRAY['from','to','reply_to','subject','html','text'] LOOP
    IF jsonb_typeof(p_payload->field) IS DISTINCT FROM 'string' OR length(p_payload->>field)=0 THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  END LOOP;
  IF p_payload->>'to' IS DISTINCT FROM job.recipient_email OR length(p_payload::text)>100000 THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  UPDATE public.saturday_csca_email_deliveries SET message_payload=p_payload WHERE id=job.id;
  RETURN p_payload;
END $$;

CREATE FUNCTION public.saturday_csca_finish_result_email(p_delivery_id uuid,p_generation integer,p_provider_id text DEFAULT NULL,p_retry boolean DEFAULT false,p_error_code text DEFAULT NULL)
RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE job public.saturday_csca_email_deliveries%ROWTYPE; t timestamptz:=clock_timestamp(); next_status text;
BEGIN
  SELECT * INTO job FROM public.saturday_csca_email_deliveries WHERE id=p_delivery_id FOR UPDATE;
  -- Generation prevents an old worker from overwriting a newer lease's outcome.
  IF NOT FOUND OR job.status<>'processing' OR job.delivery_attempts IS DISTINCT FROM p_generation THEN RETURN false; END IF;
  IF p_provider_id IS NOT NULL AND length(p_provider_id) BETWEEN 1 AND 256 THEN
    UPDATE public.saturday_csca_email_deliveries SET status='accepted',provider_message_id=p_provider_id,accepted_at=t,locked_until=NULL,last_error_code=NULL WHERE id=job.id;
  ELSE
    next_status:=CASE WHEN p_retry AND job.delivery_attempts<5 AND job.created_at>t-interval '23 hours' THEN 'retry' ELSE 'failed' END;
    UPDATE public.saturday_csca_email_deliveries SET status=next_status,locked_until=NULL,
      next_attempt_at=t+least(3600,power(2,job.delivery_attempts)::integer*60)*interval '1 second',
      last_error_code=CASE WHEN p_error_code IN ('PROVIDER_NETWORK','PROVIDER_CONFIG','PROVIDER_RETRY','PROVIDER_REJECTED') THEN p_error_code ELSE 'PROVIDER_ERROR' END
      WHERE id=job.id;
  END IF;
  RETURN true;
END $$;

REVOKE ALL ON FUNCTION public.saturday_csca_session_view_internal_v1(uuid,text),public.saturday_csca_session_view(uuid,text),public.saturday_csca_capture_contact(uuid,text,text,text,text),
  public.saturday_csca_claim_result_email(uuid),public.saturday_csca_prepare_result_email(uuid,integer,jsonb),public.saturday_csca_finish_result_email(uuid,integer,text,boolean,text)
  FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.saturday_csca_session_view_internal_v1(uuid,text),public.saturday_csca_session_view(uuid,text),public.saturday_csca_capture_contact(uuid,text,text,text,text),
  public.saturday_csca_claim_result_email(uuid),public.saturday_csca_prepare_result_email(uuid,integer,jsonb),public.saturday_csca_finish_result_email(uuid,integer,text,boolean,text)
  TO service_role;

-- PROPOSAL ONLY. User reviews and executes manually. Never run automatically.
-- Requires the original schema, session RPCs, and contact/email proposal.
-- No new tables, content changes, release activation or changes to existing attempts.

-- Add paper metadata without changing the existing contact gate or answer projection.
CREATE OR REPLACE FUNCTION public.saturday_csca_session_view(p_attempt_id uuid,p_access_hash text)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE result jsonb; captured boolean; email_status text; papers jsonb;
BEGIN
  result:=public.saturday_csca_session_view_internal_v1(p_attempt_id,p_access_hash);
  SELECT EXISTS(SELECT 1 FROM public.saturday_csca_attempt_contacts WHERE attempt_id=p_attempt_id) INTO captured;
  IF result->>'phase'='results' AND NOT captured THEN
    result:=(result-'results')||jsonb_build_object('phase','contact');
  END IF;
  SELECT jsonb_agg(jsonb_build_object('subject',subject_id,'questionCount',question_count,'timeLimitSeconds',time_limit_seconds)
    ORDER BY paper_number) INTO papers FROM public.saturday_csca_attempt_papers WHERE attempt_id=p_attempt_id;
  result:=result||jsonb_build_object('contactSaved',captured,'papers',papers);
  IF captured THEN
    SELECT status INTO email_status FROM public.saturday_csca_email_deliveries WHERE attempt_id=p_attempt_id AND template_version='saturday-csca-result-v1' ORDER BY created_at LIMIT 1;
    IF email_status IS NOT NULL THEN result:=result||jsonb_build_object('emailStatus',email_status); END IF;
  END IF;
  RETURN result;
END $$;

-- Full papers only. Counts and time limits are server/database rules, not browser inputs.
CREATE FUNCTION public.saturday_csca_start_full_attempt(p_attempt_id uuid,p_access_hash text,p_subjects text[],p_kind text,p_preview_set_id text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE a public.saturday_csca_attempts%ROWTYPE; release_id text; subject text; paper_id uuid; ordinal integer:=0;
  inserted integer; selected_count integer; t timestamptz; groups integer; paper_count integer; paper_seconds integer;
BEGIN
  IF p_attempt_id IS NULL OR p_access_hash IS NULL OR p_access_hash !~ '^[a-f0-9]{64}$'
    OR p_kind IS NULL OR p_kind NOT IN ('subject','combined') THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  SELECT * INTO a FROM public.saturday_csca_attempts WHERE id=p_attempt_id;
  IF FOUND THEN RETURN public.saturday_csca_update_attempt(p_attempt_id,p_access_hash,'resume'); END IF;
  IF p_subjects IS NULL OR cardinality(p_subjects) NOT BETWEEN 1 AND 4
    OR (p_kind='subject' AND cardinality(p_subjects)<>1)
    OR (p_kind='combined' AND cardinality(p_subjects)<2) THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  SELECT count(DISTINCT subject_group) INTO groups FROM public.saturday_csca_subjects WHERE id=ANY(p_subjects);
  IF groups<>cardinality(p_subjects) THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  -- Content is immutable and service_role has SELECT only, so do not lock content rows.
  SELECT id INTO release_id FROM public.saturday_csca_question_sets
    WHERE (p_preview_set_id IS NULL AND status='active') OR (p_preview_set_id IS NOT NULL AND id=p_preview_set_id AND status='draft');
  IF release_id IS NULL THEN RAISE EXCEPTION 'CSCA_UNAVAILABLE'; END IF;
  t:=clock_timestamp();
  INSERT INTO public.saturday_csca_attempts(id,question_set_id,access_token_sha256,kind,mode,started_at,expires_at)
    VALUES(p_attempt_id,release_id,p_access_hash,p_kind,'timed',t,t+interval '24 hours') ON CONFLICT(id) DO NOTHING;
  GET DIAGNOSTICS inserted=ROW_COUNT;
  IF inserted=0 THEN RETURN public.saturday_csca_update_attempt(p_attempt_id,p_access_hash,'resume'); END IF;
  PERFORM 1 FROM public.saturday_csca_attempts WHERE id=p_attempt_id FOR UPDATE;
  FOREACH subject IN ARRAY p_subjects LOOP
    ordinal:=ordinal+1;
    paper_count:=CASE WHEN subject IN ('chinese-stem','chinese-humanities') THEN 80 ELSE 48 END;
    paper_seconds:=CASE WHEN subject IN ('chinese-stem','chinese-humanities') THEN 5400 ELSE 3600 END;
    INSERT INTO public.saturday_csca_attempt_papers(attempt_id,question_set_id,paper_number,subject_id,subject_group,question_count,time_limit_seconds)
      SELECT p_attempt_id,release_id,ordinal,id,subject_group,paper_count,paper_seconds
        FROM public.saturday_csca_subjects WHERE id=subject RETURNING id INTO paper_id;
    -- Random selection from reviewed content only. Keep selected questions sharing
    -- a passage adjacent. Each selected question retains its complete passage.
    INSERT INTO public.saturday_csca_attempt_responses(paper_id,question_set_id,subject_id,position,question_id)
      SELECT paper_id,release_id,subject,
        row_number() OVER (ORDER BY md5(chosen.group_key||p_attempt_id::text),md5(chosen.question_id||p_attempt_id::text))::smallint,
        chosen.question_id
      FROM (
        SELECT q.question_id,CASE WHEN nullif(q.passage_text,'') IS NULL THEN 'question:'||q.question_id ELSE 'passage:'||q.passage_text END AS group_key
        FROM public.saturday_csca_questions q JOIN public.saturday_csca_answer_keys k
          ON k.question_set_id=q.question_set_id AND k.question_id=q.question_id
          WHERE q.question_set_id=release_id AND q.subject_id=subject ORDER BY random() LIMIT paper_count
      ) chosen;
    GET DIAGNOSTICS selected_count=ROW_COUNT;
    -- Fail the entire transaction instead of creating an undersized paper.
    IF selected_count<>paper_count THEN RAISE EXCEPTION 'CSCA_UNAVAILABLE'; END IF;
  END LOOP;
  t:=clock_timestamp();
  UPDATE public.saturday_csca_attempt_papers SET status='in_progress',started_at=t,deadline_at=t+time_limit_seconds*interval '1 second'
    WHERE attempt_id=p_attempt_id AND paper_number=1;
  RETURN public.saturday_csca_session_view(p_attempt_id,p_access_hash);
END $$;

REVOKE ALL ON FUNCTION public.saturday_csca_start_full_attempt(uuid,text,text[],text,text),public.saturday_csca_session_view(uuid,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.saturday_csca_start_full_attempt(uuid,text,text[],text,text),public.saturday_csca_session_view(uuid,text) TO service_role;

-- PROPOSAL ONLY. Review and execute manually before deploying the app changes.
-- Adds two service-only functions. No new tables, column changes or historical backfill.
-- Existing student emails, including frozen BCC messages, stay unchanged.

CREATE FUNCTION public.saturday_csca_capture_contact_with_team(
  p_attempt_id uuid,p_access_hash text,p_name text,p_email text,p_phone text DEFAULT NULL,p_team_emails text[] DEFAULT '{}'::text[])
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE result jsonb; recipient text;
BEGIN
  IF p_team_emails IS NULL OR cardinality(p_team_emails)>10 THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  FOREACH recipient IN ARRAY p_team_emails LOOP
    IF recipient IS NULL OR char_length(recipient)>254 OR recipient !~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$' THEN RAISE EXCEPTION 'CSCA_INVALID'; END IF;
  END LOOP;
  -- Existing function checks ownership/completion, locks the attempt, saves contact
  -- and queues the student email. All work below commits or rolls back with it.
  result:=public.saturday_csca_capture_contact(p_attempt_id,p_access_hash,p_name,p_email,p_phone);
  IF NOT EXISTS(SELECT 1 FROM public.saturday_csca_email_deliveries WHERE attempt_id=p_attempt_id AND template_version='saturday-csca-team-result-v1') THEN
    FOR recipient IN SELECT DISTINCT lower(btrim(email)) FROM unnest(p_team_emails) AS emails(email) LOOP
      INSERT INTO public.saturday_csca_email_deliveries(attempt_id,recipient_email,template_version,idempotency_key)
        VALUES(p_attempt_id,recipient,'saturday-csca-team-result-v1','saturday-csca-team-result/v1/'||p_attempt_id::text||'/'||md5(recipient))
        ON CONFLICT(idempotency_key) DO NOTHING;
    END LOOP;
  END IF;
  RETURN result;
END $$;

CREATE FUNCTION public.saturday_csca_claim_notification_email(p_attempt_id uuid DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE job public.saturday_csca_email_deliveries%ROWTYPE; t timestamptz:=clock_timestamp(); summary jsonb;
BEGIN
  -- Stop well inside Resend's 24h idempotency window, including crashed-worker retries.
  UPDATE public.saturday_csca_email_deliveries SET status='failed',last_error_code='RETRY_LIMIT',locked_until=NULL
    WHERE template_version IN ('saturday-csca-result-v1','saturday-csca-team-result-v1') AND (p_attempt_id IS NULL OR attempt_id=p_attempt_id)
      AND (status IN ('pending','retry') OR (status='processing' AND locked_until<=t))
      AND (created_at<=t-interval '23 hours' OR delivery_attempts>=5);
  SELECT * INTO job FROM public.saturday_csca_email_deliveries
    WHERE template_version IN ('saturday-csca-result-v1','saturday-csca-team-result-v1') AND (p_attempt_id IS NULL OR attempt_id=p_attempt_id)
      AND created_at>t-interval '23 hours' AND delivery_attempts<5
      AND ((status IN ('pending','retry') AND next_attempt_at<=t) OR (status='processing' AND locked_until<=t))
    ORDER BY next_attempt_at,created_at,(template_version='saturday-csca-result-v1') DESC,id LIMIT 1 FOR UPDATE SKIP LOCKED;
  IF NOT FOUND THEN RETURN NULL; END IF;
  UPDATE public.saturday_csca_email_deliveries SET status='processing',delivery_attempts=delivery_attempts+1,locked_until=t+interval '2 minutes'
    WHERE id=job.id RETURNING * INTO job;
  SELECT jsonb_build_object('name',c.name,'email',c.email,'phone',c.phone,'completedAt',a.completed_at,
    'papers',(SELECT jsonb_agg(jsonb_build_object('subject',p.subject_id,'correct',p.correct_count,'incorrect',p.incorrect_count,
      'skipped',p.skipped_count,'total',p.question_count,'score',round(p.score_percent)) ORDER BY p.paper_number)
      FROM public.saturday_csca_attempt_papers p WHERE p.attempt_id=a.id)) INTO summary
    FROM public.saturday_csca_attempts a JOIN public.saturday_csca_attempt_contacts c ON c.attempt_id=a.id
    WHERE a.id=job.attempt_id AND a.status='completed' AND c.result_email_requested;
  IF summary IS NULL THEN
    UPDATE public.saturday_csca_email_deliveries SET status='failed',last_error_code='INVALID_ATTEMPT',locked_until=NULL WHERE id=job.id;
    RETURN NULL;
  END IF;
  RETURN jsonb_build_object('id',job.id,'generation',job.delivery_attempts,'idempotencyKey',job.idempotency_key,'kind',CASE WHEN job.template_version='saturday-csca-team-result-v1' THEN 'team' ELSE 'student' END,'recipient',job.recipient_email,'summary',summary,'payload',job.message_payload);
END $$;

REVOKE ALL ON FUNCTION public.saturday_csca_capture_contact_with_team(uuid,text,text,text,text,text[]),public.saturday_csca_claim_notification_email(uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.saturday_csca_capture_contact_with_team(uuid,text,text,text,text,text[]),public.saturday_csca_claim_notification_email(uuid) TO service_role;

ALTER TABLE public.saturday_csca_questions ADD COLUMN diagram_svg text,ADD COLUMN diagram_alt text,ADD COLUMN diagram_sha256 text;
ALTER TABLE public.saturday_csca_questions ADD CONSTRAINT saturday_csca_question_diagram_complete CHECK (
  (diagram_svg IS NULL AND diagram_alt IS NULL AND diagram_sha256 IS NULL) OR
  (diagram_svg IS NOT NULL AND diagram_alt IS NOT NULL AND diagram_sha256 IS NOT NULL
   AND octet_length(diagram_svg) BETWEEN 1 AND 131072 AND char_length(btrim(diagram_alt)) BETWEEN 1 AND 2000
   AND diagram_sha256 ~ '^[a-f0-9]{64}$' AND diagram_sha256=encode(sha256(convert_to(diagram_svg,'UTF8')),'hex'))
);
CREATE OR REPLACE FUNCTION public.saturday_csca_session_view(p_attempt_id uuid,p_access_hash text)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $view$
DECLARE result jsonb;captured boolean;email_status text;papers jsonb;release_id text;items jsonb;reports jsonb;
BEGIN
  result:=public.saturday_csca_session_view_internal_v1(p_attempt_id,p_access_hash);
  SELECT question_set_id INTO STRICT release_id FROM public.saturday_csca_attempts WHERE id=p_attempt_id AND access_token_sha256=p_access_hash;
  SELECT EXISTS(SELECT 1 FROM public.saturday_csca_attempt_contacts WHERE attempt_id=p_attempt_id) INTO captured;
  IF result->>'phase'='results' AND NOT captured THEN result:=(result-'results')||jsonb_build_object('phase','contact'); END IF;
  SELECT jsonb_agg(jsonb_build_object('subject',subject_id,'questionCount',question_count,'timeLimitSeconds',time_limit_seconds) ORDER BY paper_number)
    INTO papers FROM public.saturday_csca_attempt_papers WHERE attempt_id=p_attempt_id;
  result:=result||jsonb_build_object('contactSaved',captured,'papers',papers);
  IF captured THEN
    SELECT status INTO email_status FROM public.saturday_csca_email_deliveries WHERE attempt_id=p_attempt_id AND template_version='saturday-csca-result-v1' ORDER BY created_at LIMIT 1;
    IF email_status IS NOT NULL THEN result:=result||jsonb_build_object('emailStatus',email_status); END IF;
  END IF;
  -- Metadata only: SVG text and source metadata never enter session JSON.
  SELECT coalesce(jsonb_agg(item.value || CASE WHEN q.diagram_svg IS NOT NULL THEN
    jsonb_build_object('diagram',jsonb_build_object('sha256',q.diagram_sha256,'alt',q.diagram_alt)) ELSE '{}'::jsonb END ORDER BY item.ordinality),'[]'::jsonb)
    INTO items FROM jsonb_array_elements(result->'questions') WITH ORDINALITY AS item(value,ordinality)
    JOIN public.saturday_csca_questions q ON q.question_set_id=release_id AND q.question_id=item.value->>'id';
  result:=result||jsonb_build_object('questions',items);
  IF captured AND result->>'phase'='results' THEN
    SELECT jsonb_agg(paper.value||jsonb_build_object('questions',(
      SELECT coalesce(jsonb_agg(item.value || CASE WHEN q.diagram_svg IS NOT NULL THEN
        jsonb_build_object('diagram',jsonb_build_object('sha256',q.diagram_sha256,'alt',q.diagram_alt)) ELSE '{}'::jsonb END ORDER BY item.ordinality),'[]'::jsonb)
      FROM jsonb_array_elements(paper.value->'questions') WITH ORDINALITY AS item(value,ordinality)
      JOIN public.saturday_csca_questions q ON q.question_set_id=release_id AND q.question_id=item.value->>'id'
    )) ORDER BY paper.ordinality) INTO reports
    FROM jsonb_array_elements(result->'results') WITH ORDINALITY AS paper(value,ordinality);
    result:=result||jsonb_build_object('results',reports);
  END IF;
  RETURN result;
END $view$;
REVOKE ALL ON FUNCTION public.saturday_csca_session_view(uuid,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.saturday_csca_session_view(uuid,text) TO service_role;


NOTIFY pgrst,'reload schema';
COMMIT;
