import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildEnquiryMail, createGraphSender } from '../src/lib/email.js'
import { validateEnquiry } from '../src/lib/validate.js'
import { goodEnquiry } from './helpers.js'

const enquiry = (over) => validateEnquiry(goodEnquiry(over)).value

test('mail goes to the mailbox, with Reply-To set to the visitor', () => {
  const p = buildEnquiryMail(enquiry(), { to: 'hi@surveysuite.co.uk', receivedAt: new Date('2026-10-28T10:00:00Z') })
  assert.equal(p.message.toRecipients[0].emailAddress.address, 'hi@surveysuite.co.uk')
  assert.equal(p.message.replyTo[0].emailAddress.address, 'jane@example-practice.co.uk')
  assert.equal(p.message.subject, 'Demo enquiry: Survey Suite Auto – Example Surveyors Ltd')
  assert.equal(p.saveToSentItems, false)
})

test('body includes every field, including number of surveyors', () => {
  const html = buildEnquiryMail(enquiry(), { to: 'hi@x.co.uk' }).message.body.content
  for (const s of ['Jane Surveyor', 'jane@example-practice.co.uk', 'Example Surveyors Ltd', '01243 123456', 'Survey Suite Auto', 'Number of surveyors', '2–5', 'Tuesdays suit us']) {
    assert.ok(html.includes(s), s)
  }
})

test('optional fields show as "Not given"', () => {
  const html = buildEnquiryMail(enquiry({ phone: '', surveyors: '', message: '' }), { to: 'hi@x.co.uk' }).message.body.content
  assert.match(html, /Phone<\/th><td[^>]*>Not given/)
  assert.match(html, /Number of surveyors<\/th><td[^>]*>Not given/)
  assert.match(html, /No message/)
})

test('visitor input is HTML-escaped', () => {
  const html = buildEnquiryMail(enquiry({ message: '<script>alert(1)</script>' }), { to: 'hi@x.co.uk' }).message.body.content
  assert.ok(!html.includes('<script>'))
  assert.ok(html.includes('&lt;script&gt;'))
})

test('Graph sender posts to the shared mailbox and treats 202 as success', async () => {
  const calls = []
  const send = createGraphSender({
    credential: { getToken: async () => ({ token: 'tkn' }) },
    from: 'hi@surveysuite.co.uk',
    fetchImpl: async (url, init) => { calls.push({ url, init }); return { status: 202, text: async () => '' } },
  })
  await send({ message: {} })
  assert.equal(calls[0].url, 'https://graph.microsoft.com/v1.0/users/hi%40surveysuite.co.uk/sendMail')
  assert.equal(calls[0].init.headers.Authorization, 'Bearer tkn')
})

test('Graph sender throws on failure', async () => {
  const send = createGraphSender({
    credential: { getToken: async () => ({ token: 't' }) },
    from: 'hi@x.co.uk',
    fetchImpl: async () => ({ status: 403, text: async () => '{"error":{"code":"ErrorAccessDenied"}}' }),
  })
  await assert.rejects(send({}), /403 .*ErrorAccessDenied/)
})
