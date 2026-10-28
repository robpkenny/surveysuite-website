// Spam protection without third-party services or cookies.

/** Minimum time a person plausibly takes to fill in the form. */
export const MIN_FILL_MS = 3_000
/** Forms older than this are treated as stale (or replayed). */
export const MAX_FILL_MS = 24 * 60 * 60 * 1000

/**
 * Bot checks on the submitted body.
 * - `website` is a hidden "honeypot" field: people never see it, bots fill it in.
 * - `elapsedMs` is how long the form was open before submitting, measured in the browser.
 * Returns the reason if it looks like a bot, otherwise null.
 */
export function botReason(body) {
  if (typeof body?.website === 'string' && body.website.trim() !== '') return 'honeypot'
  const elapsed = Number(body?.elapsedMs)
  if (!Number.isFinite(elapsed)) return 'no-timing'
  if (elapsed < MIN_FILL_MS) return 'too-fast'
  if (elapsed > MAX_FILL_MS) return 'stale'
  return null
}

/**
 * The request must come from our own site. Browsers always send Origin on POST,
 * so a missing or foreign Origin means a script or another site.
 */
export function originAllowed(origin, allowed) {
  if (!origin) return false
  return allowed.includes(origin.replace(/\/$/, '').toLowerCase())
}

/**
 * Simple per-visitor limit: `max` enquiries per `windowMs`.
 * Kept in memory, so it's per running instance. That's enough for a contact form;
 * it stops one visitor hammering the endpoint, not a large distributed attack.
 */
export function createRateLimiter({ max = 5, windowMs = 60 * 60 * 1000, now = () => Date.now() } = {}) {
  const hits = new Map()
  return function allow(key) {
    const t = now()
    const recent = (hits.get(key) ?? []).filter((at) => t - at < windowMs)
    if (recent.length >= max) {
      hits.set(key, recent)
      return false
    }
    recent.push(t)
    hits.set(key, recent)
    if (hits.size > 5_000) {
      for (const [k, list] of hits) if (!list.some((at) => t - at < windowMs)) hits.delete(k)
    }
    return true
  }
}

/** The visitor's IP as forwarded by Azure Static Web Apps / Front Door. */
export function clientIp(headers) {
  const get = (name) => headers.get(name) ?? ''
  const raw = get('x-azure-clientip') || get('x-forwarded-for').split(',')[0] || get('x-client-ip') || 'unknown'
  // Strip a port from IPv4 ("1.2.3.4:5678"); leave IPv6 addresses alone.
  return raw.trim().replace(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/, '$1')
}
