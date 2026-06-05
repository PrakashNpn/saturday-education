import { DegreeType, Region, ScholarshipType } from '../../generated/client'

// ─── CANADA UNIVERSITIES & COLLEGES (PART 1) ─────────────────────────────────
// Institutions 1–24. All tuition figures are INTERNATIONAL student rates in CAD.

// ─── 1. NORTHERN COLLEGE ─────────────────────────────────────────────────────
export const NORTHERN_COLLEGE = {
  name: 'Northern College',
  slug: 'northern-college',
  city: 'Timmins, ON',
  foundedYear: 1967,
  ranking: null,
  totalStudents: 3500,
  internationalStudents: 0.12,
  acceptanceRate: 85,
  shortDescription:
    'Northern College is a public college in northeastern Ontario offering career-focused diploma and certificate programs in mining technology, business, health sciences, and skilled trades. Known for small class sizes and strong industry connections, it provides international students with hands-on learning in one of Canada\'s most resource-rich regions.',
  tuitionFeeMin: 14000,
  tuitionFeeMax: 17000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-northern',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,500/year',
      description:
        'Covers accounting, marketing, human resources, and entrepreneurship, equipping graduates for careers in business and management across Northern Ontario\'s diverse economy.',
    },
    {
      name: 'Mining Engineering Technology',
      slug: 'mining-engineering-technology',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering & Technology',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,500/year',
      description:
        'Industry-linked program covering mine design, safety legislation, surveying, and underground/surface mining operations. Strong job placement in the Timmins and broader Ontario mining sector.',
    },
    {
      name: 'Early Childhood Education',
      slug: 'early-childhood-education-northern',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Education',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description:
        'Prepares graduates to support children\'s development in licensed childcare centres, family resource programs, and school-age care settings across Ontario.',
    },
    {
      name: 'Computer Systems Technician',
      slug: 'computer-systems-technician-northern',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,000/year',
      description:
        'Practical program covering networking, cybersecurity fundamentals, cloud computing, and systems administration, preparing graduates for IT support and infrastructure roles.',
    },
    {
      name: 'Personal Support Worker',
      slug: 'personal-support-worker-northern',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'Health Sciences',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 14,000/year',
      description:
        'One-year certificate program training students to provide personal care and support to individuals in hospitals, long-term care facilities, and community settings.',
    },
  ],
  scholarships: [
    {
      name: 'Northern College International Entrance Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 1,000',
      description:
        'Awarded to high-achieving international students upon acceptance into a full-time diploma program at Northern College.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application via ontariocolleges.ca',
      description:
        'Apply online through the Ontario Colleges application portal, selecting your program of choice at Northern College.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic Documents & English Proof',
      description:
        'Submit official transcripts and English language test results (IELTS 6.0 overall or equivalent) to the admissions office.',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer and Pay Deposit',
      description:
        'Accept your conditional or unconditional offer of admission and pay the enrollment deposit to secure your seat.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Use your Letter of Acceptance to apply for a Canadian Student Visa (Study Permit) through IRCC at least 8 weeks before your start date.',
    },
  ],
}

// ─── 2. SENECA COLLEGE ───────────────────────────────────────────────────────
export const SENECA_COLLEGE = {
  name: 'Seneca Polytechnic',
  slug: 'seneca-college',
  city: 'Toronto, ON',
  foundedYear: 1967,
  ranking: null,
  totalStudents: 40000,
  internationalStudents: 0.38,
  acceptanceRate: 80,
  shortDescription:
    'Seneca Polytechnic (formerly Seneca College) is one of Canada\'s largest polytechnics, offering over 300 career-focused programs across business, technology, creative arts, health, and engineering. With multiple campuses across the Greater Toronto Area and strong industry partnerships, Seneca is among the most internationally recognized colleges in Canada.',
  tuitionFeeMin: 15000,
  tuitionFeeMax: 22000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-seneca',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 17,500/year',
      description:
        'Comprehensive three-year advanced diploma covering accounting, marketing, operations, and entrepreneurship, with co-op work terms available for real-world experience.',
    },
    {
      name: 'Computer Programming & Analysis',
      slug: 'computer-programming-analysis-seneca',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 19,500/year',
      description:
        'Advanced diploma program in software development covering Java, Python, web technologies, databases, and systems analysis — one of Seneca\'s most popular technology programs.',
    },
    {
      name: 'Aviation Technology — Flight',
      slug: 'aviation-technology-flight',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering & Technology',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 21,000/year',
      description:
        'Trains students for a commercial pilot career with Transport Canada-approved flight training, ground school, and instrument/multi-engine ratings at Seneca\'s Buttonville campus.',
    },
    {
      name: 'Supply Chain Management',
      slug: 'supply-chain-management-seneca',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Focuses on logistics, procurement, inventory management, and global supply chain operations, aligning with CITT and PMAC professional certifications.',
    },
    {
      name: 'Practical Nursing',
      slug: 'practical-nursing-seneca',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Health Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'Prepares graduates to write the NCLEX-PN exam and work as Registered Practical Nurses in hospitals, long-term care homes, and community health settings across Ontario.',
    },
    {
      name: 'Honours Bachelor of Commerce — Business Management',
      slug: 'bachelor-commerce-business-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'A four-year honours degree program delivered at Seneca with university-level accreditation, covering strategic management, finance, and organizational leadership.',
    },
  ],
  scholarships: [
    {
      name: 'Seneca International Student Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Recognizes academic achievement among incoming international students with a minimum 80% average in their final year of secondary or post-secondary study.',
    },
    {
      name: 'Seneca Polytechnic Entrance Bursary',
      type: ScholarshipType.PARTIAL,
      value: 'CAD 1,000',
      description:
        'Financial assistance award for international students demonstrating strong academic standing, applied directly to tuition in the first semester.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via ontariocolleges.ca',
      description:
        'Submit your application through the Ontario Colleges portal. Seneca accepts applications year-round for September, January, and May intakes.',
    },
    {
      stepNumber: 2,
      title: 'Submit Documents',
      description:
        'Provide certified academic transcripts and English test results (IELTS 6.0–6.5 depending on program). Some programs require a portfolio or interview.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Deposit',
      description:
        'Accept your offer on ontariocolleges.ca and pay the CAD 500 international deposit to confirm enrollment.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Apply for a Canadian Study Permit using your Seneca Letter of Acceptance. Apply at least 8–12 weeks before your program start date.',
    },
  ],
}

// ─── 3. COLUMBIA COLLEGE ─────────────────────────────────────────────────────
export const COLUMBIA_COLLEGE = {
  name: 'Columbia College',
  slug: 'columbia-college-vancouver',
  city: 'Vancouver, BC',
  foundedYear: 1936,
  ranking: null,
  totalStudents: 2500,
  internationalStudents: 0.70,
  acceptanceRate: 75,
  shortDescription:
    'Columbia College in Vancouver is a private liberal arts college offering university transfer programs and academic pathway courses recognized by UBC, SFU, and other leading Canadian universities. With a strong focus on academic preparation and student support, it is a preferred pathway for international students targeting top BC universities.',
  tuitionFeeMin: 16000,
  tuitionFeeMax: 20000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts',
      slug: 'associate-of-arts-columbia',
      degreeLevel: DegreeType.ASSOCIATE,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,000/year',
      description:
        'Two-year associate degree with course credits transferable to UBC, SFU, BCIT, and other BC institutions. Covers humanities, social sciences, and elective coursework.',
    },
    {
      name: 'Associate of Science',
      slug: 'associate-of-science-columbia',
      degreeLevel: DegreeType.ASSOCIATE,
      field: 'Natural Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'Science-focused associate degree with transferable first and second year credits in biology, chemistry, physics, and mathematics for pathways into UBC and SFU science faculties.',
    },
    {
      name: 'University Transfer Program — Business',
      slug: 'university-transfer-business-columbia',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'One-year preparatory pathway covering first-year commerce and economics courses transferable to SFU Beedie School of Business and UBC Sauder.',
    },
    {
      name: 'English for Academic Purposes (EAP)',
      slug: 'english-academic-purposes-columbia',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'English Language',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 16,500/year',
      description:
        'Intensive academic English preparation program designed to qualify students for direct entry into college and university programs without a standardized English test.',
    },
    {
      name: 'University Transfer Program — Sciences',
      slug: 'university-transfer-sciences-columbia',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Natural Sciences',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'Structured science transfer pathway covering calculus, chemistry, and biology equivalent to UBC and SFU first-year requirements.',
    },
  ],
  scholarships: [
    {
      name: 'Columbia College Merit Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Awarded to incoming international students with outstanding secondary or post-secondary academic records, applied toward first-semester tuition.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Apply directly on the Columbia College website. Applications are accepted for January, May, and September intakes.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic Transcripts & English Scores',
      description:
        'Submit official transcripts and English proficiency results (IELTS 6.5 for degree programs; EAP program available for lower scores).',
    },
    {
      stepNumber: 3,
      title: 'Receive Letter of Acceptance',
      description:
        'Once documents are assessed, Columbia College issues a Letter of Acceptance, which you will need for your Study Permit application.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Submit your Study Permit application to IRCC with the Letter of Acceptance and financial proof. Processing typically takes 6–10 weeks.',
    },
  ],
}

// ─── 4. CENTENNIAL COLLEGE ───────────────────────────────────────────────────
export const CENTENNIAL_COLLEGE = {
  name: 'Centennial College',
  slug: 'centennial-college',
  city: 'Toronto, ON',
  foundedYear: 1966,
  ranking: null,
  totalStudents: 29000,
  internationalStudents: 0.42,
  acceptanceRate: 78,
  shortDescription:
    'Centennial College is Ontario\'s first publicly funded college, recognized for its diverse student body and strong emphasis on equity and inclusion. Located across multiple Toronto campuses, it offers over 290 programs spanning business, engineering technology, health, media arts, and aviation, serving one of the largest international student populations of any Canadian college.',
  tuitionFeeMin: 14500,
  tuitionFeeMax: 21000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-centennial',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 16,500/year',
      description:
        'Advanced diploma covering financial accounting, marketing, operations management, and human resources, with co-op placement options and bridge pathways to bachelor\'s degrees.',
    },
    {
      name: 'Software Engineering Technology',
      slug: 'software-engineering-technology-centennial',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Advanced diploma in software development covering C++, Java, mobile development, databases, and agile methodologies — strong pathway into Toronto\'s tech industry.',
    },
    {
      name: 'Aviation — Flight',
      slug: 'aviation-flight-centennial',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering & Technology',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 20,500/year',
      description:
        'Transport Canada-approved commercial pilot training program with flight hours logged at Centennial\'s Peterborough airport campus.',
    },
    {
      name: 'Practical Nursing',
      slug: 'practical-nursing-centennial',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Health Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Prepares graduates to write NCLEX-PN and practice as RPNs across Ontario hospitals, long-term care facilities, and community health organizations.',
    },
    {
      name: 'Journalism',
      slug: 'journalism-centennial',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Media & Communications',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,500/year',
      description:
        'Practical journalism training covering print, broadcast, and digital media reporting, with industry placements at Toronto media organizations.',
    },
    {
      name: 'Supply Chain & Operations Management',
      slug: 'supply-chain-operations-centennial',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Covers procurement, logistics, inventory control, and global trade operations, aligned with CITT and APICS professional designations.',
    },
  ],
  scholarships: [
    {
      name: 'Centennial College International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,500',
      description:
        'Awarded to top-performing international applicants with a minimum 80% average in their final year of study, applied toward first semester tuition.',
    },
    {
      name: 'Centennial Access Bursary',
      type: ScholarshipType.PARTIAL,
      value: 'CAD 1,000',
      description:
        'Financial support bursary for international students demonstrating strong academic performance and financial need.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via ontariocolleges.ca',
      description:
        'Complete your application on the Ontario Colleges portal. Centennial accepts applications for September, January, and May intakes.',
    },
    {
      stepNumber: 2,
      title: 'Submit Required Documents',
      description:
        'Upload official academic transcripts and English proficiency scores (IELTS 6.0–6.5 depending on program). Some programs require additional submissions such as portfolios.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Deposit',
      description:
        'Accept your offer on the portal and pay the CAD 500 enrollment deposit to secure your place in the program.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your Letter of Acceptance to apply for a Canadian Study Permit through IRCC at least 8–12 weeks before the program start date.',
    },
  ],
}

// ─── 5. BRAEMAR COLLEGE ──────────────────────────────────────────────────────
export const BRAEMAR_COLLEGE = {
  name: 'Braemar College',
  slug: 'braemar-college',
  city: 'Vancouver, BC',
  foundedYear: 1968,
  ranking: null,
  totalStudents: 400,
  internationalStudents: 0.55,
  acceptanceRate: 80,
  shortDescription:
    'Braemar College is a boutique private prep school in Vancouver offering Grade 11–12 academic upgrading and university pathway programs for international students. With small class sizes and a personalized approach, Braemar helps students achieve the grades required for admission to Canada\'s top universities.',
  tuitionFeeMin: 18000,
  tuitionFeeMax: 24000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'University Pathway — Grade 12',
      slug: 'university-pathway-grade12-braemar',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Academic Preparation',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'Full-year Grade 12 BC curriculum program for international students targeting admission to UBC, SFU, UVic, and other Canadian universities. Covers required and elective subjects for university admission.',
    },
    {
      name: 'University Pathway — Grade 11 & 12',
      slug: 'university-pathway-grade11-12-braemar',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Academic Preparation',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 21,000/year',
      description:
        'Two-year secondary pathway covering BC Grade 11 and 12 curriculum, providing international students with a fully accredited Canadian high school diploma recognised by Canadian universities.',
    },
    {
      name: 'English Language & Academic Skills',
      slug: 'english-language-academic-skills-braemar',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'English Language',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Intensive English and study skills program for international students who need to strengthen their language proficiency before entering university pathway courses.',
    },
    {
      name: 'Academic Upgrading',
      slug: 'academic-upgrading-braemar',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'Academic Preparation',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 18,000/year',
      description:
        'Flexible upgrading program for students who need to improve grades in specific subjects such as Math, Chemistry, or English to meet university admission requirements.',
    },
  ],
  scholarships: [
    {
      name: 'Braemar Academic Achievement Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Merit-based award for international students demonstrating strong academic potential and commitment to their university pathway goals.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application to Braemar College',
      description:
        'Apply directly through the Braemar College website. Applications are accepted for September and January intakes.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic Records & English Assessment',
      description:
        'Submit transcripts from your home country and take a placement assessment in English and Math to determine the appropriate entry level.',
    },
    {
      stepNumber: 3,
      title: 'Receive Enrollment Offer',
      description:
        'Accept your offer and pay the enrollment deposit. Braemar\'s admissions team will guide you through the next steps.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your Letter of Acceptance to apply for a Canadian Study Permit through IRCC. As a private school student, you must apply at least 8 weeks before your start date.',
    },
  ],
}

// ─── 6. KINGSWAY ACADEMY ─────────────────────────────────────────────────────
export const KINGSWAY_ACADEMY = {
  name: 'Kingsway Academy',
  slug: 'kingsway-academy',
  city: 'Vancouver, BC',
  foundedYear: 1998,
  ranking: null,
  totalStudents: 300,
  internationalStudents: 0.65,
  acceptanceRate: 85,
  shortDescription:
    'Kingsway Academy is a private secondary school and academic pathway institution in Vancouver, BC, offering Grade 10–12 programs and university preparation pathways for international students. The academy\'s small class environment and dedicated ESL support make it popular among students from Asia seeking entry to Canadian universities.',
  tuitionFeeMin: 16000,
  tuitionFeeMax: 22000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Grade 12 University Preparation',
      slug: 'grade12-university-prep-kingsway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Academic Preparation',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 21,000/year',
      description:
        'BC-accredited Grade 12 program designed to prepare international students for admission to Canadian universities, with personalized course planning and application support.',
    },
    {
      name: 'Secondary School Completion Program',
      slug: 'secondary-school-completion-kingsway',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Academic Preparation',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'Two-year program covering BC Grades 11 and 12 curriculum, leading to a BC Dogwood diploma recognized by all Canadian post-secondary institutions.',
    },
    {
      name: 'English for Academic Purposes',
      slug: 'eap-kingsway',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'English Language',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Structured English language program building the reading, writing, and speaking skills needed for academic success in BC secondary and post-secondary programs.',
    },
    {
      name: 'STEM Enrichment Track',
      slug: 'stem-enrichment-kingsway',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'Natural Sciences',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Supplementary STEM-focused curriculum including advanced Mathematics, Physics, and Chemistry for students targeting engineering and science programs at BC universities.',
    },
  ],
  scholarships: [
    {
      name: 'Kingsway International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 1,500',
      description:
        'Awarded to incoming international students who demonstrate strong academic performance and receive admission to the Grade 12 University Preparation program.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online to Kingsway Academy',
      description:
        'Submit the online application form through the Kingsway Academy website. Rolling admissions for September and January intakes.',
    },
    {
      stepNumber: 2,
      title: 'Academic Assessment',
      description:
        'Provide secondary school transcripts in English translation. Students may be asked to complete a placement test in English and Mathematics.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Enrollment Deposit',
      description:
        'Once accepted, confirm your place by signing the enrollment contract and paying the required deposit.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your Letter of Acceptance from Kingsway to apply for a Canadian Study Permit via IRCC. Allow 6–10 weeks for processing.',
    },
  ],
}

