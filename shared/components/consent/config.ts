// Google Analytics 4 Measurement ID — production-only.
// GA never loads in local development; on the live site it loads only when
// NEXT_PUBLIC_GA_ID is set. Add it in Vercel's "Production" environment:
//   NEXT_PUBLIC_GA_ID = G-QJ7Q5ZB2VY
// (Leaving it unset on Preview keeps preview deployments out of your GA data.)
export const GA_MEASUREMENT_ID =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GA_ID ?? '' : ''

// Meta (Facebook) Pixel ID — production-only, same policy as GA above.
// Add it in Vercel's "Production" environment:
//   NEXT_PUBLIC_META_PIXEL_ID = <your 15-16 digit pixel id>
// Leaving it unset on Preview keeps preview traffic out of your ad reporting.
export const META_PIXEL_ID =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '' : ''

// localStorage key for the visitor's cookie choice. Bump the version suffix if
// the consent categories ever change (it re-prompts everyone).
// v1 -> v2: added the "marketing" category for the Meta Pixel. Visitors who had
// already chosen under v1 are re-prompted, because they never had the chance to
// accept or decline advertising cookies.
export const CONSENT_STORAGE_KEY = 'se-cookie-consent-v2'
