'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Search, ChevronDown, GraduationCap,
  Clock, Briefcase, Award, Trophy, TrendingUp, Sparkles,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Course = { value: string; label: string }
type University = {
  id: string
  name: string
  country: string
  courses: Course[]
  tuition: { min: number; max: number; currency: string; scale: number }
  livingCosts: { min: number; max: number; currency: string; scale: number }
  visaProcessing: string
  workRights: string
  scholarships: string
  globalRanking: number
  acceptanceRate: number
  popularCourses: string[]
}
type SetDropdown = (key: string | null) => void
type SideLabels = {
  selectCourse: string
  estimatedTuition: string
  livingCosts: string
  visaProcessing: string
  workRights: string
  scholarships: string
  globalRanking: string
  acceptanceRate: string
  popularCourses: string
  searchPlaceholder: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const UNIVERSITIES: University[] = [
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'UK',
    courses: [
      { value: 'msc-data-science', label: 'MSc Data Science' },
      { value: 'msc-computer-science', label: 'MSc Computer Science' },
      { value: 'mba', label: 'MBA' },
      { value: 'ba-ppe', label: 'BA Philosophy, Politics & Economics' },
      { value: 'bm-medicine', label: 'BM Medicine' },
    ],
    tuition: { min: 25000, max: 35000, currency: '£', scale: 100000 },
    livingCosts: { min: 10000, max: 15000, currency: '£', scale: 50000 },
    visaProcessing: '3-4 Weeks',
    workRights: '20 hrs/week',
    scholarships: 'Up to £5,000',
    globalRanking: 1,
    acceptanceRate: 87.5,
    popularCourses: ['Philosophy', 'Medicine', 'PPE'],
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne',
    country: 'Australia',
    courses: [
      { value: 'bba-management', label: 'BBA Management' },
      { value: 'msc-engineering', label: 'MSc Engineering' },
      { value: 'llb-law', label: 'LLB Law' },
      { value: 'bcom-finance', label: 'BCom Finance' },
      { value: 'md-medicine', label: 'MD Medicine' },
    ],
    tuition: { min: 38000, max: 48000, currency: 'A$', scale: 100000 },
    livingCosts: { min: 18000, max: 25000, currency: 'A$', scale: 50000 },
    visaProcessing: '4-8 Weeks',
    workRights: '48 hrs/week',
    scholarships: 'Up to 25% Fee waiver',
    globalRanking: 14,
    acceptanceRate: 12.5,
    popularCourses: ['Business', 'Law', 'Engineering'],
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    country: 'USA',
    courses: [
      { value: 'mba', label: 'MBA' },
      { value: 'jd-law', label: 'JD Law' },
      { value: 'md-medicine', label: 'MD Medicine' },
      { value: 'msc-cs', label: 'MSc Computer Science' },
      { value: 'ba-economics', label: 'BA Economics' },
    ],
    tuition: { min: 52000, max: 62000, currency: '$', scale: 100000 },
    livingCosts: { min: 22000, max: 30000, currency: '$', scale: 50000 },
    visaProcessing: '4-6 Weeks',
    workRights: '20 hrs/week',
    scholarships: 'Up to $10,000',
    globalRanking: 3,
    acceptanceRate: 3.4,
    popularCourses: ['Law', 'Business', 'Medicine'],
  },
  {
    id: 'toronto',
    name: 'University of Toronto',
    country: 'Canada',
    courses: [
      { value: 'bsc-cs', label: 'BSc Computer Science' },
      { value: 'meng', label: 'MEng Engineering' },
      { value: 'mba', label: 'MBA' },
      { value: 'bcom', label: 'BCom Commerce' },
      { value: 'ma-economics', label: 'MA Economics' },
    ],
    tuition: { min: 45000, max: 55000, currency: 'C$', scale: 100000 },
    livingCosts: { min: 15000, max: 20000, currency: 'C$', scale: 50000 },
    visaProcessing: '6-8 Weeks',
    workRights: '20 hrs/week',
    scholarships: 'Up to C$5,000',
    globalRanking: 21,
    acceptanceRate: 43.0,
    popularCourses: ['Engineering', 'CS', 'Business'],
  },
  {
    id: 'ucl',
    name: 'University College London',
    country: 'UK',
    courses: [
      { value: 'msc-ai', label: 'MSc Artificial Intelligence' },
      { value: 'ba-architecture', label: 'BA Architecture' },
      { value: 'msc-finance', label: 'MSc Finance' },
      { value: 'mbbs', label: 'MBBS Medicine' },
      { value: 'llm-law', label: 'LLM International Law' },
    ],
    tuition: { min: 23000, max: 38000, currency: '£', scale: 100000 },
    livingCosts: { min: 12000, max: 18000, currency: '£', scale: 50000 },
    visaProcessing: '3-4 Weeks',
    workRights: '20 hrs/week',
    scholarships: 'Up to £3,000',
    globalRanking: 9,
    acceptanceRate: 63.0,
    popularCourses: ['Architecture', 'AI', 'Law'],
  },
]

