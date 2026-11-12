# IMAT local end-to-end results

Completed on 9 November 2026. All five requested test areas passed. Testing used a dedicated localhost origin on port 3002 so the user's normal port-3000 browser save was untouched. Supabase access was read-only: an IMAT-only repeatable-read snapshot plus the application's SELECT queries with PostgreSQL read-only mode enabled. No imports, migrations, database writes, commits, pushes or deployments were performed.

| Area | Result | Evidence |
| --- | --- | --- |
| Past papers | Pass | All 16 published papers opened, started and submitted in the browser. The complete 1,000-question snapshot passed mapping, order, section, option and answer checks. |
| Random mocks | Pass after fix | 200 distinct engine-generated mocks kept 60 unique questions and the 4/5/23/15/13 section order. A real browser mock was navigated through all 60 items and checked against the published pool. Its items were all official-source questions. |
| Exam flow | Pass | Answer selection/change/clear, next/previous, direct question navigation, flags, save/leave, refresh/resume, submission cancellation and final submission. Timer continued while away; shuffled option order and selected answers survived refresh. |
| Results and images | Pass | Browser results matched mixed correct/wrong/blank answers, including exact quarter-point penalties. Review filtering reduced a 60-question mock to 59 mistakes/unanswered items when one answer was correct. All 330 referenced images exist, match recorded dimensions and return HTTP 200 with image content. Corrected SVG loaded in the runner. |
| Responsive layouts | Pass | Runner checked at 1280×800, 1024×768, 768×1024, 390×844, 360×640 and 320×568. Setup, instructions and results checked at 1280, 768, 390 and 320 px widths. No page-level horizontal overflow; results table scrolls within its container on narrow screens. |

## Historical formats and corrections

- 2011 and 2012: 80 questions, 120 minutes, +1/−0.25/0; browser results included −0.25 and 0.75 out of 80.
- 2013: 60 questions, 90 minutes; browser score 2.6 for two correct, one incorrect and 57 blank answers.
- 2014–2026: 60 questions, 100 minutes; browser results included 1.5, 1.1 and zero out of 90.
- Verified 2013 Q5 uses pasta consistently and Q54 loads the corrected beam diagram. Verified 2024 Q55 offers the missing-information answer keyed E; 2025 Q52 uses centimetres in every choice. Their concise correction notices appeared before starting, and normal scoring was used. The 2012 Q15=C correction was also exercised in the browser.
- Every full paper was additionally scored offline with all correct, all wrong and all blank answers, and tested for save restoration/expiry.

## Real timer expiry

A temporary development-only route reused the actual IMAT UI and a read-only snapshot of its real catalog, with only the local 2011 paper's duration shortened to six seconds. The open runner automatically submitted at expiry. A second attempt was answered, saved and left; after expiry and refresh its saved result was 1/80 with the automatic-submission notice. This exercised actual browser time and application effects, without changing server clock, browser state through injected scripts or database exam durations. The temporary route/component were removed after testing.

## Fix found during testing

The database loader previously merged development fixtures into the local catalog, allowing sample questions into random mocks. Removed that automatic merge. `IMAT_CONTENT_SOURCE=fixtures` remains the explicit offline sample mode; normal database-backed local sessions now use the same published-only content as production.

## Checks and scope

The 23 test-file suites passed, as did TypeScript, scoped ESLint and whitespace checks. This was functional testing in the available desktop browser with responsive viewport sizes; it was not a physical-device/cross-browser certification or an independent subject-expert review of every source question. No production deployment or production performance measurement was performed.
