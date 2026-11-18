'use client'

import { useId, useEffect, useRef, type ReactNode } from 'react'
import { LazyPhoneField } from '@/shared/components/common/LazyPhoneField'
import type { PhoneFieldProps } from '@/shared/components/common/PhoneField'
import s from './practiceTest.module.css'

export function PracticeContactCard({ title, intro, complete, children }: { title: string; intro: string; complete?: string; children: ReactNode }) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [])
  return <div className={s.contactCard}><div className={s.contactOverview}><span aria-hidden="true">✓</span>{complete && <p>{complete}</p>}<h1 ref={heading} tabIndex={-1}>{title}</h1><p>{intro}</p></div><div className={s.contactBody}>{children}</div></div>
}

/** Presentation only: each feature owns validation, consent wording and submission. */
export function PracticeContactFields({ labels, name, email, phone, consent, onName, onEmail, onPhone, onConsent, disabled, invalid = [], nameField = 'name', phoneCountry, consentText, phoneHint }: {
  labels: { name: string; email: string; phone: string }; name: string; email: string; phone: string | undefined; consent: boolean
  onName: (value: string) => void; onEmail: (value: string) => void; onPhone: (value: string | undefined) => void; onConsent: (value: boolean) => void
  disabled?: boolean; invalid?: string[]; nameField?: string; phoneCountry: PhoneFieldProps['defaultCountry']; consentText: ReactNode; phoneHint?: string
}) {
  const id = useId()
  return <div className={s.contactFields}>
    <label>{labels.name} *<input className={s.contactInput} name={nameField} autoComplete="name" value={name} onChange={e => onName(e.target.value)} minLength={2} maxLength={120} required disabled={disabled} aria-invalid={invalid.includes('name')} /></label>
    <label>{labels.email} *<input className={s.contactInput} name="email" type="email" autoComplete="email" value={email} onChange={e => onEmail(e.target.value)} maxLength={254} required disabled={disabled} aria-invalid={invalid.includes('email')} /></label>
    <fieldset disabled={disabled}><legend>{labels.phone} *</legend><LazyPhoneField value={phone} onChange={value => { if (!disabled) onPhone(value) }} defaultCountry={phoneCountry} placeholder={labels.phone} inputClassName={s.contactInput} autoComplete="tel" inputId={`${id}-phone`} required invalid={invalid.includes('phone')} describedBy={phoneHint ? `${id}-hint` : undefined} /></fieldset>
    {phoneHint && <p id={`${id}-hint`} className={s.phoneHint}>{phoneHint}</p>}
    <label className={s.consent}><input type="checkbox" name="consent" checked={consent} onChange={e => onConsent(e.target.checked)} required disabled={disabled} aria-invalid={invalid.includes('consent')} /><span>{consentText}</span></label>
  </div>
}
