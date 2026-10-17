'use client'

import { useId, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Link } from '@/i18n/navigation'
import { CONTACT_LINKS } from '@/shared/constants/social'
import { PhoneCountrySelect } from '@/shared/components/common'
import { LEAD_COUNTRIES } from '../utils/leadCountries'

// Same rule as the website form: the site's own locale is the only signal for
// which country's dial code to pre-select before the visitor picks one.
const DEFAULT_PHONE_COUNTRY: Record<string, 'MM' | 'TH' | 'VN' | 'PH' | 'ID'> = {
  th: 'TH',
  vi: 'VN',
  fil: 'PH',
  id: 'ID',
}

const INPUT =
  'w-full rounded-xl border border-action/15 bg-white px-3 py-1.5 text-sm text-primary-text placeholder:text-muted-text transition-colors hover:border-action/30 focus:border-action/40 focus:ring-2 focus:ring-action/20 focus:outline-none'

const LABEL = 'flex flex-col gap-0.5 text-xs font-medium text-primary-text'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type ErrorKey = 'name' | 'email' | 'phone' | 'rate' | 'failed'

interface LeadCardProps {
  /** `card` is an offer inside a reply. `gate` is the required step that
   *  stands in for the input once the free questions are used up. */
  variant?: 'card' | 'gate'
  /** Country the chat already knows. Sent with the details without asking. */
  initialCountry?: string
  /** What the student asked, sent along so the counsellor has context. */
  said: string[]
  onSent: () => void
}

/** The lead form inside the chat: three required fields, validated before
 *  anything is sent, and the details never pass through the model. */
export default function LeadCard({ variant = 'card', initialCountry, said, onSent }: LeadCardProps) {
  const t = useTranslations('chatWidget.lead')
  const locale = useLocale()
  const id = useId()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string | undefined>('')
  const [hp, setHp] = useState('')
  const [error, setError] = useState<ErrorKey | null>(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return

    if (fullName.trim().length < 2) return setError('name')
    if (!EMAIL_RE.test(email.trim())) return setError('email')
    if (!phone || !isValidPhoneNumber(phone)) return setError('phone')

    setError(null)
    setSending(true)
    try {
      const res = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone,
          targetCountry: (LEAD_COUNTRIES as readonly string[]).includes(initialCountry ?? '')
            ? initialCountry
            : undefined,
          said,
          hp,
        }),
      })
      const body = (await res.json().catch(() => null)) as { success?: boolean; code?: ErrorKey } | null
      if (res.ok && body?.success) {
        onSent()
        return
      }
      setError(body?.code ?? 'failed')
    } catch {
      setError('failed')
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-2 flex flex-col gap-2.5 rounded-2xl border border-action/15 bg-white/85 p-3 shadow-[0_2px_16px_rgba(23,126,141,0.07)]"
    >
      <div>
        <p className="text-sm font-semibold text-primary-text">
          {variant === 'gate' ? t('gateTitle') : t('title')}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-text">
          {variant === 'gate' ? t('gateSubtitle') : t('subtitle')}
        </p>
      </div>

      <label className={LABEL} htmlFor={`${id}-name`}>
        {t('nameLabel')}
        <input
          id={`${id}-name`}
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={t('namePlaceholder')}
          className={INPUT}
        />
      </label>

      <label className={LABEL} htmlFor={`${id}-email`}>
        {t('emailLabel')}
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className={INPUT}
        />
      </label>

      <div className={LABEL}>
        <span>{t('phoneLabel')}</span>
        <PhoneInput
          international
          withCountryCallingCode
          defaultCountry={DEFAULT_PHONE_COUNTRY[locale] ?? 'MM'}
          countryCallingCodeEditable={false}
          countrySelectComponent={PhoneCountrySelect}
          value={phone}
          onChange={setPhone}
          placeholder={t('phonePlaceholder')}
          numberInputProps={{ className: INPUT, autoComplete: 'tel' }}
          className="phone-field"
        />
      </div>

      {/* Honeypot: off screen, out of the tab order, never filled by a person. */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {error && (
        <p role="alert" className="text-xs font-medium text-error">
          {t(`errors.${error}`)}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-action-hover to-action px-5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(23,126,141,0.3)] transition-all hover:shadow-[0_4px_16px_rgba(23,126,141,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? t('submitting') : t('submit')}
      </button>

      <p className="text-xs leading-relaxed text-muted-text">
        {t.rich('privacy', {
          link: (chunks) => (
            <Link href="/privacy" target="_blank" className="text-link underline underline-offset-2">
              {chunks}
            </Link>
          ),
        })}
      </p>

      <div className="text-xs text-muted-text">
        <span>
          {t('orMessage')}{' '}
          <a
            href={CONTACT_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-link underline underline-offset-2"
          >
            {t('whatsapp')}
          </a>
          {' · '}
          <a
            href={CONTACT_LINKS.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-link underline underline-offset-2"
          >
            {t('messenger')}
          </a>
        </span>
      </div>
    </form>
  )
}
