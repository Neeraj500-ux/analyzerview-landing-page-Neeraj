// Illustrative candlestick charts (decorative mock data, generated deterministically)
function rng(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) / 2147483647)
}

function makeCandles(n, price, seed) {
  const r = rng(seed)
  const out = []
  let prev = price(0)
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    const c = price(t) + (r() - 0.5) * 9
    const h = Math.max(prev, c) + r() * 4
    const l = Math.min(prev, c) - r() * 4
    out.push({ o: prev, c, h, l })
    prev = c
  }
  return out
}

const prices = {
  regime: (t) => (t < 0.33 ? 20 + (t / 0.33) * 42 : t < 0.66 ? 62 + Math.sin(t * 38) * 5 : 62 - ((t - 0.66) / 0.34) * 46),
  volume: (t) => 15 + t * 58 + Math.sin(t * 14) * 5,
  entry: (t) => (t < 0.55 ? 40 + Math.sin(t * 30) * 8 - t * 12 : 30 + ((t - 0.55) / 0.45) * 55),
  risk: (t) => 18 + t * 55 + Math.sin(t * 16) * 6,
}

const chip = 'absolute rounded px-2 py-[3px] text-[10px] font-bold text-white sm:text-[11px]'

export default function ChartArt({ kind }) {
  const W = 360, H = 170
  const candles = makeCandles(kind === 'regime' ? 46 : 40, prices[kind], kind.length * 977 + 13)
  const all = candles.flatMap((c) => [c.h, c.l])
  const min = Math.min(...all), max = Math.max(...all)
  const y = (v) => H - 14 - ((v - min) / (max - min)) * (H - 40)
  const step = (W - 20) / candles.length
  const cw = step * 0.55

  return (
    <div className="relative h-full min-h-[150px] w-full overflow-hidden rounded-xl bg-[#060d22]">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#ffffff" strokeOpacity=".05" />
        ))}
        {kind === 'volume' &&
          candles.map((c, i) => (
            <rect key={'v' + i} x={10 + i * step} width={cw} y={H - 8 - (6 + ((i * 37) % 22))} height={6 + ((i * 37) % 22)} fill={c.c >= c.o ? '#16a36a' : '#d1344a'} opacity=".55" />
          ))}
        {kind === 'volume' &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={'p' + i} x={W - [34, 60, 86, 52, 40, 24, 14, 8][i]} y={14 + i * 18} width={[34, 60, 86, 52, 40, 24, 14, 8][i]} height="12" fill="#1b5cf0" opacity=".75" />
          ))}
        {kind === 'risk' && (
          <>
            <rect x="228" y={y(62)} width="92" height={y(48) - y(62)} fill="#16a36a" opacity=".45" />
            <rect x="228" y={y(48)} width="92" height={y(36) - y(48)} fill="#d1344a" opacity=".45" />
          </>
        )}
        {candles.map((c, i) => {
          const x = 10 + i * step
          const up = c.c >= c.o
          const col = up ? '#22c58b' : '#f0405a'
          return (
            <g key={i}>
              <line x1={x + cw / 2} x2={x + cw / 2} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeWidth="1" />
              <rect x={x} width={cw} y={y(Math.max(c.o, c.c))} height={Math.max(1.5, Math.abs(y(c.o) - y(c.c)))} fill={col} />
            </g>
          )
        })}
        {kind === 'regime' && (
          <path d="M10 140 C 90 40, 150 40, 215 82 S 300 140, 350 150" stroke="#3b82f6" strokeWidth="2" fill="none" opacity=".7" />
        )}
        {kind === 'entry' && (
          <>
            <circle cx="222" cy={y(33)} r="9" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <path d={`M222 ${y(33)} L 330 ${y(80)}`} stroke="#fff" strokeWidth="1.5" />
          </>
        )}
      </svg>

      {kind === 'regime' && (
        <>
          <span className={`${chip} left-[18%] top-[8%] bg-emerald-600`}>Uptrend</span>
          <span className={`${chip} left-[40%] top-[30%] bg-blue-600`}>Consolidation</span>
          <span className={`${chip} right-[4%] top-[30%] bg-red-600`}>Downtrend</span>
        </>
      )}
      {kind === 'volume' && (
        <>
          <span className={`${chip} right-[6%] top-[6%] bg-red-700`}>Resistance Zone</span>
          <span className={`${chip} right-[28%] top-[44%] bg-blue-600`}>Value Area</span>
          <span className={`${chip} right-[22%] bottom-[10%] bg-emerald-700`}>Support Zone</span>
        </>
      )}
      {kind === 'entry' && <span className={`${chip} left-[48%] top-[24%] bg-blue-600`}>Entry</span>}
      {kind === 'risk' && (
        <>
          <span className="absolute right-[3%] top-[6%] text-[11px] font-extrabold leading-tight text-emerald-400">Target<br />(2R)</span>
          <span className={`${chip} right-[22%] top-[44%] bg-blue-600`}>Entry</span>
          <span className="absolute bottom-[8%] right-[3%] text-[11px] font-extrabold leading-tight text-red-400">Stop Loss<br />(1R)</span>
        </>
      )}
    </div>
  )
}
