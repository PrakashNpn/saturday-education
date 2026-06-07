'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function CtaSection() {
  const t = useTranslations('Landing.statsCta')

  return (
    <section className="bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#590D82] via-[#6B1FA0] to-[#4A0A6E] py-8 sm:py-10 md:py-12 px-5 sm:px-8 md:px-12 text-center flex flex-col items-center"
        >
          {/* Blobs */}
          <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

          <h2
            className="font-extrabold text-white max-w-2xl mx-auto leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.75rem)' }}
          >
            {t('cta.heading')}
          </h2>
          <Link
            href="/#consultation"
            className="mt-5 md:mt-6 inline-block px-7 md:px-9 py-2.5 md:py-3 bg-white text-brand-purple font-bold text-sm md:text-base rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {t('cta.button')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
