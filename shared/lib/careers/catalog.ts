// ── Career catalog (single source of truth) ──────────────────────────────────
// Frozen, AI-authored-once + human-reviewed dataset of careers. Each entry's
// job-market outlook and skills are grounded in public labour-market sources
// (US BLS 2023–2033 employment projections, O*NET skills, WEF Future of Jobs)
// at authoring time and presented as INDICATIVE — never as a live prediction.
//
// Lives in shared/ (pure data, zero feature deps) so both the career-assessment
// feature and a future public Career Library can read it. It deliberately does
// NOT import the feature's RiasecCategory type (shared must not import features);
// HollandCode mirrors the same letters and is structurally compatible.

export type HollandCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

export type CareerField =
  | 'Computer Science & IT'
  | 'Engineering'
  | 'Business & Management'
  | 'Finance & Economics'
  | 'Medicine & Health'
  | 'Natural Sciences'
  | 'Social Sciences & Psychology'
  | 'Arts, Design & Media'
  | 'Law'
  | 'Education'
  | 'Humanities & Languages'
  | 'Hospitality & Tourism'
  | 'Sports, Fitness & Recreation'

export type Demand = 'High' | 'Moderate' | 'Competitive'

export interface CareerOutlook {
  /** Qualitative hiring demand. */
  demand: Demand
  /** Short growth label, e.g. "Fast-growing", "Growing", "Stable". */
  growthLabel: string
  /** ~6 indicative points (0–100) describing the demand trajectory over ~10 years.
   *  A relative SHAPE for the sparkline, not a precise forecast. */
  trend: number[]
  /** One-line note on where/why demand sits. */
  marketNote: string
  /** Public sources that informed this entry (shown for credibility). */
  sources: string[]
}

export interface Career {
  slug: string
  title: string
  field: CareerField
  summary: string
  exampleRoles: string[]
  requiredSkills: string[]
  niceToHaveSkills: string[]
  outlook: CareerOutlook
  /** Holland types this career suits (used for matching). */
  riasec: HollandCode[]
  relatedFields: string[]
}

