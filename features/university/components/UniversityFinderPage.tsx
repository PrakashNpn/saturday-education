import { getTranslations } from 'next-intl/server'
import { getAllUniversitiesWithFilters } from '../services/universityService'
import { UniversityFinderClient } from './UniversityFinderClient'

interface InitialFilters {
  degree?: string
  country?: string
  course?: string
}

export async function UniversityFinderPage({ initialFilters }: { initialFilters?: InitialFilters } = {}) {
  const [data, t] = await Promise.all([
    getAllUniversitiesWithFilters(),
    getTranslations('universities'),
  ])

  const translations = {
    heroLabel: t('heroLabel'),
    heroTitle: t('heroTitle'),
    heroSubtitle: t('heroSubtitle'),
    heroStat1Count: `${data.universities.length}+`,
    heroStat1Label: t('heroStat1Label'),
    heroStat2Count: `${data.countries.length}+`,
    heroStat2Label: t('heroStat2Label'),
    heroStat3Count: `${data.universities.reduce((sum, u) => sum + u._count.programs, 0)}+`,
    heroStat3Label: t('heroStat3Label'),
    studyLevel: t('studyLevel'),
    desiredCourse: t('desiredCourse'),
    targetCountry: t('targetCountry'),
    searchButton: t('searchButton'),
    selectAll: t('selectAll'),
    searchCourses: t('searchCourses'),
    searchCountries: t('searchCountries'),
    noSearchResults: t('noSearchResults'),
    advancedFilters: t('advancedFilters'),
    resetAll: t('resetAll'),
    filterCountry: t('filterCountry'),
    filterDegree: t('filterDegree'),
    filterCourses: t('filterCourses'),
    filterTuition: t('filterTuition'),
    filterRanking: t('filterRanking'),
    filterStudyType: t('filterStudyType'),
    tuitionMin: t('tuitionMin'),
    tuitionMax: t('tuitionMax'),
    rankAll: t('rankAll'),
    rankTop50: t('rankTop50'),
    rankTop100: t('rankTop100'),
    rankTop300: t('rankTop300'),
    onCampus: t('onCampus'),
    online: t('online'),
    noLimit: t('noLimit'),
    showingResults: t('showingResults', { count: 0 }).replace('0', '{count}'),
    sortBy: t('sortBy'),
    sortHighestRanking: t('sortHighestRanking'),
    sortLowestTuition: t('sortLowestTuition'),
    sortHighestAcceptance: t('sortHighestAcceptance'),
    sortAZ: t('sortAZ'),
    sortZA: t('sortZA'),
    avgCost: t('avgCost'),
    tuitionLabel: t('tuitionLabel'),
    acceptance: t('acceptance'),
    courses: t('courses'),
    intake: t('intake'),
    programs: t('programs'),
    viewDetails: t('viewDetails'),
    rankLabel: t('rank', { rank: 0 }).replace('0', '{rank}'),
    perYear: t('perYear'),
    previous: t('previous'),
    next: t('next'),
    ctaTitle: t('ctaTitle'),
    ctaSubtitle: t('ctaSubtitle'),
    ctaButton: t('ctaButton'),
    filtersButton: t('filtersButton'),
    noResults: t('noResults'),
    degreeBachelors: t('degreeBachelors'),
    degreeMasters: t('degreeMasters'),
    degreePhd: t('degreePhd'),
    degreeDiploma: t('degreeDiploma'),
    degreeAssociate: t('degreeAssociate'),
    degreeCertificate: t('degreeCertificate'),
    degreeFoundation: t('degreeFoundation'),
  }

  return <UniversityFinderClient data={data} translations={translations} initialFilters={initialFilters} />
}
