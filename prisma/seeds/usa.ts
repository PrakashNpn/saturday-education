import { DegreeType, ScholarshipType } from '../../generated/client'

// ─── UNITED STATES UNIVERSITIES ──────────────────────────────────────────────
// Each exported separately so they can be referenced by slug for easy debugging.
// All tuition figures are INTERNATIONAL student rates.

// ─── 1. DIABLO VALLEY COLLEGE ────────────────────────────────────────────────
export const DIABLO_VALLEY_COLLEGE = {
  name: 'Diablo Valley College',
  slug: 'diablo-valley-college',
  city: 'Pleasant Hill, CA',
  foundedYear: 1949,
  ranking: null,
  totalStudents: 22000,
  internationalStudents: 0.05,
  acceptanceRate: 1.0,
  shortDescription:
    'Diablo Valley College is one of the largest and most respected community colleges in California, offering robust transfer pathways to UC and CSU campuses. With over 100 associate degree programs, strong STEM offerings, and a dedicated International Student Programs office, DVC is an ideal launchpad for international students targeting California\'s top universities.',
  tuitionFeeMin: 9000,
  tuitionFeeMax: 11000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts in Business Administration',
      slug: 'aa-business-administration',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Two-year associate program covering core business principles — accounting, marketing, management, and economics — with a direct transfer pathway to UC and CSU business schools.',
    },
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Foundational computing program covering programming, data structures, algorithms, and software development, designed for transfer to UC Berkeley, UCLA, or other CS programs.',
    },
    {
      name: 'Associate of Science in Mathematics',
      slug: 'as-mathematics',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Mathematics & Statistics',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Rigorous mathematics curriculum covering calculus, linear algebra, and differential equations, preparing students for STEM transfer pathways at competitive universities.',
    },
    {
      name: 'Associate of Arts in Communication Studies',
      slug: 'aa-communication-studies',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Develops public speaking, interpersonal communication, and media literacy skills, with strong transfer articulation to California universities.',
    },
    {
      name: 'Associate of Arts in Psychology',
      slug: 'aa-psychology',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Introductory psychology program exploring human behavior, research methods, and clinical theory as preparation for transfer into psychology or counseling bachelor\'s programs.',
    },
    {
      name: 'UC Transfer Pathway — STEM',
      slug: 'uc-transfer-pathway-stem',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Structured two-year pathway meeting UC Transfer Admission Guarantee (TAG) requirements for STEM majors at UC Davis, UC Santa Cruz, and other UC campuses.',
    },
    {
      name: 'CSU Transfer Pathway — Business',
      slug: 'csu-transfer-pathway-business',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        `Meets California State University lower-division business articulation requirements, enabling seamless transfer into CSU business bachelor\\'s programs.`,
    },
  ],
  scholarships: [
    {
      name: 'DVC International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 500–1,500/semester',
      description:
        'Awarded to international students demonstrating academic excellence; applicants must maintain a 3.0 GPA and enroll in at least 12 units per semester.',
    },
  ],
  admissionSteps: [],
}

// ─── 2. CONTRA COSTA COLLEGE ─────────────────────────────────────────────────
export const CONTRA_COSTA_COLLEGE = {
  name: 'Contra Costa College',
  slug: 'contra-costa-college',
  city: 'San Pablo, CA',
  foundedYear: 1949,
  ranking: null,
  totalStudents: 8000,
  internationalStudents: 0.04,
  acceptanceRate: 1.0,
  shortDescription:
    `Contra Costa College is a community college in the San Francisco East Bay serving a diverse student population with affordable transfer and career education. Part of the Contra Costa Community College District, CCC offers strong pathways to UC and CSU campuses, with personalized support for international students navigating California\\'s higher education system.`,
  tuitionFeeMin: 8500,
  tuitionFeeMax: 10500,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts in Liberal Arts',
      slug: 'aa-liberal-arts',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Broad interdisciplinary program covering humanities, social sciences, and natural sciences, designed to fulfil lower-division requirements for transfer to UC or CSU.',
    },
    {
      name: 'Associate of Science in Business Administration',
      slug: 'as-business-administration',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Covers accounting, economics, business law, and management fundamentals to prepare students for transfer into four-year business programs.',
    },
    {
      name: 'Associate of Arts in Social Sciences',
      slug: 'aa-social-sciences',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Multidisciplinary social science curriculum including sociology, political science, and economics as a launchpad for transfer to UC or CSU social science programs.',
    },
    {
      name: 'Associate of Science in Administration of Justice',
      slug: 'as-administration-justice',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Criminal Justice & Law',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Introduces criminal justice systems, criminology, law enforcement procedures, and corrections for students pursuing careers in public safety or legal studies.',
    },
    {
      name: 'UC/CSU Transfer Pathway',
      slug: 'uc-csu-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Guided two-year curriculum satisfying IGETC (Intersegmental General Education Transfer Curriculum) for guaranteed transfer consideration to UC and CSU systems.',
    },
  ],
  scholarships: [],
  admissionSteps: [],
}

// ─── 3. LOS MEDANOS COLLEGE ───────────────────────────────────────────────────
export const LOS_MEDANOS_COLLEGE = {
  name: 'Los Medanos College',
  slug: 'los-medanos-college',
  city: 'Pittsburg, CA',
  foundedYear: 1974,
  ranking: null,
  totalStudents: 8500,
  internationalStudents: 0.03,
  acceptanceRate: 1.0,
  shortDescription:
    `Los Medanos College is a Contra Costa Community College District institution offering affordable academic and career-technical programs in the East Bay. LMC provides dedicated international student support, strong transfer pathways to California\\'s university system, and specialized programs in human services and industrial technology.`,
  tuitionFeeMin: 8500,
  tuitionFeeMax: 10500,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts in Business',
      slug: 'aa-business',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Foundational business education covering finance, marketing, management, and entrepreneurship with transfer articulation to CSU business programs.',
    },
    {
      name: 'Associate of Science in Computer Information Systems',
      slug: 'as-computer-information-systems',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Practical IT curriculum covering networking, database management, cybersecurity, and software applications for entry-level technology careers or university transfer.',
    },
    {
      name: 'Associate of Arts in Communication Studies',
      slug: 'aa-communication-studies',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Emphasizes oral communication, critical thinking, and intercultural competency — particularly valuable for international students developing professional English proficiency.',
    },
    {
      name: 'Associate of Arts in Early Childhood Education',
      slug: 'aa-early-childhood-education',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Education',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'Prepares students to work in early childhood settings with coursework in child development, curriculum design, and educational psychology.',
    },
    {
      name: 'UC/CSU Transfer Pathway',
      slug: 'uc-csu-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 9,500/year',
      description:
        'IGETC-aligned two-year plan completing lower-division requirements for transfer to UC or CSU, guided by dedicated transfer counselors.',
    },
  ],
  scholarships: [],
  admissionSteps: [],
}

