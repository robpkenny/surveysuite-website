import Icon from './Icon'
import type { Feature } from '../content/products'
import './FeatureList.css'

const statusLabel = { live: 'Live', 'coming-soon': 'Coming soon' } as const

export function StatusBadge({ status }: { status: NonNullable<Feature['status']> }) {
  return <span className={`badge badge--${status}`}>{statusLabel[status]}</span>
}

export default function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className="features" role="list">
      {features.map((f) => (
        <li key={f.label} className="features__item" data-reveal>
          <span className="features__icon"><Icon name={f.icon} size={22} /></span>
          <div>
            {/* The visible badge is decorative; the status is also inside the heading for screen readers. */}
            {f.status && <span aria-hidden="true"><StatusBadge status={f.status} /></span>}
            <h3 className="features__label">
              {f.label}
              {f.status && <span className="visually-hidden"> ({statusLabel[f.status].toLowerCase()})</span>}
            </h3>
            <p className="features__detail">{f.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
