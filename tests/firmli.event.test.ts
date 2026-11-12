import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createFirmliLead } from '../shared/lib/crm/firmli'
import { EVENT_CAMPAIGN } from '../features/education-event/config'

test('event uses the supplied client/form/UTM and consultation-shaped Canada fields', async t => {
  const calls: {url: string; body: Record<string,unknown>}[] = []
  t.mock.method(globalThis,'fetch',async (url: string,init: RequestInit) => {
    calls.push({url,body:JSON.parse(String(init.body))})
    return Response.json({data:{encryptedFormData:{publicKey:'PK',encryptedData:'ED'}}})
  })
  await createFirmliLead({fullName:'Aye Chan',email:'aye@example.com',phone:'+959765929492',targetCountry:'canada',message:'Canada fair registration'},{channel:'event',campaign:EVENT_CAMPAIGN})
  assert.match(calls[0].url,/c191z26royal58-api\.firmli\.com/)
  assert.equal(calls[0].body.form_identifier,EVENT_CAMPAIGN.formNumber)
  assert.equal(calls[0].body.utm_identifier,EVENT_CAMPAIGN.utmNumber)
  assert.deepEqual(calls[0].body.data,{first_name:'Aye Chan',email:'aye@example.com',mobile:'+959765929492',destination_country_id:'38',note:'Canada fair registration'})
  assert.deepEqual(calls[1].body,{content:'PK^#^ED'})
})

test('event refuses missing campaign configuration instead of using the website source', async t => {
  const mock=t.mock.method(globalThis,'fetch',async()=>Response.json({}))
  await assert.rejects(createFirmliLead({fullName:'Aye',email:'aye@example.com'},{channel:'event'}),/not configured/)
  assert.equal(mock.mock.callCount(),0)
})

test('another destination uses its own Firmli country ID with the same event attribution', async t => {
  const payloads: Record<string,unknown>[] = []
  t.mock.method(globalThis,'fetch',async (_url: string,init: RequestInit) => {
    payloads.push(JSON.parse(String(init.body)))
    return Response.json({data:{encryptedFormData:{publicKey:'PK',encryptedData:'ED'}}})
  })
  await createFirmliLead({fullName:'Aye Chan',email:'aye@example.com',targetCountry:'uk'},{channel:'event',campaign:EVENT_CAMPAIGN})
  assert.equal((payloads[0].data as Record<string,string>).destination_country_id,'230')
  assert.equal(payloads[0].utm_identifier,EVENT_CAMPAIGN.utmNumber)
})