// ─── 4. DE ANZA COLLEGE ───────────────────────────────────────────────────────
export const DE_ANZA_COLLEGE = {
  name: 'De Anza College',
  slug: 'de-anza-college',
  city: 'Cupertino, CA',
  foundedYear: 1967,
  ranking: null,
  totalStudents: 22000,
  internationalStudents: 0.12,
  acceptanceRate: 1.0,
  shortDescription:
    `De Anza College in Silicon Valley\\'s Cupertino is consistently ranked among the top transfer community colleges in the United States, sending more students to UC Berkeley and UCLA than almost any other community college. With a large international student community, cutting-edge STEM facilities, and strong Silicon Valley industry connections, De Anza is a premier entry point for international students targeting elite US universities.`,
  tuitionFeeMin: 10000,
  tuitionFeeMax: 12500,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, September',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Silicon Valley-focused CS curriculum covering Java, Python, data structures, algorithms, and software engineering, with direct UC transfer articulation for CS majors.',
    },
    {
      name: 'Associate of Science in Engineering',
      slug: 'as-engineering',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Lower-division engineering coursework including physics, calculus, and intro engineering design to prepare for UC engineering transfer programs.',
    },
    {
      name: 'Associate of Arts in Business Administration',
      slug: 'aa-business-administration',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Comprehensive business foundation including accounting, economics, marketing, and management with strong articulation to UC and CSU business programs.',
    },
    {
      name: 'Associate of Science in Mathematics',
      slug: 'as-mathematics',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Mathematics & Statistics',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Full calculus sequence, linear algebra, and differential equations to meet lower-division math requirements for STEM transfer programs.',
    },
    {
      name: 'Associate of Arts in Social Sciences',
      slug: 'aa-social-sciences',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Interdisciplinary social science program spanning economics, psychology, sociology, and political science for transfer to UC social science majors.',
    },
    {
      name: 'Associate of Arts in Communication Studies',
      slug: 'aa-communication-studies',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Builds English communication proficiency, public speaking, and critical analysis skills — ideal for international students developing academic and professional fluency.',
    },
    {
      name: 'UC Berkeley / UCLA Transfer Pathway',
      slug: 'uc-berkeley-ucla-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Structured two-year plan with Transfer Admission Guarantee (TAG) eligibility for UC Davis, UC Santa Cruz, and UC Irvine, aligned with UC Berkeley ASSIST articulation agreements.',
    },
    {
      name: 'Associate of Science in Data Science',
      slug: 'as-data-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Emerging data science curriculum covering statistics, Python programming, machine learning basics, and data visualization for transfer into data-intensive university majors.',
    },
  ],
  scholarships: [
    {
      name: 'De Anza International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 500–2,000/year',
      description:
        'Competitive merit scholarship for high-achieving international students based on academic performance; applicants must maintain a 3.5 GPA.',
    },
  ],
  admissionSteps: [],
}

// ─── 5. FOOTHILL COLLEGE ─────────────────────────────────────────────────────
export const FOOTHILL_COLLEGE = {
  name: 'Foothill College',
  slug: 'foothill-college',
  city: 'Los Altos Hills, CA',
  foundedYear: 1958,
  ranking: null,
  totalStudents: 17000,
  internationalStudents: 0.10,
  acceptanceRate: 1.0,
  shortDescription:
    'Foothill College sits in the heart of Silicon Valley and is renowned for its health sciences, biotechnology, and technology programs. Sister college to De Anza, Foothill attracts a large international student community and offers strong transfer pathways to top California universities alongside career-focused health and STEM degrees.',
  tuitionFeeMin: 10000,
  tuitionFeeMax: 12500,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, September',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Science in Biological Sciences',
      slug: 'as-biological-sciences',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Nursing & Healthcare',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Rigorous biology curriculum covering cell biology, genetics, microbiology, and anatomy for pre-health students planning transfer to UC or CSU nursing and medical programs.',
    },
    {
      name: 'Associate of Science in Biotechnology',
      slug: 'as-biotechnology',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        `Specialized biotechnology program blending laboratory techniques, molecular biology, and industry-relevant skills for careers in Silicon Valley\\'s booming biotech sector.`,
    },
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Comprehensive CS program covering programming fundamentals, data structures, and software engineering, with transfer articulation to top UC CS programs.',
    },
    {
      name: 'Associate of Arts in Business Administration',
      slug: 'aa-business-administration',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Core business coursework in management, marketing, accounting, and economics, preparing students for transfer to four-year business programs.',
    },
    {
      name: 'Associate of Arts in Psychology',
      slug: 'aa-psychology',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Foundational psychology covering developmental, social, and cognitive psychology as preparation for transfer into UC/CSU psychology programs.',
    },
    {
      name: 'UC Transfer Pathway — Health Sciences',
      slug: 'uc-transfer-pathway-health-sciences',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Nursing & Healthcare',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Designed for pre-nursing and pre-medicine international students, meeting all IGETC and science prerequisites for UC health sciences transfer programs.',
    },
    {
      name: 'Certificate in Medical Coding and Billing',
      slug: 'certificate-medical-coding-billing',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'Nursing & Healthcare',
      durationYears: 1,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Short-term professional certificate covering ICD-10, CPT coding, medical billing, and health information management for entry-level healthcare administration careers.',
    },
  ],
  scholarships: [
    {
      name: 'Foothill College Foundation International Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 500–1,500',
      description:
        'Foundation-funded awards for international students demonstrating academic merit and financial need; awarded each fall and spring semester.',
    },
  ],
  admissionSteps: [],
}

// ─── 6. ORANGE COAST COLLEGE ──────────────────────────────────────────────────
export const ORANGE_COAST_COLLEGE = {
  name: 'Orange Coast College',
  slug: 'orange-coast-college',
  city: 'Costa Mesa, CA',
  foundedYear: 1947,
  ranking: null,
  totalStudents: 24000,
  internationalStudents: 0.07,
  acceptanceRate: 1.0,
  shortDescription:
    `Orange Coast College in Costa Mesa is one of Southern California\\'s largest and most acclaimed community colleges, known for its award-winning business, aviation, and marine sciences programs. OCC\\'s proximity to major Orange County and Los Angeles employers, combined with strong UC/CSU transfer pathways and an active international student community, makes it a top choice for students from Asia.`,
  tuitionFeeMin: 9500,
  tuitionFeeMax: 12000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts in Business Administration',
      slug: 'aa-business-administration',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Award-winning business program covering management, marketing, accounting, and business law, with strong OC employer connections and UC/CSU transfer pathways.',
    },
    {
      name: 'Associate of Science in Aviation Science',
      slug: 'as-aviation-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'One of the premier aviation programs in California, covering flight training, aeronautics, and aviation management with access to John Wayne Airport facilities.',
    },
    {
      name: 'Associate of Science in Marine Sciences',
      slug: 'as-marine-sciences',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Natural Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Unique coastal location-based marine sciences program covering oceanography, marine biology, and ecology, with fieldwork on the Pacific coast.',
    },
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Comprehensive computing education with emphasis on software development, web technologies, and database systems, aligned with Southern California tech industry needs.',
    },
    {
      name: 'Associate of Arts in Communication Studies',
      slug: 'aa-communication-studies',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        'Develops interpersonal communication, public speaking, and media studies skills for transfer to USC, UC campuses, or Cal State programs.',
    },
    {
      name: 'UC/CSU Transfer Pathway — Business & Science',
      slug: 'uc-csu-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        `IGETC-completing two-year pathway for international students targeting UC Irvine, UCLA, or CSU Long Beach through OCC\\'s established transfer articulation agreements.`,
    },
    {
      name: 'Associate of Arts in Film and Television',
      slug: 'aa-film-television',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Media & Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,000/year',
      description:
        `Creative media program leveraging OCC\\'s proximity to Hollywood, covering screenwriting, video production, editing, and the business of entertainment.`,
    },
  ],
  scholarships: [
    {
      name: 'OCC International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 500–1,000/semester',
      description:
        'Merit-based award for international students maintaining a 3.0 GPA or higher; applications accepted at the beginning of each academic year.',
    },
  ],
  admissionSteps: [],
}

