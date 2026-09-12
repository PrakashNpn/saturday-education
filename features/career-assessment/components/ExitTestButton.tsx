'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { X, TriangleAlert } from 'lucide-react'

interface Props {
  /** Called once the student confirms — the caller decides what "exiting"
   *  means (here: back to the intro, with the run already autosaved). */
  onExit: () => void
}

/** The header button shown throughout the run, plus its own confirmation —
 *  leaving mid-test is deliberate, so it asks first rather than acting on a
 *  single click. */
export function ExitTestButton({ onExit }: Props) {
  const t = useTranslations('careerAssessment.chrome')
  const [open, setOpen] = useState(false)
  // The header this button sits in has backdrop-blur, which — like any
  // filter — creates a containing block for `position: fixed` descendants.
  // Left in place, the dialog below would be pinned to the header's own 64px
  // box instead of the viewport rather than covering it. Portaling to
  // <body> sidesteps that entirely. Gated on a real click (never true
  // during the server render) rather than a mount effect, so document is
  // only ever touched after one; it stays true afterwards so the portaled
  // AnimatePresence remains mounted and can play the close animation
  // instead of vanishing the instant `open` flips back to false.
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setHasOpened(true)
        }}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stroke bg-surface-0 px-4 py-1.5 text-min font-medium text-secondary-text transition-colors hover:border-action/30 hover:bg-tint hover:text-action sm:text-label"
      >
        <span>{t('exitTest')}</span>
        <X className="size-3.5 sm:size-4" />
      </button>

      {hasOpened &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <div className="absolute inset-0" onClick={() => setOpen(false)} />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="exit-dialog-title"
                  className="relative z-10 w-full max-w-sm rounded-xl border border-stroke bg-white p-6 text-center shadow-xl"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-tint text-action">
                    <TriangleAlert className="size-6" />
                  </div>
                  <h3 id="exit-dialog-title" className="mb-1.5 text-lg font-bold text-primary-text">
                    {t('exitTitle')}
                  </h3>
                  <p className="mb-6 text-label text-secondary-text">{t('exitBody')}</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex-1 cursor-pointer rounded-full border border-stroke py-2.5 text-label font-medium text-secondary-text transition-colors hover:bg-surface-0"
                    >
                      {t('exitCancel')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        onExit()
                      }}
                      className="flex-1 cursor-pointer rounded-full bg-action py-2.5 text-label font-medium text-white transition-colors hover:bg-action-hover"
                    >
                      {t('exitConfirm')}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