// ─── 7. DOUGLAS COLLEGE ──────────────────────────────────────────────────────
export const DOUGLAS_COLLEGE = {
  name: 'Douglas College',
  slug: 'douglas-college',
  city: 'New Westminster, BC',
  foundedYear: 1970,
  ranking: null,
  totalStudents: 15000,
  internationalStudents: 0.30,
  acceptanceRate: 82,
  shortDescription:
    'Douglas College is a publicly funded college in Metro Vancouver offering university transfer programs, bachelor\'s degrees, and career diplomas in business, health sciences, technology, and the humanities. Its New Westminster and Coquitlam campuses sit on the SkyTrain network, making it easily accessible from across Greater Vancouver.',
  tuitionFeeMin: 14000,
  tuitionFeeMax: 20000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'University Transfer — Science',
      slug: 'university-transfer-science-douglas',
      degreeLevel: DegreeType.ASSOCIATE,
      field: 'Natural Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Two-year science associate credential with course credits fully transferable to SFU, UBC, and UVIC science programs including biology, chemistry, physics, and math.',
    },
    {
      name: 'Business Administration',
      slug: 'business-administration-douglas',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Diploma program covering accounting, marketing, management, and economics. Graduates may transfer credits toward a bachelor\'s degree at partner universities.',
    },
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-douglas',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'A four-year BBA program with specializations in accounting, marketing, and general management. Available on-campus in New Westminster.',
    },
    {
      name: 'Computing Science — University Transfer',
      slug: 'computing-science-university-transfer-douglas',
      degreeLevel: DegreeType.ASSOCIATE,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,500/year',
      description:
        'First and second year computing science courses transferable to SFU School of Computing Science and UBC Computer Science, covering algorithms, data structures, and programming.',
    },
    {
      name: 'Health Science — University Transfer',
      slug: 'health-science-university-transfer-douglas',
      degreeLevel: DegreeType.ASSOCIATE,
      field: 'Health Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,500/year',
      description:
        'Preparatory health science pathway with transferable credits toward nursing, kinesiology, and health administration programs at BC universities.',
    },
  ],
  scholarships: [
    {
      name: 'Douglas College International Student Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Awarded to international students entering university transfer or diploma programs with outstanding academic records from their home institution.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via EducationPlannerBC',
      description:
        'Submit your application through BC\'s Education Planner portal. Select Douglas College and your desired program. Applications are accepted for September and January starts.',
    },
    {
      stepNumber: 2,
      title: 'Submit Academic Documents',
      description:
        'Provide official transcripts and English test scores (IELTS 6.5 overall for most programs). Documents must be submitted directly to Douglas College\'s Registrar.',
    },
    {
      stepNumber: 3,
      title: 'Receive and Accept Offer',
      description:
        'Once assessed, you will receive a conditional or unconditional offer. Accept through the portal and pay the CAD 500 enrollment deposit.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Apply for your Canadian Study Permit using the Letter of Acceptance from Douglas College. IRCC processing typically takes 6–10 weeks.',
    },
  ],
}

// ─── 8. CRANDALL UNIVERSITY ───────────────────────────────────────────────────
export const CRANDALL_UNIVERSITY = {
  name: 'Crandall University',
  slug: 'crandall-university',
  city: 'Moncton, NB',
  foundedYear: 1949,
  ranking: null,
  totalStudents: 1000,
  internationalStudents: 0.10,
  acceptanceRate: 70,
  shortDescription:
    'Crandall University is a small Christian liberal arts university in Moncton, New Brunswick, offering bachelor\'s and master\'s programs in business, education, theology, and humanities. With low student-to-faculty ratios and a strong community ethos, Crandall provides a personalized university experience in bilingual Atlantic Canada.',
  tuitionFeeMin: 14500,
  tuitionFeeMax: 18000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-crandall',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Four-year BBA with concentrations in marketing, accounting, and entrepreneurship. Small cohorts and mentorship from faculty with industry backgrounds.',
    },
    {
      name: 'Bachelor of Arts in Psychology',
      slug: 'bachelor-arts-psychology-crandall',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Social Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 15,500/year',
      description:
        'Liberal arts psychology degree exploring human behaviour, research methods, counselling theory, and developmental psychology in a close-knit academic community.',
    },
    {
      name: 'Bachelor of Education',
      slug: 'bachelor-education-crandall',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Education',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 15,500/year',
      description:
        'Teacher preparation program accredited by the New Brunswick Department of Education, covering curriculum design, classroom management, and practicum placements in local schools.',
    },
    {
      name: 'Bachelor of Arts in History',
      slug: 'bachelor-arts-history-crandall',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Liberal Arts',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 15,000/year',
      description:
        'Explores Canadian, American, European, and world history, developing critical analysis and research skills applicable to law, public policy, and graduate study.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'master-business-administration-crandall',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Graduate MBA with concentrations in leadership and organizational management, offered in a cohort format with part-time and full-time options in Moncton.',
    },
  ],
  scholarships: [
    {
      name: 'Crandall International Student Entrance Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 3,000',
      description:
        'Renewable scholarship for international undergraduate students with a minimum 80% average in their final year of secondary school.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application Online',
      description:
        'Apply directly through the Crandall University admissions portal. No application fee required for international students.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic & Language Documents',
      description:
        'Submit official high school or post-secondary transcripts and English proficiency results (IELTS 6.5 or TOEFL 88).',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer of Admission',
      description:
        'Crandall will issue a conditional or unconditional offer. Accept and pay the enrollment deposit to confirm your place.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Submit a Study Permit application to IRCC using your Letter of Acceptance. Processing is typically 6–10 weeks.',
    },
  ],
}

// ─── 9. UNIVERSITY OF REGINA ─────────────────────────────────────────────────
export const UNIVERSITY_OF_REGINA = {
  name: 'University of Regina',
  slug: 'university-of-regina',
  city: 'Regina, SK',
  foundedYear: 1961,
  ranking: null,
  totalStudents: 16000,
  internationalStudents: 0.18,
  acceptanceRate: 73,
  shortDescription:
    'The University of Regina is a comprehensive public university on Treaty 4 territory in Saskatchewan, offering over 100 undergraduate and graduate programs in arts, business, engineering, sciences, social work, and education. Known for strong research output, co-operative education programs, and a welcoming international student community.',
  tuitionFeeMin: 18000,
  tuitionFeeMax: 25000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-uregina',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'Comprehensive BBA with majors in accounting, finance, management, and marketing delivered through the Hill/Levene Schools of Business, with co-op work term options.',
    },
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bachelor-science-computer-science-uregina',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,000/year',
      description:
        'Covers software development, data science, artificial intelligence, and computer networks. The Faculty of Engineering and Applied Science supports robust research and co-op pathways.',
    },
    {
      name: 'Bachelor of Engineering — Software Systems',
      slug: 'bachelor-engineering-software-uregina',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering & Technology',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 24,000/year',
      description:
        'Accredited by Engineers Canada, covering software architecture, embedded systems, network engineering, and project management with mandatory co-op work terms.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'master-business-administration-uregina',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 24,500/year',
      description:
        'Graduate MBA program with options in e-business and international management, delivered by Levene Graduate School of Business with strong industry connections in prairie Canada.',
    },
    {
      name: 'Bachelor of Science in Psychology',
      slug: 'bachelor-science-psychology-uregina',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Social Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'Offers both research and applied streams covering behavioural neuroscience, clinical psychology, and developmental psychology, with laboratory research opportunities.',
    },
  ],
  scholarships: [
    {
      name: 'University of Regina International Student Entrance Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 5,000',
      description:
        'Renewable annual scholarship for undergraduate international students with a minimum 85% high school average. Value may increase based on GPA maintained during studies.',
    },
    {
      name: 'Global Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 3,000',
      description:
        'One-time entrance scholarship for international students demonstrating academic excellence and contributions to their school community.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online via the University Portal',
      description:
        'Submit your application through the University of Regina online admissions system. Applications open in October for the following September intake.',
    },
    {
      stepNumber: 2,
      title: 'Upload Academic Transcripts & English Scores',
      description:
        'Provide certified transcripts and IELTS (6.5 overall, no band below 6.0) or TOEFL (88 iBT) results. Certain programs may require higher scores.',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer of Admission',
      description:
        'The admissions office will issue a conditional or unconditional offer. Accept and pay the deposit to confirm enrollment.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your Letter of Acceptance to apply for a Canadian Study Permit via IRCC. Apply well in advance — at least 10 weeks before your program start date.',
    },
  ],
}

// ─── 10. ROYAL ROADS UNIVERSITY ──────────────────────────────────────────────
export const ROYAL_ROADS_UNIVERSITY = {
  name: 'Royal Roads University',
  slug: 'royal-roads-university',
  city: 'Victoria, BC',
  foundedYear: 1995,
  ranking: null,
  totalStudents: 4500,
  internationalStudents: 0.25,
  acceptanceRate: 65,
  shortDescription:
    'Royal Roads University is a public university in Victoria, BC, specializing in applied and professional graduate programs in business, leadership, environmental studies, and conflict resolution. Set on a stunning heritage estate on the Pacific coast, Royal Roads is known for its blend of on-campus residencies and online delivery.',
  tuitionFeeMin: 20000,
  tuitionFeeMax: 28000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Master of Business Administration',
      slug: 'master-business-administration-rru',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 26,000/year',
      description:
        'Blended online and on-campus MBA with a focus on sustainable leadership, organizational change, and global business strategy. Cohort-based delivery.',
    },
    {
      name: 'Master of Arts in Leadership',
      slug: 'master-arts-leadership-rru',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 24,000/year',
      description:
        'Professional graduate program combining leadership theory with applied practice, designed for mid-career professionals in public, private, and non-profit sectors.',
    },
    {
      name: 'Bachelor of Commerce in Entrepreneurship',
      slug: 'bachelor-commerce-entrepreneurship-rru',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'An accelerated undergraduate program for students with previous post-secondary credits, focused on venture creation, innovation, and business model development.',
    },
    {
      name: 'Master of Science in Environment and Management',
      slug: 'master-science-environment-management-rru',
      degreeLevel: DegreeType.MASTER,
      field: 'Environmental Studies',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 25,000/year',
      description:
        'Interdisciplinary graduate program in environmental sustainability, resource management, and climate policy, combining research with professional practice.',
    },
    {
      name: 'Master of Arts in Conflict Analysis and Management',
      slug: 'master-conflict-analysis-management-rru',
      degreeLevel: DegreeType.MASTER,
      field: 'Social Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 23,500/year',
      description:
        'Prepares graduates for careers in mediation, negotiation, peace-building, and conflict resolution in international, governmental, and organizational contexts.',
    },
  ],
  scholarships: [
    {
      name: 'Royal Roads Graduate International Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 5,000',
      description:
        'Awarded to international graduate students demonstrating exceptional academic achievement and professional promise upon entry to a master\'s program.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online',
      description:
        'Submit your application through the Royal Roads University admissions portal. Upload a resume, statement of intent, and reference letters as required by your program.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic & Language Documents',
      description:
        'Submit university transcripts showing your undergraduate degree and English language results (IELTS 7.0 or TOEFL 94 for graduate programs).',
    },
    {
      stepNumber: 3,
      title: 'Attend Admissions Interview (if required)',
      description:
        'Some programs require a virtual interview or written assessment. The admissions team will contact you with details after reviewing your application.',
    },
    {
      stepNumber: 4,
      title: 'Accept Offer & Apply for Study Permit',
      description:
        'Once admitted, accept your offer and apply for a Canadian Study Permit using your Letter of Acceptance. Royal Roads provides ISS support for the process.',
    },
  ],
}

// ─── 11. SHERIDAN COLLEGE ─────────────────────────────────────────────────────
export const SHERIDAN_COLLEGE = {
  name: 'Sheridan College',
  slug: 'sheridan-college',
  city: 'Brampton/Oakville, ON',
  foundedYear: 1967,
  ranking: null,
  totalStudents: 28000,
  internationalStudents: 0.35,
  acceptanceRate: 70,
  shortDescription:
    'Sheridan College is one of Canada\'s top polytechnics, internationally renowned for animation, design, game development, and business programs. With campuses in Brampton, Oakville, and Mississauga, Sheridan has produced graduates who lead at Pixar, Ubisoft, Google, and other top employers globally.',
  tuitionFeeMin: 16000,
  tuitionFeeMax: 26000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Animation',
      slug: 'animation-sheridan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Design & Creative Arts',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 24,000/year',
      description:
        'Canada\'s top-ranked animation program, producing graduates who work at Pixar, Walt Disney, Sony, and DreamWorks. Covers traditional and 3D animation, character design, and storytelling.',
    },
    {
      name: 'Game Design',
      slug: 'game-design-sheridan',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 23,000/year',
      description:
        'Advanced diploma in game development covering game engines (Unity, Unreal), level design, programming, and production pipeline management.',
    },
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-sheridan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Four-year BBA with specializations in accounting, marketing, and human resources, delivered at the Pilon School of Business.',
    },
    {
      name: 'Computer Systems Technology',
      slug: 'computer-systems-technology-sheridan',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 21,000/year',
      description:
        'Advanced diploma in IT infrastructure, networking, cybersecurity, and cloud computing. Co-op work terms available with GTA technology employers.',
    },
    {
      name: 'Interaction Design',
      slug: 'interaction-design-sheridan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Design & Creative Arts',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'Human-centered design degree covering UX research, interface design, prototyping, and digital product development for tech and creative industries.',
    },
    {
      name: 'Honours Bachelor of Film and Television',
      slug: 'bachelor-film-television-sheridan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Media & Communications',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,500/year',
      description:
        'Immersive degree program in film production, screenwriting, cinematography, and post-production, with access to professional studios in the Hazel McCallion campus.',
    },
  ],
  scholarships: [
    {
      name: 'Sheridan International Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 3,000',
      description:
        'Awarded to incoming international students with exceptional academic records. Renewable based on maintaining a GPA of 3.0 or higher each semester.',
    },
    {
      name: 'Sheridan Creative Arts Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Specifically for international students admitted to animation, design, or film programs, recognizing outstanding portfolio submission.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via ontariocolleges.ca',
      description:
        'Submit your application through the Ontario Colleges portal. Note that competitive programs (animation, game design) require a portfolio submission through Sheridan\'s separate portal.',
    },
    {
      stepNumber: 2,
      title: 'Submit Portfolio (if required) & Documents',
      description:
        'Upload academic transcripts and English test results (IELTS 6.0–6.5). Creative programs require a digital portfolio; review program-specific requirements on Sheridan\'s website.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Enrollment Deposit',
      description:
        'Accept your offer and pay the CAD 500 international deposit. Confirm your accommodations arrangements if living in campus residences.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Use your Letter of Acceptance to apply for a Study Permit via IRCC. Apply at least 10 weeks before your start date to avoid processing delays.',
    },
  ],
}

// ─── 12. UNIVERSITY OF WINDSOR ────────────────────────────────────────────────
export const UNIVERSITY_OF_WINDSOR = {
  name: 'University of Windsor',
  slug: 'university-of-windsor',
  city: 'Windsor, ON',
  foundedYear: 1857,
  ranking: null,
  totalStudents: 15000,
  internationalStudents: 0.22,
  acceptanceRate: 68,
  shortDescription:
    'The University of Windsor is a public comprehensive university located on the Canada–US border, renowned for its law school, engineering programs, and business faculty. Windsor\'s proximity to Detroit and its strong automotive and manufacturing research partnerships make it a strategic destination for international students seeking North American career pathways.',
  tuitionFeeMin: 22000,
  tuitionFeeMax: 30000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Computer Science',
      slug: 'bachelor-computer-science-uwindsor',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 28,000/year',
      description:
        'Covers algorithms, software engineering, AI, data science, and human-computer interaction, with optional co-op terms and research opportunities linked to the cross-border Detroit tech corridor.',
    },
    {
      name: 'Bachelor of Commerce — Accounting',
      slug: 'bachelor-commerce-accounting-uwindsor',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 25,000/year',
      description:
        'Odette School of Business four-year accounting program aligned with CPA Canada professional pathways, covering financial reporting, auditing, and taxation.',
    },
    {
      name: 'Bachelor of Engineering — Mechanical',
      slug: 'bachelor-engineering-mechanical-uwindsor',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering & Technology',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 29,000/year',
      description:
        'Engineers Canada–accredited mechanical engineering program with specializations in automotive design, robotics, and thermodynamics — supported by Windsor\'s strong automotive sector connections.',
    },
    {
      name: 'Juris Doctor (JD)',
      slug: 'juris-doctor-uwindsor',
      degreeLevel: DegreeType.MASTER,
      field: 'Law',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 28,000/year',
      description:
        'The Faculty of Law offers a renowned transnational law program with cross-border US-Canada exposure and a joint JD/LLB program with the University of Detroit Mercy.',
    },
    {
      name: 'Master of Engineering — Electrical',
      slug: 'master-engineering-electrical-uwindsor',
      degreeLevel: DegreeType.MASTER,
      field: 'Engineering & Technology',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 25,000/year',
      description:
        'Graduate program in electrical and computer engineering, with research areas in power systems, embedded systems, and wireless communications.',
    },
  ],
  scholarships: [
    {
      name: 'University of Windsor International Student Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 5,000',
      description:
        'Renewable entrance scholarship for undergraduate international students with a minimum 85% average, applied to tuition each year GPA requirements are maintained.',
    },
    {
      name: 'Windsor Graduate International Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 4,000',
      description:
        'Merit-based award for incoming international graduate students demonstrating research excellence or strong professional accomplishments.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via the University of Windsor Portal',
      description:
        'Submit your online application with program preference and supporting documents. Undergraduate students may also apply via OUAC (Ontario Universities\' Application Centre).',
    },
    {
      stepNumber: 2,
      title: 'Submit Academic Transcripts & English Results',
      description:
        'Upload official transcripts and English test scores (IELTS 6.5 for undergraduate, 7.0 for law and graduate programs). Engineering programs may require prerequisite science/math courses.',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer and Confirm Enrollment',
      description:
        'Accept your offer and pay the enrollment deposit. Graduate applicants may need to provide a statement of research interest and two academic references.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your Letter of Acceptance to apply for a Canadian Study Permit via IRCC. The UWindsor International Student Centre provides guidance throughout the process.',
    },
  ],
}

