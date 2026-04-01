'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { BookOpen, Trophy, PlaneLanding, Landmark, Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const SERVICE_KEYS = ['testPrep', 'scholarship', 'arrival', 'loans'] as const
const SERVICE_ICONS = {
  testPrep: BookOpen,
  scholarship: Trophy,
  arrival: PlaneLanding,
  loans: Landmark,
}

const BENEFIT_KEYS = ['counselors', 'partnerships', 'postAdmission', 'transparent', 'results'] as const

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function AdditionalServicesSection() {
  const t = useTranslations('Landing.additionalServices')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <motion.div
        ref={ref}
        className="rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* LEFT CARD — Additional Services */}
        <div className="relative bg-white p-8 md:p-10">
          {/* Purple gradient top border */}
          {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#590D82] via-[#7B2AB5] to-[#590D82]" /> */}

          <h2
            className="font-bold text-gray-900 leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 1.2rem + 2.5vw, 2.5rem)' }}
          >
            {t('heading')}
          </h2>
          <p
            className="text-gray-500 mt-4 mb-10"
            style={{ fontSize: 'clamp(0.95rem, 0.85rem + 0.5vw, 1.1rem)' }}
          >
            {t('subtitle')}
          </p>

          {/* 2×2 service grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {SERVICE_KEYS.map((key) => {
              const Icon = SERVICE_ICONS[key]
              return (
                <motion.div key={key} variants={itemVariants} transition={{ duration: 0.4, ease: 'easeOut' }}>
                  <div className="w-12 h-12 rounded-xl bg-[#F3EAFA] flex items-center justify-center">
                    <Icon size={22} className="text-[#590D82]" />
                  </div>
                  <p className="font-bold text-gray-900 text-base mt-3">
                    {t(`${key}.title` as Parameters<typeof t>[0])}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mt-1">
                    {t(`${key}.description` as Parameters<typeof t>[0])}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* RIGHT CARD — Why Choose Saturday Education? */}
        <div className="bg-gradient-to-br from-[#590D82] via-[#6B1FA0] to-[#4A0A6E] p-8 md:p-10 flex flex-col">
          <h2
            className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 1rem + 2.2vw, 2.25rem)' }}
          >
            {t('whyChoose.heading')}
          </h2>

          <motion.div
            className="space-y-6 mt-8 flex-1"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
          >
            {BENEFIT_KEYS.map((key) => (
              <motion.div
                key={key}
                className="flex items-start gap-4"
                variants={itemVariants}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Check size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">
                    {t(`whyChoose.benefits.${key}.title` as Parameters<typeof t>[0])}
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed mt-0.5">
                    {t(`whyChoose.benefits.${key}.description` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8">
            <Link
              href="/#consultation"
              className="inline-block bg-white text-[#590D82] font-bold text-sm px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              {t('whyChoose.cta')}
            </Link>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  )
}
