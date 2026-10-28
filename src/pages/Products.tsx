import { Link } from 'react-router-dom'
import ProductBento, { FamilyStrip } from '../components/ProductBento'
import Icon, { ForwardIcon } from '../components/Icon'
import { products } from '../content/products'
import { usePageTitle, useReveal } from '../hooks'
import './Pages.css'

export default function Products() {
  usePageTitle('Products')
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <section className="page-hero survey-grid" aria-labelledby="products-title">
        <div className="container page-hero__inner">
          <p className="eyebrow enter">The product family</p>
          <h1 id="products-title" className="page-hero__title">One suite. Every part of the job.</h1>
          <p className="lede enter enter-1">
            Four connected products cover the surveying day, from the first instruction in the
            office to the last photo on site.
          </p>
        </div>
      </section>

      <section className="section where" aria-labelledby="where-title">
        <div className="container">
          <h2 id="where-title" className="visually-hidden">Where each product fits</h2>
          <ol className="where__line" role="list">
            {products.map((p, i) => (
              <li key={p.slug} className="where__step" data-reveal>
                <span className="where__icon"><Icon name={p.whereIcon} size={22} /></span>
                <span className="where__n">0{i + 1}</span>
                <p className="where__place">{p.where}</p>
                <p className="where__name">
                  <Link to={`/products/${p.slug}`}>{p.short}</Link>
                </p>
                <p className="where__text">{p.inTheDay}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="core-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Core products</p>
            <h2 id="core-title">See each one up close.</h2>
          </div>
          <ProductBento />
        </div>
      </section>

      <section className="section" aria-labelledby="wider-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">The wider family</p>
            <h2 id="wider-title">Built to grow with your practice.</h2>
            <p className="lede">More Survey Suite products for relationships, reporting, clients, storage, finance and scheduling.</p>
          </div>
          <FamilyStrip />
        </div>
      </section>

      <section className="section band-navy cta-band" aria-labelledby="products-cta">
        <div className="container cta-band__inner" data-reveal>
          <h2 id="products-cta">Watch it working.</h2>
          <p className="lede">Real recordings of Survey Suite in use.</p>
          <Link to="/demos" className="btn btn--light"><Icon name="play" size={16} /> Watch the demos <ForwardIcon /></Link>
        </div>
      </section>
    </div>
  )
}
