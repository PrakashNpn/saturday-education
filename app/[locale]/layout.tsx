import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Noto_Sans, Noto_Sans_Thai, Noto_Sans_Myanmar } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Navbar from "@/shared/components/layout/Navbar"
import Footer from "@/shared/components/layout/Footer"
import ChatWidget from "@/features/ai-advisor/components/ChatWidget"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieConsent, GoogleAnalytics, MetaPixel } from "@/shared/components/consent"

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
// preload:false — these script fonts aren't preloaded on every page (the audience is
// English-primary); they load on demand only when Thai/Burmese glyphs actually render.
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai', display: 'swap', preload: false })
const notoSansMyanmar = Noto_Sans_Myanmar({ subsets: ['myanmar'], variable: '--font-myanmar', display: 'swap', preload: false })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  // Noto Sans (Latin) has no Thai or Myanmar glyphs, so those locales were
  // silently falling back to whatever script-capable font the OS happened to
  // have — with no control over its line-height, clipping ascenders/descenders
  // against boxes sized for Noto Sans's metrics. Each locale gets the web font
  // actually built for its script; the family's own fallback chain (see
  // globals.css) still lands back on Noto Sans for any Latin mixed into the
  // same string.
  const scriptFontClass =
    locale === 'th' ? 'font-thai' : locale === 'my' ? 'font-myanmar' : 'font-sans'

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${notoSans.variable} ${notoSansThai.variable} ${notoSansMyanmar.variable}`}
    >
      <body className={`bg-canvas text-primary-text ${scriptFontClass} text-body font-light leading-[1.65] antialiased flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader color="linear-gradient(to right, var(--color-action-hover), var(--color-action))" height={3} showSpinner={false} shadow="none" />
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <ChatWidget />
          <CookieConsent />
          <GoogleAnalytics />
          <MetaPixel />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
