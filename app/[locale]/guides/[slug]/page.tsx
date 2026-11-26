import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import {
  GuideDetailPage,
  getPublishedGuideBySlug,
  getPublishedGuideSlugs,
  guideShareImage,
} from '@/features/guides'
import { pageMetadata } from '@/shared/lib/seo/metadata'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 86400

// dynamicParams stays at the Next default (true) so a guide published in
// Supabase after deploy can still resolve on demand; unpublished/unknown
// slugs call notFound() below and must not soft-render.

export async function generateStaticParams() {
  try {
    const guides = await getPublishedGuideSlugs()
    return guides.map((g) => ({ slug: g.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const guide = await getPublishedGuideBySlug(slug)
  if (!guide) notFound()
  const share = guideShareImage(guide)
  return pageMetadata({
    locale,
    path: `/guides/${slug}`,
    title: guide.seoTitle,
    description: guide.metaDescription,
    ...(share ? { image: share } : {}),
  })
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  return <GuideDetailPage slug={slug} locale={locale} />
}
