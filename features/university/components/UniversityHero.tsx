import { GraduationCap } from 'lucide-react'
import type { UniversityFinderData } from '../types/university.types'
import { UniversitySearchBar } from './UniversitySearchBar'

interface Props {
  data: UniversityFinderData
  heroTranslations: {
    heroLabel: string
    heroTitle: string
    heroSubtitle: string
    stats: {
      stat1Count: string
      stat1Label: string
      stat2Count: string
      stat2Label: string
      stat3Count: string
      stat3Label: string
    }
    searchBar: {
      studyLevel: string
      desiredCourse: string
      targetCountry: string
      searchButton: string
      selectAll: string
      searchCourses: string
      searchCountries: string
      noSearchResults: string
    }
  }
  degreeLabels: Record<string, string>
  selectedDegree: string
  selectedCourse: string
  selectedCountry: string
  onDegreeChange: (v: string) => void
  onCourseChange: (v: string) => void
  onCountryChange: (v: string) => void
  onSearch: () => void
}

export function UniversityHero({
  data,
  heroTranslations: t,
  degreeLabels,
  selectedDegree,
  selectedCourse,
  selectedCountry,
  onDegreeChange,
  onCourseChange,
  onCountryChange,
  onSearch,
}: Props) {
  const stats = [
    { count: t.stats.stat1Count, label: t.stats.stat1Label },
    { count: t.stats.stat2Count, label: t.stats.stat2Label },
    { count: t.stats.stat3Count, label: t.stats.stat3Label },
  ]

  return (
    <div className="relative bg-gradient-to-b from-brand-purple via-purple-800 to-purple-900 pt-16 pb-8 md:pb-14 px-4 text-center overflow-visible">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      </div>
      {/* Decorative rings — clipped to hero bounds to prevent horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-52 h-52 rounded-full border border-white/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-52 h-52 rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto mb-6 md:mb-10">
        {/* Badge with icon */}
        <div className="flex items-center justify-center gap-2 w-fit mx-auto bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          <GraduationCap className="w-3.5 h-3.5" />
          {t.heroLabel}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">{t.heroSubtitle}</p>

        {/* Trust stats */}
        <div className="flex items-center justify-center divide-x divide-white/30">
          {stats.map(({ count, label }) => (
            <div key={label} className="px-6 md:px-10 text-center">
              <div className="text-xl md:text-2xl font-bold text-white">{count}</div>
              <div className="text-xs text-white/60 font-medium mt-0.5 whitespace-nowrap">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: inline flow. Desktop: floats half-over the section below */}
      <div className="relative z-20 px-0 md:absolute md:bottom-0 md:translate-y-1/2 md:left-0 md:right-0 md:px-4">
        <UniversitySearchBar
          degreeLevels={data.degreeLevels}
          programFields={data.programFields}
          countries={data.countries.map((c) => c.name)}
          selectedDegree={selectedDegree}
          selectedCourse={selectedCourse}
          selectedCountry={selectedCountry}
          onDegreeChange={onDegreeChange}
          onCourseChange={onCourseChange}
          onCountryChange={onCountryChange}
          onSearch={onSearch}
          translations={t.searchBar}
          degreeLabels={degreeLabels}
        />
      </div>
    </div>
  )
}
