'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { SessionView, PaperResult } from '../types'
import { Action } from './Screens'
import { PracticeHeader } from '@/shared/components/practice-test/PracticeHeader'
import { QuestionDiagram } from './QuestionDiagram'
import s from './practice.module.css'

export function ResultsHeader({ onHome, onAgain }: { onHome: () => void; onAgain: () => void }) {
  const t = useTranslations('csca')
  return <PracticeHeader actions={<><Action secondary onClick={onHome}>← {t('backGuide')}</Action><Action onClick={onAgain}>{t('again')} ↗</Action></>} />
}
function AnswerReview({ paper }: { paper: PaperResult }) {
  const t = useTranslations('csca'), [filter, setFilter] = useState('all')
  const status = (selected: string | null, correct: boolean) => selected === null ? 'skipped' : correct ? 'correct' : 'incorrect'
  const counts = { correct: paper.correct, incorrect: paper.answered - paper.correct, skipped: paper.total - paper.answered }
  const list = paper.questions.map((q, i) => ({ q, i })).filter(({ q }) => filter === 'all' || status(q.selected, q.correct) === filter)
  const language = paper.subject.startsWith('chinese') ? 'zh-Hans' : 'en'
  return <section className={s.answerReview}><div className={s.between}><h2>{t('answerReview')}</h2><p>{Object.entries(counts).map(([key, count]) => `${t(key)}: ${count}`).join(' · ')}</p></div>
    <div className={s.directionOptions} role="group" aria-label={t('answerReview')}>{['all', 'incorrect', 'skipped'].map(key => <button type="button" key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{t(key)}</button>)}</div>
    {list.map(({ q, i }) => <details key={q.id} className={s.answerDetail}><summary><strong>{t('questionCount', { number: i + 1, total: paper.total })}</strong><span className={s[status(q.selected, q.correct)]}>{t(status(q.selected, q.correct))}</span></summary><div className={s.answerBody}>
      {q.passage && <blockquote className={s.passage} lang={language}>{q.passage}</blockquote>}<h3 lang={language}>{q.text}</h3><QuestionDiagram question={q} />
      <div className={s.answerComparison}><div><h4>{t('yourAnswer')}</h4><p lang={language}>{q.selected ? `${q.selected}. ${q.options.find(o => o.key === q.selected)?.text}` : t('unanswered')}</p></div><div><h4>{t('correctAnswer')}</h4><p lang={language}>{q.answer}. {q.options.find(o => o.key === q.answer)?.text}</p></div></div><h4>{t('explanation')}</h4><p lang="en" className={s.explanation}>{q.explanation}</p></div></details>)}
    {list.length === 0 && <p className={s.card}>{t('noAnswers')}</p>}
  </section>
}
export function ResultsReport({ session, selected, onSelect }: { session: SessionView; selected: number; onSelect: (index: number) => void }) {
  const t = useTranslations('csca'), papers = session.results ?? [], paper = papers[selected]
  if (!paper) return null
  const email = session.emailStatus === 'accepted' || session.emailStatus === 'delivered' ? 'emailAccepted' : ['failed', 'bounced', 'cancelled'].includes(session.emailStatus ?? '') ? 'emailFailed' : 'emailQueued'
  return <><p className={s.eyebrow}>{t('complete')}</p><h1>{t('resultsTitle')}</h1><p>{t('practiceOnly')}</p><div className={s.scoreGrid}>{papers.map((result, index) => <button key={result.subject} type="button" aria-pressed={index === selected} onClick={() => onSelect(index)} className={s.scoreCard}><span>{t(`subjects.${result.subject}`)}</span><strong>{result.score}<small>/100</small></strong><span>{t('questions')}: {result.total}</span></button>)}</div>
    <p role="status" className={s.muted}>{t(email)} <button type="button" className={s.textButton} onClick={() => window.location.reload()}>{t('refresh')}</button></p><AnswerReview key={paper.subject} paper={paper} />
  </>
}
