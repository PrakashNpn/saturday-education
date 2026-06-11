'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CheckCircle2, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { CustomDropdown } from '@/shared/components/common'
import type { ContactDetails } from '../types'

interface Props {
  onSubmit: (contact: ContactDetails) => void
  serverError?: string | null
}

const inputCls =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/30'
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500'
const dropdownCls =
  '[&>button]:bg-gray-50 [&>button]:border-gray-200 [&>button]:rounded-xl [&>button]:py-2.5 [&>button]:font-normal [&>button]:text-sm'

const COUNTRY_KEYS = [
  'canada', 'newZealand', 'singapore', 'switzerland', 'ireland', 'thailand',
  'malaysia', 'germany', 'hungary', 'finland', 'china', 'sweden', 'uae',
  'japan', 'korea', 'uk', 'usa', 'australia',
]
const EDUCATION_KEYS = ['highSchool', 'foundation', 'undergraduate', 'graduate', 'other']

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  function labelOf(opts: { value: string; label: string }[], v: string) {
    return opts.find((o) => o.value === v)?.label
  }

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
      educationLevel: labelOf(educationOptions, educationLevel),
      preferredCountry: labelOf(countryOptions, preferredCountry),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="rounded-3xl border border-gray-100 bg-white/95 px-6 py-5 shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)] backdrop-blur-sm sm:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
            <CheckCircle2 size={13} />
            {t('complete')}
          </span>
          <h2 className="mt-2.5 text-2xl font-bold text-neutral-900">{t('title')}</h2>
          <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-gray-500">{t('subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <label className={labelCls}>{t('fullName')}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('fullNamePlaceholder')}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>{t('phone')}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('phonePlaceholder')}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>{t('educationLevel')}</label>
            <CustomDropdown
              value={educationLevel}
              options={educationOptions}
              onChange={setEducationLevel}
              placeholder={t('educationPlaceholder')}
              showPlaceholderOption={false}
              className={dropdownCls}
            />
          </div>

          <div>
            <label className={labelCls}>{t('preferredCountry')}</label>
            <CustomDropdown
              value={preferredCountry}
              options={countryOptions}
              onChange={setPreferredCountry}
              placeholder={t('destinationPlaceholder')}
              showPlaceholderOption={false}
              className={dropdownCls}
            />
          </div>

          {(error || serverError) && (
            <p className="text-sm font-medium text-red-500">{error || serverError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-purple px-8 py-3 font-semibold text-white shadow-md shadow-brand-purple/25 transition-all duration-200 hover:bg-brand-purple-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t('submitting')}
              </>
            ) : (
              <>
                {t('submit')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-400">
            <ShieldCheck size={13} className="text-brand-purple" />
            {t('privacy')}
          </p>
        </form>
      </div>
    </motion.div>
  )
}
