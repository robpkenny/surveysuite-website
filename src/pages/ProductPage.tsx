import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import { AutoScreen, DesktopScreen, InspectScreen, MobileScreen } from '../components/ProductScreens'
import FeatureList, { StatusBadge } from '../components/FeatureList'
import EmailLink from '../components/EmailLink'
import { VideoCard, VideoPlayer } from '../components/Video'
import Icon, { ForwardIcon } from '../components/Icon'
import { productBySlug, products, type Product } from '../content/products'
import { publishedVideos as videos } from '../content/videos'
import { usePageTitle, useReveal } from '../hooks'
import NotFound from './NotFound'
import './Pages.css'

function Hero({ p }: { p: Product }) {
  switch (p.slug) {
    case 'desktop':
      return <DeviceFrame kind="browser" label="Survey Suite Desktop dashboard with jobs, clients, surveys and reports"><DesktopScreen /></DeviceFrame>
    case 'mobile':
      return (
        <div className="phone-pair">
          <DeviceFrame kind="phone" label="Survey Suite Mobile home screen with eight job tiles"><MobileScreen /></DeviceFrame>
          <DeviceFrame kind="phone" label="Survey Suite Mobile list of today's jobs"><MobileScreen view="today" /></DeviceFrame>
        </div>
      )
    case 'inspect':
      return <DeviceFrame kind="tablet" label="Survey Suite Inspect workspace with notes, photos, observations and defects"><InspectScreen /></DeviceFrame>
    default:
      return <DeviceFrame kind="car" label="Survey Suite Auto on a dashboard tablet, giving directions to the next inspection"><AutoScreen /></DeviceFrame>
  }
}

