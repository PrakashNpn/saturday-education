import { notFound } from 'next/navigation'
import { UniversityDetailPage, getAllUniversitySlugs, getUniversityBySlug } from '@/features/university'

export async function generateStaticParams() {
  const slugs = await getAllUniversitySlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const university = await getUniversityBySlug(slug)
  if (!university) return {}
  return {
    title: `${university.name} | Saturday Education`,
    description: university.shortDescription ?? university.overview?.slice(0, 160),
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <UniversityDetailPage slug={slug} />
}
