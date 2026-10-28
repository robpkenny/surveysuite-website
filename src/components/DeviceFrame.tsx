import type { ReactNode } from 'react'
import './DeviceFrame.css'

type Kind = 'browser' | 'phone' | 'tablet' | 'car'

interface Props {
  kind: Kind
  children: ReactNode
  className?: string
  /** Accessible description of what the screen shows. */
  label: string
}

/** Decorative device chrome around a composed product screen.
 *  The screen content is presentational, so the whole frame is exposed as one image. */
export default function DeviceFrame({ kind, children, className = '', label }: Props) {
  return (
    <figure className={`device device--${kind} ${className}`} role="img" aria-label={label}>
      {kind === 'browser' && (
        <div className="device__bar" aria-hidden="true">
          <span /><span /><span />
          <div className="device__url">app.surveysuite.co.uk</div>
        </div>
      )}
      {kind === 'phone' && <div className="device__notch" aria-hidden="true" />}
      <div className="device__screen" aria-hidden="true" inert>
        {children}
      </div>
      {kind === 'car' && <div className="device__stand" aria-hidden="true" />}
    </figure>
  )
}