// ─── 7. GREEN RIVER COLLEGE ───────────────────────────────────────────────────
export const GREEN_RIVER_COLLEGE = {
  name: 'Green River College',
  slug: 'green-river-college',
  city: 'Auburn, WA',
  foundedYear: 1965,
  ranking: null,
  totalStudents: 8500,
  internationalStudents: 0.16,
  acceptanceRate: 1.0,
  shortDescription:
    'Green River College in Auburn, Washington is recognized nationally for its exceptional international student programs and clear transfer pathway to the University of Washington. With one of the highest international student enrollment rates of any Washington community college, Green River offers dedicated ESL support, robust STEM and business transfer programs, and a welcoming campus environment for students from Asia.',
  tuitionFeeMin: 9500,
  tuitionFeeMax: 12000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, March, June, September',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts — Direct Transfer Agreement',
      slug: 'aa-direct-transfer-agreement',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,500/year',
      description:
        'Washington State Direct Transfer Agreement (DTA) associate degree guaranteeing junior-level transfer to any Washington public four-year university including the University of Washington.',
    },
    {
      name: 'Associate of Science — Track 1 (Pre-Engineering)',
      slug: 'as-track-1-pre-engineering',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,500/year',
      description:
        'Pre-engineering curriculum aligned with UW College of Engineering requirements, covering calculus, physics, chemistry, and foundational engineering courses.',
    },
    {
      name: 'Associate of Science — Track 2 (Pre-STEM)',
      slug: 'as-track-2-pre-stem',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,500/year',
      description:
        'Designed for students targeting computer science, mathematics, or natural science transfer majors at the UW or other Washington research universities.',
    },
    {
      name: 'Associate of Applied Science in Business Management',
      slug: 'aas-business-management',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,500/year',
      description:
        'Applied business management degree focusing on entrepreneurship, operations, and professional communication, with elective tracks in marketing and finance.',
    },
    {
      name: 'University of Washington Transfer Pathway',
      slug: 'uw-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,500/year',
      description:
        'Formally articulated two-year pathway to the University of Washington — one of the top 50 universities in the world — with guaranteed junior-year admission upon meeting GPA and course requirements.',
    },
    {
      name: 'Certificate in Information Technology',
      slug: 'certificate-information-technology',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'Computer Science & IT',
      durationYears: 1,
      tuitionFeePerYear: 'USD 10,500/year',
      description:
        'Short professional certificate covering networking fundamentals, cybersecurity basics, and IT support skills for entry-level technology employment.',
    },
  ],
  scholarships: [
    {
      name: 'Green River College International Excellence Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 1,000–3,000/year',
      description:
        'Competitive merit scholarship awarded to high-achieving international students upon admission; renewable with continued academic performance.',
    },
  ],
  admissionSteps: [],
}

// ─── 8. OHLONE COLLEGE ────────────────────────────────────────────────────────
export const OHLONE_COLLEGE = {
  name: 'Ohlone College',
  slug: 'ohlone-college',
  city: 'Fremont, CA',
  foundedYear: 1967,
  ranking: null,
  totalStudents: 10500,
  internationalStudents: 0.08,
  acceptanceRate: 1.0,
  shortDescription:
    `Ohlone College in Fremont serves Silicon Valley\\'s diverse East Bay population with highly regarded programs in health sciences, American Sign Language and Deaf Studies, and technology. Conveniently located near major tech employers and the BART system, Ohlone offers strong transfer pathways to UC and CSU alongside specialized career programs valued in the Bay Area job market.`,
  tuitionFeeMin: 9000,
  tuitionFeeMax: 11500,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Silicon Valley-oriented CS curriculum covering programming, data structures, and web development with transfer articulation to UC Berkeley and CSU East Bay.',
    },
    {
      name: 'Associate of Science in Nursing (Pre-Nursing)',
      slug: 'as-pre-nursing',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Nursing & Healthcare',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Pre-nursing coursework in anatomy, physiology, microbiology, and chemistry, preparing international students for transfer into four-year nursing programs.',
    },
    {
      name: 'Associate of Arts in American Sign Language and Deaf Studies',
      slug: 'aa-asl-deaf-studies',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'One of the most respected ASL and Deaf Studies programs in California, covering ASL linguistics, Deaf culture, and interpreting preparation.',
    },
    {
      name: 'Associate of Science in Biological Sciences',
      slug: 'as-biological-sciences',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Natural Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Comprehensive biology program covering cellular biology, genetics, and ecology as preparation for UC/CSU transfer in biological science majors.',
    },
    {
      name: 'Associate of Arts in Business Administration',
      slug: 'aa-business-administration',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Business fundamentals program with strong accounting and management coursework, aligned with CSU East Bay and UC transfer requirements.',
    },
    {
      name: 'UC/CSU Transfer Pathway',
      slug: 'uc-csu-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'IGETC-fulfilling two-year pathway for international students targeting UC Berkeley, UC Santa Cruz, CSU East Bay, or San Jose State University.',
    },
  ],
  scholarships: [],
  admissionSteps: [],
}

// ─── 9. TACOMA COMMUNITY COLLEGE ─────────────────────────────────────────────
export const TACOMA_COMMUNITY_COLLEGE = {
  name: 'Tacoma Community College',
  slug: 'tacoma-community-college',
  city: 'Tacoma, WA',
  foundedYear: 1965,
  ranking: null,
  totalStudents: 9000,
  internationalStudents: 0.07,
  acceptanceRate: 1.0,
  shortDescription:
    `Tacoma Community College offers affordable, high-quality education just 30 miles south of Seattle with a direct transfer pathway to the University of Washington Tacoma. TCC\\'s welcoming campus, strong ESL and academic support programs, and Washington Direct Transfer Agreement make it an accessible gateway to Washington State\\'s prestigious four-year universities.`,
  tuitionFeeMin: 9000,
  tuitionFeeMax: 11500,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, March, June, September',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts — Direct Transfer Agreement',
      slug: 'aa-direct-transfer-agreement',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Washington State DTA degree guaranteeing junior-level standing transfer to UW Tacoma, Western Washington University, or any Washington public university.',
    },
    {
      name: 'Associate of Science in Business',
      slug: 'as-business',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Business administration coursework covering accounting, marketing, management, and economics, designed for transfer to UW or WSU business programs.',
    },
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Programming, networking, and systems coursework aligned with UW Tacoma computer science and information technology transfer requirements.',
    },
    {
      name: 'Associate of Applied Science in Medical Assistant',
      slug: 'aas-medical-assistant',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Nursing & Healthcare',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Clinical and administrative medical assistant program preparing students for immediate healthcare employment or further study in allied health.',
    },
    {
      name: 'University of Washington Tacoma Transfer Pathway',
      slug: 'uw-tacoma-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Formally articulated pathway to UW Tacoma offering guaranteed admission upon completing DTA requirements with a qualifying GPA, providing access to a prestigious UW degree.',
    },
  ],
  scholarships: [],
  admissionSteps: [],
}

