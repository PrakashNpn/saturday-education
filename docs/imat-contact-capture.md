# IMAT contact capture before results

Implemented on 10 November 2026. Required fields: **full name, email and international phone number**, plus a storage-consent checkbox and privacy-policy link. The instructions disclose this requirement before the timed test begins. The form appears after either manual submission or timer expiry, before the score or answer review is rendered.

## Manual database setup

Run `prisma/snippets/imat-create-leads.sql` **once** in Supabase SQL Editor before using/deploying the new contact flow. It creates one empty table, `public.imat_leads`, with 19 columns and RLS enabled. It does not alter question data, other tables or their policies. A repeat run fails safely rather than assuming an existing table is compatible. No Prisma migration, `db push`, seed or import command is needed. The generated Prisma client has been regenerated locally without connecting to Supabase.

| Columns | Purpose |
| --- | --- |
| id, attempt_id, bank_version | Internal identifier, unique retry key, catalog version |
| full_name, email, phone, locale | Required contact details and UI language |
| exam_mode, paper_slug | Random mock or selected historical paper |
| score, maximum_score, question_count | Server-recalculated practice summary |
| correct_count, incorrect_count, unanswered_count | Result counts |
| completed_at, consent_version, consented_at, created_at | Test completion and storage-consent record |

Expected SQL output: `tablename=imat_leads`, `rowsecurity=true`. Restart the local dev server after setup. Finish a practice test, submit your test contact details, confirm results unlock, then inspect the saved row yourself in Supabase. This final real persistence check is intentionally left to the owner because the agent must not create live data.

## Storage and retry behaviour

- API route: `POST /api/imat/lead`, delegating to IMAT services. It does not import other features or use the consultation/assessment tables.
- The server validates name/email/phone/consent, rejects unsupported/stale/running attempts, and recomputes the score against the current server catalog. An expired attempt is finished at its original deadline before scoring. Client-supplied score fields are ignored.
- Inserts use the unique attempt ID with conflict-safe retry behaviour. Repeating a successful request does not create another lead or overwrite the original contact. Only SELECT and INSERT are granted to the server role by the SQL. Anonymous and authenticated browser roles have no table access and no RLS policies.
- A successful save sets the browser's per-attempt unlock flag. Failed saves retain the completed attempt and entered fields for retry. Refresh before successful submission shows the form again; refresh after success reopens results. Every new attempt starts gated.
- Contact values are not written into browser storage. The browser retains only the attempt and unlock marker. Raw answers are received for validation/scoring but are not stored in the leads table or logged.
- Cross-origin JSON requests are rejected; streamed bodies are capped at 250 KB. A bounded, per-server-instance limit allows 20 submissions per 15 minutes per client key. This is an abuse speed bump, not a distributed quota. A honeypot rejects automated filled submissions.
- No Firmli sync or marketing opt-in is added. A counsellor notification is sent to the existing `CONSULTATION_NOTIFICATION_EMAIL` address, with the same fallback as consultation notifications (`saturdayeducationconsulting@gmail.com`). It reuses the existing `RESEND_API_KEY` and sender `consultations@saturdayeducation.com`; no new email setting or SQL is needed.

## Counsellor notification

After a new lead is saved, Next.js `after()` queues a notification without delaying the student's result. The email includes name, email, phone, random mock or paper year, total score, counts, server-computed section results and completion time labelled in Bangkok time. Its reply-to is the student's email. Both HTML and plain text are provided, with HTML escaping for student-entered values.

Only the request that inserts a new attempt queues mail. Duplicate contact requests leave the existing lead untouched and do not queue another message. Delivery retries once with the same Resend idempotency key and identical content, with each attempt bounded to ten seconds. Missing configuration, delivery failures and scheduling failures are logged without contact data and never block results. The original SDK request cannot be cancelled by this timeout, but any delivery retry uses the same idempotency key.

Delivery is best-effort background work, not a durable outbox: if scheduling fails or both delivery attempts fail, the contact remains saved in Supabase and an operator must investigate the server log. Existing lead rows are not automatically emailed retroactively. The notification change requires no new database columns, migrations or SQL.

This remains self-practice: delivered answer keys are browser-inspectable and the unlock marker is a UX mechanism, not an authentication boundary. Stored scores are recalculated but are not certified/proctored scores. Existing public score messaging remains accurate.

## Verification

- Added offline tests for required/invalid contact fields, consent, honeypot, stale/invalid/running attempts, expiry, scoring, persistence failure/retry, request origin/body bounds, non-cacheable responses and rate limits.
- Verified the manual SQL in disposable PostgreSQL (PGlite): 19 columns, required fields, constraints, unique attempt retry and RLS/anonymous/authenticated denial. This is not a live database test.
- Browser tested the real application and HTTP submission flow using offline questions and a temporary in-memory storage adapter: empty fields, invalid phone, simulated save failure, retry success, result unlock, refresh persistence and a fresh attempt requiring capture again. The real API route was restored after testing; no test adapter or success bypass remains in application code.
- Final form checked at desktop, tablet and 390/320 px mobile widths; no horizontal page overflow. UI copy exists in all six locales. Phone validation loads its library only when the lazy post-test form is submitted.
- Counsellor notification tests use mocked storage, scheduler and email transport only. They cover recipient/configuration reuse, contact/score/section content, HTML escaping, duplicate and concurrent submissions, identical retry keys, timeouts and failures that leave successful contact submissions intact. No real notification was sent during development.

No Supabase writes, emails, CRM requests, commits or pushes were performed by the agent. The owner has confirmed that the lead table exists with RLS enabled and tested a real submission with successful delivery to the counsellor inbox. Do not rerun the table-creation SQL for the notification addition; it needs no database changes.
