'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Sparkles,
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import { CustomDropdown } from '@/shared/components/common'
import type { ContactDetails } from '../types'

interface Props {
  onSubmit: (contact: ContactDetails) => void
  serverError?: string | null
}

const inputCls =
  'peer w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all hover:border-gray-300 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-purple/15'
const labelCls = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-600'
const iconCls =
  'pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-brand-purple'
const dropdownIconCls = 'pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400'
const dropdownCls =
  '[&>button]:bg-gray-50/70 [&>button]:border-gray-200 [&>button]:rounded-xl [&>button]:py-3 [&>button]:pl-11 [&>button]:font-normal [&>button]:text-sm [&>button]:transition-all [&>button:hover]:border-gray-300'

const COUNTRY_KEYS = [
  'canada', 'newZealand', 'singapore', 'switzerland', 'ireland', 'thailand',
  'malaysia', 'germany', 'hungary', 'finland', 'china', 'sweden', 'uae',
  'japan', 'korea', 'uk', 'usa', 'australia',
]
const EDUCATION_KEYS = ['highSchool', 'foundation', 'undergraduate', 'graduate', 'other']

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

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
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_24px_70px_-20px_rgba(89,13,130,0.25)] ring-1 ring-gray-900/[0.04]">

        <div className="px-6 py-6 sm:px-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-light shadow-lg shadow-brand-purple/30">
              <Sparkles className="text-white" size={24} strokeWidth={2.2} />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700 ring-1 ring-green-100">
              <CheckCircle2 size={13} />
              {t('complete')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">{t('title')}</h2>
            <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-gray-500">{t('subtitle')}</p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-3.5"
          >
            <motion.div variants={item}>
              <label className={labelCls}>{t('fullName')}</label>
              <div className="relative">
                <input
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('fullNamePlaceholder')}
                  className={inputCls}
                />
                <User size={16} className={iconCls} />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className={labelCls}>{t('email')}</label>
              <div className="relative">
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className={inputCls}
                />
                <Mail size={16} className={iconCls} />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className={labelCls}>{t('phone')}</label>
              <div className="relative">
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                  className={inputCls}
                />
                <Phone size={16} className={iconCls} />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className={labelCls}>{t('educationLevel')}</label>
              <div className="relative">
                <GraduationCap size={16} className={dropdownIconCls} />
                <CustomDropdown
                  value={educationLevel}
                  options={educationOptions}
                  onChange={setEducationLevel}
                  placeholder={t('educationPlaceholder')}
                  showPlaceholderOption={false}
                  className={dropdownCls}
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className={labelCls}>{t('preferredCountry')}</label>
              <div className="relative">
                <MapPin size={16} className={dropdownIconCls} />
                <CustomDropdown
                  value={preferredCountry}
                  options={countryOptions}
                  onChange={setPreferredCountry}
                  placeholder={t('destinationPlaceholder')}
                  showPlaceholderOption={false}
                  className={dropdownCls}
                />
              </div>
            </motion.div>

            {(error || serverError) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
              >
                {error || serverError}
              </motion.p>
            )}

            <motion.div variants={item} className="pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-brand-purple/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-purple/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
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
            </motion.div>

            <motion.p
              variants={item}
              className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-gray-400"
            >
              <ShieldCheck size={13} className="text-brand-purple" />
              {t('privacy')}
            </motion.p>
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}
