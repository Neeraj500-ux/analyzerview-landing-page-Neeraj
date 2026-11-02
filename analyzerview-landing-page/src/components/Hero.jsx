
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import {
  Send,
  ShieldCheck,
  FileText,
  BrainCircuit,
  Cpu,
} from 'lucide-react'

const PHOTO = '/images/Neeraj2.png'

const tickerItems = [
  'Research-Backed Market Insights',
  'Transparent Methodology',
  'Data-Driven Equity Research',
  'Defined Entry & Exit Levels',
  'Disciplined Risk Management',
  'Smarter Market Decisions',
]

const badges = [
  {
    icon: FileText,
    title: 'Institutional-Grade',
    subtitle: 'Research Intelligence',
    position: 'left-0 top-[10%] sm:left-0 sm:top-[20%]',
    color: 'orange',
  },
  {
    icon: Cpu,
    title: 'Systematic & Algo-Driven',
    subtitle: 'Strategies',
    position: 'right-0 top-[62%] sm:right-0 sm:top-[44%] md:top-[36%]',
    color: 'blue',
  },
  {
    icon: BrainCircuit,
    title: 'Transparent, SEBI-Registered',
    subtitle: 'Research',
    position: 'bottom-[3%] left-0 sm:bottom-[12%] sm:left-0',
    color: 'purple',
  },
]

const BADGE_BASE =
  'absolute flex max-w-[60%] items-center gap-2 rounded-xl border bg-white/95 p-2 shadow-[0_12px_30px_rgba(15,23,42,.18)] backdrop-blur-md sm:max-w-[290px] sm:gap-3 sm:rounded-2xl sm:p-3'

const ICON_BASE =
  'grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white shadow-md sm:h-11 sm:w-11 sm:rounded-xl'

const COLOR_STYLES = {
  orange: {
    card: 'border-orange-200 bg-gradient-to-r from-orange-50 to-white',
    icon: 'from-[#ff8b35] to-[#ff650d] shadow-orange-300/60',
    subtitle: 'text-[#d9570b]',
  },
  blue: {
    card: 'border-blue-200 bg-gradient-to-r from-blue-50 to-white',
    icon: 'from-[#4f9bff] to-[#2878ff] shadow-blue-300/60',
    subtitle: 'text-[#2878ff]',
  },
  purple: {
    card: 'border-purple-200 bg-gradient-to-r from-purple-50 to-white',
    icon: 'from-[#8b5cf6] to-[#6544dc] shadow-purple-300/60',
    subtitle: 'text-[#7755e8]',
  },
}

