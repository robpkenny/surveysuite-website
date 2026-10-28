import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BrandMark from './BrandMark'
import Icon, { ForwardIcon } from './Icon'
import EmailLink from './EmailLink'
import { products } from '../content/products'
import { company, contactEmail } from '../content/site'
import './Layout.css'

const nav = [
  { to: '/products', label: 'Products', end: false },
  { to: '/demos', label: 'Demos', end: true },
]

function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Survey Suite home">
          <BrandMark />
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.end} className="site-nav__link">
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/demos" className="btn btn--primary site-header__cta">
          <Icon name="play" size={16} />
          Watch the demos
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Main (mobile)" className="container">
          <ul>
            <li><NavLink to="/" end className="mobile-menu__link">Home</NavLink></li>
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.end} className="mobile-menu__link">{n.label}</NavLink>
              </li>
            ))}
          </ul>
          <p className="mobile-menu__group">Products</p>
          <ul className="mobile-menu__products">
            {products.map((p) => (
              <li key={p.slug}>
                <NavLink to={`/products/${p.slug}`} className="mobile-menu__sub">{p.short}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer band-navy">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <BrandMark inverse />
          <p className="site-footer__strap">Simple software. Smarter surveying.</p>
        </div>
        <nav aria-label="Products" className="site-footer__col">
          <h2 className="site-footer__heading">Products</h2>
          <ul>
            {products.map((p) => (
              <li key={p.slug}><Link to={`/products/${p.slug}`}>{p.name}</Link></li>
            ))}
            <li><Link to="/products">The full family</Link></li>
          </ul>
        </nav>
        <nav aria-label="Explore" className="site-footer__col">
          <h2 className="site-footer__heading">Explore</h2>
          <ul>
            <li><Link to="/demos">Demo videos</Link></li>
            <li><Link to="/">Follow one job</Link></li>
          </ul>
        </nav>
        <div className="site-footer__col">
          <h2 className="site-footer__heading">Talk to us</h2>
          <EmailLink className="site-footer__contact">
            <Icon name="mail" size={18} />
            <span
              className="ltr-value"
              /* bidi-fixed: Email addresses preserve LTR character order; verify=ltr,rtl */
              dir="ltr"
            >
              {contactEmail}
            </span>
          </EmailLink>
          <Link to="/demos" className="text-link site-footer__more">
            See it working first <ForwardIcon />
          </Link>
        </div>
      </div>
      <div className="container site-footer__base">
        <p>
          © {new Date().getFullYear()} {company.legalName}, trading as {company.tradingName}. Registered in{' '}
          {company.registeredIn}, company number <span className="ltr-value" dir="ltr">{company.companyNumber}</span>.
          Registered office: {company.registeredOffice.join(', ')}.
        </p>
        <nav aria-label="Legal">
          <ul className="site-footer__legal">
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </>
  )
}
