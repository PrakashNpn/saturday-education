'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Globe, ChevronDown, Menu, X } from 'lucide-react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/shared/utils/cn'

const NAV_LINKS = [
  { labelKey: 'universityFinder', href: '/universities' },
  { labelKey: 'studyDestination', href: '/destinations' },
  { labelKey: 'blogs', href: '/blog' },
  { labelKey: 'aboutUs', href: '/about' },
] as const

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'th', label: 'Thai' },
  { code: 'my', label: 'Myanmar' },
] as const

// ── Language Dropdown ─────────────────────────────────────────────────────────

function LanguageDropdown({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function switchLocale(locale: string) {
    router.replace(pathname, { locale })
    setOpen(false)
  }

  if (mobile) {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-brand-purple text-sm font-medium text-brand-purple hover:border-brand-purple-dark transition-colors duration-150"
        >
          <span className="flex items-center gap-2">
            <Globe size={16} />
            {t('language')}
          </span>
          <ChevronDown
            size={14}
            className={cn('transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
        {open && (
          <div className="mt-1 rounded-xl border border-gray-100 bg-white shadow-md overflow-hidden">
            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => switchLocale(code)}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-brand-purple-50 hover:text-brand-purple transition-colors duration-150"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        className="flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full border border-brand-purple bg-white text-sm font-medium whitespace-nowrap text-brand-purple hover:border-brand-purple-dark transition-colors duration-150"
      >
        <Globe size={16} />
        {t('language')}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden z-50">
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => switchLocale(code)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-purple-50 hover:text-brand-purple transition-colors duration-150"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

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
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/logo/saturday-education.jpeg"
              alt="Saturday Education logo"
              width={44}
              height={44}
              className="rounded-full flex-shrink-0"
              priority
            />
            <span className="text-xl font-bold text-brand-purple leading-tight">
              Saturday Education
            </span>
          </Link>

          {/* ── Desktop Nav Links ──────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {NAV_LINKS.map(({ labelKey, href }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-sm xl:text-base font-medium whitespace-nowrap transition-colors duration-150',
                    isActive
                      ? 'text-brand-purple-dark font-semibold'
                      : 'text-brand-purple hover:text-brand-purple-dark',
                  )}
                >
                  {t(labelKey)}
                </Link>
              )
            })}
          </div>

          {/* ── Desktop Right Controls ─────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Link
              href="/#consultation"
              className="px-4 xl:px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light text-white text-sm font-semibold whitespace-nowrap hover:from-brand-purple-dark hover:to-brand-purple shadow-sm hover:shadow-md transition-all duration-200"
            >
              {t('bookConsultation')}
            </Link>
            <LanguageDropdown />
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
          {NAV_LINKS.map(({ labelKey, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150',
                  isActive
                    ? 'text-brand-purple bg-brand-purple-50 font-semibold'
                    : 'text-gray-700 hover:text-brand-purple hover:bg-gray-50',
                )}
              >
                {t(labelKey)}
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
            <LanguageDropdown mobile />
          </div>
        </div>
      </div>
    </nav>
  )
}
