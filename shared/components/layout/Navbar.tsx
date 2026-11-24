'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X, ChevronDown, Phone, MapPin, Stethoscope, BookOpen, GraduationCap, ArrowRight } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { LANGUAGES, LOCALE_CODES } from '@/i18n/languages'
import { cn } from '@/shared/utils/cn'

type NavItem = { labelKey: string; href: string; children?: { labelKey: string; descriptionKey: string; href: string }[] }

const NAV_LINKS: NavItem[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'courseFinder', href: '/course-finder' },
  { labelKey: 'studyDestination', href: '/destinations' },
  { labelKey: 'careerAssessment', href: '/career-assessment' },
  { labelKey: 'tools', href: '/grade-converter', children: [
    { labelKey: 'gradeConverter', descriptionKey: 'gradeConverterDescription', href: '/grade-converter' },
  ] },
  { labelKey: 'practiceTests', href: '/imat-practice-test', children: [
    { labelKey: 'imat', descriptionKey: 'imatDescription', href: '/imat-practice-test' },
    { labelKey: 'csca', descriptionKey: 'cscaDescription', href: '/csca' },
  ] },
  { labelKey: 'aboutUs', href: '/about' },
]

function navChildIcon(labelKey: string) {
  if (labelKey === 'csca') return <BookOpen size={19} strokeWidth={1.7} aria-hidden="true" />
  if (labelKey === 'gradeConverter') return <GraduationCap size={19} strokeWidth={1.7} aria-hidden="true" />
  return <Stethoscope size={19} strokeWidth={1.7} aria-hidden="true" />
}

// Names, not translations: a switcher has to show every language's own name
// regardless of which locale is currently active, so these can't come from
// the message files the way the rest of the nav's labels do. The names, flags
// and which languages are offered live in i18n/languages.ts. Myanmar is a real
// routed locale but is not offered yet (awaiting team review); Vietnamese,
// Filipino and Indonesian are offered while being reviewed locally, so check
// the `inSwitcher` flags again before deploying.
// The flag is the country whose flag best represents the language, from the
// same /images/flags assets the destination pickers use.
const LANGUAGE_OPTIONS = LOCALE_CODES.filter((code) => LANGUAGES[code].inSwitcher).map((code) => ({
  code,
  label: LANGUAGES[code].nativeName,
  flag: LANGUAGES[code].flag,
}))

/** Clipped into a circle the same way DestinationCard's flag badges are,
 *  rather than left as the source rectangle, so it reads as a small token
 *  beside text instead of a tiny photo. */
function FlagIcon({ code }: { code: string }) {
  return (
    <span className="relative size-4 shrink-0 overflow-hidden rounded-full border border-stroke/70">
      <Image src={`/images/flags/${code}.png`} alt="" fill unoptimized sizes="16px" className="object-cover" />
    </span>
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
        className="flex cursor-pointer items-center gap-1.5 text-white/80 transition-colors hover:text-white"
      >
        <FlagIcon code={current.flag} />
        {current.label}
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <span
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 min-w-[8.5rem] overflow-hidden rounded-xl border border-stroke/70 bg-white/90 py-1.5 text-left shadow-[0_12px_32px_-8px_rgba(0,51,58,0.2),0_4px_12px_-4px_rgba(0,51,58,0.1)] backdrop-blur-md"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <Link
              key={option.code}
              href={pathname}
              locale={option.code}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-label whitespace-nowrap transition-colors hover:bg-tint hover:text-link',
                option.code === locale ? 'bg-tint font-medium text-link' : 'text-primary-text',
              )}
            >
              <FlagIcon code={option.flag} />
              {option.label}
            </Link>
          ))}
        </span>
      )}
    </span>
  )
}

