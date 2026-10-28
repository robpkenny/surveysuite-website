import { Link } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import { DesktopScreen, MobileScreen } from '../components/ProductScreens'
import JobJourney from '../components/JobJourney'
import ProductBento, { FamilyStrip } from '../components/ProductBento'
import { VideoPlayer } from '../components/Video'
import Icon, { ForwardIcon } from '../components/Icon'
import EmailLink from '../components/EmailLink'
import { LogoMark } from '../components/BrandMark'
import { publishedVideos } from '../content/videos'
import { usePageTitle, useReveal } from '../hooks'
import './Home.css'

export default function Home() {
  usePageTitle()
  const ref = useReveal<HTMLDivElement>()
  const featured = publishedVideos[0]

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="hero survey-grid" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow enter">Software for UK surveying practices</p>
            <h1 id="hero-title" className="hero__title">
              Making surveying <span className="hero__accent">simple.</span>
            </h1>
            <p className="lede enter enter-1">
              Survey Suite connects the office, the car and the site. One job, from instruction to
              report, on the screen that suits where you are.
            </p>
            <div className="hero__actions enter enter-2">
              <Link to="/demos" className="btn btn--primary">
                <Icon name="play" size={16} /> Watch the demos
              </Link>
              <Link to="/products" className="btn btn--secondary">Explore the products</Link>
            </div>
            <ul className="hero__products enter enter-3" aria-label="Products">
              <li>Desktop</li><li>Mobile</li><li>Inspect</li><li>Auto</li>
            </ul>
          </div>

          <div className="hero__visual enter enter-2">
            <div className="hero__glow" aria-hidden="true" />
            <DeviceFrame kind="browser" className="hero__desktop" label="Survey Suite Desktop dashboard showing active jobs, clients, surveys and reports">
              <DesktopScreen />
            </DeviceFrame>
            <DeviceFrame kind="phone" className="hero__phone" label="Survey Suite Mobile home screen with Today, Tomorrow, All Jobs and New Job tiles">
              <MobileScreen />
            </DeviceFrame>
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="proof" aria-label="About Survey Suite">
        <div className="container proof__inner">
          {/* SAMPLE CONTENT - replace before launch: confirm this claim before publishing */}
          <p className="proof__claim">
            <LogoMark size={28} />
            <span><strong>Built by surveyors, for surveyors.</strong> Designed inside a working surveying practice.</span>
          </p>
          <p className="proof__motto" aria-label="Capture. Inspect. Report.">
            <span>Capture.</span><span>Inspect.</span><span>Report.</span>
          </p>
        </div>
      </section>

      {/* Recognition */}
      <section className="section recog" aria-labelledby="recog-title">
        <div className="container recog__grid">
          <div className="recog__head" data-reveal>
            <p className="eyebrow">The surveying day</p>
            <h2 id="recog-title">Your day doesn’t happen at a desk.</h2>
          </div>
          <ol className="recog__list" role="list">
            <li data-reveal>
              <span className="recog__n">01</span>
              <div>
                <h3>Instructions arrive in the office</h3>
                <p>Clients, properties, quotes and diaries all need to line up before anyone leaves.</p>
              </div>
            </li>
            <li data-reveal>
              <span className="recog__n">02</span>
              <div>
                <h3>The detail is needed on the road</h3>
                <p>Addresses, access notes and the next job, without stopping to ring the office.</p>
              </div>
            </li>
            <li data-reveal>
              <span className="recog__n">03</span>
              <div>
                <h3>The evidence is gathered on site</h3>
                <p>Notes, photos and defects that have to make it into the report intact.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Signature moment */}
      <section className="section band-navy" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Follow one job</p>
            <h2 id="journey-title">Same job. Four screens. No re-telling.</h2>
            <p className="lede">Step through a single instruction as it moves from the office to the site.</p>
          </div>
          <JobJourney />
        </div>
      </section>

      {/* Product family */}
      <section className="section section--tint" aria-labelledby="family-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">The product family</p>
            <h2 id="family-title">One suite. Every part of the job.</h2>
          </div>
          <ProductBento />
          <div className="home-family" data-reveal>
            <h3 className="home-family__title">Also in the family</h3>
            <FamilyStrip headingLevel={4} />
          </div>
        </div>
      </section>

      {/* Featured demo (hidden until a video has a YouTube link) */}
      {featured && (
        <section className="section" aria-labelledby="demo-title">
          <div className="container demo__grid">
            <div data-reveal>
              <VideoPlayer video={featured} titleId="demo-title" />
            </div>
            <div className="demo__copy" data-reveal>
              <p className="eyebrow">See it working</p>
              <h2 id="demo-title">{featured.title}</h2>
              <p className="lede">{featured.description}</p>
              {featured.duration ? <p className="demo__len"><Icon name="play" size={14} /> <span className="ltr-value">{featured.duration}</span></p> : null}
              <Link to="/demos" className="text-link">All demo videos <ForwardIcon /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Reassurance */}
      <section className="section section--tint reassure" aria-labelledby="reassure-title">
        <div className="container reassure__grid">
          <h2 id="reassure-title" data-reveal>Made for real working conditions.</h2>
          <ul className="reassure__list" role="list">
            <li data-reveal>
              <Icon name="cloud-off" />
              <div><h3>Works without signal</h3><p>Inspect keeps working offline, so a rural site or a basement doesn’t stop the inspection.</p></div>
            </li>
            <li data-reveal>
              <Icon name="refresh" />
              <div><h3>Jobs stay in sync</h3><p>Secure cloud synchronisation keeps the same job current in the office, on the phone and in the car.</p></div>
            </li>
            <li data-reveal>
              <Icon name="shield" />
              <div><h3>Safe on the road</h3><p>Auto is a simple in-car interface with voice control, built to keep distraction to a minimum.</p></div>
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final" aria-labelledby="final-title">
        <svg className="final__arc" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0c240 100 480 120 600 120S960 100 1200 0" fill="none" stroke="var(--color-accent)" strokeWidth="10" />
        </svg>
        <div className="container final__inner" data-reveal>
          <h2 id="final-title">See it working before you commit.</h2>
          <p className="lede">Watch the recordings, then talk to us about your practice.</p>
          <div className="hero__actions final__actions">
            <Link to="/demos" className="btn btn--primary"><Icon name="play" size={16} /> Watch the demos</Link>
            <EmailLink className="btn btn--secondary" subject="Survey Suite enquiry"><Icon name="mail" size={18} /> Talk to us</EmailLink>
          </div>
        </div>
      </section>
    </div>
  )
}
