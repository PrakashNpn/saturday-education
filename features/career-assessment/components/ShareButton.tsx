'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Share2, Loader2 } from 'lucide-react'
import { ShareCardModal } from './ShareCardModal'
import type { DashboardData } from '../types'

interface Props {
  dashboard: DashboardData
  leadId: string
}

type Status = 'idle' | 'loading' | 'error'

/**
 * Generates the personal share card (server-side — see shareCard.ts) and
 * hands it to the device's native share sheet where that's available, which
 * is what lets it drop straight into Instagram/WhatsApp/etc on mobile.
 * Desktop mostly has no such share sheet at all, so that path falls back to
 * an in-page modal (ShareCardModal) instead of dumping the student on a
 * blank tab showing nothing but the raw image — download, copy-link, and
 * one-click WhatsApp/Facebook/Telegram, the things a desktop browser can
 * actually do.
 */
export function ShareButton({ dashboard, leadId }: Props) {
  const t = useTranslations('careerAssessment.chrome')
  const [status, setStatus] = useState<Status>('idle')
  const [modalUrls, setModalUrls] = useState<{ imageUrl: string; resultsUrl: string } | null>(null)

  async function handleShare() {
    if (status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch('/api/career-assessment/share-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          fullName: dashboard.fullName,
          archetype: dashboard.archetype,
          interests: dashboard.interests,
          personality: dashboard.personality,
          aptitude: dashboard.aptitude,
          aptitudeOverall: dashboard.aptitudeOverall,
        }),
      })
      if (!res.ok) throw new Error('share card request failed')
      const { imageUrl, resultsUrl } = (await res.json()) as { imageUrl: string; resultsUrl: string }

      let shared = false
      if (typeof navigator.share === 'function') {
        try {
          const imgRes = await fetch(imageUrl)
          const file = new File([await imgRes.blob()], 'career-profile.png', { type: 'image/png' })
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({ files: [file] })
            shared = true
          }
        } catch {
          // Falls through to the link-only share below — including when the
          // student simply cancels the native sheet, which also rejects.
        }
        if (!shared) {
          try {
            await navigator.share({ url: resultsUrl })
            shared = true
          } catch {
            /* falls through to the in-page modal */
          }
        }
      }
      if (!shared) {
        setModalUrls({ imageUrl, resultsUrl })
      }
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  const label = status === 'loading' ? t('sharePreparing') : status === 'error' ? t('shareRetry') : t('share')

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        disabled={status === 'loading'}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stroke bg-surface-0 px-4 py-1.5 text-min font-medium whitespace-nowrap text-secondary-text transition-colors hover:border-action/30 hover:bg-tint hover:text-action disabled:cursor-not-allowed disabled:opacity-70 sm:text-label"
      >
        {status === 'loading' ? (
          <Loader2 className="size-3.5 animate-spin sm:size-4" />
        ) : (
          <Share2 className="size-3.5 sm:size-4" />
        )}
        <span>{label}</span>
      </button>

      {modalUrls && (
        <ShareCardModal
          imageUrl={modalUrls.imageUrl}
          resultsUrl={modalUrls.resultsUrl}
          onClose={() => setModalUrls(null)}
        />
      )}
    </>
  )
}
