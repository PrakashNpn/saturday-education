import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

/** Only the converter strings plus the lead-form country labels and phone
 *  field copy - not the full message tree. */
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages({ locale })
  const landing = messages.Landing as {
    consultation: { form: { country: { options: Record<string, string> } } }
  }

  return (
    <NextIntlClientProvider
      messages={{
        gradeConverter: messages.gradeConverter,
        phoneSelect: messages.phoneSelect,
        Landing: {
          consultation: {
            form: {
              country: {
                options: landing.consultation.form.country.options,
              },
            },
          },
        },
      }}
    >
      {children}
    </NextIntlClientProvider>
  )
}
