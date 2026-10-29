import { Link } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import { DesktopScreen, MobileScreen } from '../components/ProductScreens'
import JobJourney from '../components/JobJourney'
import ProductBento, { FamilyStrip, type BentoCopy } from '../components/ProductBento'
import { VideoPlayer } from '../components/Video'
import Icon, { ForwardIcon } from '../components/Icon'
import EmailLink from '../components/EmailLink'
import { LogoMark } from '../components/BrandMark'
import { publishedVideos } from '../content/videos'
import { usePageTitle, useReveal } from '../hooks'
import './Home.css'

// Keep in step with the default <title> and description in index.html.
const TITLE = 'Survey Suite | Software for UK Surveying Practices'
// "Reporting" is left out until a reporting product is confirmed (see the product cards below).
const DESCRIPTION =
  'Explore Survey Suite for practice management, mobile working and site inspections, designed around the working day of UK surveyors.'

const DEMO_SUBJECT = 'Survey Suite demo request'

// Homepage card wording. Each line is limited to what the product's own information in products.ts supports.
const productCopy: BentoCopy = {
  desktop: {
    headline: 'Keep your practice organised.',
    summary:
      'Manage clients, instructions and day-to-day workload from your desktop. Keep job information together so you can see what needs attention and keep work moving.',
  },
  mobile: {
    headline: 'Your workload, wherever you are.',
    summary: 'See today’s and tomorrow’s jobs, look up client and agent details, and add new jobs as they come in.',
  },
  inspect: {
    headline: 'Take your workflow on site.',
    summary:
      'Capture inspection notes and photographs while you work. Keep information connected to the instruction, ready for the next stage.',
  },
  auto: {
    headline: 'Hands-free help between inspections.',
    summary: 'Directions, hands-free calls and spoken site notes on a dashboard tablet in the car.',
  },
}

const benefits = [
  { icon: 'folder', title: 'Keep information together.', text: 'Spend less time looking for the details behind an instruction.' },
  { icon: 'list', title: 'Know what needs attention.', text: 'Keep sight of your workload and the next steps.' },
  { icon: 'link', title: 'Reduce repeated work.', text: 'Build a more connected process from instruction to report.' },
  { icon: 'shield', title: 'Keep professional control.', text: 'Use software to support your expertise, not replace it.' },
] as const

const demoQuestions = [
  'Which products and features are available now?',
  'What would setup and data migration involve?',
  'What training and support are available?',
  'What would it cost for your practice?',
]

export default function Home() {
  usePageTitle(undefined, { title: TITLE, description: DESCRIPTION })
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
              Less administration. <span className="hero__accent">More time for surveying.</span>
            </h1>
            <p className="hero__sub enter enter-1">Software built around your surveying practice.</p>
            <p className="lede enter enter-1">
              Bring practice management, mobile working and site inspections together with Survey
              Suite. Keep the focus on your clients, your inspections and your professional advice,
              with software that supports the work around them.
            </p>
            <div className="hero__actions enter enter-2">
              <EmailLink className="btn btn--primary" subject={DEMO_SUBJECT}>
                <Icon name="mail" size={18} /> Book a demo
              </EmailLink>
              <a href="#family-title" className="btn btn--secondary">Explore the products</a>
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
            <h2 id="recog-title">Your work should flow. Not repeat.</h2>
            <p className="recog__body">
              A surveying instruction involves more than the inspection. There are enquiries to answer,
              appointments to arrange, information to record and reports to prepare.
            </p>
            <p className="recog__body">
              Survey Suite is designed around that working day, helping you move from one stage to the
              next with less duplication and a clearer view of what needs doing.
            </p>
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
            <h2 id="family-title">The right tools for each part of your day</h2>
          </div>
          <ProductBento copy={productCopy} />
          <div className="home-family" data-reveal>
            <h3 className="home-family__title">Also in the family</h3>
            {/* Survey CRM and Survey Reports are hidden here: their relationship to Desktop and Inspect is unconfirmed. */}
            <FamilyStrip headingLevel={4} hide={['Survey CRM', 'Survey Reports']} />
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

      {/* Benefits */}
      <section className="section section--tint benefits" aria-labelledby="benefits-title">
        <div className="container benefits__grid">
          <h2 id="benefits-title" data-reveal>Less chasing. Less duplication. A clearer working day.</h2>
          <ul className="benefits__list" role="list">
            {benefits.map((b) => (
              <li key={b.title} data-reveal>
                <Icon name={b.icon} />
                <div><h3>{b.title}</h3><p>{b.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Demo */}
      <section className="section demo-ask" aria-labelledby="demo-ask-title">
        <div className="container demo-ask__grid">
          <div className="demo-ask__copy" data-reveal>
            <p className="eyebrow">Book a demo</p>
            <h2 id="demo-ask-title">See how Survey Suite could fit your practice</h2>
            <p className="lede">Choosing software starts with understanding how it will work for you.</p>
            <p className="demo-ask__body">
              Tell us how you manage instructions, inspections and reports today. Use the demo to
              explore the relevant products, check current availability and discuss what a move would
              involve.
            </p>
            <EmailLink className="btn btn--primary" subject={DEMO_SUBJECT}>
              <Icon name="mail" size={18} /> Book a demo
            </EmailLink>
            <p className="demo-ask__note">This opens an email to us so we can arrange a time with you.</p>
          </div>
          <div className="demo-ask__card" data-reveal>
            <h3 id="demo-questions">Questions to bring to your demo</h3>
            <ul className="demo-ask__list" role="list" aria-labelledby="demo-questions">
              {demoQuestions.map((q) => <li key={q}>{q}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final" aria-labelledby="final-title">
        <svg className="final__arc" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0c240 100 480 120 600 120S960 100 1200 0" fill="none" stroke="var(--color-accent)" strokeWidth="10" />
        </svg>
        <div className="container final__inner" data-reveal>
          <h2 id="final-title">Spend more time on the work that matters.</h2>
          <p className="lede">Discover a clearer way to manage the work around your surveys.</p>
          <div className="hero__actions final__actions">
            <EmailLink className="btn btn--primary" subject={DEMO_SUBJECT}><Icon name="mail" size={18} /> Book a demo</EmailLink>
            <EmailLink className="btn btn--secondary" subject="Survey Suite enquiry">Contact us</EmailLink>
          </div>
        </div>
      </section>
    </div>
  )
}
