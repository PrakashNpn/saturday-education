import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { faqPageJsonLd, organizationJsonLd } from '../shared/lib/seo/jsonLd'
import { metaDescriptionFromOverview } from '../shared/lib/seo/metaDescription'
import { SOCIAL_LINKS } from '../shared/constants/social'

describe('organization JSON-LD', () => {
  test('names Saturday Education and includes the corrected LinkedIn URL', () => {
    const data = organizationJsonLd()
    assert.equal(data.name, 'Saturday Education Consulting')
    assert.ok(Array.isArray(data['@type']))
    assert.ok((data.sameAs as readonly string[]).includes(SOCIAL_LINKS.linkedin))
    assert.match(SOCIAL_LINKS.linkedin, /saturdayeducationconsulting/)
    assert.doesNotMatch(SOCIAL_LINKS.linkedin, /nexa-education/)
  })
})

describe('FAQPage JSON-LD', () => {
  test('maps visible Q&A pairs into schema.org Questions', () => {
    const data = faqPageJsonLd([
      { question: 'Is consultation free?', answer: 'Yes.' },
    ])
    assert.equal(data['@type'], 'FAQPage')
    const entity = (data.mainEntity as Array<Record<string, unknown>>)[0]
    assert.equal(entity['@type'], 'Question')
    assert.equal(entity.name, 'Is consultation free?')
    assert.equal((entity.acceptedAnswer as { text: string }).text, 'Yes.')
  })
})

describe('metaDescriptionFromOverview', () => {
  test('keeps short text unchanged', () => {
    assert.equal(metaDescriptionFromOverview('Short overview.'), 'Short overview.')
  })

  test('cuts on a word boundary under 155 characters', () => {
    const long = 'Germany is a top study destination with strong engineering programmes and private English-taught options for international students who want value. Extra words keep going past the limit for this test case right here today.'
    const result = metaDescriptionFromOverview(long, 120)!
    assert.ok(result.length <= 123)
    assert.ok(result.endsWith('...'))
    assert.ok(!result.includes('  '))
  })
})
