import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getAllCountries } from '@/features/destination/services/destinationService'
import { DestinationsPageClient } from '@/features/destination'
import { pageMetadata } from '@/shared/lib/seo/metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return pageMetadata({ locale, path: '/destinations', title: t('destinations.title'), description: t('destinations.description') })
}

// Rebuilt in the background at most once a day (see the home page).
export const revalidate = 86400

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
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
