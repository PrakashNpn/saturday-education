import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
// HIDDEN: getAllUniversitySlugs unused while universities feature is disabled — restore in the import below
import { UniversityDetailPage, /* getAllUniversitySlugs, */ getUniversityBySlug } from '@/features/university'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  // HIDDEN: universities feature temporarily disabled — restore the two lines below to re-enable prerendering
  // const slugs = await getAllUniversitySlugs()
  // return slugs.map((s) => ({ slug: s.slug }))
  return []
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const university = await getUniversityBySlug(slug)
  if (!university) return {}
  return {
    title: `${university.name} | Saturday Education`,
    description: university.shortDescription ?? university.overview?.slice(0, 160),
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  // HIDDEN: universities feature temporarily disabled — remove this line to restore
  notFound()
  return <UniversityDetailPage slug={slug} />
}
