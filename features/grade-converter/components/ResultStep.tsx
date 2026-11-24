'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, Info, RotateCcw, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { EstimateOutcome, InstantConversion } from '../services/estimate'
import type { Selection } from './types'
import styles from './grade-converter.module.css'

type Props = {
  selection: Selection
  originCode: string
  targetCode: string
  estimate: EstimateOutcome | null
  instant: InstantConversion | null
  onBack: () => void
  onEditGrades: () => void
  onContinue: () => void
}

export function ResultStep({
  selection,
  originCode,
  targetCode,
  estimate,
  instant,
  onBack,
  onEditGrades,
  onContinue,
}: Props) {
  const t = useTranslations('gradeConverter')

  function bandLabel(bandId: string) {
    return t(`bands.${bandId}` as 'bands.first')
  }

  const formulaNote = instant
    ? instant.formula === 'gpa4'
      ? t('instantFormulaGpa4')
      : instant.formula === 'gpa5'
        ? t('instantFormulaGpa5')
        : t('instantFormulaPercent')
    : null

  return (
    <div className={styles.results}>
      <div className={styles.selectionSummary}>
        <span>
          <Image src={`/images/flags-svg/${originCode}.svg`} alt="" width={24} height={16} unoptimized />
          {selection.origin && t(`countries.${selection.origin}`)}
        </span>
        <span className={styles.summaryTo} aria-hidden="true">{t('summaryTo')}</span>
        <span>
          <Image src={`/images/flags-svg/${targetCode}.svg`} alt="" width={24} height={16} unoptimized />
          {selection.target && t(`countries.${selection.target}`)}
        </span>
        <button type="button" className={styles.summaryEdit} onClick={onEditGrades} aria-label={t('back')}>
          <RotateCcw size={14} aria-hidden="true" />
        </button>
      </div>

      {estimate?.ok ? (
        <div className={styles.resultCard}>
          <div className={styles.resultCompare}>
            <div>
              <p className={styles.resultLayerEyebrow}>{t('submittedGrade')}</p>
              <p className={styles.resultLayerValue}>{estimate.submittedLabel}</p>
              <p className={styles.resultLayerMeta}>{estimate.sourceBandLabel}</p>
            </div>
            <span className={styles.resultDivider} aria-hidden="true">≈</span>
            <div>
              <p className={styles.resultLayerEyebrow}>{t('gradeEquivalent')}</p>
              <p className={styles.resultLayerValue}>{estimate.displayValue}</p>
              <p className={styles.resultLayerMeta}>
                {estimate.detailLabel ?? bandLabel(estimate.bandId)}
                {' · '}
                {estimate.destinationScaleLabel}
              </p>
            </div>
          </div>

          {instant && (
            <div className={styles.instantPanel}>
              <p className={styles.instantTitle}>{t('instantTitle')}</p>
              <div className={styles.instantGrid}>
                {selection.scale !== 'percent100' && (
                  <div className={styles.instantTile}>
                    <span>{t('instantPercent')}</span>
                    <strong>~{instant.percent}%</strong>
                  </div>
                )}
                {selection.scale !== 'gpa4' && (
                  <div className={styles.instantTile}>
                    <span>{t('instantGpa4')}</span>
                    <strong>~{instant.gpa4.toFixed(2)} / 4.0</strong>
                  </div>
                )}
                {selection.scale !== 'gpa5' && (
                  <div className={styles.instantTile}>
                    <span>{t('instantGpa5')}</span>
                    <strong>~{instant.gpa5.toFixed(2)} / 5.0</strong>
                  </div>
                )}
              </div>
              {formulaNote && <p className={styles.resultLayerHint}>{formulaNote}</p>}
            </div>
          )}

          <p className={styles.resultExplanation}>
            {t('estimateExplanation', {
              origin: t(`countries.${selection.origin}`),
              target: t(`countries.${selection.target}`),
              qualification: selection.level ? t(`qualificationLevels.${selection.level}`) : '',
              level: selection.studyLevel ? t(`levels.${selection.studyLevel}`) : '',
            })}
          </p>
        </div>
      ) : (
        <div className={styles.reviewResult}>
          <span className={styles.reviewIcon}><Info size={30} strokeWidth={1.4} aria-hidden="true" /></span>
          <h2>{t('estimateFailedTitle')}</h2>
          <p>{t('estimateFailedDescription')}</p>
          <button type="button" className={styles.ghostButton} onClick={onEditGrades}>
            {t('back')}
          </button>
        </div>
      )}

      <p className={styles.condition}><Info size={17} aria-hidden="true" />{t('estimateCondition')}</p>
      <p className={styles.estimateNotice}><ShieldCheck size={16} aria-hidden="true" />{t('estimateNotice')}</p>

      <div className={styles.formFooter}>
        <button type="button" className={styles.back} onClick={onBack}>
          <ArrowLeft size={15} aria-hidden="true" />
          {t('back')}
        </button>
        <button type="button" className={styles.primaryButton} onClick={onContinue}>
          {t('optionalContact')}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