// ─── 10. SANTA MONICA COLLEGE ─────────────────────────────────────────────────
export const SANTA_MONICA_COLLEGE = {
  name: 'Santa Monica College',
  slug: 'santa-monica-college',
  city: 'Santa Monica, CA',
  foundedYear: 1929,
  ranking: null,
  totalStudents: 30000,
  internationalStudents: 0.15,
  acceptanceRate: 1.0,
  shortDescription:
    `Santa Monica College is the top community college transfer feeder to UCLA and consistently one of the most popular choices for international students in the United States. Located minutes from the Pacific Ocean in vibrant Santa Monica, SMC boasts one of the nation\\'s largest international student populations, exceptional arts and media programs, and near-guaranteed UCLA transfer pathways for qualified students.`,
  tuitionFeeMin: 10000,
  tuitionFeeMax: 13000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts in Business Administration',
      slug: 'aa-business-administration',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        'Comprehensive business program with strong UCLA Anderson School of Management transfer articulation, covering finance, marketing, management, and entrepreneurship.',
    },
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        'Rigorous CS curriculum aligned with UCLA and UCSB computer science transfer requirements, covering programming, algorithms, data structures, and discrete math.',
    },
    {
      name: 'Associate of Arts in Film Production',
      slug: 'aa-film-production',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Media & Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        `Industry-connected film program in the heart of LA\\'s entertainment corridor, covering cinematography, editing, directing, and the business of film.`,
    },
    {
      name: 'Associate of Arts in Communication Studies',
      slug: 'aa-communication-studies',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        'Develops academic communication proficiency and critical thinking skills with strong transfer articulation to UCLA and UCSB communication programs.',
    },
    {
      name: 'Associate of Science in Mathematics',
      slug: 'as-mathematics',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Mathematics & Statistics',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        'Full STEM math sequence from pre-calculus through multivariable calculus and linear algebra, meeting UCLA and other UC lower-division math requirements.',
    },
    {
      name: 'Associate of Arts in Psychology',
      slug: 'aa-psychology',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        'Introductory psychology curriculum aligned with UCLA psychology transfer prerequisites, covering abnormal psychology, statistics, and research methods.',
    },
    {
      name: 'UCLA Transfer Pathway',
      slug: 'ucla-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        'SMC is the single largest transfer feeder to UCLA — this structured IGETC pathway maximizes admission probability to UCLA through prioritized transfer agreements.',
    },
    {
      name: 'Associate of Arts in Global Studies',
      slug: 'aa-global-studies',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 11,500/year',
      description:
        'Interdisciplinary global studies program covering international relations, political economy, and cross-cultural communication, ideal for internationally mobile students.',
    },
  ],
  scholarships: [
    {
      name: 'SMC International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 500–2,500/year',
      description:
        'Competitive merit scholarship for international students with outstanding academic records; awarded by the SMC Foundation each academic year.',
    },
  ],
  admissionSteps: [],
}

// ─── 11. WHATCOM COMMUNITY COLLEGE ────────────────────────────────────────────
export const WHATCOM_COMMUNITY_COLLEGE = {
  name: 'Whatcom Community College',
  slug: 'whatcom-community-college',
  city: 'Bellingham, WA',
  foundedYear: 1970,
  ranking: null,
  totalStudents: 5000,
  internationalStudents: 0.09,
  acceptanceRate: 1.0,
  shortDescription:
    `Whatcom Community College in Bellingham, Washington offers a scenic campus near the Canadian border with a formal transfer pathway to Western Washington University. Known for personalized instruction and a friendly international community, WCC provides an excellent low-cost foundation for students planning to transfer into WWU\\'s strong business, education, and science programs.`,
  tuitionFeeMin: 9000,
  tuitionFeeMax: 11000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, March, June, September',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts — Direct Transfer Agreement',
      slug: 'aa-direct-transfer-agreement',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Washington State DTA qualifying degree providing guaranteed junior-year transfer to Western Washington University and all Washington public four-year institutions.',
    },
    {
      name: 'Associate of Science in Business',
      slug: 'as-business',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Business fundamentals including accounting, marketing, management, and economics, aligned with WWU College of Business and Economics transfer requirements.',
    },
    {
      name: 'Associate of Science in Computer Science',
      slug: 'as-computer-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        'Computing curriculum covering programming fundamentals, data structures, and web development, designed for transfer to WWU or UW computer science programs.',
    },
    {
      name: 'Associate of Applied Science in Environmental Science',
      slug: 'aas-environmental-science',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Natural Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        `Field and lab-based environmental science program benefiting from Bellingham\\'s proximity to mountains, coastline, and national parks.`,
    },
    {
      name: 'Western Washington University Transfer Pathway',
      slug: 'wwu-transfer-pathway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'USD 10,000/year',
      description:
        `Formally articulated pathway to Western Washington University\\'s highly ranked programs, offering guaranteed transfer admission for students meeting GPA and course requirements.`,
    },
  ],
  scholarships: [],
  admissionSteps: [],
}

// ─── 12. QUEENS COLLEGE (CUNY) ────────────────────────────────────────────────
export const QUEENS_COLLEGE_CUNY = {
  name: 'Queens College, City University of New York',
  slug: 'queens-college-cuny',
  city: 'Flushing, NY',
  foundedYear: 1937,
  ranking: null,
  totalStudents: 19000,
  internationalStudents: 0.10,
  acceptanceRate: 0.51,
  shortDescription:
    `Queens College is one of the flagship colleges of the City University of New York system, situated in Flushing — one of the most culturally diverse communities in the world. Offering rigorous four-year bachelor\\'s and graduate programs at remarkably affordable public university tuition, QC is an excellent choice for international students from Asia seeking a New York education in a multicultural environment.`,
  tuitionFeeMin: 18000,
  tuitionFeeMax: 22000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Arts in Business Administration',
      slug: 'ba-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 20,000/year',
      description:
        'Comprehensive undergraduate business program offered through the Aaron Copland School, covering management, finance, marketing, and accounting.',
    },
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bs-computer-science',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 20,000/year',
      description:
        'Strong CS program in the heart of New York City, covering algorithms, software engineering, systems programming, and elective tracks in AI and data science.',
    },
    {
      name: 'Bachelor of Science in Accounting',
      slug: 'bs-accounting',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 20,000/year',
      description:
        `CPA-pathway accounting program covering financial reporting, auditing, taxation, and managerial accounting recognized by New York\\'s major accounting firms.`,
    },
    {
      name: 'Bachelor of Arts in Psychology',
      slug: 'ba-psychology',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Social Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'USD 20,000/year',
      description:
        'Broad psychology program covering cognitive, developmental, clinical, and social psychology with research laboratory opportunities.',
    },
    {
      name: 'Bachelor of Arts in Economics',
      slug: 'ba-economics',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 20,000/year',
      description:
        'Rigorous economics curriculum covering micro/macroeconomics, econometrics, and quantitative methods, with strong pathways to graduate economics programs.',
    },
    {
      name: 'Master of Science in Accounting',
      slug: 'ms-accounting',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 22,000/year',
      description:
        'Graduate accounting program meeting New York CPA 150-credit requirements, with specializations in taxation and forensic accounting.',
    },
    {
      name: 'Master of Arts in Psychology',
      slug: 'ma-psychology',
      degreeLevel: DegreeType.MASTER,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 22,000/year',
      description:
        'Graduate psychology program preparing students for doctoral studies or professional practice in clinical, industrial-organizational, or educational psychology.',
    },
    {
      name: 'Bachelor of Science in Nutrition and Exercise Sciences',
      slug: 'bs-nutrition-exercise-sciences',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Nursing & Healthcare',
      durationYears: 4,
      tuitionFeePerYear: 'USD 20,000/year',
      description:
        `Combines nutritional science and kinesiology for careers in health promotion, dietetics, and sports performance in New York\\'s healthcare sector.`,
    },
  ],
  scholarships: [
    {
      name: 'CUNY International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 2,000–5,000/year',
      description:
        'Merit-based scholarship for academically outstanding international students admitted to Queens College; renewable annually with GPA maintenance.',
    },
  ],
  admissionSteps: [],
}

