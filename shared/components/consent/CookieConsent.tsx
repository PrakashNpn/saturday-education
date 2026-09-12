'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Cookie } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useConsent } from './useConsent'

const primaryBtn =
  'flex-1 cursor-pointer rounded-full bg-action px-4 py-2.5 text-label font-medium text-white transition-colors hover:bg-action-hover'
const secondaryBtn =
  'flex-1 cursor-pointer rounded-full border border-stroke bg-surface-0 px-4 py-2.5 text-label font-medium text-secondary-text transition-colors hover:border-action/30 hover:bg-tint hover:text-action'

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? 'bg-action' : 'bg-surface-2'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-xs transition-transform ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}

export function CookieConsent() {
  const t = useTranslations('cookieConsent')
  const { showBanner, consent, acceptAll, rejectAll, save } = useConsent()
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const handleCustomize = () => {
    // seed toggles from current choice
    setAnalytics(consent?.analytics ?? false)
    setMarketing(consent?.marketing ?? false)
    setCustomizing(true)
  }
  const handleAccept = () => {
    setCustomizing(false)
    acceptAll()
  }
  const handleReject = () => {
    setCustomizing(false)
    rejectAll()
  }
  const handleSave = () => {
    setCustomizing(false)
    save({ analytics, marketing })
  }

  if (!showBanner) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed right-4 bottom-4 left-4 z-[60] sm:right-auto sm:max-w-sm"
      role="dialog"
      aria-live="polite"
      aria-label={t('title')}
    >
      <div className="overflow-hidden rounded-md border border-stroke bg-surface shadow-xl">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-action text-white">
              <Cookie size={17} />
            </span>
            <h2 className="text-label font-bold text-primary-text">{t('title')}</h2>
          </div>

          <p className="mt-2.5 text-label leading-relaxed font-light text-secondary-text">
            {t.rich('description', {
              link: (chunks) => (
                <Link href="/privacy" target="_blank" className="font-medium text-action hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </p>

          {customizing && (
            <div className="mt-4 space-y-3 rounded-sm border border-stroke bg-surface-0 p-3.5">
              {/* Strictly necessary — always on */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-min font-bold text-primary-text">{t('necessaryTitle')}</p>
                  <p className="text-min leading-snug text-muted-text">{t('necessaryDesc')}</p>
                </div>
                <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-min font-semibold tracking-wide text-muted-text uppercase">
                  {t('alwaysOn')}
                </span>
              </div>

              {/* Analytics — optional toggle */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-min font-bold text-primary-text">{t('analyticsTitle')}</p>
                  <p className="text-min leading-snug text-muted-text">{t('analyticsDesc')}</p>
                </div>
                <ToggleSwitch checked={analytics} onChange={() => setAnalytics((v) => !v)} label={t('analyticsTitle')} />
              </div>

              {/* Marketing — optional toggle (Meta Pixel) */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-min font-bold text-primary-text">{t('marketingTitle')}</p>
                  <p className="text-min leading-snug text-muted-text">{t('marketingDesc')}</p>
                </div>
                <ToggleSwitch checked={marketing} onChange={() => setMarketing((v) => !v)} label={t('marketingTitle')} />
              </div>
            </div>
          )}

          {/* Equal-prominence accept / reject */}
          <div className="mt-4 flex gap-2.5">
            <button type="button" onClick={handleReject} className={secondaryBtn}>
              {t('rejectAll')}
            </button>
            <button type="button" onClick={handleAccept} className={primaryBtn}>
              {t('acceptAll')}
            </button>
          </div>

          <button
            type="button"
            onClick={customizing ? handleSave : handleCustomize}
            className="mt-2.5 w-full cursor-pointer py-1 text-center text-min font-semibold text-action transition-colors hover:text-action-hover"
          >
            {customizing ? t('save') : t('customize')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
