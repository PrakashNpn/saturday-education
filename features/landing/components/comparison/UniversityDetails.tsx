'use client'

import { useLocale, useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { formatNumber } from '@/shared/utils/formatNumber'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'
import { EASE } from './shared'

/**
 * Approximate USD per one unit of each currency we hold fees in. The figures
 * shown carry a "~" for exactly this reason: rates move, and nobody should
 * quote these back to an admissions office.
 */
const USD_PER_UNIT: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  CHF: 1.12,
  CAD: 0.73,
  AUD: 0.66,
  NZD: 0.6,
  SGD: 0.74,
  AED: 0.27,
  MYR: 0.21,
  THB: 0.028,
  VND: 0.000039,
}


function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-label">
      <span className="font-normal text-muted-text">{label}</span>
      <span className="font-medium text-primary-text">{value}</span>
    </div>
  )
}

/** Just the data, no card chrome of its own: both universities now sit inside
 *  one shared glass panel rather than each owning a separate card. */
export function UniversityDetails({
  university,
  showUsd,
  onToggleCurrency,
}: {
  university: ComparisonUniversity
  showUsd: boolean
  onToggleCurrency: () => void
}) {
  const t = useTranslations('Landing.comparisonTool')
  const locale = useLocale()
  const group = (value: number) => formatNumber(Math.round(value), locale)
  const prefersReducedMotion = useReducedMotion()
  const { tuition } = university

  const rate = tuition ? (USD_PER_UNIT[tuition.currencyCode] ?? null) : null
  const canConvert = rate != null && tuition?.currencyCode !== 'USD'

  let tuitionLabel = t('notAvailable')
  if (tuition) {
    tuitionLabel =
      showUsd && rate != null
        ? `~$${group(tuition.min * rate)}-${group(tuition.max * rate)}${t('perYear')}`
        : `${tuition.currency}${group(tuition.min)}-${group(tuition.max)}${t('perYear')}`
  }

  // Same scale for every university sharing a currency, so two same-currency
  // bars can be read against each other rather than each filling its own track.
  const left = tuition ? (tuition.min / tuition.scale) * 100 : 0
  const width = tuition ? ((tuition.max - tuition.min) / tuition.scale) * 100 : 0

  // Each block below is its own stagger item rather than the whole card
  // fading in as one piece, so the data reads top to bottom as it appears
  // instead of landing all at once.
  const item = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: EASE },
    },
  }

  return (
    <div>
      <motion.div variants={item}>
        <b className="mb-1 block text-card font-medium">{university.name}</b>
        <p className="mb-3 text-label font-normal text-muted-text">{university.country}</p>
      </motion.div>

      <motion.div variants={item} className="border-t border-stroke/70 pt-3">
        <div className="mb-1.5 flex items-baseline justify-between gap-4 text-label">
          <span className="flex items-baseline gap-2 font-normal text-muted-text">
            {t('tuition')}
            {canConvert && (
              <button
                type="button"
                onClick={onToggleCurrency}
                className="inline-flex cursor-pointer items-center gap-2 text-label font-medium text-action"
              >
                <span className="underline underline-offset-[3px]">
                  {showUsd ? t('showLocal') : t('showUsd')}
                </span>
              </button>
            )}
          </span>
          <span className="font-medium text-primary-text">{tuitionLabel}</span>
        </div>
        <div className="relative h-1.5 w-full rounded-full bg-surface-2">
          {tuition && (
            <div
              className="absolute inset-y-0 rounded-full bg-gradient-to-r from-accent to-accent-ink"
              style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }}
            />
          )}
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-3 flex flex-col gap-2 border-t border-stroke/70 pt-3">
        <Row
          label={t('globalRanking')}
          value={university.globalRanking ? `#${university.globalRanking}` : t('notAvailable')}
        />
        <Row
          label={t('acceptanceRate')}
          value={
            university.acceptanceRate != null
              ? `${Math.round(university.acceptanceRate)}%`
              : t('notAvailable')
          }
        />
        <Row label={t('visaProcessing')} value={university.visaProcessing} />
        <Row label={t('scholarships')} value={university.scholarships} />
        <Row label={t('workRights')} value={university.workRights} />
      </motion.div>

      {university.popularCourses.length > 0 && (
        <motion.div variants={item} className="mt-3 border-t border-stroke/70 pt-3">
          <p className="mb-1.5 text-label font-medium text-primary-text">{t('popularCourses')}</p>
          <ul className="flex flex-wrap gap-1.5">
            {university.popularCourses.map((course) => (
              <li
                key={course}
                className="rounded-sm border border-stroke bg-surface-1 px-2 py-1 text-min font-medium text-secondary-text"
              >
                {course}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
