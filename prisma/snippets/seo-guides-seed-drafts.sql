-- SEO Phase B: English guide DRAFTS for LIVE Supabase.
-- Generated from the saturday_seo_aeo_pack articles.
-- ALL rows have is_published = false. Fact-check, then publish with UPDATE.
-- Run AFTER prisma/migrations/20261125120000_add_guides/migration.sql
-- Safe to re-run: deletes prior seed slugs listed below, then re-inserts.

BEGIN;

-- Remove previous drafts for these slugs (keeps any manually added guides).
DELETE FROM public.guide_faqs
WHERE guide_id IN (SELECT id FROM public.guides WHERE slug IN (
  'uk-visa-ban-myanmar-students-a-level',
  'malaysia-private-university-fees',
  'cheapest-country-to-study-abroad-myanmar',
  'student-visa-checklist-myanmar',
  'top-universities-thailand-myanmar-students',
  'hungary-scholarships-myanmar-students',
  'part-time-work-minimum-wage-by-country',
  'private-universities-germany-myanmar',
  'study-in-canada-myanmar-students',
  'study-in-new-zealand-myanmar-students',
  'study-in-ireland-myanmar-students',
  'study-in-italy-myanmar-students',
  'study-in-finland-myanmar-students',
  'study-in-china-myanmar-students',
  'study-in-switzerland-myanmar-students'
));
DELETE FROM public.guides WHERE slug IN (
  'uk-visa-ban-myanmar-students-a-level',
  'malaysia-private-university-fees',
  'cheapest-country-to-study-abroad-myanmar',
  'student-visa-checklist-myanmar',
  'top-universities-thailand-myanmar-students',
  'hungary-scholarships-myanmar-students',
  'part-time-work-minimum-wage-by-country',
  'private-universities-germany-myanmar',
  'study-in-canada-myanmar-students',
  'study-in-new-zealand-myanmar-students',
  'study-in-ireland-myanmar-students',
  'study-in-italy-myanmar-students',
  'study-in-finland-myanmar-students',
  'study-in-china-myanmar-students',
  'study-in-switzerland-myanmar-students'
);

-- 1. uk-visa-ban-myanmar-students-a-level
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'uk-visa-ban-myanmar-students-a-level',
    'UK Student Visa Ban for Myanmar Students: What Changed and Is A Level Still Possible?',
    'UK Student Visa Ban for Myanmar: A Level Route Explained',
    'Since 26 March 2026 UK Student visas for Myanmar nationals are refused. What the visa brake means, why A Level (Child Student) still works, and options.',
    'Since 12:01am on 26 March 2026, the UK refuses every Student visa application made from outside the UK by a Myanmar national, even with a valid CAS. This "visa brake" does not list the Child Student visa (ages 4–17), so A Level study at an independent school is still possible. University-level study in the UK is not.',
    '## What is the UK "visa brake"?

The visa brake is a UK government restriction that automatically refuses certain visa routes for certain nationalities. UK Visas and Immigration published it on 5 March 2026 and it came into force on **26 March 2026**.

According to GOV.UK, the brake currently applies to:

- **Student visa** applications made outside the UK by main applicants who are nationals of **Afghanistan, Cameroon, Myanmar and Sudan**
- Skilled Worker visa applications made outside the UK by Afghan nationals

GOV.UK states that applications are refused "even if you already have a valid Certificate of Sponsorship (CoS) or a valid Confirmation of Acceptance for Studies (CAS)". The brake is based on the main nationality you declare on the form, not where you live.

## Does the ban affect students already in the UK?

No. If you already hold a valid UK visa, it is not cancelled. You keep your permission until it expires, and you can still apply **in-country** for an extension or another route if you are eligible. The brake only stops **new applications from outside the UK**.

## Can Myanmar students still study A Level in the UK?

Yes, through the **Child Student visa**, which is a separate route and is not on the visa brake list. Key rules from GOV.UK:

| Child Student visa | Rule (GOV.UK, checked 22 Nov 2026) |
|---|---|
| Age | 4 to 17 when you apply |
| Where you can study | An **independent (fee-paying) school** that is a licensed Child Student sponsor |
| Not allowed | Study at a further or higher education institution (so no university) |
| Length of stay (age 16–17) | Course length, up to **3 years**, plus 4 months |
| Visa fee (outside UK) | **£558** (≈ 3.3 million MMK, approx.) + Immigration Health Surcharge |
| Decision time | Usually within **3 weeks** (outside UK) |
| Work (age 16+) | Up to **10 hours a week** in term, full-time in vacations |
| Other conditions | Parental consent, suitable accommodation, enough money for fees and living |

**Important:** the Child Student route is only for under-18s. A student who is 18 or over must use the Student visa, which is the route the brake blocks for Myanmar nationals applying from outside the UK.

## What about university in the UK after A Level?

The brake is reviewed regularly, and GOV.UK says it "is not permanent", but there is no end date. Planning a UK degree from Myanmar today is risky, and we don''t recommend it. Many families now use UK A Levels (or an international A Level programme) as an internationally recognised school-leaving qualification and then go to university in a country that is open to Myanmar students.

## Best alternatives to a UK degree for Myanmar students

These countries remain open to Myanmar applicants and accept A Level results:

| Country | Why families choose it | Typical yearly tuition (example) | Living money you must show |
|---|---|---|---|
| Malaysia | UK/Australian branch campuses, English-taught, close to home | Taylor''s Business ≈ RM45,400 (≈ 49.9M MMK) | No fixed amount; EMGS processing RM1,728 |
| Ireland | English-speaking, EU, Stamp 2 work rights | Dublin Business School bachelor''s €10,365 (≈ 51.5M MMK) | €10,000 per year |
| Netherlands | Many English-taught bachelor''s | Wittenborg BBA €11,800 (≈ 58.7M MMK) | 12 × IND "study norm" |
| New Zealand | Post-study work up to 3 years | Univ. of Canterbury Arts NZ$36,410 (≈ 90.7M MMK) | NZ$20,000 per year |
| Canada | Colleges and universities, PGWP | Varies by institution | CAD 23,448 per year (outside Quebec) |
| Germany (private) | Engineering/business in English | Constructor University €23,850 (≈ 118.6M MMK) | €11,904 per year (blocked account) |

*MMK figures are approximate: RM at 1 RM = 1,100 MMK; other currencies crossed via ECB reference rates of 20 Nov 2026 (1 EUR ≈ 4,972 MMK, 1 NZD ≈ 2,490 MMK, 1 GBP ≈ 5,937 MMK).*

Read more: [Cheapest country to study abroad for Myanmar students](/guides/cheapest-country-to-study-abroad-myanmar) and [Student visa checklist for Myanmar applicants](/guides/student-visa-checklist-myanmar).

## How to plan if your child is 15–17 now

1. **Check age at application.** Under 18 on the day you apply → Child Student is possible. Turning 18 during the course is not the same as applying at 18; ask the school and a counsellor about extensions before you commit.
2. **Choose a licensed independent school** that offers A Level and boarding or approved homestay.
3. **Prepare money evidence** for fees plus living costs, and parental consent documents.
4. **Plan the university step now.** Shortlist Malaysia, Ireland, the Netherlands, New Zealand or Canada so A Level subject choices match entry requirements.
5. **Keep watching GOV.UK.** The brake is reviewed regularly; any change will be published on the visa brake page.


## Talk to us

Not sure whether the A Level route fits your child''s age and budget? Book a free 30-minute consultation with Saturday Education in Yangon or Bangkok. Parents are welcome. [Book a free consultation](/#consultation) · [Explore courses in the course finder](/course-finder)
',
    '- GOV.UK, Visa brake: changes to the UK visa system (published 5 Mar 2026, updated 26 Mar 2026): https://www.gov.uk/guidance/visa-brake-changes-to-the-uk-visa-system
- GOV.UK, Child Student visa: https://www.gov.uk/child-study-visa ; what you can and cannot do: https://www.gov.uk/child-study-visa/what-you-can-and-cannot-do
- Fee examples: Taylor''s University fee schedule 2027 (Business); Dublin Business School international fees 2026/27; Wittenborg fees; University of Canterbury 2027 estimates; Constructor University cost of attendance 2027/28 (see the Malaysia, cheapest-country and Germany guides for links).
- Living-money rules: IRCC (Canada), INZ U3.20 (NZ), Irish Immigration Service, Auswärtiges Amt (Germany), IND (Netherlands).
- Exchange rates: ECB euro reference rates, 20 Nov 2026.',
    'myanmar student visa ban uk',
    'uk visa brake myanmar, can myanmar students study in uk, child student visa myanmar, a level in uk for myanmar students, alternatives to uk for myanmar students',
    'united-kingdom',
    false,
    NULL,
    '2026-11-22'::date,
    1
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('Is the UK student visa ban for Myanmar permanent?', 'No end date has been set. GOV.UK says the visa brake is reviewed regularly and is not permanent, but it will only end when the UK government considers it appropriate.', 1),
  ('When did the UK visa brake for Myanmar start?', 'It applies to applications submitted online after 12:01am on 26 March 2026. It was first announced on 5 March 2026.', 2),
  ('Does the visa brake affect the Child Student visa?', 'No. GOV.UK lists only the Student visa (for Afghanistan, Cameroon, Myanmar and Sudan) and the Skilled Worker visa (for Afghanistan). The Child Student visa for ages 4–17 is not on the list.', 3),
  ('Can a Myanmar student with dual nationality apply?', 'The brake is based on the main nationality given on the application. A dual national should take professional advice and must declare all nationalities truthfully.', 4),
  ('How much does a UK Child Student visa cost?', '£558 from outside the UK (about 3.3 million MMK, approximate), plus the Immigration Health Surcharge, school fees and living costs.', 5),
  ('Can my child work on a Child Student visa?', 'Only from age 16: up to 10 hours a week in term time and full-time during vacations.', 6),
  ('What should we do instead of a UK university?', 'Consider Malaysia, Ireland, the Netherlands, New Zealand, Canada or a private university in Germany. All accept A Level results and are open to Myanmar applicants.', 7)
) AS v(question, answer, sort_order);

-- 2. malaysia-private-university-fees
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'malaysia-private-university-fees',
    'Malaysia Private University Fees 2026/27: A Cost Guide for Myanmar Students',
    'Malaysia Private University Fees 2026/27: Myanmar Guide',
    'Official 2026/27 tuition at Malaysian private universities, from RM13,600/yr (≈15M MMK) to branch campuses, plus EMGS visa fees and living costs.',
    'On official 2026/27 fee pages, a private bachelor''s degree in Malaysia costs from about RM13,600 a year (≈ 15 million MMK) at budget universities such as UPTM, around RM45,400 at Taylor''s, and RM51,000–68,000 at UK/Australian branch campuses. Add the EMGS visa (RM1,728) and about RM1,800–4,000 a month to live.',
    '## Is studying in Malaysia expensive?

Not compared with Western countries. Malaysia is one of the most affordable places for Myanmar students to earn an English-taught degree, and many programmes are only three years long. But fees vary a lot, from about RM40,000 for a whole degree to more than RM200,000. The right choice depends on your budget, your subject and whether you want a foreign-branded degree.

All MMK figures below use **1 RM = 1,100 MMK** and are approximate. Fees are tuition only unless stated; many universities add **6% SST** (sales and service tax) and registration charges.

## Budget private universities (cheapest official fees)

| University (city) | Cheapest popular bachelor''s | Tuition / year | ≈ MMK / year | 3-year total |
|---|---|---|---|---|
| UPTM – Universiti Poly-Tech Malaysia (Cheras, KL) | BBA (Hons) | RM13,600 | 15.0M | RM40,800 |
| Widad University College (Kuantan) | BBA / Economics (Hons) | ≈ RM14,333* | 15.8M | RM43,000* |
| UniKL Business School (Kuala Lumpur) | BBA Management & Entrepreneurship | RM15,600 (+6% SST) | 17.2M | RM46,800 |
| UNISEL – Universiti Selangor (Shah Alam) | Business Management (Hons) | RM15,820 | 17.4M | RM47,460 |
| MMU – Multimedia University (Cyberjaya/Melaka) | Communication / Business | ≈ RM23,700–24,700 (+6% SST) | 26.1M–27.2M | RM71,000–74,000 |

*Widad''s page doesn''t say if RM43,000 is per year or per programme; we read it as the programme total. Confirm with the university.

These are mostly Malay-majority campuses. They teach in English, but compulsory MPU subjects include Malay-language courses, and campus life is less international than at the big Klang Valley private universities. UniKL Engineering is also good value at about **RM19,500 a year** (RM9,750 per semester).

## Mid-range and well-known private universities

| University | Example programme | Tuition / year | ≈ MMK / year |
|---|---|---|---|
| **Taylor''s University** ✅ partner (Subang Jaya) | Bachelor of Business (Hons), 2027 intake | ≈ RM45,400 (RM136,200 for 3 years; RM165,034 all-in with SST) | 49.9M |
| APU (Kuala Lumpur) | Computing / Business | RM34,900–37,500 | 38.4M–41.3M |
| HELP University | Business / Psychology | ≈ RM33,400 / ≈ RM37,600 | 36.7M / 41.4M |

Taylor''s is ranked **#272 in the QS World University Rankings 2027**. Other Saturday partners in Malaysia include **Heriot-Watt University Malaysia**, **Lincoln University College** and **City University Malaysia**. Lincoln and City don''t publish international fees online, so ask us for their current official fee sheet.

## UK and Australian branch campuses

| Branch campus | Programme | Tuition / year | ≈ MMK / year |
|---|---|---|---|
| **Heriot-Watt University Malaysia** ✅ partner (Putrajaya) | Undergraduate degrees | RM51,007–59,530 | 56.1M–65.5M |
| University of Nottingham Malaysia (Semenyih) | Engineering | RM67,000 | 73.7M |
| Monash University Malaysia (Subang Jaya) | Engineering | RM68,160 | 75.0M |
| Curtin Malaysia / Swinburne Sarawak | Engineering | ≈ RM51,000 | 56.1M |

Branch campuses award the same degree as the home university, which is why they cost more.

## How much does medicine cost in Malaysia?

Medicine (MBBS/MD) is the most expensive course: roughly **RM75,000–150,000 a year** (≈ 82.5M–165M MMK). Official examples: University of Cyberjaya about RM81,000, NUMed RM134,200, IMU RM138,536 and Monash RM148,320 a year.

## Malaysia student visa (EMGS) fees

Your university applies for your Student Pass through **Education Malaysia Global Services (EMGS)**. Official EMGS fees for a new student at a private institution (course longer than six months):

| Item | Fee |
|---|---|
| EMGS processing fee | RM1,600 + 8% service tax = **RM1,728** (≈ 1.9M MMK) |
| eVAL | RM150 (+8% SST) |
| Medical screening | RM250 |
| i-Kad | RM50 |
| Student Pass sticker | RM60 |
| Compulsory insurance | from RM468 a year |
| Yearly renewal processing | RM250 |

Universities also charge their own one-time fees. For example, MMU''s payment on acceptance is RM10,100 (registration, international processing, deposit and advance fee).

## Cost of living in Malaysia for students

- **Taylor''s University** (official estimate, Subang Jaya): **RM1,800–4,000 a month** (≈ 2.0M–4.4M MMK), excluding tuition. Off-campus single rooms are RM700–1,200 and on-campus twin-sharing rooms RM1,200–1,800.
- **Education Malaysia** (government agency, quoting a third-party estimate): about **USD 582 a month** (≈ RM2,395 ≈ 2.6M MMK).
- Rental listings show shared rooms in KL from about **RM500 a month**. Johor Bahru is only about 5% cheaper than KL overall; Penang is about 14% cheaper.

## Can I work part-time in Malaysia?

Only in a limited way. International students may work up to **20 hours a week** in approved sectors (such as restaurants, petrol stations, mini-markets and hotels), with Immigration approval through the university. EMGS says this is only during semester breaks or holidays longer than seven days. Don''t plan to pay tuition from part-time work.

## Total cost example (3-year degree)

| Budget level | Tuition (3 yrs) | Living (36 months) | Visa (yr 1) | Approx. total |
|---|---|---|---|---|
| Budget (UPTM BBA) | RM40,800 | RM64,800 (at RM1,800) | RM1,728 | ≈ RM107,300 (≈ 118M MMK) |
| Mid-range (Taylor''s Business, all-in) | RM165,034 | RM64,800–144,000 | included | ≈ RM229,800–309,000 (≈ 253M–340M MMK) |


## Get a personalised Malaysia budget

Tell us your grades, subject and budget, and we''ll shortlist universities that fit, including partner scholarships. [Book a free consultation](/#consultation) · [Search Malaysian courses](/course-finder) · [Malaysia destination guide](/destinations/malaysia)
',
    '- UPTM BBA: https://www.uptm.edu.my/index.php/bachelor-of-business-administration
- Widad international fees: https://www.widad.edu.my/uc/international/tuition-fees
- UniKL BBA: https://www.unikl.edu.my/programme/bachelor-of-business-administration-hons-in-management-and-entrepreneurship/
- UNISEL: https://unisel.edu.my/program-post/bachelor-of-business-management-hons/
- MMU international fee schedule: https://www.mmu.edu.my/wp-content/uploads/2026/10/UG-Fee-Structure-International-20260921.pdf
- Taylor''s Business fee schedule: https://university.taylors.edu.my/content/dam/taylorsrevamp/university/study/scholarships-and-financial-aid/fees-schedule/taylors-business-school/undergraduate/taylors-fees-schedule-ug-business-usd.pdf ; Taylor''s cost guide (20 Jan 2026): https://university.taylors.edu.my/en/student-life/news/2026/living-the-dream-cost-guide-for-indian-students-at-taylors.html ; QS: https://university.taylors.edu.my/en/discover-us/about-taylors/achievements-and-recognitions/qs-rankings.html
- Heriot-Watt Malaysia fees: https://www.hw.ac.uk/malaysia/study/fees-and-funding/tuition-fees
- Monash Malaysia fees 2027: https://www.monash.edu.my/study/undergraduate/fees ; Nottingham Malaysia MEng: https://www.nottingham.edu.my/Study/Undergraduate-courses/Mechanical-Materials-and-Manufacturing-Engineering/Mechanical-Engineering-MEng-Hons.aspx
- IMU fees: https://www.imu.edu.my/wp-content/uploads/programme/fees-undergraduate-international.pdf ; NUMed: https://www.ncl.ac.uk/numed/study-with-us/international-students/courses-and-fees/ ; Cyberjaya: https://cyberjaya.edu.my/admission/fees/international-fees-structure
- EMGS fee schedule: https://visa.educationmalaysia.gov.my/media/cms_upload/Schedule_fees_for_student_dependant_pass_app_28.10.2025.pdf ; cost of living: https://educationmalaysia.gov.my/plan-your-studies/plan-your-budget/cost-of-living ; FAQ (work): https://educationmalaysia.gov.my/Get-In-Touch/FAQ
- City cost comparison: Numbeo (Nov 2026); rents: iBilik, PropertyGuru, Mudah listings (Nov 2026) – market data, not official.',
    'malaysia private university fees for myanmar students',
    'is studying in malaysia expensive, cheapest private university in malaysia, malaysia student visa fee, EMGS fee, cost of living in malaysia for students, study in malaysia myanmar',
    'malaysia',
    false,
    NULL,
    '2026-11-22'::date,
    2
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('What is the cheapest private university in Malaysia for international students?', 'On official fee pages checked in November 2026, UPTM''s BBA is the cheapest we found at RM40,800 for three years (about RM13,600 a year, ≈ 15 million MMK).', 1),
  ('How much is the Malaysia student visa fee?', 'The EMGS processing fee for a new private-university student is RM1,600 plus 8% tax (RM1,728). Medical screening, insurance and other small fees are extra.', 2),
  ('How much money do I need per month in Malaysia?', 'Plan for RM1,800–4,000 a month (≈ 2.0M–4.4M MMK) depending on city and housing, according to Taylor''s University''s estimate.', 3),
  ('Are Malaysian degrees recognised?', 'Check that the programme is accredited by the Malaysian Qualifications Agency (MQA) on the Malaysian Qualifications Register. Branch campuses award the same degree as their home university.', 4),
  ('Do Malaysian universities charge SST?', 'Many do. A 6% sales and service tax applies to many private higher-education fees, so check whether a quote includes SST.', 5),
  ('What are the intakes?', 'Most universities take students in January/February, May–July and September/October; some also have March or April intakes.', 6),
  ('Is Taylor''s University a Saturday Education partner?', 'Yes. Taylor''s, Heriot-Watt Malaysia, Lincoln University College and City University Malaysia are in our course finder.', 7)
) AS v(question, answer, sort_order);

