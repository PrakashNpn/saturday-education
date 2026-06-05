import { DegreeType, Region, ScholarshipType } from '../../generated/client'

// ─── GRENADA COUNTRY ──────────────────────────────────────────────────────────

export const GRENADA = {
  slug: 'grenada',
  name: 'Grenada',
  region: Region.AMERICAS,
  tagline: 'The Caribbean Gateway to US & Canadian Medical Licensure',
  shortDescription:
    'Home to St. George\'s University — one of the world\'s most respected offshore medical schools — Grenada is the Caribbean\'s leading destination for aspiring physicians and veterinarians seeking US, Canadian, and UK medical licensure.',
  overview: `Grenada is a small island nation in the southern Caribbean known internationally as the home of St. George\'s University (SGU), one of the world\'s largest and most established offshore medical schools. Founded in 1976, SGU has trained more physicians currently licensed in the United States than any other medical school in the world. The MD program follows a rigorous US-style curriculum, with students completing their basic sciences in Grenada before transferring to affiliated teaching hospitals across the United States, Canada, and the United Kingdom for clinical rotations. Graduates are eligible to sit the United States Medical Licensing Examination (USMLE) Steps 1, 2, and 3, and thousands of SGU alumni have successfully matched into US residency programs each year through the National Resident Matching Program (NRMP). Beyond medicine, SGU also offers one of the world\'s premier Doctor of Veterinary Medicine programs, along with bachelor\'s, master\'s, and public health degrees. Grenada\'s warm Caribbean climate, affordable cost of living compared to mainland US, and proximity to the United States make it a compelling choice for pre-medical students from North America, Asia, and beyond.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '1 major international',
  tuitionFeeRange: 'USD 22,000 – USD 70,000/year',
  postStudyWorkVisa: 'No standard post-study work visa. MD and DVM graduates pursue US/Canadian residency matching via USMLE Steps 1, 2 & 3 (MD) or NAVLE (DVM). Thousands of SGU graduates match into US residency programs annually through the NRMP.',
  internationalStudents: 5000,
  studentSatisfaction: 83,
  graduateEmployability: 85,
  visaProcessingTime: '4–8 weeks',
  workRights: 'Limited on-campus employment during study. Post-graduation: match into US or Canadian residency programs via USMLE/NRMP pathway; no general work visa pathway in Grenada.',
  costOfLivingMinUSD: 12000,
  costOfLivingMaxUSD: 20000,
  currencyCode: 'USD',
  academicSpecialties: [
    'Medicine & MD Programs',
    'Veterinary Medicine',
    'Public Health',
    'Nursing & Healthcare',
    'Biological Sciences',
    'Biomedical Sciences',
  ],
  isFeatured: true,
  advantages: [
    {
      title: 'USMLE Pathway to US Medical Licensure',
      description:
        'SGU graduates are eligible to sit all three steps of the USMLE and enter the NRMP residency match. SGU consistently places hundreds of graduates into US residency programs each year — making it one of the most reliable offshore pathways to practicing medicine in the United States.',
      order: 1,
    },
    {
      title: 'US, Canadian & UK Clinical Rotations',
      description:
        'After completing basic sciences in Grenada, MD students rotate through SGU\'s network of over 70 affiliated teaching hospitals across the United States, Canada, and the United Kingdom — gaining real clinical experience in the same hospitals where US medical graduates train.',
      order: 2,
    },
    {
      title: 'World-Renowned Veterinary Medicine Program',
      description:
        'SGU\'s School of Veterinary Medicine is consistently ranked among the top veterinary schools in the world and is accredited by the American Veterinary Medical Association (AVMA). Graduates are eligible to sit the NAVLE and practice in all 50 US states and Canada.',
      order: 3,
    },
    {
      title: 'Caribbean Lifestyle & Affordable Living',
      description:
        'Grenada offers a safe, welcoming island environment with a cost of living significantly lower than mainland US or Canadian cities. The university\'s True Blue campus sits on a scenic peninsula overlooking the Caribbean Sea, providing a focused academic setting with tropical surroundings.',
      order: 4,
    },
    {
      title: 'LCME & AVMA Accreditation',
      description:
        'The SGU School of Medicine holds accreditation from the Caribbean Accreditation Authority for Education in Medicine and Other Health Professions (CAAM-HP), and the School of Veterinary Medicine is AVMA-accredited — ensuring degrees are recognized by US and Canadian licensing bodies.',
      order: 5,
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Check Prerequisites & Take MCAT/GRE',
      description:
        'For the MD program, complete prerequisite sciences (biology, chemistry, organic chemistry, physics, biochemistry) and sit the MCAT. A competitive MCAT score (ideally 500+) and a strong undergraduate GPA (3.0+ recommended) are required. The DVM program also requires science prerequisites and a strong academic record.',
    },
    {
      stepNumber: 2,
      title: 'Submit SGU Application',
      description:
        'Apply through SGU\'s online application portal at sgu.edu. Submit transcripts, letters of recommendation (3 required — at least 2 from science faculty), personal statement, MCAT scores, and evidence of healthcare or research experience. SGU uses rolling admissions with multiple intakes per year (January, May, August).',
    },
    {
      stepNumber: 3,
      title: 'Interview & Receive Admission Decision',
      description:
        'Shortlisted applicants are invited to an interview (in-person or virtual). SGU\'s admissions committee evaluates academic readiness, motivation for medicine, and professional maturity. Decisions are typically communicated within 4–6 weeks of the completed application.',
    },
    {
      stepNumber: 4,
      title: 'Apply for Grenada Student Visa',
      description:
        'Citizens of most countries can enter Grenada without a visa or obtain a student permit on arrival. US and Canadian citizens do not require a separate student visa for the duration of their studies. Non-North American applicants should confirm requirements with the Grenadian High Commission in their home country.',
    },
    {
      stepNumber: 5,
      title: 'Complete Basic Sciences in Grenada & Begin USMLE Preparation',
      description:
        'Spend the first 2 years completing basic medical sciences on SGU\'s Grenada campus. Begin USMLE Step 1 preparation from Term 3 onwards. Upon passing Step 1, proceed to clinical rotations at affiliated US or Canadian teaching hospitals for the final 2 years of the MD program.',
    },
  ],
  faqs: [
    {
      question: 'Are SGU medical degrees recognised in the United States and Canada?',
      answer:
        'Yes. SGU MD graduates are eligible to apply for US medical licensure by sitting the USMLE Steps 1, 2 CK, and 3. Thousands of SGU graduates practice medicine across the US and Canada. SGU is listed in the World Directory of Medical Schools and its graduates meet state medical board licensing requirements in all 50 US states.',
      order: 1,
    },
    {
      question: 'How does the USMLE residency match work for SGU graduates?',
      answer:
        'After passing USMLE Step 1 and Step 2 CK, SGU students enter clinical rotations at affiliated US hospitals. Upon completing the MD, graduates apply to US residency programs through the National Resident Matching Program (NRMP). SGU publishes annual match data showing hundreds of graduates successfully matching into residency each year, including competitive specialties.',
      order: 2,
    },
    {
      question: 'What is the total cost of the SGU MD program?',
      answer:
        'Total tuition for the MD program (4 years) is approximately USD 240,000–260,000. Annual tuition is around USD 55,000–64,000 for the Grenada-based basic science semesters. Clinical rotation semesters have different fee structures. Living costs in Grenada average USD 12,000–18,000 per year.',
      order: 3,
    },
    {
      question: 'Does SGU offer financial aid or scholarships for international students?',
      answer:
        'SGU offers merit-based scholarships, and students from the United States and Canada can access US federal student loans (Title IV) and Canadian student loan programs respectively. SGU also works with private lenders. Non-North American international students should explore private educational loans and home-country scholarships.',
      order: 4,
    },
    {
      question: 'Is there a pathway for non-US/Canadian students to practice medicine in the US after SGU?',
      answer:
        'Yes. Regardless of nationality, any SGU graduate who passes the USMLE Steps and obtains an ECFMG certificate is eligible to apply for US residency programs. Many international students from Asia, Africa, and the Caribbean have successfully matched into US residencies as SGU graduates.',
      order: 5,
    },
    {
      question: 'How is SGU\'s veterinary program accredited?',
      answer:
        'The SGU School of Veterinary Medicine is accredited by the American Veterinary Medical Association (AVMA) Council on Education — the gold standard for veterinary accreditation. AVMA accreditation means SGU DVM graduates are eligible to sit the North American Veterinary Licensing Examination (NAVLE) and practice in all 50 US states and Canadian provinces without additional examinations.',
      order: 6,
    },
  ],
}

// ─── ST. GEORGE'S UNIVERSITY ──────────────────────────────────────────────────

export const ST_GEORGES_UNIVERSITY = {
  slug: 'st-georges-university',
  name: "St. George's University",
  city: 'True Blue, St. George\'s',
  foundedYear: 1976,
  ranking: null,
  totalStudents: 5500,
  internationalStudents: 0.90,
  acceptanceRate: 55,
  shortDescription:
    "St. George's University (SGU) in Grenada is one of the world's largest and most successful offshore medical schools, having trained more physicians currently licensed in the United States than any other institution. Offering MD, DVM, nursing, public health, and undergraduate science programs, SGU is the Caribbean's premier destination for aspiring physicians and veterinarians pursuing US and Canadian licensure.",
  tuitionFeeMin: 22000,
  tuitionFeeMax: 64000,
  tuitionCurrency: 'USD',
  logoUrl: null,
  coverImageUrl: null,
  programs: [
    {
      slug: 'md-doctor-of-medicine',
      name: 'Doctor of Medicine (MD)',
      field: 'Medicine & Healthcare',
      degreeLevel: DegreeType.PHD,
      durationYears: 4,
      tuitionFeePerYear: 'USD 60,000/year',
      description:
        'SGU\'s flagship four-year MD program follows a US-style curriculum: two years of basic medical sciences on the Grenada campus (anatomy, physiology, biochemistry, pharmacology, pathology) followed by two years of clinical rotations at affiliated teaching hospitals in the United States, Canada, and the United Kingdom. Graduates are eligible to sit the USMLE Steps 1, 2, and 3, and enter the National Resident Matching Program (NRMP) for US residency placement. SGU matches hundreds of graduates into US residency programs annually.',
    },
    {
      slug: 'dvm-doctor-of-veterinary-medicine',
      name: 'Doctor of Veterinary Medicine (DVM)',
      field: 'Veterinary Medicine',
      degreeLevel: DegreeType.PHD,
      durationYears: 4,
      tuitionFeePerYear: 'USD 56,000/year',
      description:
        'AVMA-accredited four-year DVM program combining preclinical sciences in Grenada with clinical rotations at North American veterinary teaching hospitals. The curriculum covers small and large animal medicine, surgery, diagnostic imaging, pathology, and clinical skills. Graduates are eligible to sit the North American Veterinary Licensing Examination (NAVLE) and practice in all 50 US states and Canadian provinces.',
    },
    {
      slug: 'bsc-biomedical-sciences',
      name: 'Bachelor of Science in Biomedical Sciences',
      field: 'Biomedical Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        'Four-year undergraduate program covering the molecular and cellular foundations of human disease, including biochemistry, genetics, microbiology, immunology, and physiology. Designed as a pre-medical pathway, the program prepares students for direct entry into SGU\'s MD program or for graduate study in biomedical research. Many students use this program to strengthen their academic profile before applying to medical school.',
    },
    {
      slug: 'bsc-biology',
      name: 'Bachelor of Science in Biology',
      field: 'Biological Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'USD 26,000/year',
      description:
        'Comprehensive undergraduate biology degree covering ecology, evolution, cell biology, genetics, and marine biology. The program includes laboratory and fieldwork components, leveraging Grenada\'s exceptional tropical and marine ecosystems. Suitable for students interested in environmental sciences, research, or as a foundation for graduate health professional programs.',
    },
    {
      slug: 'bsc-microbiology',
      name: 'Bachelor of Science in Microbiology',
      field: 'Biological Sciences',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'USD 26,000/year',
      description:
        'Undergraduate microbiology program focused on bacteriology, virology, mycology, immunology, and infectious disease epidemiology. Graduates pursue careers in public health, pharmaceutical research, clinical laboratory science, or continue to medical or graduate school. Particularly relevant given the global importance of infectious disease management.',
    },
    {
      slug: 'bsc-nursing',
      name: 'Bachelor of Science in Nursing',
      field: 'Nursing & Healthcare',
      degreeLevel: DegreeType.BACHELOR,
      durationYears: 4,
      tuitionFeePerYear: 'USD 22,000/year',
      description:
        'Four-year BSN program preparing students for professional nursing practice in hospital, community, and primary care settings. The curriculum integrates nursing theory, clinical pharmacology, patient assessment, and evidence-based practice with supervised clinical placements. Graduates are eligible to sit the NCLEX-RN licensing examination for registration in the United States and other jurisdictions.',
    },
    {
      slug: 'mph-master-of-public-health',
      name: 'Master of Public Health (MPH)',
      field: 'Public Health',
      degreeLevel: DegreeType.MASTER,
      durationYears: 2,
      tuitionFeePerYear: 'USD 28,000/year',
      description:
        'Two-year graduate MPH program covering epidemiology, biostatistics, health policy, environmental health, and global health management. Offered in collaboration with Northumbria University (UK), the program is designed for health professionals, physicians, and career changers seeking leadership roles in public health agencies, NGOs, international organisations, and healthcare systems. Available on-campus in Grenada and via online delivery.',
    },
    {
      slug: 'ms-biomedical-sciences',
      name: 'Master of Science in Biomedical Sciences',
      field: 'Biomedical Sciences',
      degreeLevel: DegreeType.MASTER,
      durationYears: 1,
      tuitionFeePerYear: 'USD 42,000/year',
      description:
        'Intensive one-year MS program providing graduate-level training in the basic medical sciences — including anatomy, physiology, biochemistry, pharmacology, and pathology. Designed as an academic bridge for students who need to strengthen their medical science knowledge before entering or re-applying to MD programs. Successful completion with strong grades may lead to conditional acceptance into the SGU MD program.',
    },
  ],
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Complete Academic Prerequisites',
      description:
        'For MD admission: complete undergraduate prerequisites including biology (2 semesters), general chemistry (2 semesters), organic chemistry (1 semester), physics (2 semesters), and biochemistry (recommended). Aim for a cumulative GPA of 3.0 or higher. For DVM: complete comparable veterinary prerequisites including animal science, biology, chemistry, and statistics.',
    },
    {
      stepNumber: 2,
      title: 'Sit the MCAT (MD) or Equivalent (DVM/BSc)',
      description:
        'MD applicants must submit MCAT scores. A competitive score is generally 500 or above, though SGU evaluates applications holistically. DVM applicants may submit MCAT or GRE scores. BSc and MPH applicants do not require MCAT. MCAT scores must be from the last 3 years.',
    },
    {
      stepNumber: 3,
      title: 'Gather Supporting Documents',
      description:
        'Prepare official academic transcripts from all colleges attended, three letters of recommendation (at least two from science faculty for MD/DVM), a personal statement describing your motivation for your chosen field, documentation of healthcare/veterinary experience or shadowing hours, and a current resume or CV.',
    },
    {
      stepNumber: 4,
      title: 'Submit Online Application',
      description:
        'Complete the SGU online application at sgu.edu. Pay the application fee and upload all required documents. SGU uses rolling admissions — applying early for your target intake (January, May, or August) improves your chances. International applicants should check country-specific requirements on the SGU website.',
    },
    {
      stepNumber: 5,
      title: 'Complete an Admissions Interview',
      description:
        'Shortlisted applicants are invited to a structured interview conducted by SGU faculty or admissions staff, available in-person at SGU\'s Grenada campus or virtually. The interview assesses communication skills, clinical reasoning, professionalism, and commitment to a medical or veterinary career.',
    },
    {
      stepNumber: 6,
      title: 'Receive Offer & Arrange Financing',
      description:
        'Admitted students receive an official offer letter. US citizens may access US federal student loans (Title IV); Canadian citizens may access Canadian student loans. SGU also partners with private lenders. Review the financial aid office\'s guidance on loan certification, scholarship opportunities, and payment plans before confirming enrollment.',
    },
  ],
  scholarships: [
    {
      name: 'SGU Merit Scholarship',
      value: 'USD 10,000–30,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        'Competitive merit-based scholarships awarded to incoming MD and DVM students with outstanding academic records. Awards are based on GPA, MCAT scores, research experience, and demonstrated commitment to medicine or veterinary medicine. Renewable based on continued academic performance.',
    },
    {
      name: 'SGU Caribbean Regional Scholarship',
      value: 'USD 15,000',
      type: ScholarshipType.MERIT_BASED,
      description:
        'Awarded to academically strong applicants from Caribbean nations, including Grenada and neighboring islands, in recognition of the university\'s commitment to regional medical education and healthcare workforce development.',
    },
    {
      name: 'SGU Pathway Scholar Award',
      value: 'USD 8,000–20,000',
      type: ScholarshipType.PARTIAL,
      description:
        'Partial tuition award available to students entering the MD or DVM program through SGU\'s affiliated pathway programs, including the Basic Sciences program. Award amount varies based on academic performance during the pathway year.',
    },
  ],
}

export const GRENADA_UNIVERSITIES: any[] = [
  ST_GEORGES_UNIVERSITY,
]
