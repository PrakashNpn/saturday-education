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
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/course-finder', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/career-assessment', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/grade-converter', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/imat-practice-test', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/csca', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/canada-education-event', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
]

export type SitemapCountry = {
  slug: string
  /** When the country row was last edited — used as sitemap lastmod. */
  updatedAt?: Date
}

export type SitemapGuide = {
  slug: string
  /** When the guide row was last edited — used as sitemap lastmod. */
  updatedAt?: Date
}

interface Options {
  baseUrl: string
  locales: readonly string[]
  defaultLocale: string
  /** Published country pages (slug + optional last-edit time). */
  countrySlugs: readonly (string | SitemapCountry)[]
  /** Published English guide pages (body is EN-only in Phase B v1). */
  guideSlugs?: readonly (string | SitemapGuide)[]
  now: Date
}

/**
 * One sitemap entry per page, each listing every language version of itself so
 * search engines can match the languages up. The default language has no prefix in
 * its URL; the others do.
 */
export function buildSitemapEntries({
  baseUrl,
  locales,
  defaultLocale,
  countrySlugs,
  guideSlugs = [],
  now,
}: Options): MetadataRoute.Sitemap {
  const urlFor = (locale: string, path: string) =>
    locale === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`

  const countries = countrySlugs.map((entry) =>
    typeof entry === 'string' ? { slug: entry, updatedAt: undefined as Date | undefined } : entry,
  )
  const guides = guideSlugs.map((entry) =>
    typeof entry === 'string' ? { slug: entry, updatedAt: undefined as Date | undefined } : entry,
  )

  const pages: Array<SitemapPage & { lastModified: Date }> = [
    ...STATIC_PAGES.map((page) => ({ ...page, lastModified: now })),
    ...countries.map((country) => ({
      path: `/destinations/${country.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: country.updatedAt ?? now,
    })),
    ...guides.map((guide) => ({
      path: `/guides/${guide.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: guide.updatedAt ?? now,
    })),
  ]

  return pages.map((page) => ({
    url: urlFor(defaultLocale, page.path),
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, urlFor(locale, page.path)])),
    },
  }))
}
