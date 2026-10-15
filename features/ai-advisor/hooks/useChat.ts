'use client'

import { useEffect, useRef, useState } from 'react'
import type { Message } from '../types'
import { LEAD_KNOWN_MARKER, markLeadSaved, readLeadMarker } from '../utils/leadMarkers'

const STORAGE_KEY = 'saturday-chat-history'
// Kept apart from the history so that Clear chat does not hand out fresh free
// answers, and so a student who already sent their details is not asked again.
const QUESTIONS_KEY = 'saturday-chat-questions'
const LEAD_SENT_KEY = 'saturday-chat-lead-sent'
const MAX_STORED = 40
const MAX_API_MESSAGES = 20

/** How many questions a student can ask before the chat needs their details. */
export const FREE_QUESTIONS = 3

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
  const [questionCount, setQuestionCount] = useState(() => Number(readStored(QUESTIONS_KEY)) || 0)
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
  // After the free questions the chat asks for details before it goes on.
  const gated = !leadSent && questionCount >= FREE_QUESTIONS

  async function sendMessage(content: string) {
    if (!content.trim() || isStreaming || gated) return

    const nextCount = questionCount + 1
    setQuestionCount(nextCount)
    writeStored(QUESTIONS_KEY, String(nextCount))

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

  /** Records that the details were sent, in the message's own text so it
   *  survives a reload and the server sees it on the next turn, and on the
   *  device so a cleared chat does not ask again. */
  function markLeadSent(messageId: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, content: markLeadSaved(m.content) } : m)),
    )
    setLeadKnown(true)
    writeStored(LEAD_SENT_KEY, '1')
  }

  function clearHistory() {
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY)
    setMessages(makeWelcome(initialMessage))
  }

  return { messages, isStreaming, gated, leadSent, sendMessage, markLeadSent, clearHistory }
}
