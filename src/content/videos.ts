import type { ProductSlug } from './products'

export interface DemoVideo {
  id: string
  title: string
  product: ProductSlug
  description: string
  /**
   * YouTube link for the video (upload as Unlisted). Any of these forms works:
   *   https://youtu.be/VIDEO_ID
   *   https://www.youtube.com/watch?v=VIDEO_ID
   *   https://www.youtube.com/embed/VIDEO_ID
   *   VIDEO_ID
   * Leave empty and the video is hidden everywhere on the site.
   */
  youtube: string
  /** Optional running time shown on the video card, e.g. '3:24'. */
  duration?: string
}

// SAMPLE CONTENT - check before launch: titles and descriptions are inferred from the file names.
export const videos: DemoVideo[] = [
  {
    id: 'auto-overview',
    title: 'Survey Suite Auto overview',
    product: 'auto',
    description: 'A tour of the in-car interface: today’s job list, job search and getting directions to the next property.',
    youtube: '', // was "Survey Suite Auto.mp4"
  },
  {
    id: 'auto-hands-free',
    title: 'Hands-free in the car',
    product: 'auto',
    description: 'Driving the day by voice: finding jobs and navigating without taking your hands off the wheel.',
    youtube: '', // was "Survey Suite Auto with hands free.mp4"
  },
  {
    id: 'auto-demo',
    title: 'Auto walkthrough',
    product: 'auto',
    description: 'A longer walkthrough of Survey Suite Auto on a vehicle display.',
    youtube: '', // was "auto demo.mp4"
  },
]

const ID = /^[A-Za-z0-9_-]{11}$/

/** Extracts the 11-character YouTube video ID from a link, or returns null. */
export function youtubeId(link: string): string | null {
  const value = link.trim()
  if (!value) return null
  if (ID.test(value)) return value
  try {
    const url = new URL(value)
    const host = url.hostname.replace(/^(www|m)\./, '')
    let id: string | null = null
    if (host === 'youtu.be') id = url.pathname.slice(1)
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ?? null
    }
    return id && ID.test(id) ? id : null
  } catch {
    return null
  }
}

/** Privacy-enhanced embed (youtube-nocookie.com). Autoplays because it only loads after a click. */
export function embedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`
}

/** Only videos with a valid YouTube link. Everything on the site uses this list. */
export const publishedVideos = videos.filter((v) => youtubeId(v.youtube))
