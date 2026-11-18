import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

export default async function ImatLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages({ locale })
  return <NextIntlClientProvider messages={{ imat: messages.imat, phoneSelect: messages.phoneSelect }}>{children}</NextIntlClientProvider>
}
