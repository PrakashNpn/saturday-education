import { CustomDropdown, SearchableDropdown } from '@/shared/components/common'

interface Props {
  degreeLevels: string[]
  programFields: string[]
  countries: string[]
  selectedDegree: string
  selectedCourse: string
  selectedCountry: string
  onDegreeChange: (v: string) => void
  onCourseChange: (v: string) => void
  onCountryChange: (v: string) => void
  onSearch: () => void
  translations: {
    studyLevel: string
    desiredCourse: string
    targetCountry: string
    searchButton: string
    selectAll: string
    searchCourses: string
    searchCountries: string
    noSearchResults: string
  }
  degreeLabels: Record<string, string>
}

export function UniversitySearchBar({
  degreeLevels,
  programFields,
  countries,
  selectedDegree,
  selectedCourse,
  selectedCountry,
  onDegreeChange,
  onCourseChange,
  onCountryChange,
  onSearch,
  translations: t,
  degreeLabels,
}: Props) {
  const degreeOptions = degreeLevels.map((d) => ({ value: d, label: degreeLabels[d] ?? d }))
  const courseOptions = programFields.map((f) => ({ value: f, label: f }))
  const countryOptions = countries.map((c) => ({ value: c, label: c }))

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-5">
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:items-end">
        {/* Study Level */}
        <div className="flex-1 md:border-r border-gray-200 md:pr-4">
          <CustomDropdown
            label={t.studyLevel}
            value={selectedDegree}
            options={degreeOptions}
            onChange={onDegreeChange}
            placeholder={t.selectAll}
          />
        </div>

        {/* Desired Course */}
        <div className="flex-1 md:border-r border-gray-200 md:px-4">
          <SearchableDropdown
            label={t.desiredCourse}
            value={selectedCourse}
            options={courseOptions}
            onChange={onCourseChange}
            placeholder={t.selectAll}
            searchPlaceholder={t.searchCourses}
            noResultsText={t.noSearchResults}
          />
        </div>

        {/* Target Country */}
        <div className="flex-1 md:pl-4">
          <SearchableDropdown
            label={t.targetCountry}
            value={selectedCountry}
            options={countryOptions}
            onChange={onCountryChange}
            placeholder={t.selectAll}
            searchPlaceholder={t.searchCountries}
            noResultsText={t.noSearchResults}
          />
        </div>

        {/* Search button */}
        <div className="md:ml-4 flex-shrink-0">
          <button
            onClick={onSearch}
            className="w-full md:w-auto bg-brand-purple text-white font-semibold px-6 py-2.5 rounded-full hover:bg-brand-purple-dark transition-colors text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t.searchButton}
          </button>
        </div>
      </div>
    </div>
  )
}
