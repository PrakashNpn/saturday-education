'use client'
import { useTranslations } from 'next-intl'
import type { SessionView } from '../types'
import { PracticeDialog } from '@/shared/components/practice-test/PracticeDialog'
import { Action } from './Screens'
import s from './practice.module.css'
import { PracticeHeader, PracticeExitButton } from '@/shared/components/practice-test/PracticeHeader'

export function TestHeader({ session, remaining, onBreak, busy, onExit }: { session: SessionView; remaining: number | null; onBreak: boolean; busy: boolean; onExit: () => void }) {
  const t = useTranslations('csca'), clock = remaining === null ? '' : `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
  return <PracticeHeader title={t('title')} context={session.subjects.length > 1 ? t('paperNumber', { number: session.paper + 1, total: session.subjects.length }) : t('design.focusedSession')} timer={{ label: t(onBreak ? 'onBreak' : 'timeRemaining'), value: onBreak ? '—' : clock, urgent: remaining !== null && remaining <= 120 }} actions={<PracticeExitButton label={t('exit')} onClick={onExit} disabled={busy} />} />
}
export function ExitTestDialog({ timed, onKeep, onExit }: { timed: boolean; onKeep: () => void; onExit: () => void }) {
  const t = useTranslations('csca')
  return <PracticeDialog id="csca-exit" onClose={onKeep}><h2 id="csca-exit">{t('exitTitle')}</h2><p>{t('exitNote')}</p>{timed && <p className={s.muted}>{t('rules.timer')}</p>}<div className={s.dialogActions}><Action onClick={onKeep} autoFocus>{t('keep')}</Action><Action secondary onClick={onExit}>{t('exitReset')}</Action></div></PracticeDialog>
}
