import './BrandMark.css'

/** The Survey Suite house-and-smile mark, redrawn from the brand artwork.
 *  Brand asset: never mirrored, even in right-to-left layouts. */
export function LogoMark({ size = 40, inverse = false }: { size?: number; inverse?: boolean }) {
  const navy = inverse ? '#ffffff' : 'var(--color-primary)'
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M8 31 32 9l24 22" fill="none" stroke={navy} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 15.5V10.5h6v11" fill="none" stroke={navy} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="23.5" y="24" width="7.5" height="7.5" rx="1.6" fill="var(--color-accent)" />
      <rect x="33" y="24" width="7.5" height="7.5" rx="1.6" fill="var(--color-accent)" />
      <rect x="23.5" y="33.5" width="7.5" height="7.5" rx="1.6" fill="var(--color-accent)" />
      <rect x="33" y="33.5" width="7.5" height="7.5" rx="1.6" fill="var(--color-accent)" />
      <path d="M12 41c3 10 11 16 20 16s17-6 20-16" fill="none" stroke="var(--color-accent)" strokeWidth="6.5" strokeLinecap="round" />
    </svg>
  )
}

export default function BrandMark({ inverse = false, product }: { inverse?: boolean; product?: string }) {
  return (
    <span className={`brand${inverse ? ' brand--inverse' : ''}`}>
      <LogoMark size={38} inverse={inverse} />
      <span className="brand__word">
        Survey <span className="brand__suite">Suite</span>
        {product && <span className="brand__product"> {product}</span>}
      </span>
    </span>
  )
}
