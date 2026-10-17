'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'
import type { AdvisorResult } from '../components/comparison/shared'

/**
 * State for the AI advisor panel beside the comparison: open or closed, the
 * request in flight, and its result. Changing either university drops whatever
 * is on screen (and re-runs the analysis if the panel is open).
 */
export function useComparisonAdvisor(universities: ComparisonUniversity[], leftId: string, rightId: string) {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<AdvisorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  /**
   * The route streams the model's reply, but the reply is a single JSON object,
   * so there is nothing meaningful to show until it is complete. Hence the
   * skeleton rather than progressive text.
   */
  const run = useCallback(async () => {
    const uni1 = universities.find((u) => u.id === leftId) ?? universities[0]
    const uni2 = universities.find((u) => u.id === rightId) ?? universities[1]
    if (!uni1 || !uni2) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setResult(null)
    setFailed(false)
    setLoading(true)

    try {
      const response = await fetch('/api/comparison-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uni1, uni2, locale }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) throw new Error('request failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let text = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
      }

      // The model occasionally wraps the object in a sentence, so take the
      // outermost braces rather than trusting the whole body to be JSON.
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('no json')
      const parsed = JSON.parse(match[0]) as AdvisorResult
      if (!parsed.verdict || !Array.isArray(parsed.questions)) throw new Error('bad shape')
      setResult(parsed)
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setFailed(true)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [leftId, rightId, universities, locale])

  // Changing either university invalidates whatever is on screen. If the panel
  // is open the analysis is re-run; if it is closed the stale result is simply
  // dropped so the next open starts fresh.
  const pairRef = useRef(`${leftId}|${rightId}`)
  useEffect(() => {
    const pair = `${leftId}|${rightId}`
    if (pair === pairRef.current) return
    pairRef.current = pair
    abortRef.current?.abort()
    setResult(null)
    setFailed(false)
    setLoading(false)
    if (open) void run()
  }, [leftId, rightId, open, run])

  useEffect(() => () => abortRef.current?.abort(), [])

  function openAdvisor() {
    setOpen(true)
    if (!result && !loading) void run()
  }

  return { open, result, loading, failed, openAdvisor, close: () => setOpen(false), retry: () => void run() }
}