// ── Shared dropdown animation ─────────────────────────────────────────────────

const DROPDOWN_MOTION = {
  initial: { opacity: 0, scaleY: 0.95, y: -4 },
  animate: { opacity: 1, scaleY: 1, y: 0 },
  exit:    { opacity: 0, scaleY: 0.95, y: -4 },
  transition: { duration: 0.15, ease: 'easeOut' as const },
  style: { transformOrigin: 'top' as const },
}

// ── UniversitySearchInput ─────────────────────────────────────────────────────

function UniversitySearchInput({
  selectedId,
  onSelect,
  dropdownKey,
  activeDropdown,
  setActiveDropdown,
  placeholder,
}: {
  selectedId: string
  onSelect: (id: string) => void
  dropdownKey: string
  activeDropdown: string | null
  setActiveDropdown: SetDropdown
  placeholder: string
}) {
  const isOpen = activeDropdown === dropdownKey
  const [query, setQuery] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedUni = UNIVERSITIES.find((u) => u.id === selectedId)

  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, setActiveDropdown])

  const filtered = query
    ? UNIVERSITIES.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.country.toLowerCase().includes(query.toLowerCase()),
      )
    : UNIVERSITIES

  const displayValue = isOpen
    ? query
    : selectedUni
      ? `${selectedUni.name}, ${selectedUni.country}`
      : ''

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-2 bg-neutral-100 border border-gray-200 rounded-full px-4 py-2.5">
        <Search size={14} className="text-brand-purple shrink-0" />
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value)
            setActiveDropdown(dropdownKey)
          }}
          onFocus={() => setActiveDropdown(dropdownKey)}
          placeholder={placeholder}
          className="bg-transparent text-brand-purple text-sm font-medium outline-none w-full min-w-0 placeholder-gray-400"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...DROPDOWN_MOTION}
            className="absolute top-full left-0 mt-1 w-full min-w-[220px] bg-white border border-gray-100 rounded-xl shadow-lg z-50 max-h-56 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-400">No results</p>
            ) : (
              filtered.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    onSelect(u.id)
                    setActiveDropdown(null)
                  }}
                  className={`w-full flex flex-col px-4 py-2.5 text-left cursor-pointer transition-colors duration-100 hover:bg-purple-50 ${u.id === selectedId ? 'bg-purple-50' : ''}`}
                >
                  <span
                    className={`text-sm font-medium ${u.id === selectedId ? 'text-brand-purple' : 'text-gray-800'}`}
                  >
                    {u.name}
                  </span>
                  <span className="text-xs text-gray-400">{u.country}</span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── CourseDropdown ─────────────────────────────────────────────────────────────

