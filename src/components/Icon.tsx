// One icon style: 24px grid, 2px stroke, round caps and joins.
const paths = {
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  briefcase: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>),
  'calendar-plus': (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5h5" /></>),
  users: (<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></>),
  'file-text': (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>),
  home: (<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-5h4v5" /></>),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  'bar-chart': <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  'pie-chart': (<><path d="M21 12A9 9 0 1 1 12 3" /><path d="M12 3a9 9 0 0 1 9 9h-9z" /></>),
  smartphone: (<><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></>),
  building: (<><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" /></>),
  list: <path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01" />,
  'plus-circle': (<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  clipboard: (<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M9 11h6M9 15h4" /></>),
  camera: (<><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13.5" r="3.5" /></>),
  'map-pin': (<><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  'check-square': (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="m8 12 3 3 5-6" /></>),
  'cloud-off': (<><path d="M7 18h10a4 4 0 0 0 1-7.9A6 6 0 0 0 6.6 9 4.5 4.5 0 0 0 7 18z" /><path d="M3 3l18 18" /></>),
  car: (<><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3H3zM5 11h14" /><circle cx="7.5" cy="13.5" r=".5" /><circle cx="16.5" cy="13.5" r=".5" /></>),
  navigation: <path d="M3 11 21 3l-8 18-2-8z" />,
  mic: (<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>),
  refresh: (<><path d="M20 11a8 8 0 0 0-14.3-4.3L4 9M4 4v5h5" /><path d="M4 13a8 8 0 0 0 14.3 4.3L20 15M20 20v-5h-5" /></>),
  shield: (<><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></>),
  message: <path d="M4 5h16v11H9l-5 4z" />,
  sparkles: <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />,
  pound: <path d="M17 19H7c2-1.5 2.5-3.5 2.2-6.5L9 9a3.5 3.5 0 0 1 6.5-2M7 13h8" />,
  play: <path d="M8 5v14l11-7z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  wifi: <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01" />,
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0" />,
  ruler: (<><path d="M3 17 17 3l4 4L7 21z" /><path d="m7 13 2 2M10 10l2 2M13 7l2 2" /></>),
  tag: (<><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.2" /></>),
  more: <path d="M5 12h.01M12 12h.01M19 12h.01" />,
  tablet: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M18 12h.01" /></>),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />,
  gauge: (<><path d="M4.5 18a9 9 0 1 1 15 0" /><path d="m12 14 4-5M12 14h.01" /></>),
  power: (<><path d="M12 3v8" /><path d="M7 6.3a8 8 0 1 0 10 0" /></>),
  volume: (<><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" /></>),
  hud: (<><path d="M3 7c6-2.5 12-2.5 18 0l-2 10c-4.7-1.4-9.3-1.4-14 0z" /><path d="M12 9.5v4M10 11.5l2-2 2 2" /></>),
} as const

export type IconName = keyof typeof paths

interface IconProps {
  name: IconName
  size?: number
  className?: string
  label?: string
}

export default function Icon({ name, size = 24, className, label }: IconProps) {
  const filled = name === 'play'
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}

export function ForwardIcon({ size = 18 }: { size?: number }) {
  return <Icon name="arrow-right" size={size} className="icon-forward" />
}
