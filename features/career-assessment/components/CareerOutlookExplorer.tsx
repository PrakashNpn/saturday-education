'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight, ChevronRight } from 'lucide-react'
import { CAREERS, getCareerBySlug } from '@/shared/lib/careers/catalog'
import { fieldStyle } from '@/shared/components/careers/fieldStyle'
import { SearchableDropdown, CustomDropdown, type DropdownOption } from '@/shared/components/common'
import type { Career } from '@/shared/lib/careers/catalog'
import type { Horizon } from '@/shared/lib/careers/outlookMaster'
import { CareerOutlookModal } from './CareerOutlookModal'

const HORIZON_OPTIONS: DropdownOption[] = [
  { value: '5', label: 'Next 5 years' },
  { value: '10', label: 'Next 10 years' },
]

// One recognisable career from each of four high-interest fields (IT, Medicine,
// Business, Engineering) — gives both topic and visual (icon/colour) variety.
const POPULAR_SLUGS = ['software-engineer', 'physician', 'marketing-manager', 'mechanical-engineer']

export function CareerOutlookExplorer({ bare }: { bare?: boolean }) {
  const [query, setQuery] = useState('')
  const [horizon, setHorizon] = useState<Horizon>('10')
  const [modalQuery, setModalQuery] = useState<string | null>(null)

  const careerOptions = useMemo<DropdownOption[]>(
    () => CAREERS.map((c) => ({ value: c.title, label: c.title })).sort((a, b) => a.label.localeCompare(b.label)),
    [],
  )
  const popular = useMemo(() => POPULAR_SLUGS.map(getCareerBySlug).filter((c): c is Career => !!c), [])

  const trimmed = query.trim()

  const inner = (
    <div className="flex h-full flex-col">
      <span className="mx-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-purple-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
        <TrendingUp size={12} />
        Career Outlook
      </span>
      <h2 className="mt-2 text-center text-xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-2xl">
        Explore any career&apos;s outlook
      </h2>
      <p className="mx-auto mt-1.5 max-w-sm text-center text-[13px] leading-relaxed text-gray-600">
        Pick or type any career to see its demand, projected growth, and the skills that matter most.
      </p>

      <div className="mt-4 space-y-3">
        <SearchableDropdown
          label="Career"
          value={query}
          options={careerOptions}
          onChange={setQuery}
          allowCustom
          placeholder="Select or type a career"
          searchPlaceholder="Search or type any career…"
          noResultsText="Type to research any career"
        />
        <CustomDropdown
          label="Time horizon"
          value={horizon}
          options={HORIZON_OPTIONS}
          onChange={(v) => setHorizon(v as Horizon)}
          showPlaceholderOption={false}
        />
      </div>

      <button
        type="button"
        disabled={!trimmed}
        onClick={() => trimmed && setModalQuery(trimmed)}
        className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-6 py-2.5 font-semibold text-white shadow-md shadow-brand-purple/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/30 disabled:cursor-not-allowed disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:hover:translate-y-0"
      >
        {trimmed ? 'View outlook' : 'Choose or type a career'}
        <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Popular careers quick-pick */}
      <div className="mt-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Or jump to a popular career</p>
        <div className="space-y-1.5">
          {popular.map((c) => (
            <PopularRow key={c.slug} career={c} onClick={() => setModalQuery(c.title)} />
          ))}
        </div>
      </div>
    </div>
  )

  const modal = <CareerOutlookModal query={modalQuery} horizon={horizon} onClose={() => setModalQuery(null)} />

  if (bare) {
    return (
      <>
        {inner}
        {modal}
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      className="mx-auto w-full max-w-xl"
    >
      <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)] backdrop-blur-sm sm:p-7">
        {inner}
      </div>
      {modal}
    </motion.div>
  )
}

function PopularRow({ career, onClick }: { career: Career; onClick: () => void }) {
  const fs = fieldStyle(career.field)
  const Icon = fs.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-3 py-2 text-left transition-all hover:border-brand-purple/30 hover:bg-brand-purple-50/40"
    >
      <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${fs.iconBg}`}>
        <Icon size={14} />
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-neutral-900">{career.title}</span>
      <ChevronRight size={15} className="flex-shrink-0 text-gray-300" />
    </button>
  )
}
