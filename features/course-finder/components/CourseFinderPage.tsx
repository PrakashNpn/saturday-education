'use client'

import { useEffect, useState } from 'react'
import { buildEmbedUrl, type CourseFinderFilters } from '../utils/embed-url'

// The chrome-less build of the finder: it renders no header or footer of its
// own, so it sits directly under our navbar without a second set of navigation.
//
// The src carries the brand colour and, when a student arrives from the
// homepage search, their chosen country, study level and field. See
// utils/embed-url.ts for why those travel as a JSON programFilters param.

interface Props {
  filters: CourseFinderFilters
  translations: {
    frameTitle: string
  }
}

// Firmli's own internal padding around their content, measured directly
// against their page (left edge against "Filters", right edge against the
// "Sort" dropdown). Fixed and the same for every visitor — unlike the
// scrollbar width below, which is not.
const FIRMLI_CONTENT_PADDING_PX = 24

export function CourseFinderPage({ filters, translations: t }: Props) {
  const embedUrl = buildEmbedUrl(filters)

  // The right edge needs to cancel out both Firmli's own padding AND the
  // width their content loses to the iframe's own scrollbar track, which
  // only docks on the right. That track's width isn't fixed — it depends on
  // the visitor's OS and browser (native, thin, or an invisible overlay on
  // Mac and mobile) — so a hardcoded guess would overcorrect for some
  // visitors and undercorrect for others. Measured directly instead: a
  // throwaway scrollable div's own offsetWidth minus its clientWidth is
  // exactly the width the browser reserves for a scrollbar track, and since
  // the same browser/OS renders both that div and the iframe's own
  // scrollbar, measuring it here gives the exact number the iframe needs too.
  const [scrollbarWidth, setScrollbarWidth] = useState(0)
  useEffect(() => {
    const probe = document.createElement('div')
    probe.style.cssText = 'position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll;'
    document.body.appendChild(probe)
    // A one-time client-only DOM measurement after mount, not state derived
    // from props/other state — the standard shape for this, same as
    // measuring window size or a media query match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrollbarWidth(probe.offsetWidth - probe.clientWidth)
    document.body.removeChild(probe)
  }, [])

  return (
    <main>
      {/* The page is the tool, so the only heading is one for screen readers and
          search engines. Nothing is rendered above the frame. */}
      <h1 className="sr-only">{t.frameTitle}</h1>

      {/* max-w-wrap with an unconditional px-6, matching the navbar's own
          container exactly (same max-width, same padding at every width, no
          xl: prefix) rather than only above one breakpoint — verified the
          frame's own edge lines up with the logo at every width tested.
          No top padding, on purpose: Firmli's own page already has ~32px of
          space above "Filters" (measured directly against their page,
          same way as the left/right padding below), so adding our own on
          top of that stacked into a ~70px gap under the navbar, doubled and
          too large — the pb-6 below is bottom spacing only.

          That still isn't the same as the tool's actual content lining up,
          though: Firmli's page has its own padding around its content (see
          FIRMLI_CONTENT_PADDING_PX above), so content sitting flush with our
          frame edge would land inset from the logo on the left and from the
          navbar's own right edge on the right. The wrapper below shifts the
          frame itself outward on both sides to cancel that out, so what a
          visitor actually sees lines up with the navbar, not just the
          invisible iframe boundary around it. Nothing marks that boundary
          (no border, see below), so shifting it is harmless.

          The right side needs more than the left: the iframe keeps its own
          internal scrollbar (see below), which only docks on the right and
          eats into Firmli's usable width there. Its size isn't fixed — native
          on Windows/Linux, thin or an invisible overlay on Mac and mobile —
          so it's measured per visitor (see scrollbarWidth above) rather than
          guessed, and added on top of the padding compensation for the right
          margin specifically. Tried hiding the iframe's own scrollbar first
          (scrollbar-width:none, ::-webkit-scrollbar{display:none}) to avoid
          needing this at all — both are accepted by the browser
          (getComputedStyle confirms it) but neither actually hides an
          iframe's own scrollbar in testing; it isn't a normal CSS overflow
          scrollbar a content-level style can suppress, it's tied to how the
          browser renders the embedded document itself. Measuring and
          compensating for the real width was the only approach that actually
          worked. If Firmli ever changes their own internal padding this
          silently drifts out of alignment again; there's no way to detect
          that from our side since it's cross-origin. */}
      <div className="max-w-wrap mx-auto px-6 pb-6">

        {/* Fixed to roughly one viewport rather than sized to the tool's real
            content, and deliberately kept scrolling internally (its own
            scrollbar) rather than removed — tried removing it once, and it
            broke the filter sidebar's sticky behaviour, not just the visual.
            CSS position:sticky inside the iframe can only pin to scrolling
            that happens INSIDE the iframe's own document; it has no way to
            see or respond to our outer page's scroll. Make the iframe tall
            enough to show all its content with no internal scroll, and
            nothing is scrolling inside it anymore, so the sidebar has
            nothing left to stick to and just gets carried off-screen as the
            outer page scrolls past it. A second scrollbar is the visible
            cost of keeping a working, always-reachable filter panel; that
            trade is worth it. The only real fix is Firmli reporting content
            height so the iframe can be resized while still scrolling
            internally at a size that fits — not something to solve here. */}
        <div
          className="h-[calc(100dvh-6rem)] min-h-[640px]"
          style={{
            marginLeft: `-${FIRMLI_CONTENT_PADDING_PX}px`,
            marginRight: `-${FIRMLI_CONTENT_PADDING_PX + scrollbarWidth}px`,
          }}
        >
          <iframe
            // Keyed on the URL so a student who changes their homepage search
            // and comes back gets a reloaded frame rather than a stale one.
            key={embedUrl}
            src={embedUrl}
            title={t.frameTitle}
            className="block w-full h-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  )
}
