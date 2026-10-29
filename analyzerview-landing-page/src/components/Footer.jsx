import Logo from './Logo'
import { REG_NO } from '../data/content'

const links = [
  ['Terms & Conditions', '#terms'],
  ['MITC', '#mitc'],
  ['Risk Disclosure', '#risk'],
  ['Privacy Policy', '#privacy'],
  ['Investor Charter', '#investor-charter'],
  ['Grievance Redressal', '#grievance'],
]

export default function Footer() {
  return (
    <footer className="bg-[#070e24] px-4 pb-8 pt-12 text-[#b4c4ea] sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-[380px] text-sm font-medium leading-relaxed">SEBI Registered Research Analyst | Registration No. {REG_NO}</p>
          </div>
          <nav aria-label="Policies" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm font-semibold sm:grid-cols-3">
            {links.map(([t, h]) => <a key={t} href={h} className="transition hover:text-white">{t}</a>)}
          </nav>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs font-medium leading-relaxed text-[#7f90bb]">
          <p>Investments in securities markets are subject to market risks. No strategy or research framework guarantees returns or eliminates losses. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.</p>
          <p className="mt-3">&copy; {new Date().getFullYear()} AnalyzerView Market Research. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
