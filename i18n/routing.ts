import { defineRouting } from 'next-intl/routing'
import { DEFAULT_LOCALE, LOCALE_CODES } from './languages'

export const routing = defineRouting({
  locales: LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  // No guessing the language from the visitor's browser (or a remembered choice) when
  // they open the plain address: it always opens in English, and people choose another
  // language with the switcher or a link that already contains it (/th/about). Decided
  // in October 2026: guesses are often wrong for this audience (English-set phones),
  // and the translations were still awaiting native-speaker review.
  localeDetection: false,
})
