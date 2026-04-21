export type UniversityListItem = {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  coverImageUrl: string | null
  shortDescription: string | null
  city: string | null
  foundedYear: number | null
  ranking: number | null
  acceptanceRate: number | null
  tuitionFeeMin: number | null
  tuitionFeeMax: number | null
  tuitionCurrency: string | null
  intakeMonths: string | null
  hasOnCampus: boolean
  hasOnline: boolean
  hasHybrid: boolean
  country: { name: string; slug: string }
  programs: { field: string; degreeLevel: string; name: string }[]
  _count: { programs: number }
}

export type CountryFilterOption = {
  id: string
  name: string
  slug: string
}

export type UniversityFinderData = {
  universities: UniversityListItem[]
  countries: CountryFilterOption[]
  programFields: string[]
  degreeLevels: string[]
}

export type SimilarUniversity = {
  id: string
  slug: string
  name: string
  city: string | null
  ranking: number | null
  acceptanceRate: number | null
  tuitionFeeMin: number | null
  tuitionFeeMax: number | null
  tuitionCurrency: string | null
  intakeMonths: string | null
  coverImageUrl: string | null
  logoUrl: string | null
  country: { name: string; slug: string }
  _count: { programs: number }
}
