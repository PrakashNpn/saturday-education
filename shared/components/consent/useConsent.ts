'use client'

import { useSyncExternalStore } from 'react'
import { CONSENT_STORAGE_KEY } from './config'

export interface Consent {
  analytics: boolean
  /** Advertising / retargeting trackers (Meta Pixel). Kept separate from
   *  analytics so a visitor can accept measurement without accepting ad tracking. */
  marketing: boolean
}

interface StoreState {
  consent: Consent | null
  decided: boolean
  /** true once we've read the visitor's stored choice on the client */
  ready: boolean
  forceOpen: boolean
}

// Constant server/initial snapshot — referentially stable so hydration matches
// and the banner never renders on the server (avoids a flash for decided users).
const SERVER_STATE: StoreState = { consent: null, decided: false, ready: false, forceOpen: false }

let state: StoreState = SERVER_STATE
let hydrated = false
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function setState(patch: Partial<StoreState>) {
  state = { ...state, ...patch }
  emit()
}

function readStorage(): { consent: Consent | null; decided: boolean } {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as { analytics?: boolean; marketing?: boolean }
      return {
        consent: { analytics: !!parsed.analytics, marketing: !!parsed.marketing },
        decided: true,
      }
    }
  } catch {
    /* storage unavailable or corrupt — treat as undecided */
  }
  return { consent: null, decided: false }
}

/** Best-effort removal of Google Analytics cookies when consent is withdrawn. */
function clearAnalyticsCookies() {
  if (typeof document === 'undefined') return
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga') || name === '_gid' || name === '_gat') {
      domains.forEach((d) => {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d ? `; domain=${d}` : ''}`
      })
    }
  })
}

/** Best-effort removal of Meta Pixel cookies when marketing consent is withdrawn. */
function clearMarketingCookies() {
  if (typeof document === 'undefined') return
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name === '_fbp' || name === '_fbc') {
      domains.forEach((d) => {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d ? `; domain=${d}` : ''}`
      })
    }
  })
}

function persist(next: Consent) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ ...next, ts: Date.now() }))
  } catch {
    /* ignore */
  }
  if (!next.analytics) clearAnalyticsCookies()
  if (!next.marketing) clearMarketingCookies()
  setState({ consent: next, decided: true, ready: true, forceOpen: false })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Hydrate from storage once, on the client, after the first commit.
  if (!hydrated) {
    hydrated = true
    const s = readStorage()
    setState({ consent: s.consent, decided: s.decided, ready: true })
  }
  // Keep choices in sync across tabs.
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY) {
      const s = readStorage()
      setState({ consent: s.consent, decided: s.decided })
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

const getSnapshot = () => state
const getServerSnapshot = () => SERVER_STATE

export const consentActions = {
  acceptAll: () => persist({ analytics: true, marketing: true }),
  rejectAll: () => persist({ analytics: false, marketing: false }),
  save: (c: Consent) => persist(c),
  openSettings: () => setState({ forceOpen: true }),
}

export function useConsent() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return {
    consent: s.consent,
    decided: s.decided,
    // Only show on the client, once hydrated and undecided — or when reopened.
    showBanner: (s.ready && !s.decided) || s.forceOpen,
    ...consentActions,
  }
}
