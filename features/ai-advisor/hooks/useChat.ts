'use client'

import { useEffect, useRef, useState } from 'react'
import type { Message } from '../types'

const STORAGE_KEY = 'saturday-chat-history'
const MAX_STORED = 40
const MAX_API_MESSAGES = 20

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

  async function sendMessage(content: string) {
    if (!content.trim() || isStreaming) return

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

  function clearHistory() {
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY)
    setMessages(makeWelcome(initialMessage))
  }

  return { messages, isStreaming, sendMessage, clearHistory }
}
