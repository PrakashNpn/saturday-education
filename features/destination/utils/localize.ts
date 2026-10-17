import type { TranslationLocale } from '@/i18n/languages'

/** The translated columns for one piece of text, keyed by locale. */
export type Translations = Partial<Record<TranslationLocale, string | null>>

/**
 * Picks the translated value for `locale`, falling back to the English
 * `base` when that field hasn't been translated for this country yet (the
 * translation columns are null until someone fills them in). English itself
 * has no override column, so it always resolves to `base`. An empty string
 * counts as untranslated, so a blank cell never blanks the page. Generic so a
 * non-nullable base (e.g. a FAQ's `question`) still types as non-nullable
 * coming out, not widened to `string | null`.
 */
export function localize<T extends string | null>(base: T, translations: Translations, locale: string): T {
  const value = (translations as Record<string, string | null | undefined>)[locale]
  return value != null && value !== '' ? (value as T) : base
}

/** The five translation columns every translated field carries (th, my, vi, fil, idn). */
export const columns = (th: string | null, my: string | null, vi: string | null, fil: string | null, idn: string | null): Translations => ({
  th,
  my,
  vi,
  fil,
  id: idn,
})
