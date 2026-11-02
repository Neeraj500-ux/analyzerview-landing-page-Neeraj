import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, X, Layers, MonitorUp, Settings, Target, BookOpen } from 'lucide-react'

/*
  OPTIONAL PHOTOS (transparent PNG looks best) – put in /public/images:
    stressed-investor.png   -> red card
    confident-investor.png  -> green card
  No photo? The card simply uses the full width for the list (no charts, no empty space).

  MOBILE  : red card on top, VS badge, green card below.
            The icon box at the bottom is a swipe carousel (auto-slides, dots).
  DESKTOP : cards side by side with VS in the middle, icon box in one row.

  LIVE ANIMATIONS: scanning highlight over the list rows, pulsing/wiggling icon badges,
  floating particles (red falls, green rises), light sheen over cards, spinning ring on VS,
  shifting gradient headline, bouncing feature icons, drifting background glows.
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

/* left %, size px, duration s, delay s */
const PARTICLES = [
  [6, 6, 9, 0],
  [18, 4, 11, 2.5],
  [32, 7, 10, 1],
  [47, 5, 12, 3.5],
  [60, 6, 9.5, 0.5],
  [74, 4, 11, 2],
  [86, 7, 10.5, 4],
  [95, 5, 12, 1.5],
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

/* always-on live effects */
.sa .floaty{animation:sa-float 5s ease-in-out infinite}
.sa .ripple{animation:sa-ripple 2.4s ease-out infinite}
.sa .blob{animation:sa-blob 14s ease-in-out infinite alternate}
.sa .spin-slow{animation:sa-spin 14s linear infinite}
.sa .gshift{background-size:200% 100%;animation:sa-gshift 6s ease-in-out infinite}
.sa .row{animation:sa-scan 6s ease-in-out infinite;animation-delay:calc(var(--i,0)*1s + 1.8s)}
.sa .glow-g{animation:sa-glow-g 2.6s ease-out infinite}
.sa .glow-r{animation:sa-glow-r 2.6s ease-out infinite}
.sa .wig{transform-origin:50% 50%;animation:sa-wig 4.5s ease-in-out infinite}
.sa .bounce-s{animation:sa-bounce 3.4s ease-in-out infinite}
.sa .ptl{position:absolute;border-radius:9999px;opacity:0;pointer-events:none;animation-duration:var(--t);animation-delay:var(--dl);animation-iteration-count:infinite;animation-timing-function:linear}
.sa .ptl-up{bottom:-14px;animation-name:sa-pup}
.sa .ptl-down{top:-14px;animation-name:sa-pdown}
.sa .sheen::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);transform:translateX(-130%);animation:sa-shine 7s ease-in-out infinite 2s}
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
@keyframes sa-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes sa-ripple{0%{box-shadow:0 0 0 0 rgba(20,87,230,.55)}100%{box-shadow:0 0 0 26px rgba(20,87,230,0)}}
@keyframes sa-blob{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,-30px) scale(1.15)}}
@keyframes sa-spin{to{transform:rotate(360deg)}}
@keyframes sa-gshift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes sa-scan{
  0%,24%,100%{background-color:rgba(255,255,255,.65);box-shadow:0 4px 14px -6px rgba(10,31,92,.18)}
  4%,15%{background-color:rgba(255,255,255,1);box-shadow:0 12px 26px -8px rgba(10,31,92,.32)}
}
@keyframes sa-glow-g{
  0%{box-shadow:0 3px 8px rgba(22,163,74,.45),0 0 0 0 rgba(34,197,94,.55)}
  70%,100%{box-shadow:0 3px 8px rgba(22,163,74,.45),0 0 0 10px rgba(34,197,94,0)}
}
@keyframes sa-glow-r{
  0%{box-shadow:0 3px 8px rgba(229,52,45,.4),0 0 0 0 rgba(239,68,82,.5)}
  70%,100%{box-shadow:0 3px 8px rgba(229,52,45,.4),0 0 0 10px rgba(239,68,82,0)}
}
@keyframes sa-wig{
  0%,86%,100%{transform:rotate(0)}
  89%{transform:rotate(-14deg)}
  92%{transform:rotate(14deg)}
  95%{transform:rotate(-7deg)}
}
@keyframes sa-bounce{0%,60%,100%{transform:translateY(0)}75%{transform:translateY(-7px)}88%{transform:translateY(0)}93%{transform:translateY(-2px)}}
@keyframes sa-pup{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:.75}100%{transform:translateY(-440px) scale(1.15);opacity:0}}
@keyframes sa-pdown{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:.7}100%{transform:translateY(440px) scale(1.15);opacity:0}}
@keyframes sa-shine{0%,60%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
@media (prefers-reduced-motion:reduce){
  .sa *,.sa *::before,.sa *::after{animation:none!important}
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

/* floating dots: green rises, red falls */
function Particles({ up, color }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map(([left, size, t, dl], i) => (
        <span
          key={i}
          className={`ptl ${up ? 'ptl-up' : 'ptl-down'}`}
          style={{ left: `${left}%`, width: size, height: size, background: color, '--t': `${t}s`, '--dl': `${dl}s` }}
        />
      ))}
    </div>
  )
}

