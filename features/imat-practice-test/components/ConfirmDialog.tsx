'use client'

import { useId } from 'react'
import { useTranslations } from 'next-intl'
import { PracticeDialog } from '@/shared/components/practice-test/PracticeDialog'
import { PracticeButton } from '@/shared/components/practice-test/PracticeButton'
import ui from '@/shared/components/practice-test/practiceTest.module.css'

export function ConfirmDialog({ title, children, action, onConfirm, onClose, wide = false }: {
  title: string; children: React.ReactNode; action: string; onConfirm: () => void; onClose: () => void; wide?: boolean
}) {
  const id = useId(), t = useTranslations('imat')
  return <PracticeDialog id={id} onClose={onClose} className={wide ? ui.instructionsDialog : ''}>
    <h2 id={id} className={wide ? ui.instructionsHeading : ui.dialogTitle}>{title}</h2>
    <div className={wide ? ui.dialogContentScroll : ui.dialogContent}>{children}</div>
    <footer className={wide ? ui.dialogFooter : 'mt-6 flex justify-end gap-3'}><PracticeButton secondary onClick={onClose} autoFocus>{t('cancel')}</PracticeButton><PracticeButton onClick={onConfirm}>{action}</PracticeButton></footer>
  </PracticeDialog>
}
