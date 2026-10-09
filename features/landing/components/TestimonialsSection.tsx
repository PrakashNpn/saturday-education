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
  { key: '4', photo: 'may-thazin' },
  { key: '5', photo: 'htin-aung-kyaw' }
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
      className="relative overflow-hidden bg-[color-mix(in_srgb,var(--color-action)_80%,black)] py-14 text-white max-tablet:py-10"
    >
      {/* One flat brand colour, not the gradient this had a moment ago, plus
          a soft white highlight for a little depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_60%)]"
      />

      {/* Only the heading fades/rises — the dark band stays solid, and the
          marquee below is already in constant motion so it doesn't need its
          own entrance. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="relative z-[1] mx-auto mb-10 max-w-wrap px-6"
      >
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-white/60 uppercase">
          {t('eyebrow')}
        </h2>
        <p className="max-w-[46ch] text-section font-medium">{t('headline')}</p>
      </motion.div>

      {/* One row, travelling left. Same seamless-loop mechanism as the partner
          wall: the list is rendered twice and the track slides by half.
          .marquee's own mask-image fades to transparent in its outer 7%, read
          as an unwanted shadow where cards enter/exit, so it's overridden off
          here: cards stay fully opaque to the container edge and clip
          cleanly instead of dissolving into it. */}
      <div
        className="marquee relative z-[1]"
        style={{ maskImage: 'none', WebkitMaskImage: 'none' }}
      >
        <div
          className="marquee-track marquee-track--left"
          style={{ '--marquee-duration': '42s' } as React.CSSProperties}
        >
          {[false, true].map((isClone) => (
            <div key={String(isClone)} className="flex" aria-hidden={isClone}>
              {reviews.map((review) => (
                <figure
                  key={review.key}
                  className="relative mx-3 h-[24rem] w-72 shrink-0 overflow-hidden rounded-[28px] border border-white/40 bg-[color-mix(in_srgb,white_90%,color-mix(in_srgb,var(--color-action)_80%,black))] text-primary-text shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(92,9,245,0.12),0_24px_48px_-28px_rgba(20,10,43,0.45)]"
                >
                  {/* A fixed, precomputed tint (the same 65%-white-over-the-
                      section's-purple blend) rather than true bg-white/65 +
                      backdrop-blur: backdrop-blur samples whatever is
                      actually behind the card, and the section has its own
                      off-centre white highlight plus a constantly-scrolling
                      marquee, so every card read a slightly different
                      gradient depending on where it sat. Baking the blend in
                      keeps every card identical and flat, at the cost of the
                      card no longer genuinely reacting to what's behind it.
                      No external drop shadow beyond the soft one here: the
                      marquee fades to transparent at its own left/right 7%,
                      and a wider shadow bleeding past the card's edge didn't
                      fade in step with it, leaving a dark smudge with no
                      card visible behind it. */}
                  <div className="relative z-[1] flex h-full flex-col p-7">
                    {/* White text on a white-tinted card has a contrast
                        ceiling no matter how the opacity is tuned, both the
                        tint and the text are variations on white. A
                        near-opaque light card with dark text, the same
                        glass-card convention every other section already
                        uses, floating on the brand-purple band rather than a
                        white section, reads clearly regardless. */}
                    <span className="mb-4 text-brand/30">
                      <QuoteMark />
                    </span>

                    {/* flex-1 + min-h-0 lets this fill exactly the space
                        between the quote mark and the pinned-to-bottom
                        figcaption, no more — a short quote just sits there
                        like before, a long one scrolls internally instead of
                        overflowing the card. The fade hints there's more
                        below without a "read more" link breaking the
                        quoted-text feel. A mask on the text itself, not a
                        colour-matched overlay on top of it, so it keeps
                        blending correctly into whatever the card's own
                        background actually is. */}
                    <div className="mb-6 min-h-0 flex-1">
                      <blockquote
                        className="h-full overflow-y-auto scrollbar-thin-brand pr-2 text-label font-normal text-primary-text"
                        style={{
                          maskImage: 'linear-gradient(to top, transparent, black 32px)',
                          WebkitMaskImage: 'linear-gradient(to top, transparent, black 32px)',
                        }}
                      >
                        {review.quote}
                      </blockquote>
                    </div>

                    <figcaption className="mt-auto flex items-center gap-3 border-t border-stroke pt-4 text-label">
                      {/* A real photograph when we have one. The design
                          fills this slot with a generated DiceBear shape,
                          which is neither a photograph nor the person;
                          initials say the same amount and claim less, so
                          they are the fallback. */}
                      {review.photo ? (
                        <Image
                          src={`/images/testimonials/${review.photo}.webp`}
                          alt=""
                          width={80}
                          height={80}
                          unoptimized
                          className="size-10 shrink-0 rounded-full bg-tint object-cover ring-2 ring-stroke"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="grid size-10 shrink-0 place-items-center rounded-full bg-tint text-min font-medium text-brand ring-2 ring-stroke"
                        >
                          {initials(review.name)}
                        </span>
                      )}
                      <span>
                        <span className="block font-medium text-primary-text">{review.name}</span>
                        <span className="text-muted-text">{review.program}</span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
