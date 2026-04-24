import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Noto_Sans, Noto_Sans_Thai, Noto_Sans_Myanmar } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Navbar from "@/shared/components/layout/Navbar"
import Footer from "@/shared/components/layout/Footer"
import ChatWidget from "@/features/ai-advisor/components/ChatWidget"

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
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${notoSans.variable} ${notoSansThai.variable} ${notoSansMyanmar.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader color="linear-gradient(to right, #3D0A5A, #590D82, #7B1FA2)" height={3} showSpinner={false} shadow="none" />
          <Navbar />
          {children}
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
