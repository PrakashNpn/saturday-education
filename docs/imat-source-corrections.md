# Four corrected IMAT practice items

The owner has applied the SQL and confirmed all four corrected records use normal scoring. No migration, new table/column or RLS change was required. Published question totals and the mock pool remain unchanged. The instructions below are retained as application history; do not rerun the one-time script on the current database.

| Paper | Item | Correction | Normal answer |
| --- | --- | --- | --- |
| 2013 | Q5 | Change the final reference from cereal to pasta, matching the rest of the question. | A: €1.26 |
| 2013 | Q54 | Replace the inconsistent diagram with a new SVG following the text: load 0.50 m from the left end, string 1.0 m from that end, and beam weight at the centre. | A: 0.75 m from the right end |
| 2024 | Q55 | Replace option E with “Cannot be determined from the information given.” No numerical speed or time is invented. | E |
| 2025 | Q52 | Change metres to centimetres in all five dimension choices. | A: 20 cm × 16 cm |

Calculations: Q5 `(1.60 − 0.20) × 0.90 = 1.26`; Q54 `300 × 0.50 = 100 × 0.50 + 80x`, so `x = 1.25 m` from the support and `3 − (1 + 1.25) = 0.75 m` from the right end; Q52 `2(5h/4 + h) = 72`, so `h = 16 cm` and the base is `20 cm`. In Q55, `210 × 5 = 1050 J` gives work magnitude, not numerical power. Without time or numerical speed, no numerical wattage can be selected uniquely.

These are owner-authorized practice corrections calculated by Codex, not official historical errata. Source PDFs: [2013](https://accessoprogrammato.mur.gov.it/compiti/CompitoInglese2013.pdf), [2024](https://accessoprogrammato.mur.gov.it/compiti/CompitoInglese2024.pdf), [2025](https://accessoprogrammato.mur.gov.it/compiti/CompitoInglese2025.pdf). The original 2013 diagram was visually compared with the question's text before redrawing it.

## Manual application history

1. Use the updated application code and `public/images/imat/2013/q54-corrected.svg` asset before applying the SQL. The previous loader requires full-credit policies and will omit these papers after the policies are removed.
2. Run all of `prisma/snippets/imat-correct-source-errors.sql` once in Supabase SQL Editor. It returns four rows with keys A, A, E, A and `normal_scoring=true`. A source mismatch or repeat aborts the entire transaction; do not remove its checks. If a failed transaction remains open in the editor, run `ROLLBACK;` before retrying.
3. Restart/refresh locally and refresh production caches or deploy when ready. Content changes invalidate old saved attempts through the existing catalog fingerprint.
4. Check 2013 Q5/Q54, 2024 Q55 and 2025 Q52: exactly one answer earns credit; incorrect answers incur the paper's normal penalty; blanks score zero. The four items remain excluded from random mocks, leaving 680 published mock candidates.

The script archives original prompts, images, options, answer records, review metadata and full-credit policies inside each item's `review_notes.practiceCorrection.original`. It removes the active full-credit policies and archives each paper's previous long publication notice. Questions receive reviewed explanations for the corrected version. The loader accepts the normal-scoring replacements only when correction identifiers and exact prompts/options/keys/images match the checked-in correction definitions.

Students see “Minor source errors have been corrected for practice.” in About these papers and, for corrected papers, before starting and in results. The instructions use compact count/duration cards, scoring tiles and short icon-led rules. The former full-credit policies and long disclosures are no longer active for these four items.

Verified offline: application tests, quarter-point and normal scoring, corrected-content validation, SQL execution against disposable PostgreSQL (PGlite), archived original content, all-or-nothing rollback on tampering, repeat rejection and unchanged RLS. The compact instruction modal and new diagram were visually checked in a localhost fixture preview. Supabase was queried only through an explicitly read-only transaction to retrieve these four records; the agent did not execute any live database updates.
