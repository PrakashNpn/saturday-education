'use client'

import { useId, useState } from 'react'
import { PracticeButton } from './PracticeButton'
import s from './practiceTest.module.css'

export type NavigatorQuestion = { id: string; answered: boolean; flagged: boolean; label: string }
export function QuestionNavigator({ questions, current, disabled, onSelect, onFinish, labels, hint, note }: {
  questions: NavigatorQuestion[]; current: number; disabled?: boolean; onSelect: (index: number) => void; onFinish: () => void
  labels: { title: string; answered: string; unanswered: string; flagged: string; show: string; hide: string; finish: string }
  hint?: string; note?: string
}) {
  const id = useId(), [expanded, setExpanded] = useState(false)
  const count = questions.filter(q => q.answered).length
  return <aside className={s.sidebar}><section className={s.navigator}><div className={s.between}><h2>{labels.title}</h2><span>{count}/{questions.length}</span></div>
    <div className={s.progress} role="progressbar" aria-label={labels.answered} aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={count}><span style={{ width: `${questions.length ? count / questions.length * 100 : 0}%` }} /></div>
    <button type="button" className={s.navigatorToggle} aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)}>{expanded ? labels.hide : labels.show}</button>
    <div id={id} className={s.palette} data-expanded={expanded}>{questions.map((q, i) => <button key={q.id} type="button" disabled={disabled} aria-label={q.label} aria-current={i === current ? 'step' : undefined} className={`${q.answered ? s.answered : ''} ${i === current ? s.current : ''}`} onClick={() => onSelect(i)}>{i + 1}{q.flagged && <small aria-hidden="true">⚑</small>}</button>)}</div>
    <div className={s.legend}><span><i className={s.legendAnswered} />{labels.answered}</span><span><i className={s.legendUnanswered} />{labels.unanswered}</span><span>⚑ {labels.flagged}</span></div>
    {hint && <p className={s.navigatorHint}>{hint}</p>}<PracticeButton secondary className={s.finish} onClick={onFinish} disabled={disabled}>{labels.finish}<span aria-hidden="true">→</span></PracticeButton>
  </section>{note && <p className={s.sessionNote}>{note}</p>}</aside>
}
