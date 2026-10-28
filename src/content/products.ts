import type { IconName } from '../components/Icon'

export type ProductSlug = 'desktop' | 'mobile' | 'inspect' | 'auto'

export interface Feature {
  icon: IconName
  label: string
  detail: string
}

export interface Product {
  slug: ProductSlug
  name: string
  short: string
  where: string
  whereIcon: IconName
  headline: string
  tagline: string
  summary: string
  strap: string
  features: Feature[]
  inTheDay: string
}

// Wording taken from the Survey Suite product sheets.
export const products: Product[] = [
  {
    slug: 'desktop',
    name: 'Survey Suite Desktop',
    short: 'Desktop',
    where: 'In the office',
    whereIcon: 'building',
    headline: 'Your business. Under control.',
    tagline: 'The central management system for your surveying practice.',
    summary:
      'Manage clients, jobs, properties and reporting in one powerful workspace, with a live view of where every instruction stands.',
    strap: 'Simple software. Smarter surveying.',
    features: [
      { icon: 'briefcase', label: 'Job management', detail: 'Every instruction from first call to issued report.' },
      { icon: 'calendar', label: 'Appointments', detail: 'Book inspections and keep surveyors’ diaries straight.' },
      { icon: 'users', label: 'Client management', detail: 'Contacts, history and correspondence in one record.' },
      { icon: 'file-text', label: 'Quotes & instructions', detail: 'Turn an enquiry into a quote, then a confirmed job.' },
      { icon: 'home', label: 'Property records', detail: 'Addresses, details and past surveys for every property.' },
      { icon: 'folder', label: 'Document management', detail: 'Reports, letters and photos filed against the job.' },
      { icon: 'bar-chart', label: 'Reporting & analytics', detail: 'See work by type, status and surveyor.' },
      { icon: 'pie-chart', label: 'Business dashboards', detail: 'Active jobs, clients and reports at a glance.' },
    ],
    inTheDay: 'Jobs are created and managed in the office, then flow out to surveyors’ phones, cars and tablets.',
  },
  {
    slug: 'mobile',
    name: 'Survey Suite Mobile',
    short: 'Mobile',
    where: 'In your pocket',
    whereIcon: 'smartphone',
    headline: 'Your office. In your pocket.',
    tagline: 'Your surveying workload, wherever the working day takes you.',
    summary:
      'Access essential job, client and agent information quickly and easily on the move, and add new jobs as they come in.',
    strap: 'Information. Anytime. Anywhere.',
    features: [
      { icon: 'calendar', label: 'Today’s jobs', detail: 'What’s booked for today, in order.' },
      { icon: 'calendar-plus', label: 'Tomorrow’s jobs', detail: 'Plan ahead before you leave the last site.' },
      { icon: 'list', label: 'All jobs', detail: 'Your full workload, a tap away.' },
      { icon: 'plus-circle', label: 'New job creation', detail: 'Capture an instruction the moment it arrives.' },
      { icon: 'users', label: 'Client information', detail: 'Names, numbers and history on hand.' },
      { icon: 'building', label: 'Agent information', detail: 'Who instructed it and how to reach them.' },
      { icon: 'search', label: 'Job search', detail: 'Find any job by number, address or postcode.' },
      { icon: 'file-text', label: 'Notes', detail: 'Jot it down while it’s fresh.' },
    ],
    inTheDay: 'Between appointments, Mobile keeps the whole workload in your pocket, from today’s list to tomorrow’s plan.',
  },
  {
    slug: 'inspect',
    name: 'Survey Suite Inspect',
    short: 'Inspect',
    where: 'On site',
    whereIcon: 'clipboard',
    headline: 'Smarter inspections. Better information.',
    tagline: 'A digital inspection workspace designed around professional property surveyors.',
    summary:
      'Capture observations, notes and photographic evidence on site, in a structure that carries straight through to the report.',
    strap: 'Capture today. A clearer tomorrow.',
    features: [
      { icon: 'list', label: 'Structured inspections', detail: 'A consistent route through every property.' },
      { icon: 'home', label: 'Condition assessments', detail: 'Record condition element by element.' },
      { icon: 'file-text', label: 'Digital site notes', detail: 'Typed or spoken notes, filed as you go.' },
      { icon: 'camera', label: 'Photographic evidence', detail: 'Photos labelled against the right observation.' },
      { icon: 'map-pin', label: 'Property details', detail: 'Location and key facts at the top of the job.' },
      { icon: 'check-square', label: 'Inspection checklists', detail: 'Nothing missed, every time.' },
      { icon: 'cloud-off', label: 'Offline working', detail: 'Keep working where there’s no signal.' },
      { icon: 'bar-chart', label: 'Report preparation', detail: 'Findings arrive ready to write up.' },
    ],
    inTheDay: 'On site, Inspect replaces the clipboard: notes, photos and defects captured once, in order.',
  },
  {
    slug: 'auto',
    name: 'Survey Suite Auto',
    short: 'Auto',
    where: 'On the road',
    whereIcon: 'car',
    headline: 'Your surveying day. Connected.',
    tagline: 'A purpose-built in-vehicle interface for surveyors on the road.',
    summary:
      'Access job information, property addresses and navigation in one simple, safe interface designed for the car.',
    strap: 'From one property to the next. Stay connected.',
    features: [
      { icon: 'navigation', label: 'Job navigation', detail: 'Go straight from the job list to directions.' },
      { icon: 'mic', label: 'Voice controls', detail: 'Hands-free operation while you drive.' },
      { icon: 'map-pin', label: 'GPS integration', detail: 'Distances to each job from where you are.' },
      { icon: 'car', label: 'Vehicle dashboard', detail: 'Designed for in-car screens, not squeezed onto them.' },
      { icon: 'search', label: 'Job search', detail: 'By job number, address or postcode.' },
      { icon: 'refresh', label: 'Job synchronisation', detail: 'Today’s jobs, kept up to date.' },
      { icon: 'calendar', label: 'Daily job information', detail: 'Your day’s list, ready when you start the car.' },
      { icon: 'shield', label: 'Simple, safe interface', detail: 'Big targets and minimal distraction.' },
    ],
    inTheDay: 'Between properties, Auto puts the next job and the route on the car’s screen, hands-free.',
  },
]

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)

// The wider family, from the Survey Suite brand sheet.
export const family: { name: string; line: string; icon: IconName }[] = [
  { name: 'Survey CRM', line: 'Manage relationships. Grow your business.', icon: 'users' },
  { name: 'Survey Reports', line: 'Create professional reports, faster.', icon: 'bar-chart' },
  { name: 'Survey Portal', line: 'Keep clients informed, every step of the way.', icon: 'message' },
  { name: 'Survey AI', line: 'Your intelligent surveying assistant.', icon: 'sparkles' },
  { name: 'Survey Safe', line: 'Secure storage. Total peace of mind.', icon: 'shield' },
  { name: 'Survey Finance', line: 'Track finances. Stay in control.', icon: 'pound' },
  { name: 'Survey Schedule', line: 'Plan jobs. Manage diaries. Save time.', icon: 'calendar' },
]
