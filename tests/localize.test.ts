import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { columns, localize } from '../features/destination/utils/localize'

describe('localize', () => {
  const tr = columns('ไทย', 'မြန်မာ', 'Tiếng Việt', 'Filipino', 'Indonesia')

  test('picks the column for each locale, mapping idn to id', () => {
    assert.equal(localize('English', tr, 'th'), 'ไทย')
    assert.equal(localize('English', tr, 'my'), 'မြန်မာ')
    assert.equal(localize('English', tr, 'vi'), 'Tiếng Việt')
    assert.equal(localize('English', tr, 'fil'), 'Filipino')
    assert.equal(localize('English', tr, 'id'), 'Indonesia')
  })

  test('English and unknown locales always resolve to the English base', () => {
    assert.equal(localize('English', tr, 'en'), 'English')
    assert.equal(localize('English', tr, 'xx'), 'English')
  })

  test('null or empty translations fall back to English, so a blank cell never blanks the page', () => {
    const partial = columns(null, '', null, 'Filipino', null)
    assert.equal(localize('English', partial, 'th'), 'English')
    assert.equal(localize('English', partial, 'my'), 'English')
    assert.equal(localize('English', partial, 'fil'), 'Filipino')
  })

  test('a null English base stays null when nothing is translated', () => {
    assert.equal(localize<string | null>(null, columns(null, null, null, null, null), 'vi'), null)
  })
})
