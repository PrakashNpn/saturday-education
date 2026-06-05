'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Search,
  Clock, Briefcase, Award, Trophy, TrendingUp, Sparkles, GraduationCap,
} from 'lucide-react'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.18 } },
}

const emptyVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.25 } },
  exit:   { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
}

// ── Types ─────────────────────────────────────────────────────────────────────

type SetDropdown = (key: string | null) => void
type SideLabels = {
  estimatedTuition: string
  visaProcessing: string
  workRights: string
  scholarships: string
  globalRanking: string
  acceptanceRate: string
  popularCourses: string
  searchPlaceholder: string
}

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
  universities,
  selectedId,
  onSelect,
  dropdownKey,
  activeDropdown,
  setActiveDropdown,
  placeholder,
}: {
  universities: ComparisonUniversity[]
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

  const selectedUni = universities.find((u) => u.id === selectedId)

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
    ? universities.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.country.toLowerCase().includes(query.toLowerCase()),
      )
    : universities

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
                  <span className={`text-sm font-medium ${u.id === selectedId ? 'text-brand-purple' : 'text-gray-800'}`}>
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

// ── TuitionRow ─────────────────────────────────────────────────────────────────

function TuitionRow({
  label,
  tuition,
}: {
  label: string
  tuition: ComparisonUniversity['tuition']
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(barRef, { once: true })

  if (!tuition) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-brand-purple">
          {label}
        </span>
        <span className="text-sm text-gray-400">Not available</span>
      </div>
    )
  }

  const { min, max, currency, scale } = tuition
  const leftPercent = (min / scale) * 100
  const widthPercent = ((max - min) / scale) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between gap-2 flex-wrap">
        <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-brand-purple">
          {label}
        </span>
        <span className="whitespace-nowrap">
          <span className="text-sm font-medium text-brand-purple">
            {currency}{min.toLocaleString()} – {currency}{max.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400"> /year</span>
        </span>
      </div>
      <div ref={barRef} className="relative h-2">
        <div className="w-full bg-gray-200 rounded-full h-2" />
        <motion.div
          className="absolute top-0 h-2 rounded-full bg-brand-purple shadow-sm"
          style={{ left: `${leftPercent}%` }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${widthPercent}%` } : { width: '0%' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-white border-2 border-white shadow-sm"
          style={{ left: `${leftPercent}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
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

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <Icon size={18} strokeWidth={3} className="text-brand-purple" />
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-purple">
          {label}
        </span>
      </div>
      <span className="text-sm sm:text-base font-semibold text-gray-800 text-right truncate max-w-[55%]">
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
  globalRanking: number | null
  acceptanceRate: number | null
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
          <span className="text-xl sm:text-2xl font-bold text-gray-800">
            {globalRanking != null ? `#${globalRanking}` : 'N/A'}
          </span>
        </div>
      </div>
      <div className="bg-neutral-100 rounded-xl p-4">
        <p className="text-[0.6rem] sm:text-[0.65rem] text-brand-purple uppercase tracking-wider font-semibold mb-2">
          {acceptanceLabel}
        </p>
        <div className="flex items-center gap-2">
          <TrendingUp size={18} strokeWidth={3} className="text-brand-purple" />
          {acceptanceRate != null ? (
            <span className={`text-xl sm:text-2xl font-bold ${acceptanceRate >= 50 ? 'text-green-600' : 'text-red-500'}`}>
              {acceptanceRate}%
            </span>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-gray-400">N/A</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── PopularCourses ─────────────────────────────────────────────────────────────

function PopularCourses({ courses, label }: { courses: string[]; label: string }) {
  if (courses.length === 0) return null
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
  universities,
  uniId,
  onUniChange,
  sideKey,
  searchLabel,
  activeDropdown,
  setActiveDropdown,
  labels,
}: {
  universities: ComparisonUniversity[]
  uniId: string
  onUniChange: (id: string) => void
  sideKey: string
  searchLabel: string
  activeDropdown: string | null
  setActiveDropdown: SetDropdown
  labels: SideLabels
}) {
  const uni = universities.find((u) => u.id === uniId) ?? null

  return (
    <div className="flex flex-col gap-4">
      {/* University search — full width */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.12em] text-brand-purple">
          {searchLabel}
        </p>
        <UniversitySearchInput
          universities={universities}
          selectedId={uniId}
          onSelect={onUniChange}
          dropdownKey={`${sideKey}-search`}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          placeholder={labels.searchPlaceholder}
        />
      </div>

      <AnimatePresence mode="wait">
        {!uni ? (
          /* Empty state */
          <motion.div
            key="empty"
            variants={emptyVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col items-center justify-center py-12 text-center gap-2 text-gray-300 border-2 border-dashed border-gray-200 rounded-2xl"
          >
            <Search size={28} strokeWidth={1.5} />
            <p className="text-sm font-medium">Search for a university above</p>
          </motion.div>
        ) : (
          /* Data rows — stagger in on selection or university change */
          <motion.div
            key={uni.id}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col gap-4"
          >
            <motion.div variants={itemVariants}>
              <TuitionRow label={labels.estimatedTuition} tuition={uni.tuition} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <InfoRow icon={Clock}     label={labels.visaProcessing} value={uni.visaProcessing} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <InfoRow icon={Briefcase} label={labels.workRights}     value={uni.workRights} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <InfoRow icon={Award}     label={labels.scholarships}   value={uni.scholarships} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCards
                globalRanking={uni.globalRanking}
                acceptanceRate={uni.acceptanceRate}
                rankingLabel={labels.globalRanking}
                acceptanceLabel={labels.acceptanceRate}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PopularCourses courses={uni.popularCourses} label={labels.popularCourses} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── AiSummary ─────────────────────────────────────────────────────────────────

type QA = { q: string; a: string }
type AiResult = { verdict: string; questions: QA[] }

const qaVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const qaItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
}

function AiSummary({
  uni1,
  uni2,
}: {
  uni1: ComparisonUniversity
  uni2: ComparisonUniversity
}) {
  const [result, setResult] = useState<AiResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setResult(null)
      setError(false)
      setIsLoading(true)

      try {
        const res = await fetch('/api/comparison-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uni1, uni2 }),
          signal: controller.signal,
        })

        if (!res.ok || !res.body) { setIsLoading(false); setError(true); return }

        // Accumulate full stream then parse JSON
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          fullText += decoder.decode(value, { stream: true })
        }

        // Extract JSON robustly — Claude sometimes adds prose before/after
        const match = fullText.match(/\{[\s\S]*\}/)
        if (!match) { setIsLoading(false); setError(true); return }

        const parsed: AiResult = JSON.parse(match[0])
        if (parsed.verdict && Array.isArray(parsed.questions)) {
          setResult(parsed)
        } else {
          setError(true)
        }
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setError(true)
      } finally {
        setIsLoading(false)
      }
    }, 800)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [uni1.id, uni2.id])

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <div className="bg-gradient-to-b from-brand-purple-100/50 to-neutral-50 rounded-xl p-5 border border-[#590D82]/10 shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#590D82] to-[#7B2AB5] text-white text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles size={12} />
            <span>AI Advisor</span>
          </div>
          {isLoading && (
            <span className="text-xs text-gray-400 animate-pulse">Analyzing your options…</span>
          )}
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-4">
            {/* Verdict skeleton */}
            <div className="space-y-1.5">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
            {/* Q&A skeletons */}
            {[0, 1, 2].map((i) => (
              <div key={i} className="pt-4 border-t border-gray-100 space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/5" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-5/6" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <p className="text-sm text-gray-400 italic">Couldn't generate analysis. Try selecting again.</p>
        )}

        {/* Result */}
        {!isLoading && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Verdict */}
            <p className="text-brand-purple font-bold text-sm sm:text-base leading-snug mb-4">
              {result.verdict}
            </p>

            {/* Q&A items */}
            <motion.div
              variants={qaVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-100"
            >
              {result.questions.map((item, i) => (
                <motion.div key={i} variants={qaItemVariants} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand-purple text-white text-[0.6rem] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple mb-1">
                        {item.q}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ComparisonToolSection({
  universities,
}: {
  universities: ComparisonUniversity[]
}) {
  const t = useTranslations('Landing.comparisonTool')

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const [uni1Id, setUni1Id] = useState('')
  const [uni2Id, setUni2Id] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const uni1 = universities.find((u) => u.id === uni1Id) ?? null
  const uni2 = universities.find((u) => u.id === uni2Id) ?? null

  const sideLabels: SideLabels = {
    estimatedTuition:  t('estimatedTuition'),
    visaProcessing:    t('visaProcessing'),
    workRights:        t('workRights'),
    scholarships:      t('scholarships'),
    globalRanking:     t('globalRanking'),
    acceptanceRate:    t('acceptanceRate'),
    popularCourses:    t('popularCourses'),
    searchPlaceholder: t('searchPlaceholder'),
  }

  if (universities.length < 2) return null

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

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3.5rem_1fr]">

            {/* Side 1 */}
            <div className="lg:pr-8">
              <UniversitySide
                universities={universities}
                uniId={uni1Id}
                onUniChange={setUni1Id}
                sideKey="uni1"
                searchLabel={t('compareUni1')}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                labels={sideLabels}
              />
            </div>

            {/* VS badge */}
            <div className="flex justify-center items-center py-6 lg:py-0">
              <div className="w-12 h-12 rounded-full bg-brand-purple text-white font-bold text-sm flex items-center justify-center shadow-lg shrink-0">
                {t('vs')}
              </div>
            </div>

            {/* Side 2 */}
            <div className="lg:pl-8">
              <UniversitySide
                universities={universities}
                uniId={uni2Id}
                onUniChange={setUni2Id}
                sideKey="uni2"
                searchLabel={t('compareUni2')}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                labels={sideLabels}
              />
            </div>

          </div>

          {/* AI Summary — animates in once both universities are chosen */}
          <AnimatePresence>
            {uni1 && uni2 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <AiSummary uni1={uni1} uni2={uni2} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </section>
  )
}
