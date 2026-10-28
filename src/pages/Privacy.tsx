import { Link } from 'react-router-dom'
import LegalPage, { Value } from '../components/LegalPage'
import EmailLink from '../components/EmailLink'
import { company, privacyEmail } from '../content/site'
import { usePageTitle } from '../hooks'

// GO-LIVE BLOCKER: company.icoNumber is a placeholder (src/content/site.ts).
// Do not merge to main until it is filled in. See SITE_NOTES.md.

export default function Privacy() {
  usePageTitle('Privacy policy')
  const privacy = <EmailLink email={privacyEmail} subject="Privacy request"><Value>{privacyEmail}</Value></EmailLink>

  return (
    <LegalPage
      eyebrow="Privacy policy"
      title="Privacy policy"
      intro="How Survey Suite collects, uses and protects personal information when you use this website or contact us."
    >
      <h2 id="who">Who we are</h2>
      <p>
        This website is run by {company.legalName}, trading as {company.tradingName} (“we”, “us”). We are the
        controller of the personal information described in this policy, which means we decide how and why it is used.
      </p>
      <div className="legal__card">
        <dl>
          <dt>Company</dt>
          <dd>{company.legalName}, trading as {company.tradingName}</dd>
          <dt>Registered office</dt>
          <dd><address>{company.registeredOffice.join(', ')}</address></dd>
          <dt>Company number</dt>
          <dd><span className="ltr-value" dir="ltr">{company.companyNumber}</span> (registered in {company.registeredIn})</dd>
          <dt>ICO registration</dt>
          <dd><span className="ltr-value" dir="ltr"><Value>{company.icoNumber}</Value></span></dd>
          <dt>Privacy contact</dt>
          <dd>{privacy}</dd>
        </dl>
      </div>

      <h2 id="collect">What we collect and why</h2>

      <h3>When you contact us</h3>
      <p>
        If you email us, we receive your name, email address and anything else you choose to include, such as your
        company name, phone number or details about your practice. We use this to reply to you, arrange a demonstration
        and tell you about Survey Suite if you have asked us to.
      </p>
      <p>
        <strong>Lawful basis:</strong> our legitimate interest in responding to business enquiries. If you go on to
        become a customer, we use it to take steps at your request before entering into a contract.
      </p>

      <h3>When you visit the website</h3>
      <p>
        Like any website, our hosting provider receives technical information when your browser requests a page: your
        IP address, browser type, the page requested and the time. This is used to deliver the website and keep it
        secure, for example to detect and block attacks. We do not use it to identify you.
      </p>
      <p><strong>Lawful basis:</strong> our legitimate interest in running a secure, working website.</p>

      <h3>Fonts</h3>
      <p>
        The website’s typefaces are loaded from Google Fonts. To deliver them, Google’s servers receive your IP address
        and browser details. Google Fonts does not set cookies.
      </p>
      <p><strong>Lawful basis:</strong> our legitimate interest in presenting the website consistently.</p>

      <h3 id="youtube">Demo videos (YouTube)</h3>
      <p>
        Our demo videos are hosted on YouTube. Nothing is loaded from YouTube until you press play. When you do, the
        video is served from YouTube’s privacy-enhanced domain (youtube-nocookie.com), and Google receives your IP
        address and information about your device. Google may also store information on your device while the video
        plays. Google’s use of this information is covered by the{' '}
        <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google Privacy Policy</a>.
      </p>
      <p><strong>Lawful basis:</strong> our legitimate interest in showing you the videos you choose to watch.</p>

      <h3>Analytics and advertising</h3>
      <p>
        We do not currently use analytics or advertising tools on this website. If we add them, we will ask for your
        consent first and update this policy and our <Link to="/cookies">cookie notice</Link>.
      </p>

      <h2 id="sharing">Who we share it with</h2>
      <p>We do not sell personal information. We share it only with the service providers that help us run the business:</p>
      <ul>
        <li><strong>Microsoft</strong>: website hosting (Azure) and email (Microsoft 365).</li>
        <li><strong>Google</strong>: web fonts, and YouTube when you choose to play a video.</li>
      </ul>
      <p>
        We may also share information with professional advisers, or where the law requires it, for example with HMRC
        or the police.
      </p>

      <h2 id="transfers">International transfers</h2>
      <p>
        Microsoft and Google may process information outside the UK, including in the European Economic Area and the
        United States. Where they do, the transfer is protected by UK adequacy regulations (including the UK Extension to
        the EU–US Data Privacy Framework) or by the International Data Transfer Agreement or Addendum approved under UK
        law.
      </p>

      <h2 id="retention">How long we keep it</h2>
      <ul>
        <li><strong>Enquiries:</strong> up to 24 months after our last contact with you, unless you become a customer.</li>
        <li><strong>Customer records:</strong> for as long as you are a customer, then for six years to meet our legal and tax obligations.</li>
        <li><strong>Website technical logs:</strong> for the hosting provider’s standard retention period, normally no more than 90 days.</li>
      </ul>

      <h2 id="rights">Your rights</h2>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>ask for a copy of the personal information we hold about you;</li>
        <li>ask us to correct information that is wrong or incomplete;</li>
        <li>ask us to delete your information;</li>
        <li>ask us to restrict how we use it, or object to our using it;</li>
        <li>ask us to transfer it to you or another organisation, where that applies;</li>
        <li>withdraw your consent at any time, where we rely on consent.</li>
      </ul>
      <p>
        To use any of these rights, email {privacy}. There is normally no charge, and we will reply within one month.
      </p>

      <h2 id="complaints">Complaints</h2>
      <p>
        If you are unhappy with how we have handled your information, please tell us first so we can put it right. You
        also have the right to complain to the Information Commissioner’s Office (ICO), the UK’s data protection
        regulator, at{' '}
        <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer" target="_blank">ico.org.uk/make-a-complaint</a>{' '}
        or on 0303 123 1113.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We will update this page when the way we use personal information changes. The date at the top shows when it was
        last updated.
      </p>
    </LegalPage>
  )
}
