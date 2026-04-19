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
    getAllCountries(),
    getTranslations({ locale, namespace: 'destinations' }),
  ])

  return (
    <DestinationsPageClient
      countries={countries}
      translations={{
        heroLabel: t('heroLabel'),
        heroTitle: t('heroTitle'),
        heroSubtitle: t('heroSubtitle'),
        searchPlaceholder: t('searchPlaceholder'),
        searchButton: t('searchButton'),
        popularRegions: t('popularRegions'),
        regionAll: t('regionAll'),
        regionEurope: t('regionEurope'),
        regionAsia: t('regionAsia'),
        regionAmericas: t('regionAmericas'),
        regionOceania: t('regionOceania'),
        regionAfrica: t('regionAfrica'),
        showingCount: t.raw('showingCount') as string,
        sortBy: t('sortBy'),
        sortHighestRanking: t('sortHighestRanking'),
        sortAZ: t('sortAZ'),
        sortZA: t('sortZA'),
        viewDetails: t('viewDetails'),
        loadMore: t('loadMore'),
        whyStudyAbroadLabel: t('whyStudyAbroadLabel'),
        whyStudyAbroadTitle: t('whyStudyAbroadTitle'),
        whyStudyAbroadSubtitle: t('whyStudyAbroadSubtitle'),
        globalExposure: t('globalExposure'),
        globalExposureDesc: t('globalExposureDesc'),
        careerEdge: t('careerEdge'),
        careerEdgeDesc: t('careerEdgeDesc'),
        personalGrowth: t('personalGrowth'),
        personalGrowthDesc: t('personalGrowthDesc'),
        lifetimeMemories: t('lifetimeMemories'),
        lifetimeMemoriesDesc: t('lifetimeMemoriesDesc'),
        ctaTitle: t('ctaTitle'),
        ctaSubtitle: t('ctaSubtitle'),
        ctaButton: t('ctaButton'),
      }}
    />
  )
}
