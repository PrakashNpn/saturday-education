'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { GraduationCap, ShieldCheck, Banknote, Building2 } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 2000, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let current = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

const STAT_CONFIG = [
  { icon: GraduationCap, target: 10000, format: (n: number) => `${n.toLocaleString()}+`, labelKey: 'students' as const },
  { icon: ShieldCheck,   target: 98,    format: (n: number) => `${n}%`,                  labelKey: 'visa' as const },
  { icon: Banknote,      target: 12,    format: (n: number) => `$${n}M`,                 labelKey: 'scholarships' as const },
  { icon: Building2,     target: 500,   format: (n: number) => `${n}+`,                  labelKey: 'universities' as const },
] as const

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function StatCard({
  icon: Icon,
  target,
  format,
  label,
  active,
}: {
  icon: React.ElementType
  target: number
  format: (n: number) => string
  label: string
  active: boolean
}) {
  const count = useCountUp(target, 2000, active)

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 md:p-6 text-center"
    >
      <Icon size={20} className="text-brand-purple mx-auto" />
      <p
        className="font-extrabold text-brand-purple mt-2"
        style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.25rem)' }}
      >
        {format(count)}
      </p>
      <p className="text-gray-500 text-xs sm:text-sm mt-1 tracking-wide uppercase leading-snug">{label}</p>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function StatsCtaSection() {
  const t = useTranslations('Landing.statsCta')
  const statsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(statsRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 lg:pb-16">

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {STAT_CONFIG.map(({ icon, target, format, labelKey }) => (
            <StatCard
              key={labelKey}
              icon={icon}
              target={target}
              format={format}
              label={t(`stats.${labelKey}.label`)}
              active={inView}
            />
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-8 md:mt-10 rounded-2xl overflow-hidden bg-gradient-to-r from-[#590D82] via-[#6B1FA0] to-[#4A0A6E] py-8 sm:py-10 md:py-12 px-5 sm:px-8 md:px-12 text-center flex flex-col items-center"
        >
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
