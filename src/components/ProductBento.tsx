import { Link } from 'react-router-dom'
import DeviceFrame from './DeviceFrame'
import Icon, { ForwardIcon } from './Icon'
import { AutoScreen, DesktopScreen, InspectScreen, MobileScreen } from './ProductScreens'
import { family, products, type ProductSlug } from '../content/products'
import './ProductBento.css'

function Preview({ slug }: { slug: ProductSlug }) {
  switch (slug) {
    case 'desktop': return <DeviceFrame kind="browser" label="Survey Suite Desktop dashboard"><DesktopScreen /></DeviceFrame>
    case 'mobile': return <DeviceFrame kind="phone" label="Survey Suite Mobile home screen"><MobileScreen /></DeviceFrame>
    case 'inspect': return <DeviceFrame kind="tablet" label="Survey Suite Inspect workspace"><InspectScreen /></DeviceFrame>
    default: return <DeviceFrame kind="car" label="Survey Suite Auto job list"><AutoScreen /></DeviceFrame>
  }
}

export default function ProductBento({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <div className="bento">
      {products.map((p) => (
        <article key={p.slug} className={`bento__tile bento__tile--${p.slug}`} data-reveal>
          <div className="bento__copy">
            <p className="bento__where"><Icon name={p.whereIcon} size={16} /> {p.where}</p>
            <H className="bento__name">
              <Link to={`/products/${p.slug}`} className="bento__link">{p.name}</Link>
            </H>
            <p className="bento__headline">{p.headline}</p>
            <p className="bento__summary">{p.tagline}</p>
            <span className="bento__cta" aria-hidden="true">Explore {p.short} <ForwardIcon /></span>
          </div>
          <div className="bento__preview"><Preview slug={p.slug} /></div>
        </article>
      ))}
    </div>
  )
}

export function FamilyStrip({ headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3' | 'h4'
  return (
    <ul className="family" role="list">
      {family.map((f) => (
        <li key={f.name} className="family__item" data-reveal>
          <span className="family__icon"><Icon name={f.icon} size={20} /></span>
          <H className="family__name">{f.name}</H>
          <p className="family__line">{f.line}</p>
        </li>
      ))}
    </ul>
  )
}
