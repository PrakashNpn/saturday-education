'use client'

import { useSyncExternalStore } from 'react'

/** Whether a CSS media query currently matches. False on the server and on the
 *  first client render, then follows the browser (including when it changes). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
