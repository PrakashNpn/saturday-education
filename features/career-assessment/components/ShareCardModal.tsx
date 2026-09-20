'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Download, Link2, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
  imageUrl: string
  resultsUrl: string
  onClose: () => void
}

// Same glyph already used site-wide (HeroSection's messenger/whatsapp links),
// reused here rather than redrawn, so the WhatsApp mark looks identical
// wherever it appears.
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[18px] shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" className="size-[18px] shrink-0">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 496 512" fill="currentColor" aria-hidden="true" className="size-[18px] shrink-0">
      <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM362.95 176.66c-3.73 39.22-19.88 134.38-28.1 178.3-3.48 18.58-10.32 24.82-16.95 25.43-14.4 1.33-25.34-9.52-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.48-16.13-8.61-25 5.34-39.5 3.65-3.79 67.11-61.51 68.34-66.75.15-.65.3-3.1-1.15-4.38s-3.59-.85-5.14-.5q-3.28.75-104.61 69.14-14.85 10.2-26.9 9.93c-8.85-.19-25.88-5-38.55-9.12-15.53-5.05-27.87-7.72-26.8-16.29q.84-6.72 18.45-13.7 108.45-47.25 144.63-62.3c68.87-28.65 83.18-33.63 92.51-33.79 2.05-.03 6.64.47 9.61 2.89a10.45 10.45 0 0 1 3.53 6.72 43.77 43.77 0 0 1 .38 9.16z" />
    </svg>
  )
}

const iconLinkCls =
  'flex size-11 cursor-pointer items-center justify-center rounded-full border border-stroke text-secondary-text transition-colors hover:border-action/30 hover:text-action'

/**
 * Replaces the old desktop fallback (`window.open` straight to the raw PNG,
 * a blank tab with no context and no actual way to share). Desktop has no
 * OS share sheet the way mobile does, so this is the two things every
 * desktop web app converges on instead — download the file, or copy the
 * link — plus one-click buttons for the platforms that support a real web
 * share intent. Instagram/TikTok deliberately have no such intent; those are
 * already covered by the native share sheet on mobile, nothing to add here.
 *
 * `resultsUrl` (not `imageUrl`) is what gets copied/shared to WhatsApp,
 * Facebook and Telegram — it's the same public results page the card's own
 * QR code points to, so pasting it anywhere shows a real Open Graph preview
 * instead of a bare image link. `imageUrl` is only used for the preview and
 * the actual file download.
 */
export function ShareCardModal({ imageUrl, resultsUrl, onClose }: Props) {
  const t = useTranslations('careerAssessment.shareModal')
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  async function handleDownload() {
    if (downloading) return
    setDownloading(true)
    try {
      // The image lives on Supabase's own domain, so a plain <a download>
      // pointed straight at it isn't reliable cross-origin — some browsers
      // just navigate to it instead of saving. Fetching it first and
      // downloading from a local blob URL always works regardless.
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'career-profile.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(blobUrl)
    } catch {
      // Last resort — at least gets them to the image if the blob fetch failed.
      window.open(imageUrl, '_blank', 'noopener,noreferrer')
    } finally {
      setDownloading(false)
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(resultsUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard permission denied — nothing useful to fall back to here. */
    }
  }

  const encodedUrl = encodeURIComponent(resultsUrl)
  const waHref = `https://wa.me/?text=${encodedUrl}`
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const tgHref = `https://t.me/share/url?url=${encodedUrl}`

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-structure/50 p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        className="relative w-full max-w-sm rounded-md border border-stroke bg-surface p-6 shadow-xl"
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 cursor-pointer text-muted-text transition-colors hover:text-primary-text"
        >
          <X size={20} />
        </button>

        <p className="mb-4 pr-6 text-center text-card font-medium text-primary-text">{t('title')}</p>

        <div className="mx-auto mb-5 w-[200px] overflow-hidden rounded-lg border border-stroke shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element -- external, per-lead generated image; not a build-time-known src for next/image */}
          <img src={imageUrl} alt="" className="block h-auto w-full" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-action text-label font-medium text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download size={16} />
            {downloading ? t('downloading') : t('download')}
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-stroke text-label font-medium text-secondary-text transition-colors hover:border-action/30 hover:text-action"
          >
            {copied ? <Check size={16} /> : <Link2 size={16} />}
            {copied ? t('copied') : t('copyLink')}
          </button>
        </div>

        <p className="mb-3 text-center text-min text-muted-text">{t('orShareVia')}</p>
        <div className="flex items-center justify-center gap-3">
          <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className={iconLinkCls}>
            <WhatsAppIcon />
          </a>
          <a href={fbHref} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className={iconLinkCls}>
            <FacebookIcon />
          </a>
          <a href={tgHref} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram" className={iconLinkCls}>
            <TelegramIcon />
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
