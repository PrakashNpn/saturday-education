'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { CONTACT_LINKS } from '@/shared/constants/social'

interface ConsultationInput {
  fullName: string
  email: string
  phone?: string
  targetCountry?: string
  consultationType?: string
  message?: string
}

interface Props {
  onSubmit: (data: ConsultationInput) => Promise<{ success: boolean; error?: string }>
}

const FIELD =
  'rounded-[4px] border border-stroke bg-surface-0 px-3.5 py-2 font-sans text-body font-light text-primary-text transition-colors placeholder:text-muted-text focus:border-action focus:bg-surface focus:ring-2 focus:ring-action/15 focus:outline-none'

const LABEL = 'flex flex-col gap-1.5 text-label font-medium text-primary-text'

// The design drops the consultation-type field, so it is no longer asked for.
// The server action still receives a value because the downstream notification
// and record both expect one.
const DEFAULT_CONSULTATION_TYPE = 'online'

const COUNTRY_VALUES = [
  'canada', 'newZealand', 'singapore', 'switzerland', 'ireland',
  'thailand', 'malaysia', 'germany', 'hungary', 'finland', 'china',
  'sweden', 'uae', 'japan', 'korea', 'uk', 'usa', 'australia',
] as const

function Chevron() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-text transition-colors peer-focus:text-action"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.5 3.8 7.2V22l3.5-1.9c.9.2 1.8.4 2.7.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

/** Shown in place of the form once the request is in. The design has no success
 *  state, so this keeps the existing structure and copy, restyled to the new
 *  tokens: a form that submits and shows nothing would be broken. */
function SuccessCard({ name, email }: { name: string; email: string }) {
  const t = useTranslations('Landing.consultation')

  const steps = [1, 2, 3].map((n) => ({
    title: t(`success.step${n}Title`),
    desc: t(`success.step${n}Desc`),
  }))

  return (
    <div className="flex flex-col gap-4 lg:p-8">
      <span className="grid size-12 place-items-center rounded-full bg-tint">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 text-action">
          <path
            d="M5 12.5 10 17l9-10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className="text-card font-medium">{t('success.title')}</h3>
      <p className="max-w-[52ch] text-body font-light text-secondary-text">
        {t('success.subtitle', { name, email })}
      </p>

      <ol className="mt-2 flex flex-col gap-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-structure text-min font-medium text-white">
              {index + 1}
            </span>
            <div>
              <p className="text-label font-medium text-primary-text">{step.title}</p>
              <p className="text-label font-normal text-muted-text">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-2 inline-flex min-h-10 cursor-pointer items-center justify-center self-start rounded-full border border-stroke-strong px-6 text-label font-medium text-primary-text transition-colors hover:bg-surface-0"
      >
        {t('success.backToTop')}
      </button>
    </div>
  )
}

export default function ConsultationSection({ onSubmit }: Props) {
  const t = useTranslations('Landing.consultation')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [targetCountry, setTargetCountry] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    if (!fullName.trim()) {
      setError(t('form.errorName'))
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('form.errorEmail'))
      return
    }

    setIsSubmitting(true)
    const response = await onSubmit({
      fullName,
      email,
      phone,
      targetCountry,
      consultationType: DEFAULT_CONSULTATION_TYPE,
      message,
    })
    setIsSubmitting(false)

    if (response.success) {
      setSubmittedName(fullName.trim())
      setSubmittedEmail(email.trim())
      setSubmitted(true)
      setFullName('')
      setEmail('')
      setPhone('')
      setTargetCountry('')
      setMessage('')
    } else {
      setError(response.error ?? t('form.submitError'))
    }
  }

  return (
    <section id="consultation" className="py-14 max-tablet:py-10">
      <div className="mx-auto max-w-wrap px-6">
        <div className="mb-10 text-center">
          <h2 className="text-title leading-[1.18] font-medium tracking-[-0.022em] whitespace-nowrap max-tablet:whitespace-normal">
            {t('heading')}
          </h2>
          <p className="mt-4 text-lede font-light leading-[1.55] whitespace-nowrap text-secondary-text max-tablet:whitespace-normal">
            {t('subtitle')}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:overflow-hidden lg:rounded-md lg:border lg:border-stroke lg:bg-surface">
          {/* Second in the DOM but first in the grid from lg up, so the photo
              sits right of the form on desktop and above it on a phone. */}
          <div className="relative mb-6 h-56 overflow-hidden rounded-md lg:order-2 lg:mb-0 lg:h-auto lg:min-h-full lg:rounded-none">
            <Image
              src="/images/landing/counsellor-desk.webp"
              alt={t('form.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-[80%_25%]"
            />
          </div>

          {submitted ? (
            <div className="lg:order-1">
              <SuccessCard name={submittedName} email={submittedEmail} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:order-1 lg:p-8">
              <h3 className="text-card font-medium">{t('formHeading')}</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className={LABEL}>
                  {t('form.fullName.label')}
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('form.fullName.placeholder')}
                    className={FIELD}
                  />
                </label>
                <label className={LABEL}>
                  {t('form.phone.label')}
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('form.phone.placeholder')}
                    className={FIELD}
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className={LABEL}>
                  {t('form.email.label')}
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('form.email.placeholder')}
                    className={FIELD}
                  />
                </label>
                <label className={LABEL}>
                  {t('form.country.label')}
                  <span className="relative block">
                    <select
                      name="country"
                      required
                      value={targetCountry}
                      onChange={(e) => setTargetCountry(e.target.value)}
                      className={`peer w-full appearance-none pr-10 ${FIELD}`}
                    >
                      <option value="" disabled>
                        {t('form.country.placeholder')}
                      </option>
                      {COUNTRY_VALUES.map((value) => (
                        <option key={value} value={value}>
                          {t(`form.country.options.${value}`)}
                        </option>
                      ))}
                    </select>
                    <Chevron />
                  </span>
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-label font-medium">
                {t('form.inquiry.label')}
                <textarea
                  name="message"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('form.inquiry.placeholder')}
                  className={`resize-y ${FIELD}`}
                />
              </label>

              {error && (
                <p role="alert" className="text-label font-medium text-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-16 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </button>

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label font-normal text-muted-text">
                {t('form.messagePrefix')}
                <a
                  href={CONTACT_LINKS.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-label font-medium text-action"
                >
                  <MessengerIcon />
                  <span className="underline underline-offset-[3px]">{t('form.messenger')}</span>
                </a>
                <a
                  href={CONTACT_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-label font-medium text-action"
                >
                  <WhatsAppIcon />
                  <span className="underline underline-offset-[3px]">{t('form.whatsapp')}</span>
                </a>
              </p>

              <p className="text-min text-muted-text">
                {t.rich('form.privacyNote', {
                  link: (chunks) => (
                    <Link href="/privacy" className="text-link underline underline-offset-2">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