function ProductVideos({ p }: { p: Product }) {
  const list = videos.filter((v) => v.product === p.slug)
  const [active, setActive] = useState(0)
  if (!list.length) return null
  const v = list[active]
  return (
    <section className="section" aria-labelledby="pv-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Demo videos</p>
          <h2 id="pv-title">Watch {p.short} in action.</h2>
        </div>
        <div className="gallery" data-reveal>
          <div>
            <VideoPlayer key={v.id} video={v} titleId="pv-now" />
            <h3 id="pv-now" className="gallery__now">{v.title}</h3>
            <p className="gallery__desc">{v.description}</p>
          </div>
          <ul className="gallery__list" role="list" aria-label="Choose a video">
            {list.map((item, i) => (
              <li key={item.id}><VideoCard video={item} active={i === active} onSelect={() => setActive(i)} /></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ProductPageInner() {
  const { slug = '' } = useParams()
  const p = productBySlug(slug)
  usePageTitle(p?.name ?? 'Page not found', p?.meta)
  const ref = useReveal<HTMLDivElement>()
  if (!p) return <NotFound />
  const avail = p.availability
  const register = avail && (
    <EmailLink className="btn btn--primary" subject={avail.emailSubject}>
      <Icon name="mail" size={18} /> {avail.cta}
    </EmailLink>
  )

  const idx = products.indexOf(p)
  const next = products[(idx + 1) % products.length]
  const hasVideos = videos.some((v) => v.product === p.slug)

  return (
    <div ref={ref}>
      <section className={`product-hero product-hero--${p.slug} survey-grid`} aria-labelledby="product-title">
        <div className="container product-hero__grid">
          <div className="product-hero__copy">
            <nav aria-label="Breadcrumb" className="crumbs enter">
              <ol>
                <li><Link to="/products">Products</Link></li>
                <li aria-current="page">{p.short}</li>
              </ol>
            </nav>
            <p className="eyebrow enter">{p.where}</p>
            <h1 id="product-title" className="product-hero__title">
              <span className="product-hero__name">{p.name}</span>{' '}
              {p.headline}
            </h1>
            <p className="lede enter enter-1">{p.summary}</p>
            {p.audience && <p className="product-hero__audience enter enter-1"><Icon name="users" size={18} /> {p.audience}</p>}
            <div className="hero__actions enter enter-2">
              {register ? register : hasVideos ? (
                <a href="#pv-title" className="btn btn--primary"><Icon name="play" size={16} /> Watch the {p.short} demos</a>
              ) : (
                <Link to="/demos" className="btn btn--primary"><Icon name="play" size={16} /> Watch the demos</Link>
              )}
              <Link to={`/products/${next.slug}`} className="btn btn--secondary">Next: {next.short} <ForwardIcon /></Link>
            </div>
          </div>
          <div className="product-hero__visual enter enter-2"><Hero p={p} /></div>
        </div>
      </section>

      {hasVideos && <ProductVideos p={p} />}

      {p.howItWorks && (
        <section className="section" aria-labelledby="how-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">How it works</p>
              <h2 id="how-title">How {p.name} works.</h2>
            </div>
            <ol className="steps" role="list">
              {p.howItWorks.map((s, i) => (
                <li key={s.title} className="steps__item" data-reveal>
                  <span className="steps__n" aria-hidden="true">{i + 1}</span>
                  <span className="steps__icon"><Icon name={s.icon} size={22} /></span>
                  <h3 className="steps__title">{s.title}</h3>
                  <p className="steps__detail">{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="section section--tint" aria-labelledby="features-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">What it does</p>
            <h2 id="features-title">{p.tagline}</h2>
          </div>
          {p.features.some((f) => f.status) && (
            <p className="features-key" data-reveal>
              <StatusBadge status="live" /> available today <StatusBadge status="coming-soon" /> in development
            </p>
          )}
          <FeatureList features={p.features} />
        </div>
      </section>

      {p.benefits && (
        <section className="section" aria-labelledby="benefits-title">
          <div className="container benefits">
            <div className="section-head" data-reveal>
              <p className="eyebrow">Why it helps</p>
              <h2 id="benefits-title">What it means for your day.</h2>
            </div>
            <ul className="benefits__list" role="list">
              {p.benefits.map((b) => (
                <li key={b.title} className="benefits__item" data-reveal>
                  <Icon name={b.icon} />
                  <div><h3>{b.title}</h3><p>{b.detail}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="day-title">
        <div className="container">
          <div className="day" data-reveal>
            <h2 id="day-title" className="day__title">Where {p.short} fits in the day</h2>
            <ol className="day__line" role="list">
              {products.map((q) => (
                <li key={q.slug} className={`day__stop${q.slug === p.slug ? ' is-here' : ''}`}>
                  <span className="day__dot"><Icon name={q.whereIcon} size={18} /></span>
                  {q.slug === p.slug ? (
                    <span className="day__label" aria-current="page"><strong>{q.short}</strong><small>{q.where}</small></span>
                  ) : (
                    <Link to={`/products/${q.slug}`} className="day__label"><strong>{q.short}</strong><small>{q.where}</small></Link>
                  )}
                </li>
              ))}
            </ol>
            <p className="day__text">{p.inTheDay}</p>
          </div>
        </div>
      </section>

      {avail ? (
        <section className="section band-navy cta-band" aria-labelledby="pp-cta">
          <div className="container cta-band__split" data-reveal>
            <div>
              <p className="eyebrow">{avail.label}</p>
              <h2 id="pp-cta">{avail.heading}</h2>
              <p className="cta-band__note">{avail.text} <strong>{avail.pricing}.</strong></p>
            </div>
            <div className="hero__actions">
              <EmailLink className="btn btn--light" subject={avail.emailSubject}>
                <Icon name="mail" size={18} /> {avail.cta}
              </EmailLink>
              <Link to={`/products/${next.slug}`} className="btn btn--ghost-light">Next: {next.name} <ForwardIcon /></Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="section band-navy cta-band" aria-labelledby="pp-cta">
          <div className="container cta-band__split" data-reveal>
            <div>
              <p className="eyebrow">{p.strap}</p>
              <h2 id="pp-cta">See the whole suite working together.</h2>
            </div>
            <div className="hero__actions">
              <Link to="/demos" className="btn btn--light"><Icon name="play" size={16} /> Watch the demos</Link>
              <Link to={`/products/${next.slug}`} className="btn btn--ghost-light">Next: {next.name} <ForwardIcon /></Link>
            </div>
          </div>
        </section>
      )}

      {p.safetyNote && (
        <aside className="container safety-note" aria-label="Safety">
          <p>{p.safetyNote}</p>
        </aside>
      )}
    </div>
  )
}

/** Remount per product so scroll reveals and video state reset on navigation. */
export default function ProductPage() {
  const { slug = '' } = useParams()
  return <ProductPageInner key={slug} />
}
