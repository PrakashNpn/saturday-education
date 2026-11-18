'use client'
import { useTranslations } from 'next-intl'
import { paperTotals, PAPER_FORMATS } from '../config'
import type { SubjectId } from '../types'
import { PracticeDialog, InstructionColumns } from '@/shared/components/practice-test/PracticeDialog'
import ui from '@/shared/components/practice-test/practiceTest.module.css'
import { Action } from './Screens'
import s from './practice.module.css'

export function InstructionsModal({ subjects, busy, error, onClose, onBegin }: { subjects: SubjectId[]; busy: boolean; error: string | null; onClose: () => void; onBegin: () => void }) {
  const t = useTranslations('csca'), totals = paperTotals(subjects)
  return <PracticeDialog id="csca-instructions" busy={busy} onClose={onClose} className={ui.instructionsDialog}>
    <button type="button" className={ui.dialogClose} aria-label={t('close')} onClick={onClose} disabled={busy}>×</button>
    <InstructionColumns overview={<div className={s.instructionsOverviewContent}><p className={s.eyebrow}>{t('title')}</p><h3>{t(subjects.length > 1 ? 'design.onePaper' : 'design.readyPaper')}</h3>
        <div className={s.instructionsTotals}><div><strong>{totals.questions}</strong><span>{t('questions')}</span></div><div><strong>{totals.minutes}</strong><span>{t('design.testMinutes')}</span></div></div>
        <ol className={s.instructionsPapers}>{subjects.map((id, index) => <li key={id}><span>{index + 1}</span><div><strong>{t(`subjects.${id}`)}</strong><small>{t('format', PAPER_FORMATS[id])}</small></div></li>)}</ol>
        <p className={s.instructionsSaved}>{t('saveNote')}</p>
      </div>}>
      <div className={s.instructionsRulesContent}><h2 id="csca-instructions">{t('beforeStart')}</h2><p>{t('design.instructionsIntro')}</p>
        <ol>{['oneAnswer', 'timer', 'breaks', 'results'].map((key, index) => <li key={key}><span>{index + 1}</span><div><h3>{t(`design.ruleTitles.${key}`)}</h3><p>{t(`rules.${key}`)}</p></div></li>)}</ol>
        {error && <p role="alert" className={s.error}>{error}</p>}
      </div>
    </InstructionColumns>
    <footer className={ui.dialogFooter}><button type="button" className={s.instructionsBack} onClick={onClose} disabled={busy}>{t('backSetup')}</button><Action onClick={onBegin} disabled={busy}>{t(busy ? 'preparing' : 'start')} <span aria-hidden="true">↗</span></Action></footer>
  </PracticeDialog>
}
