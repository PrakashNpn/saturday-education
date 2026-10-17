import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import {
  applyTranslation,
  catalogCareerToMaster,
  coerceMasterFromAI,
  coerceTranslation,
  deriveHorizonView,
  growthLabelFor,
  slugify,
  toTranslationLocale,
  type CareerOutlookMaster,
} from '../shared/lib/careers/outlookMaster'
import { CAREERS, findCareerByQuery } from '../shared/lib/careers/catalog'

describe('slugify', () => {
  test('lowercases, turns & into "and" and collapses punctuation', () => {
    assert.equal(slugify('Computer Science & IT'), 'computer-science-and-it')
    assert.equal(slugify('  CI/CD  '), 'ci-cd')
    assert.equal(slugify('Cloud platforms (AWS/Azure/GCP)'), 'cloud-platforms-aws-azure-gcp')
  })
  test('falls back to "career" for text with no latin letters', () => {
    assert.equal(slugify('วิศวกร'), 'career')
  })
})

describe('growthLabelFor', () => {
  test('maps growth percentages to the labels the page translates', () => {
    assert.equal(growthLabelFor(-30), 'Declining')
    assert.equal(growthLabelFor(-10), 'Slowing')
    assert.equal(growthLabelFor(0), 'Stable')
    assert.equal(growthLabelFor(15), 'Growing')
    assert.equal(growthLabelFor(40), 'Fast-growing')
  })
})

describe('toTranslationLocale', () => {
  test('accepts the five translated locales only', () => {
    for (const l of ['th', 'my', 'vi', 'fil', 'id']) assert.equal(toTranslationLocale(l), l)
    for (const l of ['en', 'xx', '', undefined, null, 5]) assert.equal(toTranslationLocale(l), null)
  })
})

describe('coerceMasterFromAI', () => {
  const good = {
    valid: true, title: 'Sommelier', field: 'Hospitality & Tourism', summary: 'Selects wine — and serves it.',
    exampleRoles: ['Head Sommelier'], requiredSkills: ['Wine knowledge'], niceToHaveSkills: ['Languages'], riasec: ['e', 'S', 'zz'],
    relatedFields: ['Hospitality & Tourism'], demand: 'Moderate', trend: [50, 52, 54, 55, 56, 58, 59, 60, 61, 62, 63],
    marketNoteNear: 'Steady.', marketNoteLong: 'Stable over ten years.', sources: ['BLS'],
  }

  test('builds a clean master and removes dashes and invalid letters', () => {
    const m = coerceMasterFromAI(good, 'sommelier')!
    assert.equal(m.slug, 'sommelier')
    assert.equal(m.summary, 'Selects wine, and serves it.')
    assert.deepEqual(m.riasec, ['E', 'S'])
    assert.equal(m.trend.length, 11)
  })

  test('returns null when the model says it is not a career', () => {
    assert.equal(coerceMasterFromAI({ valid: false }, 'asdf'), null)
    assert.equal(coerceMasterFromAI(null, 'x'), null)
  })

  test('uses safe defaults for missing or invalid values', () => {
    const m = coerceMasterFromAI({ title: 'Thing', demand: 'Enormous', trend: 'nope', riasec: [] }, 'thing')!
    assert.equal(m.demand, 'Moderate')
    assert.deepEqual(m.riasec, ['I'])
    assert.equal(m.trend.length, 11)
    assert.ok(m.trend.every((n) => n >= 0 && n <= 100))
  })

  test('resamples a short trend to 11 points within 0 to 100', () => {
    const m = coerceMasterFromAI({ title: 'Thing', trend: [10, 200, -5] }, 'thing')!
    assert.equal(m.trend.length, 11)
    assert.ok(m.trend.every((n) => n >= 0 && n <= 100))
  })
})

describe('coerceTranslation and applyTranslation', () => {
  const master = coerceMasterFromAI({
    title: 'Sommelier', field: 'Hospitality & Tourism', summary: 'Selects wine.', exampleRoles: ['Head Sommelier', 'Wine Buyer'],
    requiredSkills: ['Wine knowledge', 'Service'], niceToHaveSkills: ['Languages'], riasec: ['E'], relatedFields: ['Hospitality & Tourism', 'Viticulture'],
    demand: 'Moderate', trend: [50, 60], marketNoteNear: 'Near.', marketNoteLong: 'Long.', sources: ['BLS'],
  }, 'sommelier') as CareerOutlookMaster

  const translated = {
    title: 'ซอมเมอลิเยร์ — ผู้เชี่ยวชาญไวน์', summary: 'เลือกและเสิร์ฟไวน์', field: 'การบริการและการท่องเที่ยว',
    exampleRoles: ['หัวหน้า', 'ผู้ซื้อ'], requiredSkills: ['ความรู้เรื่องไวน์', 'การบริการ'], niceToHaveSkills: ['ภาษา'],
    relatedFields: ['การบริการและการท่องเที่ยว', 'ไวน์วิทยา'], marketNoteNear: 'ใกล้', marketNoteLong: 'ยาว',
  }

  test('keeps the standard English field names so the page can translate them itself', () => {
    const t = coerceTranslation(translated, master)!
    assert.equal(t.field, 'Hospitality & Tourism')
    assert.deepEqual(t.relatedFields, ['Hospitality & Tourism', 'ไวน์วิทยา'])
  })

  test('removes dashes from the translated text', () => {
    assert.equal(coerceTranslation(translated, master)!.title, 'ซอมเมอลิเยร์, ผู้เชี่ยวชาญไวน์')
  })

  test('a list with the wrong length falls back to English for that list only', () => {
    const t = coerceTranslation({ ...translated, requiredSkills: ['only one'] }, master)!
    assert.deepEqual(t.requiredSkills, ['Wine knowledge', 'Service'])
    assert.deepEqual(t.exampleRoles, ['หัวหน้า', 'ผู้ซื้อ'])
  })

  test('rejects output with no title or summary', () => {
    assert.equal(coerceTranslation({ ...translated, title: '' }, master), null)
    assert.equal(coerceTranslation({ ...translated, summary: '' }, master), null)
    assert.equal(coerceTranslation('text', master), null)
    assert.equal(coerceTranslation(null, master), null)
  })

  test('applying a translation never changes numbers, sources, codes or the slug', () => {
    const out = applyTranslation(master, coerceTranslation(translated, master)!)
    assert.equal(out.slug, master.slug)
    assert.equal(out.demand, master.demand)
    assert.deepEqual(out.trend, master.trend)
    assert.deepEqual(out.sources, master.sources)
    assert.deepEqual(out.riasec, master.riasec)
  })
})

describe('catalog to master to horizon view', () => {
  test('the 5 and 10 year views come from one curve and have 6 points', () => {
    const career = CAREERS[0]
    const master = catalogCareerToMaster(career)
    const five = deriveHorizonView(master, '5')
    const ten = deriveHorizonView(master, '10')
    assert.equal(five.outlook.trend.length, 6)
    assert.equal(ten.outlook.trend.length, 6)
    assert.equal(five.outlook.trend[0], ten.outlook.trend[0])
  })

  test('findCareerByQuery finds a catalog career by its title', () => {
    assert.equal(findCareerByQuery('Software Engineer')?.slug, 'software-engineer')
    assert.equal(findCareerByQuery('zzzz not a career'), undefined)
  })
})
