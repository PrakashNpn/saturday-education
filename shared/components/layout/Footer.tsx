'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { CookieSettingsButton } from '@/shared/components/consent'
import { SOCIAL_LINKS } from '@/shared/constants/social'

// ── Column heading class ──────────────────────────────────────────────────────

const headingCls = 'text-xs font-bold uppercase tracking-widest text-[#590D82] mb-5'
const linkCls = 'text-sm text-gray-500 hover:text-[#590D82] transition-colors duration-200 block'

// ── Study Abroad links ────────────────────────────────────────────────────────

const STUDY_LINKS = [
  { key: 'germany', href: '/destinations/germany' },
  { key: 'ireland', href: '/destinations/ireland' },
  { key: 'malaysia', href: '/destinations/malaysia' },
  { key: 'singapore', href: '/destinations/singapore' },
  { key: 'dubai', href: '/destinations/uae' },
  { key: 'canada', href: '/destinations/canada' },
  { key: 'thailand', href: '/destinations/thailand' },
  { key: 'newZealand', href: '/destinations/new-zealand' },
  { key: 'usa', href: '/destinations/united-states' },
  { key: 'uk', href: '/destinations/united-kingdom' },
  { key: 'australia', href: '/destinations/australia' },
] as const

const SERVICE_LINKS = [
  { key: 'counseling', href: '/services/counseling' },
  { key: 'application', href: '/services/application' },
  { key: 'visa', href: '/services/visa' },
  { key: 'scholarships', href: '/services/scholarships' },
  { key: 'predeparture', href: '/services/predeparture' },
  { key: 'arrival', href: '/services/arrival' },
] as const

// Each office lists its own numbers, so a student calls the right country.
const OFFICES = [
  {
    key: 'thailand',
    officeKey: 'contactUs.thailandOffice',
    addressKey: 'contactUs.addressThailand',
    phones: [{ tel: '+66823288445', labelKey: 'contactUs.phone' }],
  },
  {
    key: 'myanmar',
    officeKey: 'contactUs.myanmarOffice',
    addressKey: 'contactUs.addressMyanmar',
    phones: [
      { tel: '+959765929492', labelKey: 'contactUs.phoneMyanmar1' },
      { tel: '+959790839290', labelKey: 'contactUs.phoneMyanmar2' },
    ],
  },
] as const

const COMPANY_LINKS = [
  { key: 'about', href: '/about' },
  { key: 'careerAssessment', href: '/career-assessment' },
  { key: 'testimonials', href: '/#testimonials' },
  { key: 'contact', href: '/#consultation' },
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
] as const

// ── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-white pt-16 md:pt-20 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Main Grid ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] gap-10 lg:gap-8 pb-12">

          {/* Column 1 — Brand */}
          <div className="md:col-span-2 lg:col-span-1 flex flex-col">
            {/* Logo row */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo/logo.webp"
                alt="Saturday Education"
                width={217}
                height={80}
                className="h-16 w-auto"
              />
            </Link>

            {/* Tagline */}
            <p className="mt-5 mb-6 text-gray-500 text-sm leading-relaxed max-w-[300px]">
              {t('tagline')}
            </p>

            {/* Book Consultation button */}
            <div className="mb-6">
              <Link
                href="/#consultation"
                className="inline-flex items-center gap-2 bg-[#590D82] hover:bg-[#4A0A6E] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors duration-300"
              >
                {t('contactUs.bookConsultation')}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-auto">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border-2 border-[#590D82] flex items-center justify-center text-[#590D82] hover:bg-[#590D82] hover:text-white transition-colors duration-300"
              >
                {/* Facebook */}
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border-2 border-[#590D82] flex items-center justify-center text-[#590D82] hover:bg-[#590D82] hover:text-white transition-colors duration-300"
              >
                {/* Instagram */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border-2 border-[#590D82] flex items-center justify-center text-[#590D82] hover:bg-[#590D82] hover:text-white transition-colors duration-300"
              >
                {/* LinkedIn */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border-2 border-[#590D82] flex items-center justify-center text-[#590D82] hover:bg-[#590D82] hover:text-white transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Study Abroad */}
          <div>
            <h3 className={headingCls}>{t('studyAbroad.heading')}</h3>
            <ul className="space-y-3">
              {STUDY_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={linkCls}>
                    {t(`studyAbroad.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Our Services */}
          <div>
            <h3 className={headingCls}>{t('services.heading')}</h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map(({ key }) => (
                <li key={key}>
                  <span className="text-sm text-gray-500 cursor-default block">
                    {t(`services.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div>
            <h3 className={headingCls}>{t('company.heading')}</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={linkCls}>
                    {t(`company.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact Us */}
          <div>
            <h3 className={headingCls}>{t('contactUs.heading')}</h3>
            <div className="space-y-4">

              {/* Offices, each with its own address and phone numbers */}
              {OFFICES.map(({ key, officeKey, addressKey, phones }) => (
                <div key={key} className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#590D82] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-500 leading-relaxed">
                    <span className="block font-semibold text-gray-700">{t(officeKey)}</span>
                    {t(addressKey)}
                    <span className="flex flex-col items-start gap-1 mt-1.5">
                      {phones.map(({ tel, labelKey }) => (
                        <a
                          key={tel}
                          href={`tel:${tel}`}
                          className="inline-flex items-center gap-1.5 text-[#590D82] hover:underline"
                        >
                          <Phone size={14} className="flex-shrink-0" />
                          {t(labelKey)}
                        </a>
                      ))}
                    </span>
                  </div>
                </div>
              ))}

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#590D82] flex-shrink-0" />
                <a
                  href="mailto:info@saturdayeducation.com"
                  className="text-sm text-[#590D82] hover:underline break-all"
                >
                  {t('contactUs.email')}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-200 pt-6 mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <p className="text-gray-400 text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <span className="hidden sm:inline text-gray-300" aria-hidden="true">·</span>
          <CookieSettingsButton className="text-sm text-gray-400 hover:text-[#590D82] transition-colors" />
        </div>

      </div>
    </motion.footer>
  )
}
