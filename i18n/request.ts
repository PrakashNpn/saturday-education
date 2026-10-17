import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import en from '../messages/en.json'

type Messages = { [key: string]: string | Messages }

/** `override` laid over `base`, key by key. A key the language file lacks (or
 *  leaves empty) keeps its English text, so a language that is only partly
 *  translated shows English there instead of a raw key name. */
function withFallback(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base }
  for (const [key, value] of Object.entries(override)) {
    const current = result[key]
    if (typeof value === 'string') {
      if (value !== '') result[key] = value
    } else if (current && typeof current === 'object') {
      result[key] = withFallback(current, value)
    } else {
      result[key] = value
    }
  }
  return result
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale
  }

  if (locale === 'en') return { locale, messages: en }

  const messages = (await import(`../messages/${locale}.json`)).default as Messages
  return { locale, messages: withFallback(en as Messages, messages) }
})
