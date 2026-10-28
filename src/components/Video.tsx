import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { embedUrl, youtubeId, type DemoVideo } from '../content/videos'
import { productBySlug } from '../content/products'
import './Video.css'

/**
 * Click-to-play YouTube player. Nothing is loaded from YouTube until the visitor
 * presses play, and then only from the privacy-enhanced youtube-nocookie.com domain.
 */
export function VideoPlayer({ video, titleId }: { video: DemoVideo; titleId?: string }) {
  const id = youtubeId(video.youtube)
  const [playing, setPlaying] = useState(false)
  if (!id) return null

  if (playing) {
    return (
      <div className="vplayer">
        <iframe
          src={embedUrl(id)}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <div className="vplayer vplayer--poster">
      <button
        type="button"
        className="vplayer__start"
        onClick={() => setPlaying(true)}
        aria-describedby={titleId}
      >
        <span className="vplayer__icon"><Icon name="play" size={32} /></span>
        <span className="vplayer__label">Play video</span>
      </button>
      <p className="vplayer__note">
        Plays from YouTube. <Link to="/privacy#youtube">How we handle this</Link>
      </p>
    </div>
  )
}

export function VideoCard({
  video,
  active,
  onSelect,
}: {
  video: DemoVideo
  active?: boolean
  onSelect: () => void
}) {
  const product = productBySlug(video.product)
  return (
    <button type="button" className={`vcard${active ? ' is-active' : ''}`} aria-pressed={active} onClick={onSelect}>
      <span className="vcard__play"><Icon name="play" size={16} /></span>
      <span className="vcard__body">
        <span className="vcard__title">{video.title}</span>
        <span className="vcard__meta">
          {product?.name}
          {video.duration ? <> · <span className="ltr-value">{video.duration}</span></> : null}
        </span>
      </span>
    </button>
  )
}
