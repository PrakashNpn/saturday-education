'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Briefcase, TrendingUp, CheckCircle2, Check, Plus, Sparkles, Info, ArrowUpRight } from 'lucide-react'
import { OutlookChart, DemandGauge } from '@/shared/components/careers/OutlookCharts'
import { ScoreRing } from './DashboardCharts'
import type { MatchedCareer } from '../types'

type T = ReturnType<typeof useTranslations>

/** Types `text` out character by character (re-runs whenever `text` changes, e.g.
 *  on a tab switch). The full text is rendered transparently behind so the layout
 *  never shifts; respects prefers-reduced-motion and stays screen-reader friendly. */
function Typewriter({ text }: { text: string }) {
  const reduce = useReducedMotion()
  // Lazy initial state (+ the card remounts per tab via its key) handles the reset,
  // so the effect never calls setState synchronously.
  const [count, setCount] = useState(() => (reduce ? text.length : 0))

  useEffect(() => {
    if (reduce) return
    const speed = Math.max(8, Math.min(26, Math.round(1500 / Math.max(1, text.length))))
    let i = 0
    const id = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, reduce])

  const done = count >= text.length
  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      {!done && (
        <span
          aria-hidden
          className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse rounded-full bg-brand-purple align-middle"
        />
      )}
      <span aria-hidden className="text-transparent">
        {text.slice(count)}
      </span>
    </span>
  )
}

const DEMAND_DOT: Record<string, string> = {
  High: 'bg-brand-purple',
  Moderate: 'bg-brand-purple-light',
  Competitive: 'bg-gray-400',
}

// Weighted match score. Falls back to recomputing from the two fits if `match` is
// ever missing (mirrors the service's interestFit*0.6 + skillsFit*0.4 sort score),
// so the ring/cards never render "NaN%".
function matchOf(c: MatchedCareer): number {
  return Number.isFinite(c.match) ? c.match : Math.round(c.interestFit * 0.6 + c.skillsFit * 0.4)
}

function FitBar({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-medium text-gray-500">{label}</span>
        <span className="font-semibold text-brand-purple">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  )
}

