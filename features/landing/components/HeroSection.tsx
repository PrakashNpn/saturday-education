'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { CONTACT_LINKS } from '@/shared/constants/social'
import { cn } from '@/shared/utils/cn'

// Measured off the design: each block starts about 84ms after the one above it
// and takes a little over half a second, on a plain ease-out.
const EASE = [0, 0, 0.2, 1] as const
const STAGGER = 0.084

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.5 3.8 7.2V22l3.5-1.9c.9.2 1.8.4 2.7.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const prefersReducedMotion = useReducedMotion()

  // "Saturday Education" stays on one line at any width. Burmese's highlight
  // adds "Consulting" to match the sentence the client asked for, and that
  // third word no longer fits unbroken on a phone screen — nowrap would just
  // push it past the viewport edge instead of wrapping.
  const highlightNoWrap = locale !== 'my'

  /**
   * The whole hero is above the fold, so this runs on mount, not on scroll.
   *
   * `initial` deliberately does not branch on prefersReducedMotion.
   * useReducedMotion() is null during SSR and only resolves on the client, so
   * branching there renders opacity:0 on the server and no initial state on the
   * client, which leaves nothing to bring the content back and hides the whole
   * hero. The preference is honoured by the zero-duration transition instead.
   */
  const rise = (step: number, distance = 14, duration = 0.55) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay: step * STAGGER, ease: EASE },
  })

  // max-tablet:pb-0: the image further down is full-bleed at that width, so
  // the section's own bottom padding was just leaving a blank gap under it
  // before the next section starts. Top padding is untouched — that spaces
  // the nav from the stats line, nothing to do with the image.
  return (
    <section className="hero-lift relative overflow-hidden py-16 pb-10 max-tablet:py-10 max-tablet:pb-0">
      {/* Wireframe globe, barely there at 4% and masked away before it reaches
          the headline. Loaded as a file rather than inlined so 27KB of path
          data stays out of the client bundle. */}
      <div
        aria-hidden="true"
        className="hero-globe-fade pointer-events-none absolute top-[calc(9%-120px)] left-1/2 aspect-square w-[130vw] -translate-x-1/2 bg-[url('/images/hero/globe.svg')] bg-contain bg-center bg-no-repeat opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-wrap px-6">
        <div className="mx-auto max-w-[84ch] text-center">
          <motion.h1
            {...rise(0)}
            className="mx-auto mb-5 text-display font-medium leading-[1.08] tracking-[-0.03em]"
          >
            {t('titleLine1')}
            <br />
            {t('titleLine2')}{' '}
            {/* The company's own name set in running text is an identity
                moment, so it takes the brand colour rather than the action
                colour. Same value, different reason. */}
            <span className={cn('font-semibold text-brand', highlightNoWrap && 'whitespace-nowrap')}>
              {t('titleHighlight')}
            </span>
            {/* Burmese word order puts a verb after the brand name ("...with
                Saturday Education, let's start") where English's does not, so
                this only trails the highlight for locales that actually need
                it — empty for English and Thai, so nothing renders there. */}
            {t('titleSuffix') && ` ${t('titleSuffix')}`}
          </motion.h1>

          <motion.p
            {...rise(1)}
            className="mx-auto mb-8 max-w-[52ch] text-lede font-light leading-[1.55] text-secondary-text"
          >
            {t('ledeLine1')}
            <br className="max-tablet:hidden" /> {t('ledeLine2')}
          </motion.p>

          <motion.div {...rise(2)} className="mx-auto mb-8 max-w-[64ch] border-t border-stroke pt-6">
            <p className="flex flex-wrap items-baseline justify-center gap-x-7 gap-y-2">
              {/* tabular-nums so the two figures do not shift width against
                  each other, and accent-ink because gold has to be read here
                  rather than just seen. */}
              <span className="flex items-baseline gap-x-2.5">
                <span className="text-section leading-none font-medium tracking-[-0.01em] text-accent-ink tabular-nums">
                  {t('visaCount')}
                </span>
                <span className="text-lede font-medium text-primary-text">{t('visaLabel')}</span>
              </span>
              <span className="flex items-baseline gap-x-2.5">
                <span className="text-section leading-none font-medium tracking-[-0.01em] text-accent-ink tabular-nums">
                  {t('studentsCount')}
                </span>
                <span className="text-lede font-medium text-primary-text">
                  {t('studentsLabel')}
                </span>
              </span>
            </p>
          </motion.div>

          <motion.div {...rise(3)} className="flex flex-col items-center gap-4">
            <Link
              href="/#consultation"
              className="inline-flex min-h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-action px-16 text-body font-medium text-white transition-colors hover:bg-action-hover max-tablet:w-full"
            >
              {t('bookConsultation')}
            </Link>

            {/* The alternative to the primary ask, not a second one. */}
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-label font-normal text-muted-text">
              {t('messagePrefix')}
              <a
                href={CONTACT_LINKS.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-label font-medium text-action"
              >
                <MessengerIcon />
                <span className="underline underline-offset-[3px]">{t('messenger')}</span>
              </a>
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-label font-medium text-action"
              >
                <WhatsAppIcon />
                <span className="underline underline-offset-[3px]">{t('whatsapp')}</span>
              </a>
            </p>
          </motion.div>
        </div>

        <motion.figure
          {...rise(1, 16, 0.75)}
          // -mx-6 cancels the section's own px-6 below tablet, so the photo
          // runs to the true screen edges instead of sitting inset.
          className="relative mx-auto mt-12 max-w-wrap max-tablet:mt-8 max-tablet:-mx-6"
        >
          <Image
            src="/images/hero/hero-counsellor.webp"
            alt={t('imageAlt')}
            width={2160}
            height={973}
            priority
            unoptimized
            sizes="(max-width: 1080px) 100vw, 1080px"
            // h-auto everywhere: the file is a fixed 2160x973 shape, so full
            // width plus full un-cropped content only has one possible
            // height (~176px on a typical phone) — a taller fixed height
            // would need object-cover to crop the sides to fill it, which is
            // exactly what this is deliberately not doing. No rounded
            // corner/border below tablet since it's flush with the true
            // screen edge there.
            className="h-auto w-full rounded-lg border border-stroke max-tablet:rounded-none max-tablet:border-none"
          />
          {/* Reclaimed on mobile: the extra width from going full-bleed
              matters more here than the caption did. */}
          <figcaption className="mt-3 text-center text-min text-muted-text max-tablet:hidden">
            {t('imageCaption')}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
