/* eslint-disable @typescript-eslint/no-explicit-any */
// Runs with the chat form configured. Env is read when the module loads, so this
// file sets it first; the fallback case lives in firmli.fallback.test.ts.
import { before, beforeEach, describe, test } from 'node:test'
import assert from 'node:assert/strict'

type Call = { url: string; hasTimeout: boolean; body: { form_identifier: string; utm_identifier?: string; data: Record<string, any>; content?: string } }
let calls: Call[] = []
let createFirmliLead: typeof import('../shared/lib/crm/firmli').createFirmliLead
let responses: { ok: boolean; json?: unknown; status?: number }[] = []

before(async () => {
  Object.assign(process.env, {
    FIRMLI_CLIENT_NUMBER: 'c000test',
    FIRMLI_FORM_NUMBER: 'FORM_CONSULT',
    FIRMLI_UTM_NUMBER: 'UTM_CONSULT',
    FIRMLI_CHAT_FORM_NUMBER: 'FORM_CHAT',
    FIRMLI_CHAT_UTM_NUMBER: 'UTM_CHAT',
  })
  ;(globalThis as unknown as { fetch: unknown }).fetch = async (url: string, init: { body: string; signal?: AbortSignal }) => {
    calls.push({ url, hasTimeout: !!init.signal, body: JSON.parse(init.body) })
    const r = responses.shift() ?? { ok: true }
    return { ok: r.ok, status: r.status ?? (r.ok ? 200 : 500), json: async () => r.json, text: async () => 'err' }
  }
  ;({ createFirmliLead } = await import('../shared/lib/crm/firmli'))
})

const good = [
  { ok: true, json: { data: { encryptedFormData: { publicKey: 'PK', encryptedData: 'ED' } } } },
  { ok: true },
]

beforeEach(() => {
  calls = []
  responses = [...good]
})

describe('createFirmliLead for the chat channel', () => {
  const lead = {
    fullName: 'Aye Chan',
    email: 'aye@example.com',
    phone: '+66812345678',
    targetCountry: 'uk',
    message: 'm'.repeat(400),
  }

  test('uses the chat form, the chat UTM and the chat field names', async () => {
    await createFirmliLead(lead, { channel: 'chat' })
    const sent = calls[0].body
    assert.equal(sent.form_identifier, 'FORM_CHAT')
    assert.equal(sent.utm_identifier, 'UTM_CHAT')
    assert.equal(sent.data.first_name, 'Aye Chan')
    assert.equal(sent.data.mobile, '+66812345678')
    assert.deepEqual(sent.data.destination_of_interest, ['United Kingdom'])
    assert.equal(sent.data.additional_inquiry.length, 250)
    assert.equal(sent.data.note, undefined)
    assert.equal(sent.data.destination_country_id, undefined)
  })

  test('posts the encrypted result to forms/save in the widget format', async () => {
    await createFirmliLead(lead, { channel: 'chat' })
    assert.match(calls[0].url, /c000test-api\.firmli\.com\/v1\/test-path\/encrypt-data$/)
    assert.match(calls[1].url, /\/v1\/public\/forms\/save$/)
    assert.deepEqual(calls[1].body, { content: 'PK^#^ED' })
  })

  test('reports sent, and both requests carry a timeout so a hung Firmli cannot hold the form', async () => {
    assert.equal(await createFirmliLead(lead, { channel: 'chat' }), 'sent')
    assert.deepEqual(calls.map((c) => c.hasTimeout), [true, true])
  })

  test('the consultation channel keeps its own form, note and country id as a string', async () => {
    await createFirmliLead(lead)
    const sent = calls[0].body
    assert.equal(sent.form_identifier, 'FORM_CONSULT')
    assert.equal(sent.utm_identifier, 'UTM_CONSULT')
    assert.equal(sent.data.note, lead.message)
    assert.equal(sent.data.destination_country_id, '230')
    assert.equal(sent.data.additional_inquiry, undefined)
  })

  test('a country Firmli does not list is sent without a destination', async () => {
    await createFirmliLead({ ...lead, targetCountry: 'other' }, { channel: 'chat' })
    assert.equal(calls[0].body.data.destination_of_interest, undefined)
  })

  test('an encrypt failure or save failure throws so the caller can record it', async () => {
    responses = [{ ok: false, status: 500 }]
    await assert.rejects(createFirmliLead(lead, { channel: 'chat' }), /encrypt-data failed: 500/)
    responses = [good[0], { ok: false, status: 400 }]
    await assert.rejects(createFirmliLead(lead, { channel: 'chat' }), /forms\/save failed: 400/)
    responses = [{ ok: true, json: { data: { encryptedFormData: { isError: true } } } }]
    await assert.rejects(createFirmliLead(lead, { channel: 'chat' }), /encryption failed/)
  })
})
