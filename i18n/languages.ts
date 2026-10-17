// The one place that says which languages the site has and the facts about each
// one that more than one file needs. To add a language: add it here, add
// messages/<code>.json, and add its entry to the per-language prompt and text
// maps (tests/languages.test.ts lists every map that needs one). Texts that
// belong to a single feature (an AI prompt's wording, a fallback message) stay
// beside that feature; only shared facts live here.

export type Script = 'latin' | 'thai' | 'myanmar' | 'vietnamese'

export interface LanguageInfo {
  /** The language's own name, shown in the language switcher. */
  nativeName: string
  /** Country flag file in /images/flags used for the switcher; not always the locale code. */
  flag: string
  /** Offered in the language switcher. Myanmar is a real routed locale held back until reviewed. */
  inSwitcher: boolean
  /** Intl locale used to group digits; named outright so output never depends on the server. */
  numberLocale: string
  /** Dial code pre-selected in phone fields. English and Burmese use Myanmar: the site's main audience. */
  phoneCountry: 'MM' | 'TH' | 'VN' | 'PH' | 'ID'
  /** Which font family the script needs (see [locale]/layout.tsx). */
  script: Script
  /** Open Graph locale code, used in link previews. */
  ogLocale: string
  /** The name an AI prompt uses for the language. */
  aiName: string
  /** Haiku writes this language badly, so AI features use the stronger model. */
  strongModel: boolean
  /** Thai and Burmese spend many more tokens per sentence, so AI replies get a larger limit. */
  longOutput: boolean
}

export const LANGUAGES = {
  en: { nativeName: 'English', flag: 'gb', inSwitcher: true, numberLocale: 'en-US', phoneCountry: 'MM', script: 'latin', ogLocale: 'en_US', aiName: 'English', strongModel: false, longOutput: false },
  th: { nativeName: 'ไทย', flag: 'th', inSwitcher: true, numberLocale: 'en-US', phoneCountry: 'TH', script: 'thai', ogLocale: 'th_TH', aiName: 'Thai', strongModel: false, longOutput: true },
  // No mm.png flag file exists yet: add /images/flags/mm.png before turning inSwitcher on (a test checks).
  my: { nativeName: 'မြန်မာ', flag: 'mm', inSwitcher: false, numberLocale: 'en-US', phoneCountry: 'MM', script: 'myanmar', ogLocale: 'my_MM', aiName: 'Burmese', strongModel: true, longOutput: true },
  vi: { nativeName: 'Tiếng Việt', flag: 'vn', inSwitcher: true, numberLocale: 'vi-VN', phoneCountry: 'VN', script: 'vietnamese', ogLocale: 'vi_VN', aiName: 'Vietnamese', strongModel: false, longOutput: false },
  fil: { nativeName: 'Filipino', flag: 'ph', inSwitcher: true, numberLocale: 'fil-PH', phoneCountry: 'PH', script: 'latin', ogLocale: 'fil_PH', aiName: 'Filipino', strongModel: true, longOutput: false },
  id: { nativeName: 'Bahasa Indonesia', flag: 'id', inSwitcher: true, numberLocale: 'id-ID', phoneCountry: 'ID', script: 'latin', ogLocale: 'id_ID', aiName: 'Indonesian', strongModel: false, longOutput: false },
} as const satisfies Record<string, LanguageInfo>

export type LocaleCode = keyof typeof LANGUAGES
export const DEFAULT_LOCALE: LocaleCode = 'en'
export const LOCALE_CODES = Object.keys(LANGUAGES) as LocaleCode[]

/** Every language except the English the content is written in. */
export type TranslationLocale = Exclude<LocaleCode, 'en'>
export const TRANSLATION_LOCALES = LOCALE_CODES.filter((c): c is TranslationLocale => c !== 'en')

/** The facts for a locale string from a request; anything unrecognised gets English. */
export function languageOf(locale: string | null | undefined): LanguageInfo {
  return (locale && locale in LANGUAGES ? LANGUAGES[locale as LocaleCode] : LANGUAGES.en) as LanguageInfo
}

export function isTranslationLocale(locale: unknown): locale is TranslationLocale {
  return (TRANSLATION_LOCALES as readonly unknown[]).includes(locale)
}
