'use client'

import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Clock, Focus, Check, Sparkles, GraduationCap, Users } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  onStart: () => void
}

/** Hand-drawn desk scene: lamp, laptop, coffee, a small line chart on
 *  screen. Traced from the design at its own coordinates, so it is copied
 *  verbatim rather than approximated. */
function BeginIllustration() {
  return (
    <svg
      width="280"
      height="140"
      viewBox="0 0 220 110"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full max-w-[290px] shrink-0"
    >
      <circle cx="165" cy="35" r="30" fill="#FBBF24" fillOpacity="0.12" />
      <rect x="15" y="90" width="190" height="4" rx="2" fill="#3D3935" />
      <rect x="25" y="94" width="6" height="14" rx="1" fill="#706E6B" />
      <rect x="189" y="94" width="6" height="14" rx="1" fill="#706E6B" />
      <path d="M72 88L76 80H124L128 88H72Z" fill="#D3D3D3" />
      <rect x="68" y="87" width="64" height="3" rx="1.5" fill="#A8A8A8" />
      <rect x="74" y="44" width="52" height="36" rx="3" fill="#3D3935" />
      <rect x="77" y="47" width="46" height="30" rx="1.5" fill="#632D8B" />
      <path
        d="M82 68L88 62L94 65L102 55L108 58L118 50"
        stroke="#FBFBFB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="102" cy="55" r="2" fill="#FBBF24" />
      <circle cx="118" cy="50" r="2" fill="#34D399" />
      <path d="M180 90H160" stroke="#706E6B" strokeWidth="3" strokeLinecap="round" />
      <path d="M170 90V65L154 48" stroke="#632D8B" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M148 44L162 48L156 56L144 50L148 44Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="1.5"
      />
      <path d="M148 53L120 90H165L154 55Z" fill="#FDE68A" fillOpacity="0.18" />
      <rect x="36" y="74" width="16" height="16" rx="2" fill="#E87A5D" />
      <path
        d="M52 77C55 77 56 80 56 82C56 84 55 87 52 87"
        stroke="#E87A5D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M40 70C39 67 42 66 41 63" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M46 69C45 66 48 65 47 62" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="134" y="82" width="22" height="8" rx="1.5" fill="#FFFFFF" stroke="#C0BFBD" strokeWidth="1" />
      <line x1="137" y1="85" x2="147" y2="85" stroke="#706E6B" strokeWidth="1" strokeLinecap="round" />
      <line x1="137" y1="87" x2="151" y2="87" stroke="#632D8B" strokeWidth="1" strokeLinecap="round" />
      <line x1="158" y1="81" x2="158" y2="89" stroke="#E87A5D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChecklistRow({ icon, label, tone }: { icon: ReactNode; label: string; tone: 'action' | 'green' }) {
  return (
    <div className="flex items-center gap-2.5 text-label font-medium text-primary-text">
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
          tone === 'green' ? 'bg-dark-green/10 text-dark-green' : 'bg-action/10 text-action'
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </div>
  )
}

/**
 * Gate shown before the first question: sets expectations on the left (length,
 * setting, autosave) and what the run is actually for on the right (a profile,
 * matches, a counsellor review) — no email collected here. The end-of-test
 * contact form is the only place that asks for one.
 *
 * Replaces the old standalone "Preparing…" screen: the design goes straight
 * from this modal to question one, so there is no separate beat after it.
 */
export function BeforeYouBeginModal({ open, onClose, onStart }: Props) {
  const t = useTranslations('careerAssessment.beginModal')

  // Esc to close + lock body scroll while open, matching CareerOutlookModal.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="begin-modal-title"
            className="relative z-10 w-full max-w-[720px] overflow-hidden rounded-md border border-stroke bg-surface shadow-xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="absolute top-4 right-4 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full text-secondary-text transition-colors hover:bg-surface-1 hover:text-primary-text"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid min-h-[420px] grid-cols-1 sm:min-h-[450px] md:grid-cols-2">
              {/* Left: what to expect during the run. */}
              <div className="flex flex-col items-start justify-center border-b border-stroke bg-surface-0 p-8 text-left sm:p-10 md:border-r md:border-b-0">
                <div className="mb-6 flex w-full justify-center">
                  <BeginIllustration />
                </div>
                <div className="w-full space-y-3">
                  <h2 id="begin-modal-title" className="text-body font-semibold text-primary-text">
                    {t('title')}
                  </h2>
                  <div className="space-y-2.5">
                    <ChecklistRow icon={<Clock size={12} />} label={t('timeQuestions')} tone="action" />
                    <ChecklistRow icon={<Focus size={12} />} label={t('quietSetting')} tone="action" />
                    <ChecklistRow icon={<Check size={12} strokeWidth={3} />} label={t('autosaveNote')} tone="green" />
                  </div>
                </div>
              </div>

              {/* Right: what the run is for. */}
              <div className="flex flex-col justify-center bg-surface p-8 sm:p-10">
                <div className="w-full space-y-3">
                  <h2 className="text-body font-semibold text-primary-text">{t('getTitle')}</h2>
                  <div className="space-y-2.5">
                    <ChecklistRow icon={<Sparkles size={12} />} label={t('getProfile')} tone="action" />
                    <ChecklistRow icon={<GraduationCap size={12} />} label={t('getMatches')} tone="action" />
                    <ChecklistRow icon={<Users size={12} />} label={t('getCounsellor')} tone="action" />
                  </div>
                </div>

                <div className="mt-16 flex flex-col gap-2.5 border-t border-stroke pt-4">
                  <button
                    type="button"
                    onClick={onStart}
                    className="inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-6 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
                  >
                    {t('submitCta')}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full cursor-pointer py-1.5 text-center text-label font-medium text-secondary-text transition-colors hover:text-primary-text"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
