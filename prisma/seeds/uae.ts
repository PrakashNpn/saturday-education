import { DegreeType, Region, ScholarshipType } from '../../generated/client'

// ─── UAE COUNTRY ──────────────────────────────────────────────────────────────

export const UAE = {
  slug: 'uae',
  name: 'United Arab Emirates',
  region: Region.ASIA,
  tagline: "Global Degrees in the Heart of the Middle East",
  shortDescription:
    "The UAE — and Dubai in particular — has become one of the fastest-growing international education hubs in the world, hosting branch campuses of leading Australian, UK, and Swiss universities. Students earn the same internationally recognised degrees as the parent institution, in a tax-free, multicultural city with world-class infrastructure and strong graduate employment prospects.",
  overview: `The UAE has transformed itself into a premier global education destination, with Dubai and Abu Dhabi hosting over 70 international branch campuses from the world's leading universities. Students studying in the UAE benefit from the same curriculum and degree accreditation as the parent institution — whether Australian (UOW, Curtin, Murdoch), British (Middlesex, De Montfort), or Swiss (HTMi) — while living in one of the world's most dynamic and internationally connected cities. Dubai's tax-free environment, safety, and multicultural population of over 200 nationalities create an exceptionally welcoming setting for international students from Asia and beyond. The UAE's strategic location at the crossroads of Asia, Europe, and Africa also makes it a powerful career launch pad, with multinational corporations, regional headquarters, and a booming technology and financial services sector offering strong graduate employment opportunities. Tuition fees are typically paid in UAE Dirhams (AED) and range from AED 35,000 to AED 100,000 per year depending on the institution and programme level.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '70+',
  tuitionFeeRange: 'AED 35,000 – AED 100,000/year',
  postStudyWorkVisa: 'UAE Job Seeker Visa — up to 12 months to find employment after graduation',
  internationalStudents: 120000,
  studentSatisfaction: 83,
  graduateEmployability: 82,
  visaProcessingTime: '2–4 weeks',
  workRights: 'Part-time work permitted with student visa; internships built into most programmes',
  costOfLivingMinUSD: 12000,
  costOfLivingMaxUSD: 22000,
  currencyCode: 'AED',
  academicSpecialties: [
    'Business & Management',
    'Engineering & Technology',
    'Law',
    'Computer Science & IT',
    'Hospitality & Tourism',
    'Finance & Banking',
  ],
  isFeatured: true,
  advantages: [
    {
      title: 'Branch Campus Degrees — Same Credential, Lower Cost',
      description:
        "Earn an Australian (UOW, Curtin, Murdoch) or British (Middlesex, De Montfort) degree in Dubai at significantly lower cost than studying in Australia or the UK — the same internationally recognised qualification, awarded by the same parent university.",
      order: 1,
    },
    {
      title: "Dubai — A Global Career Launch Pad",
      description:
        "Dubai is home to the regional headquarters of hundreds of multinationals across finance, technology, logistics, and hospitality. Studying here builds professional networks in one of the world's most strategically located business hubs.",
      order: 2,
    },
    {
      title: 'Tax-Free, Safe, and Multicultural',
      description:
        "The UAE is one of the safest countries in the world with a highly multicultural society — over 200 nationalities live in Dubai. The tax-free environment and strong AED currency make salaries and savings highly competitive for graduates who stay to work.",
      order: 3,
    },
    {
      title: 'Post-Study Job Seeker Visa',
      description:
        "UAE graduates can apply for a 12-month Job Seeker Visa after completing their degree, giving dedicated time to find employment without leaving the country — a significant advantage in a competitive graduate job market.",
      order: 4,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Choose Your University and Programme',
      description:
        'Research the branch campus universities in Dubai — Australian, British, and Swiss institutions all offer their full degree programmes. Compare fees (in AED), intake months, and campus locations (Knowledge Park, DIAC, Knowledge Village).',
    },
    {
      stepNumber: 2,
      title: 'Apply and Receive Offer Letter',
      description:
        'Apply directly to your chosen Dubai campus with academic transcripts, English test scores (IELTS/TOEFL), passport copy, and personal statement. Most campuses have rolling admissions for September and January intakes.',
    },
    {
      stepNumber: 3,
      title: 'Apply for UAE Student Visa',
      description:
        "After receiving your offer and paying the confirmation deposit, your university will sponsor your UAE student visa and Emirates ID. The process typically takes 2–4 weeks and requires a medical fitness test and biometrics.",
    },
    {
      stepNumber: 4,
      title: 'Arrive and Complete Immigration Registration',
      description:
        "Fly to Dubai, complete your Emirates ID registration with the Federal Authority for Identity and Citizenship (ICA), open a local bank account, and attend university orientation. Your university's international student team will guide you through every step.",
    },
  ],
  faqs: [
    {
      question: 'Are degrees from UAE branch campuses the same as the parent university?',
      answer:
        "Yes — branch campus degrees are awarded by the parent institution (e.g., University of Wollongong Australia, Middlesex University UK) and are identical in academic content, accreditation, and recognition to degrees earned at the home campus. Employers globally recognise them as the parent university's qualification.",
      order: 1,
    },
    {
      question: 'Can I work while studying in the UAE?',
      answer:
        "Student visa holders in the UAE can undertake part-time work and internships. Most branch campus degree programmes include structured internship semesters that count toward the degree. Full-time off-campus employment requires a separate work permit sponsored by an employer.",
      order: 2,
    },
    {
      question: 'What English language requirements do UAE universities have?',
      answer:
        "Requirements mirror those of the parent institution: typically IELTS 6.0–6.5 for undergraduate and 6.5–7.0 for postgraduate programmes. Foundation pathway programmes are available for students who need to improve their English before entering degree study.",
      order: 3,
    },
    {
      question: 'Is Dubai safe for international students?',
      answer:
        "Yes — the UAE consistently ranks among the safest countries in the world, with extremely low crime rates and a well-established international student community. Dubai's cosmopolitan, multicultural environment makes it exceptionally welcoming for students from across Asia and beyond.",
      order: 4,
    },
    {
      question: 'What is the cost of living in Dubai for students?',
      answer:
        "Students typically spend AED 4,000–8,000 per month (USD 1,100–2,200) covering shared accommodation (AED 2,000–4,000), food (AED 800–1,500), transport (AED 300–600), and personal expenses. On-campus accommodation and student housing areas near Knowledge Park are available at the lower end of this range.",
      order: 5,
    },
  ],
}

// ─── UAE UNIVERSITIES ─────────────────────────────────────────────────────────

export const UOWD = {
  name: 'University of Wollongong in Dubai',
  slug: 'university-of-wollongong-dubai',
  city: 'Dubai, UAE',
  foundedYear: 1993,
  ranking: null,
  totalStudents: 3500,
  internationalStudents: 0.90,
  acceptanceRate: 65,
  shortDescription:
    "The University of Wollongong in Dubai is one of the UAE's oldest and most established international universities, operating as a branch campus of the University of Wollongong (UOW) Australia since 1993. Licensed by KHDA and accredited by the CAA UAE, it offers Australian-accredited degrees in business, engineering, IT, and communication. Its Knowledge Park campus attracts a highly diverse international student body from over 100 countries.",
  tuitionFeeMin: 60000,
  tuitionFeeMax: 90000,
  tuitionCurrency: 'AED',
  intakeMonths: 'September, January',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'Bachelor of Business Administration', slug: 'bachelor-business-administration-uowd', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 65,000/year', description: 'A comprehensive undergraduate degree covering management, marketing, and entrepreneurship, fully accredited by AACSB.' },
    { name: 'Bachelor of Computer Science', slug: 'bachelor-computer-science-uowd', degreeLevel: DegreeType.BACHELOR, field: 'Computer Science & IT', durationYears: 3, tuitionFeePerYear: 'AED 68,000/year', description: 'Equips students with skills in software engineering, cybersecurity, and AI, aligned with the UOW Australia curriculum.' },
    { name: 'Bachelor of Mechatronics Engineering', slug: 'bachelor-mechatronics-engineering-uowd', degreeLevel: DegreeType.BACHELOR, field: 'Engineering', durationYears: 4, tuitionFeePerYear: 'AED 70,000/year', description: 'An advanced engineering program combining mechanical, electrical, and computing systems, accredited by the UAE CAA.' },
    { name: 'Bachelor of Communication and Media Studies', slug: 'bachelor-communication-media-studies-uowd', degreeLevel: DegreeType.BACHELOR, field: 'Media & Communications', durationYears: 3, tuitionFeePerYear: 'AED 62,000/year', description: 'Prepares students for careers in journalism, digital media, and public relations through the Australian UOW framework.' },
    { name: 'Bachelor of Fashion Management', slug: 'bachelor-fashion-management-uowd', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 63,000/year', description: 'A unique program blending business strategy with fashion industry knowledge for leadership roles in global fashion and retail.' },
    { name: 'Master of Business Administration (MBA)', slug: 'mba-uowd', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'AED 85,000/year', description: 'A globally recognised Australian MBA at Knowledge Park equipping professionals with strategic management capabilities for the GCC market.' },
    { name: 'Master of Information Technology', slug: 'master-information-technology-uowd', degreeLevel: DegreeType.MASTER, field: 'Computer Science & IT', durationYears: 1, tuitionFeePerYear: 'AED 80,000/year', description: 'An advanced postgraduate program covering cloud computing, data analytics, and cybersecurity aligned with the UOW Australia curriculum.' },
  ],
  scholarships: [
    { name: 'Academic Merit Scholarship', type: ScholarshipType.MERIT_BASED, value: '15%–50% tuition reduction', description: 'Automatically awarded to high-achieving new students at both undergraduate and postgraduate levels based on previous academic performance.' },
    { name: 'Sports Excellence Scholarship', type: ScholarshipType.PARTIAL, value: '50% tuition bursary', description: 'Available to students who demonstrate outstanding sporting achievement at national or international level.' },
    { name: 'UOWD Early Enrolment Discount', type: ScholarshipType.PARTIAL, value: 'Up to 10% tuition reduction', description: 'A discount offered to students who complete enrolment and pay fees before the specified early deadline each intake.' },
  ],
  admissionSteps: [],
}

export const CURTIN_DUBAI = {
  name: 'Curtin University Dubai',
  slug: 'curtin-university-dubai',
  city: 'Dubai, UAE',
  foundedYear: 2017,
  ranking: null,
  totalStudents: 1200,
  internationalStudents: 0.88,
  acceptanceRate: 65,
  shortDescription:
    "Curtin University Dubai is the UAE branch campus of Curtin University Perth, Australia, established in 2017 within Dubai International Academic City (DIAC). Licensed by KHDA, it delivers Australian-accredited degrees in engineering, business, IT, and science with a strong emphasis on industry-integrated learning. The campus provides a modern, multicultural environment and access to Curtin's global network of over 90,000 alumni.",
  tuitionFeeMin: 45000,
  tuitionFeeMax: 87000,
  tuitionCurrency: 'AED',
  intakeMonths: 'September, February',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'Bachelor of Commerce (Accounting)', slug: 'bachelor-commerce-accounting-curtin-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Finance & Accounting', durationYears: 3, tuitionFeePerYear: 'AED 68,000/year', description: 'An AACSB-aligned undergraduate degree providing expertise in financial accounting, auditing, and taxation with CPA/CA professional pathways.' },
    { name: 'Bachelor of Engineering (Civil)', slug: 'bachelor-engineering-civil-curtin-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Engineering', durationYears: 4, tuitionFeePerYear: 'AED 75,000/year', description: 'A comprehensive civil engineering program covering structural design, construction management, and sustainability, accredited by Engineers Australia.' },
    { name: 'Bachelor of Science (Cybersecurity)', slug: 'bachelor-science-cybersecurity-curtin-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Computer Science & IT', durationYears: 3, tuitionFeePerYear: 'AED 72,000/year', description: "Equips students with cutting-edge skills in network security, ethical hacking, and digital forensics, addressing the UAE's growing demand for cybersecurity professionals." },
    { name: 'Bachelor of Mass Communication', slug: 'bachelor-mass-communication-curtin-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Media & Communications', durationYears: 3, tuitionFeePerYear: 'AED 65,000/year', description: 'Develops professional competencies in journalism, digital media, and strategic communication through industry-linked project-based learning.' },
    { name: 'Foundation Program', slug: 'foundation-program-curtin-dubai', degreeLevel: DegreeType.FOUNDATION, field: 'Foundation & Pathway', durationYears: 1, tuitionFeePerYear: 'AED 45,000/year', description: 'A one-year pathway program for students preparing to enter Curtin Dubai undergraduate programs, covering English, mathematics, and academic study skills.' },
    { name: 'Master of Business Administration (MBA)', slug: 'mba-curtin-dubai', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'AED 87,000/year', description: 'A globally recognised one-year MBA offering specialisations in leadership, innovation, and entrepreneurship within the dynamic Dubai business environment.' },
  ],
  scholarships: [
    { name: 'Academic Merit Scholarship', type: ScholarshipType.MERIT_BASED, value: 'Up to 50% tuition reduction', description: 'Awarded to undergraduate applicants with outstanding academic results, automatically assessed at the point of offer.' },
    { name: 'Women in Engineering Scholarship', type: ScholarshipType.PARTIAL, value: 'Up to 25% tuition waiver', description: 'Supports female students enrolling in engineering programs, encouraging gender diversity in STEM fields at the Dubai campus.' },
    { name: 'Professional Excellence Scholarship', type: ScholarshipType.MERIT_BASED, value: 'Up to 30% tuition reduction', description: 'Available to postgraduate applicants who demonstrate significant professional experience and high academic achievement.' },
  ],
  admissionSteps: [],
}

export const MDX_DUBAI = {
  name: 'Middlesex University Dubai',
  slug: 'middlesex-university-dubai',
  city: 'Dubai, UAE',
  foundedYear: 2005,
  ranking: null,
  totalStudents: 6300,
  internationalStudents: 0.92,
  acceptanceRate: 72,
  shortDescription:
    "Middlesex University Dubai is the first overseas campus of Middlesex University London, established in 2005 at Dubai Knowledge Park, and is one of the largest international universities in the UAE with over 6,300 students from 127 nationalities. It offers more than 90 undergraduate and postgraduate programs across business, law, engineering, computer science, psychology, and creative arts, all validated by Middlesex University London. The campus was the first in the UAE to offer a face-to-face British qualifying LLB Law degree.",
  tuitionFeeMin: 49000,
  tuitionFeeMax: 114000,
  tuitionCurrency: 'AED',
  intakeMonths: 'September, January',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'BA (Hons) Business Management', slug: 'ba-business-management-mdx-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 55,000/year', description: 'A CMI-affiliated undergraduate degree offering specialisations in finance, marketing, supply chain, and entrepreneurship.' },
    { name: 'LLB (Hons) Law', slug: 'llb-law-mdx-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Law', durationYears: 3, tuitionFeePerYear: 'AED 57,000/year', description: "The UAE's first face-to-face British Qualifying Law degree, providing a pathway to both UK and UAE legal practice." },
    { name: 'BSc (Hons) Computer Engineering', slug: 'bsc-computer-engineering-mdx-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Engineering', durationYears: 3, tuitionFeePerYear: 'AED 58,000/year', description: 'Covers digital systems, software development, and embedded computing with hands-on laboratory experience.' },
    { name: 'BSc (Hons) Psychology', slug: 'bsc-psychology-mdx-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Social Sciences', durationYears: 3, tuitionFeePerYear: 'AED 53,000/year', description: 'A British Psychology Society (BPS)-recognised degree exploring cognitive, developmental, and clinical psychology.' },
    { name: 'BSc (Hons) Data Science', slug: 'bsc-data-science-mdx-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Computer Science & IT', durationYears: 3, tuitionFeePerYear: 'AED 56,000/year', description: 'Prepares graduates for high-demand data analytics roles covering machine learning, statistical modelling, and big data technologies.' },
    { name: 'BA (Hons) Fashion Design', slug: 'ba-fashion-design-mdx-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Art & Design', durationYears: 3, tuitionFeePerYear: 'AED 55,000/year', description: "A creative undergraduate program combining fashion design theory and studio practice within Dubai's vibrant fashion and retail industry." },
    { name: 'International Foundation Programme', slug: 'international-foundation-programme-mdx-dubai', degreeLevel: DegreeType.FOUNDATION, field: 'Foundation & Pathway', durationYears: 1, tuitionFeePerYear: 'AED 49,000/year', description: 'A one-year pathway for students who do not meet direct entry requirements, offering routes into Business, Law, Engineering, Psychology, and Arts programs.' },
    { name: 'MBA', slug: 'mba-mdx-dubai', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'AED 82,400/year', description: 'A flexible one-year MBA programme with intakes in September, January, April, and July, designed for working professionals in the UAE and GCC.' },
  ],
  scholarships: [
    { name: 'International Study Grant', type: ScholarshipType.PARTIAL, value: 'Partial tuition reduction', description: 'Available to international students applying for September intake Foundation, Undergraduate, or Postgraduate programs.' },
    { name: 'Academic Excellence Scholarship', type: ScholarshipType.MERIT_BASED, value: 'Up to 30% tuition waiver', description: 'Awarded to incoming students with strong A-level, IB, or equivalent results, reviewed annually for continuation.' },
    { name: 'Sports Scholarship', type: ScholarshipType.PARTIAL, value: 'Up to 50% tuition reduction', description: 'Recognises outstanding athletes competing at national or international level who demonstrate academic commitment.' },
  ],
  admissionSteps: [],
}

export const HTMI_DUBAI = {
  name: 'HTMi Switzerland Dubai',
  slug: 'htmi-switzerland-dubai',
  city: 'Dubai, UAE',
  foundedYear: 2019,
  ranking: null,
  totalStudents: 400,
  internationalStudents: 0.85,
  acceptanceRate: 70,
  shortDescription:
    "HTMi Switzerland Dubai is the Middle East campus of the internationally acclaimed Hotel and Tourism Management Institute (HTMi) Switzerland, established in 2019 and based within the H Hotel on Sheikh Zayed Road. It offers diploma and bachelor-level programs in international hotel management and culinary arts, validated by Edinburgh Napier University (UK). Students benefit from a five-star hotel learning environment and HTMi's globally recognised Swiss hospitality education brand.",
  tuitionFeeMin: 48000,
  tuitionFeeMax: 58000,
  tuitionCurrency: 'AED',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'Diploma in International Hotel and Tourism Management', slug: 'diploma-hotel-tourism-management-htmi-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Hospitality & Tourism', durationYears: 1, tuitionFeePerYear: 'AED 48,000/year', description: 'An industry-focused diploma equipping students with practical hotel operations, food and beverage management, and front office skills.' },
    { name: 'Higher Diploma in International Hotel and Tourism Management', slug: 'higher-diploma-hotel-tourism-management-htmi-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Hospitality & Tourism', durationYears: 1, tuitionFeePerYear: 'AED 50,000/year', description: 'An advanced diploma building management competencies in revenue management, events coordination, and hospitality leadership, validated by Edinburgh Napier University.' },
    { name: 'Bachelor of Arts in International Hotel and Tourism Management', slug: 'bachelor-hotel-tourism-management-htmi-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Hospitality & Tourism', durationYears: 3, tuitionFeePerYear: 'AED 55,000/year', description: 'A full undergraduate degree validated by Edinburgh Napier University (UK), covering strategic hotel management and international hospitality operations.' },
    { name: 'Diploma in International Culinary Arts', slug: 'diploma-culinary-arts-htmi-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Culinary Arts', durationYears: 1, tuitionFeePerYear: 'AED 48,000/year', description: 'A hands-on culinary diploma covering classical and contemporary cooking techniques, kitchen management, and food safety standards.' },
    { name: 'Higher Diploma in International Culinary Arts', slug: 'higher-diploma-culinary-arts-htmi-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Culinary Arts', durationYears: 1, tuitionFeePerYear: 'AED 50,000/year', description: 'An advanced culinary program focusing on menu development, restaurant management, and culinary entrepreneurship, validated by Edinburgh Napier University.' },
    { name: 'Certificate in Hotel Operations', slug: 'certificate-hotel-operations-htmi-dubai', degreeLevel: DegreeType.CERTIFICATE, field: 'Hospitality & Tourism', durationYears: 0.5, tuitionFeePerYear: 'AED 24,000/year', description: 'A short introductory certificate covering hotel front desk, housekeeping, and guest services operations.' },
  ],
  scholarships: [
    { name: 'Academic Merit Award', type: ScholarshipType.MERIT_BASED, value: 'Up to 20% tuition reduction', description: 'Offered to incoming students with strong academic transcripts or relevant hospitality work experience.' },
    { name: 'Early Enrolment Scholarship', type: ScholarshipType.PARTIAL, value: 'Up to 10% tuition discount', description: 'A discount available to students who confirm enrolment and pay fees at least 60 days before the semester start date.' },
  ],
  admissionSteps: [],
}

export const GBS_DUBAI = {
  name: 'Global Business Studies Dubai',
  slug: 'global-business-studies-dubai',
  city: 'Dubai, UAE',
  foundedYear: 2006,
  ranking: null,
  totalStudents: 1500,
  internationalStudents: 0.80,
  acceptanceRate: 75,
  shortDescription:
    "Global Business Studies (GBS Dubai) is a KHDA-licensed private higher education institution based in Dubai Knowledge Park, part of the GEDU Global Education network which also operates campuses in the UK and Malta. Founded in 2006 with a student community of over 1,500 learners from more than 50 countries, GBS Dubai offers bachelor's degrees, HND programs, and professional diplomas in business, accounting, IT, and healthcare management at competitive fee levels.",
  tuitionFeeMin: 35000,
  tuitionFeeMax: 50000,
  tuitionCurrency: 'AED',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'Bachelor of Business Management', slug: 'bachelor-business-management-gbs-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 40,000/year', description: 'A career-focused undergraduate degree covering management, marketing, and entrepreneurship with strong links to the UAE business sector.' },
    { name: 'Bachelor of Accounting and Finance', slug: 'bachelor-accounting-finance-gbs-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Finance & Accounting', durationYears: 3, tuitionFeePerYear: 'AED 40,000/year', description: 'Provides professional-standard knowledge in financial accounting, management accounting, and auditing aligned with international frameworks.' },
    { name: 'Bachelor of International Business', slug: 'bachelor-international-business-gbs-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 40,000/year', description: 'Prepares graduates for global commerce careers covering cross-cultural management, international trade, and global supply chain strategy.' },
    { name: 'Bachelor of Healthcare Management', slug: 'bachelor-healthcare-management-gbs-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Health Sciences', durationYears: 3, tuitionFeePerYear: 'AED 45,000/year', description: 'An interdisciplinary program combining healthcare systems knowledge with business management skills for UAE hospital and clinic administration.' },
    { name: 'HND in Digital Technologies', slug: 'hnd-digital-technologies-gbs-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Computer Science & IT', durationYears: 1, tuitionFeePerYear: 'AED 40,000/year', description: "A practical Higher National Diploma delivering skills in AI solutions, data management, and application development for the UAE's growing technology sector." },
    { name: 'Extended Diploma in Information Technology', slug: 'extended-diploma-it-gbs-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Computer Science & IT', durationYears: 1, tuitionFeePerYear: 'AED 35,000/year', description: 'An internationally recognised diploma providing a practical foundation in IT infrastructure, programming, and networking, with progression routes to bachelor programs.' },
  ],
  scholarships: [
    { name: 'Academic Excellence Scholarship', type: ScholarshipType.MERIT_BASED, value: 'Up to 50% tuition reduction', description: 'Awarded to students with outstanding academic records, assessed at admission and renewable based on ongoing GPA performance.' },
    { name: 'International Student Bursary', type: ScholarshipType.PARTIAL, value: 'Up to 40% tuition discount', description: 'Financial support for international students from outside the UAE, offered to encourage diversity and accessibility within GBS Dubai.' },
  ],
  admissionSteps: [],
}

export const MURDOCH_DUBAI = {
  name: 'Murdoch University Dubai',
  slug: 'murdoch-university-dubai',
  city: 'Dubai, UAE',
  foundedYear: 2008,
  ranking: null,
  totalStudents: 2500,
  internationalStudents: 0.87,
  acceptanceRate: 68,
  shortDescription:
    "Murdoch University Dubai is the UAE branch campus of Murdoch University Perth, Australia, established in 2008 and located in Dubai Knowledge Village. Licensed by KHDA, it offers Australian-accredited bachelor's and diploma programs in business, IT, media, communications, and psychology, including a pioneering double major option that allows students to combine two disciplines without extending study time or increasing fees. The campus provides direct articulation pathways to Murdoch University Australia.",
  tuitionFeeMin: 55000,
  tuitionFeeMax: 80000,
  tuitionCurrency: 'AED',
  intakeMonths: 'February, September',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'Bachelor of Business Administration', slug: 'bachelor-business-administration-murdoch-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 58,000/year', description: 'An AACSB-aligned undergraduate degree with majors in accounting, finance, marketing, and management, with a unique double major option.' },
    { name: 'Bachelor of Science (Information Technology)', slug: 'bachelor-science-it-murdoch-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Computer Science & IT', durationYears: 3, tuitionFeePerYear: 'AED 60,000/year', description: 'Covers business information systems, cybersecurity, and computer science, with the option to double major in IT and business.' },
    { name: 'Bachelor of Arts (Psychology)', slug: 'bachelor-arts-psychology-murdoch-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Social Sciences', durationYears: 3, tuitionFeePerYear: 'AED 57,000/year', description: 'An Australian Psychology Accreditation Council (APAC)-aligned program providing theoretical and applied understanding of human behaviour.' },
    { name: 'Bachelor of Arts (Media and Communications)', slug: 'bachelor-arts-media-communications-murdoch-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Media & Communications', durationYears: 3, tuitionFeePerYear: 'AED 57,000/year', description: 'Prepares students for careers in strategic communication, journalism, and digital media with specialisations in public relations and web communication.' },
    { name: 'Bachelor of Arts (Criminology)', slug: 'bachelor-arts-criminology-murdoch-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Social Sciences', durationYears: 3, tuitionFeePerYear: 'AED 57,000/year', description: 'An innovative program examining crime, law, and social justice, available as part of the Murdoch Dubai double major structure.' },
    { name: 'Foundation Program', slug: 'foundation-program-murdoch-dubai', degreeLevel: DegreeType.FOUNDATION, field: 'Foundation & Pathway', durationYears: 1, tuitionFeePerYear: 'AED 55,000/year', description: 'A KHDA-approved preparatory program offering pathways into Murdoch University Dubai undergraduate degrees in business, IT, and arts.' },
  ],
  scholarships: [
    { name: 'Academic Excellence Scholarship', type: ScholarshipType.MERIT_BASED, value: '15%–50% tuition waiver', description: 'Awarded based on academic performance, leadership achievement, and extracurricular activities, with renewable conditions tied to ongoing GPA.' },
    { name: 'Murdoch Alumni Family Scholarship', type: ScholarshipType.PARTIAL, value: '10% tuition reduction', description: 'Available to students who are family members of Murdoch University graduates worldwide.' },
    { name: 'Sports Excellence Award', type: ScholarshipType.PARTIAL, value: 'Up to 25% tuition reduction', description: 'Supports student-athletes competing at a high level who demonstrate academic commitment alongside sporting achievement.' },
  ],
  admissionSteps: [],
}

export const GBS_BANKING_DUBAI = {
  name: 'Global Banking School Dubai',
  slug: 'global-banking-school-dubai',
  city: 'Dubai, UAE',
  foundedYear: 2021,
  ranking: null,
  totalStudents: 800,
  internationalStudents: 0.82,
  acceptanceRate: 72,
  shortDescription:
    "Global Banking School (GBS) Dubai is the UAE campus of Global Banking School UK, established in Dubai Knowledge Park in 2021. KHDA-licensed, it delivers undergraduate and vocational programs in banking, finance, accounting, business, and healthcare management in partnership with leading UK higher education providers. The campus attracts students from over 87 nationalities and offers flexible, career-focused qualifications for the UAE's thriving financial services and business sectors.",
  tuitionFeeMin: 40000,
  tuitionFeeMax: 60000,
  tuitionCurrency: 'AED',
  intakeMonths: 'September, January',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'Bachelor of Business Administration (Banking and Finance)', slug: 'bachelor-bba-banking-finance-gbs-banking', degreeLevel: DegreeType.BACHELOR, field: 'Finance & Accounting', durationYears: 3, tuitionFeePerYear: 'AED 50,000/year', description: 'A specialised undergraduate degree focused on banking operations, financial markets, and corporate finance, aligned with UAE banking sector requirements.' },
    { name: 'Bachelor of Accounting and Finance', slug: 'bachelor-accounting-finance-gbs-banking-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Finance & Accounting', durationYears: 3, tuitionFeePerYear: 'AED 50,000/year', description: 'Covers financial reporting, management accounting, and investment analysis providing a foundation for ACCA, CIMA, or CPA professional pathways.' },
    { name: 'Bachelor of Business Management', slug: 'bachelor-business-management-gbs-banking-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 48,000/year', description: 'A comprehensive undergraduate business degree covering strategy, operations, human resource management, and digital business transformation.' },
    { name: 'HND in Business', slug: 'hnd-business-gbs-banking-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'AED 40,000/year', description: 'A Pearson BTEC Higher National Diploma providing a strong vocational foundation in business with articulation pathways into the second year of bachelor programs.' },
    { name: 'HND in Healthcare Management', slug: 'hnd-healthcare-management-gbs-banking-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Health Sciences', durationYears: 1, tuitionFeePerYear: 'AED 40,000/year', description: "A practically oriented diploma covering healthcare systems, patient services management, and health policy in the UAE context." },
    { name: 'HND in Tourism and Hospitality Management', slug: 'hnd-tourism-hospitality-gbs-banking-dubai', degreeLevel: DegreeType.DIPLOMA, field: 'Hospitality & Tourism', durationYears: 1, tuitionFeePerYear: 'AED 40,000/year', description: "A vocational diploma preparing students for supervisory and management roles in Dubai's hospitality and tourism industry." },
  ],
  scholarships: [
    { name: 'GBS Academic Scholarship', type: ScholarshipType.MERIT_BASED, value: 'Up to 40% tuition reduction', description: 'Recognises high-achieving students at admission and upon renewal, based on academic excellence and contribution to campus community.' },
    { name: 'International Student Award', type: ScholarshipType.PARTIAL, value: 'Up to 30% tuition discount', description: 'Designed to support international students relocating to Dubai, assisting with the cost of transition into full-time study.' },
  ],
  admissionSteps: [],
}

export const DMU_DUBAI = {
  name: 'De Montfort University Dubai',
  slug: 'de-montfort-university-dubai',
  city: 'Dubai, UAE',
  foundedYear: 2021,
  ranking: null,
  totalStudents: 1800,
  internationalStudents: 0.88,
  acceptanceRate: 55,
  shortDescription:
    "De Montfort University Dubai is the UAE branch campus of De Montfort University (DMU) Leicester, UK, opened in 2021 and fully licensed by KHDA. It offers undergraduate, postgraduate, and foundation programs in business, law, engineering, computer science, interior design, and fashion design, all validated by DMU Leicester. The Dubai campus replicates DMU's UK curriculum and standards, providing students a British degree in the heart of a global business hub.",
  tuitionFeeMin: 61000,
  tuitionFeeMax: 99000,
  tuitionCurrency: 'AED',
  intakeMonths: 'September, January',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    { name: 'BA (Hons) Business Management', slug: 'ba-business-management-dmu-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Business & Management', durationYears: 3, tuitionFeePerYear: 'AED 64,000/year', description: 'A UK-validated undergraduate degree with specialisations in marketing, HR, and international management, accredited by the Chartered Management Institute.' },
    { name: 'LLB (Hons) Law', slug: 'llb-law-dmu-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Law', durationYears: 3, tuitionFeePerYear: 'AED 66,000/year', description: 'A British qualifying law degree covering contract, tort, criminal, and UAE commercial law, with pathways to legal practice in UK and UAE jurisdictions.' },
    { name: 'BEng (Hons) Mechanical Engineering', slug: 'beng-mechanical-engineering-dmu-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Engineering', durationYears: 3, tuitionFeePerYear: 'AED 71,000/year', description: 'A UK-accredited engineering degree covering thermodynamics, materials science, and CAD design, with industry project placements in the UAE manufacturing sector.' },
    { name: 'BSc (Hons) Cyber Security', slug: 'bsc-cyber-security-dmu-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Computer Science & IT', durationYears: 3, tuitionFeePerYear: 'AED 68,000/year', description: 'A technically rigorous degree in network security, digital forensics, and ethical hacking, validated by DMU Leicester and aligned with global cybersecurity frameworks.' },
    { name: 'BA (Hons) Interior Design', slug: 'ba-interior-design-dmu-dubai', degreeLevel: DegreeType.BACHELOR, field: 'Art & Design', durationYears: 3, tuitionFeePerYear: 'AED 65,000/year', description: "A studio-based design degree covering spatial design, design history, and sustainable interiors, highly relevant to Dubai's booming real estate and hospitality design sector." },
    { name: 'Foundation Program', slug: 'foundation-program-dmu-dubai', degreeLevel: DegreeType.FOUNDATION, field: 'Foundation & Pathway', durationYears: 1, tuitionFeePerYear: 'AED 61,000/year', description: 'A UK-standard preparatory year providing pathways into DMU Dubai undergraduate programs in business, law, engineering, design, and computing.' },
    { name: 'MSc International Business', slug: 'msc-international-business-dmu-dubai', degreeLevel: DegreeType.MASTER, field: 'Business & Management', durationYears: 1, tuitionFeePerYear: 'AED 89,000/year', description: "A UK-validated master's program equipping graduates with advanced knowledge in global strategy, international trade law, and cross-cultural management." },
  ],
  scholarships: [
    { name: 'Academic Merit Scholarship', type: ScholarshipType.MERIT_BASED, value: 'Up to 30% tuition reduction', description: 'Awarded to students with strong prior academic records, assessed automatically at the point of admission offer.' },
    { name: 'Early Payment Discount', type: ScholarshipType.PARTIAL, value: '3% annual tuition reduction', description: 'Available to students who pay annual tuition fees in full before 1 September for the September intake.' },
    { name: 'Community Engagement Award', type: ScholarshipType.PARTIAL, value: 'Up to 15% tuition reduction', description: 'Recognises students with a demonstrated record of community service, volunteering, or social impact activities.' },
  ],
  admissionSteps: [],
}

export const UAE_UNIVERSITIES: any[] = [
  UOWD,
  CURTIN_DUBAI,
  MDX_DUBAI,
  HTMI_DUBAI,
  GBS_DUBAI,
  MURDOCH_DUBAI,
  GBS_BANKING_DUBAI,
  DMU_DUBAI,
]