// ─── 13. AVILA UNIVERSITY ─────────────────────────────────────────────────────
export const AVILA_UNIVERSITY = {
  name: 'Avila University',
  slug: 'avila-university',
  city: 'Kansas City, MO',
  foundedYear: 1916,
  ranking: null,
  totalStudents: 1800,
  internationalStudents: 0.08,
  acceptanceRate: 0.60,
  shortDescription:
    `Avila University is a small, values-driven Catholic liberal arts university in Kansas City offering personalized education with small class sizes and strong faculty mentorship. International students benefit from dedicated advising, close-knit campus community, and practical programs in business, nursing, and education that connect to Kansas City\\'s growing professional sector.`,
  tuitionFeeMin: 30000,
  tuitionFeeMax: 34000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Business Administration',
      slug: 'bs-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 32,000/year',
      description:
        `ACBSP-accredited business program with concentrations in management, marketing, and finance, enhanced by Kansas City\\'s dynamic business community.`,
    },
    {
      name: 'Bachelor of Science in Nursing',
      slug: 'bs-nursing',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Nursing & Healthcare',
      durationYears: 4,
      tuitionFeePerYear: 'USD 32,000/year',
      description:
        'CCNE-accredited BSN program with clinical placements at major Kansas City health systems, preparing graduates to sit the NCLEX-RN examination.',
    },
    {
      name: 'Bachelor of Arts in Education',
      slug: 'ba-education',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Education',
      durationYears: 4,
      tuitionFeePerYear: 'USD 32,000/year',
      description:
        'Missouri state-approved teacher certification program offering elementary and secondary education tracks with supervised student teaching experiences.',
    },
    {
      name: 'Bachelor of Science in Psychology',
      slug: 'bs-psychology',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Social Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'USD 32,000/year',
      description:
        'Comprehensive psychology curriculum covering clinical, developmental, and organizational psychology with research and practicum components.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 34,000/year',
      description:
        'Flexible MBA program with concentrations in healthcare management and leadership, offered with evening and online options for working professionals.',
    },
    {
      name: 'Master of Arts in Counseling Psychology',
      slug: 'ma-counseling-psychology',
      degreeLevel: DegreeType.MASTER,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'USD 34,000/year',
      description:
        'Graduate counseling program providing clinical training and supervised practicum hours toward Missouri licensure as a professional counselor.',
    },
  ],
  scholarships: [
    {
      name: 'Avila University International Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 5,000–15,000/year',
      description:
        'Renewable merit scholarship for international undergraduate students based on academic achievement; amount determined at admission.',
    },
  ],
  admissionSteps: [],
}

// ─── 14. HERZING UNIVERSITY ───────────────────────────────────────────────────
export const HERZING_UNIVERSITY = {
  name: 'Herzing University',
  slug: 'herzing-university',
  city: 'Milwaukee, WI',
  foundedYear: 1965,
  ranking: null,
  totalStudents: 6500,
  internationalStudents: 0.06,
  acceptanceRate: 0.70,
  shortDescription:
    'Herzing University is a career-focused private institution with campuses in Wisconsin, Minnesota, Alabama, and other states, specializing in healthcare, business, and technology programs designed for rapid career entry. With flexible scheduling, accelerated pathways, and strong employer partnerships in the healthcare sector, Herzing is a practical choice for international students seeking professional credentials in high-demand US fields.',
  tuitionFeeMin: 13000,
  tuitionFeeMax: 16000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, May, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Nursing',
      slug: 'bs-nursing',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Nursing & Healthcare',
      durationYears: 4,
      tuitionFeePerYear: 'USD 15,000/year',
      description:
        `ACEN-accredited BSN program with strong clinical placements in Wisconsin\\'s major hospital systems, designed to prepare students for NCLEX-RN licensure.`,
    },
    {
      name: 'Bachelor of Science in Business Administration',
      slug: 'bs-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 14,000/year',
      description:
        'Practical business program with concentrations in management, healthcare management, and human resources emphasizing job-ready skills.',
    },
    {
      name: 'Bachelor of Science in Information Technology',
      slug: 'bs-information-technology',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 14,000/year',
      description:
        'IT degree covering networking, cybersecurity, database administration, and software development with industry certification preparation.',
    },
    {
      name: 'Bachelor of Science in Healthcare Management',
      slug: 'bs-healthcare-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Nursing & Healthcare',
      durationYears: 4,
      tuitionFeePerYear: 'USD 14,000/year',
      description:
        'Combines healthcare fundamentals with business management skills for administrative careers in hospitals, clinics, and health insurance organizations.',
    },
    {
      name: 'Master of Science in Nursing',
      slug: 'ms-nursing',
      degreeLevel: DegreeType.MASTER,
      field: 'Nursing & Healthcare',
      durationYears: 2,
      tuitionFeePerYear: 'USD 16,000/year',
      description:
        'Graduate nursing program offering nurse practitioner and nursing education tracks for RNs seeking advanced clinical or academic careers.',
    },
    {
      name: 'Associate of Applied Science in Medical Assisting',
      slug: 'aas-medical-assisting',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Nursing & Healthcare',
      durationYears: 2,
      tuitionFeePerYear: 'USD 13,000/year',
      description:
        'Clinical and administrative medical assisting program preparing students for CMA certification and immediate employment in physician offices and clinics.',
    },
  ],
  scholarships: [
    {
      name: 'Herzing University Academic Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 2,000–6,000/year',
      description:
        'Merit-based scholarship for incoming students with strong academic records; renewable each academic year with satisfactory GPA.',
    },
  ],
  admissionSteps: [],
}

// ─── 15. UNIVERSITY OF LYNCHBURG ─────────────────────────────────────────────
export const UNIVERSITY_OF_LYNCHBURG = {
  name: 'University of Lynchburg',
  slug: 'university-of-lynchburg',
  city: 'Lynchburg, VA',
  foundedYear: 1903,
  ranking: null,
  totalStudents: 2800,
  internationalStudents: 0.05,
  acceptanceRate: 0.72,
  shortDescription:
    `The University of Lynchburg is a private liberal arts institution nestled in Virginia\\'s Blue Ridge Mountains, offering a personalized undergraduate and graduate education in a close-knit campus setting. With distinctive programs in health sciences, business, and education and a strong commitment to student success, Lynchburg provides international students with individual attention and real-world experiential learning.`,
  tuitionFeeMin: 38000,
  tuitionFeeMax: 42000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Business Administration',
      slug: 'bs-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 40,000/year',
      description:
        'ACBSP-accredited business program with concentrations in management, marketing, finance, and sport management, featuring practical projects with regional businesses.',
    },
    {
      name: 'Bachelor of Science in Health Sciences',
      slug: 'bs-health-sciences',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Nursing & Healthcare',
      durationYears: 4,
      tuitionFeePerYear: 'USD 40,000/year',
      description:
        'Prepares students for healthcare careers or graduate professional programs in medicine, physical therapy, or public health through rigorous science coursework.',
    },
    {
      name: 'Bachelor of Arts in Education',
      slug: 'ba-education',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Education',
      durationYears: 4,
      tuitionFeePerYear: 'USD 40,000/year',
      description:
        'Virginia state teacher preparation program with PK-12 specialization options and embedded student teaching in local schools.',
    },
    {
      name: 'Bachelor of Science in Environmental Science',
      slug: 'bs-environmental-science',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Natural Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'USD 40,000/year',
      description:
        `Fieldwork-intensive environmental science program leveraging Lynchburg\\'s unique natural setting in the Appalachian foothills for ecology and sustainability studies.`,
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 42,000/year',
      description:
        'Accelerated MBA program with online and hybrid delivery options, covering strategic management, financial analysis, and organizational leadership.',
    },
    {
      name: 'Doctor of Physical Therapy',
      slug: 'dpt-physical-therapy',
      degreeLevel: DegreeType.PHD,
      field: 'Nursing & Healthcare',
      durationYears: 3,
      tuitionFeePerYear: 'USD 42,000/year',
      description:
        'CAPTE-accredited three-year DPT program with extensive clinical rotations across Virginia healthcare facilities, preparing graduates for licensure.',
    },
    {
      name: 'Master of Education in Curriculum and Instruction',
      slug: 'med-curriculum-instruction',
      degreeLevel: DegreeType.MASTER,
      field: 'Education',
      durationYears: 2,
      tuitionFeePerYear: 'USD 42,000/year',
      description:
        'Graduate education program for licensed teachers seeking advanced knowledge in instructional design, curriculum development, and educational leadership.',
    },
  ],
  scholarships: [
    {
      name: 'Lynchburg International Merit Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 10,000–18,000/year',
      description:
        'Competitive renewable scholarship for international undergraduate applicants demonstrating strong academic achievement and leadership potential.',
    },
  ],
  admissionSteps: [],
}

