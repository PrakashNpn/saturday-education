/* eslint-disable @next/next/no-html-link-for-pages -- this file renders outside
   the [locale] tree, so the locale-aware Link from @/i18n/navigation has no
   context to resolve against. A plain anchor lets the proxy pick the locale on
   the next request, which is what we want from a dead end anyway. */

// Root 404. Next only uses a segment's not-found.tsx for notFound() calls made
// inside that segment; a URL that matches no route at all lands here instead.
// Without this file Next falls back to its own unstyled black page.
//
// The root layout is a pass-through with no <html>/<body>, so this supplies its
// own — and its own font, since it renders outside the locale layout. English
// only: an unmatched URL carries no locale to translate into.
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Page not found',
}

const LINKS = [
  { href: '/destinations', label: 'Study destinations' },
  { href: '/course-finder', label: 'Course finder' },
  { href: '/career-assessment', label: 'Career assessment' },
  { href: '/about', label: 'About us' },
]

export default function NotFound() {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="bg-canvas font-sans text-body font-light text-primary-text antialiased">
        <main className="mx-auto flex min-h-screen max-w-wrap flex-col items-center justify-center px-6 py-24 text-center">
          <p className="text-min font-medium tracking-[0.06em] text-muted-text uppercase">
            Error 404
          </p>
          <h1 className="mt-2 text-title font-medium tracking-tight text-primary-text">
            This page does not exist
          </h1>
          <p className="mt-3 max-w-[46ch] text-body leading-relaxed font-normal text-secondary-text">
            The page you are looking for may have moved, or the link that brought you here
            may be out of date.
          </p>

          <a
            href="/"
            className="mt-8 inline-flex min-h-13 items-center justify-center rounded-full bg-action px-10 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
          >
            Go to homepage
          </a>

          <div className="mt-10 border-t border-stroke pt-6">
            <p className="mb-3 text-label font-normal text-muted-text">Or try one of these</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-label font-medium text-action underline-offset-4 transition-colors hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
