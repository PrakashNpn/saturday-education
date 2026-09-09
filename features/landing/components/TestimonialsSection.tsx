import { useTranslations } from 'next-intl'

const REVIEW_KEYS = ['1', '2', '3', '4'] as const

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

  const reviews = REVIEW_KEYS.map((key) => ({
    key,
    quote: t(`reviews.${key}.quote`),
    name: t(`reviews.${key}.name`),
    program: t(`reviews.${key}.program`),
  }))

  return (
    <section
      id="testimonials"
      className="border-y border-stroke bg-structure py-14 text-white max-tablet:py-10"
    >
      <div className="mx-auto mb-10 max-w-wrap px-6">
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-white/60 uppercase">
          {t('eyebrow')}
        </h2>
        <p className="max-w-[46ch] text-section font-medium">{t('headline')}</p>
      </div>

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
                    {/* The design fills this slot with a generated DiceBear
                        shape, which is neither a photograph nor the person.
                        Initials say the same amount and claim less. */}
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-min font-medium text-white/80"
                    >
                      {initials(review.name)}
                    </span>
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
