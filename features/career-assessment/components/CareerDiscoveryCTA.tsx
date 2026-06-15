'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Compass, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function CareerDiscoveryCTA() {
  const t = useTranslations('careerAssessment.homeCta')

  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-light px-6 py-12 text-center sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/5" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
              <Compass size={28} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold">{t('eyebrow')}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">{t('title')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">{t('subtitle')}</p>

            <Link
              href="/career-assessment"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-brand-purple transition-transform hover:scale-[1.03] hover:shadow-lg"
            >
              {t('button')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
