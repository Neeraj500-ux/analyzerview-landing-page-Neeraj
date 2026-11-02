
import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, Clock, Lock, Mail, MapPin,
  Loader2, Pencil, Phone, Send, ShieldCheck, Target,
  TrendingUp, User,
} from 'lucide-react'

/* ==========================================================
   GOOGLE SHEETS CONNECTION
   ========================================================== */

const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbzbBhBdjTeJYk6ebuJHLSGwD5gQOxuqSHhq3td6feBYYj56c_ywJQQO0Fpw3MovKWUm/exec'

const WHATSAPP_NUMBER = '919147743168'

const Q = [
  {
    key: 'experience',
    label: 'How long have you been active in the stock market?',
    options: ['New to Markets', 'Less than 1 Year', '1–3 Years', '3+ Years'],
  },
  {
    key: 'segment',
    label: 'Which market segment are you mainly interested in?',
    options: [
      'Equity Investing (Delivery)',
      'Swing / Positional Trading',
      'Futures & Options (F&O)',
      'Index Options / Learning & Research',
    ],
  },
  {
    key: 'capital',
    label: 'What is your current trading capital range?',
    options: [
      'Below ₹50 thousand',
      '₹1 lakh – ₹5 lakh',
      '₹5 lakh – ₹10 lakh',
      'Above ₹10 lakh',
    ],
  },
  {
    key: 'start',
    label: 'When are you looking to get started?',
    options: [
      'Immediately',
      'Within the next 7 days',
      'Within the next 30 days',
      'Just exploring my options',
    ],
  },
]

const STEPS = [
  { name: 'Contact', icon: User },
  { name: 'Experience', icon: TrendingUp },
  { name: 'Needs', icon: Target },
  { name: 'Consent', icon: ShieldCheck },
]

const NEXT = [
  ['Share your details', 'Four short steps. It takes about a minute.'],
  ['We review your needs', 'Our team reads your answers before reaching out.'],
  ['Get a research-led call', 'We explain our research services and how they may fit you.'],
]

const css = `
.lf .step-in{animation:lf-in .45s cubic-bezier(.2,.8,.2,1) both}
.lf .rise{animation:lf-rise .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*110ms)}
.lf .shake{animation:lf-shake .4s ease-in-out}
.lf .pop{animation:lf-pop .4s cubic-bezier(.3,1.6,.5,1) both}
.lf .pulse-ring{animation:lf-pulse 2s ease-out infinite}
.lf .blob{animation:lf-blob 14s ease-in-out infinite alternate}
.lf .btn-shine{position:relative;overflow:hidden}
.lf .btn-shine::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.45) 50%,transparent 65%);transform:translateX(-130%);animation:lf-shine 3.6s ease-in-out infinite 1s}
.lf .tick{stroke-dasharray:60;stroke-dashoffset:60;animation:lf-tick .7s ease-out forwards .35s}
.lf .ring{stroke-dasharray:190;stroke-dashoffset:190;animation:lf-tick .9s ease-out forwards}
@keyframes lf-in{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}
@keyframes lf-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes lf-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
@keyframes lf-pop{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
@keyframes lf-pulse{0%{box-shadow:0 0 0 0 rgba(27,92,240,.45)}100%{box-shadow:0 0 0 14px rgba(27,92,240,0)}}
@keyframes lf-blob{from{transform:translate(0,0) scale(1)}to{transform:translate(36px,-28px) scale(1.15)}}
@keyframes lf-shine{0%,55%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
@keyframes lf-tick{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.lf *,.lf *::after{animation:none!important}.lf .tick,.lf .ring{stroke-dashoffset:0}}
`

/* ---------- Choice cards ---------- */

