import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

/** The root layout leaves the assessment's strings and the career catalog out of the
 *  messages it sends to the browser; the assessment pages need them, so they are
 *  provided here with everything else. Every assessment route sits under this layout. */
export default async function CareerAssessmentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages({ locale })
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
