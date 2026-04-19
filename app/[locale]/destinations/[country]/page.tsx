import { notFound } from 'next/navigation'
import { DestinationDetailPage, getAllCountrySlugs, getCountryBySlug } from '@/features/destination'

type Props = { params: Promise<{ country: string }> }

export async function generateStaticParams() {
  const slugs = await getAllCountrySlugs()
  return slugs.map((s) => ({ country: s.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { country: slug } = await params
  const country = await getCountryBySlug(slug)
  if (!country) return {}
  return {
    title: `Study in ${country.name} | Saturday Education`,
    description: country.overview?.slice(0, 160),
  }
}

export default async function Page({ params }: Props) {
  const { country: slug } = await params
  return <DestinationDetailPage slug={slug} />
}
