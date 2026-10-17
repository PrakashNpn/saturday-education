import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatNumber } from '../shared/utils/formatNumber'

test('Vietnamese and Indonesian group thousands with a dot', () => {
  assert.equal(formatNumber(1100000, 'vi'), '1.100.000')
  assert.equal(formatNumber(1100000, 'id'), '1.100.000')
})

test('English, Thai, Burmese-less and Filipino use commas', () => {
  assert.equal(formatNumber(1100000, 'en'), '1,100,000')
  assert.equal(formatNumber(1100000, 'th'), '1,100,000')
  assert.equal(formatNumber(1100000, 'fil'), '1,100,000')
})

test('unknown locales fall back to English formatting', () => {
  assert.equal(formatNumber(2500, 'xx'), '2,500')
})
