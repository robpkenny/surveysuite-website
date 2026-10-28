import type { ReactNode } from 'react'
import { contactEmail } from '../content/site'

/** A mailto link to the site's contact address (set once in src/content/site.ts). */
export default function EmailLink({
  email = contactEmail,
  subject,
  className,
  children,
}: {
  email?: string
  subject?: string
  className?: string
  children?: ReactNode
}) {
  const href = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
  return (
    <a href={href} className={className}>
      {children ?? (
        <span
          className="ltr-value"
          /* bidi-fixed: Email addresses preserve LTR character order; verify=ltr,rtl */
          dir="ltr"
        >
          {email}
        </span>
      )}
    </a>
  )
}
