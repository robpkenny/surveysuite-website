import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleEnquiry } from '../src/lib/handler.js'
import { goodEnquiry, headers } from './helpers.js'

const ORIGIN = 'https://www.surveysuite.co.uk'

function setup({ allowed = true, sendFails = false, dryRun = false } = {}) {
  const sent = []
  const logs = []
  const deps = {
    allowedOrigins: [ORIGIN],
    allow: () => allowed,
    send: async (p) => {
      if (sendFails) throw new Error('Graph sendMail failed: 403')
      sent.push(p)
    },
    mailTo: 'hi@surveysuite.co.uk',
    contactEmail: 'hi@surveysuite.co.uk',
    dryRun,
    log: (e) => logs.push(e),
  }
  const req = (body, h = { origin: ORIGIN, 'x-azure-clientip': '81.2.3.4' }, method = 'POST') => ({
    method,
    headers: headers(h),
    bodyText: typeof body === 'string' ? body : JSON.stringify(body),
  })
  return { deps, req, sent, logs }
}

test('valid enquiry is sent and returns ok', async () => {
  const { deps, req, sent, logs } = setup()
  const res = await handleEnquiry(req(goodEnquiry()), deps)
  assert.equal(res.status, 200)
  assert.deepEqual(res.jsonBody, { ok: true })
  assert.equal(sent.length, 1)
  assert.deepEqual(logs.at(-1), { outcome: 'sent', product: 'auto' })
})

test('logs never contain personal details', async () => {
  const { deps, req, logs } = setup()
  await handleEnquiry(req(goodEnquiry()), deps)
  await handleEnquiry(req(goodEnquiry({ email: 'bad' })), deps)
  const text = JSON.stringify(logs)
  for (const s of ['Jane', 'jane@', 'Example Surveyors', '01243', 'Tuesdays']) assert.ok(!text.includes(s), s)
})

test('wrong or missing origin is refused', async () => {
  const { deps, req, sent } = setup()
  assert.equal((await handleEnquiry(req(goodEnquiry(), { origin: 'https://evil.example' }), deps)).status, 403)
  assert.equal((await handleEnquiry(req(goodEnquiry(), {}), deps)).status, 403)
  assert.equal(sent.length, 0)
})

test('falls back to the Referer when Origin is missing', async () => {
  const { deps, req } = setup()
  const ok = await handleEnquiry(req(goodEnquiry(), { referer: 'https://www.surveysuite.co.uk/book-demo?product=auto' }), deps)
  const bad = await handleEnquiry(req(goodEnquiry(), { referer: 'https://evil.example/page' }), deps)
  assert.equal(ok.status, 200)
  assert.equal(bad.status, 403)
})

test('non-POST, bad JSON and oversized bodies are refused', async () => {
  const { deps, req } = setup()
  assert.equal((await handleEnquiry(req(goodEnquiry(), undefined, 'GET'), deps)).status, 405)
  assert.equal((await handleEnquiry(req('{not json'), deps)).status, 400)
  assert.equal((await handleEnquiry(req('x'.repeat(10_001)), deps)).status, 413)
})

test('rate-limited visitors get 429 with the contact email', async () => {
  const { deps, req } = setup({ allowed: false })
  const res = await handleEnquiry(req(goodEnquiry()), deps)
  assert.equal(res.status, 429)
  assert.match(res.jsonBody.error, /hi@surveysuite\.co\.uk/)
})

test('bots get a quiet success and nothing is sent', async () => {
  const { deps, req, sent, logs } = setup()
  const honeypot = await handleEnquiry(req(goodEnquiry({ website: 'http://spam.example' })), deps)
  const tooFast = await handleEnquiry(req(goodEnquiry({ elapsedMs: 500 })), deps)
  assert.equal(honeypot.status, 200)
  assert.equal(tooFast.status, 200)
  assert.equal(sent.length, 0)
  assert.deepEqual(logs.map((l) => l.reason), ['honeypot', 'too-fast'])
})

test('validation errors come back per field', async () => {
  const { deps, req, sent } = setup()
  const res = await handleEnquiry(req(goodEnquiry({ email: 'nope', practice: '' })), deps)
  assert.equal(res.status, 400)
  assert.deepEqual(Object.keys(res.jsonBody.errors).sort(), ['email', 'practice'])
  assert.equal(sent.length, 0)
})

test('dry run validates but does not send', async () => {
  const { deps, req, sent, logs } = setup({ dryRun: true })
  const res = await handleEnquiry(req(goodEnquiry()), deps)
  assert.equal(res.status, 200)
  assert.equal(sent.length, 0)
  assert.equal(logs.at(-1).outcome, 'dry-run')
})

test('send failure returns 502 with a fallback email address', async () => {
  const { deps, req, logs } = setup({ sendFails: true })
  const res = await handleEnquiry(req(goodEnquiry()), deps)
  assert.equal(res.status, 502)
  assert.match(res.jsonBody.error, /hi@surveysuite\.co\.uk/)
  assert.equal(logs.at(-1).outcome, 'error')
})
