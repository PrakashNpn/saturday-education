import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { syncLeadToCrm, type CrmLead, type CrmSend } from '../features/consultation/services/crmSync'

const lead: CrmLead = { fullName: 'Aye Chan', email: 'aye@example.com' }
const quiet = async <T>(run: () => Promise<T>) => {
  const original = console.error
  console.error = () => {}
  try {
    return await run()
  } finally {
    console.error = original
  }
}

describe('syncLeadToCrm', () => {
  test('a send that works is synced after one attempt', async () => {
    let calls = 0
    const send: CrmSend = async () => (calls++, 'sent')
    assert.deepEqual(await syncLeadToCrm(lead, 'chat', send, 0), { status: 'synced' })
    assert.equal(calls, 1)
  })

  test('passes the lead and channel through', async () => {
    let seen: unknown[] = []
    await syncLeadToCrm(lead, 'chat', async (l, c) => ((seen = [l, c]), 'sent'), 0)
    assert.deepEqual(seen, [lead, 'chat'])
  })

  test('Firmli not configured is skipped, not failed, and is not retried', async () => {
    let calls = 0
    const outcome = await syncLeadToCrm(lead, 'consultation', async () => (calls++, 'skipped'), 0)
    assert.deepEqual(outcome, { status: 'skipped' })
    assert.equal(calls, 1)
  })

  test('a failure that clears on the second try is synced', async () => {
    let calls = 0
    const send: CrmSend = async () => {
      if (++calls === 1) throw new Error('Firmli encrypt-data failed: 502')
      return 'sent'
    }
    assert.deepEqual(await quiet(() => syncLeadToCrm(lead, 'consultation', send, 0)), { status: 'synced' })
    assert.equal(calls, 2)
  })

  test('two failures give up and report the last error', async () => {
    let calls = 0
    const send: CrmSend = async () => {
      throw new Error(`Firmli forms/save failed: 400 try ${++calls}`)
    }
    const outcome = await quiet(() => syncLeadToCrm(lead, 'chat', send, 0))
    assert.deepEqual(outcome, { status: 'failed', error: 'Firmli forms/save failed: 400 try 2' })
    assert.equal(calls, 2)
  })

  test('a long error is cut to 500 characters and a non-Error is still described', async () => {
    const long = await quiet(() =>
      syncLeadToCrm(lead, 'chat', async () => { throw new Error('x'.repeat(2000)) }, 0),
    )
    assert.equal(long.status === 'failed' && long.error.length, 500)
    const odd = await quiet(() => syncLeadToCrm(lead, 'chat', async () => { throw 'timeout' }, 0))
    assert.deepEqual(odd, { status: 'failed', error: 'timeout' })
  })
})
