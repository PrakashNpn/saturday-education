'use client'
import { useState, type FormEvent } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PracticeContactCard, PracticeContactFields } from '@/shared/components/practice-test/PracticeContactFields'
import { LANGUAGES, type LocaleCode } from '@/i18n/languages'
import { contactInput, type ResultContact } from '../contact'
import { Action } from './Screens'
import s from './practice.module.css'

export function ResultContactGate({ busy, error, onSubmit, onExit }: { busy: boolean; error: string | null; onSubmit: (contact: ResultContact) => void; onExit: () => void }) {
  const t = useTranslations('csca'), locale = useLocale() as LocaleCode
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [phone, setPhone] = useState<string>(), [consent, setConsent] = useState(false)
  const [invalid, setInvalid] = useState<string[]>([]), [validating, setValidating] = useState(false)
  const disabled = busy || validating
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled) return
    const form = event.currentTarget
    setValidating(true)
    try {
      const parsed = await contactInput.safeParseAsync({ name, email, phone: phone ?? '', consent })
      if (!parsed.success) {
        const fields = parsed.error.issues.map(issue => String(issue.path[0])); setInvalid(fields)
        form.querySelector<HTMLElement>(fields[0] === 'phone' ? 'input[type="tel"]' : `[name="${fields[0]}"]`)?.focus()
        return
      }
      setInvalid([]); onSubmit(parsed.data)
    } finally { setValidating(false) }
  }
  return <PracticeContactCard title={t('contactTitle')} intro={t('contactIntro')} complete={t('complete')}>
    <form onSubmit={submit} noValidate className={s.contactForm} aria-busy={disabled}>
      <PracticeContactFields labels={{ name: t('name'), email: t('email'), phone: t('phone') }} name={name} email={email} phone={phone} consent={consent} onName={setName} onEmail={setEmail} onPhone={setPhone} onConsent={setConsent} disabled={disabled} invalid={invalid} phoneCountry={LANGUAGES[locale].phoneCountry} consentText={t.rich('consent', { privacy: chunks => <Link href="/privacy" target="_blank" rel="noopener noreferrer">{chunks}</Link> })} />
      {(invalid.length > 0 || error) && <p role="alert" className={s.error}>{error || t('contactInvalid')}</p>}
      <Action type="submit" disabled={disabled}>{t(disabled ? 'savingDetails' : 'viewResults')} →</Action><button type="button" className={s.textButton} disabled={disabled} onClick={onExit}>{t('backGuide')}</button>
    </form></PracticeContactCard>
}
