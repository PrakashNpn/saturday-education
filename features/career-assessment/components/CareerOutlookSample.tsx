'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import type { OutlookView } from '@/shared/lib/careers/outlookMaster'
import { Link } from '@/i18n/navigation'
import { workStyleOf } from '../utils/workStyle'

const EASE = [0, 0, 0.2, 1] as const

interface Props {
  career: OutlookView
  horizonYears: number
  onStart: () => void
  /** Alternating band colour, applied to the section as the design has it. */
  tone: 'surface' | 'canvas'
}

/** Bars are scaled against this career's own range rather than 0-100, so a
 *  shallow curve still reads as a shape. Floor of 30% keeps the smallest bar
 *  visible; the design uses the same span. */
const MIN_H = 30
const SPAN = 65

function GraduationIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-3 shrink-0">
      <path d="M8 1.5 1 5l7 3.5L15 5 8 1.5ZM2.5 7.6v3.2c0 1.8 2.5 3.2 5.5 3.2s5.5-1.4 5.5-3.2V7.6l-5.5 2.75L2.5 7.6Z" />
    </svg>
  )
}

function SkillList({ skills }: { skills: string[] }) {
  return (
    <ol className="space-y-2.5">
      {skills.map((skill, i) => (
        <li
          key={skill}
          className="flex items-start gap-2.5 text-label font-normal text-secondary-text"
        >
          <span className="shrink-0 font-mono text-min font-medium text-action">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="leading-snug">{skill}</span>
        </li>
      ))}
    </ol>
  )
}

export function CareerOutlookSample({ career, horizonYears, onStart, tone }: Props) {
  const t = useTranslations('careerAssessment.outlook')
  const prefersReducedMotion = useReducedMotion()

  const trend = career.outlook.trend
  const startYear = new Date().getFullYear()
  const step = horizonYears === 5 ? 1 : 2
  const growth =
    trend.length > 1 && trend[0] > 0
      ? Math.round(((trend[trend.length - 1] - trend[0]) / trend[0]) * 100)
      : 0

  const min = Math.min(...trend)
  const max = Math.max(...trend)
  // Rounded to whole percent, as the design does, so bar heights stay stable
  // rather than drifting on sub-pixel values.
  const heightOf = (v: number) =>
    max === min ? MIN_H + SPAN : Math.round(MIN_H + ((v - min) / (max - min)) * SPAN)

  return (
    <section
      className={`scroll-mt-48 py-16 max-tablet:py-12 ${tone === 'surface' ? 'bg-surface' : 'bg-canvas'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: EASE }}
        className="mx-auto max-w-wrap space-y-6 px-6"
      >
        <div>
          <h2 className="text-title leading-tight font-medium tracking-tight text-primary-text">
            {career.title}
          </h2>
          <p className="mt-1.5 text-body leading-relaxed font-normal text-secondary-text">
            {career.summary}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {career.relatedFields.map((field) => (
              <span
                key={field}
                className="inline-flex items-center gap-1 rounded-[4px] border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-min font-medium text-emerald-700"
              >
                <GraduationIcon />
                {field}
              </span>
            ))}
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="flex h-full flex-col overflow-hidden rounded-sm border border-stroke bg-surface shadow-xs">
            <div className="grid grid-cols-[0.85fr_1.2fr_1.25fr] divide-x divide-stroke border-b border-stroke bg-surface">
              <div className="p-3 sm:p-3.5">
                <p className="mb-1 text-min font-medium text-muted-text uppercase">
                  {t('demandNow')}
                </p>
                <p className="text-label leading-tight font-medium text-primary-text">
                  {career.outlook.demand}
                </p>
              </div>
              <div className="p-3 sm:p-3.5">
                <p className="mb-1 text-min font-medium text-muted-text uppercase">
                  {t('trajectory', { years: horizonYears })}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <p className="text-label leading-tight font-medium text-action">
                    ~{growth > 0 ? '+' : ''}
                    {growth}%
                  </p>
                  <span className="rounded-full bg-action px-2 py-0.5 text-min leading-none font-medium text-white shadow-2xs">
                    {career.outlook.growthLabel}
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-3.5">
                <p className="mb-1 text-min font-medium text-muted-text uppercase">{t('bestFit')}</p>
                <p className="text-label leading-tight font-medium text-primary-text">
                  {workStyleOf(career.riasec)}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between bg-[#fafafa] p-5 sm:p-6">
              <div>
                <h3 className="text-card font-medium text-primary-text">
                  {t('chartTitle', {
                    years: horizonYears,
                    start: startYear,
                    end: startYear + horizonYears,
                  })}
                </h3>
                <p className="mt-1 text-label leading-relaxed font-normal text-secondary-text">
                  {career.outlook.marketNote}
                </p>
              </div>

              <div className="mt-7">
                <div className="flex h-40 items-end justify-between gap-2 border-b border-stroke pt-4 sm:gap-3">
                  {trend.map((value, i) => {
                    const last = i === trend.length - 1
                    return (
                      <div
                        key={i}
                        className="group flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <span
                          className={`mb-1.5 font-mono text-min transition-colors ${
                            last
                              ? 'font-medium text-action'
                              : 'text-muted-text group-hover:text-primary-text'
                          }`}
                        >
                          {value}
                        </span>
                        <div
                          className={`w-full max-w-[38px] rounded-t-xs transition-all duration-300 ${
                            last ? 'bg-action shadow-xs' : 'bg-action/65 group-hover:bg-action/85'
                          }`}
                          style={{ height: `${heightOf(value)}%` }}
                        />
                        <span
                          className={`mt-2 font-mono text-min ${
                            last ? 'font-medium text-action' : 'text-secondary-text'
                          }`}
                        >
                          {startYear + i * step}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <p className="mt-3 text-min text-muted-text">
                  {t('source', { sources: career.outlook.sources.join(', ') })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col divide-y divide-stroke overflow-hidden rounded-sm border border-stroke bg-surface shadow-xs">
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-card font-medium text-primary-text">{t('emerging')}</h3>
                <span className="rounded-full bg-tint px-2 py-0.5 text-min font-medium text-action">
                  {t('emergingBadge')}
                </span>
              </div>
              <SkillList skills={career.niceToHaveSkills} />
            </div>

            <div className="flex flex-1 flex-col bg-[#fafafa] p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-card font-medium text-primary-text">{t('core')}</h3>
                <span className="rounded-full border border-stroke bg-surface-1 px-2 py-0.5 text-min font-medium text-muted-text">
                  {t('coreBadge')}
                </span>
              </div>
              <SkillList skills={career.requiredSkills} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-stroke pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-card font-medium text-primary-text">{t('interestedTitle')}</p>
            <p className="mt-1 text-label leading-relaxed font-normal text-secondary-text">
              {t('interestedBody')}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2.5 sm:items-end">
            <Link
              href="/#consultation"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-action px-6 text-label font-medium whitespace-nowrap text-action transition-colors hover:bg-tint"
            >
              {t('book')}
            </Link>
            <button
              type="button"
              onClick={onStart}
              className="inline-flex cursor-pointer items-center gap-1.5 text-label font-medium text-action transition-colors hover:text-action-hover"
            >
              <span>{t('takeAssessment')}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