/* ---------- one comparison card (used for both sides) ---------- */
function Card({ good, title, items, photo, alt, order }) {
  const [hasPhoto, setHasPhoto] = useState(false)

  /* only show the photo column if the image really exists (no empty gaps) */
  useEffect(() => {
    if (!photo) return
    const im = new Image()
    im.onload = () => setHasPhoto(true)
    im.src = photo
  }, [photo])

  const cols = hasPhoto ? (good ? 'lg:grid-cols-[1fr_32%]' : 'lg:grid-cols-[32%_1fr]') : ''

  return (
    <article
      className={`rv rv-up sheen relative grid overflow-hidden rounded-[28px] border-[3px] border-white transition-shadow duration-300 sm:rounded-[32px] ${cols} ${
        good
          ? 'bg-gradient-to-br from-[#cdf2de] via-[#e4f8ed] to-[#f4fdf8] shadow-[0_18px_40px_-12px_rgba(22,163,74,.28)] hover:shadow-[0_24px_50px_-12px_rgba(22,163,74,.4)]'
          : 'bg-gradient-to-br from-[#fbd3da] via-[#fde5e9] to-[#fff5f6] shadow-[0_18px_40px_-12px_rgba(229,52,45,.25)] hover:shadow-[0_24px_50px_-12px_rgba(229,52,45,.38)] max-lg:pb-8'
      }`}
      style={{ '--i': order }}
    >
      <Particles up={good} color={good ? '#4fd18c' : '#f4909b'} />

      {/* header pill */}
      <header className={`relative z-10 col-span-full flex justify-center px-3 pt-5 sm:px-4 sm:pt-7 ${good ? 'max-lg:pt-11' : ''}`}>
        <div className="rv rv-zoom flex w-fit max-w-full items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-5 shadow-[0_8px_22px_rgba(0,0,0,.10)] sm:gap-3 sm:py-2.5 sm:pl-3 sm:pr-7">
          <span
            className={`${good ? 'glow-g bg-gradient-to-b from-[#2fd16b] to-[#12963f]' : 'glow-r bg-gradient-to-b from-[#ff5a52] to-[#d62a23]'} grid h-9 w-9 shrink-0 place-items-center rounded-full text-white sm:h-10 sm:w-10`}
          >
            {good ? <Check size={22} strokeWidth={4} /> : <X size={22} strokeWidth={3.6} className="wig" />}
          </span>
          <h3 className="text-[clamp(16px,4.4vw,26px)] font-extrabold leading-tight text-[#0a1f5c]">{title}</h3>
        </div>
      </header>

      {/* list */}
      <ul
        className={`relative z-10 order-1 space-y-2.5 px-4 py-5 sm:px-8 lg:py-8 ${
          hasPhoto
            ? good ? 'lg:order-1 lg:pl-14 lg:pr-3' : 'lg:order-2 lg:pl-3 lg:pr-14'
            : good ? 'lg:pl-14 lg:pr-8' : 'lg:pl-8 lg:pr-14'
        }`}
      >
        {items.map((t, i) => (
          <li key={i} className={`rv ${good ? 'rv-left' : 'rv-right'}`} style={{ '--i': i }}>
            <div className="row flex items-center gap-3 rounded-2xl border border-white/90 bg-white/65 px-3 py-2.5 text-[15.5px] font-medium leading-snug text-[#0a1f5c] backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] lg:text-[clamp(15px,1.3vw,17px)]">
              <span className="rv rv-pop shrink-0">
                <span
                  className={`${good ? 'glow-g bg-gradient-to-b from-[#2fd16b] to-[#12963f]' : 'glow-r bg-gradient-to-b from-[#ff6a62] to-[#df3029]'} grid h-7 w-7 place-items-center rounded-full text-white`}
                  style={{ animationDelay: `${i * 0.45}s` }}
                >
                  {good ? (
                    <Check size={16} strokeWidth={4.5} />
                  ) : (
                    <X size={15} strokeWidth={4.5} className="wig" style={{ animationDelay: `${i * 0.8}s` }} />
                  )}
                </span>
              </span>
              <span>{t}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* photo column (only when the image exists) */}
      {hasPhoto && (
        <div className={`relative order-2 min-h-[230px] sm:min-h-[290px] ${good ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="rv rv-photo absolute inset-x-0 bottom-0 z-10 flex justify-center">
            <div className="floaty flex">
              <img
                src={photo}
                alt={alt}
                className="h-[210px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_22px_rgba(15,23,42,.18)] sm:h-[270px]"
              />
            </div>
          </div>
        </div>
      )}
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const id = setInterval(() => {
      if (paused.current || window.matchMedia('(min-width: 1024px)').matches) return
      i = (i + 1) % features.length
      goTo(i)
    }, 3200)
    return () => clearInterval(id)
  }, [goTo])

  useEffect(() => () => clearTimeout(resume.current), [])

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
            <span className="bounce-s shrink-0" style={{ animationDelay: `${i * 0.6}s` }}>
              <Icon className="text-[#1457e6] transition duration-300 group-hover:scale-125" size={40} strokeWidth={1.6} />
            </span>
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
            <span className="gshift bg-gradient-to-r from-[#1457e6] via-[#3d9bff] to-[#1457e6] bg-clip-text text-transparent">Equity Research</span>
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
            <div className="rv rv-zoom relative" style={{ '--i': 5 }}>
              <span className="spin-slow absolute -inset-2.5 rounded-full border-2 border-dashed border-[#1457e6]/50" />
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