// ─── 16. WEBSTER UNIVERSITY ───────────────────────────────────────────────────
export const WEBSTER_UNIVERSITY = {
  name: 'Webster University',
  slug: 'webster-university',
  city: 'Webster Groves, MO',
  foundedYear: 1915,
  ranking: null,
  totalStudents: 9500,
  internationalStudents: 0.14,
  acceptanceRate: 0.65,
  shortDescription:
    'Webster University is a globally connected private institution with campuses across the United States, Europe, Asia, and Africa, offering international students a genuinely global education experience. Known for its strong programs in business, communication, fine arts, and international relations, Webster combines professional curricula with a welcoming multicultural community on its historic Webster Groves, Missouri home campus.',
  tuitionFeeMin: 28000,
  tuitionFeeMax: 32000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Business Administration',
      slug: 'bs-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 29,000/year',
      description:
        'AACSB-accredited business program with concentrations in finance, management, international business, and human resources management.',
    },
    {
      name: 'Bachelor of Arts in Media Communications',
      slug: 'ba-media-communications',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Media & Communications',
      durationYears: 4,
      tuitionFeePerYear: 'USD 29,000/year',
      description:
        `Comprehensive media program covering journalism, advertising, public relations, and digital media production in Webster\\'s professional-quality studios.`,
    },
    {
      name: 'Bachelor of Fine Arts',
      slug: 'bfa-fine-arts',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Arts & Design',
      durationYears: 4,
      tuitionFeePerYear: 'USD 29,000/year',
      description:
        `Studio art and design program with specializations in graphic design, studio art, and digital media, benefiting from Webster\\'s global arts community.`,
    },
    {
      name: 'Bachelor of Arts in International Relations',
      slug: 'ba-international-relations',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Social Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'USD 29,000/year',
      description:
        'Prepares students for careers in diplomacy, international organizations, and global NGOs through study of political science, economics, and regional studies.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 32,000/year',
      description:
        `AACSB-accredited MBA with international business focus, offered across Webster\\'s global campus network for a truly cross-border learning experience.`,
    },
    {
      name: 'Master of Arts in Media Communications',
      slug: 'ma-media-communications',
      degreeLevel: DegreeType.MASTER,
      field: 'Media & Communications',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 32,000/year',
      description:
        'Graduate media program focusing on global communications strategy, digital media management, and media leadership in multicultural contexts.',
    },
    {
      name: 'Master of Arts in International Relations',
      slug: 'ma-international-relations',
      degreeLevel: DegreeType.MASTER,
      field: 'Social Sciences',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 32,000/year',
      description:
        `Advanced study of global political economy, conflict resolution, and international law, with opportunities to study at Webster\\'s European campuses.`,
    },
    {
      name: 'Bachelor of Music',
      slug: 'bmus',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Arts & Design',
      durationYears: 4,
      tuitionFeePerYear: 'USD 29,000/year',
      description:
        `Professional music degree with performance, composition, and music business tracks in Webster\\'s fully equipped Loretto-Hilton Center for the Performing Arts.`,
    },
  ],
  scholarships: [
    {
      name: 'Webster University Global Citizenship Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 5,000–12,000/year',
      description:
        'Merit-based scholarship for international undergraduate students reflecting academic achievement and commitment to global civic engagement.',
    },
  ],
  admissionSteps: [],
}

// ─── 17. UNIVERSITY OF BRIDGEPORT ─────────────────────────────────────────────
export const UNIVERSITY_OF_BRIDGEPORT = {
  name: 'University of Bridgeport',
  slug: 'university-of-bridgeport',
  city: 'Bridgeport, CT',
  foundedYear: 1927,
  ranking: null,
  totalStudents: 5000,
  internationalStudents: 0.22,
  acceptanceRate: 0.68,
  shortDescription:
    'The University of Bridgeport is a STEM-focused private university in Connecticut offering strong engineering, computer science, and business programs to a highly international student population. With one of the highest international student enrollment ratios in New England, UB provides a global campus environment, OPT and STEM extension eligibility, and programs accredited by ABET and AACSB.',
  tuitionFeeMin: 32000,
  tuitionFeeMax: 36000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bs-computer-science',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 34,000/year',
      description:
        'ABET-accredited CS program covering software engineering, algorithms, data science, and cybersecurity with strong industry connections in the Connecticut-New York tech corridor.',
    },
    {
      name: 'Bachelor of Science in Electrical Engineering',
      slug: 'bs-electrical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 34,000/year',
      description:
        'ABET-accredited EE program with specializations in power systems, communications, and embedded systems, with access to advanced electronics laboratories.',
    },
    {
      name: 'Bachelor of Science in Mechanical Engineering',
      slug: 'bs-mechanical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 34,000/year',
      description:
        'ABET-accredited ME program covering thermodynamics, fluid mechanics, robotics, and manufacturing with design capstone projects.',
    },
    {
      name: 'Bachelor of Science in Business Administration',
      slug: 'bs-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 34,000/year',
      description:
        'Undergraduate business degree with concentrations in international business, finance, management information systems, and marketing.',
    },
    {
      name: 'Master of Science in Computer Science',
      slug: 'ms-computer-science',
      degreeLevel: DegreeType.MASTER,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'STEM-designated MS program in advanced computing covering machine learning, cloud computing, cybersecurity, and distributed systems — eligible for 3-year OPT extension.',
    },
    {
      name: 'Master of Science in Engineering',
      slug: 'ms-engineering',
      degreeLevel: DegreeType.MASTER,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'STEM-designated graduate engineering program with tracks in electrical, mechanical, and industrial engineering; qualifies for 36-month OPT STEM extension.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'ACBSP-accredited MBA with specializations in global management, technology management, and healthcare management for career-ready international graduates.',
    },
    {
      name: 'Bachelor of Science in Computer Engineering',
      slug: 'bs-computer-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 34,000/year',
      description:
        'Bridges hardware and software engineering with coursework in digital systems, embedded processors, VLSI design, and computer architecture.',
    },
  ],
  scholarships: [
    {
      name: 'UB International Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 5,000–15,000/year',
      description:
        'Renewable scholarship for academically qualified international students; amount varies based on GPA and academic record at admission.',
    },
    {
      name: 'UB STEM Excellence Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 8,000–15,000/year',
      description:
        'Additional merit award specifically for international students enrolling in STEM (engineering, computer science) programs with outstanding academic profiles.',
    },
  ],
  admissionSteps: [],
}

