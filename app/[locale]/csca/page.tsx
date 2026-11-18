import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CscaPractice } from '@/features/csca-practice-test'
import { pageMetadata } from '@/shared/lib/seo/metadata'

type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'csca' })
  return pageMetadata({ locale, path: '/csca', title: t('metadataTitle'), description: t('metadataDescription') })
}
export default async function Page({ params }: Props) {
  setRequestLocale((await params).locale)
  return <CscaPractice />
}
