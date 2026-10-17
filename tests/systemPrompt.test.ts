import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSystemPrompt, SYSTEM_PROMPT } from '../features/ai-advisor/prompts/system'

describe('buildSystemPrompt', () => {
  test('always starts with the base prompt and tells the model to match the student language', () => {
    for (const l of [undefined, 'en', 'th', 'my', 'vi', 'fil', 'id']) {
      const p = buildSystemPrompt(l)
      assert.ok(p.startsWith(SYSTEM_PROMPT))
      assert.match(p, /Match the student's language/)
    }
  })

  test('names the default language for each locale', () => {
    assert.match(buildSystemPrompt('th'), /default to Thai/)
    assert.match(buildSystemPrompt('vi'), /default to Vietnamese/)
    assert.match(buildSystemPrompt('id'), /default to Indonesian/)
    assert.match(buildSystemPrompt('fil'), /default to Filipino/)
    assert.match(buildSystemPrompt('my'), /default to Burmese/)
    assert.match(buildSystemPrompt('en'), /default to English/)
    assert.match(buildSystemPrompt('xx'), /default to English/)
  })

  test('only Filipino and Burmese get extra style guidance', () => {
    assert.match(buildSystemPrompt('fil'), /Taglish/)
    assert.match(buildSystemPrompt('my'), /spoken style/)
    assert.ok(!/Taglish|spoken style/.test(buildSystemPrompt('vi')))
  })
})
