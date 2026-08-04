import { UniversityFinderPage } from '@/features/university'
import { getTranslations } from 'next-intl/server'

type Props = {
  searchParams: Promise<{ degree?: string; country?: string; course?: string }>
}

export async function generateMetadata() {
  const t = await getTranslations('universities')
  return {
    title: `${t('heroTitle')} | Saturday Education`,
    description: t('heroSubtitle'),
  }
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  return <UniversityFinderPage initialFilters={params} />
}
