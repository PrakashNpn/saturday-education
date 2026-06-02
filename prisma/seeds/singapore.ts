import { DegreeType, ScholarshipType, Region } from '../../generated/client'

// ─── SINGAPORE COUNTRY ────────────────────────────────────────────────────────

export const SINGAPORE = {
  slug: 'singapore',
  name: 'Singapore',
  region: Region.ASIA,
  tagline: "Asia's Global Campus — World Standards, Asian Heart",
  shortDescription:
    "Singapore is Asia's premier education hub, home to two top-20 global universities and a thriving ecosystem of international branch campuses. English is the medium of instruction, and graduates gain access to one of the world's highest-paying job markets.",
  overview: `Singapore punches far above its size as a global education destination. Two of Asia's highest-ranked universities — NUS (#8) and NTU (#15 QS 2025) — anchor a dense ecosystem that includes INSEAD, ESSEC, and Singapore Management University alongside a network of established private institutions partnering with leading UK, Australian, and US universities. All instruction is in English. Graduates benefit from Singapore's reputation as the financial and logistics capital of ASEAN — home to over 7,000 multinational corporations and a graduate unemployment rate below 5%. The Singapore Student Pass allows part-time work (up to 16 hours/week) and the country's public transport, safety, and multicultural environment make it one of the most liveable cities in Asia.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '30+',
  tuitionFeeRange: 'SGD 10,000 – SGD 55,000/year',
  postStudyWorkVisa: 'Long-Term Visit Pass / Employment Pass (EP) — apply after graduation',
  internationalStudents: 80000,
  studentSatisfaction: 88,
  graduateEmployability: 90,
  visaProcessingTime: '2–4 weeks (ICA)',
  workRights: '16 hrs/week during semester; unlimited during official school holidays',
  costOfLivingMinUSD: 1200 * 12,
  costOfLivingMaxUSD: 2500 * 12,
  currencyCode: 'SGD',
  academicSpecialties: ['Business & Finance', 'Engineering & Technology', 'Aviation & Aerospace', 'Design & Creative Arts', 'Psychology & Social Sciences', 'Hospitality & Tourism'],
  isFeatured: true,
  advantages: [
    {
      title: 'Global Rankings, Asian Location',
      description: "NUS and NTU rank in the global top 20. Even private institutions partner with Russell Group and Group of Eight universities — students graduate with internationally recognised degrees.",
      order: 1,
    },
    {
      title: 'Gateway to ASEAN Careers',
      description: "Singapore hosts the Asia-Pacific HQs of Google, Meta, Grab, Sea Group, and over 7,000 MNCs. Graduates gain unparalleled access to the fastest-growing job market in Southeast Asia.",
      order: 2,
    },
    {
      title: 'English-Medium, Safe, and Efficient',
      description: "English is the official language of instruction across all institutions. Singapore is consistently ranked the safest city in Asia with world-class public transport, healthcare, and digital infrastructure.",
      order: 3,
    },
    {
      title: 'Part-Time Work During Studies',
      description: "Student Pass holders may work up to 16 hours per week during term and unlimited hours during official school holidays — helping offset living costs in one of Asia's most dynamic economies.",
      order: 4,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Choose Institution and Programme',
      description: 'Research CPE-registered private institutions or public universities, compare partner universities and programme accreditation, and identify your preferred intake (most PEIs offer quarterly intakes).',
    },
    {
      stepNumber: 2,
      title: 'Apply and Receive Letter of Offer',
      description: 'Submit your application with academic transcripts, passport copy, English test scores (if required), and any additional documents. Most PEIs respond within 1–2 weeks.',
    },
    {
      stepNumber: 3,
      title: 'Apply for Student Pass via SOLAR+',
      description: "Your institution submits a Student Pass application on your behalf via ICA's SOLAR+ system. Processing takes 2–4 weeks. Do not travel to Singapore until your pass is approved.",
    },
    {
      stepNumber: 4,
      title: 'Arrive and Complete In-Person Enrolment',
      description: 'Collect your Student Pass at ICA, complete campus registration, and attend orientation. Open a local bank account and activate your student concession card for discounted transport.',
    },
  ],
  faqs: [
    {
      question: 'Do I need to take an English language test to study in Singapore?',
      answer: 'Most private institutions waive the English requirement for students from countries where English is the primary medium of instruction. Others accept IELTS 5.5–6.5 or equivalent TOEFL/PTE scores.',
      order: 1,
    },
    {
      question: 'Can I work part-time while studying in Singapore?',
      answer: 'Yes — Student Pass holders may work up to 16 hours per week during the school term and full-time during official school holidays, in any sector.',
      order: 2,
    },
    {
      question: 'What is the cost of living in Singapore for students?',
      answer: 'Students typically spend SGD 1,500–2,500 per month (USD 1,100–1,850), covering shared accommodation (SGD 600–1,200), food (SGD 400–600), transport (SGD 80–150), and personal expenses.',
      order: 3,
    },
    {
      question: 'How do I apply for a Singapore Student Pass?',
      answer: 'Your institution applies on your behalf through the Immigration and Checkpoints Authority (ICA) SOLAR+ system after you accept an offer. You should not travel to Singapore until the pass is approved.',
      order: 4,
    },
    {
      question: 'Can I stay in Singapore after graduation to find work?',
      answer: 'Singapore does not have a dedicated post-study work visa. Graduates typically apply for a Long-Term Visit Pass extension or an Employment Pass (EP) once they secure a job offer from a Singapore employer.',
      order: 5,
    },
  ],
}

// ─── SINGAPORE UNIVERSITIES / PRIVATE INSTITUTIONS ────────────────────────────


// ─────────────────────────────────────────────────────────────
// 1. PSB ACADEMY
// ─────────────────────────────────────────────────────────────
export const PSB_ACADEMY = {
  name: 'PSB Academy',
  slug: 'psb-academy',
  city: 'Singapore',
  foundedYear: 1964,
  totalStudents: 12000,
  internationalStudents: 0.50,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 9972,
  tuitionFeeMax: 23142,
  tuitionCurrency: 'SGD',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'PSB Academy is one of Singapore\'s largest private education institutions, founded in 1964, offering certificate to postgraduate programmes across six schools in partnership with leading UK, Australian, and New Zealand universities.',
  overview:
    'Established in 1964 as Singapore\'s National Productivity Centre, PSB Academy has grown into one of the island\'s most recognised private education institutions. With over 12,000 students from more than 50 nationalities, it operates across two campuses — Marina Square and The Cathay. The six schools cover Business and Management, Engineering and Technology, Life and Physical Sciences, Foundation Studies, Postgraduate Studies, and the Digital Academy. Academic programmes are delivered in partnership with globally ranked universities including Coventry University (UK), University of Hertfordshire (UK), Massey University (New Zealand), La Trobe University (Australia), Edith Cowan University (Australia), and University of Newcastle (Australia). PSB Academy holds 4-year EduTrust certification and reported an 84% graduate employment rate within six months of examinations.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Commerce (Accounting & Finance)',
      slug: 'bachelor-of-commerce-accounting-finance-psb',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Accounting & Finance',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 19,389/year',
      description:
        'Awarded by the University of Newcastle (Australia). Covers financial accounting, corporate finance, auditing, and taxation, preparing graduates for professional accounting careers. Includes CPA-pathway content.',
    },
    {
      name: 'Bachelor of Information Technology',
      slug: 'bachelor-of-information-technology-psb',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Information Technology',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 20,746/year',
      description:
        'Awarded by Edith Cowan University (Australia). Covers software engineering, cybersecurity, networks, and data analytics. Students gain practical skills through industry-aligned projects and internships.',
    },
    {
      name: 'Bachelor of Engineering (Mechanical)',
      slug: 'bachelor-of-engineering-mechanical-psb',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Mechanical Engineering',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 23,142/year',
      description:
        'Awarded by Coventry University (UK). Covers thermodynamics, materials science, CAD/CAM, and manufacturing processes. Graduates are equipped for roles in aerospace, automotive, and manufacturing industries.',
    },
    {
      name: 'Bachelor of Arts (Hospitality & Tourism Management)',
      slug: 'bachelor-arts-hospitality-tourism-management-psb',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 14,638/year',
      description:
        'Awarded by a partner Australian university. Covers hotel operations, event management, tourism economics, and sustainable hospitality. Includes industry attachment to Singapore\'s vibrant hospitality sector.',
    },
    {
      name: 'Diploma in Business Administration',
      slug: 'diploma-business-administration-psb',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business Administration',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 9,972/year',
      description:
        'PSB Academy\'s own diploma covering core business principles, management, marketing, and communication. A popular entry route to Bachelor\'s degree top-up programmes.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba-psb-academy',
      degreeLevel: DegreeType.MASTER,
      field: 'Business Administration',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 21,571/year',
      description:
        'Awarded by a UK partner university. Offered over 16 months, covering strategic management, leadership, finance, and entrepreneurship. Designed for working professionals and recent graduates seeking management roles.',
    },
    {
      name: 'MSc Business Management (Marketing)',
      slug: 'msc-business-management-marketing-psb',
      degreeLevel: DegreeType.MASTER,
      field: 'Marketing',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 20,705/year',
      description:
        'Awarded by a UK partner university. Covers digital marketing, consumer behaviour, branding strategy, and marketing analytics. Prepares students for senior marketing roles in global organisations.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Online Application',
      description:
        'Complete the online application form on PSB Academy\'s portal and pay the non-refundable application fee of SGD 490 (non-e-learning) or SGD 160 (e-learning).',
    },
    {
      stepNumber: 2,
      title: 'Provide Supporting Documents',
      description:
        'Upload certified copies of academic transcripts, English proficiency results (IELTS/TOEFL/equivalent), passport copy, and a personal statement.',
    },
    {
      stepNumber: 3,
      title: 'Await Admission Decision',
      description:
        'PSB Academy reviews applications holistically. Shortlisted applicants may be invited for an interview or counselling session before a Letter of Offer is issued.',
    },
    {
      stepNumber: 4,
      title: 'Accept Offer & Apply for Student Pass',
      description:
        'Accept the offer, pay the course deposit, and submit a Student Pass application through the Immigration & Checkpoints Authority (ICA) SOLAR+ system via PSB Academy.',
    },
  ],
  scholarships: [
    {
      name: 'PSB Academy ASEAN Scholarship',
      value: 'Partial to full tuition waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.psb-academy.edu.sg/courses/scholarship-application',
      description:
        'Exclusively for ASEAN nationality students enrolling in undergraduate programmes. Awarded based on academic merit (min. GPA 3.0 or equivalent), CCA participation, leadership qualities, and evidence of community impact.',
    },
    {
      name: 'PSB Academy Merit Scholarship',
      value: 'SGD 500–SGD 1,000 partial tuition waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.psb-academy.edu.sg/courses/scholarship-application',
      description:
        'Open to international students across all programmes. Awarded on academic merit and leadership potential. Recipients are encouraged to serve as PSB Academy student ambassadors.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 2. SIM GLOBAL EDUCATION
// ─────────────────────────────────────────────────────────────
export const SIM_GLOBAL_EDUCATION = {
  name: 'SIM Global Education',
  slug: 'sim-global-education',
  city: 'Singapore',
  foundedYear: 1964,
  totalStudents: 16000,
  internationalStudents: 0.40,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 15000,
  tuitionFeeMax: 54936,
  tuitionCurrency: 'SGD',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'SIM Global Education, founded in 1964, is one of Singapore\'s oldest and largest private education institutions, offering 140+ programmes from University of London, RMIT, Monash, University of Birmingham, and other leading universities.',
  overview:
    'Founded in 1964 by the Singapore Economic Development Board, the Singapore Institute of Management (SIM) has grown into one of the region\'s most respected private education groups. SIM Global Education (SIM GE) is its principal education arm, delivering over 140 programmes through partnerships with globally ranked universities from the UK, Australia, USA, Canada, and France. Partner institutions include the University of London, University of Birmingham, Cardiff University, University of Stirling, RMIT University, University of Wollongong, Monash College, University of Sydney, University at Buffalo, Grenoble Ecole de Management, and University of Alberta. Programmes span Business, IT, Mass Communication, Psychology, Nursing, and more. In 2024, SIM celebrated its 60th anniversary and launched a S$60 million SIM Impact Fund to support students from lower-income backgrounds.',
  ranking: null,
  programs: [
    {
      name: 'BSc (Hons) Business Analytics',
      slug: 'bsc-business-analytics-sim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business Analytics',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 15,000/year',
      description:
        'Awarded by University of London (UK). Combines statistics, data science, and business strategy. Students learn to extract insights from complex datasets to drive organisational decision-making.',
    },
    {
      name: 'BSc (Hons) Computing and Information Systems',
      slug: 'bsc-computing-information-systems-sim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Information Technology',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 15,600/year',
      description:
        'Awarded by University of London (UK). Covers software engineering, database systems, AI fundamentals, and systems design. Prepares graduates for software development and systems architecture roles.',
    },
    {
      name: 'Bachelor of Business (Management)',
      slug: 'bachelor-business-management-sim-rmit',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business Management',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 17,000/year',
      description:
        'Awarded by RMIT University (Australia). Covers leadership, organisational behaviour, strategic management, and entrepreneurship. Available in full-time and part-time study modes.',
    },
    {
      name: 'Bachelor of Mass Communication',
      slug: 'bachelor-mass-communication-sim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Mass Communication',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 16,500/year',
      description:
        'Awarded by RMIT University (Australia). Covers journalism, public relations, advertising, and digital media. Students develop multimedia storytelling skills through practical studio and production projects.',
    },
    {
      name: 'BSc Psychology',
      slug: 'bsc-psychology-sim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Psychology',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 15,500/year',
      description:
        'Awarded by University of Wollongong (Australia). Covers cognitive, social, developmental, and clinical psychology. Includes laboratory-based research training and research methods modules.',
    },
    {
      name: 'MBA (International Business)',
      slug: 'mba-international-business-sim',
      degreeLevel: DegreeType.MASTER,
      field: 'Business Administration',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 22,000/year',
      description:
        'Awarded by University of Birmingham (UK). Focuses on global business strategy, cross-cultural management, finance, and innovation. Suitable for professionals seeking leadership roles in multinational organisations.',
    },
    {
      name: 'MSc Financial Management',
      slug: 'msc-financial-management-sim',
      degreeLevel: DegreeType.MASTER,
      field: 'Finance',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 23,000/year',
      description:
        'Awarded by University of Birmingham (UK). Covers corporate finance, investment analysis, financial risk management, and derivatives. Prepares graduates for roles in banking, investment, and corporate treasury.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Choose Programme & Apply',
      description:
        'Browse SIM GE\'s programme listing and submit an online application with a non-refundable application fee of SGD 545. International applicants must provide translated academic transcripts.',
    },
    {
      stepNumber: 2,
      title: 'Submit Supporting Documents',
      description:
        'Provide certified copies of academic certificates and transcripts, proof of English proficiency (IELTS/TOEFL/equivalent), a valid passport copy, and one passport-sized photograph.',
    },
    {
      stepNumber: 3,
      title: 'Receive & Accept Letter of Offer',
      description:
        'Upon successful review, SIM GE issues a Letter of Offer. Accept the offer and pay the first tuition instalment to secure your place in the programme.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Student Pass',
      description:
        'SIM GE will assist you in submitting a Student Pass application through the ICA SOLAR+ portal. Approval is required before you can commence your studies in Singapore.',
    },
  ],
  scholarships: [
    {
      name: 'SIM Award (Undergraduate)',
      value: 'SGD 15,000 (disbursed in two tranches)',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.sim.edu.sg/degrees-diplomas/admissions/scholarships/sim-global-education-scholarship',
      description:
        'Awarded to high-achieving international students on bachelor\'s degree programmes based on outstanding academic results or achievements in sports and arts. No bond attached.',
    },
    {
      name: 'SIM GE Academic Excellence Scholarship (Diploma)',
      value: 'Up to 100% course fee waiver',
      type: ScholarshipType.FULL_FUNDING,
      learnMoreUrl: 'https://www.sim.edu.sg/degrees-diplomas/admissions/scholarships/sim-global-education-diploma-scholarships',
      description:
        'Full tuition waiver for top-performing students enrolling in SIM GE diploma programmes. Awarded on the basis of exceptional academic results at the previous qualification level.',
    },
    {
      name: 'SIM GE Merit Scholarship (Diploma)',
      value: 'Up to 50% course fee waiver',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: 'https://www.sim.edu.sg/degrees-diplomas/admissions/scholarships/sim-global-education-diploma-scholarships',
      description:
        'Partial tuition waiver for diploma students who demonstrate strong academic performance and leadership potential. Open to Singapore citizens, permanent residents, and international students.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 3. JAMES COOK UNIVERSITY SINGAPORE
// ─────────────────────────────────────────────────────────────
export const JAMES_COOK_UNIVERSITY_SINGAPORE = {
  name: 'James Cook University Singapore',
  slug: 'james-cook-university-singapore',
  city: 'Singapore',
  foundedYear: 2003,
  totalStudents: 3000,
  internationalStudents: 0.65,
  intakeMonths: 'March, July, October',
  tuitionFeeMin: 25077,
  tuitionFeeMax: 41529,
  tuitionCurrency: 'SGD',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'James Cook University Singapore is a full Australian branch campus established in 2003, awarding the same JCU Australia degrees in Business, Psychology, IT, Education, and Tourism with inter-campus mobility to Australia.',
  overview:
    'James Cook University Singapore (JCU Singapore) is the only full branch campus of an Australian university in Singapore. Established in 2003 and located at 149 Sims Drive, the campus awards full JCU Australia degrees — not local qualifications — making graduates eligible for the same credentials as their Australian counterparts. The campus offers Bachelor\'s, Master\'s, and research programmes across Business, Information Technology, Psychology, Early Childhood Education, International Tourism and Hospitality Management, and Professional Accounting. A unique inter-campus mobility programme allows students to study at both the Singapore and Australian campuses at no additional cost. JCU Singapore is EduTrust-certified and accepts applications on a rolling basis with three main intakes per year.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Business (Management)',
      slug: 'bachelor-business-management-jcu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business Management',
      durationYears: 2,
      tuitionFeePerYear: 'SGD 25,077/year',
      description:
        'Full JCU Australia degree. Covers organisational management, strategic thinking, leadership, and business analytics. The two-year fast-track structure suits students with prior diplomas entering Year 2.',
    },
    {
      name: 'Bachelor of Business (Financial Management)',
      slug: 'bachelor-business-financial-management-jcu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Finance',
      durationYears: 2,
      tuitionFeePerYear: 'SGD 25,077/year',
      description:
        'Full JCU Australia degree. Covers corporate finance, financial markets, investment analysis, and risk management. Prepares graduates for roles in banking, investment, and corporate finance in Singapore and the region.',
    },
    {
      name: 'Bachelor of Psychological Science',
      slug: 'bachelor-psychological-science-jcu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Psychology',
      durationYears: 2,
      tuitionFeePerYear: 'SGD 26,361/year',
      description:
        'Full JCU Australia degree. Covers cognitive, social, developmental, biological, and applied psychology. Research methods training equips students for postgraduate study or applied psychological roles.',
    },
    {
      name: 'Bachelor of Information Technology',
      slug: 'bachelor-information-technology-jcu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Information Technology',
      durationYears: 2,
      tuitionFeePerYear: 'SGD 25,077/year',
      description:
        'Full JCU Australia degree in IT. Covers computing fundamentals, networks, cybersecurity, databases, and software development. Prepares graduates for roles in Singapore\'s growing tech industry.',
    },
    {
      name: 'Bachelor of Education (Early Childhood)',
      slug: 'bachelor-education-early-childhood-jcu',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Education',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 26,921/year',
      description:
        'Full JCU Australia degree. Covers child development, curriculum design, early literacy, and inclusive practices. Prepares graduates for lead educator roles in Singapore\'s well-funded childcare sector.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba-jcu-singapore',
      degreeLevel: DegreeType.MASTER,
      field: 'Business Administration',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 33,705/year',
      description:
        'Full JCU Australia MBA, completable in 16 months. Offers six specialisations: Analytics & Business Solutions, Creative Marketing, Entrepreneurship, Finance, Global Talent Management, and MICE, Tourism & Hospitality.',
    },
    {
      name: 'Master of Information Technology (Artificial Intelligence)',
      slug: 'master-information-technology-ai-jcu',
      degreeLevel: DegreeType.MASTER,
      field: 'Artificial Intelligence',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 40,277/year',
      description:
        'Full JCU Australia Master\'s degree with AI specialisation. Covers machine learning, deep learning, natural language processing, and AI ethics. Designed for IT professionals and CS graduates seeking advanced skills.',
    },
    {
      name: 'Master of International Tourism and Hospitality Management',
      slug: 'master-international-tourism-hospitality-jcu',
      degreeLevel: DegreeType.MASTER,
      field: 'Tourism & Hospitality',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 33,705/year',
      description:
        'Full JCU Australia degree. Covers tourism economics, destination management, revenue management, and event operations. Singapore\'s position as a global tourism hub provides rich practical learning context.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application & Pay Application Fee',
      description:
        'Apply online at jcu.edu.sg and pay the SGD 250–260 non-refundable application fee. Applications are reviewed on a rolling basis with no fixed deadlines for most programmes.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic & English Proficiency Documents',
      description:
        'Submit certified academic transcripts and certificates, English proficiency results (IELTS 6.0 / TOEFL iBT 70 or equivalent for bachelor\'s; higher for master\'s), and a valid passport copy.',
    },
    {
      stepNumber: 3,
      title: 'Receive Letter of Offer & Pay Deposit',
      description:
        'Upon approval, JCU Singapore issues a Letter of Offer. Accept and pay the required course deposit to confirm your enrolment.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Student Pass',
      description:
        'JCU Singapore will sponsor your ICA Student Pass application via the SOLAR+ portal. Ensure all documents are in order. Your Student Pass must be approved before you can commence studies.',
    },
  ],
  scholarships: [
    {
      name: 'JCU Singapore Merit Scholarship',
      value: 'Up to SGD 20,000',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.jcu.edu.sg/scholarships',
      description:
        'Competitive scholarship for new international students based on outstanding academic achievement and critical thinking ability. Recipients serve as JCU Singapore student ambassadors. Cannot be combined with other JCU scholarships.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 4. NANYANG INSTITUTE OF MANAGEMENT (NIM)
// ─────────────────────────────────────────────────────────────
export const NANYANG_INSTITUTE_OF_MANAGEMENT = {
  name: 'Nanyang Institute of Management',
  slug: 'nanyang-institute-of-management',
  city: 'Singapore',
  foundedYear: 2001,
  totalStudents: 2000,
  internationalStudents: 0.55,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 8000,
  tuitionFeeMax: 19800,
  tuitionCurrency: 'SGD',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Nanyang Institute of Management is a CPE EduTrust-certified private institution in Singapore offering diploma, degree, and postgraduate programmes in Business, Hospitality, Tourism, and Early Childhood Education through partnerships with Australian and UK universities.',
  overview:
    'Founded in 2001 and located in Singapore\'s Central Business District at 28 North Canal Road, Nanyang Institute of Management (NIM) is a registered Private Education Institution holding EduTrust certification from the Committee for Private Education. NIM operates four schools: the School of Business, School of Tourism and Hospitality, School of Early Childhood Education, and School of Language. Programmes range from certificate and diploma level through bachelor\'s degrees and MBA, delivered in collaboration with partner universities including University of South Australia, Middlesex University (UK), and Deakin University (Australia). All programmes are English-taught and designed to meet international academic standards. NIM\'s affordable fee structure and central location make it particularly popular with students from across Asia and the ASEAN region.',
  ranking: null,
  programs: [
    {
      name: 'Diploma in Business Management',
      slug: 'diploma-business-management-nim',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 11,600/year',
      description:
        'NIM\'s own diploma covering the fundamentals of business management, marketing, accounting, and operations. Serves as a direct entry pathway to the Bachelor of Business top-up degree.',
    },
    {
      name: 'Advanced Diploma in Business Management',
      slug: 'advanced-diploma-business-management-nim',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 13,400/year',
      description:
        'An advanced-level NIM diploma covering strategic management, human resource management, financial analysis, and entrepreneurship. Prepares students for bachelor\'s degree top-up entry.',
    },
    {
      name: 'Bachelor of Business',
      slug: 'bachelor-of-business-nim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 14,000/year',
      description:
        'Awarded by Middlesex University (UK) or University of South Australia. A comprehensive business degree covering strategy, leadership, international business, and management. Students with prior NIM diplomas may enter at an advanced stage.',
    },
    {
      name: 'Diploma in Tourism and Hospitality Management',
      slug: 'diploma-tourism-hospitality-management-nim',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Tourism & Hospitality',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 11,600/year',
      description:
        'Covers the fundamentals of hotel operations, food and beverage management, front office management, and hospitality marketing. Pathway into the bachelor\'s-level Hospitality Management degree.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba-nim',
      degreeLevel: DegreeType.MASTER,
      field: 'Business Administration',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 19,800/year',
      description:
        'Awarded by a UK or Australian partner university. Covers corporate strategy, financial management, marketing, and leadership. Designed for working professionals with at least two years of management experience.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application with Supporting Documents',
      description:
        'Complete the NIM application form and submit certified academic transcripts, a valid passport copy, one passport-sized photograph, and any English-translated documents.',
    },
    {
      stepNumber: 2,
      title: 'Pay Application Fee & Attend Counselling',
      description:
        'Pay the application fee and attend an optional pre-admission counselling session where the NIM admissions team will advise on programme selection and entry requirements.',
    },
    {
      stepNumber: 3,
      title: 'Receive Letter of Offer & Pay Course Fees',
      description:
        'NIM reviews your application and issues a Letter of Offer for eligible candidates. Accept the offer and pay the required course fee deposit to confirm enrolment.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Student Pass via ICA',
      description:
        'NIM will assist with your Student Pass application through the ICA SOLAR+ portal. Approval must be obtained before commencement of studies.',
    },
  ],
  scholarships: [
    {
      name: 'NIM International Student Merit Award',
      value: 'SGD 2,000',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Awarded to high-achieving international students based on outstanding academic performance at their previous qualification level. Applied as a deduction against course fees.',
    },
    {
      name: 'NIM Leadership and Community Service Scholarship',
      value: 'SGD 1,500',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Recognises students who have demonstrated strong leadership potential and meaningful community engagement. Requires submission of an essay and supporting evidence of community service.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 5. KAPLAN SINGAPORE
// ─────────────────────────────────────────────────────────────
export const KAPLAN_SINGAPORE = {
  name: 'Kaplan Singapore',
  slug: 'kaplan-singapore',
  city: 'Singapore',
  foundedYear: 1989,
  totalStudents: 10000,
  internationalStudents: 0.45,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 21189,
  tuitionFeeMax: 39894,
  tuitionCurrency: 'SGD',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Kaplan Singapore, established in 1989, is one of Singapore\'s largest private education institutions with 100,000+ graduates, offering degree and postgraduate programmes through Murdoch University, Northumbria University, University College Dublin, and other partner universities.',
  overview:
    'Originally founded in 1989 as Asia Pacific Management Institute (APMI) and acquired by Kaplan Inc. in 2005, Kaplan Singapore has grown into one of the country\'s most prominent private higher education providers with over 100,000 graduates across disciplines including Business, IT, Law, Psychology, Healthcare, Hospitality, and Accounting. Programmes are delivered in partnership with Murdoch University (Australia), Northumbria University (UK), University College Dublin (Ireland), Aston University (UK), Birmingham City University (UK), and University of Portsmouth (UK). Kaplan Singapore holds 4-year EduTrust certification and is headquartered at 51 Cuppage Road. Its fast-track bachelor\'s programmes — completable in 16 months — are particularly popular with polytechnic diploma holders entering Year 2.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Commerce (Management & Marketing, Double Major)',
      slug: 'bachelor-commerce-management-marketing-kaplan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business Management',
      durationYears: 2.5,
      tuitionFeePerYear: 'SGD 27,734/year',
      description:
        'Awarded by Murdoch University (Australia). Covers marketing strategy, consumer behaviour, organisational management, and business analytics. Students can fast-track completion with Polytechnic Diploma advanced standing.',
    },
    {
      name: 'Bachelor of Commerce (Banking & Finance, Double Major)',
      slug: 'bachelor-commerce-banking-finance-kaplan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Banking & Finance',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 34,182/year',
      description:
        'Awarded by Murdoch University (Australia). Covers corporate finance, financial markets, investments, and risk management. Completable in 16 months for students with advanced standing from prior diplomas.',
    },
    {
      name: 'Bachelor of Arts (Hons) Business Management',
      slug: 'ba-business-management-kaplan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 21,189/year',
      description:
        'Awarded by Northumbria University (UK). A top-up degree covering strategic management, operations, entrepreneurship, and leadership. Completable in 18 months for students with prior diplomas.',
    },
    {
      name: 'Bachelor of Arts (Hons) Management (Top-Up)',
      slug: 'ba-management-top-up-kaplan',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 39,894/year',
      description:
        'Awarded by Northumbria University (UK). An 18-month top-up degree focusing on strategic leadership, human resource management, international business, and project management.',
    },
    {
      name: 'Master of Business Administration',
      slug: 'mba-kaplan-singapore',
      degreeLevel: DegreeType.MASTER,
      field: 'Business Administration',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 10,968/year',
      description:
        'Awarded by a UK partner university. Covers strategic management, finance, marketing, and leadership. Designed for professionals seeking to accelerate their management careers. Completable in 12 months.',
    },
    {
      name: 'Diploma in Business Management',
      slug: 'diploma-business-management-kaplan',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 13,500/year',
      description:
        'Kaplan\'s own full-time diploma in Business Management. Covers core business concepts including accounting, economics, marketing, and management. Serves as an entry pathway to bachelor\'s programmes.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Apply Online or In-Person',
      description:
        'Complete an online application or visit Kaplan\'s campus at 51 Cuppage Road. International students should contact an authorised Kaplan agent in their home country for pre-application counselling.',
    },
    {
      stepNumber: 2,
      title: 'Submit Documents & Pay Application Fee',
      description:
        'Provide certified academic transcripts, English proficiency results (IELTS 6.0 or equivalent), passport copy, and passport-sized photographs. Pay the applicable application fee.',
    },
    {
      stepNumber: 3,
      title: 'Receive Conditional or Unconditional Offer',
      description:
        'Kaplan\'s admissions team reviews your application. Successful applicants receive a Letter of Offer. Conditional offers may require additional documentation or English proficiency improvement.',
    },
    {
      stepNumber: 4,
      title: 'Accept Offer, Pay Deposit & Apply for Student Pass',
      description:
        'Accept the offer and pay the required course deposit. Kaplan will facilitate your Student Pass application through the ICA SOLAR+ system. All international students studying more than 30 days require a Student Pass.',
    },
  ],
  scholarships: [
    {
      name: 'Kaplan Merit Scholarship',
      value: '50% of programme fees',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.kaplan.com.sg/scholarships',
      description:
        'Available to full-time Bachelor\'s students who achieve an average of 85% across all modules, and Master\'s students who achieve 80%. Award offsets future tuition instalments. Applicants must submit a 300-word essay.',
    },
    {
      name: 'UCD Kaplan Singapore Scholarship',
      value: 'Partial tuition waiver',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: 'https://www.kaplan.com.sg/scholarships',
      description:
        'Available to students enrolled in University College Dublin programmes at Kaplan Singapore. Awarded on academic merit and performance in the previous qualification. Amount varies per intake.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 6. MDIS (MANAGEMENT DEVELOPMENT INSTITUTE OF SINGAPORE)
// ─────────────────────────────────────────────────────────────
export const MDIS = {
  name: 'Management Development Institute of Singapore',
  slug: 'management-development-institute-of-singapore',
  city: 'Singapore',
  foundedYear: 1956,
  totalStudents: 9000,
  internationalStudents: 0.55,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 11699,
  tuitionFeeMax: 26215,
  tuitionCurrency: 'SGD',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'MDIS, founded in 1956, is Singapore\'s oldest not-for-profit professional institute, offering degrees in Business, Engineering, Fashion, Nursing, Psychology, and IT through partnerships with UK universities including University of Hertfordshire and University of Northampton.',
  overview:
    'The Management Development Institute of Singapore (MDIS), established in 1956, holds the distinction of being Singapore\'s oldest not-for-profit professional institute. Located on a 9-hectare campus in the Queenstown district, MDIS is widely known for its diverse portfolio spanning business management, engineering, fashion and design, health sciences, information technology, life sciences, psychology, and tourism. Academic programmes are delivered through partnerships with leading UK universities including University of Northampton, University of Hertfordshire, University of Sunderland, and others. MDIS has awarded more than 7,500 scholarships and bursaries totalling nearly S$6 million, reflecting its commitment to accessibility. International students from over 80 countries contribute to the campus\'s multicultural environment. MDIS holds EduTrust certification from the Committee for Private Education.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Arts (Hons) Fashion Design',
      slug: 'ba-fashion-design-mdis',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Fashion & Design',
      durationYears: 2.5,
      tuitionFeePerYear: 'SGD 12,412/year',
      description:
        'Awarded by a UK partner university. Covers fashion illustration, pattern-making, textile studies, couture techniques, and collection development. Students showcase work at an annual MDIS Fashion Show.',
    },
    {
      name: 'Bachelor of Arts (Hons) Fashion Marketing and Branding',
      slug: 'ba-fashion-marketing-branding-mdis',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Fashion Marketing',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 11,699/year',
      description:
        'Awarded by a UK partner university. Covers luxury brand management, retail buying, fashion journalism, digital marketing, and consumer behaviour in the global fashion industry.',
    },
    {
      name: 'Bachelor of Science (Hons) Banking and Finance',
      slug: 'bsc-banking-finance-mdis',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Banking & Finance',
      durationYears: 2,
      tuitionFeePerYear: 'SGD 17,655/year',
      description:
        'Awarded by a UK partner university. Covers financial markets, investment management, corporate banking, and quantitative analysis. Prepares graduates for roles in Singapore\'s world-class financial services sector.',
    },
    {
      name: 'Bachelor of Engineering (Hons) Mechanical Engineering',
      slug: 'beng-mechanical-engineering-mdis',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Mechanical Engineering',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 17,884/year',
      description:
        'Awarded by a UK partner university. A top-up honours year covering advanced thermodynamics, manufacturing systems, and project engineering. Entry requires a relevant engineering diploma or degree.',
    },
    {
      name: 'Bachelor of Science (Hons) Biotechnology',
      slug: 'bsc-biotechnology-mdis',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Life Sciences',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 13,197/year',
      description:
        'Awarded by a UK partner university. Covers molecular biology, genetic engineering, microbiology, and bioinformatics. Prepares students for careers in Singapore\'s growing biomedical and pharmaceutical industry.',
    },
    {
      name: 'MBA in International Marketing',
      slug: 'mba-international-marketing-mdis',
      degreeLevel: DegreeType.MASTER,
      field: 'Marketing',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 23,540/year',
      description:
        'Awarded by a UK partner university. Covers global marketing strategy, brand management, digital channels, and international consumer behaviour. One-year programme suited to marketing professionals seeking advancement.',
    },
    {
      name: 'MBA in Supply Chain Management',
      slug: 'mba-supply-chain-management-mdis',
      degreeLevel: DegreeType.MASTER,
      field: 'Supply Chain Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 26,215/year',
      description:
        'Awarded by a UK partner university. Covers procurement strategy, logistics, operations management, and global supply chain analytics. Highly relevant given Singapore\'s status as a major global logistics hub.',
    },
    {
      name: 'MSc Computing and Information Systems',
      slug: 'msc-computing-information-systems-mdis',
      degreeLevel: DegreeType.MASTER,
      field: 'Information Technology',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 23,396/year',
      description:
        'Awarded by a UK partner university. Covers software engineering, data analytics, cybersecurity, and cloud computing. Suited to IT graduates or professionals seeking advanced technical or managerial IT qualifications.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Admission Application to MDIS',
      description:
        'Complete the MDIS application form and submit it with certified academic transcripts, English proficiency results, and a valid passport. A non-refundable application fee applies.',
    },
    {
      stepNumber: 2,
      title: 'Apply for Scholarship (Optional)',
      description:
        'Simultaneously submit your MDIS Merit Scholarship (International) application at least one month before course commencement. Shortlisted candidates are invited to an interview.',
    },
    {
      stepNumber: 3,
      title: 'Receive & Accept Letter of Offer',
      description:
        'Successful applicants receive a Letter of Offer from MDIS. Accept and pay the first course fee instalment to confirm your place. Fees are payable in quarterly instalments.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Student Pass & Commence Studies',
      description:
        'MDIS will submit your Student Pass application through the ICA SOLAR+ portal. Once approved, complete the orientation programme and commence your studies at the MDIS campus.',
    },
  ],
  scholarships: [
    {
      name: 'MDIS Merit Scholarship (International) — Master\'s',
      value: 'SGD 3,800',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.mdis.edu.sg/scholarships-and-grants',
      description:
        'Awarded to new international Master\'s students demonstrating outstanding academic achievement and strong leadership potential. No bond required. Deducted from the final course instalment.',
    },
    {
      name: 'MDIS Merit Scholarship (International) — Bachelor\'s',
      value: 'SGD 3,000',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://www.mdis.edu.sg/scholarships-and-grants',
      description:
        'Awarded to new international Bachelor\'s students with strong academic records and interpersonal skills. Applicable only to new students; not available to staff or progression students.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 7. EMBRY-RIDDLE AERONAUTICAL UNIVERSITY SINGAPORE
// ─────────────────────────────────────────────────────────────
export const EMBRY_RIDDLE_AERONAUTICAL_UNIVERSITY_SINGAPORE = {
  name: 'Embry-Riddle Aeronautical University Singapore',
  slug: 'embry-riddle-aeronautical-university-singapore',
  city: 'Singapore',
  foundedYear: 2011,
  totalStudents: 600,
  internationalStudents: 0.60,
  intakeMonths: 'January, May, September',
  tuitionFeeMin: 18172,
  tuitionFeeMax: 36000,
  tuitionCurrency: 'SGD',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Embry-Riddle Aeronautical University Singapore, established in 2011 at Seletar Aerospace Park, is the Asia campus of the world\'s largest aviation-focused university, offering US-equivalent degrees in Aeronautics, Aviation Business Administration, and MBA in Aviation.',
  overview:
    'Embry-Riddle Aeronautical University (ERAU) is the world\'s oldest and largest university specialising in aviation and aerospace, headquartered in Daytona Beach, Florida. Its Singapore campus, established in 2011, is located at Seletar Aerospace Park — Singapore\'s dedicated aviation industrial zone — and operates through a partnership with the Singapore Aviation Academy (SAA). The campus offers programmes that are identical to those delivered at ERAU\'s US campuses, with degrees awarded directly by ERAU in the United States. Programmes are available full-time and part-time to accommodate working aviation professionals. Singapore\'s position as one of Asia\'s foremost aviation hubs makes it an ideal setting for aviation-focused education, with proximity to airlines, MRO facilities, and aerospace companies.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Science in Aeronautics',
      slug: 'bsc-aeronautics-erau-singapore',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Aeronautics',
      durationYears: 3.5,
      tuitionFeePerYear: 'SGD 18,172/year',
      description:
        'US ERAU degree. Covers aviation meteorology, aerodynamics, aircraft systems, air traffic management, and aviation safety. Designed for pilots, air traffic controllers, and aviation operations professionals seeking degree credentials.',
    },
    {
      name: 'Bachelor of Science in Aviation Business Administration',
      slug: 'bsc-aviation-business-administration-erau',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Aviation Business',
      durationYears: 3.5,
      tuitionFeePerYear: 'SGD 18,172/year',
      description:
        'US ERAU degree. Combines aviation management, airline finance, airport operations, and business strategy. Prepares graduates for management roles in airlines, airports, and aviation services organisations.',
    },
    {
      name: 'Master of Business Administration in Aviation',
      slug: 'mba-aviation-erau-singapore',
      degreeLevel: DegreeType.MASTER,
      field: 'Aviation Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 36,000/year',
      description:
        'US ERAU MBA with an aviation specialisation. Covers airline strategy, aviation economics, international aviation law, and safety management systems. Delivered in a blended format suited to working aviation professionals.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application & Academic Documents',
      description:
        'Apply via the ERAU Asia admissions portal. Submit certified academic transcripts, a valid passport copy, and proof of English proficiency (IELTS 6.0 or TOEFL 79 minimum).',
    },
    {
      stepNumber: 2,
      title: 'Industry Experience Verification (for MBA)',
      description:
        'MBA applicants must provide evidence of professional aviation-related work experience. Undergraduate applicants may be asked to provide a personal statement or attend a brief admissions interview.',
    },
    {
      stepNumber: 3,
      title: 'Receive Letter of Acceptance & Pay Fees',
      description:
        'Admitted students receive a Letter of Acceptance from ERAU. Pay the required course deposit to confirm enrolment. Scholarship consideration is automatic at the point of admission.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Student Pass',
      description:
        'ERAU Singapore will assist with your ICA Student Pass application. International students must hold a valid Student Pass before course commencement.',
    },
  ],
  scholarships: [
    {
      name: 'Embry-Riddle Asia Partial Scholarship (Undergraduate)',
      value: 'SGD 3,000–SGD 9,000',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: 'https://asia.erau.edu/admissions/scholarships-and-financial-aid',
      description:
        'Merit-based partial scholarship for undergraduate students. Award amount is determined by academic CGPA from the previous institution. No separate application required — all admitted students are automatically evaluated.',
    },
    {
      name: 'Embry-Riddle Asia Partial Scholarship (Graduate)',
      value: 'SGD 1,500–SGD 4,500',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: 'https://asia.erau.edu/admissions/scholarships-and-financial-aid',
      description:
        'Merit and need-based partial scholarship for graduate (MBA) students. Covers tuition costs only — does not apply to textbooks, accommodation, or miscellaneous fees. Open to all nationalities.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 8. ACADEMIES AUSTRALASIA COLLEGE SINGAPORE
// ─────────────────────────────────────────────────────────────
export const ACADEMIES_AUSTRALASIA_COLLEGE = {
  name: 'Academies Australasia College Singapore',
  slug: 'academies-australasia-college-singapore',
  city: 'Singapore',
  foundedYear: 2009,
  totalStudents: 1200,
  internationalStudents: 0.70,
  intakeMonths: 'January, February, April, June, October',
  tuitionFeeMin: 6500,
  tuitionFeeMax: 18000,
  tuitionCurrency: 'SGD',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Academies Australasia College Singapore, established in 2009, is an Australian-linked pathway college offering Foundation, Diploma, and degree top-up programmes in Business, IT, Tourism and Hospitality, and English-medium preparatory courses.',
  overview:
    'Academies Australasia College (AAC) in Singapore is part of the Academies Australasia Group, an Australian-listed education company. The Singapore campus, located at 45 Middle Road in the City Hall area, was established in 2009 following the acquisition of Washington Institute. AAC Singapore offers a pathway-focused curriculum designed to prepare international students for progression to bachelor\'s degree programmes at Australian and UK universities. Programmes include English language courses, Singapore Government School Preparatory programmes, Cambridge IGCSE, Foundation Studies, Diploma and Advanced Diploma programmes, as well as University of Derby top-up degrees. AAC Singapore is CPE-registered and EduTrust-certified, making graduates eligible for Student Pass issuance and Australian university transfer pathways. The college is especially popular with students seeking a stepping-stone to full Australian university study.',
  ranking: null,
  programs: [
    {
      name: 'Diploma in Business Management',
      slug: 'diploma-business-management-aac',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 6,500/year',
      description:
        'CPE-registered diploma covering business fundamentals, marketing, accounting, and management principles. Serves as a pathway to bachelor\'s degree study at Australian and UK partner universities.',
    },
    {
      name: 'Diploma in Information Technology',
      slug: 'diploma-information-technology-aac',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Information Technology',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 7,000/year',
      description:
        'Covers computing fundamentals, networking, programming, and systems analysis. Prepares students for entry into bachelor\'s-level IT programmes or direct employment in technical support and IT operations roles.',
    },
    {
      name: 'Advanced Diploma in Tourism and Hospitality Management',
      slug: 'advanced-diploma-tourism-hospitality-aac',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Tourism & Hospitality',
      durationYears: 1.25,
      tuitionFeePerYear: 'SGD 8,000/year',
      description:
        'A 15-month advanced diploma covering hotel and resort management, tourism marketing, food and beverage operations, and event management. Pathway into hospitality bachelor\'s degree top-up programmes.',
    },
    {
      name: 'Bachelor of Arts (Hons) Business Management (Top-Up)',
      slug: 'ba-business-management-top-up-aac',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 18,000/year',
      description:
        'Awarded by University of Derby (UK). A 12-month top-up degree for students who have completed an advanced diploma. Covers strategic management, innovation, global business, and professional development.',
    },
    {
      name: 'Foundation Studies Programme',
      slug: 'foundation-studies-programme-aac',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'General Studies',
      durationYears: 0.5,
      tuitionFeePerYear: 'SGD 7,500/year',
      description:
        'A one-semester (6-month) foundation programme designed to prepare international students for diploma or degree entry. Covers English, mathematics, and introduction to business and social sciences.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Contact Admissions & Submit Application',
      description:
        'Reach AAC Singapore admissions via email (info@aac.edu.sg) or phone (+65 6337 9949). Submit the application form along with academic transcripts, passport copy, and proof of English proficiency.',
    },
    {
      stepNumber: 2,
      title: 'Pay Application Fee & Receive Letter of Offer',
      description:
        'Pay the SGD 218 application fee. The admissions team reviews your qualifications and issues a Letter of Offer to eligible applicants within a few working days.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Course Fees',
      description:
        'Accept the Letter of Offer and pay the required course fees (or first instalment) to secure your enrolment. AAC Singapore offers flexible fee instalment plans.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Student Pass',
      description:
        'AAC Singapore will submit your Student Pass application through the ICA SOLAR+ portal on your behalf. Await ICA approval before travelling to Singapore to commence studies.',
    },
  ],
  scholarships: [
    {
      name: 'AAC Academic Merit Award',
      value: 'Partial tuition reduction',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: null,
      description:
        'Available to international students with strong prior academic records. The award partially offsets course fees and is assessed on a case-by-case basis at the point of application. Contact admissions for current award amounts.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 9. RAFFLES COLLEGE OF HIGHER EDUCATION (RAFFLES DESIGN INSTITUTE)
// ─────────────────────────────────────────────────────────────
export const RAFFLES_COLLEGE_OF_HIGHER_EDUCATION = {
  name: 'Raffles College of Higher Education',
  slug: 'raffles-college-of-higher-education',
  city: 'Singapore',
  foundedYear: 1990,
  totalStudents: 3000,
  internationalStudents: 0.60,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 13200,
  tuitionFeeMax: 39932,
  tuitionCurrency: 'SGD',
  isFeatured: true,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'Raffles College of Higher Education, founded in Singapore in 1990, is a leading design and creative arts institution offering diploma through Master\'s programmes in Fashion Design, Interior Design, Graphic Design, Business, and Psychology, with degrees awarded by University of Northampton (UK).',
  overview:
    'Raffles College of Higher Education (RCHE) was established in Singapore in 1990 as part of the Raffles Education Group, now one of the largest private education networks in Asia with campuses across 10 countries. The Singapore campus at 111 Somerset Road offers programmes across design, business, psychology, and communication disciplines. Specialist design schools include the Raffles Design Institute (covering Fashion, Interior, Graphic, Digital Media, Animation, Jewellery, Game, and Product Design), the Raffles School of Business, the Raffles School of Psychology, and the Raffles Merchandising Institute. Bachelor\'s and Master\'s degrees are awarded by the University of Northampton (UK). Programmes follow a semester-based structure with intakes every quarter. RCHE is CPE-registered and EduTrust-certified. International students from over 30 nationalities benefit from inter-campus exchange opportunities across the Raffles global network.',
  ranking: null,
  programs: [
    {
      name: 'Bachelor of Arts (Hons) Fashion Design (Top-Up)',
      slug: 'ba-fashion-design-raffles',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Fashion Design',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 29,430/year',
      description:
        'Awarded by University of Northampton (UK). A 12-month top-up degree building on Advanced Diploma foundation. Covers high-end fashion design, textiles, footwear, and accessories with a focus on professional portfolio and collection development.',
    },
    {
      name: 'Bachelor of Arts (Hons) Graphic Communication Design (Top-Up)',
      slug: 'ba-graphic-communication-design-raffles',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Graphic Design',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 29,430/year',
      description:
        'Awarded by University of Northampton (UK). Covers advanced typography, brand identity, advertising, packaging design, and digital communications. Students develop a professional portfolio for industry entry.',
    },
    {
      name: 'Bachelor of Arts (Hons) Interior Architecture and Design (Top-Up)',
      slug: 'ba-interior-architecture-design-raffles',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Interior Design',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 29,430/year',
      description:
        'Awarded by University of Northampton (UK). Covers spatial design, design research, sustainable interiors, and project management. Graduates pursue careers in interior design firms, architecture practices, and property development.',
    },
    {
      name: 'Bachelor of Arts (Hons) Digital Media Design (Top-Up)',
      slug: 'ba-digital-media-design-raffles',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Digital Media',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 29,430/year',
      description:
        'Awarded by University of Northampton (UK). Covers UX/UI design, motion graphics, digital illustration, and interactive media. Prepares graduates for roles in advertising agencies, game studios, and digital media companies.',
    },
    {
      name: 'Advanced Diploma in Fashion Design',
      slug: 'advanced-diploma-fashion-design-raffles',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Fashion Design',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 13,200/year',
      description:
        'Raffles\' own 18-month advanced diploma covering couture techniques, CAD digital portfolio, fashion design research, menswear, and industrial attachment. Entry into the UK Honours top-up degree.',
    },
    {
      name: 'MSc International Business Management',
      slug: 'msc-international-business-management-raffles',
      degreeLevel: DegreeType.MASTER,
      field: 'International Business',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 39,932/year',
      description:
        'Awarded by University of Northampton (UK). Covers international logistics, strategic marketing, cross-cultural management, and global business law. Available with January and July intakes at the Singapore campus.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application & Pay Application Fee',
      description:
        'Apply online or in person at the Raffles admissions office at 111 Somerset Road. Pay the SGD 535 application fee. International students are advised to apply at least 3 months before the intended intake.',
    },
    {
      stepNumber: 2,
      title: 'Provide Academic Transcripts & Portfolio (Design)',
      description:
        'Submit certified academic transcripts, English proficiency results, and a valid passport. Design programme applicants must also submit a creative portfolio demonstrating their artistic ability and design sensibility.',
    },
    {
      stepNumber: 3,
      title: 'Attend Interview & Receive Letter of Offer',
      description:
        'Shortlisted applicants may be invited to a portfolio review or admissions interview (in person or online). Successful candidates receive a Letter of Offer detailing programme, fees, and intake date.',
    },
    {
      stepNumber: 4,
      title: 'Accept Offer, Pay Fees & Apply for Student Pass',
      description:
        'Accept the offer and pay the first fee instalment. Raffles will initiate the ICA Student Pass application on your behalf. Ensure all documents are certified and submitted promptly.',
    },
  ],
  scholarships: [
    {
      name: 'International Student Excellence Award',
      value: '20%–50% tuition waiver',
      type: ScholarshipType.MERIT_BASED,
      learnMoreUrl: 'https://raffles-college.edu.sg/',
      description:
        'Targets high-achieving international students entering diploma or bachelor\'s degree programmes. Award percentage depends on prior academic grades and portfolio quality. Applied against programme tuition fees.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 10. INTERNATIONAL MANAGEMENT AND SPORTS COLLEGE (IMSC)
// ─────────────────────────────────────────────────────────────
export const IMSC = {
  name: 'International Management and Sports College',
  slug: 'international-management-and-sports-college',
  city: 'Singapore',
  foundedYear: 2003,
  totalStudents: 800,
  internationalStudents: 0.40,
  intakeMonths: 'January, May, September',
  tuitionFeeMin: 4459,
  tuitionFeeMax: 9000,
  tuitionCurrency: 'SGD',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'IMSC, founded in 2003 in Singapore, is a CPE-registered college specialising in Sports Management, Business, Hospitality, and Coaching programmes from certificate to bachelor\'s level, in partnership with Edith Cowan University and the United States Sports Academy.',
  overview:
    'International Management and Sports College (IMSC) was established in Singapore in 2003 as the International Sports Academy, with a mandate to provide sports-focused education in Asia. Today, IMSC is a CPE EduTrust-certified Private Education Institution located at Singapore Sports Hub — the nation\'s premier sporting complex — making it uniquely positioned for sports management and coaching education. IMSC offers a diverse range of programmes from certificate to bachelor\'s level across sports science, fitness management, hospitality, business management, and data analytics, through partnerships with the United States Sports Academy, Edith Cowan University (Australia), and OTHM Qualifications (UK). Many programmes include an industrial attachment component requiring Ministry of Manpower approval. IMSC also facilitates national athlete scholarship pathways in coordination with the Singapore Sports Institute.',
  ranking: null,
  programs: [
    {
      name: 'Diploma in Sports Science & Management',
      slug: 'diploma-sports-science-management-imsc',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Sports Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 6,025/year',
      description:
        'Covers sports event management, sports marketing, exercise physiology, and coaching principles. Includes a 6-month industrial attachment component. Pathway into the Bachelor of Science in Sport Management top-up.',
    },
    {
      name: 'Diploma in Sports Science & Coaching',
      slug: 'diploma-sports-science-coaching-imsc',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Sports Coaching',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 6,025/year',
      description:
        'Covers athlete conditioning, sports biomechanics, coaching methodology, and performance analysis. Designed for athletes and fitness professionals seeking formal coaching credentials recognised in Singapore and the region.',
    },
    {
      name: 'Higher Diploma in Hospitality & Tourism Management',
      slug: 'higher-diploma-hospitality-tourism-imsc',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality & Tourism',
      durationYears: 1.5,
      tuitionFeePerYear: 'SGD 9,000/year',
      description:
        'An 18-month programme covering hotel operations, food and beverage management, tourism economics, and event coordination. Includes 6-month industrial attachment and serves as pathway to a bachelor\'s top-up degree.',
    },
    {
      name: 'Diploma in Business & Retail Management',
      slug: 'diploma-business-retail-management-imsc',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business Management',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 6,025/year',
      description:
        'Covers retail strategy, business administration, consumer behaviour, and supply chain fundamentals. Includes industrial attachment placement in Singapore\'s retail sector. Pathway to higher diploma or degree top-up.',
    },
    {
      name: 'Bachelor of Science in Sport Management (Top-Up)',
      slug: 'bsc-sport-management-top-up-imsc',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Sports Management',
      durationYears: 0.67,
      tuitionFeePerYear: 'SGD 9,000/year',
      description:
        'Awarded by Edith Cowan University (Australia). An 8-month top-up degree for holders of a relevant Higher Diploma. Covers sport industry governance, facility management, and strategic sport marketing.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Submit Application & Documents',
      description:
        'Contact IMSC admissions at info@imsc.edu.sg or +65 6423 0668. Submit academic qualifications and transcripts, passport copy, and proof of English proficiency. Certified translated documents are required for non-English records.',
    },
    {
      stepNumber: 2,
      title: 'Application Review & Offer',
      description:
        'IMSC reviews your application for programme suitability. Successful applicants receive a Letter of Offer specifying programme details, fees, and intake date.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer & Pay Course Fees',
      description:
        'Accept the Letter of Offer and pay the required course fees or first instalment. Athletes applying for sports scholarships must additionally submit competition records and meet minimum academic thresholds.',
    },
    {
      stepNumber: 4,
      title: 'Student Pass Application',
      description:
        'IMSC will submit your Student Pass application to ICA through the SOLAR+ portal. Industrial attachment components require separate MOM approval, which IMSC coordinates on your behalf.',
    },
  ],
  scholarships: [
    {
      name: 'IMSC Sports Excellence Scholarship',
      value: '100% of course fees',
      type: ScholarshipType.FULL_FUNDING,
      learnMoreUrl: 'https://imsc.edu.sg/sports-scholarships/',
      description:
        'Full scholarship for current and ex-national athletes (Category A & B) who have competed for Team Singapore in international competitions. Requires minimum 70% academic average. Available to Singapore Citizens and PRs only.',
    },
    {
      name: 'IMSC Sports Merit Scholarship',
      value: '50% of course fees',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: 'https://imsc.edu.sg/sports-scholarships/',
      description:
        'Partial scholarship for national athletes and school athletes who have represented school teams in nationwide competitions with top-8 placement. Requires minimum 70% academic average. Singapore Citizens and PRs only.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// 11. EAIM (EAST ASIA INSTITUTE OF MANAGEMENT)
// ─────────────────────────────────────────────────────────────
export const EAIM = {
  name: 'East Asia Institute of Management',
  slug: 'east-asia-institute-of-management',
  city: 'Singapore',
  foundedYear: 1984,
  totalStudents: 4000,
  internationalStudents: 0.60,
  intakeMonths: 'January, April, July, October',
  tuitionFeeMin: 10800,
  tuitionFeeMax: 40300,
  tuitionCurrency: 'SGD',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  shortDescription:
    'EAIM, established in 1984, is a CPE EduTrust-certified Singapore institution offering diploma, bachelor\'s, and MBA programmes in Business, Hospitality, Accounting, IT, and Logistics through partnerships with Queen Margaret University and Heriot-Watt University (Edinburgh Business School).',
  overview:
    'East Asia Institute of Management (EAIM), founded in 1984 and restructured in 2001, is a well-established Private Education Institution located at 9 Ah Hood Road in Singapore. EAIM holds EduTrust certification from the Committee for Private Education and has capacity for up to 4,000 enrolled students. The institute offers over 13 programmes across 10 academic disciplines including Business Management, Accounting, Banking and Finance, Hospitality and Tourism, Information Systems, Logistics, and Psychology. Bachelor\'s and Master\'s degree programmes are delivered in collaboration with accredited UK universities including Queen Margaret University (Edinburgh) and Edinburgh Business School at Heriot-Watt University. EAIM\'s Academic Excellence Scholarship programme, which can cover up to 100% of fees, makes the institute accessible to talented international students. A reported 88.6% of EAIM alumni were in employment within six months of graduation.',
  ranking: null,
  programs: [
    {
      name: 'Advanced Diploma in Banking and Finance',
      slug: 'advanced-diploma-banking-finance-eaim',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Banking & Finance',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 10,800/year',
      description:
        'EAIM\'s own advanced diploma covering financial markets, banking operations, corporate finance, and risk management. Pathway into bachelor\'s degree top-up programmes in finance or business.',
    },
    {
      name: 'Bachelor of Business Administration',
      slug: 'bachelor-business-administration-eaim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business Administration',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 14,000/year',
      description:
        'Awarded by a UK partner university. Covers management, marketing, human resources, and business strategy. Students with EAIM Advanced Diplomas may enter at an advanced stage, reducing overall study duration.',
    },
    {
      name: 'Bachelor of Science (Hons) Hospitality Management',
      slug: 'bsc-hospitality-management-eaim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality Management',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 14,000/year',
      description:
        'Awarded by Queen Margaret University (UK). Covers hotel management, food and beverage operations, event management, and tourism economics. Prepares graduates for management roles in Singapore\'s vibrant hospitality industry.',
    },
    {
      name: 'Bachelor of Science in Business Information Systems',
      slug: 'bsc-business-information-systems-eaim',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Information Technology',
      durationYears: 3,
      tuitionFeePerYear: 'SGD 14,000/year',
      description:
        'Awarded by a UK partner university. Covers database management, systems analysis, enterprise IT, e-commerce, and project management. Bridges business administration with technology skills.',
    },
    {
      name: 'MSc Marketing',
      slug: 'msc-marketing-eaim',
      degreeLevel: DegreeType.MASTER,
      field: 'Marketing',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 40,300/year',
      description:
        'Awarded by Edinburgh Business School, Heriot-Watt University (UK). Covers global marketing strategy, digital marketing, consumer psychology, and brand management. Total programme fee SGD 40,300.',
    },
    {
      name: 'Diploma in Hospitality and Tourism Management',
      slug: 'diploma-hospitality-tourism-management-eaim',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality & Tourism',
      durationYears: 1,
      tuitionFeePerYear: 'SGD 12,000/year',
      description:
        'EAIM\'s own diploma covering front office management, food and beverage service, tourism planning, and events coordination. Pathway to Advanced Diploma and Bachelor\'s programmes in hospitality.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Complete Application Form',
      description:
        'Submit the EAIM application form online or in person at 9 Ah Hood Road. Pay the non-refundable application and ICA fee of SGD 577.80. Provide academic transcripts, passport copy, and English proficiency results.',
    },
    {
      stepNumber: 2,
      title: 'Document Review & Letter of Offer',
      description:
        'EAIM admissions reviews your submitted documents. Eligible applicants receive a Letter of Offer. Scholarship applicants are assessed simultaneously based on academic records.',
    },
    {
      stepNumber: 3,
      title: 'Accept Offer, Sign Contract & Pay Fees',
      description:
        'Sign the student contract, complete the acceptance form, and pay the first course fee instalment. EAIM\'s scholarship award (if granted) is credited against fees in instalments.',
    },
    {
      stepNumber: 4,
      title: 'Student Pass Application & Orientation',
      description:
        'EAIM submits your Student Pass application to ICA via SOLAR+. Upon approval, attend orientation and commence your studies. 88.6% of EAIM graduates were employed within six months of completing their programme.',
    },
  ],
  scholarships: [
    {
      name: 'EAIM Academic Excellence Scholarship',
      value: 'Up to 100% of tuition fees',
      type: ScholarshipType.FULL_FUNDING,
      learnMoreUrl: 'https://eaim.edu.sg/',
      description:
        'EAIM\'s flagship scholarship for exceptional international students. Can cover up to 100% of tuition fees, with 70% disbursed upfront and 30% in annual instalments. Awarded based on outstanding prior academic achievement.',
    },
    {
      name: 'EAIM International Student Scholarship',
      value: 'Up to SGD 2,000',
      type: ScholarshipType.PARTIAL,
      learnMoreUrl: 'https://eaim.edu.sg/',
      description:
        'Partial scholarship open to new international students enrolling in diploma, bachelor\'s, or postgraduate programmes. Assessed at the point of admission based on academic records and personal statement.',
    },
  ],
};
export const SINGAPORE_UNIVERSITIES: any[] = [
  PSB_ACADEMY,
  SIM_GLOBAL_EDUCATION,
  JAMES_COOK_UNIVERSITY_SINGAPORE,
  NANYANG_INSTITUTE_OF_MANAGEMENT,
  KAPLAN_SINGAPORE,
  MDIS,
  EMBRY_RIDDLE_AERONAUTICAL_UNIVERSITY_SINGAPORE,
  ACADEMIES_AUSTRALASIA_COLLEGE,
  RAFFLES_COLLEGE_OF_HIGHER_EDUCATION,
  IMSC,
  EAIM,
]
