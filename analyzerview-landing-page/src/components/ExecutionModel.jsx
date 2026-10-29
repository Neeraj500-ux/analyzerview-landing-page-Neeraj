import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ArrowRight, Target, Settings, ShieldCheck, TrendingUp } from 'lucide-react'
import { layers } from '../data/content'
import ChartArt from './ChartArt'

const stack = [
  { label: 'Layer 4', cls: 'from-[#0f2a72] to-[#1b3f9e] text-white z-40', x: 0 },
  { label: 'Layer 3', cls: 'from-[#2b63d9] to-[#4b86f0] text-white z-30', x: 14 },
  { label: 'Layer 2', cls: 'from-[#6fa3f7] to-[#9cc2fb] text-[#0f2a72] z-20', x: 28 },
  { label: 'Layer 1', cls: 'from-[#d7e3f6] to-[#eaf1fb] text-[#33507f] z-10', x: 42 },
]
const chips = ['Risk Validation', 'Entry Confirmation', 'Price, Volume & Liquidity', 'Market Regime']

export default function ExecutionModel() {
  const listRef = useRef(null)
  const cardRefs = useRef([])
  const [progress, setProgress] = useState(0)
  const [seen, setSeen] = useState(-1)

  useEffect(() => {
    const onScroll = () => {
      const el = listRef.current
      if (!el) return
      const vh = window.innerHeight
      const rect = el.getBoundingClientRect()
      const p = (vh * 0.55 - rect.top) / rect.height
      setProgress(Math.min(1, Math.max(0, p)))
      let s = -1
      cardRefs.current.forEach((c, i) => {
        if (c && c.getBoundingClientRect().top < vh * 0.62) s = i
      })
      setSeen(s)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f7ff,#fff_30%,#f6f9ff)]">
      <style>{`
        @keyframes slab-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      `}</style>

      {/* Intro */}
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div data-aos="fade-right" className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.22em] text-brand">
            Our execution framework <span className="h-px w-10 bg-brand" />
          </div>
          <h2 data-aos="fade-up" className="mt-4 text-[clamp(34px,5.2vw,58px)] font-extrabold leading-[1.05] tracking-[-.04em] text-navy-900">
            A 4-Layer Execution Model for Smarter <span className="text-brand">Market Decisions</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="120" className="mt-5 max-w-[520px] text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
            Every trade goes through four confirmation layers before execution. This multi-filter approach ensures high-probability setups and better risk control.
          </p>
        </div>

        <div className="grid items-center gap-4 sm:grid-cols-[1.2fr_1fr]">
          <div className="relative mx-auto h-[300px] w-full max-w-[340px]">
            {stack.map((s, i) => (
              <div
                key={s.label}
                data-aos="fade-up"
                data-aos-delay={(3 - i) * 120}
                className="absolute left-0 w-full"
                style={{ top: i * 66, paddingLeft: s.x }}
              >
                <div
                  className={`relative rounded-2xl bg-gradient-to-br px-6 py-5 text-lg font-extrabold shadow-[0_14px_0_-4px_rgba(10,19,48,.18),0_24px_40px_rgba(27,92,240,.22)] motion-reduce:animate-none ${s.cls}`}
                  style={{ animation: `slab-float 5s ease-in-out ${-i * 0.9}s infinite` }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {chips.map((c, i) => (
              <div key={c} data-aos="fade-left" data-aos-delay={i * 90} className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-bold text-navy-900 shadow-sm">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll timeline */}
      <div className="mx-auto max-w-[1180px] px-4 pb-14 sm:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-extrabold uppercase tracking-[.2em] text-brand">
            <span className="h-px w-8 bg-brand/60" /> The 4-layer execution model <span className="h-px w-8 bg-brand/60" />
          </div>
          <h3 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-.03em] text-navy-900">From Analysis to Execution</h3>
          <p className="mt-2 text-base font-medium text-slate-600">Multiple confirmations. No single layer triggers a trade in isolation.</p>
        </div>

        <div ref={listRef} className="relative mt-12">
          {/* progress rail (md+) */}
          <div className="absolute bottom-10 left-[43px] top-10 hidden w-[3px] rounded bg-blue-100 md:block">
            <div className="w-full rounded bg-brand transition-[height] duration-150" style={{ height: `${progress * 100}%` }} />
          </div>

          <div className="space-y-6">
            {layers.map((l, i) => {
              const Icon = l.icon
              const on = i <= seen
              return (
                <div key={l.n} className="grid items-start gap-4 md:grid-cols-[88px_1fr]">
                  <div className="relative z-10 hidden flex-col items-center md:flex">
                    <div className={`grid h-[60px] w-[60px] place-items-center rounded-full text-[22px] font-extrabold text-white shadow-[0_8px_20px_rgba(27,92,240,.35)] transition duration-500 ${on ? 'scale-100 bg-brand' : 'scale-90 bg-slate-300'}`}>
                      {l.n}
                    </div>
                    <span className="mt-2 bg-[#f6f9ff] px-1 text-[11px] font-extrabold tracking-[.18em] text-brand">LAYER {i + 1}</span>
                  </div>

                  <div
                    ref={(el) => (cardRefs.current[i] = el)}
                    className={`grid gap-5 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_10px_34px_rgba(27,92,240,.08)] transition-all duration-700 lg:grid-cols-[84px_1fr_1.05fr] lg:items-center ${on ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-30'}`}
                  >
                    <div className="flex items-center gap-3 lg:block">
                      <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl bg-blue-50 text-brand">
                        <Icon size={34} strokeWidth={1.7} />
                      </span>
                      <span className="rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-white md:hidden">Layer {i + 1}</span>
                    </div>

                    <div>
                      <h4 className="text-xl font-extrabold tracking-[-.02em] text-navy-900">{l.title}</h4>
                      <p className="mt-1 text-[15px] font-medium text-slate-600">{l.sub}</p>
                      <ul className="mt-3 space-y-2">
                        {l.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-[14.5px] font-medium text-slate-700">
                            <CheckCircle2 size={18} className="mt-[1px] shrink-0 fill-brand text-white" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="h-[170px] lg:h-[185px]">
                      <ChartArt kind={l.chart} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <p className="mt-6 text-center text-xs font-medium text-slate-400">Charts shown are illustrative and for educational purposes only.</p>
      </div>

      {/* Principle band */}
      <div className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6">
        <div data-aos="fade-up" className="grid gap-8 rounded-3xl border border-blue-100 bg-[linear-gradient(135deg,#eef4ff,#f8fbff)] p-6 sm:p-9 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.22em] text-brand">Our principle <span className="h-px w-10 bg-brand" /></div>
            <h3 className="mt-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.1] tracking-[-.03em] text-navy-900">Disciplined Execution.<br />Consistent Decisions.</h3>
            <p className="mt-3 max-w-[460px] text-base font-medium text-slate-600">A structured, rule-based approach to identify high-probability opportunities and manage risk effectively.</p>
            <a href="#consult" className="group mt-6 inline-flex items-center gap-3 rounded-xl bg-brand px-6 py-3.5 text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(27,92,240,.3)] transition hover:-translate-y-0.5 hover:bg-brand-dark">
              Explore Our Research Plans <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="grid grid-cols-3 divide-x divide-blue-100 text-center">
            {[
              [Target, 'Process Driven', 'Same rules, every trade'],
              [Settings, 'Data Backed', 'Decisions based on facts'],
              [ShieldCheck, 'Risk Managed', 'Capital protection is our priority'],
            ].map(([I, t, s]) => (
              <div key={t} className="px-2 sm:px-4">
                <I className="mx-auto text-brand" size={34} strokeWidth={1.7} />
                <div className="mt-2 text-sm font-extrabold text-navy-900">{t}</div>
                <div className="mt-1 text-xs font-medium text-slate-500">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
