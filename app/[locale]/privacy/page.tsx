import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import PrivacyPolicyContent from '@/shared/components/legal/PrivacyPolicyContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Learn how Saturday Education Consulting collects, uses, and protects your personal information.',
  })
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale)
  return <PrivacyPolicyContent />
}
