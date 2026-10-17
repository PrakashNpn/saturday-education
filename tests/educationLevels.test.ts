// The assessment contact form sends education level and preferred country as keys; the
// server turns them into English names. These checks keep that mapping in step with the
// form's dropdown and with what the university recommender looks for.
import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { EDUCATION_KEYS, EDUCATION_LEVELS, educationLevelName } from '../features/career-assessment/utils/educationLevels'
import { routing } from '../i18n/routing'

const options = (locale: string) =>
  (JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'messages', `${locale}.json`), 'utf8')) as {
    careerAssessment: { contact: { educationOptions: Record<string, string> } }
  }).careerAssessment.contact.educationOptions

describe('education levels', () => {
  test('every key has text in the dropdown in every language, and nothing else is listed', () => {
    for (const locale of routing.locales) {
      const o = options(locale)
      assert.deepEqual(Object.keys(o).sort(), [...EDUCATION_KEYS].sort(), `${locale}: keys differ`)
      for (const key of EDUCATION_KEYS) assert.ok(o[key]?.trim(), `${locale}: no text for ${key}`)
    }
  })

  test('the English names are the English dropdown text', () => {
    const en = options('en')
    for (const l of EDUCATION_LEVELS) assert.equal(l.name, en[l.key])
  })

  test('a key becomes the English name; older text passes through', () => {
    assert.equal(educationLevelName('graduate'), 'Graduate')
    assert.equal(educationLevelName('foundation'), 'Foundation / pre-university')
    assert.equal(educationLevelName('Undergraduate'), 'Undergraduate')
    assert.equal(educationLevelName('ปริญญาตรี'), 'ปริญญาตรี')
  })

  test('the names contain the words the recommender matches on', () => {
    const recommender = fs.readFileSync(path.join(__dirname, '..', 'features/career-assessment/services/universityRecs.ts'), 'utf8')
    for (const word of ['high school', 'foundation', 'undergraduate', 'graduate']) {
      assert.ok(recommender.includes(`'${word}'`), `recommender no longer looks for "${word}"`)
    }
    for (const key of ['highSchool', 'foundation', 'undergraduate', 'graduate']) {
      const name = educationLevelName(key).toLowerCase()
      assert.ok(['high school', 'foundation', 'undergraduate', 'graduate'].some((w) => name.includes(w)), key)
    }
  })
})
