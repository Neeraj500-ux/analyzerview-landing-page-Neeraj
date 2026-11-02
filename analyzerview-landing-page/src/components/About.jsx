import { useEffect, useRef, useState } from 'react'
import {
  BadgeCheck, Clock, Users, Quote, LineChart, CandlestickChart,
  ShieldCheck, GraduationCap, Sparkles, TrendingUp,
  Briefcase, Target, Eye,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const paras = [
  'Analyzerview Market Research is a SEBI-Registered Research Analyst Platform committed to delivering independent, transparent, and data-driven equity research to investors across India. Our approach combines in-depth market analysis, financial research, and structured analytical methodologies to help investors better understand market dynamics and make more informed investment decisions.',
  'We cater to a diverse range of investors, including retail investors and High-Net-Worth Individuals (HNIs), through well-researched reports, thematic market studies, actionable research insights, and investor education. Every aspect of our research approach is built around analytical discipline, transparency, and adherence to applicable SEBI regulatory requirements.',
  'Founded by Rahul Das, a SEBI-Registered Research Analyst, Analyzerview specialises in fundamental and technical analysis, integrating business fundamentals, price action, market trends, and risk-to-reward assessment to develop a more structured perspective on the financial markets. Rather than relying on speculation or unverified market tips, we emphasise research-backed insights, clearly defined trading parameters, and disciplined risk management.',
  'At Analyzerview, we believe that successful market participation begins with understanding, not guesswork. Our objective is to empower investors with the knowledge, analytical clarity, and research-driven perspectives they need to navigate evolving market conditions with greater confidence and discipline.',
]

/** founder bio, grouped into tabs */
const founderTabs = [
  {
    id: 'experience',
    label: 'Experience',
    icon: Briefcase,
    paras: [
      'With over 8 years of experience in the financial markets and a track record of 3,000+ people using his strategy, Rahul Das brings extensive market knowledge, analytical expertise, and a research-driven approach to trading and investment analysis.',
      'Through his professional experience and association with multiple established brands, Rahul has developed a strong understanding of market dynamics and research-led trading strategies.',
    ],
  },
  {
    id: 'focus',
    label: 'Focus',
    icon: Target,
    paras: [
      'He focuses on market research, strategic analysis, price action, and structured trading methodologies, emphasizing informed decision-making, disciplined execution, and effective risk management.',
    ],
  },
  {
    id: 'vision',
    label: 'Vision',
    icon: Eye,
    paras: [
      'His vision is to make market research more structured, transparent, and accessible by combining analytical insights with systematic strategies and a disciplined approach to risk.',
    ],
  },
]

const pillars = [
  { icon: LineChart, title: 'Fundamental analysis', text: 'Business quality and financial strength' },
  { icon: CandlestickChart, title: 'Technical analysis', text: 'Price action and market trends' },
  { icon: ShieldCheck, title: 'Risk management', text: 'Defined risk-to-reward on every view' },
  { icon: GraduationCap, title: 'Investor education', text: 'Understanding before action' },
]

const headline = [
  { w: 'Meet', brand: false },
  { w: 'Analyzerview', brand: true },
  { w: 'Market', brand: true },
  { w: 'Research', brand: true },
]

/* page palette used by the founder card */
const BLUE = '#1f4fff'
const BLUE_SOFT = '#6fa3f7'
const ORANGE = '#ff994d'

/* decorative candlestick data (deterministic, trending up) */
const candles = Array.from({ length: 22 }, (_, i) => {
  const mid = 92 - i * 2.9 + Math.sin(i * 1.9) * 8
  const body = 5 + Math.abs(Math.sin(i * 2.7)) * 9
  const up = Math.sin(i * 1.3 + 0.4) > -0.35
  const open = mid + (up ? body / 2 : -body / 2)
  const close = mid + (up ? -body / 2 : body / 2)
  return {
    x: 16 + i * 19.4,
    up,
    top: Math.min(open, close),
    height: Math.abs(open - close),
    wickTop: Math.min(open, close) - 4 - Math.abs(Math.sin(i * 3.1)) * 6,
    wickBottom: Math.max(open, close) + 4 + Math.abs(Math.cos(i * 2.3)) * 6,
    close,
  }
})
const trendPath = candles.map((c, i) => `${i ? 'L' : 'M'}${c.x} ${c.close}`).join(' ')

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** true once the element has scrolled into view (fires once) */
function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}