function NavDropdown({ item, mobile = false }: { item: NavItem; mobile?: boolean }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLLIElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const active = item.children?.some(child => pathname === child.href || pathname.startsWith(child.href + '/'))

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  return <li ref={root} className="relative"
    onPointerEnter={event => { if (!mobile && event.pointerType === 'mouse') setOpen(true) }}
    onPointerLeave={event => {
      if (!mobile && event.pointerType === 'mouse' && !root.current?.contains(document.activeElement)) setOpen(false)
    }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
    onKeyDown={event => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() }
    }}>
    <button ref={trigger} type="button" aria-expanded={open} aria-controls={panelId}
      onClick={() => setOpen(value => !value)}
      className={cn('flex cursor-pointer items-center gap-1.5 text-label font-normal transition-colors hover:text-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action',
        mobile ? 'w-full justify-between py-3' : 'whitespace-nowrap border-b-2 px-2.5 py-1.5',
        active ? 'border-action font-medium text-action' : 'border-transparent text-primary-text')}>
      {t(item.labelKey)}<ChevronDown aria-hidden="true" size={14} className={cn('transition-transform motion-reduce:transition-none', open && 'rotate-180')} />
    </button>
    {open && <div className={mobile ? 'mb-2' : 'absolute left-0 top-full z-30 w-64 pt-3'}>
      <ul id={panelId} className={mobile ? 'border-l-2 border-action/20 pl-2' : 'rounded-xl border border-stroke bg-surface p-1.5 shadow-[0_12px_32px_-12px_rgba(0,51,58,0.25)]'}>
      {item.children?.map(child => <li key={child.href}>
        <Link href={child.href} onClick={() => setOpen(false)} aria-current={pathname === child.href ? 'page' : undefined}
          className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-tint focus-visible:bg-tint focus-visible:outline-2 focus-visible:outline-action">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-tint text-action">
            {navChildIcon(child.labelKey)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-label font-semibold text-deep">{t(child.labelKey)}</span>
            <span className="mt-0.5 block text-min leading-relaxed text-secondary-text">{t(child.descriptionKey)}</span>
          </span>
          <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-action/60 transition-colors group-hover:text-action group-focus-visible:text-action" />
        </Link>
      </li>)}
      </ul>
    </div>}
  </li>
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
          pins. Always rendered — there's no pathname check here, because the
          one place it actually needs to disappear (mid-assessment) already
          happens for free: AssessmentChrome covers the whole viewport with
          a fixed, higher-z-index takeover once the test itself starts, the
          same way it hides the main nav links, so this bar needs no matching
          logic of its own.
          z-40, above the career assessment page's own sticky mode tabs
          (z-30): both this bar and that sticky bar sit in the same global
          stacking order (neither's ancestor establishes a contained stacking
          context), so at equal z-index the one later in the DOM — the page
          content, not this bar — would win and paint over the language
          dropdown below. */}
      <div className="relative z-40 bg-structure text-white text-min">
        <div className="mx-auto flex min-h-[34px] max-w-wrap flex-wrap items-center justify-between gap-6 px-6 max-tablet:min-h-0 max-tablet:py-1.5">
          {/* Locations and the phone+language cluster together measure wider
              than the content area on almost any phone (confirmed: ~378px
              needed against ~342px available at 390px wide), so this wraps
              to two lines on real devices. Locations is the least essential
              of the three on a phone — it's still in the footer — so it
              drops first rather than everything shrinking to fit. */}
          <div className="flex items-center gap-1.5 font-normal opacity-80 max-tablet:hidden">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span>{tBar('locations')}</span>
          </div>

          <span className="flex items-center gap-6 font-normal max-tablet:w-full max-tablet:justify-between max-tablet:gap-3">
            <a
              href={tBar('phoneHref')}
              className="flex items-center gap-1.5 hover:underline hover:underline-offset-2"
            >
              <Phone className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {tBar('phone')}
            </a>
            <LanguageSwitcher />
          </span>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      {/* Above page-level sticky tabs (z-30), below the utility switcher (z-40). */}
      <header className="sticky top-0 z-[35] border-b border-stroke bg-surface">
        <div className="mx-auto flex min-h-[62px] max-w-wrap items-center justify-between gap-6 px-6">
          <Link href="/" className="shrink-0" onClick={event => {
            // Same-route navigation does not reliably reset scroll in Next.js.
            // Preserve normal new-tab behaviour and navigation from other pages.
            if (pathname !== '/' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            event.preventDefault()
            setMobileOpen(false)
            window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
          }}>
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

          <nav aria-label={t('mainNavigation')}>
            <ul className="flex items-center gap-1 max-lg:hidden">
              {NAV_LINKS.map((item) => item.children ? <NavDropdown key={`${pathname}-${item.labelKey}`} item={item} /> : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      // border-b-2 always present (colour toggles, not width),
                      // so an item's own size never shifts between its
                      // resting, hover and active states. Same mechanic the
                      // Destinations page's region tabs already use.
                      'block whitespace-nowrap border-b-2 px-2.5 py-1.5 text-label font-normal transition-colors hover:text-link',
                      isActive(item.href)
                        ? 'border-action text-link font-medium'
                        : 'border-transparent text-primary-text',
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collapse below 1024px so the expanded navigation has room. */}
          <button
            type="button"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="hidden max-lg:inline-flex items-center justify-center -mr-2 p-2 text-primary-text hover:text-link"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          inert={!mobileOpen}
          className={cn(
            'hidden max-lg:block overflow-hidden transition-[max-height] duration-300 ease-out',
            mobileOpen ? 'max-h-[70dvh] overflow-y-auto' : 'max-h-0',
          )}
        >
          <ul className="border-t border-stroke bg-surface px-6 py-2">
            {NAV_LINKS.map((item) => item.children ? <NavDropdown key={`${pathname}-${mobileOpen}-${item.labelKey}`} item={item} mobile /> : (
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
