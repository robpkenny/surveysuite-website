// The enquiry form's fields and allowed values.
// The website form (PR B) must send exactly these names and values.

export const PRODUCTS = {
  auto: 'Survey Suite Auto',
  desktop: 'Survey Suite Desktop',
  mobile: 'Survey Suite Mobile',
  inspect: 'Survey Suite Inspect',
  'not-sure': 'Not sure yet',
}

export const SURVEYOR_COUNTS = ['1', '2–5', '6–10', '10+']

export const LIMITS = {
  name: 100,
  email: 254,
  practice: 150,
  phone: 30,
  message: 2000,
  bodyBytes: 10_000,
}