function CourseDropdown({
  courses,
  selectedIdx,
  onSelect,
  dropdownKey,
  activeDropdown,
  setActiveDropdown,
}: {
  courses: Course[]
  selectedIdx: number
  onSelect: (idx: number) => void
  dropdownKey: string
  activeDropdown: string | null
  setActiveDropdown: SetDropdown
}) {
  const isOpen = activeDropdown === dropdownKey
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, setActiveDropdown])

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setActiveDropdown(isOpen ? null : dropdownKey)}
        className="w-full flex items-center gap-2 bg-neutral-100 border border-gray-200 rounded-full px-4 py-2.5 cursor-pointer transition-colors duration-150"
      >
        <GraduationCap size={14} className="text-brand-purple shrink-0" />
        <span className="text-sm font-medium text-brand-purple flex-1 text-left truncate">
          {courses[selectedIdx]?.label ?? courses[0].label}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={14} className="text-brand-purple" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...DROPDOWN_MOTION}
            className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white border border-gray-100 rounded-xl shadow-lg z-50 max-h-56 overflow-y-auto"
          >
            {courses.map((course, idx) => (
              <button
                key={course.value}
                type="button"
                onClick={() => {
                  onSelect(idx)
                  setActiveDropdown(null)
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm cursor-pointer transition-colors duration-100 ${idx === selectedIdx ? 'bg-purple-50 text-brand-purple font-medium' : 'text-gray-700 hover:bg-purple-50'}`}
              >
                {course.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── CostRow ────────────────────────────────────────────────────────────────────

function CostRow({
  label,
  min,
  max,
  currency,
  scale,
}: {
  label: string
  min: number
  max: number
  currency: string
  scale: number
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(barRef, { once: true })

  const leftPercent = (min / scale) * 100
  const widthPercent = ((max - min) / scale) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between gap-2 flex-wrap">
        <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-brand-purple">
          {label}
        </span>
        <span className="whitespace-nowrap">
          <span className="text-sm sm:text-sm font-medium text-brand-purple">
            {currency}{min.toLocaleString()} – {currency}{max.toLocaleString()}
          </span>
          <span className="text-xs sm:text-sm text-gray-400"> /year</span>
        </span>
      </div>
      <div ref={barRef} className="relative h-2">
        {/* Full gray track */}
        <div className="w-full bg-gray-200 rounded-full h-2" />
        {/* Highlighted range segment */}
        <motion.div
          className="absolute top-0 h-2 rounded-full bg-brand-purple shadow-sm"
          style={{ left: `${leftPercent}%` }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${widthPercent}%` } : { width: '0%' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
        {/* Left endpoint dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-white border-2 border-white shadow-sm"
          style={{ left: `${leftPercent}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
        {/* Right endpoint dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-white border-2 border-white shadow-sm"
          style={{ left: `${leftPercent + widthPercent}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
      </div>
    </div>
  )
}

// ── InfoRow ────────────────────────────────────────────────────────────────────

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <Icon size={18} strokeWidth={3} className="text-brand-purple" />
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-purple">
          {label}
        </span>
      </div>
      <span className="text-sm sm:text-base font-semibold text-gray-800 text-right">
        {value}
      </span>
    </div>
  )
}

// ── StatCards ─────────────────────────────────────────────────────────────────

function StatCards({
  globalRanking,
  acceptanceRate,
  rankingLabel,
  acceptanceLabel,
}: {
  globalRanking: number
  acceptanceRate: number
  rankingLabel: string
  acceptanceLabel: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-neutral-100 rounded-xl p-4">
        <p className="text-[0.6rem] sm:text-[0.65rem] text-brand-purple uppercase tracking-wider font-semibold mb-2">
          {rankingLabel}
        </p>
        <div className="flex items-center gap-2">
          <Trophy size={18} strokeWidth={3} className="text-brand-purple" />
          <span className="text-xl sm:text-2xl font-bold text-gray-800">#{globalRanking}</span>
        </div>
      </div>
      <div className="bg-neutral-100 rounded-xl p-4">
        <p className="text-[0.6rem] sm:text-[0.65rem] text-brand-purple uppercase tracking-wider font-semibold mb-2">
          {acceptanceLabel}
        </p>
        <div className="flex items-center gap-2">
          <TrendingUp size={18} strokeWidth={3} className="text-brand-purple" />
          <span className={`text-xl sm:text-2xl font-bold ${acceptanceRate >= 50 ? 'text-green-600' : 'text-red-500'}`}>
            {acceptanceRate}%
          </span>
        </div>
      </div>
    </div>
  )
}

// ── PopularCourses ─────────────────────────────────────────────────────────────

function PopularCourses({ courses, label }: { courses: string[]; label: string }) {
  return (
    <div>
      <p className="text-[0.65rem] sm:text-xs text-brand-purple uppercase tracking-wider font-semibold mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {courses.map((course) => (
          <span
            key={course}
            className="border border-gray-300 rounded-full px-3 py-1 text-xs sm:text-sm text-gray-700"
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── UniversitySide ─────────────────────────────────────────────────────────────

function UniversitySide({
  uniId,
  courseIdx,
  onUniChange,
  onCourseChange,
  sideKey,
  searchLabel,
  activeDropdown,
  setActiveDropdown,
  labels,
}: {
  uniId: string
  courseIdx: number
  onUniChange: (id: string) => void
  onCourseChange: (idx: number) => void
  sideKey: string
  searchLabel: string
  activeDropdown: string | null
  setActiveDropdown: SetDropdown
  labels: SideLabels
}) {
  const uni = UNIVERSITIES.find((u) => u.id === uniId)!

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: University search + Course dropdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <p className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.12em] text-brand-purple">
            {searchLabel}
          </p>
          <UniversitySearchInput
            selectedId={uniId}
            onSelect={(id) => {
              onUniChange(id)
              onCourseChange(0)
            }}
            dropdownKey={`${sideKey}-search`}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            placeholder={labels.searchPlaceholder}
          />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <p className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.12em] text-brand-purple">
            {labels.selectCourse}
          </p>
          <CourseDropdown
            courses={uni.courses}
            selectedIdx={courseIdx}
            onSelect={onCourseChange}
            dropdownKey={`${sideKey}-course`}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        </div>
      </div>

      {/* Row 2: Estimated Tuition */}
      <CostRow
        label={labels.estimatedTuition}
        min={uni.tuition.min}
        max={uni.tuition.max}
        currency={uni.tuition.currency}
        scale={uni.tuition.scale}
      />

      {/* Row 3: Living Costs */}
      <CostRow
        label={labels.livingCosts}
        min={uni.livingCosts.min}
        max={uni.livingCosts.max}
        currency={uni.livingCosts.currency}
        scale={uni.livingCosts.scale}
      />

      {/* Rows 4–6: Info rows */}
      <InfoRow icon={Clock}    label={labels.visaProcessing} value={uni.visaProcessing} />
      <InfoRow icon={Briefcase} label={labels.workRights}    value={uni.workRights} />
      <InfoRow icon={Award}    label={labels.scholarships}   value={uni.scholarships} />

      {/* Row 7: Stat cards */}
      <StatCards
        globalRanking={uni.globalRanking}
        acceptanceRate={uni.acceptanceRate}
        rankingLabel={labels.globalRanking}
        acceptanceLabel={labels.acceptanceRate}
      />

      {/* Row 8: Popular courses */}
      <PopularCourses courses={uni.popularCourses} label={labels.popularCourses} />
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ComparisonToolSection() {
  const t = useTranslations('Landing.comparisonTool')

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const [uni1Id, setUni1Id] = useState('oxford')
  const [uni1CourseIdx, setUni1CourseIdx] = useState(0)
  const [uni2Id, setUni2Id] = useState('melbourne')
  const [uni2CourseIdx, setUni2CourseIdx] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const sideLabels: SideLabels = {
    selectCourse:      t('selectCourse'),
    estimatedTuition:  t('estimatedTuition'),
    livingCosts:       t('livingCosts'),
    visaProcessing:    t('visaProcessing'),
    workRights:        t('workRights'),
    scholarships:      t('scholarships'),
    globalRanking:     t('globalRanking'),
    acceptanceRate:    t('acceptanceRate'),
    popularCourses:    t('popularCourses'),
    searchPlaceholder: t('searchPlaceholder'),
  }

  return (
    <section className="bg-neutral-100 py-16 sm:py-20 lg:py-24">
      <motion.div
        ref={sectionRef}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
        }
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="font-extrabold text-brand-purple leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 1.2rem + 3.5vw, 3.25rem)' }}
          >
            {t('heading')}
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-10">

          {/* Two sides + VS badge column */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3.5rem_1fr]">

            {/* Side 1 */}
            <div className="lg:pr-8">
              <UniversitySide
                uniId={uni1Id}
                courseIdx={uni1CourseIdx}
                onUniChange={setUni1Id}
                onCourseChange={setUni1CourseIdx}
                sideKey="uni1"
                searchLabel={t('compareUni1')}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                labels={sideLabels}
              />
            </div>

            {/* VS badge — centered in its column on desktop, between sides on mobile */}
            <div className="flex justify-center items-center py-6 lg:py-0">
              <div className="w-12 h-12 rounded-full bg-brand-purple text-white font-bold text-sm flex items-center justify-center shadow-lg shrink-0">
                {t('vs')}
              </div>
            </div>

            {/* Side 2 */}
            <div className="lg:pl-8">
              <UniversitySide
                uniId={uni2Id}
                courseIdx={uni2CourseIdx}
                onUniChange={setUni2Id}
                onCourseChange={setUni2CourseIdx}
                sideKey="uni2"
                searchLabel={t('compareUni2')}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                labels={sideLabels}
              />
            </div>

          </div>

          {/* AI Comparison Summary */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="bg-gradient-to-b from-brand-purple-100/50 to-neutral-50 rounded-xl p-5 border border-[#590D82]/10 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#590D82] to-[#7B2AB5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Sparkles size={12} />
                <span>AI Analysis Summary</span>
              </div>
            </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {t('aiSummary.text')}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1 bg-gradient-to-b from-brand-purple-50/100 to-neutral-100 text-[#590D82] text-xs font-medium px-3 py-1.5 rounded-full border border-[#590D82]/15">
                  <TrendingUp size={12} />

                  {t('aiSummary.insight1')}
                </span>
                <span className="inline-flex items-center gap-1 bg-gradient-to-b from-brand-purple-50/100 to-neutral-100 text-[#590D82] text-xs font-medium px-3 py-1.5 rounded-full border border-[#590D82]/15">
                  <Briefcase size={12} />

                  {t('aiSummary.insight2')}
                </span>
                <span className="inline-flex items-center gap-1 bg-gradient-to-b from-brand-purple-50/100 to-neutral-100 text-[#590D82] text-xs font-medium px-3 py-1.5 rounded-full border border-[#590D82]/15">
                  <GraduationCap size={12} />

                  {t('aiSummary.insight3')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
