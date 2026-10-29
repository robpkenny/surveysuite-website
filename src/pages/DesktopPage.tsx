import { Link } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import { DesktopScreen } from '../components/ProductScreens'
import FeatureList from '../components/FeatureList'
import EmailLink from '../components/EmailLink'
import Icon, { ForwardIcon, type IconName } from '../components/Icon'
import { benefits, demoEmailSubject, featureGroups, jobLinks, microsoft, workflow } from '../content/desktop'
import { usePageTitle, useReveal } from '../hooks'
import './Pages.css'
import './DesktopPage.css'

const TITLE = 'Survey Suite Desktop | CRM & Job Management for Surveyors'
const DESCRIPTION =
  'Manage clients, enquiries, quotations, jobs, appointments, documents and workflows with Survey Suite Desktop, built specifically for residential surveying practices.'

function Node({ icon, name, line, to }: { icon: IconName; name: string; line: string; to?: string }) {
  return (
    <div className="eco__node">
      <span className="eco__icon"><Icon name={icon} size={20} /></span>
      <span className="eco__text">
        {to ? <Link to={to} className="eco__name">{name}</Link> : <span className="eco__name">{name}</span>}
        <small>{line}</small>
      </span>
    </div>
  )
}

export default function DesktopPage() {
  usePageTitle('Survey Suite Desktop', { title: TITLE, description: DESCRIPTION })
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="dt">
      {/* Hero */}
      <section className="product-hero product-hero--desktop survey-grid" aria-labelledby="dt-title">
        <div className="container product-hero__grid">
          <div className="product-hero__copy">
            <nav aria-label="Breadcrumb" className="crumbs enter">
              <ol>
                <li><Link to="/products">Products</Link></li>
                <li aria-current="page">Desktop</li>
              </ol>
            </nav>
            <p className="eyebrow enter">Survey Suite Desktop</p>
            <h1 id="dt-title" className="product-hero__title">Run your surveying business from one place.</h1>
            <p className="lede enter enter-1">
              Manage enquiries, quotations, clients, jobs, appointments, documents and workflows in one
              connected workspace built for residential surveyors.
            </p>
            <div className="hero__actions enter enter-2">
              <Link to="/products" className="btn btn--primary">Explore Survey Suite <ForwardIcon /></Link>
              <EmailLink className="btn btn--secondary" subject={demoEmailSubject}><Icon name="mail" size={18} /> Request a Demo</EmailLink>
            </div>
          </div>
          <div className="product-hero__visual enter enter-2">
            <DeviceFrame kind="browser" label="Survey Suite Desktop dashboard with jobs, clients, surveys and reports">
              <DesktopScreen />
            </DeviceFrame>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section" aria-labelledby="dt-intro">
        <div className="container dt-intro">
          <div className="dt-intro__copy" data-reveal>
            <p className="eyebrow">The complete workspace for your practice</p>
            <h2 id="dt-intro">More than a CRM</h2>
            <p className="lede">Generic CRM software manages contacts. Survey Suite Desktop is built around the lifecycle of a residential surveying job.</p>
            <p>
              Clients, properties, surveyors, referrers, estate agents, solicitors, documents,
              appointments and services all connect to the job record. That gives you one place to
              manage the work, from first enquiry to final report, instead of a spread of
              spreadsheets, forms and separate systems.
            </p>
          </div>
          <figure className="dt-hub" data-reveal aria-labelledby="dt-hub-cap">
            <div className="dt-hub__core">
              <Icon name="briefcase" size={22} />
              <span>Job record</span>
            </div>
            <ul className="dt-hub__links" role="list">
              {jobLinks.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <figcaption id="dt-hub-cap" className="dt-hub__cap">Everything about an instruction, linked to one job.</figcaption>
          </figure>
        </div>
      </section>

      {/* Features */}
      <section className="section section--tint" aria-labelledby="dt-features">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">What it does</p>
            <h2 id="dt-features">Surveying practice management software, built around the job.</h2>
            <p className="lede">The surveyor job management, CRM and admin tools a residential practice needs, in one connected system.</p>
          </div>
          <div className="dt-groups">
            {featureGroups.map((g) => (
              <div key={g.id} className="dt-group" aria-labelledby={`dt-g-${g.id}`} role="group">
                <div className="dt-group__head" data-reveal>
                  <h3 id={`dt-g-${g.id}`} className="dt-group__title">{g.title}</h3>
                  <p className="dt-group__line">{g.line}</p>
                </div>
                <ul className="dt-cards" role="list">
                  {g.features.map((f) => (
                    <li key={f.label} className="dt-card" data-reveal>
                      <p className="dt-card__label"><Icon name={f.icon} size={18} /> {f.label}</p>
                      <h4 className="dt-card__heading">{f.heading}</h4>
                      <p className="dt-card__text">{f.text}</p>
                      <ul className="dt-card__points" role="list">
                        {f.points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="section band-navy" aria-labelledby="dt-eco">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">The Survey Suite platform</p>
            <h2 id="dt-eco">One platform. Every part of the job.</h2>
            <p className="lede">
              Survey Suite Desktop sits at the centre of the Survey Suite platform, connecting your
              office workflow with surveyors in the field, document production, client services and
              business automation.
            </p>
          </div>
          <div className="eco" data-reveal>
            <div className="eco__field">
              <p className="eco__tier">In the field</p>
              <Node icon="smartphone" name="Survey Suite Mobile" line="Jobs and contacts on the move" to="/products/mobile" />
              <Node icon="clipboard" name="Survey Suite Inspect" line="Structured site inspections" to="/products/inspect" />
            </div>
            <div className="eco__side eco__side--start">
              <p className="eco__tier">Clients &amp; referrers</p>
              <Node icon="message" name="Survey Portal" line="Keeping clients informed" />
              <Node icon="tag" name="Referrer experience" line="Referral relationships" />
            </div>
            <div className="eco__hub">
              <span className="eco__hub-icon"><Icon name="building" size={26} /></span>
              <p className="eco__hub-name">Survey Suite Desktop</p>
              <p className="eco__hub-line">Clients, jobs, diary, documents and workflows</p>
            </div>
            <div className="eco__side eco__side--end">
              <p className="eco__tier">On the road &amp; assistance</p>
              <Node icon="car" name="Survey Suite Auto" line="Today’s jobs in the car" to="/products/auto" />
              <Node icon="sparkles" name="Survey AI" line="Your surveying assistant" />
            </div>
            <div className="eco__report">
              <p className="eco__tier">Report production</p>
              <Node icon="bar-chart" name="Survey Reports" line="The Survey Suite reporting workflow" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section" aria-labelledby="dt-flow">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">The job lifecycle</p>
            <h2 id="dt-flow">From enquiry to completed job</h2>
            <p className="lede">Desktop manages the work around the whole surveying job, not just the contacts.</p>
          </div>
          <ol className="flow" role="list" data-reveal>
            {workflow.map((s, i) => (
              <li key={s.title} className="flow__step">
                <span className="flow__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="flow__title">{s.title}</h3>
                  <p className="flow__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Microsoft platform */}
      <section className="section section--tint" aria-labelledby="dt-ms">
        <div className="container dt-ms">
          <div className="dt-ms__head" data-reveal>
            <p className="eyebrow">Technology you can trust</p>
            <h2 id="dt-ms">Built on the Microsoft platform</h2>
            <p className="lede">
              Survey Suite Desktop is built on Microsoft’s business technology, the same platform
              many organisations already rely on for their data and documents.
            </p>
          </div>
          <FeatureList features={microsoft} />
        </div>
      </section>

      {/* Benefits */}
      <section className="section" aria-labelledby="dt-benefits">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Why practices use it</p>
            <h2 id="dt-benefits">Built around the way surveyors actually work</h2>
          </div>
          <FeatureList features={benefits} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section band-navy cta-band" aria-labelledby="dt-cta">
        <div className="container cta-band__inner" data-reveal>
          <h2 id="dt-cta" className="dt-cta__title">
            Spend less time managing the system.<br />
            <span>Spend more time surveying.</span>
          </h2>
          <p className="lede">Bring your jobs, clients, documents and workflows together with Survey Suite Desktop.</p>
          <div className="hero__actions dt-cta__actions">
            <EmailLink className="btn btn--light" subject={demoEmailSubject}><Icon name="mail" size={18} /> Request a Demo</EmailLink>
            <Link to="/products" className="btn btn--ghost-light">Explore Survey Suite <ForwardIcon /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
