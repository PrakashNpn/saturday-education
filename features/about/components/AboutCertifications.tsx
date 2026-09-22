'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

// Aspect ratios are each certificate's own, so none of them is stretched or
// cropped inside the gold frame.
const CERTIFICATES = [
  { key: 'usatc', w: 1080, h: 1504 },
  { key: 'icef', w: 832, h: 1316 },
  { key: 'qeac', w: 900, h: 1272 },
  { key: 'mcmf', w: 1080, h: 728 },
  { key: 'ccea', w: 948, h: 1375 },
  { key: 'ieac', w: 884, h: 620 },
] as const

const FRAME =
  'rounded-[3px] border-[5px] border-[#9E7728] bg-gradient-to-br from-[#E6C670] via-[#F8E8B0] to-[#A07823] p-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.22)] ring-1 ring-[#785918]/40 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]'

const EASE = [0, 0, 0.2, 1] as const

export function AboutCertifications() {
  const t = useTranslations('about')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="border-t border-[#262626] bg-[#121212] py-12 max-tablet:py-8">
      {/* Only the heading fades/rises — the dark band stays solid, and the
          marquee below is already in constant motion so it doesn't need its
          own entrance. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="mx-auto mb-6 max-w-wrap px-6 text-center"
      >
        <p className="mb-1.5 text-min font-medium tracking-[0.06em] text-[#8e8e8e] uppercase">
          {t('certsLabel')}
        </p>
        <h2 className="mx-auto max-w-[54ch] text-section font-medium text-white">
          {t('certsTitle')}
        </h2>
        {/* States the core business activity explicitly (student recruitment)
            for partner universities' due-diligence checks, right next to the
            accreditations that back it up. No max-w here (unlike certsTitle
            above) — this one line reads better staying on one line at
            desktop widths than wrapped for a shorter measure. */}
        <p className="mt-3 text-label font-light text-white/70">
          {t('certsSubtitle')}
        </p>
      </motion.div>

      {/* Same marquee as the partner wall and the testimonials, so it also
          stops and becomes a horizontal scroll under reduced motion. */}
      <div className="marquee py-2">
        <div
          className="marquee-track marquee-track--left"
          style={{ '--marquee-duration': '48s' } as React.CSSProperties}
        >
          {[false, true].map((isClone) => (
            <ul key={String(isClone)} className="flex items-center gap-5 pr-5" aria-hidden={isClone}>
              {CERTIFICATES.map((certificate) => (
                <li key={certificate.key} className="group shrink-0">
                  <div className={FRAME}>
                    <div
                      className="relative h-[210px] overflow-hidden rounded-[1px] bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)] sm:h-[230px]"
                      style={{ aspectRatio: `${certificate.w}/${certificate.h}` }}
                    >
                      <Image
                        src={`/images/about/certificates/${certificate.key}.webp`}
                        alt={t(`cert_${certificate.key}`)}
                        fill
                        unoptimized
                        sizes="240px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
