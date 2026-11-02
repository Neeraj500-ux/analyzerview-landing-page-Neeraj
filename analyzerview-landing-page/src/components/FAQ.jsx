import { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  MessageCircleQuestion,
} from 'lucide-react'
import { faqs } from '../data/content'

const css = `
.fq .rv{opacity:0}
.fq .in .rv{animation:fq-up .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*90ms)}
.fq .gborder{background-size:200% 100%;animation:fq-grad 4s ease-in-out infinite alternate}
.fq .blob{animation:fq-blob 14s ease-in-out infinite alternate}
.fq .floaty{animation:fq-float 5s ease-in-out infinite}
.fq .ping{animation:fq-ping 2.2s ease-out infinite}
.fq .shine{position:relative;overflow:hidden}
.fq .shine::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.55) 50%,transparent 65%);transform:translateX(-130%);animation:fq-shine 5s ease-in-out infinite 1.5s}
@keyframes fq-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes fq-grad{from{background-position:0% 50%}to{background-position:100% 50%}}
@keyframes fq-blob{from{transform:translate(0,0) scale(1)}to{transform:translate(36px,-28px) scale(1.15)}}
@keyframes fq-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes fq-ping{0%{box-shadow:0 0 0 0 rgba(255,116,23,.45)}100%{box-shadow:0 0 0 12px rgba(255,116,23,0)}}
@keyframes fq-shine{0%,55%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
@media (prefers-reduced-motion:reduce){
  .fq *,.fq *::after{animation:none!important}
  .fq .rv{opacity:1!important;transform:none!important}
}
`

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
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.05 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, inView]
}

/* ---------- multiple-choice questions (shown as A / B / C / D options) ---------- */

const experienceQuestion = {
  choice: true,
  q: 'How long have you been active in the stock market?',
  a: `New to Markets
Less than 1 Year
1–3 Years
3+ Years`,
}

const segmentQuestion = {
  choice: true,
  q: 'Which market segment are you mainly interested in?',
  a: `Equity Investing (Delivery)
Swing / Positional Trading
Futures & Options (F&O)
Index Options / Learning & Research`,
}

const capitalQuestion = {
  choice: true,
  q: 'What is your current trading capital range?',
  a: `Below ₹50,000
₹1 lakh – ₹5 lakh
₹5 lakh – ₹10 lakh
Above ₹10 lakh`,
}

