'use client'

import { useEffect } from 'react'

/**
 * Confirms before the user leaves the current page via client-side navigation
 * (Next.js <Link> clicks) or the browser Back/Forward buttons, while `enabled`.
 * Pairs with a `beforeunload` handler (which covers refresh / tab close).
 */
export function useNavigationGuard(enabled: boolean, message: string) {
  useEffect(() => {
    if (!enabled) return

    // 1) Intercept in-app link clicks (capture phase, to beat the framework's handler).
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement | null)?.closest?.('a')
      if (!anchor) return
      const target = anchor.getAttribute('target')
      if (target && target !== '_self') return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return

      let url: URL
      try {
        url = new URL((anchor as HTMLAnchorElement).href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return // external → covered by beforeunload
      if (url.pathname === window.location.pathname && url.search === window.location.search) return // same page

      if (!window.confirm(message)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    document.addEventListener('click', onClick, true)

    // 2) Intercept Back / Forward. Push a sentinel entry so the first "back" lands here.
    const pushSentinel = () => window.history.pushState(null, '', window.location.href)
    pushSentinel()
    function onPopState() {
      if (window.confirm(message)) {
        window.removeEventListener('popstate', onPopState)
        window.history.back() // proceed to the real previous entry
      } else {
        pushSentinel() // cancel the navigation, stay put
      }
    }
    window.addEventListener('popstate', onPopState)

    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('popstate', onPopState)
    }
  }, [enabled, message])
}
