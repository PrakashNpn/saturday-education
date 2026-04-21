import { UniversityFinderPage } from '@/features/university'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('universities')
  return {
    title: `${t('heroTitle')} | Saturday Education`,
    description: t('heroSubtitle'),
  }
}

export default function Page() {
  return <UniversityFinderPage />
}
