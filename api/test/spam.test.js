import { test } from 'node:test'
import assert from 'node:assert/strict'
import { botReason, clientIp, createRateLimiter, originAllowed } from '../src/lib/spam.js'
import { headers } from './helpers.js'

test('honeypot, timing and stale checks', () => {
  assert.equal(botReason({ website: 'http://spam', elapsedMs: 9000 }), 'honeypot')
  assert.equal(botReason({ website: '' }), 'no-timing')
  assert.equal(botReason({ elapsedMs: 800 }), 'too-fast')
  assert.equal(botReason({ elapsedMs: 2 * 24 * 3600 * 1000 }), 'stale')
  assert.equal(botReason({ website: '', elapsedMs: 9000 }), null)
})

test('origin must match exactly (case and trailing slash tolerant)', () => {
  const allowed = ['https://www.surveysuite.co.uk']
  assert.equal(originAllowed('https://www.surveysuite.co.uk', allowed), true)
  assert.equal(originAllowed('https://WWW.surveysuite.co.uk/', allowed), true)
  assert.equal(originAllowed('https://evil.example', allowed), false)
  assert.equal(originAllowed('https://www.surveysuite.co.uk.evil.example', allowed), false)
  assert.equal(originAllowed(null, allowed), false)
})

test('rate limiter allows 5 per window per visitor, then recovers', () => {
  let t = 0
  const allow = createRateLimiter({ max: 5, windowMs: 1000, now: () => t })
  for (let i = 0; i < 5; i++) assert.equal(allow('1.2.3.4'), true)
  assert.equal(allow('1.2.3.4'), false)
  assert.equal(allow('5.6.7.8'), true, 'other visitors unaffected')
  t = 1001
  assert.equal(allow('1.2.3.4'), true, 'window has passed')
})

test('client IP from forwarded headers', () => {
  assert.equal(clientIp(headers({ 'x-azure-clientip': '81.2.3.4' })), '81.2.3.4')
  assert.equal(clientIp(headers({ 'x-forwarded-for': '81.2.3.4:51234, 10.0.0.1' })), '81.2.3.4')
  assert.equal(clientIp(headers({ 'x-forwarded-for': '2a00:23c6::1' })), '2a00:23c6::1')
  assert.equal(clientIp(headers({})), 'unknown')
})
