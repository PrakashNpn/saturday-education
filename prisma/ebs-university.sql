begin;

-- EBS Universität für Wirtschaft und Recht: correction of the existing unpublished record.
--
-- Sources: ebs.edu throughout, in both its English and German trees (individual programme
-- pages, the accreditation and rankings page, about us, locations, and studienfinanzierung).
--
-- Errors corrected in the seeded record:
--  * It claimed EQUIS accreditation. EBS does NOT hold EQUIS. Its accreditations are AACSB,
--    FIBAA, RICS (Master in Real Estate), FPSB Germany, plus German Wissenschaftsrat and
--    Akkreditierungsrat recognition. The overview no longer claims EQUIS.
--  * City was Wiesbaden. EBS's three campuses (Schloss, Burg, Rathaus) are all in
--    Oestrich-Winkel; the Master in Real Estate has moved to Hamburg.
--  * Two seeded programmes do not exist: 'LLM International Business Law' and 'MSc Digital
--    Transformation & Entrepreneurship'. Those rows are reused for the real Full-Time MBA
--    and Master in Business Analytics and AI. Programme names, tuition, durations and
--    intakes were wrong across the board and are replaced from each programme's own page.
--  * Both the overview and the Real Estate description contained em dashes.
--  * intake_months said September; EBS runs August and January intakes.
--
-- Scope (confirmed with user): the 8 English-taught full-time degree programmes. The
-- German-taught Jurastudium (EJP), the part-time German Master in Business and Master in
-- Business for Legal Professionals, and the two doctoral programmes are excluded.
--
-- Set to null because EBS does not publish them and the seeded values could not be
-- verified: acceptance_rate (was 35), graduate_employability (was 92) and
-- international_students (was 45; third-party sources say 30 per cent and 40 per cent).
--
-- is_published is deliberately NOT changed. This record already has a logo and cover, so
-- once you are happy with the data you can publish it with:
--   update public.universities set is_published = true where slug = 'ebs-university';

update public.universities set
  short_description = 'EBS Universität für Wirtschaft und Recht is Germany''s oldest private business school, founded in 1971 in the Rheingau near Frankfurt, offering English-taught bachelor, master and MBA degrees in business, finance, real estate and law, with AACSB accreditation and a Financial Times top-30 Master in Finance.',
  overview = 'EBS Universität für Wirtschaft und Recht is a private university in Oestrich-Winkel in the Rheingau, about an hour from Frankfurt. Founded in 1971 as the European Business School, it is the oldest private business school in Germany, and has been part of the non-profit SRH foundation group since 2016. Around 2,200 students study across three campuses, Campus Schloss, Campus Burg and Campus Rathaus, taught by 44 professors, with the Master in Real Estate now based in Hamburg.

The university is organised into three schools: EBS Business School, EBS Law School and EBS Executive School. Its English-taught portfolio covers two bachelor degrees, four masters of science, a full-time MBA and a part-time Executive MBA run as a dual degree with Durham University. German-taught programmes, including the Jurastudium leading to the first state law examination and part-time masters for working professionals, sit alongside these but require German fluency.

EBS is accredited by AACSB and FIBAA, reaccredited by the German Wissenschaftsrat in 2022, and its Master in Real Estate carries RICS accreditation. Its Master in Finance was ranked 30th worldwide and 2nd in Germany by the Financial Times in 2026, the Master in Management 52nd worldwide, and the school 59th in Europe overall. Students have access to more than 200 partner universities and over 200 corporate partners, and a compulsory semester abroad is built into the bachelor programmes.',
  city = 'Oestrich-Winkel',
  founded_year = 1971,
  total_students = 2200,
  number_of_campuses = 3,
  acceptance_rate = null,
  graduate_employability = null,
  international_students = null,
  intake_months = 'August, January',
  tuition_fee_min = 16890,
  tuition_fee_max = 29780,
  tuition_currency = 'EUR',
  updated_at = now()
where slug = 'ebs-university';

