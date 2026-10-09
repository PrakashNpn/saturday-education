'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'

interface Props {
  universities: ComparisonUniversity[]
}

type AdvisorQuestion = { q: string; a: string }
type AdvisorResult = { verdict: string; questions: AdvisorQuestion[] }

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

const group = (value: number) => Math.round(value).toLocaleString('en-US')

const EASE = [0, 0, 0.2, 1] as const

/**
 * The model is told not to use dashes and mostly obeys, but "science—solid"
 * still slips through. House style has no em or en dashes in copy, so they are
 * rewritten here rather than shipped: an en dash between digits is a range and
 * becomes a hyphen, anything else becomes a comma.
 */
function stripDashes(text: string): string {
  return text
    .replace(/(\d)\s*[\u2013\u2014]\s*(\d)/g, '$1-$2')
    .replace(/\s*[\u2013\u2014]\s*/g, ', ')
}


function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 text-muted-text"
    >
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 17L13.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-3.5">
      <path d="M8 1.5 9.2 5.3 13 6.5 9.2 7.7 8 11.5 6.8 7.7 3 6.5l3.8-1.2L8 1.5ZM13 10l.6 1.9L15.5 12.5l-1.9.6L13 15l-.6-1.9-1.9-.6 1.9-.6L13 10Z" />
    </svg>
  )
}

/** Search field plus the result list. The design draws the field but not the
 *  list, so the list is styled from the same tokens as everything else. */