// ─── 13. LETHBRIDGE COLLEGE ───────────────────────────────────────────────────
export const LETHBRIDGE_COLLEGE = {
  name: 'Lethbridge College',
  slug: 'lethbridge-college',
  city: 'Lethbridge, AB',
  foundedYear: 1957,
  ranking: null,
  totalStudents: 5000,
  internationalStudents: 0.15,
  acceptanceRate: 80,
  shortDescription:
    'Lethbridge College is a public college in southern Alberta offering diploma, certificate, and applied degree programs in business, health sciences, technology, and trades. Its modern campus and small class sizes offer a high-quality, affordable education in one of Alberta\'s sunniest and most affordable cities.',
  tuitionFeeMin: 14000,
  tuitionFeeMax: 18000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-lethbridge',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,000/year',
      description:
        'Two-year diploma covering accounting, marketing, operations management, and business communications, with a direct pathway to the University of Lethbridge BBA.',
    },
    {
      name: 'Information Technology',
      slug: 'information-technology-lethbridge',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Focuses on networking, cybersecurity, databases, and systems administration. Prepares graduates for IT support, cloud, and infrastructure roles in Alberta\'s growing tech sector.',
    },
    {
      name: 'Practical Nurse',
      slug: 'practical-nurse-lethbridge',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Health Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,500/year',
      description:
        'Prepares graduates to write NCLEX-PN and work as Licensed Practical Nurses in Alberta\'s hospitals, continuing care facilities, and community health settings.',
    },
    {
      name: 'Agriculture Sciences — Crop Production',
      slug: 'agriculture-crop-production-lethbridge',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Agriculture & Natural Resources',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description:
        'Covers crop science, irrigation, soil management, and farm operations in Alberta\'s major agricultural region. Strong field and lab components.',
    },
    {
      name: 'Instrumentation Engineering Technology',
      slug: 'instrumentation-engineering-tech-lethbridge',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering & Technology',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Specialized program in industrial instrumentation, process control, and automation systems for Alberta\'s oil, gas, and manufacturing industries.',
    },
  ],
  scholarships: [
    {
      name: 'Lethbridge College International Student Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 1,500',
      description:
        'Merit-based entrance award for international students enrolling in a full-time diploma or certificate program with a strong academic record.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online via ApplyAlberta',
      description:
        'Submit your application through the ApplyAlberta portal. Select Lethbridge College and your program. Applications accepted from October for the following September intake.',
    },
    {
      stepNumber: 2,
      title: 'Submit Transcripts & English Results',
      description:
        'Provide official secondary or post-secondary transcripts and English test scores (IELTS 6.0 overall minimum). Health programs may require higher scores.',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer & Pay Deposit',
      description:
        'Accept your conditional or unconditional offer and pay the enrollment deposit to secure your seat.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Use your Letter of Acceptance to apply via IRCC. Lethbridge College\'s International Centre will provide support documents and guidance.',
    },
  ],
}

// ─── 14. BOW VALLEY COLLEGE ───────────────────────────────────────────────────
export const BOW_VALLEY_COLLEGE = {
  name: 'Bow Valley College',
  slug: 'bow-valley-college',
  city: 'Calgary, AB',
  foundedYear: 1965,
  ranking: null,
  totalStudents: 14000,
  internationalStudents: 0.25,
  acceptanceRate: 82,
  shortDescription:
    'Bow Valley College is a publicly funded college in downtown Calgary offering career-oriented programs in business, health care, technology, and community studies. Centrally located near Calgary\'s financial core, it provides affordable programs with strong employment outcomes and close ties to Alberta\'s energy and services sectors.',
  tuitionFeeMin: 14500,
  tuitionFeeMax: 19000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-bowvalley',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Two-year business diploma covering accounting, marketing, entrepreneurship, and operations. Graduates may bridge into BBA programs at partner universities.',
    },
    {
      name: 'Information Technology — Business Analysis',
      slug: 'it-business-analysis-bowvalley',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,000/year',
      description:
        'Blends IT skills with business process analysis, covering data analytics, requirements gathering, project management, and agile methods for Calgary\'s growing tech and energy industries.',
    },
    {
      name: 'Practical Nurse',
      slug: 'practical-nurse-bowvalley',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Health Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'CLPNA-approved practical nursing program with clinical placements in Calgary hospitals and continuing care facilities. Graduates are eligible to write NCLEX-PN.',
    },
    {
      name: 'Network Systems Technology',
      slug: 'network-systems-technology-bowvalley',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,500/year',
      description:
        'Covers network infrastructure, cybersecurity, cloud platforms, and systems management. Aligned with CompTIA and Cisco certifications.',
    },
    {
      name: 'Early Learning and Child Care',
      slug: 'early-learning-child-care-bowvalley',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Education',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description:
        'Prepares graduates to work in licensed childcare and early learning centres across Alberta, meeting the professional standards of Alberta Children\'s Services.',
    },
  ],
  scholarships: [
    {
      name: 'Bow Valley College International Excellence Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 1,500',
      description:
        'Awarded to international students with strong academic records upon entry to a full-time diploma program at Bow Valley College.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via ApplyAlberta or Directly',
      description:
        'Submit your application through ApplyAlberta.ca or directly on the Bow Valley College website. Rolling admissions with intakes in January, May, and September.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic Documents & English Proof',
      description:
        'Upload official secondary or post-secondary transcripts. English proficiency minimum is IELTS 6.0 overall (health programs may require 7.0).',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer & Confirm Enrollment',
      description:
        'Accept your offer and pay the enrollment deposit. The International Student Office will send you a pre-arrival checklist.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your Bow Valley College Letter of Acceptance to apply for a Canadian Study Permit via IRCC. Apply at least 8 weeks before your program start.',
    },
  ],
}

// ─── 15. ACADIA UNIVERSITY ────────────────────────────────────────────────────
export const ACADIA_UNIVERSITY = {
  name: 'Acadia University',
  slug: 'acadia-university',
  city: 'Wolfville, NS',
  foundedYear: 1838,
  ranking: null,
  totalStudents: 4200,
  internationalStudents: 0.18,
  acceptanceRate: 72,
  shortDescription:
    'Acadia University is a historic liberal arts and sciences university in the Annapolis Valley of Nova Scotia, consistently ranked among Canada\'s top undergraduate universities. Known for its beautiful campus, small class sizes, and pioneering use of laptop technology in education (the "Acadia Advantage"), it offers exceptional undergraduate programs in arts, sciences, business, and computer science.',
  tuitionFeeMin: 18000,
  tuitionFeeMax: 23000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-acadia',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 21,500/year',
      description:
        'Acadia\'s School of Business offers a research-informed BBA with specializations in marketing, accounting, international business, and entrepreneurship in a small cohort environment.',
    },
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bachelor-science-computer-science-acadia',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 21,000/year',
      description:
        'Flexible CS degree with streams in AI, software systems, and game development. Small class sizes and dedicated lab access distinguish Acadia\'s technology programs.',
    },
    {
      name: 'Bachelor of Science in Biology',
      slug: 'bachelor-science-biology-acadia',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Natural Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'Comprehensive biology program covering ecology, molecular biology, physiology, and marine biology, with field research opportunities in the Bay of Fundy region.',
    },
    {
      name: 'Bachelor of Arts in Political Science',
      slug: 'bachelor-arts-political-science-acadia',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Social Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Explores Canadian, American, and comparative politics, international relations, and public policy through a liberal arts lens with research and writing emphasis.',
    },
    {
      name: 'Master of Science in Applied Geomatics',
      slug: 'master-science-applied-geomatics-acadia',
      degreeLevel: DegreeType.MASTER,
      field: 'Natural Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'Graduate program in GIS, remote sensing, and spatial analysis with applications in environmental management, urban planning, and resource monitoring.',
    },
  ],
  scholarships: [
    {
      name: 'Acadia International Entrance Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 5,000',
      description:
        'Renewable annual scholarship for undergraduate international students with a minimum 85% final year average. Must maintain a 3.0 GPA for renewal.',
    },
    {
      name: 'Acadia Excellence Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 3,000',
      description:
        'One-time entrance award recognizing outstanding academic performance in students with an average of 80–85% in their final year of secondary or post-secondary study.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online',
      description:
        'Submit your application through Acadia University\'s online admissions portal or via the Maritime Provinces Higher Education Commission (MPHEC).',
    },
    {
      stepNumber: 2,
      title: 'Submit Transcripts & English Test Results',
      description:
        'Provide official secondary school or university transcripts. English proficiency required: IELTS 6.5 (no band below 6.0) or TOEFL 88 iBT.',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer & Confirm',
      description:
        'Accept your conditional or unconditional offer through the portal. Pay the enrollment deposit to secure your place for September intake.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Use your Acadia Letter of Acceptance to apply via IRCC. The International Student Services office provides pre-arrival checklists and settlement support.',
    },
  ],
}

// ─── 16. LOYALIST COLLEGE ─────────────────────────────────────────────────────
export const LOYALIST_COLLEGE = {
  name: 'Loyalist College',
  slug: 'loyalist-college',
  city: 'Belleville, ON',
  foundedYear: 1967,
  ranking: null,
  totalStudents: 6500,
  internationalStudents: 0.20,
  acceptanceRate: 80,
  shortDescription:
    'Loyalist College is a public college in Belleville, Ontario, offering diploma, certificate, and degree programs in business, technology, media, community services, and health. With an emphasis on experiential learning and strong employer partnerships in the Bay of Quinte region, Loyalist provides practical, career-ready education.',
  tuitionFeeMin: 14000,
  tuitionFeeMax: 18000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-loyalist',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 15,500/year',
      description:
        'Three-year advanced diploma covering accounting, marketing, management, and business strategy, with optional co-op terms and pathways to bachelor degree programs.',
    },
    {
      name: 'Computer Systems Technician',
      slug: 'computer-systems-technician-loyalist',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Covers networking, security, cloud computing, and systems support, aligned with CompTIA A+, Network+, and Security+ certification tracks.',
    },
    {
      name: 'Journalism — Broadcast',
      slug: 'journalism-broadcast-loyalist',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Media & Communications',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description:
        'Practical broadcast journalism training covering TV and radio production, news writing, on-camera performance, and digital media storytelling in campus studio facilities.',
    },
    {
      name: 'Customs Border Services',
      slug: 'customs-border-services-loyalist',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Law & Public Safety',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,000/year',
      description:
        'Specialized program preparing graduates for careers in customs brokerage, import/export compliance, border security, and supply chain regulatory affairs.',
    },
    {
      name: 'Early Childhood Education',
      slug: 'early-childhood-education-loyalist',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Education',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description:
        'Prepares graduates to work in licensed childcare programs across Ontario, covering child development, curriculum design, and family engagement.',
    },
  ],
  scholarships: [
    {
      name: 'Loyalist College International Entrance Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 1,500',
      description:
        'Awarded to international students with a strong academic record upon acceptance into a full-time diploma or degree program at Loyalist College.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via ontariocolleges.ca',
      description:
        'Submit your application through the Ontario Colleges portal for September, January, or May intakes.',
    },
    {
      stepNumber: 2,
      title: 'Provide Transcripts & English Scores',
      description:
        'Submit official academic transcripts and English language test results (IELTS 6.0 minimum overall, 5.5 per band for most programs).',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Deposit',
      description:
        'Accept your offer on the Ontario Colleges portal and pay the enrollment deposit to confirm your place.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Submit your Study Permit application to IRCC using your Loyalist College Letter of Acceptance at least 8 weeks before your start date.',
    },
  ],
}

// ─── 17. ALEXANDER COLLEGE ────────────────────────────────────────────────────
export const ALEXANDER_COLLEGE = {
  name: 'Alexander College',
  slug: 'alexander-college',
  city: 'Vancouver/Burnaby, BC',
  foundedYear: 2011,
  ranking: null,
  totalStudents: 1800,
  internationalStudents: 0.75,
  acceptanceRate: 78,
  shortDescription:
    'Alexander College is a private post-secondary institution in Vancouver and Burnaby offering associate of arts and science degrees with course credits fully transferable to UBC, SFU, BCIT, and other BC universities. Focused on international students, Alexander provides a supportive environment to complete two years of university-equivalent study at an accessible cost.',
  tuitionFeeMin: 17000,
  tuitionFeeMax: 21000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Associate of Arts',
      slug: 'associate-of-arts-alexander',
      degreeLevel: DegreeType.ASSOCIATE,
      field: 'Liberal Arts',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Two-year associate degree with transferable credits in English, psychology, sociology, economics, and electives. Recognized for transfer to UBC, SFU, KPU, and UFV.',
    },
    {
      name: 'Associate of Science',
      slug: 'associate-of-science-alexander',
      degreeLevel: DegreeType.ASSOCIATE,
      field: 'Natural Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'Science-focused associate credential covering first and second year biology, chemistry, physics, and mathematics, designed as a transfer pathway to BC university science faculties.',
    },
    {
      name: 'University Transfer — Business',
      slug: 'university-transfer-business-alexander',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 19,500/year',
      description:
        'One-year program covering first-year business and economics coursework transferable to SFU Beedie, KPU Business, and other BC universities.',
    },
    {
      name: 'English for Academic Purposes',
      slug: 'eap-alexander-college',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'English Language',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 17,500/year',
      description:
        'Intensive academic English program enabling students to gain direct entry into Alexander College degree programs without a standardized English test score.',
    },
  ],
  scholarships: [
    {
      name: 'Alexander College Academic Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Awarded to incoming international students with a minimum 80% average in their most recent secondary or post-secondary studies.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online',
      description:
        'Submit your application directly through the Alexander College website. Applications accepted year-round for January, May, and September intakes.',
    },
    {
      stepNumber: 2,
      title: 'Provide Transcripts & English Proof',
      description:
        'Submit official transcripts and IELTS 6.5 (or equivalent). Students with lower English scores may be admitted to the EAP program first.',
    },
    {
      stepNumber: 3,
      title: 'Receive Letter of Acceptance',
      description:
        'Accept your offer of admission. The admissions team will issue a formal Letter of Acceptance for use in your Study Permit application.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Apply to IRCC at least 8 weeks before your start date. Alexander College\'s International Student Advisors will assist with the Study Permit documentation.',
    },
  ],
}

// ─── 18. ALEXANDER ACADEMY ────────────────────────────────────────────────────
export const ALEXANDER_ACADEMY = {
  name: 'Alexander Academy',
  slug: 'alexander-academy',
  city: 'Vancouver, BC',
  foundedYear: 2011,
  ranking: null,
  totalStudents: 500,
  internationalStudents: 0.80,
  acceptanceRate: 80,
  shortDescription:
    'Alexander Academy is a private secondary school in downtown Vancouver specializing in BC Dogwood diploma completion and university preparation pathways for international students. Offering Grades 10–12 curricula and strong ESL support, the Academy helps students meet the entry requirements for BC and Canadian universities.',
  tuitionFeeMin: 17000,
  tuitionFeeMax: 22000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Grade 12 University Preparation',
      slug: 'grade12-university-prep-alexander',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Academic Preparation',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 21,500/year',
      description:
        'BC-accredited Grade 12 program preparing international students for admission to Canadian universities. Includes course counselling and university application support.',
    },
    {
      name: 'BC Secondary School Diploma — Grades 10–12',
      slug: 'bc-secondary-diploma-alexander',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Academic Preparation',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'Full three-year secondary program leading to a BC Dogwood credential, covering all Ministry-required courses for university admission across Canada.',
    },
    {
      name: 'English Language Program',
      slug: 'english-language-program-alexander-academy',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'English Language',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 18,000/year',
      description:
        'Intensive English language program for international secondary students, covering academic writing, reading, oral communication, and grammar at multiple proficiency levels.',
    },
    {
      name: 'Academic Upgrading',
      slug: 'academic-upgrading-alexander-academy',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'Academic Preparation',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Short-term upgrading program for students needing to improve grades in Mathematics, English, or Sciences to qualify for university admission.',
    },
  ],
  scholarships: [
    {
      name: 'Alexander Academy High Achievement Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Awarded to outstanding international students enrolling in the Grade 12 University Preparation program with strong prior academic results.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online to Alexander Academy',
      description:
        'Submit the online application form available on the Alexander Academy website. Rolling admissions for September and January intakes.',
    },
    {
      stepNumber: 2,
      title: 'Submit Transcripts & English Assessment',
      description:
        'Provide school transcripts from your home country translated into English. A placement test in English and Mathematics will be arranged.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Deposit',
      description:
        'Sign the enrollment agreement and pay the deposit. The Academy will issue a Letter of Acceptance for your Study Permit.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Apply to IRCC using your Letter of Acceptance. As a private school student, you must hold a valid Study Permit throughout your enrolment.',
    },
  ],
}

