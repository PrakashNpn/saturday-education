import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saturdayeducation.com'
  const now = new Date()

  const staticPages = [
    { path: '',                   priority: 1.0, changeFrequency: 'weekly'  as const },
    { path: '/career-assessment', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/course-finder',     priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/destinations',      priority: 0.8, changeFrequency: 'weekly'  as const },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            locale === routing.defaultLocale ? `${baseUrl}${page.path}` : `${baseUrl}/${locale}${page.path}`,
          ]),
        ),
      },
    })
  }

  return entries
}
