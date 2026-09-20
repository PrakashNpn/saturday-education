import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getAllCountries } from '@/features/destination/services/destinationService'
import { DestinationsPageClient } from '@/features/destination'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('destinations.title'),
    description: t('destinations.description'),
    openGraph: {
      title: t('destinations.title'),
      description: t('destinations.description'),
      type: 'website',
      siteName: 'Saturday Education',
    },
  }
}

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params
  const [countries, t] = await Promise.all([
    getAllCountries(locale),
    getTranslations({ locale, namespace: 'destinations' }),
  ])

  return (
    <DestinationsPageClient
      countries={countries}
      translations={{
        viewDetails: t('viewDetails'),
      }}
    />
  )
}
