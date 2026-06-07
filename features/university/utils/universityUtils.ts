export const ITEMS_PER_PAGE = 20

export function getCurrencySymbol(code: string | null | undefined): string {
  const symbols: Record<string, string> = {
    GBP: '£', EUR: '€', USD: '$',
    CAD: 'C$', AUD: 'A$', NZD: 'NZ$',
    SGD: 'S$', MYR: 'RM', THB: '฿',
    AED: 'AED', CHF: 'CHF',
  }
  return symbols[code ?? 'USD'] ?? `${code} `
}

export const SORT_OPTIONS = [
  { value: 'ranking', labelKey: 'sortHighestRanking' },
  { value: 'tuition-low', labelKey: 'sortLowestTuition' },
  { value: 'acceptance', labelKey: 'sortHighestAcceptance' },
  { value: 'az', labelKey: 'sortAZ' },
  { value: 'za', labelKey: 'sortZA' },
] as const

export const RANKING_FILTERS = [
  { value: 50, labelKey: 'rankTop50' },
  { value: 100, labelKey: 'rankTop100' },
  { value: 999, labelKey: 'rankTop300' },
] as const

export const DEGREE_DISPLAY: Record<string, string> = {
  BACHELOR: 'degreeBachelors',
  MASTER: 'degreeMasters',
  PHD: 'degreePhd',
  DIPLOMA: 'degreeDiploma',
  ASSOCIATE: 'degreeAssociate',
  CERTIFICATE: 'degreeCertificate',
  FOUNDATION: 'degreeFoundation',
}

export const ALL_DEGREE_LEVELS = Object.keys(DEGREE_DISPLAY)

export type SortValue = 'ranking' | 'tuition-low' | 'acceptance' | 'az' | 'za'
