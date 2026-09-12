'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/shared/utils/cn'

type NavItem = { labelKey: string; href: string }

const NAV_LINKS: NavItem[] = [
  { labelKey: 'studyDestination', href: '/destinations' },
  { labelKey: 'courseFinder', href: '/course-finder' },
  { labelKey: 'careerAssessment', href: '/career-assessment' },
  { labelKey: 'aboutUs', href: '/about' },
]

// Names, not translations: a switcher has to show every language's own name
// regardless of which locale is currently active, so these can't come from
// the message files the way the rest of the nav's labels do. Thai is a real
// routed locale but isn't offered here yet — most of its content is still
// English placeholder copy, and pointing someone at that from a language
// picker would read as broken rather than unfinished. Add it back here the
// day it's actually translated.
const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'my', label: 'Myanmar' },
] as const

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

/** Swaps locale for the page you're already on rather than bouncing to the
 *  home page — `pathname` from next-intl's navigation is already
 *  locale-stripped, so the same value works as the target `href` under any
 *  of the options below. A plain `<Link locale=...>` per option rather than
 *  a native `<select>`: it's a real link (crawlable, works with no JS,
 *  carries the current path), which a select's onChange cannot offer. */
function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onClickAway = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [open])

  const current = LANGUAGE_OPTIONS.find((o) => o.code === locale) ?? LANGUAGE_OPTIONS[0]

  return (
    <span ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1.5 opacity-80 hover:opacity-100"
      >
        <GlobeIcon />
        {current.label}
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <span
          role="menu"
          className="absolute top-full right-0 z-40 mt-2 min-w-[7.5rem] overflow-hidden rounded-md border border-white/10 bg-structure py-1 text-left shadow-lg"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <Link
              key={option.code}
              href={pathname}
              locale={option.code}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                'block px-3 py-2 whitespace-nowrap hover:bg-white/10',
                option.code === locale ? 'text-white' : 'text-white/70',
              )}
            >
              {option.label}
            </Link>
          ))}
        </span>
      )}
    </span>
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

  // The design drops the utility bar on these two pages specifically — both
  // are full-width tools (course finder's embedded iframe, the assessment's
  // own takeover chrome) where the extra band just eats into limited height.
  // Every other page keeps it.
  const hideUtilityBar = pathname === '/course-finder' || pathname === '/career-assessment'

  return (
    <>
      {/* ── Utility bar ─────────────────────────────────────────────────────
          Deliberately not sticky: it scrolls away and only the header below
          pins. Black rather than purple, so the two full-width bands on every
          page do not spend the brand colour on furniture. */}
      {!hideUtilityBar && (
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
              <LanguageSwitcher />
            </span>
          </div>
        </div>
      )}

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
              unoptimized
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
