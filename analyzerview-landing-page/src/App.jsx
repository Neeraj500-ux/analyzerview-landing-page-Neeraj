import Hero from './components/Hero'
import Problem from './components/Problem'
import ExecutionModel from './components/ExecutionModel'
import About from './components/About'
import WhyResearch from './components/WhyResearch'
import WhoFor from './components/WhoFor'
import LeadForm from './components/LeadForm'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { Send } from 'lucide-react'

const WHATSAPP_NUMBER = '919147743168' // country code + number, digits only
const WHATSAPP_MESSAGE =
  'Hi, I would like to know more about your SEBI-registered research.'
const WHATSAPP_URL =
  'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE)

function WhatsAppIcon({ size = 22, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function App() {
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip pb-[84px] sm:pb-0">
      <Hero />
      <Problem />
      <ExecutionModel />
      <About />
      <WhyResearch />
      <WhoFor />
      <LeadForm />
      <FAQ />
      <FinalCTA />
      <Footer />

      {/* Mobile Sticky Bar - Entire Website (WhatsApp icon + Explore, one line) */}
      <style>{`
        @keyframes sb-up {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes sb-ring {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,.55); }
          100% { box-shadow: 0 0 0 16px rgba(37,211,102,0); }
        }
        @keyframes sb-wiggle {
          0%, 78%, 100% { transform: rotate(0) scale(1); }
          82% { transform: rotate(-14deg) scale(1.12); }
          86% { transform: rotate(12deg) scale(1.12); }
          90% { transform: rotate(-9deg) scale(1.08); }
          94% { transform: rotate(6deg) scale(1.04); }
        }
        @keyframes sb-shine {
          0%, 45% { transform: translateX(-140%) skewX(-20deg); }
          100% { transform: translateX(340%) skewX(-20deg); }
        }
        @keyframes sb-glow {
          0%, 100% { box-shadow: 0 8px 22px rgba(119,85,232,.25); }
          50% { box-shadow: 0 10px 30px rgba(237,107,120,.5); }
        }
        @keyframes sb-arrow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, -3px); }
        }
        @keyframes sb-grad {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .sb-bar { animation: sb-up .7s cubic-bezier(.22,1,.36,1) .4s both; }
        .sb-wa { animation: sb-ring 2.2s ease-out infinite; }
        .sb-wa-icon { animation: sb-wiggle 4.5s ease-in-out infinite; transform-origin: 50% 60%; }
        .sb-cta {
          background-size: 200% 100%;
          animation: sb-glow 2.8s ease-in-out infinite, sb-grad 3.5s ease-in-out infinite alternate;
        }
        .sb-shine { animation: sb-shine 3.6s ease-in-out infinite; }
        .sb-arrow { animation: sb-arrow 1.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .sb-bar, .sb-wa, .sb-wa-icon, .sb-cta, .sb-shine, .sb-arrow {
            animation: none !important;
          }
        }
      `}</style>

      <div className="sb-bar fixed inset-x-0 bottom-0 z-[9999] border-t border-slate-200/80 bg-white/95 px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,23,42,.12)] backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-2.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="sb-wa grid h-[54px] w-[54px] shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2fe07a] to-[#12a150] text-white shadow-[0_8px_22px_rgba(18,161,80,.35)] transition duration-300 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            <WhatsAppIcon size={30} className="sb-wa-icon" />
          </a>

          <a
            href="#consult"
            className="sb-cta group relative flex h-[54px] min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#ff7417] via-[#ed6b78] to-[#347cf6] px-3 text-center text-[14px] font-extrabold capitalize leading-tight text-white transition duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 min-[380px]:text-[15px]"
          >
            <span
              aria-hidden="true"
              className="sb-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/45 to-transparent"
            />
            <span className="relative">Explore our research services</span>
            <Send
              size={18}
              aria-hidden="true"
              className="sb-arrow relative shrink-0"
            />
          </a>
        </div>
      </div>
    </main>
  )
}