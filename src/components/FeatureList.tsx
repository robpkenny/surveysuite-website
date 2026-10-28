import Icon from './Icon'
import type { Feature } from '../content/products'
import './FeatureList.css'

export default function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className="features" role="list">
      {features.map((f) => (
        <li key={f.label} className="features__item" data-reveal>
          <span className="features__icon"><Icon name={f.icon} size={22} /></span>
          <div>
            <h3 className="features__label">{f.label}</h3>
            <p className="features__detail">{f.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
