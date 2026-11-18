# CSCA integration plan

Status: the owner completed schema/import/verification. The application port is
implemented. The owner activated `csca-20261101-b3c005994d7d2e7c` on 17 November 2026 and confirmed local testing works. Source: `/home/linux/think-asia`,
read-only. Both AGENTS.md files were read. A SELECT-only permissions check was made
against Saturday. The agent made no live data/privilege changes, sent no emails and did not commit,
push or deploy.

Current handoff and tests are documented in
[features/csca-practice-test/README.md](../features/csca-practice-test/README.md).
The owner already applied `03-server-schema-access.sql` and confirmed server schema
USAGE, table SELECT and RPC EXECUTE. No further setup or reimport is needed.

## Boundaries

- Keep the Think Asia project unchanged. Reuse CSCA code/content in Saturday's repo.
- Use Saturday's database connection and `saturday_csca_` tables/RPCs exclusively.
  Even if projects share a physical database, no runtime read/write/claim targets the
  original `csca_` tables/functions. Separate Supabase projects remain preferable for
  credential-level isolation: naming alone does not restrict a broad service-role key.
- Use Saturday-specific HttpOnly cookie names, draft-cache keys, ownership-hash domain,
  email template/idempotency prefixes and a dedicated worker secret. Never accept a
  Think Asia attempt ID/cookie as an identity on Saturday.
- Resolve attribution server-side. Saturday logo, teal palette, absolute links, sender,
  reply-to and counsellor recipients must not come from browser-controlled brand fields.
- Import only immutable question content. No existing attempts, contacts, responses,
  email payloads or delivery records are copied. No historical emails are queued.
- Owner executes SQL manually. No automatic activation or migrations.

## Original implementation order

1. Owner reviews the [manual SQL package](../prisma/manual/csca/README.md), performs
   preflight/setup/import and returns verification results. Content stays draft.
2. Create `features/csca-practice-test` with the existing server-backed CSCA behaviour.
   Preserve full-paper counts/timers, per-paper breaks, atomic assignment, revisions,
   server grading and answer-key gating. Do not replace it with IMAT's client engine.
   IMAT remains a separate feature, with no cross-feature imports.
3. Adapt database transport to Saturday's shared server utilities. Move API request
   handling/business logic into feature services; `app/api/csca/*` stays thin. Add the
   bounded SVG parser/endpoint with explicit dependency review (`saxes` in source).
   Match installed Saturday framework versions rather than copying package.json or
   upgrading Next/React to Think Asia's versions.
4. Create locale-aware `/csca` using `setRequestLocale`, pageMetadata and a page-scoped
   message provider. Add CSCA to the existing Practice Tests dropdown, footer and sitemap.
   Use `@/i18n/navigation`. Follow installed Next docs before implementation; preserve
   request-bound sessions/no-store APIs and review whether catalogue fetching makes the
   landing route dynamic. Prefer a static marketing shell with runtime availability.
5. Replace Think Asia fonts/colours/header/contact links with Saturday design tokens.
   Translate all interface text (including validation/error states, subject labels,
   modal, accessible labels and result controls) into en/th/my/vi/fil/id. Leave question
   content, choices, passages, explanations and diagrams unchanged. Map stable error
   codes to translated UI, rather than showing English server prose.
6. Integrate the contact gate and separate Saturday student/counsellor result emails.
   The port follows Saturday's established IMAT pattern: name, email and phone are
   all required, with an explicit privacy acknowledgement and no OTP. The schema
   supports this without another column change. Email templates remain English.
   CSCA-to-Firmli sync is not part of the inherited source behaviour and is not included
   without a separate requirement.
7. Port email retry/lease processing with Saturday-only SQL RPC names, explicit sender
   and recipient configuration, frozen payloads, bounded retries, idempotency and a
   separate protected worker endpoint/secret. Never run a worker against live queues
   during development. Owner configures scheduler later; deployment alone is not enough
   for unattended retries. Decide email interface language explicitly: six UI languages
   do not silently promise six email templates.
8. Test offline first, then isolated local/staging browser flows, then owner-authorized
   live tests. Check both Chinese tracks, full four-paper flow, refresh/resume, expiry,
   stale tabs, ownership, diagrams, contact gating, duplicate submissions, queue retry,
   mobile/reduced-motion/accessibility and all locales. Regression-test IMAT and lead
   features. Prepare draft activation SQL only after acceptance; owner deploys/activates.

## Audited source chain

The new setup composes the original nine-table schema, revision/session RPCs,
contact/email extension, full-paper functions, team notification functions and the
latest database-SVG projection. It imports the final local 1,433-question snapshot
directly, avoiding historical draft clones and superseded activation scripts.
The historical BCC extension is intentionally omitted: this fresh install has no
legacy messages and uses independent student/team rows.

Source runtime uses server Supabase RPCs, not the legacy exported local bank. The
private content snapshot matches its local release hash. Without querying the live
Think Asia database, this audit cannot establish whether additional unpublished or
later manual database edits exist; they are not automatically copied.

The proposal retains some service-only legacy helper RPCs from the original chain.
Only full-paper start is used by the intended app. Browser roles have no direct
table/RPC access. A later cleanup should not remove helpers until dependencies and
tests prove they are unused.

## Validation performed

See the feature handoff and `scripts/csca/check_package.mjs`. The Node test suite,
TypeScript, scoped lint and scoped builds for both practice-test pages passed after
the shared UI refactor. Both pages remain static for all six locales; the IMAT build
used fixture content and did not query Supabase.

Isolated sample-data browser checks covered desktop/mobile test screens, answer
selection and keyboard controls, flags, navigation, instructions/Escape handling,
translated mobile instructions and mock contact submissions for both tests. These
checks created no live records and sent no emails. The owner separately confirmed
local testing against the active bank. Offline tests do not establish real concurrent
traffic or actual email delivery.
