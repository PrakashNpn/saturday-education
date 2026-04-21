import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, DegreeType, ScholarshipType, Region } from '../generated/client'

const pool = new Pool({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL!,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const IMG_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`
  : 'https://placeholder.supabase.co/storage/v1/object/public'

// ─── UNITED KINGDOM ───────────────────────────────────────────────────────────

const UNITED_KINGDOM = {
  slug: 'united-kingdom',
  name: 'United Kingdom',
  region: Region.EUROPE,
  tagline: 'Excellence in Heritage',
  shortDescription: 'World-class universities, shorter degrees, and rich cultural heritage.',
  overview: `Home to the world's oldest universities and a tradition of academic excellence spanning over 800 years. The UK offers internationally recognized degrees, shorter program durations (3-year bachelor's, 1-year master's), and a vibrant multicultural student life across historic cities like London, Oxford, Cambridge, and Edinburgh.`,
  cardImageUrl: `${IMG_BASE}/country-covers/united-kingdom.jpg`,
  heroImageUrl: `${IMG_BASE}/country-heroes/united-kingdom.jpg`,
  institutionCount: '160+',
  tuitionFeeRange: '$25,000 – $45,000',
  postStudyWorkVisa: 'Graduate Route – 2 years (3 years for PhD)',
  internationalStudents: 680000,
  visaProcessingTime: '3 weeks',
  workRights: '20 hrs/week during term, full-time during holidays. Graduate Route: 2 years post-study (3 years for PhD).',
  costOfLivingMinUSD: 12000,
  costOfLivingMaxUSD: 18000,
  currencyCode: 'GBP',
  academicSpecialties: ['Business & Finance', 'Engineering', 'Medicine & Health Sciences', 'Law', 'Computer Science', 'Arts & Humanities'],
  isFeatured: true,
  advantages: [
    { title: 'World-Class Universities', description: '4 of the top 10 global universities are in the UK. Degrees are respected by employers worldwide.', order: 1 },
    { title: 'Shorter, More Focused Degrees', description: "Bachelor's in 3 years, master's in 1 year — saving you time and tuition compared to most other destinations.", order: 2 },
    { title: 'Cultural & Career Hub', description: 'London alone hosts HQs of 40% of the FTSE 100. Vibrant, multicultural cities make for an unforgettable student experience.', order: 3 },
  ],
  processSteps: [
    { stepNumber: 1, title: 'Research & Shortlist', description: 'Identify universities and courses that match your academic profile and career goals. Most UK applications go through UCAS for undergraduate programs.' },
    { stepNumber: 2, title: 'Apply & Receive Offer', description: 'Submit applications with personal statement, references, and transcripts. Conditional offers arrive within 2–8 weeks.' },
    { stepNumber: 3, title: 'Confirm & Get CAS', description: 'Accept your offer, pay the deposit, and receive your Confirmation of Acceptance for Studies (CAS) — the document required for your visa.' },
    { stepNumber: 4, title: 'Visa & Departure', description: 'Apply for the Student visa online, attend biometrics, and prepare for arrival. Processing averages 3 weeks.' },
  ],
  faqs: [
    { question: 'What IELTS score do I need for UK universities?', answer: 'Most undergraduate programs require IELTS 6.0–6.5 overall with no band below 5.5. Postgraduate programs typically require 6.5–7.0. Top universities like Oxford and Cambridge often require 7.0+.', order: 1 },
    { question: 'Can I work while studying in the UK?', answer: 'Yes. Student visa holders can work up to 20 hours per week during term and full-time during official holidays.', order: 2 },
    { question: 'Do I need to show financial proof for a UK student visa?', answer: "You must show funds to cover the first year's tuition plus living costs (£1,334/month in London, £1,023/month elsewhere) for up to 9 months.", order: 3 },
    { question: 'Can I bring my family on a Student visa?', answer: 'Dependants are only allowed for postgraduate research programs (9+ months) or government-sponsored courses.', order: 4 },
  ],
  scholarships: [
    { name: 'Chevening Scholarship', type: ScholarshipType.FULL_FUNDING, value: 'Full tuition + monthly stipend + flights', description: 'UK government flagship scholarship for mid-career professionals with 2+ years work experience, pursuing a one-year master\'s. Deadline: November annually.', learnMoreUrl: 'https://www.chevening.org' },
    { name: 'Commonwealth Scholarship', type: ScholarshipType.FULL_FUNDING, value: 'Full tuition + stipend + flights', description: 'For citizens of Commonwealth countries pursuing a master\'s or PhD with a strong academic record. Deadline: October annually.', learnMoreUrl: 'https://cscuk.fcdo.gov.uk' },
  ],
}

const OXFORD = {
  slug: 'oxford',
  name: 'University of Oxford',
  city: 'Oxford',
  foundedYear: 1096,
  ranking: 3,
  acceptanceRate: 17.5,
  internationalStudents: 45,
  totalStudents: 26000,
  numberOfCampuses: 2,
  graduateEmployability: 91,
  intakeMonths: 'October',
  tuitionFeeMin: 32000,
  tuitionFeeMax: 52000,
  tuitionCurrency: 'USD',
  isFeatured: true,
  logoUrl: `${IMG_BASE}/university-logos/oxford.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/oxford.jpg`,
  shortDescription: 'The oldest English-speaking university in the world, combining 900 years of tradition with world-leading research.',
  overview: `The oldest university in the English-speaking world, Oxford combines 900 years of tradition with world-leading research. Its collegiate system, tutorial teaching, and vast library resources produce generations of leaders, Nobel laureates, and Rhodes scholars.`,
  programs: [
    { name: 'MSc Computer Science', slug: 'msc-computer-science', degreeLevel: DegreeType.MASTER, field: 'Computer Science', durationYears: 1, tuitionFeePerYear: '$48,000/year', description: "A rigorous one-year master's covering algorithms, machine learning, and advanced systems programming." },
    { name: 'BA Philosophy, Politics and Economics', slug: 'ba-ppe', degreeLevel: DegreeType.BACHELOR, field: 'Social Sciences', durationYears: 3, tuitionFeePerYear: '$42,000/year', description: "Oxford's flagship interdisciplinary undergraduate degree, producing world leaders across politics, business, and academia." },
    { name: 'MBA', slug: 'mba', degreeLevel: DegreeType.MASTER, field: 'Business', durationYears: 1, tuitionFeePerYear: '$78,000/year', description: "Said Business School's full-time MBA, consistently ranked in the global top 15." },
    { name: 'MSc Data Science', slug: 'msc-data-science', degreeLevel: DegreeType.MASTER, field: 'Data Science', durationYears: 1, tuitionFeePerYear: '$46,000/year', description: 'Covers statistical learning, big data infrastructure, and applications in healthcare and finance.' },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Check Eligibility', description: 'Review entry requirements, English language scores, and subject prerequisites.' },
    { stepNumber: 2, title: 'Submit UCAS / Graduate Application', description: 'Applications open in September; undergraduate deadline is October 15 for Oxford.' },
    { stepNumber: 3, title: 'Admission Tests & Interview', description: 'Sit the required admission test (e.g., TSA, MAT) and attend interview in December.' },
    { stepNumber: 4, title: 'Receive Decision', description: 'Offers issued in January. Accept, meet conditions, and secure CAS for visa.' },
  ],
  scholarships: [
    { name: 'Reach Oxford Scholarship', type: ScholarshipType.FULL_FUNDING, value: 'Full tuition + college fee + living stipend', description: 'For students from low-income countries who cannot otherwise afford to study at Oxford.', learnMoreUrl: null },
  ],
}

const CAMBRIDGE = {
  slug: 'cambridge',
  name: 'University of Cambridge',
  city: 'Cambridge',
  foundedYear: 1209,
  ranking: 5,
  acceptanceRate: 21,
  internationalStudents: 40,
  totalStudents: 24000,
  numberOfCampuses: 1,
  graduateEmployability: 93,
  intakeMonths: 'October',
  tuitionFeeMin: 30000,
  tuitionFeeMax: 48000,
  tuitionCurrency: 'USD',
  isFeatured: true,
  logoUrl: `${IMG_BASE}/university-logos/cambridge.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/cambridge.jpg`,
  shortDescription: 'An 800-year-old collegiate university renowned for mathematics, science, and transformative research.',
  overview: `One of the world's greatest universities, Cambridge has produced 121 Nobel laureates and leaders across every discipline. Its collegiate structure, pioneering research culture, and beautiful city make it a once-in-a-lifetime academic experience.`,
  programs: [
    { name: 'MEng Engineering', slug: 'meng-engineering', degreeLevel: DegreeType.MASTER, field: 'Engineering', durationYears: 1, tuitionFeePerYear: '$40,000/year', description: "Integrated master's covering mechanical, civil, and electrical engineering with a strong research component." },
    { name: 'BA Mathematics', slug: 'ba-mathematics', degreeLevel: DegreeType.BACHELOR, field: 'Mathematics', durationYears: 3, tuitionFeePerYear: '$32,000/year', description: "The Mathematical Tripos — one of the world's most demanding and prestigious undergraduate mathematics degrees." },
    { name: 'MSc Natural Sciences', slug: 'msc-natural-sciences', degreeLevel: DegreeType.MASTER, field: 'Natural Sciences', durationYears: 1, tuitionFeePerYear: '$38,000/year', description: 'Interdisciplinary postgraduate program spanning physics, chemistry, biology, and earth sciences.' },
    { name: 'MPhil Economics', slug: 'mphil-economics', degreeLevel: DegreeType.MASTER, field: 'Economics', durationYears: 1, tuitionFeePerYear: '$37,000/year', description: "A research-intensive master's providing advanced training in microeconomics, macroeconomics, and econometrics." },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Check Course Requirements', description: 'Confirm academic prerequisites and English language requirements for your chosen Tripos or postgraduate course.' },
    { stepNumber: 2, title: 'Submit UCAS / Graduate Application', description: 'Undergraduates apply via UCAS by October 15. Postgraduates apply through the Cambridge Graduate Admissions portal.' },
    { stepNumber: 3, title: 'Assessment & Interview', description: 'Most courses require written assessments and a college interview held in November–December.' },
  ],
  scholarships: [
    { name: 'Cambridge Trust Scholarship', type: ScholarshipType.MERIT_BASED, value: 'Up to full tuition + maintenance', description: 'Awarded on academic merit to outstanding international students. Covers tuition and living costs for the duration of study.', learnMoreUrl: null },
  ],
}

const IMPERIAL = {
  slug: 'imperial-college-london',
  name: 'Imperial College London',
  city: 'London',
  foundedYear: 1907,
  ranking: 2,
  acceptanceRate: 14.3,
  internationalStudents: 59,
  totalStudents: 22000,
  numberOfCampuses: 1,
  graduateEmployability: 92,
  intakeMonths: 'October',
  tuitionFeeMin: 38000,
  tuitionFeeMax: 55000,
  tuitionCurrency: 'USD',
  isFeatured: false,
  logoUrl: `${IMG_BASE}/university-logos/imperial.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/imperial.jpg`,
  shortDescription: 'A world-leading STEM and medical university in the heart of London.',
  overview: `Imperial College London is a world top-10 university focused on science, engineering, medicine, and business. Based in South Kensington with strong links to London's tech and finance sectors, Imperial graduates are among the most employable in Europe.`,
  programs: [
    { name: 'MEng Aeronautical Engineering', slug: 'meng-aeronautical-engineering', degreeLevel: DegreeType.MASTER, field: 'Engineering', durationYears: 4, tuitionFeePerYear: '$48,000/year', description: "Integrated master's in aeronautics covering aerodynamics, propulsion, and structures with industry placements." },
    { name: 'MSc AI & Machine Learning', slug: 'msc-ai-ml', degreeLevel: DegreeType.MASTER, field: 'Computer Science', durationYears: 1, tuitionFeePerYear: '$50,000/year', description: 'Deep learning, reinforcement learning, and AI applications in robotics and healthcare.' },
    { name: 'MBBS Medicine', slug: 'mbbs-medicine', degreeLevel: DegreeType.BACHELOR, field: 'Medicine & Health Sciences', durationYears: 6, tuitionFeePerYear: '$55,000/year', description: 'Six-year undergraduate medical degree with clinical placements at NHS hospitals across London.' },
    { name: 'MSc Finance', slug: 'msc-finance', degreeLevel: DegreeType.MASTER, field: 'Business', durationYears: 1, tuitionFeePerYear: '$42,000/year', description: 'Quantitative finance program at Imperial College Business School, with strong links to City of London firms.' },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Review Entry Requirements', description: 'Check A-level/IB requirements, GCSE prerequisites for medicine, and English proficiency scores.' },
    { stepNumber: 2, title: 'Submit Application', description: 'Undergraduate: apply via UCAS. Postgraduate: apply directly through the Imperial admissions portal.' },
    { stepNumber: 3, title: 'Assessment & Decision', description: 'UCAT/BMAT required for medicine. Written tests may apply for engineering. Decisions arrive within 6–10 weeks.' },
  ],
  scholarships: [
    { name: "President's PhD Scholarship", type: ScholarshipType.FULL_FUNDING, value: 'Full tuition + £20,000/year stipend', description: 'Highly competitive scholarship for exceptional PhD candidates. Covers full fees and a living stipend for 3.5 years.', learnMoreUrl: null },
  ],
}

// ─── UNITED STATES ────────────────────────────────────────────────────────────

const UNITED_STATES = {
  slug: 'united-states',
  name: 'United States of America',
  region: Region.AMERICAS,
  tagline: 'Land of Global Reach',
  shortDescription: "The world's most diverse higher education system with unmatched research investment.",
  overview: `Home to 4,000+ accredited institutions, the USA hosts more international students than any other country. Its research funding is unmatched, its campuses are culturally diverse, and programs from liberal arts colleges to Ivy League research universities offer unparalleled flexibility and career outcomes.`,
  cardImageUrl: `${IMG_BASE}/country-covers/united-states.jpg`,
  heroImageUrl: `${IMG_BASE}/country-heroes/united-states.jpg`,
  institutionCount: '4,000+',
  tuitionFeeRange: '$35,000 – $65,000',
  postStudyWorkVisa: 'OPT – 12 months, extendable to 36 months for STEM graduates',
  internationalStudents: 1100000,
  visaProcessingTime: '3–8 weeks (varies by consulate)',
  workRights: '20 hrs/week on-campus during term. Post-study: OPT — 12 months, extendable to 36 months for STEM.',
  costOfLivingMinUSD: 12000,
  costOfLivingMaxUSD: 22000,
  currencyCode: 'USD',
  academicSpecialties: ['Computer Science', 'Business & MBA', 'Engineering', 'Medicine', 'Liberal Arts', 'Data Science'],
  isFeatured: true,
  advantages: [
    { title: 'Unmatched Academic Flexibility', description: 'Liberal arts philosophy lets you explore multiple disciplines before declaring a major. Change paths without starting over.', order: 1 },
    { title: 'Research & Innovation Powerhouse', description: '$75B+ in annual university research funding. MIT, Stanford, and Harvard lead global rankings across STEM fields.', order: 2 },
    { title: 'OPT & STEM Extension', description: 'Work in the US for up to 3 years after graduation in STEM fields — a direct pathway to US careers and H-1B sponsorship.', order: 3 },
  ],
  processSteps: [
    { stepNumber: 1, title: 'Standardized Tests', description: 'Take SAT/ACT (undergraduate) or GRE/GMAT (graduate), plus TOEFL/IELTS for English proficiency.' },
    { stepNumber: 2, title: 'Apply to Universities', description: 'Submit applications via Common App (undergraduate) or direct portals. Include essays, transcripts, and recommendations.' },
    { stepNumber: 3, title: 'Receive I-20', description: 'After acceptance and financial documentation, the university issues Form I-20, required for your F-1 visa application.' },
    { stepNumber: 4, title: 'F-1 Visa Interview', description: 'Pay SEVIS fee, schedule consulate interview, and travel up to 30 days before program start.' },
  ],
  faqs: [
    { question: 'What is OPT and how long can I stay in the US after graduating?', answer: 'Optional Practical Training (OPT) lets you work in a field related to your degree for 12 months after graduation. STEM graduates can apply for a 24-month extension, giving up to 3 years of US work experience.', order: 1 },
    { question: 'Do I need SAT/ACT for US university admission?', answer: 'Most US universities have adopted test-optional policies, but competitive institutions still give weight to strong scores. For graduate programs, GRE or GMAT scores are typically required.', order: 2 },
    { question: 'How expensive is it to study in the US?', answer: 'Tuition ranges from $35,000 to $65,000/year at private universities, though many offer generous need-based aid. Living costs vary from $12,000 (smaller cities) to $22,000+ (New York, San Francisco).', order: 3 },
    { question: 'Can I work off-campus during my F-1 visa?', answer: 'Off-campus work during the academic year is generally not permitted unless authorized through CPT or economic hardship. On-campus jobs up to 20 hours/week are allowed.', order: 4 },
  ],
  scholarships: [
    { name: 'Fulbright Foreign Student Program', type: ScholarshipType.FULL_FUNDING, value: 'Full tuition + living stipend + travel', description: 'US government flagship scholarship for international students pursuing graduate-level study. Deadline varies by country.', learnMoreUrl: 'https://foreign.fulbrightonline.org' },
    { name: 'Hubert H. Humphrey Fellowship', type: ScholarshipType.MERIT_BASED, value: 'Tuition + stipend + travel (non-degree program)', description: 'For mid-career professionals from developing countries. Non-degree academic year at a US university with professional affiliations.', learnMoreUrl: 'https://www.humphreyfellowship.org' },
  ],
}

const HARVARD = {
  slug: 'harvard',
  name: 'Harvard University',
  city: 'Cambridge, MA',
  foundedYear: 1636,
  ranking: 4,
  acceptanceRate: 3.4,
  internationalStudents: 25,
  totalStudents: 36000,
  numberOfCampuses: 2,
  graduateEmployability: 96,
  intakeMonths: 'September',
  tuitionFeeMin: 57000,
  tuitionFeeMax: 60000,
  tuitionCurrency: 'USD',
  isFeatured: true,
  logoUrl: `${IMG_BASE}/university-logos/harvard.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/harvard.jpg`,
  shortDescription: "America's oldest university and a global leader in law, medicine, business, and public policy.",
  overview: `Founded in 1636, Harvard is America's oldest university and consistently ranks among the world's best. Its 12 degree-granting schools include HBS, Harvard Law, and Harvard Medical School — producing presidents, CEOs, and Nobel laureates across every field.`,
  programs: [
    { name: 'MBA', slug: 'mba', degreeLevel: DegreeType.MASTER, field: 'Business', durationYears: 2, tuitionFeePerYear: '$75,000/year', description: "Harvard Business School's flagship case-method MBA, consistently ranked in the global top 5." },
    { name: 'Master in Public Administration', slug: 'mpa', degreeLevel: DegreeType.MASTER, field: 'Public Policy', durationYears: 2, tuitionFeePerYear: '$58,000/year', description: "Harvard Kennedy School's MPA trains future government leaders and policy professionals." },
    { name: 'JD Law', slug: 'jd-law', degreeLevel: DegreeType.MASTER, field: 'Law', durationYears: 3, tuitionFeePerYear: '$68,000/year', description: "Harvard Law School — the world's most renowned law degree, with unparalleled alumni networks." },
    { name: 'MS Data Science', slug: 'ms-data-science', degreeLevel: DegreeType.MASTER, field: 'Data Science', durationYears: 2, tuitionFeePerYear: '$55,000/year', description: "Covers machine learning, statistical inference, and data engineering with Harvard's world-class faculty." },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research Programs', description: 'Each Harvard school has its own admissions process. Identify your school and review specific requirements.' },
    { stepNumber: 2, title: 'Prepare Application Materials', description: 'Essays, recommendations, transcripts, GMAT/GRE/LSAT, and TOEFL/IELTS for international students.' },
    { stepNumber: 3, title: 'Submit & Interview', description: 'HBS rounds: R1 (September), R2 (January). Kennedy/Law have their own deadlines. Interviews by invitation only.' },
    { stepNumber: 4, title: 'Financial Aid & Enrollment', description: 'Harvard meets 100% of demonstrated financial need for admitted students. Confirm enrollment after aid offer.' },
  ],
  scholarships: [
    { name: 'Harvard Financial Aid Initiative', type: ScholarshipType.FULL_FUNDING, value: 'Need-blind, meets 100% of demonstrated need', description: 'Harvard undergraduate admissions is need-blind for all applicants. Families earning under $85,000/year typically pay nothing.', learnMoreUrl: null },
  ],
}

const MIT = {
  slug: 'mit',
  name: 'Massachusetts Institute of Technology',
  city: 'Cambridge, MA',
  foundedYear: 1861,
  ranking: 1,
  acceptanceRate: 4.1,
  internationalStudents: 37,
  totalStudents: 11500,
  numberOfCampuses: 1,
  graduateEmployability: 95,
  intakeMonths: 'September',
  tuitionFeeMin: 60000,
  tuitionFeeMax: 60000,
  tuitionCurrency: 'USD',
  isFeatured: true,
  logoUrl: `${IMG_BASE}/university-logos/mit.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/mit.jpg`,
  shortDescription: "The world's #1 STEM university, pioneering research across engineering, AI, and the life sciences.",
  overview: `MIT is consistently ranked the world's top university for engineering and technology. Its culture of hands-on learning, entrepreneurship, and cross-disciplinary innovation has produced 97 Nobel laureates and more than 30,000 startups valued collectively at $2 trillion.`,
  programs: [
    { name: 'MEng Electrical Engineering & CS', slug: 'meng-eecs', degreeLevel: DegreeType.MASTER, field: 'Computer Science', durationYears: 1, tuitionFeePerYear: '$60,000/year', description: "Master of Engineering in the world's top EECS department, combining coursework with independent research." },
    { name: 'MBA at Sloan', slug: 'mba-sloan', degreeLevel: DegreeType.MASTER, field: 'Business', durationYears: 2, tuitionFeePerYear: '$77,000/year', description: "MIT Sloan School of Management's full-time MBA with a focus on innovation and entrepreneurship." },
    { name: 'MS Aeronautical Engineering', slug: 'ms-aeronautical-engineering', degreeLevel: DegreeType.MASTER, field: 'Engineering', durationYears: 2, tuitionFeePerYear: '$58,000/year', description: "Department of Aeronautics and Astronautics — research-focused master's in aerospace systems and propulsion." },
    { name: 'PhD Computer Science', slug: 'phd-computer-science', degreeLevel: DegreeType.PHD, field: 'Computer Science', durationYears: 5, tuitionFeePerYear: '$60,000/year', description: 'Fully funded PhD in the CSAIL lab — one of the world\'s premier AI and systems research environments.' },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Choose Program & Research Fit', description: 'MIT graduate admissions are department-specific. For PhD programs, identify faculty whose research aligns with your interests.' },
    { stepNumber: 2, title: 'Prepare Materials', description: 'GRE (optional for many programs), TOEFL/IELTS, three recommendation letters, research statement, and transcripts.' },
    { stepNumber: 3, title: 'Submit Application', description: 'Most MIT graduate deadlines fall in December–January. Decisions arrive March–April.' },
  ],
  scholarships: [
    { name: 'MIT Need-Based Aid', type: ScholarshipType.FULL_FUNDING, value: 'Meets 100% of demonstrated financial need', description: "MIT's need-blind undergraduate admissions covers full demonstrated need. Graduate students receive full funding via research and teaching assistantships.", learnMoreUrl: null },
  ],
}

const STANFORD = {
  slug: 'stanford',
  name: 'Stanford University',
  city: 'Stanford, CA',
  foundedYear: 1885,
  ranking: 6,
  acceptanceRate: 3.7,
  internationalStudents: 30,
  totalStudents: 17000,
  numberOfCampuses: 1,
  graduateEmployability: 94,
  intakeMonths: 'September',
  tuitionFeeMin: 62000,
  tuitionFeeMax: 62000,
  tuitionCurrency: 'USD',
  isFeatured: true,
  logoUrl: `${IMG_BASE}/university-logos/stanford.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/stanford.jpg`,
  shortDescription: "Silicon Valley's intellectual engine — where world-changing companies are born.",
  overview: `Stanford sits at the heart of Silicon Valley and has produced companies like Google, HP, Netflix, and Instagram. Its culture of entrepreneurship, open interdisciplinary research, and proximity to the world's tech hub creates unmatched opportunities for students.`,
  programs: [
    { name: 'MS Computer Science', slug: 'ms-computer-science', degreeLevel: DegreeType.MASTER, field: 'Computer Science', durationYears: 2, tuitionFeePerYear: '$62,000/year', description: "One of the most sought-after CS master's programs globally, with specializations in AI, systems, and HCI." },
    { name: 'MBA at GSB', slug: 'mba-gsb', degreeLevel: DegreeType.MASTER, field: 'Business', durationYears: 2, tuitionFeePerYear: '$78,000/year', description: 'Stanford Graduate School of Business MBA — the most selective MBA program in the world.' },
    { name: 'MS Management Science & Engineering', slug: 'ms-mse', degreeLevel: DegreeType.MASTER, field: 'Engineering', durationYears: 1, tuitionFeePerYear: '$60,000/year', description: 'Integrates engineering methods, business analytics, and organizational theory for tech-industry leaders.' },
    { name: 'MFA Design', slug: 'mfa-design', degreeLevel: DegreeType.MASTER, field: 'Arts & Humanities', durationYears: 2, tuitionFeePerYear: '$55,000/year', description: "Interdisciplinary design master's at the d.school — combining human-centered design with technology and social impact." },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Research & Prepare', description: 'Review program-specific requirements, identify faculty, and prepare GRE/GMAT, TOEFL/IELTS, and recommendation letters.' },
    { stepNumber: 2, title: 'Submit Application', description: 'Stanford graduate deadlines typically fall in December. MBA R1 is September, R2 is January.' },
    { stepNumber: 3, title: 'Interview & Decision', description: 'Competitive programs invite shortlisted candidates for interviews. Final decisions arrive February–April.' },
  ],
  scholarships: [
    { name: 'Knight-Hennessy Scholars Program', type: ScholarshipType.FULL_FUNDING, value: 'Full tuition + living stipend + travel for 3 years', description: "Stanford's flagship graduate scholarship for exceptional leaders. Covers any Stanford graduate degree with full funding.", learnMoreUrl: 'https://knight-hennessy.stanford.edu' },
  ],
}

// ─── AUSTRALIA ────────────────────────────────────────────────────────────────

const AUSTRALIA = {
  slug: 'australia',
  name: 'Australia',
  region: Region.OCEANIA,
  tagline: 'Innovation & Lifestyle',
  shortDescription: 'Group of Eight excellence, generous work rights, and a clear PR pathway.',
  overview: `Home to the prestigious Group of Eight universities and some of the world's most liveable cities. Australia balances academic excellence, generous work rights (48 hours/fortnight), and a clear pathway from student visa to permanent residency — making it a top choice for career-focused international students.`,
  cardImageUrl: `${IMG_BASE}/country-covers/australia.jpg`,
  heroImageUrl: `${IMG_BASE}/country-heroes/australia.jpg`,
  institutionCount: '43',
  tuitionFeeRange: '$28,000 – $45,000',
  postStudyWorkVisa: 'Temporary Graduate visa (subclass 485) – 2–4 years',
  internationalStudents: 750000,
  visaProcessingTime: '4–8 weeks',
  workRights: '48 hrs/fortnight during term, unlimited during breaks. Post-study: Temporary Graduate visa (485) — 2–4 years.',
  costOfLivingMinUSD: 17000,
  costOfLivingMaxUSD: 25000,
  currencyCode: 'AUD',
  academicSpecialties: ['Mining & Geology', 'Nursing & Healthcare', 'Hospitality & Tourism', 'Engineering', 'Marine Biology', 'Business'],
  isFeatured: true,
  advantages: [
    { title: 'Group of Eight Excellence', description: "7 of Australia's universities rank in the global top 100. Research-led teaching produces internationally recognized degrees.", order: 1 },
    { title: 'Work Rights That Actually Work', description: '48 hours/fortnight is among the most generous student work allowances globally — enough to offset living costs meaningfully.', order: 2 },
    { title: 'PR Pathway', description: 'Post-study work visa + skilled occupation lists make Australia one of the clearest routes from student to permanent resident.', order: 3 },
  ],
  processSteps: [
    { stepNumber: 1, title: 'Choose Course & University', description: 'Match your field to CRICOS-registered programs. Check skilled occupation lists if permanent residency is a goal.' },
    { stepNumber: 2, title: 'Apply & Receive CoE', description: 'Accept your offer and receive the Confirmation of Enrolment (CoE) — required for your student visa application.' },
    { stepNumber: 3, title: 'GTE Statement', description: 'Prepare a Genuine Temporary Entrant statement explaining your intent to study and return home afterwards. Critical for visa approval.' },
    { stepNumber: 4, title: 'Lodge Subclass 500 Visa', description: 'Apply online with CoE, GTE statement, OSHC (Overseas Student Health Cover), and financial evidence.' },
  ],
  faqs: [
    { question: 'What is the GTE statement and why does it matter?', answer: "The Genuine Temporary Entrant (GTE) statement explains your reasons for studying in Australia and your intention to return home after your degree. Immigration officers use it to assess whether your primary purpose is study. A weak or generic GTE is the most common reason for visa refusal.", order: 1 },
    { question: 'Do I need Overseas Student Health Cover (OSHC)?', answer: 'Yes, OSHC is compulsory for all student visa holders and their dependants. It covers basic medical and hospital care. You must purchase it before your visa is granted and maintain it for your entire stay.', order: 2 },
    { question: 'Can studying in Australia lead to permanent residency?', answer: 'Yes. Completing a degree in Australia earns you points on the skilled migration points test. The Temporary Graduate visa (subclass 485) lets you work and gain experience, and applying for a skilled visa (189/190) is a well-established PR pathway.', order: 3 },
    { question: 'How many hours can I work while studying?', answer: 'You can work 48 hours per fortnight during your enrolled study period. During official vacation periods, there is no cap on working hours.', order: 4 },
  ],
  scholarships: [
    { name: 'Australia Awards Scholarship', type: ScholarshipType.FULL_FUNDING, value: 'Full tuition + living allowance + health cover + travel', description: 'Australian government scholarship for citizens of developing countries, including Myanmar and Thailand. For undergraduate and postgraduate study.', learnMoreUrl: 'https://www.australiaawards.gov.au' },
    { name: 'Destination Australia Program', type: ScholarshipType.PARTIAL, value: 'AUD $15,000/year', description: "For international students studying at regional campuses across Australia. Supports relocation and study in Australia's regional communities.", learnMoreUrl: null },
  ],
}

const MELBOURNE = {
  slug: 'melbourne',
  name: 'University of Melbourne',
  city: 'Melbourne, VIC',
  foundedYear: 1853,
  ranking: 13,
  acceptanceRate: 70,
  internationalStudents: 46,
  totalStudents: 53000,
  numberOfCampuses: 7,
  graduateEmployability: 87,
  intakeMonths: 'February, July',
  tuitionFeeMin: 45000,
  tuitionFeeMax: 50000,
  tuitionCurrency: 'AUD',
  isFeatured: true,
  logoUrl: `${IMG_BASE}/university-logos/melbourne.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/melbourne.jpg`,
  shortDescription: "Australia's #1 university, combining research excellence with a vibrant campus in one of the world's most liveable cities.",
  overview: `Consistently ranked Australia's #1 university, Melbourne is a member of the prestigious Group of Eight and home to over 65,000 students from 170 countries. Its parkland campus combines world-class research facilities with vibrant student life and direct links to Melbourne's thriving professional scene.`,
  programs: [
    { name: 'Master of Engineering', slug: 'master-of-engineering', degreeLevel: DegreeType.MASTER, field: 'Engineering', durationYears: 2, tuitionFeePerYear: 'AUD $50,000/year', description: 'Specializations across civil, mechanical, and software engineering with strong industry connections.' },
    { name: 'Master of Business Administration', slug: 'mba', degreeLevel: DegreeType.MASTER, field: 'Business', durationYears: 2, tuitionFeePerYear: 'AUD $48,000/year', description: 'Melbourne Business School MBA, ranked in the global top 50, with a strong Asia-Pacific focus.' },
    { name: 'Bachelor of Science', slug: 'bachelor-of-science', degreeLevel: DegreeType.BACHELOR, field: 'Natural Sciences', durationYears: 3, tuitionFeePerYear: 'AUD $45,000/year', description: 'Flexible science degree with majors in biology, chemistry, physics, mathematics, and environmental science.' },
    { name: 'Master of Data Science', slug: 'master-of-data-science', degreeLevel: DegreeType.MASTER, field: 'Data Science', durationYears: 2, tuitionFeePerYear: 'AUD $47,000/year', description: 'Covers machine learning, statistical modelling, and big data engineering with real-world industry projects.' },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Check Admission Requirements', description: 'Review academic prerequisites, English proficiency (IELTS 6.5+ or equivalent), and any portfolio requirements.' },
    { stepNumber: 2, title: 'Apply via Admissions Portal', description: "Submit your application through the University of Melbourne's online portal with transcripts, references, and personal statement." },
    { stepNumber: 3, title: 'Receive Offer & Accept', description: 'Offers are emailed within 4–8 weeks. Accept your offer and pay the deposit to secure your place and receive your CoE.' },
  ],
  scholarships: [
    { name: 'Melbourne Graduate Scholarship', type: ScholarshipType.MERIT_BASED, value: '10–50% tuition fee waiver', description: 'Awarded to high-achieving international students enrolling in a graduate coursework program. Based on academic merit.', learnMoreUrl: null },
  ],
}

const ANU = {
  slug: 'anu',
  name: 'Australian National University',
  city: 'Canberra, ACT',
  foundedYear: 1946,
  ranking: 30,
  acceptanceRate: 35,
  internationalStudents: 39,
  totalStudents: 22000,
  numberOfCampuses: 1,
  graduateEmployability: 85,
  intakeMonths: 'February, July',
  tuitionFeeMin: 44000,
  tuitionFeeMax: 47000,
  tuitionCurrency: 'AUD',
  isFeatured: false,
  logoUrl: `${IMG_BASE}/university-logos/anu.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/anu.jpg`,
  shortDescription: "Australia's national university and leading research institution, ranked in the global top 30.",
  overview: `Established by the Australian parliament in 1946, ANU is Australia's national university and ranks in the global top 30. Located in Canberra, it has unparalleled access to government institutions, making it ideal for students in politics, law, international relations, and public policy.`,
  programs: [
    { name: 'Master of International Relations', slug: 'master-of-international-relations', degreeLevel: DegreeType.MASTER, field: 'International Relations', durationYears: 2, tuitionFeePerYear: 'AUD $44,000/year', description: "Leading international relations program with direct access to Canberra's diplomatic community and think tanks." },
    { name: 'Master of Applied Cybersecurity', slug: 'master-of-cybersecurity', degreeLevel: DegreeType.MASTER, field: 'Computer Science', durationYears: 2, tuitionFeePerYear: 'AUD $46,000/year', description: 'Technical and policy-focused cybersecurity program delivered in partnership with the Australian Signals Directorate.' },
    { name: 'Bachelor of Laws', slug: 'bachelor-of-laws', degreeLevel: DegreeType.BACHELOR, field: 'Law', durationYears: 4, tuitionFeePerYear: 'AUD $47,000/year', description: "ANU's LLB is consistently ranked Australia's #1 law degree, with mooting competitions and international exchange programs." },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Check Eligibility', description: 'Confirm academic prerequisites and English language requirements (IELTS 6.5+ overall, 6.0 in each band).' },
    { stepNumber: 2, title: 'Submit Application', description: 'Apply through the ANU admissions portal. International students should apply at least 3 months before intake.' },
    { stepNumber: 3, title: 'Receive Offer & CoE', description: 'Accept your offer online and pay the deposit. ANU issues your Confirmation of Enrolment for the visa application.' },
  ],
  scholarships: [
    { name: "ANU Chancellor's International Scholarship", type: ScholarshipType.MERIT_BASED, value: '25% tuition fee waiver', description: 'Awarded to high-achieving international students. Automatically considered on application — no separate form required.', learnMoreUrl: null },
  ],
}

const SYDNEY = {
  slug: 'sydney',
  name: 'University of Sydney',
  city: 'Sydney, NSW',
  foundedYear: 1850,
  ranking: 18,
  acceptanceRate: 30,
  internationalStudents: 44,
  totalStudents: 73000,
  numberOfCampuses: 2,
  graduateEmployability: 88,
  intakeMonths: 'February, July',
  tuitionFeeMin: 46000,
  tuitionFeeMax: 52000,
  tuitionCurrency: 'AUD',
  isFeatured: false,
  logoUrl: `${IMG_BASE}/university-logos/sydney.png`,
  coverImageUrl: `${IMG_BASE}/university-covers/sydney.jpg`,
  shortDescription: "Australia's first university, ranked in the global top 20, with a stunning sandstone campus in the heart of Sydney.",
  overview: `Australia's oldest university, founded in 1850, the University of Sydney is ranked in the global top 20 and home to over 70,000 students. Its iconic sandstone buildings, broad academic offering, and location in Australia's global city make it one of the most sought-after study destinations in the Asia-Pacific.`,
  programs: [
    { name: 'Master of Nursing', slug: 'master-of-nursing', degreeLevel: DegreeType.MASTER, field: 'Nursing & Healthcare', durationYears: 2, tuitionFeePerYear: 'AUD $50,000/year', description: "Clinically focused master's for registered nurses seeking specialist qualifications in Australia's growing healthcare sector." },
    { name: 'Master of Architecture', slug: 'master-of-architecture', degreeLevel: DegreeType.MASTER, field: 'Architecture', durationYears: 2, tuitionFeePerYear: 'AUD $48,000/year', description: 'AASA-accredited master\'s combining design studio, urban theory, and sustainability in one of the world\'s most architecturally rich cities.' },
    { name: 'Bachelor of Commerce', slug: 'bachelor-of-commerce', degreeLevel: DegreeType.BACHELOR, field: 'Business', durationYears: 3, tuitionFeePerYear: 'AUD $46,000/year', description: "Flexible business degree with majors in accounting, finance, marketing, and economics at Australia's #1 business school." },
    { name: 'Master of Marine Science', slug: 'master-of-marine-science', degreeLevel: DegreeType.MASTER, field: 'Marine Biology', durationYears: 2, tuitionFeePerYear: 'AUD $50,000/year', description: 'World-class marine biology research program with access to the Sydney Institute of Marine Science and Great Barrier Reef fieldwork.' },
  ],
  admissionSteps: [
    { stepNumber: 1, title: 'Review Requirements', description: 'Check academic prerequisites, English scores (IELTS 6.5+ overall), and any program-specific requirements.' },
    { stepNumber: 2, title: 'Apply Online', description: "Submit your application through the University of Sydney's online portal. Ensure all supporting documents are certified." },
    { stepNumber: 3, title: 'Accept Offer & Get CoE', description: 'Review your Letter of Offer, accept online, and pay your deposit. Your CoE will be emailed within 5 business days.' },
  ],
  scholarships: [
    { name: 'Sydney Scholars Award', type: ScholarshipType.MERIT_BASED, value: 'AUD $6,000 one-time award', description: 'Awarded to international students who demonstrate outstanding academic achievement. Applied directly to tuition fees.', learnMoreUrl: null },
  ],
}

// ─── STUB COUNTRIES (no universities yet) ────────────────────────────────────

const STUB_COUNTRIES = [
  { slug: 'thailand',      name: 'Thailand',                  region: Region.ASIA     },
  { slug: 'singapore',     name: 'Singapore',                 region: Region.ASIA     },
  { slug: 'malaysia',      name: 'Malaysia',                  region: Region.ASIA     },
  { slug: 'uae',           name: 'United Arab Emirates',      region: Region.ASIA     },
  { slug: 'grenada',       name: 'Grenada',                   region: Region.AMERICAS },
  { slug: 'vietnam',       name: 'Vietnam',                   region: Region.ASIA     },
  { slug: 'cambodia',      name: 'Cambodia',                  region: Region.ASIA     },
  { slug: 'china',         name: 'China',                     region: Region.ASIA     },
  { slug: 'canada',        name: 'Canada',                    region: Region.AMERICAS },
  { slug: 'spain',         name: 'Spain',                     region: Region.EUROPE   },
  { slug: 'germany',       name: 'Germany',                   region: Region.EUROPE   },
  { slug: 'ireland',       name: 'Ireland',                   region: Region.EUROPE   },
  { slug: 'netherlands',   name: 'Netherlands',               region: Region.EUROPE   },
  { slug: 'new-zealand',   name: 'New Zealand',               region: Region.OCEANIA  },
  { slug: 'switzerland',   name: 'Switzerland',               region: Region.EUROPE   },
  { slug: 'hungary',       name: 'Hungary',                   region: Region.EUROPE   },
]

// ─── SEED HELPERS ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedCountry(data: any): Promise<string> {
  const { advantages, processSteps, faqs, scholarships, ...countryFields } = data

  const country = await prisma.country.upsert({
    where: { slug: countryFields.slug },
    update: countryFields,
    create: countryFields,
    select: { id: true },
  })
  const id = country.id

  await prisma.countryAdvantage.deleteMany({ where: { countryId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.countryAdvantage.createMany({ data: advantages.map((a: any) => ({ ...a, countryId: id })) })

  await prisma.countryProcessStep.deleteMany({ where: { countryId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.countryProcessStep.createMany({ data: processSteps.map((s: any) => ({ ...s, countryId: id })) })

  await prisma.countryFAQ.deleteMany({ where: { countryId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.countryFAQ.createMany({ data: faqs.map((f: any) => ({ ...f, countryId: id })) })

  await prisma.scholarship.deleteMany({ where: { countryId: id } })
  if (scholarships.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.scholarship.createMany({ data: scholarships.map((s: any) => ({ ...s, countryId: id })) })
  }

  return id
}

async function seedCountryStub(data: { slug: string; name: string; region: Region }): Promise<void> {
  await prisma.country.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedUniversity(data: any, countryId: string): Promise<void> {
  const { programs, admissionSteps, scholarships, ...uniFields } = data

  const uni = await prisma.university.upsert({
    where: { slug: uniFields.slug },
    update: { ...uniFields, countryId },
    create: { ...uniFields, countryId },
    select: { id: true },
  })
  const id = uni.id

  await prisma.program.deleteMany({ where: { universityId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.program.createMany({ data: programs.map((p: any) => ({ ...p, universityId: id })) })

  await prisma.admissionStep.deleteMany({ where: { universityId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.admissionStep.createMany({ data: admissionSteps.map((s: any) => ({ ...s, universityId: id })) })

  await prisma.scholarship.deleteMany({ where: { universityId: id } })
  if (scholarships.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.scholarship.createMany({ data: scholarships.map((s: any) => ({ ...s, universityId: id })) })
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding database...')

  // United Kingdom
  const ukId = await seedCountry(UNITED_KINGDOM)
  await seedUniversity(OXFORD, ukId)
  await seedUniversity(CAMBRIDGE, ukId)
  await seedUniversity(IMPERIAL, ukId)
  console.log('  ✓ United Kingdom + 3 universities')

  // United States
  const usaId = await seedCountry(UNITED_STATES)
  await seedUniversity(HARVARD, usaId)
  await seedUniversity(MIT, usaId)
  await seedUniversity(STANFORD, usaId)
  console.log('  ✓ United States + 3 universities')

  // Australia
  const ausId = await seedCountry(AUSTRALIA)
  await seedUniversity(MELBOURNE, ausId)
  await seedUniversity(ANU, ausId)
  await seedUniversity(SYDNEY, ausId)
  console.log('  ✓ Australia + 3 universities')

  // Stub countries — no universities yet, appear in finder filter
  for (const c of STUB_COUNTRIES) await seedCountryStub(c)
  console.log(`  ✓ ${STUB_COUNTRIES.length} stub countries (filter-only)`)

  console.log('\n✅ Seeded 3 countries, 9 universities, 35 programs, 15 scholarships + 16 stub countries')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
