import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, X, Layers, MonitorUp, Settings, Target, BookOpen } from 'lucide-react'

/*
  OPTIONAL PHOTOS (transparent PNG looks best) – put in /public/images:
    stressed-investor.png   -> red card
    confident-investor.png  -> green card
  If a photo is missing, the card shows animated candlesticks instead.

  MOBILE  : red card on top, VS badge, green card below.
            The icon box at the bottom is a swipe carousel (auto-slides, dots).
  DESKTOP : cards side by side with VS in the middle, icon box in one row.
*/

const traditional = [
  'Unstructured market information',
  'No defined research framework',
  'Decisions without clear analysis',
  'Inconsistent risk assessment',
  'Limited access to research',
]

const analyzerview = [
  <><b className="font-extrabold">Research-backed</b> insights</>,
  <><b className="font-extrabold">Clear entry &amp; exit</b> levels</>,
  <>Fundamental + <b className="font-extrabold">Technical</b> analysis</>,
  <><b className="font-extrabold">Risk-aware</b> research framework</>,
  <>Structured investment insights</>,
]

const features = [
  { icon: Layers, text: <>Institutional-Grade<br />Research Process</> },
  { icon: MonitorUp, text: <>Discipline &amp;<br />Risk Management</> },
  { icon: Settings, text: <>Multi-Layer<br />Execution Framework<br />(LMLEF<sup className="text-[8px]">®</sup>)</> },
  { icon: Target, text: <>Focused on<br />Quality Opportunities</> },
  { icon: BookOpen, text: <>Investor<br />Education &amp; Insights</> },
]

/* ---------- animations (pure CSS, no Tailwind config needed) ---------- */
const css = `
.sa .rv{opacity:0}
.sa .is-in .rv-up{animation:sa-up .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*110ms)}
.sa .is-in .rv-left{animation:sa-left .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*120ms + 250ms)}
.sa .is-in .rv-right{animation:sa-right .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*120ms + 250ms)}
.sa .is-in .rv-pop{animation:sa-pop .55s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i,0)*120ms + 450ms)}
.sa .is-in .rv-zoom{animation:sa-zoom .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:.15s}
.sa .is-in .rv-photo{animation:sa-photo 1s cubic-bezier(.2,.8,.2,1) both .3s}
.sa .draw{stroke-dasharray:1;stroke-dashoffset:1}
.sa .is-in .draw{animation:sa-draw 1.6s ease-out forwards .5s}
.sa .candle{transform-origin:50% 100%;animation:sa-candle 2.4s ease-in-out infinite;animation-delay:calc(var(--d,0)*.28s)}
.sa .floaty{animation:sa-float 5s ease-in-out infinite}
.sa .ripple{animation:sa-ripple 2.4s ease-out infinite}
.sa .blob{animation:sa-blob 14s ease-in-out infinite alternate}
.sa .shine::after{content:"";pointer-events:none;position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.75) 50%,transparent 65%);transform:translateX(-120%);animation:sa-shine 5s ease-in-out infinite 1.5s}
.sa .noscroll{scrollbar-width:none;-ms-overflow-style:none}
.sa .noscroll::-webkit-scrollbar{display:none}
@keyframes sa-up{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes sa-left{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}
@keyframes sa-right{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}
@keyframes sa-pop{0%{opacity:0;transform:scale(0)}70%{opacity:1;transform:scale(1.2)}100%{opacity:1;transform:scale(1)}}
@keyframes sa-zoom{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes sa-photo{from{opacity:0;transform:translateY(40px) scale(.96)}to{opacity:1;transform:none}}
@keyframes sa-draw{to{stroke-dashoffset:0}}
@keyframes sa-candle{0%,100%{transform:scaleY(.6)}50%{transform:scaleY(1)}}
@keyframes sa-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes sa-ripple{0%{box-shadow:0 0 0 0 rgba(20,87,230,.55)}100%{box-shadow:0 0 0 26px rgba(20,87,230,0)}}
@keyframes sa-blob{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,-30px) scale(1.15)}}
@keyframes sa-shine{0%,60%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
@media (prefers-reduced-motion:reduce){
  .sa *,.sa *::after{animation:none!important}
  .sa .rv{opacity:1!important;transform:none!important}
  .sa .draw{stroke-dashoffset:0}
}
`

