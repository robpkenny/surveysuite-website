import { useState } from 'react'
import { Link } from 'react-router-dom'
import { VideoCard, VideoPlayer } from '../components/Video'
import Icon, { ForwardIcon } from '../components/Icon'
import EmailLink from '../components/EmailLink'
import { publishedVideos as videos } from '../content/videos'
import { productBySlug, products } from '../content/products'
import { usePageTitle, useReveal } from '../hooks'
import './Pages.css'

function ComingSoon() {
  return (
    <section className="section" aria-labelledby="soon-title">
      <div className="container">
        <div className="soon">
          <span className="soon__icon"><Icon name="play" size={28} /></span>
          <h2 id="soon-title">The demo recordings are on their way.</h2>
          <p className="lede">
            We’re preparing the videos for the web. In the meantime, explore the products or ask us for a
            walkthrough.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn--primary">Explore the products <ForwardIcon /></Link>
            <EmailLink className="btn btn--secondary" subject="Survey Suite demo"><Icon name="mail" size={18} /> Ask for a walkthrough</EmailLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Demos() {
  usePageTitle('Demos')
  const ref = useReveal<HTMLDivElement>()
  const [active, setActive] = useState(0)
  const v = videos[active]
  const product = v ? productBySlug(v.product) : undefined
  const withoutVideos = products.filter((p) => !videos.some((x) => x.product === p.slug))

  return (
    <div ref={ref}>
      <section className="page-hero page-hero--compact survey-grid" aria-labelledby="demos-title">
        <div className="container page-hero__inner">
          <p className="eyebrow enter">Demo videos</p>
          <h1 id="demos-title" className="page-hero__title">Watch Survey Suite working.</h1>
          <p className="lede enter enter-1">
            {v ? 'Real recordings of the software in use. Pick a video to play it here.' : 'Real recordings of the software in use, coming soon.'}
          </p>
        </div>
      </section>

      {!v ? <ComingSoon /> : (
        <section className="section demos" aria-label="Video gallery">
          <div className="container gallery gallery--page">
            <div>
              <VideoPlayer key={v.id} video={v} titleId="now-title" />
              <div className="gallery__info">
                <p className="eyebrow">{product?.name}</p>
                <h2 id="now-title" className="gallery__now">{v.title}</h2>
                <p className="gallery__desc">{v.description}</p>
                {product && (
                  <Link to={`/products/${product.slug}`} className="text-link">About {product.name} <ForwardIcon /></Link>
                )}
              </div>
            </div>
            <div>
              <h2 className="gallery__list-title">{videos.length === 1 ? '1 video' : `${videos.length} videos`}</h2>
              <ul className="gallery__list" role="list">
                {videos.map((item, i) => (
                  <li key={item.id}>
                    <VideoCard video={item} active={i === active} onSelect={() => setActive(i)} />
                  </li>
                ))}
              </ul>
              {withoutVideos.length > 0 && (
                <p className="gallery__more">
                  Recordings of {withoutVideos.map((p) => p.short).join(', ').replace(/, ([^,]*)$/, ' and $1')} are on the way.
                  Meanwhile, <Link to="/products">explore the products</Link>.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