/** smooth count-up from 0 to `end` once `active` is true */
function useCountUp(end, active, duration = 1800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      setValue(end)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4) // easeOutQuart
      setValue(Math.round(end * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, active, duration])

  return value
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

/** scroll-reveal wrapper (directional, staggered via `delay` in ms) */
function Reveal({ children, delay = 0, from = 'up', className = '' }) {
  const [ref, inView] = useInView(0.15)
  const hidden = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: '-translate-x-10',
    right: 'translate-x-10',
    zoom: 'scale-95',
  }[from]

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
        inView ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : `${hidden} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  )
}

/** subtle 3D tilt + cursor spotlight (mouse / pen on hover-capable devices only) */
function TiltCard({ children, className = '', max = 5 }) {
  const ref = useRef(null)

  const canHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onMove = (e) => {
    if (e.pointerType === 'touch' || prefersReducedMotion() || !canHover()) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.transform = `perspective(1200px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`fv-tilt ${className}`}>
      {children}
    </div>
  )
}

/** animated stat tile */
function Stat({ icon: Icon, end, suffix, label, active, accent }) {
  const n = useCountUp(end, active)
  return (
    <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-blue-100 bg-white p-3.5 shadow-[0_14px_30px_-20px_rgba(15,40,110,.35)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 sm:p-4">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] opacity-90"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div
        aria-hidden
        className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div
        className="relative grid h-9 w-9 place-items-center rounded-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
        style={{ background: `${accent}1f`, color: accent }}
      >
        <Icon size={17} />
      </div>
      <div className="relative mt-3 text-[26px] font-extrabold leading-none tabular-nums tracking-tight text-navy-900 sm:text-[32px]">
        {n.toLocaleString('en-IN')}
        <span style={{ color: accent }}>{suffix}</span>
      </div>
      <div className="relative mt-1.5 text-[12px] font-medium leading-snug text-slate-500">{label}</div>
    </div>
  )
}

/** animated candlestick chart used as the card's header artwork */
function MarketArt({ active }) {
  return (
    <svg viewBox="0 0 440 120" preserveAspectRatio="none" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id="fv-trend" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={BLUE} />
          <stop offset="55%" stopColor={BLUE_SOFT} />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
      </defs>

      {[24, 54, 84].map((y) => (
        <line key={y} x1="0" x2="440" y1={y} y2={y} stroke="rgba(15,40,110,.12)" strokeDasharray="2 6" />
      ))}

      {candles.map((c, i) => {
        const color = c.up ? BLUE : ORANGE
        return (
          <g
            key={i}
            className={`fv-candle ${active ? 'fv-on' : ''}`}
            style={{ animationDelay: `${300 + i * 55}ms` }}
          >
            {/* wide invisible hit area for hover */}
            <rect x={c.x - 9} y="0" width="18" height="120" fill="transparent" />
            <line x1={c.x} x2={c.x} y1={c.wickTop} y2={c.wickBottom} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity=".9" />
            <rect x={c.x - 5} y={c.top} width="10" height={Math.max(c.height, 3)} rx="2" fill={color} opacity=".92" />
          </g>
        )
      })}

      <path
        d={trendPath}
        pathLength="1"
        fill="none"
        stroke="url(#fv-trend)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`fv-trend ${active ? 'fv-on' : ''}`}
        style={{ filter: 'drop-shadow(0 0 6px rgba(31,79,255,.45))', pointerEvents: 'none' }}
      />
    </svg>
  )
}

/** the redesigned founder card */
function FounderCard() {
  const [cardRef, cardIn] = useInView(0.25)
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])

  const onKey = (e) => {
    let next = active
    if (e.key === 'ArrowRight') next = (active + 1) % founderTabs.length
    else if (e.key === 'ArrowLeft') next = (active - 1 + founderTabs.length) % founderTabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = founderTabs.length - 1
    else return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <TiltCard>
      <style>{`
        @keyframes fv-spin { to { transform: rotate(360deg) } }
        @keyframes fv-ring { 0% { transform: scale(.92); opacity: .8 } 100% { transform: scale(1.6); opacity: 0 } }
        @keyframes fv-shine { 0% { transform: translateX(-120%) skewX(-18deg) } 60%,100% { transform: translateX(380%) skewX(-18deg) } }
        @keyframes fv-candle { from { transform: scaleY(0); opacity: 0 } to { transform: scaleY(1); opacity: 1 } }
        @keyframes fv-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
        @keyframes fv-drift { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(-24px,18px,0) } }
        @keyframes fv-blink { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
        @keyframes fv-pop { from { transform: scale(.6) rotate(-12deg); opacity: 0 } to { transform: scale(1) rotate(0); opacity: 1 } }

        .fv-tilt { --mx: 50%; --my: 50%; transition: transform .45s cubic-bezier(.22,1,.36,1); will-change: transform; transform-style: preserve-3d }
        .fv-spot { background: radial-gradient(380px circle at var(--mx) var(--my), rgba(31,79,255,.10), transparent 60%); opacity: 0; transition: opacity .4s }
        .fv-tilt:hover .fv-spot { opacity: 1 }

        .fv-dots {
          background-image: radial-gradient(rgba(15,40,110,.12) 1px, transparent 1.2px);
          background-size: 22px 22px;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 70%);
          mask-image: linear-gradient(to bottom, #000 0%, transparent 70%);
        }

        .fv-border { animation: fv-spin 9s linear infinite }
        .fv-ring { animation: fv-ring 2.8s cubic-bezier(.22,1,.36,1) infinite }
        .fv-shine { animation: fv-shine 5s ease-in-out infinite }
        .fv-orb { animation: fv-drift 14s ease-in-out infinite }
        .fv-live { animation: fv-blink 1.8s ease-in-out infinite }

        .fv-candle { transform-box: fill-box; transform-origin: center; opacity: 0; cursor: crosshair }
        .fv-candle.fv-on { animation: fv-candle .6s cubic-bezier(.22,1,.36,1) both; transition: filter .25s }
        .fv-candle.fv-on:hover { filter: brightness(1.2) drop-shadow(0 0 5px rgba(31,79,255,.55)) }
        .fv-trend { stroke-dasharray: 1; stroke-dashoffset: 1 }
        .fv-trend.fv-on { animation: fv-draw 2.2s cubic-bezier(.65,0,.35,1) .5s both }

        .fv-panel { transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1), filter .5s }
        .fv-tabthumb { transition: transform .5s cubic-bezier(.22,1,.36,1) }
        .fv-pop { animation: fv-pop .5s cubic-bezier(.22,1,.36,1) both }

        @media (prefers-reduced-motion: reduce) {
          .fv-border, .fv-ring, .fv-shine, .fv-orb, .fv-live, .fv-pop { animation: none !important }
          .fv-candle { opacity: 1; animation: none !important }
          .fv-trend { stroke-dashoffset: 0; animation: none !important }
          .fv-tilt { transition: none; transform: none !important }
          .fv-panel, .fv-tabthumb { transition: none }
        }
      `}</style>

      {/* animated gradient border (blue -> orange) */}
      <div className="relative overflow-hidden rounded-[28px] p-[1.5px] shadow-[0_40px_90px_-30px_rgba(15,40,110,.45)]">
        <span
          aria-hidden
          className="fv-border absolute inset-[-100%]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0 56%, ${BLUE} 74%, ${ORANGE} 90%, transparent 100%)`,
          }}
        />

        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[calc(28px-1.5px)] text-navy-900"
          style={{ background: 'linear-gradient(165deg,#ffffff 0%,#f4f8ff 55%,#eaf1ff 100%)' }}
        >
          {/* dotted texture + cursor spotlight */}
          <div aria-hidden className="fv-dots pointer-events-none absolute inset-0" />
          <div aria-hidden className="fv-spot pointer-events-none absolute inset-0 z-10" />

          {/* ---------- cover: full photo ---------- */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src="/images/Neeraj2.png"
              alt="Rahul Das – SEBI-Registered Research Analyst"
              className="h-full w-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            {/* soft fades: top for badge legibility, bottom blends into the card */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1330]/45 to-transparent" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/60 to-transparent" />

            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3 py-1.5 text-[11px] font-bold text-navy-900 shadow-sm backdrop-blur-md sm:left-5 sm:top-5 sm:text-[12px]">
              <span className="fv-live h-1.5 w-1.5 rounded-full bg-brand" />
              Founder
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-[#ff994d]/40 bg-[#fff3e8]/95 px-3 py-1.5 text-[11px] font-bold text-[#c2570c] shadow-sm backdrop-blur-md sm:right-5 sm:top-5 sm:text-[12px]">
              <TrendingUp size={13} />
              Research-led
            </div>

            <span className="fv-pop absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-brand text-white shadow-lg ring-4 ring-white sm:right-6">
              <BadgeCheck size={18} />
            </span>
          </div>

          {/* ---------- body ---------- */}
          <div className="relative -mt-8 px-4 pb-6 sm:px-8 sm:pb-8">
            {/* identity (sits fully below the chart) */}
            <div className="mt-4">
              <h3 className="text-[26px] font-extrabold leading-tight tracking-[-.025em] text-navy-900 sm:text-[32px]">
                Rahul Das
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-[11.5px] font-bold text-brand sm:text-[12px]">
                  SEBI-Registered Research Analyst
                </span>
                <span className="rounded-full border border-[#ff994d]/40 bg-[#fff3e8] px-3 py-1 text-[11.5px] font-bold text-[#c2570c] sm:text-[12px]">
                  Algorithmic Strategy Specialist
                </span>
              </div>
            </div>

            {/* market chart – separate from the photo */}
            <div className="relative mt-6 h-24 overflow-hidden rounded-2xl border border-blue-100 bg-white px-2 py-2 shadow-[0_14px_30px_-20px_rgba(15,40,110,.35)] sm:h-28 sm:px-3">
              <MarketArt active={cardIn} />
            </div>

            {/* stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat icon={Clock} end={8} suffix="+ yrs" label="in the financial markets" active={cardIn} accent={BLUE} />
              <Stat icon={Users} end={3000} suffix="+" label="people using the strategy" active={cardIn} accent={ORANGE} />
            </div>

            {/* tabs */}
            <div className="mt-7">
              <div
                role="tablist"
                aria-label="About Rahul Das"
                onKeyDown={onKey}
                className="relative grid grid-cols-3 rounded-xl border border-blue-100 bg-[#eaf1ff] p-1"
              >
                <span
                  aria-hidden
                  className="fv-tabthumb absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-lg bg-gradient-to-br from-brand to-[#6fa3f7] shadow-[0_8px_22px_-8px_rgba(31,79,255,.7)]"
                  style={{ transform: `translateX(${active * 100}%)` }}
                />
                {founderTabs.map((t, i) => {
                  const TabIcon = t.icon
                  return (
                    <button
                      key={t.id}
                      ref={(el) => (tabRefs.current[i] = el)}
                      role="tab"
                      id={`fv-tab-${t.id}`}
                      aria-selected={active === i}
                      aria-controls={`fv-panel-${t.id}`}
                      tabIndex={active === i ? 0 : -1}
                      onClick={() => setActive(i)}
                      className={`relative z-10 flex items-center justify-center gap-1.5 rounded-lg px-1.5 py-2.5 text-[12.5px] font-bold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:px-2 sm:text-[13px] ${
                        active === i ? 'text-white' : 'text-slate-600 hover:text-navy-900'
                      }`}
                    >
                      <TabIcon size={14} className="hidden sm:block" />
                      {t.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 grid">
                {founderTabs.map((t, i) => {
                  const on = active === i
                  return (
                    <div
                      key={t.id}
                      role="tabpanel"
                      id={`fv-panel-${t.id}`}
                      aria-labelledby={`fv-tab-${t.id}`}
                      aria-hidden={!on}
                      className={`fv-panel col-start-1 row-start-1 space-y-3 text-[14px] font-medium leading-[1.75] text-slate-700 sm:text-[14.5px] ${
                        on
                          ? 'translate-y-0 opacity-100 blur-0'
                          : 'pointer-events-none translate-y-3 opacity-0 blur-[3px]'
                      }`}
                    >
                      {t.paras.map((p, k) => (
                        <p key={k}>{p}</p>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* quote */}
            <div className="group relative mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_14px_30px_-20px_rgba(15,40,110,.35)] sm:p-5">
              <span
                aria-hidden
                className="fv-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-blue-100/70 to-transparent"
              />
              <span aria-hidden className="absolute inset-y-4 left-0 w-[3px] rounded-full bg-gradient-to-b from-brand to-[#ff994d]" />
              <div className="relative flex gap-3 pl-2">
                <Quote
                  size={22}
                  className="mt-0.5 shrink-0 text-[#ff994d] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125"
                />
                <p className="text-[15.5px] font-extrabold leading-snug text-navy-900 sm:text-[17px]">
                  Research with precision. Analyse with discipline. Trade with a strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function About() {
  const [headRef, headIn] = useInView(0.3)

  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-28">
      {/* ---------- scoped keyframes ---------- */}
      <style>{`
        @keyframes av-float-a { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(60px,40px,0) scale(1.15) } }
        @keyframes av-float-b { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(-50px,-30px,0) scale(1.1) } }
        @keyframes av-shimmer { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes av-pulse-ring { 0% { transform: scale(.9); opacity: .7 } 100% { transform: scale(1.7); opacity: 0 } }
        @keyframes av-shine { 0% { transform: translateX(-120%) skewX(-18deg) } 60%,100% { transform: translateX(260%) skewX(-18deg) } }
        @keyframes av-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes av-grow { from { transform: scaleY(0) } to { transform: scaleY(1) } }

        .av-orb-a { animation: av-float-a 16s ease-in-out infinite }
        .av-orb-b { animation: av-float-b 19s ease-in-out infinite }
        .av-shimmer-text { background-size: 200% auto; animation: av-shimmer 5s linear infinite }
        .av-ring { animation: av-pulse-ring 2.6s cubic-bezier(.22,1,.36,1) infinite }
        .av-shine { animation: av-shine 4.5s ease-in-out infinite }
        .av-bob { animation: av-bob 3.2s ease-in-out infinite }
        .av-line { transform-origin: top; animation: av-grow 1.4s cubic-bezier(.22,1,.36,1) both }

        .av-grid-bg {
          background-image:
            linear-gradient(to right, rgba(15,40,110,.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,40,110,.06) 1px, transparent 1px);
          background-size: 46px 46px;
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%);
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%);
        }

        @media (prefers-reduced-motion: reduce) {
          .av-orb-a, .av-orb-b, .av-shimmer-text, .av-ring, .av-shine, .av-bob, .av-line { animation: none !important }
        }
      `}</style>

      {/* ---------- ambient background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="av-grid-bg absolute inset-0" />
        <div className="av-orb-a absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-[#4f8bff]/20 blur-[110px]" />
        <div className="av-orb-b absolute -right-24 top-[40%] h-[460px] w-[460px] rounded-full bg-[#ff994d]/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1180px]">
        {/* ---------- heading ---------- */}
        <div ref={headRef} className="text-center">
          {/* Logo – same size as the FAQ section logo */}
          <Reveal from="down" className="flex justify-center">
            <div className="av-bob rounded-3xl border border-white bg-white px-5 py-3 shadow-[0_18px_40px_-14px_rgba(31,79,255,.32)] ring-1 ring-slate-100 sm:px-7 sm:py-4">
              <img
                src="/images/Neeraj3.png"
                alt="AnalyzerView.com – SEBI Research Analyst"
                className="h-auto w-[240px] max-w-full sm:w-[340px]"
                width="2048"
                height="768"
                loading="eager"
                decoding="async"
              />
            </div>
          </Reveal>

          <h2 className="mx-auto mt-8 flex max-w-full flex-wrap items-baseline justify-center gap-x-[.28em] text-center text-[clamp(30px,5.4vw,60px)] font-extrabold leading-[1.08] tracking-[-.04em] text-navy-900">
            {headline.map(({ w, brand }, i) => (
              <span key={w} className="inline-block max-w-full overflow-hidden pb-[.12em] align-bottom">
                <span
                  style={{ transitionDelay: `${150 + i * 130}ms` }}
                  className={`inline-block transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                    headIn ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  } ${
                    brand
                      ? 'av-shimmer-text bg-gradient-to-r from-brand via-[#6fa3f7] to-[#0a1330] bg-clip-text text-transparent'
                      : ''
                  }`}
                >
                  {w}
                </span>
              </span>
            ))}
          </h2>

          <Reveal delay={700}>
            <div className="mx-auto mt-6 flex max-w-max items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-[12px] font-bold text-navy-900 shadow-sm backdrop-blur sm:text-[13px]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="av-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              SEBI-Registered Research Analyst Platform
            </div>
          </Reveal>
        </div>

        {/* ---------- main grid ---------- */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          {/* ===== left: about ===== */}
          <Reveal from="left" className="min-w-0">
            <div className="relative rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-[0_30px_80px_-30px_rgba(15,40,110,.25)] backdrop-blur-md sm:p-10">
              {/* growing accent line */}
              <span className="av-line absolute bottom-10 left-0 top-10 w-[3px] rounded-full bg-gradient-to-b from-brand via-[#6fa3f7] to-[#ff994d]" />

              <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-[.02em] text-brand">
                <Sparkles size={16} className="transition-transform duration-700 hover:rotate-180" />
                About Analyzerview Market Research
              </h3>

              <div className="mt-6 space-y-5 text-[15.5px] font-medium leading-[1.85] text-slate-700">
                {paras.map((p, i) => (
                  <Reveal key={i} delay={i * 110} from="up">
                    <p>{p}</p>
                  </Reveal>
                ))}
                <Reveal delay={480}>
                  <p className="rounded-2xl bg-gradient-to-r from-brand/10 to-transparent p-4 font-bold text-navy-900">
                    Our commitment is to make market research more structured, investment decisions more informed, and risk awareness an integral part of every market strategy.
                  </p>
                </Reveal>
              </div>

              {/* pillars */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {pillars.map(({ icon: Icon, title, text }, i) => (
                  <Reveal key={title} delay={i * 90} from="zoom">
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-blue-100 bg-[#f7faff] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(31,79,255,.45)]">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-[#6fa3f7] text-white shadow-md transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                        <Icon size={20} />
                      </div>
                      <div className="mt-3 text-[15px] font-extrabold text-navy-900">{title}</div>
                      <div className="mt-0.5 text-[13px] font-medium text-slate-500">{text}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ===== right: founder (redesigned) ===== */}
          <Reveal from="right" delay={150} className="min-w-0 lg:sticky lg:top-24">
            <FounderCard />
          </Reveal>
        </div>

        {/* ---------- bottom banner ---------- */}
        <Reveal className="mt-12" from="zoom">
          <div className="group relative overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#101827,#20183f)] px-6 py-7 text-center text-white shadow-[0_30px_70px_-30px_rgba(16,24,39,.8)]">
            <span
              aria-hidden
              className="av-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <BadgeCheck
                className="text-[#ff994d] transition-transform duration-700 group-hover:rotate-[360deg]"
                size={30}
              />
              <p className="text-lg font-extrabold tracking-[-.01em] sm:text-2xl">
                Institutional Grade Analysis.{' '}
                <span className="av-shimmer-text bg-gradient-to-r from-[#ff994d] via-[#ffd2a8] to-[#ff994d] bg-clip-text text-transparent">
                  Professional Market Perspectives.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}