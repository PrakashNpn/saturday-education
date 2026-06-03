'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface Country { slug: string; name: string }

export default function UniversitySearch({
  countries,
  defaultQ,
  defaultCountry,
}: {
  countries: Country[]
  defaultQ?: string
  defaultCountry?: string
}) {
  const router = useRouter()

  const update = useCallback((q: string, country: string) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (country) params.set('country', country)
    router.push(`/admin/universities?${params.toString()}`)
  }, [router])

  return (
    <div className="flex gap-3">
      <input
        type="search"
        placeholder="Search by name or city…"
        defaultValue={defaultQ}
        onChange={e => update(e.target.value, defaultCountry ?? '')}
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <select
        defaultValue={defaultCountry ?? ''}
        onChange={e => update(defaultQ ?? '', e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      >
        <option value="">All countries</option>
        {countries.map(c => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
    </div>
  )
}
