/** Destinations the lead form offers. Each has a Firmli country id, so a lead
 *  with one of these reaches the CRM with its destination set. */
export const LEAD_COUNTRIES = [
  'uk',
  'usa',
  'australia',
  'canada',
  'newZealand',
  'singapore',
  'switzerland',
  'ireland',
  'thailand',
  'germany',
  'malaysia',
  'netherlands',
  'uae',
  'spain',
] as const

const COUNTRY_PATTERNS: [string, RegExp][] = [
  ['uk', /\b(uk|u\.k\.|united kingdom|britain|england|scotland)\b/i],
  ['usa', /\b(usa|u\.s\.a?\.?|united states|america)\b/i],
  ['australia', /\baustralia\b/i],
  ['canada', /\bcanada\b/i],
  ['newZealand', /\bnew zealand\b/i],
  ['singapore', /\bsingapore\b/i],
  ['switzerland', /\bswitzerland\b/i],
  ['ireland', /\bireland\b/i],
  ['thailand', /\bthailand\b/i],
  ['germany', /\bgermany\b/i],
  ['malaysia', /\bmalaysia\b/i],
  ['netherlands', /\b(netherlands|holland)\b/i],
  ['uae', /\b(uae|dubai|emirates)\b/i],
  ['spain', /\bspain\b/i],
]

/** The destination the student most recently named, so the form opens with it
 *  already chosen. English only: anything else just leaves the field empty. */
export function guessCountry(said: string[]): string | undefined {
  for (let i = said.length - 1; i >= 0; i--) {
    const hit = COUNTRY_PATTERNS.find(([, re]) => re.test(said[i]))
    if (hit) return hit[0]
  }
  return undefined
}
