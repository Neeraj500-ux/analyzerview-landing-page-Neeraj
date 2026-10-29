import { CheckCircle2, XCircle } from 'lucide-react'

const yes = ['Documented research with a clear thesis', 'A disciplined, rule-based process', 'Defined entry, target and stop-loss levels', 'Understanding the risks behind every view']
const no = ['Guaranteed returns', 'Risk-free trading', 'Recovery of past losses', 'Shortcuts or random tips']

export default function WhoFor() {
  return (
    <section className="bg-[#f6f9ff] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center">
          <div className="text-xs font-extrabold uppercase tracking-[.22em] text-brand">Is this right for you?</div>
          <h2 data-aos="fade-up" className="mt-3 text-[clamp(28px,4.4vw,44px)] font-extrabold tracking-[-.035em] text-navy-900">Who it is for. And who it is not.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div data-aos="fade-right" className="rounded-3xl border border-emerald-200 bg-white p-7 shadow-[0_10px_30px_rgba(16,185,129,.08)]">
            <h3 className="text-xl font-extrabold text-emerald-700">For you if you want</h3>
            <ul className="mt-5 space-y-3.5">
              {yes.map((t) => <li key={t} className="flex gap-3 text-[15.5px] font-semibold text-slate-700"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={21} />{t}</li>)}
            </ul>
          </div>
          <div data-aos="fade-left" className="rounded-3xl border border-red-200 bg-white p-7 shadow-[0_10px_30px_rgba(220,38,38,.07)]">
            <h3 className="text-xl font-extrabold text-red-600">Not for you if you expect</h3>
            <ul className="mt-5 space-y-3.5">
              {no.map((t) => <li key={t} className="flex gap-3 text-[15.5px] font-semibold text-slate-700"><XCircle className="mt-0.5 shrink-0 text-red-500" size={21} />{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
