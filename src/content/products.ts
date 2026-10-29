import type { IconName } from '../components/Icon'

export type ProductSlug = 'desktop' | 'mobile' | 'inspect' | 'auto'

export interface Feature {
  icon: IconName
  label: string
  detail: string
  /** Shown as a badge when set. Leave unset for products that don't track status. */
  status?: 'live' | 'coming-soon'
}

export interface Step {
  icon: IconName
  title: string
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
  /** Optional extras. Each one adds a section to the product page when present. */
  meta?: { title: string; description: string }
  audience?: string
  howItWorks?: Step[]
  benefits?: Step[]
  availability?: { label: string; heading: string; text: string; cta: string; emailSubject: string; pricing: string }
  safetyNote?: string
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
    tagline: 'CRM, job management and business automation built specifically for surveying practices.',
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
    // Wording from the Survey Suite Auto product brief (Oct 2026). Don't add claims that aren't in the brief.
    slug: 'auto',
    name: 'Survey Suite Auto',
    short: 'Auto',
    where: 'On the road',
    whereIcon: 'car',
    headline: 'Your surveying day. Connected.',
    tagline: 'Hands-free help between inspections.',
    summary:
      'Your car becomes part of the office – the day’s jobs, directions, calls and site notes, hands-free, from the moment you start the engine.',
    strap: 'Early access',
    meta: {
      title: 'Survey Suite Auto: hands-free in-car system for surveyors',
      description:
        'Your car becomes part of the office: directions, hands-free calls and spoken site notes for residential surveyors on the road. Early access. Pricing on request.',
    },
    audience: 'For residential surveyors who spend much of the day driving between inspections.',
    howItWorks: [
      {
        icon: 'tablet',
        title: 'A small computer in the car',
        detail: 'A small in-car computer (Raspberry Pi 5) connects to the car’s power and works with a dashboard tablet.',
      },
      {
        icon: 'shield',
        title: 'Signs in with your work account',
        detail: 'It signs in with your Microsoft work account, so it only shows your own jobs and data.',
      },
      {
        icon: 'refresh',
        title: 'Linked to Survey Suite Core',
        detail: 'It links to Survey Suite Core, so jobs, clients and notes stay in one system.',
      },
    ],
    features: [
      { status: 'live', icon: 'tablet', label: 'Dashboard tablet', detail: 'A full-screen, distraction-free layout.' },
      { status: 'live', icon: 'navigation', label: 'Maps and navigation', detail: 'GPS directions to your next inspection.' },
      { status: 'live', icon: 'phone', label: 'Hands-free calls and music', detail: 'Bluetooth calls and music controls.' },
      { status: 'live', icon: 'mic', label: 'Voice dictation', detail: 'Speak your site notes instead of typing them.' },
      { status: 'live', icon: 'gauge', label: 'Vehicle information', detail: 'Read from the car’s diagnostics port (OBD).' },
      { status: 'live', icon: 'power', label: 'Safe automatic shutdown', detail: 'Shuts down safely to protect the car battery.' },
      { status: 'coming-soon', icon: 'list', label: 'Today’s jobs', detail: 'Your job list, pulled from Survey Suite Core.' },
      { status: 'coming-soon', icon: 'map-pin', label: 'Next inspection, chosen for you', detail: 'Picked automatically using GPS and today’s job list.' },
      { status: 'coming-soon', icon: 'volume', label: 'Pre-arrival briefing', detail: 'Client, access notes and known risks, read aloud.' },
      { status: 'coming-soon', icon: 'sparkles', label: 'AI assistant', detail: 'Ask spoken questions about jobs and reports.' },
      { status: 'coming-soon', icon: 'hud', label: 'Heads-up display', detail: 'Speed, next turn and next job on the windscreen.' },
    ],
    benefits: [
      { icon: 'clipboard', title: 'Less admin between jobs', detail: 'Directions, calls and site notes are handled hands-free.' },
      { icon: 'mic', title: 'Notes captured while they’re fresh, without typing', detail: 'Speak your site notes and they’re written down for you.' },
      { icon: 'volume', title: 'Arrive at every inspection already briefed', detail: 'The pre-arrival briefing (coming soon) reads out the client, access notes and known risks on the way.' },
      { icon: 'home', title: 'Built by a surveyor', detail: 'Built and used daily by a practising RICS surveyor.' },
      // Benefits are from the brief. Keep to 3–4 short points.
    ],
    availability: {
      // Reads as: "Early access – currently in use at Kenny Relf Surveyors. Register your interest."
      label: 'Early access',
      heading: 'Currently in use at Kenny Relf Surveyors.',
      text: 'Register your interest.',
      cta: 'Register your interest',
      emailSubject: 'Survey Suite Auto – early access',
      pricing: 'Pricing on request',
    },
    safetyNote:
      'Survey Suite Auto is designed for hands-free use. Drivers must follow the Highway Code and only interact with the system when it is safe and legal to do so.',
    inTheDay: 'Between inspections, Auto handles directions, calls and spoken site notes, hands-free.',
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
