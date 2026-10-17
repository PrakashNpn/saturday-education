'use client'

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { PhoneFieldProps } from './PhoneField'

// Nothing is downloaded until the field is first rendered, which only happens once
// it is wanted (see below); React.lazy leaves no preload hint in the page.
const PhoneField = lazy(() => import('./PhoneField'))

/**
 * The phone field for a form lower on a page. The real field (about 400 KB of
 * flags and phone metadata) is only downloaded once the visitor scrolls within
 * a screen or two of it, or touches the placeholder; until then a plain input
 * of the same height stands in, so nothing on the page moves when it swaps.
 */
export function LazyPhoneField(props: PhoneFieldProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [wanted, setWanted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || wanted) return
    if (typeof IntersectionObserver === 'undefined') {
      // No observer support: load it right away rather than never.
      const timer = setTimeout(() => setWanted(true), 0)
      return () => clearTimeout(timer)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setWanted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '1200px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [wanted])

  const placeholder = (
    <div className="phone-field">
      <input
        type="tel"
        readOnly
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        onFocus={() => setWanted(true)}
        onPointerDown={() => setWanted(true)}
        className={props.inputClassName}
      />
    </div>
  )

  return (
    <div ref={ref}>
      {wanted ? (
        <Suspense fallback={placeholder}>
          <PhoneField {...props} />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  )
}
