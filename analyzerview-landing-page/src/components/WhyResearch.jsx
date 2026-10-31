import { useEffect, useRef } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Cpu,
  Eye,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Data (same colours as before)                                       */
/* ------------------------------------------------------------------ */

const researchItems = [
  {
    number: '01',
    title: 'Multi-Layer Research Methodology',
    description:
      'A structured four-layer framework designed to evaluate market conditions, validate opportunities and establish clear research parameters.',
    color: '#6957E8',
    dark: '#4B3BC4',
    tint: '#F0EDFF',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Algorithmic Trading Methodologies',
    description:
      'Rule-based trading strategies designed around predefined entry, exit and risk parameters, helping reduce reliance on impulsive decisions.',
    color: '#397CE8',
    dark: '#2459BD',
    tint: '#EBF2FF',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Quantitative & Technical Analysis',
    description:
      'Analytical frameworks, market data and technical indicators to assess price behaviour, market conditions and potential trading opportunities.',
    color: '#079782',
    dark: '#046C5C',
    tint: '#E7F8F3',
    icon: LineChart,
  },
  {
    number: '04',
    title: 'Risk-First Strategy Design',
    description:
      'Potential downside, stop-loss levels and risk-to-reward parameters form an important part of our research process.',
    color: '#C98A35',
    dark: '#9C6A22',
    tint: '#FFF5E7',
    icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'Transparent Research & Trade Parameters',
    description:
      'Understand the rationale behind a recommendation, including relevant entry levels, targets, exit criteria and associated risks, wherever applicable.',
    color: '#D45486',
    dark: '#A93566',
    tint: '#FFF0F5',
    icon: Eye,
  },
  {
    number: '06',
    title: 'Research Built on Discipline, Not Promises',
    description:
      'As a SEBI-registered Research Analyst, AnalyzerView focuses on research-led decision-making, appropriate disclosures and a professional client experience.',
    color: '#4772D8',
    dark: '#2D52AD',
    tint: '#EDF2FF',
    icon: BadgeCheck,
  },
]

const chartValues = [27, 40, 33, 49, 43, 58, 47, 66, 53, 72, 61, 83, 69, 94, 77, 105]

const marqueeRowA = [
  { label: 'Data-driven research', icon: LineChart, color: '#079782', dark: '#046C5C', tint: '#E7F8F3' },
  { label: 'Algorithmic methodologies', icon: Cpu, color: '#397CE8', dark: '#2459BD', tint: '#EBF2FF' },
  { label: 'Defined risk parameters', icon: ShieldCheck, color: '#C98A35', dark: '#9C6A22', tint: '#FFF5E7' },
  { label: 'Transparent rationale', icon: Eye, color: '#D45486', dark: '#A93566', tint: '#FFF0F5' },
  { label: 'Multi-layer framework', icon: Layers, color: '#6957E8', dark: '#4B3BC4', tint: '#F0EDFF' },
]

const marqueeRowB = [
  { label: 'Disciplined process', icon: BadgeCheck, color: '#4772D8', dark: '#2D52AD', tint: '#EDF2FF' },
  { label: 'Quantitative analysis', icon: LineChart, color: '#079782', dark: '#046C5C', tint: '#E7F8F3' },
  { label: 'Rule-based strategies', icon: Cpu, color: '#397CE8', dark: '#2459BD', tint: '#EBF2FF' },
  { label: 'Risk-first design', icon: ShieldCheck, color: '#C98A35', dark: '#9C6A22', tint: '#FFF5E7' },
  { label: 'Research-led decisions', icon: Sparkles, color: '#6957E8', dark: '#4B3BC4', tint: '#F0EDFF' },
]

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

/** Adds `is-in` to every `.reveal` element inside the ref when scrolled into view. */
function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return ref
}

