import { useEffect, useRef, useState } from 'react'
import {
  CheckCircle2,
  ArrowRight,
  Target,
  Settings,
  ShieldCheck,
  Activity,
  Zap,
  Layers3,
  ChevronRight,
  Sparkles,
  CircleDot,
  Gauge,
  MoveUpRight,
} from 'lucide-react'

import { layers } from '../data/content'
import ChartArt from './ChartArt'

/* ----------------------------- static data ----------------------------- */

const stack = [
  { label: 'LAYER 04', title: 'Risk Validation', cls: 'from-[#102b78] via-[#1743ad] to-[#2764e8]', text: 'text-white', x: 0 },
  { label: 'LAYER 03', title: 'Entry Confirmation', cls: 'from-[#2860ce] via-[#3979ed] to-[#6198ff]', text: 'text-white', x: 9 },
  { label: 'LAYER 02', title: 'Price & Liquidity', cls: 'from-[#70a5f6] via-[#8bb9fa] to-[#b5d4ff]', text: 'text-[#17366f]', x: 18 },
  { label: 'LAYER 01', title: 'Market Regime', cls: 'from-[#d5e4fc] via-[#e3edff] to-[#f2f6ff]', text: 'text-[#17366f]', x: 27 },
]

const chips = [
  { icon: ShieldCheck, title: 'Risk Validation', desc: 'Protect capital first' },
  { icon: Target, title: 'Entry Confirmation', desc: 'Wait for stronger signals' },
  { icon: Activity, title: 'Price, Volume & Liquidity', desc: 'Understand market behavior' },
  { icon: Gauge, title: 'Market Regime', desc: 'Identify market conditions' },
]

const principles = [
  { icon: Target, number: '01', title: 'Process Driven', description: 'Consistent rules guide every decision.' },
  { icon: Settings, number: '02', title: 'Data Backed', description: 'Evidence matters more than emotion.' },
  { icon: ShieldCheck, number: '03', title: 'Risk Managed', description: 'Risk assessment comes before execution.' },
]

const features = ['Multi-layer analysis', 'Rule-based decisions', 'Risk awareness']

/* One accent per layer card */
const accents = [
  { a: '#2f6bf0', b: '#5b8bff', glow: 'rgba(47,107,240,.20)' },
  { a: '#4f5df0', b: '#7d86ff', glow: 'rgba(79,93,240,.20)' },
  { a: '#7a4fe6', b: '#a37bff', glow: 'rgba(122,79,230,.20)' },
  { a: '#0ea5c6', b: '#38d3e8', glow: 'rgba(14,165,198,.20)' },
]

