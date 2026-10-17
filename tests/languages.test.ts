// The language registry (i18n/languages.ts) is the source for routing, the switcher,
// number formats, phone defaults, fonts and AI model choice. These checks keep it
// consistent with the files that have to exist for each language.
import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  DEFAULT_LOCALE,
  LANGUAGES,
  LOCALE_CODES,
  TRANSLATION_LOCALES,
  isTranslationLocale,
  languageOf,
} from '../i18n/languages'
import { routing } from '../i18n/routing'
import { modelForLocale } from '../shared/lib/ai/models'
import { formatNumber } from '../shared/utils/formatNumber'

const root = path.join(__dirname, '..')

describe('language registry', () => {
  test('routing uses exactly the registry languages, with English as the default', () => {
    assert.deepEqual([...routing.locales], LOCALE_CODES)
    assert.equal(routing.defaultLocale, 'en')
    assert.equal(DEFAULT_LOCALE, 'en')
  })

  test('every language has a message file, and every message file has a language', () => {
    const files = fs.readdirSync(path.join(root, 'messages')).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
    assert.deepEqual([...files].sort(), [...LOCALE_CODES].sort())
  })

  test('every language offered in the switcher has a flag file', () => {
    for (const code of LOCALE_CODES) {
      if (!LANGUAGES[code].inSwitcher) continue
      assert.ok(fs.existsSync(path.join(root, 'public', 'images', 'flags', `${LANGUAGES[code].flag}.png`)), `${code}: missing flag`)
    }
  })

  test('English is always in the switcher and translation locales exclude it', () => {
    assert.equal(LANGUAGES.en.inSwitcher, true)
    assert.ok(!(TRANSLATION_LOCALES as readonly string[]).includes('en'))
    assert.equal(TRANSLATION_LOCALES.length, LOCALE_CODES.length - 1)
  })

  test('isTranslationLocale accepts translated locales only', () => {
    for (const code of TRANSLATION_LOCALES) assert.equal(isTranslationLocale(code), true)
    for (const bad of ['en', 'xx', '', undefined, null]) assert.equal(isTranslationLocale(bad), false)
  })

  test('unknown locales get English facts', () => {
    assert.equal(languageOf('xx').aiName, 'English')
    assert.equal(languageOf(undefined).phoneCountry, 'MM')
  })
})

describe('what the registry drives', () => {
  test('number formats follow the registry', () => {
    assert.equal(formatNumber(1234567, 'vi'), '1.234.567')
    assert.equal(formatNumber(1234567, 'id'), '1.234.567')
    assert.equal(formatNumber(1234567, 'fil'), '1,234,567')
    assert.equal(formatNumber(1234567, 'th'), '1,234,567')
    assert.equal(formatNumber(1234567, 'xx'), '1,234,567')
  })

  test('Burmese and Filipino use the stronger model, everything else the fast one', () => {
    const strong = modelForLocale('my')
    assert.equal(modelForLocale('fil'), strong)
    const fast = modelForLocale('en')
    assert.notEqual(fast, strong)
    for (const code of ['th', 'vi', 'id', undefined, 'xx']) assert.equal(modelForLocale(code), fast)
  })

  test('phone defaults: Myanmar for English and Burmese, the home country for the rest', () => {
    assert.deepEqual(
      LOCALE_CODES.map((c) => [c, LANGUAGES[c].phoneCountry]),
      [['en', 'MM'], ['th', 'TH'], ['my', 'MM'], ['vi', 'VN'], ['fil', 'PH'], ['id', 'ID']],
    )
  })
})

describe('language detection', () => {
  test('the plain address never redirects by browser language', () => {
    assert.equal((routing as { localeDetection?: boolean }).localeDetection, false)
  })
})
