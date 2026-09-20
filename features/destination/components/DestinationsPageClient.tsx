'use client'
import { useState, useMemo, useRef } from 'react'
import { DestinationsHero } from './DestinationsHero'
import { DestinationsToolbar } from './DestinationsToolbar'
import { DestinationGrid } from './DestinationGrid'
import { REGION_DISPLAY } from '../utils/constants'
import type { SortOption } from '../utils/constants'
import type { CountryCardData, DestinationTranslations } from '../types'

interface Props {
  countries: CountryCardData[]
  translations: DestinationTranslations
}

export function DestinationsPageClient({ countries, translations: t }: Props) {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [sort, setSort] = useState<SortOption>('popular')
  const resultsRef = useRef<HTMLElement>(null)

  const handleSearchSubmit = (value: string) => {
    setSearch(value)
    const el = resultsRef.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  }

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { _total: countries.length }
    countries.forEach((c) => {
      counts[c.region] = (counts[c.region] ?? 0) + 1
    })
    return counts
  }, [countries])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return countries.filter((c) => {
      const regionDisplay = REGION_DISPLAY[c.region]?.toLowerCase() ?? ''
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        regionDisplay.includes(q)
      const matchesRegion = region === 'All' || c.region === region
      return matchesSearch && matchesRegion
    })
  }, [countries, search, region])

  // "Most popular" is institution count descending, with an alphabetical
  // tie-break so equal counts keep a stable, predictable order. Countries
  // Firmli has no count for sort as 0, landing them at the end rather than
  // the front (null would otherwise sort before a real 0).
  const visible = useMemo(() => {
    const rows = [...filtered]
    if (sort === 'name') return rows.sort((a, b) => a.name.localeCompare(b.name))
    return rows.sort(
      (a, b) =>
        (b.firmliInstitutionCount ?? 0) - (a.firmliInstitutionCount ?? 0) ||
        a.name.localeCompare(b.name),
    )
  }, [filtered, sort])

  return (
    <main>
      <DestinationsHero searchValue={search} onSearchChange={handleSearchSubmit} />

      <DestinationsToolbar
        region={region}
        onRegionChange={setRegion}
        sort={sort}
        onSortChange={setSort}
        counts={regionCounts}
        resultCount={visible.length}
      />

      <section ref={resultsRef} className="pt-2 pb-12 max-tablet:pt-2 max-tablet:pb-8">
        <div className="mx-auto max-w-wrap px-6">
          <DestinationGrid countries={visible} viewDetailsLabel={t.viewDetails} />
        </div>
      </section>

    </main>
  )
}
