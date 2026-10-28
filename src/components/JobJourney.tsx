import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import DeviceFrame from './DeviceFrame'
import Icon, { ForwardIcon, type IconName } from './Icon'
import { AutoScreen, DesktopScreen, InspectScreen, MobileScreen, sampleJob } from './ProductScreens'
import './JobJourney.css'

interface Step {
  id: string
  place: string
  product: string
  slug: string
  icon: IconName
  title: string
  body: string
}

const steps: Step[] = [
  {
    id: 'office', place: 'Office', product: 'Desktop', slug: 'desktop', icon: 'building',
    title: 'The instruction lands',
    body: 'The job is created against the client and property, booked in and assigned to a surveyor.',
  },
  {
    id: 'pocket', place: 'Pocket', product: 'Mobile', slug: 'mobile', icon: 'smartphone',
    title: 'It’s on the surveyor’s phone',
    body: 'Today’s list shows the time, the client and the access notes, with tomorrow’s jobs a tap away.',
  },
  {
    id: 'road', place: 'Road', product: 'Auto', slug: 'auto', icon: 'car',
    title: 'Directions on the dashboard',
    body: 'Auto guides you to the inspection, takes calls hands-free and records spoken site notes. Pulling the day’s jobs straight from Survey Suite Core is coming soon.',
  },
  {
    id: 'site', place: 'Site', product: 'Inspect', slug: 'inspect', icon: 'clipboard',
    title: 'It’s captured on site',
    body: 'Notes, photos and defects are recorded against the same job, structured and ready for the report.',
  },
]

function Stage({ id }: { id: string }) {
  switch (id) {
    case 'office':
      return <DeviceFrame kind="browser" label={`Survey Suite Desktop dashboard with job ${sampleJob.no} highlighted`}><DesktopScreen focusJob /></DeviceFrame>
    case 'pocket':
      return <DeviceFrame kind="phone" label={`Survey Suite Mobile showing today's jobs, with ${sampleJob.address} first`}><MobileScreen view="today" /></DeviceFrame>
    case 'road':
      return <DeviceFrame kind="car" label={`Survey Suite Auto on a dashboard tablet, giving directions to ${sampleJob.address}`}><AutoScreen /></DeviceFrame>
    default:
      return <DeviceFrame kind="tablet" label="Survey Suite Inspect showing a photographed defect on the front elevation"><InspectScreen /></DeviceFrame>
  }
}

export default function JobJourney() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    const next = (i + steps.length) % steps.length
    const apply = () => setActive(next)
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(apply)
    } else apply()
    tabs.current[next]?.focus()
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl'
    const fwd = rtl ? 'ArrowLeft' : 'ArrowRight'
    const back = rtl ? 'ArrowRight' : 'ArrowLeft'
    if (e.key === fwd || e.key === 'ArrowDown') { e.preventDefault(); select(active + 1) }
    else if (e.key === back || e.key === 'ArrowUp') { e.preventDefault(); select(active - 1) }
    else if (e.key === 'Home') { e.preventDefault(); select(0) }
    else if (e.key === 'End') { e.preventDefault(); select(steps.length - 1) }
  }

  const step = steps[active]

  return (
    <div className="journey" style={{ '--progress': (active + 1) / steps.length } as CSSProperties}>
      <div className="journey__job">
        <span className="journey__job-label">Job</span>
        <bdi
          className="ltr-value"
          /* bidi-fixed: Job numbers preserve LTR digit order; verify=ltr,rtl */
          dir="ltr"
        >
          {sampleJob.no}
        </bdi>
        <span aria-hidden="true">·</span>
        <span>{sampleJob.address}, {sampleJob.town}</span>
      </div>

      <div className="journey__tabs" role="tablist" aria-label="Follow one job through Survey Suite" onKeyDown={onKey}>
        <div className="journey__track" aria-hidden="true"><span /></div>
        {steps.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => { tabs.current[i] = el }}
            role="tab"
            id={`journey-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="journey-panel"
            tabIndex={i === active ? 0 : -1}
            className={`journey__tab${i <= active ? ' is-done' : ''}`}
            onClick={() => select(i)}
          >
            <span className="journey__dot"><Icon name={s.icon} size={18} /></span>
            <span className="journey__place">{s.place}</span>
            <span className="journey__product">{s.product}</span>
          </button>
        ))}
      </div>

      <div
        id="journey-panel"
        role="tabpanel"
        aria-labelledby={`journey-tab-${step.id}`}
        className="journey__panel"
      >
        <div className="journey__copy" aria-live="polite">
          <p className="journey__count">Step {active + 1} of {steps.length}</p>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          <div className="journey__actions">
            {active < steps.length - 1 ? (
              <button type="button" className="btn btn--light" onClick={() => select(active + 1)}>
                Next: {steps[active + 1].place} <ForwardIcon />
              </button>
            ) : (
              <button type="button" className="btn btn--light" onClick={() => select(0)}>
                Start again
              </button>
            )}
            <Link to={`/products/${step.slug}`} className="text-link journey__more">
              About Survey Suite {step.product} <ForwardIcon />
            </Link>
          </div>
        </div>
        <div className={`journey__stage journey__stage--${step.id}`}>
          <Stage id={step.id} />
        </div>
      </div>
    </div>
  )
}
