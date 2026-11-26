import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import { metaDescriptionFromOverview } from '@/shared/lib/seo/metaDescription'
import { DestinationDetailPage, getAllCountrySlugs, getCountryBySlug } from '@/features/destination'

type Props = { params: Promise<{ locale: string; country: string }> }

// Rebuilt in the background at most once a day, so a content edit made in the database
// shows within a day without a deploy.
export const revalidate = 86400

/** Unknown slugs must 404 instead of soft-rendering an empty page. */
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getAllCountrySlugs()
  return slugs.map((s) => ({ country: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country: slug } = await params
  setRequestLocale(locale)
  const [country, t] = await Promise.all([
    getCountryBySlug(slug, locale),
    getTranslations({ locale, namespace: 'metadata' }),
  ])
  if (!country) notFound()
  return pageMetadata({
    locale,
    path: `/destinations/${slug}`,
    title: t('destinationDetail.title', { country: country.name }),
    description: metaDescriptionFromOverview(country.overview),
  })
}

export default async function Page({ params }: Props) {
  const { locale, country: slug } = await params
  setRequestLocale(locale)
  return <DestinationDetailPage slug={slug} />
}
