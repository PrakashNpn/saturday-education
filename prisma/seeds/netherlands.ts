import { DegreeType, Region, ScholarshipType } from '../../generated/client'

// ─── NETHERLANDS COUNTRY ─────────────────────────────────────────────────────

export const NETHERLANDS = {
  slug: 'netherlands',
  name: 'Netherlands',
  region: Region.EUROPE,
  tagline: "English-Taught Degrees in the Heart of Europe",
  shortDescription:
    "The Netherlands is one of the top non-English-speaking countries in the world for English-medium higher education, with over 2,200 English-taught programmes. Dutch universities combine European academic rigour with a practical, internationally diverse campus culture — and a post-study work search visa to help graduates launch their careers.",
  overview: `The Netherlands punches far above its weight in international higher education. With over 2,200 English-taught bachelor's and master's programmes and 115,000+ international students, it is one of Europe's most accessible study destinations for non-Dutch speakers. Dutch higher education is highly practical and application-oriented — particularly at Universities of Applied Sciences (HBO), which focus on industry-ready skills and mandatory internships. The Dutch education system is internationally accredited by NVAO (Dutch-Flemish Accreditation Organisation), ensuring all degrees meet European quality standards. Private institutions like Tio and Wittenborg specifically cater to international students, offering English-only campuses in Amsterdam, Utrecht, Rotterdam, and Apeldoorn. The Netherlands also offers the Orientation Year (zoekjaar) visa — a one-year post-graduation permit to search for work or start a business — making it an attractive destination for career-focused international students. Cost of living in Dutch cities is moderate by Western European standards, typically EUR 900–1,400/month for students.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '70+',
  tuitionFeeRange: 'EUR 6,000 – EUR 25,000/year',
  postStudyWorkVisa: 'Orientation Year (Zoekjaar) Visa — 1 year post-graduation to find work or start a business',
  internationalStudents: 115000,
  studentSatisfaction: 84,
  graduateEmployability: 83,
  visaProcessingTime: '3–8 weeks (IND processing)',
  workRights: '16 hrs/week during semester; full-time during summer (June–August)',
  costOfLivingMinUSD: 900 * 12,
  costOfLivingMaxUSD: 1400 * 12,
  currencyCode: 'EUR',
  academicSpecialties: [
    'Business & Management',
    'Hospitality & Tourism Management',
    'Finance & Economics',
    'International Business',
    'Education',
    'Technology & Engineering',
  ],
  isFeatured: true,
  advantages: [
    {
      title: '2,200+ English-Taught Programmes',
      description:
        "The Netherlands has more English-medium programmes than any non-English-speaking country in Europe. Students can study a full bachelor's or master's degree entirely in English without learning Dutch.",
      order: 1,
    },
    {
      title: '1-Year Post-Study Work Visa (Zoekjaar)',
      description:
        "The Orientation Year visa gives graduates 12 months after graduation to find work or launch a startup in the Netherlands — one of the most generous post-study work rights in Europe.",
      order: 2,
    },
    {
      title: 'Affordable Fees Compared to the UK',
      description:
        'Private Dutch college fees (EUR 6,000–25,000/year) are significantly lower than equivalent UK or US programmes. The Netherlands offers European-standard education at a fraction of Anglophone prices.',
      order: 3,
    },
    {
      title: 'Internationally Connected Business Hub',
      description:
        "Amsterdam and Rotterdam are among Europe's most important business cities, hosting headquarters of Shell, Heineken, ASML, ING, and hundreds of multinationals — providing exceptional internship and graduate employment opportunities.",
      order: 4,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Choose Your Programme and Institution',
      description:
        'Research English-taught programmes at Dutch universities and private colleges. NVAO accreditation guarantees quality — check the official register at nvao.net before applying.',
    },
    {
      stepNumber: 2,
      title: 'Apply and Receive Admission Letter',
      description:
        'Submit your application with academic transcripts, English test scores (IELTS/TOEFL), passport copy, and motivation letter. Most private colleges have rolling admissions.',
    },
    {
      stepNumber: 3,
      title: 'Apply for Dutch Student Visa / MVV',
      description:
        'Non-EU students need a Dutch entry visa (MVV) and residence permit (VVR). Your university will register you with the IND (Immigration and Naturalisation Service). Processing takes 3–8 weeks.',
    },
    {
      stepNumber: 4,
      title: 'Arrive and Register with Municipality',
      description:
        'After arriving, register with the local municipality (gemeente) within 5 days to get your BSN (citizen service number) — required for banking, healthcare, and tax purposes.',
    },
  ],
  faqs: [
    {
      question: 'Do I need to speak Dutch to study in the Netherlands?',
      answer:
        'No — the Netherlands has more English-taught programmes than any other non-English-speaking country in Europe. At private colleges like Tio and Wittenborg, all programmes are taught entirely in English. Dutch language skills are not required for admission or study.',
      order: 1,
    },
    {
      question: 'Can I work while studying in the Netherlands?',
      answer:
        'Yes — non-EU students with a valid residence permit can work 16 hours per week during the academic year and full-time during summer months (June–August). Your employer must hold a valid work permit for your employment.',
      order: 2,
    },
    {
      question: 'What is the Orientation Year (Zoekjaar) visa?',
      answer:
        "After graduating from a Dutch degree programme, non-EU students can apply for the Orientation Year (zoekjaar) residence permit, giving them 12 months to find a graduate-level job or start a business in the Netherlands. It's one of Europe's most generous post-study work rights.",
      order: 3,
    },
    {
      question: 'Are Dutch university degrees recognised internationally?',
      answer:
        'Yes — Dutch degrees are accredited by NVAO (Dutch-Flemish Accreditation Organisation) and fully recognised throughout Europe and internationally. Wittenborg additionally awards joint degrees with the University of Brighton (UK), providing a second internationally recognised credential.',
      order: 4,
    },
    {
      question: 'What is the cost of living in the Netherlands for students?',
      answer:
        'Students typically spend EUR 900–1,400 per month (USD 1,000–1,550), covering shared accommodation (EUR 400–700), food (EUR 200–300), transport (EUR 80–150), and personal expenses. Amsterdam is the most expensive city; Apeldoorn and smaller cities are significantly cheaper.',
      order: 5,
    },
  ],
}

export const TIO = {
  name: 'Tio Business School',
  slug: 'tio-business-school',
  city: 'Amsterdam / Utrecht / Rotterdam / Eindhoven / Groningen / Hengelo, Netherlands',
  foundedYear: 1969,
  ranking: null,
  totalStudents: 2000,
  internationalStudents: 0.15,
  acceptanceRate: 75,
  shortDescription:
    'Tio Business School is a Dutch NVAO-accredited private university of applied sciences offering English-taught bachelor and MBA programmes across six city campuses in the Netherlands. Known for small classes of ~10 students, an accelerated 3-year bachelor track, and over 15 consecutive years ranked #1 in the Dutch Higher Education Guide for hospitality and tourism, Tio is ideal for internationally ambitious students seeking a practice-first business education.',
  tuitionFeeMin: 23950,
  tuitionFeeMax: 24500,
  tuitionCurrency: 'EUR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'Bachelor of Business Administration – International Business Management',
      slug: 'bba-international-business-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'An internationally focused business programme combining finance, e-commerce, and cross-border trade, recognised as the best International Business programme in the Netherlands by the Higher Education Guide.',
    },
    {
      name: 'Bachelor of Business Administration – Business Management',
      slug: 'bba-business-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'A broad business management degree developing strategic, financial, and entrepreneurial competencies through project-based learning and mandatory international experience.',
    },
    {
      name: 'Bachelor of Business Administration – Business Management (Automotive)',
      slug: 'bba-business-management-automotive',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Business management principles applied specifically to the global automotive industry, covering supply chain, sales, marketing, and mobility innovation.',
    },
    {
      name: 'Bachelor of Business Administration – Business Management (Digital Business & Generative AI)',
      slug: 'bba-business-management-digital-business-generative-ai',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Technology',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Combines core business management with digital transformation and generative AI applications, preparing students to lead data-driven and AI-enabled business ventures.',
    },
    {
      name: 'Bachelor of Business Administration – Business Management (Entrepreneurship)',
      slug: 'bba-business-management-entrepreneurship',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Entrepreneurship',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Develops entrepreneurial mindset and startup skills alongside core business management disciplines, with emphasis on innovation, venture creation, and scaling.',
    },
    {
      name: 'Bachelor of Business Administration – Business Management (Fashion)',
      slug: 'bba-business-management-fashion',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Fashion & Retail',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Business management tailored to the fashion and lifestyle industry, covering brand strategy, retail operations, buying, and sustainable fashion business models.',
    },
    {
      name: 'Bachelor of Business Administration – Business Management (Interior & Design)',
      slug: 'bba-business-management-interior-design',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Design & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Bridges business management with interior and design industry practice, covering project management, supplier relations, and creative entrepreneurship.',
    },
    {
      name: 'Bachelor of Science – Commerce Economics and Entrepreneurship',
      slug: 'bsc-commerce-economics-entrepreneurship',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Finance & Economics',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'An economics-rooted degree covering e-commerce, digital marketing, sales, financial markets, and entrepreneurship for students aiming at commercial and analytical careers.',
    },
    {
      name: 'Bachelor of Science – Commerce Economics and Entrepreneurship (Digital Business & Generative AI)',
      slug: 'bsc-commerce-economics-digital-business-generative-ai',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Finance & Economics',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Fuses economics, e-commerce, and entrepreneurship with practical skills in digital business strategy and generative AI tools for modern business environments.',
    },
    {
      name: 'Bachelor of Science – Commerce Economics and Entrepreneurship (Experience Travel)',
      slug: 'bsc-commerce-economics-experience-travel',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Merges commercial economics with the experience and travel industry, preparing students to design, market, and sell unique travel and leisure experiences.',
    },
    {
      name: 'Bachelor of Science – Commerce Economics and Entrepreneurship (Influencer Marketing)',
      slug: 'bsc-commerce-economics-influencer-marketing',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Marketing & Communications',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Applies commercial economics to the influencer and creator economy, covering brand partnerships, social media analytics, content strategy, and digital entrepreneurship.',
    },
    {
      name: 'Bachelor of Arts – Hotel and Event Management',
      slug: 'ba-hotel-and-event-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Events',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Recognised as the best hotel school in the Netherlands for 11+ consecutive years, this programme trains students in luxury hospitality, hotel operations, and professional event management.',
    },
    {
      name: 'Bachelor of Arts – Hotel and Event Management (Entrepreneurship)',
      slug: 'ba-hotel-and-event-management-entrepreneurship',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Events',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Combines hotel and event management with an entrepreneurial specialisation, equipping graduates to launch and manage their own hospitality ventures.',
    },
    {
      name: 'Bachelor of Arts – Hotel and Event Management (Festival Management)',
      slug: 'ba-hotel-and-event-management-festival-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Events',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Specialises in planning and producing large-scale festivals and cultural events, covering production, logistics, sponsorship, crowd management, and sustainability.',
    },
    {
      name: 'Bachelor of Arts – Hotel and Event Management (Luxury Management)',
      slug: 'ba-hotel-and-event-management-luxury-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Luxury',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Focuses on managing luxury hospitality brands and exclusive events, covering high-end service design, luxury brand strategy, and international client relations.',
    },
    {
      name: 'Bachelor of Arts – International Tourism Management',
      slug: 'ba-international-tourism-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Ranked #1 tourism programme in the Netherlands for 13 consecutive years, this degree covers global tourism operations, e-commerce, destination management, and cross-cultural business.',
    },
    {
      name: 'Bachelor of Arts – International Tourism Management (Entrepreneurship)',
      slug: 'ba-international-tourism-management-entrepreneurship',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Merges tourism management with entrepreneurship skills, developing graduates who can launch travel startups, tour operators, or tourism-based social enterprises.',
    },
    {
      name: 'Bachelor of Arts – International Tourism Management (Experience Travel)',
      slug: 'ba-international-tourism-management-experience-travel',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Combines tourism management with experience design for the growing experiential travel market, covering adventure tourism, sustainable travel, and high-value experience packaging.',
    },
    {
      name: 'Bachelor of Arts – International Tourism Management (Luxury Management)',
      slug: 'ba-international-tourism-management-luxury-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'Applies luxury management principles to the tourism sector, preparing students for roles with high-end travel brands, boutique operators, and premium destination management organisations.',
    },
    {
      name: 'Associate Degree – International Business Management',
      slug: 'ad-international-business-management',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Business & Management',
      durationYears: 2,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'A 2-year higher professional degree covering international trade, finance, and entrepreneurship, providing a fast route to employment or progression to the 3-year bachelor programme.',
    },
    {
      name: 'Associate Degree – Commerce Economics and Entrepreneurship',
      slug: 'ad-commerce-economics-entrepreneurship',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Finance & Economics',
      durationYears: 2,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'A 2-year programme covering e-commerce, marketing, sales, and entrepreneurship fundamentals, designed for students seeking fast entry into commercial careers.',
    },
    {
      name: 'Associate Degree – Hotel and Event Management',
      slug: 'ad-hotel-and-event-management',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality & Events',
      durationYears: 2,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'A 2-year applied degree providing core competencies in hotel operations and event management, preparing graduates for direct entry into the hospitality industry.',
    },
    {
      name: 'Associate Degree – International Tourism Management',
      slug: 'ad-international-tourism-management',
      degreeLevel: DegreeType.DIPLOMA,
      field: 'Hospitality & Tourism',
      durationYears: 2,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'A 2-year professional degree covering tourism operations, global destinations, purchasing, and sales — ideal for students targeting travel industry roles quickly.',
    },
    {
      name: 'Foundation Programme (English Proficiency & Business Preparation)',
      slug: 'foundation-programme-english-business',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 0.5,
      tuitionFeePerYear: 'EUR 24,500/year',
      description:
        'A 6-month English language and business preparation course for students with IELTS 5.0+, enabling progression directly into the first semester of any Tio bachelor programme.',
    },
    {
      name: 'Master of Business Administration (MBA)',
      slug: 'mba',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 23,950/year',
      description:
        'An NVAO-accredited 1-year MBA covering strategic management, financial management, HR, and operations, designed for professionals seeking senior leadership positions in international organisations.',
    },
    {
      name: 'MBA – Commercial Management',
      slug: 'mba-commercial-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 23,950/year',
      description:
        'Specialisation within the Tio MBA focused on advanced commercial strategy, sales leadership, and marketing communications for senior commercial roles.',
    },
    {
      name: 'MBA – Data Strategy & Business Intelligence',
      slug: 'mba-data-strategy-business-intelligence',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 23,950/year',
      description:
        'Equips managers with skills to leverage data analytics, business intelligence tools, and data-driven decision-making at strategic leadership level.',
    },
    {
      name: 'MBA – Entrepreneurship',
      slug: 'mba-entrepreneurship',
      degreeLevel: DegreeType.MASTER,
      field: 'Entrepreneurship',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 23,950/year',
      description:
        'MBA specialisation covering sustainable entrepreneurship, innovation management, venture development, and international scale-up strategies.',
    },
    {
      name: 'MBA – Hospitality Management',
      slug: 'mba-hospitality-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Events',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 23,950/year',
      description:
        'Advanced MBA specialisation in sustainable hospitality operations, facility management strategy, and senior leadership in global hotel and event companies.',
    },
    {
      name: 'MBA – Global Leadership & Intercultural Management',
      slug: 'mba-global-leadership-intercultural-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 23,950/year',
      description:
        'Develops cross-cultural leadership capabilities for executives managing international teams, covering global strategy, intercultural communication, and organisational transformation.',
    },
    {
      name: 'MBA – Real Estate Management',
      slug: 'mba-real-estate-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Real Estate',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 23,950/year',
      description:
        'MBA specialisation in real estate project development, property investment, portfolio management, and real estate economics for aspiring real estate executives.',
    },
  ],
  scholarships: [
    {
      name: 'Tio Talent Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: '25% tuition fee reduction (one academic year, renewable)',
      description:
        'Awarded to international students with above-average academic results (GPA 3.0+, IELTS 6.5+) who demonstrate professional ambition; paid as a direct discount on tuition fees.',
    },
    {
      name: 'Tio Super Talent Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: '50% tuition fee reduction (one academic year, renewable)',
      description:
        'Awarded to exceptional international students with outstanding academic credentials (GPA 3.5+, IELTS 7.0+) and significant extracurricular achievements, covering half the annual tuition fee.',
    },
  ],
  admissionSteps: [],
}



export const WITTENBORG = {
  name: 'Wittenborg University of Applied Sciences',
  slug: 'wittenborg-university-of-applied-sciences',
  city: 'Apeldoorn (main campus) / Amsterdam, Netherlands',
  foundedYear: 1987,
  ranking: null,
  totalStudents: 1200,
  internationalStudents: 0.95,
  acceptanceRate: 65,
  shortDescription:
    'Wittenborg University of Applied Sciences is the most international business school in the Netherlands, with students from over 100 nationalities studying entirely in English across campuses in Apeldoorn and Amsterdam. NVAO and FIBAA double-accredited, Wittenborg offers bachelor\'s, master\'s, and MBA programmes in Business Administration, Hospitality Management, and emerging technology fields, with six intake dates per year and degrees jointly awarded with the University of Brighton (UK) for select programmes.',
  tuitionFeeMin: 11800,
  tuitionFeeMax: 23300,
  tuitionCurrency: 'EUR',
  isFeatured: false,
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      name: 'English & Business Preparation Programme (1 Year)',
      slug: 'english-business-preparation-programme-1-year',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 1,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'A 1-year foundation programme for students with IELTS 5.0+, combining intensive academic English with IBA foundation modules and awarding an IBA Foundation Year Certificate with guaranteed progression to the BBA.',
    },
    {
      name: 'English & Business Preparation Programme (6 Months)',
      slug: 'english-business-preparation-programme-6-months',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 0.5,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'A 6-month accelerated preparation course for students with IELTS 5.5+, developing academic English and business foundations before entering the BBA degree programme.',
    },
    {
      name: 'Bachelor of Business Administration – International Business Administration',
      slug: 'bba-international-business-administration',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'The flagship BBA pathway (CROHO 39239) covering core business disciplines including management, economics, HR, logistics, finance, and real estate with a strong international and entrepreneurial perspective.',
    },
    {
      name: 'Bachelor of Business Administration – International Business Administration (Facility & Property Management)',
      slug: 'bba-iba-facility-property-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA with a specialisation in managing commercial facilities and real estate assets, covering facilities management, workspace design, sustainability, and property operations.',
    },
    {
      name: 'Bachelor of Business Administration – International Business Administration (Human Resources Management)',
      slug: 'bba-iba-human-resources-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA focusing on talent acquisition, performance management, organisational development, and employment law for international HR careers.',
    },
    {
      name: 'Bachelor of Business Administration – International Business Administration (Economics & Management)',
      slug: 'bba-iba-economics-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Finance & Economics',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA pathway integrating microeconomics, macroeconomics, and management theory to develop analytical business leaders for economics-driven roles.',
    },
    {
      name: 'Bachelor of Business Administration – International Business Administration (Financial Services Management)',
      slug: 'bba-iba-financial-services-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Finance & Economics',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA specialising in financial services, banking products, investment management, and regulatory frameworks for careers in the financial sector.',
    },
    {
      name: 'Bachelor of Business Administration – International Business Administration (Logistics & International Trade)',
      slug: 'bba-iba-logistics-international-trade',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Management',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA pathway covering global supply chain management, trade compliance, procurement, and international logistics operations.',
    },
    {
      name: 'Bachelor of Business Administration – International Business Administration (Real Estate Management)',
      slug: 'bba-iba-real-estate-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Real Estate',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA specialising in real estate investment, property valuation, portfolio management, and sustainable property development.',
    },
    {
      name: 'Bachelor of Business Administration – Hospitality Business Administration (Tourism Management)',
      slug: 'bba-hba-tourism-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'HBA pathway preparing students for management careers in destination management, tour operations, and global travel industry with a strong business administration foundation.',
    },
    {
      name: 'Bachelor of Business Administration – Hospitality Business Administration (Sport Business Management)',
      slug: 'bba-hba-sport-business-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Sport & Business',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA focused on the business of sports — covering sports marketing, event management, club operations, sponsorship, and athlete brand management.',
    },
    {
      name: 'Bachelor of Business Administration – Hospitality Business Administration (Hospitality Management)',
      slug: 'bba-hba-hospitality-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'HBA specialisation in hotel, restaurant, and hospitality service management, combining operations management with luxury service design and sustainable hospitality practices.',
    },
    {
      name: 'Bachelor of Business Administration – Hospitality Business Administration (Event Management)',
      slug: 'bba-hba-event-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Events',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'BBA pathway developing professional event planners and managers skilled in corporate events, cultural productions, and large-scale international events.',
    },
    {
      name: 'Bachelor of Business Administration – Entrepreneurial Business Administration (Entrepreneurship & Digital Marketing)',
      slug: 'bba-eba-entrepreneurship-digital-marketing',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Entrepreneurship',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'EBA pathway combining venture creation with digital marketing strategy, equipping students to launch and grow digitally native businesses.',
    },
    {
      name: 'Bachelor of Business Administration – Entrepreneurial Business Administration (Entrepreneurship & FinTech)',
      slug: 'bba-eba-entrepreneurship-fintech',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Entrepreneurship',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'Explores financial technology, blockchain, digital payments, and startup finance, equipping entrepreneurs to disrupt and innovate in the financial services sector.',
    },
    {
      name: 'Bachelor of Business Administration – Entrepreneurial Business Administration (Entrepreneurship & Small Business)',
      slug: 'bba-eba-entrepreneurship-small-business',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Entrepreneurship',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'Focuses on starting, managing, and growing small and medium enterprises, covering business planning, operations, local market strategy, and SME finance.',
    },
    {
      name: 'Bachelor of Business Administration – Marketing Communication & Information (AI & Cyber Security)',
      slug: 'bba-mci-ai-cyber-security',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Technology',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'MCI pathway addressing the business implications of artificial intelligence and cyber security, preparing students for governance, risk, and technology management roles.',
    },
    {
      name: 'Bachelor of Business Administration – Marketing Communication & Information (Business Analytics)',
      slug: 'bba-mci-business-analytics',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Technology',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'Develops data analysis, business intelligence, and reporting skills for students targeting analytics-driven roles in marketing, operations, and management.',
    },
    {
      name: 'Bachelor of Business Administration – Marketing Communication & Information (Digital & Social Media)',
      slug: 'bba-mci-digital-social-media',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Marketing & Communications',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'Covers social media strategy, content creation, influencer marketing, community management, and digital communications for brands and agencies.',
    },
    {
      name: 'Bachelor of Business Administration – Marketing Communication & Information (Marketing & Communication)',
      slug: 'bba-mci-marketing-communication',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Marketing & Communications',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'Core MCI pathway covering integrated marketing communications, brand management, consumer behaviour, and strategic communication planning.',
    },
    {
      name: 'Bachelor of Business Administration – Marketing Communication & Information (Information Management)',
      slug: 'bba-mci-information-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Business & Technology',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'Focuses on managing organisational information systems, digital transformation, data governance, and technology-enabled business processes.',
    },
    {
      name: 'EuroBA – Bachelor of International Hospitality Management',
      slug: 'euroba-international-hospitality-management',
      degreeLevel: DegreeType.BACHELOR,
      field: 'Hospitality & Tourism',
      durationYears: 3,
      tuitionFeePerYear: 'EUR 11,800/year',
      description:
        'A unique tri-continental hospitality bachelor jointly awarded by Wittenborg and the University of Brighton (UK), with study years in the Netherlands, Germany (Freiburg), and the UK/France — awarding both Dutch and British degrees.',
    },
    {
      name: 'Master of Science – Business Management (Hospitality)',
      slug: 'msc-business-management-hospitality',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'NVAO-accredited MSc (CROHO 49149) developing advanced hospitality industry managers with skills in strategy, sustainability, revenue management, and leadership in international hotel groups.',
    },
    {
      name: 'Master of Science – Business Management (Tourism & Travel)',
      slug: 'msc-business-management-tourism-travel',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc equipping graduates for senior roles in destination management, tour operations, and international travel organisations with a focus on sustainable tourism strategy.',
    },
    {
      name: 'Master of Science – Business Management (Events Industry)',
      slug: 'msc-business-management-events-industry',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Events',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'Advanced MSc for event management professionals covering strategic event design, production management, stakeholder relations, and international events markets.',
    },
    {
      name: 'Master of Science – Business Management (Finance)',
      slug: 'msc-business-management-finance',
      degreeLevel: DegreeType.MASTER,
      field: 'Finance & Economics',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc in finance management covering corporate finance, investment strategy, financial risk, and international accounting standards for careers in banking and investment.',
    },
    {
      name: 'Master of Science – Business Management (Applied Artificial Intelligence)',
      slug: 'msc-business-management-applied-ai',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc addressing AI strategy and implementation in business contexts, covering machine learning applications, ethical AI, and data-driven decision-making for managers.',
    },
    {
      name: 'Master of Science – Business Management (Cyber Security in Business)',
      slug: 'msc-business-management-cyber-security',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc focusing on cyber security governance, risk management, compliance, and digital resilience strategies for business leaders and IT managers.',
    },
    {
      name: 'Master of Science – Business Management (Entrepreneurship & Innovation)',
      slug: 'msc-business-management-entrepreneurship-innovation',
      degreeLevel: DegreeType.MASTER,
      field: 'Entrepreneurship',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc for aspiring entrepreneurs and innovation managers, covering design thinking, business model innovation, venture financing, and scaling in international markets.',
    },
    {
      name: 'Master of Science – Business Management (Human Resources)',
      slug: 'msc-business-management-human-resources',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc in strategic HRM covering talent management, organisational development, diversity & inclusion, and international employment relations.',
    },
    {
      name: 'Master of Science – Business Management (Digital Marketing & Communication)',
      slug: 'msc-business-management-digital-marketing-communication',
      degreeLevel: DegreeType.MASTER,
      field: 'Marketing & Communications',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'Advanced MSc in digital marketing strategy, performance analytics, brand communication, and omnichannel customer experience management.',
    },
    {
      name: 'Master of Science – Business Management (Logistics & Trade)',
      slug: 'msc-business-management-logistics-trade',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc covering global supply chain strategy, trade policy, procurement optimisation, and sustainable logistics management for senior operations roles.',
    },
    {
      name: 'Master of Science – Business Management (Sport Business)',
      slug: 'msc-business-management-sport-business',
      degreeLevel: DegreeType.MASTER,
      field: 'Sport & Business',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc for sports industry professionals covering sports marketing, athlete commercialisation, event strategy, and managing sports organisations internationally.',
    },
    {
      name: 'Master of Science – Business Management (Accounting)',
      slug: 'msc-business-management-accounting',
      degreeLevel: DegreeType.MASTER,
      field: 'Finance & Economics',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc developing advanced accounting, auditing, and financial reporting skills aligned with international standards (IFRS) for senior finance professionals.',
    },
    {
      name: 'Master of Science – Business Management (Data Analytics)',
      slug: 'msc-business-management-data-analytics',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc in business data analytics covering statistical modelling, big data tools, predictive analytics, and data visualisation for evidence-based business management.',
    },
    {
      name: 'Master of Science – Business Management (Digital Transformation)',
      slug: 'msc-business-management-digital-transformation',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc preparing leaders to manage digital transformation projects, from technology adoption strategy to change management and organisational culture in the digital age.',
    },
    {
      name: 'Master of Science – Business Management (Clean Tech)',
      slug: 'msc-business-management-clean-tech',
      degreeLevel: DegreeType.MASTER,
      field: 'Sustainability & Environment',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc focusing on sustainable business strategy, clean technology innovation, circular economy, and environmental management for green economy careers.',
    },
    {
      name: 'Master of Science – Business Management (Health & Social Care)',
      slug: 'msc-business-management-health-social-care',
      degreeLevel: DegreeType.MASTER,
      field: 'Health Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc in healthcare and social care management, covering health systems governance, quality management, patient-centred care, and public health policy.',
    },
    {
      name: 'Master of Science – Business Management (Smart Industry)',
      slug: 'msc-business-management-smart-industry',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc at the intersection of manufacturing, Industry 4.0, IoT, automation, and smart production management for future industrial and operational leaders.',
    },
    {
      name: 'Master of Science – Business Management (Engineering)',
      slug: 'msc-business-management-engineering',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc bridging engineering and business management, developing technical professionals into strategic managers of engineering organisations and technology projects.',
    },
    {
      name: 'Master of Science – Business Management (Applied ICT)',
      slug: 'msc-business-management-applied-ict',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc in applied information and communications technology management, covering IT project management, ERP systems, digital infrastructure, and technology governance.',
    },
    {
      name: 'Master of Science – Business Management (Nursing)',
      slug: 'msc-business-management-nursing',
      degreeLevel: DegreeType.MASTER,
      field: 'Health Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 21,300 total',
      description:
        'MSc tailored for nursing professionals transitioning into healthcare management, covering healthcare leadership, quality assurance, and strategic health service management.',
    },
    {
      name: 'Master of Business Administration (MBA) – International Management',
      slug: 'mba-international-management',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'NVAO-accredited MBA (CROHO 70150) developing senior managers for global business roles, covering strategic leadership, international finance, organisational behaviour, and cross-cultural management.',
    },
    {
      name: 'Master of Business Administration (MBA) – Hospitality',
      slug: 'mba-hospitality',
      degreeLevel: DegreeType.MASTER,
      field: 'Hospitality & Tourism',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA specialisation for hospitality professionals with management experience, focusing on strategic leadership of hotel groups, resort companies, and hospitality enterprises.',
    },
    {
      name: 'Master of Business Administration (MBA) – Entrepreneurship & Innovation',
      slug: 'mba-entrepreneurship-innovation',
      degreeLevel: DegreeType.MASTER,
      field: 'Entrepreneurship',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA preparing experienced professionals to lead innovation initiatives, launch corporate ventures, and drive organisational transformation in competitive global markets.',
    },
    {
      name: 'Master of Business Administration (MBA) – Finance',
      slug: 'mba-finance',
      degreeLevel: DegreeType.MASTER,
      field: 'Finance & Economics',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA in financial management for professionals seeking senior finance leadership roles, covering corporate finance, mergers & acquisitions, investment strategy, and financial risk.',
    },
    {
      name: 'Master of Business Administration (MBA) – Applied Artificial Intelligence',
      slug: 'mba-applied-ai',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for experienced managers integrating AI strategy into organisational decision-making, covering machine learning governance, ethical AI, and AI-driven business transformation.',
    },
    {
      name: 'Master of Business Administration (MBA) – Cyber Security',
      slug: 'mba-cyber-security',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for security professionals moving into senior management, covering organisational cyber risk strategy, incident leadership, regulatory compliance, and digital resilience.',
    },
    {
      name: 'Master of Business Administration (MBA) – Data Analytics',
      slug: 'mba-data-analytics',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA equipping managers to lead data strategy initiatives, interpret business analytics, and build data-driven cultures within organisations.',
    },
    {
      name: 'Master of Business Administration (MBA) – Digital Transformation',
      slug: 'mba-digital-transformation',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA specialisation for managers driving enterprise digital transformation, covering change management, technology strategy, and building digitally agile organisations.',
    },
    {
      name: 'Master of Business Administration (MBA) – Health & Social Care',
      slug: 'mba-health-social-care',
      degreeLevel: DegreeType.MASTER,
      field: 'Health Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for healthcare and social services professionals with management experience, covering strategic health management, quality systems, and healthcare policy.',
    },
    {
      name: 'Master of Business Administration (MBA) – Clean Technology',
      slug: 'mba-clean-technology',
      degreeLevel: DegreeType.MASTER,
      field: 'Sustainability & Environment',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA in sustainability and clean energy management, covering green business strategy, renewable energy operations, ESG reporting, and sustainable supply chains.',
    },
    {
      name: 'Master of Business Administration (MBA) – Sports Business',
      slug: 'mba-sports-business',
      degreeLevel: DegreeType.MASTER,
      field: 'Sport & Business',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for sports industry professionals, covering the strategic management of professional clubs, federations, events, and sponsorship at senior executive level.',
    },
    {
      name: 'Master of Business Administration (MBA) – Engineering',
      slug: 'mba-engineering',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for engineering professionals transitioning to management, developing technical leaders with strategic, financial, and people management skills.',
    },
    {
      name: 'Master of Business Administration (MBA) – Smart Industry',
      slug: 'mba-smart-industry',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA addressing Industry 4.0 leadership — covering robotics, IoT strategy, smart manufacturing, and the management of digitally transformed industrial organisations.',
    },
    {
      name: 'Master of Business Administration (MBA) – Applied ICT',
      slug: 'mba-applied-ict',
      degreeLevel: DegreeType.MASTER,
      field: 'Business & Technology',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for ICT managers seeking executive leadership skills, covering IT strategy, enterprise architecture, digital project governance, and technology-driven business change.',
    },
    {
      name: 'Master of Business Administration (MBA) – Accounting',
      slug: 'mba-accounting',
      degreeLevel: DegreeType.MASTER,
      field: 'Finance & Economics',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for experienced finance and accounting professionals, covering advanced management accounting, financial leadership, and strategic financial decision-making.',
    },
    {
      name: 'Master of Business Administration (MBA) – Education',
      slug: 'mba-education',
      degreeLevel: DegreeType.MASTER,
      field: 'Education Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA for education professionals seeking senior management roles, covering strategic leadership of educational institutions, policy, curriculum management, and quality assurance.',
    },
    {
      name: 'Master of Business Administration (MBA) – Nursing',
      slug: 'mba-nursing',
      degreeLevel: DegreeType.MASTER,
      field: 'Health Management',
      durationYears: 1.5,
      tuitionFeePerYear: 'EUR 23,300 total',
      description:
        'MBA tailored for senior nurses moving into management, covering healthcare governance, budget management, workforce planning, and strategic healthcare leadership.',
    },
    {
      name: 'Pre-Master\'s Programme',
      slug: 'pre-masters-programme',
      degreeLevel: DegreeType.FOUNDATION,
      field: 'Business & Management',
      durationYears: 0.5,
      tuitionFeePerYear: 'EUR 4,000 total',
      description:
        'A 6-month bridging programme for bachelor\'s graduates lacking a business/research background, providing the academic preparation required for direct admission to Wittenborg\'s MSc programmes.',
    },
  ],
  scholarships: [
    {
      name: 'Holland (NL) Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'EUR 5,000 fee reduction (first year BBA, or total MSc programme)',
      description:
        'Ten annual scholarships of €5,000 for non-EU/EEA BBA and MSc applicants with a GPA of 7.5+ and IELTS 7.0 / TOEFL 100 — applied as a direct tuition fee reduction at point of admission.',
    },
    {
      name: 'Wittenborg MBA Scholarship',
      type: ScholarshipType.MERIT_BASED,
      value: 'EUR 5,000 fee reduction',
      description:
        'Ten merit-based scholarships available to outstanding MBA applicants across all specialisations, awarded as a tuition reduction at the admissions stage.',
    },
    {
      name: 'Tech Women Master Scholarship',
      type: ScholarshipType.PARTIAL,
      value: 'Partial tuition fee waiver (1.5-year MBA)',
      description:
        'Partial scholarship supporting women from technical educational backgrounds enrolling in any Wittenborg MBA programme, promoting gender diversity in technology-focused management education.',
    },
    {
      name: 'Wittenborg Americas Scholarship',
      type: ScholarshipType.PARTIAL,
      value: 'Partial tuition reduction',
      description:
        'Regional scholarship for students from North and South America applying to undergraduate or postgraduate programmes at Wittenborg, supporting geographic diversity in the student body.',
    },
    {
      name: 'Holland Friendship Scholarship for Türkiye',
      type: ScholarshipType.PARTIAL,
      value: 'Partial tuition fee reduction (BBA level)',
      description:
        'Dedicated scholarship for Turkish nationals applying to the BBA programme, fostering Netherlands–Türkiye academic relations and supporting access to quality business education.',
    },
  ],
  admissionSteps: [],
}
export const NETHERLANDS_UNIVERSITIES: any[] = [
  TIO,
  WITTENBORG,
]
