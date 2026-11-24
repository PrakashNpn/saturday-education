/** Countries offered in the Expert-style grade converter. Origin-only markets
 *  stay selectable as study countries but not as destinations. */

export type ConverterCountry = {
  key: string
  /** ISO-ish flag file code under /images/flags-svg */
  code: string
  target: boolean
}

export const CONVERTER_COUNTRIES: ConverterCountry[] = [
  { key: 'uk', code: 'GB', target: true },
  { key: 'canada', code: 'CA', target: true },
  { key: 'australia', code: 'AU', target: true },
  { key: 'germany', code: 'DE', target: true },
  { key: 'malaysia', code: 'MY', target: true },
  { key: 'finland', code: 'FI', target: true },
  { key: 'netherlands', code: 'NL', target: true },
  { key: 'newZealand', code: 'NZ', target: true },
  { key: 'hungary', code: 'HU', target: true },
  { key: 'uae', code: 'AE', target: true },
  { key: 'ireland', code: 'IE', target: true },
  { key: 'usa', code: 'US', target: true },
  { key: 'singapore', code: 'SG', target: true },
  { key: 'switzerland', code: 'CH', target: true },
  { key: 'thailand', code: 'TH', target: true },
  { key: 'france', code: 'FR', target: true },
  { key: 'china', code: 'CN', target: true },
  { key: 'italy', code: 'IT', target: true },
  { key: 'spain', code: 'ES', target: true },
  { key: 'grenada', code: 'GD', target: true },
  { key: 'vietnam', code: 'VN', target: true },
  { key: 'belgium', code: 'BE', target: true },
  { key: 'myanmar', code: 'MM', target: false },
  { key: 'philippines', code: 'PH', target: false },
  { key: 'indonesia', code: 'ID', target: false },
]

export const TARGET_COUNTRIES = CONVERTER_COUNTRIES.filter(country => country.target)

export function countryByKey(key: string) {
  return CONVERTER_COUNTRIES.find(country => country.key === key)
}
