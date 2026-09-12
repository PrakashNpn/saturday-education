'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { CAREERS, getCareerBySlug } from '@/shared/lib/careers/catalog'
import { catalogCareerToMaster, deriveHorizonView } from '@/shared/lib/careers/outlookMaster'
import { SearchableDropdown, CustomDropdown, type DropdownOption } from '@/shared/components/common'
import type { Horizon } from '@/shared/lib/careers/outlookMaster'
import { CareerOutlookModal } from './CareerOutlookModal'
import { CareerOutlookSample } from './CareerOutlookSample'

/** Sits below the header (62px) and the mode tabs (69px). The container's own
 *  top padding opens the gap between the tabs and the card. */
/** Preselected the way the design has it, so the panel opens ready to use
 *  rather than behind a disabled button. Any of the 60 careers can replace it,
 *  and free text is still accepted. */
const DEFAULT_CAREER = getCareerBySlug('software-engineer')?.title ?? ''

/** Shown under the panel so the page is useful before anyone runs a query.
 *  These are real catalog entries, not mock copy, so they cannot contradict
 *  what the modal reports for the same career. */
const SAMPLE_SLUGS = ['software-engineer', 'data-scientist', 'marketing-manager', 'physician']

/** Past this the panel collapses to a single compact row, matching the design. */
const COMPACT_AFTER = 60

const EASE = [0, 0, 0.2, 1] as const

export function CareerOutlookExplorer({ onStart }: { onStart: () => void }) {
  const t = useTranslations('careerAssessment.outlook')
  const prefersReducedMotion = useReducedMotion()
  const [query, setQuery] = useState(DEFAULT_CAREER)
  const [horizon, setHorizon] = useState<Horizon>('10')
  const [modalQuery, setModalQuery] = useState<string | null>(null)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      setCompact(window.scrollY > COMPACT_AFTER)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [])

  const careerOptions = useMemo<DropdownOption[]>(
    () =>
      CAREERS.map((c) => ({ value: c.title, label: c.title })).sort((a, b) =>
        a.label.localeCompare(b.label),
      ),
    [],
  )

  const horizonOptions: DropdownOption[] = [
    { value: '5', label: t('horizon5') },
    { value: '10', label: t('horizon10') },
  ]

  const trimmed = query.trim()
  const horizonYears = horizon === '5' ? 5 : 10

  // Derived from the same master record the modal uses, so the samples follow
  // the Time Horizon select instead of being frozen at ten years.
  const samples = useMemo(
    () =>
      SAMPLE_SLUGS.map(getCareerBySlug)
        .filter((c) => !!c)
        .map((c) => deriveHorizonView(catalogCareerToMaster(c), horizon)),
    [horizon],
  )

  return (
    <>
      <div className="pointer-events-none sticky top-[122px] z-20 pt-4 pb-3 sm:pt-5 sm:pb-3.5">
        <div className="pointer-events-auto mx-auto max-w-wrap px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
            className={`rounded-md border border-action/25 bg-tint/95 shadow-card backdrop-blur-md transition-all duration-300 ${
              compact ? 'p-3.5 shadow-md sm:px-6 sm:py-3.5' : 'p-4 sm:p-5'
            }`}
          >
            {compact ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-body font-medium tracking-tight whitespace-nowrap text-primary-text">
                  {t('title')}
                </span>

                <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto sm:flex-nowrap">
                  <SearchableDropdown
                    variant="field"
                    size="compact"
                    className="min-w-[180px] flex-1 sm:w-56"
                    value={query}
                    options={careerOptions}
                    onChange={setQuery}
                    allowCustom
                    placeholder={t('careerPlaceholder')}
                    searchPlaceholder={t('careerSearchPlaceholder')}
                    noResultsText={t('careerNoResults')}
                  />
                  <CustomDropdown
                    variant="field"
                    size="compact"
                    className="w-28 shrink-0"
                    value={horizon}
                    options={horizonOptions}
                    onChange={(v) => setHorizon(v as Horizon)}
                    showPlaceholderOption={false}
                  />
                  <button
                    type="button"
                    disabled={!trimmed}
                    onClick={() => trimmed && setModalQuery(trimmed)}
                    className="inline-flex h-9 min-h-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-4 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:bg-stroke-strong"
                  >
                    <span aria-hidden="true" className="mr-1">
                      ✨
                    </span>
                    <span>{t('calculateShort')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-md">
                    <h1 className="text-section leading-tight font-medium tracking-tight text-primary-text">
                      {t('title')}
                    </h1>
                    <p className="mt-1 text-label leading-relaxed font-normal text-secondary-text">
                      {t('subtitleLine1')}
                      <br className="hidden sm:inline" /> {t('subtitleLine2')}
                    </p>
                  </div>

                  {/* The design's native selects size to their longest option, which
                      fills the row; our button triggers do not, so the group takes
                      the free space instead to land on the same width. */}
                  <div className="grid w-full gap-3.5 sm:w-auto sm:min-w-[480px] sm:grid-cols-2 lg:flex-1">
                    <SearchableDropdown
                      variant="field"
                      label={t('careerLabel')}
                      value={query}
                      options={careerOptions}
                      onChange={setQuery}
                      allowCustom
                      placeholder={t('careerPlaceholder')}
                      searchPlaceholder={t('careerSearchPlaceholder')}
                      noResultsText={t('careerNoResults')}
                    />
                    <CustomDropdown
                      variant="field"
                      label={t('horizonLabel')}
                      value={horizon}
                      options={horizonOptions}
                      onChange={(v) => setHorizon(v as Horizon)}
                      showPlaceholderOption={false}
                    />
                  </div>
                </div>

                <div className="mt-3.5 flex flex-col gap-4 border-t border-action/20 pt-3 text-min sm:flex-row sm:items-center sm:justify-between">
                  <div className="leading-relaxed text-muted-text">
                    <p>{t('note1', { years: horizon })}</p>
                    <p>{t('note2')}</p>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      disabled={!trimmed}
                      onClick={() => trimmed && setModalQuery(trimmed)}
                      className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-8 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:bg-stroke-strong disabled:text-white"
                    >
                      <span aria-hidden="true" className="mr-1.5">
                        ✨
                      </span>
                      {trimmed ? t('calculate') : t('calculateHint')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="divide-y divide-stroke border-b border-stroke">
        {samples.map((career, i) => (
          <CareerOutlookSample
            key={career.slug}
            career={career}
            horizonYears={horizonYears}
            onStart={onStart}
            tone={i % 2 === 0 ? 'surface' : 'canvas'}
          />
        ))}
      </div>

      <CareerOutlookModal
        query={modalQuery}
        horizon={horizon}
        onClose={() => setModalQuery(null)}
        onStart={onStart}
      />
    </>
  )
}
