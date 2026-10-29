import { BarChart3, Database, FileSearch, ShieldCheck } from 'lucide-react'

export const REG_NO = 'INH000023719'

export const painPoints = [
  'Skipping market research and expecting good returns?',
  'Do your emotions cost you your trading capital?',
  'Taking random trading tips and still wondering where it went wrong?',
  'Poor risk management, and still wondering why you are losing money?',
  'Chasing the market without knowing what is actually going on behind it?',
  'Are you overtrading without realizing it?',
]

export const layers = [
  {
    n: '01',
    title: 'Market Regime Analysis',
    sub: 'Understand the market environment first.',
    icon: BarChart3,
    chart: 'regime',
    points: [
      'Identify trend, range or reversal phase',
      'Higher timeframe analysis',
      'Macro and sector context',
      'Avoid trading against the dominant trend',
    ],
  },
  {
    n: '02',
    title: 'Price, Volume & Liquidity Analysis',
    sub: 'Look beyond just price.',
    icon: Database,
    chart: 'volume',
    points: [
      'Identify key price zones',
      'Volume profile and high-volume areas',
      'Support and resistance zones',
      'Liquidity structures and institutional activity',
    ],
  },
  {
    n: '03',
    title: 'Entry Confirmation',
    sub: 'Validate the setup with multiple signals.',
    icon: FileSearch,
    chart: 'entry',
    points: [
      'Technical confirmation (price action, indicators)',
      'Volume / order-flow confirmation',
      'Multi-timeframe alignment',
      'No trade without clear setup criteria',
    ],
  },
  {
    n: '04',
    title: 'Risk Validation',
    sub: 'Define the risk before executing the trade.',
    icon: ShieldCheck,
    chart: 'risk',
    points: [
      'Predefined stop-loss',
      'Minimum 1:2 risk to reward (as applicable)',
      'Position sizing based on risk',
      'Drawdown and exposure control',
    ],
  },
]

export const faqs = [
  {
    q: 'What is AnalyzerView Market Research?',
    a: 'AnalyzerView Market Research is a SEBI-registered Research Analyst providing structured, research-driven market insights and research recommendations to help investors make more informed decisions.',
  },
  {
    q: 'How is your research methodology different?',
    a: 'Our approach follows a structured four-level framework: Market Regime Analysis, Price, Volume & Liquidity Analysis, Entry Confirmation, and Risk Validation. The objective is to evaluate potential opportunities systematically rather than rely on isolated signals.',
  },
  {
    q: 'What do I receive with a subscription?',
    a: 'Depending on the selected plan, you may receive research reports, stock or trading recommendations, relevant entry and exit levels, stop-loss parameters, potential targets, risk-reward assessments, and research updates. Please review the individual plan for its exact inclusions.',
  },
  {
    q: 'Do you provide entry, target and stop-loss levels?',
    a: 'Where applicable to a recommendation, we communicate relevant entry parameters, potential targets, stop-loss or invalidation levels, and supporting research rationale. These levels are analytical estimates, not guaranteed outcomes.',
  },
  {
    q: 'Do you guarantee profits or returns?',
    a: 'No. Stock market investments involve risk, and losses are possible. Our research process aims to support disciplined decision-making; it cannot guarantee profits, accuracy, or protection against losses.',
  },
  {
    q: 'Is AnalyzerView suitable for beginners?',
    a: 'Our research may be useful to investors with different levels of market experience. However, subscribers should understand the risks of the relevant securities or strategies before acting on research recommendations.',
  },
  {
    q: 'Do I need to share my trading account password?',
    a: 'Never share your trading account password or OTP with us. Review our onboarding and service requirements, and use your own authorised broker platform to make investment decisions and place orders.',
  },
  {
    q: 'How can I choose the right subscription plan?',
    a: 'Compare the plans based on the type and frequency of research, instruments covered, report delivery, support and other stated features. Select a plan that matches your needs, experience and risk tolerance.',
  },
  {
    q: 'Can I cancel my subscription or request a refund?',
    a: 'Cancellation, renewal and refund eligibility are governed by the applicable subscription terms and regulatory requirements. Please review the terms before purchasing or contact our support team for clarification.',
  },
  {
    q: 'Is AnalyzerView SEBI registered?',
    a: `Yes. AnalyzerView Market Research is registered with SEBI as a Research Analyst. Registration No.: ${REG_NO}. Registration does not guarantee performance or returns.`,
  },
]