// ─── 19. INTERNATIONAL COLLEGE OF MANITOBA ────────────────────────────────────
export const INTERNATIONAL_COLLEGE_OF_MANITOBA = {
  name: 'International College of Manitoba',
  slug: 'international-college-of-manitoba',
  city: 'Winnipeg, MB',
  foundedYear: 2006,
  ranking: null,
  totalStudents: 2000,
  internationalStudents: 0.95,
  acceptanceRate: 78,
  shortDescription:
    'The International College of Manitoba (ICM) is a pathway institution on the University of Manitoba campus offering Year 1 and transitional programs that guarantee qualified graduates direct entry into second year at the University of Manitoba. ICM serves as the primary international pathway to Canada\'s 13th-largest research university.',
  tuitionFeeMin: 16000,
  tuitionFeeMax: 19500,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'University Transfer Program — Business',
      slug: 'utp-business-icm',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'Year 1 equivalent coursework in accounting, economics, and business communications guaranteeing direct entry into Year 2 of the University of Manitoba\'s I.H. Asper School of Business.',
    },
    {
      name: 'University Transfer Program — Science',
      slug: 'utp-science-icm',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Natural Sciences',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'First-year science curriculum in biology, chemistry, physics, and mathematics guaranteeing progression to Year 2 of the University of Manitoba\'s Faculty of Science.',
    },
    {
      name: 'University Transfer Program — Engineering',
      slug: 'utp-engineering-icm',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Engineering & Technology',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'First-year engineering foundation program guaranteeing entry into Year 2 of the University of Manitoba\'s Faculty of Engineering with a guaranteed GPA pathway.',
    },
    {
      name: 'University Transfer Program — Arts',
      slug: 'utp-arts-icm',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Liberal Arts',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 17,500/year',
      description:
        'First-year arts and social sciences curriculum covering English, psychology, sociology, and electives for progression into Year 2 of University of Manitoba\'s Faculty of Arts.',
    },
    {
      name: 'Academic English Program',
      slug: 'academic-english-icm',
      degreeLevel: DegreeType.CERTIFICATE,
      field: 'English Language',
      durationYears: 1,
      tuitionFeePerYear: 'CAD 16,500/year',
      description:
        'Intensive academic English preparation allowing students to transition into ICM\'s university transfer programs and subsequently into the University of Manitoba.',
    },
  ],
  scholarships: [
    {
      name: 'ICM Academic Excellence Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Merit-based award for international students entering ICM university transfer programs with a minimum 80% academic average from their home institution.',
    },
    {
      name: 'ICM Pathway Scholarship',
      type: ScholarshipType.PARTIAL,
      value: 'CAD 1,000',
      description:
        'Partial tuition reduction for students who successfully advance from ICM into a University of Manitoba bachelor\'s degree program.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online to ICM',
      description:
        'Submit your application on the ICM website. Applications open year-round for September and January intakes.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic Transcripts & English Scores',
      description:
        'Submit official transcripts and English language proof (IELTS 5.5–6.0 depending on program, or completion of ICM\'s Academic English Program).',
    },
    {
      stepNumber: 3,
      title: 'Receive Letter of Acceptance',
      description:
        'ICM will issue a Letter of Acceptance once your documents are assessed. Accept your offer and pay the enrollment deposit.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Submit a Study Permit application to IRCC using your ICM Letter of Acceptance. ICM\'s student advisors will assist you through this process.',
    },
  ],
}

// ─── 20. VANCOUVER ISLAND UNIVERSITY ─────────────────────────────────────────
export const VANCOUVER_ISLAND_UNIVERSITY = {
  name: 'Vancouver Island University',
  slug: 'vancouver-island-university',
  city: 'Nanaimo, BC',
  foundedYear: 1969,
  ranking: null,
  totalStudents: 13000,
  internationalStudents: 0.20,
  acceptanceRate: 75,
  shortDescription:
    'Vancouver Island University (VIU) is a publicly funded teaching university in Nanaimo, BC, offering bachelor\'s, master\'s, diploma, and certificate programs in business, education, sciences, fine arts, and trades. Set on Vancouver Island with access to coastal and forest environments, VIU is popular with students seeking an active outdoor lifestyle alongside a quality Canadian education.',
  tuitionFeeMin: 16500,
  tuitionFeeMax: 23000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-viu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 21,000/year',
      description:
        'Four-year BBA with concentrations in accounting, marketing, tourism management, and international business at VIU\'s business faculty in Nanaimo.',
    },
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bachelor-science-computer-science-viu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'Covers programming, algorithms, AI, data science, and software engineering with strong research and co-op opportunities on Vancouver Island.',
    },
    {
      name: 'Diploma in Information Technology',
      slug: 'diploma-information-technology-viu',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Two-year IT diploma in networking, cybersecurity, web development, and database administration with direct bridging pathways to the VIU CS degree.',
    },
    {
      name: 'Bachelor of Education',
      slug: 'bachelor-education-viu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Education',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'BC-certified teacher education program with elementary and secondary streams and school practicum placements across Vancouver Island school districts.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'master-business-administration-viu',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 22,500/year',
      description:
        'Professional MBA with streams in technology management and sustainable business, available in full-time and part-time formats in Nanaimo.',
    },
  ],
  scholarships: [
    {
      name: 'VIU International Student Entrance Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 3,000',
      description:
        'Renewable entrance scholarship for undergraduate international students with a minimum 80% academic average. Renewal requires maintaining a B+ GPA.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via EducationPlannerBC',
      description:
        'Submit your application through BC\'s Education Planner portal. VIU accepts applications for September and January intakes.',
    },
    {
      stepNumber: 2,
      title: 'Submit Academic Documents',
      description:
        'Provide official transcripts and English test scores (IELTS 6.5 for degree programs; 6.0 for diploma programs with no band below 5.5).',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer & Pay Deposit',
      description:
        'Accept your offer and pay the enrollment deposit. The International Student Services office will send a pre-arrival welcome package.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Apply via IRCC using your VIU Letter of Acceptance. Allow at least 8–10 weeks before your program start for processing.',
    },
  ],
}

// ─── 21. LAMBTON COLLEGE ──────────────────────────────────────────────────────
export const LAMBTON_COLLEGE = {
  name: 'Lambton College',
  slug: 'lambton-college',
  city: 'Sarnia, ON',
  foundedYear: 1969,
  ranking: null,
  totalStudents: 7000,
  internationalStudents: 0.28,
  acceptanceRate: 78,
  shortDescription:
    'Lambton College is a public college in Sarnia, Ontario offering diploma, certificate, and applied degree programs in business, engineering technology, health sciences, and environmental studies. Known for its applied research partnerships with the petrochemical industry and its growing international student community, Lambton provides practical, industry-linked education.',
  tuitionFeeMin: 14500,
  tuitionFeeMax: 19000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-lambton',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 16,000/year',
      description:
        'Advanced diploma covering marketing, accounting, human resources, and organizational management. Bridge pathways available to partner university degree programs.',
    },
    {
      name: 'Chemical Engineering Technology',
      slug: 'chemical-engineering-technology-lambton',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering & Technology',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'Specialized program in process operations, quality control, and petrochemical plant management, directly aligned with Sarnia\'s world-class chemical valley industry.',
    },
    {
      name: 'Computer Systems Technology',
      slug: 'computer-systems-technology-lambton',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Covers networking, cybersecurity, cloud infrastructure, and systems programming, with co-op options and certification pathways in CompTIA and Cisco.',
    },
    {
      name: 'Environmental Technician',
      slug: 'environmental-technician-lambton',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Environmental Studies',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,500/year',
      description:
        'Covers environmental monitoring, remediation techniques, and compliance with Ontario environmental regulations, with field sampling and laboratory components.',
    },
    {
      name: 'Practical Nurse',
      slug: 'practical-nurse-lambton',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Health Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,500/year',
      description:
        'NCLEX-PN preparation program with clinical placements in Sarnia-area hospitals and long-term care facilities. Graduates are eligible for RPN registration in Ontario.',
    },
  ],
  scholarships: [
    {
      name: 'Lambton College International Entrance Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 1,500',
      description:
        'Awarded to international students with a strong academic record upon entry to a full-time diploma or degree program at Lambton College.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via ontariocolleges.ca',
      description:
        'Submit your application through the Ontario Colleges portal. Lambton accepts applications for September, January, and May intakes.',
    },
    {
      stepNumber: 2,
      title: 'Submit Academic Documents & English Proof',
      description:
        'Provide official transcripts and English test scores (IELTS 6.0 for most programs). Health and engineering programs may require higher minimums.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Deposit',
      description:
        'Accept your conditional or unconditional offer and pay the enrollment deposit to confirm your seat.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your Lambton College Letter of Acceptance to apply for a Canadian Study Permit via IRCC at least 8 weeks before your program start.',
    },
  ],
}

// ─── 22. THOMPSON RIVERS UNIVERSITY ──────────────────────────────────────────
export const THOMPSON_RIVERS_UNIVERSITY = {
  name: 'Thompson Rivers University',
  slug: 'thompson-rivers-university',
  city: 'Kamloops, BC',
  foundedYear: 1970,
  ranking: null,
  totalStudents: 26000,
  internationalStudents: 0.22,
  acceptanceRate: 74,
  shortDescription:
    'Thompson Rivers University (TRU) is a public university in Kamloops, BC offering undergraduate and graduate programs in business, arts, sciences, law, education, and trades. Known for its open and distance learning programs, strong co-op placements, and affordable fees, TRU is a popular destination for international students seeking a genuine university credential in Western Canada.',
  tuitionFeeMin: 18000,
  tuitionFeeMax: 25000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-tru',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'TRU\'s School of Business and Economics offers a BBA with concentrations in finance, marketing, accounting, and tourism management, with optional co-op work terms.',
    },
    {
      name: 'Bachelor of Computing Science',
      slug: 'bachelor-computing-science-tru',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,000/year',
      description:
        'Four-year computing science degree covering software development, data analytics, machine learning, and systems programming, with strong research and co-op pathways.',
    },
    {
      name: 'Juris Doctor',
      slug: 'juris-doctor-tru',
      degreeLevel: DegreeType.MASTER,
      field: 'Law',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 24,000/year',
      description:
        'TRU\'s innovative Law faculty offers a JD focused on Indigenous law, access to justice, and BC legal practice, with strong community engagement and moot court programs.',
    },
    {
      name: 'Bachelor of Science in Nursing',
      slug: 'bachelor-science-nursing-tru',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Health Sciences',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,500/year',
      description:
        'Four-year BSN program preparing graduates for NCLEX-RN registration, with clinical placements in Kamloops and interior BC health authorities.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'master-business-administration-tru',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 24,000/year',
      description:
        'Graduate MBA with streams in global management and supply chain, offered online and on-campus, recognized by BC employers in interior and coastal markets.',
    },
    {
      name: 'Bachelor of Arts in Environmental Science',
      slug: 'bachelor-arts-environmental-science-tru',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Environmental Studies',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 20,500/year',
      description:
        'Interdisciplinary environmental science degree covering ecology, hydrology, land use, and Indigenous environmental governance in BC\'s diverse interior landscape.',
    },
  ],
  scholarships: [
    {
      name: 'TRU International Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 4,000',
      description:
        'Entrance scholarship for undergraduate international students with a minimum 80% average. Renewable based on maintaining a 3.0 GPA in each academic year.',
    },
    {
      name: 'TRU Graduate International Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 3,000',
      description:
        'One-time merit award for international graduate students demonstrating strong academic and professional backgrounds upon entry to a TRU master\'s program.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via EducationPlannerBC',
      description:
        'Submit your application through BC\'s Education Planner. TRU accepts applications for September and January intakes.',
    },
    {
      stepNumber: 2,
      title: 'Provide Transcripts & English Scores',
      description:
        'Upload official transcripts and English test results (IELTS 6.5 for degree programs; 7.0 for law and nursing). Graduate programs may require additional documentation.',
    },
    {
      stepNumber: 3,
      title: 'Receive Offer & Confirm Enrollment',
      description:
        'Accept your offer through the portal and pay the enrollment deposit. The TRU International Student Office will send your official Letter of Acceptance.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Submit your Study Permit application via IRCC using your TRU Letter of Acceptance. Apply at least 10 weeks before your program start date.',
    },
  ],
}

// ─── 23. CAPE BRETON UNIVERSITY ───────────────────────────────────────────────
export const CAPE_BRETON_UNIVERSITY = {
  name: 'Cape Breton University',
  slug: 'cape-breton-university',
  city: 'Sydney, NS',
  foundedYear: 1974,
  ranking: null,
  totalStudents: 6500,
  internationalStudents: 0.30,
  acceptanceRate: 72,
  shortDescription:
    'Cape Breton University (CBU) is a public university in Sydney, Nova Scotia, offering undergraduate and graduate programs in business, engineering, community studies, arts, and sciences. CBU is one of Canada\'s fastest-growing universities for international students, driven by competitive tuition fees, post-graduation work opportunities, and Nova Scotia\'s Atlantic Immigration Program.',
  tuitionFeeMin: 18000,
  tuitionFeeMax: 24000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-cbu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 21,000/year',
      description:
        'Shannon School of Business four-year BBA with specializations in accounting, marketing, finance, and information systems. Atlantic Immigration Pathway-eligible program.',
    },
    {
      name: 'Bachelor of Science in Computer Science',
      slug: 'bachelor-science-computer-science-cbu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Computer Science & IT',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'CS degree covering software development, data analytics, networking, and AI. CBU\'s growing tech campus provides research and co-op opportunities in Cape Breton\'s emerging tech sector.',
    },
    {
      name: 'Bachelor of Engineering Technology — Process Control',
      slug: 'bachelor-engineering-technology-cbu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Engineering & Technology',
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description:
        'Applied engineering technology degree focusing on industrial process control, automation, instrumentation, and project management for energy and manufacturing industries.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'master-business-administration-cbu',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 23,000/year',
      description:
        'Graduate MBA program with concentrations in international business, community economic development, and sustainability — attractive to AIP pathway applicants.',
    },
    {
      name: 'Diploma in Information Technology',
      slug: 'diploma-information-technology-cbu',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Two-year IT diploma covering networking, database management, and web technologies. Bridge pathway into the CBU Computer Science degree available.',
    },
  ],
  scholarships: [
    {
      name: 'CBU International Excellence Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 4,000',
      description:
        'Renewable annual scholarship for undergraduate international students with a minimum 80% average. Maintenance requires a 3.0 GPA per year of study.',
    },
    {
      name: 'Shannon School of Business International Award',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Awarded to top-performing international students entering CBU\'s BBA or MBA programs, recognizing academic excellence and leadership potential.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online to CBU',
      description:
        'Submit your application on the CBU website. Applications are accepted for September and January intakes. No application fee for most international applicants.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic Transcripts & English Results',
      description:
        'Submit official transcripts and English proficiency proof (IELTS 6.5 for degree programs; 6.0 for diplomas). Graduate programs require IELTS 7.0.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Deposit',
      description:
        'Accept your offer and pay the enrollment deposit. CBU\'s International Student Office will send a pre-arrival orientation package.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Study Permit',
      description:
        'Use your CBU Letter of Acceptance to apply for a Canadian Study Permit via IRCC. CBU International advisors can review your application documents before submission.',
    },
  ],
}