-- All 8 seeded programme rows are renamed onto the real EBS programmes, preserving row ids.
with uni as (select id from public.universities where slug = 'ebs-university')
update public.programs p
set
  slug = v.newslug, name = v.name, degree_level = v.degree_level::"DegreeType", field = v.field,
  campus = v.campus, application_fee = null, tuition_fee_per_year = v.tuition,
  duration_years = v.duration, intake_months = 'August, January', entry_requirements = v.entry_requirements,
  learn_more_url = v.learn_more_url, description = v.description, updated_at = now()
from uni, (values
  ('bsc-business-administration', 'bachelor-in-business-studies-ebs', 'Bachelor in Business Studies (BSc)', 'BACHELOR', 'Business', 'Campus Rheingau, Oestrich-Winkel', 'EUR 8,750/semester', 3, 'A general higher education entrance qualification (Abitur or recognised international equivalent). Proof of English proficiency via IELTS, TOEFL, Cambridge, Pearson or Duolingo. Applicants sit EBS knowledge and personality tests, or can have SAT, ACT or Gaokao results recognised instead, and attend a personal selection interview. There is no numerus clausus grade cutoff.', 'https://www.ebs.edu/en/ebs-business-school/study-programmes/bachelor-in-business-studies', 'EBS''s flagship undergraduate business degree, taught entirely in English over six semesters and 180 ECTS, with an extended seven-semester track (210 ECTS) and a dual-degree track also available. Students choose one of seven specialisations: Business Analytics and AI, Business Psychology and Coaching, Entrepreneurship and Innovation, Finance and FinTech, Marketing and Sales, Real Estate Management, or Strategy and Consulting. The programme builds in at least eight weeks of internships, a compulsory semester at one of EBS''s 200-plus partner universities abroad, a two-week onboarding project in the first semester and a social impact project in the fifth. Tuition is EUR 8,750 per semester, around EUR 54,480 for the full six semesters including all fees, with a EUR 500 reduction for early enrolment.'),
  ('llb-law-economics', 'bachelor-in-law-politics-economics-ebs', 'Bachelor in Law, Politics and Economics (BA)', 'BACHELOR', 'Law', 'Campus Rheingau, Oestrich-Winkel', 'EUR 8,750/semester', 3, 'A general higher education entrance qualification (Abitur or recognised international equivalent). Proof of English proficiency via IELTS, TOEFL, Cambridge, Pearson or Duolingo. Applicants sit EBS knowledge and personality tests, or can have SAT, ACT or Gaokao results recognised instead, and attend a personal selection interview. There is no numerus clausus grade cutoff.', 'https://www.ebs.edu/en/ebs-law-school/programmes/study-law/bachelor-in-law-politics-and-economics', 'An interdisciplinary Bachelor of Arts taught in English across six semesters and 180 ECTS, combining law with political science and business administration rather than training students for the German bar. It suits students aiming at international organisations, public policy, consulting, compliance or corporate roles where legal and political literacy matter. A semester abroad is compulsory. Tuition is EUR 8,750 per semester, around EUR 54,480 for the full six semesters, with a EUR 500 early enrolment bonus for applications by 28 February for the autumn intake or 31 July for the spring intake.'),
  ('msc-management', 'master-in-management-ebs', 'Master in Management (MSc)', 'MASTER', 'Business', 'Campus Rheingau, Oestrich-Winkel', 'EUR 33,780 total', 2, 'A bachelor''s degree of at least 180 ECTS (240 ECTS for the accelerated two-semester track). English proficiency of TOEFL iBT 95 or IELTS 7.0. A valid standardised test result is required: GMAT, GRE, the Business Admissions Test (BAT), the EBSgrad Test or the Common Admissions Test (CAT). There is no fixed application deadline, though EBS recommends applying before 30 June for the autumn intake.', 'https://www.ebs.edu/en/ebs-business-school/study-programmes/master-in-management', 'A general management master taught in English, offered as a four-semester 120 ECTS degree or a two-semester 60 ECTS accelerated track for students who already hold 240 ECTS. Students choose one of four specialisations: Marketing Management and Customer Centricity, Strategic Leadership and Organisational Transformation, Managing Innovation, or Sustainable Business Strategy, and can add a semester abroad, a practice track or a dual degree running to five semesters. The programme placed 52nd worldwide and 6th in Germany in the Financial Times Master in Management ranking, and 64th worldwide in QS 2026. Tuition is EUR 33,780 in total (EUR 7,950 per semester), or EUR 27,830 for the accelerated track, with a EUR 3,000 early enrolment reduction available.'),
  ('msc-finance', 'master-in-finance-ebs', 'Master in Finance (MSc)', 'MASTER', 'Finance', 'Campus Rheingau, Oestrich-Winkel', 'EUR 37,780 total', 2, 'A bachelor''s degree of at least 180 ECTS (240 ECTS for the accelerated two-semester track). English proficiency of TOEFL iBT 95 or IELTS 7.0. A valid standardised test result is required: GMAT, GRE, the Business Admissions Test (BAT), the EBSgrad Test or the Common Admissions Test (CAT). There is no fixed application deadline, though EBS recommends applying before 30 June for the autumn intake.', 'https://www.ebs.edu/en/ebs-business-school/study-programmes/master-in-finance', 'EBS''s highest-ranked programme, placed 30th worldwide and 2nd in Germany in the Financial Times Master in Finance ranking 2026, and 81st worldwide in QS 2026. Taught in English over four semesters and 120 ECTS, with a two-semester accelerated track for holders of a 240 ECTS bachelor''s and a five-semester dual degree option. Students can follow a semester abroad track or a practice track, and benefit from the proximity of Frankfurt, Germany''s financial centre, roughly an hour from campus. Tuition is EUR 37,780 in total (EUR 8,950 per semester), or EUR 30,980 for the accelerated track, with a EUR 3,000 early enrolment reduction.'),
  ('msc-digital-transformation', 'master-in-business-analytics-ai-ebs', 'Master in Business Analytics and AI (MSc)', 'MASTER', 'Business Analytics', 'Campus Rheingau, Oestrich-Winkel', 'EUR 33,780 total', 2, 'A bachelor''s degree of at least 180 ECTS (240 ECTS for the accelerated two-semester track). English proficiency of TOEFL iBT 95 or IELTS 7.0. A valid standardised test result is required: GMAT, GRE, the Business Admissions Test (BAT), the EBSgrad Test or the Common Admissions Test (CAT). There is no fixed application deadline, though EBS recommends applying before 30 June for the autumn intake.', 'https://www.ebs.edu/en/ebs-business-school/study-programmes/master-in-business-analytics', 'A data and artificial intelligence focused management master taught in English, open to bachelor graduates from any field rather than requiring a technical first degree. Offered as a four-semester 120 ECTS programme with semester abroad, practice and dual degree tracks, or a two-semester 60 ECTS accelerated track for holders of a 240 ECTS bachelor''s. The curriculum pairs analytics, machine learning and AI methods with the business context needed to apply them. Tuition is EUR 33,780 in total (EUR 7,950 per semester), or EUR 27,830 accelerated, with a EUR 3,000 reduction for enrolment by 28 February.'),
  ('msc-real-estate', 'master-in-real-estate-ebs', 'Master in Real Estate (MSc)', 'MASTER', 'Real Estate', 'Hamburg (first semester at Campus Rheingau)', 'EUR 33,780 total', 2, 'A bachelor''s degree of at least 180 ECTS (240 ECTS for the accelerated two-semester track). English proficiency of TOEFL iBT 95 or IELTS 7.0. A valid standardised test result is required: GMAT, GRE, the Business Admissions Test (BAT), the EBSgrad Test or the Common Admissions Test (CAT). There is no fixed application deadline, though EBS recommends applying before 30 June for the autumn intake.', 'https://www.ebs.edu/en/ebs-business-school/study-programmes/master-in-real-estate', 'One of Germany''s leading real estate masters, accredited by the Royal Institution of Chartered Surveyors (RICS) since 2013. Taught in English over four semesters and 120 ECTS, with a two-semester accelerated track and a five-semester dual degree option. The programme has relocated its main base to Hamburg, one of Germany''s most active property markets, with the opening semester still taught at Campus Rheingau. Eduniversal ranks it 2nd in Germany for real estate. Tuition is EUR 33,780 in total (EUR 7,950 per semester), or EUR 27,830 accelerated, with a EUR 3,000 reduction for enrolment by 28 February.'),
  ('llm-international-business-law', 'full-time-mba-ebs', 'Full-Time MBA', 'MASTER', 'Business', 'Campus Rheingau, Oestrich-Winkel', 'EUR 29,780 total', 1, 'A bachelor''s degree of at least 180 ECTS plus at least two years of postgraduate full-time work experience. English proficiency of TOEFL iBT 95, IELTS 7.0 or Duolingo 125, and a valid GMAT, GRE, BAT, EBSgrad Test or CAT result.', 'https://www.ebs.edu/en/ebs-business-school/study-programmes/full-time-mba', 'A 60 ECTS general management MBA taught in English, completed in two semesters full-time or four semesters part-time. Entry requires at least two years of postgraduate full-time work experience, so cohorts are smaller and more experienced than on the MSc programmes. EBS is AACSB accredited, ranked 59th in Europe and 5th in Germany in the Financial Times European Business School ranking 2025, and its full-time MBA sits in CEO Magazine''s Global Tier One band. Tuition is EUR 29,780 in total for both the full-time and part-time formats, with early enrolment reductions of EUR 6,000 or EUR 4,000 depending on timing.'),
  ('mba-executive', 'executive-mba-ebs', 'Executive MBA (Durham-EBS Dual Degree)', 'MASTER', 'Business', 'Campus Rheingau and Durham University, UK', 'EUR 44,950 total', 1.5, 'Either a bachelor''s degree of at least 180 ECTS with a minimum of five years of professional experience, or a master''s degree of at least 90 ECTS with a minimum of three years of professional experience. Applicants also submit a curriculum vitae and motivation letter and must demonstrate English proficiency.', 'https://www.ebs.edu/en/ebs-business-school/study-programmes/executive-mba', 'A part-time dual-degree Executive MBA run jointly with Durham University in the UK, awarding a qualification from both institutions and worth 60 ECTS or 180 UK credits. It runs for 18 months, structured as monthly three-day modules over 14 months followed by a four-month strategic business project, with teaching split between the Rheingau campus and Durham and an optional week in Silicon Valley. Entry requires five years of professional experience with a bachelor''s degree, or three years with a master''s. Eduniversal places it in the top 5 in Germany and CEO Magazine ranked it 41st globally. Tuition is EUR 44,950 in total, reduced by EUR 6,000 for applications by 31 March 2026 or EUR 3,300 by 31 May 2026.')
) as v(oldslug, newslug, name, degree_level, field, campus, tuition, duration,
  entry_requirements, learn_more_url, description)
