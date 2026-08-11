import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AssessmentFlow } from '@/features/career-assessment'

type Props = { params: Promise<{ locale: string }> }

// The student's own request finishes in a couple of seconds, but the counsellor pipeline
// (AI synthesis → PDF → email) continues in after() on the same invocation. 60s is the
// Vercel Hobby ceiling and gives that background work the full allowance.
export const maxDuration = 60

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
