'use client'
import { useEffect, useRef, type ButtonHTMLAttributes } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { PAPER_FORMATS, paperTotals, sessionPaper } from '../config'
import type { SessionView, SubjectId, CatalogItem } from '../types'
import { QuestionDiagram } from './QuestionDiagram'
import { SubjectDeck } from './SubjectDeck'
import { CscaOverview } from './CscaOverview'
import { PracticeButton } from '@/shared/components/practice-test/PracticeButton'
import { QuestionPanel, QuestionOption } from '@/shared/components/practice-test/QuestionPanel'
import { QuestionNavigator } from '@/shared/components/practice-test/QuestionNavigator'
import ui from '@/shared/components/practice-test/practiceTest.module.css'
import s from './practice.module.css'

export const STUDY_DIRECTIONS = [
  { id: 'engineering', subjects: ['math', 'physics'], track: 'chinese-stem' },
  { id: 'medicine', subjects: ['math', 'chemistry'], track: 'chinese-stem' },
  { id: 'humanities', subjects: ['math', 'chinese-humanities'], track: 'chinese-humanities' },
  { id: 'custom', subjects: [], track: 'chinese-stem' },
] as const
export type StudyDirection = typeof STUDY_DIRECTIONS[number]['id']
const BASE: SubjectId[] = ['chinese-stem', 'math', 'physics', 'chemistry']
const ICONS = ['中', 'ƒ', '↗', 'H₂']

