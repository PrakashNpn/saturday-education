import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getUniversityBySlug } from '@/features/admin/services/admin-service'
import UniversityEditForm from '@/features/admin/components/UniversityEditForm'

export default async function UniversityEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const university = await getUniversityBySlug(slug)
  if (!university) notFound()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/universities" className="text-sm text-gray-400 hover:text-gray-600">← Universities</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-400">{university.country.name}</span>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-semibold text-gray-900">{university.name}</h1>
      </div>

      <UniversityEditForm university={university} />
    </div>
  )
}
