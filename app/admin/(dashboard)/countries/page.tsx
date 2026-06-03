import Link from 'next/link'
import { getAllCountries } from '@/features/admin/services/admin-service'

export const metadata = { title: 'Countries — Admin' }

export default async function CountriesPage() {
  const countries = await getAllCountries()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Countries</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map(c => (
          <Link
            key={c.slug}
            href={`/admin/countries/${c.slug}`}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
              {c.cardImageUrl ? (
                <img src={c.cardImageUrl} alt={c.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">No img</div>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-400">{c.region} · {c._count.universities} universities</p>
              {(!c.cardImageUrl || !c.heroImageUrl) && (
                <span className="mt-1 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                  Missing images
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
