import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AboutPage } from '@/features/about'
import { pageMetadata } from '@/shared/lib/seo/metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return pageMetadata({ locale, path: '/about', title: t('about.title'), description: t('about.description') })
}

export default async function AboutUsPage({ params }: Props) {
  setRequestLocale((await params).locale)
  return <AboutPage />
}
