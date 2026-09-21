import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SOCIAL_LINKS } from '@/shared/constants/social'
import { CookieSettingsButton } from '@/shared/components/consent'

const COLUMN_HEADING = 'mb-3 text-label font-medium tracking-[0.06em] text-white/50 uppercase'
const LINK = 'text-label font-normal text-white/70 transition-colors hover:text-white hover:underline'

/** Message key paired with the real destination slug. The design renders these
 *  as plain spans because none of its routes existed; every one of ours does. */
const DESTINATIONS = [
  { key: 'germany', slug: 'germany' },
  { key: 'ireland', slug: 'ireland' },
  { key: 'malaysia', slug: 'malaysia' },
  { key: 'singapore', slug: 'singapore' },
  { key: 'dubai', slug: 'uae' },
  { key: 'canada', slug: 'canada' },
  { key: 'thailand', slug: 'thailand' },
  { key: 'newZealand', slug: 'new-zealand' },
  { key: 'hungary', slug: 'hungary' },
  { key: 'switzerland', slug: 'switzerland' },
  { key: 'spain', slug: 'spain' },
] as const

const SERVICES = [
  'counseling', 'application', 'visa', 'scholarships', 'predeparture', 'arrival',
] as const

const COMPANY = [
  { key: 'about', href: '/about' },
  { key: 'careerAssessment', href: '/career-assessment' },
  { key: 'testimonials', href: '/#testimonials' },
  { key: 'contact', href: '/#consultation' },
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
] as const

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: SOCIAL_LINKS.linkedin,
    path: 'M4.98 3.5a2.5 2.5 0 1 0-.02 5 2.5 2.5 0 0 0 .02-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.57h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.94-1.8-2.94-1.8 0-2.08 1.4-2.08 2.85V21h-4V9.5Z',
  },
  {
    label: 'TikTok',
    href: SOCIAL_LINKS.tiktok,
    path: 'M14.5 3h2.9c.2 1.9 1.36 3.53 3.1 4.24v2.94a7.6 7.6 0 0 1-3.06-.9v6.4a5.9 5.9 0 1 1-5.9-5.9c.2 0 .4 0 .6.03v3.03a2.9 2.9 0 1 0 2.36 2.85V3Z',
  },
] as const

const SOCIAL_CIRCLE =
  'flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-structure py-14 text-white max-tablet:py-10">
      <div className="mx-auto max-w-wrap px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
          {/* Identity, ask, and social. Full width until the five-column layout
              kicks in at lg. */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="mb-3 text-card font-medium">{t('companyName')}</p>
            <p className="mb-6 max-w-[36ch] text-label font-normal text-white/70">{t('tagline')}</p>

            <Link
              href="/#consultation"
              className="mb-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
            >
              {t('contactUs.bookConsultation')}
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0">
                <path
                  d="M3.5 8h9m0 0L8.5 4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={SOCIAL_CIRCLE}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                  <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.6 1.55-4.03 3.92-4.03 1.13 0 2.32.2 2.32.2v2.55h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.91h-2.4v7.04A10 10 0 0 0 22 12Z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={SOCIAL_CIRCLE}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" />
                </svg>
              </a>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={SOCIAL_CIRCLE}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className={COLUMN_HEADING}>{t('studyAbroad.heading')}</p>
            <ul className="flex flex-col gap-2">
              {DESTINATIONS.map((destination) => (
                <li key={destination.key}>
                  <Link href={`/destinations/${destination.slug}`} className={LINK}>
                    {t(`studyAbroad.${destination.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={COLUMN_HEADING}>{t('services.heading')}</p>
            {/* Plain text in the design too: these are not pages. */}
            <ul className="flex flex-col gap-2">
              {SERVICES.map((service) => (
                <li key={service} className="text-label font-normal text-white/60">
                  {t(`services.${service}`)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={COLUMN_HEADING}>{t('company.heading')}</p>
            <ul className="flex flex-col gap-2">
              {COMPANY.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={LINK}>
                    {t(`company.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className={COLUMN_HEADING}>{t('contactUs.heading')}</p>
            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-1 text-label font-medium text-white">
                  {t('contactUs.thailandOffice')}
                </p>
                <p className="mb-2 max-w-[34ch] text-label font-normal text-white/70">
                  {t('contactUs.addressThailand')}
                </p>
                <a href="tel:+66823288445" className="text-label font-medium hover:underline">
                  {t('contactUs.phone')}
                </a>
              </div>

              <div>
                <p className="mb-1 text-label font-medium text-white">
                  {t('contactUs.myanmarOffice')}
                </p>
                <p className="mb-2 max-w-[34ch] text-label font-normal text-white/70">
                  {t('contactUs.addressMyanmar')}
                </p>
                <a
                  href="tel:+959765929492"
                  className="block text-label font-medium hover:underline"
                >
                  {t('contactUs.phoneMyanmar1')}
                </a>
                <a href="tel:+959790839290" className="text-label font-medium hover:underline">
                  {t('contactUs.phoneMyanmar2')}
                </a>
              </div>

              <a
                href={`mailto:${t('contactUs.email')}`}
                className="text-label font-medium hover:underline"
              >
                {t('contactUs.email')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-white/15 pt-6 text-min text-white/60">
          {/* Year comes from the clock, not a literal, so it cannot go stale. */}
          <span>{t('copyright', { year: String(new Date().getFullYear()) })}</span>
          <CookieSettingsButton className="cursor-pointer hover:underline" />
        </div>
      </div>
    </footer>
  )
}
