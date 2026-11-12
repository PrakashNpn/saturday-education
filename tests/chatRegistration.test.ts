import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useChat } from '../features/ai-advisor/hooks/useChat'

function renderChat(values: Record<string, string>, blockedStorage = false) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const previousStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {} })
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (key: string) => {
      if (blockedStorage) throw new Error('Storage disabled')
      return values[key] ?? null
    },
  } })
  try {
    function Harness() {
      const chat = useChat('Welcome', 'en')
      return createElement('span', null, chat.gated ? 'register' : 'chat')
    }
    return renderToStaticMarkup(createElement(Harness)) === '<span>register</span>'
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow)
    else Reflect.deleteProperty(globalThis, 'window')
    if (previousStorage) Object.defineProperty(globalThis, 'localStorage', previousStorage)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
}

test('a fresh visitor must register before the first question', () => {
  assert.equal(renderChat({}), true)
})

test('old question counts no longer grant free questions and unsaved histories stay gated', () => {
  for (const count of ['0', '1', '2', '3', '100']) {
    assert.equal(renderChat({ 'saturday-chat-questions': count }), true)
  }
  assert.equal(renderChat({ 'saturday-chat-history': JSON.stringify([
    { id: '1', role: 'assistant', content: 'Welcome' },
    { id: '2', role: 'user', content: 'An earlier free question' },
  ]) }), true)
})

test('returning registered visitors remain unlocked even after clearing history', () => {
  assert.equal(renderChat({ 'saturday-chat-lead-sent': '1' }), false)
  // An older saved lead marker remains compatible with the new upfront flow.
  assert.equal(renderChat({ 'saturday-chat-history': JSON.stringify([
    { id: '1', role: 'assistant', content: 'Thank you [[lead-saved]]' },
  ]) }), false)
})

test('unavailable storage does not bypass registration or crash the chat', () => {
  assert.equal(renderChat({}, true), true)
})
