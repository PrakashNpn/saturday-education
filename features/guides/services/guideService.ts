import 'server-only'
import { prisma } from '@/shared/lib/db/prisma'
import type { GuideCardData, GuideDetailData } from '../types'

function toCard(row: {
  id: string
  slug: string
  title: string
  metaDescription: string
  publishedAt: Date | null
  updatedAt: Date
  relatedDestinationSlug: string | null
  heroImageUrl: string | null
  heroImageAlt: string | null
}): GuideCardData {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    metaDescription: row.metaDescription,
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt,
    relatedDestinationSlug: row.relatedDestinationSlug,
    heroImageUrl: row.heroImageUrl,
    heroImageAlt: row.heroImageAlt,
  }
}

const cardSelect = {
  id: true,
  slug: true,
  title: true,
  metaDescription: true,
  publishedAt: true,
  updatedAt: true,
  relatedDestinationSlug: true,
  heroImageUrl: true,
  heroImageAlt: true,
} as const

/** Published guides for the hub and sitemap, newest publish first within sort_order. */
export async function getPublishedGuides(): Promise<GuideCardData[]> {
  const rows = await prisma.guide.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }],
    select: cardSelect,
  })
  return rows.map(toCard)
}

/** Slugs (+ last edit) for static params and sitemap lastmod. */
export async function getPublishedGuideSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return prisma.guide.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function getPublishedGuideBySlug(slug: string): Promise<GuideDetailData | null> {
  const row = await prisma.guide.findFirst({
    where: { slug, isPublished: true },
    include: {
      faqs: { orderBy: { sortOrder: 'asc' } },
    },
  })
  if (!row) return null

  return {
    ...toCard(row),
    seoTitle: row.seoTitle,
    answerBox: row.answerBox,
    bodyMarkdown: row.bodyMarkdown,
    sourcesMarkdown: row.sourcesMarkdown,
    keywords: row.keywords,
    authorName: row.authorName,
    authorTitle: row.authorTitle,
    inlineImageUrl: row.inlineImageUrl,
    inlineImageAlt: row.inlineImageAlt,
    ogImageUrl: row.ogImageUrl,
    faqs: row.faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    })),
  }
}
