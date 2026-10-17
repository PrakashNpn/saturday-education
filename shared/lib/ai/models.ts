import { languageOf } from '@/i18n/languages'

const FAST_MODEL = 'claude-haiku-4-5-20251001'
const STRONG_MODEL = 'claude-sonnet-4-6'

/** The model for an AI feature that answers in the student's language. Haiku
 *  writes broken Burmese and slips into English for Filipino, so the languages
 *  flagged `strongModel` in i18n/languages.ts get Sonnet. */
export function modelForLocale(locale: string | null | undefined): string {
  return languageOf(locale).strongModel ? STRONG_MODEL : FAST_MODEL
}