-- 3. cheapest-country-to-study-abroad-myanmar
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'cheapest-country-to-study-abroad-myanmar',
    'Cheapest Country to Study Abroad for Myanmar Students (2026 Comparison)',
    'Cheapest Country to Study Abroad for Myanmar Students 2026',
    'Tuition and visa living-money rules compared for Malaysia, Thailand, Hungary, Italy, Germany, Ireland, the Netherlands, NZ and Canada, in MMK.',
    'For Myanmar students, Thailand and Malaysia are the cheapest realistic options: private bachelor''s tuition from about 12–15 million MMK a year on official fee pages, with no fixed visa savings amount. In Europe, Hungary and Italy''s public universities cost least in tuition, but you must still show about 50 million MMK a year in living money for most European visas.',
    '## How we compared countries

"Cheap" means two things for a visa: **tuition** and the **living money the embassy wants to see**. Many families only look at tuition and then get a shock at the bank-statement stage. This guide uses:

- the lowest **official** tuition we could verify for a popular English-taught bachelor''s, with a Saturday partner example where one exists (✅), and
- the **government''s** living-money requirement where one is published.

MMK is approximate: **1 RM = 1,100 MMK**; other currencies crossed via ECB reference rates (20 Nov 2026): 1 EUR ≈ 4,972, 1 THB ≈ 133, 1 NZD ≈ 2,490, 1 CAD ≈ 3,162, 1 AED ≈ 1,232 MMK (AED via its USD peg).

## Comparison table: tuition + visa living money (per year)

| Country | Low-cost tuition example (bachelor''s, per year) | ≈ MMK | Living money required for the visa (per year) | ≈ MMK |
|---|---|---|---|---|
| 🇹🇭 Thailand | Siam University BBA ≈ THB 90,150 | 12.0M | Bank evidence covering tuition + living (no fixed amount) | — |
| 🇲🇾 Malaysia | UPTM BBA RM13,600 · Taylor''s ✅ ≈ RM45,400 | 15.0M · 49.9M | No fixed amount; EMGS checks financial evidence | — |
| 🇮🇹 Italy | Univ. of Bologna reduced fee for "particularly poor countries" (incl. Myanmar) €657 · ESE ✅ €28,000 | 3.3M · 139M | €10,179.85 | 50.6M |
| 🇭🇺 Hungary | Pécs ✅ / Szeged ✅ ≈ €4,400–5,800 | 21.9M–28.8M | Not set as a single official figure (check with the consulate) | — |
| 🇩🇪 Germany (private) | SRH ✅ from €690/month (≈ €8,280) · Constructor ✅ €23,850 | 41.2M · 118.6M | €11,904 (blocked account) | 59.2M |
| 🇮🇪 Ireland | Dublin Business School ✅ €10,365 | 51.5M | €10,000 | 49.7M |
| 🇳🇱 Netherlands | Wittenborg ✅ €11,800 | 58.7M | 12 × IND study norm (€1,130.77/month in 2026 = €13,569) | 67.5M |
| 🇦🇪 UAE | Middlesex University Dubai ✅ AED 64,557 | 79.5M | Not verified | — |
| 🇨🇦 Canada | Varies by college/university | — | CAD 23,448 (outside Quebec) | 74.1M |
| 🇳🇿 New Zealand | Univ. of Canterbury ✅ Arts NZ$36,410 | 90.7M | NZ$20,000 | 49.8M |

✅ = listed in the Saturday Education course finder (partner). Bologna, Siam University and UPTM are not Saturday partners; they''re included because they show the lowest official prices.

## Cheapest in Asia: Thailand vs Malaysia

**Thailand** has the lowest tuition we verified: Siam University''s international BBA is THB 360,600 for four years (≈ THB 90,150 a year, ≈ 12 million MMK). Assumption University''s BBA is about THB 152,250 a year (≈ 20.3M MMK). Living costs in Bangkok vary widely: Mahidol''s student guide puts rent at THB 7,000–30,000 and food at THB 9,000–12,000 a month. The big downside is work: **student part-time work is generally not allowed** without a work permit.

**Malaysia** starts at RM13,600 a year (UPTM) and has far more choice, including UK and Australian branch campuses and partners such as **Taylor''s** and **Heriot-Watt Malaysia**. Taylor''s estimates living costs at RM1,800–4,000 a month (≈ 2.0M–4.4M MMK). See our [Malaysia fees guide](/guides/malaysia-private-university-fees).

## Cheapest in Europe: Italy and Hungary

- **Italy:** Myanmar is on Italy''s official list of "particularly poor" countries, so some public universities charge a very low flat fee (e.g. Bologna €500 + €157.04 a year) and students can apply for regional **DSU** grants. But the visa still requires **€10,179.85 a year** in lawful, traceable funds, and Bologna is not a Saturday partner. Our Italian partner, the European School of Economics, is a private school at €28,000 a year.
- **Hungary:** partner universities Pécs and Szeged charge many non-EU bachelor''s students about €2,200–2,900 a semester. Note: the Stipendium Hungaricum scholarship is **not open to Myanmar** applicants (see our [Hungary guide](/guides/hungary-scholarships-myanmar-students)).

## Mid-cost: Germany (private), Ireland, Netherlands

Germany''s private universities (SRH, Constructor, IU) teach in English and don''t need German, but you must lock **€11,904** in a blocked account for the visa. Ireland (€10,000 living money) and the Netherlands both allow part-time work, which helps with day-to-day costs (not tuition). More in our [Germany private universities guide](/guides/private-universities-germany-myanmar).

## Highest total: New Zealand and Canada

New Zealand and Canada cost the most, but they offer strong post-study work rights: NZ''s post-study work visa can last up to three years after a bachelor''s, and Canada''s PGWP up to three years for programmes of two years or more.

## Which country is cheapest for you?

1. **Lowest total budget:** Thailand or a budget Malaysian private university.
2. **English-taught degree with a recognised foreign brand on a moderate budget:** Malaysia (Taylor''s, Heriot-Watt).
3. **Europe on a budget:** Hungary or Italian public universities, if you can show visa funds.
4. **Work rights after graduation matter most:** New Zealand, Canada or Ireland.

Countries we don''t recommend right now: the **UK** for university (visa brake on Myanmar Student visas since 26 March 2026), and the USA and Australia.


## Get a budget plan for your family

We compare total costs (tuition, visa money, living, flights) across countries for your profile, for free. [Book a free consultation](/#consultation) · [Search partner courses](/course-finder) · [Take the career assessment](/career-assessment)
',
    '- Siam University ICO fees: https://ico.siam.edu/ · Assumption University fee PDF (19 Oct 2026): https://admissions.au.edu/wp-content/uploads/2026/10/Tuition-Fee-Inter-19102026.pdf · Mahidol MUIC living guide (via post-04 research)
- UPTM: https://www.uptm.edu.my/index.php/bachelor-of-business-administration · Taylor''s fee schedule and cost guide (see Malaysia guide)
- University of Bologna fees 2026/27; Italian Embassy Yangon "Studying in Italy": https://ambyangon.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/studying-in-italy/ ; Italian MFA FAQ (€10,179.85): https://www.esteri.it/en/ministero/sportello_info/domandefrequenti/studiare-in-italia/ ; ESE fees: https://www.ese.ac.uk/admission/programme-fees-scholarships
- University of Pécs: https://ktk.pte.hu/en/applicants/application-guide/finances-fees ; University of Szeged: https://eco.u-szeged.hu/english/training-programmes/programmes-for-international-students/business-administration-and-management-bsc/fees-and-scholarships/fees-and-scholarships
- SRH IBA: https://www.srh-university.de/en/bachelor/international-business-administration/b/ ; Constructor: https://constructor.university/admission-aid/financing-undergraduate ; Auswärtiges Amt (€992/month): https://allemagneenfrance.diplo.de/fr-de/service/visa/2521298-2521298
- Dublin Business School fees: https://www.dbs.ie/docs/default-source/fee-sheets/dbs-fees-international.pdf ; Irish Immigration Service finances: https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/a-fee-paying-private-primary-or-secondary-school/information-on-student-finances/
- Wittenborg fees: https://www.wittenborg.eu/fees-finances ; IND: https://ind.nl/en/income-requirements-study
- Middlesex University Dubai fees: https://www.mdx.ac.ae/studentfinance/tuition-fees
- IRCC proof of financial support: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html
- University of Canterbury 2027 fee estimates; INZ Operational Manual U3.20: https://www.immigration.govt.nz/opsmanual/43653.htm
- ECB reference rates 20 Nov 2026: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html',
    'cheapest country to study abroad for myanmar students',
    'cheapest country to study in europe for international students, malaysia vs thailand cost, study abroad low budget myanmar, affordable countries to study abroad',
    NULL,
    false,
    NULL,
    '2026-11-22'::date,
    3
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('Which is the cheapest country to study abroad for Myanmar students?', 'On official 2026 fees, Thailand (from about THB 90,150 a year at Siam University) and Malaysia (from RM13,600 a year at UPTM) are the cheapest realistic options.', 1),
  ('What is the cheapest country in Europe for Myanmar students?', 'In tuition, Italy''s public universities (reduced fees for Myanmar citizens) and Hungary. Both still need visa living money; Italy asks for €10,179.85 a year.', 2),
  ('Is Malaysia cheaper than Thailand?', 'Tuition is usually lower in Thailand, but Malaysia has more English-taught choice and limited part-time work. Total cost depends on the university and city.', 3),
  ('How much money do I need to show for a student visa?', 'It depends on the country: €11,904 (Germany), €10,000 (Ireland), €10,179.85 (Italy), NZ$20,000 (New Zealand) and CAD 23,448 (Canada) a year, plus tuition.', 4),
  ('Can I pay my tuition by working part-time?', 'No. Visas require you to show the money before you go, and part-time hours are capped (for example 20 hours a week in Ireland and 24 in Canada).', 5),
  ('Is it still possible to study in the UK?', 'Only A Level at an independent school on a Child Student visa (under 18). UK Student visas for Myanmar nationals applying from outside the UK have been refused since 26 March 2026.', 6)
) AS v(question, answer, sort_order);

-- 4. student-visa-checklist-myanmar
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'student-visa-checklist-myanmar',
    'Student Visa Checklist for Myanmar Applicants (2026)',
    'Student Visa Checklist for Myanmar Applicants (2026)',
    'Documents, fees and proof-of-funds amounts for Myanmar students applying to Malaysia, Thailand, Germany, Ireland, Italy, NL, Hungary, Canada and NZ.',
    'Almost every student visa open to Myanmar applicants checks three things: a real offer from a recognised school, enough money with a clear source, and that you will follow the visa rules. Prepare your passport, offer letter, six months of bank statements, sponsor documents, transcripts and English test score, then add each country''s own fee and funds amount.',
    '## The core checklist (all countries)

Prepare these before you apply anywhere:

- [ ] **Passport** valid for the whole course (Thailand asks for at least 6 months'' validity)
- [ ] **Offer / acceptance letter** (CAS, LOA, admission letter or confirmation of enrolment)
- [ ] **Academic documents:** matriculation/high school certificate, transcripts, A Level/GED/diploma results, with certified English translations
- [ ] **English test:** IELTS, TOEFL, PTE or Duolingo (if the school requires it)
- [ ] **Bank statements:** usually the **last 6 months**, on bank letterhead, with any large deposits explained
- [ ] **Sponsor documents:** relationship proof (e.g. household list, birth certificate), sponsor''s job or business registration, income evidence
- [ ] **Tuition payment receipt** (if you''ve paid a deposit or the first year)
- [ ] **Health insurance** (compulsory in most countries)
- [ ] **Passport photos** in the country''s size
- [ ] **Statement of purpose** explaining why this course, why this country and your plan after graduation

**Tip:** officers look for consistency. The money in your bank statement, the sponsor''s income and the story in your statement of purpose must match.

## Country-by-country requirements

| Country | How Myanmar applicants apply | Visa fee | Living money to show (per year) |
|---|---|---|---|
| 🇲🇾 Malaysia | University applies to **EMGS** for your Student Pass | EMGS processing RM1,728 (≈ 1.9M MMK) + medical RM250, insurance from RM468 | No fixed amount |
| 🇹🇭 Thailand | **Non-Immigrant ED** visa, online at thaievisa.go.th (Royal Thai Embassy Yangon) | **USD 80** | Bank statement/sponsor letter covering tuition + living (no fixed amount) |
| 🇩🇪 Germany | German Embassy Yangon (appointment) or the Consular Services Portal | **€75** (paid in USD cash), about 4 weeks | **€11,904** (€992/month), usually in a blocked account |
| 🇮🇪 Ireland | Online via **AVATS**; no Irish embassy in Myanmar – send documents where your summary form says | **€60** (single entry) | **€10,000** + course fees |
| 🇮🇹 Italy | **Universitaly** pre-enrolment, then Type D visa at the Italian Embassy Yangon | — | **€10,179.85**, lawful and traceable |
| 🇳🇱 Netherlands | The university applies to the **IND**; MVV sticker usually collected at the Dutch Embassy in Bangkok | **€254** (IND) | 12 × study norm (€1,130.77/month in 2026) |
| 🇭🇺 Hungary | Residence permit for study (with a D visa); mission for Myanmar to be confirmed | **€110** | Check with the mission |
| 🇨🇦 Canada | Online (IRCC) + biometrics; most applicants need a **PAL/TAL** | **CAD 150** + CAD 85 biometrics | **CAD 23,448** (outside Quebec, from 1 Sep 2026) + tuition + travel |
| 🇳🇿 New Zealand | Online (Immigration NZ) | **NZ$850** total (NZ$485 fee + NZ$265 levy + NZ$100 IVL) | **NZ$20,000** (study of 36 weeks or more) + tuition |
| 🇬🇧 UK (A Level only) | **Child Student** visa (ages 4–17) | **£558** + health surcharge | Fees + living money |

MMK is approximate (1 RM = 1,100 MMK). For other currencies see our [cheapest country guide](/guides/cheapest-country-to-study-abroad-myanmar).

## Malaysia (EMGS Student Pass)

Accept your offer and pay the deposit; the university submits your application to EMGS. You''ll pay the EMGS fees, do a medical screening (on arrival or at an EMGS-approved clinic) and buy the compulsory insurance. EMGS advises applying at least 30 days before departure. Read the [Malaysia fees guide](/guides/malaysia-private-university-fees).

## Thailand (Non-ED visa from Yangon)

According to the Royal Thai Embassy Yangon, you need a passport (6+ months), photo, a **letter of acceptance** on university letterhead signed by an authorised person (with the school licence copy), and **financial evidence** covering tuition and living costs. The fee is **USD 80**; the visa is valid for 3 months with a 90-day stay, which you extend in Thailand (up to 1 year at a time).

## Germany

Book an appointment at the German Embassy Yangon. Bring your admission letter, blocked-account confirmation showing the total deposited and the monthly amount, health insurance and passport. Private universities such as SRH and Constructor (both Saturday partners) issue admission letters in English. See [private universities in Germany](/guides/private-universities-germany-myanmar).

## Ireland

Apply online through AVATS. The Irish Immigration Service requires **immediate access to at least €10,000** for the first year and €10,000 for each later year, plus fees. Bank statements must be on headed paper and cover the last six months; credit cards are not accepted. Degree students may use an **education bond** of at least €10,000 instead.

## Canada and New Zealand

Canada asks you to prove you can pay tuition, **CAD 23,448** living costs (single applicant, outside Quebec) and travel, without working in Canada, and that you''ll leave when your permit expires. New Zealand needs **NZ$20,000 a year** for living costs (less prepaid accommodation) on top of tuition; sponsors must show they genuinely hold the funds.

## Common reasons for refusal (and how to avoid them)

1. **Unexplained deposits** – a large sum appearing just before applying. Keep funds in the account for months, and document the source (sale of land, business income, savings).
2. **Weak study plan** – can''t explain why this course and country. Prepare a clear statement of purpose.
3. **Inconsistent documents** – names, dates or amounts that don''t match.
4. **Wrong visa route** – e.g. applying for a UK Student visa as a Myanmar national (refused under the visa brake since 26 March 2026).
5. **Late application** – apply as soon as you have the offer and funds.


## Let our visa team check your file

