import { useMemo } from 'react'

const SPRINKLE_COLORS = ['#ff5d8f', '#ffd23f', '#5ad1ff', '#7bd66a', '#b06bff', '#ff9f43', '#ffffff', '#ff6b6b']

// The "2" stroke path (sits lower in the viewBox to leave room for the flame).
const TWO_PATH = 'M46 146 C42 94 178 90 160 158 C150 212 78 232 62 306 L178 306'
const STROKE_W = 50

function makeSprinkles() {
  const list = []
  for (let i = 0; i < 90; i++) {
    list.push({
      x: 24 + Math.random() * 152,
      y: 106 + Math.random() * 210,
      r: Math.random() * 180,
      c: SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)],
    })
  }
  return list
}

// A pink number "2" birthday candle with sprinkles, a wick thread and a flame.
export default function Candle2() {
  const sprinkles = useMemo(makeSprinkles, [])

  return (
    <svg className="candle2" viewBox="0 0 200 340" role="img" aria-label="number two birthday candle">
      <defs>
        <linearGradient id="c2-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7accb" />
          <stop offset="0.45" stopColor="#ec80a8" />
          <stop offset="1" stopColor="#c75888" />
        </linearGradient>
        <linearGradient id="c2-body-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9e8" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#ffd9e8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="c2-flame-out" cx="0.5" cy="0.66" r="0.6">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset="0.45" stopColor="#ffd23f" />
          <stop offset="1" stopColor="#ff7a18" />
        </radialGradient>
        <radialGradient id="c2-flame-in" cx="0.5" cy="0.7" r="0.6">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#fff3b0" />
          <stop offset="1" stopColor="#ffd23f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="c2-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb24d" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffb24d" stopOpacity="0" />
        </radialGradient>
        <mask id="c2-mask">
          <path d={TWO_PATH} fill="none" stroke="#fff" strokeWidth={STROKE_W} strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>

      {/* warm glow behind flame */}
      <circle className="glow" cx="105" cy="58" r="52" fill="url(#c2-glow)" />

      {/* flame */}
      <g className="flame">
        <path d="M105 20 C120 42 125 58 116 72 C110 81 100 81 94 72 C85 58 90 42 105 20 Z" fill="url(#c2-flame-out)" />
        <path d="M105 40 C113 54 115 64 109 73 C106 79 104 79 100 73 C94 64 97 52 105 40 Z" fill="url(#c2-flame-in)" />
      </g>

      {/* wick thread — short, from the top of the 2 up to the flame */}
      <path d="M105 78 L105 96" stroke="#2c211b" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* pink body */}
      <path d={TWO_PATH} fill="none" stroke="url(#c2-body)" strokeWidth={STROKE_W} strokeLinecap="round" strokeLinejoin="round" />
      {/* gloss highlight + sprinkles, clipped to the body */}
      <g mask="url(#c2-mask)">
        <rect x="20" y="110" width="160" height="120" fill="url(#c2-body-hi)" />
        {sprinkles.map((s, i) => (
          <rect
            key={i}
            x={s.x}
            y={s.y}
            width="11"
            height="4.5"
            rx="2.25"
            fill={s.c}
            transform={`rotate(${s.r} ${s.x + 5.5} ${s.y + 2.25})`}
          />
        ))}
      </g>
    </svg>
  )
}
