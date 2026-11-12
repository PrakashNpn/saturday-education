import { setRequestLocale } from 'next-intl/server'
import { redirect } from '@/i18n/navigation'
import { CANADA_EVENT } from '@/features/education-event'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  redirect({ href: CANADA_EVENT.path, locale })
}
