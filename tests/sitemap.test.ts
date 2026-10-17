import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSitemapEntries, STATIC_PAGES } from '../shared/lib/seo/sitemap'
import { routing } from '../i18n/routing'

const baseUrl = 'https://www.example.com'
const countrySlugs = ['canada', 'united-kingdom', 'new-zealand']
const entries = buildSitemapEntries({
  baseUrl,
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  countrySlugs,
  now: new Date('2026-10-17T00:00:00Z'),
})

describe('sitemap entries', () => {
  test('lists every fixed page and every country page once', () => {
    assert.equal(entries.length, STATIC_PAGES.length + countrySlugs.length)
    const urls = entries.map((e) => e.url)
    assert.equal(new Set(urls).size, urls.length)
    for (const page of ['', '/about', '/destinations', '/course-finder', '/career-assessment', '/privacy', '/terms']) {
      assert.ok(urls.includes(`${baseUrl}${page}`), `missing ${page || 'home'}`)
    }
    for (const slug of countrySlugs) assert.ok(urls.includes(`${baseUrl}/destinations/${slug}`), `missing ${slug}`)
  })

  test('every URL is absolute and has no trailing slash', () => {
    for (const e of entries) {
      assert.match(e.url, /^https:\/\/www\.example\.com/)
      assert.ok(!e.url.endsWith('/'))
      for (const href of Object.values(e.alternates?.languages ?? {})) {
        assert.match(href as string, /^https:\/\/www\.example\.com/)
        assert.ok(!(href as string).endsWith('/'))
      }
    }
  })

  test('each page lists all six languages, with only the default language unprefixed', () => {
    for (const e of entries) {
      const langs = e.alternates?.languages as Record<string, string>
      assert.deepEqual(Object.keys(langs).sort(), [...routing.locales].sort())
      const path = e.url.slice(baseUrl.length)
      assert.equal(langs.en, e.url)
      for (const l of routing.locales.filter((x) => x !== 'en')) assert.equal(langs[l], `${baseUrl}/${l}${path}`)
    }
  })

  test('the home page has the top priority and legal pages the lowest', () => {
    const p = (path: string) => entries.find((e) => e.url === `${baseUrl}${path}`)!.priority!
    assert.equal(p(''), 1)
    assert.ok(p('/privacy') < p('/about') && p('/terms') < p('/destinations'))
  })

  test('with no countries (database unreachable) it still lists the fixed pages', () => {
    const none = buildSitemapEntries({ baseUrl, locales: routing.locales, defaultLocale: 'en', countrySlugs: [], now: new Date() })
    assert.equal(none.length, STATIC_PAGES.length)
  })
})
