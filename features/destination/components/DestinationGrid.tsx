'use client'
import { useState, useEffect } from 'react'
import { DestinationCard } from './DestinationCard'
import { PAGE_SIZE, type SortOption } from '../utils/constants'
import type { CountryCardData } from '../types'

interface Props {
  countries: CountryCardData[]
  translations: {
    showingCount: string
    sortBy: string
    sortHighestRanking: string
    sortAZ: string
    sortZA: string
    loadMore: string
    viewDetails: string
  }
}

export function DestinationGrid({ countries, translations: t }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>('ranking')
  const [shown, setShown] = useState(PAGE_SIZE)

  // Reset pagination when filtered list changes
  useEffect(() => {
    setShown(PAGE_SIZE)
  }, [countries])

  const sorted = [...countries].sort((a, b) => {
    if (sortBy === 'az') return a.name.localeCompare(b.name)
    if (sortBy === 'za') return b.name.localeCompare(a.name)
    // ranking: featured first, then by university count
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
    return b._count.universities - a._count.universities
  })

  const visible = sorted.slice(0, shown)
  const hasMore = shown < countries.length

  const countLabel = t.showingCount.replace('{count}', String(countries.length))

  return (
    <div>
      {/* Results bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
          {countLabel}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase hidden sm:block">
            {t.sortBy}:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 bg-white cursor-pointer"
          >
            <option value="ranking">{t.sortHighestRanking}</option>
            <option value="az">{t.sortAZ}</option>
            <option value="za">{t.sortZA}</option>
          </select>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((country) => (
          <DestinationCard
            key={country.id}
            country={country}
            viewDetailsLabel={t.viewDetails}
          />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setShown((prev) => prev + PAGE_SIZE)}
            className="border border-gray-300 rounded-full px-8 py-3 text-sm font-medium text-gray-700 hover:border-brand-purple hover:text-brand-purple transition-colors"
          >
            {t.loadMore}
          </button>
        </div>
      )}
    </div>
  )
}
