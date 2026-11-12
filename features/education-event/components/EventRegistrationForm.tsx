'use client'

import { useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { LazyPhoneField } from '@/shared/components/common/LazyPhoneField'
import { CustomDropdown, type DropdownOption } from '@/shared/components/common/CustomDropdown'
import { isValidPhone } from '@/shared/utils/phone'
import { CANADA_EVENT } from '../config'
import type { RegistrationError, RegistrationResult } from '../services/registration'

const INPUT = 'min-h-11 w-full rounded-xl border border-stroke-strong/75 bg-canvas/60 px-3 py-2 text-body leading-6 text-primary-text outline-none transition-colors placeholder:text-muted-text hover:border-action/40 focus:border-action focus:bg-surface focus:ring-2 focus:ring-action/15'
const BUTTON = 'inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-action px-5 py-2.5 text-label font-semibold text-white transition-colors hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action disabled:cursor-wait disabled:opacity-60'

export function EventRegistrationForm({ destinationOptions }: { destinationOptions: DropdownOption[] }) {
  const t = useTranslations('educationEvent')
  const locale = useLocale()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string | undefined>('')
  const [destination, setDestination] = useState<string>(CANADA_EVENT.destination)
  const [hp, setHp] = useState('')
  const [sending, setSending] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<RegistrationError | null>(null)
  const inFlight = useRef(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (inFlight.current) return
    inFlight.current = true
    setError(null)
    try {
      if (fullName.trim().length < 2 || fullName.trim().length > 120) return setError('name')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('email')
      if (!await isValidPhone(phone)) return setError('phone')
      setSending(true)
      const response = await fetch('/api/events/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), phone, destination, consent: true, noticeVersion: CANADA_EVENT.consentVersion, locale, hp }),
        signal: AbortSignal.timeout(20_000),
      })
      const result: RegistrationResult | null = await response.json().catch(() => null)
      if (!response.ok || !result?.success) {
        setError(result && !result.success ? result.code : 'failed')
        return
      }
      setSaved(true)
      setFullName(''); setEmail(''); setPhone('')
    } catch { setError('failed') }
    finally { inFlight.current = false; setSending(false) }
  }

  if (saved) return <section role="status" aria-live="polite" className="rounded-3xl border border-action/20 bg-surface p-7 text-center shadow-card sm:p-9">
    <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-tint text-action"><Check size={30} aria-hidden="true" /></span>
    <h2 className="text-section font-semibold text-primary-text">{t('successTitle')}</h2>
    <p className="mt-3 text-body text-secondary-text">{t('successBody')}</p>
    <p className="my-6 rounded-xl bg-tint p-4 text-label text-deep">{t('showConfirmation')}</p>
    <Link href="/" className={BUTTON}>{t('home')}<ArrowRight size={17} aria-hidden="true" /></Link>
  </section>

  return <section className="relative rounded-3xl border border-action/15 bg-surface p-5 shadow-[0_20px_60px_-35px_rgba(0,51,58,0.35)] sm:p-6" aria-labelledby="event-registration-title">
    <div aria-hidden="true" className="absolute inset-x-8 top-0 h-0.5 rounded-b-full bg-gradient-to-r from-action/10 via-action to-action/10" />
    <div className="border-b border-stroke pb-3">
      <p className="mb-1 hidden text-min font-semibold uppercase tracking-[0.12em] text-action sm:block">{t('formEyebrow')}</p>
      <h2 id="event-registration-title" className="text-card font-semibold text-deep">{t('formTitle')}</h2>
      <p className="mt-1.5 hidden text-label text-secondary-text sm:block">{t('formIntro')}</p>
    </div>
    <form onSubmit={submit} noValidate className="mt-4 space-y-3" aria-busy={sending}>
      <fieldset disabled={sending} className="space-y-3 disabled:opacity-70">
        <label className="block text-label font-medium text-primary-text" htmlFor="event-name">{t('name')}<span aria-hidden="true" className="ml-1 text-action">*</span>
          <input id="event-name" name="fullName" required autoComplete="name" maxLength={120} value={fullName} onChange={event => setFullName(event.target.value)} className={`${INPUT} mt-1.5`} />
        </label>
        <label className="block text-label font-medium text-primary-text" htmlFor="event-email">{t('email')}<span aria-hidden="true" className="ml-1 text-action">*</span>
          <input id="event-email" name="email" type="email" required autoComplete="email" maxLength={254} value={email} onChange={event => setEmail(event.target.value)} className={`${INPUT} mt-1.5`} />
        </label>
        <div role="group" aria-label={t('phone')}>
          <p className="mb-1.5 text-label font-medium text-primary-text">{t('phone')}<span aria-hidden="true" className="ml-1 text-action">*</span></p>
          <LazyPhoneField defaultCountry="MM" value={phone} onChange={setPhone} placeholder={t('phonePlaceholder')} inputClassName={INPUT} autoComplete="tel" />
        </div>
        <CustomDropdown label={t('destinationLabel')} value={destination} options={destinationOptions} onChange={setDestination} showPlaceholderOption={false} variant="rounded-field" required />
      </fieldset>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <input name="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={event => setHp(event.target.value)} />
      </div>
      {error && <p role="alert" className="rounded-xl bg-error/5 px-4 py-3 text-label text-error">{t(`errors.${error}`)}</p>}
      <p className="text-min leading-relaxed text-muted-text">{t.rich('consent', { link: chunks => <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-action underline underline-offset-2">{chunks}</Link> })}</p>
      <button type="submit" disabled={sending} className={BUTTON}>{sending ? <><LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />{t('submitting')}</> : <>{t('submit')}<ArrowRight size={18} aria-hidden="true" /></>}</button>
    </form>
  </section>
}
