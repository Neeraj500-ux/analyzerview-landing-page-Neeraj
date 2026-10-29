import { AlertOctagon, SearchX, HeartCrack, MessageSquareWarning, ShieldAlert, TrendingDown, Repeat, ArrowRight } from 'lucide-react'
import { painPoints } from '../data/content'

const icons = [SearchX, HeartCrack, MessageSquareWarning, ShieldAlert, TrendingDown, Repeat]

export default function Problem() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff5f4,#fff_60%)] px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="text-center">
          <span data-aos="fade-down" className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[.08em] text-red-600">
            <AlertOctagon size={15} /> Reality check
          </span>
          <h2 data-aos="zoom-in" className="mt-5 font-extrabold leading-[1.05] tracking-[-.04em] text-red-600">
            <span className="block text-[clamp(64px,16vw,150px)] drop-shadow-[0_10px_24px_rgba(220,38,38,.25)]">STOP</span>
            <span className="mt-1 block text-[clamp(26px,5.4vw,56px)]">before you lose all your money in trading.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((text, i) => {
            const Icon = icons[i]
            return (
              <div
                key={text}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="group flex items-start gap-4 rounded-2xl border border-red-100 bg-white p-5 shadow-[0_8px_26px_rgba(220,38,38,.06)] transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_16px_36px_rgba(220,38,38,.14)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                  <Icon size={24} strokeWidth={1.9} />
                </span>
                <p className="text-[15.5px] font-bold leading-snug text-slate-800">{text}</p>
              </div>
            )
          })}
        </div>

        <div data-aos="fade-up" className="mx-auto mt-12 max-w-[760px] text-center">
          <p className="text-lg font-semibold leading-relaxed text-slate-700 sm:text-xl">
            If you relate to any of these, <span className="font-extrabold text-red-600">you are trading the wrong way</span>, and it can cost you your capital. To prevent all of these:
          </p>
          <a
            href="#consult"
            className="group mt-7 inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[15px] bg-[linear-gradient(105deg,#ff7417_0%,#ed6b78_48%,#347cf6_100%)] px-7 py-3.5 text-base font-extrabold text-white shadow-[0_10px_28px_rgba(119,85,232,.25)] transition hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(119,85,232,.32)] sm:text-[17px]"
          >
            Step into smarter market approach
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
