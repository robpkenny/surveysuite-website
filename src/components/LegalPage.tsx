import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { isPlaceholder, policyUpdated } from '../content/site'
import '../pages/Pages.css'
import './LegalPage.css'

/** Shows a value, highlighted if it is still a [BRACKETED] placeholder. */
export function Value({ children }: { children: string }) {
  return isPlaceholder(children) ? <mark className="placeholder">{children}</mark> : <>{children}</>
}

export function Updated() {
  const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(policyUpdated))
  return <p className="legal__updated">Last updated: <time dateTime={policyUpdated}>{date}</time></p>
}

export default function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <section className="page-hero page-hero--compact survey-grid" aria-labelledby="legal-title">
        <div className="container page-hero__inner">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li aria-current="page">{eyebrow}</li>
            </ol>
          </nav>
          <h1 id="legal-title" className="page-hero__title">{title}</h1>
          <p className="lede">{intro}</p>
          <Updated />
        </div>
      </section>
      <section className="section legal">
        <div className="container">
          <div className="legal__body">{children}</div>
        </div>
      </section>
    </>
  )
}
