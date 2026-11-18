# CSCA practice

`/csca` reuses Think Asia's server-backed CSCA engine in Saturday's codebase.
Think Asia itself is unchanged. Four subject groups, with STEM/Humanities Chinese
variants, allow one to four full-length papers. Chinese is 80 questions/90 minutes;
Mathematics, Physics and Chemistry are each 48 questions/60 minutes. Each paper has
its own timer and optional breaks before the next paper.

The marketing page is static in all six locales. The page-scoped `csca` namespace
contains interface translations; question text, answer choices, diagrams and
explanations retain their source content/language. Subject availability loads from
the read-only catalogue API, avoiding database work in the static page build.
No client-side answer bank is bundled.

## Database and owner setup

The owner confirmed activation of
`csca-20261101-b3c005994d7d2e7c` on 17 November 2026: 1,433 questions/keys and 36 diagrams.
All runtime table/RPC names start with `saturday_csca_` and use **Saturday's**
`NEXT_PUBLIC_SUPABASE_URL` and server-only `SUPABASE_SERVICE_ROLE_KEY`.
No Think Asia credentials are required or used.

The owner applied `prisma/manual/csca/03-server-schema-access.sql` and confirmed
schema USAGE, table SELECT and RPC EXECUTE are all enabled for `service_role`.
This grants schema usage only to the server role, not browser access. The agent has
not run this grant or any other live mutation. Do not rerun schema creation/import.

Start a local preview of the imported draft with:

```bash
SATURDAY_CSCA_PREVIEW_QUESTION_SET_ID=csca-20261101-b3c005994d7d2e7c npm run dev
```

Then visit `/csca` on that server. If the normal dev command encounters the route
discovery problem seen in this environment, `npm run dev -- --webpack` is supported.
The preview override is server-owned and ignored in production. Production requires
an active release. The owner-run activation is prepared in
`prisma/manual/csca/04-activate-question-bank.sql`; the agent has not executed it.
After activation, remove the preview override and restart the local server.

**Starting a test locally against Supabase writes real Saturday CSCA attempts.**
Saving, submission, expiry recovery and contact capture also update those records.
Submitting contact details can send real emails using the existing Resend key. The
owner performs these manual tests; the agent's automated tests use injected fakes or
disposable in-memory PostgreSQL, never a live attempt/contact/worker.

## Attempts and contact capture

Full-paper assignment, versions, deadlines, saved revisions and grading live in
PostgreSQL functions. Attempts expire after 24 hours. Timers do not pause when the
page is closed. Expiry grades the last answers received before the deadline when the
next authorized API request arrives. Draft saves serialize/coalesce in each tab;
stale-tab revisions are rejected. Questions sharing a passage retain their complete
passage; the inherited selection groups selected passage questions adjacently, but
does not promise inclusion of every question from a source passage.

Saturday-specific HttpOnly cookies (`saturday-csca-owner-v1`,
`saturday-csca-attempt-v1`), capability hashes, tab cache keys and email idempotency
prefixes prevent interchange with Think Asia's attempts. The API enforces same-origin
writes and validates bounded JSON. UUIDs alone do not authorize access. Anonymous
catalogue requests disclose counts/subject labels, not questions or keys. Per-instance
start throttling is a speed bump, not a distributed abuse quota.

Name, email, valid international phone and an explicit privacy acknowledgement are
required before results. No OTP. Contact capture records the completion contact,
`result_email_requested` and timestamp; contact text/phone is not stored in browser
storage. Repeated identical capture is deduplicated; changed details conflict.
The consent wording is part of the deployed UI; no separate consent-version column
is present in this inherited schema. This flow does not sync contacts to Firmli.

## Emails and diagrams

Student results and counsellor notifications use separate persistent delivery rows,
with frozen payloads, leases, bounded retry/backoff and provider idempotency. Result
emails are English, as in the source; six interface translations do not translate
the email templates. Student delivery acceptance is not proof of inbox delivery.
No webhook delivery/bounce integration is included.

Server configuration:

