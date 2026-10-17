import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { localizedPath, pageMetadata } from '../shared/lib/seo/metadata'
import { LANGUAGES, LOCALE_CODES } from '../i18n/languages'
import { routing } from '../i18n/routing'

const root = path.join(__dirname, '..')
const messages = (locale: string) => JSON.parse(fs.readFileSync(path.join(root, 'messages', `${locale}.json`), 'utf8'))

describe('localizedPath', () => {
  test('the default language has no prefix and the others do', () => {
    assert.equal(localizedPath('en', ''), '/')
    assert.equal(localizedPath('en', '/about'), '/about')
    assert.equal(localizedPath('th', ''), '/th')
    assert.equal(localizedPath('vi', '/destinations/canada'), '/vi/destinations/canada')
  })
})

describe('pageMetadata', () => {
  const meta = pageMetadata({ locale: 'th', path: '/about', title: 'About Us', description: 'Who we are' })
  const alternates = meta.alternates as { canonical: string; languages: Record<string, string> }

  test('the canonical address is the page in its own language', () => {
    assert.equal(alternates.canonical, '/th/about')
    assert.equal(pageMetadata({ locale: 'en', path: '', title: { absolute: 'Home' } }).alternates?.canonical, '/')
  })

  test('lists every language plus x-default (the default language)', () => {
    assert.deepEqual(Object.keys(alternates.languages).sort(), [...routing.locales, 'x-default'].sort())
    assert.equal(alternates.languages['x-default'], '/about')
    assert.equal(alternates.languages.vi, '/vi/about')
  })

  test('the link preview carries the page address, language and the other languages', () => {
    const og = meta.openGraph as { url: string; locale: string; alternateLocale: string[]; title: string; siteName: string; type: string }
    assert.equal(og.url, '/th/about')
    assert.equal(og.locale, 'th_TH')
    assert.equal(og.alternateLocale.length, LOCALE_CODES.length - 1)
    assert.ok(!og.alternateLocale.includes('th_TH'))
    assert.equal(og.siteName, 'Saturday Education')
    assert.equal(og.type, 'website')
  })

  test('a plain title gets the brand in the preview, an absolute title is used as it is', () => {
    assert.equal((meta.openGraph as { title: string }).title, 'About Us | Saturday Education')
    const home = pageMetadata({ locale: 'en', path: '', title: { absolute: 'Saturday Education Consulting - Making Study Abroad Meaningful' } })
    assert.equal((home.openGraph as { title: string }).title, 'Saturday Education Consulting - Making Study Abroad Meaningful')
    assert.deepEqual(home.title, { absolute: 'Saturday Education Consulting - Making Study Abroad Meaningful' })
  })

  test('the Twitter card is the large-image kind', () => {
    assert.equal((meta.twitter as { card: string }).card, 'summary_large_image')
  })
})

describe('registry and messages', () => {
  test('every language has an Open Graph locale like th_TH', () => {
    for (const code of LOCALE_CODES) assert.match(LANGUAGES[code].ogLocale, /^[a-z]{2,3}_[A-Z]{2}$/, code)
  })

  test('page titles do not repeat the brand: the root layout adds it', () => {
    for (const locale of LOCALE_CODES) {
      const md = messages(locale).metadata as Record<string, { title?: string }>
      for (const [key, value] of Object.entries(md)) {
        if (key === 'home' || !value.title) continue
        assert.ok(!/Saturday Education\s*$/.test(value.title), `${locale}: metadata.${key}.title already ends with the brand`)
      }
    }
  })

  test('every language has the country page title with its {country} placeholder', () => {
    for (const locale of LOCALE_CODES) {
      assert.ok(messages(locale).metadata.destinationDetail.title.includes('{country}'), locale)
    }
  })

  test('the legal pages keep their brand out of the title text too', () => {
    for (const page of ['privacy', 'terms']) {
      const source = fs.readFileSync(path.join(root, 'app/[locale]', page, 'page.tsx'), 'utf8')
      assert.ok(!/title: '[^']*Saturday Education'/.test(source), `${page} title repeats the brand`)
    }
  })
})

describe('link preview image', () => {
  test('pages point at a 1200 by 630 JPEG that exists, with alt text', async () => {
    const meta = pageMetadata({ locale: 'en', path: '/about', title: 'About Us' })
    const image = (meta.openGraph as { images: { url: string; width: number; height: number; alt: string }[] }).images[0]
    assert.equal(image.url, '/images/og/default.jpg')
    assert.ok(image.alt.length > 10)
    assert.deepEqual((meta.twitter as { images: string[] }).images, [image.url])
    const file = path.join(root, 'public', image.url)
    assert.ok(fs.existsSync(file))
    const sharp = (await import('sharp')).default
    const info = await sharp(file).metadata()
    assert.deepEqual([info.width, info.height, info.format], [image.width, image.height, 'jpeg'])
  })
})