Saturday Education reviews every document before you submit, including bank statements and the statement of purpose. [Book a free consultation](/#consultation) · [Find a course](/course-finder)
',
    '- EMGS fee schedule: https://visa.educationmalaysia.gov.my/media/cms_upload/Schedule_fees_for_student_dependant_pass_app_28.10.2025.pdf ; EMGS FAQ: https://educationmalaysia.gov.my/Get-In-Touch/FAQ
- Royal Thai Embassy Yangon, Non-Immigrant ED visa: https://yangon.thaiembassy.org/en/publicservice/non-immigrant-ed-visa
- Auswärtiges Amt, proof of finance (€992/month, €11,904/year): https://allemagneenfrance.diplo.de/fr-de/service/visa/2521298-2521298 ; German Embassy Yangon visa pages (via post-09 research)
- Irish Immigration Service, student finances: https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/a-fee-paying-private-primary-or-secondary-school/information-on-student-finances/
- Italian MFA FAQ: https://www.esteri.it/en/ministero/sportello_info/domandefrequenti/studiare-in-italia/
- IND: https://ind.nl/en/income-requirements-study
- Hungary OIF procedural fees: https://oif.gov.hu/factsheets/procedural-fees
- IRCC proof of financial support: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html ; eligibility: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/eligibility.html
- INZ Operational Manual U3.20: https://www.immigration.govt.nz/opsmanual/43653.htm ; INZ fee guide (INZ 1028)
- GOV.UK visa brake: https://www.gov.uk/guidance/visa-brake-changes-to-the-uk-visa-system ; Child Student visa: https://www.gov.uk/child-study-visa',
    'student visa requirements for myanmar students',
    'myanmar study visa, proof of funds student visa, bank statement for student visa, malaysia student pass myanmar, thailand non-ed visa yangon, canada study permit myanmar, germany student visa yangon',
    NULL,
    false,
    NULL,
    '2026-11-22'::date,
    4
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('How many months of bank statements do Myanmar students need?', 'Most countries ask for about six months of statements, on bank letterhead, with large deposits explained. Ireland explicitly requires the last six months.', 1),
  ('What is a blocked account for Germany?', 'An account where you deposit a year''s living money (€11,904) and can withdraw only €992 a month. The German Embassy accepts only the official confirmation showing both amounts.', 2),
  ('How much is the Thailand student visa fee in Yangon?', 'The Royal Thai Embassy Yangon lists the Non-Immigrant ED visa fee as USD 80.', 3),
  ('Does Malaysia require a fixed amount in the bank?', 'EMGS doesn''t publish a fixed savings amount like Canada or Germany, but universities and EMGS can ask for financial evidence. Budget for tuition plus about RM1,800–4,000 a month.', 4),
  ('Is there a visa interview?', 'Most countries decide on documents. Some may call you for an interview; prepare to explain your course, your sponsor''s income and your plans.', 5),
  ('Where do Myanmar students apply for an Irish or Dutch visa?', 'Ireland: online via AVATS, then post documents to the office on your summary form (no Irish embassy in Myanmar). Netherlands: your university applies to the IND, and the MVV sticker is usually collected in Bangkok.', 6),
  ('Can I apply for a UK Student visa from Myanmar?', 'No. Since 26 March 2026, UK Student visa applications from outside the UK by Myanmar nationals are refused. Under-18s can still use the Child Student visa for A Level.', 7)
) AS v(question, answer, sort_order);

-- 5. top-universities-thailand-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'top-universities-thailand-myanmar-students',
    'Top 5 Universities in Thailand for Myanmar Students (2026)',
    'Top 5 Universities in Thailand for Myanmar Students (2026)',
    'Mahidol MUIC, Shinawatra, Assumption, Bangkok University and Siam University compared: QS 2027 rank, English programmes, official fees in THB and MMK.',
    'For Myanmar students wanting English-taught degrees in Thailand, the strongest options are Mahidol University International College (MUIC), Shinawatra University, Assumption University (ABAC), Bangkok University International and Siam University. Official yearly tuition ranges from about THB 90,000 (≈ 12 million MMK) at Siam to about THB 320,000 (≈ 42.7 million MMK) at MUIC.',
    '## Why Thailand for Myanmar students?

Thailand is close to home (a short flight from Yangon), has a large Myanmar community, and its private universities run complete bachelor''s programmes in English. Tuition is among the lowest of any country we cover. The trade-off: student part-time work is **generally not allowed** without a work permit, so families need to fund living costs fully.

We picked mainly **private** universities, plus one public university (Mahidol) because its international college is the strongest English-taught option. **None of these five is currently a Saturday Education partner**; we include them because they''re the best-known, international-friendly choices.

## Comparison table

| # | University | Type | Ranking signal (QS 2027) | Example English programmes | Tuition / year (THB) | ≈ MMK / year |
|---|---|---|---|---|---|---|
| 1 | Mahidol University International College (MUIC), Salaya | **Public** | QS World **#=345** (Thailand #2) | BBA, Computer Engineering, International Relations | ≈ 302,850–320,025 | 40.4M–42.7M |
| 2 | Shinawatra University (SIU), Pathum Thani | Private | QS Asia **#239** | BBA (Accounting & Finance, Logistics), Digital Art | Yr 1: 290,000; yrs 2–4: 150,000 (2024 table) | 38.7M yr 1, then 20.0M |
| 3 | Assumption University (ABAC), Bangkok | Private | QS Asia **791–800**; SE Asia **#133** | BBA, Computer Science, English for Int''l Business | ≈ 143,250–176,250 | 19.1M–23.5M |
| 4 | Bangkok University International (BUIC), Pathum Thani | Private | QS SE Asia **#=150** | 3-year BBA, Computer Science, Business English | ≈ 192,217–210,550 | 25.6M–28.1M |
| 5 | Siam University International College, Bangkok | Private | QS SE Asia **#=157** | BBA, IT, Civil Engineering | ≈ 90,150–100,000 | 12.0M–13.3M |

Yearly figures are our conversion of official programme totals (total ÷ years). MMK at ≈ 133.4 MMK per THB (ECB cross, 20 Nov 2026, with 1 RM = 1,100 MMK), approximate.

## 1. Mahidol University International College (MUIC)

Mahidol is one of Thailand''s top research universities and MUIC is its all-English international college. For non-resident students, the official four-year cost is THB 1,257,000 for the BBA (≈ THB 314,250 a year) and THB 1,280,100 for Computer Engineering. Admission needs **IELTS 6.0** (Writing 6.0) or TOEFL iBT 69, and SAT/ACT Math for business, science and engineering. Intakes run by trimester; the next overseas application window is **1 Dec 2026 – 8 Jan 2027** for the April 2027 start. MUIC lists a 50% tuition scholarship for students from low-income countries (4 awards a year); check with MUIC whether Myanmar qualifies.

## 2. Shinawatra University (SIU)

A private university with a high share of international students and a QS Asia 2027 rank of #239. Its only official international fee table is from **2024**: THB 290,000 in year 1 and THB 150,000 in each later year (≈ THB 185,000 average). Ask SIU for the 2026/27 schedule before budgeting. English scores are "meriting but not required"; intakes are August and January.

## 3. Assumption University (ABAC)

The best-known private international brand among Myanmar families. Its October 2026 fee sheet lists the BBA at THB 609,000 for four years (≈ THB 152,250 a year) and Computer Science at THB 705,000. A one-time first-enrolment and intensive-course fee of THB 24,000–51,000 applies. IELTS 5.0 or TOEFL iBT 60 exempts you from the English placement test.

## 4. Bangkok University International (BUIC)

Its **3-year BBA** (THB 576,650 total for 2027) is a strong selling point: less tuition and one year less of living costs. Computer Science (3 years) is THB 631,650. English requirement: IELTS 5.0, TOEFL iBT 61, Duolingo 80 or BU''s placement test.

## 5. Siam University International College

The budget pick: BBA THB 360,600 for four years (≈ THB 90,150 a year), IT and Civil Engineering THB 400,000. Intakes are August and January (recommended deadline 15 December for January).

## Thai student visa (Non-ED) for Myanmar applicants

Apply online at thaievisa.go.th for the **Non-Immigrant ED visa**. The Royal Thai Embassy Yangon lists a fee of **USD 80**, a letter of acceptance from the university, and financial evidence covering tuition and living costs. You get a 90-day stay, then extend in Thailand for up to one year at a time. See the full [student visa checklist](/guides/student-visa-checklist-myanmar).

## Cost of living in Bangkok

Mahidol''s student guide puts rent at THB 7,000–30,000 and food at THB 9,000–12,000 a month. Budget roughly THB 16,000–42,000 a month (≈ 2.1M–5.6M MMK) depending on housing.


## Compare Thailand with Malaysia

Many families shortlist both. Read our [Malaysia fees guide](/guides/malaysia-private-university-fees) and [cheapest country comparison](/guides/cheapest-country-to-study-abroad-myanmar), or [book a free consultation](/#consultation). See also our [Thailand destination page](/destinations/thailand).
',
    '- MUIC fees: https://muic.mahidol.ac.th/en/study-at-muic/tuition-fees/undergraduate-tuition-fees/ ; admission: https://muic.mahidol.ac.th/en/study-at-muic/admissions-requirement/undergraduate-admission/overseas-students/ ; scholarships: https://muic.mahidol.ac.th/en/study-at-muic/scholarships-financial-aid/muic-scholarships ; QS: https://www.topuniversities.com/universities/mahidol-university
- Shinawatra: https://www.topuniversities.com/universities/shinawatra-university ; 2024 fee table: https://www.siu.ac.th/ (international fee PDF, 2024) ; admission: https://siu.ac.th/students/admission-process/
- Assumption fees (19 Oct 2026): https://admissions.au.edu/wp-content/uploads/2026/10/Tuition-Fee-Inter-19102026.pdf ; ranking: https://www.au.edu/au-ranks-among-asias-top-800-and-southeast-asias-top-150/ ; English: https://admissions.au.edu/?page_id=2753
- Bangkok University fees 2027: https://www.bu.ac.th/en/tuition-fees/international-programs/2027 ; FAQ: https://www.bu.ac.th/en/faq/international-programs ; QS: https://www.topuniversities.com/universities/bangkok-university
- Siam University: https://ico.siam.edu/ ; https://ico.siam.edu/programs/bba ; QS: https://www.topuniversities.com/universities/siam-university
- Royal Thai Embassy Yangon (Non-ED): https://yangon.thaiembassy.org/en/publicservice/non-immigrant-ed-visa
- Thai work permit rule: Department of Employment (Working of Aliens Act guidance)
- ECB reference rates 20 Nov 2026',
    'best universities in thailand for international students',
    'top universities in thailand for myanmar students, thailand university fees for international students, study in thailand myanmar, assumption university fees, mahidol muic fees, thailand non-ed visa',
    'thailand',
    false,
    NULL,
    '2026-11-22'::date,
    5
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('Which is the best university in Thailand for international students?', 'By QS 2027, Chulalongkorn (#212) and Mahidol (#=345) rank highest. For a fully English-taught degree, Mahidol''s international college (MUIC) is the strongest option.', 1),
  ('What is the cheapest English-taught university in Thailand?', 'Of the five we compared, Siam University: its international BBA is THB 360,600 for four years (about THB 90,150 a year, ≈ 12 million MMK).', 2),
  ('Do I need IELTS to study in Thailand?', 'It depends. MUIC requires IELTS 6.0; Bangkok University and Assumption accept IELTS 5.0 or their own placement test; Shinawatra doesn''t require it.', 3),
  ('Can Myanmar students work part-time in Thailand?', 'Generally no. Working needs a work permit under Thai law, and the Non-ED visa is a study visa.', 4),
  ('How much is the Thai student visa fee for Myanmar citizens?', 'USD 80 for a single-entry Non-Immigrant ED visa at the Royal Thai Embassy in Yangon.', 5),
  ('When are the intakes in Thailand?', 'Most private universities have August and January intakes. MUIC runs three trimesters (September, January and April).', 6),
  ('Are these universities Saturday Education partners?', 'Not currently. We can still advise you on them and compare them with our partner universities in Malaysia and elsewhere.', 7)
) AS v(question, answer, sort_order);

-- 6. hungary-scholarships-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'hungary-scholarships-myanmar-students',
    'Hungary Scholarships for Myanmar Students: What''s Really Available (2026)',
    'Hungary Scholarships for Myanmar Students: 2026 Facts',
    'Is Stipendium Hungaricum open to Myanmar? No. Here are Hungary''s real options: university scholarships, partner fees at Pécs and Szeged, and visa costs.',
    'The Hungarian government''s Stipendium Hungaricum scholarship is not open to Myanmar citizens right now: Myanmar is not among the eligible Sending Partners in the official 2026/27 Call for Applications. Myanmar students can still study in Hungary as self-funded students (partner bachelor''s fees from about €2,200–2,900 a semester) and apply for university-own scholarships.',
    '## Is Stipendium Hungaricum available for Myanmar students?

No, not in the current cycle. Stipendium Hungaricum (SH) works through bilateral agreements: you can only apply if your country''s ministry is an eligible **Sending Partner** and nominates you. The official **Call for Applications 2026/2027** lists the eligible Sending Partners for full-time programmes, and **Myanmar is not on that list**. Neighbours such as Thailand, Laos, Cambodia, Malaysia, Vietnam and Indonesia are.

Some agency and university websites still list Myanmar as an SH country. That information is out of date. Always check the official call at stipendiumhungaricum.hu.

**What about 2027/28?** The official site says applications for 2026/27 are closed, and as of November 2026 the **2027/28 call has not been published**. When it is, check whether Myanmar has been added before you prepare an SH application. We''ll update this guide when the call comes out.

**Also avoid "SH-linked" awards.** Some Hungarian scholarships, such as the University of Pécs Springboard Scholarship (50%), are only for students who applied for SH and weren''t selected, so they aren''t realistic for Myanmar applicants.

## Why Hungary is still worth considering

- **EU degree, lower fees:** tuition is well below Western Europe.
- **English-taught programmes:** medicine, dentistry, pharmacy, veterinary science, business and engineering.
- **Schengen access** once you hold a Hungarian residence permit.

## Tuition at our Hungarian partner universities

| University | Programme | Non-EU tuition | ≈ MMK |
|---|---|---|---|
| **University of Pécs** ✅ | Most BSc/BA programmes | €2,200–2,900 per semester | 10.9M–14.4M per semester |
| **University of Pécs** ✅ | Business BSc | €2,750 per semester | 13.7M per semester |
| **University of Pécs** ✅ | Medicine (2026/27) | USD 16,750 a year | 75.8M a year |
| **University of Szeged** ✅ | Business Administration BSc | €2,700 per semester | 13.4M per semester |
| **University of Veterinary Medicine Budapest** ✅ | Veterinary medicine | Ask us for the current fee | — |

**Typical bachelor''s budget at partners: about €4,400–5,800 a year in tuition (≈ 21.9M–28.8M MMK).** Medicine costs much more. MMK is approximate (ECB, 20 Nov 2026: 1 EUR ≈ 4,972 MMK, 1 USD ≈ 4,524 MMK).

## University scholarships Myanmar students can apply for

| University | Award | Value | Notes |
|---|---|---|---|
| **University of Pécs** ✅ (Faculty of Business & Economics) | Most promising self-funded freshmen | **20%** of first-semester tuition; **50%** for the top admission score in each programme | One-time; min. 60/100 admission points; deadline 15 March (BSc). Can''t be combined with SH |
| **University of Szeged** ✅ | SZTE Start Scholarship | **€900** one-off, 12 students | 2026 call closed (30 Apr 2026); 2027 call not yet published |
| Széchenyi István University (Győr) | SODA Grant | **90% tuition refund** + free dormitory | For citizens of OECD ODA-recipient countries (Myanmar is on the OECD DAC list); 10 grants; very competitive; you pay first, refund later. Not a Saturday partner |
| University of Miskolc | International Freshmen Scholarship | **30%** of paid tuition | Min. 80/100 entrance score. Not a Saturday partner |
| Corvinus University of Budapest | Early-payment discount | **10%** off year 1 | Pass entrance exams by end of February, pay by end of March. Not a Saturday partner |

Deadlines are often in **February–June** for a September start, so start early.

## Visa and residence permit

Hungary has no embassy in Myanmar; which mission handles Myanmar applicants should be confirmed with the university''s international office. You apply for a **residence permit for study purposes** (with a D entry visa); the fee at a consulate is **€110**. Hungary''s minimum wage is HUF 1,856 an hour (2026), but official student work-hour limits weren''t confirmed for this guide, so don''t plan on part-time income.


## Plan your Hungary application

We''ll check which scholarships fit your grades and when to apply. [Book a free consultation](/#consultation) · [Search Hungarian courses](/course-finder) · [Hungary destination page](/destinations/hungary)
',
    '- Stipendium Hungaricum Call for Applications 2026/2027 (eligible Sending Partners): https://stipendiumhungaricum.hu/wp-content/uploads/2025/10/BA_MA_OTM_Call_for_Applications_2026_27.pdf ; partners page: https://stipendiumhungaricum.hu/partners/ ; homepage ("Application is closed for the 2026/27 academic year"): https://stipendiumhungaricum.hu/
- 2027/28 call not yet published: Pázmány Péter Catholic University SH page (updated 9 Oct 2026): https://itk.ppke.hu/en/further-information-sh ; Embassy of Hungary Abuja FAQ: https://abuja.mfa.gov.hu/en/articles/general-information-and-faq-of-the-stipendium-hungaricum-scholarship-program
- University of Pécs fees: https://ktk.pte.hu/en/applicants/application-guide/finances-fees ; freshmen scholarship: https://ktk.pte.hu/en/scholarship-for-the-most-promising-self-funded-freshmen ; scholarships hub: https://ktk.pte.hu/en/applicants/admission/scholarships/scholarships ; medicine fees PDF: https://international.pte.hu/sites/international.pte.hu/files/2025-10/Undergraduate%20programs26_27.pdf
- University of Szeged fees: https://eco.u-szeged.hu/english/training-programmes/programmes-for-international-students/business-administration-and-management-bsc/fees-and-scholarships/fees-and-scholarships ; Start Scholarship: https://u-szeged.hu/startscholarship
- SODA Grant, Széchenyi István University; University of Miskolc; Corvinus: https://www.uni-corvinus.hu/post/hir/discounted-tuition-fees-and-scholarships-at-corvinus/?lang=en (all via /workspace/hu_scholarship/research.md, 12 Nov 2026)
- Hungary OIF procedural fees: https://oif.gov.hu/factsheets/procedural-fees ; minimum wage decree 2026: https://kormany.hu/application/documents/8baf908f-f9db-4e63-9fa8-3330d8f0a602/download
- ECB reference rates 20 Nov 2026',
    'hungary scholarship for myanmar students',
    'stipendium hungaricum myanmar, study in hungary for myanmar students, university of pecs fees international students, university of szeged scholarship, study in hungary cost',
    'hungary',
    false,
    NULL,
    '2026-11-22'::date,
    6
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('Can Myanmar students apply for Stipendium Hungaricum?', 'Not in the 2026/27 cycle. Myanmar is not on the list of eligible Sending Partners in the official Call for Applications. The 2027/28 call hasn''t been published yet.', 1),
  ('Why do some websites say Myanmar is an SH partner?', 'Older lists and third-party sites still include Myanmar. The official call for the current year is what counts, and it doesn''t include Myanmar.', 2),
  ('How much does it cost to study in Hungary?', 'At our partners Pécs and Szeged, many non-EU bachelor''s programmes cost about €2,200–2,900 a semester (≈ 10.9M–14.4M MMK). Medicine at Pécs is USD 16,750 a year.', 3),
  ('Are there scholarships for Myanmar students in Hungary?', 'Yes, from universities themselves: for example Pécs (20–50% of first-semester tuition), Szeged''s €900 Start Scholarship, and Széchenyi István University''s SODA grant (90% tuition refund) for students from ODA-recipient countries.', 4),
  ('How much is the Hungarian student residence permit fee?', '€110 at a consulate, according to Hungary''s immigration authority.', 5),
  ('Is a Hungarian degree recognised?', 'Hungary is an EU member, so degrees from accredited Hungarian universities are recognised across Europe. Check recognition in your target country for regulated jobs like medicine.', 6)
) AS v(question, answer, sort_order);

