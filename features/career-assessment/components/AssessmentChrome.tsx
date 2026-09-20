import Image from 'next/image'
import type { ReactNode } from 'react'

interface Props {
  /** The right-hand header slot — "Exit test" while answering, something
   *  else (download / finish) once results are in. */
  headerRight: ReactNode
  children: ReactNode
}

/**
 * Full-screen takeover for everything past the intro: a fixed layer that
 * sits above the site's own header and footer rather than removing them,
 * so nothing about the surrounding page has to change. It carries its own
 * minimal header — logo only, not a link, so the only way out is the
 * deliberate exit action in headerRight — matching the "quiet, uninterrupted
 * setting" the before-you-begin gate promises.
 */
export function AssessmentChrome({ headerRight, children }: Props) {
  return (
    // z-[70]: above the chat widget and the cookie banner (z-50 / z-[60] in
    // the root layout) — both would otherwise float on top of this takeover,
    // which defeats the "quiet, uninterrupted setting" the gate promises.
    <div className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-canvas">
      <header className="sticky top-0 z-40 w-full border-b border-stroke bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-wrap items-center justify-between px-6">
          <Image
            src="/images/logo/logo.webp"
            alt="Saturday Education Consulting"
            width={520}
            height={192}
            priority
            unoptimized
            className="h-10 w-auto"
          />
          {headerRight}
        </div>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
