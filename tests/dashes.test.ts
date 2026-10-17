import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { deDash, stripDashes } from '../shared/utils/dashes'

describe('stripDashes', () => {
  test('a dash between words becomes a comma', () => {
    assert.equal(stripDashes('Science — solid and useful'), 'Science, solid and useful')
    assert.equal(stripDashes('science—solid'), 'science, solid')
    assert.equal(stripDashes('wide – open'), 'wide, open')
  })

  test('a dash between numbers is a range and becomes a hyphen', () => {
    assert.equal(stripDashes('2–4 years'), '2-4 years')
    assert.equal(stripDashes('20 — 30%'), '20-30%')
  })

  test('real hyphens are left alone', () => {
    assert.equal(stripDashes('part-time work on an F-1 visa'), 'part-time work on an F-1 visa')
  })

  test('does not leave doubled commas or runs of spaces', () => {
    assert.equal(stripDashes('yes, — no'), 'yes, no')
    assert.equal(stripDashes('a  b'), 'a b')
  })

  test('keeps surrounding spaces, so streamed text is not glued together', () => {
    assert.equal(stripDashes('hello '), 'hello ')
  })
})

describe('deDash', () => {
  test('also trims the ends', () => {
    assert.equal(deDash('  Selects wine — and serves it.  '), 'Selects wine, and serves it.')
    assert.equal(deDash(''), '')
  })
})
