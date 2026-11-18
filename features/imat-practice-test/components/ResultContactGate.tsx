'use client'

import { useId, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, LoaderCircle, LockKeyhole } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { LANGUAGES, type LocaleCode } from '@/i18n/languages'
import { PracticeContactCard, PracticeContactFields } from '@/shared/components/practice-test/PracticeContactFields'
import { PracticeHeader, PracticeExitButton } from '@/shared/components/practice-test/PracticeHeader'
import ui from '@/shared/components/practice-test/practiceTest.module.css'
import { isValidPhone } from '@/shared/utils/phone'
import type { Attempt } from '../types'
import type { LeadError, LeadResponse } from '../services/leadSubmission'
import { PRIMARY_BUTTON } from './styles'

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
  const locale = useLocale() as LocaleCode, id = useId()
  const [fullName, setFullName] = useState(''), [email, setEmail] = useState(''), [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false), [hp, setHp] = useState('')
  const [busy, setBusy] = useState(false), [error, setError] = useState<LeadError | null>(null)
  return <section data-exam-active className={ui.workspace}>
    <PracticeHeader title="IMAT" context={t('complete')} actions={<PracticeExitButton label={t('back')} onClick={onHome} disabled={busy} />} />
    <div className={ui.content}>
    <PracticeContactCard title={t('title')} intro={t('intro')} complete={t('complete')}>
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
      }} className="space-y-4">
        <p className="text-min text-muted-text">{t('required')}</p>
        <PracticeContactFields labels={{ name: t('fullName'), email: t('email'), phone: t('phone') }} name={fullName} nameField="fullName" email={email} phone={phone || undefined} consent={consent} onName={setFullName} onEmail={setEmail} onPhone={value => setPhone(value ?? '')} onConsent={setConsent} disabled={busy} invalid={error ? [error] : []} phoneCountry={LANGUAGES[locale].phoneCountry} phoneHint={t('phoneHint')} consentText={<>{t('consent')} <Link href="/privacy" target="_blank" rel="noopener noreferrer">{t('privacy')}</Link></>} />
        <div className="hidden" aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={event => setHp(event.target.value)} /></div>
        {error && <p role="alert" className="rounded-lg border border-error/20 bg-error/5 p-3 text-label text-error">{t(`errors.${error}`)}</p>}
        <button type="submit" disabled={busy} className={`${PRIMARY_BUTTON} w-full`}>
          {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}{t(busy ? 'saving' : 'submit')}
        </button>
        <p className="flex items-start gap-2 text-min leading-relaxed text-muted-text"><LockKeyhole className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />{t('safe')}</p>
      </form>
    </PracticeContactCard></div>
  </section>
}
