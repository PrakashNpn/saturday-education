import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages({ locale })
  return <NextIntlClientProvider messages={{ csca: messages.csca, phoneSelect: messages.phoneSelect }}>{children}</NextIntlClientProvider>
}
