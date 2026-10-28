import { useEffect, useRef } from 'react'

const SITE = 'Survey Suite'
const descriptionTag = () => document.querySelector<HTMLMetaElement>('meta[name="description"]')
const DEFAULT_DESCRIPTION = descriptionTag()?.content ?? ''

/**
 * Sets the browser tab title and, optionally, the page's meta description.
 * `meta.title` replaces the "<page> — Survey Suite" pattern with an exact title.
 */
export function usePageTitle(page?: string, meta?: { title?: string; description?: string }) {
  const title = meta?.title ?? (page ? `${page} — ${SITE}` : SITE)
  const description = meta?.description
  useEffect(() => {
    document.title = title
    const tag = descriptionTag()
    if (!tag || !description) return
    tag.content = description
    return () => { tag.content = DEFAULT_DESCRIPTION }
  }, [title, description])
}

/** Fade sections in on scroll. Content stays visible unless the observer attaches. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const vh = window.innerHeight
    const pending = items.filter((el) => el.getBoundingClientRect().top > vh * 0.9)
    pending.forEach((el) => el.classList.add('reveal-armed'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in')
            e.target.classList.remove('reveal-armed')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    pending.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}