function ResearchBadge(props) {
  const Icon = props.icon
  const styles = COLOR_STYLES[props.color] || COLOR_STYLES.orange

  return (
    <div
      className={
        BADGE_BASE + ' ' + styles.card + ' ' + props.position
      }
    >
      <span className={ICON_BASE + ' ' + styles.icon}>
        <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
      </span>

      <span className="min-w-0 text-left">
        <strong className="block text-[10.5px] font-extrabold leading-snug text-slate-900 sm:text-[13px]">
          {props.title}
        </strong>

        <small
          className={
            'mt-0.5 block text-[9.5px] font-bold leading-snug sm:text-[11px] ' +
            styles.subtitle
          }
        >
          {props.subtitle}
        </small>
      </span>
    </div>
  )
}

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 20,
      disable: function () {
        return window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
      },
    })

    const timer = window.setTimeout(function () {
      AOS.refresh()
    }, 300)

    return function () {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative isolate w-full min-w-0 overflow-x-clip bg-[radial-gradient(ellipse_at_4%_55%,rgba(255,116,23,.14),transparent_39%),radial-gradient(ellipse_at_92%_23%,rgba(119,85,232,.16),transparent_40%),radial-gradient(ellipse_at_48%_75%,rgba(40,120,255,.08),transparent_38%),linear-gradient(135deg,#fffaf6,#fff_47%,#f7f5ff)] text-[#111827]"
    >
      <style>{`
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes hero-pulse {
          0%, 100% {
            opacity: .55;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: .95;
            transform: translate(-50%, -50%) scale(1.06);
          }
        }

        @keyframes hero-shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .hero-shine-text {
          background-size: 200% auto;
          animation: hero-shine 5s linear infinite;
        }

        .hero-marquee {
          animation: hero-marquee 38s linear infinite;
          will-change: transform;
        }

        .hero-badge-float {
          animation: hero-float 5s ease-in-out infinite;
        }

        .hero-glow {
          animation: hero-pulse 6s ease-in-out infinite;
        }

        .hero-badge-delay-one {
          animation-delay: -2s;
        }

        .hero-badge-delay-two {
          animation-delay: -1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee,
          .hero-badge-float,
          .hero-glow,
          .hero-shine-text {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.07)_1px,transparent_1px)] bg-[length:28px_28px] opacity-50 sm:bg-[length:34px_34px]"
      />

      {/* Announcement ticker */}
      <div className="group relative z-20 w-full overflow-hidden bg-gradient-to-r from-[#ff7b19] to-[#ff650d]">
        <div className="hero-marquee flex w-max group-hover:[animation-play-state:paused]">
          {[...tickerItems, ...tickerItems].map(function (item, index) {
            return (
              <div
                key={item + '-' + index}
                className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap px-3 py-3 text-[11px] font-extrabold text-white sm:gap-5 sm:px-4 sm:py-3.5 sm:text-[13px]"
              >
                <span>{item}</span>
                <span className="text-lg text-white/80" aria-hidden="true">
                  |
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-[1] mx-auto w-full max-w-[1180px] px-4 pb-8 pt-8 text-center sm:px-6 sm:pb-10 sm:pt-10 md:pt-12">
        <div
          data-aos="fade-down"
          className="mx-auto mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-orange-200 bg-white/90 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-[#bd4c0b] shadow-sm sm:mb-6 sm:gap-2.5 sm:px-4 sm:text-xs"
        >
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
          <span>Structured Equity Research</span>
        </div>

        {/* Main heading */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="-mx-3 w-[calc(100%+1.5rem)] text-[clamp(17px,5.8vw,64px)] font-black leading-[1.28] tracking-[-0.045em] text-[#111827] sm:mx-auto sm:w-full sm:text-[clamp(17px,5.3vw,64px)] sm:tracking-[-0.04em]"
        >
          <span className="block whitespace-nowrap">
            Start Your{' '}
            <span className="hero-shine-text bg-gradient-to-r from-[#ff7417] via-[#ffb347] to-[#ff7417] bg-clip-text text-transparent">
              Smarter
            </span>{' '}
            Trading
          </span>

          <span className="block whitespace-nowrap">
            Journey With{' '}
            <span className="hero-shine-text bg-gradient-to-r from-[#2878ff] via-[#7755e8] to-[#2878ff] bg-clip-text text-transparent">
              SEBI-Registered
            </span>
          </span>

          <span className="mt-2 block whitespace-nowrap sm:mt-3">
            <span className="inline-block -rotate-1 rounded-xl bg-gradient-to-r from-[#ff7417] to-[#f04b0b] px-3 py-0.5 text-white shadow-[0_8px_22px_rgba(240,75,11,.35)] sm:rounded-2xl sm:px-5 sm:py-1">
              Research Analyst.
            </span>
          </span>
        </h1>

        {/* Supporting heading */}
        <h2
          data-aos="fade-up"
          data-aos-delay="180"
          className="mx-auto mt-5 max-w-[800px] text-[clamp(21px,5.5vw,28px)] font-extrabold leading-[1.3] tracking-[-0.035em] text-[#202b3d] sm:mt-6 sm:text-[clamp(23px,2.5vw,30px)]"
        >
          We Don&apos;t Chase the Market.
          <span className="mt-1 block text-[#7755e8]">We Decode It.</span>
        </h2>

        {/* Description */}
        <p
          data-aos="fade-up"
          data-aos-delay="250"
          className="mx-auto mt-4 max-w-[760px] text-[15px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base md:text-lg"
        >
          Make sense of market opportunities with data-driven equity research,
          clearly defined entry and exit levels, and a disciplined
          risk-to-reward framework.
        </p>

        {/* Main CTA */}
        <div
          data-aos="fade-up"
          data-aos-delay="320"
          className="mt-6 flex w-full justify-center sm:mt-7"
        >
          <a
            href="#consult"
            className="group inline-flex min-h-[60px] w-full max-w-[420px] items-center justify-center gap-3 rounded-[16px] bg-gradient-to-r from-[#ff7417] via-[#ed6b78] to-[#347cf6] px-5 py-3.5 text-center text-[18px] font-extrabold leading-snug text-white shadow-[0_10px_28px_rgba(119,85,232,.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(119,85,232,.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 sm:min-h-[66px] sm:w-auto sm:max-w-none sm:px-10 sm:text-[21px]"
          >
            <span>Explore Our Research</span>
            <Send
              size={24}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Trust note */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mx-auto mt-4 flex max-w-full items-start justify-center gap-2 text-[11px] font-semibold leading-relaxed text-slate-500 sm:items-center sm:text-xs"
        >
          <ShieldCheck
            size={16}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-emerald-600 sm:mt-0"
          />
          <span>Less noise. More analysis. A clearer research process.</span>
        </div>

        {/* Portrait and research badges */}
        <div className="relative mx-auto mt-9 w-full max-w-[680px] sm:mt-12 md:max-w-[760px]">
          <div
            aria-hidden="true"
            className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(119,85,232,.28),rgba(255,116,23,.18)_55%,transparent_72%)] blur-2xl sm:h-[460px] sm:w-[460px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[2%] h-[94%] w-[80%] max-w-[370px] -translate-x-1/2 rounded-t-full border-2 border-dashed border-[#7755e8]/25 sm:w-[54%] sm:max-w-[390px]"
          />

          <div className="relative mx-auto flex min-h-[370px] w-full items-end justify-center sm:min-h-[470px] md:min-h-[510px]">
            <div className="relative z-[2] h-[360px] w-[68%] max-w-[330px] overflow-hidden rounded-t-full border-4 border-b-0 border-white bg-gradient-to-br from-[#efeaff] to-[#fff2e8] shadow-[0_20px_45px_rgba(15,23,42,.16)] sm:h-[470px] sm:w-1/2 sm:max-w-[350px] sm:border-[5px] md:h-[510px]">
              {!photoFailed ? (
                <img
                  src={PHOTO}
                  alt="Research professional portrait"
                  onError={function () {
                    setPhotoFailed(true)
                  }}
                  className="block h-full w-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <div
                  role="img"
                  aria-label="Portrait placeholder"
                  className="grid h-full w-full place-items-center text-7xl font-extrabold text-[#2878ff] sm:text-9xl"
                >
                  N
                </div>
              )}
            </div>

            {badges.map(function (badge, index) {
              let animationClass = ''

              if (index === 1) {
                animationClass = ' hero-badge-delay-one'
              } else if (index === 2) {
                animationClass = ' hero-badge-delay-two'
              }

              return (
                <div
                  key={badge.title + badge.subtitle}
                  className={
                    'hero-badge-float pointer-events-none absolute inset-0 z-[5]' +
                    animationClass
                  }
                >
                  <ResearchBadge
                    icon={badge.icon}
                    title={badge.title}
                    subtitle={badge.subtitle}
                    position={badge.position}
                    color={badge.color}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Closing statement */}
      <div className="relative z-[3] flex w-full items-center justify-center bg-gradient-to-r from-[#101827] to-[#20183f] px-4 py-5 text-center text-white before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-[#ff7417] before:via-[#ed6b78] before:to-[#347cf6] before:content-[''] sm:px-6 sm:py-7">
        <p className="max-w-[760px] text-base font-extrabold leading-snug sm:text-[22px]">
          Better decisions start with{' '}
          <span className="text-[#ff994d]">better research.</span>
        </p>
      </div>
    </section>
  )
}

