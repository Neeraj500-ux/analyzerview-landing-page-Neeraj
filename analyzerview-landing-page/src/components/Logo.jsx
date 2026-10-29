export default function Logo({ dark = false, className = '' }) {
  const text = dark ? '#ffffff' : '#0a1330'
  const sub = dark ? '#9db4ff' : '#475569'
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="44" height="40" viewBox="0 0 44 40" fill="none" aria-hidden="true">
        <rect x="4" y="22" width="7" height="14" rx="1.5" fill="#1b5cf0" />
        <rect x="15" y="15" width="7" height="21" rx="1.5" fill="#2f7bff" />
        <rect x="26" y="8" width="7" height="28" rx="1.5" fill="#1b5cf0" />
        <path d="M3 18 18 7l8 6L40 3" stroke={dark ? '#fff' : '#0a1330'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31 3h9v9" stroke={dark ? '#fff' : '#0a1330'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="leading-none">
        <div className="text-[19px] font-extrabold tracking-[-.01em]" style={{ color: text }}>
          ANALYZER<span style={{ color: '#1b5cf0' }}>VIEW</span>
        </div>
        <div className="mt-1 text-[8.5px] font-bold tracking-[.28em]" style={{ color: sub }}>
          MARKET RESEARCH
        </div>
      </div>
    </div>
  )
}
