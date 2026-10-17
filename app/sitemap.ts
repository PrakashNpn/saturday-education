import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getAllCountrySlugs } from '@/features/destination'
import { SITE_URL } from '@/shared/constants/site'
import { buildSitemapEntries } from '@/shared/lib/seo/sitemap'

// Rebuilt in the background at most once a day, so a country published in the
// database appears in the sitemap within a day.
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let countrySlugs: string[] = []
  try {
    countrySlugs = (await getAllCountrySlugs()).map((c) => c.slug)
  } catch (error) {
    // The database being unreachable at build time should not break the build; the
    // sitemap then lists the fixed pages and gets the countries on its next rebuild.
    console.error('Sitemap: could not read the country list:', error)
  }

  return buildSitemapEntries({
    baseUrl: SITE_URL,
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    countrySlugs,
    now: new Date(),
  })
}
