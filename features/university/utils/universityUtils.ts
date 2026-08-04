export const ITEMS_PER_PAGE = 20

const MONTH_NAMES = new Set([
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
])

function isMonthList(intakeMonths: string): boolean {
  const segments = intakeMonths.split(/[,/]/).map((s) => s.trim())
  return segments.length > 0 && segments.every((s) => MONTH_NAMES.has(s.toLowerCase()))
}

export function formatIntakeMonths(intakeMonths: string): string {
  if (!isMonthList(intakeMonths)) return intakeMonths
  return intakeMonths
    .split(/[,/]/)
    .map((m) => m.trim().slice(0, 3).toUpperCase())
    .join(', ')
}

// Short leading clause for narrow, single-line tiles (e.g. the university listing
// card), where a full free-text description would otherwise be cut off mid-word.
export function formatIntakeMonthsCompact(intakeMonths: string): string {
  if (isMonthList(intakeMonths)) return formatIntakeMonths(intakeMonths)
  return intakeMonths.split(/[,;.]/)[0]?.trim() ?? intakeMonths
}

// For wider tiles with room to render a bulleted list: real month lists stay as
// the abbreviated single-line format ("JAN, SEP"); free-text rolling-admission
// descriptions split into bullet items on commas, the separator that field is
// actually authored with (unlike entryRequirements, which uses semicolons).
export function getIntakeDisplay(intakeMonths: string): { value: string; bullets?: string[] } {
  if (isMonthList(intakeMonths)) return { value: formatIntakeMonths(intakeMonths) }
  const bullets = intakeMonths.split(',').map((s) => s.trim()).filter(Boolean)
  return { value: intakeMonths, bullets: bullets.length > 1 ? bullets : undefined }
}

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
