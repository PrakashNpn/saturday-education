import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { AboutPage } from '@/features/about'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('about.title'),
    description: t('about.description'),
    openGraph: {
      title: t('about.title'),
      description: t('about.description'),
      type: 'website',
      siteName: 'Saturday Education',
    },
  }
}

export default function AboutUsPage() {
  return <AboutPage />
}