// ─── 18. WASHINGTON STATE UNIVERSITY ─────────────────────────────────────────
export const WASHINGTON_STATE_UNIVERSITY = {
  name: 'Washington State University',
  slug: 'washington-state-university',
  city: 'Pullman, WA',
  foundedYear: 1890,
  ranking: 601,
  totalStudents: 32000,
  internationalStudents: 0.10,
  acceptanceRate: 0.77,
  shortDescription:
    `Washington State University is Washington State\\'s land-grant flagship research university, ranked in the QS World University Rankings and known for excellence in agriculture, veterinary medicine, engineering, and business. WSU\\'s Pullman campus offers a classic American university experience with Division I athletics, a vibrant campus life, and cutting-edge research facilities, while its global campus and online programs provide flexible access for international students.`,
  tuitionFeeMin: 27000,
  tuitionFeeMax: 30000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bs-computer-science',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        'ABET-accredited CS program with research opportunities in AI, software engineering, and human-computer interaction at a flagship research university.',
    },
    {
      name: 'Bachelor of Science in Electrical Engineering',
      slug: 'bs-electrical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        `ABET-accredited EE program covering power systems, signal processing, and embedded systems with access to WSU\\'s nationally recognized engineering research centers.`,
    },
    {
      name: 'Bachelor of Science in Mechanical Engineering',
      slug: 'bs-mechanical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        'Comprehensive mechanical engineering curriculum with capstone design projects and access to state-of-the-art fabrication and robotics labs.',
    },
    {
      name: 'Bachelor of Arts in Business Administration',
      slug: 'ba-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        'AACSB-accredited Carson College of Business program with concentrations in finance, marketing, management information systems, and international business.',
    },
    {
      name: 'Bachelor of Science in Data Analytics',
      slug: 'bs-data-analytics',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        'Interdisciplinary STEM degree combining statistics, computing, and domain knowledge for careers in data science and analytics at regional and national employers.',
    },
    {
      name: 'Bachelor of Science in Nursing',
      slug: 'bs-nursing',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Nursing & Healthcare',
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        'CCNE-accredited nursing program with simulation laboratories and clinical placements across Washington State health systems.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'AACSB-accredited MBA with online and residential tracks, offering specializations in finance, operations, and healthcare management.',
    },
    {
      name: 'Master of Science in Computer Science',
      slug: 'ms-computer-science',
      degreeLevel: DegreeType.MASTER,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'Research-oriented or professional MS in CS covering machine learning, distributed computing, and software engineering with STEM OPT eligibility.',
    },
    {
      name: 'Master of Science in Electrical Engineering',
      slug: 'ms-electrical-engineering',
      degreeLevel: DegreeType.MASTER,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'Research and coursework MS tracks in power, signals, and systems engineering, with access to NSF-funded research labs on the Pullman campus.',
    },
    {
      name: 'Bachelor of Science in Chemical Engineering',
      slug: 'bs-chemical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        `ABET-accredited ChemE program with strengths in bioprocessing, sustainable energy, and materials science leveraging WSU\\'s nationally ranked research in those areas.`,
    },
  ],
  scholarships: [
    {
      name: 'WSU International Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 3,000–8,000/year',
      description:
        'Renewable merit scholarship for incoming international undergraduate students based on academic record; students are automatically considered at admission.',
    },
    {
      name: 'WSU Global Ambassador Scholarship',
      type: ScholarshipType.PARTIAL,
      value: 'USD 2,000–4,000/year',
      description:
        `Awarded to international students who demonstrate leadership and intercultural engagement, supporting WSU\\'s global campus community.`,
    },
  ],
  admissionSteps: [],
}

// ─── 19. WILLIAM JESSUP UNIVERSITY ───────────────────────────────────────────
export const WILLIAM_JESSUP_UNIVERSITY = {
  name: 'William Jessup University',
  slug: 'william-jessup-university',
  city: 'Rocklin, CA',
  foundedYear: 1939,
  ranking: null,
  totalStudents: 1800,
  internationalStudents: 0.04,
  acceptanceRate: 0.62,
  shortDescription:
    'William Jessup University is a small, WASC-accredited Christian liberal arts university in Rocklin, California — part of the greater Sacramento region. Offering a values-centered education in a supportive faith-based environment, WJU provides personalized mentorship and strong programs in business, education, ministry, and psychology for students seeking integrative liberal arts training in Northern California.',
  tuitionFeeMin: 34000,
  tuitionFeeMax: 38000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Arts in Business Administration',
      slug: 'ba-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'Business administration program integrating ethical leadership, management, marketing, and entrepreneurship in a values-driven learning environment.',
    },
    {
      name: 'Bachelor of Arts in Education',
      slug: 'ba-education',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Education',
      durationYears: 4,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'California Commission on Teacher Credentialing-approved program preparing students for Multiple Subject and Single Subject teaching credentials.',
    },
    {
      name: 'Bachelor of Arts in Ministry Leadership',
      slug: 'ba-ministry-leadership',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Theology & Ministry',
      durationYears: 4,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'Equips students for pastoral ministry, nonprofit leadership, and faith-based community service through theological studies and practical field experience.',
    },
    {
      name: 'Bachelor of Arts in Psychology',
      slug: 'ba-psychology',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Social Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'Integrates psychological science with Christian worldview, preparing students for graduate study in counseling, clinical psychology, or human services.',
    },
    {
      name: 'Bachelor of Arts in Communication',
      slug: 'ba-communication',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Media & Communications',
      durationYears: 4,
      tuitionFeePerYear: 'USD 36,000/year',
      description:
        'Media production, journalism, and strategic communication program with modern studio facilities and internship connections in the Sacramento media market.',
    },
    {
      name: 'Master of Arts in Teaching',
      slug: 'mat',
      degreeLevel: DegreeType.MASTER,
      field: 'Education',
      durationYears: 2,
      tuitionFeePerYear: 'USD 38,000/year',
      description:
        'California-approved teacher preparation graduate program leading to multiple subject teaching credentials for elementary education.',
    },
  ],
  scholarships: [
    {
      name: 'WJU International Student Merit Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 5,000–12,000/year',
      description:
        'Competitive renewable merit scholarship for international undergraduate students demonstrating strong academic achievement at time of admission.',
    },
  ],
  admissionSteps: [],
}

// ─── 20. STONY BROOK UNIVERSITY ───────────────────────────────────────────────
export const STONY_BROOK_UNIVERSITY = {
  name: 'Stony Brook University',
  slug: 'stony-brook-university',
  city: 'Stony Brook, NY',
  foundedYear: 1957,
  ranking: 368,
  totalStudents: 26700,
  internationalStudents: 0.20,
  acceptanceRate: 0.48,
  shortDescription:
    'Stony Brook University is a flagship SUNY research university ranked in the QS World University Rankings top 400 and a member of the prestigious Association of American Universities. Renowned for its medical school, STEM programs, and research enterprise exceeding $250 million annually, SBU attracts one of the largest international student populations in New York State and offers strong STEM OPT extension eligibility across dozens of graduate programs.',
  tuitionFeeMin: 29000,
  tuitionFeeMax: 35000,
  tuitionCurrency: 'USD',
  intakeMonths: 'January, August',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bs-computer-science',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'Highly ranked CS program with research connections to Brookhaven National Laboratory and Cold Spring Harbor Laboratory, covering algorithms, AI, systems, and software engineering.',
    },
    {
      name: 'Bachelor of Science in Electrical Engineering',
      slug: 'bs-electrical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'ABET-accredited electrical and computer engineering program with strong research opportunities in photonics, power electronics, and wireless communications.',
    },
    {
      name: 'Bachelor of Science in Applied Mathematics and Statistics',
      slug: 'bs-applied-mathematics-statistics',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Mathematics & Statistics',
      durationYears: 4,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'Quantitative program blending mathematics, statistics, and computing, ideal for careers in data science, finance, and actuarial science.',
    },
    {
      name: 'Bachelor of Science in Biochemistry',
      slug: 'bs-biochemistry',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Natural Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'Pre-medical and research-oriented biochemistry program with access to world-class Stony Brook School of Medicine research facilities and clinical exposure.',
    },
    {
      name: 'Bachelor of Business Administration',
      slug: 'bba',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        'College of Business undergraduate program with concentrations in accounting, finance, management, and marketing, leveraging proximity to New York City financial markets.',
    },
    {
      name: 'Master of Science in Computer Science',
      slug: 'ms-computer-science',
      degreeLevel: DegreeType.MASTER,
      field: 'Computer Science & IT',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 35,000/year',
      description:
        'STEM-designated MS offering specializations in AI, data science, systems, and security; qualifies for 36-month OPT STEM extension for career development in the US.',
    },
    {
      name: 'Master of Science in Data Science',
      slug: 'ms-data-science',
      degreeLevel: DegreeType.MASTER,
      field: 'Computer Science & IT',
      durationYears: 1.5,
      tuitionFeePerYear: 'USD 35,000/year',
      description:
        'Interdisciplinary STEM graduate program combining machine learning, statistics, and big data engineering at one of the top public research universities in the US.',
    },
    {
      name: 'Master of Science in Electrical Engineering',
      slug: 'ms-electrical-engineering',
      degreeLevel: DegreeType.MASTER,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 35,000/year',
      description:
        'Graduate EE program with thesis and non-thesis options and research collaborations with Brookhaven National Laboratory in photonics and quantum computing.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 35,000/year',
      description:
        `Stony Brook MBA offering STEM-adjacent specializations in technology management and business analytics, positioned for New York\\'s competitive job market.`,
    },
    {
      name: 'Bachelor of Science in Mechanical Engineering',
      slug: 'bs-mechanical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 30,000/year',
      description:
        `ABET-accredited ME program with capstone design in aerospace, robotics, and sustainable energy supported by Stony Brook\\'s advanced engineering research centers.`,
    },
  ],
  scholarships: [
    {
      name: 'SBU International Undergraduate Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 3,000–8,000/year',
      description:
        'Renewable merit scholarship for incoming international undergraduate students; automatic consideration based on academic record submitted at admission.',
    },
    {
      name: 'SUNY Diversity Scholarship',
      type: ScholarshipType.PARTIAL,
      value: 'USD 2,000–5,000/year',
      description:
        'SUNY system award supporting diverse international students enrolled at Stony Brook University with demonstrated academic merit.',
    },
  ],
  admissionSteps: [],
}