export function Action({ secondary, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { secondary?: boolean }) {
  return <PracticeButton secondary={secondary} className={`${secondary ? '' : s.action} ${className}`} {...props} />
}
export function Home({ onCsca }: { onCsca: () => void }) {
  const t = useTranslations('csca')
  return <>
    <section className={s.hero}>
      <div><p className={s.eyebrow}>{t('design.eyebrow')}</p><div className={s.signature}>CSCA<span>.</span></div><p className={s.rubric}>{t('withSaturday')}</p>
        <h1>{t.rich('design.heroHeading', { line: chunks => <span className={s.heroLine}>{chunks}</span>, accent: chunks => <span className={s.heroAccent}>{chunks}</span> })}</h1><p className={s.lede}>{t('heroIntro')}</p><Action onClick={onCsca}>{t('start')} ↗</Action>
        <div className={s.heroLinks}><a href="#about-csca">{t('aboutLink')} ↓</a><span>{t('free')}</span></div>
      </div>
      <SubjectDeck />
    </section>
    <CscaOverview onStart={onCsca} />
  </>
}
type SetupProps = { direction: StudyDirection | null; onDirection: (id: StudyDirection) => void; catalog: CatalogItem[]; subjects: SubjectId[]; track: SubjectId; onTrack: (id: SubjectId) => void; onToggle: (id: SubjectId) => void; onHome: () => void; onContinue: () => void }
export function Setup({ direction, onDirection, catalog, subjects, track, onTrack, onToggle, onHome, onContinue }: SetupProps) {
  const t = useTranslations('csca'), totals = paperTotals(subjects)
  const ready = subjects.length > 0 && subjects.every(id => (catalog.find(item => item.id === id)?.count ?? 0) >= PAPER_FORMATS[id].questions)
  return <div className={s.setupWorkspace} data-csca-setup="">
    <button type="button" className={s.setupBack} onClick={onHome}>← {t('backGuide')}</button>
    <header className={s.setupHeading}><p className={s.eyebrow}>{t('title')}</p><h1>{t('setupTitle')}</h1><p>{t('setupIntro')}</p></header>
    <div className={s.directionHeading}><span>{t('studyDirection')}</span><a href="https://admission.zstu.edu.cn/En/Csca?classId=78" target="_blank" rel="noopener noreferrer">{t('design.subjectGuide')} ↗</a></div>
    <div className={s.directionOptions} role="group" aria-label={t('studyDirection')}>{STUDY_DIRECTIONS.map(item => <button key={item.id} type="button" aria-pressed={direction === item.id} onClick={() => onDirection(item.id)}>{t(`directions.${item.id}`)}</button>)}</div>
    <p className={s.directionNote}>{direction ? t(`directionNotes.${direction}`) : t('guideNote')}</p>
    <div className={s.setupGrid}>
      <fieldset className={s.fieldset}><legend className={s.setupLegend}>{t('chooseSubjects')}<span aria-live="polite">{t('design.selectedCount', { count: subjects.length })}</span></legend>
        <div className={s.subjectGrid}>{BASE.map((base, index) => {
          const id = base.startsWith('chinese') ? track : base
          const available = (catalog.find(item => item.id === id)?.count ?? 0) >= PAPER_FORMATS[id].questions
          return <div key={base} className={`${s.subjectTile} ${subjects.includes(id) ? s.picked : ''}`}>
            <label className={s.subjectPick}><input type="checkbox" checked={subjects.includes(id)} disabled={!available} onChange={() => onToggle(id)} /><span className={s.blockSymbol} aria-hidden="true">{ICONS[index]}</span><strong>{t(base.startsWith('chinese') ? 'design.chinese' : `subjects.${base}`)}</strong></label>
            {base.startsWith('chinese') ? <div className={s.tracks} role="radiogroup" aria-label={t('chineseTrack')}>{(['chinese-stem', 'chinese-humanities'] as SubjectId[]).map(key => <label key={key}><input type="radio" name="csca-track" checked={track === key} onChange={() => onTrack(key)} /><span>{t(key === 'chinese-stem' ? 'stem' : 'humanities')}</span></label>)}</div> : <p className={s.blockDescription}>{t('englishLanguage')} · {t('design.mixedTopics')}</p>}
            <p className={s.blockMeta}>{available ? t('format', PAPER_FORMATS[id]) : t('contentUnavailable')}</p>
          </div>
        })}</div>
      </fieldset>
      <aside className={s.summary}>
        <p className={s.eyebrow}>{t('sessionPlan')}</p><h2>{subjects.length === 1 ? t(`subjects.${subjects[0]}`) : t('summaryTitle')}</h2>
        <div className={s.totals}><div><strong>{totals.questions}</strong><span>{t('questions')}</span></div><div><strong>{totals.minutes}<small> {t('design.min')}</small></strong><span>{t('design.testTime')}</span></div></div>
        {subjects.length === 0 && <p className={s.emptyPlan}>{t('design.emptyPlan')}</p>}
        <ol className={s.summaryPapers}>{subjects.map((id, index) => <li key={id}><span>{index + 1}</span>{t(`subjects.${id}`)}</li>)}</ol>
        {subjects.length === 1 && <p className={s.singlePaperDetail}>{t(subjects[0].startsWith('chinese') ? 'chineseLanguage' : 'englishLanguage')} · {t('design.mixedTopics')}</p>}
        <p className={s.summaryNote}>{t(subjects.length === 1 ? 'design.singleNote' : 'separateTimers')}</p>
        <Action disabled={!ready} onClick={onContinue}>{t('instructions')} <span aria-hidden="true">↗</span></Action>
        {!ready && <p className={s.setupValidation}>{t('design.chooseAtLeastOne')}</p>}
      </aside>
    </div>
    <p className={s.setupDisclaimer}>{t('guideNote')}</p>
  </div>
}

type PaperProps = { session: SessionView; answers: (string | null)[]; flags: number[]; index: number; disabled: boolean; onAnswer: (answer: string | null) => void; onFlag: () => void; onIndex: (index: number) => void; onReview: () => void }
export function Paper({ session, answers, flags, index, disabled, onAnswer, onFlag, onIndex, onReview }: PaperProps) {
  const locale = useLocale()
  const t = useTranslations('csca'), q = session.questions[index], total = answers.length, count = answers.filter(v => v !== null).length
  const heading = useRef<HTMLHeadingElement>(null), previous = useRef(index)
  useEffect(() => { if (previous.current !== index) { previous.current = index; heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: 'nearest' }) } }, [index])
  return <><header className={ui.paperHeading}><div><p className={s.paperContext}>{session.subjects.length > 1 ? t('paperNumber', { number: session.paper + 1, total: session.subjects.length }) : t('design.subjectPractice')}</p><h1>{t(`subjects.${session.subjects[session.paper]}`)}</h1></div><span>{t('answeredCount', { count, total })}</span></header><div className={ui.examGrid}>
    <QuestionPanel label={t('questionCount', { number: index + 1, total })} flagLabel={t(flags.includes(index) ? 'flagged' : 'flag')} flagged={flags.includes(index)} disabled={disabled} onFlag={onFlag} actions={<><Action secondary disabled={disabled || index === 0} onClick={() => onIndex(index - 1)}>← {t('previous')}</Action><div className={ui.nextActions}><button type="button" className={ui.textButton} disabled={disabled || answers[index] === null} onClick={() => onAnswer(null)}>{t('clear')}</button><Action disabled={disabled} onClick={() => index === total - 1 ? onReview() : onIndex(index + 1)}>{t(index === total - 1 ? 'review' : 'next')} →</Action></div></>}>
      <div lang={session.subjects[session.paper].startsWith('chinese') ? 'zh-Hans' : 'en'}>{q.passage && <blockquote className={ui.passage}>{q.passage}</blockquote>}<h2 ref={heading} tabIndex={-1} className={ui.question}>{q.text}</h2><QuestionDiagram question={q} timed />
        <fieldset className={ui.options}><legend lang={locale}>{t('chooseAnswer')}</legend>{q.options.map(option => <QuestionOption key={option.key} name={q.id} value={option.key} letter={option.key} checked={answers[index] === option.key} disabled={disabled} onSelect={() => onAnswer(option.key)}>{option.text}</QuestionOption>)}</fieldset></div>
    </QuestionPanel>
    <QuestionNavigator questions={session.questions.map((item, i) => ({ id: item.id, answered: answers[i] !== null, flagged: flags.includes(i), label: `${t('questionCount', { number: i + 1, total })}, ${t(answers[i] !== null ? 'answered' : 'unanswered')}${flags.includes(i) ? ', ' + t('flagged') : ''}` }))} current={index} disabled={disabled} onSelect={onIndex} onFinish={onReview} labels={{ title: t('navigator'), answered: t('answered'), unanswered: t('unanswered'), flagged: t('flagged'), show: t('showMap'), hide: t('hideMap'), finish: t('review') }} hint={t('design.moveFreely')} note={t('saveNote')} />
  </div></>

}
export function Review({ session, answers, flags, busy, locked, onRevisit, onSubmit }: { session: SessionView; answers: (string | null)[]; flags: number[]; busy: boolean; locked: boolean; onRevisit: (i: number) => void; onSubmit: () => void }) {
  const t = useTranslations('csca'), count = answers.filter(v => v !== null).length
  return <><h1>{t('reviewTitle')}</h1><p>{t('answeredCount', { count, total: answers.length })} · {flags.length} {t('flagged')}</p><div className={s.setupGrid}><section className={s.card}>{session.questions.map((q, i) => <div className={s.reviewRow} key={q.id}><span>{t('questionCount', { number: i + 1, total: answers.length })} {flags.includes(i) ? '⚑' : ''}</span><span>{answers[i] ?? t('unanswered')}</span><button type="button" className={s.textButton} disabled={busy || locked} onClick={() => onRevisit(i)}>{t('revisit')}</button></div>)}</section><aside className={s.summary}><h2>{t('submitTitle')}</h2><p>{t('submitNote')}</p><Action onClick={onSubmit} disabled={busy}>{t(busy ? 'submitting' : 'submit')}</Action></aside></div></>
}
export function Break({ session, busy, onNext }: { session: SessionView; busy: boolean; onNext: () => void }) {
  const t = useTranslations('csca'), next = session.subjects[session.paper + 1], format = sessionPaper(session, session.paper + 1)
  return <div className={s.breakCard}><p className={s.eyebrow}>{t('paperNumber', { number: session.paper + 1, total: session.subjects.length })} ✓</p><h1>{t('breakTitle')}</h1><p>{t('breakNote')}</p><div className={s.card}><h2>{t(`subjects.${next}`)}</h2><p>{t('format', { questions: format.questionCount, minutes: (format.timeLimitSeconds ?? 0) / 60 })}</p><Action disabled={busy} onClick={onNext}>{t(busy ? 'preparing' : 'beginPaper')} →</Action></div></div>
}
