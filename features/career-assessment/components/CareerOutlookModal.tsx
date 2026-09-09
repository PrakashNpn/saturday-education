'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SearchX, RotateCw, Clock } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { deriveHorizonView, type Horizon, type OutlookView } from '@/shared/lib/careers/outlookMaster'
import { workStyleOf } from '../utils/workStyle'
import { getCareerOutlook } from '../services/careerOutlookService'
import { CareerOutlookResearching } from './CareerOutlookResearching'

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[4px] border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-min font-medium text-emerald-700">
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-3 shrink-0">
        <path d="M8 1.5 1 5l7 3.5L15 5 8 1.5ZM2.5 7.6v3.2c0 1.8 2.5 3.2 5.5 3.2s5.5-1.4 5.5-3.2V7.6l-5.5 2.75L2.5 7.6Z" />
      </svg>
      {label}
    </span>
  )
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="p-3 sm:p-3.5">
      <p className="mb-1 text-min font-medium text-muted-text uppercase">{label}</p>
      {children}
    </div>
  )
}

function SkillList({ skills, numberClass }: { skills: string[]; numberClass: string }) {
  return (
    <ol className="space-y-2.5">
      {skills.map((skill, i) => (
        <li key={skill} className="flex items-start gap-2.5 text-label font-normal text-secondary-text">
          <span className={`shrink-0 font-mono text-min ${numberClass}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="leading-snug">{skill}</span>
        </li>
      ))}
    </ol>
  )
}

/** Bars scale against this career's own range, matching the sample sections. */
const MIN_H = 30
const SPAN = 65

function ModalBody({
  career,
  horizonYears,
  onStart,
}: {
  career: OutlookView
  horizonYears: number
  onStart?: () => void
}) {
  const t = useTranslations('careerAssessment.outlook')
  const trend = career.outlook.trend
  const startYear = new Date().getFullYear()
  const step = horizonYears === 5 ? 1 : 2
  const growth =
    trend.length > 1 && trend[0] > 0
      ? Math.round(((trend[trend.length - 1] - trend[0]) / trend[0]) * 100)
      : 0

  const min = Math.min(...trend)
  const max = Math.max(...trend)
  const heightOf = (v: number) =>
    max === min ? MIN_H + SPAN : Math.round(MIN_H + ((v - min) / (max - min)) * SPAN)

  return (
    <div className="space-y-5 p-6 sm:p-7">
      <div>
        <h2 className="pr-10 text-title leading-tight font-medium tracking-tight text-primary-text">
          {career.title}
        </h2>
        <p className="mt-1.5 text-body leading-relaxed font-normal text-secondary-text">
          {career.summary}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {career.relatedFields.map((field) => (
            <Chip key={field} label={field} />
          ))}
        </div>
      </div>

      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <div className="flex h-full flex-col overflow-hidden rounded-sm border border-stroke bg-surface shadow-xs">
          <div className="grid grid-cols-[0.85fr_1.2fr_1.25fr] divide-x divide-stroke border-b border-stroke bg-surface">
            <Cell label={t('demandNow')}>
              <p className="text-label leading-tight font-medium text-primary-text">
                {career.outlook.demand}
              </p>
            </Cell>
            <Cell label={t('trajectory', { years: horizonYears })}>
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="text-label leading-tight font-medium text-action">
                  ~{growth > 0 ? '+' : ''}
                  {growth}%
                </p>
                <span className="rounded-full bg-action px-2 py-0.5 text-min leading-none font-medium text-white shadow-2xs">
                  {career.outlook.growthLabel}
                </span>
              </div>
            </Cell>
            <Cell label={t('bestFit')}>
              <p className="text-label leading-tight font-medium text-primary-text">
                {workStyleOf(career.riasec)}
              </p>
            </Cell>
          </div>

          <div className="flex flex-1 flex-col justify-between bg-[#fafafa] p-5 sm:p-5.5">
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

            <div className="mt-4">
              <div className="flex h-32 items-end justify-between gap-2 border-b border-stroke pt-3 sm:h-36 sm:gap-3">
                {trend.map((value, i) => {
                  const last = i === trend.length - 1
                  return (
                    <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end">
                      <span
                        className={`mb-1.5 font-mono text-min transition-colors ${
                          last
                            ? 'font-semibold text-action'
                            : 'text-muted-text group-hover:text-primary-text'
                        }`}
                      >
                        {value}
                      </span>
                      <div
                        className={`w-full max-w-[38px] rounded-t-[3px] transition-all duration-300 ${
                          last ? 'bg-action shadow-xs' : 'bg-action/25 hover:bg-action/50'
                        }`}
                        style={{ height: `${heightOf(value)}%` }}
                      />
                      <span
                        className={`mt-2 font-mono text-min transition-colors ${
                          last ? 'font-medium text-primary-text' : 'text-secondary-text'
                        }`}
                      >
                        {startYear + i * step}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-2.5 flex items-center justify-between text-min text-muted-text">
                <span>{t('indexNote', { start: startYear })}</span>
                <span>{t('projected', { growth: `${growth > 0 ? '+' : ''}${growth}` })}</span>
              </div>

              <p className="mt-3.5 border-t border-stroke/70 pt-2.5 text-min leading-relaxed font-normal text-muted-text">
                {t('source', { sources: career.outlook.sources.join(', ') })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col divide-y divide-stroke overflow-hidden rounded-sm border border-stroke bg-surface shadow-xs">
          <div className="bg-tint/20 p-5 sm:p-5.5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-label font-medium text-primary-text">{t('emerging')}</p>
              <span className="rounded-full border border-action/30 bg-action/15 px-2 py-0.5 text-min font-medium text-action">
                {t('emergingBadge')}
              </span>
            </div>
            <SkillList skills={career.niceToHaveSkills} numberClass="font-semibold text-action/70" />
          </div>

          <div className="p-5 sm:p-5.5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-label font-medium text-primary-text">{t('coreModal')}</p>
              <span className="rounded-full border border-stroke bg-surface-0 px-2 py-0.5 text-min font-normal text-muted-text">
                {t('coreModalBadge')}
              </span>
            </div>
            <SkillList skills={career.requiredSkills} numberClass="font-medium text-muted-text" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-stroke pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-card font-medium text-primary-text">{t('interestedTitle')}</p>
          <p className="mt-0.5 text-label leading-relaxed font-normal text-secondary-text">
            {t('interestedBodyShort')}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/#consultation"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            {t('bookShort')}
          </Link>
          {onStart && (
            <button
              type="button"
              onClick={onStart}
              className="cursor-pointer text-label font-medium text-action underline-offset-2 transition-colors hover:underline"
            >
              {t('takeAssessmentShort')} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function StateMessage({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-sm bg-surface-0 text-muted-text">
        {icon}
      </div>
      <h3 className="text-card font-medium text-primary-text">{title}</h3>
      <p className="mt-1.5 max-w-sm text-label leading-relaxed font-normal text-secondary-text">
        {body}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

type FetchState =
  | { phase: 'loading' }
  | { phase: 'ready'; career: OutlookView }
  | { phase: 'invalid' }
  | { phase: 'busy' }
  | { phase: 'error' }

// Instant paths (catalog + cache) resolve in ms, so we hold the "researching"
// animation for a deliberate beat — long enough to read a couple of the step
// captions — with a little jitter so it feels like genuine, variable-time research
// rather than a fixed timer. Real AI generations already exceed this, so they're
// unaffected. Tune MIN_RESEARCH_MS to taste.
const MIN_RESEARCH_MS = 2400
const RESEARCH_JITTER_MS = 900

export function CareerOutlookModal({
  query,
  horizon,
  onClose,
  onStart,
}: {
  query: string | null
  horizon: Horizon
  onClose: () => void
  /** Sends the reader into the full assessment from the modal footer. */
  onStart?: () => void
}) {
  const [state, setState] = useState<FetchState>({ phase: 'loading' })
  const [reloadKey, setReloadKey] = useState(0)
  const horizonYears = horizon === '5' ? 5 : 10

  // Fetch (cache → AI) whenever a career is requested. Horizon is NOT a dependency:
  // both horizons derive from the same master, so switching never refetches.
  useEffect(() => {
    if (!query) return
    let cancelled = false
    setState({ phase: 'loading' })
    const startedAt = Date.now()
    ;(async () => {
      const result = await getCareerOutlook(query).catch(() => ({ status: 'error' as const }))
      // Hold the research animation for a deliberate, slightly-varied beat so instant
      // catalog/cache results still feel like real research (and don't flash by).
      const target = MIN_RESEARCH_MS + Math.floor(Math.random() * RESEARCH_JITTER_MS)
      const wait = Math.max(0, target - (Date.now() - startedAt))
      if (wait > 0) await new Promise((r) => setTimeout(r, wait))
      if (cancelled) return
      if (result.status === 'ok') setState({ phase: 'ready', career: deriveHorizonView(result.master, horizon) })
      else if (result.status === 'not-a-career') setState({ phase: 'invalid' })
      else if (result.status === 'busy') setState({ phase: 'busy' })
      else setState({ phase: 'error' })
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, reloadKey])

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!query) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [query, onClose])

  return (
    <AnimatePresence>
      {query && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${query} outlook`}
            className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-md border border-stroke bg-surface"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close — pinned to the rounded wrapper, stays visible while scrolling */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-10 cursor-pointer rounded-full p-1.5 text-muted-text transition-colors hover:bg-surface-0 hover:text-primary-text"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {state.phase === 'loading' && <CareerOutlookResearching query={query} />}

            {state.phase === 'invalid' && (
              <StateMessage
                icon={<SearchX size={24} />}
                title="That doesn't look like a career"
                body={`We couldn't find a career called "${query}". Try another job title, or pick one from the list.`}
                action={
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-purple/25 transition-all hover:-translate-y-0.5"
                  >
                    Try another career
                  </button>
                }
              />
            )}

            {state.phase === 'busy' && (
              <StateMessage
                icon={<Clock size={24} />}
                title="Our research service is busy"
                body="It's getting a lot of requests right now. Please try again in a moment."
                action={
                  <button
                    type="button"
                    onClick={() => setReloadKey((k) => k + 1)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-purple/25 transition-all hover:-translate-y-0.5"
                  >
                    <RotateCw size={15} />
                    Try again
                  </button>
                }
              />
            )}

            {state.phase === 'error' && (
              <StateMessage
                icon={<RotateCw size={22} />}
                title="Something went wrong"
                body="We couldn't research this career just now. Please try again in a moment."
                action={
                  <button
                    type="button"
                    onClick={() => setReloadKey((k) => k + 1)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-purple/25 transition-all hover:-translate-y-0.5"
                  >
                    <RotateCw size={15} />
                    Retry
                  </button>
                }
              />
            )}

            {/* The panel itself scrolls, as in the design, so there is only one
                scroll container rather than nested ones. */}
            {state.phase === 'ready' && (
              <ModalBody
                career={state.career}
                horizonYears={horizonYears}
                onStart={onStart}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
