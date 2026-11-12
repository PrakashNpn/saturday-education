'use client'

import { useEffect, useId, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from './styles'

export function ConfirmDialog({ title, children, action, onConfirm, onClose, wide = false }: {
  title: string; children: React.ReactNode; action: string; onConfirm: () => void; onClose: () => void
  wide?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  const t = useTranslations('imat')
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])
  return (
    <dialog ref={ref} aria-labelledby={id} onCancel={onClose}
      className={`fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] ${wide ? 'max-w-3xl' : 'max-w-lg'} overflow-y-auto rounded-2xl bg-surface p-6 text-secondary-text shadow-card backdrop:bg-deep/60 sm:p-8`}>
      <h2 id={id} className="mb-4 text-section font-semibold text-primary-text">{title}</h2>
      <div className="space-y-4 text-label font-normal leading-relaxed">{children}</div>
      <div className="mt-7 flex flex-wrap justify-end gap-3">
        <button autoFocus type="button" onClick={onClose} className={SECONDARY_BUTTON}>{t('cancel')}</button>
        <button type="button" onClick={onConfirm} className={PRIMARY_BUTTON}>{action}</button>
      </div>
    </dialog>
  )
}