/** Mouse-follow 3D tilt. Only active for real pointers (not touch). */
function tiltHandlers() {
  return {
    onMouseMove: (e) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`)
      el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    },
    onMouseLeave: (e) => {
      const el = e.currentTarget
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    },
  }
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-100 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-50" />
        <span className="relative h-2 w-2 rounded-full bg-indigo-600" />
      </span>
      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-700 sm:text-[11px]">
        {children}
      </span>
    </div>
  )
}

/** Chunky 3D icon: floor shadow + side thickness + glossy face + floating glyph. */
function Icon3D({ icon: Icon, color, dark, tint, size = 'md', delay = 0, number }) {
  const dim =
    size === 'lg' ? 'h-16 w-16 sm:h-[72px] sm:w-[72px]' : size === 'sm' ? 'icon3d-sm h-9 w-9' : 'h-14 w-14'
  const glyph = size === 'lg' ? 30 : size === 'sm' ? 17 : 26

  return (
    <div
      className={`icon3d relative ${dim} shrink-0`}
      style={{
        '--c': color,
        '--d': dark,
        '--t': tint,
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="icon3d-floor" />
      <span className="icon3d-side" />
      <span className="icon3d-face">
        <span className="icon3d-gloss" />
        {number && <span className="icon3d-num">{number}</span>}
        <Icon size={glyph} strokeWidth={2.2} className="icon3d-glyph" />
      </span>
    </div>
  )
}

/* Decorative SVG chart: illustrative only, not live market data. */
function ResearchChart() {
  const points = [
    [12, 115],
    [38, 100],
    [64, 106],
    [90, 82],
    [116, 91],
    [142, 68],
    [168, 78],
    [194, 56],
    [220, 67],
    [246, 42],
    [272, 52],
    [298, 30],
    [324, 40],
    [350, 17],
  ]

  const linePath = points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ')
  const areaPath = `${linePath} L 350 145 L 12 145 Z`

  return (
    <div className="research-chart-shell relative overflow-hidden rounded-[20px] border border-indigo-100/80 bg-gradient-to-br from-white via-[#FAFBFF] to-[#F0F2FF] p-4 sm:rounded-[24px] sm:p-5">
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-bold text-slate-700 sm:text-sm">Research inputs</p>
          <p className="mt-1 text-[10px] text-slate-400">A visual research framework</p>
        </div>
        <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1.5 text-[9px] font-extrabold tracking-wide text-indigo-600">
          ILLUSTRATIVE
        </span>
      </div>

      <div className="relative z-10 mt-4">
        <svg
          viewBox="0 0 370 180"
          className="research-svg block w-full overflow-visible"
          role="img"
          aria-label="Illustrative animated research line chart"
        >
          <defs>
            <linearGradient id="rLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C8C0FF" />
              <stop offset="50%" stopColor="#8271F4" />
              <stop offset="100%" stopColor="#5545E8" />
            </linearGradient>
            <linearGradient id="rArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B7CF6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#8B7CF6" stopOpacity="0.015" />
            </linearGradient>
            <linearGradient id="rBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B2A9FF" />
              <stop offset="100%" stopColor="#E0DCFF" />
            </linearGradient>
            <filter id="rBlur" x="-30%" y="-30%" width="160%" height="180%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {[24, 54, 84, 114, 144].map((y) => (
            <line
              key={y}
              x1="8"
              y1={y}
              x2="362"
              y2={y}
              stroke="#DFE4F3"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          ))}

          {chartValues.map((value, index) => {
            const height = value * 0.72
            return (
              <rect
                key={index}
                className="research-bar"
                x={12 + index * 22}
                y={145 - height}
                width="15"
                height={height}
                rx="3"
                fill="url(#rBar)"
                opacity={index > 11 ? 0.8 : 0.45}
                style={{ animationDelay: `${index * 45}ms` }}
              />
            )
          })}

          <path className="research-area" d={areaPath} fill="url(#rArea)" />

          <path
            d={linePath}
            transform="translate(0 5)"
            fill="none"
            stroke="#B1A7FF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="url(#rBlur)"
          />

          <path
            className="research-line"
            d={linePath}
            fill="none"
            stroke="url(#rLine)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map(([x, y], index) => {
            const last = index === points.length - 1
            return (
              <g key={`${x}-${y}`} className="research-dot" style={{ animationDelay: `${600 + index * 90}ms` }}>
                {last && (
                  <circle className="research-pulse" cx={x} cy={y} r="10" fill="#8B7CF6" opacity="0.18" />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={last ? 4 : 2.3}
                  fill={last ? '#5948E8' : '#8B7CF6'}
                  stroke="#FFFFFF"
                  strokeWidth={last ? 2 : 1}
                />
              </g>
            )
          })}
        </svg>

      </div>

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-indigo-100 pt-3 text-[9px] font-medium text-slate-400 sm:text-[10px]">
        <span>Data review</span>
        <span>Evidence</span>
        <span>Evaluation</span>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse = false, speed = 38 }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee marquee-mask overflow-hidden py-2">
      <div
        className={`marquee-track flex w-max items-center gap-3 sm:gap-4 ${reverse ? 'marquee-reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((it, i) => (
          <div
            key={i}
            className="marquee-chip group flex items-center gap-3 whitespace-nowrap rounded-2xl border border-slate-200/80 bg-white py-2 pl-2 pr-5 sm:pr-6"
            style={{ '--c': it.color, '--t': it.tint }}
          >
            <Icon3D icon={it.icon} color={it.color} dark={it.dark} tint={it.tint} size="sm" />
            <span className="text-[13px] font-bold tracking-tight text-slate-700 transition-colors group-hover:text-slate-950 sm:text-sm">
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResearchCard({ item, index }) {
  const tilt = tiltHandlers()
  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      <article
        {...tilt}
        className="research-card group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-5 sm:rounded-[26px] sm:p-6"
        style={{ '--c': item.color, '--t': item.tint }}
      >
        {/* Cursor spotlight */}
        <span className="card-spot pointer-events-none absolute inset-0" />

        {/* Card background number (top right) */}
        <span
          aria-hidden="true"
          className="card-bgnum pointer-events-none absolute right-5 top-4 select-none text-[50px] font-black leading-none tracking-tighter sm:right-6 sm:top-5 sm:text-[62px]"
          style={{ color: item.tint, WebkitTextStroke: `1.5px ${item.color}` }}
        >
          {item.number}
        </span>

        <div className="relative flex items-start justify-between">
          <div className="card-icon">
            <Icon3D
              icon={item.icon}
              color={item.color}
              dark={item.dark}
              tint={item.tint}
              delay={index * 260}
            />
          </div>
        </div>

        <h3 className="card-content relative mt-5 text-[18px] font-extrabold leading-snug tracking-[-0.035em] text-slate-900 sm:mt-6 sm:text-[20px]">
          {item.title}
        </h3>

        <p className="card-content relative mt-3 flex-1 text-[13px] leading-[1.85] text-slate-500 sm:text-sm">
          {item.description}
        </p>

        <div className="relative mt-5 border-t border-slate-100 pt-4">
          <span className="relative block h-[5px] w-12 overflow-hidden rounded-full bg-slate-100 transition-all duration-700 ease-out group-hover:w-full">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: `linear-gradient(90deg, ${item.color}, ${item.tint})` }}
            />
          </span>
        </div>
      </article>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export default function WhyResearch() {
  const rootRef = useReveal()
  const dashTilt = tiltHandlers()

  return (
    <section
      ref={rootRef}
      id="why-research"
      className="relative isolate overflow-hidden bg-[#F8F9FF] text-slate-900"
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="research-orb absolute -left-24 top-16 h-72 w-72 rounded-full bg-violet-200/50 blur-[100px]" />
        <div className="research-orb research-orb-delay absolute -right-24 top-[35%] h-80 w-80 rounded-full bg-blue-200/50 blur-[110px]" />
        <div className="research-orb absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-indigo-200/40 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.2] [background-image:radial-gradient(#9BA4C8_0.7px,transparent_0.7px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

        {/* Floating 3D shapes (hidden on very small screens to keep it clean) */}
        <span className="float-shape float-a hidden sm:block" />
        <span className="float-shape float-b hidden md:block" />
        <span className="float-shape float-c hidden lg:block" />
      </div>

      {/* ---------------- Hero ---------------- */}
      <div className="px-4 pb-10 pt-14 sm:px-6 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
        <div className="mx-auto max-w-[1160px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <div className="reveal">
                <Eyebrow>Why our research is different</Eyebrow>
              </div>

              <h1 className="reveal mx-auto mt-6 w-full max-w-[720px] text-[clamp(27px,7.6vw,62px)] font-extrabold leading-[1.15] tracking-[-0.035em] text-slate-950 sm:leading-[1.08] sm:tracking-[-0.055em] lg:mx-0">
                <span className="block">
                  Institutional-Style<br className="sm:hidden" /> Research.
                </span>
                <span className="grad-text mt-1 block whitespace-nowrap pb-1.5">Algorithmic Trading.</span>
                <span className="mt-1 block text-slate-800">
                  Disciplined<br className="sm:hidden" /> Risk Management.
                </span>
              </h1>

              <p
                className="reveal mx-auto mt-5 max-w-[600px] text-[14px] font-medium leading-6 text-slate-500 sm:text-base sm:leading-8 lg:mx-0"
                style={{ transitionDelay: '80ms' }}
              >
                Beyond stock tips. A more structured approach to market research and trading
                strategies.
              </p>

              <p
                className="reveal mx-auto mt-3 max-w-[600px] text-[12.5px] leading-6 text-slate-500 sm:text-sm sm:leading-7 lg:mx-0"
                style={{ transitionDelay: '140ms' }}
              >
                At AnalyzerView, we combine data-driven equity research, quantitative analysis and
                algorithmic trading methodologies to bring greater structure, consistency and
                transparency to market decisions.
              </p>

              {/* Buttons */}
              <div
                className="reveal mx-auto mt-7 grid w-full max-w-[360px] grid-cols-1 gap-3 min-[500px]:max-w-[460px] min-[500px]:grid-cols-2 sm:mt-8 lg:mx-0"
                style={{ transitionDelay: '200ms' }}
              >
                <a
                  href="#research-methodology"
                  className="btn-shine group relative inline-flex min-h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-[14px] bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-[13px] font-bold text-white shadow-[0_10px_28px_rgba(99,85,220,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(99,85,220,0.36)] active:scale-[0.98] sm:text-sm"
                >
                  <span className="relative z-10">Explore Our Research</span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#research-principles"
                  className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[14px] border border-slate-200 bg-white px-5 py-3 text-[13px] font-bold text-slate-700 transition-all hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50/70 active:scale-[0.98] sm:text-sm"
                >
                  Our Approach
                  <ArrowDownRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </a>
              </div>

              {/* Mini trust chips */}
              <div
                className="reveal mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                style={{ transitionDelay: '260ms' }}
              >
                {['Research-led', 'Rule-based', 'Risk-first'].map((t, i) => (
                  <span
                    key={t}
                    className="chip inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-600 backdrop-blur"
                    style={{ animationDelay: `${i * 400}ms` }}
                  >
                    <Sparkles size={12} className="text-indigo-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Dashboard */}
            <div className="reveal relative mx-auto w-full max-w-[520px] lg:max-w-none" style={{ transitionDelay: '120ms' }}>
              <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-indigo-100/80 via-violet-100/50 to-blue-100/80 blur-2xl" />

              <div
                {...dashTilt}
                className="research-dashboard relative overflow-hidden rounded-[27px] border border-[#E1E5F4] bg-white p-4 sm:rounded-[32px] sm:p-7"
              >
                <span className="card-spot pointer-events-none absolute inset-0" style={{ '--c': '#6957E8' }} />

                <div className="relative flex items-start gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-600">
                      Analytical thinking
                    </p>
                    <h2 className="mt-2 text-xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-2xl">
                      Clarity over speculation.
                    </h2>
                  </div>
                </div>

                <p className="relative mt-3 text-[13px] leading-6 text-slate-500 sm:text-sm sm:leading-7">
                  Use data and defined research parameters to assess a market view, rather than
                  relying solely on assumptions or isolated signals.
                </p>

                <div className="relative mt-5 sm:mt-6">
                  <ResearchChart />
                </div>

                <div className="relative mt-3 grid grid-cols-2 gap-3">
                  <div className="mini-tile rounded-[17px] border border-slate-100 bg-white p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                        <span className="relative h-2 w-2 rounded-full bg-indigo-500" />
                      </span>
                      <span className="text-xs font-bold sm:text-[13px]">Research</span>
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-slate-500 sm:text-xs">
                      Evidence and reasoning
                    </p>
                  </div>

                  <div className="mini-tile rounded-[17px] border border-slate-100 bg-white p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-xs font-bold sm:text-[13px]">Risk review</span>
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-slate-500 sm:text-xs">
                      Potential downside
                    </p>
                  </div>
                </div>

                <p className="relative mt-4 text-[10px] leading-5 text-slate-400">
                  Illustrative graphic only. This is not live market data, actual performance, or a
                  forecast of future returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Carousel ---------------- */}
      <div className="relative border-y border-indigo-100/70 bg-gradient-to-b from-white/80 via-white/60 to-white/80 py-5 backdrop-blur sm:py-7">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-gradient-to-r from-indigo-100/30 via-violet-100/40 to-blue-100/30 blur-2xl" />
        <div className="relative flex flex-col gap-1 sm:gap-2">
          <MarqueeRow items={marqueeRowA} speed={42} />
          <MarqueeRow items={marqueeRowB} reverse speed={48} />
        </div>
      </div>

      {/* ---------------- Principles ---------------- */}
      <div id="research-principles" className="px-4 pb-14 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="reveal">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">
                Our core principles
              </p>
              <h2 className="mt-3 text-[28px] font-extrabold leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl">
                Why our research is different
                <span className="text-indigo-600">.</span>
              </h2>
            </div>

            <p className="reveal max-w-[390px] text-sm leading-7 text-slate-500" style={{ transitionDelay: '100ms' }}>
              A defined process for evaluating opportunities and considering risk.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {researchItems.map((item, index) => (
              <ResearchCard key={item.number} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Methodology + registration ---------------- */}
      <div
        id="research-methodology"
        className="border-t border-slate-200/70 bg-white/75 px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-[1160px]">
          <div className="reveal relative overflow-hidden rounded-[24px] border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-5 sm:rounded-[30px] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-violet-100/80 blur-3xl" />
            <div className="cta-ring pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full border border-indigo-200/60" />
            <div className="cta-ring cta-ring-2 pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full border border-indigo-200/40" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Icon3D icon={Layers} color="#6957E8" dark="#4B3BC4" tint="#F0EDFF" size="lg" />
                <div className="max-w-[640px]">
                  <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-indigo-600">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    Our methodology
                  </div>

                  <h2 className="mt-3 text-[22px] font-extrabold leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl">
                    A Systematic Approach to Every Market Decision.
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Explore the research methodology behind AnalyzerView.
                  </p>
                </div>
              </div>

              <a
                href="#why-research"
                className="btn-shine group relative inline-flex min-h-[50px] w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(79,70,229,0.25)] transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-[0.98] sm:w-auto"
              >
                <span className="relative z-10">Back to top</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 -rotate-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <div className="reveal mt-6 flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-6" style={{ transitionDelay: '100ms' }}>
            <Icon3D icon={BadgeCheck} color="#079782" dark="#046C5C" tint="#E7F8F3" />
            <div>
              <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
              <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                SEBI-Registered Research Analyst
              </h3>
              <p className="mt-3 text-xs leading-6 text-slate-500 sm:text-sm">
                Registration does not guarantee performance or returns and does not imply SEBI
                endorsement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ---------- Scroll reveal ---------- */
        .reveal {
          opacity: 0;
          transform: translateY(26px) scale(0.985);
          transition: opacity 700ms cubic-bezier(.22,1,.36,1),
                      transform 700ms cubic-bezier(.22,1,.36,1);
          will-change: opacity, transform;
        }
        .reveal.is-in {
          opacity: 1;
          transform: none;
        }

        /* ---------- Gradient headline ---------- */
        .grad-text {
          background: linear-gradient(90deg, #4F46E5, #7C3AED, #3B82F6, #7C3AED, #4F46E5);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: grad-slide 6s linear infinite;
        }
        @keyframes grad-slide {
          to { background-position: -250% 0; }
        }

        /* ---------- 3D icon ---------- */
        .icon3d {
          perspective: 600px;
          animation: icon-bob 4.5s ease-in-out infinite;
        }
        .icon3d-floor {
          position: absolute;
          left: 12%; right: 12%; bottom: -10px; height: 12px;
          border-radius: 50%;
          background: radial-gradient(closest-side, var(--c), transparent);
          opacity: .35;
          filter: blur(5px);
          animation: floor-pulse 4.5s ease-in-out infinite;
          animation-delay: inherit;
        }
        .icon3d-side {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background: var(--d);
          transform: translateY(6px);
          box-shadow: 0 10px 18px color-mix(in srgb, var(--c) 35%, transparent);
        }
        .icon3d-face {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 18px;
          background:
            linear-gradient(145deg, color-mix(in srgb, var(--c) 78%, white) 0%, var(--c) 55%, var(--d) 130%);
          color: #fff;
          box-shadow:
            inset 0 2px 0 rgba(255,255,255,.55),
            inset 0 -3px 6px rgba(0,0,0,.14);
          transform: translateY(-1px);
          transition: transform 250ms ease;
        }
        .icon3d-gloss {
          position: absolute;
          top: -30%; left: -20%;
          width: 140%; height: 70%;
          background: linear-gradient(180deg, rgba(255,255,255,.5), rgba(255,255,255,0));
          border-radius: 50%;
          transform: rotate(-12deg);
        }
        .icon3d-num {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 1;
          color: rgba(255,255,255,.26);
          mix-blend-mode: soft-light;
          text-shadow: 0 2px 0 rgba(0,0,0,.08);
          transform: translateY(2px) rotate(-6deg);
          pointer-events: none;
          user-select: none;
          transition: transform 450ms cubic-bezier(.22,1,.36,1), color 300ms ease;
        }
        .research-card:hover .icon3d-num {
          transform: translateY(-1px) rotate(0deg) scale(1.12);
          color: rgba(255,255,255,.4);
        }
        .card-bgnum {
          opacity: .32;
          transform-origin: right top;
          transform: translateZ(0);
          transition: opacity 400ms ease, transform 500ms cubic-bezier(.22,1,.36,1);
        }
        .research-card:hover .card-bgnum {
          opacity: .6;
          transform: scale(1.08);
        }
        .icon3d-glyph {
          position: relative;
          filter: drop-shadow(0 3px 2px rgba(0,0,0,.28));
          transition: transform 350ms cubic-bezier(.22,1,.36,1);
        }
        .research-card:hover .icon3d-face,
        .mini-tile:hover .icon3d-face {
          transform: translateY(-4px);
        }
        .research-card:hover .icon3d-glyph {
          transform: scale(1.14) rotate(-8deg);
        }
        @keyframes icon-bob {
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
          50%      { transform: translateY(-5px) rotateX(6deg) rotateY(-8deg); }
        }
        @keyframes floor-pulse {
          0%, 100% { transform: scale(1);   opacity: .35; }
          50%      { transform: scale(.78); opacity: .2; }
        }

        /* ---------- Tilt cards ---------- */
        .research-card,
        .research-dashboard {
          --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
          transform: perspective(1100px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0);
          transition: transform 260ms ease-out, box-shadow 400ms ease, border-color 400ms ease;
          transform-style: preserve-3d;
          box-shadow: 0 5px 0 rgba(99,102,241,.025), 0 12px 30px rgba(63,71,125,.05);
        }
        .research-card:hover {
          border-color: color-mix(in srgb, var(--c) 35%, white);
          box-shadow: 0 24px 55px color-mix(in srgb, var(--c) 18%, transparent);
        }
        .research-card .card-icon   { transform: translateZ(34px); }
        .research-card .card-content { transform: translateZ(16px); }

        .research-dashboard {
          animation: dashboard-enter 850ms ease-out both;
          box-shadow: 0 24px 70px rgba(73,77,143,.10), inset 0 1px 0 #fff;
        }

        .card-spot {
          background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%),
            color-mix(in srgb, var(--c, #6957E8) 11%, transparent), transparent 60%);
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .research-card:hover .card-spot,
        .research-dashboard:hover .card-spot { opacity: 1; }

        .research-card-arrow {
          box-shadow: 0 4px 0 rgba(93,82,190,.08), 0 7px 14px rgba(65,73,125,.06), inset 0 1px 0 rgba(255,255,255,.9);
        }

        .mini-tile { transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease; }
        .mini-tile:hover {
          transform: translateY(-3px);
          border-color: #DDD8FF;
          box-shadow: 0 12px 24px rgba(91,85,180,.10);
        }

        /* ---------- Floating badges / shapes ---------- */
        .badge-float { animation: badge-drift 6s ease-in-out infinite alternate; }
        .badge-b { animation-duration: 7.5s; animation-delay: -2s; }
        @keyframes badge-drift {
          from { transform: translate3d(0, 0, 0) rotate(-3deg); }
          to   { transform: translate3d(6px, -14px, 0) rotate(4deg); }
        }

        .float-shape {
          position: absolute;
          border-radius: 22px;
          background: linear-gradient(145deg, rgba(139,124,246,.28), rgba(57,124,232,.10));
          border: 1px solid rgba(255,255,255,.7);
          box-shadow: 0 18px 30px rgba(105,87,232,.10), inset 0 1px 0 rgba(255,255,255,.8);
          backdrop-filter: blur(2px);
        }
        .float-a { top: 9%;  left: 6%;  width: 56px; height: 56px; animation: shape-spin 14s linear infinite; }
        .float-b { top: 52%; right: 4%; width: 44px; height: 44px; border-radius: 50%; animation: shape-spin 18s linear infinite reverse; }
        .float-c { bottom: 14%; left: 10%; width: 36px; height: 36px; animation: shape-spin 16s linear infinite; }
        @keyframes shape-spin {
          0%   { transform: translateY(0) rotateX(0) rotateY(0) rotateZ(0); }
          50%  { transform: translateY(-22px) rotateX(180deg) rotateY(90deg) rotateZ(90deg); }
          100% { transform: translateY(0) rotateX(360deg) rotateY(180deg) rotateZ(180deg); }
        }

        .chip { animation: chip-bob 4s ease-in-out infinite; }
        @keyframes chip-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }

        /* ---------- Buttons ---------- */
        .btn-shine::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: -60%;
          width: 40%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.45), transparent);
          transform: skewX(-20deg);
          animation: shine 3.8s ease-in-out infinite;
        }
        @keyframes shine {
          0%, 55% { left: -60%; }
          100%    { left: 130%; }
        }

        /* ---------- Chart ---------- */
        .research-chart-shell {
          isolation: isolate;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.98), 0 8px 18px rgba(91,85,180,.05);
          transition: transform 500ms ease, box-shadow 500ms ease;
        }
        .research-chart-shell::before {
          content: '';
          position: absolute; inset: 0;
          pointer-events: none;
          background: linear-gradient(125deg, rgba(255,255,255,.35), transparent 36%, rgba(133,116,255,.05) 75%, transparent);
          z-index: 0;
        }
        .research-chart-shell:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 35px rgba(91,85,180,.10), inset 0 1px 0 #fff;
        }
        .research-svg {
          transform: perspective(1000px) rotateX(5deg) rotateY(-2deg);
          transform-origin: center bottom;
          filter: drop-shadow(0 7px 6px rgba(99,86,220,.14));
        }
        .research-line {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          filter: drop-shadow(0 3px 3px rgba(93,72,232,.28));
          animation: draw-line 2.2s 300ms cubic-bezier(.22,1,.36,1) forwards,
                     line-breathe 3.5s 2.5s ease-in-out infinite;
        }
        .research-area { opacity: 0; animation: fade-in 1.2s 1.1s ease forwards; }
        .research-bar {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: bar-rise 700ms cubic-bezier(.22,1,.36,1) both;
        }
        .research-dot {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: dot-pop 500ms cubic-bezier(.34,1.56,.64,1) forwards;
        }
        .research-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: research-pulse 2.2s ease-out infinite;
        }
        @keyframes draw-line { to { stroke-dashoffset: 0; } }
        @keyframes fade-in   { to { opacity: 1; } }
        @keyframes dot-pop {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes bar-rise {
          from { transform: scaleY(0.05); opacity: 0; }
          to   { transform: scaleY(1); }
        }
        @keyframes line-breathe {
          0%, 100% { filter: drop-shadow(0 3px 3px rgba(93,72,232,.20)); }
          50%      { filter: drop-shadow(0 4px 8px rgba(93,72,232,.45)); }
        }
        @keyframes research-pulse {
          0%   { transform: scale(.7); opacity: .3; }
          70%, 100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes research-float {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(14px, -16px, 0); }
        }
        @keyframes dashboard-enter {
          from { opacity: 0; transform: perspective(1100px) translateY(22px) rotateX(4deg); }
          to   { opacity: 1; transform: perspective(1100px) translateY(0) rotateX(0); }
        }

        .research-orb { animation: research-float 12s ease-in-out infinite alternate; }
        .research-orb-delay { animation-delay: -5s; animation-duration: 15s; }

        /* ---------- Carousel ---------- */
        .marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .marquee-track { animation: marquee 40s linear infinite; }
        .marquee-reverse { animation-direction: reverse; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @keyframes marquee { to { transform: translateX(-50%); } }

        .marquee-chip {
          box-shadow: 0 3px 0 rgba(99,102,241,.04), 0 10px 22px rgba(63,71,125,.06);
          transition: transform 300ms cubic-bezier(.22,1,.36,1), box-shadow 300ms ease, border-color 300ms ease;
        }
        .marquee-chip:hover {
          transform: translateY(-4px) scale(1.03);
          border-color: color-mix(in srgb, var(--c) 40%, white);
          box-shadow: 0 16px 30px color-mix(in srgb, var(--c) 22%, transparent);
        }
        .marquee-chip:hover .icon3d-face { transform: translateY(-3px); }
        .marquee-chip:hover .icon3d-glyph { transform: scale(1.15) rotate(-8deg); }

        .icon3d-sm { animation: none; }
        .icon3d-sm .icon3d-face,
        .icon3d-sm .icon3d-side { border-radius: 12px; }
        .icon3d-sm .icon3d-side { transform: translateY(3px); box-shadow: 0 6px 10px color-mix(in srgb, var(--c) 30%, transparent); }
        .icon3d-sm .icon3d-floor { display: none; }

        /* ---------- CTA rings ---------- */
        .cta-ring { animation: ring-pulse 6s ease-in-out infinite; }
        .cta-ring-2 { animation-delay: -3s; }
        @keyframes ring-pulse {
          0%, 100% { transform: scale(1);    opacity: .9; }
          50%      { transform: scale(1.12); opacity: .4; }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 639px) {
          .research-card,
          .research-dashboard { transform: none !important; }
          .research-card .card-icon,
          .research-card .card-content { transform: none; }
          .research-svg { transform: none; }
          .research-dashboard { animation: none; }
          .reveal { transform: translateY(18px); }
        }

        /* Touch devices: no hover tilt */
        @media (hover: none) {
          .research-card:hover { box-shadow: 0 5px 0 rgba(99,102,241,.025), 0 12px 30px rgba(63,71,125,.05); }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; filter: none; transition: none; }
          .research-orb, .research-orb-delay, .research-dashboard, .research-bar,
          .research-pulse, .float-shape, .badge-float, .icon3d,
          .icon3d-floor, .chip, .grad-text, .marquee-track, .cta-ring, .btn-shine::after {
            animation: none !important;
          }
          .research-line { animation: none !important; stroke-dashoffset: 0; }
          .research-area, .research-dot { animation: none !important; opacity: 1; }
          .research-card, .research-chart-shell { transition: none; transform: none; }
        }
      `}</style>
    </section>
  )
}