const startQuestion = {
  choice: true,
  q: 'When are you looking to get started?',
  a: `Immediately
Within the next 7 days
Within the next 30 days
Just exploring my options`,
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [ref, inView] = useInView()

  const originalFaqs = Array.isArray(faqs) ? faqs : []

  // Question 1 & 2 = experience + segment, last two = capital + start.
  const faqItems = [
    experienceQuestion,
    segmentQuestion,
    ...originalFaqs.slice(0, Math.max(0, originalFaqs.length - 2)),
    capitalQuestion,
    startQuestion,
  ]

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? -1 : index,
    )
  }

  return (
    <section
      id="faq"
      className="fq relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_8%_10%,rgba(255,116,23,.10),transparent_38%),radial-gradient(ellipse_at_95%_30%,rgba(119,85,232,.12),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(40,120,255,.08),transparent_40%),linear-gradient(180deg,#fff,#f8f7ff)] px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
    >
      <style>{css}</style>

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.07)_1px,transparent_1px)] bg-[length:30px_30px] opacity-50"
      />

      {/* Drifting glows */}
      <div
        aria-hidden="true"
        className="blob pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-[#ff7417]/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="blob pointer-events-none absolute -right-24 top-1/2 -z-10 h-80 w-80 rounded-full bg-[#7755e8]/15 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />

      <div
        ref={ref}
        className={`mx-auto w-full max-w-[860px] ${inView ? 'in' : ''}`}
      >
        {/* Header */}
        <div className="text-center">
          <div
            className="rv flex justify-center"
            style={{ '--i': 0 }}
          >
            <div className="floaty shine rounded-3xl border border-white bg-white px-5 py-3 shadow-[0_18px_40px_-14px_rgba(119,85,232,.35)] ring-1 ring-slate-100 sm:px-7 sm:py-4">
              <img
                src="/images/Neeraj3.png"
                alt="AnalyzerView.com – SEBI Research Analyst"
                className="h-auto w-[240px] max-w-full sm:w-[340px]"
                loading="eager"
              />
            </div>
          </div>

          <div
            className="rv mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#7755e8] shadow-sm"
            style={{ '--i': 1 }}
          >
            <HelpCircle size={15} aria-hidden="true" />
            <span>Got questions?</span>
          </div>

          <h2
            className="rv mt-4 text-[clamp(28px,4.6vw,46px)] font-extrabold leading-[1.15] tracking-[-.04em] text-slate-900"
            style={{ '--i': 2 }}
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#ff7417] via-[#ed6b78] to-[#347cf6] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p
            className="rv mx-auto mt-4 max-w-[560px] text-sm font-medium leading-7 text-slate-600 sm:text-base"
            style={{ '--i': 3 }}
          >
            Clear answers about our research methodology, subscriptions and risk.
          </p>
        </div>

        {/* FAQ Accordion */}
        <ul className="mt-9 space-y-3.5 sm:mt-12 sm:space-y-4">
          {faqItems.length > 0 ? (
            faqItems.map((item, index) => {
              const isOpen = openIndex === index
              const questionId = `faq-question-${index}`
              const answerId = `faq-answer-${index}`

              const isChoiceQuestion = Boolean(item.choice)

              const options = isChoiceQuestion
                ? item.a.split('\n').filter(Boolean)
                : []

              return (
                <li
                  key={item.q ?? index}
                  className="rv"
                  style={{ '--i': index + 4 }}
                >
                  <div
                    className={`rounded-[20px] p-[1.5px] transition-shadow duration-300 ${
                      isOpen
                        ? 'gborder bg-gradient-to-r from-[#ff7417] via-[#a855f7] to-[#347cf6] shadow-[0_18px_40px_-12px_rgba(119,85,232,.3)]'
                        : 'bg-slate-200/80 hover:bg-purple-200 hover:shadow-[0_10px_26px_-12px_rgba(119,85,232,.25)]'
                    }`}
                  >
                    <div className="overflow-hidden rounded-[18.5px] bg-white">
                      <button
                        type="button"
                        id={questionId}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => toggleFAQ(index)}
                        className="flex min-h-[68px] w-full items-center gap-3 px-3.5 py-4 text-left outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-purple-200 sm:gap-4 sm:px-5"
                      >
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold transition-all duration-300 ${
                            isOpen
                              ? 'ping bg-gradient-to-br from-[#ff8b35] to-[#7755e8] text-white shadow-md'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span
                          className={`min-w-0 flex-1 break-words text-[14.5px] font-extrabold leading-6 transition-colors sm:text-base ${
                            isOpen
                              ? 'text-slate-900'
                              : 'text-slate-700'
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
                          <ChevronDown
                            size={18}
                            aria-hidden="true"
                          />
                        </span>
                      </button>

                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        aria-hidden={!isOpen}
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isOpen
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="mx-4 border-t border-dashed border-slate-200 sm:mx-5" />

                          {isChoiceQuestion ? (
                            <div className="grid gap-2 px-4 pb-5 pt-4 sm:pl-[76px] sm:pr-6">
                              {options.map((option, optionIndex) => (
                                <div
                                  key={option}
                                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-purple-200 hover:bg-purple-50 sm:text-[15px]"
                                >
                                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#7755e8] ring-1 ring-purple-100">
                                    {String.fromCharCode(65 + optionIndex)}
                                  </span>
                                  <span className="min-w-0 break-words">{option}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="whitespace-pre-line break-words px-4 pb-5 pt-4 text-sm font-medium leading-7 text-slate-600 sm:pl-[76px] sm:pr-6 sm:text-[15px]">
                              {item.a}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
          ) : (
            <li className="rounded-2xl border border-amber-200 bg-white p-6 text-center">
              <p className="font-bold text-slate-800">
                No FAQs available
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Please check the FAQ data in src/data/content.js.
              </p>
            </li>
          )}
        </ul>

        {/* Still have questions */}
        <div
          className="rv shine mt-9 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-r from-[#ff7417] via-[#ed6b78] to-[#347cf6] p-5 text-center text-white shadow-[0_20px_44px_-16px_rgba(119,85,232,.55)] sm:flex-row sm:justify-between sm:p-6 sm:text-left"
          style={{ '--i': faqItems.length + 5 }}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/40">
              <MessageCircleQuestion
                size={24}
                aria-hidden="true"
              />
            </span>

            <div>
              <div className="text-lg font-extrabold">
                Still have a question?
              </div>
              <p className="mt-0.5 text-sm font-medium text-white/90">
                Tell us what you are looking for and our team will get in touch.
              </p>
            </div>
          </div>

          <a
            href="#consult"
            className="group inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-[#7755e8] shadow-lg transition active:scale-[.98]"
          >
            Request a Consultation
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Risk Disclosure */}
        <div
          className="rv mt-6 flex items-start gap-3 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-white p-4 sm:p-5"
          style={{ '--i': faqItems.length + 6 }}
        >
          <span className="ping grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#ff8b35] to-[#ff650d] text-white shadow-md shadow-orange-300/40">
            <ShieldAlert size={18} aria-hidden="true" />
          </span>

          <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-[13px]">
            <strong className="font-extrabold text-slate-800">
              Risk Disclosure:
            </strong>{' '}
            Investments in securities markets are subject to market risks.
            Research analysis cannot guarantee returns or eliminate losses.
            Review the applicable service terms and disclosures before subscribing.
          </p>
        </div>
      </div>
    </section>
  )
}