'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const

/**
 * Photographs live in `public/images/testimonials/` as square WebP, 160x160 or
 * larger, cropped to the face. The slot renders at 40px, so 160 covers every
 * sensible screen density.
 *
 * To add one: drop the file in, then put its filename (without the extension)
 * against the right review below. A review with `photo: null` shows the
 * person's initials instead, so the section stays presentable while the photos
 * are still being collected — a mixed row reads as deliberate, not broken.
 *
 * The keys match `Landing.testimonials.reviews.*` in the message files. Photos
 * are keyed here rather than in messages because the same person appears in all
 * three locales.
 */
const REVIEWS = [
  { key: '1', photo: 'ye-naing' },
  { key: '2', photo: 'thi-han' },
  { key: '3', photo: 'akar-kyaw' },
  { key: '4', photo: 'may-thazin' }
] as const satisfies readonly { key: string; photo: string | null }[]

/** First letter of the first two words, which is enough for these names. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? '')
    .join('')
    .toUpperCase()
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" aria-hidden="true" className="size-8">
      <path d="M0 24V14.4C0 6.4 4.8 1.067 14.4 0l1.067 3.733C9.6 5.067 6.933 8 6.933 12h6.4V24H0Zm17.6 0V14.4c0-8 4.8-13.333 14.4-14.4l1.067 3.733C27.2 5.067 24.533 8 24.533 12h6.4V24H17.6Z" />
    </svg>
  )
}

export default function TestimonialsSection() {
  const t = useTranslations('Landing.testimonials')
  const prefersReducedMotion = useReducedMotion()

  const reviews = REVIEWS.map(({ key, photo }) => ({
    key,
    photo,
    quote: t(`reviews.${key}.quote`),
    name: t(`reviews.${key}.name`),
    program: t(`reviews.${key}.program`),
  }))

  return (
    <section
      id="testimonials"
      className="border-y border-stroke bg-structure py-14 text-white max-tablet:py-10"
    >
      {/* Only the heading fades/rises — the dark band stays solid, and the
          marquee below is already in constant motion so it doesn't need its
          own entrance. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="mx-auto mb-10 max-w-wrap px-6"
      >
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-white/60 uppercase">
          {t('eyebrow')}
        </h2>
        <p className="max-w-[46ch] text-section font-medium">{t('headline')}</p>
      </motion.div>

      {/* One row, travelling left. Same seamless-loop mechanism as the partner
          wall: the list is rendered twice and the track slides by half. */}
      <div className="marquee">
        <div
          className="marquee-track marquee-track--left"
          style={{ '--marquee-duration': '42s' } as React.CSSProperties}
        >
          {[false, true].map((isClone) => (
            <div key={String(isClone)} className="flex" aria-hidden={isClone}>
              {reviews.map((review) => (
                <figure
                  key={review.key}
                  className="mx-3 flex h-[24rem] w-72 shrink-0 flex-col rounded-sm border border-white/10 bg-white/[0.02] p-7"
                >
                  <span className="mb-4 text-[oklch(70%_0.13_307.4)]/50">
                    <QuoteMark />
                  </span>

                  <blockquote className="mb-6 text-label font-light text-white/80">
                    {review.quote}
                  </blockquote>

                  <figcaption className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4 text-label">
                    {/* A real photograph when we have one. The design fills
                        this slot with a generated DiceBear shape, which is
                        neither a photograph nor the person; initials say the
                        same amount and claim less, so they are the fallback. */}
                    {review.photo ? (
                      <Image
                        src={`/images/testimonials/${review.photo}.webp`}
                        alt=""
                        width={80}
                        height={80}
                        unoptimized
                        className="size-10 shrink-0 rounded-full bg-white/10 object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-min font-medium text-white/80"
                      >
                        {initials(review.name)}
                      </span>
                    )}
                    <span>
                      <span className="block font-medium text-white">{review.name}</span>
                      <span className="text-white/60">{review.program}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
