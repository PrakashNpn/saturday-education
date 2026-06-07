'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DestinationCard } from './DestinationCard'
import { CustomDropdown } from '@/shared/components/common'
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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export function DestinationGrid({ countries, translations: t }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>('ranking')
  const [shown, setShown] = useState(PAGE_SIZE)

  // Reset pagination when filtered list changes
  useEffect(() => {
    setShown(PAGE_SIZE)
  }, [countries])

  const sortOptions = [
    { value: 'ranking', label: t.sortHighestRanking },
    { value: 'az', label: t.sortAZ },
    { value: 'za', label: t.sortZA },
  ]

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
          <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase hidden sm:block whitespace-nowrap">
            {t.sortBy}:
          </span>
          <CustomDropdown
            value={sortBy}
            options={sortOptions}
            onChange={(v) => setSortBy(v as SortOption)}
            placeholder={t.sortHighestRanking}
            showPlaceholderOption={false}
            size="compact"
            className="min-w-[160px]"
          />
        </div>
      </div>

      {/* Card grid */}
      <div
        key={`${sortBy}-${shown}-${visible.map((c) => c.id).join('-')}`}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {visible.map((country, i) => (
          <motion.div key={country.id} custom={i} variants={cardVariants} initial="hidden" animate="show">
            <DestinationCard
              country={country}
              viewDetailsLabel={t.viewDetails}
              index={i}
            />
          </motion.div>
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
