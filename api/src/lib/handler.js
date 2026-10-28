import { LIMITS } from './fields.js'
import { botReason, clientIp, originAllowed } from './spam.js'
import { validateEnquiry } from './validate.js'
import { buildEnquiryMail } from './email.js'

const json = (status, body) => ({ status, jsonBody: body })

/**
 * Handles one enquiry submission. Kept free of Azure types so it can be unit-tested.
 *
 * Logging rule: never log names, emails, phone numbers or messages. Only the outcome,
 * the product and (for blocked requests) the reason.
 *
 * @param {{ method: string, headers: { get(name: string): string | null }, bodyText: string }} req
 * @param {{ allowedOrigins: string[], allow: (key: string) => boolean, send: (payload: object) => Promise<void>,
 *           mailTo: string, contactEmail: string, dryRun: boolean, log: (event: object) => void, now?: () => Date }} deps
 */
export async function handleEnquiry(req, deps) {
  const { allowedOrigins, allow, send, mailTo, contactEmail, dryRun, log, now = () => new Date() } = deps

  if (req.method !== 'POST') return json(405, { error: 'Method not allowed.' })

  // Browsers send Origin on POST. If a proxy ever drops it, fall back to the Referer's origin.
  const referer = req.headers.get('referer')
  let origin = req.headers.get('origin')
  if (!origin && referer) {
    try { origin = new URL(referer).origin } catch { origin = null }
  }
  if (!originAllowed(origin, allowedOrigins)) {
    log({ outcome: 'blocked', reason: 'origin' })
    return json(403, { error: 'Forbidden.' })
  }

  if (Buffer.byteLength(req.bodyText ?? '', 'utf8') > LIMITS.bodyBytes) {
    log({ outcome: 'blocked', reason: 'too-large' })
    return json(413, { error: 'That enquiry is too long. Please shorten your message.' })
  }

  let body
  try {
    body = JSON.parse(req.bodyText || '')
  } catch {
    log({ outcome: 'rejected', reason: 'bad-json' })
    return json(400, { error: 'We couldn’t read that enquiry. Please try again.' })
  }

  if (!allow(clientIp(req.headers))) {
    log({ outcome: 'blocked', reason: 'rate-limit' })
    return json(429, { error: `You’ve sent several enquiries already. Please wait a while, or email ${contactEmail}.` })
  }

  // Bots get a normal-looking success so they don't learn what tripped them; nothing is sent.
  const bot = botReason(body)
  if (bot) {
    log({ outcome: 'blocked', reason: bot })
    return json(200, { ok: true })
  }

  const result = validateEnquiry(body)
  if (!result.ok) {
    log({ outcome: 'rejected', reason: 'validation', fields: Object.keys(result.errors) })
    return json(400, { errors: result.errors })
  }

  const payload = buildEnquiryMail(result.value, { to: mailTo, receivedAt: now() })

  if (dryRun) {
    log({ outcome: 'dry-run', product: result.value.product })
    return json(200, { ok: true })
  }

  try {
    await send(payload)
  } catch (err) {
    log({ outcome: 'error', product: result.value.product, error: String(err?.message ?? err).slice(0, 400) })
    return json(502, { error: `Sorry, we couldn’t send your enquiry just now. Please email ${contactEmail} instead.` })
  }

  log({ outcome: 'sent', product: result.value.product })
  return json(200, { ok: true })
}
