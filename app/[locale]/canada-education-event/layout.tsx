import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale)
  const messages = await getMessages()
  return <NextIntlClientProvider messages={{ educationEvent: messages.educationEvent }}>{children}</NextIntlClientProvider>
}