export const CAREERS: Career[] = [
  // ── Computer Science & IT ──────────────────────────────────────────────────
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    field: 'Computer Science & IT',
    summary:
      'Designs, builds, and maintains the software and systems that power apps, websites, and services.',
    exampleRoles: ['Software Developer', 'Backend Engineer', 'Full-Stack Developer', 'Mobile Developer'],
    requiredSkills: ['Programming', 'Problem solving', 'Data structures & algorithms', 'Version control (Git)', 'Testing & debugging'],
    niceToHaveSkills: ['Cloud platforms', 'System design', 'CI/CD', 'AI/ML basics'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 68, 71, 76, 79, 81],
      marketNote: 'Strong, broad demand across nearly every industry as software keeps expanding.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'R', 'C'],
    relatedFields: ['Computer Science & IT', 'Engineering'],
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    field: 'Computer Science & IT',
    summary:
      'Turns raw data into insight and predictions using statistics, programming, and machine learning.',
    exampleRoles: ['Data Analyst', 'Machine Learning Engineer', 'Business Intelligence Analyst', 'Research Scientist'],
    requiredSkills: ['Statistics', 'Programming (Python/R)', 'Data analysis', 'Machine learning', 'Data visualisation'],
    niceToHaveSkills: ['SQL & databases', 'Big-data tools', 'Cloud platforms', 'Communication & storytelling'],
    outlook: {
      demand: 'High',
      growthLabel: 'Fast-growing',
      trend: [66, 68, 74, 80, 86, 88],
      marketNote: 'One of the fastest-growing fields as organisations invest in data and AI.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'C'],
    relatedFields: ['Computer Science & IT', 'Natural Sciences', 'Finance & Economics'],
  },
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    field: 'Computer Science & IT',
    summary:
      'Protects systems, networks, and data from cyber threats by monitoring, testing, and responding to attacks.',
    exampleRoles: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'SOC Analyst'],
    requiredSkills: ['Networking', 'Security fundamentals', 'Threat analysis', 'Problem solving', 'Attention to detail'],
    niceToHaveSkills: ['Scripting', 'Cloud security', 'Incident response', 'Security certifications'],
    outlook: {
      demand: 'High',
      growthLabel: 'Fast-growing',
      trend: [66, 68, 73, 79, 84, 86],
      marketNote: 'Acute global skills shortage; demand far outpaces the supply of qualified people.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'R', 'C'],
    relatedFields: ['Computer Science & IT', 'Engineering'],
  },

  {
    slug: 'ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    field: 'Computer Science & IT',
    summary:
      'Builds and deploys the machine-learning and AI systems behind modern products — from models and data pipelines to production apps.',
    exampleRoles: ['Machine Learning Engineer', 'AI Engineer', 'MLOps Engineer', 'Applied Scientist'],
    requiredSkills: ['Programming (Python)', 'Machine learning', 'Mathematics & statistics', 'Data handling', 'Problem solving'],
    niceToHaveSkills: ['Deep-learning frameworks', 'LLMs & generative AI', 'Cloud & MLOps', 'Distributed systems'],
    outlook: {
      demand: 'High',
      growthLabel: 'Fast-growing',
      trend: [66, 68, 73, 79, 84, 86],
      marketNote: 'One of the defining roles of the AI era; demand far outstrips the supply of skilled engineers.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'R', 'C'],
    relatedFields: ['Computer Science & IT', 'Natural Sciences', 'Engineering'],
  },
  {
    slug: 'cloud-devops-engineer',
    title: 'Cloud / DevOps Engineer',
    field: 'Computer Science & IT',
    summary:
      'Builds and runs the cloud infrastructure and automation that lets software ship reliably and at scale.',
    exampleRoles: ['DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
    requiredSkills: ['Cloud platforms (AWS/Azure/GCP)', 'Linux & networking', 'Scripting & automation', 'CI/CD', 'Problem solving'],
    niceToHaveSkills: ['Containers (Docker/Kubernetes)', 'Infrastructure as code', 'Monitoring & observability', 'Security'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 68, 71, 76, 79, 81],
      marketNote: 'Cloud migration and AI workloads keep demand high; automation skills are now essential, not optional.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['R', 'I', 'C'],
    relatedFields: ['Computer Science & IT', 'Engineering'],
  },

  // ── Engineering ────────────────────────────────────────────────────────────
  {
    slug: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    field: 'Engineering',
    summary: 'Designs, tests, and improves machines, engines, and mechanical systems across many industries.',
    exampleRoles: ['Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer', 'HVAC Engineer'],
    requiredSkills: ['Mathematics', 'Physics', 'CAD design', 'Problem solving', 'Mechanics & materials'],
    niceToHaveSkills: ['Simulation (FEA/CFD)', 'Project management', 'Programming', 'Robotics'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 62, 63, 64],
      marketNote: 'Steady demand in manufacturing, energy, automotive, and emerging green tech.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['R', 'I'],
    relatedFields: ['Engineering', 'Natural Sciences'],
  },
  {
    slug: 'civil-engineer',
    title: 'Civil Engineer',
    field: 'Engineering',
    summary: 'Plans, designs, and oversees construction of infrastructure such as roads, bridges, and buildings.',
    exampleRoles: ['Structural Engineer', 'Site Engineer', 'Transportation Engineer', 'Geotechnical Engineer'],
    requiredSkills: ['Mathematics', 'Structural analysis', 'CAD design', 'Project planning', 'Problem solving'],
    niceToHaveSkills: ['BIM software', 'Sustainability design', 'Construction management', 'Surveying'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 62, 63, 64],
      marketNote: 'Stable demand tied to infrastructure investment and urban development.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['R', 'I', 'C'],
    relatedFields: ['Engineering'],
  },
  {
    slug: 'electrical-electronics-engineer',
    title: 'Electrical & Electronics Engineer',
    field: 'Engineering',
    summary: 'Designs and develops electrical systems, electronics, and devices from microchips to power grids.',
    exampleRoles: ['Electronics Engineer', 'Power Systems Engineer', 'Embedded Systems Engineer', 'Control Engineer'],
    requiredSkills: ['Mathematics', 'Physics', 'Circuit design', 'Problem solving', 'Technical analysis'],
    niceToHaveSkills: ['Embedded programming', 'Signal processing', 'Renewable energy systems', 'Robotics'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 63, 64, 65],
      marketNote: 'Rising demand from electronics, renewable energy, and automation.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['R', 'I'],
    relatedFields: ['Engineering', 'Computer Science & IT'],
  },

  {
    slug: 'biomedical-engineer',
    title: 'Biomedical Engineer',
    field: 'Engineering',
    summary: 'Combines engineering with biology and medicine to design medical devices, implants, and health technology.',
    exampleRoles: ['Medical Device Engineer', 'Clinical Engineer', 'Biomechanics Engineer', 'Bioinstrumentation Engineer'],
    requiredSkills: ['Mathematics', 'Biology & physiology', 'Engineering design', 'Problem solving', 'Lab/technical skills'],
    niceToHaveSkills: ['CAD & prototyping', 'Programming', 'Regulatory knowledge', 'Data analysis'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 61, 63, 65, 66],
      marketNote: 'Ageing populations and health-tech innovation drive steady growth in devices, implants, and diagnostics.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'R'],
    relatedFields: ['Engineering', 'Medicine & Health'],
  },

  // ── Business & Management ──────────────────────────────────────────────────
  {
    slug: 'management-consultant',
    title: 'Management Consultant',
    field: 'Business & Management',
    summary: 'Helps organisations solve problems and improve performance through analysis and strategy.',
    exampleRoles: ['Strategy Consultant', 'Business Analyst', 'Operations Consultant', 'Management Analyst'],
    requiredSkills: ['Analytical thinking', 'Communication', 'Problem solving', 'Business acumen', 'Presentation skills'],
    niceToHaveSkills: ['Data analysis', 'Project management', 'Financial modelling', 'Change management'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 63, 64, 65],
      marketNote: 'Healthy growth as firms seek efficiency, digital, and transformation advice.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['E', 'I', 'C'],
    relatedFields: ['Business & Management', 'Finance & Economics'],
  },
  {
    slug: 'marketing-manager',
    title: 'Marketing Manager',
    field: 'Business & Management',
    summary: 'Plans and leads campaigns and brand strategy to grow awareness, demand, and customer loyalty.',
    exampleRoles: ['Digital Marketing Manager', 'Brand Manager', 'Content Strategist', 'Growth Marketer'],
    requiredSkills: ['Communication', 'Creativity', 'Market research', 'Strategic thinking', 'Project management'],
    niceToHaveSkills: ['Data analytics', 'SEO/SEM', 'Social media tools', 'Copywriting'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 62, 63, 64],
      marketNote: 'Steady demand, shifting strongly toward digital and data-driven marketing.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['E', 'A', 'C'],
    relatedFields: ['Business & Management', 'Arts, Design & Media'],
  },
  {
    slug: 'product-manager',
    title: 'Product Manager',
    field: 'Business & Management',
    summary: 'Owns the vision and roadmap for a product, coordinating design, engineering, and business goals.',
    exampleRoles: ['Associate Product Manager', 'Technical Product Manager', 'Product Owner', 'Growth PM'],
    requiredSkills: ['Communication', 'Strategic thinking', 'Problem solving', 'Prioritisation', 'User empathy'],
    niceToHaveSkills: ['Data analysis', 'Basic technical literacy', 'UX understanding', 'Agile methods'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 67, 70, 73, 76, 77],
      marketNote: 'Strong demand in tech and digital businesses; competitive entry.',
      sources: ['O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['E', 'I', 'A'],
    relatedFields: ['Business & Management', 'Computer Science & IT'],
  },

  {
    slug: 'operations-supply-chain-manager',
    title: 'Operations & Supply-Chain Manager',
    field: 'Business & Management',
    summary: 'Plans and coordinates how an organisation produces and delivers goods and services — efficiently and on time.',
    exampleRoles: ['Operations Manager', 'Supply Chain Manager', 'Logistics Manager', 'Procurement Manager'],
    requiredSkills: ['Planning & organisation', 'Analytical thinking', 'Communication', 'Problem solving', 'Process improvement'],
    niceToHaveSkills: ['Data analytics', 'ERP systems', 'Lean / Six Sigma', 'Negotiation'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 62, 63, 64],
      marketNote: 'Supply-chain resilience and automation keep demand solid; data and analytics skills are increasingly expected.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['E', 'C', 'R'],
    relatedFields: ['Business & Management', 'Engineering'],
  },

  // ── Finance & Economics ────────────────────────────────────────────────────
  {
    slug: 'financial-analyst',
    title: 'Financial Analyst',
    field: 'Finance & Economics',
    summary: 'Analyses financial data to guide investment, budgeting, and business decisions.',
    exampleRoles: ['Investment Analyst', 'Corporate Finance Analyst', 'Risk Analyst', 'Equity Research Analyst'],
    requiredSkills: ['Numerical reasoning', 'Financial modelling', 'Analytical thinking', 'Attention to detail', 'Excel'],
    niceToHaveSkills: ['SQL/data tools', 'Programming (Python)', 'Accounting knowledge', 'Communication'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 62, 63, 64],
      marketNote: 'Reliable demand across banking, corporates, and asset management.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['C', 'I', 'E'],
    relatedFields: ['Finance & Economics', 'Business & Management'],
  },
  {
    slug: 'accountant',
    title: 'Accountant',
    field: 'Finance & Economics',
    summary: 'Prepares, examines, and advises on financial records, taxes, and compliance for organisations.',
    exampleRoles: ['Auditor', 'Tax Accountant', 'Management Accountant', 'Financial Controller'],
    requiredSkills: ['Numerical accuracy', 'Attention to detail', 'Financial reporting', 'Organisation', 'Integrity'],
    niceToHaveSkills: ['Accounting software', 'Data analysis', 'Professional certification (ACCA/CPA)', 'Tax knowledge'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Slow growth',
      trend: [58, 58, 59, 59, 60, 60],
      marketNote: 'AI is automating routine bookkeeping and compliance; demand is shifting toward advisory, audit judgement, and analysis.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['C', 'E'],
    relatedFields: ['Finance & Economics', 'Business & Management'],
  },
  {
    slug: 'economist',
    title: 'Economist',
    field: 'Finance & Economics',
    summary: 'Studies how economies work, analysing data and trends to inform policy and business strategy.',
    exampleRoles: ['Research Economist', 'Policy Analyst', 'Data Economist', 'Market Analyst'],
    requiredSkills: ['Mathematics', 'Statistics', 'Analytical thinking', 'Research', 'Writing'],
    niceToHaveSkills: ['Programming (R/Python)', 'Econometrics', 'Data visualisation', 'Communication'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Growing',
      trend: [50, 50, 51, 53, 54, 54],
      marketNote: 'A small, competitive field; AI and big data raise the premium on strong econometrics and coding skills.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'C'],
    relatedFields: ['Finance & Economics', 'Social Sciences & Psychology'],
  },

  {
    slug: 'investment-banker',
    title: 'Investment Banker',
    field: 'Finance & Economics',
    summary: 'Advises companies and investors on raising capital, mergers, and acquisitions, and executes major financial deals.',
    exampleRoles: ['Analyst', 'Associate', 'M&A Advisor', 'Capital Markets Banker'],
    requiredSkills: ['Financial modelling', 'Valuation', 'Numerical reasoning', 'Communication', 'Resilience & stamina'],
    niceToHaveSkills: ['Accounting', 'Excel & presentation mastery', 'Industry knowledge', 'Networking'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Stable',
      trend: [50, 50, 51, 52, 53, 53],
      marketNote: 'Prestigious and well-paid but highly competitive and cyclical; AI is automating much of the junior analytical grind.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['E', 'C', 'I'],
    relatedFields: ['Finance & Economics', 'Business & Management'],
  },

  // ── Medicine & Health ──────────────────────────────────────────────────────
  {
    slug: 'physician',
    title: 'Doctor / Physician',
    field: 'Medicine & Health',
    summary: 'Diagnoses and treats illness and injury, caring for patients across general or specialist medicine.',
    exampleRoles: ['General Practitioner', 'Hospital Doctor', 'Surgeon', 'Specialist Physician'],
    requiredSkills: ['Scientific knowledge', 'Diagnostic reasoning', 'Empathy', 'Communication', 'Resilience'],
    niceToHaveSkills: ['Research skills', 'Leadership', 'Languages', 'Health technology'],
    outlook: {
      demand: 'High',
      growthLabel: 'Stable',
      trend: [66, 66, 67, 69, 70, 70],
      marketNote: 'Persistent global shortage driven by ageing populations and access gaps.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'S'],
    relatedFields: ['Medicine & Health', 'Natural Sciences'],
  },
  {
    slug: 'registered-nurse',
    title: 'Registered Nurse',
    field: 'Medicine & Health',
    summary: 'Provides and coordinates patient care, supporting doctors and advocating for patients’ wellbeing.',
    exampleRoles: ['Hospital Nurse', 'Community Nurse', 'Paediatric Nurse', 'Nurse Practitioner'],
    requiredSkills: ['Patient care', 'Empathy', 'Clinical skills', 'Communication', 'Attention to detail'],
    niceToHaveSkills: ['Specialist certifications', 'Leadership', 'Languages', 'Health informatics'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 67, 68, 69, 70, 71],
      marketNote: 'Very high demand and large numbers of openings worldwide.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['S', 'I'],
    relatedFields: ['Medicine & Health'],
  },
  {
    slug: 'pharmacist',
    title: 'Pharmacist',
    field: 'Medicine & Health',
    summary: 'Dispenses medication and advises patients and clinicians on safe, effective drug use.',
    exampleRoles: ['Community Pharmacist', 'Hospital Pharmacist', 'Clinical Pharmacist', 'Industrial Pharmacist'],
    requiredSkills: ['Scientific knowledge', 'Attention to detail', 'Patient communication', 'Pharmacology', 'Accuracy'],
    niceToHaveSkills: ['Clinical research', 'Health management', 'Data systems', 'Languages'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Stable',
      trend: [58, 58, 59, 60, 61, 61],
      marketNote: 'Stable demand; growth in clinical and specialist pharmacy roles.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'C', 'S'],
    relatedFields: ['Medicine & Health', 'Natural Sciences'],
  },

  {
    slug: 'physiotherapist',
    title: 'Physiotherapist',
    field: 'Medicine & Health',
    summary: 'Helps people restore movement and manage pain after injury, illness, or surgery through physical therapy.',
    exampleRoles: ['Physiotherapist', 'Sports Physiotherapist', 'Rehabilitation Therapist', 'Musculoskeletal Physio'],
    requiredSkills: ['Anatomy & physiology', 'Patient care', 'Manual therapy', 'Communication', 'Empathy'],
    niceToHaveSkills: ['Sports science', 'Specialist certifications', 'Rehabilitation technology', 'Languages'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 67, 70, 72, 75, 76],
      marketNote: 'Ageing populations, chronic conditions, and active lifestyles drive strong, hands-on demand that resists automation.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['S', 'R', 'I'],
    relatedFields: ['Medicine & Health'],
  },

  // ── Natural Sciences ───────────────────────────────────────────────────────
  {
    slug: 'biotechnologist',
    title: 'Biotechnologist',
    field: 'Natural Sciences',
    summary: 'Applies biology and technology to develop products in medicine, agriculture, and the environment.',
    exampleRoles: ['Research Scientist', 'Lab Scientist', 'Bioprocess Scientist', 'Genetics Researcher'],
    requiredSkills: ['Biology', 'Chemistry', 'Lab techniques', 'Analytical thinking', 'Research methods'],
    niceToHaveSkills: ['Data analysis', 'Programming', 'Regulatory knowledge', 'Scientific writing'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 61, 62, 63],
      marketNote: 'Expanding with advances in healthcare, genomics, and sustainability.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'R'],
    relatedFields: ['Natural Sciences', 'Medicine & Health'],
  },
  {
    slug: 'environmental-scientist',
    title: 'Environmental Scientist',
    field: 'Natural Sciences',
    summary: 'Studies the environment to protect it and human health, advising on sustainability and policy.',
    exampleRoles: ['Environmental Consultant', 'Sustainability Analyst', 'Conservation Scientist', 'Climate Researcher'],
    requiredSkills: ['Scientific method', 'Data analysis', 'Fieldwork', 'Report writing', 'Problem solving'],
    niceToHaveSkills: ['GIS mapping', 'Programming', 'Policy knowledge', 'Communication'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 61, 62, 63],
      marketNote: 'Rising demand driven by climate, sustainability, and ESG priorities.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'R', 'S'],
    relatedFields: ['Natural Sciences', 'Engineering'],
  },

  {
    slug: 'research-scientist',
    title: 'Research Scientist',
    field: 'Natural Sciences',
    summary: 'Designs and runs experiments to advance knowledge in fields like biology, physics, chemistry, or AI.',
    exampleRoles: ['Research Associate', 'Postdoctoral Researcher', 'Lab Scientist', 'R&D Scientist'],
    requiredSkills: ['Scientific method', 'Analytical thinking', 'Lab/research techniques', 'Data analysis', 'Scientific writing'],
    niceToHaveSkills: ['Programming', 'Statistics', 'Grant writing', 'Collaboration'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 51, 52, 53, 53],
      marketNote: 'Intellectually rewarding, but academic posts are scarce and competitive; industry R&D and data skills broaden the options.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'R'],
    relatedFields: ['Natural Sciences', 'Medicine & Health'],
  },

  // ── Social Sciences & Psychology ───────────────────────────────────────────
  {
    slug: 'psychologist',
    title: 'Psychologist',
    field: 'Social Sciences & Psychology',
    summary: 'Studies behaviour and the mind to help people improve wellbeing and overcome challenges.',
    exampleRoles: ['Clinical Psychologist', 'Counselling Psychologist', 'Organisational Psychologist', 'Researcher'],
    requiredSkills: ['Empathy', 'Active listening', 'Research methods', 'Analytical thinking', 'Communication'],
    niceToHaveSkills: ['Statistics', 'Specialist therapy training', 'Languages', 'Report writing'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 61, 62, 63],
      marketNote: 'Growing demand as awareness of mental health rises globally.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'S', 'A'],
    relatedFields: ['Social Sciences & Psychology', 'Medicine & Health'],
  },
  {
    slug: 'social-worker',
    title: 'Social Worker',
    field: 'Social Sciences & Psychology',
    summary: 'Supports individuals, families, and communities to cope with challenges and access help.',
    exampleRoles: ['Family Social Worker', 'Child Protection Officer', 'Community Worker', 'Case Manager'],
    requiredSkills: ['Empathy', 'Communication', 'Problem solving', 'Resilience', 'Organisation'],
    niceToHaveSkills: ['Languages', 'Crisis management', 'Policy knowledge', 'Counselling skills'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 61, 62, 63],
      marketNote: 'Steady demand in health, social care, and community services.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['S', 'E'],
    relatedFields: ['Social Sciences & Psychology', 'Education'],
  },

  {
    slug: 'counsellor-therapist',
    title: 'Counsellor / Therapist',
    field: 'Social Sciences & Psychology',
    summary: 'Supports people through mental-health and life challenges using talking therapies and emotional guidance.',
    exampleRoles: ['Counsellor', 'Psychotherapist', 'Mental Health Counsellor', 'Family Therapist'],
    requiredSkills: ['Active listening', 'Empathy', 'Communication', 'Emotional resilience', 'Ethics & boundaries'],
    niceToHaveSkills: ['Specialist therapy training', 'Languages', 'Group facilitation', 'Case management'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 67, 70, 74, 77, 78],
      marketNote: 'Rising mental-health awareness and access drive strong demand; a deeply human role AI cannot replace.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['S', 'A', 'I'],
    relatedFields: ['Social Sciences & Psychology', 'Medicine & Health'],
  },

  // ── Arts, Design & Media ───────────────────────────────────────────────────
  {
    slug: 'ux-ui-designer',
    title: 'UX / UI Designer',
    field: 'Arts, Design & Media',
    summary: 'Designs how digital products look and feel so they are useful, usable, and enjoyable.',
    exampleRoles: ['Product Designer', 'UX Researcher', 'Interaction Designer', 'UI Designer'],
    requiredSkills: ['Design thinking', 'User research', 'Wireframing & prototyping', 'Visual design', 'Empathy'],
    niceToHaveSkills: ['Design tools (Figma)', 'Basic front-end', 'Data-informed design', 'Motion design'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 63, 64, 65],
      marketNote: 'Solid demand as every product invests in user experience.',
      sources: ['O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['A', 'I', 'E'],
    relatedFields: ['Arts, Design & Media', 'Computer Science & IT'],
  },
  {
    slug: 'architect',
    title: 'Architect',
    field: 'Arts, Design & Media',
    summary: 'Designs buildings and spaces that balance function, safety, sustainability, and beauty.',
    exampleRoles: ['Project Architect', 'Urban Designer', 'Landscape Architect', 'Interior Architect'],
    requiredSkills: ['Design & creativity', 'Spatial reasoning', 'Technical drawing (CAD)', 'Problem solving', 'Attention to detail'],
    niceToHaveSkills: ['BIM software', '3D modelling', 'Sustainable design', 'Project management'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 51, 51, 52, 52],
      marketNote: 'Cyclical, construction-linked demand; AI and generative-design tools are automating drafting, shifting value to design vision, sustainability, and BIM.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['A', 'R', 'I'],
    relatedFields: ['Arts, Design & Media', 'Engineering'],
  },

  {
    slug: 'graphic-designer',
    title: 'Graphic Designer',
    field: 'Arts, Design & Media',
    summary: 'Creates visual content — logos, layouts, and branding — to communicate ideas across print and digital media.',
    exampleRoles: ['Graphic Designer', 'Brand Designer', 'Visual Designer', 'Motion Designer'],
    requiredSkills: ['Visual design', 'Creativity', 'Typography', 'Design tools', 'Attention to detail'],
    niceToHaveSkills: ['Motion & video', 'Branding strategy', 'Basic UX', 'Generative-AI tools'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 49, 49, 48, 48],
      marketNote: 'A crowded field where generative AI now produces routine visuals; demand holds for strong concept, brand, and art direction.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['A', 'R'],
    relatedFields: ['Arts, Design & Media', 'Computer Science & IT'],
  },
  {
    slug: 'journalist',
    title: 'Journalist',
    field: 'Arts, Design & Media',
    summary: 'Researches, reports, and writes news and stories for print, broadcast, or digital media.',
    exampleRoles: ['Reporter', 'News Writer', 'Editor', 'Correspondent'],
    requiredSkills: ['Writing', 'Research & investigation', 'Communication', 'Curiosity', 'Ethics & accuracy'],
    niceToHaveSkills: ['Digital & social media', 'Photography / video', 'Data journalism', 'Languages'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Declining',
      trend: [50, 49, 48, 47, 46, 45],
      marketNote: 'Traditional newsrooms keep shrinking and AI now drafts routine copy; opportunity is shifting to digital, niche, and multimedia journalism.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['A', 'I', 'E'],
    relatedFields: ['Arts, Design & Media', 'Humanities & Languages'],
  },

  // ── Law ────────────────────────────────────────────────────────────────────
  {
    slug: 'lawyer',
    title: 'Lawyer',
    field: 'Law',
    summary: 'Advises and represents clients on legal rights, disputes, contracts, and compliance.',
    exampleRoles: ['Solicitor', 'Corporate Lawyer', 'Litigation Associate', 'Legal Counsel'],
    requiredSkills: ['Verbal reasoning', 'Analytical thinking', 'Research', 'Writing', 'Attention to detail'],
    niceToHaveSkills: ['Negotiation', 'Languages', 'Commercial awareness', 'Public speaking'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 51, 52, 53, 53],
      marketNote: 'An oversupplied entry market where AI now handles much routine research, review, and drafting; demand holds for specialists, litigators, and complex advisory.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['E', 'I'],
    relatedFields: ['Law', 'Social Sciences & Psychology'],
  },

  {
    slug: 'corporate-lawyer',
    title: 'Corporate / Commercial Lawyer',
    field: 'Law',
    summary: 'Advises businesses on contracts, deals, mergers, and compliance to keep them legally protected.',
    exampleRoles: ['Corporate Counsel', 'M&A Lawyer', 'Commercial Solicitor', 'Compliance Lawyer'],
    requiredSkills: ['Legal analysis', 'Drafting', 'Negotiation', 'Attention to detail', 'Commercial awareness'],
    niceToHaveSkills: ['Languages', 'Finance knowledge', 'Cross-border law', 'Tech & data literacy'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Stable',
      trend: [50, 50, 51, 52, 53, 53],
      marketNote: 'Steady corporate demand, but AI now handles much contract review and due diligence — value concentrates in judgement and negotiation.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['E', 'C', 'I'],
    relatedFields: ['Law', 'Business & Management'],
  },
  {
    slug: 'paralegal',
    title: 'Paralegal',
    field: 'Law',
    summary: 'Supports lawyers by researching cases, preparing documents, and managing legal information.',
    exampleRoles: ['Paralegal', 'Legal Assistant', 'Legal Researcher', 'Contracts Administrator'],
    requiredSkills: ['Legal research', 'Organisation', 'Writing', 'Attention to detail', 'Discretion'],
    niceToHaveSkills: ['Case-management software', 'A second language', 'Specialist legal knowledge', 'Tech literacy'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Slow growth',
      trend: [58, 58, 59, 59, 60, 60],
      marketNote: 'A practical route into law, but AI document and research tools are automating much routine paralegal work.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['C', 'I', 'S'],
    relatedFields: ['Law', 'Business & Management'],
  },

  // ── Education ──────────────────────────────────────────────────────────────
  {
    slug: 'teacher',
    title: 'Teacher / Educator',
    field: 'Education',
    summary: 'Helps students learn and grow, planning lessons and supporting development in a subject or age group.',
    exampleRoles: ['Secondary Teacher', 'Primary Teacher', 'University Lecturer', 'Education Specialist'],
    requiredSkills: ['Communication', 'Subject knowledge', 'Patience', 'Organisation', 'Empathy'],
    niceToHaveSkills: ['Educational technology', 'Languages', 'Curriculum design', 'Leadership'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Stable',
      trend: [58, 58, 59, 60, 61, 61],
      marketNote: 'Stable, essential demand; shortages in STEM and some regions.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['S', 'A'],
    relatedFields: ['Education', 'Humanities & Languages'],
  },

  {
    slug: 'university-lecturer',
    title: 'University Lecturer / Professor',
    field: 'Education',
    summary: 'Teaches and researches at university level, publishing work and mentoring students in a specialist field.',
    exampleRoles: ['Lecturer', 'Assistant Professor', 'Researcher', 'Academic Tutor'],
    requiredSkills: ['Deep subject expertise', 'Communication', 'Research', 'Writing', 'Mentoring'],
    niceToHaveSkills: ['Grant writing', 'Public speaking', 'Curriculum design', 'Academic networking'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 51, 52, 53, 53],
      marketNote: 'Rewarding but tenure-track posts are scarce and highly competitive; teaching-focused and industry roles are growing alternatives.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'S', 'A'],
    relatedFields: ['Education', 'Humanities & Languages'],
  },
  {
    slug: 'education-administrator',
    title: 'Education Administrator',
    field: 'Education',
    summary: 'Leads and manages schools, colleges, or programmes — overseeing staff, policy, and student outcomes.',
    exampleRoles: ['School Principal', 'Registrar', 'Programme Director', 'Admissions Manager'],
    requiredSkills: ['Leadership', 'Organisation', 'Communication', 'Problem solving', 'Decision-making'],
    niceToHaveSkills: ['Budgeting', 'Data & reporting', 'Policy knowledge', 'EdTech systems'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Stable',
      trend: [58, 58, 59, 59, 60, 60],
      marketNote: 'Stable, essential demand as education expands; a growing need for digital and data-literate leaders.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['E', 'S', 'C'],
    relatedFields: ['Education', 'Business & Management'],
  },

  // ── Humanities & Languages ─────────────────────────────────────────────────
  {
    slug: 'translator-interpreter',
    title: 'Translator / Interpreter',
    field: 'Humanities & Languages',
    summary: 'Converts speech or text between languages, enabling communication across cultures and borders.',
    exampleRoles: ['Translator', 'Interpreter', 'Localisation Specialist', 'Subtitler'],
    requiredSkills: ['Bilingual fluency', 'Writing', 'Cultural awareness', 'Attention to detail', 'Listening'],
    niceToHaveSkills: ['Specialist domain knowledge', 'CAT/translation tools', 'A third language', 'Editing'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Declining',
      trend: [50, 49, 48, 46, 45, 44],
      marketNote: 'AI machine translation is rapidly absorbing routine work; demand is narrowing to specialist, certified, and live-interpreting roles plus post-editing.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['A', 'S', 'C'],
    relatedFields: ['Humanities & Languages', 'Arts, Design & Media'],
  },

  {
    slug: 'content-writer',
    title: 'Content Writer / Copywriter',
    field: 'Humanities & Languages',
    summary: 'Writes clear, engaging content — articles, web copy, and marketing — to inform and persuade audiences.',
    exampleRoles: ['Copywriter', 'Content Strategist', 'Technical Writer', 'SEO Writer'],
    requiredSkills: ['Writing', 'Research', 'Communication', 'Creativity', 'Editing'],
    niceToHaveSkills: ['SEO', 'Content strategy', 'Basic design', 'AI writing tools'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 49, 48, 47, 47],
      marketNote: 'Generative AI now drafts routine copy fast; demand is shifting to strategy, editing, subject expertise, and a distinctive voice.',
      sources: ['O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['A', 'I', 'S'],
    relatedFields: ['Humanities & Languages', 'Arts, Design & Media'],
  },
  {
    slug: 'librarian-archivist',
    title: 'Librarian / Archivist',
    field: 'Humanities & Languages',
    summary: 'Organises, preserves, and helps people find information — in libraries, archives, and digital collections.',
    exampleRoles: ['Librarian', 'Archivist', 'Information Specialist', 'Records Manager'],
    requiredSkills: ['Organisation', 'Research', 'Attention to detail', 'Communication', 'Information management'],
    niceToHaveSkills: ['Digital archiving', 'Database systems', 'Data curation', 'A second language'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 51, 51, 52, 52],
      marketNote: 'Traditional library roles are flat as information goes digital, but opportunity is shifting to digital curation and data management.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['C', 'I', 'S'],
    relatedFields: ['Humanities & Languages', 'Education'],
  },

  // ── Hospitality & Tourism ──────────────────────────────────────────────────
  {
    slug: 'hospitality-manager',
    title: 'Hospitality Manager',
    field: 'Hospitality & Tourism',
    summary: 'Runs hotels, restaurants, or travel services, leading teams to deliver great guest experiences.',
    exampleRoles: ['Hotel Manager', 'Events Manager', 'Restaurant Manager', 'Guest Experience Manager'],
    requiredSkills: ['Communication', 'Customer service', 'Leadership', 'Organisation', 'Problem solving'],
    niceToHaveSkills: ['Languages', 'Revenue management', 'Marketing', 'Budgeting'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 62, 63, 64],
      marketNote: 'Rebounding strongly with global travel and tourism growth.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['E', 'S', 'C'],
    relatedFields: ['Hospitality & Tourism', 'Business & Management'],
  },
  {
    slug: 'chef',
    title: 'Chef / Culinary Professional',
    field: 'Hospitality & Tourism',
    summary: 'Creates dishes and runs kitchens, leading food preparation and quality in restaurants and hospitality.',
    exampleRoles: ['Chef de Partie', 'Sous Chef', 'Head Chef', 'Pastry Chef'],
    requiredSkills: ['Cooking technique', 'Creativity', 'Stamina', 'Teamwork', 'Time management'],
    niceToHaveSkills: ['Menu costing', 'Nutrition', 'Kitchen management', 'Food-safety certification'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 61, 62, 63],
      marketNote: 'A hands-on, automation-resistant craft; demand grows with dining and travel, though the hours are demanding.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['R', 'A', 'E'],
    relatedFields: ['Hospitality & Tourism', 'Arts, Design & Media'],
  },
  {
    slug: 'travel-consultant',
    title: 'Travel Consultant / Agent',
    field: 'Hospitality & Tourism',
    summary: 'Plans and books trips and itineraries, advising travellers on destinations, logistics, and experiences.',
    exampleRoles: ['Travel Agent', 'Tour Consultant', 'Corporate Travel Planner', 'Destination Specialist'],
    requiredSkills: ['Customer service', 'Organisation', 'Communication', 'Destination knowledge', 'Attention to detail'],
    niceToHaveSkills: ['Languages', 'Booking systems', 'Sales', 'Social media'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Declining',
      trend: [50, 49, 48, 46, 45, 44],
      marketNote: 'Online self-booking and AI trip planners have shrunk routine agency work; survival is in luxury, complex, and specialist travel.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['E', 'S', 'C'],
    relatedFields: ['Hospitality & Tourism', 'Business & Management'],
  },

  // ── Expansion batch: common study-abroad aspirations across fields ──────────
  {
    slug: 'dentist',
    title: 'Dentist',
    field: 'Medicine & Health',
    summary: 'Diagnoses and treats problems with teeth, gums, and the mouth, and helps patients prevent oral disease.',
    exampleRoles: ['General Dentist', 'Orthodontist', 'Oral Surgeon', 'Paediatric Dentist'],
    requiredSkills: ['Clinical dexterity', 'Diagnosis', 'Patient care', 'Attention to detail', 'Communication'],
    niceToHaveSkills: ['Practice management', 'Specialisation (ortho/surgery)', 'New dental technology', 'A second language'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 67, 68, 70, 71, 72],
      marketNote: 'Steady, essential demand as populations age and access to dental care expands; shortages in many regions.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['R', 'I', 'S'],
    relatedFields: ['Medicine & Health', 'Natural Sciences'],
  },
  {
    slug: 'veterinarian',
    title: 'Veterinarian',
    field: 'Medicine & Health',
    summary: 'Diagnoses and treats illness and injury in animals, from pets to livestock, and advises owners on care.',
    exampleRoles: ['Small-Animal Vet', 'Large-Animal / Farm Vet', 'Veterinary Surgeon', 'Wildlife Vet'],
    requiredSkills: ['Animal science', 'Diagnosis', 'Surgical & clinical skills', 'Empathy', 'Communication'],
    niceToHaveSkills: ['Specialisation', 'Practice management', 'Research', 'Handling difficult cases'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 67, 71, 74, 78, 79],
      marketNote: 'Rising pet ownership and animal-health spending drive strong, resilient demand for qualified vets.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'R', 'S'],
    relatedFields: ['Medicine & Health', 'Natural Sciences'],
  },
  {
    slug: 'dietitian-nutritionist',
    title: 'Dietitian / Nutritionist',
    field: 'Medicine & Health',
    summary: 'Advises people on food and nutrition to improve health, manage conditions, and support wellbeing.',
    exampleRoles: ['Clinical Dietitian', 'Community Nutritionist', 'Sports Nutritionist', 'Public-Health Nutritionist'],
    requiredSkills: ['Nutrition science', 'Assessment & counselling', 'Communication', 'Empathy', 'Evidence-based practice'],
    niceToHaveSkills: ['Behaviour-change coaching', 'Data & tracking tools', 'Specialisation (sports/clinical)', 'A second language'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 62, 63, 64],
      marketNote: 'Growing as health awareness, chronic-disease prevention, and wellness services expand.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['S', 'I', 'C'],
    relatedFields: ['Medicine & Health', 'Natural Sciences'],
  },
  {
    slug: 'public-health-specialist',
    title: 'Public Health Specialist',
    field: 'Medicine & Health',
    summary: 'Protects and improves the health of whole populations through data, policy, prevention, and health programmes.',
    exampleRoles: ['Epidemiologist', 'Health Programme Manager', 'Biostatistician', 'Global-Health Officer'],
    requiredSkills: ['Epidemiology & statistics', 'Data analysis', 'Research', 'Communication', 'Programme planning'],
    niceToHaveSkills: ['GIS & data tools', 'Policy & advocacy', 'Grant writing', 'A second language'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 63, 66, 70, 71],
      marketNote: 'Strong post-pandemic investment in disease surveillance, prevention, and global health.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'S', 'C'],
    relatedFields: ['Medicine & Health', 'Social Sciences & Psychology', 'Natural Sciences'],
  },
  {
    slug: 'chemical-engineer',
    title: 'Chemical Engineer',
    field: 'Engineering',
    summary: 'Designs and runs the processes that turn raw materials into products, from fuels and medicines to food and materials.',
    exampleRoles: ['Process Engineer', 'Production Engineer', 'Materials Engineer', 'Pharmaceutical Engineer'],
    requiredSkills: ['Chemistry', 'Mathematics', 'Process design', 'Problem solving', 'Safety & analysis'],
    niceToHaveSkills: ['Process simulation', 'Project management', 'Programming', 'Sustainability & green chemistry'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 63, 64, 65],
      marketNote: 'Steady demand across energy, pharma, and materials, with a growing pull toward clean and sustainable processes.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'R', 'C'],
    relatedFields: ['Engineering', 'Natural Sciences'],
  },
  {
    slug: 'aerospace-engineer',
    title: 'Aerospace Engineer',
    field: 'Engineering',
    summary: 'Designs, tests, and builds aircraft, spacecraft, satellites, and their systems.',
    exampleRoles: ['Aeronautical Engineer', 'Propulsion Engineer', 'Avionics Engineer', 'Systems Engineer'],
    requiredSkills: ['Physics & aerodynamics', 'Mathematics', 'CAD & simulation', 'Problem solving', 'Materials'],
    niceToHaveSkills: ['Programming', 'Control systems', 'Project management', 'Space or defence experience'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Growing',
      trend: [50, 51, 52, 53, 54, 55],
      marketNote: 'Steady growth from commercial aviation and a booming space sector, though roles concentrate around a few large employers.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'R', 'C'],
    relatedFields: ['Engineering', 'Natural Sciences'],
  },
  {
    slug: 'industrial-engineer',
    title: 'Industrial / Manufacturing Engineer',
    field: 'Engineering',
    summary: 'Designs and improves systems and processes so organisations produce goods and services more efficiently.',
    exampleRoles: ['Industrial Engineer', 'Manufacturing Engineer', 'Process Improvement Engineer', 'Quality Engineer'],
    requiredSkills: ['Process optimisation', 'Mathematics & statistics', 'Systems thinking', 'Problem solving', 'Data analysis'],
    niceToHaveSkills: ['Lean / Six Sigma', 'Automation & robotics', 'Supply-chain knowledge', 'Programming'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 61, 63, 65, 66],
      marketNote: 'Solid demand as firms chase efficiency, automation, and resilient supply chains.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'C', 'R'],
    relatedFields: ['Engineering', 'Business & Management'],
  },
  {
    slug: 'actuary',
    title: 'Actuary',
    field: 'Finance & Economics',
    summary: 'Uses mathematics, statistics, and financial theory to measure and manage risk for insurers, pensions, and businesses.',
    exampleRoles: ['Insurance Actuary', 'Pensions Actuary', 'Risk Analyst', 'Investment Actuary'],
    requiredSkills: ['Mathematics & statistics', 'Probability', 'Data analysis', 'Programming (R/Python/Excel)', 'Attention to detail'],
    niceToHaveSkills: ['Actuarial exams', 'Financial modelling', 'Communication', 'Business acumen'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 68, 71, 76, 79, 81],
      marketNote: 'Strong, well-paid demand with a limited supply of qualified people; the professional exams are demanding but rewarding.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'C', 'E'],
    relatedFields: ['Finance & Economics', 'Computer Science & IT'],
  },
  {
    slug: 'human-resources-manager',
    title: 'Human Resources Manager',
    field: 'Business & Management',
    summary: 'Leads how an organisation hires, develops, and looks after its people, from recruitment to culture and policy.',
    exampleRoles: ['HR Manager', 'Talent Acquisition Manager', 'People & Culture Lead', 'HR Business Partner'],
    requiredSkills: ['Communication', 'Interpersonal skills', 'Organisation', 'Employment knowledge', 'Problem solving'],
    niceToHaveSkills: ['People analytics', 'Change management', 'Employment law', 'A second language'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 61, 62, 63],
      marketNote: 'Steady demand as organisations invest in talent, culture, and hybrid ways of working.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['S', 'E', 'C'],
    relatedFields: ['Business & Management', 'Social Sciences & Psychology'],
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst',
    field: 'Business & Management',
    summary: 'Bridges business and technology, turning problems and goals into clear requirements and better processes.',
    exampleRoles: ['Business Analyst', 'Systems Analyst', 'Product Owner', 'Process Analyst'],
    requiredSkills: ['Analytical thinking', 'Requirements gathering', 'Communication', 'Problem solving', 'Documentation'],
    niceToHaveSkills: ['Data analysis (SQL/BI)', 'Agile & product tools', 'Stakeholder management', 'Domain knowledge'],
    outlook: {
      demand: 'High',
      growthLabel: 'Growing',
      trend: [66, 67, 69, 72, 74, 75],
      marketNote: 'Broad, cross-industry demand as organisations digitise and rely on data-informed decisions.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'C', 'E'],
    relatedFields: ['Business & Management', 'Computer Science & IT'],
  },
  {
    slug: 'game-developer',
    title: 'Game Developer',
    field: 'Computer Science & IT',
    summary: 'Designs and builds video games, combining programming, art, and design to create interactive experiences.',
    exampleRoles: ['Game Programmer', 'Gameplay Engineer', 'Game Designer', 'Technical Artist'],
    requiredSkills: ['Programming (C++/C#)', 'Game engines (Unity/Unreal)', 'Maths & physics', 'Problem solving', 'Creativity'],
    niceToHaveSkills: ['3D graphics', 'Multiplayer / networking', 'AI for games', 'A portfolio of projects'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Growing',
      trend: [50, 51, 53, 55, 57, 58],
      marketNote: 'A growing global games industry, but a popular field where a strong portfolio matters to stand out.',
      sources: ['BLS 2023–2033', 'O*NET', 'WEF Future of Jobs 2025'],
    },
    riasec: ['I', 'A', 'R'],
    relatedFields: ['Computer Science & IT', 'Arts, Design & Media'],
  },
  {
    slug: 'interior-designer',
    title: 'Interior Designer',
    field: 'Arts, Design & Media',
    summary: 'Plans and designs functional, safe, and beautiful indoor spaces for homes, workplaces, and public buildings.',
    exampleRoles: ['Residential Designer', 'Commercial Interior Designer', 'Set / Exhibition Designer', 'FF&E Designer'],
    requiredSkills: ['Design & spatial sense', 'CAD & visualisation', 'Creativity', 'Client communication', 'Materials knowledge'],
    niceToHaveSkills: ['3D rendering', 'Sustainability', 'Project management', 'Building codes'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 51, 52, 53, 53],
      marketNote: 'Tied to construction and property cycles, and competitive; a distinctive portfolio and a niche help most.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['A', 'R', 'E'],
    relatedFields: ['Arts, Design & Media', 'Engineering'],
  },
  {
    slug: 'animator',
    title: 'Animator / Motion Designer',
    field: 'Arts, Design & Media',
    summary: 'Creates moving images and visual effects for film, games, advertising, and digital media.',
    exampleRoles: ['2D / 3D Animator', 'Motion Designer', 'VFX Artist', 'Character Animator'],
    requiredSkills: ['Animation principles', 'Design software (After Effects/Maya/Blender)', 'Creativity', 'Storytelling', 'Attention to detail'],
    niceToHaveSkills: ['3D modelling', 'Rigging', 'Game engines', 'A strong showreel'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Growing',
      trend: [50, 51, 52, 54, 55, 56],
      marketNote: 'Growing demand from streaming, games, and content, but competitive; a strong showreel is key.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['A', 'I', 'R'],
    relatedFields: ['Arts, Design & Media', 'Computer Science & IT'],
  },
  {
    slug: 'fashion-designer',
    title: 'Fashion Designer',
    field: 'Arts, Design & Media',
    summary: 'Designs clothing, footwear, and accessories, from concept and sketches through to finished pieces.',
    exampleRoles: ['Apparel Designer', 'Textile Designer', 'Accessory Designer', 'Fashion Product Developer'],
    requiredSkills: ['Design & sketching', 'Garment construction', 'Creativity', 'Textiles knowledge', 'Trend awareness'],
    niceToHaveSkills: ['CAD for fashion', 'Sustainable & ethical design', 'Branding', 'A strong portfolio'],
    outlook: {
      demand: 'Competitive',
      growthLabel: 'Slow growth',
      trend: [50, 50, 51, 51, 52, 52],
      marketNote: 'A highly competitive, portfolio-driven field; sustainability and digital fashion are opening new niches.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['A', 'E', 'R'],
    relatedFields: ['Arts, Design & Media', 'Business & Management'],
  },
  {
    slug: 'chemist',
    title: 'Chemist',
    field: 'Natural Sciences',
    summary: 'Studies substances at the molecular level to develop and test new materials, medicines, and products.',
    exampleRoles: ['Analytical Chemist', 'Research Chemist', 'Quality-Control Chemist', 'Formulation Chemist'],
    requiredSkills: ['Chemistry', 'Laboratory technique', 'Data analysis', 'Attention to detail', 'Problem solving'],
    niceToHaveSkills: ['Instrumentation', 'Programming / data tools', 'Regulatory knowledge', 'Scientific writing'],
    outlook: {
      demand: 'Moderate',
      growthLabel: 'Growing',
      trend: [58, 59, 60, 61, 62, 63],
      marketNote: 'Steady demand across pharma, materials, energy, and consumer products; advanced roles favour higher degrees.',
      sources: ['BLS 2023–2033', 'O*NET'],
    },
    riasec: ['I', 'R', 'C'],
    relatedFields: ['Natural Sciences', 'Medicine & Health'],
  },
]

// ── Lookups ──────────────────────────────────────────────────────────────────
const BY_SLUG = new Map(CAREERS.map((c) => [c.slug, c]))
const normTitle = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')
const BY_TITLE = new Map(CAREERS.map((c) => [normTitle(c.title), c]))

export function getCareerBySlug(slug: string): Career | undefined {
  return BY_SLUG.get(slug)
}

/** Resolve a typed or selected query to a catalog career, by title first (the
 *  explorer dropdown passes exact titles) then a slug-ised fallback. */
export function findCareerByQuery(query: string): Career | undefined {
  const q = normTitle(query)
  if (!q) return undefined
  return BY_TITLE.get(q) ?? BY_SLUG.get(q.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
}

export function getCareersByField(field: CareerField): Career[] {
  return CAREERS.filter((c) => c.field === field)
}

/** Careers that suit any of the given Holland types. */
export function getCareersByRiasec(codes: HollandCode[]): Career[] {
  return CAREERS.filter((c) => c.riasec.some((r) => codes.includes(r)))
}
