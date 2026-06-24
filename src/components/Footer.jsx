import { useMemo } from 'react'
import { party } from '../data/config.js'

const PETALS = ['🌸', '🌷', '🦋', '💕', '🎀']

export default function Footer() {
  const petals = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({
      left: Math.random() * 100,
      dur: (Math.random() * 8 + 7).toFixed(1),
      delay: (Math.random() * -12).toFixed(1),
      emoji: PETALS[i % PETALS.length],
      size: Math.random() * 12 + 14,
    })),
    [],
  )

  return (
    <footer className="footer" id="footer">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <p className="heart">With love, {party.name} & family</p>
      <p>🦋 Can’t wait to celebrate with you! 🦋</p>
    </footer>
  )
}
