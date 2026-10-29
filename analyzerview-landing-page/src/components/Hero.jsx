import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  Send,
  ShieldCheck,
  FileText,
  Target,
  BrainCircuit,
} from 'lucide-react'

const PHOTO = '/images/Neeraj1.png'

const tickerItems = [
  'Research-Backed Market Insights',
  'Transparent Methodology',
  'Data-Driven Equity Research',
  'Defined Entry & Exit Levels',
  'Disciplined Risk Management',
  'Smarter Market Decisions',
]

/*
  Mobile: badges stay away from the face.
  - Research-Backed: top-left
  - Defined Levels: lower-right (over the suit)
  - Disciplined Strategy: bottom-left
  Desktop (sm+) positions are unchanged.
*/
const badges = [
  {
    icon: FileText,
    title: 'Research-Backed',
    subtitle: 'Data-driven analysis',
    aos: 'fade-right',
    iconBg: 'bg-gradient-to-br from-[#ff8b35] to-[#ff6a0b] shadow-[0_4px_12px_rgba(255,106,11,.2)]',
    pos: 'top-[2%] left-[2%] sm:top-[20%] sm:left-auto sm:right-[calc(50%_+_min(23%,175px)_-_28px)]',
    delay: '0s',
  },
  {
    icon: Target,
    title: 'Defined Levels',
    subtitle: 'Entry & exit planning',
    aos: 'fade-left',
    iconBg: 'bg-gradient-to-br from-[#ff8b35] to-[#ff6a0b] shadow-[0_4px_12px_rgba(255,106,11,.2)]',
    pos: 'bottom-[20%] right-[2%] sm:bottom-auto sm:top-[34%] sm:right-auto sm:left-[calc(50%_+_min(23%,175px)_-_28px)]',
    delay: '-2s',
  },
  {
    icon: BrainCircuit,
    title: 'Disciplined Strategy',
    subtitle: 'Structured risk framework',
    aos: 'fade-up',
    iconBg: 'bg-gradient-to-br from-[#8b5cf6] to-[#6544dc] shadow-[0_4px_12px_rgba(101,68,220,.25)]',
    pos: 'bottom-[5%] left-[2%] max-w-[62%] sm:max-w-[46%] sm:bottom-[12%] sm:left-auto sm:right-[calc(50%_+_min(23%,175px)_-_10px)]',
    delay: '-1.2s',
  },
]

