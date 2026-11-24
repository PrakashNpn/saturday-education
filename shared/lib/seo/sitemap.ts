import type { MetadataRoute } from 'next'

export interface SitemapPage {
  /** Path without the language prefix; '' is the home page. */
  path: string
  priority: number
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
}

/** The pages that exist once per language and do not depend on the database. */
export const STATIC_PAGES: SitemapPage[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/destinations', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/course-finder', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/career-assessment', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/grade-converter', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/imat-practice-test', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/csca', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/canada-education-event', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
]

interface Options {
  baseUrl: string
  locales: readonly string[]
  defaultLocale: string
  /** Slugs of the published country pages. */
  countrySlugs: readonly string[]
  now: Date
}

/**
 * One sitemap entry per page, each listing every language version of itself so
 * search engines can match the languages up. The default language has no prefix in
 * its URL; the others do.
 */
export function buildSitemapEntries({ baseUrl, locales, defaultLocale, countrySlugs, now }: Options): MetadataRoute.Sitemap {
  const urlFor = (locale: string, path: string) =>
    locale === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`

  const pages: SitemapPage[] = [
    ...STATIC_PAGES,
    ...countrySlugs.map((slug) => ({ path: `/destinations/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const })),
  ]

  return pages.map((page) => ({
    url: urlFor(defaultLocale, page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, urlFor(locale, page.path)])),
    },
  }))
}