/* ---------- helpers ---------- */
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

function Candles({ color, heights, wide = false, className = '' }) {
  return (
    <div className={`pointer-events-none absolute flex items-end ${wide ? 'gap-[8px]' : 'gap-[6px]'} ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className="candle flex flex-col items-center" style={{ '--d': i }}>
          <span className="w-[2px] rounded" style={{ height: wide ? 12 : 8, background: color }} />
          <span className={`${wide ? 'w-[11px]' : 'w-[8px]'} rounded-[3px]`} style={{ height: h, background: color }} />
          <span className="w-[2px] rounded" style={{ height: wide ? 12 : 8, background: color }} />
        </div>
      ))}
    </div>
  )
}

function ChartLine({ up, color }) {
  return (
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[38%] w-full opacity-30" aria-hidden="true">
      <path
        pathLength="1"
        className="draw"
        d={up ? 'M0 110 L50 90 L90 98 L140 62 L190 74 L240 40 L290 52 L340 20 L400 8' : 'M0 12 L50 30 L90 22 L140 58 L190 48 L240 82 L290 70 L340 100 L400 112'}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/* ---------- one comparison card (used for both sides) ---------- */
function Card({ good, title, items, photo, alt, order }) {
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <article
      className={`rv rv-up relative grid overflow-hidden rounded-[28px] border-[3px] border-white transition-shadow duration-300 sm:rounded-[32px] ${
        good
          ? 'bg-gradient-to-br from-[#cdf2de] via-[#e4f8ed] to-[#f4fdf8] shadow-[0_18px_40px_-12px_rgba(22,163,74,.28)] hover:shadow-[0_24px_50px_-12px_rgba(22,163,74,.4)] lg:grid-cols-[1fr_32%]'
          : 'bg-gradient-to-br from-[#fbd3da] via-[#fde5e9] to-[#fff5f6] shadow-[0_18px_40px_-12px_rgba(229,52,45,.25)] hover:shadow-[0_24px_50px_-12px_rgba(229,52,45,.38)] max-lg:pb-8 lg:grid-cols-[32%_1fr]'
      }`}
      style={{ '--i': order }}
    >
      <ChartLine up={good} color={good ? '#16a34a' : '#ef4452'} />

      {/* header pill */}
      <header className={`relative z-10 col-span-full flex justify-center px-3 pt-5 sm:px-4 sm:pt-7 ${good ? 'max-lg:pt-11' : ''}`}>
        <div className="rv rv-zoom flex w-fit max-w-full items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-5 shadow-[0_8px_22px_rgba(0,0,0,.10)] sm:gap-3 sm:py-2.5 sm:pl-3 sm:pr-7">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-white shadow-md sm:h-10 sm:w-10 ${
              good ? 'bg-gradient-to-b from-[#2fd16b] to-[#12963f]' : 'bg-gradient-to-b from-[#ff5a52] to-[#d62a23]'
            }`}
          >
            {good ? <Check size={22} strokeWidth={4} /> : <X size={22} strokeWidth={3.6} />}
          </span>
          <h3 className="text-[clamp(16px,4.4vw,26px)] font-extrabold leading-tight text-[#0a1f5c]">{title}</h3>
        </div>
      </header>

      {/* list */}
      <ul className={`relative z-10 order-1 space-y-2.5 px-4 py-5 sm:px-8 lg:py-8 ${good ? 'lg:order-1 lg:pl-14 lg:pr-3' : 'lg:order-2 lg:pl-3 lg:pr-14'}`}>
        {items.map((t, i) => (
          <li
            key={i}
            className={`rv ${good ? 'rv-left' : 'rv-right'} flex items-center gap-3 rounded-2xl border border-white/90 bg-white/65 px-3 py-2.5 text-[15.5px] font-medium leading-snug text-[#0a1f5c] shadow-[0_4px_14px_-6px_rgba(10,31,92,.18)] backdrop-blur-sm transition-colors duration-200 hover:bg-white/95 lg:text-[clamp(15px,1.3vw,17px)]`}
            style={{ '--i': i }}
          >
            <span
              className={`rv rv-pop grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                good ? 'bg-gradient-to-b from-[#2fd16b] to-[#12963f] text-white shadow-[0_3px_8px_rgba(22,163,74,.45)]' : 'bg-gradient-to-b from-[#ff6a62] to-[#df3029] text-white shadow-[0_3px_8px_rgba(229,52,45,.4)]'
              }`}
              style={{ '--i': i }}
            >
              {good ? <Check size={16} strokeWidth={4.5} /> : <X size={15} strokeWidth={4.5} />}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      {/* side column: candlesticks (+ photo if available) */}
      <div
        className={`relative order-2 ${good ? 'lg:order-2' : 'lg:order-1'} ${
          photoOk ? 'min-h-[230px] sm:min-h-[290px]' : 'min-h-[110px] lg:min-h-0'
        }`}
      >
        {photoOk ? (
          <Candles color={good ? '#4fd18c' : '#f4909b'} heights={good ? [14, 22, 30, 24, 38] : [18, 28, 14, 34, 22]} className="left-5 top-3 lg:left-4" />
        ) : (
          <Candles
            wide
            color={good ? '#4fd18c' : '#f4909b'}
            heights={good ? [22, 34, 26, 46, 38, 58, 70] : [60, 44, 52, 34, 40, 24, 30]}
            className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        {photoOk && (
          <div className="rv rv-photo absolute inset-x-0 bottom-0 flex justify-center">
            <div className="floaty flex">
              <img
                src={photo}
                alt={alt}
                onError={() => setPhotoOk(false)}
                className="h-[210px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_22px_rgba(15,23,42,.18)] sm:h-[270px]"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

/* ---------- icon box: grid on desktop, auto-sliding carousel on mobile ---------- */
function FeatureStrip() {
  const track = useRef(null)
  const paused = useRef(false)
  const resume = useRef(null)
  const [active, setActive] = useState(0)

  const onScroll = useCallback(() => {
    const el = track.current
    if (!el) return
    const mid = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let dist = Infinity
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    setActive(best)
  }, [])

  const goTo = useCallback((i) => {
    const el = track.current
    const card = el && el.children[i]
    if (!card) return
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
  }, [])

  /* auto-slide on mobile only; pauses while the user is touching */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let i = 0
    const id = setInterval(() => {
      if (paused.current || window.matchMedia('(min-width: 1024px)').matches) return
      i = (i + 1) % features.length
      goTo(i)
    }, 3200)
    return () => clearInterval(id)
  }, [goTo])

  const hold = () => {
    paused.current = true
    clearTimeout(resume.current)
  }
  const release = () => {
    clearTimeout(resume.current)
    resume.current = setTimeout(() => (paused.current = false), 3500)
  }

  return (
    <div className="rv rv-up shine relative mt-8 overflow-hidden rounded-[26px] border-2 border-white bg-white/80 py-5 shadow-[0_14px_34px_-10px_rgba(20,87,230,.22)] backdrop-blur lg:px-4 lg:py-6" style={{ '--i': 8 }}>
      <div
        ref={track}
        onScroll={onScroll}
        onTouchStart={hold}
        onTouchEnd={release}
        onMouseEnter={hold}
        onMouseLeave={release}
        className="noscroll flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 sm:px-6 lg:grid lg:grid-cols-5 lg:gap-0 lg:overflow-visible lg:px-0"
      >
        {features.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className={`group flex w-[74%] shrink-0 snap-center items-center gap-3.5 rounded-2xl bg-[#eef3ff] px-4 py-4 sm:w-[42%] lg:w-auto lg:justify-center lg:rounded-none lg:bg-transparent lg:px-3 lg:py-0 ${
              i > 0 ? 'lg:border-l lg:border-slate-300/70' : ''
            }`}
          >
            <Icon className="shrink-0 text-[#1457e6] transition duration-300 group-hover:-translate-y-1 group-hover:scale-110" size={40} strokeWidth={1.6} />
            <p className="text-[14px] font-semibold leading-snug text-[#0a1f5c]">{text}</p>
          </div>
        ))}
      </div>

      {/* dots (mobile only) */}
      <div className="mt-4 flex justify-center gap-2 lg:hidden">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show feature ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${active === i ? 'w-6 bg-[#1457e6]' : 'w-2 bg-[#0a1f5c]/25'}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- section ---------- */
export default function StructuredApproach() {
  const [ref, inView] = useInView()

  return (
    <section className="sa relative overflow-hidden bg-gradient-to-b from-[#e6eeff] via-[#f2f6ff] to-[#eaf0ff] px-4 py-12 sm:px-6 sm:py-16">
      <style>{css}</style>

      {/* drifting background glows */}
      <div className="blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ffb3bf]/40 blur-3xl" />
      <div className="blob pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#7ee8b0]/40 blur-3xl" style={{ animationDelay: '-6s' }} />
      <div className="blob pointer-events-none absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-[#9db8ff]/40 blur-3xl" style={{ animationDelay: '-3s' }} />

      <div ref={ref} className={`relative mx-auto max-w-[1240px] ${inView ? 'is-in' : ''}`}>
        {/* Heading */}
        <div className="text-center">
          <h2 className="rv rv-up text-[clamp(26px,4.8vw,56px)] font-extrabold leading-[1.12] tracking-[-.025em] text-[#0a1f5c]">
            A More Structured{' '}
            <span className="relative inline-block">
              Approach
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" className="draw" d="M2 9 Q 100 0 198 6" stroke="#f5b82e" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            to{' '}
            <span className="bg-gradient-to-r from-[#1457e6] to-[#2f86ff] bg-clip-text text-transparent">Equity Research</span>
          </h2>
          <p className="rv rv-up mx-auto mt-4 max-w-[92%] text-[10.5px] font-semibold uppercase tracking-[.26em] text-[#0a1f5c] sm:text-[14px] sm:tracking-[.4em]" style={{ '--i': 2 }}>
            From Market Noise to Research-Backed Insights
          </p>
        </div>

        {/* Comparison: red on top, VS, green below (mobile) – side by side (desktop) */}
        <div className="relative mt-10 grid gap-y-4 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0">
          <Card
            title="Traditional Approach"
            items={traditional}
            photo="/images/stressed-investor.png"
            alt="Investor stressed by unstructured research"
            order={3}
          />

          {/* VS badge (outer = position, inner = animation) */}
          <div className="pointer-events-none z-30 mx-auto -my-[34px] lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <div className="rv rv-zoom" style={{ '--i': 5 }}>
              <div className="ripple grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-[#3a78ff] to-[#0b2a85] text-[24px] font-black text-white ring-[5px] ring-white sm:h-20 sm:w-20 sm:text-[30px] lg:h-[88px] lg:w-[88px] lg:text-[34px]">
                VS
              </div>
            </div>
          </div>

          <Card
            good
            title={<><span className="text-[#1457e6]">AnalyzerView</span> Research Approach</>}
            items={analyzerview}
            photo="/images/confident-investor.png"
            alt="Investor confident with structured research"
            order={4}
          />
        </div>

        {/* Icon box */}
        <FeatureStrip />
      </div>
    </section>
  )
}