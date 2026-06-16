// Google Analytics 4 Measurement ID — production-only.
// GA never loads in local development; on the live site it loads only when
// NEXT_PUBLIC_GA_ID is set. Add it in Vercel's "Production" environment:
//   NEXT_PUBLIC_GA_ID = G-QJ7Q5ZB2VY
// (Leaving it unset on Preview keeps preview deployments out of your GA data.)
export const GA_MEASUREMENT_ID =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GA_ID ?? '' : ''

// localStorage key for the visitor's cookie choice. Bump the version suffix if
// the consent categories ever change (it re-prompts everyone).
export const CONSENT_STORAGE_KEY = 'se-cookie-consent-v1'
