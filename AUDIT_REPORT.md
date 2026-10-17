# Saturday Education: Code Audit Status

Original audit: 2026-04-04. Status of every finding re-checked against the code on 2026-10-17.

All six critical issues and all five warnings from the original audit are resolved or no longer apply. Open items from later reviews are at the end.

## Findings from the April 2026 audit

| # | Original finding | Status | Notes |
|---|---|---|---|
| C1 | `app/page.tsx` had UI logic | Resolved | The file no longer exists. The locale layout and `app/[locale]/page.tsx` are the entry points. |
| C2 | `hero` and `consultation` keys missing in Thai and Burmese | Resolved | Every key exists in all six languages. `tests/i18n.test.ts` fails if one goes missing. |
| C3 | Switzerland image was 34 MB | Resolved | The file is gone. See the open item about large destination photos below. |
| C4 | Prisma schema failed validation on Prisma v7 | Resolved | The connection URL is in `prisma.config.ts`; `npx prisma validate` passes. |
| C5 | Chat send button had no accessible name | Resolved | The chat input was rebuilt, and the widget carries its labels in all languages. |
| C6 | `ChatWidget` lives in a feature folder but renders on every page | Accepted | `app/` may import from `features/` under the architecture rules, so this is allowed. |
| W1 | Testimonials carousel missing ARIA | No longer applies | The auto-slide carousel became a continuous marquee; duplicated items are `aria-hidden`. |
| W2 | No page-specific metadata | Resolved | Pages set their own metadata (`generateMetadata`), translated per language. |
| W3 | No `robots.txt` or sitemap | Resolved | `app/robots.ts` and `app/sitemap.ts` exist (the sitemap lists every language). |
| W4 | `ChatWidget` used a named export | Resolved | It is a default export like the others. |
| W5 | Several images over 500 KB | Resolved | The listed images are gone. `belgium.webp` was 1.2 MB and is now 1920 by 1080 and 455 KB. |
| I1 | No barrel file for landing components | Dropped | Direct imports are the convention. |
| I2 | `any` in `shared/lib/db/prisma.ts` | Resolved | The file no longer uses `any`. |
| I3 | Hardcoded English in `app/page.tsx` | Resolved | Went away with C1. |

## Checks that now run automatically

`npm run typecheck`, `npm run lint` (zero errors and warnings) and `npm test` (unit tests for translations, scoring, lead handling, the Firmli sync, country lists and more). See `README.md`.

## Open items (October 2026 review)

- **Database models never queried:** `User`, `Account`, `Session`, `CareerLead`, `ChatConversation`. Tables `applications`, `application_documents` and `career_preview_explore_cache` exist in the database but not in the schema. Nothing uses them; they were deliberately left alone.
- **Unused message keys:** about 48 English keys (and their translations) are never read, mostly old `destinations`, `universityFinder` and `countryGuide` texts.
- **Native-speaker review** of the Burmese, Vietnamese, Filipino and Indonesian text is still to be done.
