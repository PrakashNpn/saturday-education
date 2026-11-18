'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import s from './practiceTest.module.css'

export function PracticeDialog({ id, children, onClose, busy = false, className = '' }: {
  id: string; children: ReactNode; onClose?: () => void; busy?: boolean; className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previous = document.documentElement.style.overflow
    dialog.showModal()
    document.documentElement.style.overflow = 'hidden'
    return () => { dialog.close(); document.documentElement.style.overflow = previous; if (trigger?.isConnected) trigger.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={ref} className={`${s.dialog} ${className}`} aria-labelledby={id} aria-busy={busy} onCancel={event => { event.preventDefault(); if (!busy) onClose?.() }}>{children}</dialog>
}

export function InstructionColumns({ overview, children }: { overview: ReactNode; children: ReactNode }) {
  return <div className={s.instructionsBody}><section className={s.instructionsOverview}>{overview}</section><section className={s.instructionsRules}>{children}</section></div>
}
