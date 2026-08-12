'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, ShieldCheck, BadgeDollarSign, Building2 } from 'lucide-react'

function CountUp({
  target,
  duration = 2.5,
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
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    const timer = setTimeout(() => requestAnimationFrame(tick), 400)
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

interface Props {
  translations: {
    heroLabel: string
    heroTitle: string
    heroSubtitle: string
    heroStat1Label: string
    heroStat2Label: string
    heroStat3Label: string
    heroStat4Label: string
  }
}

export function AboutHero({ translations: t }: Props) {
  const stats = [
    { icon: GraduationCap, target: 3000, prefix: '', suffix: '+', label: t.heroStat1Label },
    { icon: ShieldCheck, target: 95, prefix: '', suffix: '%', label: t.heroStat2Label },
    { icon: BadgeDollarSign, target: 3, prefix: '$', suffix: 'M', label: t.heroStat3Label },
    { icon: Building2, target: 100, prefix: '', suffix: '+', label: t.heroStat4Label },
  ]

  return (
    <div className="relative bg-gradient-to-b from-brand-purple via-purple-800 to-purple-900 pt-20 pb-14 md:pb-20 px-4 text-center overflow-visible">

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Centered radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-52 h-52 rounded-full border border-white/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-52 h-52 rounded-full border border-white/10" />
      </div>

      {/* Hero text */}
      <div className="relative z-10 max-w-3xl mx-auto mb-10 md:mb-12">
        <div className="flex items-center justify-center gap-2 w-fit mx-auto bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          ✦ {t.heroLabel}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>
      </div>

      {/* Stats strip — inside purple zone */}
      <div className="relative z-10 max-w-5xl mx-auto px-0 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ icon: Icon, target, prefix, suffix, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 lg:py-5 flex flex-col items-center text-center"
            >
              <Icon size={22} className="text-white/70" />
              <p className="font-extrabold text-white mt-1.5 text-2xl md:text-3xl leading-none">
                <CountUp target={target} prefix={prefix} suffix={suffix} duration={2.5} />
              </p>
              <p className="text-[10px] uppercase tracking-wider font-medium text-white/55 mt-1">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
