'use client'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import type { Question } from '../types'
import s from './practice.module.css'

export function QuestionDiagram({ question, timed = false }: { question: Question; timed?: boolean }) {
  const t = useTranslations('csca'), dialog = useRef<HTMLDialogElement>(null)
  if (!question.image) return null
  return <figure className={s.questionFigure}><button type="button" className={s.diagramTrigger} onClick={() => dialog.current?.showModal()} aria-label={t('enlarge')}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={question.image} alt={question.imageAlt || t('diagram')} /><span>{t('enlarge')} ↗</span></button>
    <dialog ref={dialog} className={s.diagramDialog} aria-label={t('diagram')}><header className={s.between}><h2>{t('diagram')}</h2><button type="button" aria-label={t('close')} onClick={() => dialog.current?.close()}>×</button></header>{timed && <p>{t('rules.timer')}</p>}<div className={s.diagramViewport} tabIndex={0}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={question.image} alt={question.imageAlt || t('diagram')} />
    </div></dialog></figure>
}
