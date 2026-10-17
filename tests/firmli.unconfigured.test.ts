// Runs with Firmli not configured: the sync must report "skipped" and make no request.
import { before, test } from 'node:test'
import assert from 'node:assert/strict'

let createFirmliLead: typeof import('../shared/lib/crm/firmli').createFirmliLead
let requests = 0

before(async () => {
  delete process.env.FIRMLI_CLIENT_NUMBER
  delete process.env.FIRMLI_FORM_NUMBER
  ;(globalThis as unknown as { fetch: unknown }).fetch = async () => {
    requests += 1
    throw new Error('should not be called')
  }
  ;({ createFirmliLead } = await import('../shared/lib/crm/firmli'))
})

test('reports skipped and sends nothing when Firmli is not configured', async () => {
  const warn = console.warn
  console.warn = () => {}
  try {
    assert.equal(await createFirmliLead({ fullName: 'Aye', email: 'a@example.com' }), 'skipped')
  } finally {
    console.warn = warn
  }
  assert.equal(requests, 0)
})
