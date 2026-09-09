'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/shared/utils/cn'

type NavItem = { labelKey: string; href: string }

const NAV_LINKS: NavItem[] = [
  { labelKey: 'studyDestination', href: '/destinations' },
  { labelKey: 'courseFinder', href: '/course-finder' },
  { labelKey: 'careerAssessment', href: '/career-assessment' },
  { labelKey: 'aboutUs', href: '/about' },
]

/** The design's own globe, not the lucide one — thinner stroke, and it has to
 *  sit at 14px beside 12px text without going muddy. */
function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5 shrink-0">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1.5 8h13M8 1.5c1.8 1.8 2.8 4.2 2.8 6.5S9.8 12.7 8 14.5c-1.8-1.8-2.8-4.2-2.8-6.5S6.2 3.3 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default function Navbar() {
  const t = useTranslations('nav')
  const tBar = useTranslations('topBar')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Close the mobile menu on route change — reset-on-prop-change during render
  // rather than a setState in an effect, which would cost an extra pass.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* ── Utility bar ─────────────────────────────────────────────────────
          Deliberately not sticky: it scrolls away and only the header below
          pins. Black rather than purple, so the two full-width bands on every
          page do not spend the brand colour on furniture. */}
      <div className="relative z-30 bg-structure text-white text-min">
        <div className="mx-auto flex min-h-[34px] max-w-wrap flex-wrap items-center justify-between gap-6 px-6 max-tablet:min-h-0 max-tablet:py-1.5">
          <div className="flex items-center gap-2 font-normal opacity-80">
            <span>{tBar('locations')}</span>
          </div>

          <span className="flex items-center gap-6 font-normal">
            <a
              href={tBar('phoneHref')}
              className="hover:underline hover:underline-offset-2"
            >
              {tBar('phone')}
            </a>
            {/* Static, matching the design. There is no locale switcher on the
                site yet; this names the current language rather than offering
                a choice, so it is a label and not a dead control. */}
            <span className="flex items-center gap-1.5 opacity-80">
              <GlobeIcon />
              {t('language')}
            </span>
          </span>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-stroke bg-surface">
        <div className="mx-auto flex min-h-[62px] max-w-wrap items-center justify-between gap-6 px-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo/logo.webp"
              alt="Saturday Education Consulting"
              width={520}
              height={192}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-8 max-tablet:hidden">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'text-label font-normal hover:text-link hover:underline hover:underline-offset-4',
                      isActive(item.href)
                        ? 'text-link underline underline-offset-4'
                        : 'text-primary-text',
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Not in the design, which hides the nav below 860px and puts
              nothing in its place. Added because every route would otherwise
              be unreachable on a phone. */}
          <button
            type="button"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="hidden max-tablet:inline-flex items-center justify-center -mr-2 p-2 text-primary-text hover:text-link"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          className={cn(
            'hidden max-tablet:block overflow-hidden transition-[max-height] duration-300 ease-out',
            mobileOpen ? 'max-h-96' : 'max-h-0',
          )}
        >
          <ul className="border-t border-stroke bg-surface px-6 py-2">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block py-3 text-label font-normal',
                    isActive(item.href) ? 'text-link' : 'text-primary-text',
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  )
}
