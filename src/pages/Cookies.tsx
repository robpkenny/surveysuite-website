import { Link } from 'react-router-dom'
import LegalPage, { Value } from '../components/LegalPage'
import EmailLink from '../components/EmailLink'
import { privacyEmail } from '../content/site'
import { usePageTitle } from '../hooks'

// Update this page (and add a consent banner) before any analytics or advertising tags are added.

export default function Cookies() {
  usePageTitle('Cookies')

  return (
    <LegalPage
      eyebrow="Cookies"
      title="Cookie notice"
      intro="What cookies are, and which ones this website uses."
    >
      <h2 id="summary">In short</h2>
      <p>
        <strong>This website does not set any cookies.</strong> We do not use analytics, advertising or tracking
        cookies, so there is nothing to accept or reject.
      </p>

      <h2 id="what">What cookies are</h2>
      <p>
        Cookies are small files that a website stores on your device. Similar technologies, such as local storage, work
        in the same way. Some are needed for a website to work; others are used to measure visits or show adverts, and
        those need your consent.
      </p>

      <h2 id="ours">Cookies we use</h2>
      <div className="legal__table-wrap">
        <table className="legal__table">
          <caption className="visually-hidden">Cookies set by this website</caption>
          <thead>
            <tr><th scope="col">Name</th><th scope="col">Set by</th><th scope="col">Purpose</th><th scope="col">Lasts</th></tr>
          </thead>
          <tbody>
            <tr><td colSpan={4}>None. This website does not set cookies.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="third-party">Third-party content</h2>
      <p>
        <strong>Demo videos.</strong> Videos are hosted on YouTube and nothing is loaded from YouTube until you press
        play. When you choose to play a video, it is served from YouTube’s privacy-enhanced domain
        (youtube-nocookie.com), and YouTube may store information on your device while it plays. See the{' '}
        <Link to="/privacy#youtube">privacy policy</Link> for more.
      </p>
      <p>
        <strong>Fonts.</strong> Our typefaces are loaded from Google Fonts, which does not set cookies.
      </p>

      <h2 id="future">If this changes</h2>
      <p>
        If we add analytics or advertising tools in future, we will ask for your consent before they run, let you change
        your choice at any time, and list each cookie on this page.
      </p>

      <h2 id="control">Controlling cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. Questions? Email{' '}
        <EmailLink email={privacyEmail} subject="Cookies"><Value>{privacyEmail}</Value></EmailLink>.
      </p>
    </LegalPage>
  )
}
