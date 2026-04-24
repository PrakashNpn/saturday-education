'use client'
import { useState, useMemo } from 'react'
import type { UniversityListItem } from '../types/university.types'
import { ITEMS_PER_PAGE, type SortValue } from '../utils/universityUtils'

const TUITION_SLIDER_MIN = 0
const TUITION_SLIDER_MAX = 100000

interface InitialFilters {
  countries?: string[]
  degrees?: string[]
  courses?: string[]
}

export function useUniversityFilters(universities: UniversityListItem[], initial?: InitialFilters) {
  const [countries, setCountries] = useState<string[]>(initial?.countries ?? [])
  const [degrees, setDegrees] = useState<string[]>(initial?.degrees ?? [])
  const [courses, setCourses] = useState<string[]>(initial?.courses ?? [])
  const [tuitionMin, setTuitionMin] = useState(TUITION_SLIDER_MIN)
  const [tuitionMax, setTuitionMax] = useState(TUITION_SLIDER_MAX)
  const [rankingMax, setRankingMax] = useState<number | null>(null)
  const [studyType, setStudyType] = useState('')
  const [sort, setSort] = useState<SortValue>('ranking')
  const [page, setPage] = useState(1)

  const resetAll = () => {
    setCountries([])
    setDegrees([])
    setCourses([])
    setTuitionMin(TUITION_SLIDER_MIN)
    setTuitionMax(TUITION_SLIDER_MAX)
    setRankingMax(null)
    setStudyType('')
    setPage(1)
  }

  const toggleCountry = (name: string) =>
    setCountries((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    )

  const toggleDegree = (degree: string) =>
    setDegrees((prev) =>
      prev.includes(degree) ? prev.filter((d) => d !== degree) : [...prev, degree],
    )

  const toggleCourse = (course: string) =>
    setCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course],
    )

  const filtered = useMemo(() => {
    let result = universities

    if (countries.length > 0)
      result = result.filter((u) => countries.includes(u.country.name))
    if (degrees.length > 0)
      result = result.filter((u) => u.programs.some((p) => degrees.includes(p.degreeLevel)))
    if (courses.length > 0)
      result = result.filter((u) => u.programs.some((p) => courses.includes(p.field)))
    // tuitionMin > 0 means user dragged min above zero
    if (tuitionMin > TUITION_SLIDER_MIN)
      result = result.filter((u) => (u.tuitionFeeMax ?? 0) >= tuitionMin)
    // tuitionMax < 100000 means user capped the max — 100000 means "no limit"
    if (tuitionMax < TUITION_SLIDER_MAX)
      result = result.filter((u) => (u.tuitionFeeMin ?? Infinity) <= tuitionMax)
    if (rankingMax !== null)
      result = result.filter((u) => u.ranking !== null && u.ranking <= rankingMax)
    if (studyType === 'on-campus') result = result.filter((u) => u.hasOnCampus)
    else if (studyType === 'online') result = result.filter((u) => u.hasOnline)
    else if (studyType === 'hybrid') result = result.filter((u) => u.hasHybrid)

    const sorted = [...result]
    if (sort === 'ranking') sorted.sort((a, b) => (a.ranking ?? 9999) - (b.ranking ?? 9999))
    else if (sort === 'tuition-low')
      sorted.sort((a, b) => (a.tuitionFeeMin ?? 0) - (b.tuitionFeeMin ?? 0))
    else if (sort === 'acceptance')
      sorted.sort((a, b) => (b.acceptanceRate ?? 0) - (a.acceptanceRate ?? 0))
    else if (sort === 'az') sorted.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'za') sorted.sort((a, b) => b.name.localeCompare(a.name))

    return sorted
  }, [universities, countries, degrees, courses, tuitionMin, tuitionMax, rankingMax, studyType, sort])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return {
    countries,
    degrees,
    courses,
    tuitionMin,
    tuitionMax,
    rankingMax,
    studyType,
    sort,
    page,
    setCountries,
    setDegrees,
    setCourses,
    setTuitionMin,
    setTuitionMax,
    setRankingMax,
    setStudyType,
    setSort,
    setPage,
    toggleCountry,
    toggleDegree,
    toggleCourse,
    resetAll,
    filtered,
    paginated,
    totalPages,
  }
}
