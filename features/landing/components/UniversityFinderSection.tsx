'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Sparkles, Check, GraduationCap, MapPin, BookOpen } from 'lucide-react'
import { useRouter } from '@/i18n/navigation'

// ── Degree label map ──────────────────────────────────────────────────────────

const DEGREE_LABELS: Record<string, string> = {
  BACHELOR: "Bachelor's",
  MASTER: "Master's",
  PHD: 'PhD',
  DIPLOMA: 'Diploma',
  ASSOCIATE: 'Associate',
  CERTIFICATE: 'Certificate',
  FOUNDATION: 'Foundation / Pathway',
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface FinderDropdownOptions {
  countries: { id: string; name: string; slug: string }[]
  programFields: string[]
  degreeLevels: string[]
}

interface Props {
  dropdownOptions: FinderDropdownOptions
}

// ── FilterDropdown sub-component ──────────────────────────────────────────────

function FilterDropdown({
  label,
  icon: Icon,
  options,
  selected,
  onSelect,
  hasDivider,
  prefersReducedMotion,
  searchable = false,
}: {
  label: string
  icon: React.ElementType
  options: { value: string; label: string }[]
  selected: string
  onSelect: (value: string) => void
  hasDivider: boolean
  prefersReducedMotion: boolean
  searchable?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedLabel = selected ? (options.find((o) => o.value === selected)?.label ?? selected) : null
  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

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
      className={`relative flex-1 min-w-0 px-4 py-3 flex items-center ${
        hasDivider ? 'border-b border-gray-200 lg:border-b-0 lg:border-r' : ''
      }`}
    >
      {/* Single-line trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={label}
        className="w-full flex items-center justify-between gap-3 cursor-pointer group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex items-center justify-center w-8 h-8 bg-brand-purple rounded-lg  shrink-0 group-hover:bg-brand-purple transition-colors duration-150">
            <Icon size={20} className="text-white" />
          </span>
          <span
            className={`font-medium whitespace-nowrap transition-colors duration-150 ${
              selectedLabel
                ? 'text-brand-purple group-hover:text-brand-purple-dark'
                : 'text-gray-400'
            }`}
            style={{ fontSize: selectedLabel ? 'clamp(0.9375rem, 0.7rem + 0.5vw, 1rem)' : 'clamp(0.75rem, 0.65rem + 0.25vw, 0.75rem)' }}
          >
            {selectedLabel ?? label}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={16} className="text-gray-400 group-hover:text-brand-purple transition-colors duration-150" />
        </motion.span>
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
            className="absolute top-full left-0 mt-2 min-w-[220px] w-full bg-white border border-gray-100 rounded-xl shadow-lg z-50"
          >
            {/* Search input — country and course only */}
            {searchable && (
              <div className="px-2.5 pt-2.5 pb-2 border-b border-gray-100">
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-7 pr-2.5 py-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-brand-purple transition-colors duration-150"
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <div className="overflow-y-auto py-1 max-h-52">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-gray-400">No results</p>
              ) : (
                filtered.map((opt) => {
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
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function UniversityFinderSection({ dropdownOptions }: Props) {
  const t = useTranslations('Landing.universityFinder')
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const [studyLevel, setStudyLevel] = useState('')
  const [country, setCountry]       = useState('')
  const [course, setCourse]         = useState('')

  const studyLevelOptions = dropdownOptions.degreeLevels.map((d) => ({
    value: d,
    label: DEGREE_LABELS[d] ?? d,
  }))

  const countryOptions = dropdownOptions.countries.map((c) => ({
    value: c.name,
    label: c.name,
  }))

  const courseOptions = dropdownOptions.programFields.map((f) => ({
    value: f,
    label: f,
  }))

  function handleSearch() {
    const params = new URLSearchParams()
    if (studyLevel) params.set('degree', studyLevel)
    if (country) params.set('country', country)
    if (course) params.set('course', course)
    const query = params.toString()
    router.push(`/universities${query ? `?${query}` : ''}`)
  }

  return (
    <section className="bg-neutral-100 py-10 md:py-14">
      <motion.div
        ref={ref}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const }
        }
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Container card */}
        <div className="relative bg-gradient-to-b from-brand-purple-100/50 to-neutral-100 rounded-3xl shadow-lg px-8 sm:px-10 lg:px-12 pt-10 pb-10 sm:pt-12 sm:pb-12">

          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-brand-purple" />
            <span
              className="text-brand-purple uppercase font-semibold tracking-[0.15em]"
              style={{ fontSize: 'clamp(0.6rem, 0.5rem + 0.2vw, 0.7rem)' }}
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
          <div className="bg-neutral-100 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row">

              {/* Study Level — simple dropdown, no search */}
              <FilterDropdown
                label={t('studyLevelLabel')}
                icon={GraduationCap}
                options={studyLevelOptions}
                selected={studyLevel}
                onSelect={setStudyLevel}
                hasDivider={true}
                prefersReducedMotion={prefersReducedMotion}
              />

              {/* Target Country — searchable */}
              <FilterDropdown
                label={t('countryLabel')}
                icon={MapPin}
                options={countryOptions}
                selected={country}
                onSelect={setCountry}
                hasDivider={true}
                prefersReducedMotion={prefersReducedMotion}
                searchable
              />

              {/* Desired Course — searchable */}
              <FilterDropdown
                label={t('courseLabel')}
                icon={BookOpen}
                options={courseOptions}
                selected={course}
                onSelect={setCourse}
                hasDivider={false}
                prefersReducedMotion={prefersReducedMotion}
                searchable
              />

              {/* Find Universities button */}
              <div className="px-3 py-3 lg:py-0 lg:px-3 flex items-stretch">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold rounded-xl px-6 py-3 lg:my-1.5 transition-colors duration-200 whitespace-nowrap cursor-pointer text-sm"
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
