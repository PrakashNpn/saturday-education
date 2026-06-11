'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Compass } from 'lucide-react'

export function PreparingScreen() {
  const t = useTranslations('careerAssessment.preparing')
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex w-full max-w-md flex-col items-center text-center"
    >
      <div className="relative mb-6 h-20 w-20">
        {/* rotating dashed ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-brand-purple/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* pulsing glow */}
        <motion.div
          className="absolute inset-1 rounded-full bg-brand-purple/30 blur-lg"
          animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* badge */}
        <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-purple-dark to-brand-purple-light text-white shadow-lg shadow-brand-purple/30">
          <Compass size={30} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-neutral-900">{t('title')}</h2>
      <p className="mt-2 text-sm text-gray-500">{t('subtitle')}</p>

      {/* indeterminate shimmer bar */}
      <div className="mt-5 h-1.5 w-40 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
          animate={{ x: ['-110%', '320%'] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
