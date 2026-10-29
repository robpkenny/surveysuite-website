import type { IconName } from '../components/Icon'
import type { Feature } from './products'

// Copy for the Survey Suite Desktop product page.
// Describe only what Desktop does today. Anything still in development must not appear here as live.

export interface DesktopFeature {
  icon: IconName
  label: string
  heading: string
  text: string
  points: string[]
}

export interface FeatureGroup {
  id: string
  title: string
  line: string
  features: DesktopFeature[]
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'work',
    title: 'The work',
    line: 'Every instruction, from first enquiry to booked inspection.',
    features: [
      {
        icon: 'briefcase',
        label: 'Job management',
        heading: 'Every job in one place',
        text: 'A central jobs database holds current and historic work, each job with its own reference and a clear status.',
        points: ['Unique job references', 'Status tracking', 'Structured workflow', 'Linked property, client and contacts'],
      },
      {
        icon: 'file-text',
        label: 'Enquiries & quotations',
        heading: 'Turn enquiries into instructions',
        text: 'Log enquiries, send quotations and follow each one through the pipeline until it becomes an active job.',
        points: ['Lead and enquiry management', 'Quotation workflow', 'Job pipeline'],
      },
      {
        icon: 'calendar',
        label: 'Diary & scheduling',
        heading: 'Keep the team organised',
        text: 'A shared team diary for booking inspections and allocating surveyors, with upcoming work visible to everyone.',
        points: ['Team diary', 'Inspection scheduling', 'Surveyor allocation'],
      },
    ],
  },
  {
    id: 'people',
    title: 'The people',
    line: 'Clients, properties and the professionals around each job.',
    features: [
      {
        icon: 'users',
        label: 'Client & contact management',
        heading: 'Connected client and property records',
        text: 'Clients, properties, referrers, estate agents, solicitors and surveyors are held once and reused across every job they touch, so the same details are not typed in again.',
        points: ['Clients and properties', 'Estate agents and solicitors', 'Referrers and surveyors'],
      },
      {
        icon: 'tag',
        label: 'Referrer management',
        heading: 'Manage referral relationships',
        text: 'Keep a record of each referrer, see the jobs they have sent you and track referrals over time, including reward or voucher workflows where you use them.',
        points: ['Referrer records', 'Jobs linked to referrers', 'Referral tracking'],
      },
      {
        icon: 'message',
        label: 'Client communications',
        heading: 'Keep clients informed',
        text: 'Client communication is tied to the job workflow, so progress updates draw on the same client and job information as everything else.',
        points: ['Linked to the job workflow', 'Job progress updates', 'Part of the wider Survey Suite client experience'],
      },
    ],
  },
  {
    id: 'paperwork',
    title: 'The paperwork',
    line: 'Documents, tasks and the admin around every instruction.',
    features: [
      {
        icon: 'folder',
        label: 'Documents & job files',
        heading: 'Documents where you need them',
        text: 'Documents sit against the job they belong to, in structured job folders that the whole team can reach from one place.',
        points: ['Structured job folders', 'Central access to job documents', 'Linked to the Survey Suite document workflow'],
      },
      {
        icon: 'clipboard',
        label: 'Automated paperwork',
        heading: 'Stop typing the same information twice',
        text: 'Details already held against the client and job can feed the wider Survey Suite paperwork workflow, rather than being re-keyed for each document.',
        points: ['Contracts', 'Invoices', 'Client paperwork', 'Job folders'],
      },
      {
        icon: 'check-square',
        label: 'Task management',
        heading: 'Keep on top of the details',
        text: 'Central task management for job-related actions and follow-ups, designed to sit alongside your wider Microsoft workflows.',
        points: ['Central task list', 'Job-related actions', 'Follow-up activities'],
      },
    ],
  },
  {
    id: 'business',
    title: 'The business',
    line: 'Automation and oversight across the whole practice.',
    features: [
      {
        icon: 'zap',
        label: 'Workflow automation',
        heading: 'Put routine administration on autopilot',
        text: 'Routine steps around enquiries, quotations, allocation, paperwork, invoicing, reporting and follow-ups can run automatically as a job changes status. The aim is less repetitive admin, not replacing professional judgement.',
        points: ['Status-based processes', 'Job allocation', 'Invoicing and follow-ups'],
      },
      {
        icon: 'pie-chart',
        label: 'Management dashboards',
        heading: 'See what’s happening across the business',
        text: 'Management dashboards bring together operational reporting, financial information and a view of where work sits in the workflow.',
        points: ['Operational reporting', 'Financial information', 'Workflow visibility'],
      },
      {
        icon: 'link',
        label: 'Connected reporting workflow',
        heading: 'Connect the office to report production',
        text: 'Desktop is designed to sit at the centre of the surveying workflow, linking job management with the Survey Suite reporting environment and the mobile workflow.',
        points: ['Job data flows to reporting', 'Connected to the field', 'One job record throughout'],
      },
    ],
  },
]

/** Everything the job record connects, shown in the introduction. */
export const jobLinks = [
  'Clients',
  'Properties',
  'Surveyors',
  'Referrers',
  'Estate agents',
  'Solicitors',
  'Documents',
  'Appointments',
  'Services',
]

export const workflow: { title: string; text: string }[] = [
  { title: 'Enquiry', text: 'Captured and logged against the client.' },
  { title: 'Quote', text: 'Prepared from the details already held.' },
  { title: 'Instruction', text: 'The quote becomes a live job.' },
  { title: 'Book inspection', text: 'Diary slot and surveyor allocated.' },
  { title: 'Survey', text: 'Job details go out to the field.' },
  { title: 'Report', text: 'Linked to the reporting workflow.' },
  { title: 'Invoice', text: 'Raised from the job record.' },
  { title: 'Follow-up', text: 'Tasks and client contact tracked.' },
  { title: 'Complete', text: 'Closed and kept in the job history.' },
]

export const microsoft: Feature[] = [
  { icon: 'database', label: 'Secure business data', detail: 'Structured business information held in Microsoft Dataverse.' },
  { icon: 'zap', label: 'Automation', detail: 'Power Automate supports connected administrative workflows.' },
  { icon: 'folder', label: 'Documents', detail: 'SharePoint can support structured document and job-file storage.' },
  { icon: 'grid', label: 'Business applications', detail: 'Power Apps provides the application experience.' },
]

export const benefits: Feature[] = [
  { icon: 'link', label: 'Enter information once', detail: 'Reuse client, property and job information throughout the workflow.' },
  { icon: 'briefcase', label: 'One job record', detail: 'Keep everything about a surveying instruction connected.' },
  { icon: 'zap', label: 'Less administration', detail: 'Automate repetitive administrative processes where appropriate.' },
  { icon: 'users', label: 'Connected team', detail: 'Office staff and surveyors work from the same job information.' },
  { icon: 'list', label: 'Clearer workflow', detail: 'See where every job sits within the surveying process.' },
  { icon: 'ruler', label: 'Built for surveying', detail: 'Terminology and workflows designed around residential surveying businesses.' },
]

export const demoEmailSubject = 'Survey Suite Desktop demo request'
