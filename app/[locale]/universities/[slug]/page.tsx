import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { UniversityDetailPage, getAllUniversitySlugs, getUniversityBySlug } from '@/features/university'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllUniversitySlugs()
  return slugs.map((s) => ({ slug: s.slug }))
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
  return <UniversityDetailPage slug={slug} />
}
