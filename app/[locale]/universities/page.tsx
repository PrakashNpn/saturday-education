import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import UniversityGrid from "@/features/university/components/UniversityGrid"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('universities.title'),
    description: t('universities.description'),
    openGraph: {
      title: t('universities.title'),
      description: t('universities.description'),
      type: 'website',
      siteName: 'Saturday Education',
    },
  }
}
import UniversityFilters from "@/features/university/components/UniversityFilters"

export default function UniversitiesPage() {
  return (
    <main>
      <UniversityFilters />
      <UniversityGrid />
    </main>
  )
}
