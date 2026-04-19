export type CountryCardData = {
  id: string
  name: string
  slug: string
  region: string
  cardImageUrl: string | null
  tagline: string | null
  shortDescription: string | null
  institutionCount: string | null
  isFeatured: boolean
  isPublished: boolean
  _count: { universities: number }
}

export type DestinationTranslations = {
  heroLabel: string
  heroTitle: string
  heroSubtitle: string
  searchPlaceholder: string
  searchButton: string
  popularRegions: string
  regionAll: string
  regionEurope: string
  regionAsia: string
  regionAmericas: string
  regionOceania: string
  regionAfrica: string
  showingCount: string
  sortBy: string
  sortHighestRanking: string
  sortAZ: string
  sortZA: string
  viewDetails: string
  loadMore: string
  whyStudyAbroadLabel: string
  whyStudyAbroadTitle: string
  whyStudyAbroadSubtitle: string
  globalExposure: string
  globalExposureDesc: string
  careerEdge: string
  careerEdgeDesc: string
  personalGrowth: string
  personalGrowthDesc: string
  lifetimeMemories: string
  lifetimeMemoriesDesc: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

// ─── Detail page types ────────────────────────────────────────────────────────

export type UniversityCardData = {
  id: string
  slug: string
  name: string
  city: string | null
  ranking: number | null
  tuitionFeeMin: number | null
  tuitionFeeMax: number | null
  tuitionCurrency: string | null
  coverImageUrl: string | null
  logoUrl: string | null
  isFeatured: boolean
  shortDescription: string | null
}

export type CountryAdvantageData = {
  id: string
  title: string
  description: string | null
  imageUrl: string | null
  order: number
}

export type CountryProcessStepData = {
  id: string
  stepNumber: number
  title: string
  description: string | null
}

export type CountryFAQData = {
  id: string
  question: string
  answer: string
  order: number
}

export type ScholarshipData = {
  id: string
  name: string
  type: string
  description: string | null
  value: string | null
  learnMoreUrl: string | null
}

export type CountryDetailData = {
  id: string
  name: string
  slug: string
  region: string
  heroImageUrl: string | null
  coverImageUrl: string | null
  cardImageUrl: string | null
  tagline: string | null
  overview: string | null
  institutionCount: string | null
  tuitionFeeRange: string | null
  postStudyWorkVisa: string | null
  studentSatisfaction: number | null
  internationalStudents: number | null
  graduateEmployability: number | null
  workRights: string | null
  visaProcessingTime: string | null
  academicSpecialties: string[]
  advantages: CountryAdvantageData[]
  processSteps: CountryProcessStepData[]
  faqs: CountryFAQData[]
  scholarships: ScholarshipData[]
  universities: UniversityCardData[]
}
