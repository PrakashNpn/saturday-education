'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Clock, Heart, BadgeCheck, Lock, Home, CheckCircle2, Sparkle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { getStudentRead } from '../services/careerLeadService'
import { HollandHexagon, BipolarBar, ScoreRing } from './DashboardCharts'
import type { DashboardData } from '../types'

interface Props {
  dashboard: DashboardData
  /** Saved lead id, used to collect the AI paragraph once the background work finishes. */
  leadId?: string | null
}

/** When to look for the AI paragraph, in ms after the dashboard appears. The synthesis
 *  usually lands within ~20-30s, but the window extends past the Anthropic timeout so a
 *  slow response is still picked up. */
const READ_POLL_MS = [4000, 8000, 15000, 25000, 40000, 55000]

/** Stop waiting after this. The skeleton resolves to the deterministic one-line summary,
 *  so the student is never left staring at a placeholder that never fills. */
const READ_GIVE_UP_MS = 58000

/**
 * The student's results render immediately from their own answers. Only the archetype
 * paragraph comes from the AI, which now runs after the response is sent, so we collect it
 * separately.
 *
 * `waiting` drives a skeleton: showing the fallback sentence straight away reads as the
 * finished answer, so students assumed that was their whole result and were confused when
 * it silently rewrote itself half a minute later.
 */
function useDeferredStudentRead(leadId: string | null | undefined, initial?: string) {
  const [read, setRead] = useState<string | undefined>(initial)
  // Only wait when there is actually something to wait for.
  const [waiting, setWaiting] = useState(() => Boolean(leadId) && !initial)

  useEffect(() => {
    if (!leadId || initial) return

    let cancelled = false
    const timers: number[] = []
    const stopAll = () => timers.forEach(window.clearTimeout)

    for (const delay of READ_POLL_MS) {
      timers.push(
        window.setTimeout(async () => {
          if (cancelled) return
          try {
            const text = await getStudentRead(leadId)
            if (!cancelled && text) {
              setRead(text)
              setWaiting(false)
              stopAll()
            }
          } catch {
            /* background nicety — the fallback sentence still resolves below */
          }
        }, delay),
      )
    }

    // Give up gracefully rather than shimmering forever.
    timers.push(
      window.setTimeout(() => {
        if (!cancelled) setWaiting(false)
      }, READ_GIVE_UP_MS),
    )

    return () => {
      cancelled = true
      stopAll()
    }
  }, [leadId, initial])

  return { read, waiting }
}

/** Placeholder shown while the AI writes the student's summary. Sized to the real
 *  paragraph so the layout does not jump when the text replaces it. */
function StudentReadSkeleton({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-[95%]" />
        <Skeleton className="h-3.5 w-[62%]" />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-min font-medium text-action/70">
        <Sparkle size={13} className="animate-pulse" />
        {label}
      </p>
    </motion.div>
  )
}

const sectionHeading = 'mb-6 flex items-center gap-2 text-label font-bold tracking-wider text-action uppercase'

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

