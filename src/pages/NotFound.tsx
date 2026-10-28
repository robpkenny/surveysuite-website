import { Link } from 'react-router-dom'
import { LogoMark } from '../components/BrandMark'
import Icon from '../components/Icon'
import { usePageTitle } from '../hooks'
import './Pages.css'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="section notfound survey-grid" aria-labelledby="nf-title">
      <div className="container notfound__inner">
        <LogoMark size={72} />
        <h1 id="nf-title">That page has moved or doesn’t exist.</h1>
        <p className="lede">Try the home page, or go straight to the demos.</p>
        <div className="hero__actions">
          <Link to="/" className="btn btn--primary">Go to the home page</Link>
          <Link to="/demos" className="btn btn--secondary"><Icon name="play" size={16} /> Watch the demos</Link>
        </div>
      </div>
    </section>
  )
}
