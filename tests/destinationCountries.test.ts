// The central country list (shared/constants/destinationCountries.ts) feeds the three lead
// forms, the Firmli sync, the notification email and the chat. These checks stop a
// country from being offered in a form but missing from the places it must reach.
import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  COUNTRIES,
  COUNTRY_KEYS,
  countryLabel,
  countryNameFor,
  guessCountryKey,
  isCountryKey,
} from '../shared/constants/destinationCountries'
import { routing } from '../i18n/routing'

const root = path.join(__dirname, '..')
const messages = (locale: string) =>
  JSON.parse(fs.readFileSync(path.join(root, 'messages', `${locale}.json`), 'utf8')) as {
    Landing: { consultation: { form: { country: { options: Record<string, string> } } } }
  }

// Firmli (checked Oct 2026) has no entry for these, so their leads reach the CRM without a destination.
const NOT_IN_FIRMLI = ['belgium', 'grenada']

describe('country list', () => {
  test('keys and slugs are unique', () => {
    assert.equal(new Set(COUNTRY_KEYS).size, COUNTRIES.length)
    assert.equal(new Set(COUNTRIES.map((c) => c.slug)).size, COUNTRIES.length)
  })

  test('is in alphabetical order by English name, the order the dropdowns show', () => {
    const names = COUNTRIES.map((c) => c.name)
    assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, 'en')))
  })

  test('has every country that has a destination page', () => {
    const dir = path.join(root, 'prisma', 'translations')
    const slugs = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('-vi-fil-id.sql') && !f.startsWith('work-rights'))
      .map((f) => f.replace('-vi-fil-id.sql', ''))
    assert.equal(slugs.length, 22)
    for (const slug of slugs) assert.ok(COUNTRIES.some((c) => c.slug === slug), `${slug} is missing from the list`)
  })
})

describe('what every country must reach', () => {
  test('has a Firmli id and name, except the known gaps', () => {
    for (const c of COUNTRIES) {
      if (NOT_IN_FIRMLI.includes(c.key)) {
        assert.equal(c.firmliId, undefined, `${c.key} now has an id: remove it from NOT_IN_FIRMLI`)
        continue
      }
      assert.ok(c.firmliId && c.firmliName, `${c.key} has no Firmli id or name`)
    }
  })

  test('Firmli ids are unique', () => {
    const ids = COUNTRIES.flatMap((c) => (c.firmliId ? [c.firmliId] : []))
    assert.equal(new Set(ids).size, ids.length)
  })

  test('has a name in the form dropdown in every language, and the dropdown lists nothing else', () => {
    for (const locale of routing.locales) {
      const options = messages(locale).Landing.consultation.form.country.options
      for (const key of [...COUNTRY_KEYS, 'other']) {
        assert.ok(options[key] && options[key].trim(), `${locale}: no name for ${key}`)
      }
      assert.deepEqual(Object.keys(options).sort(), [...COUNTRY_KEYS, 'other'].sort(), `${locale}: stray country keys`)
    }
  })
})

describe('helpers', () => {
  test('isCountryKey', () => {
    assert.equal(isCountryKey('uk'), true)
    assert.equal(isCountryKey('other'), false)
    assert.equal(isCountryKey('sweden'), false)
    assert.equal(isCountryKey(undefined), false)
  })

  test('countryLabel: short labels, plain names, other and unknown keys', () => {
    assert.equal(countryLabel('uk'), 'UK')
    assert.equal(countryLabel('uae'), 'UAE')
    assert.equal(countryLabel('newZealand'), 'New Zealand')
    assert.equal(countryLabel('other'), 'Other')
    assert.equal(countryLabel('sweden'), 'sweden')
  })

  test('countryNameFor gives the English name, and passes older text through', () => {
    assert.equal(countryNameFor('uk'), 'United Kingdom')
    assert.equal(countryNameFor('korea'), 'South Korea')
    assert.equal(countryNameFor('other'), 'Other')
    assert.equal(countryNameFor('United States'), 'United States')
  })

  test('countryNameFor matches the names the university recommender compares with', () => {
    const seeds = path.join(root, 'prisma', 'seeds')
    for (const file of fs.readdirSync(seeds)) {
      const slug = /slug: '([^']+)'/.exec(fs.readFileSync(path.join(seeds, file), 'utf8'))?.[1]
      const name = /^\s{2}name: '([^']+)'/m.exec(fs.readFileSync(path.join(seeds, file), 'utf8'))?.[1]
      const country = COUNTRIES.find((c) => c.slug === slug)
      if (country && name) assert.equal(country.name, name, `${slug}: name differs from the seed`)
    }
  })

  test('guessCountryKey takes the most recent country named', () => {
    assert.equal(guessCountryKey(['I like Canada', 'maybe the UK instead']), 'uk')
    assert.equal(guessCountryKey(['cheap tuition in Holland?']), 'netherlands')
    assert.equal(guessCountryKey(['I want to study in Seoul, South Korea']), 'korea')
    assert.equal(guessCountryKey(['nursing in Viet Nam']), 'vietnam')
    assert.equal(guessCountryKey(['tell me about visas']), undefined)
  })
})
