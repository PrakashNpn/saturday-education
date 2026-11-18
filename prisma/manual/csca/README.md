# Saturday CSCA manual database package

Prepared for owner review and manual execution only. No application route, deployment hook,
migration runner or npm command invokes this SQL. Think Asia is read-only input.

**Current owner status:** schema/import/verification and the server schema-access
fix are complete. Do not rerun them. The owner confirmed the release is **active** on 17 November 2026.
**`04-activate-question-bank.sql`** is retained as the reviewed activation script. It checks the
release, question/key fingerprints, counts and permissions, then changes only the
release status and activation timestamp in a transaction. It aborts on mismatches
or another active release and is safe to rerun for the same active release.
Expected output: `active`, 1,433 questions, 1,433 answer keys and 36 diagrams.
After activation, remove `SATURDAY_CSCA_PREVIEW_QUESTION_SET_ID` from `.env.local`
and restart the local server. Activation was executed by the owner, not the agent.
See the [feature handoff](../../../features/csca-practice-test/README.md).

The setup creates **9 Saturday-only tables, 88 columns in total**, plus indexes,
constraints, triggers and service-only PostgreSQL functions. Names start with
`saturday_csca_`; existing IMAT, consultation, event and Think Asia objects are untouched.
The schema is a fresh install, not a rerunnable upgrade. Any name conflict aborts it.

| Table | Columns |
| --- | ---: |
| saturday_csca_subjects | 4 |
| saturday_csca_question_sets | 7 |
| saturday_csca_questions | 15 |
| saturday_csca_answer_keys | 6 |
| saturday_csca_attempts | 9 |
| saturday_csca_attempt_papers | 17 |
| saturday_csca_attempt_responses | 9 |
| saturday_csca_attempt_contacts | 6 |
| saturday_csca_email_deliveries | 15 |

## Content

The latest available local, database-SVG snapshot contains **1,433 questions and keys**:
84 Chinese STEM, 83 Chinese Humanities, 551 Mathematics, 314 Physics and 401 Chemistry.
It includes 36 SVG diagrams. Question text, choices, answers, explanations, diagram text,
review metadata and content hashes are preserved. Only a new database namespace is used.
The snapshot is verified against its local manifest; no claim is made that it exactly
matches a later, unseen live database edit.

This is independently reviewed practice content, including documented adaptations,
not an authenticated official CSCA paper bank. Source provenance/review limitations
are retained. Chinese pools are small; repeat attempts will repeat many questions.
Explanations stay in their source language (currently English); six UI languages do
not imply translated exam content or explanations.

The private import folder contains answer keys and is ignored by Git. Do not put it
under `public`, upload it to a public bucket, or include it in a shared deployment.
`manifest.json` records source and generated file hashes, not question text/answers.

## Original setup sequence (fresh installations only)

No need to apply this until you are ready for the database preparation step. Keep a
backup and confirm you are connected to **Saturday's** project. Prefer staging first.

1. Run `00-preflight.sql` in the intended SQL Editor. Expect the three standard roles,
   including service_role with RLS bypass, and **no** `saturday_csca_` objects. Stop on
   conflicts; do not drop or overwrite them. The SQL cannot establish the dashboard's
   project identity for you.
2. Review and run `01-schema-and-functions.sql` once. This one transaction creates only
   new Saturday objects, with RLS and no browser-role table/function access.
3. Import via **psql**, avoiding the SQL Editor's query-size limit. From this project:

   ```bash
   psql 'host=YOUR_SATURDAY_HOST port=5432 dbname=postgres user=YOUR_SATURDAY_DATABASE_USER sslmode=require' -X -W -v ON_ERROR_STOP=1 -f prisma/manual/csca/private-import/import.psql
   ```

   Use the connection details from Saturday's Supabase Connect panel (direct or session
   pooler); password is entered at the prompt. Do not paste it into code or chat.
   The import wraps the release and all question/key batches in one transaction, with
   verification before commit. Relative includes resolve against the script directory.
   Expected draft ID: `csca-20261101-b3c005994d7d2e7c`.
4. Run `02-verify.sql` in the SQL Editor. Expect the counts above, 36 diagrams, matching
   fingerprints, RLS enabled, no browser access and one **draft** release. It raises an
   error on mismatches, rather than just displaying a reassuring count.
5. Test the draft locally with the preview override. After acceptance, review and run
   `04-activate-question-bank.sql`. The earlier `02-verify.sql` is a draft-import
   check; after activation use the checks/output in script 04 instead.

If psql fails, its connection closes without committing the import. Confirm the error
and rollback before retrying. The schema is a separate successful transaction; do not
re-run schema creation after it succeeds. Do not re-run a successful content import.
The private numbered SQL files can be run individually in order via SQL Editor if
necessary: each DO block is atomic, but the whole bank is then **not** one transaction.
In that workflow partial content remains a draft; record completed batches and never
rerun successful ones. Prefer psql.

## Offline preparation and verification

```bash
python3 scripts/csca/prepare_package.py --source /home/linux/think-asia
node scripts/csca/check_package.mjs
```

The generator validates every question's content hash, every SVG hash, subject counts
and the release manifest before writing local proposal files. It does not read .env
or connect to a database. It regenerates only its own private SQL output.

The checker uses the optional locally available `@electric-sql/pglite` package, which
is not added as an application dependency. It creates disposable in-memory PostgreSQL,
loads the complete proposed schema/content and tests both Chinese tracks, a four-paper
session, ownership rejection, autosave revision conflicts, grading, result contact
gating/deduplication, email queue preparation/status, immutable content and browser
privileges. An original-name Think Asia sentinel is unchanged. All recipients use
`.invalid`; there is no email/network transport or Supabase client.

This verifies SQL execution in local PostgreSQL, not live Supabase settings, concurrent
locking under real traffic, scheduler execution, browser flows or actual email delivery.
Those require later staging/owner-run checks.
