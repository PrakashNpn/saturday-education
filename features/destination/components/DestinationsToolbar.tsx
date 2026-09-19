'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { REGIONS, REGION_TAB_LABELS } from '../utils/constants'
import type { SortOption } from '../utils/constants'

const EASE = [0, 0, 0.2, 1] as const

interface Props {
  region: string
  onRegionChange: (region: string) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  counts: Record<string, number>
  resultCount: number
}

export function DestinationsToolbar({
  region,
  onRegionChange,
  sort,
  onSortChange,
  counts,
  resultCount,
}: Props) {
  const t = useTranslations('destinations')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="border-t border-stroke pt-4 pb-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, delay: 0.18, ease: EASE }}
        className="mx-auto max-w-wrap px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stroke">
          {/* Five tabs plus count pills don't fit one row under ~640px, so
              flex-wrap was dropping the last two onto a second line. Below
              tablet this scrolls horizontally instead — shrink-0 so a tab
              never gets squeezed, scrollbar-hide (already used for the
              marquee carousels) so the scroll affordance is the swipe
              itself, not a visible scrollbar. */}
          <div className="flex gap-6 max-tablet:flex-nowrap max-tablet:overflow-x-auto max-tablet:scrollbar-hide">
            {REGIONS.map((r) => {
              const count = r === 'All' ? counts._total : (counts[r] ?? 0)
              // A region with nothing published would be a dead tab.
              if (r !== 'All' && count === 0) return null
              const active = region === r
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => onRegionChange(r)}
                  aria-pressed={active}
                  className={`-mb-px flex shrink-0 cursor-pointer items-center gap-2 border-b-2 pb-2.5 text-label font-medium transition-colors ${
                    active
                      ? 'border-action text-action'
                      : 'border-transparent text-secondary-text hover:text-primary-text'
                  }`}
                >
                  {t(REGION_TAB_LABELS[r])}
                  <span className="rounded-full bg-surface-1 px-2 py-0.5 text-min tabular-nums">
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2 pb-2 max-tablet:w-full max-tablet:justify-between">
            <span className="text-label font-normal text-muted-text">{t('sortBy')}</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(event) => onSortChange(event.target.value as SortOption)}
                aria-label={t('sortBy')}
                className="h-8 cursor-pointer appearance-none rounded-[6px] border border-stroke bg-surface pr-8 pl-3 text-label font-medium text-primary-text transition-colors hover:border-muted-text/50 focus:border-action focus:outline-none"
              >
                <option value="popular">{t('sortPopular')}</option>
                <option value="name">{t('sortName')}</option>
              </select>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-text"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <p className="mt-3 text-label font-medium text-muted-text">
          {t('showingCount', { count: resultCount })}
        </p>
      </motion.div>
    </section>
  )
}