where p.university_id = uni.id and p.slug = v.oldslug;

-- Replace the 3 seeded scholarships (two of which do not exist) with EBS's real awards
-- that are open to international students. Germany-residence-only and EU-only schemes
-- (Vogel & Detambel, Votum-Stiftung, Studienstiftung, BAföG, KfW, EBS Education Fund) are
-- excluded, as are the income-share loan products, which are financing rather than awards.
delete from public.scholarships
where university_id = (select id from public.universities where slug = 'ebs-university');

insert into public.scholarships (id, university_id, name, type, description, value, learn_more_url,
  created_at, updated_at)
select gen_random_uuid(), uni.id, v.name, v.type::"ScholarshipType", v.description, v.value,
  'https://www.ebs.edu/studienfinanzierung', now(), now()
from (select id from public.universities where slug = 'ebs-university') as uni,
(values
  ('EBS Global Diversity Scholarship', 'PARTIAL', 'A tuition reduction for talented international students from varied cultural, social and economic backgrounds who demonstrate academic excellence and leadership potential. EBS does not publish a fixed award percentage. Applicants may apply for only one EBS scholarship.', null),
  ('EBS Women in Leadership Scholarship', 'PARTIAL', 'A tuition reduction for ambitious, high-performing women who show clear leadership potential, academic excellence and a commitment to driving positive change in their communities and industries. EBS does not publish a fixed award percentage, and applicants may hold only one EBS scholarship.', null),
  ('EBS Future Leaders Scholarship', 'PARTIAL', 'A tuition reduction aimed at emerging talent from economically disadvantaged backgrounds who demonstrate drive and ambition, evidenced either by academic excellence or by other significant achievements. EBS does not publish a fixed award percentage.', null),
  ('HS SimpliCon Scholarship', 'MERIT_BASED', 'Covers 20 per cent of tuition for the standard period of study, awarded every two years to one student on an EBS Master of Science programme. Open to both German and international master''s students and requires excellent academic results alongside extracurricular engagement and demonstrated financial need.', '20% of tuition'),
  ('Teach for India Scholarship', 'PARTIAL', 'As a partner of Teach for India, EBS guarantees alumni of the Teach for India Fellowship a waiver of at least 20 per cent of tuition on admission to the MBA programme.', 'At least 20% of tuition'),
  ('EBS LATAM Excellence Scholarship', 'PARTIAL', 'A tuition reduction for students from across Latin America who show exceptional academic achievement, leadership potential and a strong commitment to contributing to their local communities. EBS does not publish a fixed award percentage.', null),
  ('Deutschlandstipendium', 'MERIT_BASED', 'A nationally funded scholarship worth EUR 300 per month for one year, split equally between private sponsors and the German federal government. Open to first-semester students across all disciplines except doctoral candidates, awarded on convincing grades together with social commitment and exceptional personal achievement. Funding begins on 1 September each year.', 'EUR 300 per month')
) as v(name, type, description, value);

