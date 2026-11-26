import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { LANGUAGES, LOCALE_CODES, type LocaleCode } from '@/i18n/languages'

const BRAND = 'Saturday Education'

/** The link preview picture (1200 by 630), shown when a page is shared on Facebook,
 *  WhatsApp, LinkedIn and so on. A JPEG on purpose: not every app reads WebP. */
const PREVIEW_IMAGE = {
  url: '/images/og/default.jpg',
  width: 1200,
  height: 630,
  alt: 'Saturday Education Consulting, study abroad guidance with counsellors who know the way',
}

/** The site-relative path of a page in a language: the default language has no
 *  prefix. Relative on purpose; `metadataBase` in the root layout makes it absolute. */
export function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return path || '/'
  return `/${locale}${path}`
}

export type PagePreviewImage = {
  url: string
  width?: number
  height?: number
  alt?: string
}

interface PageMetadataInput {
  locale: string
  /** The page's path without a language prefix, e.g. '/about'; '' for the home page. */
  path: string
  /** A plain title gets the brand appended by the root layout's template. Use
   *  { absolute } for a title that already says the brand (the home page). */
  title: string | { absolute: string }
  description?: string
  /** Optional share image; defaults to the site-wide OG JPEG. */
  image?: PagePreviewImage
}

/**
 * Title, description, canonical address, language alternates and link preview
 * (Open Graph and Twitter) for one page in one language. Every public page builds
 * its metadata with this, so they all carry the same set of tags.
 */
export function pageMetadata({ locale, path, title, description, image }: PageMetadataInput): Metadata {
  const url = localizedPath(locale, path)
  const known = (LOCALE_CODES as string[]).includes(locale)
  const current = known ? LANGUAGES[locale as LocaleCode] : LANGUAGES[routing.defaultLocale as LocaleCode]
  const previewTitle = typeof title === 'string' ? `${title} | ${BRAND}` : title.absolute
  const previewImage = {
    url: image?.url ?? PREVIEW_IMAGE.url,
    width: image?.width ?? PREVIEW_IMAGE.width,
    height: image?.height ?? PREVIEW_IMAGE.height,
    alt: image?.alt ?? PREVIEW_IMAGE.alt,
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, localizedPath(l, path)])),
        'x-default': localizedPath(routing.defaultLocale, path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: BRAND,
      url,
      title: previewTitle,
      description,
      locale: current.ogLocale,
      alternateLocale: LOCALE_CODES.filter((l) => l !== locale).map((l) => LANGUAGES[l].ogLocale),
      images: [previewImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: previewTitle,
      description,
      images: [previewImage.url],
    },
  }
}
