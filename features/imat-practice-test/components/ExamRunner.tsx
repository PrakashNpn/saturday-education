'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight, Flag, Clock3, Check, LogOut } from 'lucide-react'
import { useExamSession } from './ExamSession'
import { ConfirmDialog } from './ConfirmDialog'
import { QuestionFigure } from './QuestionFigure'
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from './styles'
import type { Attempt } from '../types'

export function ExamRunner({ attempt, onLeave }: { attempt: Attempt; onLeave: () => void }) {
  const { engine: { finishAttempt, remainingSeconds }, store: { changeAttempt, updateAttempt }, questionsById: QUESTIONS_BY_ID } = useExamSession()
  const t = useTranslations('imat')
  const [remaining, setRemaining] = useState(() => remainingSeconds(attempt))
  const [confirm, setConfirm] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const question = QUESTIONS_BY_ID.get(attempt.questionIds[attempt.index])!
  const answered = Object.keys(attempt.answers).length
  const flagged = attempt.flagged.includes(question.id)
  const deadline = attempt.deadline

  useEffect(() => {
    const tick = () => {
      setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)))
    }
    const interval = window.setInterval(tick, 1000)
    window.addEventListener('focus', tick)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', tick)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [deadline])

  useEffect(() => { heading.current?.focus() }, [attempt.index])

  const navigate = (index: number) => changeAttempt((current) => ({ ...current, index }))
  const time = `${Math.floor(remaining / 60).toString().padStart(2, '0')}:${(remaining % 60).toString().padStart(2, '0')}`

  return (
    <section data-exam-active aria-label={t('testInProgress')} className="min-h-svh bg-canvas">
      <header className="sticky top-0 z-30 border-b border-stroke bg-surface">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-4">
            <Image src="/images/logo/logo.webp" alt="Saturday Education" width={150} height={55} className="hidden h-auto w-[150px] sm:block" />
            <div className="sm:border-l sm:border-stroke sm:pl-4"><p className="text-label font-semibold text-deep">IMAT</p><p className="text-min font-normal text-muted-text">{t(attempt.mode === 'mock' ? 'mockTitle' : 'paperTitle')}</p></div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div role="timer" aria-label={t('remainingTime')} className={`text-right ${remaining <= 300 ? 'text-error' : 'text-deep'}`}>
              <p className="text-min font-normal text-muted-text">{t('remainingTime')}</p>
              <p className="flex items-center justify-end gap-2 font-mono text-section font-semibold tabular-nums"><Clock3 className="size-4" aria-hidden="true" />{time}</p>
            </div>
            <button type="button" onClick={onLeave} className={`${SECONDARY_BUTTON} !rounded-lg !px-3`}><LogOut className="size-4" aria-hidden="true" /><span>{t('saveLeave')}</span></button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1280px] px-5 py-5 sm:px-8 sm:py-7">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <p className="text-card font-semibold text-primary-text">{t(`sections.${question.section}`)}</p>
          <p className="text-label font-normal text-muted-text">{t('answeredCount', { count: answered, total: attempt.questionIds.length })}</p>
        </div>
      {remaining <= 300 && <p role="status" className="mb-4 text-label font-medium text-error">{t('timeWarning')}</p>}
      <div className="grid items-start gap-6 tablet:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-2xl border border-stroke bg-surface p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="rounded-full bg-tint px-3 py-1 text-min font-medium text-action">{t('questionNumber', { number: attempt.index + 1, total: attempt.questionIds.length })}</p>
            <button type="button" aria-pressed={flagged} onClick={() => changeAttempt((current) => ({
              ...current, flagged: flagged ? current.flagged.filter((id) => id !== question.id) : [...current.flagged, question.id],
            }))} className={`${SECONDARY_BUTTON} !rounded-lg !border-transparent !px-2 ${flagged ? 'border-accent-ink text-accent-ink' : ''}`}>
              <Flag className="size-4" fill={flagged ? 'currentColor' : 'none'} aria-hidden="true" />{t(flagged ? 'flagged' : 'flag')}
            </button>
          </div>
          <h1 ref={heading} tabIndex={-1} className="sr-only outline-none">{t('questionNumber', { number: attempt.index + 1, total: attempt.questionIds.length })}</h1>
          {question.passage && <div lang="en" className="mb-5 whitespace-pre-line rounded-xl border border-stroke bg-canvas p-5 text-body font-normal leading-relaxed">{question.passage.text}<QuestionFigure image={question.passage.image} /></div>}
          <fieldset lang="en">
            <legend className="mb-5 text-lede font-medium text-primary-text">{question.prompt}</legend>
            <QuestionFigure image={question.image} />
            <div className="space-y-3">
              {attempt.optionOrder[question.id].map((id, i) => {
                const option = question.options.find((o) => o.id === id)!
                const selected = attempt.answers[question.id] === id
                return (
                  <label key={id} className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${selected ? 'border-action bg-tint' : 'border-stroke hover:border-action/60'}`}>
                    <input type="radio" name={question.id} value={id} checked={selected}
                      onChange={() => changeAttempt((current) => ({ ...current, answers: { ...current.answers, [question.id]: id } }))}
                      className="mt-1 size-4 shrink-0 accent-action" />
                    <span className="text-body font-normal"><span className="mr-2 font-semibold text-action">{String.fromCharCode(65 + i)}.</span>{option.text}<QuestionFigure image={option.image} /></span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          <button type="button" disabled={!attempt.answers[question.id]} onClick={() => changeAttempt((current) => {
            const answers = { ...current.answers }
            delete answers[question.id]
            return { ...current, answers }
          })} className="mt-4 min-h-11 cursor-pointer text-label font-medium text-muted-text underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-40">{t('clearAnswer')}</button>
          <div className="mt-4 flex flex-wrap justify-between gap-3 border-t border-stroke pt-4">
            <button type="button" disabled={attempt.index === 0} onClick={() => navigate(attempt.index - 1)} className={SECONDARY_BUTTON}><ArrowLeft className="size-4" aria-hidden="true" />{t('previous')}</button>
            {attempt.index < attempt.questionIds.length - 1
              ? <button type="button" onClick={() => navigate(attempt.index + 1)} className={PRIMARY_BUTTON}>{t('next')}<ArrowRight className="size-4" aria-hidden="true" /></button>
              : <button type="button" onClick={() => setConfirm(true)} className={PRIMARY_BUTTON}>{t('submit')}</button>}
          </div>
        </div>
        <aside className="flex flex-col rounded-2xl border border-stroke bg-surface p-4 tablet:sticky tablet:top-28 tablet:max-h-[calc(100svh-12rem)]">
          <details open className="min-h-0 overflow-y-auto">
            <summary className="cursor-pointer text-label font-semibold text-primary-text">{t('navigator')}</summary>
            <div className="my-3 h-1 overflow-hidden rounded-full bg-surface-1" aria-hidden="true"><div className="h-full bg-action transition-[width]" style={{ width: `${answered / attempt.questionIds.length * 100}%` }} /></div>
            <div className="grid max-h-[min(32svh,280px)] grid-cols-6 gap-2 overflow-y-auto p-1 tablet:gap-1.5">
              {attempt.questionIds.map((id, i) => {
                const isAnswered = !!attempt.answers[id]
                const isFlagged = attempt.flagged.includes(id)
                return <button key={id} type="button" onClick={() => navigate(i)} aria-current={i === attempt.index ? 'step' : undefined}
                  aria-label={`${t('questionNumber', { number: i + 1, total: attempt.questionIds.length })}, ${t(isAnswered ? 'answered' : 'unanswered')}${isFlagged ? `, ${t('flagged')}` : ''}`}
                  className={`relative flex min-h-11 cursor-pointer items-center justify-center rounded-lg border text-label font-medium tablet:min-h-8 tablet:text-min ${i === attempt.index ? 'ring-2 ring-action ring-offset-2' : ''} ${isAnswered ? 'border-action bg-action text-white' : 'border-stroke bg-surface text-secondary-text'}`}>
                  {i + 1}{isFlagged && <Flag className="absolute -right-1 -top-1 size-3.5 rounded-sm bg-surface text-accent-ink" fill="currentColor" aria-hidden="true" />}
                </button>
              })}
            </div>
          </details>
          <div className="mt-3 flex shrink-0 flex-wrap gap-x-3 gap-y-2 text-min font-normal text-muted-text">
            <p className="flex items-center gap-2"><Check className="size-4 text-action" aria-hidden="true" />{t('answered')}</p>
            <p className="flex items-center gap-2"><Flag className="size-4 text-accent-ink" aria-hidden="true" />{t('flaggedCount', { count: attempt.flagged.length })}</p>
            <p className="w-full leading-relaxed">{t('timerContinues')}</p>
          </div>
          <button type="button" onClick={() => setConfirm(true)} className={`${PRIMARY_BUTTON} mt-3 w-full shrink-0 !rounded-lg`}>{t('submit')}</button>
        </aside>
      </div>
      </div>
      {confirm && <ConfirmDialog title={t('submitTitle')} action={t('submit')} onClose={() => setConfirm(false)} onConfirm={() => updateAttempt(finishAttempt(attempt))}>
        <p>{t('submitBody', { unanswered: attempt.questionIds.length - answered, flagged: attempt.flagged.length })}</p>
        <p>{t('submitFinal')}</p>
      </ConfirmDialog>}
    </section>
  )
}
