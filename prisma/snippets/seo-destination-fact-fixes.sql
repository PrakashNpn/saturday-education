-- SEO Phase A: destination fact corrections for LIVE Supabase data.
-- Written from a 25 Nov 2026 export of germany / hungary / malaysia / united-kingdom.
-- English fields only. After this runs, re-translate any non-null *_th/_my/_vi/_fil/_idn
-- columns that still contain the old English figures (they fall back to English until then).
--
-- How to run: paste into Supabase SQL editor. Optional: run the VERIFY block first,
-- then the UPDATEs, then VERIFY again.

BEGIN;

-- ═══════════════════════════════════════════════════════════════════════════
-- 1) Germany — blocked account €11,904; work 140 full / 280 half days
-- ═══════════════════════════════════════════════════════════════════════════

UPDATE countries
SET
  overview = 'Germany is one of the world''s top study destinations, home to over 400 higher education institutions and more than 400,000 international students. Renowned for engineering, technology, and business, Germany offers low-cost public universities (often semester fees only) and a growing number of English-taught programmes at private institutions — the route many of our Myanmar students take. With a strong economy, the 18-month Job Seeker Visa, and up to 140 full or 280 half work days per year during study, Germany provides strong value for internationally ambitious students.',
  work_rights = '140 full days or 280 half days per year during study (or about 20 hours/week in lecture periods). Post-study: Job Seeker Visa for 18 months to find work.',
  updated_at = now()
WHERE slug = 'germany';

UPDATE country_faqs
SET
  answer = 'A German blocked account (Sperrkonto) is a special bank account that holds your living expenses for one year (currently €11,904, or €992 per month). You can only withdraw a fixed monthly amount. The German embassy requires proof of this account before issuing a student visa — it guarantees you can support yourself financially without working.',
  updated_at = now()
WHERE id = 'cmq0edkk500jsf1gpjxabzawa';

UPDATE country_faqs
SET
  answer = 'International students can work 140 full days or 280 half days per year (or about 20 hours per week during lecture periods). Working more requires approval from the Federal Employment Agency and your local foreigners'' authority.',
  updated_at = now()
WHERE id = 'cmq0edkk500jtf1gpurk3enre';

UPDATE country_process_steps
SET
  description = 'Once admitted, you''ll receive an official admission letter. Open a German blocked account (Sperrkonto) showing €11,904/year (€992/month) — a mandatory requirement for the student visa to prove financial sufficiency.',
  updated_at = now()
WHERE id = 'cmq0edk7g00jpf1gplg333wx7';

UPDATE country_advantages
SET
  title = 'Affordable Public and Private Options',
  description = 'Public universities often charge no tuition beyond semester fees. Private universities in Germany are still typically cheaper than the UK or USA, with annual fees commonly between €5,000–€20,000 — and many English-taught programmes sit in that private segment.',
  updated_at = now()
WHERE id = 'cmq0edjur00jjf1gp9vfqtde4';

-- ═══════════════════════════════════════════════════════════════════════════
-- 2) Hungary — Stipendium Hungaricum Myanmar caveat (2026/27 call)
-- ═══════════════════════════════════════════════════════════════════════════

UPDATE countries
SET
  overview = 'Hungary has quietly become one of Europe''s better value study destinations, hosting 49,458 international students in the 2025/2026 academic year across more than 60 accredited institutions. Its medical, dental and veterinary schools have taught in English for decades and draw students from across the world, while its engineering and business faculties are increasingly delivered in English too. As a European Union and Schengen member, a Hungarian degree is recognised throughout Europe, and tuition runs well below Western European levels. The government also funds the Stipendium Hungaricum programme, which awards around 5,000 scholarships to international students each year, covering tuition, accommodation and a monthly stipend. Note for Myanmar applicants: Myanmar is not listed as an eligible Sending Partner in the official Stipendium Hungaricum 2026/27 Call for Applications — confirm the latest call on stipendiumhungaricum.hu before planning around this scholarship. Graduates may stay on for up to nine months to look for work.',
  updated_at = now()
WHERE slug = 'hungary';

UPDATE country_faqs
SET
  answer = 'The main one is Stipendium Hungaricum, a Hungarian government programme awarding around 5,000 scholarships a year. It covers tuition in full, accommodation or a housing contribution, a monthly stipend and medical insurance. Individual universities also offer their own partial awards. Note for Myanmar applicants: Myanmar is not listed as an eligible Sending Partner in the official 2026/27 Call for Applications — check stipendiumhungaricum.hu for the current partner list before relying on this route.',
  updated_at = now()
WHERE id = '2d5b5b9e-3537-4731-9395-d128b5900719';

UPDATE country_process_steps
SET
  description = 'You can apply directly to the institution, or through the Stipendium Hungaricum programme if your country is an eligible Sending Partner. Myanmar is not listed in the official 2026/27 call — confirm the latest partner list on stipendiumhungaricum.hu before using the scholarship route. Where eligible, the scholarship has its own deadlines, normally in January, and applications go through your home country''s sending authority.',
  updated_at = now()
WHERE id = 'ece615a5-574b-4e3f-b24a-d07b2b23f6f2';

UPDATE country_advantages
SET
  description = 'The Stipendium Hungaricum programme, funded by the Hungarian government, awards roughly 5,000 scholarships to international students annually. Awards cover tuition in full, provide dormitory accommodation or a housing contribution, a monthly stipend and medical insurance. Myanmar is not an eligible Sending Partner in the official 2026/27 call — verify the current list on stipendiumhungaricum.hu before counting on this scholarship.',
  updated_at = now()
