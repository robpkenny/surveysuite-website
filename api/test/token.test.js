import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createManagedIdentityCredential } from '../src/lib/token.js'

const env = { IDENTITY_ENDPOINT: 'http://127.0.0.1:41000/msi/token', IDENTITY_HEADER: 'hdr' }

test('requests a token for the user-assigned identity and caches it', async () => {
  let calls = 0
  let lastUrl
  let lastHeaders
  const cred = createManagedIdentityCredential({
    clientId: 'client-123',
    env,
    now: () => 1_000_000,
    fetchImpl: async (url, init) => {
      calls++
      lastUrl = new URL(url)
      lastHeaders = init.headers
      return { ok: true, json: async () => ({ access_token: 'abc', expires_on: String(1_000_000 / 1000 + 3600) }) }
    },
  })
  const t1 = await cred.getToken('https://graph.microsoft.com/.default')
  const t2 = await cred.getToken('https://graph.microsoft.com/.default')
  assert.equal(t1.token, 'abc')
  assert.equal(t2.token, 'abc')
  assert.equal(calls, 1)
  assert.equal(lastUrl.searchParams.get('resource'), 'https://graph.microsoft.com')
  assert.equal(lastUrl.searchParams.get('client_id'), 'client-123')
  assert.equal(lastUrl.searchParams.get('api-version'), '2019-08-01')
  assert.equal(lastHeaders['X-IDENTITY-HEADER'], 'hdr')
})

test('refreshes a token that is about to expire', async () => {
  let t = 0
  let calls = 0
  const cred = createManagedIdentityCredential({
    clientId: 'c',
    env,
    now: () => t,
    fetchImpl: async () => {
      calls++
      return { ok: true, json: async () => ({ access_token: `tok${calls}`, expires_on: String(t / 1000 + 600) }) }
    },
  })
  await cred.getToken('https://graph.microsoft.com/.default')
  t += 6 * 60 * 1000 // now inside the 5-minute refresh margin
  const again = await cred.getToken('https://graph.microsoft.com/.default')
  assert.equal(again.token, 'tok2')
})

test('clear errors when not running in Azure or misconfigured', async () => {
  await assert.rejects(createManagedIdentityCredential({ clientId: 'c', env: {} }).getToken('x'), /IDENTITY_ENDPOINT/)
  await assert.rejects(createManagedIdentityCredential({ env }).getToken('x'), /MANAGED_IDENTITY_CLIENT_ID/)
})
