'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { PartyPopper } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// A few celebratory dots that burst outward from the badge.
const CONFETTI = [
  { x: -60, y: -40, c: '#590D82' },
  { x: 60, y: -44, c: '#F59E0B' },
  { x: -78, y: 10, c: '#7B1FA2' },
  { x: 80, y: 4, c: '#E11D48' },
  { x: -34, y: -64, c: '#F59E0B' },
  { x: 38, y: -62, c: '#590D82' },
]

export function ThankYouScreen() {
  const t = useTranslations('careerAssessment.thankYou')
  const steps = [t('step1'), t('step2'), t('step3')]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="rounded-3xl border border-gray-100 bg-white/95 px-6 py-9 text-center shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)] backdrop-blur-sm sm:px-10">
        {/* Success badge + confetti */}
        <div className="relative mx-auto mb-6 h-20 w-20">
          {CONFETTI.map((p, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
              style={{ background: p.c }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0, 1, 0.6] }}
              transition={{ duration: 1, delay: 0.15 + i * 0.04, ease: 'easeOut' }}
            />
          ))}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple-dark to-brand-purple-light text-white shadow-lg shadow-brand-purple/30"
          >
            <PartyPopper size={38} />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{t('title')}</h2>
        <p className="mx-auto mt-3 max-w-sm text-gray-600">{t('subtitle')}</p>

        {/* What happens next */}
        <div className="mx-auto mt-7 max-w-xs text-left">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-brand-purple">
            {t('nextTitle')}
          </p>
          <ul className="space-y-2.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple-50 text-[11px] font-bold text-brand-purple">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#consultation"
            className="w-full rounded-full bg-brand-purple px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-purple-dark sm:w-auto"
          >
            {t('cta')}
          </Link>
          <Link
            href="/"
            className="w-full rounded-full border border-brand-purple px-7 py-3 font-semibold text-brand-purple transition-colors hover:bg-brand-purple-50 sm:w-auto"
          >
            {t('homeCta')}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
