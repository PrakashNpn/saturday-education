import { DegreeType, Region, ScholarshipType } from '../../generated/client'

// ─── UNITED KINGDOM COUNTRY ───────────────────────────────────────────────────

export const UNITED_KINGDOM = {
  slug: 'united-kingdom',
  name: 'United Kingdom',
  region: Region.EUROPE,
  tagline: 'World-Class Degrees in 3 Years — With a Post-Study Work Visa',
  shortDescription:
    "The United Kingdom hosts four of the world's top 10 universities and over 160 higher education institutions, offering internationally recognised degrees in as little as 3 years for bachelor's and 1 year for master's. The Graduate Route visa gives international students 2 years (3 for PhD) to work in the UK after graduation.",
  overview: `The United Kingdom is one of the world's premier study destinations, home to some of the oldest and most respected universities on the planet — including Oxford, Cambridge, Imperial, and the London School of Economics. Beyond the elite Russell Group, the UK's post-92 universities and specialist colleges offer outstanding value for international students, with modern campuses, strong industry connections, and a wide variety of programmes across business, engineering, health, law, design, and creative arts. UK degrees are highly respected by employers across Asia and worldwide, and the shorter duration (3-year bachelor's, 1-year master's) means lower overall costs compared to studying in the USA or Canada. The Graduate Route visa, introduced in 2021, gives international graduates 2 years (3 for PhD graduates) to work or look for work in the UK after completing their studies — a significant career advantage. The UK's diverse, multicultural cities — London, Manchester, Birmingham, Leeds, Edinburgh — provide vibrant environments with established international student communities.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '160+',
  tuitionFeeRange: 'GBP 11,000 – GBP 38,000/year',
  postStudyWorkVisa: 'Graduate Route Visa — 2 years (3 years for PhD graduates)',
  internationalStudents: 680000,
  studentSatisfaction: 84,
  graduateEmployability: 87,
  visaProcessingTime: '3 weeks',
  workRights: '20 hrs/week during term; full-time during official holidays. Post-study: Graduate Route — 2 years (3 for PhD).',
  costOfLivingMinUSD: 12000,
  costOfLivingMaxUSD: 20000,
  currencyCode: 'GBP',
  academicSpecialties: [
    'Business & Management',
    'Engineering & Technology',
    'Law',
    'Nursing & Healthcare',
    'Art, Design & Creative Arts',
    'Computer Science & Data',
  ],
  isFeatured: true,
  advantages: [
    {
      title: 'Shorter Degrees — Lower Total Cost',
      description:
        "UK bachelor's degrees take 3 years (2 years in Scotland for some), and master's just 1 year — saving a full year of tuition and living costs compared to the USA, Canada or Australia. The same internationally recognised credential, faster.",
      order: 1,
    },
    {
      title: '2-Year Post-Study Work Visa',
      description:
        "The Graduate Route visa lets international students work anywhere in the UK for 2 years after graduation (3 years for PhD graduates) without needing a job offer in advance — one of the most flexible post-study work rights in the world.",
      order: 2,
    },
    {
      title: 'World-Class Universities Across All Budget Levels',
      description:
        "From Russell Group research universities to modern, industry-focused post-92 institutions and specialist colleges, the UK offers internationally recognised degrees at every price point — GBP 11,000 to GBP 38,000 per year.",
      order: 3,
    },
    {
      title: 'Global Recognition & Career Outcomes',
      description:
        "UK degrees are recognised and respected by employers in every country. The UK's strong professional networks in finance (London), technology (London, Manchester), health (NHS), and creative industries give graduates a competitive edge globally.",
      order: 4,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Research and Shortlist Universities',
      description:
        'Identify UCAS-listed universities and programmes that match your academic profile and career goals. For undergraduate applications, use UCAS (the centralised UK application system). Postgraduate students apply directly to each university.',
    },
    {
      stepNumber: 2,
      title: 'Apply and Receive Offer',
      description:
        'Undergraduate: apply via UCAS by January 31 (October 15 for Oxford/Cambridge/medicine). Postgraduate: apply directly to each university — rolling admissions, apply early. Receive conditional or unconditional offer within 4–8 weeks.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer and Receive CAS',
      description:
        'Accept your offer, meet any conditions (e.g. exam results, English test), pay your deposit, and receive your Confirmation of Acceptance for Studies (CAS) — the unique reference number required for your Student visa application.',
    },
    {
      stepNumber: 4,
      title: 'Apply for UK Student Visa',
      description:
        'Apply online for a UK Student visa using your CAS number, pay the Immigration Health Surcharge (IHS), submit biometrics, and provide financial evidence. Processing takes approximately 3 weeks.',
    },
  ],
  faqs: [
    {
      question: 'What IELTS score do I need for UK universities?',
      answer:
        'Most UK universities require IELTS Academic 6.0–6.5 overall (no individual band below 5.5) for undergraduate programmes. Postgraduate and law programmes typically require 6.5–7.0. Russell Group and specialist programmes may require higher. PTE, TOEFL and Cambridge English qualifications are widely accepted as alternatives.',
      order: 1,
    },
    {
      question: 'How many hours can I work in the UK on a Student visa?',
      answer:
        'Student visa holders can work 20 hours per week during term time and full-time during official university vacation periods (Christmas, Easter, summer). The Graduate Route visa after graduation allows unlimited work hours in any role.',
      order: 2,
    },
    {
      question: 'What is the Graduate Route visa?',
      answer:
        "The Graduate Route is a UK post-study work visa available to international students who have completed a UK degree. It gives you 2 years (3 years for PhD graduates) to live and work in the UK without needing a job offer. You can switch to a Skilled Worker visa if you find graduate-level employment.",
      order: 3,
    },
    {
      question: "What is the difference between Russell Group and post-92 universities?",
      answer:
        "Russell Group universities (24 institutions including Sheffield, Leeds, Manchester, Nottingham) are research-intensive with globally ranked programmes and selective admission. Post-92 universities (formerly polytechnics) focus on applied, professional education with strong industry links, higher acceptance rates, and lower fees — both award the same UK degree.",
      order: 4,
    },
    {
      question: 'Do I need to pay the Immigration Health Surcharge (IHS)?',
      answer:
        'Yes — international students applying for a UK Student visa must pay the Immigration Health Surcharge upfront (currently GBP 776/year as of 2024) in addition to the visa fee. This gives you access to the NHS during your stay, equivalent to UK residents.',
      order: 5,
    },
  ],
}

export const UWE_BRISTOL = {
  name: "UWE Bristol",
  slug: "uwe-bristol",
  city: "Bristol",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 30000,
  internationalStudents: 0.15,
  acceptanceRate: 74,
  shortDescription:
    "A leading post-92 university in the South West offering career-focused degrees in business, engineering, health sciences, and creative arts.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A comprehensive business degree covering strategy, marketing, finance, and leadership for modern organisations.",
    },
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An industry-aligned engineering programme covering design, thermodynamics, and manufacturing systems.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved nursing degree with extensive clinical placement experience across NHS and community settings.",
    },
    {
      name: "BA (Hons) Graphic Design",
      slug: 'ba-hons-graphic-design',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A studio-based creative arts programme exploring typography, branding, digital media, and visual communication.",
    },
    {
      name: "MSc International Business Management",
      slug: 'msc-international-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,500/year',
      description:
        "A postgraduate programme developing global business strategy, cross-cultural management, and international marketing skills.",
    },
    {
      name: "Foundation Year in Engineering",
      slug: 'foundation-year-in-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A preparatory year providing the mathematical and scientific foundations required for progression to engineering degrees.",
    },
  ],
  scholarships: [
    {
      name: "UWE Bristol International Excellence Award",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for high-achieving international students entering undergraduate programmes.",
    },
    {
      name: "UWE Bristol Postgraduate Scholarship",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial tuition fee reduction for international students enrolling in postgraduate taught programmes.",
    },
  ],
};

export const UNIVERSITY_OF_PORTSMOUTH = {
  name: "University of Portsmouth",
  slug: "university-of-portsmouth",
  city: "Portsmouth",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 25000,
  internationalStudents: 0.2,
  acceptanceRate: 72,
  shortDescription:
    "A dynamic post-92 coastal university renowned for criminology, data science, business, and biomedical sciences with strong industry links.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 17500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BSc (Hons) Criminology",
      slug: 'bsc-hons-criminology',
      field: 'Social Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An evidence-based criminology degree exploring crime, justice, policing, and the psychology of criminal behaviour.",
    },
    {
      name: "BSc (Hons) Data Science",
      slug: 'bsc-hons-data-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A technically rigorous data science programme covering machine learning, statistical analysis, and data visualisation.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professional business degree integrating strategic management, entrepreneurship, and global business practice.",
    },
    {
      name: "BSc (Hons) Biomedical Science",
      slug: 'bsc-hons-biomedical-science',
      field: 'Health Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An IBMS-accredited biomedical science programme with laboratory-based learning in pathology, biochemistry, and microbiology.",
    },
    {
      name: "MSc Forensic Accounting",
      slug: 'msc-forensic-accounting',
      field: 'Finance & Economics',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 17,500/year',
      description:
        "A specialist postgraduate programme combining accounting, auditing, and fraud investigation for financial crime professionals.",
    },
    {
      name: "Foundation Year in Science and Technology",
      slug: 'foundation-year-in-science-and-technology',
      field: 'Foundation & Pathway',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A preparatory foundation year designed for students without the required science or technology entry qualifications.",
    },
  ],
  scholarships: [
    {
      name: "Portsmouth Global Excellence Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Awarded to exceptional international undergraduate applicants demonstrating academic excellence.",
    },
    {
      name: "Portsmouth Postgraduate International Award",
      value: 'GBP 2,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial scholarship for international students progressing to postgraduate study at Portsmouth.",
    },
  ],
};

export const UNIVERSITY_OF_SHEFFIELD = {
  name: "University of Sheffield",
  slug: "university-of-sheffield",
  city: "Sheffield",
  foundedYear: 1905,
  ranking: 105,
  totalStudents: 29000,
  internationalStudents: 0.31,
  acceptanceRate: 55,
  shortDescription:
    "A prestigious Russell Group university consistently ranked in the global top 110, known for world-class engineering, medicine, and management.",
  tuitionFeeMin: 22500,
  tuitionFeeMax: 29000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BEng (Hons) Civil Engineering",
      slug: 'beng-hons-civil-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 26,450/year',
      description:
        "An ICE-accredited civil engineering degree with specialisations in structural, environmental, and infrastructure engineering.",
    },
    {
      name: "MBChB Medicine",
      slug: 'mbchb-medicine',
      field: 'Health Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 5,
      tuitionFeePerYear: 'GBP 29,000/year',
      description:
        "A GMC-accredited medical degree combining clinical science with patient-centred care across Sheffield's major hospital trusts.",
    },
    {
      name: "BSc (Hons) Business Management",
      slug: 'bsc-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 22,500/year',
      description:
        "A rigorous management degree delivered by the AACSB-accredited Sheffield University Management School.",
    },
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 26,450/year',
      description:
        "A world-renowned mechanical engineering programme with links to the Advanced Manufacturing Research Centre.",
    },
    {
      name: "MSc Advanced Manufacturing Technologies",
      slug: 'msc-advanced-manufacturing-technologies',
      field: 'Engineering',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 27,000/year',
      description:
        "A cutting-edge postgraduate programme exploring robotics, additive manufacturing, and digital factory technologies.",
    },
    {
      name: "MSc Management",
      slug: 'msc-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 25,000/year',
      description:
        "An internationally recognised management masters designed for graduates seeking leadership roles in global organisations.",
    },
  ],
  scholarships: [
    {
      name: "Sheffield Global Excellence Award",
      value: 'GBP 5,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Recognises outstanding academic achievement in international undergraduate applicants across all faculties.",
    },
    {
      name: "Sheffield Engineering International Scholarship",
      value: 'GBP 10,000',
      type: ScholarshipType.PARTIAL,
      description:
        "Supports high-calibre international students entering engineering programmes at Sheffield.",
    },
  ],
};

export const UNIVERSITY_OF_CHESTER = {
  name: "University of Chester",
  slug: "university-of-chester",
  city: "Chester",
  foundedYear: 1839,
  ranking: null,
  totalStudents: 20000,
  internationalStudents: 0.12,
  acceptanceRate: 78,
  shortDescription:
    "One of England's oldest universities, offering career-focused degrees in business, nursing, education, and theology in a vibrant cathedral city.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 15000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A practice-oriented business degree covering management, entrepreneurship, marketing, and organisational strategy.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-registered nursing degree equipping students with clinical and compassionate care skills for NHS practice.",
    },
    {
      name: "BA (Hons) Education Studies",
      slug: 'ba-hons-education-studies',
      field: 'Education',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An interdisciplinary education degree exploring pedagogy, policy, psychology, and inclusive learning practices.",
    },
    {
      name: "BA (Hons) Theology and Religious Studies",
      slug: 'ba-hons-theology-and-religious-studies',
      field: 'Humanities',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A respected theology programme examining world religions, ethics, biblical studies, and contemporary spiritual questions.",
    },
    {
      name: "MSc International Business",
      slug: 'msc-international-business',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 15,000/year',
      description:
        "A postgraduate business programme with a global focus covering international strategy, trade, and cross-cultural management.",
    },
  ],
  scholarships: [
    {
      name: "Chester International Excellence Scholarship",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Merit-based scholarship for international students with strong academic records entering undergraduate programmes.",
    },
    {
      name: "Chester Postgraduate Bursary",
      value: 'GBP 1,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial tuition fee reduction for international postgraduate students at the University of Chester.",
    },
  ],
};

export const DE_MONTFORT_UNIVERSITY = {
  name: "De Montfort University",
  slug: "de-montfort-university",
  city: "Leicester",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 21000,
  internationalStudents: 0.29,
  acceptanceRate: 73,
  shortDescription:
    "A vibrant post-92 university in the East Midlands renowned for fashion design, law, business, and computing with a strong industry network.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Fashion Design",
      slug: 'ba-hons-fashion-design',
      field: 'Fashion & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A creative fashion design programme with studio practice, industry placements, and graduate fashion week participation.",
    },
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A qualifying law degree covering criminal, contract, tort, and constitutional law with moot court competitions.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An applied business degree with optional placement year, covering finance, marketing, HR, and strategic management.",
    },
    {
      name: "BSc (Hons) Computing",
      slug: 'bsc-hons-computing',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A flexible computing degree with pathways in software engineering, cybersecurity, AI, and networks.",
    },
    {
      name: "MSc Cyber Security",
      slug: 'msc-cyber-security',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,000/year',
      description:
        "A technical postgraduate programme in cybersecurity covering ethical hacking, digital forensics, and network security.",
    },
    {
      name: "Foundation Year in Art and Design",
      slug: 'foundation-year-in-art-and-design',
      field: 'Art & Design',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A portfolio-building foundation year for students progressing to creative undergraduate programmes at DMU.",
    },
  ],
  scholarships: [
    {
      name: "DMU Global Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Awarded to high-achieving international students applying to undergraduate and postgraduate programmes.",
    },
    {
      name: "DMU Postgraduate International Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial tuition fee reduction for international students commencing postgraduate study at DMU.",
    },
  ],
};

export const EDINBURGH_NAPIER_UNIVERSITY = {
  name: "Edinburgh Napier University",
  slug: "edinburgh-napier-university",
  city: "Edinburgh",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 20000,
  internationalStudents: 0.28,
  acceptanceRate: 70,
  shortDescription:
    "A modern Scottish university in the heart of Edinburgh offering career-focused degrees in business, computing, engineering, and tourism.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professionally accredited business degree with pathways in marketing, HR, finance, and international business.",
    },
    {
      name: "BSc (Hons) Computing",
      slug: 'bsc-hons-computing',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BCS-accredited computing degree covering software development, data science, networking, and AI.",
    },
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An industry-aligned engineering programme with strong links to Scotland's energy and manufacturing sectors.",
    },
    {
      name: "BA (Hons) Tourism Management",
      slug: 'ba-hons-tourism-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A tourism and hospitality degree capitalising on Edinburgh's global appeal, covering event management and sustainable tourism.",
    },
    {
      name: "MSc International Business Management",
      slug: 'msc-international-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,000/year',
      description:
        "A postgraduate programme developing global business leadership skills with an emphasis on innovation and entrepreneurship.",
    },
    {
      name: "MSc Cybersecurity and Forensics",
      slug: 'msc-cybersecurity-and-forensics',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,000/year',
      description:
        "A technically advanced programme in cybersecurity covering digital forensics, penetration testing, and incident response.",
    },
  ],
  scholarships: [
    {
      name: "Napier International Excellence Scholarship",
      value: 'GBP 3,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Recognises academic merit in international students applying to undergraduate programmes at Edinburgh Napier.",
    },
    {
      name: "Napier Postgraduate International Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial scholarship for international students commencing postgraduate study at Edinburgh Napier.",
    },
  ],
};

export const LEEDS_BECKETT_UNIVERSITY = {
  name: "Leeds Beckett University",
  slug: "leeds-beckett-university",
  city: "Leeds",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 24000,
  internationalStudents: 0.15,
  acceptanceRate: 76,
  shortDescription:
    "A forward-looking post-92 university in Leeds offering practical degrees in business, sport science, health, and film production.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 15500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An industry-focused business degree with optional placement year and pathways in marketing, HRM, and enterprise.",
    },
    {
      name: "BSc (Hons) Sport and Exercise Science",
      slug: 'bsc-hons-sport-and-exercise-science',
      field: 'Sport & Exercise Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A performance-focused sport science degree with access to elite sport labs and partnerships with local professional clubs.",
    },
    {
      name: "BSc (Hons) Public Health",
      slug: 'bsc-hons-public-health',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A health-focused degree exploring epidemiology, health policy, community health, and health promotion strategies.",
    },
    {
      name: "BA (Hons) Film and Moving Image Production",
      slug: 'ba-hons-film-and-moving-image-production',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A practical film production degree with studio facilities, covering directing, cinematography, editing, and documentary.",
    },
    {
      name: "MSc Sport Business Management",
      slug: 'msc-sport-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 15,500/year',
      description:
        "A specialist postgraduate degree combining sport industry knowledge with business strategy and leadership skills.",
    },
  ],
  scholarships: [
    {
      name: "Leeds Beckett International Scholarship",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based award for international students entering undergraduate or postgraduate programmes at Leeds Beckett.",
    },
    {
      name: "Leeds Beckett Sport Excellence Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "Recognises international students with outstanding sporting and academic achievement entering sport-related programmes.",
    },
  ],
};

export const BUCKINGHAMSHIRE_NEW_UNIVERSITY = {
  name: "Buckinghamshire New University",
  slug: "buckinghamshire-new-university",
  city: "High Wycombe",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 12000,
  internationalStudents: 0.17,
  acceptanceRate: 80,
  shortDescription:
    "A specialist university in High Wycombe offering professionally grounded degrees in nursing, business, creative arts, and aviation.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 15000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved nursing degree providing clinical placements across NHS trusts and community health settings.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A practice-oriented degree integrating business theory with real-world industry projects and guest speaker programmes.",
    },
    {
      name: "BA (Hons) Creative Arts",
      slug: 'ba-hons-creative-arts',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A multidisciplinary arts programme spanning fine art, illustration, photography, and digital media.",
    },
    {
      name: "BSc (Hons) Air Transport with Pilot Studies",
      slug: 'bsc-hons-air-transport-with-pilot-studies',
      field: 'Sport & Exercise Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A unique aviation degree combining air transport management theory with pilot training pathways and simulator access.",
    },
    {
      name: "MSc Aviation Management",
      slug: 'msc-aviation-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 15,000/year',
      description:
        "A postgraduate programme covering airline strategy, airport operations, safety regulation, and sustainable aviation.",
    },
  ],
  scholarships: [
    {
      name: "Bucks New University International Award",
      value: 'GBP 2,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship supporting international students in undergraduate programmes at Buckinghamshire New University.",
    },
    {
      name: "Bucks Nursing Bursary",
      value: 'GBP 1,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial financial support award for international students enrolling in nursing and health programmes.",
    },
  ],
};

export const UNIVERSITY_FOR_THE_CREATIVE_ARTS = {
  name: "University for the Creative Arts",
  slug: "university-for-the-creative-arts",
  city: "Farnham",
  foundedYear: 2008,
  ranking: null,
  totalStudents: 6500,
  internationalStudents: 0.31,
  acceptanceRate: 65,
  shortDescription:
    "A specialist creative arts university across multiple campuses in Surrey and Kent, offering world-class courses in fine art, fashion, graphic design, and film.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Fine Art",
      slug: 'ba-hons-fine-art',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A studio-centred fine art programme exploring painting, sculpture, installation, and contemporary art practice.",
    },
    {
      name: "BA (Hons) Fashion Design",
      slug: 'ba-hons-fashion-design',
      field: 'Fashion & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A cutting-edge fashion degree with industry mentors, graduate shows, and international exchange opportunities.",
    },
    {
      name: "BA (Hons) Graphic Design",
      slug: 'ba-hons-graphic-design',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A portfolio-led graphic design programme covering branding, typography, motion graphics, and digital communication.",
    },
    {
      name: "BA (Hons) Film Production",
      slug: 'ba-hons-film-production',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A hands-on film production course with industry-standard studios covering directing, editing, and cinematography.",
    },
    {
      name: "MA Fashion",
      slug: 'ma-fashion',
      field: 'Fashion & Design',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,500/year',
      description:
        "An internationally recognised postgraduate fashion programme developing individual creative vision and professional identity.",
    },
    {
      name: "Foundation Year in Art and Design",
      slug: 'foundation-year-in-art-and-design',
      field: 'Art & Design',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A portfolio-building foundation year providing creative exploration before progression to specialist UCA undergraduate courses.",
    },
  ],
  scholarships: [
    {
      name: "UCA International Creative Excellence Scholarship",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Awarded to international students demonstrating exceptional creative talent and academic merit at UCA.",
    },
    {
      name: "UCA Postgraduate International Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial fee reduction for international students entering postgraduate programmes at UCA.",
    },
  ],
};

export const UNIVERSITY_OF_EAST_LONDON = {
  name: "University of East London",
  slug: "university-of-east-london",
  city: "London",
  foundedYear: 1898,
  ranking: null,
  totalStudents: 18000,
  internationalStudents: 0.28,
  acceptanceRate: 77,
  shortDescription:
    "A diverse and inclusive London university in Stratford offering degrees in business, psychology, health sciences, and engineering with a focus on social impact.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professionally oriented business degree with industry placements and enterprise modules in one of the world's financial capitals.",
    },
    {
      name: "BSc (Hons) Psychology",
      slug: 'bsc-hons-psychology',
      field: 'Psychology',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BPS-accredited psychology degree covering cognitive, clinical, and social psychology with research methods training.",
    },
    {
      name: "BSc (Hons) Health and Social Care",
      slug: 'bsc-hons-health-and-social-care',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A degree focused on health promotion, service delivery, and social policy equipping graduates for roles in health and care sectors.",
    },
    {
      name: "BEng (Hons) Civil Engineering",
      slug: 'beng-hons-civil-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An engineering degree capitalising on London's major infrastructure projects, covering structural, environmental, and transport engineering.",
    },
    {
      name: "MSc International Business",
      slug: 'msc-international-business',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,000/year',
      description:
        "A global business postgraduate programme leveraging London's position as a world business hub with industry networking opportunities.",
    },
  ],
  scholarships: [
    {
      name: "UEL International Excellence Award",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Awarded to international students with strong academic profiles entering undergraduate study at UEL.",
    },
    {
      name: "UEL Vice-Chancellor Scholarship",
      value: 'GBP 5,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A prestigious merit-based scholarship for exceptional international students making outstanding contributions.",
    },
  ],
};

export const UNIVERSITY_OF_HERTFORDSHIRE = {
  name: "University of Hertfordshire",
  slug: "university-of-hertfordshire",
  city: "Hatfield",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 26000,
  internationalStudents: 0.23,
  acceptanceRate: 71,
  shortDescription:
    "A business-focused university near London known for aerospace engineering, computing, nursing, and business, with one of the UK's best student campuses.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A CIPD and CIM-recognised business degree with optional sandwich year and enterprise project modules.",
    },
    {
      name: "BSc (Hons) Computer Science",
      slug: 'bsc-hons-computer-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BCS-accredited computer science degree covering software engineering, AI, cybersecurity, and data science.",
    },
    {
      name: "BEng (Hons) Aerospace Engineering",
      slug: 'beng-hons-aerospace-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A top-ranked aerospace degree with access to wind tunnels, flight simulators, and industry partnerships with Airbus and BAE Systems.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-registered nursing programme with clinical placements in Hertfordshire and Greater London NHS trusts.",
    },
    {
      name: "MSc Artificial Intelligence",
      slug: 'msc-artificial-intelligence',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,500/year',
      description:
        "An advanced postgraduate programme in AI covering deep learning, natural language processing, and intelligent systems.",
    },
    {
      name: "Foundation Year in Science and Technology",
      slug: 'foundation-year-in-science-and-technology',
      field: 'Foundation & Pathway',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A gateway foundation year preparing students for engineering, computing, and science undergraduate programmes at Hertfordshire.",
    },
  ],
  scholarships: [
    {
      name: "Hertfordshire International Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based award for international students entering undergraduate or postgraduate study at Hertfordshire.",
    },
    {
      name: "Hertfordshire Engineering Excellence Award",
      value: 'GBP 3,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial scholarship recognising international students with strong STEM backgrounds entering engineering programmes.",
    },
  ],
};

export const UNIVERSITY_OF_LAW = {
  name: "University of Law",
  slug: "university-of-law",
  city: "London",
  foundedYear: 1962,
  ranking: null,
  totalStudents: 14000,
  internationalStudents: 0.29,
  acceptanceRate: 68,
  shortDescription:
    "The UK's largest specialist law school, offering LLB, LLM, SQE, and GDL programmes with outstanding bar and solicitor pass rates.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 19500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A qualifying law degree with strong SQE and Bar preparation, covering all core legal subjects and practical skills.",
    },
    {
      name: "LLB (Hons) Law with Business",
      slug: 'llb-hons-law-with-business',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A dual-focus law degree combining legal practice modules with commercial law and business management.",
    },
    {
      name: "Graduate Diploma in Law (GDL)",
      slug: 'graduate-diploma-in-law-gdl',
      field: 'Law',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 12,500/year',
      description:
        "The accelerated conversion programme enabling non-law graduates to qualify for SQE or Bar Professional Training Course.",
    },
    {
      name: "LLM International Business Law",
      slug: 'llm-international-business-law',
      field: 'Law',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 19,500/year',
      description:
        "A prestigious postgraduate law programme covering cross-border transactions, international trade law, and dispute resolution.",
    },
    {
      name: "LLM Legal Practice (SQE)",
      slug: 'llm-legal-practice-sqe',
      field: 'Law',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 18,000/year',
      description:
        "A specialist SQE preparation programme combining LLM-level study with comprehensive Solicitors Qualifying Examination readiness.",
    },
  ],
  scholarships: [
    {
      name: "ULaw International Excellence Scholarship",
      value: 'GBP 5,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship recognising exceptional international students entering undergraduate or postgraduate law programmes.",
    },
    {
      name: "ULaw GDL International Bursary",
      value: 'GBP 3,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial fee reduction supporting international students undertaking the Graduate Diploma in Law at ULaw.",
    },
  ],
};

export const MIDDLESEX_UNIVERSITY = {
  name: "Middlesex University",
  slug: "middlesex-university",
  city: "London",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 20000,
  internationalStudents: 0.35,
  acceptanceRate: 74,
  shortDescription:
    "A diverse and globally connected London university in Hendon, renowned for business, law, health sciences, and art and design with campuses in four continents.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 17000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A globally recognised business degree with international exchange opportunities and strong industry mentoring partnerships.",
    },
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A qualifying law degree covering criminal, civil, European, and international law with a strong clinical legal education component.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-accredited nursing degree with placements across NHS trusts and private healthcare providers in London.",
    },
    {
      name: "BA (Hons) Graphic Design",
      slug: 'ba-hons-graphic-design',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A creative design degree with studio practice covering branding, digital media, motion graphics, and UX design.",
    },
    {
      name: "MSc International Business",
      slug: 'msc-international-business',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 17,000/year',
      description:
        "A postgraduate programme developing global business acumen, international strategy, and cross-cultural management expertise.",
    },
    {
      name: "MSc Cyber Security",
      slug: 'msc-cyber-security',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 17,000/year',
      description:
        "An advanced postgraduate programme in cybersecurity covering cryptography, network security, and digital forensics.",
    },
  ],
  scholarships: [
    {
      name: "Middlesex University International Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Awarded to high-achieving international students applying to undergraduate programmes at Middlesex.",
    },
    {
      name: "Middlesex Postgraduate Excellence Award",
      value: 'GBP 2,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial fee reduction for international students entering postgraduate programmes at Middlesex University.",
    },
  ],
};

export const UNIVERSITY_OF_BRADFORD = {
  name: "University of Bradford",
  slug: "university-of-bradford",
  city: "Bradford",
  foundedYear: 1966,
  ranking: null,
  totalStudents: 13000,
  internationalStudents: 0.27,
  acceptanceRate: 70,
  shortDescription:
    "A values-driven Yorkshire university with exceptional pharmacy, engineering, and social sciences programmes and a strong research culture.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 18000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "MPharm Pharmacy",
      slug: 'mpharm-pharmacy',
      field: 'Health Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A GPhC-accredited pharmacy degree with laboratory training, patient counselling, and placement in community and hospital settings.",
    },
    {
      name: "BA (Hons) Business and Management",
      slug: 'ba-hons-business-and-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professionally accredited business degree with an entrepreneurship focus and optional placement year.",
    },
    {
      name: "BEng (Hons) Electrical and Electronic Engineering",
      slug: 'beng-hons-electrical-and-electronic-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An IET-accredited engineering degree covering power systems, embedded electronics, and renewable energy technologies.",
    },
    {
      name: "BSc (Hons) Social Work",
      slug: 'bsc-hons-social-work',
      field: 'Social Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A Social Work England-approved degree with extensive practice placements and a strong commitment to social justice.",
    },
    {
      name: "MSc Data Science",
      slug: 'msc-data-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 18,000/year',
      description:
        "A postgraduate programme in data science covering machine learning, statistical modelling, and big data analytics.",
    },
  ],
  scholarships: [
    {
      name: "Bradford International Scholarship",
      value: 'GBP 3,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for international undergraduate students with strong academic results.",
    },
    {
      name: "Bradford Pharmacy Excellence Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "Recognises international students with outstanding science qualifications entering the MPharm degree.",
    },
  ],
};

export const BIRMINGHAM_CITY_UNIVERSITY = {
  name: "Birmingham City University",
  slug: "birmingham-city-university",
  city: "Birmingham",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 24000,
  internationalStudents: 0.21,
  acceptanceRate: 75,
  shortDescription:
    "A vibrant post-92 university in the UK's second largest city offering degrees in business, health, art and design, computing, and law.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professionally accredited business degree with pathways in marketing, HRM, finance, and international business.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved nursing degree with placements across major Birmingham NHS trusts and community settings.",
    },
    {
      name: "BA (Hons) Fashion Design",
      slug: 'ba-hons-fashion-design',
      field: 'Fashion & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A creative fashion programme combining design skills with garment construction, styling, and fashion business knowledge.",
    },
    {
      name: "BSc (Hons) Computing",
      slug: 'bsc-hons-computing',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BCS-accredited computing degree with specialisms in software development, data analytics, and cybersecurity.",
    },
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A qualifying law degree with moot court, law clinic participation, and strong links to Birmingham's legal community.",
    },
    {
      name: "MSc International Business",
      slug: 'msc-international-business',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,500/year',
      description:
        "A globally focused postgraduate programme developing international business leadership and cross-cultural management skills.",
    },
  ],
  scholarships: [
    {
      name: "BCU International Excellence Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for high-achieving international students entering undergraduate programmes at BCU.",
    },
    {
      name: "BCU Postgraduate International Award",
      value: 'GBP 2,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial tuition fee reduction for international students commencing postgraduate study at BCU.",
    },
  ],
};

export const UNIVERSITY_OF_WOLVERHAMPTON = {
  name: "University of Wolverhampton",
  slug: "university-of-wolverhampton",
  city: "Wolverhampton",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 20000,
  internationalStudents: 0.17,
  acceptanceRate: 78,
  shortDescription:
    "A community-focused West Midlands university offering practical degrees in business, engineering, computing, and health sciences.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 15500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A practically oriented business degree with placements, enterprise projects, and industry guest programmes.",
    },
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An IMechE-accredited mechanical engineering programme with strong links to West Midlands manufacturing industries.",
    },
    {
      name: "BSc (Hons) Computer Science",
      slug: 'bsc-hons-computer-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A computing degree covering software engineering, networks, database management, and artificial intelligence.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved nursing degree with clinical placements across NHS trusts in the West Midlands region.",
    },
    {
      name: "MSc Project Management",
      slug: 'msc-project-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 15,500/year',
      description:
        "An APM-aligned postgraduate programme covering project planning, risk management, leadership, and stakeholder engagement.",
    },
  ],
  scholarships: [
    {
      name: "Wolverhampton International Scholarship",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based award for international undergraduate students demonstrating strong academic achievement.",
    },
    {
      name: "Wolverhampton Postgraduate Bursary",
      value: 'GBP 1,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial tuition fee support for international students entering postgraduate programmes at Wolverhampton.",
    },
  ],
};

export const UNIVERSITY_OF_NORTHAMPTON = {
  name: "University of Northampton",
  slug: "university-of-northampton",
  city: "Northampton",
  foundedYear: 2005,
  ranking: null,
  totalStudents: 13000,
  internationalStudents: 0.23,
  acceptanceRate: 79,
  shortDescription:
    "A modern campus university in the East Midlands committed to changemaking education across business, education, health, and social sciences.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 15000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A changemaking business degree integrating sustainability, entrepreneurship, and responsible management practices.",
    },
    {
      name: "BA (Hons) Education Studies",
      slug: 'ba-hons-education-studies',
      field: 'Education',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An education degree exploring child development, inclusive education, curriculum design, and teaching methodologies.",
    },
    {
      name: "BSc (Hons) Health and Social Care",
      slug: 'bsc-hons-health-and-social-care',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professionally relevant degree examining health policy, service delivery, and social care practice.",
    },
    {
      name: "BSc (Hons) Psychology",
      slug: 'bsc-hons-psychology',
      field: 'Psychology',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BPS-accredited psychology degree covering cognitive, social, developmental, and abnormal psychology.",
    },
    {
      name: "MSc International Business Management",
      slug: 'msc-international-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 15,000/year',
      description:
        "A postgraduate business programme with a focus on ethical leadership, global strategy, and innovation.",
    },
  ],
  scholarships: [
    {
      name: "Northampton International Scholarship",
      value: 'GBP 2,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship supporting high-achieving international undergraduate students at Northampton.",
    },
    {
      name: "Northampton Changemaker Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "Recognises international students demonstrating a commitment to positive social impact and community development.",
    },
  ],
};

export const OXFORD_BROOKES_UNIVERSITY = {
  name: "Oxford Brookes University",
  slug: "oxford-brookes-university",
  city: "Oxford",
  foundedYear: 1992,
  ranking: 374,
  totalStudents: 18000,
  internationalStudents: 0.25,
  acceptanceRate: 66,
  shortDescription:
    "A globally ranked post-92 university in the city of Oxford, known for hospitality, business, architecture, and health sciences.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 17500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) International Hospitality Management",
      slug: 'ba-hons-international-hospitality-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A world-leading hospitality management degree with industry placements in premium hotel groups across Europe.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professionally accredited business degree with optional sandwich year and specialisms in marketing and finance.",
    },
    {
      name: "BA (Hons) Architecture",
      slug: 'ba-hons-architecture',
      field: 'Architecture',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An ARB/RIBA Part 1 accredited architecture degree with studio-based design projects and technology modules.",
    },
    {
      name: "BSc (Hons) Midwifery",
      slug: 'bsc-hons-midwifery',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved midwifery degree with clinical placements in Oxfordshire NHS trusts and maternity units.",
    },
    {
      name: "MSc International Hotel Management",
      slug: 'msc-international-hotel-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 17,500/year',
      description:
        "A globally recognised postgraduate programme in hotel management with live industry projects and international study trips.",
    },
    {
      name: "MSc Real Estate",
      slug: 'msc-real-estate',
      field: 'Built Environment',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 17,500/year',
      description:
        "An RICS-accredited postgraduate programme covering property valuation, investment, development, and planning.",
    },
  ],
  scholarships: [
    {
      name: "Oxford Brookes International Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for international students with strong academic records entering Brookes undergraduate programmes.",
    },
    {
      name: "Brookes Postgraduate Award",
      value: 'GBP 2,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial fee reduction for international students entering postgraduate programmes at Oxford Brookes.",
    },
  ],
};

export const UNIVERSITY_ACADEMY_92 = {
  name: "University Academy 92",
  slug: "university-academy-92",
  city: "Trafford",
  foundedYear: 2019,
  ranking: null,
  totalStudents: 2000,
  internationalStudents: 0.15,
  acceptanceRate: 82,
  shortDescription:
    "A bold new university co-founded by Class of 92 Manchester United legends, offering business, sport, digital, and data degrees with a performance mindset.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 14500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A performance-driven business degree combining academic rigour with entrepreneurship and leadership development.",
    },
    {
      name: "BA (Hons) Sport Business Management",
      slug: 'ba-hons-sport-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A unique sport business degree with access to industry professionals and Manchester's elite sport ecosystem.",
    },
    {
      name: "BSc (Hons) Digital Marketing",
      slug: 'bsc-hons-digital-marketing',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A contemporary marketing degree focused on social media strategy, content creation, SEO, and data-driven campaigns.",
    },
    {
      name: "BSc (Hons) Data Science and Analytics",
      slug: 'bsc-hons-data-science-and-analytics',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A technically rigorous data science degree with applications in sport analytics, business intelligence, and machine learning.",
    },
    {
      name: "MSc Business Analytics",
      slug: 'msc-business-analytics',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 14,500/year',
      description:
        "A postgraduate programme in business analytics combining data visualisation, predictive modelling, and strategic decision-making.",
    },
  ],
  scholarships: [
    {
      name: "UA92 Performance Scholarship",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Recognises international students who demonstrate an elite performance mindset in academics or sport.",
    },
  ],
};

export const UNIVERSITY_OF_ESSEX = {
  name: "University of Essex",
  slug: "university-of-essex",
  city: "Colchester",
  foundedYear: 1965,
  ranking: 472,
  totalStudents: 16000,
  internationalStudents: 0.41,
  acceptanceRate: 62,
  shortDescription:
    "A QS-ranked research university famous for politics, economics, computer science, and law with a vibrant international campus community.",
  tuitionFeeMin: 20700,
  tuitionFeeMax: 21000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Politics",
      slug: 'ba-hons-politics',
      field: 'Social Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 20,700/year',
      description:
        "A world-renowned politics degree covering political theory, comparative politics, international relations, and political behaviour.",
    },
    {
      name: "BSc (Hons) Economics",
      slug: 'bsc-hons-economics',
      field: 'Finance & Economics',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 20,700/year',
      description:
        "A rigorous economics degree with strong quantitative skills training and optional specialisms in finance and development economics.",
    },
    {
      name: "BSc (Hons) Computer Science",
      slug: 'bsc-hons-computer-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 20,700/year',
      description:
        "A BCS-accredited computer science programme with specialisms in AI, machine learning, cybersecurity, and software engineering.",
    },
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 20,700/year',
      description:
        "A respected qualifying law degree with strengths in human rights law, international law, and clinical legal education.",
    },
    {
      name: "MSc International Economics",
      slug: 'msc-international-economics',
      field: 'Finance & Economics',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 21,000/year',
      description:
        "A postgraduate programme in international economics with rigorous econometric training and policy analysis.",
    },
    {
      name: "MSc Data Science",
      slug: 'msc-data-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 21,000/year',
      description:
        "An advanced data science programme covering statistical learning, big data processing, and machine learning applications.",
    },
  ],
  scholarships: [
    {
      name: "Essex Excellence Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "Awarded to high-achieving international undergraduate students entering Essex on the basis of academic merit.",
    },
    {
      name: "Essex Postgraduate Scholarship",
      value: 'GBP 3,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial scholarship supporting international students progressing to postgraduate study at the University of Essex.",
    },
  ],
};

export const NORTHUMBRIA_UNIVERSITY = {
  name: "Northumbria University Newcastle",
  slug: "northumbria-university-newcastle",
  city: "Newcastle",
  foundedYear: 1992,
  ranking: 550,
  totalStudents: 32000,
  internationalStudents: 0.28,
  acceptanceRate: 69,
  shortDescription:
    "A large and globally connected Newcastle university ranked in the QS top 600, known for design, sport science, business, and law.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 18000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Graphic Design",
      slug: 'ba-hons-graphic-design',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A top-ranked design programme with studio practice covering branding, illustration, motion design, and digital media.",
    },
    {
      name: "BSc (Hons) Sport and Exercise Science",
      slug: 'bsc-hons-sport-and-exercise-science',
      field: 'Sport & Exercise Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A leading sport science degree with elite facilities and partnerships with professional clubs in the North East.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An AACSB-accredited business degree with optional placement year and pathways in entrepreneurship and marketing.",
    },
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A qualifying law degree with law clinic, moot court, and strong links to North East legal practitioners.",
    },
    {
      name: "MSc International Business Management",
      slug: 'msc-international-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 18,000/year',
      description:
        "A globally accredited postgraduate programme developing leadership, strategy, and international business acumen.",
    },
    {
      name: "MSc Data Science",
      slug: 'msc-data-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 18,000/year',
      description:
        "A postgraduate data science programme covering machine learning, data engineering, and applied analytics.",
    },
  ],
  scholarships: [
    {
      name: "Northumbria International Scholarship",
      value: 'GBP 4,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for high-achieving international students entering undergraduate programmes at Northumbria.",
    },
    {
      name: "Northumbria Postgraduate Excellence Award",
      value: 'GBP 3,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial scholarship for international students progressing to postgraduate study at Northumbria.",
    },
  ],
};

export const YORK_ST_JOHN_UNIVERSITY = {
  name: "York St John University",
  slug: "york-st-john-university",
  city: "York",
  foundedYear: 1841,
  ranking: null,
  totalStudents: 8000,
  internationalStudents: 0.19,
  acceptanceRate: 81,
  shortDescription:
    "A collegiate and community-focused university in historic York offering degrees in business, health, sport, creative arts, and education.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 14500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An enterprising business degree with guest lectures, business consultancy modules, and optional industry placement.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-registered nursing degree with placements across Yorkshire NHS trusts and community care environments.",
    },
    {
      name: "BSc (Hons) Sport Coaching and Development",
      slug: 'bsc-hons-sport-coaching-and-development',
      field: 'Sport & Exercise Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A sport coaching degree combining sports science, athlete development, and community coaching practice.",
    },
    {
      name: "BA (Hons) Creative Writing",
      slug: 'ba-hons-creative-writing',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A celebrated creative arts degree developing skills in fiction, poetry, screenwriting, and literary criticism.",
    },
    {
      name: "BA (Hons) Education Studies",
      slug: 'ba-hons-education-studies',
      field: 'Education',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An interdisciplinary education degree exploring policy, inclusion, pedagogy, and international education systems.",
    },
    {
      name: "MSc Health and Wellbeing",
      slug: 'msc-health-and-wellbeing',
      field: 'Law',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 14,500/year',
      description:
        "A postgraduate programme examining public health, mental wellbeing, and evidence-based health promotion strategies.",
    },
  ],
  scholarships: [
    {
      name: "York St John International Award",
      value: 'GBP 2,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for international students entering undergraduate programmes at York St John.",
    },
  ],
};

export const TEESSIDE_UNIVERSITY = {
  name: "Teesside University",
  slug: "teesside-university",
  city: "Middlesbrough",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 17000,
  internationalStudents: 0.21,
  acceptanceRate: 75,
  shortDescription:
    "An enterprising North East university known for industry-connected computing, engineering, nursing, business, and creative arts degrees.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 16000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BSc (Hons) Computer Science",
      slug: 'bsc-hons-computer-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BCS-accredited computing degree with specialisms in AI, software engineering, games development, and cybersecurity.",
    },
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An IMechE-accredited engineering degree with strong links to the Teesside process and offshore energy industries.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved nursing degree with extensive clinical experience in NHS Tees hospitals and community settings.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An applied business degree with industry challenges, live consultancy projects, and optional placement year.",
    },
    {
      name: "BA (Hons) Animation and Visual Effects",
      slug: 'ba-hons-animation-and-visual-effects',
      field: 'Art & Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A top-ranked creative arts degree producing graduates for film, games, and digital media industries worldwide.",
    },
    {
      name: "MSc Cybersecurity",
      slug: 'msc-cybersecurity',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 16,000/year',
      description:
        "A technically advanced postgraduate programme covering ethical hacking, digital forensics, and security operations.",
    },
  ],
  scholarships: [
    {
      name: "Teesside University International Scholarship",
      value: 'GBP 3,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based award for international undergraduate students with strong academic qualifications.",
    },
    {
      name: "Teesside Postgraduate International Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial scholarship for international students commencing postgraduate study at Teesside University.",
    },
  ],
};

export const UNIVERSITY_OF_HULL = {
  name: "University of Hull",
  slug: "university-of-hull",
  city: "Hull",
  foundedYear: 1927,
  ranking: null,
  totalStudents: 14000,
  internationalStudents: 0.21,
  acceptanceRate: 73,
  shortDescription:
    "A civic and globally connected Yorkshire university offering strong degrees in business, law, engineering, sciences, and politics.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 17500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A forward-looking business degree with professional accreditations and strong links to the Humber business community.",
    },
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A qualifying law degree with a strong human rights tradition and law clinic experience for practical skills development.",
    },
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An IMechE-accredited engineering programme with research-informed teaching and offshore energy sector links.",
    },
    {
      name: "BSc (Hons) Biochemistry",
      slug: 'bsc-hons-biochemistry',
      field: 'Life Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A research-led biochemistry degree with modern laboratory facilities and links to the biomedical research community.",
    },
    {
      name: "BA (Hons) Politics and International Relations",
      slug: 'ba-hons-politics-and-international-relations',
      field: 'Social Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A highly regarded politics degree building on Hull's heritage in political science and international affairs.",
    },
    {
      name: "MSc International Business",
      slug: 'msc-international-business',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 17,500/year',
      description:
        "A postgraduate business programme covering global strategy, international trade, and cross-cultural leadership.",
    },
  ],
  scholarships: [
    {
      name: "Hull International Excellence Scholarship",
      value: 'GBP 3,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based award recognising high-achieving international students entering undergraduate study at Hull.",
    },
    {
      name: "Hull Postgraduate International Bursary",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial tuition reduction for international students progressing to postgraduate programmes at the University of Hull.",
    },
  ],
};

export const UNIVERSITY_OF_SUNDERLAND = {
  name: "University of Sunderland",
  slug: "university-of-sunderland",
  city: "Sunderland",
  foundedYear: 1992,
  ranking: null,
  totalStudents: 17000,
  internationalStudents: 0.26,
  acceptanceRate: 76,
  shortDescription:
    "A career-focused North East university offering professionally grounded degrees in business, engineering, health sciences, and computing.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 15500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An industry-aligned business degree with professional placements, enterprise modules, and guest practitioner sessions.",
    },
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A practically grounded engineering degree with state-of-the-art workshop facilities and links to North East manufacturers.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved nursing programme with clinical placements at Sunderland Royal Hospital and community health partners.",
    },
    {
      name: "BSc (Hons) Computer Science",
      slug: 'bsc-hons-computer-science',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BCS-accredited computing degree with pathways in software development, cybersecurity, and data analytics.",
    },
    {
      name: "MSc International Business Management",
      slug: 'msc-international-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 15,500/year',
      description:
        "A postgraduate business programme preparing graduates for management careers in international organisations.",
    },
  ],
  scholarships: [
    {
      name: "Sunderland International Scholarship",
      value: 'GBP 3,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship supporting international undergraduate students at the University of Sunderland.",
    },
    {
      name: "Sunderland Postgraduate Award",
      value: 'GBP 2,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial fee reduction for international students entering postgraduate programmes at Sunderland.",
    },
  ],
};

export const UNIVERSITY_OF_READING = {
  name: "University of Reading",
  slug: "university-of-reading",
  city: "Reading",
  foundedYear: 1892,
  ranking: 194,
  totalStudents: 20000,
  internationalStudents: 0.35,
  acceptanceRate: 60,
  shortDescription:
    "A QS top-200 research university world-famous for meteorology, business, law, and pharmacy with a beautiful green campus near London.",
  tuitionFeeMin: 22000,
  tuitionFeeMax: 26500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BSc (Hons) Meteorology and Climate",
      slug: 'bsc-hons-meteorology-and-climate',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 24,000/year',
      description:
        "A world-leading meteorology and climate programme delivered at the internationally renowned Department of Meteorology.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 22,000/year',
      description:
        "A professionally accredited AACSB and EQUIS-recognised Henley Business School management degree with global business focus.",
    },
    {
      name: "LLB (Hons) Law",
      slug: 'llb-hons-law',
      field: 'Law',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 22,000/year',
      description:
        "A qualifying law degree with strengths in commercial law, human rights, and international law, supported by an active law clinic.",
    },
    {
      name: "MPharm Pharmacy",
      slug: 'mpharm-pharmacy',
      field: 'Health Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'GBP 24,000/year',
      description:
        "A GPhC-accredited pharmacy degree with clinical placements, pharmaceutical science laboratories, and patient counselling training.",
    },
    {
      name: "MSc International Business and Management",
      slug: 'msc-international-business-and-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 26,500/year',
      description:
        "A Henley Business School postgraduate programme combining global strategy, international finance, and cross-cultural management.",
    },
    {
      name: "MSc Climate Change and Atmospheric Science",
      slug: 'msc-climate-change-and-atmospheric-science',
      field: 'Business & Management',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 25,000/year',
      description:
        "A cutting-edge postgraduate programme addressing climate systems, climate modelling, and atmospheric dynamics.",
    },
  ],
  scholarships: [
    {
      name: "Reading Excellence Award",
      value: 'GBP 5,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship awarded to exceptional international undergraduate applicants at the University of Reading.",
    },
    {
      name: "Henley MBA International Scholarship",
      value: 'GBP 8,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A prestigious partial scholarship for high-calibre international students entering Henley Business School postgraduate programmes.",
    },
  ],
};

export const COVENTRY_UNIVERSITY = {
  name: "Coventry University",
  slug: "coventry-university",
  city: "Coventry",
  foundedYear: 1992,
  ranking: 526,
  totalStudents: 30000,
  internationalStudents: 0.4,
  acceptanceRate: 67,
  shortDescription:
    "A QS-ranked global university known for engineering, business, health, and design with campuses in the UK, Europe, Africa, and Asia.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 19500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BEng (Hons) Mechanical Engineering",
      slug: 'beng-hons-mechanical-engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 19,500/year',
      description:
        "An IMechE-accredited mechanical engineering degree with industry placements, Formula Student racing projects, and modern laboratories.",
    },
    {
      name: "BA (Hons) International Business",
      slug: 'ba-hons-international-business',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 19,500/year',
      description:
        "A globally focused business degree with study abroad opportunities and pathways in management, marketing, and finance.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-registered nursing degree with clinical placements at Coventry and Warwickshire NHS hospitals and community providers.",
    },
    {
      name: "BA (Hons) Industrial Design",
      slug: 'ba-hons-industrial-design',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 19,500/year',
      description:
        "A highly ranked industrial design programme with professional studio experience and links to automotive and product design industries.",
    },
    {
      name: "MSc Engineering Management",
      slug: 'msc-engineering-management',
      field: 'Engineering',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 19,500/year',
      description:
        "A postgraduate programme combining engineering expertise with project management, lean manufacturing, and operations strategy.",
    },
    {
      name: "MSc Data Science and Computational Intelligence",
      slug: 'msc-data-science-and-computational-intelligence',
      field: 'Computer Science & IT',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 19,500/year',
      description:
        "An advanced postgraduate programme in data science and AI covering machine learning, data mining, and intelligent systems.",
    },
  ],
  scholarships: [
    {
      name: "Coventry University International Scholarship",
      value: 'GBP 5,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for high-achieving international students entering undergraduate programmes at Coventry.",
    },
    {
      name: "Coventry Postgraduate Excellence Award",
      value: 'GBP 3,000',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial fee reduction for exceptional international students entering postgraduate programmes at Coventry.",
    },
  ],
};

export const CANTERBURY_CHRIST_CHURCH_UNIVERSITY = {
  name: "Canterbury Christ Church University",
  slug: "canterbury-christ-church-university",
  city: "Canterbury",
  foundedYear: 1962,
  ranking: null,
  totalStudents: 18000,
  internationalStudents: 0.14,
  acceptanceRate: 80,
  shortDescription:
    "A values-led university in the historic cathedral city of Canterbury specialising in education, health, social work, and business.",
  tuitionFeeMin: 9250,
  tuitionFeeMax: 15000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  admissionSteps: [],
  programs: [
    {
      name: "BA (Hons) Education Studies",
      slug: 'ba-hons-education-studies',
      field: 'Education',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An interdisciplinary education degree exploring childhood, pedagogy, policy, and global educational systems.",
    },
    {
      name: "BSc (Hons) Nursing (Adult)",
      slug: 'bsc-hons-nursing-adult',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "An NMC-approved nursing degree with clinical placements across Kent and East Sussex NHS trusts.",
    },
    {
      name: "BA (Hons) Social Work",
      slug: 'ba-hons-social-work',
      field: 'Social Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A Social Work England-approved degree with extensive practice placements and a commitment to social justice.",
    },
    {
      name: "BA (Hons) Business Management",
      slug: 'ba-hons-business-management',
      field: 'Business & Management',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A professionally relevant business degree integrating enterprise, ethics, and strategic management practice.",
    },
    {
      name: "BSc (Hons) Psychology",
      slug: 'bsc-hons-psychology',
      field: 'Psychology',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 3,
      tuitionFeePerYear: 'GBP 9,250/year',
      description:
        "A BPS-accredited psychology degree covering cognitive, developmental, clinical, and social psychology with research training.",
    },
    {
      name: "MSc Education",
      slug: 'msc-education',
      field: 'Education',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'GBP 15,000/year',
      description:
        "A postgraduate education programme for practitioners and graduates seeking to advance educational theory and professional practice.",
    },
  ],
  scholarships: [
    {
      name: "Christ Church International Scholarship",
      value: 'GBP 2,500',
      type: ScholarshipType.MERIT_BASED,
      description:
        "A merit-based scholarship for international undergraduate students at Canterbury Christ Church University.",
    },
    {
      name: "Christ Church Postgraduate Bursary",
      value: 'GBP 1,500',
      type: ScholarshipType.PARTIAL,
      description:
        "A partial fee support for international students commencing postgraduate study at Canterbury Christ Church.",
    },
  ],
};

export const BPP_UNIVERSITY = {
  name: 'BPP University',
  slug: 'bpp-university',
  city: 'London, England',
  foundedYear: 1976,
  ranking: null,
  totalStudents: 15000,
  internationalStudents: 0.25,
  acceptanceRate: 75,
  shortDescription: "BPP University is the UK's leading specialist professional education provider with 13 centres across England, offering highly focused law, business, accountancy and nursing programmes designed in partnership with employers and professional bodies. BPP was the first private institution granted degree-awarding powers in the UK, reflecting its rigorous academic standards and outstanding professional pass rates. International students benefit from flexible start dates, multiple campuses and BPP's direct pathways into regulated UK professions.",
  tuitionFeeMin: 11000,
  tuitionFeeMax: 22150,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January, April',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'LLB (Hons) Law', slug: 'llb-law-bpp', degreeLevel: DegreeType.BACHELOR, field: 'Law', durationYears: 3, tuitionFeePerYear: 'GBP 17,550/year', description: 'Qualifying law degree with integrated SQE preparation, delivered at multiple UK city campuses.' },
    { name: 'LLM Master of Laws', slug: 'llm-bpp', degreeLevel: DegreeType.MASTER, field: 'Law', durationYears: 1, tuitionFeePerYear: 'GBP 18,100/year', description: "Advanced law master's with specialist pathways in international commercial law and employment law." },
    { name: 'SQE Preparation Programme', slug: 'sqe-preparation-bpp', degreeLevel: DegreeType.CERTIFICATE, field: 'Law', durationYears: 1, tuitionFeePerYear: 'GBP 11,000/year', description: "Intensive preparation for both stages of the Solicitors Qualifying Examination with BPP's outstanding pass rates." },
    { name: 'MBA', slug: 'mba-bpp', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 18,100/year', description: 'Practice-led MBA aligned to CMI standards with live business projects and a strong focus on professional impact.' },
    { name: 'BSc (Hons) Nursing (Adult)', slug: 'bsc-nursing-adult-bpp', degreeLevel: DegreeType.BACHELOR, field: 'Nursing & Healthcare', durationYears: 3, tuitionFeePerYear: 'GBP 16,700/year', description: 'NMC-approved nursing degree with clinical placements in NHS trusts across BPP English campus locations.' },
    { name: 'MSc Accounting and Finance', slug: 'msc-accounting-finance-bpp', degreeLevel: DegreeType.MASTER, field: 'Finance & Economics', durationYears: 1, tuitionFeePerYear: 'GBP 18,100/year', description: 'Aligned to ACCA and ICAEW exemptions, fast-tracking graduates into professional accountancy careers.' },
  ],
  scholarships: [
    { name: 'BPP International Bursary', type: ScholarshipType.PARTIAL, value: 'GBP 1,000–2,500 tuition reduction', description: 'Available to self-funded international students across postgraduate law and business programmes.' },
    { name: 'Academic Excellence Scholarship', type: ScholarshipType.MERIT_BASED, value: 'GBP 3,000 tuition reduction', description: 'Awarded to outstanding international applicants demonstrating exceptional prior academic performance.' },
  ],
  admissionSteps: [],
}

export const SHEFFIELD_HALLAM_UNIVERSITY = {
  name: 'Sheffield Hallam University',
  slug: 'sheffield-hallam-university',
  city: 'Sheffield, England',
  foundedYear: 1992,
  ranking: null,
  totalStudents: 31000,
  internationalStudents: 0.15,
  acceptanceRate: 73,
  shortDescription: "Sheffield Hallam University is one of the UK's largest universities with nationally recognised programmes in business, engineering, health, art and design, and computing. Situated alongside the University of Sheffield in one of England's most affordable major student cities, Sheffield Hallam is known for its industry-integrated teaching model and professional placement rates. International students from over 130 countries experience a welcoming, multicultural city with low living costs.",
  tuitionFeeMin: 15500,
  tuitionFeeMax: 21375,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'BA Business Management', slug: 'ba-business-management-shu', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'GBP 16,500/year', description: "Sheffield Business School's flagship degree with professional accreditation and optional sandwich placement." },
    { name: 'BEng Mechanical Engineering', slug: 'beng-mechanical-engineering-shu', degreeLevel: DegreeType.BACHELOR, field: 'Engineering', durationYears: 3, tuitionFeePerYear: 'GBP 16,500/year', description: "IMechE-accredited engineering degree with excellent links to South Yorkshire's advanced manufacturing sector." },
    { name: 'BSc Nursing (Adult)', slug: 'bsc-nursing-adult-shu', degreeLevel: DegreeType.BACHELOR, field: 'Nursing & Healthcare', durationYears: 3, tuitionFeePerYear: 'GBP 15,500/year', description: 'NMC-approved nursing degree delivered with NHS Sheffield Teaching Hospitals and surrounding trusts.' },
    { name: 'BA (Hons) Interior Architecture', slug: 'ba-interior-architecture-shu', degreeLevel: DegreeType.BACHELOR, field: 'Art & Design', durationYears: 3, tuitionFeePerYear: 'GBP 17,000/year', description: 'Studio-based design programme from Sheffield Institute of Arts developing spatial and environmental design skills.' },
    { name: 'BSc Computer Science', slug: 'bsc-computer-science-shu', degreeLevel: DegreeType.BACHELOR, field: 'Computer Science & IT', durationYears: 3, tuitionFeePerYear: 'GBP 16,500/year', description: 'Covers software engineering, AI and cybersecurity with strong placement and project-based learning.' },
    { name: 'MSc Data Analytics', slug: 'msc-data-analytics-shu', degreeLevel: DegreeType.MASTER, field: 'Data & Analytics', durationYears: 1, tuitionFeePerYear: 'GBP 18,500/year', description: 'Develops Python, R and machine learning skills for data-driven decision making across business sectors.' },
    { name: 'MBA', slug: 'mba-shu', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 21,375/year', description: "Sheffield Business School MBA with leadership, sustainability and enterprise innovation at its core." },
  ],
  scholarships: [
    { name: 'Sheffield Hallam International Scholarship', type: ScholarshipType.MERIT_BASED, value: 'GBP 2,000–4,000 tuition reduction', description: 'Merit-based scholarship available to international undergraduate and postgraduate applicants at entry.' },
  ],
  admissionSteps: [],
}

export const LONDON_SOUTH_BANK_UNIVERSITY = {
  name: 'London South Bank University',
  slug: 'london-south-bank-university',
  city: 'London, England',
  foundedYear: 1892,
  ranking: null,
  totalStudents: 17000,
  internationalStudents: 0.18,
  acceptanceRate: 62,
  shortDescription: "London South Bank University (LSBU) is a post-92 institution in Southwark, central London, with a long tradition of applied education in engineering, health, business and creative arts. Students benefit from direct access to London's world-class industries, NHS hospitals, and one of the most diverse cities in the world. LSBU has one of the highest proportions of students from disadvantaged backgrounds in London, reflecting its deep commitment to access and social mobility.",
  tuitionFeeMin: 15000,
  tuitionFeeMax: 18500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'BEng Civil Engineering', slug: 'beng-civil-engineering-lsbu', degreeLevel: DegreeType.BACHELOR, field: 'Engineering', durationYears: 3, tuitionFeePerYear: 'GBP 16,500/year', description: 'ICE-accredited civil engineering degree with major London infrastructure companies as industry partners.' },
    { name: 'BSc Adult Nursing', slug: 'bsc-adult-nursing-lsbu', degreeLevel: DegreeType.BACHELOR, field: 'Nursing & Healthcare', durationYears: 3, tuitionFeePerYear: 'GBP 15,000/year', description: "NMC-approved nursing degree with placements across Guy's, King's and St Thomas' NHS Foundation Trust." },
    { name: 'BA Business Management', slug: 'ba-business-management-lsbu', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'GBP 16,000/year', description: 'A London-facing business degree with CIM and CMI accreditation and strong employer engagement.' },
    { name: 'BA (Hons) Architecture', slug: 'ba-architecture-lsbu', degreeLevel: DegreeType.BACHELOR, field: 'Architecture', durationYears: 3, tuitionFeePerYear: 'GBP 16,500/year', description: 'RIBA Part 1 programme with design studio practice and London construction industry project partnerships.' },
    { name: 'MSc Data Science', slug: 'msc-data-science-lsbu', degreeLevel: DegreeType.MASTER, field: 'Data & Analytics', durationYears: 1, tuitionFeePerYear: 'GBP 18,500/year', description: "Develops machine learning, analytics and programming skills for London's thriving data and fintech sectors." },
    { name: 'MSc International Business', slug: 'msc-international-business-lsbu', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 17,500/year', description: 'Develops global strategy, cross-cultural management and international finance knowledge for business careers.' },
  ],
  scholarships: [
    { name: 'LSBU International Scholarship', type: ScholarshipType.MERIT_BASED, value: 'GBP 2,000 tuition reduction', description: 'Available to self-funded international students with strong prior academic performance.' },
    { name: "LSBU Vice-Chancellor's Award", type: ScholarshipType.MERIT_BASED, value: 'GBP 3,000 tuition reduction', description: 'Competitive scholarship for the highest-achieving international applicants each intake.' },
  ],
  admissionSteps: [],
}

export const ARDEN_UNIVERSITY = {
  name: 'Arden University',
  slug: 'arden-university',
  city: 'Coventry, England',
  foundedYear: 1990,
  ranking: null,
  totalStudents: 25000,
  internationalStudents: 0.35,
  acceptanceRate: 80,
  shortDescription: "Arden University is the UK's leading online-first private university, offering flexible undergraduate and postgraduate programmes in business, psychology, law and computing that can be studied fully online or in blended mode from nine UK study centres and international partner campuses. Over 25,000 students from more than 100 countries currently study with Arden globally, attracted by multiple annual start dates, no fixed timetable, and competitive fees compared to traditional campus universities.",
  tuitionFeeMin: 7425,
  tuitionFeeMax: 15000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'January, March, May, July, September, November',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'BA (Hons) Business Management', slug: 'ba-business-management-arden', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'GBP 9,000/year', description: 'Flexible online business degree covering marketing, finance and leadership, completable from anywhere in the world.' },
    { name: 'BSc (Hons) Psychology', slug: 'bsc-psychology-arden', degreeLevel: DegreeType.BACHELOR, field: 'Psychology', durationYears: 3, tuitionFeePerYear: 'GBP 9,000/year', description: 'BPS-accredited psychology degree delivered online with flexible scheduling to fit around work commitments.' },
    { name: 'LLB (Hons) Law', slug: 'llb-law-arden', degreeLevel: DegreeType.BACHELOR, field: 'Law', durationYears: 3, tuitionFeePerYear: 'GBP 9,000/year', description: 'Qualifying law degree delivered flexibly online, covering core legal subjects and preparing students for SQE.' },
    { name: 'BSc (Hons) Computing', slug: 'bsc-computing-arden', degreeLevel: DegreeType.BACHELOR, field: 'Computer Science & IT', durationYears: 3, tuitionFeePerYear: 'GBP 9,000/year', description: 'Online computing degree covering software development, cybersecurity and data management.' },
    { name: 'MBA', slug: 'mba-arden', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 12,000/year', description: 'Flexible online MBA with leadership, strategy and entrepreneurship modules for working professionals.' },
    { name: 'MSc Data Science', slug: 'msc-data-science-arden', degreeLevel: DegreeType.MASTER, field: 'Data & Analytics', durationYears: 1, tuitionFeePerYear: 'GBP 12,000/year', description: 'Covers machine learning, big data and analytics delivered fully online with no campus attendance required.' },
  ],
  scholarships: [
    { name: 'Arden International Excellence Scholarship', type: ScholarshipType.MERIT_BASED, value: 'GBP 1,000–2,000 tuition reduction', description: 'Available to international students with strong prior academic performance joining Arden programmes.' },
  ],
  admissionSteps: [],
}

export const CARDIFF_METROPOLITAN_UNIVERSITY = {
  name: 'Cardiff Metropolitan University',
  slug: 'cardiff-metropolitan-university',
  city: 'Cardiff, Wales',
  foundedYear: 1865,
  ranking: null,
  totalStudents: 12000,
  internationalStudents: 0.15,
  acceptanceRate: 64,
  shortDescription: "Cardiff Metropolitan University is a post-92 institution in Wales' vibrant capital city, offering respected programmes in business, sport science, health, design and education. Cardiff Met consistently performs strongly in student satisfaction surveys and is recognised for the quality of its applied research in food science, sport and education. International students study in one of the UK's most affordable capital cities, with a unique blend of Welsh heritage and cosmopolitan culture.",
  tuitionFeeMin: 13000,
  tuitionFeeMax: 15500,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'BA Business Management', slug: 'ba-business-management-cardiff-met', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'GBP 13,000/year', description: 'Professionally accredited business degree with marketing, finance and enterprise specialist pathways.' },
    { name: 'BSc Sport and Exercise Science', slug: 'bsc-sport-exercise-science-cardiff-met', degreeLevel: DegreeType.BACHELOR, field: 'Sport & Exercise Science', durationYears: 3, tuitionFeePerYear: 'GBP 13,000/year', description: "Covers exercise physiology, biomechanics and sport psychology using Cardiff's elite sport facilities." },
    { name: 'BSc Physiotherapy', slug: 'bsc-physiotherapy-cardiff-met', degreeLevel: DegreeType.BACHELOR, field: 'Health Sciences', durationYears: 3, tuitionFeePerYear: 'GBP 13,000/year', description: 'HCPC-approved physiotherapy degree with NHS Wales clinical placements.' },
    { name: 'BA (Hons) Graphic Communication', slug: 'ba-graphic-communication-cardiff-met', degreeLevel: DegreeType.BACHELOR, field: 'Art & Design', durationYears: 3, tuitionFeePerYear: 'GBP 13,000/year', description: 'Award-winning design programme at Cardiff School of Art and Design covering typography, branding and digital media.' },
    { name: 'BA (Hons) Education Studies', slug: 'ba-education-studies-cardiff-met', degreeLevel: DegreeType.BACHELOR, field: 'Education', durationYears: 3, tuitionFeePerYear: 'GBP 13,000/year', description: 'Examines educational policy, inclusion and pedagogy for careers in teaching, training and community education.' },
    { name: 'MSc International Business Management', slug: 'msc-international-business-cardiff-met', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 14,000/year', description: 'Develops global management, strategy and cross-cultural skills for careers in international organisations.' },
    { name: 'MSc Sport and Exercise Science', slug: 'msc-sport-exercise-science-cardiff-met', degreeLevel: DegreeType.MASTER, field: 'Sport & Exercise Science', durationYears: 1, tuitionFeePerYear: 'GBP 15,500/year', description: 'Advanced postgraduate sport science programme with research and applied performance analysis components.' },
  ],
  scholarships: [
    { name: 'Cardiff Met International Scholarship', type: ScholarshipType.MERIT_BASED, value: 'GBP 1,500–3,000 tuition reduction', description: 'Available to international students with strong academic records applying to Cardiff Met programmes.' },
  ],
  admissionSteps: [],
}

export const KINGS_EDUCATION = {
  name: "King's Education",
  slug: 'kings-education',
  city: 'Bournemouth, England',
  foundedYear: 1957,
  ranking: null,
  totalStudents: 3000,
  internationalStudents: 0.95,
  acceptanceRate: 80,
  shortDescription: "King's Education is a leading private pathway college with four UK campuses in Bournemouth, Brighton, London and Oxford, specialising in Foundation Year programmes, A-levels and pre-sessional English for international students seeking entry to UK universities. King's partners with top institutions including Arts University Bournemouth, University of Brighton and Oxford Brookes, offering conditional progression guarantees to partner universities upon successful completion. With over 60 years of experience, King's provides a safe, structured environment for international students preparing for British higher education.",
  tuitionFeeMin: 9500,
  tuitionFeeMax: 22650,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'Advanced Level Foundation (Science and Engineering)', slug: 'foundation-science-engineering-kings', degreeLevel: DegreeType.FOUNDATION, field: 'Science & Engineering', durationYears: 1, tuitionFeePerYear: 'GBP 22,650/year', description: 'Rigorous one-year foundation programme preparing international students for entry to UK university science and engineering degrees.' },
    { name: 'International Business Foundation', slug: 'foundation-international-business-kings', degreeLevel: DegreeType.FOUNDATION, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 17,700/year', description: 'One-year business foundation with modules in economics, accounting and management leading to UK university entry.' },
    { name: 'Art and Design Foundation', slug: 'foundation-art-design-kings', degreeLevel: DegreeType.FOUNDATION, field: 'Art & Design', durationYears: 1, tuitionFeePerYear: 'GBP 20,000/year', description: 'UAL-validated foundation diploma for international students preparing for creative arts and design degrees in the UK.' },
    { name: 'Law Foundation', slug: 'foundation-law-kings', degreeLevel: DegreeType.FOUNDATION, field: 'Law', durationYears: 1, tuitionFeePerYear: 'GBP 18,500/year', description: 'Specialist foundation programme developing legal reasoning, academic English and study skills for entry to UK law degrees.' },
    { name: 'A-Level Programme', slug: 'a-level-kings', degreeLevel: DegreeType.CERTIFICATE, field: 'Foundation & Pathway', durationYears: 2, tuitionFeePerYear: 'GBP 22,080/year', description: 'Two-year British A-level programme for international students covering sciences, humanities and social sciences for UCAS university applications.' },
    { name: 'Pre-sessional English Language', slug: 'pre-sessional-english-kings', degreeLevel: DegreeType.CERTIFICATE, field: 'Foundation & Pathway', durationYears: 0.5, tuitionFeePerYear: 'GBP 9,500/year', description: 'Intensive academic English programme preparing international students to meet UK university language entry requirements.' },
  ],
  scholarships: [
    { name: "King's Academic Excellence Scholarship", type: ScholarshipType.MERIT_BASED, value: 'GBP 1,000–3,000 tuition reduction', description: 'Awarded to high-achieving international students applying to Kings Foundation and A-level programmes.' },
  ],
  admissionSteps: [],
}

export const INTO_UNIVERSITY_PARTNERSHIPS = {
  name: 'INTO University Partnerships',
  slug: 'into-university-partnerships',
  city: 'Multiple UK campuses',
  foundedYear: 2006,
  ranking: null,
  totalStudents: 10000,
  internationalStudents: 0.98,
  acceptanceRate: 80,
  shortDescription: "INTO University Partnerships is one of the world's leading international pathway providers, operating embedded study centres at partner universities including Manchester, Newcastle, City London, UEA and Queen's Belfast. Foundation, International Year One and Pre-Master's programmes come with guaranteed conditional progression to the host university degree upon meeting grade requirements. INTO has helped over 100,000 international students progress to degree study at leading UK universities.",
  tuitionFeeMin: 12000,
  tuitionFeeMax: 22000,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'International Foundation in Business and Humanities', slug: 'foundation-business-humanities-into', degreeLevel: DegreeType.FOUNDATION, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 18,000/year', description: 'One-year foundation programme preparing students for business, economics and humanities degrees at INTO partner universities.' },
    { name: 'International Foundation in Science and Engineering', slug: 'foundation-science-engineering-into', degreeLevel: DegreeType.FOUNDATION, field: 'Science & Engineering', durationYears: 1, tuitionFeePerYear: 'GBP 18,500/year', description: 'Foundation year covering mathematics, physics and chemistry for progression to STEM degree programmes.' },
    { name: 'International Foundation in Computing and Digital Technologies', slug: 'foundation-computing-into', degreeLevel: DegreeType.FOUNDATION, field: 'Computer Science & IT', durationYears: 1, tuitionFeePerYear: 'GBP 18,000/year', description: 'Foundation year covering programming fundamentals, mathematics and digital skills for computer science degrees.' },
    { name: "Pre-Master's in Business and Humanities", slug: 'pre-masters-business-humanities-into', degreeLevel: DegreeType.DIPLOMA, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'GBP 20,000/year', description: "Postgraduate pathway programme developing academic English and subject knowledge for Master's entry at INTO partner universities." },
    { name: "Pre-Master's in Science, Technology and Engineering", slug: 'pre-masters-stem-into', degreeLevel: DegreeType.DIPLOMA, field: 'Science & Engineering', durationYears: 1, tuitionFeePerYear: 'GBP 20,500/year', description: "Postgraduate pathway developing quantitative and academic skills for entry to STEM Master's programmes." },
    { name: 'English Language Programme', slug: 'english-language-into', degreeLevel: DegreeType.CERTIFICATE, field: 'Foundation & Pathway', durationYears: 0.5, tuitionFeePerYear: 'GBP 12,000/year', description: 'Academic English programme available in multiple levels from pre-intermediate to advanced, aligned with IELTS requirements.' },
  ],
  scholarships: [
    { name: 'INTO Excellence Scholarship', type: ScholarshipType.MERIT_BASED, value: 'GBP 2,000–5,000 tuition reduction', description: "Awarded to the highest-achieving international applicants across INTO's UK pathway programmes." },
    { name: 'INTO Early Commitment Award', type: ScholarshipType.PARTIAL, value: 'GBP 1,000 tuition reduction', description: 'Discount for students who accept their INTO offer and pay their deposit before the early deadline.' },
  ],
  admissionSteps: [],
}

export const CATS_GLOBAL_SCHOOLS = {
  name: 'CATS Global Schools',
  slug: 'cats-global-schools',
  city: 'Cambridge, England',
  foundedYear: 1899,
  ranking: null,
  totalStudents: 2000,
  internationalStudents: 0.95,
  acceptanceRate: 70,
  shortDescription: "CATS Global Schools operates prestigious independent colleges in Cambridge, Canterbury and London, offering A-levels, University Foundation Programmes and Pre-Master's courses specifically designed for ambitious international students. CATS Cambridge is particularly celebrated for its Oxbridge preparation tradition and exceptional A-level results, producing graduates who go on to the UK's most selective universities. The small, nurturing college environment with 24/7 pastoral care makes CATS an ideal choice for younger international students.",
  tuitionFeeMin: 14000,
  tuitionFeeMax: 33990,
  tuitionCurrency: 'GBP',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'University Foundation Programme', slug: 'university-foundation-cats', degreeLevel: DegreeType.FOUNDATION, field: 'Foundation & Pathway', durationYears: 1, tuitionFeePerYear: 'GBP 33,990/year', description: 'Intensive one-year university preparation programme at CATS Cambridge covering academic subjects, English and study skills for UK university entry.' },
    { name: 'A-Level Programme (2 years)', slug: 'a-level-2yr-cats', degreeLevel: DegreeType.CERTIFICATE, field: 'Foundation & Pathway', durationYears: 2, tuitionFeePerYear: 'GBP 22,080/year', description: 'Two-year British A-level programme for international students with subject options across sciences, humanities and social sciences.' },
    { name: 'A-Level Programme (1 year)', slug: 'a-level-1yr-cats', degreeLevel: DegreeType.CERTIFICATE, field: 'Foundation & Pathway', durationYears: 1, tuitionFeePerYear: 'GBP 28,500/year', description: 'Accelerated one-year A-level option for students who have completed the equivalent of AS level or Foundation study.' },
    { name: "Pre-Master's Programme", slug: 'pre-masters-cats', degreeLevel: DegreeType.DIPLOMA, field: 'Foundation & Pathway', durationYears: 1, tuitionFeePerYear: 'GBP 28,000/year', description: "Postgraduate preparation course developing academic English and research skills for entry to UK Master's programmes." },
    { name: 'Art and Design Foundation', slug: 'foundation-art-design-cats', degreeLevel: DegreeType.FOUNDATION, field: 'Art & Design', durationYears: 1, tuitionFeePerYear: 'GBP 30,000/year', description: 'UAL-validated portfolio foundation programme for international students aiming for top UK art and design degrees.' },
    { name: 'Academic English Programme', slug: 'academic-english-cats', degreeLevel: DegreeType.CERTIFICATE, field: 'Foundation & Pathway', durationYears: 0.5, tuitionFeePerYear: 'GBP 14,000/year', description: 'Intensive academic English course integrated into the CATS college environment, from intermediate to advanced level.' },
  ],
  scholarships: [
    { name: 'CATS Academic Excellence Award', type: ScholarshipType.MERIT_BASED, value: 'GBP 2,000–5,000 tuition reduction', description: 'Awarded to high-achieving international students joining CATS Foundation and A-level programmes.' },
    { name: 'CATS Progression Scholarship', type: ScholarshipType.MERIT_BASED, value: 'GBP 3,000 award toward university fees', description: 'Awarded to CATS graduates who progress to a top UK university, contributing toward first-year university tuition.' },
  ],
  admissionSteps: [],
}
export const UK_UNIVERSITIES: any[] = [
  UWE_BRISTOL,
  UNIVERSITY_OF_PORTSMOUTH,
  UNIVERSITY_OF_SHEFFIELD,
  UNIVERSITY_OF_CHESTER,
  DE_MONTFORT_UNIVERSITY,
  EDINBURGH_NAPIER_UNIVERSITY,
  LEEDS_BECKETT_UNIVERSITY,
  BUCKINGHAMSHIRE_NEW_UNIVERSITY,
  UNIVERSITY_FOR_THE_CREATIVE_ARTS,
  UNIVERSITY_OF_EAST_LONDON,
  UNIVERSITY_OF_HERTFORDSHIRE,
  UNIVERSITY_OF_LAW,
  MIDDLESEX_UNIVERSITY,
  UNIVERSITY_OF_BRADFORD,
  BIRMINGHAM_CITY_UNIVERSITY,
  UNIVERSITY_OF_WOLVERHAMPTON,
  UNIVERSITY_OF_NORTHAMPTON,
  OXFORD_BROOKES_UNIVERSITY,
  UNIVERSITY_ACADEMY_92,
  UNIVERSITY_OF_ESSEX,
  NORTHUMBRIA_UNIVERSITY,
  YORK_ST_JOHN_UNIVERSITY,
  TEESSIDE_UNIVERSITY,
  UNIVERSITY_OF_HULL,
  UNIVERSITY_OF_SUNDERLAND,
  UNIVERSITY_OF_READING,
  COVENTRY_UNIVERSITY,
  CANTERBURY_CHRIST_CHURCH_UNIVERSITY,
  BPP_UNIVERSITY,
  SHEFFIELD_HALLAM_UNIVERSITY,
  LONDON_SOUTH_BANK_UNIVERSITY,
  ARDEN_UNIVERSITY,
  CARDIFF_METROPOLITAN_UNIVERSITY,
  KINGS_EDUCATION,
  INTO_UNIVERSITY_PARTNERSHIPS,
  CATS_GLOBAL_SCHOOLS,
]
