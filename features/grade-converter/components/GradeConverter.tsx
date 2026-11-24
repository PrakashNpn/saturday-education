'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowLeft, Check, GraduationCap, RotateCcw } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { isCountryKey } from '@/shared/constants/destinationCountries'
import { isValidPhone } from '@/shared/utils/phone'
import { CONVERTER_COUNTRIES, TARGET_COUNTRIES, countryByKey } from '../data/countries'
import {
  SCALE_DEFINITIONS,
  defaultTargetStudyLevel,
  type QualificationLevel,
} from '../data/estimate-model'
import { estimateGrade, isValidScore } from '../services/estimate'
import { buildGradeLeadSummary } from '../services/leadSummary'
import { BootScreen } from './BootScreen'
import { ContactStep } from './ContactStep'
import { DestinationStep } from './DestinationStep'
import { GradesStep } from './GradesStep'
import { ResultStep } from './ResultStep'
import {
  EMPTY_SELECTION,
  STEP_KEYS,
  type GradeConverterLeadPayload,
  type Selection,
} from './types'
import styles from './grade-converter.module.css'

export type { GradeConverterLeadPayload } from './types'

type GradeConverterProps = {
  onSubmitLead: (data: GradeConverterLeadPayload) => Promise<{ success: boolean; error?: string }>
}