// ─── 24. FANSHAWE COLLEGE ─────────────────────────────────────────────────────
export const FANSHAWE_COLLEGE = {
  name: 'Fanshawe College',
  slug: 'fanshawe-college',
  city: 'London, ON',
  foundedYear: 1967,
  ranking: null,
  totalStudents: 43000,
  internationalStudents: 0.40,
  acceptanceRate: 80,
  shortDescription:
    'Fanshawe College is one of Ontario\'s largest colleges, offering over 300 programs in business, technology, health sciences, media, construction, and trades across campuses in London and surrounding communities. With one of Canada\'s largest international student populations, Fanshawe provides a multicultural campus environment and strong industry connections in southwestern Ontario.',
  tuitionFeeMin: 14500,
  tuitionFeeMax: 21000,
  tuitionCurrency: 'CAD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Business Administration',
      slug: 'business-administration-fanshawe',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 16,500/year',
      description:
        'Three-year advanced diploma in business fundamentals, financial management, marketing, and organizational behaviour, with bridge pathways to partner university bachelor\'s programs.',
    },
    {
      name: 'Computer Systems Technology',
      slug: 'computer-systems-technology-fanshawe',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 19,000/year',
      description:
        'Advanced diploma in software development, networking, cloud computing, and cybersecurity, with co-op options and alignment to industry certifications.',
    },
    {
      name: 'Practical Nursing',
      slug: 'practical-nursing-fanshawe',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Health Sciences',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,500/year',
      description:
        'Prepares graduates for NCLEX-PN registration and careers as Registered Practical Nurses in London area hospitals, long-term care, and community health settings.',
    },
    {
      name: 'Advertising and Marketing Communications',
      slug: 'advertising-marketing-communications-fanshawe',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,500/year',
      description:
        'Covers brand strategy, social media marketing, copywriting, digital advertising, and campaign management for careers in agencies, brands, and media companies.',
    },
    {
      name: 'Game Development',
      slug: 'game-development-fanshawe',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Computer Science & IT',
      durationYears: 2,
      tuitionFeePerYear: 'CAD 20,000/year',
      description:
        'Covers game design, 3D modelling, game engines (Unity, Unreal), programming, and production pipelines in Fanshawe\'s industry-equipped game development labs.',
    },
    {
      name: 'Construction Engineering Technology',
      slug: 'construction-engineering-technology-fanshawe',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Engineering & Technology',
      durationYears: 3,
      tuitionFeePerYear: 'CAD 17,000/year',
      description:
        'Applied construction technology program covering structural design, project management, building codes, and estimating for Ontario\'s booming residential and commercial construction sector.',
    },
  ],
  scholarships: [
    {
      name: 'Fanshawe College International Student Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'CAD 2,000',
      description:
        'Awarded to incoming international students with a minimum 80% average in their final year of secondary or post-secondary study. Applied to first-semester tuition.',
    },
    {
      name: 'Fanshawe Access Award',
      type: ScholarshipType.PARTIAL,
      value: 'CAD 1,000',
      description:
        'Financial support for international students demonstrating academic merit and financial need, applied toward second-semester tuition.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply via ontariocolleges.ca',
      description:
        'Submit your application through the Ontario Colleges portal. Fanshawe accepts applications for September, January, and May intakes.',
    },
    {
      stepNumber: 2,
      title: 'Submit Academic & Language Documents',
      description:
        'Provide official academic transcripts and English test scores (IELTS 6.0 for most programs; 6.5 for health and some technology programs).',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Enrollment Deposit',
      description:
        'Accept your conditional or unconditional offer and pay the CAD 500 deposit. Fanshawe\'s International Student Recruitment team will guide you through next steps.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Canadian Study Permit',
      description:
        'Submit your Study Permit application to IRCC at least 8–12 weeks before your program start date using your Fanshawe Letter of Acceptance.',
    },
  ],
}

export const LAKEHEAD_UNIVERSITY = {
  slug: 'lakehead-university',
  name: 'Lakehead University',
  city: 'Thunder Bay, ON',
  shortDescription: 'A comprehensive university in Northwestern Ontario known for Indigenous studies, environmental science, and professional programs with strong community ties.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 76,
  tuitionFeeMin: 27000,
  tuitionFeeMax: 32000,
  tuitionCurrency: 'CAD',
  foundedYear: 1965,
  totalStudents: 9000,
  internationalStudents: 0.20,
  programs: [
    {
      slug: 'lakehead-bachelor-business-administration',
      name: 'Bachelor of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 28,000/year',
      description: 'A four-year BBA covering accounting, marketing, finance, and entrepreneurship with co-op opportunities.',
    },
    {
      slug: 'lakehead-bachelor-engineering',
      name: 'Bachelor of Engineering (Civil)',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 30,000/year',
      description: 'CEAB-accredited civil engineering degree with hands-on lab experience and Northern Ontario project exposure.',
    },
    {
      slug: 'lakehead-bachelor-environmental-science',
      name: 'Bachelor of Environmental Science',
      field: 'Environmental Studies',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 27,500/year',
      description: 'Interdisciplinary program combining ecology, chemistry, and geography in Northwestern Ontario\'s natural environment.',
    },
    {
      slug: 'lakehead-bachelor-computer-science',
      name: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 27,000/year',
      description: 'Covers algorithms, software engineering, data structures, and AI with industry practicum options.',
    },
    {
      slug: 'lakehead-master-business-administration',
      name: 'Master of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 32,000/year',
      description: 'MBA with concentrations in Indigenous business, supply chain, and health management.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Choose Program & Check Requirements', description: 'Review admission requirements for your chosen program on the Lakehead University website.' },
    { stepNumber: 2, title: 'Submit Online Application', description: 'Apply through the Ontario Universities\' Application Centre (OUAC) or directly via Lakehead\'s portal.' },
    { stepNumber: 3, title: 'Upload Supporting Documents', description: 'Provide transcripts, English proficiency results (IELTS 6.5+), and a personal statement.' },
    { stepNumber: 4, title: 'Receive Offer & Accept', description: 'Review your conditional or unconditional offer and confirm enrolment before the deadline.' },
  ],
  scholarships: [
    {
      name: 'Lakehead University International Entrance Scholarship',
      value: 'CAD 4,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded to high-achieving international students entering first year with a strong academic record.',
    },
    {
      name: 'President\'s Scholarship for World Leaders',
      value: 'CAD 7,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Competitive award recognizing exceptional leadership, community involvement, and academic excellence.',
    },
  ],
};

export const GEORGIAN_COLLEGE = {
  slug: 'georgian-college',
  name: 'Georgian College',
  city: 'Barrie, ON',
  shortDescription: 'A leading Ontario college offering career-focused programs in technology, health, and business with strong employer partnerships.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 80,
  tuitionFeeMin: 14000,
  tuitionFeeMax: 19000,
  tuitionCurrency: 'CAD',
  foundedYear: 1967,
  totalStudents: 13000,
  internationalStudents: 0.28,
  programs: [
    {
      slug: 'georgian-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,000/year',
      description: 'Foundational business diploma covering accounting, marketing, human resources, and business communications.',
    },
    {
      slug: 'georgian-diploma-computer-programming',
      name: 'Computer Programming Diploma',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,500/year',
      description: 'Equips students with programming skills in Java, Python, and web development for the Ontario tech sector.',
    },
    {
      slug: 'georgian-diploma-mechanical-engineering-technology',
      name: 'Mechanical Engineering Technology Diploma',
      field: 'Engineering',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description: 'Applied engineering program covering design, manufacturing, and industrial systems with CAD software training.',
    },
    {
      slug: 'georgian-diploma-early-childhood-education',
      name: 'Early Childhood Education Diploma',
      field: 'Education',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description: 'Prepares students for careers in childcare settings with placements in licensed Ontario centres.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research Programs', description: 'Browse Georgian College\'s full program list and confirm entry requirements for your chosen field.' },
    { stepNumber: 2, title: 'Apply via ontariocolleges.ca', description: 'Submit your application through the Ontario Colleges application portal along with all transcripts.' },
    { stepNumber: 3, title: 'Provide Language Scores', description: 'Submit IELTS (6.0 overall) or equivalent English proficiency results as required.' },
    { stepNumber: 4, title: 'Accept Offer & Pay Deposit', description: 'Confirm your seat by the deadline and pay the enrolment deposit to secure your place.' },
  ],
  scholarships: [
    {
      name: 'Georgian College International Student Award',
      value: 'CAD 2,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'One-time award for international students demonstrating academic merit upon entry.',
    },
    {
      name: 'Georgian Continuing Excellence Award',
      value: 'CAD 1,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded to returning international students maintaining a GPA of 3.5 or above.',
    },
  ],
};

