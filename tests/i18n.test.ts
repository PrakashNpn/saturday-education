// Translation checks: every language file is complete and consistent with English.
// Run with `npm run test:i18n` (also part of `npm test`).
import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { routing } from '../i18n/routing'
import { CAREERS } from '../shared/lib/careers/catalog'
import { CAREER_FIELDS, slugify } from '../shared/lib/careers/outlookMaster'

type Json = string | number | boolean | null | Json[] | { [k: string]: Json }

const readMessages = (locale: string): Json =>
  JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'messages', `${locale}.json`), 'utf8'))

function flatten(value: Json, prefix = '', out: Record<string, string> = {}): Record<string, string> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out)
  } else if (typeof value === 'string') {
    out[prefix] = value
  }
  return out
}

const en = flatten(readMessages('en'))
const others = routing.locales.filter((l) => l !== 'en')

/** Namespaces that exist only in the translated files (the English text lives in the catalog code). */
const EXTRA_NAMESPACES = ['careerCatalog']

// English keeps a few dashes from before the "no dashes" rule. Anything new fails.
const ENGLISH_DASH_ALLOWLIST = new Set([
  'careerAssessment.outlook.chartTitle',
  'careerAssessment.question.helper',
  'careerAssessment.question.tipMcq',
  'careerAssessment.thankYou.step2',
  'metadata.universities.title',
  'metadata.destinations.title',
  'metadata.careerAssessment.description',
])

// A few strings are deliberately empty in one language (the hero title in Burmese is a single
// line, and the component skips an empty second line).
const ALLOWED_EMPTY = new Set(['my:hero.titleLine2'])

const placeholders = (s: string) => [...new Set([...s.matchAll(/\{([a-zA-Z_]\w*)(?=[,}])/g)].map((m) => m[1]))].sort()
const richTags = (s: string) => [...new Set([...s.matchAll(/<(\w+)>/g)].map((m) => m[1]))].sort()

test('every locale in the routing config has a message file', () => {
  for (const locale of routing.locales) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'messages', `${locale}.json`)), `messages/${locale}.json is missing`)
  }
})

test('English has no new dashes beyond the known list', () => {
  const offenders = Object.entries(en)
    .filter(([key, value]) => /[—–]/.test(value) && !ENGLISH_DASH_ALLOWLIST.has(key))
    .map(([key]) => key)
  assert.deepEqual(offenders, [], `em/en dashes in English UI copy: ${offenders.join(', ')}`)
})

for (const locale of others) {
  describe(`messages/${locale}.json`, () => {
    const flat = flatten(readMessages(locale))

    test('has every English key', () => {
      const missing = Object.keys(en).filter((k) => !(k in flat))
      assert.deepEqual(missing.slice(0, 15), [], `${missing.length} keys missing, e.g. ${missing.slice(0, 5).join(', ')}`)
    })

    test('has no keys English does not have (except the translated-only namespaces)', () => {
      const extra = Object.keys(flat).filter((k) => !(k in en) && !EXTRA_NAMESPACES.some((ns) => k.startsWith(`${ns}.`)))
      assert.deepEqual(extra.slice(0, 15), [], `unknown keys, e.g. ${extra.slice(0, 5).join(', ')}`)
    })

    test('has no empty strings where English has text', () => {
      const empty = Object.keys(en).filter(
        (k) => en[k].trim() !== '' && (flat[k] ?? '').trim() === '' && !ALLOWED_EMPTY.has(`${locale}:${k}`),
      )
      assert.deepEqual(empty, [], `empty translations: ${empty.slice(0, 5).join(', ')}`)
    })

    test('keeps the same {placeholders} and <tags> as English', () => {
      const broken = Object.keys(en).filter(
        (k) => k in flat && (placeholders(en[k]).join() !== placeholders(flat[k]).join() || richTags(en[k]).join() !== richTags(flat[k]).join()),
      )
      assert.deepEqual(broken, [], `placeholder or tag mismatch: ${broken.slice(0, 8).join(', ')}`)
    })

    test('contains no em or en dashes', () => {
      const dashed = Object.entries(flat).filter(([, v]) => /[—–]/.test(v)).map(([k]) => k)
      assert.deepEqual(dashed, [], `dashes in: ${dashed.slice(0, 8).join(', ')}`)
    })
  })
}

