import { getTranslations, setRequestLocale } from 'next-intl/server'
import { submitGradeConverterLead } from '@/features/consultation'
import { GradeConverter } from '@/features/grade-converter'
import { pageMetadata } from '@/shared/lib/seo/metadata'

type Props = { params: Promise<{ locale: string }> }

// This review-only route stays out of search and the sitemap until launch approval.
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gradeConverter' })
  return pageMetadata({ locale, path: '/grade-converter', title: t('metadataTitle'), description: t('description') })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <GradeConverter onSubmitLead={submitGradeConverterLead} />
}
