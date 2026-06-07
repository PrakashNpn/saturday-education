'use client'
import { useState, useMemo, useRef } from 'react'
import { DestinationsHero } from './DestinationsHero'
import { RegionFilter } from './RegionFilter'
import { DestinationGrid } from './DestinationGrid'
import { WhyStudyAbroad } from './WhyStudyAbroad'
import { DestinationsCTA } from './DestinationsCTA'
import { REGION_DISPLAY } from '../utils/constants'
import type { CountryCardData, DestinationTranslations } from '../types'

interface Props {
  countries: CountryCardData[]
  translations: DestinationTranslations
}

export function DestinationsPageClient({ countries, translations: t }: Props) {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const resultsRef = useRef<HTMLDivElement>(null)

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

  return (
    <main>
      <DestinationsHero
        searchValue={search}
        onSearchChange={handleSearchSubmit}
        translations={{
          heroLabel: t.heroLabel,
          heroTitle: t.heroTitle,
          heroSubtitle: t.heroSubtitle,
          searchPlaceholder: t.searchPlaceholder,
          searchButton: t.searchButton,
        }}
      />

      <div className="bg-neutral-50">
      <div ref={resultsRef} className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-12">
        <div className="mb-8">
          <RegionFilter
            selected={region}
            onChange={setRegion}
            counts={regionCounts}
            translations={{
              popularRegions: t.popularRegions,
              regionAll: t.regionAll,
              regionEurope: t.regionEurope,
              regionAsia: t.regionAsia,
              regionAmericas: t.regionAmericas,
              regionOceania: t.regionOceania,
              regionAfrica: t.regionAfrica,
            }}
          />
        </div>

        <DestinationGrid
          countries={filtered}
          translations={{
            showingCount: t.showingCount,
            sortBy: t.sortBy,
            sortHighestRanking: t.sortHighestRanking,
            sortAZ: t.sortAZ,
            sortZA: t.sortZA,
            loadMore: t.loadMore,
            viewDetails: t.viewDetails,
          }}
        />
      </div>
      </div>

      <WhyStudyAbroad
        translations={{
          whyStudyAbroadLabel: t.whyStudyAbroadLabel,
          whyStudyAbroadTitle: t.whyStudyAbroadTitle,
          whyStudyAbroadSubtitle: t.whyStudyAbroadSubtitle,
          globalExposure: t.globalExposure,
          globalExposureDesc: t.globalExposureDesc,
          careerEdge: t.careerEdge,
          careerEdgeDesc: t.careerEdgeDesc,
          personalGrowth: t.personalGrowth,
          personalGrowthDesc: t.personalGrowthDesc,
          lifetimeMemories: t.lifetimeMemories,
          lifetimeMemoriesDesc: t.lifetimeMemoriesDesc,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <DestinationsCTA
          translations={{
            ctaTitle: t.ctaTitle,
            ctaSubtitle: t.ctaSubtitle,
            ctaButton: t.ctaButton,
          }}
        />
      </div>
    </main>
  )
}