-- Rewrite the admission steps: the seeded version quoted an unverified 35 per cent
-- acceptance rate and a blocked-account figure that changes annually.
with uni as (select id from public.universities where slug = 'ebs-university')
update public.admission_steps s
set title = v.title, description = v.description, updated_at = now()
from uni, (values
  (1, 'Choose Your Programme and Check the Entry Requirements', 'EBS teaches two bachelor degrees, four masters of science, a full-time MBA and a part-time Executive MBA in English, with intakes in August and January. Bachelor entry needs a recognised school leaving qualification; masters need a bachelor''s of at least 180 ECTS; the MBA needs two years of work experience and the Executive MBA five years. There is no numerus clausus grade cutoff.'),
  (2, 'Submit Your Application with Language and Aptitude Test Results', 'Apply directly through the EBS website with transcripts, a CV and supporting documents. Bachelor applicants sit EBS knowledge and personality tests, or can substitute recognised SAT, ACT or Gaokao results. Master and MBA applicants submit a GMAT, GRE, Business Admissions Test, EBSgrad Test or Common Admissions Test result. English proficiency is required throughout: IELTS 7.0 or TOEFL iBT 95 for master and MBA entry.'),
  (3, 'Attend the Selection Interview and Accept Your Offer', 'Shortlisted applicants attend a personal selection interview, held on campus or online. There is no fixed application deadline, but EBS recommends applying before 30 June for the August intake, and early enrolment carries a fee reduction of EUR 500 on the bachelor programmes and up to EUR 6,000 on the MBA.'),
  (4, 'Apply for Your German Student Visa and Enrol', 'Non-EU students apply for a German national visa for study purposes at their local German mission, normally evidencing living costs through a blocked account. Apply as early as possible, since appointment waiting times and processing vary considerably by country. EBS''s international office supports admitted students with visa documentation and arrival.')
) as v(step_number, title, description)
where s.university_id = uni.id and s.step_number = v.step_number;

commit;
