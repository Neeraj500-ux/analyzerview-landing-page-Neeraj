import { REG_NO } from '../data/content'

const BSE_ENLISTMENT_NO = '7041' // or export this from ../data/content next to REG_NO

const SITE = 'https://www.analyzerview.com'
const CONTACT_URL = `${SITE}/contact`

const quickLinks = [
  ['Home', `${SITE}/`],
  ['About Us', `${SITE}/about`],
  ['Services', `${SITE}/#services`],
  ['Contact Us', CONTACT_URL],
]

// NOTE: change these paths if your policy pages use different URLs
const policyLinks = [
  ['Terms & Conditions', `${SITE}/terms`],
  ['MITC', `${SITE}/mitc`],
  ['Risk Disclosure', `${SITE}/risk-disclosure`],
  ['Privacy Policy', `${SITE}/privacy-policy`],
  ['Investor Charter', `${SITE}/investor-charter`],
  ['Grievance Redressal', `${SITE}/grievance-redressal`],
]

const investorLinks = [
  ['SEBI SCORES', 'https://scores.sebi.gov.in'],
  ['Smart ODR', 'https://smartodr.in'],
  ['SEBI Website', 'https://www.sebi.gov.in'],
]

const linkClass =
  'transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none'

const inlineLinkClass =
  'underline underline-offset-2 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none'

function FooterColumn({ heading, children }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
        {heading}
      </h3>
      <ul className="space-y-3 text-sm font-semibold">{children}</ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#070e24] px-4 pb-8 pt-12 text-[#b4c4ea] sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
          {/* Logo and registration details */}
          <div className="w-full md:max-w-[380px]">
            <a
              href={`${SITE}/`}
              aria-label="AnalyzerView home"
              className="inline-block rounded-xl bg-white px-4 py-3 shadow-lg shadow-black/30 ring-1 ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <img
                src="/images/Neeraj5.png"
                alt="AnalyzerView Market Research"
                className="block h-auto w-[200px] max-w-full object-contain object-left sm:w-[230px]"
              />
            </a>

            <p className="mt-4 max-w-[380px] text-sm font-medium leading-relaxed">
              SEBI Registered Research Analyst | Registration No. {REG_NO}
              <br />
              BSE Enlistment No. {BSE_ENLISTMENT_NO}
            </p>

            <a
              href={CONTACT_URL}
              className={`mt-4 inline-flex items-center gap-2 text-sm font-bold text-white ${linkClass}`}
            >
              Contact Us
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <FooterColumn heading="Quick Links">
              {quickLinks.map(([title, href]) => (
                <li key={title}>
                  <a href={href} className={linkClass}>
                    {title}
                  </a>
                </li>
              ))}
            </FooterColumn>
          </nav>

          {/* Policies */}
          <nav aria-label="Policies">
            <FooterColumn heading="Policies">
              {policyLinks.map(([title, href]) => (
                <li key={title}>
                  <a href={href} className={linkClass}>
                    {title}
                  </a>
                </li>
              ))}
            </FooterColumn>
          </nav>

          {/* Investor resources (external) */}
          <nav aria-label="Investor resources">
            <FooterColumn heading="Investor Resources">
              {investorLinks.map(([title, href]) => (
                <li key={title}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </FooterColumn>
          </nav>
        </div>

        {/* Risk disclosure and copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-xs font-medium leading-relaxed text-[#7f90bb]">
          <p>
            Investments in securities markets are subject to market risks.
            No strategy or research framework guarantees returns or eliminates
            losses. Registration granted by SEBI and certification from NISM
            in no way guarantee performance of the intermediary or provide
            any assurance of returns to investors. Read our{' '}
            <a href={`${SITE}/risk-disclosure`} className={inlineLinkClass}>
              Risk Disclosure
            </a>
            {' '}or{' '}
            <a href={CONTACT_URL} className={inlineLinkClass}>
              contact us
            </a>{' '}
            for any questions.
          </p>

          <p className="mt-3">
            &copy; {new Date().getFullYear()}{' '}
            <a href={`${SITE}/`} className={inlineLinkClass}>
              AnalyzerView Market Research
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}