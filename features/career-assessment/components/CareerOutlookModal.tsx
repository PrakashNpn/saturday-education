'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, CheckCircle2, Check, Plus, GraduationCap, SearchX, RotateCw, Clock, Info } from 'lucide-react'
import { OutlookChart, DemandGauge } from '@/shared/components/careers/OutlookCharts'
import { fieldStyle } from '@/shared/components/careers/fieldStyle'
import { growthTone } from '@/shared/components/careers/outlookTone'
import { deriveHorizonView, type Horizon } from '@/shared/lib/careers/outlookMaster'
import type { Career } from '@/shared/lib/careers/catalog'
import { getCareerOutlook } from '../services/careerOutlookService'
import { CareerOutlookResearching } from './CareerOutlookResearching'

const DEMAND_DOT: Record<string, string> = {
  High: 'bg-brand-purple',
  Moderate: 'bg-brand-purple-light',
  Competitive: 'bg-gray-400',
}

// Career "work style" from its Holland (RIASEC) code: a role-noun for the strongest
// type, optionally prefixed by an adjective from the second type (e.g. I·C →
// "Methodical Analyst").
const STYLE_NOUN: Record<string, string> = {
  R: 'Builder',
  I: 'Analyst',
  A: 'Creative',
  S: 'Mentor',
  E: 'Leader',
  C: 'Planner',
}
const STYLE_ADJ: Record<string, string> = {
  R: 'Hands-on',
  I: 'Analytical',
  A: 'Creative',
  S: 'Supportive',
  E: 'Driven',
  C: 'Methodical',
}

function workStyleOf(riasec: readonly string[]): string {
  const noun = STYLE_NOUN[riasec[0] ?? '']
  if (!noun) return '—'
  const second = riasec[1]
  const adj = second ? STYLE_ADJ[second] : undefined
  return adj && adj !== noun ? `${adj} ${noun}` : noun
}

function Stat({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="px-3 py-2.5 text-center">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className={`mt-0.5 text-sm font-bold leading-tight ${valueClass ?? 'text-neutral-900'}`}>{value}</p>
    </div>
  )
}

