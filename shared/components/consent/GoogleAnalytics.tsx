'use client'

import Script from 'next/script'
import { useConsent } from './useConsent'
import { GA_MEASUREMENT_ID } from './config'

/**
 * Loads Google Analytics ONLY after the visitor has granted analytics consent.
 * Until then (and if consent is withdrawn) nothing is injected, so gtag never
 * runs and no GA cookies are set — an opt-in model, the safest under UK PECR/ICO.
 */
export function GoogleAnalytics() {
  const { consent } = useConsent()

  if (!GA_MEASUREMENT_ID || !consent?.analytics) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
