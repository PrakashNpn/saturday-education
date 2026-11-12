# IMAT predeployment cleanup

Completed locally on 12 November 2026.

## Changes

- Removed the obsolete unpublished-2026 preview query and mapper bypass. Development and production now validate published content identically.
- Removed the fixture engine singleton from the runtime exam service. Tests instantiate it in `tests/helpers/imatEngine.ts`; browser components import only lightweight paper navigation constants. The explicitly requested offline fixture mode remains server-side and dynamically imported.
- Preserved the previous published-catalog fingerprint so the cleanup alone does not invalidate compatible browser saves. Choice shuffling, scoring, timer deadlines, contact capture and notifications retain their existing behaviour.
- Indented the exam/store factory bodies consistently and removed the empty hooks directory.
- Updated the project/feature documentation, correction application status and owner-confirmed counsellor email delivery. Retained runtime images, regression fixtures, source correction guards, SQL snippets and database history.

## Verification

- All 25 test files passed using the Node test runner with the existing tsx loader and test setup.
- `npm run typecheck`, full-project `npm run lint` and `git diff --check` passed.
- The full default Turbopack production build passed: 193 pages generated. The six localized IMAT routes are statically prerendered with daily revalidation; `/api/imat/lead` remains dynamic.
- Production browser JavaScript chunks contain neither the development sample-paper identifier nor the original sample-source marker.
- The first restricted build stalled during compilation and was cancelled. The bounded retry with network access completed, with `PGOPTIONS='-c default_transaction_read_only=on'` set for database sessions. No migration, import, contact submission, email, commit, push or deployment was performed.

Earlier functional browser checks remain documented in `imat-local-e2e-results.md` and `imat-contact-capture.md`. This cleanup did not repeat the full manual browser suite or certify independent question accuracy or content-reuse rights.
