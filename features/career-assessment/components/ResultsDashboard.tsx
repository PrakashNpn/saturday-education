'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Compass, Heart, Award, Lock, ArrowRight, Home, CheckCircle2 } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { HollandHexagon, BipolarBar, ScoreRing } from './DashboardCharts'
import type { DashboardData } from '../types'

interface Props {
  dashboard: DashboardData
}

const panel = 'rounded-2xl border border-gray-100 bg-white/95 p-5 shadow-[0_18px_50px_-24px_rgba(89,13,130,0.22)] backdrop-blur-sm'
const panelTitle = 'mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-purple'

function Rise({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      {children}
    </motion.div>
  )
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function ResultsDashboard({ dashboard }: Props) {
  const t = useTranslations('careerAssessment.dashboard')
  const rankedInterests = [...dashboard.interests].sort((a, b) => b.value - a.value)
  const teaser = dashboard.universityTeaser
  const sampleRows = teaser?.sample ?? [
    'Computer Science · Germany · TU Munich',
    'Data Science · Ireland · UC Dublin',
    'Business · Canada · U of Toronto',
  ]

  return (
    <div className="mx-auto w-full space-y-4">
      {/* Hero — letterhead banner */}
      <Rise>
        <div className="rounded-3xl border border-gray-100 bg-white/95 px-6 py-6 shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)] backdrop-blur-sm sm:px-8">
          {/* top row: identity (left) + logo (right) */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-2.5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-light text-sm font-bold text-white">
                {initials(dashboard.fullName)}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{t('preparedFor')}</p>
                <p className="truncate text-sm font-bold text-neutral-900">{dashboard.fullName}</p>
                <p className="truncate text-xs text-gray-400">
                  {dashboard.email}
                  {dashboard.phone ? ` · ${dashboard.phone}` : ''}
                </p>
              </div>
            </div>

            <Image
              src="/images/logo/logo.webp"
              alt="Saturday Education Consulting"
              width={300}
              height={84}
              priority
              className="h-16 w-auto self-start sm:h-20 sm:self-auto"
            />
          </div>

          {/* full-width snapshot — spans the whole card so the read reads in fewer lines */}
          <div className="mt-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
              {t('eyebrow')}
            </span>
            <h2 className="mt-2.5 text-3xl font-extrabold text-neutral-900 sm:text-4xl">{dashboard.archetype}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              {dashboard.studentRead ?? dashboard.archetypeSummary}
            </p>
          </div>
        </div>
      </Rise>

      {/* Chart panels — 3-up dashboard grid */}
      <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Rise delay={0.05}>
          <div className={panel}>
            <p className={panelTitle}>
              <Compass size={14} />
              {t('interestsTitle')}
            </p>
            <HollandHexagon interests={dashboard.interests} />
            <ul className="mt-3 space-y-1.5">
              {rankedInterests.map((it, i) => (
                <li key={it.category} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-800">
                    <span className="mr-1.5 font-bold text-brand-purple">{i + 1}.</span>
                    {it.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">{it.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Rise>

        <Rise delay={0.1}>
          <div className={panel}>
            <p className={panelTitle}>
              <Heart size={14} />
              {t('personalityTitle')}
            </p>
            <div className="space-y-3.5 pt-1">
              {dashboard.personality.map((p, i) => (
                <BipolarBar key={p.trait} label={p.label} low={p.low} high={p.high} percentile={p.percentile} delay={0.2 + i * 0.06} />
              ))}
            </div>
          </div>
        </Rise>

        <Rise delay={0.15} className="md:col-span-2 lg:col-span-1">
          <div className={panel}>
            <p className={panelTitle}>
              <Award size={14} />
              {t('aptitudeTitle')}
            </p>
            <div className="flex flex-col items-center gap-5 pt-2">
              <div className="flex flex-col items-center">
                <ScoreRing percent={dashboard.aptitudeOverall.percent} size={124} stroke={10} />
                <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">{t('overallLabel')}</span>
              </div>
              <div className="grid w-full max-w-[260px] grid-cols-2 gap-x-2 gap-y-5">
                {dashboard.aptitude.map((a, i) => (
                  <ScoreRing key={a.area} percent={a.percent} label={a.label} size={74} stroke={7} delay={0.3 + i * 0.08} />
                ))}
              </div>
            </div>
          </div>
        </Rise>
      </div>

      {/* Locked: career matches + university shortlist — one gated hook (unlocked in the consultation) */}
      <Rise delay={0.18}>
        <div className="relative overflow-hidden rounded-2xl border border-brand-purple-100 bg-gradient-to-br from-brand-purple-50/70 to-white p-5">
          <p className={panelTitle}>
            <Lock size={14} />
            {t('lockedTitle')}
          </p>

          <div className="mt-1 space-y-1.5">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
              <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-brand-purple" />
              {t('careerLockedNote')}
            </p>
            {teaser && (
              <p className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
                <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-brand-purple" />
                {t('lockedTeaser', { count: teaser.totalCount, countries: teaser.countries.join(', ') })}
              </p>
            )}
          </div>

          {teaser && teaser.fields.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {teaser.fields.map((f) => (
                <span key={f} className="rounded-full border border-brand-purple-100 bg-white px-2.5 py-1 text-[11px] font-medium text-brand-purple">
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="relative mt-3">
            <div aria-hidden className="grid gap-2 select-none blur-[5px] sm:grid-cols-3">
              {sampleRows.map((row, i) => (
                <div key={i} className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm text-gray-700">
                  {row}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-3 py-1 text-[11px] font-semibold text-white shadow">
                <Lock size={12} />
                {t('lockedBadge')}
              </span>
            </div>
          </div>

          <p className="mt-3 text-center text-[13px] leading-relaxed text-gray-600">{t('lockedNote')}</p>
          <Link
            href="/#consultation"
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-purple px-7 py-3 font-semibold text-white shadow-md shadow-brand-purple/25 transition-colors hover:bg-brand-purple-dark"
          >
            {t('ctaConsult')}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Rise>

      {/* Secondary action */}
      <Rise delay={0.25}>
        <div className="mx-auto max-w-lg">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            <Home size={16} />
            {t('ctaHome')}
          </Link>
        </div>
      </Rise>
    </div>
  )
}
