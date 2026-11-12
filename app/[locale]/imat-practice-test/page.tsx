import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ImatPractice, loadImatCatalog } from '@/features/imat-practice-test'
import { pageMetadata } from '@/shared/lib/seo/metadata'

export const revalidate = 86400

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.imat' })
  return pageMetadata({ locale, path: '/imat-practice-test', title: t('title'), description: t('description') })
}

export default async function ImatPage({ params }: Props) {
  setRequestLocale((await params).locale)
  return <ImatPractice catalog={await loadImatCatalog()} />
}
