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
  /** Institution count sourced from Firmli's course-finder catalogue, not our
   *  own signed partner list — null when Firmli has no match for this
   *  country, or the lookup failed. */
  firmliInstitutionCount: number | null
}

export type DestinationTranslations = {
  viewDetails: string
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
}
