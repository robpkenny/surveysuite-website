import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateEnquiry } from '../src/lib/validate.js'
import { SURVEYOR_COUNTS } from '../src/lib/fields.js'
import { goodEnquiry } from './helpers.js'

test('accepts a complete enquiry and tidies it', () => {
  const r = validateEnquiry(goodEnquiry({ name: '  Jane   Surveyor ', email: 'JANE@Example-Practice.co.uk ' }))
  assert.equal(r.ok, true)
  assert.equal(r.value.name, 'Jane Surveyor')
  assert.equal(r.value.email, 'jane@example-practice.co.uk')
})

test('phone, surveyors and message are optional', () => {
  assert.equal(validateEnquiry(goodEnquiry({ phone: '', surveyors: '', message: '' })).ok, true)
})

test('every surveyor-count option is accepted', () => {
  for (const s of SURVEYOR_COUNTS) assert.equal(validateEnquiry(goodEnquiry({ surveyors: s })).ok, true, s)
})

test('surveyor counts accept any dash style', () => {
  for (const s of ['2-5', '2—5', '2 – 5', '6 - 10']) {
    const r = validateEnquiry(goodEnquiry({ surveyors: s }))
    assert.equal(r.ok, true, s)
    assert.match(r.value.surveyors, /^\d+–\d+$/)
  }
})

test('rejects missing required fields with plain-English messages', () => {
  const r = validateEnquiry({ product: 'auto' })
  assert.equal(r.ok, false)
  assert.deepEqual(Object.keys(r.errors).sort(), ['email', 'name', 'practice'])
  assert.match(r.errors.email, /valid work email/)
})

test('rejects unknown product and surveyor count', () => {
  const r = validateEnquiry(goodEnquiry({ product: 'rocket', surveyors: '500' }))
  assert.deepEqual(Object.keys(r.errors).sort(), ['product', 'surveyors'])
})

test('rejects bad email and phone', () => {
  assert.ok(validateEnquiry(goodEnquiry({ email: 'not-an-email' })).errors.email)
  assert.ok(validateEnquiry(goodEnquiry({ email: 'a b@x.com' })).errors.email)
  assert.ok(validateEnquiry(goodEnquiry({ phone: 'call me' })).errors.phone)
})

test('rejects over-long fields', () => {
  assert.ok(validateEnquiry(goodEnquiry({ message: 'x'.repeat(2001) })).errors.message)
  assert.ok(validateEnquiry(goodEnquiry({ practice: 'x'.repeat(151) })).errors.practice)
})

test('single-line fields cannot carry line breaks (subject safety)', () => {
  const r = validateEnquiry(goodEnquiry({ practice: 'Evil\r\nBcc: someone@else.com' }))
  assert.equal(r.ok, true)
  assert.doesNotMatch(r.value.practice, /[\r\n]/)
})

test('rejects control characters', () => {
  assert.ok(validateEnquiry(goodEnquiry({ message: 'hello\u0007' })).errors.message)
})

test('ignores non-object input', () => {
  assert.equal(validateEnquiry(null).ok, false)
  assert.equal(validateEnquiry('x').ok, false)
})
