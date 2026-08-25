'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/shared/utils/cn'

type NavItem = { labelKey: string; href: string }

const NAV_LINKS: NavItem[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'careerAssessment', href: '/career-assessment' },
  { labelKey: 'courseFinder', href: '/course-finder' },
  // HIDDEN: universities feature temporarily disabled — uncomment to restore
  // { labelKey: 'universityFinder', href: '/universities' },
  { labelKey: 'studyDestination', href: '/destinations' },
  { labelKey: 'aboutUs', href: '/about' },
]

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu on route change — reset-on-prop-change during render
  // (avoids a setState-in-effect that triggers an extra render pass).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
  }

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-200',
        isScrolled ? 'shadow-sm' : 'border-b border-gray-100',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ──────────────────────────────────────────── */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo/logo.webp"
              alt="Saturday Education"
              width={217}
              height={80}
              className="h-15 w-auto"
              priority
            />
          </Link>

          {/* ── Desktop Nav + CTA (right-aligned) ─────────────── */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative pb-1.5 text-sm xl:text-base font-medium whitespace-nowrap transition-colors duration-150',
                    isActive ? 'text-brand-purple-dark font-semibold' : 'text-brand-purple hover:text-brand-purple-dark',
                  )}
                >
                  {t(item.labelKey)}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-brand-purple"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
            <Link
              href="/#consultation"
              className="px-4 xl:px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light text-white text-sm font-semibold whitespace-nowrap hover:from-brand-purple-dark hover:to-brand-purple shadow-sm hover:shadow-md transition-all duration-200"
            >
              {t('bookConsultation')}
            </Link>
          </div>

          {/* ── Mobile Hamburger ───────────────────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-brand-purple hover:bg-gray-50 transition-colors duration-150"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Panel ────────────────────────────────── */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="border-t border-gray-100 bg-white px-4 py-6 space-y-1">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150',
                  isActive ? 'text-brand-purple bg-brand-purple-50 font-semibold' : 'text-gray-700 hover:text-brand-purple hover:bg-gray-50',
                )}
              >
                {t(item.labelKey)}
              </Link>
            )
          })}

          <div className="pt-4 space-y-3 border-t border-gray-100 mt-4">
            <Link
              href="/#consultation"
              className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light text-white text-sm font-semibold hover:from-brand-purple-dark hover:to-brand-purple shadow-sm transition-all duration-200"
            >
              {t('bookConsultation')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