function UniversityPicker({
  label,
  universities,
  selectedId,
  onSelect,
}: {
  label: string
  universities: ComparisonUniversity[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  const t = useTranslations('Landing.comparisonTool')
  const inputId = useId()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return universities
    return universities.filter(
      (u) => u.name.toLowerCase().includes(q) || u.country.toLowerCase().includes(q),
    )
  }, [query, universities])

  useEffect(() => {
    if (!open) return
    const onDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <SearchIcon />
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${inputId}-list`}
        autoComplete="off"
        placeholder={t('searchPlaceholder')}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}
        className="w-full rounded-sm border border-stroke/70 bg-white/70 py-2 pr-4 pl-10 font-sans text-body font-light text-primary-text shadow-[0_1px_2px_rgba(20,10,43,0.05),0_8px_16px_-12px_rgba(92,9,245,0.25)] backdrop-blur-sm transition-colors placeholder:text-muted-text hover:border-action/40 focus:border-action focus:bg-white/90 focus:ring-2 focus:ring-action/15 focus:outline-none"
      />

      {open && (
        <ul
          id={`${inputId}-list`}
          role="listbox"
          className="absolute top-full right-0 left-0 z-30 mt-1 max-h-64 overflow-y-auto rounded-sm border border-stroke bg-surface py-1 shadow-lg"
        >
          {matches.length === 0 ? (
            <li className="px-3.5 py-2 text-label text-muted-text">{t('noResults')}</li>
          ) : (
            matches.map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={u.id === selectedId}
                  onClick={() => {
                    onSelect(u.id)
                    setQuery('')
                    setOpen(false)
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-label transition-colors hover:bg-surface-0 ${
                    u.id === selectedId ? 'font-medium text-action' : 'text-primary-text'
                  }`}
                >
                  {u.name}
                  <span className="block text-min font-normal text-muted-text">{u.country}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
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
function UniversityDetails({
  university,
  showUsd,
  onToggleCurrency,
}: {
  university: ComparisonUniversity
  showUsd: boolean
  onToggleCurrency: () => void
}) {
  const t = useTranslations('Landing.comparisonTool')
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

/** Loading state for the advisor panel. Sits on the purple panel, so the bars
 *  are white at low alpha rather than the grey the shared Skeleton uses. */
function AdvisorSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <div className="flex flex-col gap-2">
        <div className="h-5 w-11/12 animate-pulse rounded-sm bg-white/25" />
        <div className="h-5 w-3/5 animate-pulse rounded-sm bg-white/25" />
      </div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex gap-3">
          <div className="size-6 shrink-0 animate-pulse rounded-full bg-white/25" />
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-2/5 animate-pulse rounded-sm bg-white/25" />
            <div className="h-3 w-full animate-pulse rounded-sm bg-white/15" />
            <div className="h-3 w-5/6 animate-pulse rounded-sm bg-white/15" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ComparisonToolSection({ universities }: Props) {
  const t = useTranslations('Landing.comparisonTool')

  const [leftId, setLeftId] = useState(universities[0]?.id ?? '')
  const [rightId, setRightId] = useState(universities[1]?.id ?? '')
  const [showUsd, setShowUsd] = useState(false)
  const [advisorOpen, setAdvisorOpen] = useState(false)
  const [result, setResult] = useState<AdvisorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Orchestrates UniversityDetails's own child blocks (see its `item`
  // variant): this container has no visible motion of its own, it only
  // staggers when each child's hidden -> visible transition starts.
  const detailsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  }

  // Same stagger pattern for the advisor panel's verdict, its numbered
  // questions, and the disclaimer: each mounts fresh when a result arrives
  // (the loading branch unmounts this block in between), so a plain
  // initial/animate pair is enough, no AnimatePresence needed here.
  const advisorContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  }
  const advisorItem = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: EASE },
    },
  }

  const left = universities.find((u) => u.id === leftId) ?? universities[0]
  const right = universities.find((u) => u.id === rightId) ?? universities[1]

  useEffect(() => {
    if (!advisorOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setAdvisorOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [advisorOpen])

  /**
   * The route streams the model's reply, but the reply is a single JSON object,
   * so there is nothing meaningful to show until it is complete. Hence the
   * skeleton rather than progressive text.
   */
  const runAdvisor = useCallback(async () => {
    const uni1 = universities.find((u) => u.id === leftId) ?? universities[0]
    const uni2 = universities.find((u) => u.id === rightId) ?? universities[1]
    if (!uni1 || !uni2) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setResult(null)
    setFailed(false)
    setLoading(true)

    try {
      const response = await fetch('/api/comparison-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uni1, uni2 }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) throw new Error('request failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let text = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
      }

      // The model occasionally wraps the object in a sentence, so take the
      // outermost braces rather than trusting the whole body to be JSON.
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('no json')
      const parsed = JSON.parse(match[0]) as AdvisorResult
      if (!parsed.verdict || !Array.isArray(parsed.questions)) throw new Error('bad shape')
      setResult(parsed)
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setFailed(true)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [leftId, rightId, universities])

  // Changing either university invalidates whatever is on screen. If the panel
  // is open the analysis is re-run; if it is closed the stale result is simply
  // dropped so the next open starts fresh.
  const pairRef = useRef(`${leftId}|${rightId}`)
  useEffect(() => {
    const pair = `${leftId}|${rightId}`
    if (pair === pairRef.current) return
    pairRef.current = pair
    abortRef.current?.abort()
    setResult(null)
    setFailed(false)
    setLoading(false)
    if (advisorOpen) void runAdvisor()
  }, [leftId, rightId, advisorOpen, runAdvisor])

  useEffect(() => () => abortRef.current?.abort(), [])

  function openAdvisor() {
    setAdvisorOpen(true)
    if (!result && !loading) void runAdvisor()
  }

  if (!left || !right) return null

  return (
    <section className="relative overflow-hidden border-t border-stroke bg-surface-0 py-10 max-tablet:py-8">
      <div className="mx-auto max-w-wrap px-6">
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('eyebrow')}
        </h2>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <p className="max-w-[52ch] text-section font-medium">{t('headline')}</p>
          <button
            type="button"
            onClick={openAdvisor}
            className="inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            {t('askAdvisor')}
          </button>
        </div>

        {/* One shared glass panel, search fields included: they used to sit
            in their own row above the panel, on the section's flat grey
            background, which gave them nothing to actually look like glass
            against and left them reading as a separate, plainer element
            bolted on top. Folding them into the panel's own first row means
            they sit on the same wash and blur as everything below, and the
            vertical divider line now runs the full height of the panel
            instead of starting partway down it. */}
        <div className="relative overflow-hidden rounded-[28px] border border-stroke bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(20,10,43,0.04)] backdrop-blur-md">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(127,2,235,0.07)_0%,rgba(127,2,235,0)_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-7 bottom-7 left-1/2 z-[1] hidden w-px bg-[linear-gradient(180deg,rgba(127,2,235,0)_0%,rgba(110,5,240,0.35)_50%,rgba(127,2,235,0)_100%)] md:block"
          />
          <span className="absolute top-1/2 left-1/2 z-[2] hidden size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-stroke bg-surface text-label font-bold text-action shadow-[0_10px_24px_-8px_rgba(92,9,245,0.3)] md:grid">
            {t('vs')}
          </span>

          <div className="relative z-[1] grid md:grid-cols-2">
            <div className="relative border-b border-stroke p-6 md:border-b-0 md:p-7">
              <UniversityPicker
                label={t('compareUni1')}
                universities={universities}
                selectedId={leftId}
                onSelect={setLeftId}
              />
              <div className="relative mt-5 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={left.id}
                    initial="hidden"
                    animate="visible"
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE } }}
                    variants={detailsContainer}
                  >
                    <UniversityDetails
                      university={left}
                      showUsd={showUsd}
                      onToggleCurrency={() => setShowUsd((v) => !v)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Mobile fallback for the line + badge above: centred on this
                  half's own bottom border via translate-y-1/2, the same
                  overlap technique the Services step badges use, rather than
                  on 50% of the stacked pair's combined (and uneven) height. */}
              <span className="absolute bottom-0 left-1/2 z-[2] grid size-9 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border border-stroke bg-surface text-min font-bold text-action shadow-[0_6px_16px_-6px_rgba(92,9,245,0.3)] md:hidden">
                {t('vs')}
              </span>
            </div>
            <div className="p-6 md:p-7">
              <UniversityPicker
                label={t('compareUni2')}
                universities={universities}
                selectedId={rightId}
                onSelect={setRightId}
              />
              <div className="relative mt-5 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={right.id}
                    initial="hidden"
                    animate="visible"
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE } }}
                    variants={detailsContainer}
                  >
                    <UniversityDetails
                      university={right}
                      showUsd={showUsd}
                      onToggleCurrency={() => setShowUsd((v) => !v)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Both fixed to the viewport, not absolute within this section: the
          dialog used inset-y-0 against the section before, so its height
          and position depended on where this section happened to be
          scrolled to, and on top of that it tied on z-index with the
          navbar's own `sticky z-20` (shared/components/layout/Navbar.tsx),
          losing that tie by DOM order and painting over it. Fixed
          positioning anchors both to the viewport regardless of scroll. The
          desktop panel starts at top-16, below the navbar's own measured
          height, rather than overlapping it and relying on z-index to lose
          gracefully: the navbar stays reachable while the panel is open,
          the way a page-level nav should. z-10 keeps both comfortably above
          ordinary page content without needing to outrank the navbar. */}
      <button
        type="button"
        aria-label={t('advisorCloseBackdrop')}
        onClick={() => setAdvisorOpen(false)}
        className={`fixed inset-0 z-10 bg-primary-text/40 transition-opacity ${
          advisorOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('advisorDialogLabel')}
        className={`fixed top-16 right-0 bottom-0 z-10 flex w-full max-w-[560px] flex-col overflow-y-auto rounded-l-[28px] bg-[linear-gradient(165deg,#7F02EB_0%,#6E05F0_55%,#5C09F5_100%)] p-6 text-white transition-transform duration-300 ease-out will-change-transform max-tablet:inset-x-0 max-tablet:inset-y-auto max-tablet:bottom-0 max-tablet:max-h-[85vh] max-tablet:max-w-none max-tablet:rounded-t-[28px] max-tablet:rounded-l-none ${
          advisorOpen ? 'translate-x-0 max-tablet:translate-y-0' : 'translate-x-full max-tablet:translate-x-0 max-tablet:translate-y-full'
        }`}
      >
        {/* Same liquid-glass family as the rest of the page, just inverted:
            a soft white highlight on the gradient instead of a purple wash
            on white. Positioned (it's absolute), so the real content below
            needs its own z-index to paint above it rather than behind it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_0%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_60%)]"
        />

        <div className="relative z-[1] mb-4 flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-min font-medium text-brand">
            <SparkleIcon />
            {t('advisorBadge')}
          </span>
          <button
            type="button"
            aria-label={t('advisorClose')}
            onClick={() => setAdvisorOpen(false)}
            className="cursor-pointer text-white/70 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
              <path
                d="M5 5l10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="relative z-[1]" aria-live="polite" aria-busy={loading}>
          {loading && (
            <>
              <p className="mb-6 text-lede font-medium text-white/70">
                {t('advisorLoading')}
                <span className="animate-pulse">...</span>
              </p>
              <AdvisorSkeleton />
            </>
          )}

          {!loading && failed && (
            <div>
              <p className="mb-4 text-lede font-medium text-white">{t('advisorError')}</p>
              <button
                type="button"
                onClick={() => void runAdvisor()}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full bg-white px-6 text-label font-medium text-brand transition-colors hover:bg-white/90"
              >
                {t('advisorRetry')}
              </button>
            </div>
          )}

          {!loading && !failed && result && (
            <motion.div initial="hidden" animate="visible" variants={advisorContainer}>
              <motion.p variants={advisorItem} className="mb-6 text-lede font-medium text-white">
                {stripDashes(result.verdict)}
              </motion.p>

              <ol className="flex flex-col gap-5">
                {result.questions.map((item, index) => (
                  <motion.li key={item.q} variants={advisorItem} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-min font-medium text-brand shadow-[0_4px_10px_-2px_rgba(20,10,43,0.3)]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="mb-1 text-label font-medium text-white">{stripDashes(item.q)}</p>
                      <p className="text-label font-normal text-white/80">{stripDashes(item.a)}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <motion.p variants={advisorItem} className="mt-6 text-min text-white/60">
                {t('advisorDisclaimer')}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
