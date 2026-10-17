'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkle, Check, Loader2, ShieldCheck } from 'lucide-react'
import { CustomDropdown } from '@/shared/components/common'
import { Link } from '@/i18n/navigation'
import { COUNTRY_KEYS } from '@/shared/constants/destinationCountries'
import type { ContactDetails } from '../types'
import { EDUCATION_KEYS } from '../utils/educationLevels'

interface Props {
  onSubmit: (contact: ContactDetails) => void
  serverError?: string | null
}


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldCls =
  'rounded-[4px] border border-stroke bg-surface-0 px-3 py-1.5 font-sans text-label font-normal text-primary-text placeholder:text-muted-text transition-colors focus:border-action focus:bg-surface focus:outline-none focus:ring-2 focus:ring-action/15'
const labelCls = 'flex flex-col gap-1 text-label font-medium text-primary-text'
// The dropdown trigger's own field variant defaults to bg-surface (white); the
// design has every control in the form on bg-surface-0, inputs included, so
// this brings the two into line.
const dropdownCls = '[&>button]:bg-surface-0'

export function ContactForm({ onSubmit, serverError }: Props) {
  const t = useTranslations('careerAssessment.contact')
  const tc = useTranslations('Landing.consultation.form.country.options')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [educationLevel, setEducationLevel] = useState('')
  const [preferredCountry, setPreferredCountry] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const educationOptions = EDUCATION_KEYS.map((value) => ({
    value,
    label: t(`educationOptions.${value}`),
  }))
  const countryOptions = [
    ...COUNTRY_KEYS.map((value) => ({ value, label: tc(value) })),
    { value: 'other', label: t('otherDestination') },
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    if (!fullName.trim() || !EMAIL_REGEX.test(email.trim())) {
      setError(t('requiredError'))
      return
    }
    if (!educationLevel || !preferredCountry) {
      setError(t('selectError'))
      return
    }
    setError(null)
    setSubmitting(true)
    onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      // Keys, not the dropdowns' translated text: the server turns them into English names.
      educationLevel,
      preferredCountry,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-2xl rounded-md border border-stroke bg-white p-6 text-center shadow-xs sm:p-7"
    >
      <div className="mx-auto mb-2.5 flex size-9 items-center justify-center rounded-full bg-action text-white shadow-2xs">
        <Sparkle size={20} />
      </div>
      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-dark-green/20 bg-dark-green/10 px-2.5 py-0.5 text-min font-medium text-dark-green">
        <Check size={14} strokeWidth={3} />
        {t('complete')}
      </span>
      <h2 className="mb-1 text-xl font-bold text-primary-text sm:text-2xl">{t('title')}</h2>
      <p className="mx-auto mb-5 max-w-lg text-min leading-relaxed text-secondary-text sm:text-label">
        {t('subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className={labelCls}>
            {t('fullName')}
            <input
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('fullNamePlaceholder')}
              className={fieldCls}
            />
          </label>

          <label className={labelCls}>
            {t('email')}
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className={fieldCls}
            />
          </label>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className={labelCls}>
            {t('phone')}
            <input
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('phonePlaceholder')}
              className={fieldCls}
            />
          </label>

          <CustomDropdown
            variant="field"
            size="compact"
            label={t('educationLevel')}
            value={educationLevel}
            options={educationOptions}
            onChange={setEducationLevel}
            placeholder={t('educationPlaceholder')}
            showPlaceholderOption={false}
            className={dropdownCls}
          />
        </div>

        <CustomDropdown
          variant="field"
          size="compact"
          label={t('preferredCountry')}
          value={preferredCountry}
          options={countryOptions}
          onChange={setPreferredCountry}
          placeholder={t('destinationPlaceholder')}
          showPlaceholderOption={false}
          className={dropdownCls}
        />

        {(error || serverError) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[4px] border border-red-200 bg-red-50 px-3 py-2 text-label font-medium text-red-600"
          >
            {error || serverError}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t('submitting')}
            </>
          ) : (
            <>
              <span>{t('submit')}</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-min text-muted-text">
          <ShieldCheck size={13} className="shrink-0 text-action" />
          <span>
            {t.rich('privacy', {
              link: (chunks) => (
                <Link href="/privacy" target="_blank" className="text-action hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </p>
      </form>
    </motion.div>
  )
}