export function ResultsDashboard({ dashboard, leadId }: Props) {
  const t = useTranslations('careerAssessment.dashboard')
  const { read: studentRead, waiting: readWaiting } = useDeferredStudentRead(
    leadId,
    dashboard.studentRead,
  )
  const rankedInterests = [...dashboard.interests].sort((a, b) => b.value - a.value)
  const teaser = dashboard.universityTeaser
  const sampleRows = teaser?.sample ?? [
    'Computer Science · Germany · TU Munich',
    'Data Science · Ireland · UC Dublin',
    'Business · Canada · U of Toronto',
  ]

  return (
    <div className="w-full">
      {/* Letterhead + snapshot + the three chart panels, one card. */}
      <Rise>
        <div className="mb-8 overflow-hidden rounded-md border border-stroke bg-surface shadow-xs">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-stroke/60 pb-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3.5 rounded-xl border border-stroke bg-surface-0 px-4 py-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-action text-label font-bold text-white shadow-2xs">
                  {initials(dashboard.fullName)}
                </span>
                <div className="min-w-0">
                  <span className="block text-min font-bold tracking-widest text-muted-text uppercase">
                    {t('preparedFor')}
                  </span>
                  <span className="block truncate text-label font-bold leading-tight text-primary-text">
                    {dashboard.fullName}
                  </span>
                  <span className="block truncate text-min text-secondary-text">
                    {dashboard.email}
                    {dashboard.phone ? ` · ${dashboard.phone}` : ''}
                  </span>
                </div>
              </div>

              <Image
                src="/images/logo/logo.webp"
                alt="Saturday Education Consulting"
                width={300}
                height={84}
                priority
                unoptimized
                className="h-10 w-auto shrink-0 self-start sm:self-auto"
              />
            </div>

            <div className="pt-6">
              <span className="mb-3 inline-block rounded-full bg-tint px-3 py-1 text-min font-semibold tracking-wider text-action uppercase">
                {t('eyebrow')}
              </span>
              <h1 className="mb-3 text-2xl font-bold tracking-tight text-primary-text sm:text-3xl">
                {dashboard.archetype}
              </h1>
              <AnimatePresence mode="wait" initial={false}>
                {readWaiting ? (
                  <StudentReadSkeleton key="skeleton" label={t('writingSummary')} />
                ) : (
                  <motion.p
                    key="read"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="max-w-4xl text-label font-normal leading-relaxed text-secondary-text sm:text-body"
                  >
                    {studentRead ?? dashboard.archetypeSummary}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-b border-stroke" />

          <div className="grid grid-cols-1 divide-y divide-stroke bg-surface lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <div className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <p className={sectionHeading}>
                  <Clock size={18} />
                  {t('interestsTitle')}
                </p>
                <HollandHexagon interests={dashboard.interests} />
              </div>
              <ul className="mt-4 space-y-2 border-t border-stroke/60 pt-2 text-label">
                {rankedInterests.map((it, i) => (
                  <li key={it.category} className="flex items-center justify-between">
                    <span className="font-semibold text-primary-text">
                      {i + 1}. {it.label}
                    </span>
                    <span className="font-medium text-secondary-text">{it.value}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-7">
              <p className={sectionHeading}>
                <Heart size={18} />
                {t('personalityTitle')}
              </p>
              <div className="space-y-6">
                {dashboard.personality.map((p, i) => (
                  <BipolarBar
                    key={p.trait}
                    label={p.label}
                    low={p.low}
                    high={p.high}
                    percentile={p.percentile}
                    delay={0.2 + i * 0.06}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <p className={sectionHeading}>
                <BadgeCheck size={18} />
                {t('aptitudeTitle')}
              </p>
              <div className="my-4 flex flex-col items-center justify-center">
                <ScoreRing percent={dashboard.aptitudeOverall.percent} size={116} stroke={9} />
                <span className="mt-2 text-min font-bold tracking-widest text-muted-text uppercase">
                  {t('overallLabel')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-stroke/60 pt-4 text-center">
                {dashboard.aptitude.map((a, i) => (
                  <ScoreRing key={a.area} percent={a.percent} label={a.label} size={68} stroke={6} delay={0.3 + i * 0.08} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Rise>

      {/* Locked: career matches + university shortlist — the gated hook (unlocked in the consultation) */}
      <Rise delay={0.15}>
        <div className="rounded-md border border-action/25 bg-gradient-to-b from-tint/30 via-surface to-surface p-6 shadow-xs sm:p-10">
          <div className="mb-6">
            <p className={`${sectionHeading} mb-3`}>
              <Lock size={18} />
              {t('lockedTitle')}
            </p>
            <div className="space-y-1.5 text-label text-secondary-text">
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-action" />
                {t('careerLockedNote')}
              </p>
              {teaser && (
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0 text-action" />
                  {t('lockedTeaser', { count: teaser.totalCount, countries: teaser.countries.join(', ') })}
                </p>
              )}
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-action" />
                {t('lockedResearchNote')}
              </p>
            </div>
          </div>

          {teaser && teaser.fields.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              {teaser.fields.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-stroke bg-white px-4 py-1.5 text-label font-medium text-primary-text shadow-2xs"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="relative overflow-hidden rounded-xl border border-stroke/70 bg-surface-0/40 p-4 sm:p-6">
            <div aria-hidden className="grid grid-cols-1 gap-4 opacity-40 blur-[5px] select-none md:grid-cols-3">
              {sampleRows.map((row, i) => (
                <div key={i} className="rounded-xl border border-stroke bg-white p-5 shadow-xs">
                  <p className="text-label font-bold text-primary-text">{row}</p>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-structure px-5 py-2 text-label font-semibold text-white shadow-xl">
                <Lock size={16} />
                {t('lockedBadge')}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="mx-auto mb-6 max-w-xl text-label leading-relaxed text-secondary-text">{t('lockedNote')}</p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href="/#consultation"
                className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-action px-12 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover sm:w-auto"
              >
                <span>{t('ctaConsult')}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/"
                className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-label font-medium text-secondary-text transition-colors hover:text-action"
              >
                <Home size={16} />
                {t('ctaHome')}
              </Link>
            </div>
          </div>
        </div>
      </Rise>
    </div>
  )
}
