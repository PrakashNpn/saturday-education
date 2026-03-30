'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Sparkles, Check } from 'lucide-react'

// ── Dropdown data ─────────────────────────────────────────────────────────────

const STUDY_LEVEL_OPTIONS = [
  { value: 'undergraduate',  label: 'Undergraduate' },
  { value: 'postgraduate',   label: "Postgraduate (Master's)" },
  { value: 'phd',            label: 'PhD / Doctorate' },
  { value: 'foundation',     label: 'Foundation / Pathway' },
  { value: 'diploma',        label: 'Diploma' },
  { value: 'certificate',    label: 'Certificate' },
]

const COUNTRY_OPTIONS = [
  { value: 'uk',          label: 'United Kingdom' },
  { value: 'au',          label: 'Australia' },
  { value: 'us',          label: 'United States' },
  { value: 'ca',          label: 'Canada' },
  { value: 'nz',          label: 'New Zealand' },
  { value: 'ch',          label: 'Switzerland' },
  { value: 'ie',          label: 'Ireland' },
  { value: 'sg',          label: 'Singapore' },
  { value: 'th',          label: 'Thailand' },
]

const COURSE_OPTIONS = [
  { value: 'cs',          label: 'Computer Science' },
  { value: 'business',    label: 'Business & Management' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'medicine',    label: 'Medicine & Health' },
  { value: 'law',         label: 'Law' },
  { value: 'data',        label: 'Data Science & AI' },
  { value: 'arts',        label: 'Arts & Design' },
  { value: 'economics',   label: 'Economics & Finance' },
  { value: 'environment', label: 'Environmental Science' },
]

// ── FilterDropdown sub-component ──────────────────────────────────────────────

function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
  hasDivider,
  prefersReducedMotion,
}: {
  label: string
  options: { value: string; label: string }[]
  selected: string
  onSelect: (value: string) => void
  hasDivider: boolean
  prefersReducedMotion: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((o) => o.value === selected)?.label ?? selected

  // Click-outside to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  return (
    <div
      ref={wrapperRef}
      className={`relative flex-1 min-w-0 ${
        hasDivider ? 'border-b border-gray-200 md:border-b-0 md:border-r' : ''
      }`}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full h-full px-6 py-5 flex flex-col gap-1 text-left cursor-pointer hover:bg-gray-50 transition-colors duration-150"
      >
        <span
          className="text-brand-purple uppercase font-semibold leading-none tracking-[0.12em]"
          style={{ fontSize: 'clamp(0.575rem, 0.45rem + 0.25vw, 0.7rem)' }}
        >
          {label}
        </span>
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-gray-800 font-medium whitespace-nowrap"
            style={{ fontSize: 'clamp(0.9375rem, 0.7rem + 0.6vw, 1.125rem)' }}
          >
            {selectedLabel}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown size={16} className="text-gray-400" />
          </motion.span>
        </div>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scaleY: 0.95, y: -4 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scaleY: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute top-full left-0 mt-1 min-w-[200px] w-full bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1 overflow-hidden"
          >
            {options.map((opt) => {
              const isSelected = opt.value === selected
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onSelect(opt.value); setIsOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left cursor-pointer transition-colors duration-100 ${
                    isSelected
                      ? 'bg-purple-50 text-brand-purple font-medium'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                  style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)' }}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={14} className="text-brand-purple shrink-0" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function UniversityFinderSection() {
  const t = useTranslations('Landing.universityFinder')

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const [studyLevel, setStudyLevel] = useState('undergraduate')
  const [country, setCountry]       = useState('uk')
  const [course, setCourse]         = useState('cs')

  return (
    <section className="bg-[#f0faf5] py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const }
        }
        className="max-w-7xl mx-auto"
      >
        {/* Container card */}
        <div className="relative bg-white rounded-3xl shadow-lg px-8 sm:px-12 lg:px-14 pt-10 pb-10 sm:pt-12 sm:pb-12">

          {/* Gradient top-edge line */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#590D82] to-transparent" />

          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-brand-purple" />
            <span
              className="text-brand-purple uppercase font-semibold tracking-[0.15em]"
              style={{ fontSize: 'clamp(0.6rem, 0.5rem + 0.25vw, 0.75rem)' }}
            >
              {t('badge')}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-extrabold text-brand-purple leading-tight mb-2"
            style={{ fontSize: 'clamp(2rem, 1.2rem + 3.5vw, 3.25rem)' }}
          >
            {t('heading')}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 mb-8 text-base sm:text-lg">
            {t('subtitle')}
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row">

              <FilterDropdown
                label={t('studyLevelLabel')}
                options={STUDY_LEVEL_OPTIONS}
                selected={studyLevel}
                onSelect={setStudyLevel}
                hasDivider={true}
                prefersReducedMotion={prefersReducedMotion}
              />
              <FilterDropdown
                label={t('countryLabel')}
                options={COUNTRY_OPTIONS}
                selected={country}
                onSelect={setCountry}
                hasDivider={true}
                prefersReducedMotion={prefersReducedMotion}
              />
              <FilterDropdown
                label={t('courseLabel')}
                options={COURSE_OPTIONS}
                selected={course}
                onSelect={setCourse}
                hasDivider={false}
                prefersReducedMotion={prefersReducedMotion}
              />

              {/* Find Universities button */}
              <div className="px-4 py-3 md:py-0 md:px-4 flex items-stretch">
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-center gap-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold rounded-xl px-8 py-5 md:my-3 transition-colors duration-200 whitespace-nowrap cursor-pointer text-base sm:text-lg"
                >
                  <Search size={18} />
                  {t('searchButton')}
                </button>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