-- 7. part-time-work-minimum-wage-by-country
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'part-time-work-minimum-wage-by-country',
    'Part-Time Work Rules and Minimum Wage for International Students (2026)',
    'Student Part-Time Work Rules & Minimum Wage by Country 2026',
    'How many hours international students can work in Canada, NZ, Ireland, Germany, NL, Italy and Malaysia, the 2026 minimum wage, and post-study work rights.',
    'During term, international students can usually work 24 hours a week in Canada, 25 in New Zealand, 20 in Ireland, Germany and Italy, and 16 in the Netherlands, with more hours in official holidays. At 2026 minimum wages that''s roughly €240–€283 a week in Europe before tax. Part-time pay helps with living costs; it can''t pay tuition.',
    '## Why work rules matter for Myanmar students

Many Myanmar families ask whether a student can "work and pay their own way". The honest answer: visas require you to show tuition and living money **before** you travel, and hour caps limit what you can earn. Use part-time work as pocket money and work experience, not as your funding plan.

## Work hours and minimum wage by country

| Country | Term-time hours | Holidays | 2026 minimum wage (before tax) | Example weekly pay (term) | ≈ MMK / week |
|---|---|---|---|---|---|
| 🇨🇦 Canada | **24 hrs/week** off campus | Unlimited in scheduled breaks | Ontario CAD 17.95/hr; BC CAD 18.25/hr | ON: CAD 431 | 1.36M |
| 🇳🇿 New Zealand | **25 hrs/week** (check your visa) | Full-time in scheduled breaks | NZ$23.95/hr (adult) | NZ$599 | 1.49M |
| 🇮🇪 Ireland | **20 hrs/week** | **40 hrs/week** in Jun–Sep and 15 Dec–15 Jan | €14.15/hr (age 20+) | €283 | 1.41M |
| 🇩🇪 Germany | **20 hrs/week** in lecture periods, or 140 full / 280 half days a year | No limit in semester breaks (20-hour option) | €13.90/hr | €278 | 1.38M |
| 🇳🇱 Netherlands | **16 hrs/week** (employer needs a TWV permit) | Full-time in June, July, August | €14.99/hr (age 21+) | €240 | 1.19M |
| 🇮🇹 Italy | **20 hrs/week**, max 1,040 hrs/year | – | No statutory minimum (set by collective agreements) | – | – |
| 🇲🇾 Malaysia | Up to **20 hrs/week**, approved sectors, Immigration approval | EMGS: only in breaks > 7 days | RM1,700/month (RM2,000 from June 2027 announced) | – | – |
| 🇹🇭 Thailand | **Generally not allowed** (work permit required) | – | THB 337–400/day (Bangkok 400) | – | – |
| 🇦🇪 UAE | Only with a work permit (and university NOC if sponsored) | – | No general statutory minimum | – | – |
| 🇭🇺 Hungary | Not confirmed officially for this guide | – | HUF 1,856/hr | – | – |
| 🇬🇧 UK (A Level, Child Student 16+) | **10 hrs/week** | Full-time in vacations | £8.00/hr (under 18) | £80 | 475k |

Weekly pay = minimum hourly rate × term-time hours, before tax, for illustration only. MMK is approximate (ECB 20 Nov 2026: 1 EUR ≈ 4,972; 1 CAD ≈ 3,162; 1 NZD ≈ 2,490; 1 GBP ≈ 5,937 MMK).

## Announced 2027 changes

- **Germany:** €14.60/hr from 1 January 2027.
- **Ireland:** €14.94/hr from 1 January 2027.
- **Netherlands:** €15.29/hr (21+) from 1 January 2027.
- **UK under-18 rate:** £8.31/hr from 1 April 2027.
- **Malaysia:** RM2,000/month from June 2027 (Budget 2027 speech; not yet seen as a gazetted Wages Order).

## Country notes

### Canada
Students who meet study-permit conditions can work 24 hours a week off campus during classes and full-time in scheduled breaks. Minimum wage is provincial: Ontario CAD 17.95 (from 1 Oct 2026) and British Columbia CAD 18.25. The cap has changed several times since 2022, so check IRCC before you go.

### New Zealand
Most degree students can work 25 hours a week, and full-time in scheduled holidays if their visa allows it. PhD and research master''s students have no limit.

### Ireland
With Stamp 2 permission you can work 20 hours a week during study and 40 hours a week in June–September and 15 December–15 January.

### Germany
Third-country students can work 140 full days or 280 half days a year, **or** up to 20 hours a week during the lecture period with no limit in breaks. Student-assistant jobs at the university are treated separately.

### Netherlands
16 hours a week during the year or full-time in summer, and your employer must hold a work permit (TWV) for you.

### Malaysia and Thailand
Malaysia allows limited part-time work in specific sectors with Immigration approval; EMGS says only in breaks longer than 7 days. Thailand generally doesn''t allow student work. Plan to fund living costs fully in both countries.

## Post-study work rights (after graduation)

| Country | Post-study route | Length |
|---|---|---|
| 🇨🇦 Canada | Post-Graduation Work Permit (PGWP) | Up to **3 years** for programmes of 2+ years; degree graduates are exempt from the field-of-study rule |
| 🇳🇿 New Zealand | Post-Study Work Visa | Same length as your NZ study, up to **3 years** for a bachelor''s (Level 7) |
| 🇮🇪 Ireland | Stamp 1G (Third Level Graduate Programme) | **12 months** after a Level 8 degree; up to **24 months** after Level 9+ |

These routes are why NZ, Canada and Ireland cost more but attract students thinking about work experience abroad.


## Plan study and work together

We''ll help you choose a country where the work rules fit your plans. [Book a free consultation](/#consultation) · [Search courses](/course-finder) · [Cheapest country guide](/guides/cheapest-country-to-study-abroad-myanmar)
',
    '- Canada work off campus: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html ; PGWP field of study (checked 22 Nov 2026): https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility/field-of-study.html ; Ontario: https://www.ontario.ca/document/your-guide-employment-standards-act-0/minimum-wage ; BC: https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/wages/minimum-wage
- NZ working on a student visa: https://www.immigration.govt.nz/study/once-you-have-a-student-visa/working-on-a-student-visa/ ; minimum wage: https://www.employment.govt.nz/pay-and-hours/pay-and-wages/minimum-wage/minimum-wage-rates-and-types ; Post-study work (INZ ops manual WD3, checked 22 Nov 2026)
- Ireland: https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/planning-to-study-in-ireland/ ; minimum wage: https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/pay-and-employment/minimum-wage/ ; S.I. 533/2026: https://www.irishstatutebook.ie/eli/2026/si/533/made/en/ ; Stamp 1G: https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/
- Germany: https://www.make-it-in-germany.com/en/study-vocational-training/studying-in-germany/work ; MiLoV5: https://www.gesetze-im-internet.de/milov5/BJNR10C0A0025.html
- Netherlands: https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/student-netherlands_en ; minimum wage: https://www.rijksoverheid.nl/themas/werk/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026
- Italy: https://www.esteri.it/en/ministero/sportello_info/domandefrequenti/studiare-in-italia/ ; https://www.lavoro.gov.it/sportello-unico-digitale/termini-e-condizioni-di-impiego/compensosalario-minimo-e-medio-la
- Malaysia: https://educationmalaysia.gov.my/Get-In-Touch/FAQ ; https://www.imi.gov.my/index.php/en/main-services/pass/student-pass/ ; Budget 2027: https://belanjawan.mof.gov.my/pdf/belanjawan2027/ucapan/bs27.pdf
- Thailand: https://www.mol.go.th/en/news/starting-july-1-ministry-of-labour-revises-minimum-wage-to-align-with-economy-and-improve-workers-quality-of-life
- UAE: https://u.ae/en/information-and-services/jobs/sector-of-employment/employment-in-the-private-sector/payment-of-wages
- Hungary: https://kormany.hu/application/documents/8baf908f-f9db-4e63-9fa8-3330d8f0a602/download
- UK: https://www.gov.uk/national-minimum-wage-rates ; https://www.gov.uk/child-study-visa/what-you-can-and-cannot-do',
    'part time work for international students by country',
    'how many hours can international students work, minimum wage germany 2026, ireland student work hours, canada student work 24 hours, new zealand student work 25 hours, post study work visa',
    NULL,
    false,
    NULL,
    '2026-11-22'::date,
    7
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('How many hours can international students work in Canada?', 'Up to 24 hours a week off campus during classes, and full-time during scheduled breaks, if you meet your study permit conditions.', 1),
  ('Can international students work in Germany?', 'Yes: 140 full or 280 half days a year, or up to 20 hours a week in the lecture period. The minimum wage is €13.90 an hour in 2026 and €14.60 from January 2027.', 2),
  ('How many hours can students work in Ireland?', '20 hours a week during term and 40 hours a week from June to September and 15 December to 15 January, on Stamp 2.', 3),
  ('Can I work while studying in Thailand?', 'Generally no. Foreigners need a work permit to work in Thailand, and the Non-ED visa is a study visa.', 4),
  ('Can part-time work pay my tuition fees?', 'No. Visas require you to show tuition and living money before you travel, and hour caps limit earnings to roughly €240–€283 a week in Europe before tax.', 5),
  ('Which country gives the longest post-study work visa?', 'Of the countries we cover, Canada (PGWP up to 3 years) and New Zealand (up to 3 years after a bachelor''s). Ireland gives 12–24 months.', 6)
) AS v(question, answer, sort_order);

-- 8. private-universities-germany-myanmar
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'private-universities-germany-myanmar',
    'Studying at a Private University in Germany: A Guide for Myanmar Students (2026)',
    'Private Universities in Germany for Myanmar Students (2026)',
    'English-taught private universities in Germany: SRH from €690/month, Constructor €11,925/semester, the €11,904 blocked account, work rules and visa steps.',
    'Private, state-recognised universities in Germany teach full degrees in English, so you don''t need German to start. Official fees range from about €690 a month (SRH) to €11,925 a semester (Constructor University). For the visa you must also show €11,904 a year (€992 a month), usually in a blocked account.',
    '## Why a private university in Germany?

- **English-taught bachelor''s and master''s**, with no German-language requirement for most programmes.
- **Smaller classes and more intakes** (often April and October), and admissions that look at your whole profile.
- **Practical, career-focused degrees** in business, computer science, engineering and design.
- **A German degree** from a state-recognised institution, plus Germany''s student work rights.

We focus on private universities because they suit most Myanmar applicants best: public universities mainly teach bachelor''s degrees in German (usually B2/C1) and are highly competitive.

## Fees at our German partner universities

| University (city) | Partner | Official tuition | ≈ per year | ≈ MMK / year |
|---|---|---|---|---|
| **SRH University** (Berlin, Heidelberg, Leipzig) | ✅ | International Business Administration: **from €690 per month** | ≈ €8,280 | 41.2M |
| **Constructor University** (Bremen) | ✅ | **€11,925 per semester** (2027/28) + up to €350 fees/semester + €940 one-time non-EU enrolment | €23,850 | 118.6M |
| IU International University / IU Business School | ✅ | Ask us for the current official fee | – | – |
| Berlin School of Business and Innovation (BSBI) | ✅ | Ask us; check which university awards the degree | – | – |

MMK is approximate (ECB 20 Nov 2026: 1 EUR ≈ 4,972 MMK).

**SRH tip:** SRH''s programme page says new tuition fees apply from **1 January 2027**, and students admitted by **31 December 2026** can lock in 2026 fees for 2027 studies.

**Constructor tip:** every applicant is automatically considered for an academic achievement scholarship of up to **€10,000** based on school GPA, and a tuition-deferral programme lets you repay part of the fees after you start working.

**A word on recognition:** only choose institutions that are **state-recognised** (staatlich anerkannt). You can check on the German Rectors'' Conference''s Hochschulkompass. For example, one private university in our network, Gisma, has a state recognition that the Brandenburg ministry describes as initially limited to 15 November 2026; we''re not recommending it until renewal is confirmed.

## How much money do you need for a German student visa?

The German Federal Foreign Office says students must have at least **€992 a month, €11,904 a year** (≈ 59.2M MMK). Most students prove this with a **blocked account (Sperrkonto)**, where you deposit the year''s amount and can withdraw only €992 a month. The embassy accepts only the official opening confirmation showing both the total and the monthly amount.

## Total first-year budget (example)

| Item | SRH (from) | Constructor |
|---|---|---|
| Tuition (1 year) | €8,280 | €23,850 + fees |
| Blocked account (living) | €11,904 | €11,904 |
| Health insurance (statutory, e.g. TK, under 23) | €141.16/month ≈ €1,694 | €1,694 |
| Visa fee | €75 | €75 |
| **Approx. total** | **≈ €21,950 (≈ 109M MMK)** | **≈ €37,520+ (≈ 187M MMK)** |

DAAD estimates living costs at about **€900–1,200 a month**, depending on the city. Constructor requires first-year students to live on campus; check the housing cost.

## Can you work while studying in Germany?

Yes. Non-EU students can work **140 full days or 280 half days a year**, or up to **20 hours a week** during lecture periods with no limit in semester breaks. The minimum wage is **€13.90 an hour** in 2026, rising to €14.60 in January 2027. At 20 hours a week that''s about €278 a week before tax. See our [part-time work guide](/guides/part-time-work-minimum-wage-by-country).

## How to apply from Myanmar: step by step

1. **Choose a programme and intake** (often April or October; check each university).
2. **Prepare documents:** high school/A Level results, transcripts, IELTS or TOEFL, passport, CV and motivation letter.
3. **Apply and interview:** many private universities interview online, then send an acceptance letter and study contract.
4. **Pay the enrolment fee/deposit** to secure your place and receive the admission letter.
5. **Open a blocked account** with €11,904 and get health insurance.
6. **Apply for the national (D) visa** at the German Embassy Yangon (appointment) or through the Consular Services Portal. The fee is €75, paid in USD cash; processing takes about four weeks.
7. **Arrive, register your address and get your residence permit.**


## Start your Germany application

We''ll shortlist state-recognised private universities and guide your blocked account and visa. [Book a free consultation](/#consultation) · [Search German courses](/course-finder) · [Germany destination page](/destinations/germany)
',
    '- SRH International Business Administration (fees from €690/month; 2027 fee change): https://www.srh-university.de/en/bachelor/international-business-administration/b/
- Constructor University cost of attendance 2027/28: https://constructor.university/admission-aid/financing-undergraduate
- German Federal Foreign Office, proof of finance (€992/month, €11,904/year): https://allemagneenfrance.diplo.de/fr-de/service/visa/2521298-2521298
- Make it in Germany, working while studying: https://www.make-it-in-germany.com/en/study-vocational-training/studying-in-germany/work
- Minimum wage (MiLoV5): https://www.gesetze-im-internet.de/milov5/BJNR10C0A0025.html
- Gisma recognition: Brandenburg MWFK https://mwfk.brandenburg.de/mwfk/de/wissenschaft/hochschulen/nichtstaatliche-fachhochschulen/gisma-university-of-applied-sciences/ ; Wissenschaftsrat press release PM_2826
- German Embassy Yangon visa fee and processing (€75, ~4 weeks), TK insurance (€141.16/month) and DAAD living costs (€900–1,200/month): Saturday research files post-09, post-18 and post-04 (checked 11 Nov 2026)
- Hochschulkompass (HRK): https://www.hochschulkompass.de/
- ECB reference rates 20 Nov 2026',
    'private universities in germany for international students',
    'study in germany for myanmar students, germany blocked account amount 2026, constructor university fees, srh university fees, english taught bachelor germany, germany student visa yangon',
    'germany',
    false,
    NULL,
    '2026-11-22'::date,
    8
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('Can Myanmar students study in Germany in English?', 'Yes. Private universities such as SRH and Constructor offer full bachelor''s and master''s degrees in English.', 1),
  ('How much is the blocked account for Germany in 2026?', '€11,904 a year (€992 a month), according to the German Federal Foreign Office.', 2),
  ('What is the cheapest private university in Germany?', 'Among our partners, SRH''s International Business Administration starts from €690 a month (about €8,280 a year). Fees vary by programme and campus.', 3),
  ('Are private universities in Germany recognised?', 'State-recognised private universities award degrees equal to public ones. Check status on Hochschulkompass before applying.', 4),
  ('Do I need IELTS for a German private university?', 'Most English-taught programmes ask for IELTS, TOEFL or an equivalent; scores vary by university and programme.', 5),
  ('How long does a German student visa take from Yangon?', 'About four weeks after your embassy appointment, according to our November 2026 research. Apply early, as appointment slots can be limited.', 6),
  ('Can I work after graduating in Germany?', 'Germany offers routes to stay and look for work after graduation; check the current rules on make-it-in-germany.com with your counsellor.', 7)
) AS v(question, answer, sort_order);

-- 9. study-in-canada-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'study-in-canada-myanmar-students',
    'Study in Canada for Myanmar Students: Costs, Caps, PAL and Work Rules (2026/27)',
    'Study in Canada for Myanmar Students: 2026/27 Guide',
    'Canada study permit caps, PAL rules, CAD 23,448 funds, partner fees, private colleges and PGWP, 24-hour work rule: a guide for Myanmar students.',
    'Myanmar students can still study in Canada, but places are capped. Most undergraduate and college applicants need a Provincial Attestation Letter (PAL), proof of CAD 23,448 for living costs plus first-year tuition, and a study permit (CAD 150 + CAD 85 biometrics). Partner college diplomas start at about CAD 18,600 a year.',
    '## Is Canada still open to Myanmar students in 2026/27?

Yes, but with a national cap. In its notice of 25 November 2025, Immigration, Refugees and Citizenship Canada (IRCC) set the 2026 cap at **up to 408,000 study permits**: about **155,000 for new arrivals** and **253,000 for extensions**. Canada''s Immigration Levels Plan targets **155,000 new student arrivals in 2026 and 150,000 in 2027**.

Inside that cap, about **180,000 permits** are for applicants who need a provincial or territorial attestation letter. Each province gets a share. For example, **Ontario''s 2026 allocation is 70,074** and **British Columbia''s is 24,786**. Colleges then share the provincial allocation, so popular programmes can fill early.

**What this means for you:** apply early, and don''t pay large non-refundable deposits until the college confirms your PAL.

## Do Myanmar students need a Provincial Attestation Letter (PAL)?

Most do. According to IRCC''s PAL page:

- **You need a PAL/TAL** for most **undergraduate degrees, college diplomas and certificates**. This covers the typical Myanmar Grade 12 / A Level / foundation leaver.
- **From 1 January 2026, you don''t need a PAL** for **master''s or doctoral degree programmes at public designated learning institutions (DLIs)**.
- Your college or university requests the PAL from the province after you accept an offer. You can''t apply for a PAL yourself.

## How much does it cost to study in Canada?

### Tuition at our Canadian partners

Canada is the largest group in our course finder, with partners such as Humber, Seneca, Conestoga, George Brown, Fanshawe, Sheridan, Algonquin, Cape Breton, Brock, Carleton, McMaster and University Canada West. We checked the published fees for two of them:

| Partner | Programme | International fee (2026/27) | ≈ MMK |
|---|---|---|---|
| **Humber Polytechnic** ✅ | Business Management / Business – Marketing diploma | CAD 18,588.88 (2 semesters) | 58.8M |
| **Humber Polytechnic** ✅ | Media Communications | CAD 21,576.33 (2 semesters) | 68.2M |
| **Humber Polytechnic** ✅ | Computer Systems Technician | CAD 21,654.90 (2 semesters) | 68.5M |
| **Cape Breton University** ✅ | Undergraduate degree (tuition + international differential + medical + fees) | CAD 23,795 a year | 75.2M a year |
| **Cape Breton University** ✅ | 4-year BA/BBA total | CAD 95,177.60 | 301M total |

