'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// ── Column heading class ──────────────────────────────────────────────────────

const headingCls = 'text-xs font-bold uppercase tracking-widest text-[#590D82] mb-5'
const linkCls = 'text-sm text-gray-500 hover:text-[#590D82] transition-colors duration-200 block'

// ── Study Abroad links ────────────────────────────────────────────────────────

const STUDY_LINKS = [
  { key: 'uk', href: '/destinations/uk' },
  { key: 'usa', href: '/destinations/usa' },
  { key: 'canada', href: '/destinations/canada' },
  { key: 'australia', href: '/destinations/australia' },
  { key: 'singapore', href: '/destinations/singapore' },
  { key: 'thailand', href: '/destinations/thailand' },
  { key: 'ireland', href: '/destinations/ireland' },
  { key: 'newZealand', href: '/destinations/new-zealand' },
] as const

const SERVICE_LINKS = [
  { key: 'counseling', href: '/services/counseling' },
  { key: 'application', href: '/services/application' },
  { key: 'visa', href: '/services/visa' },
  { key: 'scholarships', href: '/services/scholarships' },
  { key: 'predeparture', href: '/services/predeparture' },
  { key: 'arrival', href: '/services/arrival' },
] as const

const COMPANY_LINKS = [
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'testimonials', href: '/#testimonials' },
  { key: 'contact', href: '/#consultation' },
  { key: 'officeTour', href: '/office-tour' },
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
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo/saturday-education.jpeg"
                alt="Saturday Education logo"
                width={44}
                height={44}
                className="rounded-full flex-shrink-0"
              />
              <span className="text-xl font-bold text-[#590D82]">Saturday Education</span>
            </Link>

            {/* Tagline */}
            <p className="mt-5 mb-6 text-gray-500 text-sm leading-relaxed max-w-[300px]">
              {t('tagline')}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-auto">
              <a
                href="#"
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
                href="#"
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
                href="#"
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
                href="#"
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
              {SERVICE_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={linkCls}>
                    {t(`services.${key}`)}
                  </Link>
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

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#590D82] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-500 leading-relaxed">{t('contactUs.address')}</p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#590D82] flex-shrink-0" />
                <a href="tel:+9591234567" className="text-sm text-[#590D82] hover:underline">
                  {t('contactUs.phone')}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#590D82] flex-shrink-0" />
                <a
                  href="mailto:saturdayeducation@gmail.com"
                  className="text-sm text-[#590D82] hover:underline break-all"
                >
                  {t('contactUs.email')}
                </a>
              </div>

              {/* Book Consultation button */}
              <div className="mt-4">
                <Link
                  href="/#consultation"
                  className="inline-flex items-center gap-2 bg-[#590D82] hover:bg-[#4A0A6E] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors duration-300"
                >
                  {t('contactUs.bookConsultation')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-200 pt-6 mt-4">
          <p className="text-center text-gray-400 text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>

      </div>
    </motion.footer>
  )
}
