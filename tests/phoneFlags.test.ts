// The phone field's country list draws flags from public/images/flags-svg (instead of
// bundling the country-flag-icons React components, which cost about 230 KB of
// JavaScript on every page). A country with no file would show a broken image.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { getCountries } from 'libphonenumber-js/min'

const dir = path.join(__dirname, '..', 'public', 'images', 'flags-svg')

test('every country the phone field can list has a flag file', () => {
  const missing = getCountries().filter((code) => !fs.existsSync(path.join(dir, `${code}.svg`)))
  assert.deepEqual(missing, [])
})

test('the licence for the flag files is kept beside them', () => {
  assert.ok(fs.existsSync(path.join(dir, 'LICENSE-country-flag-icons.txt')))
})

test('the phone select does not import the flag components again', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'shared/components/common/PhoneCountrySelect.tsx'), 'utf8')
  assert.ok(!source.includes("from 'country-flag-icons"))
})
