import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saturdayeducation.com'
  const now = new Date()

  const staticPages = [
    { path: '',             priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/universities', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/destinations', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/blog',         priority: 0.7, changeFrequency: 'daily'  as const },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.path}`,
          th: `${baseUrl}/th${page.path}`,
          my: `${baseUrl}/my${page.path}`,
        },
      },
    })
  }

  return entries
}