function Choice({ q, value, onChange, error }) {
  return (
    <fieldset className="mt-7 first:mt-0">
      <legend className="text-[15px] font-extrabold leading-snug text-[#0a1f5c] sm:text-base">
        {q.label}
      </legend>

      <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
        {q.options.map((o) => {
          const on = value === o

          return (
            <label
              key={o}
              className={`group relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-[14px] font-semibold leading-snug transition-all duration-200 focus-within:ring-4 focus-within:ring-[#1b5cf0]/20 ${
                on
                  ? 'border-[#1b5cf0] bg-gradient-to-br from-[#eaf1ff] to-white text-[#1447c4] shadow-[0_8px_20px_-8px_rgba(27,92,240,.45)]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-[#1b5cf0]/50 hover:bg-[#f6f9ff]'
              }`}
            >
              <input
                type="radio"
                name={q.key}
                value={o}
                checked={on}
                onChange={() => onChange(q.key, o)}
                className="sr-only"
              />

              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 ${
                  on
                    ? 'border-[#1b5cf0] bg-[#1b5cf0]'
                    : 'border-slate-300 bg-white group-hover:border-[#1b5cf0]/60'
                }`}
              >
                {on && <Check size={14} strokeWidth={4} className="pop text-white" />}
              </span>

              {o}
            </label>
          )
        })}
      </div>

      {error && (
        <p role="alert" className="mt-2.5 text-xs font-bold text-red-600">
          Please select an option.
        </p>
      )}
    </fieldset>
  )
}

/* ---------- Input fields ---------- */

function Field({
  k,
  label,
  icon: Icon,
  type = 'text',
  ph,
  mode,
  auto,
  d,
  set,
  errors,
}) {
  const err = errors[k]

  return (
    <div>
      <label htmlFor={k} className="text-[13px] font-extrabold text-slate-700">
        {label}
      </label>

      <div className="group relative mt-1.5">
        <Icon
          size={18}
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            err
              ? 'text-red-400'
              : 'text-slate-400 group-focus-within:text-[#1b5cf0]'
          }`}
        />

        <input
          id={k}
          name={k}
          type={type}
          inputMode={mode}
          autoComplete={auto}
          placeholder={ph}
          value={d[k]}
          aria-invalid={!!err}
          onChange={(e) => set(k, e.target.value)}
          className={`w-full rounded-2xl border-2 bg-white py-3.5 pl-11 pr-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#1b5cf0] focus:ring-4 focus:ring-[#1b5cf0]/15 ${
            err
              ? 'shake border-red-400 bg-red-50/50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        />
      </div>

      {err && (
        <p role="alert" className="mt-1.5 text-xs font-bold text-red-600">
          {err}
        </p>
      )}
    </div>
  )
}

/* ---------- Stepper ---------- */

function Stepper({ step }) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between text-xs font-extrabold text-slate-500">
        <span>Step {step + 1} of 4</span>
        <span className="rounded-full bg-[#eaf1ff] px-2.5 py-1 text-[#1b5cf0]">
          {Math.round(((step + 1) / 4) * 100)}%
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-5 right-5 top-5 h-[3px] -translate-y-1/2 rounded-full bg-slate-200 sm:left-6 sm:right-6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1b5cf0] to-[#4f8bff] transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <ol className="relative flex justify-between">
          {STEPS.map(({ name, icon: Icon }, i) => {
            const completed = i < step
            const current = i === step

            return (
              <li key={name} className="flex w-[25%] flex-col items-center">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-all duration-300 sm:h-11 sm:w-11 ${
                    completed
                      ? 'border-transparent bg-gradient-to-b from-[#3d7bff] to-[#1b5cf0] text-white shadow-[0_6px_14px_-4px_rgba(27,92,240,.6)]'
                      : current
                        ? 'pulse-ring border-[#1b5cf0] bg-white text-[#1b5cf0]'
                        : 'border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  {completed ? (
                    <Check size={18} strokeWidth={3.5} />
                  ) : (
                    <Icon size={18} />
                  )}
                </span>

                <span
                  className={`mt-2 text-[11px] font-bold sm:text-xs ${
                    current
                      ? 'text-[#0a1f5c]'
                      : completed
                        ? 'text-[#1b5cf0]'
                        : 'text-slate-400'
                  }`}
                >
                  {name}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

/* ---------- Review rows ---------- */

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
      <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 sm:w-28 sm:shrink-0">
        {label}
      </span>
      <span className="break-words text-sm font-semibold text-[#0a1f5c]">
        {value || '-'}
      </span>
    </div>
  )
}

function ReviewBlock({ title, onEdit, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-extrabold text-[#0a1f5c]">
          {title}
        </span>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-extrabold text-[#1b5cf0] transition hover:bg-[#eaf1ff]"
        >
          <Pencil size={13} /> Edit
        </button>
      </div>

      <div className="space-y-2">{children}</div>
    </div>
  )
}

/* ==========================================================
   MAIN LEAD FORM
   ========================================================== */

export default function LeadForm() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})

  const [d, setD] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    experience: '',
    segment: '',
    capital: '',
    start: '',
    consent: false,
  })

  const card = useRef(null)
  const first = useRef(true)

  const set = (k, v) => {
    setD((p) => ({ ...p, [k]: v }))
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p))
  }

  /* Scroll form into view on step change */

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }

    const el = card.current

    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [step, done])

  /* Validation */

  const validate = () => {
    const e = {}

    if (step === 0) {
      if (d.name.trim().length < 2) {
        e.name = 'Enter your full name'
      }

      const cleanMobile = d.mobile
        .replace(/[\s-]/g, '')
        .replace(/^(\+91|91|0)/, '')

      if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
        e.mobile = 'Enter a valid 10-digit mobile number'
      }

      if (!/^\S+@\S+\.\S+$/.test(d.email)) {
        e.email = 'Enter a valid email'
      }

      if (d.city.trim().length < 2) {
        e.city = 'Enter your city'
      }
    }

    if (step === 1) {
      ;['experience', 'segment'].forEach((k) => {
        if (!d[k]) e[k] = true
      })
    }

    if (step === 2) {
      ;['capital', 'start'].forEach((k) => {
        if (!d[k]) e[k] = true
      })
    }

    if (step === 3 && !d.consent) {
      e.consent = 'Please provide consent to continue'
    }

    setErrors(e)

    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validate()) {
      setStep((s) => s + 1)
    }
  }

  /* ========================================================
     GOOGLE SHEETS SUBMISSION
     ======================================================== */

  const submit = async (ev) => {
    ev.preventDefault()

    if (step < 3) {
      next()
      return
    }

    if (!validate()) return

    if (!FORM_ENDPOINT) {
      setErrors({
        consent: 'Google Sheets endpoint is not configured.',
      })
      return
    }

    setSending(true)
    setErrors({})

    try {
      const payload = {
        ...d,
        name: d.name.trim(),
        mobile: d.mobile.trim(),
        email: d.email.trim(),
        city: d.city.trim(),
        submittedAt: new Date().toISOString(),
      }

      /*
        Apps Script reads:
        e.parameter.payload

        no-cors is used because Apps Script web apps
        can cause browser CORS/redirect issues.
      */

      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
          payload: JSON.stringify(payload),
        }),
      })

      /*
        no-cors returns an opaque response.
        The browser cannot confirm whether the row
        was successfully inserted into Google Sheets.
        Verify by checking your spreadsheet.
      */

      setDone(true)
    } catch (error) {
      console.error('Google Sheets submission error:', error)

      setErrors({
        consent: 'Unable to submit. Please try again.',
      })
    } finally {
      setSending(false)
    }
  }

  /* WhatsApp message */

  const whatsappMessage = encodeURIComponent(
    `Hello AnalyzerView Team,

I have submitted the research consultation form.

Name: ${d.name}
Mobile: ${d.mobile}
Email: ${d.email}
City: ${d.city}

I would like to know more about your research services.`
  )

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  return (
    <section
      id="consult"
      className="lf relative scroll-mt-4 overflow-hidden bg-gradient-to-b from-white via-[#f3f7ff] to-[#e9f0ff] px-4 py-14 sm:px-6 sm:py-24"
    >
      <style>{css}</style>

      {/* Background glows */}

      <div className="blob pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#9db8ff]/35 blur-3xl" />

      <div
        className="blob pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#7ee8b0]/30 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />

      <div className="relative mx-auto max-w-[1100px]">

        {/* Heading */}

        <div className="text-center">
          <div className="rise inline-flex items-center gap-2 rounded-full border border-[#1b5cf0]/15 bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#1b5cf0] shadow-sm sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-[#1b5cf0]" />
            Request a research consultation
          </div>

          <h2
            className="rise mt-4 text-[clamp(28px,4.6vw,46px)] font-extrabold leading-[1.1] tracking-[-.03em] text-[#0a1f5c]"
            style={{ '--i': 1 }}
          >
            Tell us a little{' '}
            <span className="bg-gradient-to-r from-[#1b5cf0] to-[#3d9bff] bg-clip-text text-transparent">
              about you
            </span>
          </h2>

          <p
            className="rise mx-auto mt-3 max-w-[520px] text-base font-medium text-slate-600"
            style={{ '--i': 2 }}
          >
            A quick four-step form so we can understand what you are looking for.
          </p>

          {/* Mobile trust chips */}

          <div
            className="rise mt-5 flex flex-wrap justify-center gap-2 lg:hidden"
            style={{ '--i': 3 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0a1f5c] shadow-sm">
              <Clock size={14} className="text-[#1b5cf0]" />
              About a minute
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0a1f5c] shadow-sm">
              <Lock size={14} className="text-[#1b5cf0]" />
              Never share OTP
            </span>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-8">

          {/* Left panel */}

          <aside
            className="rise relative hidden overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0a1f5c] via-[#112f8c] to-[#1b5cf0] p-8 text-white shadow-[0_24px_50px_-16px_rgba(10,31,92,.6)] lg:sticky lg:top-6 lg:block"
            style={{ '--i': 3 }}
          >
            <div className="blob pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div
              className="blob pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#4f8bff]/30 blur-2xl"
              style={{ animationDelay: '-5s' }}
            />

            <h3 className="relative text-xl font-extrabold tracking-tight">
              What happens next
            </h3>

            <ol className="relative mt-6 space-y-6">
              {NEXT.map(([t, s], i) => (
                <li key={t} className="relative flex gap-4">
                  {i < NEXT.length - 1 && (
                    <span className="absolute left-[17px] top-10 h-[calc(100%-8px)] w-px bg-white/25" />
                  )}

                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-extrabold ring-1 ring-white/30">
                    {i + 1}
                  </span>

                  <div>
                    <div className="text-[15px] font-extrabold">{t}</div>
                    <p className="mt-1 text-[13.5px] font-medium leading-relaxed text-white/75">
                      {s}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="relative mt-8 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-[13px] font-medium leading-relaxed text-white/85 ring-1 ring-white/15">
              <Lock size={18} className="mt-0.5 shrink-0" />
              Never share your trading account password or OTP with anyone.
            </div>
          </aside>

          {/* Form card */}

          <div
            ref={card}
            className="rise scroll-mt-4 rounded-[30px] border-2 border-white bg-white/90 p-5 shadow-[0_24px_60px_-18px_rgba(27,92,240,.3)] backdrop-blur sm:p-8"
            style={{ '--i': 4 }}
          >
            {done ? (

              /* SUCCESS SCREEN */

              <div className="py-6 text-center">

                {/* Animated success icon */}

                <svg
                  viewBox="0 0 80 80"
                  className="mx-auto h-24 w-24"
                  aria-hidden="true"
                >
                  <circle cx="40" cy="40" r="30" fill="#e8faf0" />

                  <circle
                    className="ring"
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />

                  <path
                    className="tick"
                    d="M27 41 L36 50 L54 31"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h3 className="mt-5 text-2xl font-extrabold text-[#0a1f5c] sm:text-[28px]">
                  Thank you, {d.name.trim().split(' ')[0]}.
                </h3>

                <p className="mx-auto mt-3 max-w-[480px] text-[15px] font-medium leading-relaxed text-slate-600">
                  We have received your details. Our team will review your
                  responses and get in touch with information about our
                  research services and how they may fit your needs.
                </p>

                {/* WHATSAPP BUTTON */}

                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Continue on WhatsApp"
                  className="group mx-auto mt-7 inline-flex w-full max-w-[340px] items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-[15px] font-extrabold text-white shadow-[0_12px_25px_-8px_rgba(37,211,102,.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-[0_16px_30px_-8px_rgba(37,211,102,.65)] active:scale-[.98]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={22}
                    height={22}
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Continue on WhatsApp
                </a>

                <p className="mt-3 text-xs font-semibold text-slate-400">
                  Connect with our team directly on WhatsApp
                </p>

                {/* Security note */}

                <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">
                  <Lock size={13} />
                  Never share your trading account password or OTP with anyone.
                </p>
              </div>

            ) : (

              /* FORM */

              <form onSubmit={submit} noValidate>
                <Stepper step={step} />

                <div key={step} className="step-in">

                  {/* STEP 1: CONTACT */}

                  {step === 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        d={d}
                        set={set}
                        errors={errors}
                        k="name"
                        label="Full name"
                        icon={User}
                        auto="name"
                        ph="Your name"
                      />

                      <Field
                        d={d}
                        set={set}
                        errors={errors}
                        k="mobile"
                        label="Mobile number"
                        icon={Phone}
                        type="tel"
                        mode="numeric"
                        auto="tel"
                        ph="10-digit mobile"
                      />

                      <Field
                        d={d}
                        set={set}
                        errors={errors}
                        k="email"
                        label="Email"
                        icon={Mail}
                        type="email"
                        auto="email"
                        ph="you@example.com"
                      />

                      <Field
                        d={d}
                        set={set}
                        errors={errors}
                        k="city"
                        label="City"
                        icon={MapPin}
                        auto="address-level2"
                        ph="Your city"
                      />
                    </div>
                  )}

                  {/* STEP 2: EXPERIENCE */}

                  {step === 1 && (
                    <>
                      <Choice
                        q={Q[0]}
                        value={d.experience}
                        onChange={set}
                        error={errors.experience}
                      />

                      <Choice
                        q={Q[1]}
                        value={d.segment}
                        onChange={set}
                        error={errors.segment}
                      />
                    </>
                  )}

                  {/* STEP 3: NEEDS */}

                  {step === 2 && (
                    <>
                      <Choice
                        q={Q[2]}
                        value={d.capital}
                        onChange={set}
                        error={errors.capital}
                      />

                      <Choice
                        q={Q[3]}
                        value={d.start}
                        onChange={set}
                        error={errors.start}
                      />
                    </>
                  )}

                  {/* STEP 4: REVIEW AND CONSENT */}

                  {step === 3 && (
                    <div className="space-y-3.5">
                      <div className="text-[15px] font-extrabold text-[#0a1f5c]">
                        Review your details
                      </div>

                      <ReviewBlock title="Contact" onEdit={() => setStep(0)}>
                        <Row label="Name" value={d.name} />
                        <Row label="Mobile" value={d.mobile} />
                        <Row label="Email" value={d.email} />
                        <Row label="City" value={d.city} />
                      </ReviewBlock>

                      <ReviewBlock title="Experience" onEdit={() => setStep(1)}>
                        <Row label="Active for" value={d.experience} />
                        <Row label="Segment" value={d.segment} />
                      </ReviewBlock>

                      <ReviewBlock title="Needs" onEdit={() => setStep(2)}>
                        <Row label="Capital" value={d.capital} />
                        <Row label="Start" value={d.start} />
                      </ReviewBlock>

                      <label
                        className={`group mt-2 flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 text-sm font-medium leading-relaxed text-slate-700 transition focus-within:ring-4 focus-within:ring-[#1b5cf0]/20 ${
                          errors.consent
                            ? 'shake border-red-400 bg-red-50/50'
                            : d.consent
                              ? 'border-[#1b5cf0] bg-[#f3f7ff]'
                              : 'border-slate-200 hover:border-[#1b5cf0]/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={d.consent}
                          onChange={(e) => set('consent', e.target.checked)}
                          className="sr-only"
                        />

                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors ${
                            d.consent
                              ? 'border-[#1b5cf0] bg-[#1b5cf0]'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {d.consent && (
                            <Check size={13} strokeWidth={4} className="pop text-white" />
                          )}
                        </span>

                        <span>
                          I consent to AnalyzerView Market Research contacting
                          me about its research services. I have read the{' '}
                          <a
                            href="#privacy"
                            className="font-bold text-[#1b5cf0] underline underline-offset-2"
                          >
                            Privacy Policy
                          </a>.
                        </span>
                      </label>

                      {errors.consent && (
                        <p role="alert" className="text-xs font-bold text-red-600">
                          {errors.consent}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* NAVIGATION BUTTONS */}

                <div
                  className={`mt-9 flex items-center justify-between gap-3 ${
                    step === 3
                      ? 'max-sm:flex-col-reverse max-sm:items-stretch'
                      : ''
                  }`}
                >
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      disabled={sending}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-extrabold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                      <ArrowLeft size={17} /> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="btn-shine group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-b from-[#3d7bff] to-[#1b5cf0] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(27,92,240,.6)] transition hover:shadow-[0_16px_28px_-8px_rgba(27,92,240,.7)] active:scale-[.98]"
                    >
                      Continue
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(105deg,#ff7417,#ed6b78_48%,#347cf6)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_26px_-8px_rgba(119,85,232,.55)] transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Request a Research Consultation
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
