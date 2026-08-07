'use client'

import Script from 'next/script'
import { useConsent } from './useConsent'
import { META_PIXEL_ID } from './config'

/**
 * Loads the Meta (Facebook) Pixel ONLY after the visitor has granted marketing
 * consent. Until then (and if consent is withdrawn) nothing is injected, so fbq
 * never runs and no _fbp/_fbc cookies are set — an opt-in model, as required for
 * advertising trackers under UK PECR/ICO.
 *
 * Meta's own install snippet also ships a <noscript> tracking pixel. It is
 * deliberately omitted here: a plain <img> fires regardless of JavaScript, which
 * would track visitors who never consented and defeat the gate above.
 */
export function MetaPixel() {
  const { consent } = useConsent()

  if (!META_PIXEL_ID || !consent?.marketing) return null

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