function ResearchBadge({ icon: Icon, title, subtitle, aos, iconBg, pos, delay, aosDelay }) {
  return (
    <div
      data-aos={aos}
      data-aos-duration="750"
      data-aos-delay={aosDelay}
      style={{ animationDelay: delay }}
      className={`absolute z-[5] flex w-max max-w-[46%] items-center gap-[7px] rounded-xl border-[1.5px] border-[rgba(31,41,55,.72)] bg-white/95 px-[9px] py-2 leading-normal shadow-[0_9px_28px_rgba(15,23,42,.1)] backdrop-blur-md transition-[box-shadow,border-color] duration-200 animate-[hero-float_5.5s_ease-in-out_infinite] hover:border-[rgba(255,116,23,.65)] hover:shadow-[0_13px_30px_rgba(15,23,42,.14)] motion-reduce:animate-none sm:gap-[11px] sm:rounded-[15px] sm:px-3.5 sm:py-2.5 ${pos}`}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-white sm:h-[43px] sm:w-[43px] sm:rounded-[11px] ${iconBg}`}
      >
        <Icon
          strokeWidth={1.9}
          className="h-[18px] w-[18px] sm:h-[23px] sm:w-[23px]"
        />
      </span>

      <span className="flex min-w-0 flex-col gap-[3px] text-left sm:gap-1">
        <strong className="text-[10px] font-[850] leading-tight text-[#151b28] sm:whitespace-nowrap sm:text-xs">
          {title}
        </strong>
        <small className="text-[8px] font-semibold leading-snug text-slate-500 sm:whitespace-nowrap sm:text-[10px]">
          {subtitle}
        </small>
      </span>
    </div>
  )
}

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 25,
    })

    const timer = window.setTimeout(() => AOS.refresh(), 400)

    return () => window.clearTimeout(timer)
  }, [])

  const marqueeItems = [...tickerItems, ...tickerItems]

  return (
    <section
      id="home"
      className="relative isolate w-full overflow-hidden bg-[radial-gradient(ellipse_at_4%_55%,rgba(255,116,23,.12),transparent_39%),radial-gradient(ellipse_at_92%_23%,rgba(119,85,232,.14),transparent_40%),radial-gradient(ellipse_at_48%_75%,rgba(40,120,255,.07),transparent_38%),linear-gradient(135deg,#fffaf6,#fff_47%,#f7f5ff)] text-[#111827]"
    >
      {/* Keyframes only (Tailwind can't define these inline) */}
      <style>{`
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes hero-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -7px; }
        }
        @keyframes hero-portrait-in {
          from { opacity: 0; translate: 0 18px; }
          to { opacity: 1; translate: 0 0; }
        }
      `}</style>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,.075)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.075)_1px,transparent_1px)] bg-[length:27px_27px] opacity-25 [mask-image:linear-gradient(to_bottom,#000,transparent_90%)] sm:bg-[length:34px_34px] sm:opacity-100" />

      {/* Announcement ticker */}
      <div className="group relative z-[3] w-full overflow-hidden bg-gradient-to-r from-[#ff7b19] to-[#ff650d] shadow-[0_3px_14px_rgba(255,105,13,.16)]">
        <div className="flex w-max animate-[hero-marquee_38s_linear_infinite] will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="inline-flex shrink-0 items-center gap-[13px] whitespace-nowrap px-[9px] py-3 text-[10px] font-extrabold leading-tight text-white sm:gap-[22px] sm:px-3 sm:py-3.5 sm:text-[13px]"
            >
              <span>{item}</span>
              <span className="text-lg text-white/85">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-[1] mx-auto w-full max-w-[1180px] px-2.5 pt-8 text-center sm:px-6 sm:pt-10 md:pt-12">
        <div
          data-aos="fade-down"
          className="mb-[17px] inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[rgba(255,116,23,.28)] bg-white/85 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.02em] text-[#c54b09] shadow-[0_5px_20px_rgba(15,23,42,.035)] sm:mb-5 sm:gap-[9px] sm:px-[15px] sm:py-[9px] sm:text-xs sm:tracking-[.045em]"
        >
          <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#13a66a] shadow-[0_0_0_4px_rgba(19,166,106,.12)]" />
          Structured Equity Research
        </div>

        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="mx-auto max-w-full text-[min(7.3vw,42px)] font-[850] leading-[1.17] tracking-[-.05em] text-[#111827] [overflow-wrap:normal] sm:max-w-[760px] sm:text-[clamp(39px,6.3vw,56px)] sm:leading-[1.12] sm:tracking-[-.052em] sm:[text-wrap:balance] md:max-w-[1060px] md:text-[clamp(40px,5vw,65px)]"
        >
          <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">
            Start Your Smarter
          </span>{' '}
          <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">
            Trading Journey With
          </span>{' '}
          <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">
            <span className="text-[#2878ff]">SEBI-Registered</span>{' '}
            <span className="text-[#f04b0b]">Research</span>
          </span>
        </h1>

        <h2
          data-aos="fade-up"
          data-aos-delay="180"
          className="mx-auto mt-[17px] max-w-[800px] text-[clamp(21px,5.4vw,27px)] font-[850] leading-[1.32] tracking-[-.035em] text-[#202b3d] [text-wrap:balance] sm:mt-5 sm:text-[clamp(21px,2.4vw,29px)] sm:leading-[1.35]"
        >
          We Don&apos;t Chase the Market.
          <br />
          <span className="text-[#7755e8]">We Decode It.</span>
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="250"
          className="mx-auto mt-3 max-w-[820px] px-1.5 text-sm font-medium leading-[1.75] text-slate-600 [text-wrap:pretty] sm:mt-[15px] sm:px-0 sm:text-[clamp(15px,1.35vw,18px)]"
        >
          Make sense of market opportunities with data-driven equity research,
          clearly defined entry and exit levels, and a disciplined
          risk-to-reward framework.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="320"
          className="mt-[21px] flex w-full justify-center sm:mt-6"
        >
          <a
            href="#consult"
            className="group relative isolate inline-flex min-h-[52px] w-full max-w-[370px] items-center justify-center gap-3 overflow-hidden rounded-[14px] bg-[linear-gradient(105deg,#ff7417_0%,#ed6b78_48%,#347cf6_100%)] px-4 py-[13px] text-[15px] font-extrabold text-white no-underline shadow-[0_9px_26px_rgba(119,85,232,.22)] transition duration-[250ms] before:absolute before:inset-0 before:-z-10 before:-translate-x-[130%] before:bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,.3)_48%,transparent_75%)] before:transition-transform before:duration-700 before:content-[''] hover:-translate-y-[3px] hover:shadow-[0_14px_35px_rgba(119,85,232,.3)] hover:before:translate-x-[130%] motion-reduce:transition-none sm:min-h-[54px] sm:w-auto sm:min-w-[310px] sm:max-w-none sm:rounded-[15px] sm:px-7 sm:py-3.5 sm:text-[17px]"
          >
            Explore Our Research
            <Send
              size={19}
              className="shrink-0 transition-transform duration-[250ms] group-hover:translate-x-[3px] group-hover:-translate-y-[2px]"
            />
          </a>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mx-auto mt-3 flex max-w-[330px] items-center justify-center gap-[7px] text-[11px] font-semibold leading-relaxed text-slate-500 sm:mt-[13px] sm:max-w-none sm:text-xs"
        >
          <ShieldCheck size={16} className="shrink-0 text-[#13a66a]" />
          Less noise. More analysis. A clearer research process.
        </div>

        {/* Portrait (arch) with floating badges */}
        <div className="relative isolate mx-auto mt-6 w-full max-w-full sm:mt-7 sm:max-w-[680px] md:max-w-[760px]">
          <div className="relative flex w-full items-end justify-center overflow-visible leading-[0]">
            {/* Mobile: 92% wide, fixed 440px tall. sm+: natural photo height */}
            <div className="pointer-events-none relative z-[2] h-[440px] w-[92%] max-w-[440px] animate-[hero-portrait-in_.9s_ease_both] overflow-hidden rounded-t-full border-4 border-b-0 border-white bg-gradient-to-br from-[#efeaff] to-[#fff2e8] shadow-[0_22px_50px_rgba(15,23,42,.18)] motion-reduce:animate-none sm:h-auto sm:w-1/2 sm:max-w-[330px] sm:border-[5px] md:w-[46%] md:max-w-[350px]">
              {!photoFailed ? (
                <img
                  src={PHOTO}
                  alt="Research professional portrait"
                  onError={() => setPhotoFailed(true)}
                  className="block h-full w-full object-cover object-top sm:h-auto"
                />
              ) : (
                <div className="grid h-full min-h-[420px] w-full place-items-center text-[100px] font-[850] leading-none text-[#2878ff]">
                  N
                </div>
              )}
            </div>

            {badges.map((badge, index) => (
              <ResearchBadge
                key={badge.title}
                {...badge}
                aosDelay={500 + index * 120}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Closing message */}
      <div className="relative z-[3] flex w-full items-center justify-center bg-[linear-gradient(100deg,#101827,#20183f)] px-4 py-5 text-center text-white before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,#ff7417,#ed6b78_50%,#347cf6)] before:content-[''] sm:px-5 sm:py-[26px]">
        <p className="m-0 max-w-[300px] text-[17px] font-extrabold leading-snug tracking-[-.01em] [text-wrap:balance] sm:max-w-[760px] sm:text-[clamp(18px,2vw,24px)]">
          Better decisions start with{' '}
          <span className="text-[#ff994d]">better research.</span>
        </p>
      </div>
    </section>
  )
}
