import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getPublicResults } from '@/features/career-assessment/services/publicResults'
import { storagePath } from '@/features/career-assessment/services/shareCard'
import { getPublicUrl } from '@/shared/lib/supabase'
import { PublicResultsView } from '@/features/career-assessment/components/PublicResultsView'

type Props = { params: Promise<{ locale: string; leadId: string }> }

/** noindex: these are individual students' quiz results, not content meant to
 *  turn up in search. openGraph.images reuses the already-generated share PNG,
 *  so pasting this link into WhatsApp/Messenger gets a proper preview card for
 *  free — no separate image render needed for that. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { leadId } = await params
  const data = await getPublicResults(leadId)
  if (!data) return {}

  const title = `${data.archetype} | Saturday Education Career Assessment`
  const imageUrl = getPublicUrl(storagePath(leadId))

  return {
    title,
    description: data.archetypeSummary,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: data.archetypeSummary,
      images: [imageUrl],
    },
  }
}

export default async function PublicCareerResultsPage({ params }: Props) {
  const { locale, leadId } = await params
  setRequestLocale(locale)

  const data = await getPublicResults(leadId)
  if (!data) notFound()

  return <PublicResultsView data={data} />
}
