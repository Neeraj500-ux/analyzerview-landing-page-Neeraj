
import { useState } from 'react'
import { ChevronDown, ShieldAlert, HelpCircle } from 'lucide-react'
import Logo from './Logo'
import { faqs } from '../data/content'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqItems = Array.isArray(faqs) ? faqs : []

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? -1 : index
    )
  }

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_8%_10%,rgba(255,116,23,.10),transparent_38%),radial-gradient(ellipse_at_95%_30%,rgba(119,85,232,.12),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(40,120,255,.08),transparent_40%),linear-gradient(180deg,#fff,#f8f7ff)] px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.07)_1px,transparent_1px)] bg-[length:30px_30px] opacity-50"
      />

      <div className="mx-auto w-full max-w-[860px]">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#7755e8] shadow-sm">
            <HelpCircle size={15} aria-hidden="true" />
            <span>Got questions?</span>
          </div>

          <h2 className="mt-4 text-[clamp(28px,4.6vw,46px)] font-extrabold leading-[1.15] tracking-[-.04em] text-slate-900">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#ff7417] via-[#ed6b78] to-[#347cf6] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[560px] text-sm font-medium leading-7 text-slate-600 sm:text-base">
            Clear answers about our research methodology,
            subscriptions and risk.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-9 space-y-4 sm:mt-12">
          {faqItems.length > 0 ? (
            faqItems.map((item, index) => {
              const isOpen = openIndex === index
              const questionId = `faq-question-${index}`
              const answerId = `faq-answer-${index}`

              return (
                <div
                  key={item.q ?? index}
                  className={`rounded-2xl p-[1.5px] transition-all duration-300 ${
                    isOpen
                      ? 'bg-gradient-to-r from-[#ff7417] via-[#a855f7] to-[#347cf6] shadow-[0_14px_35px_rgba(119,85,232,.14)]'
                      : 'border border-slate-200 bg-white hover:border-purple-200'
                  }`}
                >
                  <div className="overflow-hidden rounded-[14px] bg-white">
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleFAQ(index)}
                      className="flex min-h-[68px] w-full items-center gap-3 px-3.5 py-4 text-left outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-purple-200 sm:gap-4 sm:px-5"
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold transition-colors ${
                          isOpen
                            ? 'bg-gradient-to-br from-[#ff8b35] to-[#7755e8] text-white shadow-md'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {index + 1}
                      </span>

                      <span
                        className={`min-w-0 flex-1 break-words text-sm font-extrabold leading-6 sm:text-base ${
                          isOpen ? 'text-slate-900' : 'text-slate-800'
                        }`}
                      >
                        {item.q}
                      </span>

                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-gradient-to-br from-[#ff7417] to-[#7755e8] text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <ChevronDown size={18} aria-hidden="true" />
                      </span>
                    </button>

                    {/* Answer panel */}
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      hidden={!isOpen}
                    >
                      <div className="mx-4 border-t border-dashed border-slate-200 sm:mx-5" />

                      <p className="whitespace-pre-line break-words px-4 pb-5 pt-4 text-sm font-medium leading-7 text-slate-600 sm:pl-[68px] sm:pr-6 sm:text-[15px]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-white p-6 text-center">
              <p className="font-bold text-slate-800">
                No FAQs available
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Please check the FAQ data in src/data/content.js.
              </p>
            </div>
          )}
        </div>

        {/* Risk Disclosure */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-white p-4 sm:p-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#ff8b35] to-[#ff650d] text-white shadow-md shadow-orange-300/40">
            <ShieldAlert size={18} aria-hidden="true" />
          </span>

          <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-[13px]">
            <strong className="font-extrabold text-slate-800">
              Risk Disclosure:
            </strong>{' '}
            Investments in securities markets are subject to market risks.
            Research analysis cannot guarantee returns or eliminate losses.
            Review the applicable service terms and disclosures before
            subscribing.
          </p>
        </div>
      </div>
    </section>
  )
}
