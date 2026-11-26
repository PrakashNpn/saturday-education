import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Noto_Sans, Noto_Sans_Thai, Noto_Sans_Myanmar } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { languageOf } from "@/i18n/languages"
import { routing } from "@/i18n/routing"
import Navbar from "@/shared/components/layout/Navbar"
import Footer from "@/shared/components/layout/Footer"
import ChatWidget from "@/features/ai-advisor/components/ChatWidget"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieConsent, GoogleAnalytics, MetaPixel } from "@/shared/components/consent"
import { JsonLd, organizationJsonLd } from '@/shared/lib/seo/jsonLd'

const SCRIPT_FONT_CLASS = {
  latin: 'font-sans',
  thai: 'font-thai',
  myanmar: 'font-myanmar',
  vietnamese: 'font-vietnamese',
} as const

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
// preload:false — these script fonts aren't preloaded on every page (the audience is
// English-primary); they load on demand only when Thai/Burmese glyphs actually render.
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai', display: 'swap', preload: false })
const notoSansMyanmar = Noto_Sans_Myanmar({ subsets: ['myanmar'], variable: '--font-myanmar', display: 'swap', preload: false })
// The Latin file above has no Vietnamese tone-mark letters. This second Noto Sans
// carries only those, loaded on demand, and the Vietnamese font stack lists it
// after the Latin one, so each character is drawn from whichever file has it.
const notoSansVietnamese = Noto_Sans({ subsets: ['vietnamese'], variable: '--font-vi-glyphs', display: 'swap', preload: false })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/** The assessment's strings and the career catalog are large (the catalog alone is
 *  63 KB in Thai) and used only on the assessment pages, so the pages that do not
 *  need them are not sent them. career-assessment/layout.tsx adds them back. */
const ASSESSMENT_NAMESPACES = ['careerAssessment', 'careerCatalog']
const PAGE_ONLY_NAMESPACES = [...ASSESSMENT_NAMESPACES, 'imat', 'educationEvent', 'csca', 'gradeConverter']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Dotted paths like /llms.txt used to match [locale] and render the homepage
  // with lang="llms.txt". Only real locale codes are allowed here.
  if (!(routing.locales as readonly string[]).includes(locale)) notFound()
  setRequestLocale(locale)
  const allMessages = await getMessages()
  const messages = Object.fromEntries(
    Object.entries(allMessages).filter(([namespace]) => !PAGE_ONLY_NAMESPACES.includes(namespace)),
  )

  // Noto Sans (Latin) has no Thai or Myanmar glyphs, so those locales were
  // silently falling back to whatever script-capable font the OS happened to
  // have — with no control over its line-height, clipping ascenders/descenders
  // against boxes sized for Noto Sans's metrics. Each locale gets the web font
  // actually built for its script; the family's own fallback chain (see
  // globals.css) still lands back on Noto Sans for any Latin mixed into the
  // same string.
  const scriptFontClass = SCRIPT_FONT_CLASS[languageOf(locale).script]

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${notoSans.variable} ${notoSansThai.variable} ${notoSansMyanmar.variable} ${notoSansVietnamese.variable} [overflow-x:clip]`}
    >
      {/* overflow-x:clip, not overflow-x-hidden (= overflow-x: hidden): per the
          CSS overflow spec, setting one axis to hidden/auto/scroll forces the
          other axis to auto too when it was visible — turning body into its
          own scroll container instead of the real viewport, which silently
          broke the header's position: sticky (it stuck relative to that new
          container, not the page). clip is explicitly exempted from that
          forcing rule, so it clips the same off-screen overflow this was
          added for without creating a scroll container. */}
      <body className={`bg-canvas text-primary-text ${scriptFontClass} text-body font-light leading-[1.65] antialiased flex min-h-screen flex-col [overflow-x:clip]`}>
        <JsonLd data={organizationJsonLd()} />
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader color="linear-gradient(to right, var(--color-action-hover), var(--color-action))" height={3} showSpinner={false} shadow="none" />
          <div data-site-chrome className="contents"><Navbar /></div>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <div data-site-chrome className="contents"><Footer /></div>
          <div data-site-chrome data-chat-widget className="contents"><ChatWidget /></div>
          <div data-site-chrome className="contents"><CookieConsent /></div>
          <GoogleAnalytics />
          <MetaPixel />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
