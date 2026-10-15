import Link from 'next/link'
import { getAllCountries, getAllUniversities } from '@/features/admin/services/admin-service'
import UniversitySearch from '@/features/admin/components/UniversitySearch'

export const metadata = { title: 'Universities — Admin' }

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; country?: string }>
}) {
  const { q, country } = await searchParams
  const [universities, countries] = await Promise.all([
    getAllUniversities(q, country),
    getAllCountries(),
  ])

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Universities</h1>
        <span className="text-sm text-gray-400">{universities.length} results</span>
      </div>

      <UniversitySearch countries={countries} defaultQ={q} defaultCountry={country} />

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">University</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Country</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Images</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {universities.map(u => (
              <tr key={u.slug} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                      {u.logoUrl ? (
                        <img src={u.logoUrl} alt={u.name} className="h-full w-full object-contain p-0.5" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-300">?</div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.city}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.country.name}</td>
                <td className="px-4 py-3">
                  {(!u.logoUrl || !u.coverImageUrl) ? (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                      {!u.logoUrl && !u.coverImageUrl ? 'Both missing' : !u.logoUrl ? 'Logo missing' : 'Cover missing'}
                    </span>
                  ) : (
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">✓ Complete</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/universities/${u.slug}`}
                    className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:border-action/40 hover:text-action-hover"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {universities.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No universities found</p>
        )}
      </div>
    </div>
  )
}
