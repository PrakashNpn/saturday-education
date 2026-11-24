'use client'

import { ArrowLeft, ArrowRight, Info, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CustomDropdown } from '@/shared/components/common'
import { STUDY_LEVELS, SUBJECTS, type StudyLevel, type SubjectArea } from '../data/estimate-model'
import type { Selection } from './types'
import styles from './grade-converter.module.css'

type Option = { value: string; label: string }

type Props = {
  formId: string
  selection: Selection
  targetOptions: Option[]
  error: string
  onChange: <K extends keyof Selection>(field: K, value: Selection[K]) => void
  onBack: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function DestinationStep({
  formId,
  selection,
  targetOptions,
  error,
  onChange,
  onBack,
  onSubmit,
}: Props) {
  const t = useTranslations('gradeConverter')

  return (
    <form onSubmit={onSubmit} noValidate className={styles.formCard}>
      <div className={styles.destinationStack}>
        <div className={styles.fieldGrid}>
          <CustomDropdown
            variant="rounded-field"
            label={t('targetCountry')}
            value={selection.target}
            options={targetOptions}
            onChange={value => onChange('target', value)}
            placeholder={t('chooseCountry')}
            required
          />
          <CustomDropdown
            variant="rounded-field"
            label={t('studyLevel')}
            value={selection.studyLevel}
            options={STUDY_LEVELS.map(value => ({ value, label: t(`levels.${value}`) }))}
            onChange={value => onChange('studyLevel', value as StudyLevel)}
            placeholder={t('chooseStudyLevel')}
            required
          />
          <div className={styles.fieldWide}>
            <CustomDropdown
              variant="rounded-field"
              label={t('subjectArea')}
              value={selection.subject}
              options={SUBJECTS.map(value => ({ value, label: t(`subjects.${value}`) }))}
              onChange={value => onChange('subject', value as SubjectArea)}
              placeholder={t('chooseSubject')}
              required
            />
          </div>
        </div>
      </div>

      {error && (
        <p id={`${formId}-error`} className={styles.error} role="alert">
          <Info size={16} aria-hidden="true" />
          {error}
        </p>
      )}

      <div className={styles.disclaimer}>
        <ShieldCheck size={16} aria-hidden="true" />
        <div>
          <strong>{t('disclaimerTitle')}</strong>
          <p>{t('estimateNotice')}</p>
        </div>
      </div>

      <div className={styles.formFooter}>
        <button type="button" className={styles.back} onClick={onBack}>
          <ArrowLeft size={15} aria-hidden="true" />
          {t('back')}
        </button>
        <button type="submit" className={styles.primaryButton}>
          {t('viewResult')}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
