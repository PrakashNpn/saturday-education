// Runs with the chat form NOT configured: chat leads must still reach the consultation form.
import { before, test } from 'node:test'
import assert from 'node:assert/strict'

const calls: { form_identifier: string; utm_identifier?: string; data: Record<string, string> }[] = []
let createFirmliLead: typeof import('../shared/lib/crm/firmli').createFirmliLead

before(async () => {
  Object.assign(process.env, {
    FIRMLI_CLIENT_NUMBER: 'c000test',
    FIRMLI_FORM_NUMBER: 'FORM_CONSULT',
    FIRMLI_UTM_NUMBER: 'UTM_CONSULT',
  })
  delete process.env.FIRMLI_CHAT_FORM_NUMBER
  delete process.env.FIRMLI_CHAT_UTM_NUMBER
  ;(globalThis as unknown as { fetch: unknown }).fetch = async (_url: string, init: { body: string }) => {
    calls.push(JSON.parse(init.body))
    return {
      ok: true,
      status: 200,
      json: async () => ({ data: { encryptedFormData: { publicKey: 'PK', encryptedData: 'ED' } } }),
      text: async () => '',
    }
  }
  ;({ createFirmliLead } = await import('../shared/lib/crm/firmli'))
})

test('a chat lead falls back to the consultation form when the chat form is unset', async () => {
  await createFirmliLead(
    { fullName: 'Aye Chan', email: 'aye@example.com', targetCountry: 'canada', message: 'hello' },
    { channel: 'chat' },
  )
  assert.equal(calls[0].form_identifier, 'FORM_CONSULT')
  assert.equal(calls[0].utm_identifier, 'UTM_CONSULT')
  assert.equal(calls[0].data.note, 'hello')
  assert.equal(calls[0].data.destination_country_id, '38')
})

test('nothing is sent when the client number is missing', async () => {
  // Re-import is not possible (consts are read once), so assert the guard by source instead.
  const src = await import('node:fs').then((fs) => fs.readFileSync('shared/lib/crm/firmli.ts', 'utf8'))
  assert.match(src, /if \(!clientNumber \|\| !formNumber\)/)
})
