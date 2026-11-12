'use client'

import { useEffect, useRef, useState } from 'react'
import type { Message } from '../types'
import { LEAD_KNOWN_MARKER, readLeadMarker } from '../utils/leadMarkers'

const STORAGE_KEY = 'saturday-chat-history'
// Kept apart from history so clearing the chat does not ask for details again.
const LEAD_SENT_KEY = 'saturday-chat-lead-sent'
const MAX_STORED = 40
const MAX_API_MESSAGES = 20

function readStored(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage unavailable or full: the gate still works for this page view.
  }
}

function makeId() {
  return typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)
}

function loadFromStorage(initialMessage: string): Message[] {
  if (typeof window === 'undefined') return makeWelcome(initialMessage)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return makeWelcome(initialMessage)
    const parsed = JSON.parse(raw) as Message[]
    if (!Array.isArray(parsed) || parsed.length === 0) return makeWelcome(initialMessage)
    return parsed
  } catch {
    return makeWelcome(initialMessage)
  }
}

function makeWelcome(content: string): Message[] {
  return [{ id: makeId(), role: 'assistant', content }]
}

export function useChat(initialMessage: string, locale?: string) {
  const [messages, setMessages] = useState<Message[]>(() => loadFromStorage(initialMessage))
  const [isStreaming, setIsStreaming] = useState(false)
  const [leadKnown, setLeadKnown] = useState(() => readStored(LEAD_SENT_KEY) === '1')
  const abortRef = useRef<AbortController | null>(null)

  // Persist to localStorage whenever messages change
  useEffect(() => {
    if (typeof window === 'undefined') return
    const trimmed = messages.slice(-MAX_STORED)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    } catch {
      // Storage quota exceeded — silently ignore
    }
  }, [messages])

  const leadSent = leadKnown || messages.some((m) => readLeadMarker(m.content)?.status === 'saved')
  // Contact registration is required before the first message.
  const gated = !leadSent

  async function sendMessage(content: string) {
    if (!content.trim() || isStreaming || gated) return

    // Abort any previous request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const userMsg: Message = { id: makeId(), role: 'user', content: content.trim() }
    const assistantId = makeId()
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '' }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setIsStreaming(true)

    try {
      // Send only last N messages to avoid token bloat (include new userMsg)
      const historyToSend = [...messages, userMsg].slice(-MAX_API_MESSAGES)

      // A student who sent their details in an earlier chat has no marker in
      // this one. Tell the server in what it receives, not in what is shown.
      if (leadKnown) {
        const first = historyToSend.findIndex((m) => m.role === 'assistant')
        if (first >= 0) {
          historyToSend[first] = {
            ...historyToSend[first],
            content: `${historyToSend[first].content} ${LEAD_KNOWN_MARKER}`,
          }
        }
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend, locale }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        const busy = res.status === 503 || res.status === 429
        const errorText = busy
          ? "I'm getting a lot of questions right now. Please try again in a moment."
          : 'Sorry, something went wrong. Please try again.'
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: errorText } : m)),
        )
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m,
          ),
        )
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: 'Sorry, something went wrong. Please try again.' }
            : m,
        ),
      )
    } finally {
      setIsStreaming(false)
    }
  }

  /** Remember successful registration on this device without storing contact
   *  fields in chat history. The next model request receives a known marker. */
  function markLeadSent() {
    setLeadKnown(true)
    writeStored(LEAD_SENT_KEY, '1')
  }

  function clearHistory() {
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* Keep clearing usable when storage is unavailable. */ }
    setMessages(makeWelcome(initialMessage))
  }

  return { messages, isStreaming, gated, leadSent, sendMessage, markLeadSent, clearHistory }
}
