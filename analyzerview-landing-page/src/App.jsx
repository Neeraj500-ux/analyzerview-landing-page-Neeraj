
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

export default function App() {
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip">
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
    </main>
  )
}
