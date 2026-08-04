'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, GraduationCap, BadgeDollarSign, Building2 } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// ── Count-up helper ───────────────────────────────────────────────────────────

function CountUp({
  target,
  duration = 1.5,
  prefix = '',
  suffix = '',
}: {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()

    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }

    const timer = setTimeout(() => requestAnimationFrame(tick), 800)
    return () => clearTimeout(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HeroSection() {
  const t = useTranslations('hero')

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const fadeInUp = (delay: number) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  })

  const statsData = [
    { icon: GraduationCap,   target: 2000, prefix: '',  suffix: '+', label: t('stats.studentsLabel') },
    { icon: ShieldCheck,     target: 95,   prefix: '',  suffix: '%', label: t('stats.visaLabel') },
    { icon: BadgeDollarSign, target: 3,    prefix: '$', suffix: 'M', label: t('stats.scholarshipsLabel') },
    { icon: Building2,       target: 50,   prefix: '',  suffix: '+', label: t('stats.partnersLabel') },
  ]

  return (
    <section
      aria-label="Hero"
      className="relative bg-gradient-to-b from-brand-purple-50/50 to-neutral-100 md:min-h-[min(calc(100dvh-72px),900px)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-8 md:pt-0 md:pb-12 md:flex md:flex-col md:justify-between md:h-[min(calc(100dvh-72px),900px)]">

        {/* ── Part 1: Content — sits near the top ── */}
        <div className="md:pt-10 lg:pt-4">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.15fr_1fr] gap-6 items-center lg:items-start w-full">

            {/* ── Left: Text Content ─────────────────────────────── */}
            <div>
              {/* Badge */}
              <motion.div {...fadeInUp(0)}>
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.8 }}
                >
                  <div className="mb-4 lg:my-4 md:mb-5 inline-flex items-center gap-2 px-2 py-1 rounded-full bg-[#EDE0F5] border border-[#D8C4E8]">
                    <ShieldCheck size={16} className="text-brand-purple" />
                    <span
                      className="text-brand-purple font-semibold tracking-wider uppercase"
                      style={{ fontSize: 'clamp(0.625rem, 0.2rem + 0.3vw, 0.75rem)', fontWeight: 'bolder' }}
                    >
                      {t('badge')}
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Headline */}
              <motion.div {...fadeInUp(0.15)}>
                <h1
                  className="font-black leading-[1.1] text-neutral-900 mb-4 md:mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 0.25rem + 3.5vw, 3.25rem)' }}
                >
                  {t('titleLine1')}
                  <br />
                  {t('titleLine2')}
                  <br />
                  <span className="text-brand-purple">{t('titleHighlight')}</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div {...fadeInUp(0.3)}>
                <p
                  className="text-gray-600 leading-relaxed max-w-md mb-5 md:mb-6"
                  style={{ fontSize: 'clamp(0.8125rem, 0.6rem + 0.5vw, 1.0625rem)' }}
                >
                  {t('description')}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div {...fadeInUp(0.45)}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link
                    href="/universities"
                    className="px-6 py-2.5 rounded-full bg-brand-purple text-white font-semibold hover:bg-brand-purple-dark hover:shadow-lg transition-all duration-200"
                    style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)' }}
                  >
                    {t('exploreUniversities')}
                  </Link>
                  <Link
                    href="/#consultation"
                    className="px-6 py-2.5 rounded-full border-2 border-brand-purple text-brand-purple font-semibold bg-white hover:bg-brand-purple-50 transition-all duration-200"
                    style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)' }}
                  >
                    {t('bookConsultation')}
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── Right: Illustration — entrance + continuous float ── */}
            <motion.div
              className="w-full flex items-center justify-center md:justify-end"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }
              }
            >
              <motion.div
                className="w-full"
                animate={prefersReducedMotion ? {} : { y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <Image
                  src="/images/hero/updated-hero.png"
                  alt={t('heroImageAlt')}
                  width={500}
                  height={400}
                  className="w-full h-auto max-w-[400px] md:max-w-[90%] lg:max-w-none"
                  priority
                />
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* ── Part 2: Stats bar — sits at the bottom of the viewport ── */}
        <div className="mt-8 md:-mt-8 md:pb-8 lg:pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map(({ icon: Icon, target, prefix, suffix, label }, index) => (
              <motion.div
                key={label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.8 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] as const }
                }
                className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4 lg:py-5 flex flex-col items-center text-center"
              >
                <Icon size={24} className="text-brand-purple" />
                <p
                  className="font-extrabold text-brand-purple mt-1.5 leading-none"
                  style={{ fontSize: 'clamp(1.25rem, 0.5rem + 2.2vw, 2.25rem)' }}
                >
                  <CountUp target={target} prefix={prefix} suffix={suffix} duration={3} />
                </p>
                <p
                  className="uppercase tracking-wider font-medium text-gray-500 mt-1"
                  style={{ fontSize: 'clamp(0.5rem, 0.35rem + 0.3vw, 0.75rem)' }}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
