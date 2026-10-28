// Company and contact details used across the site.
// FOLLOW-UP: icoNumber is still a [BRACKETED] placeholder. While it is, the privacy page hides the ICO line.
// Replace it with the real registration number when it arrives (see SITE_NOTES.md).

export const company = {
  legalName: 'Kenny Relf Surveyors Ltd',
  tradingName: 'Survey Suite',
  companyNumber: '15710090',
  registeredIn: 'England and Wales',
  registeredOffice: ['Cawley Priory', 'South Pallant', 'Chichester', 'West Sussex', 'PO19 1SY'],
  icoNumber: '[ICO REG NUMBER]',
}

export const contactEmail = 'hi@surveysuite.co.uk'
export const privacyEmail = 'hi@surveysuite.co.uk'

export const siteUrl = 'https://www.surveysuite.co.uk'

/** True while a value is still a [BRACKETED] placeholder. */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value)

/** Date the privacy and cookie pages were last reviewed. Update when they change. */
export const policyUpdated = '2026-10-28'
