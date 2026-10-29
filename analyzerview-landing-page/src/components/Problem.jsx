import {
  AlertOctagon,
  SearchX,
  HeartCrack,
  MessageSquareWarning,
  ShieldAlert,
  TrendingDown,
  Repeat,
  ArrowRight,
} from 'lucide-react'
import { painPoints } from '../data/content'

const icons = [
  SearchX,
  HeartCrack,
  MessageSquareWarning,
  ShieldAlert,
  TrendingDown,
  Repeat,
]

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#fff1ef,#fff6f5_28%,#fff_65%)] px-4 py-16 sm:px-6 sm:py-24"
    >
      <style>{`
        @keyframes problem-pulse {
          0%, 100% { opacity: .55; transform: translateX(-50%) scale(1); }
          50% { opacity: .9; transform: translateX(-50%) scale(1.05); }
        }

        @keyframes problem-alert {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,.35); }
          50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }

        .problem-glow {
          animation: problem-pulse 6s ease-in-out infinite;
        }

        .problem-chip {
          animation: problem-alert 2.4s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .problem-glow,
          .problem-chip {
            animation: none !important;
          }
        }
      `}</style>

      {/* Top warning line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#dc2626,#ff7417,#dc2626)]"
      />

      {/* Dotted background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(220,38,38,.12)_1px,transparent_1px)] bg-[length:22px_22px] opacity-60 [mask-image:linear-gradient(180deg,#000,transparent_70%)]"
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="problem-glow pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[680px] max-w-full -translate-x-1/2 rounded-full bg-red-500/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1100px]">
        {/* Heading */}
        <div className="text-center">
          <span
            data-aos="fade-down"
            className="problem-chip inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-red-600 shadow-sm sm:text-xs"
          >
            <AlertOctagon size={15} aria-hidden="true" />
            Reality check
          </span>

          <h2
            data-aos="zoom-in"
            className="mt-5 font-extrabold leading-[1.05] tracking-[-.04em] text-red-600"
          >
            <span className="block bg-gradient-to-b from-[#ef4444] to-[#b91c1c] bg-clip-text text-[clamp(64px,16vw,150px)] text-transparent drop-shadow-[0_10px_24px_rgba(220,38,38,.25)]">
              STOP
            </span>

            <span className="mx-auto mt-1 block max-w-[900px] text-[clamp(26px,5.4vw,56px)]">
              before you lose all your money in trading.
            </span>
          </h2>

          {/* Warning tape divider */}
          <div
            aria-hidden="true"
            className="mx-auto mt-7 h-2 w-full max-w-[260px] rounded-full bg-[repeating-linear-gradient(135deg,#dc2626_0,#dc2626_10px,#fecaca_10px,#fecaca_20px)] opacity-80"
          />
        </div>

        {/* Pain points */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {painPoints.map((text, i) => {
            const Icon = icons[i % icons.length]

            return (
              <div
                key={text}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-[0_8px_26px_rgba(220,38,38,.07)] transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_18px_38px_rgba(220,38,38,.16)]"
              >
                {/* Left accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-50 bg-gradient-to-b from-red-500 to-orange-400 opacity-60 transition duration-300 group-hover:scale-y-100 group-hover:opacity-100"
                />

                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-red-50 to-orange-50 text-red-600 ring-1 ring-red-100 transition duration-300 group-hover:bg-red-600 group-hover:from-red-600 group-hover:to-red-600 group-hover:text-white group-hover:ring-red-600">
                  <Icon size={24} strokeWidth={1.9} aria-hidden="true" />
                </span>

                <p className="pt-0.5 text-[15.5px] font-bold leading-snug text-slate-800">
                  {text}
                </p>
              </div>
            )
          })}
        </div>

        {/* Closing message and call to action */}
        <div
          data-aos="fade-up"
          className="mx-auto mt-12 max-w-[780px] rounded-3xl border border-red-100 bg-white/80 px-5 py-8 text-center shadow-[0_14px_40px_rgba(220,38,38,.08)] backdrop-blur-sm sm:mt-14 sm:px-10 sm:py-10"
        >
          <p className="text-lg font-semibold leading-relaxed text-slate-700 sm:text-xl">
            If you relate to any of these,{' '}
            <span className="font-extrabold text-red-600">
              you are trading the wrong way
            </span>
            , and it can cost you your capital. To prevent all of these:
          </p>

          <a
            href="#consult"
            className="group mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[15px] bg-[linear-gradient(105deg,#ff7417_0%,#ed6b78_48%,#347cf6_100%)] px-6 py-3.5 text-base font-extrabold text-white shadow-[0_10px_28px_rgba(119,85,232,.25)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(119,85,232,.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 sm:w-auto sm:px-8 sm:text-[17px]"
          >
            Step into smarter market approach
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}