export const NIPISSING_UNIVERSITY = {
  slug: 'nipissing-university',
  name: 'Nipissing University',
  city: 'North Bay, ON',
  shortDescription: 'A student-centred university in Northern Ontario recognized for its education faculty, small class sizes, and close faculty-student relationships.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 79,
  tuitionFeeMin: 22000,
  tuitionFeeMax: 27000,
  tuitionCurrency: 'CAD',
  foundedYear: 1992,
  totalStudents: 4500,
  internationalStudents: 0.18,
  programs: [
    {
      slug: 'nipissing-bachelor-education',
      name: 'Bachelor of Education',
      field: 'Education',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 24,000/year',
      description: 'Nationally recognized teacher education program with extensive field placement in Ontario schools.',
    },
    {
      slug: 'nipissing-bachelor-arts-psychology',
      name: 'Bachelor of Arts in Psychology',
      field: 'Psychology',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,500/year',
      description: 'Comprehensive psychology program with research methods, cognitive science, and counselling foundations.',
    },
    {
      slug: 'nipissing-bachelor-business-administration',
      name: 'Bachelor of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,000/year',
      description: 'Business degree with streams in finance, marketing, and management, featuring community business projects.',
    },
    {
      slug: 'nipissing-bachelor-criminology',
      name: 'Bachelor of Arts in Criminology',
      field: 'Social Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description: 'Examines crime, justice, and social policy with experiential learning opportunities in community settings.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Check Program Requirements', description: 'Review academic prerequisites on the Nipissing website for your chosen undergraduate program.' },
    { stepNumber: 2, title: 'Apply via OUAC', description: 'Submit application through the Ontario Universities\' Application Centre (OUAC).' },
    { stepNumber: 3, title: 'Send English Proficiency', description: 'Provide IELTS 6.5 or TOEFL 88+ results along with official transcripts.' },
    { stepNumber: 4, title: 'Receive Offer & Confirm', description: 'Accept your offer online and submit the enrolment confirmation and tuition deposit.' },
  ],
  scholarships: [
    {
      name: 'Nipissing International Entrance Award',
      value: 'CAD 3,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Entrance scholarship for international undergraduates with a minimum 80% academic average.',
    },
  ],
};

export const CAMBRIAN_COLLEGE = {
  slug: 'cambrian-college',
  name: 'Cambrian College',
  city: 'Sudbury, ON',
  shortDescription: 'Northern Ontario\'s applied arts and technology college offering diploma and degree programs with strong ties to the regional mining and healthcare sectors.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 82,
  tuitionFeeMin: 13500,
  tuitionFeeMax: 18500,
  tuitionCurrency: 'CAD',
  foundedYear: 1967,
  totalStudents: 8500,
  internationalStudents: 0.22,
  programs: [
    {
      slug: 'cambrian-diploma-mining-engineering-technology',
      name: 'Mining Engineering Technology Diploma',
      field: 'Engineering',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description: 'Specialized program preparing students for careers in underground and surface mining operations.',
    },
    {
      slug: 'cambrian-diploma-business-accounting',
      name: 'Business — Accounting Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,000/year',
      description: 'Covers financial reporting, taxation, and management accounting with QuickBooks and Excel proficiency.',
    },
    {
      slug: 'cambrian-diploma-personal-support-worker',
      name: 'Personal Support Worker Diploma',
      field: 'Healthcare',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 13,500/year',
      description: 'Fast-track program training students for in-demand PSW roles in long-term care and home support settings.',
    },
    {
      slug: 'cambrian-diploma-information-technology',
      name: 'Computer Systems Technology Diploma',
      field: 'Information Technology',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description: 'Networking, cybersecurity, and systems administration program aligned with CompTIA and Cisco certifications.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Select a Program', description: 'Review Cambrian College\'s program guide and confirm entry requirements.' },
    { stepNumber: 2, title: 'Apply via ontariocolleges.ca', description: 'Complete your application through the Ontario Colleges portal and submit all required documents.' },
    { stepNumber: 3, title: 'Submit Language Test Results', description: 'Provide IELTS 6.0 or equivalent. Some programs require specific sub-scores.' },
    { stepNumber: 4, title: 'Accept Offer & Enrol', description: 'Review your offer letter, pay the acceptance deposit, and register for classes.' },
  ],
  scholarships: [
    {
      name: 'Cambrian College International Excellence Award',
      value: 'CAD 2,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Recognizes academic excellence in international students entering any Cambrian diploma program.',
    },
  ],
};

export const KEYANO_COLLEGE = {
  slug: 'keyano-college',
  name: 'Keyano College',
  city: 'Fort McMurray, AB',
  shortDescription: 'A publicly funded college in Alberta\'s energy heartland offering applied programs in trades, technology, and health linked to the oil sands industry.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 85,
  tuitionFeeMin: 11000,
  tuitionFeeMax: 16000,
  tuitionCurrency: 'CAD',
  foundedYear: 1965,
  totalStudents: 2500,
  internationalStudents: 0.15,
  programs: [
    {
      slug: 'keyano-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 12,000/year',
      description: 'Core business education covering accounting, management, and entrepreneurship suited to Northern Alberta\'s resource economy.',
    },
    {
      slug: 'keyano-certificate-oil-gas-technology',
      name: 'Oil and Gas Technology Certificate',
      field: 'Engineering Technology',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 14,000/year',
      description: 'Practical training in upstream oil and gas operations, safety standards, and field instrumentation.',
    },
    {
      slug: 'keyano-diploma-early-childhood-education',
      name: 'Early Childhood Education Diploma',
      field: 'Education',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 11,500/year',
      description: 'Prepares students for Alberta ECE certification with field practicums in local childcare facilities.',
    },
    {
      slug: 'keyano-certificate-welding',
      name: 'Welding Foundation Certificate',
      field: 'Trades',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 13,000/year',
      description: 'Foundations in SMAW, MIG, and TIG welding for entry into apprenticeship pathways.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Select Program & Review Requirements', description: 'Check Keyano College\'s admissions page for program-specific prerequisites and English requirements.' },
    { stepNumber: 2, title: 'Apply Online', description: 'Submit your application through Keyano\'s online portal, paying the non-refundable application fee.' },
    { stepNumber: 3, title: 'Submit Documentation', description: 'Upload transcripts, passport, and IELTS 6.0+ results or equivalent language proficiency evidence.' },
    { stepNumber: 4, title: 'Receive Offer & Confirm', description: 'Accept your offer by the deadline and apply for your Canadian student visa.' },
  ],
  scholarships: [
    {
      name: 'Keyano College Academic Achievement Award',
      value: 'CAD 1,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Available to high-achieving international students entering diploma or certificate programs.',
    },
  ],
};

export const HUMBER_COLLEGE = {
  slug: 'humber-college',
  name: 'Humber College',
  city: 'Toronto, ON',
  shortDescription: 'One of Canada\'s largest polytechnic institutions offering over 150 full-time programs across business, health, creative arts, technology, and social services in Toronto.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 73,
  tuitionFeeMin: 16000,
  tuitionFeeMax: 23000,
  tuitionCurrency: 'CAD',
  foundedYear: 1967,
  totalStudents: 32000,
  internationalStudents: 0.35,
  programs: [
    {
      slug: 'humber-diploma-business-marketing',
      name: 'Business Marketing Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,000/year',
      description: 'Covers digital marketing, brand management, consumer behaviour, and market research in a Toronto business context.',
    },
    {
      slug: 'humber-diploma-computer-programming',
      name: 'Computer Programming Diploma',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,500/year',
      description: 'Teaches Java, Python, web and mobile development with co-op placement options across the GTA tech sector.',
    },
    {
      slug: 'humber-diploma-game-programming',
      name: 'Game Programming Diploma',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 3,
      tuitionFeePerYear: 'CAD 19,000/year',
      description: 'Hands-on game design and development program using Unity and Unreal Engine in Humber\'s creative labs.',
    },
    {
      slug: 'humber-bachelor-interior-design',
      name: 'Bachelor of Interior Design',
      field: 'Design',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 21,000/year',
      description: 'NCIDQ-pathway degree combining design principles, CAD/BIM software, and Toronto studio projects.',
    },
    {
      slug: 'humber-diploma-social-service-worker',
      name: 'Social Service Worker Diploma',
      field: 'Social Sciences',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,500/year',
      description: 'Prepares graduates for front-line community and social service roles with extensive field placement hours.',
    },
    {
      slug: 'humber-diploma-nursing-bridging',
      name: 'Practical Nursing Diploma',
      field: 'Healthcare',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 20,000/year',
      description: 'Ontario PN program aligned with CNO standards, featuring clinical placements in Toronto-area hospitals.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research & Select Program', description: 'Browse Humber\'s program finder and confirm specific academic and English requirements.' },
    { stepNumber: 2, title: 'Apply via ontariocolleges.ca', description: 'Submit your application through the Ontario Colleges portal before the posted deadline.' },
    { stepNumber: 3, title: 'Provide English Proficiency', description: 'Submit IELTS 6.0–6.5 (program-dependent) or TOEFL iBT 80+ along with transcripts.' },
    { stepNumber: 4, title: 'Pay Deposit & Register', description: 'Confirm your offer, pay the tuition deposit, and complete the online registration process.' },
  ],
  scholarships: [
    {
      name: 'Humber International Entrance Scholarship',
      value: 'CAD 3,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Competitive entrance award for international students with a strong academic record entering any Humber program.',
    },
    {
      name: 'Humber Continuing Academic Excellence Award',
      value: 'CAD 2,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded to returning international students who maintain a semester GPA of 3.7 or higher.',
    },
  ],
};

export const NORTH_ISLAND_COLLEGE = {
  slug: 'north-island-college',
  name: 'North Island College',
  city: 'Courtenay, BC',
  shortDescription: 'A community college serving Vancouver Island\'s northern communities with trades, business, and university transfer programs in a scenic coastal setting.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 85,
  tuitionFeeMin: 12000,
  tuitionFeeMax: 16500,
  tuitionCurrency: 'CAD',
  foundedYear: 1975,
  totalStudents: 4500,
  internationalStudents: 0.12,
  programs: [
    {
      slug: 'nic-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 13,500/year',
      description: 'Comprehensive business diploma with a focus on small business management and Pacific Northwest market conditions.',
    },
    {
      slug: 'nic-certificate-carpentry',
      name: 'Carpentry Foundation Certificate',
      field: 'Trades',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 14,000/year',
      description: 'Foundation trades program covering residential and light commercial carpentry and building code fundamentals.',
    },
    {
      slug: 'nic-diploma-health-care-assistant',
      name: 'Health Care Assistant Diploma',
      field: 'Healthcare',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 12,500/year',
      description: 'Trains students for HCA roles in long-term care and community settings across BC with clinical practicums.',
    },
    {
      slug: 'nic-diploma-university-arts-transfer',
      name: 'University Arts Transfer Diploma',
      field: 'Liberal Arts',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 12,000/year',
      description: 'Two-year transfer pathway granting entry into third year of BC university programs in humanities and social sciences.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Choose Program & Review Intake Dates', description: 'Confirm program start dates and prerequisites on the NIC website.' },
    { stepNumber: 2, title: 'Apply Online', description: 'Submit your application through North Island College\'s online admissions portal.' },
    { stepNumber: 3, title: 'Submit Documents', description: 'Provide transcripts and IELTS 5.5+ or equivalent English proof. Some programs require higher scores.' },
    { stepNumber: 4, title: 'Receive Offer & Register', description: 'Confirm your seat, pay tuition deposit, and arrange your study permit.' },
  ],
  scholarships: [
    {
      name: 'NIC International Student Award',
      value: 'CAD 1,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Merit scholarship for international students entering NIC with strong academic credentials.',
    },
  ],
};

export const DURHAM_COLLEGE = {
  slug: 'durham-college',
  name: 'Durham College',
  city: 'Oshawa, ON',
  shortDescription: 'A forward-thinking Ontario college offering market-responsive programs in technology, media, health, and skilled trades east of Toronto in the Durham Region.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 78,
  tuitionFeeMin: 14500,
  tuitionFeeMax: 21000,
  tuitionCurrency: 'CAD',
  foundedYear: 1967,
  totalStudents: 14500,
  internationalStudents: 0.30,
  programs: [
    {
      slug: 'durham-diploma-computer-programmer-analyst',
      name: 'Computer Programmer Analyst Diploma',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 3,
      tuitionFeePerYear: 'CAD 18,000/year',
      description: 'Advanced diploma in software development, database management, and system analysis with industry co-op.',
    },
    {
      slug: 'durham-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,000/year',
      description: 'Covers core business functions including accounting, HR, marketing, and operations with real-world projects.',
    },
    {
      slug: 'durham-diploma-cybersecurity',
      name: 'Cybersecurity Diploma',
      field: 'Information Technology',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 19,000/year',
      description: 'Focuses on ethical hacking, network security, risk management, and incident response aligned with industry certifications.',
    },
    {
      slug: 'durham-diploma-media-fundamentals',
      name: 'Media Fundamentals Diploma',
      field: 'Media & Communications',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description: 'Training in digital content creation, video production, journalism, and social media strategy.',
    },
    {
      slug: 'durham-bachelor-business-administration',
      name: 'Bachelor of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 20,000/year',
      description: 'Four-year degree with concentrations in marketing, accounting, and supply chain management.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Find Your Program', description: 'Use Durham College\'s program search tool to identify your field of study and entry requirements.' },
    { stepNumber: 2, title: 'Apply via ontariocolleges.ca', description: 'Complete your application through the Ontario Colleges portal, paying the required application fee.' },
    { stepNumber: 3, title: 'Upload Language Proof', description: 'Provide IELTS 6.0 overall (with no band below 5.5) or equivalent English test results.' },
    { stepNumber: 4, title: 'Confirm Offer & Arrange Study Permit', description: 'Accept your offer, pay the deposit, and begin your Canadian study permit application.' },
  ],
  scholarships: [
    {
      name: 'Durham College International Entrance Award',
      value: 'CAD 3,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Offered to international students entering Durham with a strong high school academic record.',
    },
    {
      name: 'Durham College Continuing Achievement Bursary',
      value: 'CAD 1,500',
      type: ScholarshipType.PARTIAL,
      description: 'Partial funding support for returning international students demonstrating financial need and academic progress.',
    },
  ],
};

export const CAMOSUN_COLLEGE = {
  slug: 'camosun-college',
  name: 'Camosun College',
  city: 'Victoria, BC',
  shortDescription: 'A public college in Victoria offering degree, diploma, and trades programs with a strong focus on applied learning and student support in BC\'s capital city.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 80,
  tuitionFeeMin: 13000,
  tuitionFeeMax: 18500,
  tuitionCurrency: 'CAD',
  foundedYear: 1971,
  totalStudents: 9000,
  internationalStudents: 0.20,
  programs: [
    {
      slug: 'camosun-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description: 'Broad business education covering finance, marketing, HR, and operations with Victoria\'s growing business community.',
    },
    {
      slug: 'camosun-diploma-computer-information-systems',
      name: 'Computer Information Systems Diploma',
      field: 'Information Technology',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description: 'Covers networking, database administration, and cybersecurity fundamentals with hands-on lab sessions.',
    },
    {
      slug: 'camosun-diploma-early-childhood-care',
      name: 'Early Childhood Care and Education Diploma',
      field: 'Education',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 13,500/year',
      description: 'BC ECE certification program with placements in licensed childcare settings around greater Victoria.',
    },
    {
      slug: 'camosun-bachelor-business-administration',
      name: 'Bachelor of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 18,000/year',
      description: 'Four-year BBA with streams in accounting, finance, and human resource management.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Select Program & Confirm Prerequisites', description: 'Review Camosun\'s program pages for specific academic and English prerequisites.' },
    { stepNumber: 2, title: 'Apply Online', description: 'Submit your application through Camosun\'s online application portal with all required information.' },
    { stepNumber: 3, title: 'Submit Supporting Documents', description: 'Provide official transcripts and IELTS 6.0+ or equivalent English proficiency results.' },
    { stepNumber: 4, title: 'Accept Your Offer', description: 'Confirm enrolment by the deadline, pay the deposit, and proceed with your study permit application.' },
  ],
  scholarships: [
    {
      name: 'Camosun International Student Award',
      value: 'CAD 2,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Merit-based award for international students entering Camosun with strong academic achievement.',
    },
  ],
};

export const NEWTON_INTERNATIONAL_COLLEGE = {
  slug: 'newton-international-college',
  name: 'Newton International College',
  city: 'Toronto, ON',
  shortDescription: 'A private pathway institution in Toronto providing foundation and diploma programs designed to prepare international students for entry into Canadian universities and colleges.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 90,
  tuitionFeeMin: 10000,
  tuitionFeeMax: 15000,
  tuitionCurrency: 'CAD',
  foundedYear: 2006,
  totalStudents: 800,
  internationalStudents: 0.90,
  programs: [
    {
      slug: 'newton-foundation-university-pathway',
      name: 'University Pathway Foundation Program',
      field: 'Foundation Studies',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 12,000/year',
      description: 'One-year academic and English preparation program bridging international students into Year 1 of Canadian degree programs.',
    },
    {
      slug: 'newton-certificate-academic-english',
      name: 'Academic English Certificate',
      field: 'Language Studies',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 10,000/year',
      description: 'Intensive English language program developing academic writing, reading comprehension, and presentation skills.',
    },
    {
      slug: 'newton-diploma-business-fundamentals',
      name: 'Business Fundamentals Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 13,000/year',
      description: 'Introduction to business concepts, accounting, and marketing providing a pathway into college diploma programs.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Choose Your Pathway', description: 'Consult with Newton\'s admissions team to identify the right foundation or diploma pathway for your goals.' },
    { stepNumber: 2, title: 'Submit Application', description: 'Complete Newton\'s online application form and provide copies of previous academic records.' },
    { stepNumber: 3, title: 'Provide Language Assessment', description: 'Submit existing IELTS/TOEFL scores or sit a Newton placement test to confirm your English level.' },
    { stepNumber: 4, title: 'Accept Offer & Obtain Study Permit', description: 'Accept your offer letter, pay the tuition deposit, and apply for a Canadian student visa.' },
  ],
  scholarships: [
    {
      name: 'Newton Academic Excellence Award',
      value: 'CAD 1,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded to students with strong prior academic results entering the University Pathway Foundation Program.',
    },
  ],
};

export const OCSB = {
  slug: 'ocsb',
  name: 'Ottawa Catholic School Board (OCSB)',
  city: 'Ottawa, ON',
  shortDescription: 'Ottawa\'s publicly funded Catholic school board offering secondary education and ESL support programs, serving as a pathway for international students to obtain an Ontario Secondary School Diploma.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 92,
  tuitionFeeMin: 14000,
  tuitionFeeMax: 17000,
  tuitionCurrency: 'CAD',
  foundedYear: 1984,
  totalStudents: 42000,
  internationalStudents: 0.05,
  programs: [
    {
      slug: 'ocsb-ossd-pathway',
      name: 'Ontario Secondary School Diploma (OSSD) Pathway',
      field: 'Secondary Education',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,000/year',
      description: 'Full Ontario secondary curriculum leading to the OSSD credential, accepted by all Ontario universities and colleges.',
    },
    {
      slug: 'ocsb-esl-program',
      name: 'English as a Second Language (ESL) Program',
      field: 'Language Studies',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 14,000/year',
      description: 'Structured ESL levels integrated into secondary school to develop academic English for university preparation.',
    },
    {
      slug: 'ocsb-credit-recovery',
      name: 'University Preparation Credit Program',
      field: 'Foundation Studies',
      degreeLevel: DegreeType.FOUNDATION,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 14,500/year',
      description: 'Targeted Grade 11–12 courses in math, science, and English to meet Ontario university admission requirements.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Contact the International Programs Office', description: 'Reach out to OCSB\'s International Programs department to confirm availability and program fit.' },
    { stepNumber: 2, title: 'Submit Application & Documents', description: 'Provide passport, previous school transcripts, and proof of immigration status or study permit.' },
    { stepNumber: 3, title: 'English Assessment', description: 'Complete an English language assessment to determine appropriate grade level and ESL support needs.' },
    { stepNumber: 4, title: 'Receive Acceptance Letter & Register', description: 'Obtain the OCSB acceptance letter needed for your Canadian study permit application, then complete registration.' },
  ],
  scholarships: [
    {
      name: 'OCSB International Student Bursary',
      value: 'CAD 1,000',
      type: ScholarshipType.PARTIAL,
      description: 'Limited bursary support for international students demonstrating financial need during their secondary studies.',
    },
  ],
};

export const SELKIRK_COLLEGE = {
  slug: 'selkirk-college',
  name: 'Selkirk College',
  city: 'Castlegar, BC',
  shortDescription: 'A BC college nestled in the Kootenay mountains offering outdoor recreation, applied arts, trades, and health programs with small class sizes and a welcoming community.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 83,
  tuitionFeeMin: 12000,
  tuitionFeeMax: 16000,
  tuitionCurrency: 'CAD',
  foundedYear: 1966,
  totalStudents: 3000,
  internationalStudents: 0.14,
  programs: [
    {
      slug: 'selkirk-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 13,000/year',
      description: 'Practical business diploma with real-world projects and a regional focus on Kootenay-area enterprise.',
    },
    {
      slug: 'selkirk-diploma-outdoor-recreation',
      name: 'Outdoor Recreation, Ski Resort Operations & Avalanche Diploma',
      field: 'Recreation & Tourism',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 15,000/year',
      description: 'Unique program combining outdoor leadership, avalanche safety, and ski resort management in a mountain setting.',
    },
    {
      slug: 'selkirk-diploma-music',
      name: 'Music Diploma',
      field: 'Arts & Music',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 13,500/year',
      description: 'Performance and theory program in jazz, classical, and contemporary music with transfer pathways to BC universities.',
    },
    {
      slug: 'selkirk-certificate-culinary-arts',
      name: 'Culinary Arts Certificate',
      field: 'Hospitality',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 14,500/year',
      description: 'Red Seal pathway training in classical and contemporary cooking techniques for hospitality and food service careers.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Explore Programs Online', description: 'Review Selkirk College\'s program offerings and confirm specific prerequisites and intake dates.' },
    { stepNumber: 2, title: 'Apply Online', description: 'Submit your application through Selkirk\'s online application system with the required fee.' },
    { stepNumber: 3, title: 'Provide English Proficiency', description: 'Submit IELTS 6.0 or equivalent. Some programs require portfolio or audition submissions.' },
    { stepNumber: 4, title: 'Accept Offer & Register', description: 'Accept your letter of acceptance, pay the deposit, and apply for your Canadian study permit.' },
  ],
  scholarships: [
    {
      name: 'Selkirk College International Excellence Award',
      value: 'CAD 1,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Recognizes high-achieving international students entering any Selkirk College program.',
    },
  ],
};

export const BCIT = {
  slug: 'bcit',
  name: 'British Columbia Institute of Technology (BCIT)',
  city: 'Burnaby, BC',
  shortDescription: 'BC\'s premier polytechnic institution offering industry-aligned diploma, bachelor\'s, and master\'s programs in technology, engineering, business, and health with exceptional graduate employment rates.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 60,
  tuitionFeeMin: 17000,
  tuitionFeeMax: 28000,
  tuitionCurrency: 'CAD',
  foundedYear: 1964,
  totalStudents: 50000,
  internationalStudents: 0.22,
  programs: [
    {
      slug: 'bcit-diploma-computer-systems-technology',
      name: 'Computer Systems Technology Diploma',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 22,000/year',
      description: 'Intensive two-year full-time program in software development, networking, and systems analysis.',
    },
    {
      slug: 'bcit-bachelor-business-administration',
      name: 'Bachelor of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 21,000/year',
      description: 'Applied degree with streams in accounting, finance, marketing, and supply chain management.',
    },
    {
      slug: 'bcit-bachelor-engineering-tech-civil',
      name: 'Bachelor of Engineering Technology — Civil',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 24,000/year',
      description: 'Applied civil engineering degree focused on infrastructure design, project management, and environmental systems.',
    },
    {
      slug: 'bcit-diploma-network-security-analyst',
      name: 'Network Security Analyst Diploma',
      field: 'Information Technology',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 23,000/year',
      description: 'Cybersecurity-focused diploma covering threat analysis, ethical hacking, and security operations.',
    },
    {
      slug: 'bcit-bachelor-nursing',
      name: 'Bachelor of Science in Nursing',
      field: 'Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 26,000/year',
      description: 'CRNBC-pathway nursing degree with clinical placements in Metro Vancouver\'s major health authorities.',
    },
    {
      slug: 'bcit-master-applied-science-building-engg',
      name: 'Master of Applied Science in Building Engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 28,000/year',
      description: 'Graduate program blending research and applied practice in sustainable building systems and construction technology.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Identify Your Program', description: 'Research BCIT programs carefully; many have specific prerequisites and competitive intake processes.' },
    { stepNumber: 2, title: 'Apply via BCIT\'s Application Portal', description: 'Submit your online application directly through BCIT\'s website and pay the application fee.' },
    { stepNumber: 3, title: 'Provide Documentation', description: 'Upload transcripts, English proficiency results (IELTS 6.5+ for most programs), and any required portfolios.' },
    { stepNumber: 4, title: 'Receive Offer & Apply for Study Permit', description: 'Accept your conditional or unconditional offer and initiate your Canadian study permit application.' },
  ],
  scholarships: [
    {
      name: 'BCIT International Student Award',
      value: 'CAD 5,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Competitive award for international students entering BCIT with exceptional academic and professional credentials.',
    },
    {
      name: 'BCIT Continuing Excellence Scholarship',
      value: 'CAD 3,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded to returning international students maintaining a GPA of 3.7 or above.',
    },
  ],
};

export const LANGARA_COLLEGE = {
  slug: 'langara-college',
  name: 'Langara College',
  city: 'Vancouver, BC',
  shortDescription: 'A leading transfer institution and applied education college in Vancouver, known for university transfer pathways, ESL programs, and career-focused diplomas.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 74,
  tuitionFeeMin: 15000,
  tuitionFeeMax: 22000,
  tuitionCurrency: 'CAD',
  foundedYear: 1994,
  totalStudents: 23000,
  internationalStudents: 0.40,
  programs: [
    {
      slug: 'langara-associate-arts',
      name: 'Associate of Arts',
      field: 'Liberal Arts',
      degreeLevel: DegreeType.ASSOCIATE,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,500/year',
      description: 'Two-year transfer credential providing pathways into Year 3 of UBC, SFU, and other BC universities.',
    },
    {
      slug: 'langara-associate-science',
      name: 'Associate of Science',
      field: 'Science',
      degreeLevel: DegreeType.ASSOCIATE,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 17,500/year',
      description: 'Science transfer diploma with streams in biology, chemistry, and physics for entry into BC university science programs.',
    },
    {
      slug: 'langara-diploma-computer-science',
      name: 'Post-Degree Diploma in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 20,000/year',
      description: 'Accelerated computer science program for degree holders seeking technical skills in programming and data management.',
    },
    {
      slug: 'langara-diploma-business-management',
      name: 'Business Management Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,000/year',
      description: 'Career-focused business diploma covering management, finance, and marketing in a Vancouver business context.',
    },
    {
      slug: 'langara-certificate-esl',
      name: 'English for Academic Purposes Certificate',
      field: 'Language Studies',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 15,000/year',
      description: 'Intensive EAP program developing the academic English skills needed for entry into Langara\'s diploma and transfer programs.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Choose Program & Check Admission Requirements', description: 'Review Langara\'s program guide for academic and English requirements specific to your program.' },
    { stepNumber: 2, title: 'Apply Online', description: 'Submit your application directly via Langara\'s international student application portal.' },
    { stepNumber: 3, title: 'Submit Official Documents', description: 'Provide certified transcripts and IELTS 6.5+ (or program-specific equivalent) results.' },
    { stepNumber: 4, title: 'Accept Offer & Confirm Enrolment', description: 'Review your offer, pay the deposit, and complete registration to secure your place.' },
  ],
  scholarships: [
    {
      name: 'Langara International Excellence Award',
      value: 'CAD 4,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Competitive merit scholarship for international students entering Langara with outstanding academic records.',
    },
    {
      name: 'Langara Continuing Student Scholarship',
      value: 'CAD 2,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded to returning international students in good academic standing.',
    },
  ],
};

export const FLEMING_COLLEGE = {
  slug: 'fleming-college',
  name: 'Fleming College',
  city: 'Peterborough, ON',
  shortDescription: 'An Ontario college renowned for its environmental, natural resource, and heritage programs, as well as business, technology, and health education in the Kawartha Lakes region.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 80,
  tuitionFeeMin: 14000,
  tuitionFeeMax: 19500,
  tuitionCurrency: 'CAD',
  foundedYear: 1967,
  totalStudents: 7000,
  internationalStudents: 0.25,
  programs: [
    {
      slug: 'fleming-diploma-environmental-technology',
      name: 'Environmental Technology Diploma',
      field: 'Environmental Studies',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,500/year',
      description: 'Specialized program covering water quality, environmental compliance, and resource management in Ontario\'s natural landscapes.',
    },
    {
      slug: 'fleming-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,500/year',
      description: 'Comprehensive business education with accounting, marketing, and management fundamentals.',
    },
    {
      slug: 'fleming-diploma-computer-applications',
      name: 'Computer Applications Diploma',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 16,000/year',
      description: 'Practical IT program teaching web development, database design, and system support.',
    },
    {
      slug: 'fleming-diploma-architectural-technology',
      name: 'Architectural Technology Diploma',
      field: 'Architecture',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 3,
      tuitionFeePerYear: 'CAD 17,000/year',
      description: 'Advanced diploma in architectural drafting, BIM, sustainable design, and construction documentation.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research Programs', description: 'Explore Fleming College\'s program catalogue and verify entry requirements for your chosen field.' },
    { stepNumber: 2, title: 'Apply via ontariocolleges.ca', description: 'Submit your Ontario Colleges application with required documentation.' },
    { stepNumber: 3, title: 'Provide English Proficiency', description: 'Submit IELTS 6.0 or equivalent language test results along with official transcripts.' },
    { stepNumber: 4, title: 'Accept Offer & Register', description: 'Confirm your enrolment, pay the deposit, and arrange your Canadian study permit.' },
  ],
  scholarships: [
    {
      name: 'Fleming College International Student Award',
      value: 'CAD 2,500',
      type: ScholarshipType.MERIT_BASED,
      description: 'Merit-based award for incoming international students with a strong academic background.',
    },
  ],
};

export const MACEWAN_UNIVERSITY = {
  slug: 'macewan-university',
  name: 'MacEwan University',
  city: 'Edmonton, AB',
  shortDescription: 'A public university in downtown Edmonton offering bachelor\'s and applied programs in arts, sciences, business, and health with a strong emphasis on undergraduate teaching quality.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 72,
  tuitionFeeMin: 22000,
  tuitionFeeMax: 29000,
  tuitionCurrency: 'CAD',
  foundedYear: 1971,
  totalStudents: 19000,
  internationalStudents: 0.18,
  programs: [
    {
      slug: 'macewan-bachelor-commerce',
      name: 'Bachelor of Commerce',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 25,000/year',
      description: 'Undergraduate business degree with majors in accounting, finance, marketing, and entrepreneurship.',
    },
    {
      slug: 'macewan-bachelor-computer-science',
      name: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 24,000/year',
      description: 'Rigorous CS degree covering algorithms, artificial intelligence, software engineering, and data science.',
    },
    {
      slug: 'macewan-bachelor-nursing',
      name: 'Bachelor of Science in Nursing',
      field: 'Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 27,000/year',
      description: 'CARNA-pathway nursing program with clinical placements in Edmonton\'s major health centres.',
    },
    {
      slug: 'macewan-bachelor-arts-psychology',
      name: 'Bachelor of Arts in Psychology',
      field: 'Psychology',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description: 'Evidence-based psychology degree with experiential learning, research methods, and community practicum.',
    },
    {
      slug: 'macewan-bachelor-social-work',
      name: 'Bachelor of Social Work',
      field: 'Social Work',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,000/year',
      description: 'CASWE-accredited social work degree with field placements in Edmonton\'s diverse social service sector.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Review Admission Requirements', description: 'Check MacEwan\'s program-specific admission requirements, including prerequisite courses and GPA standards.' },
    { stepNumber: 2, title: 'Apply via ApplyAlberta', description: 'Submit your application through the ApplyAlberta portal and pay the application fee.' },
    { stepNumber: 3, title: 'Submit Documents', description: 'Provide certified transcripts and IELTS 6.5+ or TOEFL 88+ results.' },
    { stepNumber: 4, title: 'Receive Offer & Confirm Enrolment', description: 'Accept your offer, pay the acceptance deposit, and register for courses.' },
  ],
  scholarships: [
    {
      name: 'MacEwan University International Entrance Scholarship',
      value: 'CAD 5,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Competitive entrance scholarship for international students with a minimum 85% academic average.',
    },
    {
      name: 'MacEwan International Student Bursary',
      value: 'CAD 2,500',
      type: ScholarshipType.PARTIAL,
      description: 'Partial funding for international students who demonstrate financial need and are in good academic standing.',
    },
  ],
};

export const ONTARIO_TECH_UNIVERSITY = {
  slug: 'ontario-tech-university',
  name: 'Ontario Tech University',
  city: 'Oshawa, ON',
  shortDescription: 'A technology-focused university in Oshawa offering engineering, computing, and business programs with a mandate to develop technology-literate professionals across all disciplines.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 65,
  tuitionFeeMin: 29000,
  tuitionFeeMax: 37000,
  tuitionCurrency: 'CAD',
  foundedYear: 2002,
  totalStudents: 11000,
  internationalStudents: 0.28,
  programs: [
    {
      slug: 'ontario-tech-bachelor-software-engineering',
      name: 'Bachelor of Engineering — Software Engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 34,000/year',
      description: 'CEAB-accredited software engineering degree covering system design, AI, cybersecurity, and software processes.',
    },
    {
      slug: 'ontario-tech-bachelor-computer-science',
      name: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 32,000/year',
      description: 'Comprehensive CS program with streams in game development, information security, and artificial intelligence.',
    },
    {
      slug: 'ontario-tech-bachelor-business-it',
      name: 'Bachelor of Commerce — IT Management',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 30,000/year',
      description: 'Business degree integrating technology management, digital transformation, and entrepreneurship.',
    },
    {
      slug: 'ontario-tech-bachelor-mechatronics',
      name: 'Bachelor of Engineering — Mechatronics',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 35,000/year',
      description: 'Interdisciplinary engineering program combining mechanical, electrical, and computer engineering systems.',
    },
    {
      slug: 'ontario-tech-master-applied-science-computing',
      name: 'Master of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 37,000/year',
      description: 'Research and course-based graduate options in AI, cybersecurity, and software systems.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Select Program & Review Requirements', description: 'Check Ontario Tech\'s admission requirements, including prerequisite courses in mathematics and sciences.' },
    { stepNumber: 2, title: 'Apply via OUAC', description: 'Submit your application through the Ontario Universities\' Application Centre (OUAC 101 or 105).' },
    { stepNumber: 3, title: 'Submit Language & Academic Documents', description: 'Provide IELTS 6.5 (no band below 6.0) or TOEFL 88+ and certified transcripts.' },
    { stepNumber: 4, title: 'Accept Offer & Confirm Enrolment', description: 'Accept your offer online, pay the confirmation deposit, and complete registration steps.' },
  ],
  scholarships: [
    {
      name: 'Ontario Tech International Entrance Scholarship',
      value: 'CAD 7,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Renewable scholarship for international students entering Ontario Tech with a minimum 85% average.',
    },
    {
      name: 'Ontario Tech Graduate Excellence Scholarship',
      value: 'CAD 5,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Competitive award for international graduate students with outstanding research or academic credentials.',
    },
  ],
};

export const NYIT_CANADA = {
  slug: 'nyit-canada',
  name: 'NYIT Canada — New York Institute of Technology Vancouver',
  city: 'Vancouver, BC',
  shortDescription: 'The Canadian campus of New York Institute of Technology offering US-style graduate and undergraduate programs in business, technology, and energy management in downtown Vancouver.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 70,
  tuitionFeeMin: 24000,
  tuitionFeeMax: 32000,
  tuitionCurrency: 'CAD',
  foundedYear: 2006,
  totalStudents: 1200,
  internationalStudents: 0.75,
  programs: [
    {
      slug: 'nyit-canada-master-business-administration',
      name: 'Master of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 30,000/year',
      description: 'American-accredited MBA with specializations in finance, marketing, and entrepreneurship delivered in Vancouver.',
    },
    {
      slug: 'nyit-canada-bachelor-computer-science',
      name: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 26,000/year',
      description: 'NYIT\'s globally recognized CS degree covering software engineering, data analytics, and cybersecurity.',
    },
    {
      slug: 'nyit-canada-master-energy-management',
      name: 'Master of Science in Energy Management',
      field: 'Environmental Studies',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 31,000/year',
      description: 'Specialized master\'s program addressing sustainable energy systems, policy, and business strategy.',
    },
    {
      slug: 'nyit-canada-bachelor-information-technology',
      name: 'Bachelor of Technology in Information Technology',
      field: 'Information Technology',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 25,000/year',
      description: 'Applied IT degree focusing on network infrastructure, database systems, and technology project management.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Choose Program & Review Requirements', description: 'Review NYIT Canada\'s program pages and confirm academic entry requirements for your level.' },
    { stepNumber: 2, title: 'Apply Online', description: 'Submit your application through NYIT\'s online application portal for the Vancouver campus.' },
    { stepNumber: 3, title: 'Submit Supporting Documents', description: 'Provide official transcripts, IELTS 6.5+ or TOEFL 88+, and a personal statement or resume.' },
    { stepNumber: 4, title: 'Receive Offer & Confirm', description: 'Accept your conditional or unconditional offer and initiate your Canadian study permit application.' },
  ],
  scholarships: [
    {
      name: 'NYIT Canada Merit Scholarship',
      value: 'CAD 5,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded to exceptional international students entering NYIT Canada\'s undergraduate or graduate programs.',
    },
  ],
};

export const SAULT_COLLEGE = {
  slug: 'sault-college',
  name: 'Sault College',
  city: 'Sault Ste. Marie, ON',
  shortDescription: 'A Northern Ontario college delivering career-focused diploma and degree programs in technology, health, trades, and aviation with strong community and industry ties.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 82,
  tuitionFeeMin: 13500,
  tuitionFeeMax: 19000,
  tuitionCurrency: 'CAD',
  foundedYear: 1965,
  totalStudents: 5500,
  internationalStudents: 0.20,
  programs: [
    {
      slug: 'sault-diploma-business-administration',
      name: 'Business Administration Diploma',
      field: 'Business',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 14,000/year',
      description: 'Foundational business diploma covering accounting, management, and marketing in Northern Ontario\'s economic context.',
    },
    {
      slug: 'sault-diploma-computer-programmer-analyst',
      name: 'Computer Programmer Analyst Diploma',
      field: 'Computer Science',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 3,
      tuitionFeePerYear: 'CAD 16,500/year',
      description: 'Advanced diploma program in software development, database management, and analytical systems.',
    },
    {
      slug: 'sault-diploma-aviation-flight-management',
      name: 'Aviation — Flight Management Diploma',
      field: 'Aviation',
      degreeLevel: DegreeType.DIPLOMA,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 18,500/year',
      description: 'Transport Canada-approved commercial pilot training program with flight simulation and ground school.',
    },
    {
      slug: 'sault-certificate-electrical-industrial',
      name: 'Electrical Techniques Certificate',
      field: 'Trades',
      degreeLevel: DegreeType.CERTIFICATE,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 15,000/year',
      description: 'Electrical trades foundation program leading to apprenticeship pathways in Ontario\'s industrial sector.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research Programs', description: 'Review Sault College\'s program guide and entry requirements for your preferred field of study.' },
    { stepNumber: 2, title: 'Apply via ontariocolleges.ca', description: 'Submit your application through the Ontario Colleges portal.' },
    { stepNumber: 3, title: 'Submit Language Scores & Transcripts', description: 'Provide IELTS 6.0+ and official academic transcripts from all previous institutions.' },
    { stepNumber: 4, title: 'Accept Offer & Register', description: 'Accept your offer, pay the deposit, and complete course registration.' },
  ],
  scholarships: [
    {
      name: 'Sault College International Excellence Award',
      value: 'CAD 2,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Merit award for international students entering Sault College with a strong academic record.',
    },
  ],
};

export const ST_FRANCIS_XAVIER_UNIVERSITY = {
  slug: 'st-francis-xavier-university',
  name: 'St. Francis Xavier University',
  city: 'Antigonish, NS',
  shortDescription: 'A small Catholic liberal arts university in Nova Scotia renowned for the Coady International Institute, strong community development traditions, and close-knit undergraduate experience.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 70,
  tuitionFeeMin: 22000,
  tuitionFeeMax: 28000,
  tuitionCurrency: 'CAD',
  foundedYear: 1853,
  totalStudents: 5500,
  internationalStudents: 0.16,
  programs: [
    {
      slug: 'stfx-bachelor-business-administration',
      name: 'Bachelor of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 24,000/year',
      description: 'Values-driven BBA with majors in accounting, finance, and management drawing on StFX\'s Antigonish community tradition.',
    },
    {
      slug: 'stfx-bachelor-science-computer',
      name: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,000/year',
      description: 'Small-class CS degree covering programming, algorithms, and software engineering with faculty-mentored research.',
    },
    {
      slug: 'stfx-bachelor-arts-development-studies',
      name: 'Bachelor of Arts in Development Studies',
      field: 'Social Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description: 'Unique interdisciplinary program linked to the Coady Institute examining global development, poverty, and community-led change.',
    },
    {
      slug: 'stfx-bachelor-science-biology',
      name: 'Bachelor of Science in Biology',
      field: 'Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,500/year',
      description: 'Biology degree with strengths in aquatic ecology, genetics, and molecular biology in Atlantic Canada\'s natural setting.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Review Program Requirements', description: 'Check StFX\'s undergraduate program requirements, including prerequisite high school courses.' },
    { stepNumber: 2, title: 'Apply Online', description: 'Submit your application through StFX\'s online portal and pay the application fee.' },
    { stepNumber: 3, title: 'Send Academic Documents', description: 'Provide official transcripts and IELTS 6.5 or TOEFL 90+ results.' },
    { stepNumber: 4, title: 'Receive Offer & Confirm', description: 'Accept your conditional or final offer and confirm enrolment before the deadline.' },
  ],
  scholarships: [
    {
      name: 'StFX International Entrance Scholarship',
      value: 'CAD 5,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Renewable merit scholarship for international students entering StFX with an 85%+ academic average.',
    },
    {
      name: 'Coady Institute Community Development Bursary',
      value: 'CAD 3,000',
      type: ScholarshipType.PARTIAL,
      description: 'Awarded to international students with demonstrated commitment to community development and social impact.',
    },
  ],
};

export const UNIVERSITY_OF_BRITISH_COLUMBIA = {
  slug: 'university-of-british-columbia',
  name: 'The University of British Columbia',
  city: 'Vancouver, BC',
  shortDescription: 'One of Canada\'s top two research universities and a global top-40 institution, offering world-class programs across all disciplines on its iconic Vancouver and Okanagan campuses.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: 34,
  acceptanceRate: 52,
  tuitionFeeMin: 35000,
  tuitionFeeMax: 55000,
  tuitionCurrency: 'CAD',
  foundedYear: 1908,
  totalStudents: 68000,
  internationalStudents: 0.30,
  programs: [
    {
      slug: 'ubc-bachelor-science-computer-science',
      name: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 44,000/year',
      description: 'World-ranked CS program covering AI, systems, theory, and human-computer interaction in Vancouver\'s tech hub.',
    },
    {
      slug: 'ubc-bachelor-commerce',
      name: 'Bachelor of Commerce (Sauder School)',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 42,000/year',
      description: 'Globally recognized BCom degree from Sauder School of Business with majors spanning finance, marketing, and operations.',
    },
    {
      slug: 'ubc-bachelor-applied-science-engineering',
      name: 'Bachelor of Applied Science — Engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 48,000/year',
      description: 'CEAB-accredited engineering program with disciplines including civil, electrical, mechanical, and biomedical engineering.',
    },
    {
      slug: 'ubc-bachelor-science-biology',
      name: 'Bachelor of Science in Biology',
      field: 'Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 40,000/year',
      description: 'Research-intensive biology program with access to UBC\'s outstanding laboratories, field stations, and faculty experts.',
    },
    {
      slug: 'ubc-master-science-data-science',
      name: 'Master of Data Science',
      field: 'Data Science',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'CAD 55,000/year',
      description: 'Intensive professional master\'s program combining machine learning, statistics, data visualization, and domain application.',
    },
    {
      slug: 'ubc-phd-computer-science',
      name: 'PhD in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.PHD,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 9,000/year',
      description: 'Doctoral research in AI, systems, computational biology, and human-computer interaction under world-leading faculty.',
    },
    {
      slug: 'ubc-master-business-administration',
      name: 'Master of Business Administration (Sauder)',
      field: 'Business',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 50,000/year',
      description: 'Full-time MBA at Sauder with access to Vancouver\'s Pacific Rim business networks and international exchange options.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research Faculty & Program Requirements', description: 'Review UBC\'s academic requirements for your faculty, noting prerequisite courses and competitive averages.' },
    { stepNumber: 2, title: 'Apply via UBC\'s Online Portal', description: 'Submit your application directly through UBC\'s admissions system before the January 15 deadline for most programs.' },
    { stepNumber: 3, title: 'Submit Academic Documents & Language Scores', description: 'Provide certified transcripts, IELTS 6.5+ overall (with no band below 6.0), and any required portfolios or statements.' },
    { stepNumber: 4, title: 'Receive Offer & Apply for Study Permit', description: 'Accept your conditional or unconditional offer and immediately begin your Canadian study permit application.' },
  ],
  scholarships: [
    {
      name: 'UBC International Major Entrance Scholarship',
      value: 'CAD 40,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Highly competitive renewable scholarship for top international students entering UBC with exceptional academic records and leadership.',
    },
    {
      name: 'Trek Excellence Scholarship for Continuing Students',
      value: 'CAD 5,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Awarded annually to top-ranking international students in second year or above based on the prior year\'s academic standing.',
    },
  ],
};

export const ALGOMA_UNIVERSITY = {
  slug: 'algoma-university',
  name: 'Algoma University',
  city: 'Sault Ste. Marie, ON',
  shortDescription: 'A small Northern Ontario university with a special mandate to serve Anishinaabe people, offering personalized undergraduate education in business, arts, and sciences.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 78,
  tuitionFeeMin: 21000,
  tuitionFeeMax: 26000,
  tuitionCurrency: 'CAD',
  foundedYear: 1967,
  totalStudents: 2500,
  internationalStudents: 0.30,
  programs: [
    {
      slug: 'algoma-bachelor-business-administration',
      name: 'Bachelor of Business Administration',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,500/year',
      description: 'Intimate BBA program with concentrations in accounting, finance, and management in a supportive campus community.',
    },
    {
      slug: 'algoma-bachelor-computer-science',
      name: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 22,000/year',
      description: 'CS degree with small class sizes allowing close faculty interaction in programming, AI, and systems courses.',
    },
    {
      slug: 'algoma-bachelor-psychology',
      name: 'Bachelor of Arts in Psychology',
      field: 'Psychology',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 21,000/year',
      description: 'Research-oriented psychology program with opportunities in clinical, developmental, and community psychology.',
    },
    {
      slug: 'algoma-bachelor-kinesiology',
      name: 'Bachelor of Science in Kinesiology',
      field: 'Health Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 23,000/year',
      description: 'Applied kinesiology degree covering exercise physiology, biomechanics, and health promotion.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Review Admission Requirements', description: 'Check Algoma University\'s program entry requirements and confirm prerequisite courses.' },
    { stepNumber: 2, title: 'Apply via OUAC', description: 'Submit your application through the Ontario Universities\' Application Centre.' },
    { stepNumber: 3, title: 'Send Supporting Documents', description: 'Provide transcripts and IELTS 6.5 or TOEFL 88+ results along with a personal statement.' },
    { stepNumber: 4, title: 'Accept Offer & Confirm Enrolment', description: 'Accept your offer by the stated deadline and pay the confirmation deposit.' },
  ],
  scholarships: [
    {
      name: 'Algoma University International Entrance Scholarship',
      value: 'CAD 4,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Entrance award for international undergraduate students with a minimum 80% academic average.',
    },
    {
      name: 'Algoma Continuing Student Award',
      value: 'CAD 2,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Available to returning international students maintaining a CGPA of 3.5 or higher.',
    },
  ],
};

export const TORONTO_METROPOLITAN_UNIVERSITY = {
  slug: 'toronto-metropolitan-university',
  name: 'Toronto Metropolitan University',
  city: 'Toronto, ON',
  shortDescription: 'A dynamic urban university in the heart of downtown Toronto offering career-focused undergraduate and graduate programs in engineering, business, arts, and health with strong industry connections.',
  logoUrl: null,
  coverImageUrl: null,
  ranking: null,
  acceptanceRate: 58,
  tuitionFeeMin: 31000,
  tuitionFeeMax: 44000,
  tuitionCurrency: 'CAD',
  foundedYear: 1948,
  totalStudents: 46000,
  internationalStudents: 0.25,
  programs: [
    {
      slug: 'tmu-bachelor-engineering-computer',
      name: 'Bachelor of Engineering — Computer Engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 40,000/year',
      description: 'CEAB-accredited computer engineering degree covering embedded systems, digital design, and software engineering in Toronto\'s tech ecosystem.',
    },
    {
      slug: 'tmu-bachelor-commerce-ted-rogers',
      name: 'Bachelor of Commerce (Ted Rogers School)',
      field: 'Business',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 36,000/year',
      description: 'Highly regarded BCom from Ted Rogers School of Management with industry-integrated learning and Toronto business network access.',
    },
    {
      slug: 'tmu-bachelor-data-science',
      name: 'Bachelor of Science — Data Science',
      field: 'Data Science',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 38,000/year',
      description: 'Interdisciplinary data science degree combining statistics, machine learning, and domain-specific applications.',
    },
    {
      slug: 'tmu-bachelor-nursing',
      name: 'Bachelor of Science in Nursing',
      field: 'Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 37,000/year',
      description: 'CNO-pathway nursing degree with clinical placements at major Toronto teaching hospitals.',
    },
    {
      slug: 'tmu-bachelor-creative-industries',
      name: 'Bachelor of Arts — Creative Industries',
      field: 'Arts & Media',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'CAD 33,000/year',
      description: 'Unique program fusing media production, business, and design for careers in Toronto\'s vibrant creative economy.',
    },
    {
      slug: 'tmu-master-engineering-electrical',
      name: 'Master of Engineering — Electrical Engineering',
      field: 'Engineering',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 43,000/year',
      description: 'Course-based graduate program in electrical engineering with specializations in communications, power, and photonics.',
    },
    {
      slug: 'tmu-master-science-data-science-analytics',
      name: 'Master of Science — Data Science and Analytics',
      field: 'Data Science',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'CAD 44,000/year',
      description: 'Graduate program developing expertise in big data analytics, machine learning pipelines, and business intelligence.',
    },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research Program Requirements', description: 'Check TMU\'s specific admission requirements for competitive programs; many require supplementary applications.' },
    { stepNumber: 2, title: 'Apply via OUAC', description: 'Submit your undergraduate application through OUAC or TMU\'s graduate portal for master\'s programs.' },
    { stepNumber: 3, title: 'Complete Supplementary Applications', description: 'Many TMU programs require additional submissions such as personal statements, portfolios, or interviews.' },
    { stepNumber: 4, title: 'Submit Language & Academic Documents', description: 'Provide IELTS 6.5+ (TOEFL 88+ for grad), certified transcripts, and any required reference letters.' },
  ],
  scholarships: [
    {
      name: 'TMU International Student Entrance Scholarship',
      value: 'CAD 8,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Competitive renewable scholarship for international students entering TMU with a minimum 85% average.',
    },
    {
      name: 'Ted Rogers School International Business Award',
      value: 'CAD 5,000',
      type: ScholarshipType.MERIT_BASED,
      description: 'Merit award for outstanding international students admitted to the Ted Rogers School of Management.',
    },
  ],
};

