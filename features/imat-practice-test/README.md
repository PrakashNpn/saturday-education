# IMAT practice test

Route: `/imat-practice-test`, with the existing locale prefixes. The main navigation exposes it under **Practice Tests**, after Career Assessment; it is also linked from the footer. Two modes only: random mock exams and historical papers. There is no subject-practice mode.

The owner has imported and published all 16 papers for 2011–2026: 1,000 questions, with 680 eligible for random mocks. After an attempt finishes, students enter name, email and phone and consent to storage before viewing results. New leads also trigger a counsellor result email. The owner has confirmed actual inbox delivery. See [contact capture](../../../docs/imat-contact-capture.md) for configuration, validation and delivery limits.

## Runtime boundaries

- `app/[locale]/imat-practice-test/` supplies locale-aware metadata, daily revalidation and the server-loaded catalog. `app/api/imat/lead/route.ts` delegates to the feature service.
- `services/catalogService.ts` uses Prisma SELECT queries against the seven IMAT content tables. Only published papers are loaded, in both development and production. The old `IMAT_DRAFT_PREVIEW` override has been removed.
- `services/databaseCatalog.ts` validates paper formats, source/review metadata, question numbering, five choices, answer membership, local media and complete contiguous passages. Invalid papers are omitted with a generic diagnostic; database failures reach the route error handler. Unreviewed explanations are withheld.
- `components/ExamSession.tsx` owns an engine and browser-storage store for the supplied catalog. There is no process-wide fixture engine. Public paper navigation constants are separate from sample-question fixtures.
- Contact persistence and notification run server-side. The lead table has RLS enabled and no anonymous/authenticated browser access. No CRM/Firmli sync or retrospective mailing is performed.

The loader never runs migrations or imports. The contact endpoint inserts new leads and checks existing attempts for retry deduplication. Database schema/import scripts are owner-run only; `prisma generate` updates the local client without changing the database.

## Exam behaviour

Random mocks use `data/formats.ts`: 60 questions in 100 minutes, sections of 4/5/23/15/13, scoring +1.5/−0.4/0. Selection uses only explicit eligible IDs, with no duplicate questions or split passages. Historical papers use their own stored format, including 80-question papers and quarter-point penalties. Integer-hundredth scoring preserves those penalties exactly.

Past papers retain original question order. Both modes shuffle eligible answer choices once per attempt, retaining source option IDs for scoring. Questions marked `shuffleOptions: false` preserve option order for dependent wording or diagrams. Resuming and answer review use the saved display order, including older attempts created before past-paper shuffling was introduced.

Attempts, answers, flags, choice order, current question, absolute deadline and the latest result use localStorage key `saturday-imat-attempt-v1`. Leaving or refreshing never pauses the timer. Expired attempts finish automatically. A content fingerprint invalidates incompatible saves; removal of the unused preview property preserves the previous published-catalog fingerprint.

The contact unlock marker is saved after successful storage, so a refreshed result stays unlocked and each new attempt starts gated. Names, email addresses and phone numbers are never stored in localStorage. Raw answers and flags are not stored in the database. The server independently validates submitted attempts and recalculates their result summaries.

This is a self-practice tool: the browser receives answer keys, and the contact gate is a UX step rather than an authentication boundary. Stored scores are not proctored or certified. The active runner hides the normal navigation, footer, chat and cookie banner.

## Source corrections and assets

The owner applied the four reviewed practice corrections for 2013 Q5/Q54, 2024 Q55 and 2025 Q52. They now use normal scoring, with the concise notice “Minor source errors have been corrected for practice.” Original content and former full-credit policies remain archived in each record's review metadata. `data/sourceCorrections.json` guards exact corrected content and audit identifiers. The four questions remain excluded from random mocks.

See [source corrections](../../../docs/imat-source-corrections.md) for calculations and the retained manual SQL history. The mapper still validates disclosed all-options-accepted metadata for compatible historical records; it does not silently assign full credit to unknown errors.

Question images live in `public/images/imat/`; database rows store paths, alt text and dimensions. Preserve these assets, schema history and manual SQL snippets. Source PDFs, conversion artifacts and import/publication tooling were archived externally by the owner, and the former research directory is unnecessary at runtime. Source comparison is not independent expert approval or verified rights-holder permission; archived publication evidence records the owner's decision without asserting either.

## Local verification

`npm test` runs pure tests without database/network access. Coverage includes quotas, passages, shuffling, restoration, scoring, publication validation, source corrections, contact validation and mocked persistence/email delivery. `tests/helpers/imatEngine.ts` instantiates sample engines only for tests. The retained database-shaped 2026 fixture does not depend on the external research archive.

For explicit offline development or an isolated build, `IMAT_CONTENT_SOURCE=fixtures` loads original sample questions through a server-side dynamic import, without querying IMAT tables. It is not a fallback for failed database queries. Do not configure it on the live deployment.

```bash
IMAT_CONTENT_SOURCE=fixtures DATABASE_URL=postgresql://offline:offline@127.0.0.1:1/offline DIRECT_URL=postgresql://offline:offline@127.0.0.1:1/offline npm run build -- --debug-build-paths '**/imat-practice-test/page.tsx'
```

A full production build uses normal published content. For read-only database verification, set `PGOPTIONS='-c default_transaction_read_only=on'` when running it. Other pages may also query their content during prerendering. Building does not submit contact forms or send notifications.

Published pages revalidate daily; database content changes can require revalidation or deployment before becoming visible. Earlier browser checks are recorded in [local E2E results](../../../docs/imat-local-e2e-results.md); backup instructions are in [database backup](../../../docs/database-backup.md).
