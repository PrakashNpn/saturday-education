import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CANADA_EVENT, EducationEventPage } from '@/features/education-event'
import { pageMetadata } from '@/shared/lib/seo/metadata'

type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'educationEvent' })
  return pageMetadata({ locale, path: CANADA_EVENT.path, title: CANADA_EVENT.title, description: t('description') })
}
export default async function Page({ params }: Props) {
  setRequestLocale((await params).locale)
  return <EducationEventPage />
}
