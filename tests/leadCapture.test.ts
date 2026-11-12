import { beforeEach, describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { planLeadTurn, submitLeadForm, type LeadSubmission } from '../features/ai-advisor/services/leadCapture'
import { LEAD_KNOWN_MARKER, LEAD_SAVED_MARKER } from '../features/ai-advisor/utils/leadMarkers'

let saved: LeadSubmission[] = []
const ok = async (lead: LeadSubmission) => {
  saved.push(lead)
  return { success: true }
}
// Each test uses its own client key and email so the in-memory limits do not leak between tests.
let n = 0
const fresh = () => {
  n += 1
  return { client: `client-${n}`, email: `student${n}@example.com` }
}
const form = (email: string, extra: Record<string, unknown> = {}) => ({
  fullName: 'Aye Chan',
  email,
  phone: '+66812345678',
  targetCountry: 'uk',
  said: ['I want to study nursing in the UK'],
  ...extra,
})

beforeEach(() => {
  saved = []
})

describe('submitLeadForm validation', () => {
  test('a valid registration saves normalised contact details without chat context', async () => {
    const { client, email } = fresh()
    const res = await submitLeadForm(form(email.toUpperCase()), ok, client)
    assert.deepEqual(res, { success: true })
    assert.equal(saved.length, 1)
    assert.equal(saved[0].email, email)
    assert.equal(saved[0].phone, '+66812345678')
    assert.ok(!('targetCountry' in saved[0]))
    assert.equal(saved[0].message, '[Via AI chatbot]')
  })

  test('rejects a short name, a bad email and a phone with no country code', async () => {
    const { client, email } = fresh()
    assert.deepEqual(await submitLeadForm(form(email, { fullName: 'A' }), ok, client), { success: false, code: 'name' })
    assert.deepEqual(await submitLeadForm(form('nope'), ok, client), { success: false, code: 'email' })
    assert.deepEqual(await submitLeadForm(form(email, { phone: '0812345678' }), ok, client), { success: false, code: 'phone' })
    assert.deepEqual(await submitLeadForm(form(email, { phone: '' }), ok, client), { success: false, code: 'phone' })
    assert.equal(saved.length, 0)
  })

  test('accepts 00 as the international prefix', async () => {
    const { client, email } = fresh()
    const res = await submitLeadForm(form(email, { phone: '0066 81 234 5678' }), ok, client)
    assert.deepEqual(res, { success: true })
    assert.equal(saved[0].phone, '+66812345678')
  })

  test('junk input never throws', async () => {
    const { client } = fresh()
    for (const raw of [null, undefined, 'text', 5, []]) {
      assert.equal((await submitLeadForm(raw, ok, client)).success, false)
    }
  })
})

describe('submitLeadForm protection', () => {
  test('the hidden honeypot field reports success but saves nothing', async () => {
    const { client, email } = fresh()
    assert.deepEqual(await submitLeadForm(form(email, { hp: 'bot' }), ok, client), { success: true })
    assert.equal(saved.length, 0)
  })

  test('the same email twice is saved once and both calls succeed', async () => {
    const { client, email } = fresh()
    assert.deepEqual(await submitLeadForm(form(email), ok, client), { success: true })
    assert.deepEqual(await submitLeadForm(form(email), ok, client), { success: true })
    assert.equal(saved.length, 1)
  })

  test('a fourth submission from one client in an hour is rate limited', async () => {
    const { client } = fresh()
    for (let i = 0; i < 3; i++) {
      const e = `limit${n}-${i}@example.com`
      assert.deepEqual(await submitLeadForm(form(e), ok, client), { success: true })
    }
    assert.deepEqual(await submitLeadForm(form(`limit${n}-x@example.com`), ok, client), { success: false, code: 'rate' })
  })

  test('a failed save reports failure and the email can be retried', async () => {
    const { client, email } = fresh()
    const failing = async () => ({ success: false })
    assert.deepEqual(await submitLeadForm(form(email), failing, client), { success: false, code: 'failed' })
    assert.deepEqual(await submitLeadForm(form(email), ok, client), { success: true })
    assert.equal(saved.length, 1)
  })
})

describe('upfront contact registration', () => {
  test('does not store transcripts or guessed destinations supplied by legacy clients', async () => {
    const { client, email } = fresh()
    await submitLeadForm(form(email, { targetCountry: 'uk', said: ['Private conversation text'] }), ok, client)
    assert.equal(saved[0].message, '[Via AI chatbot]')
    assert.ok(!('targetCountry' in saved[0]))
    assert.ok(!JSON.stringify(saved[0]).includes('Private conversation text'))
  })

  test('accepts just contact details without questions, a destination or OTP', async () => {
    const { client, email } = fresh()
    assert.deepEqual(await submitLeadForm({ fullName: 'Aye Chan', email, phone: '+66812345678' }, ok, client), { success: true })
    assert.equal(saved[0].message, '[Via AI chatbot]')
  })
})

describe('planLeadTurn', () => {
  test('before details are sent, the reply must not offer the assessment', () => {
    const plan = planLeadTurn([{ role: 'user', content: 'hi' }])
    assert.match(plan.directive, /do not mention the Career Assessment/)
  })

  test('after the lead is saved or known, nothing is added', () => {
    assert.equal(planLeadTurn([{ role: 'assistant', content: `thanks ${LEAD_SAVED_MARKER}` }]).directive, '')
    assert.equal(planLeadTurn([{ role: 'user', content: `${LEAD_KNOWN_MARKER}` }]).directive, '')
  })
})
