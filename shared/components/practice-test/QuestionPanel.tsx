import type { ReactNode } from 'react'
import { Flag } from 'lucide-react'
import s from './practiceTest.module.css'

export function QuestionPanel({ label, flagLabel, flagged, disabled, onFlag, children, actions }: {
  label: string; flagLabel: string; flagged: boolean; disabled?: boolean; onFlag: () => void; children: ReactNode; actions: ReactNode
}) {
  return <section className={s.panel}><div className={s.between}><span className={s.badge}>{label}</span><button type="button" className={s.flag} disabled={disabled} aria-pressed={flagged} onClick={onFlag}><Flag aria-hidden="true" fill={flagged ? 'currentColor' : 'none'} />{flagLabel}</button></div>{children}<div className={s.questionActions}>{actions}</div></section>
}

export function QuestionOption({ name, value, letter, checked, disabled, onSelect, children }: {
  name: string; value: string; letter: string; checked: boolean; disabled?: boolean; onSelect: () => void; children: ReactNode
}) {
  return <label className={s.option}><input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onSelect} /><span className={s.optionLetter} aria-hidden="true">{letter}</span><span className={s.optionContent}>{children}</span></label>
}
