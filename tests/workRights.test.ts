import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { splitWorkRights } from '../features/destination/utils/workRights'

describe('splitWorkRights', () => {
  test('splits at semicolons and sentence ends and drops trailing punctuation', () => {
    assert.deepEqual(
      splitWorkRights('20 hrs/week during term; full-time during scheduled breaks. PGWP after graduation: open work permit.'),
      ['20 hrs/week during term', 'full-time during scheduled breaks', 'PGWP after graduation: open work permit'],
    )
  })

  test('a single clause stays one bullet', () => {
    assert.deepEqual(splitWorkRights('Up to 20 hours a week during term time'), ['Up to 20 hours a week during term time'])
  })

  test('replaces a stray em dash with a comma but keeps en-dash ranges', () => {
    assert.deepEqual(splitWorkRights('Post-study: subclass 485 visa — 2–4 years.'), ['Post-study: subclass 485 visa, 2–4 years'])
  })

  test('commas and decimals do not split', () => {
    assert.deepEqual(splitWorkRights('Show EUR 10,179.85 in funds, with insurance'), ['Show EUR 10,179.85 in funds, with insurance'])
  })

  test('empty text gives no bullets', () => {
    assert.deepEqual(splitWorkRights(''), [])
  })
})

// The work-rights SQL must keep the English bullet structure in every language, because the
// page splits each translation separately. A translation with a different number of parts
// would show the wrong number of bullets.
describe('work rights translation SQL', () => {
  const file = path.join(__dirname, '..', 'prisma', 'translations', 'work-rights-th-my-vi-fil-id.sql')
  const sql = fs.readFileSync(file, 'utf8')
  const blocks = sql.split('UPDATE countries SET').slice(1)
  const dollar = (s: string) => s // text between $q$ ... $q$

  test('covers 22 countries', () => {
    assert.equal(blocks.length, 22)
  })

  for (const block of blocks) {
    const where = /WHERE slug = \$q\$([\s\S]*?)\$q\$ AND work_rights = \$q\$([\s\S]*?)\$q\$/.exec(block)
    assert.ok(where, 'could not read a WHERE clause')
    const [, slug, english] = where
    test(`${slug}: every language has as many bullets as the English`, () => {
      const wanted = splitWorkRights(english).length
      const values = [...block.matchAll(/"work_rights_(\w+)" = \$q\$([\s\S]*?)\$q\$/g)]
      assert.equal(values.length, 5, `${slug} should set 5 languages`)
      for (const [, lang, text] of values) {
        assert.equal(splitWorkRights(dollar(text)).length, wanted, `${slug} ${lang}: bullet count differs from English`)
        assert.ok(!/[—–]/.test(text), `${slug} ${lang}: contains a dash`)
      }
    })
  }
})
