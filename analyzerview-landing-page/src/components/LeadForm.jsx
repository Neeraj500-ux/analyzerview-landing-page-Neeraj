import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from 'lucide-react'

const Q = [
  { key: 'experience', label: 'How long have you been active in the stock market?', options: ['New to markets', 'Under 1 year', '1-3 years', '3-5 years', '5+ years'] },
  { key: 'segment', label: 'Which market segment are you mainly interested in?', options: ['Equity investing / delivery', 'Swing / positional equity', 'Futures & Options (F&O)', 'Index options', 'Learning / research only', 'Other'] },
  { key: 'help', label: 'What would you most like help with?', options: ['Detailed research reports', 'Stock / market analysis', 'Structured research updates', 'Quantitative / algo-related research information', 'Still exploring'] },
  { key: 'approach', label: 'Which approach best describes your current interest?', options: ['Long-term investing', 'Positional trading', 'Active F&O trading', 'Learning before deciding'] },
]
const STEPS = ['Contact', 'Experience', 'Needs', 'Consent']
const input = 'mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15'

function Choice({ q, value, onChange, error }) {
  return (
    <fieldset className="mt-6 first:mt-0">
      <legend className="text-[15px] font-extrabold text-navy-900">{q.label}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {q.options.map((o) => (
          <label key={o} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${value === o ? 'border-brand bg-brand-light text-brand-dark' : 'border-slate-200 bg-white text-slate-700 hover:border-brand/50'}`}>
            <input type="radio" name={q.key} value={o} checked={value === o} onChange={() => onChange(q.key, o)} className="h-4 w-4 accent-[#1b5cf0]" />
            {o}
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-xs font-bold text-red-600">Please select an option.</p>}
    </fieldset>
  )
}

function Field({ k, label, type = 'text', ph, mode, d, set, errors }) {
  return (
    <div>
      <label htmlFor={k} className="text-[13px] font-extrabold text-slate-700">{label}</label>
      <input id={k} type={type} inputMode={mode} placeholder={ph} value={d[k]} onChange={(e) => set(k, e.target.value)} className={`${input} ${errors[k] ? 'border-red-400' : ''}`} />
      {errors[k] && <p className="mt-1 text-xs font-bold text-red-600">{errors[k]}</p>}
    </div>
  )
}

export default function LeadForm() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})
  const [d, setD] = useState({ name: '', mobile: '', email: '', city: '', experience: '', segment: '', help: '', approach: '', consent: false })

  const set = (k, v) => setD((p) => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (d.name.trim().length < 2) e.name = 'Enter your full name'
      if (!/^[6-9]\d{9}$/.test(d.mobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, ''))) e.mobile = 'Enter a valid 10-digit mobile number'
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Enter a valid email'
      if (d.city.trim().length < 2) e.city = 'Enter your city'
    }
    if (step === 1) ['experience', 'segment'].forEach((k) => !d[k] && (e[k] = true))
    if (step === 2) ['help', 'approach'].forEach((k) => !d[k] && (e[k] = true))
    if (step === 3 && !d.consent) e.consent = 'Please provide consent to continue'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => validate() && setStep((s) => s + 1)

  const submit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      // Connect your CRM / Google Sheet / email endpoint via .env: VITE_FORM_ENDPOINT=https://...
      const url = import.meta.env.VITE_FORM_ENDPOINT
      if (url) {
        await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
      } else {
        console.log('Lead submitted (no endpoint configured):', d)
      }
      setDone(true)
    } catch {
      setErrors({ consent: 'Something went wrong. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="consult" className="scroll-mt-4 bg-[linear-gradient(180deg,#fff,#f3f7ff)] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[760px]">
        <div className="text-center">
          <div className="text-xs font-extrabold uppercase tracking-[.22em] text-brand">Request a research consultation</div>
          <h2 data-aos="fade-up" className="mt-3 text-[clamp(28px,4.4vw,42px)] font-extrabold tracking-[-.035em] text-navy-900">Tell us a little about you</h2>
          <p className="mt-3 text-base font-medium text-slate-600">A quick four-step form so we can understand what you are looking for.</p>
        </div>

        <div data-aos="fade-up" className="mt-9 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_18px_50px_rgba(27,92,240,.1)] sm:p-8">
          {done ? (
            <div className="py-6 text-center">
              <CheckCircle2 size={56} className="mx-auto text-emerald-500" />
              <h3 className="mt-4 text-2xl font-extrabold text-navy-900">Thank you, {d.name.split(' ')[0]}.</h3>
              <p className="mx-auto mt-3 max-w-[480px] text-[15px] font-medium leading-relaxed text-slate-600">
                We have received your details. Our team will review your responses and get in touch with information about our research services and how they may fit your needs.
              </p>
              <p className="mx-auto mt-3 max-w-[480px] text-xs font-medium text-slate-400">Never share your trading account password or OTP with anyone.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="mb-7">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-500">
                  <span>Step {step + 1} of 4 &middot; {STEPS[step]}</span>
                  <span>{Math.round(((step + 1) / 4) * 100)}%</span>
                </div>
                <div className="mt-2 flex gap-1.5">
                  {STEPS.map((s, i) => <div key={s} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-brand' : 'bg-slate-200'}`} />)}
                </div>
              </div>

              {step === 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field d={d} set={set} errors={errors} k="name" label="Full name" ph="Your name" />
                  <Field d={d} set={set} errors={errors} k="mobile" label="Mobile number" type="tel" mode="numeric" ph="10-digit mobile" />
                  <Field d={d} set={set} errors={errors} k="email" label="Email" type="email" ph="you@example.com" />
                  <Field d={d} set={set} errors={errors} k="city" label="City" ph="Your city" />
                </div>
              )}
              {step === 1 && (<><Choice q={Q[0]} value={d.experience} onChange={set} error={errors.experience} /><Choice q={Q[1]} value={d.segment} onChange={set} error={errors.segment} /></>)}
              {step === 2 && (<><Choice q={Q[2]} value={d.help} onChange={set} error={errors.help} /><Choice q={Q[3]} value={d.approach} onChange={set} error={errors.approach} /></>)}
              {step === 3 && (
                <div>
                  <div className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-600">
                    <div className="font-extrabold text-navy-900">Review</div>
                    <div className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                      <span>{d.name}</span><span>{d.mobile}</span><span>{d.email}</span><span>{d.city}</span>
                    </div>
                  </div>
                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm font-medium leading-relaxed text-slate-700">
                    <input type="checkbox" checked={d.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#1b5cf0]" />
                    <span>I consent to AnalyzerView Market Research contacting me about its research services. I have read the <a href="#privacy" className="font-bold text-brand underline">Privacy Policy</a>.</span>
                  </label>
                  {errors.consent && <p className="mt-2 text-xs font-bold text-red-600">{errors.consent}</p>}
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-slate-600 hover:bg-slate-100"><ArrowLeft size={17} /> Back</button>
                ) : <span />}
                {step < 3 ? (
                  <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(27,92,240,.3)] transition hover:bg-brand-dark">Continue <ArrowRight size={17} /></button>
                ) : (
                  <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(105deg,#ff7417,#ed6b78_48%,#347cf6)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(119,85,232,.28)] disabled:opacity-60">
                    {sending ? 'Sending...' : 'Request a Research Consultation'} <Send size={16} />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
