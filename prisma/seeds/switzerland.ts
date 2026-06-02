import { DegreeType, Region, ScholarshipType } from '../../generated/client'

// ─── SWITZERLAND COUNTRY ──────────────────────────────────────────────────────

export const SWITZERLAND = {
  slug: 'switzerland',
  name: 'Switzerland',
  region: Region.EUROPE,
  tagline: "The World's Hospitality Education Capital",
  shortDescription:
    "Switzerland is home to the world's most prestigious hotel management and culinary arts schools, with institutions holding 9 of the top 10 spots in the QS World Rankings by Subject for Hospitality. Swiss hospitality degrees are internationally recognised by every major hotel group and award dual credentials with partner universities in the UK and USA.",
  overview: `Switzerland has been the global benchmark for hospitality education since the 19th century, when the Swiss pioneered modern hotel service and culinary excellence. Today, Swiss hotel schools consistently dominate global rankings — holding 9 of the top 10 positions in the QS World University Rankings by Subject for Hospitality & Leisure Management. Swiss hospitality programmes differ fundamentally from traditional universities: they combine academic study with mandatory paid international internships (typically CHF 2,100–2,400/month salary), meaning students earn while they learn. Most programmes are offered at private specialist institutions in picturesque locations — lakeside Montreux, Alpine Leysin, or Lucerne — and award dual degrees with accredited UK or US partner universities. Fees are higher than most study destinations (CHF 20,000–65,000/year all-inclusive for tuition, accommodation, and meals), but the career outcomes are exceptional: graduates routinely enter management roles at Four Seasons, Ritz-Carlton, Marriott, Hilton, and other luxury brands within months of graduating.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '10+',
  tuitionFeeRange: 'CHF 20,000 – CHF 65,000/year',
  postStudyWorkVisa: 'Short-stay permit available; working beyond studies requires a B-permit (employer-sponsored)',
  internationalStudents: 35000,
  studentSatisfaction: 90,
  graduateEmployability: 92,
  visaProcessingTime: '4–8 weeks (Schengen visa C or National visa D)',
  workRights: '15 hrs/week during studies; paid internships included in programme structure',
  costOfLivingMinUSD: 18000,
  costOfLivingMaxUSD: 30000,
  currencyCode: 'CHF',
  academicSpecialties: [
    'Hotel & Hospitality Management',
    'Culinary Arts & Gastronomy',
    'Luxury Brand Management',
    'Tourism & Events Management',
    'Business Management',
    'Spa & Wellness Management',
  ],
  isFeatured: true,
  advantages: [
    {
      title: "World's #1 Hospitality Education",
      description:
        "Swiss hotel schools hold 9 of the global top 10 spots in QS Subject Rankings for Hospitality. A Swiss hospitality degree is the most recognised credential in the global hotel industry — opening doors at every luxury brand worldwide.",
      order: 1,
    },
    {
      title: 'Earn While You Study — Paid Internships Built In',
      description:
        'Swiss programmes include mandatory paid internship semesters at partner hotels (Four Seasons, Ritz-Carlton, Kempinski). Interns earn CHF 2,100–2,400/month — substantially offsetting study costs while building a global professional network.',
      order: 2,
    },
    {
      title: 'Dual Degrees from UK and US Universities',
      description:
        'Most Swiss hospitality schools award degrees jointly with accredited UK (University of Derby, Ulster University, Edinburgh Napier) or US (Washington State University, Northwood University) partner universities — giving graduates two internationally recognised credentials.',
      order: 3,
    },
    {
      title: 'Immersive Alpine Campus Experience',
      description:
        "Study in converted Swiss palace hotels above Lake Geneva, in the heart of Lucerne, or in Alpine resorts — campuses that are luxury hotels in their own right, providing an unparalleled live-and-learn hospitality environment.",
      order: 4,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Choose Your School and Programme',
      description:
        'Research the six leading Swiss hospitality schools, compare programmes (hospitality management, culinary arts, business), campus locations, and partner university degree awards to identify your best fit.',
    },
    {
      stepNumber: 2,
      title: 'Apply and Receive Offer Letter',
      description:
        'Submit your application with academic transcripts, English language proof, passport copy, and a personal statement. Most Swiss hospitality schools have rolling admissions with multiple annual intakes.',
    },
    {
      stepNumber: 3,
      title: 'Pay Confirmation Deposit and Arrange Swiss Visa',
      description:
        "After accepting your offer and paying the confirmation deposit (typically CHF 2,000–3,000), apply for a Swiss National Visa (Category D) at your local Swiss embassy. Processing takes 4–8 weeks.",
    },
    {
      stepNumber: 4,
      title: 'Arrive and Register for Residence Permit',
      description:
        'Arrive in Switzerland, check into on-campus accommodation, attend orientation, and register with local authorities within 14 days to obtain your residence permit (L or B permit). Your school will guide you through this process.',
    },
  ],
  faqs: [
    {
      question: 'Are Swiss hospitality schools globally recognised?',
      answer:
        "Yes — Swiss hotel schools are the most respected hospitality credentials in the world. Swiss schools hold 9 of the QS top 10 global positions for Hospitality & Leisure Management. Graduates are actively recruited by Four Seasons, Ritz-Carlton, Marriott, Hyatt, and every major luxury hotel group from day one.",
      order: 1,
    },
    {
      question: 'What are the tuition fees at Swiss hospitality schools?',
      answer:
        'Fees range from CHF 20,000 to CHF 65,000 per year. Many programmes are all-inclusive (covering tuition, accommodation, and meals), which reduces the apparent living cost gap. Paid internship semesters (earning CHF 2,100–2,400/month) also offset overall programme costs.',
      order: 2,
    },
    {
      question: 'Do Swiss hospitality degrees require English proficiency?',
      answer:
        'Yes — all programmes at these schools are taught entirely in English. Requirements vary: IELTS 5.0–6.5 (or equivalent TOEFL/PTE) depending on the school and programme level. Some schools offer preparatory English programmes for students who need language support.',
      order: 3,
    },
    {
      question: 'Can I work while studying in Switzerland?',
      answer:
        'Non-EU students on a student visa may work up to 15 hours per week during studies. However, paid internship semesters are built into most Swiss hospitality programmes and are completed under the student visa — these offer CHF 2,100–2,400/month and count as part of the degree.',
      order: 4,
    },
    {
      question: 'What is the typical intake schedule for Swiss hospitality schools?',
      answer:
        "Most Swiss hospitality schools offer multiple intakes per year — typically in January, April, July, and October. Rolling admissions mean there's no single application deadline, but visa processing requires 8–12 weeks lead time.",
      order: 5,
    },
  ],
}

// ─── SWITZERLAND UNIVERSITIES ─────────────────────────────────────────────────

export const BHMS = {
  name: 'BHMS – Business and Hotel Management School',
  slug: 'bhms-business-hotel-management-school',
  city: 'Lucerne, Switzerland',
  foundedYear: 1998,
  ranking: null,
  totalStudents: 800,
  internationalStudents: 0.92,
  acceptanceRate: 0.75,
  shortDescription:
    "BHMS is a leading Swiss hospitality and business school in the heart of Lucerne, offering dual degrees awarded jointly with Robert Gordon University (UK). With over 90% international students from 80+ nationalities, it provides an all-inclusive campus experience covering tuition, accommodation, and meals. Graduates benefit from three mandatory paid internships and strong placement partnerships with top hotel brands worldwide.",
  tuitionFeeMin: 29100,
  tuitionFeeMax: 44350,
  tuitionCurrency: 'CHF',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Arts in Hotel & Hospitality Management',
      slug: 'ba-hotel-hospitality-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 29,100–31,100/year',
      description:
        'A three-year dual-award degree combining hospitality operations, business management, and three six-month paid internships, graduating with credentials from both BHMS and Robert Gordon University (UK).',
    },
    {
      name: 'Bachelor of Arts in Global Business Management',
      slug: 'ba-global-business-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 29,100–31,100/year',
      description:
        'A three-year business degree including three international internship semesters to build cross-sector management competencies, dual-awarded with Robert Gordon University (UK).',
    },
    {
      name: 'Bachelor of Arts in Culinary Arts',
      slug: 'ba-culinary-arts',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Culinary Arts',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 29,100–31,100/year',
      description:
        'A practical three-year programme combining advanced culinary techniques with business and entrepreneurship modules and three paid kitchen internships, yielding dual degrees from BHMS and Robert Gordon University (UK).',
    },
    {
      name: 'Bachelor of Arts in Culinary Arts and Patisserie',
      slug: 'ba-culinary-arts-patisserie',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Culinary Arts',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 29,100–31,100/year',
      description:
        'An intensive three-year dual-award bachelor combining pastry, chocolate, and boulangerie craft with culinary arts and business management, supported by three six-month industry internships worldwide.',
    },
    {
      name: 'Certificate in Culinary & Pastry Arts',
      slug: 'certificate-culinary-pastry-arts',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'Culinary Arts',
      durationYears: 0.2,
      tuitionFeePerYear: 'CHF 21,500 (total, 10 weeks)',
      description:
        'A ten-week intensive certificate delivering 180 kitchen hours in culinary operations or pastry, chocolate, and bakery in the state-of-the-art Lucerne facilities.',
    },
    {
      name: 'MSc in International Hospitality Business Management',
      slug: 'msc-international-hospitality-business-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 31,100/year',
      description:
        'A 12-month dual-award master exploring hospitality strategy, sustainability, and financial performance, with an optional internship at partner hotels and jointly awarded by BHMS and Robert Gordon University (UK).',
    },
    {
      name: 'MSc in International Tourism Management',
      slug: 'msc-international-tourism-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 31,100/year',
      description:
        'A one-year programme equipping graduates to lead in global travel and destination management, combining tourism economics, digital marketing, and sustainable development with an optional international internship.',
    },
    {
      name: 'MSc in Global Business Management',
      slug: 'msc-global-business-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 31,100/year',
      description:
        'A dual-award master programme developing advanced leadership, strategy, and innovation skills for senior management roles, awarded jointly with Robert Gordon University (UK).',
    },
    {
      name: 'MSc in Culinary Entrepreneurship',
      slug: 'msc-culinary-entrepreneurship',
      degreeLevel: DegreeType.MASTER,
      field: 'Culinary Arts',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 31,100/year',
      description:
        'A one-year postgraduate programme blending advanced culinary expertise with business strategy and innovation, preparing graduates to launch or scale culinary concepts and food enterprises internationally.',
    },
    {
      name: 'MBA with Specialisation',
      slug: 'mba-specialisation',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 44,350 (MSc + MBA combined)',
      description:
        'An intensive one-year executive MBA offered as a dual-degree extension to the MSc, with specialisations in Luxury Brand Management, AI & Digital Innovation, and International Hospitality Management, awarded jointly with Robert Gordon University (UK).',
    },
    {
      name: 'Postgraduate Diploma in Culinary Arts',
      slug: 'pgd-culinary-arts',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Culinary Arts',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 28,100/year',
      description:
        'An advanced culinary postgraduate diploma for graduates seeking to deepen specialist skills in culinary operations, pastry, or beverage arts before progressing to master-level study.',
    },
  ],
  scholarships: [
    {
      name: 'BHMS Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'Partial tuition reduction (amount varies by programme)',
      description:
        'Awarded to academically outstanding applicants based on prior academic achievement and interview performance; limited places per intake on a first-come, first-served basis.',
    },
    {
      name: 'Swiss Resident Discount',
      type: ScholarshipType.PARTIAL,
      value: '40% tuition reduction',
      description:
        'Swiss passport holders or residents with a B/C permit receive a 40% discount on tuition for the full duration of their programme.',
    },
  ],
  admissionSteps: [],
}

export const CESAR_RITZ_COLLEGES = {
  name: 'César Ritz Colleges Switzerland',
  slug: 'cesar-ritz-colleges-switzerland',
  city: 'Brig, Switzerland',
  foundedYear: 1982,
  ranking: null,
  totalStudents: 600,
  internationalStudents: 0.90,
  acceptanceRate: 0.72,
  shortDescription:
    'Founded in 1982, César Ritz Colleges Switzerland is one of the oldest and most prestigious hospitality schools in Switzerland, federally accredited as a University of Applied Sciences. Ranked #5 globally by QS in 2025 for Hospitality, it awards a four-year BSc jointly with Washington State University (USA) and a Master of Science jointly with the University of Derby (UK). Its Brig Alpine campus combines Swiss-style hands-on training with American academic rigour.',
  tuitionFeeMin: 22000,
  tuitionFeeMax: 30520,
  tuitionCurrency: 'CHF',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Hospitality Business Management',
      slug: 'bsc-hospitality-business-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 4,
      tuitionFeePerYear: 'CHF 22,000/year (approx. CHF 13,660/term)',
      description:
        'A four-year dual-degree programme combining Swiss hospitality craft with American business education, graduating with credentials from both César Ritz Colleges and Washington State University (USA); includes multiple paid internship semesters in luxury hotel environments worldwide.',
    },
    {
      name: 'Master of Science in International Hospitality Management',
      slug: 'msc-international-hospitality-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1.25,
      tuitionFeePerYear: 'CHF 30,520/year (approx. CHF 15,260/term)',
      description:
        'A 15-month advanced master programme preparing graduates for senior leadership roles in global hospitality, awarded jointly with the University of Derby (UK); includes research projects and optional international work placement.',
    },
  ],
  scholarships: [
    {
      name: 'César Ritz Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'Partial tuition reduction (limited places, first-come first-served)',
      description:
        'Awarded annually to high-achieving applicants based on academic performance; cannot be combined with other reductions and is typically a one-time-per-term award.',
    },
    {
      name: 'Partner Institution Scholarship',
      type: ScholarshipType.PARTIAL,
      value: 'Partial tuition reduction with credit transfer',
      description:
        'Available to students transferring from partner institutions, subject to credit evaluation and admissions review.',
    },
  ],
  admissionSteps: [],
}

export const CULINARY_ARTS_ACADEMY_SWITZERLAND = {
  name: 'Culinary Arts Academy Switzerland',
  slug: 'culinary-arts-academy-switzerland',
  city: 'Le Bouveret, Switzerland',
  foundedYear: 2006,
  ranking: null,
  totalStudents: 350,
  internationalStudents: 0.88,
  acceptanceRate: 0.70,
  shortDescription:
    "Culinary Arts Academy Switzerland (CAAS) is the only culinary school ranked in the global QS top 10 for Hospitality (#8 in 2025), situated on the shores of Lake Geneva in Le Bouveret. As part of Swiss Education Group, CAAS offers world-class culinary bachelor and master degrees in partnership with the University of Derby (UK), with specialisation pathways in Culinary Arts, Pastry & Chocolate, and Vegetarian Cuisine. Students complete paid international internship semesters within some of the world's most prestigious culinary establishments.",
  tuitionFeeMin: 25000,
  tuitionFeeMax: 48000,
  tuitionCurrency: 'CHF',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Arts in Culinary Arts',
      slug: 'ba-culinary-arts',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Culinary Arts',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 32,000–46,000/year',
      description:
        'A three-year dual-degree programme with specialisation in Culinary Arts, Pastry & Chocolate, or Vegetarian Cuisine; first two years at Le Bouveret and the final year at Brig, including two paid professional internships, graduating with degrees from both CAAS and University of Derby (UK).',
    },
    {
      name: 'Swiss Higher Diploma in Culinary Arts',
      slug: 'swiss-higher-diploma-culinary-arts',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Culinary Arts',
      durationYears: 2,
      tuitionFeePerYear: 'CHF 32,000/year',
      description:
        'A two-year advanced diploma providing deep practical and theoretical culinary training, with one paid internship included; graduates may articulate into the final year of the Bachelor of Arts in Culinary Arts.',
    },
    {
      name: 'Master of Arts in Culinary Business Management',
      slug: 'ma-culinary-business-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Culinary Arts',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 47,800 (total programme)',
      description:
        'A one-year postgraduate programme combining advanced culinary management, food entrepreneurship, and strategic business leadership, awarded jointly with the University of Derby (UK); includes an international research project and industry placement.',
    },
  ],
  scholarships: [
    {
      name: 'CAAS Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'Up to 30% on tuition fees',
      description:
        'Limited merit-based scholarship awarded to high-achieving applicants; cannot be combined with other fee reductions and is assessed on academic record and interview.',
    },
    {
      name: 'Swiss Citizen / Resident Scholarship',
      type: ScholarshipType.PARTIAL,
      value: 'Partial tuition reduction for Swiss nationals and B/C permit holders',
      description:
        'Swiss passport holders and long-term residents are eligible for a significant tuition reduction, making programmes more accessible for local talent entering the culinary sector.',
    },
  ],
  admissionSteps: [],
}

export const SHMS = {
  name: 'Swiss Hotel Management School (SHMS)',
  slug: 'swiss-hotel-management-school-shms',
  city: 'Caux & Leysin, Switzerland',
  foundedYear: 1992,
  ranking: null,
  totalStudents: 1700,
  internationalStudents: 0.80,
  acceptanceRate: 0.65,
  shortDescription:
    "Swiss Hotel Management School (SHMS) operates from two iconic Swiss palace hotel campuses — the Belle Époque Caux Palace above Montreux and the historic Mont-Blanc Palace in Leysin — making it one of the most atmospheric hospitality schools in the world. Ranked #4 globally by QS in 2025, SHMS offers bachelor and master degrees fully accredited by the University of Derby (UK), with all programmes structured around a 'Learning by Doing' philosophy and mandatory paid worldwide internships. Students from 80+ countries benefit from an immersive live-and-work campus environment.",
  tuitionFeeMin: 29400,
  tuitionFeeMax: 63600,
  tuitionCurrency: 'CHF',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Arts in International Hospitality Management',
      slug: 'ba-international-hospitality-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 63,600/year (all-inclusive)',
      description:
        'A three-year degree combining hospitality operations, strategic management, and revenue management across the Caux and Leysin campuses with two mandatory paid global internships; awarded by the University of Derby (UK).',
    },
    {
      name: 'Bachelor of Arts in International Hospitality and Events Management',
      slug: 'ba-international-hospitality-events-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 63,600/year (all-inclusive)',
      description:
        'A three-year programme with an events specialisation developing expertise in strategic event logistics, financial management, and sustainable event practices within luxury hospitality; includes two paid internships and a University of Derby (UK) award.',
    },
    {
      name: 'Bachelor of Arts in International Hospitality and Design Management',
      slug: 'ba-international-hospitality-design-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 63,600/year (all-inclusive)',
      description:
        'A design-focused bachelor blending luxury interior design, digital visual communication, retail management, and hospitality leadership; graduates earn a University of Derby (UK) degree and are prepared to drive design innovation in premium hotel environments.',
    },
    {
      name: 'Master of Arts in International Hospitality Business Management',
      slug: 'ma-international-hospitality-business-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 36,600/year',
      description:
        'A one-year advanced master developing strategic hospitality leadership skills — including revenue optimisation, sustainable management, and luxury brand strategy — awarded jointly with the University of Derby (UK).',
    },
    {
      name: 'Master of Science in International Hospitality Management',
      slug: 'msc-international-hospitality-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 36,600/year',
      description:
        'A research-oriented one-year master covering advanced hospitality analytics, operational excellence, and innovation management, awarded jointly with the University of Derby (UK) and suited for graduates seeking academic or senior industry careers.',
    },
    {
      name: 'Postgraduate Diploma in International Hotel, Resort, and Spa Management',
      slug: 'pgd-hotel-resort-spa-management',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 29,400/year',
      description:
        'A one-year postgraduate diploma specialising in resort operations, spa management, and wellness tourism, offering a practical pathway into luxury resort management with an optional articulation route to the master degree.',
    },
  ],
  scholarships: [
    {
      name: 'SHMS Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'Up to 30% tuition reduction',
      description:
        'Merit-based scholarship available for eligible enrolments, assessed on academic achievement and interview; limited places per intake and cannot be combined with other discounts.',
    },
    {
      name: 'Swiss Citizen / Resident Grant',
      type: ScholarshipType.PARTIAL,
      value: 'Minimum CHF 10,000 tuition reduction for bachelor programmes',
      description:
        'Eligible Swiss residents receive a tuition reduction for the full programme duration, with a minimum scholarship value of CHF 10,000 on bachelor programmes.',
    },
  ],
  admissionSteps: [],
}

export const HIM = {
  name: 'HIM – Hotel Institute Montreux',
  slug: 'him-hotel-institute-montreux',
  city: 'Montreux, Switzerland',
  foundedYear: 1984,
  ranking: null,
  totalStudents: 1300,
  internationalStudents: 0.90,
  acceptanceRate: 0.70,
  shortDescription:
    "Hotel Institute Montreux (HIM), now branded as HIM Business School, is one of Switzerland's longest-established hospitality schools, founded in 1984 and situated on the shores of Lake Geneva. Part of Swiss Education Group, HIM offers a three-year Bachelor of Business Administration (BBA) dual-awarded with Northwood University (USA), integrating hospitality management with core business disciplines. Ranked #7 globally by QS in 2025, HIM attracts students from 50+ nationalities and boasts a 97% graduate employment rate.",
  tuitionFeeMin: 41400,
  tuitionFeeMax: 58150,
  tuitionCurrency: 'CHF',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration in Hospitality Management',
      slug: 'bba-hospitality-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 41,400–58,150/year (all-inclusive)',
      description:
        'A three-year dual-award BBA combining Swiss hospitality service excellence with a comprehensive business curriculum — available in Hospitality Management, Finance, Marketing, or Management specialisations — with two mandatory paid internship semesters and a degree jointly awarded by HIM and Northwood University (USA).',
    },
  ],
  scholarships: [
    {
      name: 'HIM Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'Up to 20% tuition reduction',
      description:
        'Competitive merit-based scholarship assessed on academic performance and interview results; available for eligible bachelor applicants with limited places per intake.',
    },
  ],
  admissionSteps: [],
}

export const HTMI = {
  name: 'HTMi Switzerland – Hotel and Tourism Management Institute',
  slug: 'htmi-switzerland-hotel-tourism-management-institute',
  city: 'Sorenberg, Switzerland',
  foundedYear: 1999,
  ranking: null,
  totalStudents: 420,
  internationalStudents: 0.92,
  acceptanceRate: 0.78,
  shortDescription:
    "HTMi Switzerland is a boutique private hotel and tourism management institute located in the UNESCO Entlebuch Biosphere Reserve near Lucerne, with approximately 420 students from 35+ nationalities. Ranked #17 globally by QS in 2025, its BSc degrees are validated and awarded by Ulster University (UK) and MSc degrees by Edinburgh Napier University (UK). All programmes include paid Swiss internship semesters offering salaries of CHF 2,100–2,400/month.",
  tuitionFeeMin: 20500,
  tuitionFeeMax: 33000,
  tuitionCurrency: 'CHF',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'BSc (Hons) in International Hotel and Tourism Management',
      slug: 'bsc-international-hotel-tourism-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'CHF 50,000/year (all-inclusive)',
      description:
        'A three-year honours bachelor programme validated and awarded by Ulster University (UK), covering hotel operations, tourism management, marketing, and leadership through academic semesters and paid Swiss internships earning CHF 2,100–2,400/month.',
    },
    {
      name: 'MSc in International Hospitality and Tourism Management',
      slug: 'msc-international-hospitality-tourism-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 56,000/year (all-inclusive)',
      description:
        'A one-year postgraduate master validated and awarded by Edinburgh Napier University (UK), developing advanced skills in hospitality strategy, research methodology, and international tourism leadership.',
    },
    {
      name: 'MBA in International Hospitality Management',
      slug: 'mba-international-hospitality-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 64,000/year (all-inclusive)',
      description:
        'An intensive MBA awarded by a recognised UK university partner, integrating advanced hospitality business management, financial analysis, and executive leadership with a paid Swiss industry internship semester.',
    },
    {
      name: 'Postgraduate Diploma in International Hotel and Tourism Management',
      slug: 'pgd-international-hotel-tourism-management',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 56,000/year (all-inclusive)',
      description:
        'A one-year postgraduate diploma focusing on hotel operations management, revenue management, and strategic planning with a six-month paid Swiss internship.',
    },
    {
      name: 'Swiss Foundation Diploma in Hotel and Tourism Management',
      slug: 'swiss-foundation-diploma-hotel-tourism-management',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 41,000/year (all-inclusive)',
      description:
        'A one-year foundation diploma combining academic hospitality and tourism modules with practical hotel training, designed as a pathway into the BSc programme for students without prior higher education qualifications.',
    },
    {
      name: 'Diploma in Swiss European Culinary Arts',
      slug: 'diploma-swiss-european-culinary-arts',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Culinary Arts',
      durationYears: 1,
      tuitionFeePerYear: 'CHF 60,000/year (all-inclusive)',
      description:
        "A practical one-year culinary diploma covering Swiss and European classical cooking techniques, pastry arts, and food entrepreneurship within HTMi's fully-equipped training kitchens, with a five-month paid industry internship.",
    },
  ],
  scholarships: [],
  admissionSteps: [],
}

export const SWITZERLAND_UNIVERSITIES: any[] = [
  BHMS,
  CESAR_RITZ_COLLEGES,
  CULINARY_ARTS_ACADEMY_SWITZERLAND,
  SHMS,
  HIM,
  HTMI,
]
