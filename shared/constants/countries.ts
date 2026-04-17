import { getData } from 'country-list'

export interface CountryOption {
  code: string // ISO 3166-1 alpha-2 (e.g. "GB", "US")
  name: string // e.g. "United Kingdom", "United States of America"
}

// Full world country list sorted alphabetically by name
export const ALL_COUNTRIES: CountryOption[] = getData()
  .map(({ code, name }) => ({ code, name }))
  .sort((a, b) => a.name.localeCompare(b.name))

// Helper: get country name from ISO code
export function getCountryName(code: string): string | undefined {
  return ALL_COUNTRIES.find((c) => c.code === code)?.name
}

// Helper: get ISO code from country name
export function getCountryCode(name: string): string | undefined {
  return ALL_COUNTRIES.find((c) => c.name === name)?.code
}
