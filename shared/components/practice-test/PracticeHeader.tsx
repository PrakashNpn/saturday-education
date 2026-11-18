import Image from 'next/image'
import type { ReactNode } from 'react'
import { PracticeButton } from './PracticeButton'
import s from './practiceTest.module.css'

export function PracticeBrand() {
  return <Image src="/images/logo/logo.webp" alt="Saturday Education" width={140} height={51} className={s.logo} />
}

export function PracticeHeader({ title, context, timer, actions }: {
  title?: string; context?: string; timer?: { label: string; value: string; urgent: boolean }; actions: ReactNode
}) {
  return <header className={s.header}><div className={s.headerInner}><div className={s.brandGroup}><PracticeBrand />{title && <div className={s.context}><strong>{title}</strong>{context && <small>{context}</small>}</div>}</div><div className={s.headerTools}>{timer && <div className={`${s.clock} ${timer.urgent ? s.urgent : ''}`}><small>{timer.label}</small><strong role="timer" aria-label={timer.label} aria-live="off">{timer.value}</strong></div>}{actions}</div></div></header>
}

export function PracticeExitButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return <PracticeButton secondary onClick={onClick} disabled={disabled}>{label} <span aria-hidden="true">×</span></PracticeButton>
}
