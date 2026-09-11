import { setRequestLocale } from 'next-intl/server'
import { DestinationDetailPage, getAllCountrySlugs, getCountryBySlug } from '@/features/destination'

type Props = { params: Promise<{ locale: string; country: string }> }

export async function generateStaticParams() {
  const slugs = await getAllCountrySlugs()
  return slugs.map((s) => ({ country: s.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, country: slug } = await params
  setRequestLocale(locale)
  const country = await getCountryBySlug(slug)
  if (!country) return {}
  return {
    title: `Study in ${country.name} | Saturday Education`,
    description: country.overview?.slice(0, 160),
  }
}

export default async function Page({ params }: Props) {
  const { locale, country: slug } = await params
  setRequestLocale(locale)
  return <DestinationDetailPage slug={slug} />
}
