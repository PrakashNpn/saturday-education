// Every country a student can name as a destination: in the consultation form,
// the assessment contact form and the chat lead form. This is the one list to
// edit when a country is added. The Firmli IDs, email labels and chat keyword
// matching all derive from it, so a country cannot be offered in a form yet
// missing from the CRM sync (tests/destinationCountries.test.ts checks this).
//
// `key` is the value forms submit and the database stores in lead rows; it is
// also the message key for the country's name in the forms' dropdowns
// (messages: Landing.consultation.form.country.options.<key>). Keep existing
// keys as they are: saved leads refer to them.

export interface Country {
  key: string
  /** Matches the destination page's slug in the database. */
  slug: string
  /** English name: what counsellors read in emails, the PDF report and AI prompts. */
  name: string
  /** Shorter label for the notification email, where one is customary (UK, USA, UAE). */
  shortName?: string
  /** Firmli's numeric country id, from its destination-countries-dropdown. Absent when Firmli has no such country. */
  firmliId?: number
  /** Firmli's name for the country, used by the AI chatbot's form. Absent when Firmli has none. */
  firmliName?: string
  /** English words in a chat message that mean this country, so the lead form opens with it chosen. */
  mentions: RegExp
}

// Alphabetical by English name, which is the order the dropdowns show.
// Japan and South Korea are offered ahead of their destination pages.
export const COUNTRIES: readonly Country[] = [
  { key: 'australia', slug: 'australia', name: 'Australia', firmliId: 13, firmliName: 'Australia', mentions: /\baustralia\b/i },
  { key: 'belgium', slug: 'belgium', name: 'Belgium', mentions: /\bbelgium\b/i },
  { key: 'canada', slug: 'canada', name: 'Canada', firmliId: 38, firmliName: 'Canada', mentions: /\bcanada\b/i },
  { key: 'china', slug: 'china', name: 'China', firmliId: 44, firmliName: 'China', mentions: /\bchina\b/i },
  { key: 'finland', slug: 'finland', name: 'Finland', firmliId: 74, firmliName: 'Finland', mentions: /\bfinland\b/i },
  { key: 'france', slug: 'france', name: 'France', firmliId: 75, firmliName: 'France', mentions: /\bfrance\b/i },
  { key: 'germany', slug: 'germany', name: 'Germany', firmliId: 82, firmliName: 'Germany', mentions: /\bgermany\b/i },
  { key: 'grenada', slug: 'grenada', name: 'Grenada', mentions: /\bgrenada\b/i },
  { key: 'hungary', slug: 'hungary', name: 'Hungary', firmliId: 99, firmliName: 'Hungary', mentions: /\bhungary\b/i },
  { key: 'ireland', slug: 'ireland', name: 'Ireland', firmliId: 105, firmliName: 'Ireland', mentions: /\bireland\b/i },
  { key: 'italy', slug: 'italy', name: 'Italy', firmliId: 107, firmliName: 'Italy', mentions: /\bitaly\b/i },
  { key: 'japan', slug: 'japan', name: 'Japan', firmliId: 109, firmliName: 'Japan', mentions: /\bjapan\b/i },
  { key: 'malaysia', slug: 'malaysia', name: 'Malaysia', firmliId: 132, firmliName: 'Malaysia', mentions: /\bmalaysia\b/i },
  { key: 'netherlands', slug: 'netherlands', name: 'Netherlands', firmliId: 155, firmliName: 'Netherlands', mentions: /\b(netherlands|holland)\b/i },
  { key: 'newZealand', slug: 'new-zealand', name: 'New Zealand', firmliId: 157, firmliName: 'New Zealand', mentions: /\bnew zealand\b/i },
  { key: 'singapore', slug: 'singapore', name: 'Singapore', firmliId: 196, firmliName: 'Singapore', mentions: /\bsingapore\b/i },
  { key: 'korea', slug: 'south-korea', name: 'South Korea', firmliId: 116, firmliName: 'South Korea', mentions: /\b(south )?korea\b/i },
  { key: 'spain', slug: 'spain', name: 'Spain', firmliId: 205, firmliName: 'Spain', mentions: /\bspain\b/i },
  { key: 'switzerland', slug: 'switzerland', name: 'Switzerland', firmliId: 212, firmliName: 'Switzerland', mentions: /\bswitzerland\b/i },
  { key: 'thailand', slug: 'thailand', name: 'Thailand', firmliId: 217, firmliName: 'Thailand', mentions: /\bthailand\b/i },
  { key: 'uae', slug: 'uae', name: 'United Arab Emirates', shortName: 'UAE', firmliId: 229, firmliName: 'United Arab Emirates', mentions: /\b(uae|dubai|emirates)\b/i },
  { key: 'uk', slug: 'united-kingdom', name: 'United Kingdom', shortName: 'UK', firmliId: 230, firmliName: 'United Kingdom', mentions: /\b(uk|u\.k\.|united kingdom|britain|england|scotland)\b/i },
  { key: 'usa', slug: 'united-states', name: 'United States', shortName: 'USA', firmliId: 231, firmliName: 'United States', mentions: /\b(usa|u\.s\.a?\.?|united states|america)\b/i },
  { key: 'vietnam', slug: 'vietnam', name: 'Vietnam', firmliId: 238, firmliName: 'Vietnam', mentions: /\bviet ?nam\b/i },
]

/** Offered after the countries in every form; sent to the CRM with no destination. */
export const OTHER_COUNTRY = 'other'

export const COUNTRY_KEYS: readonly string[] = COUNTRIES.map((c) => c.key)

export function isCountryKey(value: unknown): boolean {
  return typeof value === 'string' && COUNTRY_KEYS.includes(value)
}

export function countryByKey(key: string | null | undefined): Country | undefined {
  return COUNTRIES.find((c) => c.key === key)
}

/** The short label a counsellor sees in the notification email. A key that is no
 *  longer offered (an older lead) is shown as stored. */
export function countryLabel(key: string): string {
  if (key === OTHER_COUNTRY) return 'Other'
  const country = countryByKey(key)
  return country ? (country.shortName ?? country.name) : key
}

/** The English country name for what a form submitted: a key becomes its name,
 *  "other" stays "Other", and anything else (text from an older saved form) passes through. */
export function countryNameFor(value: string): string {
  if (value === OTHER_COUNTRY) return 'Other'
  return countryByKey(value)?.name ?? value
}

/** The destination the student most recently named in a chat, so the lead form opens with it chosen. */
export function guessCountryKey(said: string[]): string | undefined {
  for (let i = said.length - 1; i >= 0; i--) {
    const hit = COUNTRIES.find((c) => c.mentions.test(said[i]))
    if (hit) return hit.key
  }
  return undefined
}
