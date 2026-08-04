'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  Clock,
  Sparkles,
  Heart,
  UserCheck,
  ArrowRight,
  ListChecks,
  Layers,
  ShieldCheck,
  Info,
} from 'lucide-react'

interface Props {
  onStart: () => void
  onAutofill?: () => void
  /** Render just the inner content (no card chrome) for use inside a shared panel. */
  bare?: boolean
}

function MetaChip({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-600">
      <Icon size={13} className="text-brand-purple" />
      {label}
    </span>
  )
}

export function CareerDiscoveryIntro({ onStart, onAutofill, bare }: Props) {
  const t = useTranslations('careerAssessment.intro')
  const isDev = process.env.NODE_ENV !== 'production'

  const points = [
    { icon: Sparkles, text: t('point1') },
    { icon: Heart, text: t('point2') },
    { icon: UserCheck, text: t('point3') },
  ]

  const content = (
    <>
      {/* Logo */}
      <Image
        src="/images/logo/logo.webp"
        alt="Saturday Education Consulting"
        width={176}
        height={65}
        priority
        className="mx-auto mb-2 h-auto w-32"
      />

      {/* Eyebrow pill */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
        {t('eyebrow')}
      </span>

      <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-[1.75rem]">
        {t('title')}
      </h2>
      <p className="mx-auto mt-1.5 max-w-lg text-[13px] leading-relaxed text-gray-600">{t('subtitle')}</p>

      {/* Meta chips */}
      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
        <MetaChip icon={ListChecks} label={t('metaQuestions')} />
        <MetaChip icon={Layers} label={t('metaParts')} />
        <MetaChip icon={Clock} label={t('metaTime')} />
      </div>

      {/* Benefits — compact 3-up */}
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {points.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50/60 px-2 py-2 text-center"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple-50 to-brand-purple-100 text-brand-purple">
              <Icon size={14} />
            </span>
            <span className="text-[11px] leading-snug text-gray-600">{text}</span>
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-left">
        <Info size={15} className="mt-0.5 flex-shrink-0 text-amber-500" />
        <p className="text-[11px] leading-relaxed text-amber-800">
          <span className="font-semibold">{t('noticeTitle')}:</span> {t('notice')}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-3 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onStart}
          className="group inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light px-8 py-2.5 font-semibold text-white shadow-md shadow-brand-purple/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/30 sm:w-auto"
        >
          {t('startButton')}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className="text-[11px] text-gray-400">{t('reassurance')}</p>

        {isDev && onAutofill && (
          <button
            type="button"
            onClick={onAutofill}
            className="rounded-full border border-dashed border-gray-300 px-4 py-1 text-[11px] text-gray-400 transition-colors hover:border-brand-purple hover:text-brand-purple"
          >
            ⚡ Dev: autofill all answers
          </button>
        )}
      </div>

      {/* Scientific footer */}
      <div className="mt-3 flex items-center justify-center gap-1.5 border-t border-gray-100 pt-2.5 text-[11px] text-gray-500">
        <ShieldCheck size={13} className="flex-shrink-0 text-brand-purple" />
        {t('trustFrameworks')}
      </div>
    </>
  )

  if (bare) {
    // Vertically centered so the half stays balanced whether or not the dev-only
    // "autofill" button is present (it's hidden in production). Inner block keeps
    // the eyebrow pill content-width (a direct flex child would stretch it).
    return (
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-md text-center">{content}</div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-xl"
      >
        <div className="rounded-3xl border border-gray-100 bg-white/90 px-6 py-5 text-center shadow-[0_24px_70px_-20px_rgba(89,13,130,0.22)] backdrop-blur-sm sm:px-9">
          {content}
        </div>
      </motion.div>
    </div>
  )
}
