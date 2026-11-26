import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { GuidesHubPage } from '@/features/guides'
import { pageMetadata } from '@/shared/lib/seo/metadata'

type Props = { params: Promise<{ locale: string }> }

export const revalidate = 86400

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return pageMetadata({
    locale,
    path: '/guides',
    title: t('guides.title'),
    description: t('guides.description'),
  })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <GuidesHubPage locale={locale} />
}
