import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { DEFAULT_LOCALE } from '@/i18n/languages'
import { SOCIAL_LINKS } from '@/shared/constants/social'
import { CookieSettingsButton } from '@/shared/components/consent'

const COLUMN_HEADING = 'mb-3 text-label font-medium tracking-[0.06em] text-white/80 uppercase'
const LINK =
  'text-label font-normal text-white/70 transition-colors hover:text-white hover:underline hover:decoration-action hover:underline-offset-2'

const SERVICES = [
  'counseling', 'application', 'visa', 'scholarships', 'predeparture', 'arrival',
] as const

// Study Destinations and Course Finder replace what used to be a separate
// eleven-link "Study Abroad" column, one link to each destination page. That
// column made the footer very long for links with little real navigational
// value, both the homepage's destinations grid and the /destinations hub
// already cover that job, Course Finder is an actual tool that was missing
// from the footer entirely.
const COMPANY = [
  { key: 'studyDestinations', href: '/destinations' },
  { key: 'guides', href: '/guides' },
  { key: 'courseFinder', href: '/course-finder' },
  { key: 'about', href: '/about' },
  { key: 'careerAssessment', href: '/career-assessment' },
  { key: 'gradeConverter', href: '/grade-converter' },
  { key: 'imat', href: '/imat-practice-test' },
  { key: 'csca', href: '/csca' },
  { key: 'testimonials', href: '/#testimonials' },
  { key: 'contact', href: '/contact' },
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
  'flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-action hover:bg-action hover:text-white'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  // Guides are English-only for now — same rule as the main nav.
  const companyLinks =
    locale === DEFAULT_LOCALE
      ? COMPANY
      : COMPANY.filter((item) => item.key !== 'guides')

  return (
    <footer className="relative overflow-hidden bg-[color-mix(in_srgb,var(--color-action)_40%,black)] py-14 text-white max-tablet:py-10">
      {/* A dark, muted tint of the teal action colour rather than the
          flat neutral bg-structure: real brand colour throughout instead of
          just at the glows, but dark enough to still pair with the
          near-black CTA section directly above it. Same three-glow wash as
          before, lightened back down since the base itself now carries the
          hue, the glows only need to add depth on top, not supply it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(23,126,141,0.2)_0%,rgba(23,126,141,0)_70%),radial-gradient(ellipse_75%_90%_at_0%_50%,rgba(23,126,141,0.22)_0%,rgba(23,126,141,0)_75%),radial-gradient(ellipse_75%_90%_at_100%_50%,rgba(0,51,58,0.22)_0%,rgba(0,51,58,0)_75%)]"
      />
      <div className="relative z-[1] mx-auto max-w-wrap px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Identity, ask, and social. Full width until the four-column layout
              kicks in at lg. */}
          <div className="col-span-2 lg:col-span-1">
            <p className="mb-3 text-card font-medium">{t('companyName')}</p>
            <p className="mb-6 max-w-[36ch] text-label font-normal text-white/70">{t('tagline')}</p>

            <Link
              href="/#consultation"
              className="mb-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-action px-6 text-label font-medium whitespace-nowrap text-white transition-[background-color,box-shadow] duration-300 hover:bg-action-hover hover:shadow-[0_16px_32px_-16px_rgba(23,126,141,0.5)]"
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
              {companyLinks.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={LINK}>
                    {t(`company.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
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

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-white/20 pt-6 text-min text-white/80">
          {/* Year comes from the clock, not a literal, so it cannot go stale. */}
          <span>{t('copyright', { year: String(new Date().getFullYear()) })}</span>
          <CookieSettingsButton className="cursor-pointer hover:underline" />
        </div>
      </div>
    </footer>
  )
}