function SkillPanel({ title, skills, variant }: { title: string; skills: string[]; variant: 'required' | 'nice' }) {
  const required = variant === 'required'
  return (
    <div
      className={`rounded-xl border p-4 ${
        required ? 'border-brand-purple-100 bg-gradient-to-br from-brand-purple-50/50 to-white' : 'border-gray-100 bg-gray-50/40'
      }`}
    >
      <p className={`mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${required ? 'text-brand-purple' : 'text-gray-500'}`}>
        {required ? <CheckCircle2 size={14} /> : <Plus size={14} />}
        {title}
      </p>
      <ul className="space-y-2">
        {skills.map((s) => (
          <li key={s} className={`flex items-center gap-2 text-sm ${required ? 'text-neutral-700' : 'text-gray-600'}`}>
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                required ? 'bg-brand-purple/10 text-brand-purple' : 'bg-gray-200/70 text-gray-500'
              }`}
            >
              {required ? <Check size={12} /> : <Plus size={12} />}
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Personalised readiness panel: the student's measured strengths relevant to this
 *  career + the areas worth strengthening (distinct from the career's own skills). */
function HeadStart({ gap, t }: { gap: MatchedCareer['skillGap']; t: T }) {
  if (gap.strengths.length === 0 && gap.focus.length === 0) return null
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-purple">
        <Sparkles size={14} />
        {t('skillGapTitle')}
      </p>

      {/* Strengths the student already brings */}
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">{t('strengthsLabel')}</p>
      {gap.strengths.length > 0 ? (
        <div className="space-y-2.5">
          {gap.strengths.map((s, i) => (
            <div key={s.label}>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-1.5 font-medium text-neutral-700">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
                    <Check size={10} />
                  </span>
                  {s.label}
                </span>
                <span className="font-semibold text-brand-purple">{s.percent}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(100, s.percent))}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + i * 0.08 }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[12px] leading-relaxed text-gray-400">{t('strengthsEmpty')}</p>
      )}

      {/* Focus to get ready */}
      <div className="mt-4 border-t border-gray-100 pt-3.5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">{t('toBuildLabel')}</p>
        {gap.focus.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {gap.focus.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[12px] font-medium text-amber-700"
              >
                <ArrowUpRight size={12} />
                {f}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[12px] leading-relaxed text-gray-400">{t('focusEmpty')}</p>
        )}
      </div>
    </div>
  )
}

function CareerDetail({ career, t }: { career: MatchedCareer; t: T }) {
  const trend = career.outlook.trend
  const startYear = new Date().getFullYear()
  const endYear = startYear + Math.max(0, trend.length - 1) * 2
  const growth = trend.length > 1 && trend[0] > 0 ? Math.round(((trend[trend.length - 1] - trend[0]) / trend[0]) * 100) : 0

  return (
    <div className="space-y-5 rounded-2xl border border-gray-100 bg-white/95 p-5 shadow-[0_18px_50px_-28px_rgba(89,13,130,0.25)] backdrop-blur-sm sm:p-6">
      {/* Header — title + field + demand on the left, overall match ring on the right */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold text-neutral-900">{career.title}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Briefcase size={12} />
              {career.field}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
              <span className={`h-1.5 w-1.5 rounded-full ${DEMAND_DOT[career.outlook.demand] ?? 'bg-gray-400'}`} />
              {career.outlook.demand}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <ScoreRing percent={matchOf(career)} label={t('match')} size={66} stroke={6} />
        </div>
      </div>

      {/* Fit breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <FitBar label={t('interestFit')} value={career.interestFit} />
        <FitBar label={t('skillsFit')} value={career.skillsFit} delay={0.1} />
      </div>

      <p className="text-sm leading-relaxed text-gray-500">{career.summary}</p>

      {/* Why this fits you — personalised AI line */}
      {career.whyFit && (
        <div className="rounded-2xl border border-brand-purple-100/70 bg-gradient-to-br from-brand-purple-50/60 via-white to-white p-4 sm:p-5">
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
              <Sparkles size={11} />
              {t('whyFit')}
            </span>
          </div>
          <p className="text-[15px] leading-relaxed text-neutral-700">
            <Typewriter text={career.whyFit} />
          </p>
        </div>
      )}

      {/* Your head start / focus to get ready — personalised readiness */}
      <HeadStart gap={career.skillGap} t={t} />

      {/* 10-year outlook */}
      <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-purple">
            <TrendingUp size={14} />
            {t('outlookTitle')}
          </p>
          <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-purple shadow-sm ring-1 ring-brand-purple/10">
            {career.outlook.growthLabel}
          </span>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <DemandGauge demand={career.outlook.demand} caption={t('demandCaption')} />
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-neutral-900">
                ~{growth > 0 ? '+' : ''}
                {growth}%
              </span>
              <span className="text-[11px] text-gray-400">
                {t('projectedBy')} {endYear}
              </span>
            </div>
            <OutlookChart data={trend} startYear={startYear} />
          </div>
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-gray-400">
          <Info size={13} className="mt-px flex-shrink-0" />
          {t('demandVsTrend')}
        </p>
        <p className="mt-2.5 text-xs leading-relaxed text-gray-500">{career.outlook.marketNote}</p>
        <p className="mt-2 border-t border-gray-100 pt-2 text-[10px] leading-relaxed text-gray-400">
          {t('outlookDisclaimer')} {career.outlook.sources.length > 0 && `(${career.outlook.sources.join(', ')})`}
        </p>
      </div>

      {/* Skills the career needs */}
      <div className="grid gap-3 sm:grid-cols-2">
        <SkillPanel title={t('requiredSkills')} skills={career.requiredSkills} variant="required" />
        <SkillPanel title={t('niceToHaveSkills')} skills={career.niceToHaveSkills} variant="nice" />
      </div>
    </div>
  )
}

export function CareerBreakdown({ careers }: { careers: MatchedCareer[] }) {
  const t = useTranslations('careerAssessment.dashboard')
  const [active, setActive] = useState(0)
  if (!careers || careers.length === 0) return null

  const current = careers[Math.min(active, careers.length - 1)]

  return (
    <div className="space-y-4">
      <div className="px-1">
        <h2 className="text-lg font-extrabold text-neutral-900">{t('careersTitle')}</h2>
        <p className="mt-0.5 text-sm text-gray-500">{t('careersSubtitle')}</p>
        <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-gray-400">
          <Info size={12} className="mt-px flex-shrink-0" />
          {t('matchesNote')}
        </p>
      </div>

      {/* Ranked match selector — rank + match% at a glance, doubles as navigation */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {careers.map((c, i) => {
          const isActive = i === active
          const m = matchOf(c)
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`flex flex-col gap-2 rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? 'border-brand-purple bg-brand-purple-50/60 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-brand-purple/40 hover:bg-gray-50/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`text-xs font-bold ${isActive ? 'text-brand-purple' : 'text-gray-500'}`}>{m}%</span>
              </div>
              <span className="line-clamp-2 min-h-[2.4em] text-[13px] font-semibold leading-snug text-neutral-900">{c.title}</span>
              <div className="h-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${isActive ? 'bg-gradient-to-r from-brand-purple to-brand-purple-light' : 'bg-gray-300'}`}
                  style={{ width: `${Math.max(0, Math.min(100, m))}%` }}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* Animated detail for the selected match */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <CareerDetail career={current} t={t} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