export const CANADA = {
  slug: 'canada',
  name: 'Canada',
  region: Region.AMERICAS,
  tagline: 'World-Class Education, Permanent Residency Pathways, and an Unmatched Quality of Life',
  shortDescription: 'Canada offers international students access to globally ranked universities, applied colleges, and polytechnics, combined with post-study work rights, pathways to permanent residency, a safe bilingual society, and one of the world\'s highest standards of living.',
  overview: 'Canada is one of the world\'s most sought-after study destinations, attracting nearly 800,000 international students annually. The country\'s education system is renowned for its quality and diversity — from globally ranked research universities such as UBC, McGill, and the University of Toronto, to applied colleges and polytechnics like BCIT, Humber, and SAIT that deliver practical, employment-ready training. Canada is officially bilingual in English and French, offering study options in both languages, and is celebrated for its multicultural, inclusive society where students from every background feel at home.\n\nBeyond academics, Canada\'s Post-Graduation Work Permit (PGWP) is a decisive advantage: graduates from eligible Canadian institutions can obtain an open work permit valid for up to three years, allowing them to gain Canadian work experience that directly feeds into permanent residency pathways such as the Canadian Experience Class under Express Entry and Provincial Nominee Programs. This PGWP-to-PR pipeline is one of the clearest and most accessible immigration routes in the world.\n\nCampus life in Canada spans vibrant global cities — Toronto, Vancouver, Montreal — as well as dynamic mid-sized cities and tight-knit university towns. The country\'s natural landscapes, public healthcare system, low crime rates, and reputation for civic tolerance make it an exceptional place to live and build a future. With tuition fees considerably lower than comparable programs in the United States or the United Kingdom, and generous scholarship offerings at both the federal and institutional level, Canada represents outstanding value for international students investing in a global education.',
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '100+',
  tuitionFeeRange: 'CAD 15,000 – CAD 45,000/year',
  postStudyWorkVisa: 'Post-Graduation Work Permit (PGWP) — open work permit up to 3 years',
  internationalStudents: 800000,
  studentSatisfaction: 88,
  graduateEmployability: 85,
  visaProcessingTime: '8–12 weeks',
  workRights: '20 hrs/week during term; full-time during scheduled breaks. PGWP after graduation: open work permit matching study length, up to 3 years.',
  costOfLivingMinUSD: 10000,
  costOfLivingMaxUSD: 18000,
  currencyCode: 'CAD',
  academicSpecialties: [
    'Engineering & Technology',
    'Business & Management',
    'Computer Science & AI',
    'Health & Nursing',
    'Environmental Science',
    'Natural Resources & Mining',
    'Education & Social Work',
    'Creative Arts & Media',
  ],
  isFeatured: true,
  advantages: [
    {
      title: 'PGWP Pathway to Permanent Residency',
      description: 'Graduates from eligible Canadian institutions can obtain a Post-Graduation Work Permit (PGWP) for up to three years, enabling them to gain the Canadian work experience required for permanent residency through Express Entry or Provincial Nominee Programs.',
      order: 1,
    },
    {
      title: 'World-Class Universities and Applied Colleges',
      description: 'Canada\'s education system combines globally ranked research universities (UBC, University of Toronto, McGill) with leading polytechnics and colleges (BCIT, Humber, SAIT) offering practical, employer-aligned programs at every academic level.',
      order: 2,
    },
    {
      title: 'Safe, Multicultural, and Bilingual Society',
      description: 'Canada consistently ranks among the world\'s safest and most inclusive countries. Its official bilingualism in English and French, combined with decades of immigration-shaped multiculturalism, creates a genuinely welcoming environment for students from every culture and background.',
      order: 3,
    },
    {
      title: 'Affordable Education Relative to Peers',
      description: 'Canadian tuition fees are substantially lower than equivalent programs in the United States or United Kingdom, while quality remains globally competitive. Numerous institutional, provincial, and federal scholarships further reduce the financial burden for international students.',
      order: 4,
    },
    {
      title: 'Strong Graduate Employment Outcomes',
      description: 'Canada\'s robust economy, diverse industries, and co-op/internship culture result in high graduate employment rates. Tech, healthcare, engineering, and business graduates are consistently in demand across all major provinces.',
      order: 5,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Choose Institution and Program',
      description: 'Research Canadian universities and colleges to find a Designated Learning Institution (DLI) offering your desired program. Confirm entry requirements, tuition fees, and PGWP eligibility of the institution.',
    },
    {
      stepNumber: 2,
      title: 'Apply and Obtain Letter of Acceptance',
      description: 'Submit your application with transcripts, English proficiency scores (IELTS/TOEFL), and any required supplementary documents. Upon admission, you will receive a Letter of Acceptance (LOA) needed for your visa application.',
    },
    {
      stepNumber: 3,
      title: 'Apply for Canadian Student Visa (Study Permit)',
      description: 'Submit your study permit application to IRCC (Immigration, Refugees and Citizenship Canada) online. Include your LOA, proof of finances, passport, and biometrics. Processing typically takes 8–12 weeks.',
    },
    {
      stepNumber: 4,
      title: 'Arrive and Enrol',
      description: 'Upon arrival in Canada, collect your study permit at the port of entry. Complete university or college registration, attend orientation, and access on-campus support services for international students.',
    },
    {
      stepNumber: 5,
      title: 'Graduate and Apply for PGWP',
      description: 'After completing your program, apply for a Post-Graduation Work Permit within 180 days of receiving your final marks. Your PGWP allows full-time work anywhere in Canada, forming the foundation of your PR pathway.',
    },
  ],
  faqs: [
    {
      question: 'Do I need IELTS to study in Canada?',
      answer: 'Most Canadian universities and colleges require English proficiency evidence such as IELTS Academic (typically 6.0–6.5) or TOEFL iBT (80–90+). Some institutions accept alternatives like Duolingo or PTE. French-language institutions may require DALF/DELF or TEF scores.',
      order: 1,
    },
    {
      question: 'What is the Post-Graduation Work Permit (PGWP)?',
      answer: 'The PGWP is an open work permit available to international graduates of eligible Canadian DLIs. It allows you to work for any Canadian employer for a duration matching your study program length, up to a maximum of 3 years. It is a key step toward gaining Canadian work experience for permanent residency.',
      order: 2,
    },
    {
      question: 'Can I work while studying in Canada?',
      answer: 'Yes. International students with a valid study permit can work up to 20 hours per week off-campus during academic terms, and full-time during scheduled academic breaks such as summer and winter holidays.',
      order: 3,
    },
    {
      question: 'What is the difference between a university and a college in Canada?',
      answer: 'Universities award bachelor\'s, master\'s, and doctoral degrees focusing on academic and research programs. Colleges and polytechnics such as Humber, BCIT, and SAIT offer diplomas, certificates, and applied degrees with a practical, career-focused curriculum and strong employer partnerships.',
      order: 4,
    },
    {
      question: 'How much does it cost to study in Canada?',
      answer: 'Tuition ranges from approximately CAD 13,000/year at community colleges to CAD 55,000/year for competitive graduate programs at top universities. Living costs typically add CAD 10,000–18,000 per year depending on city. Vancouver and Toronto are the most expensive; Northern Ontario and the Maritimes are more affordable.',
      order: 5,
    },
  ],
};
// ─── EXPORT ARRAY ─────────────────────────────────────────────────────────────

