'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
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
      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-text"
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
        className="w-full rounded-full border border-stroke bg-surface-1 py-2 pr-4 pl-10 font-sans text-body font-light text-primary-text transition-colors placeholder:text-muted-text focus:border-action focus:bg-surface focus:ring-2 focus:ring-action/15 focus:outline-none"
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

function UniversityCard({
  university,
  showUsd,
  onToggleCurrency,
}: {
  university: ComparisonUniversity
  showUsd: boolean
  onToggleCurrency: () => void
}) {
  const t = useTranslations('Landing.comparisonTool')
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

  return (
    <div className="rounded-md border border-stroke bg-surface p-5">
      <b className="mb-1 block text-card font-medium">{university.name}</b>
      <p className="mb-3 text-label font-normal text-muted-text">{university.country}</p>

      <div className="border-t border-stroke pt-3">
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
              className="absolute inset-y-0 rounded-full bg-accent"
              style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }}
            />
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 border-t border-stroke pt-3">
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
      </div>

      {university.popularCourses.length > 0 && (
        <div className="mt-3 border-t border-stroke pt-3">
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
        </div>
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

        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <div className="flex flex-col gap-2">
            <UniversityPicker
              label={t('compareUni1')}
              universities={universities}
              selectedId={leftId}
              onSelect={setLeftId}
            />
            <UniversityCard
              university={left}
              showUsd={showUsd}
              onToggleCurrency={() => setShowUsd((v) => !v)}
            />
          </div>

          <span className="mx-auto self-center text-label font-medium text-muted-text">
            {t('vs')}
          </span>

          <div className="flex flex-col gap-2">
            <UniversityPicker
              label={t('compareUni2')}
              universities={universities}
              selectedId={rightId}
              onSelect={setRightId}
            />
            <UniversityCard
              university={right}
              showUsd={showUsd}
              onToggleCurrency={() => setShowUsd((v) => !v)}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label={t('advisorCloseBackdrop')}
        onClick={() => setAdvisorOpen(false)}
        className={`absolute inset-0 z-10 bg-primary-text/40 transition-opacity max-tablet:fixed ${
          advisorOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('advisorDialogLabel')}
        className={`absolute inset-y-0 right-0 z-20 flex w-full max-w-[560px] flex-col overflow-y-auto bg-brand p-6 text-white shadow-lg transition-transform duration-300 ease-out max-tablet:fixed max-tablet:inset-x-0 max-tablet:inset-y-auto max-tablet:bottom-0 max-tablet:max-h-[85vh] max-tablet:max-w-none ${
          advisorOpen ? 'translate-x-0 max-tablet:translate-y-0' : 'translate-x-full max-tablet:translate-x-0 max-tablet:translate-y-full'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
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

        <div aria-live="polite" aria-busy={loading}>
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
            <>
              <p className="mb-6 text-lede font-medium text-white">{stripDashes(result.verdict)}</p>

              <ol className="flex flex-col gap-5">
                {result.questions.map((item, index) => (
                  <li key={item.q} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-min font-medium text-brand">
                      {index + 1}
                    </span>
                    <div>
                      <p className="mb-1 text-label font-medium text-white">{stripDashes(item.q)}</p>
                      <p className="text-label font-normal text-white/80">{stripDashes(item.a)}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-min text-white/60">{t('advisorDisclaimer')}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
