import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import TermsContent from '@/shared/components/legal/TermsContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/terms',
    title: 'Terms & Conditions',
    description: 'Read the terms and conditions for using Saturday Education Consulting’s website and services.',
  })
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale)
  return <TermsContent />
}