function SkillList({ title, skills, variant }: { title: string; skills: string[]; variant: 'required' | 'nice' }) {
  const required = variant === 'required'
  return (
    <div className={`rounded-xl border p-3.5 ${required ? 'border-brand-purple-100 bg-gradient-to-br from-brand-purple-50/50 to-white' : 'border-gray-100 bg-white'}`}>
      <p className={`mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${required ? 'text-brand-purple' : 'text-gray-500'}`}>
        {required ? <CheckCircle2 size={13} /> : <Plus size={13} />}
        {title}
      </p>
      <ul className="space-y-1.5">
        {skills.map((sk) => (
          <li key={sk} className={`flex items-center gap-2 text-[13px] ${required ? 'text-neutral-700' : 'text-gray-600'}`}>
            <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${required ? 'bg-brand-purple/10 text-brand-purple' : 'bg-gray-200/70 text-gray-500'}`}>
              {required ? <Check size={10} /> : <Plus size={10} />}
            </span>
            {sk}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ModalBody({ career, horizonYears }: { career: Career; horizonYears: number }) {
  const fs = fieldStyle(career.field)
  const Icon = fs.icon
  const trend = career.outlook.trend
  const startYear = new Date().getFullYear()
  const endYear = startYear + horizonYears
  const step = horizonYears === 5 ? 1 : 2
  const growth = trend.length > 1 && trend[0] > 0 ? Math.round(((trend[trend.length - 1] - trend[0]) / trend[0]) * 100) : 0
  const tone = growthTone(growth)
  const TrendIcon = tone.Icon
  const workStyle = workStyleOf(career.riasec)

  return (
    <>
      {/* Header — soft field-tinted band */}
      <div className={`border-b border-gray-100 bg-gradient-to-b ${fs.gradFrom} to-white p-5 sm:p-6`}>
        <div className="flex items-start gap-3 pr-8">
          <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${fs.iconBg}`}>
            <Icon size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${fs.chipBg} ${fs.chipText}`}>
                {career.field}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-gray-100 bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                <span className={`h-1.5 w-1.5 rounded-full ${DEMAND_DOT[career.outlook.demand] ?? 'bg-gray-400'}`} />
                {career.outlook.demand}
              </span>
            </div>
            <h2 className="mt-1.5 text-xl font-extrabold leading-tight text-neutral-900 sm:text-2xl">{career.title}</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{career.summary}</p>
        <div className="mt-4 grid grid-cols-3 divide-x divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white/70">
          <Stat label="Demand now" value={career.outlook.demand} />
          <Stat label={`${horizonYears}-yr trend`} value={`~${growth > 0 ? '+' : ''}${growth}%`} valueClass={tone.numberText} />
          <Stat label="Best fit" value={workStyle} />
        </div>
        <p className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-gray-500">
          <Info size={13} className="mt-px flex-shrink-0 text-gray-400" />
          <span>
            <span className="font-semibold text-gray-700">Demand</span>: hiring today
            <span className="mx-1.5 text-gray-300">·</span>
            <span className="font-semibold text-gray-700">Trend</span>: projected change over {horizonYears} years
          </span>
        </p>
      </div>

      {/* Body */}
      <div className="space-y-5 p-5 sm:p-6">
        {/* Outlook */}
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
              <TrendingUp size={13} />
              {horizonYears}-year job outlook
            </p>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone.chipBg} ${tone.chipText}`}>
              <TrendIcon size={12} />
              {career.outlook.growthLabel}
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <DemandGauge demand={career.outlook.demand} caption="Demand" />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-baseline gap-1.5">
                <span className={`text-2xl font-extrabold ${tone.numberText}`}>
                  ~{growth > 0 ? '+' : ''}
                  {growth}%
                </span>
                <span className="text-[11px] text-gray-400">projected by {endYear}</span>
              </div>
              <OutlookChart data={trend} startYear={startYear} step={step} />
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">{career.outlook.marketNote}</p>
          <p className="mt-2 border-t border-gray-100 pt-2 text-[10px] leading-relaxed text-gray-400">
            Indicative, based on public labour-market sources; varies by country and over time.
            {career.outlook.sources.length > 0 ? ` (${career.outlook.sources.join(', ')})` : ''}
          </p>
        </div>

        {/* Skills */}
        <div className="grid gap-3 sm:grid-cols-2">
          <SkillList title="Must-have skills" skills={career.requiredSkills} variant="required" />
          <SkillList title="Nice-to-have skills" skills={career.niceToHaveSkills} variant="nice" />
        </div>

        {/* Example roles */}
        {career.exampleRoles.length > 0 && (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Example roles</p>
            <div className="flex flex-wrap gap-1.5">
              {career.exampleRoles.map((r) => (
                <span key={r} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related fields */}
        {career.relatedFields.length > 0 && (
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
              <GraduationCap size={13} />
              Related fields of study
            </p>
            <div className="flex flex-wrap gap-1.5">
              {career.relatedFields.map((f) => (
                <span key={f} className="rounded-full bg-brand-purple-50 px-2.5 py-1 text-xs font-medium text-brand-purple">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
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
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">{icon}</div>
      <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-gray-500">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

type FetchState =
  | { phase: 'loading' }
  | { phase: 'ready'; career: Career }
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
}: {
  query: string | null
  horizon: Horizon
  onClose: () => void
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
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${query} outlook`}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close — pinned to the rounded wrapper, stays visible while scrolling */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm backdrop-blur transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={17} />
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

            {state.phase === 'ready' && (
              <div className="scrollbar-thin max-h-[92dvh] overflow-y-auto overscroll-contain sm:max-h-[88dvh]">
                <ModalBody career={state.career} horizonYears={horizonYears} />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
