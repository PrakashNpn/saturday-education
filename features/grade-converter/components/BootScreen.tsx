'use client'

import { GraduationCap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import styles from './grade-converter.module.css'

type Props = {
  leaving: boolean
}

export function BootScreen({ leaving }: Props) {
  const t = useTranslations('gradeConverter')

  return (
    <div
      className={`${styles.bootScreen}${leaving ? ` ${styles.bootScreenLeaving}` : ''}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.bootMark} aria-hidden="true">
        <span className={styles.bootRing} />
        <span className={styles.bootGlow} />
        <GraduationCap size={34} strokeWidth={1.5} />
      </div>
      <p className={styles.bootTitle}>{t('toolBrand')}</p>
      <p className={styles.bootLabel}>{t('bootLoading')}</p>
    </div>
  )
}
