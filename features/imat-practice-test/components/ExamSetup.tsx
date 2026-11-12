'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight, ArrowUpRight, Atom, BookOpen, BrainCircuit, Check, ChevronRight, Clock3, Dna, FlaskConical, ListChecks, Shuffle } from 'lucide-react'
import { HISTORICAL_YEARS, OFFICIAL_ARCHIVE } from '../data/papers'
import { SIMULATION_FORMAT } from '../data/formats'
import { useExamSession } from './ExamSession'
import { PRIMARY_BUTTON } from './styles'

type Mode = 'mock' | 'paper'
export type ExamSelection = { mode: Mode; paperId?: string }

const SECTION_ICONS = { reading: BookOpen, reasoning: BrainCircuit, biology: Dna, chemistry: FlaskConical, physicsMath: Atom }

export function ExamSetup({ mode, onModeChange, ready, reviewing, onReview, onBack, children }: {
  mode: Mode; onModeChange: (mode: Mode) => void; ready: boolean
  reviewing: boolean
  onReview: (selection: ExamSelection) => void; onBack: () => void; children?: React.ReactNode
}) {
  const { catalog, engine } = useExamSession()
  const PAST_PAPERS = catalog.papers.filter(p => p.year)
  const canMock = useMemo(() => {
    try { engine.selectMockQuestions(catalog.questions.filter(q => catalog.mockQuestionIds.includes(q.id)), SIMULATION_FORMAT); return true } catch { return false }
  }, [catalog, engine])
  const t = useTranslations('imat')
  const formatter = useFormatter()
  const heading = useRef<HTMLHeadingElement>(null)
  const [paperId, setPaperId] = useState<string | null>(null)
  const paper = mode === 'paper' ? PAST_PAPERS.find((p) => p.id === paperId) : undefined
  const format = mode === 'mock' ? SIMULATION_FORMAT : paper?.format
  const count = format?.sections.reduce((total, section) => total + section.count, 0) ?? 0
  const paperName = paper?.year ? t('setup.paperYear', { year: String(paper.year) }) : ''
  const currentStep = reviewing ? 1 : 0
  useEffect(() => { heading.current?.focus() }, [])

  return <section className="mx-auto max-w-wrap px-6 py-6 pb-28 tablet:min-h-[calc(100svh-96px)] tablet:py-4 tablet:pb-6">
    <button type="button" onClick={onBack} className="mb-2 inline-flex min-h-8 cursor-pointer items-center gap-2 text-label font-normal text-muted-text transition-colors hover:text-action focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action">
      <ArrowLeft className="size-4" aria-hidden="true" />{t('landing.backToGuide')}
    </button>
    <div className="mb-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-stroke pb-3">
      <div><h1 ref={heading} tabIndex={-1} className="text-title font-semibold leading-tight text-primary-text outline-none">{t('chooseMode')}</h1><p className="mt-2 max-w-lg text-label font-normal text-secondary-text tablet:sr-only">{t('setup.intro')}</p></div>
      <ol aria-label={t('setup.stepsLabel')} className="grid w-full grid-cols-3 gap-2 text-min font-normal sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
        {['choose', 'instructions', 'test'].map((step, i) => <li key={step} aria-current={i === currentStep ? 'step' : undefined} className={`relative flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2 sm:text-left ${i <= currentStep ? 'font-medium text-action' : 'text-muted-text'}`}>
          {i > 0 && <ChevronRight className="absolute -left-3 top-1.5 size-3 text-stroke-strong sm:static sm:mr-1" aria-hidden="true" />}
          <span className={`flex size-6 items-center justify-center rounded-full border ${i <= currentStep ? 'border-action bg-action text-white' : 'border-stroke-strong'}`}>{i < currentStep ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}</span>{t(`setup.steps.${step}`)}
        </li>)}
      </ol>
    </div>

    <div className="grid items-start gap-6 tablet:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-3">
        <fieldset>
          <legend className="sr-only">{t('chooseMode')}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(['mock', 'paper'] as const).map((value) => {
              const selected = mode === value
              const Icon = value === 'mock' ? Shuffle : BookOpen
              return <label key={value} className={`cursor-pointer rounded-xl border p-3 transition-colors ${selected ? 'border-action bg-tint ring-1 ring-action' : 'border-stroke bg-surface hover:border-action/50'}`}>
                <span className="flex items-center gap-2"><span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-action text-white' : 'bg-surface-0 text-action'}`}><Icon className="size-4" aria-hidden="true" /></span>
                  <span className="flex-1 text-label font-semibold text-primary-text">{t(value === 'mock' ? 'mockTitle' : 'paperTitle')}</span>
                  <input type="radio" name="imat-exam-mode" value={value} checked={selected} onChange={() => onModeChange(value)} className="size-4 shrink-0 accent-action" />
                </span>
                <span className="mt-1.5 block text-min font-normal leading-relaxed text-secondary-text">{t(value === 'mock' ? 'mockDescription' : 'paperDescription')}</span>
              </label>
            })}
          </div>
        </fieldset>

        {mode === 'mock' ? <section className="rounded-xl border border-stroke bg-surface" aria-labelledby="imat-format-heading">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stroke px-4 py-3">
            <h2 id="imat-format-heading" className="text-label font-semibold text-primary-text">{t('setup.structure')}</h2>
            <span className="text-min font-normal text-muted-text">{t('questionCount', { count })}</span>
          </div>
          <ol className="divide-y divide-stroke px-4">
            {SIMULATION_FORMAT.sections.map(({ id, count: sectionCount }) => {
              const Icon = SECTION_ICONS[id]
              return <li key={id} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 py-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-tint text-action"><Icon className="size-4" aria-hidden="true" /></span>
                <div><p className="text-label font-medium text-secondary-text">{t(`sections.${id}`)}</p><div className="mt-2 h-1 rounded-full bg-surface-0" aria-hidden="true"><div className="h-full rounded-full bg-action/50" style={{ width: `${sectionCount / count * 100}%` }} /></div></div>
                <span className="min-w-7 text-right text-label font-semibold tabular-nums text-primary-text">{formatter.number(sectionCount)}</span>
              </li>
            })}
          </ol>
          <details className="group border-t border-stroke bg-canvas px-4 text-min font-normal text-muted-text"><summary className="flex min-h-11 cursor-pointer items-center gap-2"><ChevronRight className="size-3.5 transition-transform group-open:rotate-90" aria-hidden="true" />{t('setup.selectionDetails')}</summary><p className="pb-3 leading-relaxed">{t('mockDetail')}</p></details>
        </section> : <section className="rounded-xl border border-stroke bg-surface p-4" aria-labelledby="imat-year-heading">
          <h2 id="imat-year-heading" className="text-label font-semibold text-primary-text">{t('selectYear')}</h2>
          <div className="mt-3 grid grid-cols-4 gap-2 lg:grid-cols-8" role="group" aria-label={t('selectYear')}>
            {HISTORICAL_YEARS.map((year) => {
              const available = PAST_PAPERS.find((p) => p.year === year)
              const selected = !!available && paperId === available.id
              return <button key={year} type="button" disabled={!available || !ready} aria-pressed={selected} aria-label={`${year}, ${t(available ? 'available' : 'notAvailable')}`} onClick={() => available && setPaperId(available.id)}
                className={`flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-1.5 py-2 text-label font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed disabled:border-stroke disabled:bg-canvas disabled:text-muted-text ${selected ? 'border-action bg-tint text-action' : 'border-stroke text-primary-text hover:border-action'}`}>
                {year}{selected && <Check className="size-3 shrink-0" aria-hidden="true" />}
              </button>
            })}
          </div>
          <div className="mt-2 text-min"><a href={OFFICIAL_ARCHIVE} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 font-medium text-action underline underline-offset-4">{t('officialArchive')}<ArrowUpRight className="size-3.5" aria-hidden="true" /><span className="sr-only">{t('newTab')}</span></a></div>
          <details className="group mt-1 text-min font-normal text-muted-text"><summary className="flex min-h-8 cursor-pointer items-center gap-2"><ChevronRight className="size-3.5 transition-transform group-open:rotate-90" aria-hidden="true" />{t('setup.paperDetails')}</summary><p className="py-2 leading-relaxed">{t('paperAvailability')}</p><p className="pb-2 leading-relaxed">{t('setup.sourceCorrections')}</p></details>
        </section>}
        {children}
      </div>

      <aside aria-labelledby="imat-summary-heading" className="overflow-hidden rounded-xl border border-stroke bg-surface shadow-card tablet:sticky tablet:top-24">
        <div className="h-1 bg-action" />
        <div className="p-5">
          <p id="imat-summary-heading" className="text-min font-semibold uppercase tracking-[0.1em] text-muted-text">{t('setup.summary')}</p>
          <h2 className="mt-2 text-card font-semibold leading-snug text-primary-text">{t(mode === 'mock' ? 'mockTitle' : 'paperTitle')}</h2>
          {paper && <p className="mt-1 text-min font-normal text-muted-text">{paperName}</p>}
          {format ? <>
            <dl className="my-3 grid grid-cols-2 gap-4 border-y border-stroke py-3">
              <div><dt className="mb-2 flex items-center gap-1.5 text-min font-normal text-muted-text"><ListChecks className="size-3.5" aria-hidden="true" />{t('setup.questions')}</dt><dd className="text-section font-semibold leading-none tabular-nums text-deep">{formatter.number(count)}</dd></div>
              <div><dt className="mb-2 flex items-center gap-1.5 text-min font-normal text-muted-text"><Clock3 className="size-3.5" aria-hidden="true" />{t('setup.duration')}</dt><dd className="text-section font-semibold leading-none text-deep">{formatter.number(format.minutes)} <span className="text-min font-normal text-muted-text">{t('landing.minutesLabel')}</span></dd></div>
            </dl>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-min"><p className="font-semibold text-secondary-text">{t('setup.scoring')}</p><p className="font-normal text-muted-text">{t('setup.maximumScore')}: {formatter.number(count * format.correct)}</p></div>
            <div className="grid grid-cols-3 gap-2">
              {([{ value: format.correct, key: 'correct' }, { value: format.incorrect, key: 'incorrect' }, { value: 0, key: 'setup.blank' }] as const).map(({ value, key }) => <div key={key} className="min-w-0 rounded-lg bg-canvas px-2 py-2 text-center"><p className={`text-label font-semibold tabular-nums ${value > 0 ? 'text-action' : 'text-primary-text'}`}>{value > 0 ? '+' : ''}{formatter.number(value)}</p><p className="mt-1 break-words text-min font-normal text-muted-text">{t(key)}</p></div>)}
            </div>
          </> : <div className="my-6 rounded-lg border border-dashed border-stroke-strong bg-canvas px-4 py-8 text-center"><BookOpen className="mx-auto mb-3 size-6 text-action" aria-hidden="true" /><p className="text-label font-normal text-muted-text">{t('setup.choosePaperHint')}</p></div>}
          <button type="button" disabled={!ready || !format || (mode === 'mock' && !canMock)} onClick={() => onReview({ mode, ...(paper && { paperId: paper.id }) })} className={`${PRIMARY_BUTTON} mt-4 w-full px-4`}>
            {t('setup.reviewInstructions')}<ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </button>
          <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-min font-normal leading-relaxed text-muted-text"><Clock3 className="mt-0.5 size-3.5 shrink-0 text-action" aria-hidden="true" />{t('setup.timerNote')}</p>
        </div>
      </aside>
    </div>
  </section>
}