Humber also charges mandatory health insurance of **CAD 418.15 a year** (≈ 1.3M MMK). Fees for other partners vary by programme. Ask us for the current fee sheet before you apply.

### Proof of funds for the study permit

From **1 September 2026**, a single applicant must show **CAD 23,448** for living costs (≈ 74.1M MMK), **plus first-year tuition and travel**. For a Humber business diploma, that means roughly **CAD 42,000 (≈ 133M MMK)** before travel. That figure is our own addition of the official amounts.

## Private universities and colleges in Canada

Most Canadian students attend **public** colleges and universities, but Canada also has private, degree-granting universities and many private career colleges. **For Myanmar students, the key question isn''t public versus private. It''s whether your exact programme leads to a PGWP.**

| Institution | City | Type | Popular programmes | Official international tuition | ≈ MMK | Intakes |
|---|---|---|---|---|---|---|
| **University Canada West (UCW)** ✅ | Vancouver, BC | Private university (degree-granting) | Bachelor of Commerce, BA in Business Communication, MBA, Associate of Arts | BCom: **CAD 89,000 total** (2026, 4 years); MBA: **CAD 46,095 total** (2026, 2 years) | 281.4M (BCom total); 145.8M (MBA total) | Fall, Winter, Spring, Summer |
| **Coquitlam College** ✅ | Coquitlam, BC | Private college | University Transfer, Associate of Arts | **CAD 610 per credit** (CAD 7,320 per 12-credit term); **CAD 660 per credit from Spring 2027** | 1.9M per credit (23.1M per 12-credit term) | Check the college''s semester calendar |

A 60-credit Associate of Arts at Coquitlam College works out to **about CAD 36,600 (≈ 115.7M MMK)** at 2026 rates. That''s our own calculation, before mandatory fees. UCW requires a **CAD 8,800 tuition deposit** from international students.

Other private institutions in our course finder include **Canadian College**, **Gastown Business College**, **Ontario College of Business & Technology** and **Fraser International College** (a Navitas pathway college). **We haven''t checked their fees or PGWP status for this guide.**

### Do private-college students get the same work and post-study rights?

- **PGWP is programme-specific.** IRCC''s designated learning institution (DLI) list shows which programmes at each school are PGWP-eligible. For **UCW**, IRCC lists only the **Associate of Arts, BA in Business Communication, BCom and MBA**. For **Coquitlam College**, it lists only the **Associate of Arts**.
- **Associate degrees must also meet the field-of-study rule.** UCW says its own Associate of Arts graduates are **not** PGWP-eligible under the current criteria, and Coquitlam College says its AA leads to a PGWP only for students who applied for their study permit **before 1 November 2024**. Bachelor''s and master''s graduates don''t need to meet the field-of-study rule.
- **Many private career-college programmes are not PGWP-eligible.** That includes programmes delivered by a private college on behalf of a public college (a "curriculum licensing" or public-private partnership arrangement): **if you start one on or after 15 May 2024, you can''t get a PGWP**. Several "Toronto campus" entries in our partner list carry public-college names; **check each campus''s DLI entry** before applying.
- **Online study counts against you:** if more than 50% of your programme is online, you lose PGWP eligibility. UCW says its online-mode students can''t apply for a PGWP.
- **The PAL and the 24-hour work rule** still apply at private DLIs, as long as you''re in an eligible full-time programme.

## Study permit application and fees

| Item | Amount | ≈ MMK |
|---|---|---|
| Study permit application | CAD 150 | 0.47M |
| Biometrics | CAD 85 | 0.27M |
| **Total government fees** | **CAD 235** | **0.74M** |

You apply online with your letter of acceptance, PAL (if required), proof of funds and other documents. Biometrics are given at a Visa Application Centre. **Which centre Myanmar applicants should use is not confirmed in this guide.** Check the IRCC "find a VAC" tool before booking.

## Can Myanmar students work in Canada?

Yes. Eligible full-time students can work **off campus up to 24 hours a week** during academic sessions, and full time during scheduled breaks. Provincial minimum wages are, for example, **CAD 17.95 an hour in Ontario** and **CAD 18.25 in British Columbia**. Treat part-time pay as pocket money, not as a way to cover tuition.

## Post-graduation work and PR routes

- **Post-Graduation Work Permit (PGWP):** programmes of **two years or more** can lead to a PGWP of **up to three years**. Shorter programmes give a shorter permit.
- **Field-of-study rule:** college diploma graduates must study in an eligible field for PGWP. **Bachelor''s degree graduates are exempt** from the field-of-study requirement.
- **Permanent residence:** skilled Canadian work experience gained on a PGWP can count toward Express Entry, for example through the Canadian Experience Class. Provincial nominee programmes are another route. PR is never guaranteed.

## Intakes

Most colleges, including Humber, have **January, May and September** intakes. September has the most programmes. Because of the cap, we suggest applying **9–12 months ahead**.

## Scholarships Myanmar students can realistically get

Myanmar students are rarely eligible for Canadian government undergraduate scholarships. In practice, awards come from the **college or university itself**, such as entrance scholarships, which are usually partial and merit-based. **Specific award amounts for our partners weren''t checked for this guide.** We''ll confirm them for your programme during counselling.


## Plan your Canada application

Places under the cap go fast. We''ll check PAL availability and your budget before you pay anything. [Book a free consultation](/#consultation) · [Search Canadian courses](/course-finder) · [Canada destination page](/destinations/canada) · [Student visa checklist](/guides/student-visa-checklist-myanmar)
',
    '- IRCC notice, 2026 provincial and territorial allocations under the international student cap (25 Nov 2025): https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/2026-provincial-territorial-allocations-under-international-student-cap.html
- IRCC, Provincial attestation letter: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html
- IRCC, Proof of financial support: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html
- IRCC, Fees list: https://ircc.canada.ca/english/information/fees/fees.asp
- IRCC, Work off campus: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html ; PGWP: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html
- IRCC, Canadian Experience Class: https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html
- Humber Business Management fees (2026/27): https://humber.ca/explore-programs/programs/business-management/current
- Cape Breton University tuition and fees: https://www.cbu.ca/current-students/student-finance-hub/tuition-and-fees/
- Ontario and BC minimum wages (via /workspace/wages/research.md, Nov 2026)
- Saturday Education course finder partner list (11 Nov 2026); ECB reference rates 20 Nov 2026 (1 CAD ≈ 3,162 MMK)
- IRCC, Designated learning institutions list (PGWP-eligible programmes): https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html ; UCW entry: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list/university-canada-west.html ; Coquitlam College entry: https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list/coquitlam-college.html
- IRCC, PGWP: who can apply (curriculum licensing, distance learning): https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility.html ; notice on public-private partnership programmes (22 Mar 2024): https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/update-public-private-college-partnership-programs.html
- University Canada West, All programs (2026 tuition): https://study.ucanwest.ca/ap/cs/all-program-625 ; Tuition & fees: https://www.ucanwest.ca/admissions/tuition-fees ; Associate of Arts (PGWP note): https://www.ucanwest.ca/programs/undergraduate/associate-of-arts
- Coquitlam College, International tuition & fees: https://www.coquitlamcollege.com/admissions/international/ ; RISIA FAQ (PGWP): https://www.coquitlamcollege.com/student-services/risia-services/',
    'study in canada for myanmar students',
    'canada study permit myanmar, provincial attestation letter, canada proof of funds 2026, pgwp myanmar, humber college fees international, cape breton university fees',
    'canada',
    false,
    NULL,
    '2026-11-22'::date,
    9
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('Is there a cap on Canadian study permits in 2026?', 'Yes. IRCC''s 2026 cap is up to 408,000 study permits, about 155,000 of them for new arrivals. Provinces get a share of the PAL-required places.', 1),
  ('Do I need a PAL to study a college diploma in Canada?', 'Yes, in most cases. Undergraduate degrees and college diplomas or certificates need a PAL/TAL. From 1 January 2026, master''s and doctoral students at public institutions don''t.', 2),
  ('How much money do I need to show for a Canadian study permit?', 'CAD 23,448 for living costs (from 1 September 2026), plus your first-year tuition and travel costs.', 3),
  ('How many hours can international students work in Canada?', 'Up to 24 hours a week off campus during classes, and full time during scheduled breaks, if you meet IRCC''s conditions.', 4),
  ('Can I stay and work in Canada after graduating?', 'Yes. Eligible programmes of two years or more can lead to a PGWP of up to three years. Diploma graduates must be in an eligible field of study, but bachelor''s graduates are exempt from that rule.', 5),
  ('What is the cheapest partner option in Canada?', 'Of the fees we checked, the Humber Business Management diploma at CAD 18,588.88 for two semesters (≈ 58.8M MMK) was the lowest. Other partners may be cheaper for specific programmes.', 6),
  ('Are there good private universities in Canada?', 'Yes. Canada has a few private degree-granting universities, such as our partner University Canada West in Vancouver (BCom CAD 89,000 total at 2026 rates). Check IRCC''s DLI list before choosing any private college, though. Many private-college and public-private partnership programmes don''t lead to a PGWP.', 7)
) AS v(question, answer, sort_order);

-- 10. study-in-new-zealand-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'study-in-new-zealand-myanmar-students',
    'Study in New Zealand for Myanmar Students: Fees, Visa, Work and Scholarships (2027)',
    'Study in New Zealand for Myanmar Students: 2027 Guide',
    'NZ university fees from NZ$36,410, NZ$20,000 living funds, NZ$850 visa cost, 25-hour work rule, post-study work visa and real scholarships for Myanmar.',
    'At our partners, a New Zealand bachelor''s costs about NZ$36,000–61,000 a year (≈ 90M–152M MMK). For the student visa you show NZ$20,000 a year for living costs and pay NZ$850 in total fees. You can work 25 hours a week, and a bachelor''s degree can lead to a post-study work visa of up to three years.',
    '## Why New Zealand works for Myanmar students

- **All eight universities and most polytechnics teach in English**, and many sit in our course finder.
- **A clear post-study work route** after a bachelor''s degree.
- **Two main intakes a year:** February (Semester 1) and July (Semester 2).

We work with 27 New Zealand institutions, including the University of Auckland, AUT, University of Canterbury, University of Otago, University of Waikato, Massey, Lincoln, Ara, Otago Polytechnic, Unitec, NZMA and the Auckland Institute of Studies.

## How much are New Zealand tuition fees?

| Partner | Programme (2027) | International fee per year | ≈ MMK |
|---|---|---|---|
| **University of Canterbury** ✅ | Arts | NZ$36,410 | 90.7M |
| **University of Canterbury** ✅ | Commerce | NZ$39,590 | 98.6M |
| **University of Canterbury** ✅ | Engineering (years 2–4) | NZ$54,180 | 134.9M |
| **University of Auckland** ✅ | BA (standard courses) | NZ$42,236.40 | 105.2M |
| **University of Auckland** ✅ | BCom | NZ$51,020.40 | 127.0M |
| **University of Auckland** ✅ | BE (Hons) | NZ$60,909.60 | 151.7M |

Canterbury''s figures are 2027 estimates per 120 points, which is a normal full-time year. Auckland also charges a **Student Services Fee of NZ$1,158 a year** (≈ 2.9M MMK). Medicine and dentistry cost more. Polytechnic and private-college partners are often cheaper; ask us for the exact fee for your course.

## Private colleges in New Zealand (PTEs)

New Zealand''s universities and polytechnics are public. Private providers are called **private training establishments (PTEs)**. Many of our 27 New Zealand partners are PTEs, and they''re often cheaper and more hands-on, especially in hospitality, business and tourism.

| Institution | City | Type | Popular programmes | Official international fees | ≈ MMK | Intakes (2027) |
|---|---|---|---|---|---|---|
| **Pacific International Hotel Management School (PIHMS)** ✅ | New Plymouth | PTE | Bachelor of Applied Hotel Management (Level 7, 3 years) | Year 1 **NZ$25,786**, Year 2 NZ$24,280, Year 3 NZ$31,030 (admin, tuition, course costs, health insurance); **total NZ$81,096** | 64.2M (Year 1); 201.9M (total) | 25 Jan, 12 Jul |
| **NZMA** ✅ | Auckland (Sylvia Park) and other campuses | PTE | NZ Diploma in Hospitality Management (Level 5) | **NZ$22,000** tuition + NZ$2,500 resource fees + NZ$500 enrolment = **NZ$25,000** | 62.2M | 8 Feb, 19 Jul |
| **Auckland Institute of Studies (AIS)** ✅ | Auckland | PTE | Bachelor of Business and other degrees | AIS''s fee page was unavailable on 22 Nov 2026 (**unverified**) | — | Ask us |

At PIHMS, students must live on site in years 1 and 2. A twin-share room with all meals costs **NZ$7,035 for each 21-week year** (≈ 17.5M MMK).

Other PTE partners include **NZ School of Tourism, NZ Tertiary College, Canterbury Institute of Management, EDENZ Colleges, NZ School of Education and NZ Airline Academy**.

### Do PTE students get the same work and post-study rights?

It depends on the **course level and length**, not on whether the provider is public or private:

- **Work up to 25 hours a week:** you qualify if your full-time programme lasts **at least two academic years**, or leads to a **New Zealand qualification at Level 4 or higher**. At a PTE, "full-time" generally means at least **20 hours of classes a week**, or three papers per semester at Level 7+.
- **Full-time work in holidays:** only for full-time programmes of at least one academic year.
- **Post-Study Work Visa:** a **Level 7 bachelor''s degree** studied full-time for at least **30 weeks** in New Zealand qualifies, whether it''s from a PTE or a university (for example, the PIHMS bachelor''s). A **non-degree diploma at Level 4–7**, such as NZMA''s Level 5 diploma, qualifies **only if it''s on INZ''s list of eligible qualifications** (Appendix 13) and you complete the full duration in New Zealand. **We haven''t checked whether NZMA''s Level 5 hospitality diploma is on that list.**
- Only choose providers registered with **NZQA**. You can check any provider on NZQA''s website.

## How much money do you need for the visa?

Immigration New Zealand (INZ) asks students on courses of 36 weeks or more to show **NZ$20,000 for each year** of living costs (≈ 49.8M MMK). This is **on top of tuition**, and it can be reduced by any prepaid accommodation. A sponsor must show they genuinely hold the funds.

**Example first-year budget (Canterbury Commerce):** NZ$39,590 tuition + NZ$20,000 living = **about NZ$59,590 (≈ 148M MMK)** before flights and insurance. This total is our own addition.

## Student visa fees and process

| Item | Amount | ≈ MMK |
|---|---|---|
| Student visa application fee | NZ$485 | 1.21M |
| Immigration levy | NZ$265 | 0.66M |
| International Visitor Conservation and Tourism Levy (IVL) | NZ$100 | 0.25M |
| **Total** | **NZ$850** | **2.12M** |

You apply online with your offer of place, evidence of tuition payment, proof of funds, and, where INZ requires them, medical and police certificates. Applications are made online.

## Can you work while studying in New Zealand?

Yes. Most student visa holders can work **up to 25 hours a week** during study and **full time in scheduled breaks**. Always check the conditions printed on your own visa. New Zealand''s adult minimum wage is **NZ$23.95 an hour** (≈ 59,600 MMK).

## Post-study work and PR

- **Post-Study Work Visa:** generally lasts as long as your New Zealand study. A **bachelor''s degree (Level 7) of three years or more** can lead to a visa of **up to three years**.
- It''s an **open work visa**: you can work for almost any employer.
- **Residence:** skilled work in New Zealand can later support a residence application, such as the Skilled Migrant Category. Rules change often, so treat this as possible, not promised.

## Scholarships Myanmar students can actually get

- **Manaaki New Zealand Scholarships (government): not open to Myanmar for the 2027 intake.** The eligible Asian countries listed for 2027 are Cambodia, Indonesia, Lao PDR, Malaysia, Nepal, Philippines, Thailand, Timor-Leste and Viet Nam.
- **University of Canterbury International First Year Scholarship (Offshore)** ✅: **NZ$15,000** toward tuition for top-achieving international students starting an undergraduate degree (≈ 37.4M MMK). The round for a Semester 1 2027 start closed on 31 October 2026, so look out for the next round.
- **University of Canterbury Southeast Asia High Achievers Scholarship** ✅: **NZ$5,000** off first-year tuition (≈ 12.5M MMK). For a Semester 2 2027 start, applications open on **3 March 2027** and close on **30 April 2027**.


## Plan your New Zealand application

We''ll match your grades to a partner and scholarship round. [Book a free consultation](/#consultation) · [Search New Zealand courses](/course-finder) · [New Zealand destination page](/destinations/new-zealand) · [Part-time work by country](/guides/part-time-work-minimum-wage-by-country)
',
    '- University of Auckland undergraduate international fees 2027: https://www.auckland.ac.nz/en/study/fees-and-money-matters/tuition-fees/international-student-fees/undergraduate-international-fees.html
- University of Canterbury bachelor''s fee estimates 2027: https://www.canterbury.ac.nz/study/getting-started/study-and-living-costs/study-costs/international-tuition-fees/bachelors
- University of Canterbury first-year scholarships for international students: https://www.canterbury.ac.nz/study/getting-started/scholarships/incoming-first-year-scholarships/international-students
- INZ student fund requirements: https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/providing-evidence-and-documents-to-support-your-visa-application/student-fund-requirements/
- INZ Fees Guide (INZ 1028, May 2026): https://www.immigration.govt.nz/assets/inz/documents/forms-and-guides/Fees-Guide-INZ-1028.pdf
- INZ, Working on a student visa: https://www.immigration.govt.nz/study/once-you-have-a-student-visa/working-on-a-student-visa/
- INZ, Post-study work visa: https://www.immigration.govt.nz/new-zealand-visas/visas/visa/post-study-work-visa
- Manaaki eligible countries (AUT Manaaki FAQ, updated 15 Jun 2026): https://www.aut.ac.nz/study/fees-and-scholarships/scholarships-and-awards-at-aut/manaaki-new-zealand-government-scholarships/manaaki-new-zealand-scholarships-faqs
- NZ minimum wage (via /workspace/wages/research.md, Nov 2026); ECB reference rates 20 Nov 2026 (1 NZD ≈ 2,490 MMK)
- PIHMS, Bachelor of Applied Hotel Management (fees, accommodation, 2027 enrolment dates): https://pihms.ac.nz/courses/bachelor-of-applied-hotel-management/
- NZMA, NZ Diploma in Hospitality Management Level 5 (fees, 2027 start dates): https://www.nzma.ac.nz/courses/hospitality-overview/hospitality-management-level-5-diploma
- INZ Operational Manual U13.15 (work conditions for tertiary/PTE students): https://www.immigration.govt.nz/opsmanual/47535.htm ; U6.1 (full-time study at a PTE): https://www.immigration.govt.nz/opsmanual/42647.htm ; WD3.1 (Post-Study Work Visa qualifications): https://www.immigration.govt.nz/opsmanual/71685.htm',
    'study in new zealand for myanmar students',
    'new zealand student visa myanmar, nz student visa fee 2026, university of auckland international fees, university of canterbury scholarship, post study work visa new zealand, manaaki scholarship myanmar',
    'new-zealand',
    false,
    NULL,
    '2026-11-22'::date,
    10
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('How much does it cost to study in New Zealand per year?', 'At our partners Canterbury and Auckland, bachelor''s tuition is about NZ$36,410–60,909.60 a year, plus NZ$20,000 a year for living costs.', 1),
  ('How much is the New Zealand student visa fee?', 'NZ$850 in total: NZ$485 application fee, NZ$265 immigration levy and the NZ$100 IVL, according to INZ''s fees guide (May 2026).', 2),
  ('Can Myanmar students get the Manaaki scholarship?', 'Not for the 2027 intake. Myanmar isn''t on the eligible country list. University scholarships such as Canterbury''s NZ$15,000 and NZ$5,000 awards are the realistic options.', 3),
  ('How many hours can I work on a New Zealand student visa?', 'Usually up to 25 hours a week during study and full time in scheduled holidays, if your visa conditions allow it.', 4),
  ('How long is the post-study work visa in New Zealand?', 'Generally the same length as your study, up to three years after a bachelor''s degree of three years or more.', 5),
  ('When are the intakes in New Zealand?', 'The main intakes are February (Semester 1) and July (Semester 2). Some polytechnics and colleges offer more start dates.', 6),
  ('Are there good private colleges in New Zealand?', 'Yes. New Zealand''s private providers (PTEs) include our partners PIHMS (Bachelor of Applied Hotel Management, NZ$81,096 total), NZMA and the Auckland Institute of Studies. A Level 7 bachelor''s at a PTE can lead to a post-study work visa, but most non-degree diplomas only do if INZ lists them.', 7)
) AS v(question, answer, sort_order);

