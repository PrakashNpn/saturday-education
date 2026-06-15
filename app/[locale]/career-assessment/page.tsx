import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AssessmentFlow } from '@/features/career-assessment'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.careerAssessment' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function CareerDiscoveryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AssessmentFlow />
}
