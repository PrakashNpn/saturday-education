export type GuideCardData = {
  id: string
  slug: string
  title: string
  metaDescription: string
  publishedAt: Date | null
  updatedAt: Date
  relatedDestinationSlug: string | null
  heroImageUrl: string | null
  heroImageAlt: string | null
}

export type GuideFaqData = {
  id: string
  question: string
  answer: string
}

export type GuideDetailData = GuideCardData & {
  seoTitle: string
  answerBox: string | null
  bodyMarkdown: string
  sourcesMarkdown: string | null
  keywords: string | null
  authorName: string
  authorTitle: string
  inlineImageUrl: string | null
  inlineImageAlt: string | null
  ogImageUrl: string | null
  faqs: GuideFaqData[]
}

/**
 * Share / OG image: hero by default. `ogImageUrl` is only an optional override.
 * Guides ship with one content hero image (also used for social previews).
 */
export function guideShareImage(guide: {
  ogImageUrl: string | null
  heroImageUrl: string | null
  heroImageAlt: string | null
  title: string
}): { url: string; width: number; height: number; alt: string } | null {
  const url = guide.ogImageUrl || guide.heroImageUrl
  if (!url) return null
  return {
    url,
    width: 1280,
    height: 720,
    alt: guide.heroImageAlt || guide.title,
  }
}
