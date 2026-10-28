// Shared test helpers.
export const headers = (h = {}) => {
  const m = new Map(Object.entries(h).map(([k, v]) => [k.toLowerCase(), v]))
  return { get: (k) => m.get(k.toLowerCase()) ?? null }
}

export const goodEnquiry = (over = {}) => ({
  name: 'Jane Surveyor',
  email: 'jane@example-practice.co.uk',
  practice: 'Example Surveyors Ltd',
  phone: '01243 123456',
  product: 'auto',
  surveyors: '2–5',
  message: 'We would like a demo of Auto.\nTuesdays suit us.',
  website: '',
  elapsedMs: 12_000,
  ...over,
})
