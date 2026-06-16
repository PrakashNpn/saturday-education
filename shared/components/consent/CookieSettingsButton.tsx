'use client'

import { useTranslations } from 'next-intl'
import { useConsent } from './useConsent'

/** Footer link that reopens the cookie preferences panel. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations('cookieConsent')
  const { openSettings } = useConsent()

  return (
    <button type="button" onClick={openSettings} className={className}>
      {t('settingsLink')}
    </button>
  )
}
