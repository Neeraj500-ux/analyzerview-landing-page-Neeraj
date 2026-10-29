import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(100deg,#101827,#20183f)] px-4 py-16 text-center text-white sm:py-20">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#ff7417,#ed6b78_50%,#347cf6)]" />
      <div className="mx-auto max-w-[760px]">
        <h2 data-aos="fade-up" className="text-[clamp(28px,4.6vw,46px)] font-extrabold leading-[1.1] tracking-[-.035em]">
          Better decisions start with <span className="text-[#ff994d]">better research.</span>
        </h2>
        <p data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-4 max-w-[560px] text-base font-medium text-[#c3d3fb]">Less noise. More analysis. A clearer research process.</p>
        <a href="#consult" data-aos="fade-up" data-aos-delay="180" className="group mt-8 inline-flex min-h-[54px] items-center gap-3 rounded-[15px] bg-[linear-gradient(105deg,#ff7417_0%,#ed6b78_48%,#347cf6_100%)] px-8 py-3.5 text-[17px] font-extrabold text-white shadow-[0_10px_28px_rgba(119,85,232,.3)] transition hover:-translate-y-[3px]">
          Request a Research Consultation <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