export const CANADA_UNIVERSITIES: any[] = [
  NORTHERN_COLLEGE,
  SENECA_COLLEGE,
  COLUMBIA_COLLEGE,
  CENTENNIAL_COLLEGE,
  BRAEMAR_COLLEGE,
  KINGSWAY_ACADEMY,
  DOUGLAS_COLLEGE,
  CRANDALL_UNIVERSITY,
  UNIVERSITY_OF_REGINA,
  ROYAL_ROADS_UNIVERSITY,
  SHERIDAN_COLLEGE,
  UNIVERSITY_OF_WINDSOR,
  LETHBRIDGE_COLLEGE,
  BOW_VALLEY_COLLEGE,
  ACADIA_UNIVERSITY,
  LOYALIST_COLLEGE,
  ALEXANDER_COLLEGE,
  ALEXANDER_ACADEMY,
  INTERNATIONAL_COLLEGE_OF_MANITOBA,
  VANCOUVER_ISLAND_UNIVERSITY,
  LAMBTON_COLLEGE,
  THOMPSON_RIVERS_UNIVERSITY,
  CAPE_BRETON_UNIVERSITY,
  FANSHAWE_COLLEGE,
  LAKEHEAD_UNIVERSITY,
  GEORGIAN_COLLEGE,
  NIPISSING_UNIVERSITY,
  CAMBRIAN_COLLEGE,
  KEYANO_COLLEGE,
  HUMBER_COLLEGE,
  NORTH_ISLAND_COLLEGE,
  DURHAM_COLLEGE,
  CAMOSUN_COLLEGE,
  NEWTON_INTERNATIONAL_COLLEGE,
  OCSB,
  SELKIRK_COLLEGE,
  BCIT,
  LANGARA_COLLEGE,
  FLEMING_COLLEGE,
  MACEWAN_UNIVERSITY,
  ONTARIO_TECH_UNIVERSITY,
  NYIT_CANADA,
  SAULT_COLLEGE,
  ST_FRANCIS_XAVIER_UNIVERSITY,
  UNIVERSITY_OF_BRITISH_COLUMBIA,
  ALGOMA_UNIVERSITY,
  TORONTO_METROPOLITAN_UNIVERSITY,
]
