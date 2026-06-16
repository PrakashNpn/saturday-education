'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Cookie } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useConsent } from './useConsent'

const primaryBtn =
  'rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/30 hover:brightness-105 active:translate-y-0 active:scale-[0.98]'
const secondaryBtn =
  'rounded-full border border-gray-200 bg-white/60 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-purple/40 hover:bg-white hover:text-brand-purple hover:shadow-sm active:translate-y-0 active:scale-[0.98]'

export function CookieConsent() {
  const t = useTranslations('cookieConsent')
  const { showBanner, consent, acceptAll, rejectAll, save } = useConsent()
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  const handleCustomize = () => {
    setAnalytics(consent?.analytics ?? false) // seed toggle from current choice
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
    save({ analytics })
  }

  if (!showBanner) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed bottom-4 left-4 right-4 z-[60] sm:right-auto sm:max-w-sm"
      role="dialog"
      aria-live="polite"
      aria-label={t('title')}
    >
      <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/45 shadow-2xl ring-1 ring-black/5 backdrop-blur-2xl backdrop-saturate-150">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-light text-white shadow-sm">
              <Cookie size={17} />
            </span>
            <h2 className="text-sm font-bold text-gray-900">{t('title')}</h2>
          </div>

          <p className="mt-2.5 text-[13px] leading-relaxed text-gray-500">
            {t.rich('description', {
              link: (chunks) => (
                <Link href="/privacy" target="_blank" className="font-medium text-brand-purple hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </p>

          {customizing && (
            <div className="mt-4 space-y-3 rounded-xl bg-white/35 p-3.5">
              {/* Strictly necessary — always on */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800">{t('necessaryTitle')}</p>
                  <p className="text-[11px] leading-snug text-gray-500">{t('necessaryDesc')}</p>
                </div>
                <span className="shrink-0 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  {t('alwaysOn')}
                </span>
              </div>

              {/* Analytics — optional toggle */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800">{t('analyticsTitle')}</p>
                  <p className="text-[11px] leading-snug text-gray-500">{t('analyticsDesc')}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  aria-label={t('analyticsTitle')}
                  onClick={() => setAnalytics((v) => !v)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    analytics ? 'bg-brand-purple' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      analytics ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Equal-prominence accept / reject */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
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
            className="mt-2.5 w-full text-center text-xs font-semibold text-brand-purple transition-colors hover:text-brand-purple-dark"
          >
            {customizing ? t('save') : t('customize')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
