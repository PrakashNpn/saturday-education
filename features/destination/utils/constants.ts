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

export const SORT_OPTIONS = [
  { value: 'ranking', label: 'sortHighestRanking' },
  { value: 'az', label: 'sortAZ' },
  { value: 'za', label: 'sortZA' },
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]['value']

export const PAGE_SIZE = 6
