import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCountryBySlug } from '@/features/admin/services/admin-service'
import ImageUrlField from '@/features/admin/components/ImageUrlField'
import CountryEditForm from '@/features/admin/components/CountryEditForm'

export default async function CountryEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const country = await getCountryBySlug(slug)
  if (!country) notFound()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/countries" className="text-sm text-gray-400 hover:text-gray-600">← Countries</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-semibold text-gray-900">{country.name}</h1>
      </div>

      <CountryEditForm country={country} />
    </div>
  )
}
