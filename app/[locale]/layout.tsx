import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Noto_Sans, Noto_Sans_Thai, Noto_Sans_Myanmar } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Navbar from "@/shared/components/layout/Navbar"
import Footer from "@/shared/components/layout/Footer"
import ChatWidget from "@/features/ai-advisor/components/ChatWidget"
import { Analytics } from "@vercel/analytics/next"

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai', display: 'swap' })
const notoSansMyanmar = Noto_Sans_Myanmar({ subsets: ['myanmar'], variable: '--font-myanmar', display: 'swap' })

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

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${notoSans.variable} ${notoSansThai.variable} ${notoSansMyanmar.variable}`}
    >
      <body className="antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader color="linear-gradient(to right, #3D0A5A, #590D82, #7B1FA2)" height={3} showSpinner={false} shadow="none" />
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
