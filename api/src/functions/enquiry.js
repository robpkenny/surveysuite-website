import { app } from '@azure/functions'
import { createManagedIdentityCredential } from '../lib/token.js'
import { handleEnquiry } from '../lib/handler.js'
import { createGraphSender } from '../lib/email.js'
import { createRateLimiter } from '../lib/spam.js'

// Settings come from the function app's application settings (never from the repo).
const env = (name, fallback = '') => (process.env[name] ?? fallback).trim()

const mailFrom = env('MAIL_FROM', 'hi@surveysuite.co.uk')
const mailTo = env('MAIL_TO', mailFrom)
const allowedOrigins = env('ALLOWED_ORIGINS', 'https://www.surveysuite.co.uk')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, '').toLowerCase())
  .filter(Boolean)
const dryRun = env('ENQUIRY_DRY_RUN').toLowerCase() === 'true'

const allow = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 })

let send
function getSender() {
  // Created on first real send, so local dry runs don't need Azure credentials.
  send ??= createGraphSender({
    credential: createManagedIdentityCredential({ clientId: env('MANAGED_IDENTITY_CLIENT_ID') }),
    from: mailFrom,
  })
  return send
}

app.http('enquiry', {
  methods: ['POST'],
  authLevel: 'anonymous', // Reachable only through the website: Static Web Apps protects the linked function app.
  route: 'enquiry',
  handler: async (request, context) => {
    const bodyText = await request.text()
    return handleEnquiry(
      { method: request.method, headers: request.headers, bodyText },
      {
        allowedOrigins,
        allow,
        send: (payload) => getSender()(payload),
        mailTo,
        contactEmail: mailFrom,
        dryRun,
        log: (event) => context.log(JSON.stringify({ event: 'enquiry', ...event })),
      },
    )
  },
})