-- 11. study-in-ireland-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'study-in-ireland-myanmar-students',
    'Study in Ireland for Myanmar Students: Fees, Visa, Work and Stay-Back (2026/27)',
    'Study in Ireland for Myanmar Students: 2026/27 Guide',
    'Irish private college fees from €8,600, €10,000 proof of funds, €60 visa, Stamp 2 work hours, Stamp 1G stay-back and scholarships open to Myanmar students.',
    'Myanmar students apply online for an Irish study visa (€60), show €10,000 a year for living costs plus fees, and register for an Irish Residence Permit (€300). Partner bachelor''s fees start at about €8,600 a year (≈ 42.8M MMK). You can work 20 hours a week, and graduates get 12–24 months to stay and work.',
    '## Why Ireland?

- **English-speaking EU country** with a big tech, pharma and finance job market in Dublin.
- **Clear post-study route:** the Stamp 1G graduate permission.
- **Partner options at very different price points**, from private colleges to University College Dublin.

Our Irish partners are **University College Dublin (UCD)**, **Study Group at UCD**, **Dublin Business School (DBS)**, **CCT College Dublin** and **GBS Holmes Institute Dublin**.

## How much does it cost to study in Ireland?

| Partner | Programme | Non-EU fee | ≈ MMK |
|---|---|---|---|
| **CCT College Dublin** ✅ | BSc (Hons) Computing and IT, BA (Hons) Business (Level 8) | €8,600 a year (non-EU offshore) | 42.8M |
| **CCT College Dublin** ✅ | Diploma in Business Innovation (Level 7) | €7,900 a year | 39.3M |
| **CCT College Dublin** ✅ | Postgraduate Higher Diploma in Science (full time) | €8,900 | 44.3M |
| **Dublin Business School** ✅ | All honours bachelor''s degrees (2026/27) | €10,365 a year | 51.5M |
| **UCD** ✅ | Bachelor''s degrees | Varies by programme; UCD''s fee page blocked our check | — |

Public universities such as UCD charge much more than private colleges. **We couldn''t verify UCD''s 2026/27 non-EU fees directly for this guide**, so ask us for the current fee sheet.

### Living costs and proof of funds

For the visa, you must show access to **€10,000 for the first year** (≈ 49.7M MMK), and the same for each later year, **on top of your course fees**. Dublin rent is high, so treat €10,000 as the minimum, not a full budget.

**Example first year at CCT:** €8,600 tuition + €10,000 living + €300 IRP = **about €18,900 (≈ 94M MMK)** before flights and insurance. That''s our own addition.

## Private colleges in Ireland

Ireland has a strong **private college sector** in Dublin. Fees are often lower than at public universities, classes are smaller, and there are more intakes. Four of our five Irish partners are private colleges.

| Institution | City | Type | Popular programmes | Official non-EU tuition | ≈ MMK | Intakes |
|---|---|---|---|---|---|---|
| **CCT College Dublin** ✅ | Dublin | Private college | BSc (Hons) Computing and IT, BA (Hons) Business | **€8,600 a year** (non-EU offshore) | 42.8M | Ask us (not verified) |
| **Dublin Business School (DBS)** ✅ | Dublin | Private college | Honours bachelor''s degrees, e.g. business | **€10,365 a year** (all honours bachelor''s, 2026/27) | 51.5M | Ask us (not verified) |
| **Holmes Institute Dublin (GBS Holmes)** ✅ | Dublin | Private college | BA (Hons) in Business | Not shown on its website (**unverified**) | — | February, June, October |
| **Griffith College** (not a partner) | Dublin and Cork | Private college | Business, computing, law, design, journalism | **€13,500 a year** for all undergraduate programmes (September 2025 intake onwards) + €825 compulsory annual fees; €1,500 Business bursary | 67.1M | September, February |

Griffith''s own worked example for its BA (Hons) Business is a net **€11,325** (≈ 56.3M MMK) after its bursary and an academic merit scholarship.

### Do private-college students get the same work and post-study rights?

Yes, **if the college and course meet Ireland''s immigration rules**:

- **Stamp 2 (20/40 hours of work):** your course must be on the **Interim List of Eligible Programmes (ILEP)** or offered by a **TrustEd Ireland** authorised provider. The TrustEd Ireland quality mark is replacing ILEP. In January 2026, QQI''s first 28 TrustEd Ireland institutions included **CCT College Dublin, Dublin Business School, Holmes Institute Dublin and Griffith College**, alongside the public universities.
- **Stamp 1G (stay-back):** you need a **Level 8 or Level 9 award from a recognised Irish awarding body**. Irish Immigration lists the universities, RCSI, the institutes of technology and **QQI**. Many private-college degrees are QQI awards (Griffith''s fee guide, for example, includes a QQI award fee), but **check that your exact course leads to a QQI (or Irish university) award** before you enrol.
- The **€10,000 funds rule, the €60 visa and the €300 IRP** are the same as for public universities.

## Irish student visa: process and fees for Myanmar nationals

1. Get an offer and pay the required deposit or fees.
2. Apply online through **AVATS**, Ireland''s online visa system.
3. Send your documents to the office named on your **AVATS summary form**. Ireland has **no embassy in Myanmar**, and the processing office for Myanmar applicants isn''t confirmed in this guide.
4. Pay the **€60** single-entry visa fee (≈ 0.3M MMK).
5. After you arrive, register with immigration for an **Irish Residence Permit (IRP)**. The fee is **€300** (≈ 1.5M MMK).

Your course must be full time (at least 15 hours of tuition a week) and on Ireland''s approved list for student permissions.

## Can Myanmar students work in Ireland?

Yes. With **Stamp 2**, you may work:

- **up to 20 hours a week** during term;
- **up to 40 hours a week** in **June, July, August and September**, and from **15 December to 15 January**.

Ireland''s national minimum wage is **€14.15 an hour** (≈ 70,000 MMK), rising to **€14.94 in 2027**.

## Stay-back: the Stamp 1G graduate route

- After a **Level 8 honours bachelor''s degree**, you can get **up to 12 months** of Stamp 1G to look for work.
- After a **Level 9 master''s or higher**, you can get **up to 24 months**.
- With a qualifying job offer, you can move to an **employment permit**. Time on employment permits can later count toward long-term residence. No route is guaranteed.

## Intakes

The main intake is **September**. Some private colleges also offer January or February starts, but **we haven''t verified the 2027 dates for each partner**.

## Scholarships Myanmar students can apply for

- **Government of Ireland International Education Scholarship (GOI-IES):** open to applicants whose home (domicile) is outside the EU/EEA, Switzerland and the UK, so **Myanmar applicants qualify**. It is for **master''s, postgraduate diploma or PhD study** (NFQ Level 9–10). The award is a **€10,000 stipend** for one year plus a **full fee waiver** from the university. The **2027 call has not been published yet** (Higher Education Authority, checked 22 Nov 2026).
- **College awards:** private colleges and universities offer their own merit awards and discounts. **We didn''t verify partner-specific amounts for this guide.**


## Plan your Ireland application

We''ll compare CCT, DBS, GBS and UCD for your budget and career goals. [Book a free consultation](/#consultation) · [Search Irish courses](/course-finder) · [Ireland destination page](/destinations/ireland) · [Student visa checklist](/guides/student-visa-checklist-myanmar)
',
    '- CCT College Dublin course fees: https://www.cct.ie/course-fees/
- Dublin Business School international fees 2026/27: https://www.dbs.ie/docs/default-source/fee-sheets/dbs-fees-international.pdf
- Irish Immigration Service, Planning to study in Ireland (Stamp 2 work hours): https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/planning-to-study-in-ireland/ ; visa offices: https://www.irishimmigration.ie/visa-offices/
- Irish Immigration Service, Registration FAQs (€300 IRP fee): https://www.irishimmigration.ie/registering-your-immigration-permission/frequently-asked-questions-for-registration/
- Irish Immigration Service, Third Level Graduate Programme (Stamp 1G): https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/
- Citizens Information, Student visas (€10,000, €60): https://www.citizensinformation.ie/en/moving-country/visas-for-ireland/student-visas/
- Higher Education Authority, GOI-IES page and 2026 Call Document: https://hea.ie/policy/internationalisation/goi-ies/ ; https://hea.ie/assets/uploads/2026/01/2026-GOI-IES-Call-Document.pdf
- Irish minimum wage (via /workspace/wages/research.md, Nov 2026); ECB reference rates 20 Nov 2026 (1 EUR ≈ 4,972 MMK)
- QQI, first 28 TrustEd Ireland institutions (4 Feb 2026): https://www.qqi.ie/news/qqi-announces-first-28-higher-education-institutions-authorised-to-use-trusted-ireland-quality
- Irish Immigration Service, Interim List of Eligible Programmes: https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/interim-list-of-eligible-programmes-ilep/ ; Third Level Graduate Programme (recognised Irish awarding bodies incl. QQI): https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/
- Griffith College, Non-EU tuition fees, scholarships and bursaries: https://www.griffith.ie/sites/default/files/2025-11/gop-nef-b-25.11.v1-compressed.pdf ; undergraduate guide (intakes): https://www.griffith.ie/sites/default/files/2026-09/non-eu-undergraduate-v5.3.4-digital-compressed-clickable.pdf
- Holmes Institute Dublin, BA (Hons) in Business (intakes): https://www.hid.ie/ba-hons-business',
    'study in ireland for myanmar students',
    'ireland student visa myanmar, stamp 2 work hours, stamp 1g ireland, dublin business school fees, cct college dublin fees, government of ireland scholarship myanmar',
    'ireland',
    false,
    NULL,
    '2026-11-22'::date,
    11
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('How much does it cost to study in Ireland for a Myanmar student?', 'At our partners, non-EU bachelor''s fees start at about €8,600 a year (CCT) and €10,365 (DBS). You also need €10,000 a year for living costs.', 1),
  ('How much bank balance do I need for an Irish student visa?', '€10,000 for each year of study, on top of course fees.', 2),
  ('How many hours can I work in Ireland as a student?', '20 hours a week during term, and 40 hours a week in June to September and from 15 December to 15 January.', 3),
  ('Can I stay in Ireland after graduation?', 'Yes. Stamp 1G gives up to 12 months after a Level 8 degree, and up to 24 months after a Level 9 master''s or higher.', 4),
  ('Is there an Irish embassy in Myanmar?', 'No. You apply online through AVATS and send documents to the office named on your summary form.', 5),
  ('Are there Irish government scholarships for Myanmar students?', 'Yes, at postgraduate level: the GOI-IES pays €10,000 plus a full fee waiver for one year. The 2027 call hasn''t opened yet.', 6),
  ('Are there good private colleges in Ireland?', 'Yes. Dublin has several well-established private colleges, including our partners CCT College Dublin (from €8,600 a year), Dublin Business School (€10,365) and Holmes Institute Dublin. All three were in QQI''s first TrustEd Ireland list (January 2026). Check that your course leads to a QQI award so you can get Stamp 1G.', 7)
) AS v(question, answer, sort_order);

-- 12. study-in-italy-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'study-in-italy-myanmar-students',
    'Study in Italy for Myanmar Students: Fees, DSU Grants, Visa and Work (2026/27)',
    'Study in Italy for Myanmar Students: Fees & DSU Grants',
    'Italy for Myanmar students: reduced public-university fees, regional DSU grants, €10,179.85 visa funds, 20-hour work rule and the ESE partner option.',
    'Myanmar is on Italy''s official list of "particularly poor" countries, so some public universities charge Myanmar students very low fees: at Bologna, €657.04 a year for a bachelor''s. Regional DSU grants of up to about €8,100 a year are open to Myanmar students. The study visa needs proof of €10,179.85 a year.',
    '## Why Italy is worth a look

- **Very low public-university fees** for students from countries like Myanmar.
- **Regional "right to study" (DSU) grants**, which can include cash, housing and meals.
- **English-taught degrees** at many public universities and at private schools.
- An **Italian Embassy in Yangon** handles study visas, so you don''t need to travel abroad to apply.

## Public universities: what Myanmar students pay

Italian public universities set fees by family income or by nationality. There isn''t one national price.

| University (not a partner) | Who it applies to | Fee per year (2026/27) | ≈ MMK |
|---|---|---|---|
| University of Bologna | Bachelor''s, citizens of "particularly poor" countries (income and assets outside Italy) | €500 + €157.04 = €657.04 | 3.3M |
| University of Bologna | Master''s, same group | €600 + €157.04 = €757.04 | 3.8M |
| Politecnico di Milano | Income-based range | €157.04 – €3,943.04 | 0.8M – 19.6M |

The Italian Embassy Yangon confirms that **Myanmar is on the "particularly poor countries" list**. Students from these countries can prove family income with a document from the Italian embassy instead of the Italian ISEE.

**Note:** at Politecnico di Milano, non-EU master''s students with a foreign bachelor''s degree pay the maximum unless they hold a scholarship or DSU grant.

## Our Italian partner: European School of Economics

| Partner | Fee | ≈ MMK |
|---|---|---|
| **European School of Economics (ESE)** ✅, Milan / Rome / Florence | €28,000 a year tuition | 139.2M a year |
| | + £2,500 registration fee | + 14.8M |
| | + €2,000 dissertation fee | + 9.9M |

ESE is a **private school** with small classes, and it''s the only Italian institution in our course finder. It isn''t a low-cost option. **We don''t currently have an Italian public-university partner**, but we can still guide you through public-university and DSU applications.

## Private universities in Italy

Italy has a group of **private ("non-state") universities that are legally recognised by the Ministry of University and Research (MUR)**. Their degrees have the same legal value as degrees from public universities. There are also **foreign-system private schools** that award degrees from another country. The difference matters for your visa and your future.

| Institution | City | Type | Popular programmes | Official tuition (non-EU) | ≈ MMK | Intakes |
|---|---|---|---|---|---|---|
| **European School of Economics (ESE)** ✅ | Milan, Rome, Florence | Private school; **UK degrees** validated by Richmond American University London | Business, economics, management | **€28,000 a year** + £2,500 registration + €2,000 dissertation | 139.2M a year (+14.8M + 9.9M) | Not verified |
| **Bocconi University** (not a partner) | Milan | Private university, legally recognised by MUR | Economics, management, finance, law | **€17,000 a year** (2026/27 maximum for BSc and Law; funding can reduce it) | 84.5M | September |
| **LUISS Guido Carli** (not a partner) | Rome | Private university, legally recognised by MUR | Economics and business, law | **€14,000** in year 1 (2026/27) + Lazio regional student tax | 69.6M | September |

### Do private-university students get the same rights?

- **At MUR-recognised private universities such as Bocconi and LUISS:** yes. You use the same **Universitaly pre-enrolment**, the same Type D study visa and the same **20 hours a week / 1,040 hours a year** work limit as at a public university.
- **At ESE:** students receive a **UK award from Richmond American University London**, naming ESE as the place of study. **It isn''t an Italian state degree.** Some Italian rules are written for students enrolled at Italian universities, such as Universitaly pre-enrolment, regional DSU grants and permits to stay and look for work after an Italian degree. **We haven''t verified how each of these applies to ESE students.** Ask ESE and the Italian Embassy Yangon to confirm the visa route before you pay.
- **Low public fees vs private:** Bocconi and LUISS cost far more than public universities like Bologna (€657.04 a year for Myanmar citizens), but still much less than ESE.

## DSU scholarships Myanmar students can apply for

DSU grants are run by regional agencies and are based on income and merit. They are open to international students, including Myanmar. The amounts below are for students living away from home ("fuori sede"), 2026/27:

| Agency (region) | Top annual amount | ≈ MMK | Extras |
|---|---|---|---|
| EDISU Piemonte (Turin) | €8,096.78 | 40.3M | Less cash if you take an EDISU residence place |
| ER.GO (Emilia-Romagna, Bologna) | €7,171.11 | 35.7M | Lowest band €3,585.56 |
| DiSCo Lazio (Rome) | €6,571.11 | 32.7M | Plus 2 free meals a day |

Calls usually come out in early summer, with **deadlines from July to early September**. The 2027/28 calls aren''t published yet. From the second year, you must earn enough credits to keep the grant.

## Italian study visa for Myanmar nationals

1. **Pre-enrol on Universitaly.** The university validates your application.
2. Apply for a **Type D study visa at the Italian Embassy Yangon**.
3. Show **€10,179.85 a year** in funds (≈ 50.6M MMK). The money must be lawful and traceable. Bank guarantees and insurance policies aren''t accepted.
4. Within 8 days of arriving, apply for your **study residence permit** (permesso di soggiorno).

## Can Myanmar students work in Italy?

Yes. A study residence permit allows work of **up to 20 hours a week**, to a maximum of **1,040 hours a year**. Italy has **no statutory national minimum wage**; pay is set by sector agreements.

## After graduation: post-study work

Italian law lets graduates apply to stay and look for work, or convert their permit to a work permit if they have a job offer. **The exact duration and conditions weren''t verified for this guide.** Confirm with the Questura (police immigration office) before you plan around them.

## Intakes

Most public programmes start in **September or October**. Universitaly pre-enrolment and university deadlines often fall in **spring**, so start **9–12 months ahead**. **ESE''s 2027 start dates weren''t verified.**


## Plan your Italy application

