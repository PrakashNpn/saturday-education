export const REGIONS = ['All', 'EUROPE', 'ASIA', 'AMERICAS', 'OCEANIA', 'AFRICA'] as const
export type RegionFilter = (typeof REGIONS)[number]

export const REGION_DISPLAY: Record<string, string> = {
  EUROPE: 'Europe',
  AMERICAS: 'Americas',
  OCEANIA: 'Oceania',
  ASIA: 'Asia',
  AFRICA: 'Africa',
}

export const REGION_BADGE_COLORS: Record<string, string> = {
  EUROPE: 'bg-purple-600 text-white',
  AMERICAS: 'bg-blue-900 text-white',
  OCEANIA: 'bg-teal-600 text-white',
  ASIA: 'bg-red-600 text-white',
  AFRICA: 'bg-amber-600 text-white',
}

export const REGION_TAB_LABELS: Record<string, string> = {
  All: 'regionAll',
  EUROPE: 'regionEurope',
  ASIA: 'regionAsia',
  AMERICAS: 'regionAmericas',
  OCEANIA: 'regionOceania',
  AFRICA: 'regionAfrica',
}

// The design offers two orders: partner count descending, or alphabetical.
export const SORT_OPTIONS = [
  { value: 'popular', label: 'sortPopular' },
  { value: 'name', label: 'sortName' },
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]['value']

export const PAGE_SIZE = 6

/** Country slug to ISO 3166-1 alpha-2, which is how the flag files are named.
 *  The design pulls these from flagcdn; ours are the local copies already
 *  bundled for the Course Finder. */
export const FLAG_CODES: Record<string, string> = {
  australia: 'au',
  canada: 'ca',
  germany: 'de',
  grenada: 'gd',
  ireland: 'ie',
  malaysia: 'my',
  netherlands: 'nl',
  'new-zealand': 'nz',
  singapore: 'sg',
  spain: 'es',
  switzerland: 'ch',
  thailand: 'th',
  uae: 'ae',
  'united-kingdom': 'gb',
  'united-states': 'us',
}
