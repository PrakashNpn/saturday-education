'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useExamSession } from './ExamSession'
import { ConfirmDialog } from './ConfirmDialog'
import { QuestionFigure } from './QuestionFigure'
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from './styles'
import type { Attempt } from '../types'
import { PracticeHeader, PracticeExitButton } from '@/shared/components/practice-test/PracticeHeader'
import { QuestionPanel, QuestionOption } from '@/shared/components/practice-test/QuestionPanel'
import { QuestionNavigator } from '@/shared/components/practice-test/QuestionNavigator'
import ui from '@/shared/components/practice-test/practiceTest.module.css'

export function ExamRunner({ attempt, onLeave }: { attempt: Attempt; onLeave: () => void }) {
  const { engine: { finishAttempt, remainingSeconds }, store: { changeAttempt, updateAttempt }, questionsById: QUESTIONS_BY_ID } = useExamSession()
  const t = useTranslations('imat'), locale = useLocale()
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
    <section data-exam-active aria-label={t('testInProgress')} className={ui.workspace}>
      <PracticeHeader title="IMAT" context={t(attempt.mode === 'mock' ? 'mockTitle' : 'paperTitle')} timer={{ label: t('remainingTime'), value: time, urgent: remaining <= 300 }} actions={<PracticeExitButton label={t('saveLeave')} onClick={onLeave} />} />
      <div className={ui.content}>
        <header className={ui.paperHeading}><h2>{t(`sections.${question.section}`)}</h2><span>{t('answeredCount', { count: answered, total: attempt.questionIds.length })}</span></header>
        {remaining <= 300 && <p role="status" className="mb-4 text-label font-medium text-error">{t('timeWarning')}</p>}
        <div className={ui.examGrid}>
          <QuestionPanel label={t('questionNumber', { number: attempt.index + 1, total: attempt.questionIds.length })} flagLabel={t(flagged ? 'flagged' : 'flag')} flagged={flagged} onFlag={() => changeAttempt(current => ({ ...current, flagged: flagged ? current.flagged.filter(id => id !== question.id) : [...current.flagged, question.id] }))} actions={<>
            <button type="button" disabled={attempt.index === 0} onClick={() => navigate(attempt.index - 1)} className={SECONDARY_BUTTON}><ArrowLeft className="size-4" aria-hidden="true" />{t('previous')}</button>
            <div className={ui.nextActions}><button type="button" className={ui.textButton} disabled={!attempt.answers[question.id]} onClick={() => changeAttempt(current => { const answers = { ...current.answers }; delete answers[question.id]; return { ...current, answers } })}>{t('clearAnswer')}</button>
              {attempt.index < attempt.questionIds.length - 1 ? <button type="button" onClick={() => navigate(attempt.index + 1)} className={PRIMARY_BUTTON}>{t('next')}<ArrowRight className="size-4" aria-hidden="true" /></button> : <button type="button" onClick={() => setConfirm(true)} className={PRIMARY_BUTTON}>{t('submit')}</button>}
            </div>
          </>}>
            <h1 ref={heading} tabIndex={-1} className="sr-only outline-none">{t('questionNumber', { number: attempt.index + 1, total: attempt.questionIds.length })}</h1>
            <div lang="en">
              {question.passage && <div className={ui.passage}>{question.passage.text}<QuestionFigure image={question.passage.image} /></div>}
              <h2 className={ui.question}>{question.prompt}</h2><QuestionFigure image={question.image} />
              <fieldset className={ui.options}><legend lang={locale}>{t('chooseAnswer')}</legend>{attempt.optionOrder[question.id].map((id, i) => {
                const option = question.options.find(o => o.id === id)!
                return <QuestionOption key={id} name={question.id} value={id} letter={String.fromCharCode(65 + i)} checked={attempt.answers[question.id] === id} onSelect={() => changeAttempt(current => ({ ...current, answers: { ...current.answers, [question.id]: id } }))}>{option.text}<QuestionFigure image={option.image} /></QuestionOption>
              })}</fieldset>
            </div>
          </QuestionPanel>
          <QuestionNavigator questions={attempt.questionIds.map((id, i) => ({ id, answered: !!attempt.answers[id], flagged: attempt.flagged.includes(id), label: `${t('questionNumber', { number: i + 1, total: attempt.questionIds.length })}, ${t(attempt.answers[id] ? 'answered' : 'unanswered')}${attempt.flagged.includes(id) ? ', ' + t('flagged') : ''}` }))} current={attempt.index} onSelect={navigate} onFinish={() => setConfirm(true)} labels={{ title: t('navigator'), answered: t('answered'), unanswered: t('unanswered'), flagged: t('flagged'), show: t('showMap'), hide: t('hideMap'), finish: t('submit') }} hint={t('timerContinues')} />
        </div>
      </div>
      {confirm && <ConfirmDialog title={t('submitTitle')} action={t('submit')} onClose={() => setConfirm(false)} onConfirm={() => updateAttempt(finishAttempt(attempt))}>
        <p>{t('submitBody', { unanswered: attempt.questionIds.length - answered, flagged: attempt.flagged.length })}</p>
        <p>{t('submitFinal')}</p>
      </ConfirmDialog>}
    </section>
  )
}
