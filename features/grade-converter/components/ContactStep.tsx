'use client'

import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { languageOf } from '@/i18n/languages'
import { COUNTRY_KEYS, OTHER_COUNTRY } from '@/shared/constants/destinationCountries'
import { CustomDropdown, LazyPhoneField } from '@/shared/components/common'
import styles from './grade-converter.module.css'

const LEAD_COUNTRY_VALUES = [...COUNTRY_KEYS, OTHER_COUNTRY]

type Props = {
  done: boolean
  fullName: string
  email: string
  phone: string | undefined
  leadCountry: string
  notes: string
  error: string
  isSubmitting: boolean
  onFullName: (value: string) => void
  onEmail: (value: string) => void
  onPhone: (value: string | undefined) => void
  onLeadCountry: (value: string) => void
  onNotes: (value: string) => void
  onBack: () => void
  onReset: () => void
  onViewResult: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function ContactStep({
  done,
  fullName,
  email,
  phone,
  leadCountry,
  notes,
  error,
  isSubmitting,
  onFullName,
  onEmail,
  onPhone,
  onLeadCountry,
  onNotes,
  onBack,
  onReset,
  onViewResult,
  onSubmit,
}: Props) {
  const t = useTranslations('gradeConverter')
  const tCountry = useTranslations('Landing.consultation.form.country.options')
  const locale = useLocale()

  if (done) {
    return (
      <div className={styles.contactComplete} role="status">
        <span><Check size={34} aria-hidden="true" /></span>
        <h2>{t('contactDone')}</h2>
        <p>{t('contactDoneDescription')}</p>
        <button type="button" className={styles.primaryButton} onClick={onViewResult}>{t('stepResult')}</button>
        <button type="button" className={styles.back} onClick={onReset}>{t('startAgain')}</button>
      </div>
    )
  }

  return (
    <form className={styles.contactForm} onSubmit={onSubmit}>
      <div className={styles.fieldGrid}>
        <label>
          {t('name')}
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            value={fullName}
            onChange={event => onFullName(event.target.value)}
            placeholder={t('namePlaceholder')}
          />
        </label>
        <label>
          {t('phone')}
          <LazyPhoneField
            defaultCountry={languageOf(locale).phoneCountry}
            value={phone}
            onChange={onPhone}
            placeholder={t('phonePlaceholder')}
            inputClassName={styles.phoneInput}
          />
        </label>
        <label>
          {t('email')}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={email}
            onChange={event => onEmail(event.target.value)}
            placeholder={t('emailPlaceholder')}
          />
        </label>
        <CustomDropdown
          variant="rounded-field"
          label={t('leadTargetCountry')}
          value={leadCountry}
          options={LEAD_COUNTRY_VALUES.map(value => ({
            value,
            label: tCountry(value as 'uk'),
          }))}
          onChange={onLeadCountry}
          placeholder={t('chooseCountry')}
          required
        />
      </div>
      <label className={styles.notesField}>
        {t('notes')} <span>({t('optional')})</span>
        <textarea
          name="notes"
          rows={3}
          maxLength={1000}
          value={notes}
          onChange={event => onNotes(event.target.value)}
          placeholder={t('notesPlaceholder')}
        />
      </label>
      {error && <p className={styles.formError} role="alert">{error}</p>}
      <p className={styles.privacyNote}>
        {t.rich('privacyNote', {
          link: chunks => <Link href="/privacy">{chunks}</Link>,
        })}
      </p>
      <div className={styles.formFooter}>
        <button type="button" className={styles.back} onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft size={15} aria-hidden="true" />
          {t('back')}
        </button>
        <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submitLead')}
          {!isSubmitting && <ArrowRight size={16} aria-hidden="true" />}
        </button>
      </div>
    </form>
  )
}