/* Sticky geometry. Mobile uses smaller numbers so the cards fit the screen. */
const getGeo = () => {
  const w = typeof window === 'undefined' ? 1200 : window.innerWidth
  if (w < 640) return { top: 76, step: 14 }
  if (w < 1024) return { top: 92, step: 20 }
  return { top: 104, step: 26 }
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/* ------------------------------ component ------------------------------ */

export default function ExecutionModel() {
  const sectionRef = useRef(null)
  const stepsRef = useRef(null)
  const wrapRefs = useRef([])
  const cardRefs = useRef([])
  const rafRef = useRef(null)
  const geoRef = useRef(getGeo())

  const [geo, setGeo] = useState(getGeo)
  const [progress, setProgress] = useState(0)
  const [activeLayer, setActiveLayer] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  /* reduced motion */
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  /* hero visibility */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  /* responsive geometry */
  useEffect(() => {
    const onResize = () => {
      const next = getGeo()
      geoRef.current = next
      setGeo(next)
    }
    onResize()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  /* scroll: progress + overlap depth + active layer + reveal (single rAF loop) */
  useEffect(() => {
    const run = () => {
      const steps = stepsRef.current
      if (!steps) return

      const { top: baseTop, step } = geoRef.current
      const vh = window.innerHeight || 1
      const rect = steps.getBoundingClientRect()
      const total = Math.max(1, rect.height - vh * 0.5)
      setProgress(clamp(((vh * 0.4 - rect.top) / total) * 100, 0, 100))

      let active = 0
      wrapRefs.current.forEach((wrap, i) => {
        const card = cardRefs.current[i]
        if (!wrap || !card) return

        const stick = baseTop + i * step
        const top = wrap.getBoundingClientRect().top

        if (top <= stick + 60) active = i
        if (top < vh * 0.92) card.dataset.seen = 'true'

        // depth: how much the NEXT card has slid over this one (0 → 1)
        let p = 0
        const next = wrapRefs.current[i + 1]
        if (next && !reducedMotion) {
          const nextTop = next.getBoundingClientRect().top
          const h = card.offsetHeight
          p = clamp((stick + h - nextTop) / Math.max(1, h - step), 0, 1)
        }
        card.style.setProperty('--p', p.toFixed(3))
      })

      setActiveLayer(active)
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion, geo])

  /* spotlight that follows the pointer (mouse + touch) */
  const handleSpot = (event) => {
    if (reducedMotion) return
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
  }

  const goToLayer = (index) => {
    wrapRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'center',
    })
  }

  const enter = (delay = '') => (isVisible && !reducedMotion ? `ex-enter ${delay}` : '')

  return (
    <section
      ref={sectionRef}
      id="execution-model"
      // No overflow-hidden here: it breaks position: sticky. overflow-x: clip does not.
      className="execution-premium relative isolate bg-[#f6f8ff] text-[#101d42]"
      style={{ overflowX: 'clip' }}
    >
      <style>{`
        .execution-premium {
          --ex-blue: #3266e5;
          --ex-indigo: #526df0;
          --ex-purple: #8057e9;
        }
        .execution-premium * { box-sizing: border-box; }

        /* ---------- background ---------- */
        .execution-premium .ex-grid {
          background-image:
            linear-gradient(rgba(66,110,205,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66,110,205,.055) 1px, transparent 1px);
          background-size: 38px 38px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .execution-premium .ex-orb { will-change: transform; animation: ex-orbit 12s ease-in-out infinite alternate; }
        .execution-premium .ex-orb-delay { animation-delay: -5s; animation-duration: 16s; }
        .execution-premium .ex-orbit { transform-origin: center; animation: ex-orbit-spin 24s linear infinite; }

        /* ---------- entrances ---------- */
        .execution-premium .ex-enter { animation: ex-enter .75s cubic-bezier(.2,.7,.2,1) both; }
        .execution-premium .ex-delay-1 { animation-delay: .10s; }
        .execution-premium .ex-delay-2 { animation-delay: .20s; }
        .execution-premium .ex-delay-3 { animation-delay: .30s; }

        /* ---------- eyebrow / dots / text ---------- */
        .execution-premium .ex-eyebrow {
          display: inline-flex; align-items: center; gap: 9px; max-width: 100%;
          border: 1px solid rgba(75,111,220,.15); border-radius: 999px;
          background: rgba(255,255,255,.8); padding: 9px 14px;
          color: #2855ad; font-size: 10px; font-weight: 800; letter-spacing: .16em;
          box-shadow: 0 5px 20px rgba(41,75,155,.045); backdrop-filter: blur(14px);
        }
        .execution-premium .ex-live-dot {
          position: relative; width: 7px; height: 7px; flex: 0 0 auto; border-radius: 50%;
          background: #3976f6; box-shadow: 0 0 12px rgba(57,118,246,.65);
        }
        .execution-premium .ex-live-dot::after {
          position: absolute; inset: -4px; border: 1px solid rgba(57,118,246,.4);
          border-radius: 50%; content: ""; animation: ex-ripple 2s ease-out infinite;
        }
        .execution-premium .ex-gradient-text {
          background: linear-gradient(100deg, #2855cb, #547ff4, #8057e9, #2855cb);
          background-size: 240% auto; -webkit-background-clip: text; background-clip: text;
          color: transparent; animation: ex-gradient 9s linear infinite;
        }

        /* ---------- glass panels ---------- */
        .execution-premium .ex-glass {
          position: relative; isolation: isolate; overflow: hidden;
          border: 1px solid rgba(255,255,255,.9); background: rgba(255,255,255,.72);
          box-shadow: 0 22px 70px rgba(37,75,155,.085); backdrop-filter: blur(20px);
        }
        .execution-premium .ex-glass::before {
          position: absolute; z-index: -1; inset: 0; border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,.85), transparent 40%, rgba(113,133,245,.06));
          content: ""; pointer-events: none;
        }
        .execution-premium .ex-shine {
          position: absolute; z-index: 1; top: 0; bottom: 0; left: -70%; width: 45%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent);
          transform: skewX(-18deg); transition: left .75s ease; pointer-events: none;
        }
        .execution-premium .ex-glass:hover .ex-shine { left: 140%; }

        /* ---------- hero stack ---------- */
        .execution-premium .ex-stack-layer {
          position: relative; isolation: isolate; overflow: hidden;
          transition: transform .35s ease, box-shadow .35s ease;
          animation: ex-stack-float 5s ease-in-out infinite;
        }
        .execution-premium .ex-stack-layer::after {
          position: absolute; inset: 0; content: ""; pointer-events: none;
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.34) 50%, transparent 70%);
          transform: translateX(-130%); animation: ex-layer-light 6s ease-in-out infinite;
        }
        .execution-premium .ex-chip { transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
        .execution-premium .ex-chip:hover { transform: translateX(4px); border-color: #b5caff; box-shadow: 0 10px 24px rgba(42,88,190,.08); }
        .execution-premium .ex-chip-icon { transition: transform .35s ease, color .35s ease, background .35s ease; }
        .execution-premium .ex-chip:hover .ex-chip-icon {
          transform: rotate(-7deg) scale(1.08); background: linear-gradient(135deg, #3266e5, #8057e9); color: white;
        }

        /* ---------- buttons ---------- */
        .execution-premium .ex-button {
          position: relative; isolation: isolate; overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .execution-premium .ex-button:hover { transform: translateY(-3px); box-shadow: 0 17px 38px rgba(50,91,210,.28); }
        .execution-premium .ex-button::after {
          position: absolute; z-index: -1; inset: 0; content: "";
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.22) 50%, transparent 75%);
          transform: translateX(-130%); transition: transform .7s ease;
        }
        .execution-premium .ex-button:hover::after { transform: translateX(130%); }
        .execution-premium .ex-signal { animation: ex-signal 2.8s ease-in-out infinite; }

        /* ---------- principles ---------- */
        .execution-premium .ex-principle { transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
        .execution-premium .ex-principle:hover { transform: translateY(-6px); border-color: #b7cbff; box-shadow: 0 22px 45px rgba(42,88,190,.10); }
        .execution-premium .ex-principle-icon { transition: transform .35s ease, color .35s ease, background .35s ease; }
        .execution-premium .ex-principle:hover .ex-principle-icon {
          transform: rotate(-8deg) scale(1.08); background: linear-gradient(135deg, #3266e5, #8057e9); color: white;
        }

        /* =====================================================
           OVERLAPPING SCROLL CARDS  (sticky on ALL screen sizes)
           ===================================================== */
        .execution-premium .ex-wrap {
          position: -webkit-sticky;
          position: sticky;
          padding-bottom: 12vh;
        }
        .execution-premium .ex-wrap:last-child { padding-bottom: 0; }

        .execution-premium .ex-layer-card {
          --p: 0;
          --mouse-x: 50%;
          --mouse-y: 50%;
          position: relative; isolation: isolate; overflow: hidden;
          transform-origin: top center;
          transform: scale(calc(1 - var(--p) * .065)) translateZ(0);
          filter: brightness(calc(1 - var(--p) * .10)) saturate(calc(1 - var(--p) * .25));
          border: 1px solid rgba(255,255,255,.95);
          background: linear-gradient(150deg, #ffffff 0%, #f6f8ff 60%, #eef3ff 100%);
          box-shadow:
            0 -18px 40px -22px var(--glow),
            0 30px 70px -28px rgba(30,60,140,.32),
            0 2px 0 rgba(255,255,255,.9) inset;
          transition: box-shadow .6s ease;
          will-change: transform, filter;
        }
        .execution-premium .ex-layer-card[data-active="true"] {
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--a) 28%, transparent),
            0 -18px 44px -20px var(--glow),
            0 34px 80px -26px color-mix(in srgb, var(--a) 40%, transparent),
            0 2px 0 rgba(255,255,255,.9) inset;
        }

        /* animated colour edge */
        .execution-premium .ex-layer-card::before {
          position: absolute; z-index: 3; inset: 0 0 auto 0; height: 4px; content: "";
          background: linear-gradient(90deg, var(--a), var(--b), #fff, var(--b), var(--a));
          background-size: 300% 100%; animation: ex-gradient 5s linear infinite;
        }
        /* cursor / touch spotlight */
        .execution-premium .ex-layer-card::after {
          position: absolute; z-index: -1; inset: 0; content: ""; pointer-events: none;
          background: radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), var(--glow), transparent 70%);
          opacity: 0; transition: opacity .35s ease;
        }
        .execution-premium .ex-layer-card:hover::after,
        .execution-premium .ex-layer-card:active::after { opacity: 1; }
        .execution-premium .ex-layer-card:hover .ex-shine { left: 140%; }

        /* floating colour blobs inside each card */
        .execution-premium .ex-blob {
          position: absolute; z-index: -1; border-radius: 50%; pointer-events: none; filter: blur(46px);
          background: radial-gradient(circle, var(--b), transparent 70%); opacity: .28;
          animation: ex-blob 9s ease-in-out infinite alternate;
        }
        .execution-premium .ex-blob.one { width: 220px; height: 220px; left: -70px; bottom: -80px; }
        .execution-premium .ex-blob.two { width: 180px; height: 180px; right: -50px; top: 30%; animation-delay: -4s; opacity: .2; }

        /* ghost number */
        .execution-premium .ex-ghost {
          position: absolute; z-index: -1; right: 14px; top: -10px;
          font-size: clamp(96px, 17vw, 210px); font-weight: 900; line-height: 1; letter-spacing: -.08em;
          background: linear-gradient(180deg, color-mix(in srgb, var(--a) 22%, transparent), transparent 85%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          transform: translateY(calc(var(--p) * -24px));
          user-select: none; pointer-events: none;
        }

        /* content reveal the first time a card scrolls into view */
        .execution-premium .ex-body {
          transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .execution-premium .ex-layer-card[data-seen="false"] .ex-body { opacity: 0; transform: translateY(36px); }

        .execution-premium .ex-icon-tile {
          position: relative;
          background: linear-gradient(135deg, var(--a), var(--b)); color: #fff;
          box-shadow: 0 12px 26px -8px var(--a);
          transition: transform .5s cubic-bezier(.2,.7,.2,1);
        }
        .execution-premium .ex-icon-tile::after {
          position: absolute; inset: -5px; border-radius: inherit; content: "";
          border: 1.5px solid var(--a); opacity: 0;
        }
        .execution-premium .ex-layer-card[data-active="true"] .ex-icon-tile { transform: scale(1.07) rotate(-4deg); }
        .execution-premium .ex-layer-card[data-active="true"] .ex-icon-tile::after { animation: ex-tile-ring 2.4s ease-out infinite; }

        .execution-premium .ex-pill {
          color: var(--a); background: color-mix(in srgb, var(--a) 10%, white);
          border: 1px solid color-mix(in srgb, var(--a) 22%, white);
        }
        .execution-premium .ex-check {
          color: var(--a); background: color-mix(in srgb, var(--a) 12%, white);
          transition: transform .4s ease;
        }
        .execution-premium .ex-point:hover .ex-check { transform: scale(1.18) rotate(-6deg); }

        /* bullet stagger */
        .execution-premium .ex-point { opacity: .5; transform: translateX(-8px); transition: opacity .5s ease, transform .5s ease; }
        .execution-premium .ex-layer-card[data-active="true"] .ex-point { opacity: 1; transform: translateX(0); }
        .execution-premium .ex-layer-card[data-active="true"] .ex-point:nth-child(1) { transition-delay: .05s; }
        .execution-premium .ex-layer-card[data-active="true"] .ex-point:nth-child(2) { transition-delay: .15s; }
        .execution-premium .ex-layer-card[data-active="true"] .ex-point:nth-child(3) { transition-delay: .25s; }
        .execution-premium .ex-layer-card[data-active="true"] .ex-point:nth-child(4) { transition-delay: .35s; }
        .execution-premium .ex-layer-card[data-active="true"] .ex-point:nth-child(5) { transition-delay: .45s; }

        /* chart panel */
        .execution-premium .ex-chart-panel { transition: transform .6s cubic-bezier(.2,.7,.2,1), box-shadow .6s ease; }
        .execution-premium .ex-layer-card[data-active="true"] .ex-chart-panel {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px -20px color-mix(in srgb, var(--a) 45%, transparent);
        }
        .execution-premium .ex-scan {
          position: absolute; z-index: 2; inset: 0 auto 0 0; width: 28%; pointer-events: none;
          background: linear-gradient(90deg, transparent, var(--glow), transparent);
          animation: ex-scan 4.5s ease-in-out infinite;
        }

        /* step dots inside each card */
        .execution-premium .ex-dot {
          height: 6px; width: 6px; border-radius: 999px; background: #cbd8f5;
          transition: width .5s cubic-bezier(.2,.7,.2,1), background .4s ease;
        }
        .execution-premium .ex-dot.on { width: 22px; background: linear-gradient(90deg, var(--a), var(--b)); }

        /* progress rail */
        .execution-premium .ex-rail { transition: height .25s ease; }

        /* ---------- keyframes ---------- */
        @keyframes ex-enter { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ex-orbit { from { transform: translate3d(-8px,-10px,0) scale(.96); } to { transform: translate3d(20px,24px,0) scale(1.08); } }
        @keyframes ex-ripple { 0% { transform: scale(.7); opacity: .75; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes ex-gradient { 0% { background-position: 0% center; } 100% { background-position: 300% center; } }
        @keyframes ex-stack-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes ex-layer-light { 0%,35% { transform: translateX(-130%); } 65%,100% { transform: translateX(150%); } }
        @keyframes ex-orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ex-signal { 0%,100% { opacity: .7; transform: scale(.96); } 50% { opacity: 1; transform: scale(1.04); } }
        @keyframes ex-scan { 0% { transform: translateX(-100%); } 60%,100% { transform: translateX(480%); } }
        @keyframes ex-divider { from { transform: translateX(-120%); } to { transform: translateX(350%); } }
        @keyframes ex-blob { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(26px,-22px,0) scale(1.18); } }
        @keyframes ex-tile-ring { 0% { transform: scale(.92); opacity: .7; } 100% { transform: scale(1.25); opacity: 0; } }

        /* ---------- mobile: keep each card shorter than the screen ---------- */
        @media (max-width: 767px) {
          .execution-premium .ex-grid { background-size: 30px 30px; }
          .execution-premium .ex-wrap { padding-bottom: 9vh; }
          .execution-premium .ex-chart-head { display: none; }
          .execution-premium .ex-foot-text { display: none; }
          .execution-premium .ex-layer-card { border-radius: 20px; }
          .execution-premium .ex-blob { filter: blur(34px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .execution-premium *,
          .execution-premium *::before,
          .execution-premium *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
          .execution-premium .ex-wrap { position: relative !important; top: auto !important; }
          .execution-premium .ex-layer-card { transform: none !important; filter: none !important; }
          .execution-premium .ex-layer-card[data-seen="false"] .ex-body { opacity: 1; transform: none; }
        }
      `}</style>

      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ex-grid absolute inset-0 opacity-80" />
        <div className="ex-orb absolute -left-36 top-24 h-72 w-72 rounded-full bg-blue-300/35 blur-[100px] sm:h-96 sm:w-96" />
        <div className="ex-orb ex-orb-delay absolute -right-40 top-[28%] h-80 w-80 rounded-full bg-indigo-300/30 blur-[110px] sm:h-[430px] sm:w-[430px]" />
        <div className="ex-orb absolute bottom-[5%] left-[28%] h-64 w-64 rounded-full bg-violet-300/20 blur-[100px]" />
        <div className="ex-orbit absolute left-1/2 top-[15%] h-[280px] w-[280px] -translate-x-1/2 rounded-full border border-blue-300/[0.13] sm:h-[480px] sm:w-[480px]">
          <span className="absolute left-[14%] top-[14%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,.7)]" />
        </div>
      </div>

      {/* ============================ Hero ============================ */}
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:pt-28">
        <div className="relative z-10">
          <div className={`ex-eyebrow ${enter()}`}>
            <span className="ex-live-dot" />
            OUR EXECUTION FRAMEWORK
            <Sparkles size={14} className="shrink-0 text-blue-500" />
          </div>

          <h2 className={`mt-7 max-w-[650px] text-[clamp(37px,5.5vw,68px)] font-extrabold leading-[1.035] tracking-[-.06em] text-[#101d42] ${enter('ex-delay-1')}`}>
            A Smarter Way to
            <span className="mt-1 block">Navigate the</span>
            <span className="ex-gradient-text mt-1 block pb-1">Markets.</span>
          </h2>

          <p className={`mt-6 max-w-[540px] text-[15px] font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8 ${enter('ex-delay-2')}`}>
            Introducing our four-layer execution model — a structured framework
            designed to evaluate market conditions, confirm opportunities and
            bring greater discipline to every trading decision.
          </p>

          <div className={`mt-7 flex flex-wrap gap-2.5 ${enter('ex-delay-2')}`}>
            {features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white/85 px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:text-sm"
              >
                <CheckCircle2 size={15} className="shrink-0 text-blue-600" />
                {feature}
              </span>
            ))}
          </div>

          <div className={`mt-8 flex flex-wrap items-center gap-4 ${enter('ex-delay-3')}`}>
            <a
              href="#execution-steps"
              className="ex-button group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#2048b9] via-[#3266e5] to-[#7256e8] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(50,91,210,.24)] sm:px-6 sm:text-base"
            >
              Explore the Framework
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <span className="flex items-center gap-2 text-xs font-bold text-slate-500 sm:text-sm">
              <span className="ex-signal grid h-8 w-8 place-items-center rounded-full border border-blue-100 bg-white text-blue-600">
                <ShieldCheck size={16} />
              </span>
              Structured. Measured. Disciplined.
            </span>
          </div>
        </div>

        {/* Layer stack */}
        <div className="relative mx-auto w-full max-w-[550px]">
          <div className="ex-orb pointer-events-none absolute inset-5 rounded-[40px] bg-gradient-to-br from-blue-300/45 via-indigo-200/25 to-violet-300/30 blur-3xl" />

          <div className="ex-glass relative rounded-[25px] p-4 sm:rounded-[32px] sm:p-6 md:p-7">
            <div className="ex-shine" />

            <div className="relative flex items-start justify-between gap-3 border-b border-blue-100/80 pb-5">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-blue-700 sm:text-xs">
                  <Layers3 size={15} />
                  SYSTEM OVERVIEW
                </div>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#101d42] sm:text-2xl">The execution stack</h3>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">Four independent checkpoints</p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5">
                <span className="ex-live-dot !h-1.5 !w-1.5 !bg-emerald-500 !shadow-none" />
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 sm:text-[10px]">Structured</span>
              </span>
            </div>

            <div className="relative mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)] items-center gap-3 sm:gap-5">
              <div className="relative flex h-[255px] items-center sm:h-[320px]">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100 sm:h-60 sm:w-60" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-200 sm:h-44 sm:w-44" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/25 blur-2xl sm:h-36 sm:w-36" />

                <div className="relative w-full">
                  {stack.map((item, index) => (
                    <div
                      key={item.label}
                      className="ex-stack-layer relative mb-2.5 last:mb-0"
                      style={{ paddingLeft: `${item.x}%`, animationDelay: `${index * -0.8}s` }}
                    >
                      <div className={`relative rounded-lg bg-gradient-to-br px-2 py-3 shadow-[0_8px_18px_rgba(23,60,130,.15)] sm:rounded-xl sm:px-3 sm:py-4 ${item.cls} ${item.text}`}>
                        <div className="flex items-center gap-2">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/30 text-[10px] font-black sm:h-8 sm:w-8 sm:text-xs">
                            0{4 - index}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[8px] font-bold uppercase tracking-wider opacity-80 sm:text-[10px]">{item.label}</p>
                            <p className="mt-0.5 text-[9px] font-extrabold leading-tight sm:text-xs">{item.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/95 px-2.5 py-1.5 shadow-sm sm:bottom-1 sm:px-3">
                  <Zap size={12} className="text-blue-600" />
                  <span className="text-[9px] font-extrabold text-slate-600 sm:text-[10px]">FOUR-STAGE MODEL</span>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {chips.map((chip, index) => {
                  const Icon = chip.icon
                  return (
                    <div
                      key={chip.title}
                      className="ex-chip group rounded-xl border border-blue-100/90 bg-white/90 p-2.5 shadow-[0_4px_15px_rgba(36,77,150,.035)] sm:rounded-2xl sm:p-3.5"
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="ex-chip-icon grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 sm:h-10 sm:w-10 sm:rounded-xl">
                          <Icon size={17} strokeWidth={1.9} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-extrabold leading-snug text-[#14244a] sm:text-xs md:text-sm">{chip.title}</p>
                          <p className="mt-1 text-[9px] font-medium leading-relaxed text-slate-500 sm:text-[11px]">{chip.desc}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between pl-1">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400 sm:text-[9px]">STEP 0{index + 1}</span>
                        <ChevronRight size={13} className="text-blue-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-3 overflow-hidden rounded-xl border border-blue-100/80 bg-gradient-to-r from-blue-50 to-indigo-50/70 p-3 sm:p-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-blue-700 shadow-sm sm:h-11 sm:w-11">
                <ShieldCheck size={21} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-[#172b55] sm:text-sm">Built around disciplined decisions</p>
                <p className="mt-1 text-[10px] font-medium leading-relaxed text-slate-500 sm:text-xs">
                  A systematic framework, not a promise of trading outcomes.
                </p>
              </div>
              <Sparkles size={17} className="ml-auto shrink-0 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="relative h-px overflow-hidden bg-gradient-to-r from-transparent via-blue-200 to-transparent">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-[ex-divider_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
      </div>

      {/* ====================== Execution steps (overlap) ====================== */}
      <div
        id="execution-steps"
        className="mx-auto max-w-[1240px] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10"
      >
        <div className="mx-auto max-w-[760px] text-center">
          <div data-aos="fade-up" className="ex-eyebrow">
            <CircleDot size={14} />
            THE METHODOLOGY
          </div>

          <h3 data-aos="fade-up" data-aos-delay="80" className="mt-5 text-[clamp(30px,4.5vw,49px)] font-extrabold leading-[1.1] tracking-[-.045em] text-[#101d42]">
            From Market Analysis
            <span className="ex-gradient-text block pb-1">to Structured Execution</span>
          </h3>

          <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-4 max-w-[620px] text-sm font-medium leading-7 text-slate-600 sm:text-base">
            Every layer has a distinct role. Scroll to watch each one slide over
            the last, building a consistent process for evaluating market
            conditions and managing risk.
          </p>
        </div>

        <div ref={stepsRef} className="relative mt-10 sm:mt-16">
          {/* sticky layer navigator (desktop) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44px] lg:block">
            <div className="pointer-events-auto sticky top-[140px] flex flex-col items-center gap-3">
              <div className="relative h-[120px] w-[3px] overflow-hidden rounded-full bg-blue-100">
                <div
                  className="ex-rail absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-[#3269ed] via-[#537ef4] to-[#8661ee]"
                  style={{ height: `${progress}%` }}
                />
              </div>

              {layers.map((layer, index) => {
                const accent = accents[index % accents.length]
                const active = activeLayer === index
                return (
                  <button
                    key={layer.n ?? layer.title ?? index}
                    type="button"
                    onClick={() => goToLayer(index)}
                    aria-label={`Go to layer ${index + 1}: ${layer.title}`}
                    aria-current={active ? 'step' : undefined}
                    className="grid h-9 w-9 place-items-center rounded-xl border-2 text-[11px] font-black transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    style={
                      active
                        ? {
                            background: `linear-gradient(135deg, ${accent.a}, ${accent.b})`,
                            borderColor: accent.a,
                            color: '#fff',
                            transform: 'scale(1.1)',
                            boxShadow: `0 10px 22px -6px ${accent.a}`,
                          }
                        : { background: '#fff', borderColor: '#dbe6ff', color: '#94a3b8' }
                    }
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                )
              })}
            </div>
          </div>

          {/* overlapping cards */}
          <div className="lg:pl-[72px]">
            {layers.map((layer, index) => {
              const Icon = layer.icon || [Target, Activity, Settings, ShieldCheck][index % 4]
              const accent = accents[index % accents.length]
              const active = activeLayer === index

              return (
                <div
                  key={layer.n ?? layer.title ?? index}
                  ref={(el) => { wrapRefs.current[index] = el }}
                  className="ex-wrap"
                  style={{ top: geo.top + index * geo.step, zIndex: index + 1 }}
                >
                  <article
                    ref={(el) => { cardRefs.current[index] = el }}
                    data-active={active}
                    data-seen={index === 0 ? 'true' : 'false'}
                    onPointerMove={handleSpot}
                    className="ex-layer-card rounded-2xl p-4 sm:rounded-[28px] sm:p-6 lg:p-8"
                    style={{ '--a': accent.a, '--b': accent.b, '--glow': accent.glow }}
                  >
                    <div className="ex-shine" />
                    <span className="ex-blob one" />
                    <span className="ex-blob two" />
                    <span className="ex-ghost" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>

                    <div className="ex-body relative grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:items-center lg:gap-10">
                      <div className="min-w-0">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="ex-icon-tile grid h-11 w-11 shrink-0 place-items-center rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl">
                            <Icon size={24} strokeWidth={1.8} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="ex-pill rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider sm:text-[10px]">
                                Layer 0{index + 1}
                              </span>
                              {active && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 sm:text-[10px]">
                                  <span className="ex-live-dot !h-1.5 !w-1.5 !bg-emerald-500 !shadow-none" />
                                  IN FOCUS
                                </span>
                              )}
                            </div>

                            <h4 className="mt-1.5 text-lg font-extrabold leading-tight tracking-[-.035em] text-[#14244a] sm:mt-2 sm:text-[28px]">
                              {layer.title}
                            </h4>
                            <p className="mt-1 text-[11px] font-medium leading-5 text-slate-500 sm:mt-1.5 sm:text-sm sm:leading-6">{layer.sub}</p>
                          </div>
                        </div>

                        <ul className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
                          {layer.points.map((point) => (
                            <li
                              key={point}
                              className="ex-point flex items-start gap-2.5 text-[12px] font-medium leading-relaxed text-slate-600 sm:gap-3 sm:text-sm"
                            >
                              <span className="ex-check mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full">
                                <CheckCircle2 size={13} strokeWidth={2.5} />
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-blue-100/70 pt-3 sm:mt-5 sm:pt-4">
                          <div className="flex items-center gap-1.5" aria-label={`Layer ${index + 1} of ${layers.length}`}>
                            {layers.map((_, dot) => (
                              <span key={dot} className={`ex-dot ${dot === index ? 'on' : ''}`} />
                            ))}
                          </div>
                          <span className="ex-foot-text text-[10px] font-bold text-slate-500 sm:text-xs">
                            Layer {index + 1} of {layers.length} · part of a four-layer process
                          </span>
                        </div>
                      </div>

                      <div className="ex-chart-panel relative min-w-0 overflow-hidden rounded-xl border border-blue-100/80 bg-gradient-to-br from-[#f9fbff] via-white to-[#f0f5ff] p-2 sm:rounded-2xl sm:p-3">
                        <div
                          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
                          style={{ background: accent.glow }}
                        />
                        <div className="ex-scan" />

                        <div className="ex-chart-head relative mb-2 flex items-center justify-between px-1 pt-1">
                          <span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-slate-500 sm:text-[10px]">
                            Visual analysis
                          </span>
                          <span className="flex items-center gap-1 text-[9px] font-bold sm:text-[10px]" style={{ color: accent.a }}>
                            <Activity size={12} />
                            Illustration
                          </span>
                        </div>

                        <div className="relative h-[112px] sm:h-[200px]">
                          <ChartArt kind={layer.chart} />
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex items-start justify-center gap-2 text-center text-[10px] font-medium leading-5 text-slate-400 sm:text-xs">
          <ShieldCheck size={14} className="mt-0.5 shrink-0" />
          Charts are illustrative and provided for educational purposes only.
        </div>
      </div>

      {/* ============================ Principles ============================ */}
      <div className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="ex-glass relative rounded-[26px] sm:rounded-[34px]">
          <div className="ex-shine" />
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-200/35 blur-[80px]" />

          <div className="relative grid gap-9 p-5 sm:p-8 md:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12">
            <div>
              <div className="ex-eyebrow">
                <Sparkles size={14} />
                OUR PHILOSOPHY
              </div>

              <h3 className="mt-5 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.08] tracking-[-.045em] text-[#101d42]">
                Discipline Over
                <span className="ex-gradient-text block pb-1">Impulse.</span>
                <span className="block">Process Over Guesswork.</span>
              </h3>

              <p className="mt-4 max-w-[480px] text-sm font-medium leading-7 text-slate-600 sm:text-base">
                A structured, evidence-informed framework that puts analysis,
                confirmation and risk awareness at the center of the decision
                process. No single signal should be considered in isolation.
              </p>

              <a
                href="#consult"
                className="ex-button mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#2048b9] via-[#3266e5] to-[#7256e8] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(49,92,205,.22)] sm:text-base"
              >
                Explore our research services Plans
                <MoveUpRight size={17} />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {principles.map((principle) => {
                const Icon = principle.icon
                return (
                  <div
                    key={principle.title}
                    className="ex-principle group flex items-center gap-3 rounded-2xl border border-blue-100/90 bg-white/85 p-4 shadow-sm sm:items-start lg:gap-4 lg:p-5"
                  >
                    <div className="ex-principle-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 sm:h-12 sm:w-12">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#14244a] sm:text-base">{principle.title}</h4>
                        <span className="text-[9px] font-extrabold tracking-widest text-blue-400">{principle.number}</span>
                      </div>
                      <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-500 sm:text-sm">{principle.description}</p>
                    </div>

                    <ArrowRight size={16} className="shrink-0 text-blue-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative h-1 w-full bg-gradient-to-r from-[#244cc2] via-[#4986f5] to-[#8660eb]" />
        </div>

        <p className="mt-5 text-center text-[10px] font-medium leading-5 text-slate-400 sm:text-xs">
          Trading involves risk. This framework does not guarantee profits or eliminate the possibility of losses.
        </p>
      </div>
    </section>
  )
}