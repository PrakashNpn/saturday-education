'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowLeft, CheckCircle2, XCircle, MinusCircle } from 'lucide-react'
import { languageOf } from '@/i18n/languages'
import { useExamSession } from './ExamSession'
import { PANEL, SECONDARY_BUTTON } from './styles'
import { QuestionFigure } from './QuestionFigure'
import type { Attempt } from '../types'
import { isCorrectOption } from '../services/scoring'

export function ExamResults({ attempt, onHome }: { attempt: Attempt; onHome: () => void }) {
  const { catalog, engine: { scoreAttempt }, questionsById: QUESTIONS_BY_ID } = useExamSession()
  const t = useTranslations('imat')
  const locale = useLocale()
  const number = new Intl.NumberFormat(languageOf(locale).numberLocale, { maximumFractionDigits: 2 })
  const result = scoreAttempt(attempt)
  const paper = attempt.mode === 'paper' ? catalog.papers.find(p => p.id === attempt.paperId) : undefined
  const [filter, setFilter] = useState('all')
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus() }, [])
  const questions = attempt.questionIds.map((id, i) => ({ question: QUESTIONS_BY_ID.get(id)!, number: i + 1 }))
    .filter(({ question: q }) => filter === 'all' || !isCorrectOption(q, attempt.answers[q.id]))
  return (
    <section className="mx-auto max-w-wrap space-y-7 px-5 py-10 pb-28 sm:px-6">
      <button type="button" onClick={onHome} className={SECONDARY_BUTTON}><ArrowLeft className="size-4" aria-hidden="true" />{t('backToExams')}</button>
      <div className="rounded-2xl bg-deep p-7 text-white sm:p-10">
        <p className="text-min font-medium uppercase tracking-wider text-light">{t('completed')}</p>
        <h1 ref={heading} tabIndex={-1} className="mt-2 text-title font-semibold outline-none">{t('resultsTitle')}</h1>
        <p className="my-5 text-display font-semibold tabular-nums">{number.format(result.score)} <span className="text-lede font-normal text-white/70">/ {number.format(result.maximum)}</span></p>
        <div className="flex flex-wrap gap-5 text-label">
          <span>{t('correct')}: {result.correct}</span><span>{t('incorrect')}: {result.incorrect}</span><span>{t('unanswered')}: {result.unanswered}</span>
        </div>
        <p className="mt-5 max-w-2xl text-label text-white/75">{t('resultGeneral')}</p>
        {paper?.scoringNotice && <p lang="en" className="mt-4 max-w-2xl text-label text-light">{paper.scoringNotice}</p>}
        {attempt.completedAt === attempt.deadline && <p className="mt-3 text-label text-light">{t('autoSubmitted')}</p>}
      </div>
      <div className={PANEL}>
        <h2 className="mb-5 text-section font-semibold text-primary-text">{t('breakdown')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-label font-normal">
            <caption className="sr-only">{t('breakdown')}</caption>
            <thead><tr className="border-b border-stroke text-muted-text">
              {['subject', 'correct', 'incorrect', 'unanswered', 'score'].map((key) => <th key={key} scope="col" className="px-3 py-3 first:pl-0">{t(key)}</th>)}
            </tr></thead>
            <tbody>{result.rows.map((row) => <tr key={row.id} className="border-b border-stroke last:border-0">
              <th scope="row" className="py-4 pr-3 font-medium">{t(`sections.${row.id}`)}</th>
              <td className="px-3 py-4">{row.correct}</td><td className="px-3 py-4">{row.incorrect}</td><td className="px-3 py-4">{row.unanswered}</td><td className="px-3 py-4 font-semibold text-action">{number.format(row.score)}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-section font-semibold text-primary-text">{t('answerReview')}</h2>
        <label className="flex items-center gap-3 text-label font-medium">{t('show')}
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="min-h-11 rounded-lg border border-stroke-strong bg-surface px-3">
            <option value="all">{t('allQuestions')}</option><option value="mistakes">{t('mistakes')}</option>
          </select>
        </label>
      </div>
      {questions.length === 0 && <p className={PANEL}>{t('noMistakes')}</p>}
      {questions.map(({ question: q, number: index }) => {
        const selected = attempt.answers[q.id]
        const correct = isCorrectOption(q, selected)
        const credited = !!q.scoringPolicy && (correct || (selected === undefined && q.scoringPolicy.blankTreatment === 'full-credit'))
        const Icon = correct || credited ? CheckCircle2 : selected ? XCircle : MinusCircle
        return <article key={q.id} className={PANEL}>
          <div className="mb-4 flex items-center gap-2 text-label font-medium"><Icon aria-hidden="true" className={`size-5 ${correct || credited ? 'text-success' : selected ? 'text-error' : 'text-muted-text'}`} />
            {t('questionNumber', { number: index, total: attempt.questionIds.length })}<span className="text-muted-text">· {t(credited ? 'creditAwarded' : correct ? 'correct' : selected ? 'incorrect' : 'unanswered')}</span>
          </div>
          {q.passage && <details className="mb-4 rounded-xl bg-canvas p-4 text-label"><summary className="cursor-pointer font-medium">{t('readingPassage')}</summary><div lang="en" className="mt-3 whitespace-pre-line">{q.passage.text}<QuestionFigure image={q.passage.image} /></div></details>}
          <h3 lang="en" className="mb-4 text-body font-medium text-primary-text">{q.prompt}</h3>
          <QuestionFigure image={q.image} />
          <ul lang="en" className="space-y-2 text-label font-normal">{attempt.optionOrder[q.id].map((id, i) => {
            const option = q.options.find((o) => o.id === id)!
            return <li key={id} className={`rounded-lg border px-4 py-3 ${isCorrectOption(q, id) ? 'border-success bg-success/5' : id === selected ? 'border-error bg-error/5' : 'border-stroke'}`}>
              <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>{option.text}
              <QuestionFigure image={option.image} />
              {isCorrectOption(q, id) && <span lang={locale} className="ml-3 font-medium text-success">{t(q.scoringPolicy ? 'acceptedAnswer' : 'correctAnswer')}</span>}
              {id === selected && <span lang={locale} className="ml-3 font-medium">{t('yourAnswer')}</span>}
            </li>
          })}</ul>
          {q.scoringPolicy?.note && <p lang="en" className="mt-4 rounded-lg bg-tint p-4 text-label text-secondary-text">{q.scoringPolicy.note}</p>}
          {q.explanation && <div className="mt-5 rounded-xl bg-tint p-4"><p className="mb-1 text-min font-semibold text-action">{t('explanation')}</p><p lang="en" className="text-label font-normal">{q.explanation}</p></div>}
          {q.source.kind !== 'development' && <p className="mt-4 text-min text-muted-text">{t('source')}: <span lang="en">{q.source.reference}</span></p>}
        </article>
      })}
    </section>
  )
}
