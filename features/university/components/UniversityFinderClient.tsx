'use client'
import { useState, useRef, useEffect } from 'react'
import type { UniversityFinderData } from '../types/university.types'
import { useUniversityFilters } from '../hooks/useUniversitySearch'
import { SORT_OPTIONS, DEGREE_DISPLAY, type SortValue } from '../utils/universityUtils'
import { CustomDropdown } from '@/shared/components/common'
import { UniversityHero } from './UniversityHero'
import { UniversityFilters } from './UniversityFilters'
import { UniversityGrid } from './UniversityGrid'
import { UniversityPagination } from './UniversityPagination'
import { UniversityCTA } from './UniversityCTA'

type Translations = {
  heroLabel: string
  heroTitle: string
  heroSubtitle: string
  heroStat1Count: string
  heroStat1Label: string
  heroStat2Count: string
  heroStat2Label: string
  heroStat3Count: string
  heroStat3Label: string
  studyLevel: string
  desiredCourse: string
  targetCountry: string
  searchButton: string
  selectAll: string
  searchCourses: string
  searchCountries: string
  noSearchResults: string
  advancedFilters: string
  resetAll: string
  filterCountry: string
  filterDegree: string
  filterCourses: string
  filterTuition: string
  filterRanking: string
  filterStudyType: string
  tuitionMin: string
  tuitionMax: string
  rankAll: string
  rankTop50: string
  rankTop100: string
  rankTop300: string
  onCampus: string
  online: string
  noLimit: string
  showingResults: string
  sortBy: string
  sortHighestRanking: string
  sortLowestTuition: string
  sortHighestAcceptance: string
  sortAZ: string
  sortZA: string
  avgCost: string
  tuitionLabel: string
  acceptance: string
  courses: string
  intake: string
  programs: string
  viewDetails: string
  rankLabel: string
  perYear: string
  previous: string
  next: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  filtersButton: string
  noResults: string
  degreeBachelors: string
  degreeMasters: string
  degreePhd: string
  degreeDiploma: string
  degreeAssociate: string
  degreeCertificate: string
  degreeFoundation: string
}

interface InitialFilters {
  degree?: string
  country?: string
  course?: string
}

interface Props {
  data: UniversityFinderData
  translations: Translations
  initialFilters?: InitialFilters
}