/** Expert-style estimate converter with real lead capture on step 4. */
export function GradeConverter({ onSubmitLead }: GradeConverterProps) {
  const t = useTranslations('gradeConverter')
  const locale = useLocale()
  const formId = useId()
  const [selection, setSelection] = useState<Selection>(EMPTY_SELECTION)
  const [step, setStep] = useState(0)
  const [furthestStep, setFurthestStep] = useState(0)
  const [error, setError] = useState('')
  const [contactDone, setContactDone] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string | undefined>('')
  const [leadCountry, setLeadCountry] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [booting, setBooting] = useState(true)
  const [bootLeaving, setBootLeaving] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const lastStep = useRef(0)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const holdMs = reduceMotion ? 200 : 1100
    const fadeMs = reduceMotion ? 0 : 380
    const leaveTimer = window.setTimeout(() => setBootLeaving(true), holdMs)
    const doneTimer = window.setTimeout(() => setBooting(false), holdMs + fadeMs)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  const originMeta = countryByKey(selection.origin)
  const targetMeta = countryByKey(selection.target)

  const countryOptions = CONVERTER_COUNTRIES
    .map(country => ({ value: country.key, label: t(`countries.${country.key}`) }))
    .sort((a, b) => a.label.localeCompare(b.label, locale))
  const targetOptions = TARGET_COUNTRIES
    .filter(country => country.key !== selection.origin)
    .map(country => ({ value: country.key, label: t(`countries.${country.key}`) }))
    .sort((a, b) => a.label.localeCompare(b.label, locale))

  const estimate = selection.scale && selection.target && selection.score
    ? estimateGrade({
        origin: selection.origin,
        target: selection.target,
        scale: selection.scale,
        score: selection.score,
      })
    : null

  useEffect(() => {
    if (lastStep.current === step) return
    lastStep.current = step
    headingRef.current?.focus({ preventScroll: true })
    panelRef.current?.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
    if (step === 3 && isCountryKey(selection.target)) {
      setLeadCountry(selection.target)
    }
  }, [step, selection.target])

  function change<K extends keyof Selection>(field: K, value: Selection[K]) {
    setSelection(current => {
      const next = { ...current, [field]: value }
      if (field === 'origin') {
        Object.assign(next, { scale: '', score: '' })
        if (next.target === value) next.target = ''
      }
      if (field === 'scale') next.score = ''
      if (field === 'level' && value) {
        next.studyLevel = defaultTargetStudyLevel(value as QualificationLevel)
      }
      return next
    })
    setError('')
    setContactDone(false)
    setFurthestStep(step)
  }

  function navigate(next: number) {
    setError('')
    setStep(next)
    setFurthestStep(current => Math.max(current, next))
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step === 0) {
      if (!selection.origin || !selection.level || !selection.scale) return setError(t('requiredFields'))
      if (!selection.score.trim()) return setError(t('scoreError'))
      if (!isValidScore(selection.scale, selection.score)) {
        const definition = SCALE_DEFINITIONS[selection.scale]
        return setError(t('rangeError', { max: definition.max }))
      }
      setSelection(current => ({
        ...current,
        studyLevel: current.level
          ? (current.studyLevel || defaultTargetStudyLevel(current.level))
          : current.studyLevel,
      }))
      navigate(1)
      return
    }

    if (!selection.target || !selection.studyLevel || !selection.subject) return setError(t('requiredFields'))
    navigate(2)
  }

  function reset() {
    setSelection({ ...EMPTY_SELECTION })
    setContactDone(false)
    setFurthestStep(0)
    setError('')
    setStep(0)
    setFullName('')
    setEmail('')
    setPhone('')
    setLeadCountry('')
    setNotes('')
    setIsSubmitting(false)
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!fullName.trim()) return setError(t('errorName'))
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError(t('errorEmail'))
    if (!(await isValidPhone(phone))) return setError(t('errorPhone'))
    if (!leadCountry) return setError(t('errorCountry'))
    if (!estimate?.ok) return setError(t('estimateFailedDescription'))

    setIsSubmitting(true)
    const response = await onSubmitLead({
      fullName,
      email,
      phone,
      targetCountry: leadCountry,
      message: notes,
      gradeSummary: buildGradeLeadSummary({
        originLabel: selection.origin ? t(`countries.${selection.origin}`) : '',
        targetLabel: selection.target ? t(`countries.${selection.target}`) : '',
        qualificationLabel: selection.level ? t(`qualificationLevels.${selection.level}`) : '',
        studyLevelLabel: selection.studyLevel ? t(`levels.${selection.studyLevel}`) : '',
        subjectLabel: selection.subject ? t(`subjects.${selection.subject}`) : '',
        scaleLabel: selection.scale ? t(`scaleTypes.${selection.scale}`) : '',
        submittedGrade: estimate.submittedLabel,
        sourceBandLabel: estimate.sourceBandLabel,
        estimateDisplay: estimate.displayValue,
        estimateDetail: estimate.detailLabel,
        destinationScaleLabel: estimate.destinationScaleLabel,
      }),
    })
    setIsSubmitting(false)

    if (response.success) {
      setContactDone(true)
      return
    }
    setError(response.error ?? t('submitError'))
  }

  const currentHeading = [
    t('gradeTitle'),
    t('destinationTitle'),
    t('resultTitle'),
    contactDone ? t('contactDone') : t('contactTitle'),
  ][step]
  const currentLede = [
    t('gradeDescription'),
    t('destinationDescription'),
    null,
    contactDone ? null : t('contactDescription'),
  ][step]

  return (
    <main className={styles.shell} data-grade-converter="" lang={locale}>
      {booting && <BootScreen leaving={bootLeaving} />}

      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbA} />
        <span className={styles.orbB} />
        <span className={styles.orbC} />
        <span className={styles.tileA} />
        <span className={styles.tileB} />
        <span className={styles.tileC} />
        <span className={styles.tileD} />
      </div>

      <header className={styles.topBar}>
        <Link href="/" className={styles.exit}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{t('exitHome')}</span>
        </Link>
        <div className={styles.brandBlock}>
          <GraduationCap size={18} strokeWidth={1.6} aria-hidden="true" />
          <span>{t('toolBrand')}</span>
        </div>
        <div className={styles.topActions}>
          {step > 0 && (
            <button type="button" className={styles.reset} onClick={reset}>
              <RotateCcw size={14} aria-hidden="true" />
              <span className={styles.resetLabel}>{t('startAgain')}</span>
            </button>
          )}
        </div>
      </header>

      <div className={styles.progressTrack} aria-hidden="true">
        <span style={{ width: `${((step + 1) / 4) * 100}%` }} />
      </div>

      <div className={styles.stepMeta}>
        <p>{t('stepCounter', { current: step + 1, total: 4 })}</p>
        <ol className={styles.stepDots} aria-label={t('metadataTitle')}>
          {STEP_KEYS.map((key, index) => (
            <li key={key}>
              <button
                type="button"
                disabled={index > furthestStep}
                data-active={step === index}
                data-complete={furthestStep > index}
                onClick={() => navigate(index)}
                aria-current={step === index ? 'step' : undefined}
                aria-label={t(key)}
              >
                {furthestStep > index ? <Check size={12} aria-hidden="true" /> : index + 1}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div ref={panelRef} className={styles.stage}>
        <div className={styles.stageInner} data-step={step}>
          <div className={styles.headingBlock}>
            <h1 ref={headingRef} tabIndex={-1}>{currentHeading}</h1>
            {currentLede && <p>{currentLede}</p>}
          </div>

          {step === 0 && (
            <GradesStep
              formId={formId}
              selection={selection}
              countryOptions={countryOptions}
              error={error}
              onChange={change}
              onSubmit={advance}
            />
          )}

          {step === 1 && (
            <DestinationStep
              formId={formId}
              selection={selection}
              targetOptions={targetOptions}
              error={error}
              onChange={change}
              onBack={() => navigate(0)}
              onSubmit={advance}
            />
          )}

          {step === 2 && (
            <ResultStep
              selection={selection}
              originCode={originMeta?.code ?? 'VN'}
              targetCode={targetMeta?.code ?? 'GB'}
              estimate={estimate}
              onBack={() => navigate(1)}
              onEditGrades={() => navigate(0)}
              onContinue={() => navigate(3)}
            />
          )}

          {step === 3 && (
            <ContactStep
              done={contactDone}
              fullName={fullName}
              email={email}
              phone={phone}
              leadCountry={leadCountry}
              notes={notes}
              error={error}
              isSubmitting={isSubmitting}
              onFullName={setFullName}
              onEmail={setEmail}
              onPhone={setPhone}
              onLeadCountry={setLeadCountry}
              onNotes={setNotes}
              onBack={() => navigate(2)}
              onReset={reset}
              onViewResult={() => navigate(2)}
              onSubmit={submitLead}
            />
          )}
        </div>
      </div>
    </main>
  )
}
