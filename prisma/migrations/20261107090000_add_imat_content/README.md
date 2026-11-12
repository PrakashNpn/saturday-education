# Manual IMAT content schema

Run `migration.sql` once, in full, as the owner in the Supabase SQL editor. The agent must not run it against Supabase. This is schema creation only: seven empty tables, indexes, constraints and access controls. It does not seed questions or change existing application tables. No contact, attempt, session or student records are created.

The transaction fails and rolls back if any proposed table already exists; do not remove existing tables or replace this with IF NOT EXISTS to hide schema conflicts. If execution reports an error, inspect it before retrying. A successful run does not connect the website to these tables.

## Tables

| Table | Purpose |
| --- | --- |
| imat_sources | Official references, PDF checksum, reuse evidence and correction checks |
| imat_papers | Historical year/variant, explicit scoring and duration, version and publication state |
| imat_paper_sections | Historical section heading, order and number of questions |
| imat_passages | Shared passages, attribution and image metadata |
| imat_questions | Stable identity, source question/page, section, passage, prompt and review state |
| imat_question_options | Five possible source option keys A-E, text and optional images |
| imat_answer_keys | Correct source option, evidence, review and separately reviewed explanations |

Draft records can have unknown prompt, section or paper rules, so collected metadata need not pretend to be complete content. Unknown answers have no answer-key row. The correct source key references an option on the same question. Composite foreign keys prevent attaching passages or sections from another paper. Original question order is `original_number`, source option order is A-E. Shuffling must retain stable source keys; default is off. Passage grouping and original order remain mandatory when selecting mocks.

Question sections use the current app keys. Older combined general knowledge and logic should retain their original heading and a documented mapping (normally reasoning); do not arbitrarily split them into current section quotas. Questions unsuitable for the current mock can remain `mock_eligible = false` while still appearing in historical papers.

## Access

RLS is enabled on all seven tables. PUBLIC, anon and authenticated receive no access; no browser policies are created. service_role receives SELECT (existing Supabase defaults may grant that privileged role additional permissions). Manual inserts use the SQL editor's owner role. A future server-only Prisma loader must use an authorised database role, filter publication/review states, and return only the data intended for that stage of the test. Never put database credentials or a service-role key in browser code. The tables' access rules do not by themselves prevent answers being exposed by application responses.

## Before loading or publishing

1. Matching Prisma models and a read-only server loader are now implemented. Regenerate the client locally with prisma generate as needed. Do not run db push, migrate deploy, introspection or seeds against the live database from the agent. The model file documents SQL-managed CHECK constraints, RLS and partial indexes; preserve those when designing future manual migrations.
2. Prepare a separate reviewed content import. PDF collection and recovered question indexes are not complete application question records.
3. Validate JSON image objects as `{src, alt, width, height}`, including permitted local paths and positive dimensions. Validate all content before rendering; formula formatting is not automatically recovered by SQL.
4. Before publishing, check source reuse and corrections, year-specific format, exact total and per-section counts, contiguous original numbers, five options per question, reviewed answer keys, all question reviews and complete/contiguous shared passages. The SQL enforces row-level constraints and relationships, NOT these cross-row editorial/publication rules. The future publication service must enforce them in one transaction. Keep is_published false until that service and validation are implemented.
5. Treat explanations as a separate review. Do not display unreviewed explanations or claim they are official. Record corrected/withdrawn questions explicitly with review notes before deciding scoring.
6. Bump content_version for content changes and include that version in saved-attempt invalidation. The importer must maintain updated_at on updates (no timestamp trigger is installed).

No attempt/lead tables are included: the current exam still uses browser storage. Contact capture and server persistence can be designed when that flow is implemented.

## Local validation

The SQL was executed against disposable in-memory PostgreSQL (PGlite), with fixture roles representing Supabase. Checks covered table creation, all seven RLS flags, anonymous/authenticated access denial, server-role reads, answer-option foreign keys, duplicate question numbers, draft guards and rollback on accidental rerun. No live database or environment connection string was used. This does not simulate Supabase-specific event triggers or project-specific privileges.

After your manual run, optional read-only verification:

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'imat_sources', 'imat_papers', 'imat_paper_sections', 'imat_passages',
    'imat_questions', 'imat_question_options', 'imat_answer_keys'
  )
ORDER BY tablename;
```

Expected: seven rows, all with rowsecurity true.