We''ll help with Universitaly, the embassy appointment and DSU paperwork. [Book a free consultation](/#consultation) · [Search Italian courses](/course-finder) · [Italy destination page](/destinations/italy) · [Cheapest countries to study abroad](/guides/cheapest-country-to-study-abroad-myanmar)
',
    '- Italian Embassy Yangon, Studying in Italy (Myanmar on the particularly-poor-countries list): https://ambyangon.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/studying-in-italy/
- Italian Ministry of Foreign Affairs, Study in Italy FAQ (Universitaly, €10,179.85, 20 hours a week): https://www.esteri.it/en/ministero/sportello_info/domandefrequenti/studiare-in-italia/
- University of Bologna 2026/27 fees for international students (via /workspace/tiktok-carousel-plan/research/post-12-low-tuition.md, 11 Nov 2026)
- Politecnico di Milano fees: https://www.polimi.it/en/prospective-students/how-much-does-it-cost/laurea-laurea-magistrale-and-single-cycle-programmes
- ER.GO amounts: https://www.er-go.it/cosa-fare-per/bandi-di-concorso/importi-pagamenti-e-revoche/importi
- EDISU Piemonte call 2026/27: https://www.edisu.piemonte.it/sites/default/files/documentazione/bandi-di-concorso/Bando_borsa_di_studio_servizio_abitativo_premio_di_laurea_contributo_studenti_con_disabilit%C3%A0_dal_46_p.c._iscritti_al_collocamento_mirato_a.a._2026-27_0.pdf
- DiSCo Lazio call 2026/27: https://laziodisco.it/wp-content/uploads/2026/07/BANDO-DIRITTO-ALLO-STUDIO-26-27-con-EC.pdf
- European School of Economics fees: https://www.ese.ac.uk/admission/programme-fees-scholarships
- ECB reference rates 20 Nov 2026 (1 EUR ≈ 4,972 MMK; 1 GBP ≈ 5,937 MMK)
- MUR, Le Università (state and legally recognised non-state universities): https://www.mur.gov.it/it/aree-tematiche/universita/le-universita
- European School of Economics, Accreditations & partnerships (Richmond American University London validation): https://www.ese.ac.uk/about-ese/accreditations-partnerships
- Bocconi University, Fees for BSc and Law programmes 2026/27: https://www.unibocconi.it/en/current-students/fees/bsc-and-law-programs
- LUISS, Tuition fee 2026/27 bachelor''s degrees: https://www.luiss.it/sites/default/files/media-documents/Tuition_Fee_26-27_LT_2.pdf ; admission for extra-EU students: https://www.luiss.edu/entra-luiss/ammissione-triennali-e-ciclo-unico/studenti-extra-ue',
    'study in italy for myanmar students',
    'italy student visa myanmar, universitaly pre enrolment, dsu scholarship italy international students, university of bologna fees developing countries, european school of economics fees, study in italy cost',
    'italy',
    false,
    NULL,
    '2026-11-22'::date,
    12
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('Is studying in Italy cheap for Myanmar students?', 'At some public universities, yes. Bologna charges students from "particularly poor" countries such as Myanmar €657.04 a year for a bachelor''s (2026/27).', 1),
  ('Can Myanmar students get the DSU scholarship in Italy?', 'Yes. Regional DSU calls are open to international students, and Myanmar students prove income with a certificate from the Italian embassy. Top amounts are about €6,500–8,100 a year.', 2),
  ('How much money do I need for an Italian student visa?', '€10,179.85 a year (2026), from lawful and traceable funds.', 3),
  ('Where do Myanmar students apply for an Italian study visa?', 'At the Italian Embassy in Yangon, after pre-enrolling on Universitaly.', 4),
  ('How many hours can I work as a student in Italy?', 'Up to 20 hours a week, with a maximum of 1,040 hours a year.', 5),
  ('Is the European School of Economics a public university?', 'No. ESE is a private business school charging €28,000 a year. It is our partner in Italy.', 6),
  ('Are there good private universities in Italy?', 'Yes. Bocconi (Milan, €17,000 a year, 2026/27) and LUISS (Rome, €14,000 in year 1) are private universities legally recognised by Italy''s MUR. Our partner ESE is a private school whose degrees are UK awards from Richmond American University London, so confirm the visa and post-study rules for it first.', 7)
) AS v(question, answer, sort_order);

-- 13. study-in-finland-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'study-in-finland-myanmar-students',
    'Study in Finland for Myanmar Students: UAS Fees, Permit, Work and Scholarships (2026/27)',
    'Study in Finland for Myanmar Students: 2026/27 Guide',
    'Finland UAS fees from €9,000, €800/month proof of funds, 30-hour work rule, 2-year job-seeker permit and scholarships for Myanmar students.',
    'Non-EU bachelor''s fees at the Finnish universities of applied sciences we work with through EduNation are about €9,000–12,000 a year (≈ 44.7M–59.7M MMK). For the residence permit you show at least €800 a month (€9,600 a year). Students can work 30 hours a week on average, and graduates can apply for a job-seeker permit of up to two years.',
    '## Which Finnish institutions do we work with?

For Finland we work only with the institutions on our partner **EduNation''s** list. As of 22 November 2026, EduNation''s website lists:

- **Kajaani University of Applied Sciences (KAMK)**
- **Karelia University of Applied Sciences** (Joensuu)
- **LAB University of Applied Sciences** (Lahti and Lappeenranta)
- **LUT University** (Lappeenranta and Lahti)
- **Metropolia University of Applied Sciences** (Helsinki, Espoo, Vantaa)
- **Satakunta University of Applied Sciences (SAMK)**
- **Turku University of Applied Sciences**

Universities of applied sciences (UAS) focus on practical, job-oriented degrees with internships built in. Most English-taught bachelor''s programmes take 3.5–4 years.

## How much are tuition fees in Finland?

| Institution (via EduNation) | Programme | Non-EU tuition | ≈ MMK |
|---|---|---|---|
| **LAB UAS** | Bachelor''s, early-bird price (autumn 2026) | €9,000 a year | 44.7M |
| **LAB UAS** | Bachelor''s, regular price | €11,000 a year | 54.7M |
| **LAB UAS** | Master''s (whole programme) | €18,000 total (€15,000 early bird) | 89.5M |
| **Turku UAS** | Bachelor''s | €11,500–12,000 a year | 57.2M–59.7M |
| **Metropolia UAS** | Bachelor''s | €11,500–12,000 a year | 57.2M–59.7M |

Study in Finland says non-EU tuition across Finland usually runs from **€9,000 to €20,000 a year**. Applicants from outside the EU/EEA also pay a **€100 application fee** (≈ 0.5M MMK). **We haven''t checked 2027 fees for KAMK, Karelia, LUT or SAMK yet.**

## Are there private universities in Finland?

**No, not among the institutions we work with, and Finland has essentially no private-university sector of the kind found in Canada, Ireland or Switzerland.** The EU''s Eurydice network describes Finnish higher education as **publicly funded**: Parliament sets core funding, and the Ministry of Education and Culture allocates it to universities and universities of applied sciences.

All seven institutions on EduNation''s list (KAMK, Karelia, LAB, LUT, Metropolia, SAMK and Turku UAS) are part of this **public system**. Non-EU students still pay tuition (about €9,000–12,000 a year at these institutions), and the work and post-study rules in this guide apply equally at all of them.

**Be careful with "private Finnish universities" advertised online.** Study in Finland warns students about fake universities and unaccredited providers. For Finland, we only recommend the EduNation institutions above.

## Living costs and proof of funds

- **Migri minimum:** at least **€800 a month (€9,600 a year)** (≈ 47.7M MMK), on top of tuition.
- **Realistic budget:** Study in Finland suggests **€900–1,200 a month**. A room in a shared student flat costs about **€200–380 a month**.
- **Other costs:** student healthcare fee about **€70 a year**, and a student union fee of about **€50–70 a year** at universities.

**Example first year at LAB (early bird):** €9,000 tuition + €9,600 living = **about €18,600 (≈ 92.5M MMK)** before flights, insurance and permit fees. That''s our own addition.

## Student residence permit for Myanmar nationals

You apply online to the **Finnish Immigration Service (Migri)** with your acceptance letter, proof of tuition payment (or scholarship), proof of funds and health insurance. After applying, you must prove your identity at a Finnish mission. **Which mission serves Myanmar applicants, and the 2026 permit fee (a search snippet showed €600 online), are not confirmed in this guide**, because Migri''s website blocked our check.

## Can Myanmar students work in Finland?

Yes. According to Study in Finland, international students can work **up to 30 hours a week on average** during the academic year, and **full time in holidays**. Finland has no general statutory minimum wage; pay is set by sector agreements.

## After graduation: job-seeker permit and PR

- After your degree, you can apply for a **residence permit to look for work or start a business**, valid for **up to two years**.
- You need funds of at least **€800 a month** for this permit too.
- Once you''re working, continuous residence can later lead to permanent residence. Rules change, so check Migri when you get there.

## Intakes

The main start is **August/September**. Some programmes also start in **January**. Applications mostly go through Finland''s joint application rounds on Studyinfo.fi. **We haven''t verified the 2027 round dates**; check Studyinfo.fi or ask us.

## Scholarships Myanmar students can get

Finnish scholarships are mainly **tuition discounts from the institution**:

- **LAB UAS:** early-bird price (**€9,000 instead of €11,000** in year 1), then a **€3,000 a year reduction from year 2** if you complete 60 ECTS credits a year.
- **Turku UAS:** **€1,000 early-bird discount** off first-year tuition.
- **Metropolia and others:** have their own discount schemes; ask us for the current terms.


## Plan your Finland application

We''ll help you pick an EduNation institution and hit the early-bird deadline. [Book a free consultation](/#consultation) · [Finland destination page](/destinations/finland) · [Cheapest countries to study abroad](/guides/cheapest-country-to-study-abroad-myanmar)
',
    '- EduNation, Finnish partner universities (checked 22 Nov 2026): https://www.edunation.co/study-in-finland/universities/
- LAB UAS, Tuition fee and residence permit: https://lab.fi/en/studies/admission/joint-application-guide/eligibility-and-student-selection/tuition-fee-and-residence-permit
- Turku UAS, Tuition fees and scholarships: https://www.turkuamk.fi/en/education/guide-for-applicants/tuition-fees-and-scholarships/
- Metropolia, Tuition fees: https://www.metropolia.fi/en/study-at-metropolia/tuition-fees
- Study in Finland, Fees and cost of living (€800/month, €100 application fee, 30 hours a week): https://www.studyinfinland.fi/funding-your-studies/fees-and-cost-living ; FAQ: https://www.studyinfinland.fi/faq
- Migri, Residence permit to look for work: https://migri.fi/en/residence-permit-to-look-for-work
- Migri, Studies (permit application): https://migri.fi/en/residence-permit-application-for-studies (blocked our fetch)
- ECB reference rates 20 Nov 2026 (1 EUR ≈ 4,972 MMK)
- Eurydice (European Commission), Finland – Higher education funding: https://eurydice.eacea.ec.europa.eu/eurypedia/finland/higher-education-funding
- Ministry of Education and Culture (OKM), Steering, financing and agreements: https://okm.fi/en/steering-financing-and-agreements
- Study in Finland, Beware of fake universities: https://www.studyinfinland.fi/news-events/beware-of-fake-universities',
    'study in finland for myanmar students',
    'finland student residence permit myanmar, lab university of applied sciences fees, turku uas scholarship, metropolia tuition fees, finland part time work students, edunation finland',
    'finland',
    false,
    NULL,
    '2026-11-22'::date,
    13
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('How much does it cost to study in Finland for a Myanmar student?', 'At the institutions we work with, bachelor''s tuition is about €9,000–12,000 a year. You also need at least €800 a month for living costs.', 1),
  ('How much money do I need for a Finnish student residence permit?', 'At least €800 a month (€9,600 a year), on top of tuition, according to Migri''s minimum as quoted by Study in Finland.', 2),
  ('How many hours can students work in Finland?', 'Up to 30 hours a week on average during the academic year, and full time during holidays.', 3),
  ('Can I stay in Finland after graduation?', 'Yes. You can apply for a residence permit to look for work or start a business, valid for up to two years.', 4),
  ('Which Finnish universities does Saturday Education work with?', 'Only the institutions on EduNation''s partner list: KAMK, Karelia, LAB, LUT, Metropolia, SAMK and Turku UAS.', 5),
  ('Are there scholarships in Finland for Myanmar students?', 'Yes, mostly tuition discounts, such as LAB''s €3,000 a year from year 2 and Turku UAS''s €1,000 early-bird discount.', 6),
  ('Are there good private universities in Finland?', 'Not in the usual sense. Finnish higher education is publicly funded, and the institutions we recommend through EduNation (KAMK, Karelia, LAB, LUT, Metropolia, SAMK and Turku UAS) are all part of the public system, even though non-EU students pay tuition. Be wary of anyone advertising a “private Finnish university”.', 7)
) AS v(question, answer, sort_order);

-- 14. study-in-china-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'study-in-china-myanmar-students',
    'Study in China for Myanmar Students: Fees, X1 Visa, Scholarships and Work Rules (2027)',
    'Study in China for Myanmar Students: 2027 Guide',
    'China for Myanmar students: XJTLU fees, entry scholarships up to 50%, X1 visa and JW202, CSC scholarship route, part-time work rules and jobs after study.',
    'At our partner XJTLU (Suzhou), international undergraduate tuition is RMB 99,000 a year (≈ 67M MMK), with a 10% early-bird discount and entry scholarships of up to 50%. You study on an X1 visa with a JW202 form from your university. Part-time work needs university approval, and master''s graduates can get a work permit more easily.',
    '> ⏰ **XJTLU scholarship deadline: 30 November 2026.** To be considered in Round 1 of XJTLU''s Entry Scholarship (up to 50% off tuition), you must submit your application and upload your key documents (passport, school transcripts, and English test results if you have them) by **30 November 2026**. **Missed it? Round 2 closes on 15 January 2027.** Later rounds close on 28 Feb, 31 Mar and 30 Apr 2027. [Book a free consultation](/#consultation) and we''ll help you get offer-ready in time.

## Why consider China?

- **Close to home** for Myanmar families.
- **English-taught degrees** at international universities such as XJTLU.
- **Government scholarships** that Myanmar students can apply for through the Chinese Embassy.

Our partner in China is **Xi''an Jiaotong-Liverpool University (XJTLU)** in Suzhou, near Shanghai. It''s a joint venture between Xi''an Jiaotong University and the University of Liverpool, and teaches in English.

## How much does it cost to study at XJTLU?

| Item (2027 entry) | Amount | ≈ MMK |
|---|---|---|
| International undergraduate tuition | RMB 99,000 a year | 67.0M |
| Early-bird discount (if you meet the 31 March 2027 conditions) | −10% (RMB 9,900) | −6.7M |
| Entry Scholarship for Outstanding Academic Applicants | up to 50% of tuition (up to RMB 49,500) | up to −33.5M |
| Sibling discount | 5% (2nd sibling) to 15% (4th) | — |

**Accommodation and living costs at XJTLU weren''t verified for this guide.** Ask us for the current housing fees.

### Early-bird conditions (XJTLU)
To get the 10% discount, you must:
- apply and submit documents by **31 March 2027**;
- receive an offer by that date;
- for conditional offers, send supporting documents by **30 June**;
- pay your deposit by the deadline on your unconditional offer.

### Entry scholarship rounds (2027 entry)
You must be "offer-ready" (key documents uploaded) by the round deadline:

| Round | Deadline |
|---|---|
| 1 | 30 November 2026 |
| 2 | 15 January 2027 |
| 3 | 28 February 2027 |
| 4 | 31 March 2027 |
| 5 | 30 April 2027 |

**Round 1 closes on 30 November 2026.** If you have strong grades, apply now.

## Private and international universities in China

For Myanmar students, the most relevant "private-style" option in China is the **Sino-foreign joint-venture university**. These are independent universities set up by a Chinese partner and a foreign university. They teach in English, follow the foreign partner''s model, and charge higher fees than Chinese public universities.

| Institution | City | Type | Example subject areas* | Official international tuition | ≈ MMK |
|---|---|---|---|---|---|
| **Xi''an Jiaotong-Liverpool University (XJTLU)** ✅ | Suzhou | Sino-foreign joint venture (Xi''an Jiaotong University + University of Liverpool) | Business, engineering, computing, design | **RMB 99,000 a year** (2027 entry); 10% early bird; up to 50% entry scholarship | 67.0M |
| **Wenzhou-Kean University** (not a partner) | Wenzhou | Sino-foreign joint venture (with Kean University, USA) | Business, sciences, architecture, design | **RMB 88,000 a year** (2027, subject to approved rates); accommodation RMB 8,000–10,000 a year | 59.6M |
| **University of Nottingham Ningbo China** (not a partner) | Ningbo | Sino-foreign joint venture (with the University of Nottingham, UK) | Business, economics, engineering, English | **RMB 120,000 a year**; total yearly cost about RMB 150,000–190,000 including housing and living | 81.2M (tuition) |
| **NYU Shanghai** (not a partner) | Shanghai | Sino-foreign joint venture (with New York University) | Liberal arts, business, data science | **¥231,437 per term** for 12–18 credits = ¥462,874 a year (2026/27) | 313.4M a year |
| **Duke Kunshan University** (not a partner) | Kunshan | Sino-foreign joint venture (with Duke University) | Interdisciplinary liberal arts and sciences | **US$73,740** tuition and fees (2026/27); estimated total cost **US$84,065** | 333.6M (tuition and fees) |

*Subject areas are indicative and weren''t checked programme by programme; see each university''s course list.

**What this means for budgets:** XJTLU and Wenzhou-Kean are the most affordable of these. NYU Shanghai and Duke Kunshan cost about as much as a US private university, although both offer financial aid. **We haven''t checked their aid rules for Myanmar applicants.**

### Do students at these universities get the same rights?

Yes. Joint-venture universities follow the same national rules as other Chinese universities:

- the same **X1 visa and JW202** process, and a residence permit after arrival;
- the same **work-study rules** under Ministry of Education Order No. 42 (approved internships or work-study only, with a residence-permit annotation);
- the same **master''s-graduate work-permit route**.

The main intake at all of them is the **autumn (September) semester**. Check each university''s application deadlines.

## Chinese Government Scholarship (CSC) for Myanmar students

Full Chinese Government Scholarship awards typically cover tuition, accommodation, a living allowance and medical insurance; check the terms in each year''s notice. Myanmar applicants can use two routes:

- **Bilateral (Type A):** you apply through the **Chinese Embassy in Myanmar**.
- **University (Type B):** you apply directly to a Chinese university that runs the CSC programme.

**The 2027 embassy notice and deadlines are not confirmed in this guide.** They are usually announced early in the year. Check the embassy website or ask us.

## China student visa (X1) for Myanmar nationals

