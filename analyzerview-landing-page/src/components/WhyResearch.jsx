import { Compass, Lightbulb, FileSearch, AlertTriangle, Hourglass, RefreshCw, BadgeCheck } from 'lucide-react'
import { REG_NO } from '../data/content'

const items = [
  [Compass, 'Market context', 'Where the market stands before any view is formed.'],
  [Lightbulb, 'Clear thesis', 'The reasoning behind a research view, not just a buy or sell call.'],
  [FileSearch, 'Supporting evidence', 'Documented analysis that you can read and question.'],
  [AlertTriangle, 'Key risks', 'Defined stop-loss or invalidation levels and risk factors.'],
  [Hourglass, 'Horizon', 'Time frame stated where relevant.'],
  [RefreshCw, 'Review & updates', 'Research updates as conditions change.'],
]

export default function WhyResearch() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0a1330,#101c44_60%,#16255a)] px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="text-center">
          <div data-aos="fade-down" className="text-xs font-extrabold uppercase tracking-[.22em] text-[#8db0ff]">Why our research is different</div>
          <h2 data-aos="fade-up" className="mx-auto mt-3 max-w-[760px] text-[clamp(28px,4.6vw,46px)] font-extrabold leading-[1.1] tracking-[-.035em]">
            Research-led decisions. A more disciplined approach to the market.
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-4 max-w-[680px] text-base font-medium leading-relaxed text-[#c3d3fb]">
            Independent equity research built around a clear investment thesis, documented analysis and defined risk factors.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([I, t, d], i) => (
            <div key={t} data-aos="fade-up" data-aos-delay={i * 70} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[#5b8dff]/60 hover:bg-white/10">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/25 text-[#9db8ff]"><I size={22} /></span>
              <h3 className="mt-4 text-lg font-extrabold">{t}</h3>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#c3d3fb]">{d}</p>
            </div>
          ))}
        </div>

        <div data-aos="fade-up" className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-[#5b8dff]/40 bg-white/5 p-6 text-center sm:flex-row sm:text-left">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-300"><BadgeCheck size={30} /></span>
          <div>
            <p className="text-lg font-extrabold">SEBI-Registered Research Analyst | Registration No. {REG_NO}</p>
            <p className="mt-1 text-sm font-medium text-[#c3d3fb]">Registration does not guarantee performance or returns, and does not imply SEBI endorsement.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