// ─── 21. RENSSELAER POLYTECHNIC INSTITUTE ─────────────────────────────────────
export const RENSSELAER_POLYTECHNIC_INSTITUTE = {
  name: 'Rensselaer Polytechnic Institute',
  slug: 'rensselaer-polytechnic-institute',
  city: 'Troy, NY',
  foundedYear: 1824,
  ranking: 414,
  totalStudents: 7900,
  internationalStudents: 0.22,
  acceptanceRate: 0.53,
  shortDescription:
    `Rensselaer Polytechnic Institute is America\\'s oldest private technological research university, consistently ranked among the world\\'s top engineering and science institutions in the QS World University Rankings. RPI\\'s rigorous programs in engineering, computer science, architecture, and management — combined with its $3 billion endowment and research enterprise, IBM and GE partnerships, and entrepreneurial culture in the heart of New York\\'s Capital Region — make it a premier destination for internationally ambitious STEM students.`,
  tuitionFeeMin: 59000,
  tuitionFeeMax: 62000,
  tuitionCurrency: 'USD',
  intakeMonths: 'August',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bs-computer-science',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        `One of the nation\\'s most respected CS programs, covering algorithms, AI, machine learning, software engineering, and systems with research access to IBM and leading tech partners.`,
    },
    {
      name: 'Bachelor of Science in Electrical Engineering',
      slug: 'bs-electrical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        `ABET-accredited EE program with specializations in power systems, microelectronics, photonics, and communications, supported by RPI\\'s Lighting Research Center and semiconductor fabs.`,
    },
    {
      name: 'Bachelor of Science in Mechanical, Aerospace, and Nuclear Engineering',
      slug: 'bs-mechanical-aerospace-nuclear-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        `Combines mechanical, aerospace, and nuclear engineering fundamentals with laboratory and research opportunities in RPI\\'s world-class engineering facilities.`,
    },
    {
      name: 'Bachelor of Science in Chemical Engineering',
      slug: 'bs-chemical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        `ABET-accredited ChemE program with strengths in bioprocessing, nanotechnology, and sustainable energy leveraging RPI\\'s Center for Biotechnology and Interdisciplinary Studies.`,
    },
    {
      name: 'Bachelor of Architecture',
      slug: 'b-arch',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Architecture & Design',
      durationYears: 5,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        'NAAB-accredited five-year professional architecture degree combining design studio, engineering, digital fabrication, and sustainability in one of the oldest architecture programs in the US.',
    },
    {
      name: 'Bachelor of Science in Management',
      slug: 'bs-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        'Lally School of Management STEM-integrated business degree combining finance, analytics, entrepreneurship, and technology management — unique in its scientific and quantitative rigor.',
    },
    {
      name: 'Bachelor of Science in Biomedical Engineering',
      slug: 'bs-biomedical-engineering',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        'Interdisciplinary biomedical engineering program bridging life sciences and engineering, with research ties to Albany Medical College and advanced biomaterials labs.',
    },
    {
      name: 'Master of Science in Computer Science',
      slug: 'ms-computer-science',
      degreeLevel: DegreeType.MASTER,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'USD 62,000/year',
      description:
        'Research or professional STEM-designated MS covering AI, data science, cybersecurity, and distributed systems; qualifies for 36-month OPT STEM extension.',
    },
    {
      name: 'Master of Science in Electrical Engineering',
      slug: 'ms-electrical-engineering',
      degreeLevel: DegreeType.MASTER,
      field: 'Engineering',
      durationYears: 2,
      tuitionFeePerYear: 'USD 62,000/year',
      description:
        'Research-intensive graduate EE program with thesis and coursework options in power electronics, photonics, VLSI, and RF communications.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'USD 62,000/year',
      description:
        'Lally School STEM-infused MBA combining data analytics, technology strategy, and entrepreneurship for careers at the intersection of business and engineering.',
    },
    {
      name: 'Doctor of Philosophy in Computer Science',
      slug: 'phd-computer-science',
      degreeLevel: DegreeType.PHD,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'USD 62,000/year',
      description:
        'Fully funded research PhD with world-class faculty in AI, HCI, systems, and theoretical computer science, with strong industry partnerships and US career pathways.',
    },
    {
      name: 'Doctor of Philosophy in Electrical Engineering',
      slug: 'phd-electrical-engineering',
      degreeLevel: DegreeType.PHD,
      field: 'Engineering',
      durationYears: 4,
      tuitionFeePerYear: 'USD 62,000/year',
      description:
        `Research doctorate with access to RPI\\'s Center for Future Energy Systems and Micro and Nano Fabrication Center, producing graduates for leading research and industry roles.`,
    },
  ],
  scholarships: [
    {
      name: 'RPI Rensselaer Medal Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 30,000/year',
      description:
        'Prestigious renewable merit scholarship awarded to exceptional high school students (including international applicants) who demonstrate outstanding achievement in mathematics and science.',
    },
    {
      name: 'RPI Leadership Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'USD 10,000–20,000/year',
      description:
        'Renewable scholarship for academically strong incoming undergraduate students, including international applicants, selected during the admissions review process.',
    },
  ],
  admissionSteps: [],
}

// ─── AGGREGATE EXPORT ─────────────────────────────────────────────────────────

export const USA_UNIVERSITIES = [
  DIABLO_VALLEY_COLLEGE,
  CONTRA_COSTA_COLLEGE,
  LOS_MEDANOS_COLLEGE,
  DE_ANZA_COLLEGE,
  FOOTHILL_COLLEGE,
  ORANGE_COAST_COLLEGE,
  GREEN_RIVER_COLLEGE,
  OHLONE_COLLEGE,
  TACOMA_COMMUNITY_COLLEGE,
  SANTA_MONICA_COLLEGE,
  WHATCOM_COMMUNITY_COLLEGE,
  QUEENS_COLLEGE_CUNY,
  AVILA_UNIVERSITY,
  HERZING_UNIVERSITY,
  UNIVERSITY_OF_LYNCHBURG,
  WEBSTER_UNIVERSITY,
  UNIVERSITY_OF_BRIDGEPORT,
  WASHINGTON_STATE_UNIVERSITY,
  WILLIAM_JESSUP_UNIVERSITY,
  STONY_BROOK_UNIVERSITY,
  RENSSELAER_POLYTECHNIC_INSTITUTE,
]
