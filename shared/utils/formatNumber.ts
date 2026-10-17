import { languageOf } from '@/i18n/languages'

// Vietnamese and Indonesian group thousands with a dot (64.698) and Filipino with
// a comma, as Filipino readers expect. English, Thai and Burmese keep the
// comma grouping the site has always used. The locale is named outright, never
// read from the server, so the number does not depend on which machine rendered
// the page. The locale for each language is in i18n/languages.ts.
export function formatNumber(value: number, locale: string): string {
  return value.toLocaleString(languageOf(locale).numberLocale)
}
