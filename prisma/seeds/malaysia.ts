import { DegreeType, ScholarshipType, Region } from '../../generated/client'

// ─── MALAYSIA COUNTRY ─────────────────────────────────────────────────────────

export const MALAYSIA = {
  slug: 'malaysia',
  name: 'Malaysia',
  region: Region.ASIA,
  tagline: "Asia's Education Hub at Half the Price",
  shortDescription:
    "Malaysia is one of Asia's most affordable English-language study destinations, hosting branch campuses of leading Australian and UK universities. International graduates benefit from a vibrant multicultural environment, strong industry links, and a 12-month post-study work pass.",
  overview: `Malaysia has rapidly built itself into a regional education powerhouse, offering Australian, UK, and American degree programmes through globally ranked branch campuses at a fraction of Western tuition fees. Home to over 170,000 international students from more than 130 countries, Malaysia ranks among the top 10 study destinations in Asia. Universities like Taylor's, APU, IMU, Curtin, and Swinburne enjoy strong QS rankings and deep industry partnerships with multinational companies based in Kuala Lumpur and the Multimedia Super Corridor. Students benefit from English-medium instruction, a safe and multicultural society, and affordable living costs averaging MYR 1,500–3,000 per month.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '70+',
  tuitionFeeRange: 'MYR 18,000 – MYR 95,000/year',
  postStudyWorkVisa: 'Professional Visit Pass — up to 12 months for skilled graduates',
  internationalStudents: 170000,
  studentSatisfaction: 82,
  graduateEmployability: 79,
  visaProcessingTime: '4–8 weeks (EMGS)',
  workRights: 'Up to 20 hrs/week in approved jobs with Immigration approval — typically during semester breaks/holidays over 7 days; confirm timing with your university',
  costOfLivingMinUSD: 400 * 12,
  costOfLivingMaxUSD: 750 * 12,
  currencyCode: 'MYR',
  academicSpecialties: ['Business & Finance', 'Engineering & Technology', 'Medical & Health Sciences', 'Computing & IT', 'Hospitality & Culinary Arts', 'Creative Arts & Design'],
  isFeatured: true,
  advantages: [
    {
      title: 'Australian & UK Degrees at Malaysian Prices',
      description: "Branch campuses of Curtin, Swinburne, University of Reading, and UOW award the same degrees as their parent institutions — at 40–60% lower tuition than studying abroad.",
      order: 1,
    },
    {
      title: "Affordable Living — Asia's Best Value",
      description: "Monthly living costs of MYR 1,500–3,000 (USD 350–700) include accommodation, food, and transport. Malaysia consistently ranks among the world's most affordable student destinations.",
      order: 2,
    },
    {
      title: 'English-Medium, Multicultural Environment',
      description: "Malaysia's official education language is English. A Malay, Chinese, and Indian cultural mix creates a genuinely cosmopolitan campus experience that eases social transition for Asian students.",
      order: 3,
    },
    {
      title: 'Gateway to Asian Business Networks',
      description: "Located at the heart of ASEAN, Malaysia hosts regional HQs of Shell, EY, HSBC, and hundreds of multinationals. Students gain direct access to internships and graduate roles across the region.",
      order: 4,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Choose Your University and Programme',
      description: 'Research public and private universities, compare tuition fees and rankings, and identify your preferred programme and intake (March, July, or November).',
    },
    {
      stepNumber: 2,
      title: 'Apply and Receive Offer Letter',
      description: 'Submit your application with academic transcripts, passport copy, and English test scores (IELTS 5.5–6.5 depending on institution). Receive a conditional or unconditional offer.',
    },
    {
      stepNumber: 3,
      title: 'Apply for Student Pass via EMGS',
      description: 'The university submits your visa application to the Education Malaysia Global Services (EMGS) portal on your behalf. Processing typically takes 4–8 weeks.',
    },
    {
      stepNumber: 4,
      title: 'Arrive and Register',
      description: 'Fly to Malaysia, collect your Student Pass from Immigration, attend university orientation, and open a local bank account. Campus life begins immediately.',
    },
  ],
  faqs: [
    {
      question: 'Is Malaysia a safe country for international students?',
      answer: 'Yes — Malaysia consistently ranks among the safest countries in Southeast Asia, with a stable political environment and low crime rates. The large international student population ensures well-established campus support services.',
      order: 1,
    },
    {
      question: 'Can I work while studying in Malaysia?',
      answer: 'International students may work up to 20 hours per week in approved jobs, with Immigration approval. EMGS guidance focuses on work during semester breaks and holidays longer than 7 days — ask your university when you are allowed to work, and which sectors are permitted.',
      order: 2,
    },
    {
      question: 'What English language score do I need?',
      answer: 'Requirements vary by institution: most private universities require IELTS 5.5–6.5 (or equivalent TOEFL/PTE). Branch campuses of Australian and UK universities typically require IELTS 6.0–6.5.',
      order: 3,
    },
    {
      question: 'How do I apply for a Malaysian student visa?',
      answer: 'Your university applies on your behalf through the Education Malaysia Global Services (EMGS) online system after you accept an offer and pay the deposit. Processing takes 4–8 weeks.',
      order: 4,
    },
    {
      question: 'What is the cost of living in Malaysia for students?',
      answer: 'Students typically spend MYR 1,500–3,000 per month (USD 350–700), covering shared accommodation (MYR 400–800), meals (MYR 400–600), transport (MYR 100–200), and personal expenses.',
      order: 5,
    },
  ],
}

// ─── MALAYSIA UNIVERSITIES ────────────────────────────────────────────────────


// 1. University of Wollongong Malaysia (UOWM KDU)
export const UOW_MALAYSIA = {
  name: 'University of Wollongong Malaysia (UOW Malaysia KDU)',
  slug: 'uow-malaysia-kdu',
  city: 'Petaling Jaya',
  foundedYear: 1983,
  totalStudents: 8000,
  internationalStudents: 0.25,
  intakeMonths: 'March, July, November',
  tuitionFeeMin: 49000,
  tuitionFeeMax: 94000,
  tuitionCurrency: 'MYR',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Australian-degree-awarding institution offering UOW Australia qualifications in Business, Computing, Engineering, Hospitality, and Culinary Arts at Malaysian fees.',
  overview:
    'University of Wollongong Malaysia (UOW Malaysia KDU) is part of the University of Wollongong global network and confers UOW Australia degrees at its Petaling Jaya and Penang campuses. Originally established as KDU College in 1983, the institution rebranded in 2019 and now offers foundation, diploma, and degree programmes across Computing, Creative Media, Business, Engineering, Hospitality, and Culinary Arts. Students benefit from Australian academic standards at roughly one-third the cost of studying in Australia, with ACCA Platinum status and strong industry partnerships.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Computer Science (Hons)',
      slug: 'bachelor-of-computer-science-hons-uow',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 25,000/year',
      description:
        'Covers software engineering, data structures, AI, and networks, conferred as a UOW Australia degree with strong graduate employability.',
    },
    {
      name: 'Bachelor of Information Technology (Hons)',
      slug: 'bachelor-of-information-technology-hons-uow',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Information Technology',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 25,000/year',
      description:
        'Focuses on systems analysis, networking, cybersecurity, and database management, awarded by UOW Australia.',
    },
    {
      name: 'Bachelor of Business (Hons)',
      slug: 'bachelor-of-business-hons-uow',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 22,000/year',
      description:
        'Provides broad business education in management, marketing, finance, and entrepreneurship under UOW Australia curriculum.',
    },
    {
      name: 'Bachelor of Accounting (Hons)',
      slug: 'bachelor-of-accounting-hons-uow',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Accounting & Finance',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 22,000/year',
      description:
        'ACCA-aligned accounting degree with exemptions, combining financial reporting, auditing, and taxation modules.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Electrical & Electronic',
      slug: 'bachelor-of-engineering-electrical-electronic-uow',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 26,000/year',
      description:
        'Engineering programme covering circuit design, signal processing, embedded systems, and power electronics, conferred by UOW Australia.',
    },
    {
      name: 'Bachelor of Hospitality Management (Hons)',
      slug: 'bachelor-of-hospitality-management-hons-uow',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 22,000/year',
      description:
        'Equips students with hotel operations, food & beverage, and events management skills through industry placements.',
    },
    {
      name: 'Diploma in Business',
      slug: 'diploma-in-business-uow',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 18,000/year',
      description:
        'Foundation-level programme covering core business subjects, designed to articulate into the UOW Malaysia degree pathway.',
    },
    {
      name: 'Foundation in Computing',
      slug: 'foundation-in-computing-uow',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Computing',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 16,000/year',
      description:
        'Pre-university pathway providing programming fundamentals, mathematics, and computing theory for entry into computing degrees.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Complete the online application form on the UOW Malaysia website, submitting academic transcripts and a copy of your passport.',
    },
    {
      stepNumber: 2,
      title: 'Receive Conditional or Unconditional Offer',
      description:
        'The admissions team reviews your application and issues an offer letter, typically within 5–10 working days.',
    },
    {
      stepNumber: 3,
      title: 'Pay Acceptance Fee & Obtain Student Visa',
      description:
        'Pay the acceptance deposit to confirm your place, then apply for a Malaysian student pass through EMGS with documents provided by UOW Malaysia.',
    },
    {
      stepNumber: 4,
      title: 'Register & Attend Orientation',
      description:
        'Complete online registration, collect your student ID, and attend the international student orientation before classes begin.',
    },
  ],
  scholarships: [
    {
      name: 'UOW Malaysia Merit Scholarship',
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.uow.edu.my/scholarships',
      description:
        'Awarded to high-achieving international students based on prior academic results; percentage varies by grade achieved.',
    },
    {
      name: 'UOW Malaysia Early Bird Scholarship',
      value: 'RM 2,000 – RM 5,000 reduction',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'One-time fee reduction for students who accept and pay the deposit at least two months before the intake start date.',
    },
  ],
}

// 2. INTI College (INTI International College Subang)
export const INTI_COLLEGE_SUBANG = {
  name: 'INTI International College Subang',
  slug: 'inti-college-subang',
  city: 'Subang Jaya',
  foundedYear: 1986,
  totalStudents: 4500,
  internationalStudents: 0.20,
  intakeMonths: 'January, May, September',
  tuitionFeeMin: 18000,
  tuitionFeeMax: 50000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Foundation and diploma provider under the INTI International University group, offering pre-university and diploma programmes with credit transfer to global partner universities.',
  overview:
    'INTI International College Subang is the foundation and diploma campus of the INTI International University & Colleges network, located in Subang Jaya, Selangor. It offers a range of foundation and diploma programmes in Business, IT, Design, Science, and Hospitality, with strong credit-transfer pathways to partner universities in the United States, United Kingdom, Australia, and Canada. The college is known for its American University Programme (AUP) and its practical, industry-aligned curriculum supported by INTI\'s global network.',
  ranking: null,
  programs: [
    {
      name: 'Foundation in Business',
      slug: 'foundation-in-business-inti-subang',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 19,000/year',
      description:
        'One-year pre-university programme covering economics, accounting, mathematics, and communication as a pathway to business degrees.',
    },
    {
      name: 'Foundation in Science',
      slug: 'foundation-in-science-inti-subang',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Science',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 19,500/year',
      description:
        'Pre-university science foundation covering biology, chemistry, physics, and mathematics for entry into science and engineering programmes.',
    },
    {
      name: 'Foundation in Information Technology',
      slug: 'foundation-in-it-inti-subang',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Information Technology',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 19,000/year',
      description:
        'IT-focused pre-university programme covering programming basics, networking fundamentals, and digital literacy.',
    },
    {
      name: 'Diploma in Business Administration',
      slug: 'diploma-in-business-administration-inti-subang',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 21,000/year',
      description:
        'Comprehensive diploma covering core business functions including management, marketing, finance, and operations.',
    },
    {
      name: 'Diploma in Information Technology',
      slug: 'diploma-in-information-technology-inti-subang',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Information Technology',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 20,000/year',
      description:
        'Diploma covering programming, systems analysis, networking, and database management with pathway to degree programmes.',
    },
    {
      name: 'Diploma in Graphic Design',
      slug: 'diploma-in-graphic-design-inti-subang',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Design & Creative Arts',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 20,000/year',
      description:
        'Practical design diploma covering typography, digital illustration, branding, and visual communication for creative careers.',
    },
    {
      name: 'Diploma in Hotel Management',
      slug: 'diploma-in-hotel-management-inti-subang',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 19,000/year',
      description:
        'Hospitality diploma covering front office operations, food & beverage management, and housekeeping with industry attachment.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application Online',
      description:
        'Apply through the INTI online portal with academic certificates, passport copy, and English proficiency results.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'The admissions team processes the application and issues a conditional or unconditional offer within 7 working days.',
    },
    {
      stepNumber: 3,
      title: 'Pay Acceptance Fee & Apply for Student Visa',
      description:
        'Pay the acceptance deposit to secure enrolment, then proceed with EMGS student pass application using INTI\'s sponsorship letter.',
    },
    {
      stepNumber: 4,
      title: 'Enrol & Attend Orientation',
      description:
        'Complete course registration, collect student ID, and attend international student orientation before the semester begins.',
    },
  ],
  scholarships: [
    {
      name: 'INTI Merit Scholarship',
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://newinti.edu.my/scholarships',
      description:
        'Available to new students with outstanding academic results; the waiver percentage is determined by prior grade achievements.',
    },
    {
      name: 'INTI International Student Scholarship',
      value: 'Up to 45% tuition fee waiver',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Specifically designed for international students enrolling in diploma and degree programmes at INTI Subang campus.',
    },
  ],
}

// 3. INTI International University
export const INTI_INTERNATIONAL_UNIVERSITY = {
  name: 'INTI International University',
  slug: 'inti-international-university',
  city: 'Nilai',
  foundedYear: 1986,
  totalStudents: 9000,
  internationalStudents: 0.30,
  intakeMonths: 'January, May, September',
  tuitionFeeMin: 24000,
  tuitionFeeMax: 85000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Private university in Nilai offering Business, IT, Engineering, and Health Sciences with credit-transfer pathways to US, UK, Australian, and Canadian partner universities.',
  overview:
    'INTI International University, headquartered in Nilai, Negeri Sembilan, is part of Laureate International Universities, the world\'s largest private higher-education network. It offers undergraduate and postgraduate programmes across Business, IT, Engineering, Biotechnology, Communication, and Health Sciences. The university is renowned for its American University Programme (AUP), allowing students to complete their first year in Malaysia before transferring to a US partner institution. INTI actively connects with over 30 global university partners and provides strong scholarship support for international students.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Business Administration (Hons)',
      slug: 'bachelor-of-business-administration-hons-inti',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 26,000/year',
      description:
        'Core business programme spanning management, marketing, finance, and entrepreneurship with global credit-transfer options.',
    },
    {
      name: 'Bachelor of Computer Science (Hons)',
      slug: 'bachelor-of-computer-science-hons-inti',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 26,000/year',
      description:
        'Covers algorithms, software development, AI, and cybersecurity, with optional specialisation in game development or data analytics.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Electrical & Electronic',
      slug: 'bachelor-of-engineering-electrical-hons-inti',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Accredited engineering programme covering power systems, embedded electronics, control systems, and telecommunications.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Mechatronics',
      slug: 'bachelor-of-engineering-mechatronics-hons-inti',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Interdisciplinary engineering degree combining mechanical, electrical, and computing systems for automation and robotics careers.',
    },
    {
      name: 'Bachelor of Biotechnology (Hons)',
      slug: 'bachelor-of-biotechnology-hons-inti',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Life Sciences',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Laboratory-intensive programme in molecular biology, genetics, and bioprocessing preparing students for pharmaceutical and research careers.',
    },
    {
      name: 'Bachelor of Mass Communication (Hons)',
      slug: 'bachelor-of-mass-communication-hons-inti',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Communication & Media',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 24,000/year',
      description:
        'Covers journalism, public relations, digital media, and broadcasting with hands-on media production experience.',
    },
    {
      name: 'Master of Business Administration (MBA)',
      slug: 'mba-inti',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 30,000/year',
      description:
        'Accelerated MBA covering strategic management, leadership, finance, and global business for working professionals.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Complete the application form on the INTI website with supporting documents including transcripts, passport, and English test scores.',
    },
    {
      stepNumber: 2,
      title: 'Receive & Accept Offer Letter',
      description:
        'Admissions issues an offer letter within 7–10 working days; accept by paying the acceptance fee to confirm enrolment.',
    },
    {
      stepNumber: 3,
      title: 'Apply for Student Pass (EMGS)',
      description:
        'INTI guides students through the EMGS online student pass application; approval typically takes 4–6 weeks.',
    },
    {
      stepNumber: 4,
      title: 'Register & Arrive on Campus',
      description:
        'Complete course registration, collect student ID, and attend the international student welcome programme.',
    },
  ],
  scholarships: [
    {
      name: 'INTI Merit Scholarship',
      value: 'Up to 100% tuition fee waiver (first year)',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://newinti.edu.my/scholarships',
      description:
        'Top-achieving students with an ATAR of 90+ or equivalent receive up to full first-year tuition waiver; 50% for scores 80–89.',
    },
    {
      name: 'INTI International Student Award',
      value: 'Up to 45% tuition fee waiver',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial tuition waiver exclusively for international students, assessed during the admissions process.',
    },
    {
      name: 'INTI Tertiary Scholarship',
      value: 'RM 5,000 – RM 14,000 per year',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Annual support for continuing students based on CGPA; renewable each semester with maintained academic performance.',
    },
  ],
}

// 4. Taylor's College
export const TAYLORS_COLLEGE = {
  name: "Taylor's College",
  slug: 'taylors-college',
  city: 'Subang Jaya',
  foundedYear: 1969,
  totalStudents: 7000,
  internationalStudents: 0.35,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 13000,
  tuitionFeeMax: 40000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Leading pre-university and pathway college in Malaysia offering A-Levels, SAM, Foundation, and Diploma programmes as gateways to top universities worldwide.',
  overview:
    "Taylor's College, located in Subang Jaya, is Malaysia's premier pre-university institution and a member of the Taylor's Education Group. It offers a comprehensive suite of pathway programmes including A-Levels, South Australian Matriculation (SAM), Cambridge A-Levels, and seven Foundation programmes (Science, Engineering, Business, Arts, Computing, Design, and Natural & Built Environments). The college also provides diploma programmes in Accounting, Business, IT, Communication, Interior Design, and Early Childhood Education. Its programmes articulate directly into Taylor's University and hundreds of global partner institutions.",
  ranking: null,
  programs: [
    {
      name: 'Foundation in Science',
      slug: 'foundation-in-science-taylors-college',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Science',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 19,500/year',
      description:
        'One-year science foundation covering biology, chemistry, physics, and maths as a pathway to medicine, pharmacy, and engineering.',
    },
    {
      name: 'Foundation in Business',
      slug: 'foundation-in-business-taylors-college',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 18,500/year',
      description:
        'Business-focused pre-university programme with economics, accounting, and quantitative studies, articulating to business degrees.',
    },
    {
      name: 'Foundation in Engineering',
      slug: 'foundation-in-engineering-taylors-college',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Engineering',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 19,000/year',
      description:
        'Engineering pre-university pathway with advanced mathematics, physics, and engineering fundamentals.',
    },
    {
      name: 'Foundation in Computing',
      slug: 'foundation-in-computing-taylors-college',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Computing',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 18,000/year',
      description:
        'Computing foundation covering programming, data structures, and digital systems to prepare for IT and CS degrees.',
    },
    {
      name: 'A-Levels',
      slug: 'a-levels-taylors-college',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'General Pre-University',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 25,000/year',
      description:
        'Cambridge International A-Levels with subject flexibility, widely accepted by UK, Australian, and Malaysian universities.',
    },
    {
      name: 'South Australian Matriculation (SAM)',
      slug: 'sam-taylors-college',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'General Pre-University',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 22,000/year',
      description:
        'Australian Year 12 equivalent accepted by all Australian universities, with optional internal articulation to Taylor\'s University.',
    },
    {
      name: 'Diploma in Business Administration',
      slug: 'diploma-in-business-administration-taylors-college',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 18,000/year',
      description:
        'Two-year diploma covering business administration fundamentals with exemptions into the second year of business degree programmes.',
    },
    {
      name: 'Diploma in Information Technology',
      slug: 'diploma-in-it-taylors-college',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Information Technology',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 18,000/year',
      description:
        'IT diploma programme preparing students for degree-level entry through practical modules in programming and networking.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online or via Agent',
      description:
        "Submit your application through Taylor's College online portal or via an authorised education agent, attaching academic transcripts and passport.",
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'The admissions team evaluates your application and issues an offer letter, typically within 5–7 working days.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Apply for Student Visa',
      description:
        "Pay the acceptance fee and use Taylor's College's EMGS sponsorship letter to apply for your Malaysian student pass.",
    },
    {
      stepNumber: 4,
      title: 'Attend Orientation & Commence Studies',
      description:
        'Arrive on campus, complete registration, and attend the international student orientation before the start of term.',
    },
  ],
  scholarships: [
    {
      name: "Taylor's College Merit Scholarship",
      value: 'Up to 100% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://college.taylors.edu.my/en/study/scholarships-and-financial-aid.html',
      description:
        'Awarded to high-achieving students entering foundation and A-Level programmes; percentage determined by prior academic results.',
    },
    {
      name: "Taylor's College Talent Scholarship",
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        "Recognises academic excellence and co-curricular achievement for new international students enrolling in Taylor's pre-university programmes.",
    },
  ],
}

// 5. Taylor's University
export const TAYLORS_UNIVERSITY = {
  name: "Taylor's University",
  slug: 'taylors-university',
  city: 'Subang Jaya',
  foundedYear: 2010,
  totalStudents: 12000,
  internationalStudents: 0.30,
  intakeMonths: 'January, May, September',
  tuitionFeeMin: 34000,
  tuitionFeeMax: 74000,
  tuitionCurrency: 'MYR',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    "Malaysia's #1 private university (QS 2026, #253 globally), renowned for Hospitality, Business, Architecture, Law, and Health Sciences at its award-winning Lakeside Campus.",
  overview:
    "Taylor's University in Subang Jaya is consistently ranked #1 private university in Southeast Asia by QS and is placed #253 in the QS World University Rankings 2026. Its award-winning Lakeside Campus houses faculties covering Business, Hospitality & Tourism, Architecture & Built Environment, Engineering, Computing & Technology, Health & Medical Sciences, Social Sciences & Communication, and Law. Taylor's holds dual-degree tie-ups with top UK and Australian universities and offers strong industry-linked programmes with high graduate employability.",
  ranking: 253,
  programs: [
    {
      name: 'Bachelor of Business Administration (Hons)',
      slug: 'bba-taylors-university',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 38,000/year',
      description:
        'Industry-focused BBA with specialisations in marketing, finance, HR, and entrepreneurship; dual-degree pathways available.',
    },
    {
      name: 'Bachelor of Hospitality Management (Hons)',
      slug: 'bachelor-hospitality-management-taylors',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,000/year',
      description:
        "Ranked among Asia's top hospitality programmes; covers hotel management, events, food & beverage, and international placements.",
    },
    {
      name: 'Bachelor of Architecture (Hons)',
      slug: 'bachelor-of-architecture-taylors',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Architecture',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 45,000/year',
      description:
        'Professionally accredited architecture degree combining design studios, construction technology, and environmental sustainability.',
    },
    {
      name: 'Bachelor of Computer Science (Hons)',
      slug: 'bachelor-computer-science-taylors',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,000/year',
      description:
        'Covers algorithms, software engineering, AI, data science, and cybersecurity with strong research and industry-linkage opportunities.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Mechanical',
      slug: 'bachelor-engineering-mechanical-taylors',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 43,000/year',
      description:
        'Accredited mechanical engineering programme with thermodynamics, materials science, manufacturing, and CAD design modules.',
    },
    {
      name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
      slug: 'mbbs-taylors',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Medicine',
      durationYears: 5,
      tuitionFeePerYear: 'MYR 74,000/year',
      description:
        'Five-year MBBS programme with clinical placements at affiliated hospitals; MMC and MQA accredited.',
    },
    {
      name: 'Bachelor of Laws (Hons) (LLB)',
      slug: 'llb-taylors',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Law',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 42,000/year',
      description:
        'Recognised law degree covering contract, tort, criminal, constitutional, and commercial law with moot court training.',
    },
    {
      name: 'Master of Business Administration (MBA)',
      slug: 'mba-taylors',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 50,000/year',
      description:
        'Globally oriented MBA with strategic management, finance, and digital transformation electives for career-advancing professionals.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        "Apply through Taylor's University Admissions portal, attaching academic transcripts, English test results, and a scanned passport.",
    },
    {
      stepNumber: 2,
      title: 'Receive Offer & Confirm Enrolment',
      description:
        'The admissions team evaluates your application and issues an offer letter; pay the acceptance fee to confirm your place.',
    },
    {
      stepNumber: 3,
      title: 'Apply for Malaysian Student Visa (EMGS)',
      description:
        "Taylor's University submits your student pass application via EMGS; approval takes approximately 4–6 weeks.",
    },
    {
      stepNumber: 4,
      title: 'Register, Arrive & Attend Orientation',
      description:
        'Finalise course registration online, collect your student ID on arrival, and attend the international student orientation week.',
    },
  ],
  scholarships: [
    {
      name: "Taylor's Merit Scholarship",
      value: 'Up to 100% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://university.taylors.edu.my/en/study/scholarships.html',
      description:
        'Covers up to full tuition for outstanding academic performers; available to both local and international students in most programmes.',
    },
    {
      name: "Taylor's Talent Scholarship",
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Recognises exceptional talent in academics, sports, arts, or community service for new international students.',
    },
    {
      name: "Taylor's ASEAN Scholarship",
      value: 'Up to 30% tuition fee waiver',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial scholarship for students from ASEAN countries enrolling in undergraduate programmes at Taylor\'s University.',
    },
  ],
}

// 6. International Medical University (IMU)
export const IMU_UNIVERSITY = {
  name: 'International Medical University (IMU)',
  slug: 'international-medical-university-imu',
  city: 'Kuala Lumpur',
  foundedYear: 1992,
  totalStudents: 5500,
  internationalStudents: 0.28,
  intakeMonths: 'February, July',
  tuitionFeeMin: 30000,
  tuitionFeeMax: 120000,
  tuitionCurrency: 'MYR',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    "Malaysia's first and most established private medical and health sciences university, offering Medicine, Dentistry, Pharmacy, and Allied Health Sciences with global clinical partnerships.",
  overview:
    'Founded in 1992, IMU (International Medical University) in Kuala Lumpur is Malaysia\'s oldest private medical university. It offers programmes in Medicine (MBBS), Dentistry, Pharmacy, Biomedical Science, Nursing, Physiotherapy, Dietary & Nutritional Sciences, and Chinese Medicine. IMU holds a QS 5-Star rating and has clinical training partnerships with over 30 top universities in the UK, Australia, US, Canada, and Europe, enabling students to complete part of their clinical education abroad. IMU\'s Pharmacy programme is ranked #1 private university in Malaysia in the QS World Rankings by Subject.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
      slug: 'mbbs-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Medicine',
      durationYears: 5,
      tuitionFeePerYear: 'MYR 110,000/year',
      description:
        'MMC and MQA-accredited MBBS with pre-clinical training in Kuala Lumpur and clinical placements at affiliated hospitals in Malaysia and abroad.',
    },
    {
      name: 'Bachelor of Dental Surgery (BDS)',
      slug: 'bds-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Dentistry',
      durationYears: 5,
      tuitionFeePerYear: 'MYR 90,000/year',
      description:
        'Comprehensive dental programme with pre-clinical simulation and clinical training at IMU\'s dental clinics; globally recognised qualification.',
    },
    {
      name: 'Bachelor of Pharmacy (Hons)',
      slug: 'bachelor-pharmacy-hons-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Pharmacy',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 45,000/year',
      description:
        'Top-200 QS-ranked pharmacy programme covering pharmacology, pharmaceutical chemistry, clinical pharmacy, and industrial pharmacy.',
    },
    {
      name: 'Bachelor of Biomedical Science (Hons)',
      slug: 'bachelor-biomedical-science-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Biomedical Science',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 38,000/year',
      description:
        'Laboratory-based programme in biochemistry, microbiology, molecular biology, and pathology, preparing students for research and diagnostics careers.',
    },
    {
      name: 'Bachelor of Nursing (Hons)',
      slug: 'bachelor-nursing-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Nursing',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 35,000/year',
      description:
        'Evidence-based nursing programme with extensive clinical placement hours across IMU-affiliated hospitals and healthcare settings.',
    },
    {
      name: 'Bachelor of Physiotherapy (Hons)',
      slug: 'bachelor-physiotherapy-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Allied Health Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 40,000/year',
      description:
        'Physiotherapy degree covering musculoskeletal, cardiorespiratory, and neurological rehabilitation with hands-on clinical training.',
    },
    {
      name: 'Bachelor of Dietary and Nutritional Sciences (Hons)',
      slug: 'bachelor-dietary-nutritional-sciences-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Health Sciences',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 33,000/year',
      description:
        'Programme covering human nutrition, dietetics, food science, and community health with clinical dietetics practicum.',
    },
    {
      name: 'Doctor of Traditional Chinese Medicine',
      slug: 'doctor-of-traditional-chinese-medicine-imu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Chinese Medicine',
      durationYears: 5,
      tuitionFeePerYear: 'MYR 30,000/year',
      description:
        'Five-year programme integrating traditional Chinese medicine theory, acupuncture, herbal medicine, and clinical practice.',
    },
    {
      name: 'Master of Medical Science (Clinical Pharmacy)',
      slug: 'master-medical-science-clinical-pharmacy-imu',
      degreeLevel: DegreeType.MASTER,
      field: 'Pharmacy',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Postgraduate programme deepening knowledge in clinical pharmacotherapy, drug safety, and pharmacy practice management.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application & Documents',
      description:
        'Apply via the IMU online portal, submitting academic transcripts, English proficiency results, passport copy, and personal statement.',
    },
    {
      stepNumber: 2,
      title: 'Selection Interview',
      description:
        'Shortlisted applicants are invited for an in-person or online selection interview to assess suitability for health sciences programmes.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Fees',
      description:
        'Successful applicants receive an offer letter; pay the initial acceptance fee and submit the student pass application via EMGS.',
    },
    {
      stepNumber: 4,
      title: 'Register & Attend Welcome Week',
      description:
        'Complete online registration, attend the IMU international student welcome programme, and collect your student ID and timetable.',
    },
  ],
  scholarships: [
    {
      name: 'IMU Merit Scholarship',
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://imu.edu.my/scholarships',
      description:
        'Available to new undergraduate students with excellent prior academic results; evaluated annually based on CGPA.',
    },
    {
      name: 'IMU Bursary for International Students',
      value: 'Partial tuition support',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Financial assistance for international students demonstrating academic merit and financial need, applied per semester.',
    },
    {
      name: 'IMU Partner University Scholarship',
      value: 'Varies by partner institution',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        "Additional funding available for students who choose IMU's international clinical transfer programme with affiliated overseas universities.",
    },
  ],
}

// 7. Asia Pacific University of Technology and Innovation (APU)
export const APU_MALAYSIA = {
  name: 'Asia Pacific University of Technology and Innovation (APU)',
  slug: 'asia-pacific-university-apu',
  city: 'Kuala Lumpur',
  foundedYear: 1993,
  totalStudents: 14000,
  internationalStudents: 0.43,
  intakeMonths: 'February, June, October',
  tuitionFeeMin: 40000,
  tuitionFeeMax: 65000,
  tuitionCurrency: 'MYR',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'QS-ranked top-2% global university (#597 world, 2026) and #1 in Malaysia for international students; specialising in Technology, Business, Engineering, and Creative Media.',
  overview:
    'Asia Pacific University of Technology and Innovation (APU), located in Technology Park Malaysia, Kuala Lumpur, is ranked #597 in the QS World University Rankings 2026 and holds a prestigious QS 5 Stars Plus rating. APU is the only private Malaysian university to receive this double honour and is ranked #1 in Malaysia for its international student community — more than 6,000 of its 14,000+ students come from over 130 countries. The university offers programmes in Computing, Engineering, Business, Accounting, Actuarial Studies, Design, and Psychology, with strong links to industry and global tech firms.',
  ranking: 597,
  programs: [
    {
      name: 'Bachelor of Computer Science (Hons)',
      slug: 'bachelor-computer-science-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 45,000/year',
      description:
        'Covers software engineering, AI, data science, cybersecurity, and cloud computing with optional specialisation tracks.',
    },
    {
      name: 'Bachelor of Software Engineering (Hons)',
      slug: 'bachelor-software-engineering-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 45,000/year',
      description:
        'Engineering-led approach to software systems design, testing, and project management with real-world capstone projects.',
    },
    {
      name: 'Bachelor of Cybersecurity (Hons)',
      slug: 'bachelor-cybersecurity-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Cybersecurity',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 45,000/year',
      description:
        'Dedicated cybersecurity degree covering ethical hacking, digital forensics, network security, and risk management.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Electronic & Electrical',
      slug: 'bachelor-engineering-electronic-electrical-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 48,000/year',
      description:
        'Accredited engineering programme covering electronics, control systems, embedded design, and power engineering.',
    },
    {
      name: 'Bachelor of Business (Hons)',
      slug: 'bachelor-of-business-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 43,000/year',
      description:
        'Business degree with specialisations in digital business, entrepreneurship, international business, and marketing.',
    },
    {
      name: 'Bachelor of Accounting (Hons)',
      slug: 'bachelor-accounting-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Accounting & Finance',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 43,000/year',
      description:
        'Professional accounting degree with ACCA, ICAEW, and CPA Australia exemptions; covering financial and management accounting.',
    },
    {
      name: 'Bachelor of Science (Hons) in Actuarial Studies',
      slug: 'bachelor-actuarial-studies-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Actuarial Science',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 48,000/year',
      description:
        'Actuarial science degree with exemptions from Institute and Faculty of Actuaries (IFoA) exams; covers statistics, finance, and risk.',
    },
    {
      name: 'Bachelor of Design (Hons) — Creative Media',
      slug: 'bachelor-design-creative-media-apu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Design & Creative Media',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 43,000/year',
      description:
        'Creative media degree covering game design, animation, UI/UX, motion graphics, and digital storytelling.',
    },
    {
      name: 'Master of Science in Cybersecurity',
      slug: 'msc-cybersecurity-apu',
      degreeLevel: DegreeType.MASTER,
      field: 'Cybersecurity',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 40,000/year',
      description:
        'Advanced postgraduate programme in network defence, cryptography, incident response, and cybersecurity policy and governance.',
    },
    {
      name: 'Master of Business Administration (MBA)',
      slug: 'mba-apu',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 42,000/year',
      description:
        'Globally oriented MBA programme with digital transformation, leadership, and strategic management specialisations.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online',
      description:
        'Submit your application on the APU admissions portal with academic transcripts, passport scan, and English language results.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'APU processes applications and issues conditional or unconditional offers within 5–7 working days.',
    },
    {
      stepNumber: 3,
      title: 'Confirm Place & Start EMGS Visa Process',
      description:
        'Pay the acceptance deposit and APU submits your student pass application through EMGS; approval takes approximately 4–6 weeks.',
    },
    {
      stepNumber: 4,
      title: 'Arrive & Attend Orientation',
      description:
        'Complete registration, collect student ID, and attend APU\'s international student orientation covering campus life and academic expectations.',
    },
  ],
  scholarships: [
    {
      name: 'APU International Student Scholarship',
      value: 'Up to 30% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.apu.edu.my/scholarships',
      description:
        'Merit-based scholarship for international students enrolling in degree, diploma, or pre-university programmes at APU.',
    },
    {
      name: 'APU Excellence Scholarship',
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Awarded to students with outstanding academic results at SPM, A-Levels, IB, or equivalent pre-university qualifications.',
    },
  ],
}

// 8. University of Reading Malaysia
export const UNIVERSITY_OF_READING_MALAYSIA = {
  name: 'University of Reading Malaysia',
  slug: 'university-of-reading-malaysia',
  city: 'Iskandar Puteri',
  foundedYear: 2015,
  totalStudents: 2500,
  internationalStudents: 0.40,
  intakeMonths: 'September, February',
  tuitionFeeMin: 38000,
  tuitionFeeMax: 45000,
  tuitionCurrency: 'MYR',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'UK campus of the University of Reading (QS #194 globally), offering fully British degrees in Business, Finance, Psychology, Real Estate, and Law at EduCity, Johor.',
  overview:
    'The University of Reading Malaysia (UoRM), located in EduCity, Iskandar Puteri, Johor, is the Malaysian campus of the University of Reading UK — ranked #194 in the QS World University Rankings 2026. Students graduate with the same University of Reading UK degree at approximately 40% of the UK cost. Programmes span Business and Management, Accounting and Finance, Real Estate, Psychology, Quantity Surveying, and Law. Fees are fixed for the full duration of study, and all degrees are accredited by both MQA (Malaysia) and QAA (UK).',
  ranking: 194,
  programs: [
    {
      name: 'BSc Business and Management',
      slug: 'bsc-business-management-uorm',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,800/year',
      description:
        'UK-awarded business degree covering strategy, marketing, human resource management, and international business operations.',
    },
    {
      name: 'BSc Accounting and Finance',
      slug: 'bsc-accounting-finance-uorm',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Accounting & Finance',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,800/year',
      description:
        'UK-accredited accounting and finance degree with exemptions from ACCA, ICAEW, and CIMA professional bodies.',
    },
    {
      name: 'BSc Finance and Investment Banking',
      slug: 'bsc-finance-investment-banking-uorm',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Finance',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,800/year',
      description:
        'Specialist finance degree covering investment analysis, derivatives, corporate finance, and capital markets.',
    },
    {
      name: 'BSc Psychology',
      slug: 'bsc-psychology-uorm',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Psychology',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,800/year',
      description:
        'British Psychological Society-recognised degree covering cognitive, developmental, social, and clinical psychology.',
    },
    {
      name: 'BSc Real Estate',
      slug: 'bsc-real-estate-uorm',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Real Estate',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,800/year',
      description:
        'RICS-accredited real estate programme covering property valuation, investment, urban development, and property law.',
    },
    {
      name: 'BSc Quantity Surveying',
      slug: 'bsc-quantity-surveying-uorm',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Built Environment',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 40,800/year',
      description:
        'RICS and BQSM-accredited programme covering construction cost management, procurement, and contract administration.',
    },
    {
      name: 'Master of Business Administration (MBA)',
      slug: 'mba-uorm',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 43,000/year',
      description:
        'University of Reading UK MBA combining strategic leadership, finance, marketing, and consulting with project-based learning.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Apply via the UoRM admissions portal with your academic transcripts, personal statement, English proficiency scores, and passport.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'The UoRM admissions team evaluates applications and issues conditional or unconditional offers within 7 working days.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Apply for Student Pass',
      description:
        'Pay the acceptance deposit and provide EMGS documentation; UoRM supports the full student visa application process.',
    },
    {
      stepNumber: 4,
      title: 'Register & Attend Induction Week',
      description:
        'Arrive at EduCity campus, complete registration, collect your student ID, and attend the Reading Malaysia induction programme.',
    },
  ],
  scholarships: [
    {
      name: 'UoRM Academic Excellence Scholarship',
      value: 'Up to 30% tuition fee reduction',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.reading.edu.my/admissions/scholarships',
      description:
        'Merit-based scholarship for new undergraduate students with outstanding pre-university academic results.',
    },
    {
      name: 'UoRM International Achievement Award',
      value: 'Up to 20% tuition fee reduction',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial scholarship recognising academic achievement, community engagement, or leadership for international applicants.',
    },
  ],
}

// 9. Curtin University Malaysia
export const CURTIN_MALAYSIA = {
  name: 'Curtin University Malaysia',
  slug: 'curtin-university-malaysia',
  city: 'Miri',
  foundedYear: 1999,
  totalStudents: 4500,
  internationalStudents: 0.20,
  intakeMonths: 'February, July',
  tuitionFeeMin: 35000,
  tuitionFeeMax: 90000,
  tuitionCurrency: 'MYR',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    "Curtin University's Malaysian campus in Miri, Sarawak (QS #183 globally), specialising in Engineering, Mining, Oil & Gas, Business, and Health Sciences at Australian degree standards.",
  overview:
    "Curtin University Malaysia, on a 1,200-hectare campus in Miri, Sarawak, is Curtin Australia's largest campus outside Australia and is ranked #183 in the QS World University Rankings 2026. It confers the same Curtin University Australia degree at roughly one-third the cost of studying in Perth. Programmes span Engineering (Petroleum, Mining, Civil, Mechanical, Electrical), Business, Commerce, Computer Science, Architecture, and Health Sciences. Students have the option to credit-transfer to Curtin's Perth campus partway through their degree.",
  ranking: 183,
  programs: [
    {
      name: 'Bachelor of Engineering (Hons) — Petroleum Engineering',
      slug: 'bachelor-engineering-petroleum-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 45,000/year',
      description:
        'Industry-linked petroleum engineering degree covering reservoir engineering, drilling, production, and field operations in Sarawak\'s oil & gas context.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Mining Engineering',
      slug: 'bachelor-engineering-mining-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 45,000/year',
      description:
        'Mining engineering degree covering rock mechanics, mineral processing, mine planning, and safety engineering.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Civil Engineering',
      slug: 'bachelor-engineering-civil-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 44,000/year',
      description:
        'Structural and infrastructure engineering degree with modules in geotechnics, transport, hydraulics, and construction management.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Mechanical Engineering',
      slug: 'bachelor-engineering-mechanical-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 44,000/year',
      description:
        'Mechanical engineering programme covering thermodynamics, fluid mechanics, materials, manufacturing, and CAD systems.',
    },
    {
      name: 'Bachelor of Commerce (Hons) — Accounting',
      slug: 'bachelor-commerce-accounting-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Accounting & Finance',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 38,000/year',
      description:
        'Australian-accredited accounting degree with CPA Australia and ICAA exemptions; covers financial, management, and tax accounting.',
    },
    {
      name: 'Bachelor of Commerce (Hons) — Marketing',
      slug: 'bachelor-commerce-marketing-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Marketing',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 36,000/year',
      description:
        'Marketing degree covering consumer behaviour, digital marketing, advertising, branding, and marketing research.',
    },
    {
      name: 'Bachelor of Computer Science',
      slug: 'bachelor-computer-science-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 38,000/year',
      description:
        'Computing degree covering algorithms, software engineering, AI, data analytics, and network security.',
    },
    {
      name: 'Bachelor of Science (Hons) — Environmental Science',
      slug: 'bachelor-environmental-science-curtin',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Environmental Science',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 36,000/year',
      description:
        'Science programme exploring ecology, environmental management, water resources, and sustainability policy in Southeast Asia.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Apply through the Curtin Malaysia admissions portal with academic results, English test scores, and a copy of your passport.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'The admissions office reviews applications and issues a formal offer within 7–10 working days; conditional offers require pending results.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Apply for Student Pass',
      description:
        'Pay the acceptance fee to confirm your place; Curtin Malaysia guides you through EMGS student pass application and pre-departure preparations.',
    },
    {
      stepNumber: 4,
      title: 'Arrive in Miri & Attend Orientation',
      description:
        'Complete on-campus registration, receive your student ID, and attend the international student orientation programme in Miri.',
    },
  ],
  scholarships: [
    {
      name: 'Curtin Malaysia Merit Scholarship',
      value: 'Up to 30% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://curtin.edu.my/study/scholarships/',
      description:
        'Merit-based scholarship for new undergraduate students with strong academic results; renewable annually based on CGPA.',
    },
    {
      name: 'Curtin Malaysia Excellence Award',
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Top scholarship for students with outstanding A-Level, IB, or equivalent grades who are enrolling in engineering or science programmes.',
    },
    {
      name: 'Curtin Malaysia International Scholarship',
      value: 'Up to 20% tuition fee reduction',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial fee reduction for international students from selected countries, awarded at point of admission.',
    },
  ],
}

// 10. Swinburne University of Technology Sarawak (Swinburne Malaysia)
export const SWINBURNE_SARAWAK = {
  name: 'Swinburne University of Technology Sarawak',
  slug: 'swinburne-university-sarawak',
  city: 'Kuching',
  foundedYear: 2000,
  totalStudents: 4000,
  internationalStudents: 0.22,
  intakeMonths: 'February, July',
  tuitionFeeMin: 36000,
  tuitionFeeMax: 80000,
  tuitionCurrency: 'MYR',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Australian campus of Swinburne University (QS #294 globally) in Kuching, Sarawak, offering Australian degrees in Engineering, Business, Computing, and Design at a fraction of Australian fees.',
  overview:
    'Swinburne University of Technology Sarawak Campus, located in Kuching, is the Malaysian campus of Swinburne University of Technology Australia, ranked #294 in the QS World University Rankings 2026. Students earn the same Swinburne Australia degree while studying in Kuching at roughly one-third the cost of the Melbourne campus. The university offers programmes across Engineering (Civil, Mechanical, Electrical, Chemical), Business, Accounting, IT, Computer Science, and Design. The campus is recognised for industry-linked learning, a vibrant international student community, and excellent campus facilities.',
  ranking: 294,
  programs: [
    {
      name: 'Bachelor of Engineering (Hons) — Civil Engineering',
      slug: 'bachelor-engineering-civil-swinburne',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 46,000/year',
      description:
        'Australian-awarded civil engineering degree covering structural analysis, geotechnics, hydraulics, and construction project management.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Mechanical Engineering',
      slug: 'bachelor-engineering-mechanical-swinburne',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 46,000/year',
      description:
        'Covers thermodynamics, fluid mechanics, manufacturing processes, and mechatronics; conferred by Swinburne Australia.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Electrical & Electronic',
      slug: 'bachelor-engineering-electrical-swinburne',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 46,000/year',
      description:
        'Electrical and electronic engineering programme covering power systems, embedded systems, signal processing, and IoT.',
    },
    {
      name: 'Bachelor of Business (Hons)',
      slug: 'bachelor-business-swinburne',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 37,000/year',
      description:
        'Australian business degree with specialisations in management, marketing, entrepreneurship, and international business.',
    },
    {
      name: 'Bachelor of Accounting (Hons)',
      slug: 'bachelor-accounting-swinburne',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Accounting & Finance',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 37,000/year',
      description:
        'CPA Australia-recognised accounting degree covering financial reporting, auditing, taxation, and management accounting.',
    },
    {
      name: 'Bachelor of Computer Science (Hons)',
      slug: 'bachelor-computer-science-swinburne',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 37,000/year',
      description:
        'Australian-degree CS programme covering programming, algorithms, machine learning, and software architecture.',
    },
    {
      name: 'Bachelor of Design (Hons)',
      slug: 'bachelor-design-swinburne',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Design',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 38,000/year',
      description:
        'Creative design programme covering graphic design, UI/UX, animation, branding, and digital media production.',
    },
    {
      name: 'Master of Business Administration (MBA)',
      slug: 'mba-swinburne',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 40,000/year',
      description:
        'Swinburne Australia MBA with strategic management, data-driven decision-making, and global business modules.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online',
      description:
        'Submit your application via the Swinburne Sarawak admissions portal with academic transcripts, English results, and passport copy.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'The admissions team assesses your application and sends an offer letter within 7–10 working days.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Apply for Student Pass',
      description:
        'Pay the acceptance deposit, provide EMGS documents, and Swinburne Sarawak submits your student pass application on your behalf.',
    },
    {
      stepNumber: 4,
      title: 'Arrive in Kuching & Attend Orientation',
      description:
        'Complete on-campus registration, collect your student card, and participate in the international student orientation programme.',
    },
  ],
  scholarships: [
    {
      name: 'Swinburne Sarawak Excellence Scholarship',
      value: 'Up to 100% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.swinburne.edu.my/scholarships/',
      description:
        'Top merit scholarship for outstanding students with excellent prior academic results entering foundation, degree, or postgraduate study.',
    },
    {
      name: 'Swinburne Sarawak Merit Scholarship',
      value: 'Up to 50% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Awarded to new students with strong academic backgrounds; renewable based on semester GPA performance.',
    },
    {
      name: 'Swinburne International Scholarship',
      value: 'Up to 25% tuition fee reduction',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial fee reduction for international students enrolling in undergraduate programmes, awarded at admissions stage.',
    },
  ],
}

// 11. Le Cordon Bleu Malaysia (Sunway Le Cordon Bleu)
export const LE_CORDON_BLEU_MALAYSIA = {
  name: 'Le Cordon Bleu Malaysia (Sunway)',
  slug: 'le-cordon-bleu-malaysia',
  city: 'Petaling Jaya',
  foundedYear: 2012,
  totalStudents: 500,
  internationalStudents: 0.45,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 45000,
  tuitionFeeMax: 130000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'A joint venture between Sunway Education Group and Le Cordon Bleu Paris, offering world-renowned culinary arts, pâtisserie, and hospitality management diplomas in Petaling Jaya.',
  overview:
    "Le Cordon Bleu Malaysia, operating through the Sunway Le Cordon Bleu Institute of Culinary Arts in Petaling Jaya, is a partnership between Sunway Education Group and Le Cordon Bleu Paris — the world's most prestigious culinary arts institution. The institute offers internationally recognised diplomas in Cuisine, Pâtisserie, and Boulangerie, as well as the celebrated Grand Diplôme, which combines both Cuisine and Pâtisserie qualifications. Graduates receive the same Le Cordon Bleu credentials as Paris students and benefit from global alumni networks in the hospitality and food industry.",
  ranking: null,
  programs: [
    {
      name: 'Diplôme de Cuisine',
      slug: 'diplome-de-cuisine-lcb',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Culinary Arts',
      durationYears: 0.75,
      tuitionFeePerYear: 'MYR 60,000/year',
      description:
        'Nine-month intensive culinary programme covering classical and contemporary French cooking techniques across Basic, Intermediate, and Superior levels.',
    },
    {
      name: 'Diplôme de Pâtisserie',
      slug: 'diplome-de-patisserie-lcb',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Pastry Arts',
      durationYears: 0.75,
      tuitionFeePerYear: 'MYR 60,000/year',
      description:
        'Nine-month pastry arts diploma covering French pastry techniques, chocolate work, sugar artistry, and dessert plating across three levels.',
    },
    {
      name: 'Grand Diplôme',
      slug: 'grand-diplome-lcb',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Culinary Arts & Pastry',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 65,000/year',
      description:
        "Le Cordon Bleu's most prestigious qualification, combining full Cuisine and Pâtisserie diplomas with a three-month industry placement.",
    },
    {
      name: 'Bachelor of Business (Culinary Management)',
      slug: 'bachelor-business-culinary-management-lcb',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Culinary Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 48,000/year',
      description:
        'Combines Le Cordon Bleu culinary arts training with business management, food entrepreneurship, and hospitality operations modules.',
    },
    {
      name: 'Diploma in Plant-Based Culinary Arts',
      slug: 'diploma-plant-based-culinary-arts-lcb',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Plant-Based Cuisine',
      durationYears: 0.75,
      tuitionFeePerYear: 'MYR 55,000/year',
      description:
        'Specialised culinary programme exploring plant-based cooking techniques, sustainable gastronomy, and modern vegan cuisine.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application with Personal Statement',
      description:
        'Apply online at cordonbleu.edu/malaysia, providing academic transcripts, passport copy, and a statement of culinary interest.',
    },
    {
      stepNumber: 2,
      title: 'Receive Admission Decision',
      description:
        'The admissions team reviews your application and issues an offer, typically within 5–7 working days.',
    },
    {
      stepNumber: 3,
      title: 'Pay Programme Fee & Obtain Student Pass',
      description:
        'Pay the programme deposit to confirm enrolment; the institute assists with Malaysian student pass applications via EMGS.',
    },
    {
      stepNumber: 4,
      title: 'Attend Welcome Session & Begin Practical Training',
      description:
        'Attend the Le Cordon Bleu Malaysia induction, collect your chef whites and kit, and begin hands-on kitchen instruction.',
    },
  ],
  scholarships: [
    {
      name: 'Le Cordon Bleu Malaysian Student Scholarship',
      value: 'RM 5,000 tuition rebate',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: 'https://www.cordonbleu.edu/malaysia/malaysian-student-scholarship/en',
      description:
        'Tuition fee rebate for eligible Malaysian and international students demonstrating passion for culinary arts and strong academic background.',
    },
  ],
}

// 12. Raffles College of Higher Education Malaysia
export const RAFFLES_COLLEGE_MALAYSIA = {
  name: 'Raffles College of Higher Education Malaysia',
  slug: 'raffles-college-malaysia',
  city: 'Kuala Lumpur',
  foundedYear: 1994,
  totalStudents: 1200,
  internationalStudents: 0.35,
  intakeMonths: 'January, May, September',
  tuitionFeeMin: 35000,
  tuitionFeeMax: 90000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Award-winning design and creative arts college in Kuala Lumpur, part of Asia-Pacific\'s largest private education group, offering diplomas and degrees in Fashion, Interior, Graphic, and Jewellery Design.',
  overview:
    'Raffles College of Higher Education Kuala Lumpur, established in 1994 and part of Raffles Education Corporation — the largest private education group in Asia-Pacific — is one of Malaysia\'s most decorated design institutions. Located in central Kuala Lumpur, it offers diploma and degree programmes in Fashion Design, Interior Design, Graphic Design, Jewellery Design, Digital Media Design, and Business. Students consistently win national and international design competitions, and the college hosts annual fashion showcases at premier KL venues.',
  ranking: null,
  programs: [
    {
      name: 'Diploma in Fashion Design',
      slug: 'diploma-in-fashion-design-raffles',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Fashion Design',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 38,000/year',
      description:
        'Industry-oriented fashion diploma covering garment construction, pattern making, fashion illustration, and collection development.',
    },
    {
      name: 'Diploma in Interior Design',
      slug: 'diploma-in-interior-design-raffles',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Interior Design',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 37,000/year',
      description:
        'Practical interior design programme covering space planning, materials, lighting design, and AutoCAD & 3D visualisation.',
    },
    {
      name: 'Diploma in Graphic Design',
      slug: 'diploma-in-graphic-design-raffles',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Graphic Design',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 36,000/year',
      description:
        'Visual communication diploma covering typography, digital illustration, branding, print, and multimedia design.',
    },
    {
      name: 'Diploma in Jewellery Design',
      slug: 'diploma-in-jewellery-design-raffles',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Jewellery Design',
      durationYears: 2.5,
      tuitionFeePerYear: 'MYR 36,000/year',
      description:
        'Unique jewellery design programme covering gemology, metalwork, CAD jewellery design, and commercial product development.',
    },
    {
      name: 'Bachelor of Arts (Hons) in Fashion Design',
      slug: 'ba-hons-fashion-design-raffles',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Fashion Design',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 42,000/year',
      description:
        'Degree-level fashion programme with advanced design research, collection building, brand identity, and fashion show production.',
    },
    {
      name: 'Bachelor of Arts (Hons) in Interior Design',
      slug: 'ba-hons-interior-design-raffles',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Interior Design',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 42,000/year',
      description:
        'Advanced interior design degree covering conceptual design, commercial and residential projects, and sustainability in design.',
    },
    {
      name: 'Bachelor of Business (Hons)',
      slug: 'bachelor-business-raffles',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 35,000/year',
      description:
        'Business degree with a creative industries focus, covering management, marketing, entrepreneurship, and design business.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application & Portfolio',
      description:
        'Apply online at raffles.edu.my with academic certificates, passport copy, and a design portfolio (for design programmes).',
    },
    {
      stepNumber: 2,
      title: 'Portfolio Review & Offer Letter',
      description:
        'The Raffles admissions team reviews your academic and creative work and issues an offer letter within 7 working days.',
    },
    {
      stepNumber: 3,
      title: 'Accept & Apply for Student Pass',
      description:
        'Pay the acceptance deposit and submit EMGS documents; Raffles KL guides you through the Malaysian student pass process.',
    },
    {
      stepNumber: 4,
      title: 'Attend Orientation & Begin Studio Work',
      description:
        'Attend the Raffles KL orientation, receive your studio access card, and begin design classes in the first week.',
    },
  ],
  scholarships: [
    {
      name: 'Raffles Merit Scholarship',
      value: '10% tuition fee discount',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://raffles.edu.my',
      description:
        'Standard tuition discount for eligible students with strong academic records enrolling in diploma or degree programmes.',
    },
    {
      name: 'Raffles International Student Award',
      value: 'Up to 15% tuition reduction',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial scholarship for international students demonstrating both academic merit and creative portfolio strength.',
    },
  ],
}

// 13. University of Cyberjaya
export const UNIVERSITY_OF_CYBERJAYA = {
  name: 'University of Cyberjaya',
  slug: 'university-of-cyberjaya',
  city: 'Cyberjaya',
  foundedYear: 1997,
  totalStudents: 5000,
  internationalStudents: 0.25,
  intakeMonths: 'March, July, November',
  tuitionFeeMin: 18000,
  tuitionFeeMax: 79000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Healthcare-focused private university in Cyberjaya offering Medicine, Pharmacy, Physiotherapy, Psychology, and IT programmes with strong hospital clinical training networks.',
  overview:
    'University of Cyberjaya (UoC), located in Cyberjaya near Putrajaya, is a health sciences and technology-focused private university in Malaysia. Formerly known as Cyberjaya University College of Medical Sciences, it offers more than 50 academic programmes in Medicine (MBBS), Pharmacy, Physiotherapy, Nursing, Psychology, Biomedical Engineering, Business Administration, and IT. UoC has clinical training partnerships with numerous Malaysian hospitals and is known for its specialised healthcare programmes and competitive international student scholarship support.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
      slug: 'mbbs-uoc',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Medicine',
      durationYears: 5,
      tuitionFeePerYear: 'MYR 79,000/year',
      description:
        'MMC-registered MBBS programme with pre-clinical training in Cyberjaya and clinical rotations across affiliated Malaysian hospitals.',
    },
    {
      name: 'Bachelor of Pharmacy (Hons)',
      slug: 'bachelor-pharmacy-uoc',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Pharmacy',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 40,000/year',
      description:
        'Pharmacy degree covering pharmacology, pharmaceutical sciences, clinical pharmacy, and dispensing practice with hospital placements.',
    },
    {
      name: 'Bachelor of Physiotherapy (Hons)',
      slug: 'bachelor-physiotherapy-uoc',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Allied Health Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 35,000/year',
      description:
        'Physiotherapy programme covering musculoskeletal, neurological, and cardiopulmonary rehabilitation with supervised clinical placements.',
    },
    {
      name: 'Bachelor of Psychology (Hons)',
      slug: 'bachelor-psychology-uoc',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Psychology',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Psychology degree covering counselling, developmental, clinical, and industrial-organisational psychology with research methods training.',
    },
    {
      name: 'Bachelor of Information Technology (Hons)',
      slug: 'bachelor-it-uoc',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Information Technology',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 25,000/year',
      description:
        'IT degree with health informatics focus covering software development, database systems, networking, and digital health applications.',
    },
    {
      name: 'Bachelor of Business Administration (Hons)',
      slug: 'bba-uoc',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 24,000/year',
      description:
        'Business degree covering management, marketing, accounting, and entrepreneurship with healthcare industry context.',
    },
    {
      name: 'Foundation in Science',
      slug: 'foundation-in-science-uoc',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Science',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 18,000/year',
      description:
        'Pre-university science foundation designed as a pathway to medicine, pharmacy, and health sciences undergraduate programmes.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Apply via the UoC admissions website, attaching academic transcripts, English proficiency results, and passport copy.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'UoC evaluates your application and issues a formal offer; medicine applicants may be invited for a selection interview.',
    },
    {
      stepNumber: 3,
      title: 'Accept & Apply for Student Pass',
      description:
        'Pay the acceptance fee and UoC submits your student pass application through EMGS on your behalf.',
    },
    {
      stepNumber: 4,
      title: 'Register & Attend Orientation',
      description:
        'Arrive in Cyberjaya, complete academic registration, collect your student ID, and attend the international student orientation.',
    },
  ],
  scholarships: [
    {
      name: 'UoC Foundation Scholarship',
      value: '100% tuition fee waiver (foundation to degree)',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://cyberjaya.edu.my/scholarships',
      description:
        'Full tuition waiver for students progressing from UoC Foundation programmes into selected undergraduate programmes.',
    },
    {
      name: 'UoC Merit Scholarship',
      value: '20% – 50% tuition fee reduction',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Merit-based partial scholarship for new students with excellent SPM, A-Level, or equivalent pre-university results.',
    },
    {
      name: 'UoC International Student Scholarship',
      value: 'Up to 25% tuition fee waiver',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial scholarship specifically for international students enrolling in any undergraduate programme at UoC.',
    },
  ],
}

// 14. Methodist College Kuala Lumpur (MCKL)
export const METHODIST_COLLEGE_KL = {
  name: 'Methodist College Kuala Lumpur (MCKL)',
  slug: 'methodist-college-kuala-lumpur',
  city: 'Kuala Lumpur',
  foundedYear: 1983,
  totalStudents: 3500,
  internationalStudents: 0.15,
  intakeMonths: 'January, April, July',
  tuitionFeeMin: 13000,
  tuitionFeeMax: 40000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Established Kuala Lumpur college offering Foundation, Diploma, and the American Degree Transfer Program (ADTP), providing direct pathways to US universities at affordable fees.',
  overview:
    'Methodist College Kuala Lumpur (MCKL), founded in 1983, is a well-established private college in KL known for its academic rigour and Christian values. Its flagship programme is the American Degree Transfer Program (ADTP), which enables students to transfer directly to US universities after completing two years at MCKL. The college also offers foundation programmes, diplomas in Business, IT, Mass Communication, Early Childhood Education, and Social Work, as well as A-Levels. MCKL is known for its small class sizes, pastoral support, and strong ADTP graduate placement rates to US universities.',
  ranking: null,
  programs: [
    {
      name: 'American Degree Transfer Program (ADTP)',
      slug: 'american-degree-transfer-program-mckl',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'General Studies / US Transfer',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 20,000/year',
      description:
        'Two-year programme with US-accredited credits enabling direct transfer to sophomore or junior year at American universities.',
    },
    {
      name: 'Foundation in Arts',
      slug: 'foundation-in-arts-mckl',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Arts & Social Sciences',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 13,900/year',
      description:
        'One-year foundation covering social sciences, economics, English, and mathematics as a pathway to arts and business degrees.',
    },
    {
      name: 'Foundation in Science',
      slug: 'foundation-in-science-mckl',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Science',
      durationYears: 1,
      tuitionFeePerYear: 'MYR 13,900/year',
      description:
        'Science pre-university programme covering biology, chemistry, physics, and mathematics for entry into science and health degrees.',
    },
    {
      name: 'Diploma in Business Administration',
      slug: 'diploma-business-administration-mckl',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 15,000/year',
      description:
        'Diploma providing core business competencies in accounting, marketing, management, and entrepreneurship.',
    },
    {
      name: 'Diploma in Information Technology',
      slug: 'diploma-information-technology-mckl',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Information Technology',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 15,500/year',
      description:
        'IT diploma covering programming, database management, networking, and systems analysis.',
    },
    {
      name: 'Diploma in Mass Communication',
      slug: 'diploma-mass-communication-mckl',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Communication & Media',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 15,000/year',
      description:
        'Communication diploma covering journalism, public relations, media production, and digital content creation.',
    },
    {
      name: 'Diploma in Early Childhood Education',
      slug: 'diploma-early-childhood-education-mckl',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Education',
      durationYears: 2,
      tuitionFeePerYear: 'MYR 14,000/year',
      description:
        'Vocational diploma preparing students for early childhood teaching roles with child development, pedagogy, and practicum components.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application Form',
      description:
        'Apply online or in person at MCKL with academic transcripts, passport copy, and English proficiency documentation.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer & Pay Acceptance Fee',
      description:
        'The admissions office reviews your application and issues an offer; pay the acceptance fee to secure your place.',
    },
    {
      stepNumber: 3,
      title: 'Apply for Malaysian Student Pass',
      description:
        'MCKL assists with the EMGS student pass application; international students should allow 4–6 weeks for visa processing.',
    },
    {
      stepNumber: 4,
      title: 'Register & Attend Orientation',
      description:
        'Complete course registration on arrival, collect your student ID, and attend the MCKL orientation and campus tour.',
    },
  ],
  scholarships: [
    {
      name: 'MCKL Academic Excellence Award',
      value: 'Up to 30% tuition fee reduction',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://mckl.edu.my/financial-aid/',
      description:
        'Merit-based scholarship for students with outstanding SPM, O-Level, or equivalent results enrolling in MCKL programmes.',
    },
    {
      name: 'MCKL ADTP Scholarship',
      value: 'Up to RM 5,000 reduction',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial financial support specifically for students enrolling in the American Degree Transfer Program with strong academic credentials.',
    },
  ],
}

// 15. MILA University (formerly Manipal International University Malaysia)
export const MILA_UNIVERSITY = {
  name: 'MILA University',
  slug: 'mila-university',
  city: 'Nilai',
  foundedYear: 2010,
  totalStudents: 2500,
  internationalStudents: 0.35,
  intakeMonths: 'February, June, October',
  tuitionFeeMin: 22000,
  tuitionFeeMax: 55000,
  tuitionCurrency: 'MYR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'International university in Nilai offering Business, Engineering, IT, and Biotechnology programmes; rebranded in 2023 following acquisition, with SETARA Competitive rating.',
  overview:
    'MILA University (formerly Manipal International University Malaysia) is an international private university located in Nilai, Negeri Sembilan, rebranded in August 2023 following its acquisition by Shenzheng International Trade (Hainan) Co. Ltd. The university holds a SETARA Competitive rating from Malaysia\'s Ministry of Higher Education and is ranked in the QS Asia University Rankings 551–600 band for 2024. It offers programmes across Business Management, Computer Science, Engineering, and Biotechnology, attracting a sizeable international student cohort. MILA is committed to industry-ready education with research-active faculty.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Business Administration (Hons)',
      slug: 'bba-mila',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 22,000/year',
      description:
        'General management degree covering marketing, finance, human resources, and operations with industry exposure modules.',
    },
    {
      name: 'Bachelor of Computer Science (Hons)',
      slug: 'bachelor-computer-science-mila',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computing & IT',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 25,000/year',
      description:
        'Software-focused computing degree covering programming, AI, data structures, and software architecture with practical projects.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Electrical & Electronic',
      slug: 'bachelor-engineering-electrical-mila',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Electrical and electronic engineering degree with power systems, embedded electronics, IoT, and control engineering modules.',
    },
    {
      name: 'Bachelor of Engineering (Hons) — Mechanical',
      slug: 'bachelor-engineering-mechanical-mila',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'MYR 27,000/year',
      description:
        'Mechanical engineering degree covering thermodynamics, materials engineering, manufacturing systems, and design analysis.',
    },
    {
      name: 'Bachelor of Biotechnology (Hons)',
      slug: 'bachelor-biotechnology-mila',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Biotechnology',
      durationYears: 3,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Biotechnology programme combining molecular biology, microbiology, genetic engineering, and bioprocessing for science careers.',
    },
    {
      name: 'Master of Business Administration (MBA)',
      slug: 'mba-mila',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'MYR 28,000/year',
      description:
        'Postgraduate management programme for working professionals covering leadership, strategy, finance, and digital business.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Apply via the MILA University admissions portal with academic transcripts, English test results, and a passport copy.',
    },
    {
      stepNumber: 2,
      title: 'Receive Offer Letter',
      description:
        'Admissions processes applications and issues a conditional or unconditional offer within 5–10 working days.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Apply for Student Pass',
      description:
        'Pay the acceptance deposit and complete the EMGS student pass application; MILA University provides full visa support.',
    },
    {
      stepNumber: 4,
      title: 'Arrive in Nilai & Attend Orientation',
      description:
        'Complete campus registration, collect your student ID, and attend MILA\'s international student welcome and orientation programme.',
    },
  ],
  scholarships: [
    {
      name: 'MILA University Merit Scholarship',
      value: 'Up to 30% tuition fee waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://mila.edu.my/scholarships',
      description:
        'Available to new undergraduate students with strong prior academic results; renewable subject to CGPA maintenance.',
    },
    {
      name: 'MILA International Student Award',
      value: 'Up to 20% tuition fee reduction',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: null,
      description:
        'Partial fee reduction for international students enrolling in undergraduate or postgraduate programmes at MILA University.',
    },
  ],
}
export const MALAYSIA_UNIVERSITIES: any[] = [
  UOW_MALAYSIA,
  INTI_COLLEGE_SUBANG,
  INTI_INTERNATIONAL_UNIVERSITY,
  TAYLORS_COLLEGE,
  TAYLORS_UNIVERSITY,
  IMU_UNIVERSITY,
  APU_MALAYSIA,
  UNIVERSITY_OF_READING_MALAYSIA,
  CURTIN_MALAYSIA,
  SWINBURNE_SARAWAK,
  LE_CORDON_BLEU_MALAYSIA,
  RAFFLES_COLLEGE_MALAYSIA,
  UNIVERSITY_OF_CYBERJAYA,
  METHODIST_COLLEGE_KL,
  MILA_UNIVERSITY,
]
