import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import DestinationGrid from "@/features/destination/components/DestinationGrid"

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

export default function DestinationsPage() {
  return (
    <main>
      <DestinationGrid />
    </main>
  )
}
