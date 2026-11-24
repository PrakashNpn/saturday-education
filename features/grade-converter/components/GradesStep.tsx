'use client'

import { ArrowRight, Info, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CustomDropdown } from '@/shared/components/common'
import {
  QUALIFICATION_LEVELS,
  SCALE_DEFINITIONS,
  SCALE_TYPES,
  type QualificationLevel,
  type ScaleType,
} from '../data/estimate-model'
import type { Selection } from './types'
import styles from './grade-converter.module.css'

type Option = { value: string; label: string }

type Props = {
  formId: string
  selection: Selection
  countryOptions: Option[]
  error: string
  onChange: <K extends keyof Selection>(field: K, value: Selection[K]) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function GradesStep({ formId, selection, countryOptions, error, onChange, onSubmit }: Props) {
  const t = useTranslations('gradeConverter')
  const scaleDefinition = selection.scale ? SCALE_DEFINITIONS[selection.scale] : null
  const scorePlaceholder = selection.scale === 'gpa4'
    ? '0 - 4.0'
    : selection.scale === 'gpa5'
      ? '0 - 5.0'
      : selection.scale === 'percent100'
        ? '0 - 100'
        : '...'
  const scoreSuffix = selection.scale === 'gpa4'
    ? '/ 4.0'
    : selection.scale === 'gpa5'
      ? '/ 5.0'
      : selection.scale === 'percent100'
        ? '%'
        : scaleDefinition
          ? `/ ${scaleDefinition.max}`
          : null

  return (
    <form onSubmit={onSubmit} noValidate className={styles.formCard}>
      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <CustomDropdown
            variant="rounded-field"
            label={t('country')}
            value={selection.origin}
            options={countryOptions}
            onChange={value => onChange('origin', value)}
            placeholder={t('chooseCountry')}
            required
          />
        </div>
        <div className={styles.field}>
          <CustomDropdown
            variant="rounded-field"
            label={t('qualificationLevel')}
            value={selection.level}
            options={QUALIFICATION_LEVELS.map(value => ({ value, label: t(`qualificationLevels.${value}`) }))}
            onChange={value => onChange('level', value as QualificationLevel)}
            placeholder={t('chooseLevel')}
            required
          />
        </div>
        <div className={styles.field}>
          <CustomDropdown
            variant="rounded-field"
            label={t('scale')}
            value={selection.scale}
            options={SCALE_TYPES.map(value => ({ value, label: t(`scaleTypes.${value}`) }))}
            onChange={value => onChange('scale', value as ScaleType)}
            placeholder={t('chooseScale')}
            required
          />
        </div>
        <div className={styles.scoreField}>
          <label htmlFor={`${formId}-score`}>{t('score')}</label>
          <div className={styles.scoreInput} data-invalid={!!error}>
            <input
              id={`${formId}-score`}
              inputMode="decimal"
              autoComplete="off"
              value={selection.score}
              onChange={event => onChange('score', event.target.value)}
              placeholder={scorePlaceholder}
              maxLength={12}
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={`${formId}-score-hint${error ? ` ${formId}-error` : ''}`}
              disabled={!selection.scale}
            />
            {scoreSuffix && <span>{scoreSuffix}</span>}
          </div>
          <p id={`${formId}-score-hint`} className={styles.hint}>{t('scoreHint')}</p>
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
        <span />
        <button type="submit" className={styles.primaryButton}>
          {t('continue')}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
