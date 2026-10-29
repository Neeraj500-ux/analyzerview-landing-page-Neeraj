import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Logo from './Logo'
import { faqs } from '../data/content'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[860px]">
        <div className="text-center">
          <div className="flex justify-center"><Logo /></div>
          <h2 data-aos="fade-up" className="mt-6 text-[clamp(28px,4.4vw,44px)] font-extrabold tracking-[-.035em] text-navy-900">Frequently Asked Questions</h2>
          <p className="mt-3 text-base font-medium text-slate-600">Clear answers about our research methodology, subscriptions and risk.</p>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} data-aos="fade-up" data-aos-delay={Math.min(i, 4) * 40} className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? 'border-brand/40 bg-[#f5f8ff]' : 'border-slate-200 bg-white'}`}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-light text-sm font-extrabold text-brand">{i + 1}</span>
                  <span className="flex-1 text-[15.5px] font-extrabold text-navy-900">{f.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-brand transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden"><p className="px-5 pb-5 pl-[68px] text-[15px] font-medium leading-relaxed text-slate-600">{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-8 rounded-xl bg-slate-50 p-4 text-xs font-medium leading-relaxed text-slate-500">
          <strong className="text-slate-700">Risk Disclosure:</strong> Investments in securities markets are subject to market risks. Research analysis cannot guarantee returns or eliminate losses. Review the applicable service terms and disclosures before subscribing.
        </p>
      </div>
    </section>
  )
}