1. Get your **admission letter** and **JW202 form** from the university. XJTLU has a dedicated JW202/visa page.
2. Apply for an **X1 visa** (study of more than 180 days) at the **Chinese Embassy in Yangon** or the **Consulate-General in Mandalay**. Long-term study visas usually also need a physical examination record; follow the embassy checklist.
3. **Fee:** the embassy''s schedule lists **US$37 for a single-entry visa for Myanmar citizens**, payable in **US dollars cash** (≈ 0.17M MMK). The embassy has extended a **temporary visa-fee reduction to 31 December 2026**, so the amount you pay may be lower. Confirm it when you apply.
4. After arriving, convert your X1 visa into a **student residence permit** at the local public security exit-entry office, within the period stated on your visa.

## Can Myanmar students work in China?

Only in a limited way. Under China''s Ministry of Education **Order No. 42 (2017)**, international students may join **work-study activities** under the university''s rules, but **may not take up employment or run a business**.

- **Off-campus internships or work-study** need **university approval** first.
- Your **residence permit** must then be annotated by the public security office with the place and duration.
- Working without this annotation is illegal and can lead to fines or deportation.

**Don''t plan on part-time income in China.**

## Working in China after graduation

A 2017 national notice lets international students who earn a **master''s degree or higher from a Chinese university** apply for a work permit **within one year of graduating**, without the usual **two years'' work experience**. They must meet grade, health, clean-record, job-relevance and salary conditions.

**Bachelor''s graduates** normally need work experience. China doesn''t offer an easy permanent-residence route for graduates.

## Intakes

XJTLU undergraduate programmes start in **September**. Applications for 2027 are open now, with scholarship rounds from November 2026 to April 2027.


## Plan your China application

XJTLU''s first scholarship round closes on 30 November 2026. [Book a free consultation](/#consultation) · [Search courses](/course-finder) · [Student visa checklist](/guides/student-visa-checklist-myanmar)
',
    '- XJTLU, International undergraduate fees and scholarships (2027 entry): https://www.xjtlu.edu.cn/en/admissions/global/fees-and-scholarships
- Embassy of the PRC in Myanmar, Schedule of Fees for Consular Services: https://mm.china-embassy.gov.cn/eng/lsfw/hzqz/202312/t20231208_11197917.htm
- Consulate-General of the PRC in Mandalay, notice extending the reduced visa fees to 31 Dec 2026 (4 Jan 2026): https://mandalay.china-consulate.gov.cn/fwzc/lsfw/zytz/202601/t20260104_11797328.htm ; Introduction of visas: https://mandalay.china-consulate.gov.cn/eng/fwzc/lsyw/qzsx/202312/t20231218_11206379.htm
- Chinese Visa Application Service Center, X1 long-term study: https://www.visaforchina.cn/TAS4_EN/qianzhengyewu/jichuzhishi/banliliucheng/552382625898172433.html
- Ministry of Education Order No. 42 (2017), rules on international students: http://www.moe.gov.cn/jyb_xxgk/xxgk/zhengce/guizhang/202112/t20211206_585055.html
- Beijing Municipal Government, residence permits endorsed for internship or work-study: https://english.beijing.gov.cn/mostrequested/residencepermit/international/202405/t20240528_3695884.html
- Notice on allowing outstanding foreign graduates to work in China (Ren She Bu Fa [2017] No. 3), as republished by the Beijing Municipal Government: https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/201912/t20191211_1034128.html
- Campus China (CSC official portal): https://www.campuschina.org
- ECB reference rates 20 Nov 2026 (1 CNY ≈ 677 MMK; 1 USD ≈ 4,524 MMK)
- Wenzhou-Kean University, Tuition, fees and scholarships (2027): https://admission.wku.edu.cn/en/tuition-fees-and-scholarships
- University of Nottingham Ningbo China, Undergraduate fees and scholarships: https://www.nottingham.edu.cn/en/study-with-us/undergraduate/fees-and-scholarships/
- NYU Shanghai, International students – schedule of tuition and fees 2026/27: https://shanghai.nyu.edu/content/international-students
- Duke Kunshan University, Tuition & cost of attendance (international, 2026/27): https://admissions.dukekunshan.edu.cn/en/tuition-international-students/',
    'study in china for myanmar students',
    'china student visa myanmar, x1 visa jw202, xjtlu fees international students, chinese government scholarship myanmar, csc scholarship myanmar 2027, work in china after graduation',
    'china',
    false,
    NULL,
    '2026-11-25'::date,
    14
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('How much does it cost to study in China for Myanmar students?', 'At XJTLU, international undergraduate tuition is RMB 99,000 a year (≈ 67M MMK) before discounts. Public Chinese universities and CSC scholarships can cost much less.', 1),
  ('Can Myanmar students get the Chinese Government Scholarship?', 'Yes. Myanmar applicants can apply through the Chinese Embassy in Myanmar (bilateral route) or directly to participating universities. The 2027 embassy dates aren''t published in this guide.', 2),
  ('What visa do I need to study in China?', 'An X1 visa for study of more than 180 days, using your admission letter and JW202 form.', 3),
  ('How much is the Chinese student visa fee in Myanmar?', 'The embassy''s schedule lists US$37 for a single entry for Myanmar citizens, in US dollar cash. A temporary fee reduction runs to 31 December 2026.', 4),
  ('Can international students work part-time in China?', 'Only approved work-study or internships, with university approval and a residence-permit annotation. Regular employment isn''t allowed.', 5),
  ('Does XJTLU offer scholarships to Myanmar students?', 'Yes. International applicants can get an entry scholarship of up to 50% of tuition, plus a 10% early-bird discount if they meet the deadlines.', 6),
  ('Are there good private or international universities in China?', 'Yes. Sino-foreign joint-venture universities teach in English with a foreign partner university. Our partner XJTLU charges RMB 99,000 a year. Others include Wenzhou-Kean (RMB 88,000), UNNC (RMB 120,000), NYU Shanghai (¥462,874) and Duke Kunshan (US$73,740 tuition and fees). Visa and work rules are the same as at other Chinese universities.', 7)
) AS v(question, answer, sort_order);

-- 15. study-in-switzerland-myanmar-students
WITH inserted AS (
  INSERT INTO public.guides (
    slug, title, seo_title, meta_description, answer_box, body_markdown,
    sources_markdown, primary_keyword, keywords, related_destination_slug,
    is_published, published_at, sources_checked_at, sort_order
  ) VALUES (
    'study-in-switzerland-myanmar-students',
    'Study in Switzerland for Myanmar Students: Hotel School Fees, Visa and Work Rules (2027)',
    'Study in Switzerland for Myanmar Students: 2027 Guide',
    'Swiss hotel school fees for 2027 (Les Roches, César Ritz), the Swiss D visa, the 15-hour work rule and post-study limits for Myanmar students.',
    'Switzerland is mainly a hospitality and business destination for Myanmar students, and it''s expensive. At our partner César Ritz Colleges, a 2027 bachelor''s costs CHF 169,300 in total, including housing and meals (≈ 913M MMK). At Les Roches, tuition alone is CHF 33,450 a semester. Paid internships are built in, and term-time work is limited to 15 hours a week.',
    '## Who is Switzerland right for?

Switzerland is known worldwide for **hotel and hospitality management** schools. These programmes combine campus terms with **paid internships** in hotels and resorts. They suit students who want an international hospitality career and whose families have a large budget.

Our Swiss partners in the course finder are:

- **Les Roches** (Crans-Montana)
- **César Ritz Colleges**
- **Hotel and Tourism Management Institute Switzerland (HTMi)**
- **Hotel Institute Montreux**
- **International University in Geneva (IUG)**
- **Montreux Institute of Business Development**
- **Swiss School of Business and Management (SSBM) Geneva**

All of these are **private institutions**.

## How much does it cost?

### César Ritz Colleges ✅: BSc in Hospitality Business Management (2027 fees)

| Item | Amount | ≈ MMK |
|---|---|---|
| Tuition, whole programme (10 terms + 2 paid internships) | CHF 88,000 | 474.3M |
| Accommodation, meals and infrastructure, whole programme | CHF 81,300 | 438.2M |
| **Total programme cost** | **CHF 169,300** | **912.5M** |
| One regular campus term, all-in (tuition CHF 9,900 + housing, meals, infrastructure) | CHF 18,900 | 101.9M |
| Security deposit | CHF 2,000 | 10.8M |

No school fees are charged during the paid internship periods.

### Les Roches ✅ (Crans-Montana): BSc Global Hospitality Management (Spring and Fall 2027 intakes)

| Item | Amount | ≈ MMK |
|---|---|---|
| Tuition per academic semester | CHF 33,450 | 180.3M |
| Total compulsory academic expenses (tuition, academic resources, insurance), whole programme | CHF 183,575 | 989.5M |
| Total compulsory living expenses (board, double room), whole programme | CHF 42,550 | 229.3M |
| Application fee | CHF 275 | 1.5M |
| Damage deposit (refundable) | CHF 1,000 | 5.4M |

The Les Roches programme totals add up to **about CHF 226,000 (≈ 1.22 billion MMK)**. That sum is our own addition of the two official totals; internships are fee-free.

**Fees for HTMi, Hotel Institute Montreux, IUG, MIBD and SSBM weren''t checked for this guide.** Some are much cheaper than Les Roches, so ask us to compare.

## Private hotel and business schools in Switzerland

Almost every Swiss option a Myanmar student will consider is a **private school**. The most important thing to check is **accreditation**. Only some private schools hold **institutional accreditation under Switzerland''s Higher Education Act (HEdA)**, granted by the Swiss Accreditation Council. That status puts them inside the Swiss higher-education system.

| Institution | Location | Type and Swiss accreditation | Popular programmes | Official fees (international) | ≈ MMK | Intakes |
|---|---|---|---|---|---|---|
| **Les Roches** ✅ | Crans-Montana | Private; **HEdA institutionally accredited** (20 Sep 2024 – 19 Sep 2031), designated a "University of Applied Sciences Institute"; also NECHE-accredited (USA) | BSc Global Hospitality Management, master''s programmes | **CHF 33,450 tuition per semester** (2027) | 180.3M per semester | Spring and Fall 2027 |
| **César Ritz Colleges** ✅ | Switzerland | Private; **HEdA institutionally accredited** (29 Nov 2023 – 28 Nov 2030) | BSc Hospitality Business Management, BSc Applied AI for Hospitality Business Management, MSc Leadership | **CHF 169,300 total** for the BSc, including housing and meals (2027) | 912.5M total | Several terms a year |
| **HTMi (Hotel and Tourism Management Institute Switzerland)** ✅ | Switzerland | Private; **not found on the Swiss Accreditation Council''s decisions list** (22 Nov 2026) | Hospitality and culinary diplomas, BSc (Hons), postgraduate diplomas, MBA | Bachelor''s-degree semester: **CHF 30,000** (tuition CHF 25,000 + food + shared room, 20 weeks) + **CHF 3,350** non-refundable down payment per semester. Years 1–3 of the 4-year route: CHF 25,500 + CHF 3,350 | 161.7M + 18.1M per semester | 2027: 18 Jan, 5 Apr, 2 Aug |
| **Hotel Institute Montreux, International University in Geneva (IUG), Montreux Institute of Business Development, SSBM Geneva** ✅ | Montreux / Geneva | Private; **not found on the Swiss Accreditation Council''s decisions list** (22 Nov 2026) | Hospitality and business | Not checked for this guide | — | Ask us |

Some of these schools hold other accreditations, or award degrees through foreign partner universities. **We haven''t verified these for this guide.** Ask each school which body awards your degree.

### Do private-school students get the same work and post-study rights?

**Not necessarily, which is why accreditation matters:**

- **Work during studies:** Swiss cantons allow non-EU students in higher education **up to 15 hours a week after six months**, with permission. The canton of Zurich''s guidance refers to universities and universities of applied sciences. **Whether a non-accredited private school''s students get the same permission depends on the canton.** Paid internships built into hotel-school programmes are the main source of Swiss work experience.
- **Six-month job-search permit:** this is for graduates of a Swiss **"haute école"** (higher-education institution). HEdA-accredited schools such as **Les Roches** and **César Ritz Colleges** are the strongest candidates. Graduates of non-accredited schools **probably don''t qualify, but this isn''t confirmed**, and the canton decides each case.
- **Visa:** all of these schools issue admission letters for the Swiss **national D visa**. Cantons may judge your study plan and funds more strictly for non-accredited providers. **We haven''t verified this.**

## Swiss student visa for Myanmar nationals

- You need a **national D visa** for study longer than 90 days. Myanmar residents apply at the **Embassy of Switzerland in Yangon**. This comes from the embassy''s "where to apply" page, which we saw only in a search result because the page blocked direct access.
- **Typical documents:** application forms, passport, photos, admission letter, academic records, motivation letter, proof of tuition payment and **proof of financial means** (bank statements, or a sponsor''s letter and statements).
- **Proof-of-funds amounts are set by each canton**, so we haven''t quoted a figure. Your school''s admissions team will confirm it.
- Several Swiss embassies'' 2026 checklists list the student D visa as **free of charge**, but **we haven''t confirmed the Yangon fee**.
- Swiss embassy checklists warn that processing can take **8–12 weeks**, so apply early.

## Can Myanmar students work in Switzerland?

- **During studies:** students from outside the EU/EFTA may work **up to 15 hours a week**, but **only from six months after starting**. You need a work permit, and the school must confirm the job won''t delay your studies. The canton of Zurich applies this rule to students at universities and universities of applied sciences. **How it applies to private hotel schools depends on the canton and the school**, so check with your school.
- **Internships:** hospitality programmes include **paid internships** as part of the course, which is the main way students gain Swiss work experience.

## After graduation: limited stay-back

Graduates of a Swiss **higher-education institution** ("haute école") can apply for a **non-renewable six-month permit to look for a job**. During that time, side jobs of up to 15 hours a week may be authorised.

Two big caveats:

- **Only jobs of "high scientific or economic interest"** can skip the normal priority given to Swiss and EU workers.
- **Whether a private hotel-school degree counts** as a Swiss higher-education qualification for this permit **isn''t confirmed**.

In short, **don''t plan on staying in Switzerland after graduating**. Many graduates go on to jobs in hotel groups worldwide.

## Intakes

Les Roches publishes 2027 fees for **Spring and Fall intakes**. César Ritz runs several terms a year. **We haven''t verified the exact 2027 start dates for each partner.**

## Scholarships

Swiss hotel schools offer their own **merit and need-based scholarships**; Les Roches, for example, has a scholarships page. **We haven''t verified amounts or Myanmar eligibility for this guide.** We aren''t aware of any Swiss government scholarship that Myanmar students can use for bachelor''s study at private schools.


## Plan your Switzerland application

We''ll compare Swiss hotel schools with cheaper hospitality routes before you commit. [Book a free consultation](/#consultation) · [Search Swiss courses](/course-finder) · [Malaysia private university fees](/guides/malaysia-private-university-fees)
',
    '- César Ritz Colleges, Tuition and Fees 2027: https://www.cesarritzcolleges.edu/en/tuition-and-fees/index.html
- Les Roches, Tuition fees (Crans-Montana fees 2027 PDF, international students): https://lesroches.edu/apply/tuition-fees/
- Embassy of Switzerland in Myanmar, Where to apply for a national visa: https://www.schweiz-myanmar.eda.admin.ch/en/where-to-apply-for-a-national-visa (blocked our direct fetch; content seen in a search result)
- Canton of Zurich, Students and interns (15 hours a week after six months; six-month job-search permit): https://www.zh.ch/en/wirtschaft-arbeit/erwerbstaetigkeit-auslaender/studierende-und-praktikanten.html
- Canton of Vaud, Six-month stay to look for work after a Swiss higher-education degree (Art. 21 para. 3 LEI): https://www.vd.ch/population/population-etrangere/entree-et-sejour/etats-tiers/sejour-6-mois-pour-la-recherche-dun-emploi-pour-les-etudiants-diplomes-dune-haute-ecole-suisse
- State Secretariat for Migration, Directives on the Foreign Nationals Act, chapter 4: https://www.sem.admin.ch/dam/en/sd-web/cmA1JoMin1JJ/weisungen-aig-kap4.pdf
- ECB reference rates 20 Nov 2026 (EUR/CHF 0.9223; 1 CHF ≈ 5,390 MMK, approximate)
- Swiss Accreditation Council, Decisions (institutional accreditation of Les Roches and César Ritz Colleges): https://akkreditierungsrat.ch/en/decisions/
- Les Roches, Accreditations, awards and memberships: https://lesroches.edu/meet-les-roches/accreditations-awards-and-memberships/
- HTMi Switzerland, Fees, details & dates: https://htmi.ch/fees-details-dates/',
    'study in switzerland for myanmar students',
    'swiss hotel management school fees, les roches fees 2027, cesar ritz colleges fees, switzerland student visa myanmar, hospitality management switzerland, work while studying switzerland',
    'switzerland',
    false,
    NULL,
    '2026-11-22'::date,
    15
  )
  RETURNING id
)
INSERT INTO public.guide_faqs (guide_id, question, answer, sort_order)
SELECT inserted.id, v.question, v.answer, v.sort_order
FROM inserted
CROSS JOIN (VALUES
  ('How much does it cost to study hotel management in Switzerland?', 'At César Ritz Colleges, the 2027 bachelor''s costs CHF 169,300 in total, including housing and meals (≈ 913M MMK). Les Roches charges CHF 33,450 a semester in tuition alone.', 1),
  ('Where do Myanmar students apply for a Swiss student visa?', 'At the Embassy of Switzerland in Yangon, for a national D visa.', 2),
  ('Can I work while studying in Switzerland?', 'Up to 15 hours a week, but only after your first six months and with permission. Paid internships are part of most hospitality programmes.', 3),
  ('Can I stay in Switzerland after graduation?', 'Graduates of Swiss higher-education institutions can get a six-month job-search permit, but it can''t be renewed and job approval is strict. Whether private hotel-school graduates qualify isn''t confirmed.', 4),
  ('Are Swiss hotel schools worth it for Myanmar students?', 'They''re strong for international hospitality careers, but they are among the most expensive options. Compare them with hospitality programmes in Malaysia, Thailand or the UAE first.', 5),
  ('Which Swiss schools does Saturday Education work with?', 'Les Roches, César Ritz Colleges, HTMi, Hotel Institute Montreux, IUG, Montreux Institute of Business Development and SSBM Geneva.', 6),
  ('Are there good private universities in Switzerland?', 'Switzerland''s hotel and business schools are almost all private. Among our partners, Les Roches (CHF 33,450 per semester) and César Ritz Colleges (CHF 169,300 total) hold Swiss institutional (HEdA) accreditation. We couldn''t find HTMi, IUG, Hotel Institute Montreux, MIBD or SSBM on the Swiss Accreditation Council''s list, and post-study rights may differ for them.', 7)
) AS v(question, answer, sort_order);

COMMIT;

-- Verify (expect 15 guides, unpublished):
-- SELECT slug, is_published, sort_order FROM public.guides ORDER BY sort_order;
-- SELECT g.slug, count(f.*) AS faqs
-- FROM public.guides g LEFT JOIN public.guide_faqs f ON f.guide_id = g.id
-- GROUP BY g.slug ORDER BY min(g.sort_order);

-- Publish one guide after fact-check:
-- UPDATE public.guides
-- SET is_published = true, published_at = now(), updated_at = now()
-- WHERE slug = 'uk-visa-ban-myanmar-students-a-level';