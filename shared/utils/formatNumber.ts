// Vietnamese and Indonesian group thousands with a dot (64.698) and Filipino with
// a comma, as Filipino readers expect. English, Thai and Burmese keep the
// comma grouping the site has always used. The locale is named outright, never
// read from the server, so the number does not depend on which machine rendered
// the page.
const NUMBER_LOCALE: Record<string, string> = { vi: 'vi-VN', id: 'id-ID', fil: 'fil-PH' }

export function formatNumber(value: number, locale: string): string {
  return value.toLocaleString(NUMBER_LOCALE[locale] ?? 'en-US')
}