describe('career catalog translations', () => {
  const slugs = CAREERS.map((c) => c.slug)
  const skills = new Set(CAREERS.flatMap((c) => [...c.requiredSkills, ...c.niceToHaveSkills]).map(slugify))
  const fields = CAREER_FIELDS.map(slugify)

  const catalog = (locale: string) => {
    const flat = flatten(readMessages(locale))
    const section = (name: string) =>
      Object.keys(flat)
        .filter((k) => k.startsWith(`careerCatalog.${name}.`))
        .map((k) => k.slice(`careerCatalog.${name}.`.length))
    return { section }
  }

  // Burmese deliberately translates only summaries and market notes (career names, skills and
  // labels stay English in its code-switch register); the others translate everything.
  const full = ['th', 'vi', 'fil', 'id']
  for (const locale of full) {
    test(`${locale}: every career has a title, summary and market note`, () => {
      const c = catalog(locale)
      for (const section of ['title', 'summary', 'note']) {
        const have = new Set(c.section(section))
        const missing = slugs.filter((s) => !have.has(s))
        assert.deepEqual(missing, [], `${locale} careerCatalog.${section} is missing: ${missing.slice(0, 5).join(', ')}`)
      }
    })

    test(`${locale}: field names, demand and growth labels are complete`, () => {
      const c = catalog(locale)
      assert.deepEqual(fields.filter((f) => !c.section('field').includes(f)), [])
      assert.deepEqual(['High', 'Moderate', 'Competitive'].filter((d) => !c.section('demand').includes(d)), [])
      for (const g of ['declining', 'slowing', 'slow-growth', 'stable', 'growing', 'fast-growing']) {
        assert.ok(c.section('growth').includes(g), `${locale} is missing growth label "${g}"`)
      }
    })

    test(`${locale}: skill translations all match a real catalog skill`, () => {
      const orphans = catalog(locale).section('skill').filter((k) => !skills.has(k))
      assert.deepEqual(orphans.slice(0, 10), [], `skill keys with no catalog skill (renamed or removed?): ${orphans.slice(0, 5).join(', ')}`)
    })
  }

  test('my: every career has a summary and market note', () => {
    const c = catalog('my')
    for (const section of ['summary', 'note']) {
      const have = new Set(c.section(section))
      const missing = slugs.filter((s) => !have.has(s))
      assert.deepEqual(missing, [], `my careerCatalog.${section} is missing: ${missing.slice(0, 5).join(', ')}`)
    }
  })

  test('catalog slugs are unique and skill keys do not collide', () => {
    assert.equal(new Set(slugs).size, slugs.length, 'duplicate career slugs')
    const all = CAREERS.flatMap((c) => [...c.requiredSkills, ...c.niceToHaveSkills])
    const byKey = new Map<string, Set<string>>()
    for (const s of all) byKey.set(slugify(s), (byKey.get(slugify(s)) ?? new Set()).add(s))
    const collisions = [...byKey.entries()].filter(([, v]) => v.size > 1).map(([k]) => k)
    assert.deepEqual(collisions, [], 'two different skills share one translation key')
  })
})

describe('chat button text', () => {
  test('the button words are in every language file (they used to be hardcoded in English)', () => {
    for (const locale of routing.locales) {
      const w = (readMessages(locale) as { chatWidget: { letsChat?: string; status?: string } }).chatWidget
      assert.ok(w.letsChat?.trim(), `${locale}: chatWidget.letsChat`)
      assert.ok(w.status?.trim(), `${locale}: chatWidget.status`)
    }
  })
})
