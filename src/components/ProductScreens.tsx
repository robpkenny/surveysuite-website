import Icon from './Icon'
import { LogoMark } from './BrandMark'
import './ProductScreens.css'

// SAMPLE CONTENT - replace before launch: illustrative job and practice data shown inside the product screens.
export const sampleJob = {
  no: '001041',
  address: '12 Oakwood Drive',
  town: 'Chichester',
  postcode: 'PO19 7US',
  type: 'Building Survey',
  time: '10:30',
  client: 'Mrs A. Harper',
  distance: '4.2 mi',
}

const num = new Intl.NumberFormat('en-GB')

function Id({ children }: { children: string }) {
  return (
    <bdi
      className="ltr-value"
      /* bidi-fixed: Job numbers and postcodes preserve LTR character order; verify=ltr,rtl */
      dir="ltr"
    >
      {children}
    </bdi>
  )
}

/* ---------------- Desktop ---------------- */
export function DesktopScreen({ focusJob = false }: { focusJob?: boolean }) {
  const jobs = [
    { addr: sampleJob.address, type: sampleJob.type, status: 'progress' as const, label: 'In progress', key: true },
    { addr: 'Riverside House', type: 'Valuation', status: 'done' as const, label: 'Completed' },
    { addr: 'Maple Court', type: 'HomeBuyer Report', status: 'pending' as const, label: 'Pending' },
    { addr: 'The Granary', type: 'Condition Report', status: 'progress' as const, label: 'Booked' },
    { addr: 'Hill View', type: 'Site Inspection', status: 'pending' as const, label: 'Pending' },
  ]
  const side = ['Dashboard', 'Jobs', 'Clients', 'Properties', 'Reports', 'Maps', 'Analytics', 'Settings']
  const stats = [
    { n: 247, l: 'Active jobs', i: 'briefcase' as const },
    { n: 92, l: 'Clients', i: 'users' as const },
    { n: 36, l: 'Surveys this week', i: 'clipboard' as const },
    { n: 18, l: 'Reports due', i: 'file-text' as const },
  ]
  return (
    <div className="scr scr-desktop">
      <aside className="sd-side">
        <div className="sd-logo"><LogoMark size={18} inverse /> <span>Survey <b>Suite</b></span></div>
        {side.map((s, i) => (
          <div key={s} className={`sd-nav${i === (focusJob ? 1 : 0) ? ' is-on' : ''}`}>{s}</div>
        ))}
      </aside>
      <div className="sd-main">
        <div className="sd-top">
          <div className="sd-search"><Icon name="search" size={10} /> Search jobs, clients, properties…</div>
          <div className="sd-user"><span>JD</span></div>
        </div>
        <div className="sd-stats">
          {stats.map((s) => (
            <div key={s.l} className="sd-stat">
              <Icon name={s.i} size={12} />
              <div><b>{num.format(s.n)}</b><small>{s.l}</small></div>
            </div>
          ))}
        </div>
        <div className="sd-cols">
          <div className="sd-card sd-jobs">
            <div className="sd-h">Recent jobs</div>
            {jobs.map((j) => (
              <div key={j.addr} className={`sd-row${focusJob && j.key ? ' is-focus' : ''}`}>
                <span className="sd-addr">{j.addr}</span>
                <span className="sd-type">{j.type}</span>
                <span className={`pill pill--${j.status}`}>{j.label}</span>
              </div>
            ))}
          </div>
          <div className="sd-card sd-chart">
            <div className="sd-h">Jobs by type</div>
            <div className="sd-donut-wrap">
              <svg viewBox="0 0 42 42" className="sd-donut">
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2f6fd6" strokeWidth="6" strokeDasharray="38 62" strokeDashoffset="25" />
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#d65127" strokeWidth="6" strokeDasharray="24 76" strokeDashoffset="87" />
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#5b9b2a" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="63" />
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#6b3fb3" strokeWidth="6" strokeDasharray="12 88" strokeDashoffset="43" />
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#c9d3d9" strokeWidth="6" strokeDasharray="6 94" strokeDashoffset="31" />
              </svg>
              <ul className="sd-legend">
                <li><i style={{ background: '#2f6fd6' }} />Building Survey</li>
                <li><i style={{ background: '#d65127' }} />Valuation</li>
                <li><i style={{ background: '#5b9b2a' }} />Condition Report</li>
                <li><i style={{ background: '#6b3fb3' }} />HomeBuyer</li>
              </ul>
            </div>
          </div>
        </div>
        {focusJob && (
          <div className="sd-toast">
            <Icon name="check-square" size={11} /> Job <Id>{sampleJob.no}</Id> assigned to J. Davis · sent to Mobile, Auto and Inspect
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- Mobile ---------------- */
const tiles = [
  ['Today', 'blue'], ['Tomorrow', 'green'], ['All Jobs', 'orange'], ['Agents', 'sky'],
  ['New Job', 'purple'], ['Search', 'rose'], ['Clients', 'red'], ['Notes', 'olive'],
] as const

export function MobileScreen({ view = 'home' }: { view?: 'home' | 'today' }) {
  return (
    <div className="scr scr-mobile">
      <div className="sm-status"><span>9:41</span><span className="sm-icons"><Icon name="wifi" size={9} /></span></div>
      <div className="sm-head"><LogoMark size={16} /> <span>Survey <b>Suite</b> Mobile</span></div>
      {view === 'home' ? (
        <div className="sm-tiles">
          {tiles.map(([t, c]) => (
            <div key={t} className="sm-tile" style={{ background: `var(--tile-${c})` }}>{t}</div>
          ))}
        </div>
      ) : (
        <div className="sm-today">
          <div className="sm-title">Today · 3 jobs</div>
          <div className="sm-job is-next">
            <div className="sm-time">{sampleJob.time}</div>
            <div>
              <b>{sampleJob.address}</b>
              <small>{sampleJob.type} · <Id>{sampleJob.no}</Id></small>
              <small>{sampleJob.client}</small>
            </div>
          </div>
          <div className="sm-job"><div className="sm-time">13:00</div><div><b>Maple Court</b><small>HomeBuyer Report</small></div></div>
          <div className="sm-job"><div className="sm-time">15:30</div><div><b>Hill View</b><small>Site Inspection</small></div></div>
          <div className="sm-note"><Icon name="file-text" size={9} /> Key with neighbour at no. 14</div>
        </div>
      )}
      <div className="sm-tabs">
        <span className="is-on"><Icon name="home" size={11} />Home</span>
        <span><Icon name="list" size={11} />Jobs</span>
        <span><Icon name="map-pin" size={11} />Map</span>
        <span><Icon name="more" size={11} />More</span>
      </div>
    </div>
  )
}

/* ---------------- Auto ---------------- */
export function AutoScreen() {
  return (
    <div className="scr scr-auto">
      <div className="sa-head">
        <LogoMark size={20} inverse />
        <div><b>Survey Suite Auto</b><small>Vehicle connected</small></div>
        <div className="sa-clock"><b>08:52</b><small>Online</small></div>
      </div>
      <div className="sa-flags"><span className="sa-flag">Hands-free on</span><span>Voice: “Next job”</span></div>
      <div className="sa-nav"><b>Navigate</b><span>GPS: 3D fix</span></div>
      <div className="sa-body">
        <div className="sa-jobs-h"><b>Jobs</b><span className="sa-btn">Refresh</span></div>
        <div className="sa-search">Search job number, address or postcode</div>
        <div className="sa-job is-next">
          <b><Id>{sampleJob.no}</Id> · {sampleJob.distance}</b>
          <span>{sampleJob.address}, {sampleJob.town}, <Id>{sampleJob.postcode}</Id></span>
        </div>
        <div className="sa-job">
          <b><Id>001053</Id> · 7.8 mi</b>
          <span>Maple Court, Bognor Regis, <Id>PO21 1BU</Id></span>
        </div>
      </div>
      <div className="sa-actions">
        <span className="sa-act">Back</span>
        <span className="sa-act sa-act--go"><Icon name="navigation" size={10} /> Go</span>
        <span className="sa-act">Refresh</span>
      </div>
    </div>
  )
}

/* ---------------- Inspect ---------------- */
function HouseIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="si-house" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9d6ea" /><stop offset="1" stopColor="#e9f2f7" /></linearGradient>
        <pattern id="brick" width="16" height="8" patternUnits="userSpaceOnUse">
          <rect width="16" height="8" fill="#a24c33" />
          <path d="M0 8h16M8 0v4M0 4h16M16 4v4M0 4v4" stroke="#c87a5c" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill="url(#sky)" />
      <ellipse cx="40" cy="150" rx="50" ry="40" fill="#6f9a4a" />
      <ellipse cx="290" cy="140" rx="45" ry="48" fill="#5e8a3e" />
      <rect y="168" width="320" height="32" fill="#7aa356" />
      <path d="M70 92 160 34l90 58z" fill="#3a3f45" />
      <rect x="196" y="40" width="14" height="30" fill="#8a3f2b" />
      <rect x="80" y="90" width="160" height="80" fill="url(#brick)" />
      <path d="M70 92h180" stroke="#2c3136" strokeWidth="4" />
      {[96, 196].map((x) => (
        <g key={x}>
          <rect x={x} y="102" width="30" height="24" fill="#f2f5f7" />
          <rect x={x + 2} y="104" width="12" height="20" fill="#7d93a3" />
          <rect x={x + 16} y="104" width="12" height="20" fill="#7d93a3" />
          <rect x={x} y="136" width="30" height="24" fill="#f2f5f7" />
          <rect x={x + 2} y="138" width="12" height="20" fill="#7d93a3" />
          <rect x={x + 16} y="138" width="12" height="20" fill="#7d93a3" />
        </g>
      ))}
      <rect x="146" y="128" width="28" height="42" fill="#1f4a5c" />
      <path d="M142 128h36l-4-8h-28z" fill="#f2f5f7" />
      <circle cx="168" cy="150" r="1.6" fill="#e3c27a" />
      {/* Defect marker */}
      <circle cx="226" cy="98" r="9" fill="none" stroke="#d65127" strokeWidth="2.5" />
    </svg>
  )
}

export function InspectScreen() {
  const side = [
    ['Notes', 4], ['Photos', 12], ['Observations', 3], ['Defects', 1], ['Location', null], ['Floor plan', null], ['Voice note', null],
  ] as const
  return (
    <div className="scr scr-inspect">
      <div className="si-head"><LogoMark size={16} /> <span>Survey <b>Suite</b> Inspect</span><span className="si-job"><Id>{sampleJob.no}</Id> · {sampleJob.address}</span></div>
      <div className="si-body">
        <aside className="si-side">
          <div className="si-side-h">Inspection</div>
          {side.map(([l, n]) => (
            <div key={l} className={`si-item${l === 'Defects' ? ' is-on' : ''}`}><span>{l}</span>{n !== null && <b>{n}</b>}</div>
          ))}
        </aside>
        <div className="si-main">
          <div className="si-photo"><HouseIllustration /><span className="si-tag">Defect 1 · Slipped tile, front elevation</span></div>
          <div className="si-thumbs">
            <div className="si-thumb"><HouseIllustration /></div>
            <div className="si-thumb"><HouseIllustration /></div>
            <div className="si-thumb si-plan">
              <svg viewBox="0 0 60 40"><path d="M4 4h52v32H4zM4 20h22M26 4v32M40 20v16M26 26h14" fill="none" stroke="#4a5b64" strokeWidth="1.2" /></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="si-tools">
        {(['camera', 'file-text', 'ruler', 'tag', 'more'] as const).map((i, k) => (
          <span key={i}><Icon name={i} size={11} />{['Photo', 'Note', 'Measure', 'Label', 'More'][k]}</span>
        ))}
      </div>
    </div>
  )
}
