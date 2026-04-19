// Listing page
export { DestinationsPageClient } from './components/DestinationsPageClient'
export { DestinationCard } from './components/DestinationCard'

// Detail page
export { DestinationDetailPage } from './components/DestinationDetailPage'

// Service functions needed by app/ for routing concerns
export { getAllCountrySlugs, getCountryBySlug } from './services/destinationService'

// Types
export type {
  CountryCardData,
  DestinationTranslations,
  CountryDetailData,
  UniversityCardData,
  CountryAdvantageData,
  CountryProcessStepData,
  CountryFAQData,
  ScholarshipData,
} from './types'
