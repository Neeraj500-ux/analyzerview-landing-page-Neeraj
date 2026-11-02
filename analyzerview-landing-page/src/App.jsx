
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

export default function App() {
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip pb-0">
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

      {/* Mobile Sticky Button - Entire Website */}
      <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-slate-200/80 bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,23,42,.12)] backdrop-blur-xl sm:hidden">
        <a
          href="#consult"
          className="group flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff7417] via-[#ed6b78] to-[#347cf6] px-5 py-3 text-center text-base font-extrabold text-white shadow-[0_8px_22px_rgba(119,85,232,.25)] transition duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300"
        >
          <span>Explore Our Research</span>
          <Send
            size={20}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </main>
  )
}
