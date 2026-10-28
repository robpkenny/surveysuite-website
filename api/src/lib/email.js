import { PRODUCTS } from './fields.js'

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

/**
 * Builds the Microsoft Graph sendMail payload for an enquiry.
 * Sent from the shared mailbox to itself, with Reply-To set to the visitor
 * so the team can just press Reply.
 */
export function buildEnquiryMail(enquiry, { to, receivedAt = new Date() }) {
  const product = PRODUCTS[enquiry.product] ?? enquiry.product
  const rows = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Practice', enquiry.practice],
    ['Phone', enquiry.phone || 'Not given'],
    ['Product', product],
    ['Number of surveyors', enquiry.surveyors || 'Not given'],
    ['Message', enquiry.message || 'No message'],
  ]
  const when = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/London' }).format(receivedAt)

  const html = `<p>New demo enquiry from the Survey Suite website, received ${esc(when)}.</p>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Segoe UI,Arial,sans-serif;font-size:14px">
${rows.map(([k, v]) => `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd;padding-right:16px">${esc(k)}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`).join('\n')}
</table>
<p style="color:#666;font-size:12px">Reply to this email to answer ${esc(enquiry.name)} directly.</p>`

  // Subject is built only from validated, single-line fields.
  const subject = `Demo enquiry: ${product} – ${enquiry.practice}`.slice(0, 200)

  return {
    message: {
      subject,
      body: { contentType: 'HTML', content: html },
      toRecipients: [{ emailAddress: { address: to } }],
      replyTo: [{ emailAddress: { address: enquiry.email, name: enquiry.name } }],
    },
    saveToSentItems: false,
  }
}

/**
 * Sends mail as `from` (the shared mailbox) using the function's managed identity.
 * Exchange limits this identity to sending as hi@surveysuite.co.uk only.
 */
export function createGraphSender({ credential, from, fetchImpl = fetch }) {
  return async function send(payload) {
    const { token } = await credential.getToken('https://graph.microsoft.com/.default')
    const res = await fetchImpl(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.status !== 202) {
      const detail = await res.text().catch(() => '')
      // Graph error bodies contain codes, not the enquiry, so they're safe to log.
      throw new Error(`Graph sendMail failed: ${res.status} ${detail.slice(0, 300)}`)
    }
  }
}