export function UniversityFinderClient({ data, translations: t, initialFilters }: Props) {
  const filters = useUniversityFilters(data.universities, {
    countries: initialFilters?.country ? [initialFilters.country] : [],
    degrees: initialFilters?.degree ? [initialFilters.degree] : [],
    courses: initialFilters?.course ? [initialFilters.course] : [],
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchTrigger, setSearchTrigger] = useState(0)
  const resultsRef = useRef<HTMLDivElement>(null)
  const initialMount = useRef(true)

  useEffect(() => {
    if (initialMount.current) { initialMount.current = false; return }
    const el = resultsRef.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  }, [filters.filtered, filters.page])

  // Hero dropdowns: single-select synced with sidebar arrays
  const heroCountry = filters.countries.length === 1 ? filters.countries[0] : ''
  const heroDegree = filters.degrees.length === 1 ? filters.degrees[0] : ''
  const heroCourse = filters.courses.length === 1 ? filters.courses[0] : ''

  const handleHeroCountryChange = (v: string) => { filters.setCountries(v ? [v] : []); filters.setPage(1) }
  const handleHeroDegreeChange = (v: string) => { filters.setDegrees(v ? [v] : []); filters.setPage(1) }
  const handleHeroCourseChange = (v: string) => { filters.setCourses(v ? [v] : []); filters.setPage(1) }

  const degreeLabels: Record<string, string> = Object.fromEntries(
    Object.entries(DEGREE_DISPLAY).map(([k, labelKey]) => [
      k,
      (t[labelKey as keyof Translations] as string) ?? k,
    ]),
  )

  const sortOptions = SORT_OPTIONS.map(({ value, labelKey }) => ({
    value,
    label:
      ({
        ranking: t.sortHighestRanking,
        'tuition-low': t.sortLowestTuition,
        acceptance: t.sortHighestAcceptance,
        az: t.sortAZ,
        za: t.sortZA,
      } as Record<string, string>)[value] ?? labelKey,
  }))

  return (
    <>
      <UniversityHero
        data={data}
        heroTranslations={{
          heroLabel: t.heroLabel,
          heroTitle: t.heroTitle,
          heroSubtitle: t.heroSubtitle,
          stats: {
            stat1Count: t.heroStat1Count,
            stat1Label: t.heroStat1Label,
            stat2Count: t.heroStat2Count,
            stat2Label: t.heroStat2Label,
            stat3Count: t.heroStat3Count,
            stat3Label: t.heroStat3Label,
          },
          searchBar: {
            studyLevel: t.studyLevel,
            desiredCourse: t.desiredCourse,
            targetCountry: t.targetCountry,
            searchButton: t.searchButton,
            selectAll: t.selectAll,
            searchCourses: t.searchCourses,
            searchCountries: t.searchCountries,
            noSearchResults: t.noSearchResults,
          },
        }}
        degreeLabels={degreeLabels}
        selectedDegree={heroDegree}
        selectedCourse={heroCourse}
        selectedCountry={heroCountry}
        onDegreeChange={handleHeroDegreeChange}
        onCourseChange={handleHeroCourseChange}
        onCountryChange={handleHeroCountryChange}
        onSearch={() => {
          filters.setPage(1)
          setSearchTrigger((n) => n + 1)
          const el = resultsRef.current
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 96
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
          }
        }}
      />

      {/* pt-16 md:pt-20 accounts for search bar translate-y-1/2 overlap */}
      <div className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-20 pb-16">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters((v) => !v)}
            className="flex items-center gap-2 border border-brand-purple text-brand-purple text-sm font-semibold px-4 py-2 rounded-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            {t.filtersButton}
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
          {/* Sidebar */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block mb-8 lg:mb-0 lg:self-start lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-thin lg:pr-1`}>
            <UniversityFilters
              data={data}
              selectedCountries={filters.countries}
              selectedDegrees={filters.degrees}
              selectedCourses={filters.courses}
              tuitionMin={filters.tuitionMin}
              tuitionMax={filters.tuitionMax}
              rankingMax={filters.rankingMax}
              studyType={filters.studyType}
              onToggleCountry={(name) => { filters.toggleCountry(name); filters.setPage(1) }}
              onToggleDegree={(d) => { filters.toggleDegree(d); filters.setPage(1) }}
              onToggleCourse={(c) => { filters.toggleCourse(c); filters.setPage(1) }}
              onTuitionMinChange={(v) => { filters.setTuitionMin(v); filters.setPage(1) }}
              onTuitionMaxChange={(v) => { filters.setTuitionMax(v); filters.setPage(1) }}
              onRankingChange={(v) => { filters.setRankingMax(v); filters.setPage(1) }}
              onStudyTypeChange={(v) => { filters.setStudyType(v); filters.setPage(1) }}
              onResetAll={filters.resetAll}
              translations={{
                advancedFilters: t.advancedFilters,
                resetAll: t.resetAll,
                filterCountry: t.filterCountry,
                filterDegree: t.filterDegree,
                filterCourses: t.filterCourses,
                filterTuition: t.filterTuition,
                filterRanking: t.filterRanking,
                filterStudyType: t.filterStudyType,
                tuitionMin: t.tuitionMin,
                tuitionMax: t.tuitionMax,
                rankAll: t.rankAll,
                rankTop50: t.rankTop50,
                rankTop100: t.rankTop100,
                rankTop300: t.rankTop300,
                onCampus: t.onCampus,
                online: t.online,
                noLimit: t.noLimit,
              }}
              degreeLabels={degreeLabels}
            />
          </aside>

          {/* Main */}
          <main className="min-w-0">
            {/* Results bar */}
            <div ref={resultsRef} className="flex items-center justify-between mb-6 gap-4 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 shrink-0">
                {t.showingResults.replace('{count}', String(filters.filtered.length))}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-gray-500 hidden sm:inline whitespace-nowrap">{t.sortBy}:</span>
                <CustomDropdown
                  value={filters.sort}
                  options={sortOptions}
                  onChange={(v) => { filters.setSort(v as SortValue); filters.setPage(1) }}
                  placeholder={t.sortHighestRanking}
                  showPlaceholderOption={false}
                  size="compact"
                  className="w-44"
                />
              </div>
            </div>

            <UniversityGrid
              key={`${filters.page}-${filters.filtered.length}-${filters.sort}-${searchTrigger}`}
              universities={filters.paginated}
              noResultsText={t.noResults}
              cardTranslations={{
                avgCost: t.avgCost,
                tuitionLabel: t.tuitionLabel,
                acceptance: t.acceptance,
                courses: t.courses,
                intake: t.intake,
                programs: t.programs,
                viewDetails: t.viewDetails,
                rankLabel: t.rankLabel,
                perYear: t.perYear,
              }}
            />

            <UniversityPagination
              page={filters.page}
              totalPages={filters.totalPages}
              onPageChange={filters.setPage}
              previousLabel={t.previous}
              nextLabel={t.next}
            />
          </main>
        </div>
      </div>
      </div>

      <UniversityCTA
        title={t.ctaTitle}
        subtitle={t.ctaSubtitle}
        buttonLabel={t.ctaButton}
      />
    </>
  )
}