- `RESEND_API_KEY`: existing Saturday transport key.
- `CSCA_FROM_EMAIL`: optional, defaults to `Saturday Education <consultations@saturdayeducation.com>`.
- `CSCA_REPLY_TO_EMAIL`: optional, defaults to `marketing@saturdayeducation.com`.
- `CSCA_NOTIFICATION_EMAIL`: optional comma-separated counsellor recipients, otherwise
  `CONSULTATION_NOTIFICATION_EMAIL`, otherwise `saturdayeducationconsulting@gmail.com`.
- `SATURDAY_CSCA_EMAIL_WORKER_SECRET`: at least 32 random characters for the protected
  POST `/api/csca/email-worker` endpoint. Owner configures a trusted scheduler, suggested
  every five minutes. No job, secret or schedule is installed by the implementation.

Post-contact `after()` processes at most three deliveries. The protected worker handles
additional recipients/retries. If the process dies or no scheduler is configured,
messages can remain queued. The worker must not be called by browser JavaScript.

SVGs remain in the database and are served as image responses only after ownership,
assignment, expiry and contact checks. `saxes` validates a small allowlisted SVG subset
and the stored SHA-256. SVG text never becomes client HTML. No copy of the bank,
private import folder or question keys is a runtime file dependency.

## Verification and outstanding acceptance

- 29 Node test files passed, including eight CSCA tests for validation, ownership
  namespace, projections/gating, bounded HTTP input, draft queue, SVGs and mocked emails.
- Disposable PostgreSQL package check passed with both Chinese tracks and a full
  four-paper lifecycle, grading, revisions, contacts, queue and permission checks.
- TypeScript, scoped ESLint and `git diff --check` passed.
- Scoped production build passed with `--webpack --debug-build-paths '**/csca/page.tsx'`;
  `/[locale]/csca` is static for all six locales. This is not a full-site build claim.
- Design preview: the rotating layered subject deck, subject selection, two-column
  instructions and compact test workspace were checked in an isolated UI-only app
  using sample questions. Desktop and 390px mobile layouts rendered without measured
  horizontal overflow; Thai setup/instructions were also checked. Mobile instructions
  keep their action footer visible while their content scrolls. The deck respects
  reduced-motion preferences and offers manual subject and pause controls.
- The owner has tested the local database-backed flow. Actual email inbox delivery,
  live concurrency and all result/contact locale layouts still need acceptance.
  UI-only checks do not establish database or email behaviour.

The owner confirmed that the bank is active. The preview override is no longer
needed and should be removed from local configuration. Activation SQL was checked
in disposable PostgreSQL, including rerunning it and starting without an override. No application code automatically activates or migrates the
database, and no email or lead is backfilled.


## Landing guide

The guide below the hero adapts Think Asia's local `CscaOverview` structure in
Saturday branding: assessment introduction, preparation benefits, subject formats,
study-direction starting points, practice steps, FAQs and a final setup action.
All copy is in the six locale message files. Formats use the existing paper config;
test questions and server behaviour are unchanged.

Exam format and application context were cross-checked on 17 November 2026 against
Zhejiang Sci-Tech University (`https://admission.zstu.edu.cn/En/Csca?classId=78`)
and China University of Mining and Technology (`https://sac.cumt.edu.cn/en/ADMISSION/CSCA.htm`).
The guide distinguishes this site's English science/mathematics practice from the
additional Chinese versions offered in the official assessment. Current dates, fees
and registration are linked to CSCA instead of being copied into the page.

## Shared test UI

IMAT and CSCA share presentation components in `shared/components/practice-test`: a
header/timer, action buttons, question panel, native radio answer choices, compact
question navigator, dialog/instructions columns and result-contact card/fields.
CSCA's result contact gate is now a page with the same split card as IMAT, replacing
the former modal. It still requires valid name/email/phone and consent before results.
Subject selection, multiple-paper breaks, validation and all server operations stay
in this feature. This change requires no SQL or activation step.

The refactor was checked with the Node suite and isolated browser sample flows for
both tests: answer selection, keyboard radio controls, flags, question navigation,
mobile map toggling, instructions/Escape handling and mock contact submissions.
Fixtures are temporary QA input, not production exam content. No real lead, attempt
or email was created during these browser checks.
