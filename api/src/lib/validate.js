import { LIMITS, PRODUCTS, SURVEYOR_COUNTS } from './fields.js'

// Plain, practical email check: something@something.tld, no spaces, no angle brackets.
const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/
// Digits, spaces and the usual phone punctuation.
const PHONE = /^[0-9+()\-\s]{7,}$/
// Control characters other than tab/newline (blocks header tricks and junk).
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/

const clean = (v) => (typeof v === 'string' ? v.trim() : '')
const oneLine = (v) => clean(v).replace(/\s+/g, ' ')

/**
 * Checks and tidies a submitted enquiry.
 * Returns { ok: true, value } or { ok: false, errors: { field: message } }.
 * Error messages are shown to the visitor, so they're plain English.
 */
export function validateEnquiry(input) {
  const body = input && typeof input === 'object' ? input : {}
  const errors = {}

  const name = oneLine(body.name)
  const email = clean(body.email).toLowerCase()
  const practice = oneLine(body.practice)
  const phone = oneLine(body.phone)
  const product = clean(body.product)
  // Accept any dash style ("2-5", "2—5", "2 – 5") and store the en-dash form used in the options.
  const surveyors = clean(body.surveyors).replace(/\s*[-‐‑‒–—―]\s*/g, '–')
  const message = clean(body.message).replace(/\r\n?/g, '\n')

  if (name.length < 2) errors.name = 'Please enter your name.'
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`

  if (!EMAIL.test(email) || email.length > LIMITS.email) errors.email = 'Please enter a valid work email address.'

  if (practice.length < 2) errors.practice = 'Please enter your practice name.'
  else if (practice.length > LIMITS.practice) errors.practice = `Please keep the practice name under ${LIMITS.practice} characters.`

  if (phone && (!PHONE.test(phone) || phone.length > LIMITS.phone)) errors.phone = 'Please enter a valid phone number, or leave it blank.'

  if (!Object.hasOwn(PRODUCTS, product)) errors.product = 'Please choose a product.'

  if (surveyors && !SURVEYOR_COUNTS.includes(surveyors)) errors.surveyors = 'Please choose the number of surveyors, or leave it blank.'

  if (message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`

  for (const [field, value] of Object.entries({ name, email, practice, phone, message })) {
    if (CONTROL.test(value)) errors[field] ??= 'This field contains characters we can’t accept.'
  }

  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, value: { name, email, practice, phone, product, surveyors, message } }
}
