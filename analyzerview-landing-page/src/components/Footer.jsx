import { REG_NO } from '../data/content'

const BSE_ENLISTMENT_NO = '7041' // or export this from ../data/content next to REG_NO

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
          {/* Logo and registration details */}
          <div className="w-full md:max-w-[380px]">
            <a
              href="/"
              aria-label="AnalyzerView home"
              className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <img
                src="/images/Neeraj3.png"
                alt="AnalyzerView Market Research"
                className="block h-auto w-[240px] max-w-full object-contain object-left sm:w-[270px]"
              />
            </a>

            <p className="mt-4 max-w-[380px] text-sm font-medium leading-relaxed">
              SEBI Registered Research Analyst | Registration No. {REG_NO}
              <br />
              BSE Enlistment No. {BSE_ENLISTMENT_NO}
            </p>
          </div>

          {/* Footer navigation */}
          <nav
            aria-label="Policies"
            className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold sm:grid-cols-3 sm:gap-x-10"
          >
            {links.map(([title, href]) => (
              <a
                key={title}
                href={href}
                className="transition-colors duration-200 hover:text-white focus-visible:text-white"
              >
                {title}
              </a>
            ))}
          </nav>
        </div>

        {/* Risk disclosure and copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-xs font-medium leading-relaxed text-[#7f90bb]">
          <p>
            Investments in securities markets are subject to market risks.
            No strategy or research framework guarantees returns or eliminates
            losses. Registration granted by SEBI and certification from NISM
            in no way guarantee performance of the intermediary or provide
            any assurance of returns to investors.
          </p>

          <p className="mt-3">
            &copy; {new Date().getFullYear()} AnalyzerView Market Research.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}