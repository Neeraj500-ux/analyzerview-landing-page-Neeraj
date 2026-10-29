import { BadgeCheck, Clock, Users, Quote } from 'lucide-react'
import Logo from './Logo'

const paras = [
  'Analyzerview Market Research is a SEBI-Registered Research Analyst Platform committed to delivering independent, transparent, and data-driven equity research to investors across India. Our approach combines in-depth market analysis, financial research, and structured analytical methodologies to help investors better understand market dynamics and make more informed investment decisions.',
  'We cater to a diverse range of investors, including retail investors and High-Net-Worth Individuals (HNIs), through well-researched reports, thematic market studies, actionable research insights, and investor education. Every aspect of our research approach is built around analytical discipline, transparency, and adherence to applicable SEBI regulatory requirements.',
  'Founded by Rahul Das, a SEBI-Registered Research Analyst, Analyzerview specialises in fundamental and technical analysis, integrating business fundamentals, price action, market trends, and risk-to-reward assessment to develop a more structured perspective on the financial markets. Rather than relying on speculation or unverified market tips, we emphasise research-backed insights, clearly defined trading parameters, and disciplined risk management.',
  'At Analyzerview, we believe that successful market participation begins with understanding, not guesswork. Our objective is to empower investors with the knowledge, analytical clarity, and research-driven perspectives they need to navigate evolving market conditions with greater confidence and discipline.',
]

export default function About() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <div data-aos="fade-down" className="flex justify-center"><Logo /></div>
          <h2 data-aos="fade-up" className="mt-6 text-[clamp(30px,5vw,52px)] font-extrabold tracking-[-.04em] text-navy-900">
            Meet <span className="bg-gradient-to-r from-brand to-[#0a1330] bg-clip-text text-transparent">Analyzerview Market Research</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div data-aos="fade-right" className="rounded-3xl border border-blue-100 bg-[#f7faff] p-6 sm:p-9">
            <h3 className="text-xs font-extrabold uppercase tracking-[.22em] text-brand">About Analyzerview Market Research</h3>
            <div className="mt-5 space-y-4 text-[15.5px] font-medium leading-[1.8] text-slate-700">
              {paras.map((p) => <p key={p}>{p}</p>)}
              <p className="font-bold text-navy-900">Our commitment is to make market research more structured, investment decisions more informed, and risk awareness an integral part of every market strategy.</p>
            </div>
          </div>

          <div data-aos="fade-left" className="relative overflow-hidden rounded-3xl bg-[linear-gradient(150deg,#0a1330,#16255a)] p-6 text-white sm:p-9">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl" />
            <div className="relative">
              <div className="text-xs font-extrabold uppercase tracking-[.22em] text-[#8db0ff]">Meet the Founder</div>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-white/20 bg-gradient-to-br from-brand to-[#6fa3f7] text-2xl font-extrabold">RD</div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-[-.02em]">Rahul Das</h3>
                  <p className="mt-1 text-[13px] font-semibold leading-snug text-[#b9cdfc]">SEBI-Registered Research Analyst | Algorithmic Strategy Specialist</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-4"><Clock size={20} className="text-[#8db0ff]" /><div className="mt-2 text-2xl font-extrabold">8+ yrs</div><div className="text-xs text-[#b9cdfc]">in the financial markets</div></div>
                <div className="rounded-xl bg-white/10 p-4"><Users size={20} className="text-[#8db0ff]" /><div className="mt-2 text-2xl font-extrabold">3,000+</div><div className="text-xs text-[#b9cdfc]">people using the strategy</div></div>
              </div>

              <div className="mt-6 space-y-3 text-[14.5px] font-medium leading-relaxed text-[#d7e3ff]">
                <p>With over 8 years of experience in the financial markets and a track record of 3,000+ people using his strategy, Rahul Das brings extensive market knowledge, analytical expertise, and a research-driven approach to trading and investment analysis.</p>
                <p>He focuses on market research, strategic analysis, price action, and structured trading methodologies, emphasizing informed decision-making, disciplined execution, and effective risk management.</p>
                <p>Through his professional experience and association with multiple established brands, Rahul has developed a strong understanding of market dynamics and research-led trading strategies.</p>
                <p>His vision is to make market research more structured, transparent, and accessible by combining analytical insights with systematic strategies and a disciplined approach to risk.</p>
              </div>

              <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4">
                <Quote size={20} className="text-[#ff994d]" />
                <p className="mt-2 text-[15px] font-extrabold leading-snug">Research with precision. Analyse with discipline. Trade with a strategy.</p>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(100deg,#101827,#20183f)] px-6 py-6 text-center text-white sm:flex-row sm:gap-4">
          <BadgeCheck className="text-[#ff994d]" size={28} />
          <p className="text-lg font-extrabold tracking-[-.01em] sm:text-2xl">Institutional Grade Analysis. <span className="text-[#ff994d]">Professional Market Perspectives.</span></p>
        </div>
      </div>
    </section>
  )
}