WHERE id = '579a5c25-b92f-40c8-bf48-ff0544c91915';

-- ═══════════════════════════════════════════════════════════════════════════
-- 3) United Kingdom — visa brake + Child Student / A Level pathway
-- ═══════════════════════════════════════════════════════════════════════════

UPDATE countries
SET
  overview = 'The United Kingdom is one of the world''s premier study destinations, home to some of the oldest and most respected universities on the planet — including Oxford, Cambridge, Imperial, and the London School of Economics. Beyond the elite Russell Group, the UK''s post-92 universities and specialist colleges offer outstanding value for international students, with modern campuses, strong industry connections, and a wide variety of programmes across business, engineering, health, law, design, and creative arts. UK degrees are highly respected by employers across Asia and worldwide, and the shorter duration (3-year bachelor''s, 1-year master''s) means lower overall costs compared to studying in the USA or Canada. Important for Myanmar nationals: since 26 March 2026, UK Student visa applications made from outside the UK by Myanmar nationals are refused under the UK''s visa brake (GOV.UK), even with a valid CAS. The Child Student route (ages 4–17), used for A Level study at licensed independent schools, is not on that list — so for many Myanmar families the practical UK pathway today is A Level / Child Student, then university in an open destination. The Graduate Route visa still gives eligible graduates 2 years (3 for PhD) to work in the UK after completing a UK degree. The UK''s diverse, multicultural cities — London, Manchester, Birmingham, Leeds, Edinburgh — provide vibrant environments with established international student communities.',
  updated_at = now()
WHERE slug = 'united-kingdom';

UPDATE country_process_steps
SET
  description = 'Apply online for a UK Student visa using your CAS number, pay the Immigration Health Surcharge (IHS), submit biometrics, and provide financial evidence. Processing takes approximately 3 weeks. Myanmar nationals: since 26 March 2026, Student visa applications made from outside the UK are refused under the UK visa brake (GOV.UK). Ask a counsellor whether a Child Student / A Level route still fits your family, or choose another degree destination.',
  updated_at = now()
WHERE id = 'cmq0eea4f0008j3gpzjbqat1u';

INSERT INTO country_faqs (id, country_id, question, answer, "order", created_at, updated_at)
SELECT
  'faq_uk_visa_brake_' || c.id,
  c.id,
  'Can Myanmar students still get a UK Student visa?',
  'Since 26 March 2026, UK Student visa applications made from outside the UK by Myanmar nationals are refused under the UK visa brake (GOV.UK), even with a valid CAS. The Child Student visa (ages 4–17) for A Level study at a licensed independent school is not on that list. University-level study in the UK from Myanmar is not a practical pathway while the brake is in force — ask a counsellor about A Level routes and alternative degree destinations.',
  COALESCE((SELECT max(f."order") FROM country_faqs f WHERE f.country_id = c.id), 0) + 1,
  now(),
  now()
FROM countries c
WHERE c.slug = 'united-kingdom'
  AND NOT EXISTS (
    SELECT 1 FROM country_faqs f
    WHERE f.country_id = c.id
      AND (
        f.id = 'faq_uk_visa_brake_' || c.id
        OR f.question = 'Can Myanmar students still get a UK Student visa?'
      )
  );

-- ═══════════════════════════════════════════════════════════════════════════
-- 4) Malaysia — safer student work wording (EMGS-aligned)
-- ═══════════════════════════════════════════════════════════════════════════

UPDATE countries
SET
  work_rights = 'Up to 20 hrs/week in approved jobs with Immigration approval — typically during semester breaks/holidays over 7 days; confirm timing with your university',
  updated_at = now()
WHERE slug = 'malaysia';

UPDATE country_faqs
SET
  answer = 'International students may work up to 20 hours per week in approved jobs, with Immigration approval. EMGS guidance focuses on work during semester breaks and holidays longer than 7 days — ask your university when you are allowed to work, and which sectors are permitted (for example restaurants, petrol stations, and mini markets).',
  updated_at = now()
WHERE id = 'cmq0eelts013nf1gpj5lf9643';

COMMIT;

-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFY
-- ═══════════════════════════════════════════════════════════════════════════

SELECT slug, work_rights, left(overview, 240) AS overview_start, updated_at
FROM countries
WHERE slug IN ('germany', 'hungary', 'united-kingdom', 'malaysia')
ORDER BY slug;

SELECT c.slug, f.id, f."order", f.question, left(f.answer, 180) AS answer_start
FROM country_faqs f
JOIN countries c ON c.id = f.country_id
WHERE c.slug IN ('germany', 'hungary', 'united-kingdom', 'malaysia')
ORDER BY c.slug, f."order";

SELECT c.slug, s.step_number, s.title, left(s.description, 160) AS description_start
FROM country_process_steps s
JOIN countries c ON c.id = s.country_id
WHERE c.slug IN ('germany', 'hungary', 'united-kingdom', 'malaysia')
  AND (
    s.description ILIKE '%11,904%'
    OR s.description ILIKE '%visa brake%'
    OR s.description ILIKE '%Myanmar%'
    OR s.id IN (
      'cmq0edk7g00jpf1gplg333wx7',
      'ece615a5-574b-4e3f-b24a-d07b2b23f6f2',
      'cmq0eea4f0008j3gpzjbqat1u'
    )
  )
ORDER BY c.slug, s.step_number;
