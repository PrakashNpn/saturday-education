'use client'

import { useId, useRef, useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { isValidPhone } from '@/shared/utils/phone'
import type { Attempt } from '../types'
import type { LeadError, LeadResponse } from '../services/leadSubmission'
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from './styles'

type Contact = { fullName: string; email: string; phone: string; consent: boolean; locale: string; hp: string; attempt: Attempt }
async function saveContact(contact: Contact): Promise<LeadResponse> {
  const response = await fetch('/api/imat/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contact), signal: AbortSignal.timeout(30_000) })
  const result = await response.json()
  if (response.ok && result.success === true) return { success: true }
  const codes: LeadError[] = ['name','email','phone','consent','attempt','rate','failed']
  return { success: false, code: codes.includes(result.code) ? result.code : 'failed' }
}

export default function ResultContactGate({ attempt, onSaved, onHome, submit = saveContact }: {
  attempt: Attempt; onSaved: () => void; onHome: () => void
  /** Injected only by isolated component tests; the application always uses the HTTP service. */
  submit?: (contact: Contact) => Promise<LeadResponse>
}) {
  const t = useTranslations('imat.contactGate')
  const locale = useLocale(), id = useId()
  const heading = useRef<HTMLHeadingElement>(null)
  const [fullName, setFullName] = useState(''), [email, setEmail] = useState(''), [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false), [hp, setHp] = useState('')
  const [busy, setBusy] = useState(false), [error, setError] = useState<LeadError | null>(null)
  useEffect(() => { heading.current?.focus() }, [])
  const fieldClass = 'mt-2 min-h-12 w-full rounded-lg border border-stroke-strong bg-surface px-3 text-body text-primary-text outline-none focus:border-action focus:ring-2 focus:ring-action/20 disabled:opacity-60'
  return <section className="mx-auto max-w-wrap px-5 py-6 sm:px-6 sm:py-8">
    <button type="button" disabled={busy} onClick={onHome} className={SECONDARY_BUTTON}><ArrowLeft className="size-4" aria-hidden="true" />{t('back')}</button>
    <div className="mx-auto mt-5 max-w-4xl overflow-hidden rounded-2xl border border-stroke bg-surface shadow-card sm:grid sm:grid-cols-[0.85fr_1.15fr]">
      <div className="border-b border-stroke bg-tint p-6 sm:border-b-0 sm:border-r sm:p-8">
        <CheckCircle2 className="mb-4 size-9 text-action" aria-hidden="true" />
        <p className="text-min font-semibold uppercase tracking-wider text-action">{t('complete')}</p>
        <h1 ref={heading} tabIndex={-1} className="mt-2 text-section font-semibold text-primary-text outline-none">{t('title')}</h1>
        <p className="mt-3 text-label leading-relaxed text-secondary-text">{t('intro')}</p>
      </div>
      <form aria-busy={busy} onSubmit={async event => {
        event.preventDefault()
        if (busy) return
        setBusy(true); setError(null)
        try {
          if (!fullName.trim() || fullName.trim().length < 2) { setError('name'); return }
          if (!await isValidPhone(phone.trim())) { setError('phone'); return }
          const result = await submit({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), consent, locale, hp, attempt })
          if (result.success) onSaved()
          else setError(result.code)
        } catch { setError('failed') }
        finally { setBusy(false) }
      }} className="space-y-4 p-6">
        <p className="text-min text-muted-text">{t('required')}</p>
        {(['fullName','email','phone'] as const).map(field => <label key={field} htmlFor={`${id}-${field}`} className="block text-label font-medium text-primary-text">
          {t(field)}
          <input id={`${id}-${field}`} name={field} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} autoComplete={field === 'fullName' ? 'name' : field === 'phone' ? 'tel' : 'email'}
            required minLength={field === 'fullName' ? 2 : undefined} maxLength={field === 'fullName' ? 120 : field === 'phone' ? 40 : 254}
            value={field === 'fullName' ? fullName : field === 'email' ? email : phone} onChange={event => (field === 'fullName' ? setFullName : field === 'email' ? setEmail : setPhone)(event.target.value)}
            disabled={busy} aria-invalid={error === (field === 'fullName' ? 'name' : field)} aria-describedby={field === 'phone' ? `${id}-phone-help` : undefined}
            placeholder={field === 'phone' ? '+95 9 123 456 789' : undefined} className={fieldClass} />
        </label>)}
        <p id={`${id}-phone-help`} className="-mt-3 text-min text-muted-text">{t('phoneHint')}</p>
        <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={event => setHp(event.target.value)} /></label></div>
        <label className="flex cursor-pointer items-start gap-3 text-min leading-relaxed text-secondary-text">
          <input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required disabled={busy} className="mt-0.5 size-4 shrink-0 accent-action" />{t('consent')}
        </label>
        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="inline-block text-min font-medium text-action underline underline-offset-4">{t('privacy')}</Link>
        {error && <p role="alert" className="rounded-lg border border-error/20 bg-error/5 p-3 text-label text-error">{t(`errors.${error}`)}</p>}
        <button type="submit" disabled={busy} className={`${PRIMARY_BUTTON} w-full`}>
          {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}{t(busy ? 'saving' : 'submit')}
        </button>
        <p className="flex items-start gap-2 text-min leading-relaxed text-muted-text"><LockKeyhole className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />{t('safe')}</p>
      </form>
    </div>
  </section>
}
