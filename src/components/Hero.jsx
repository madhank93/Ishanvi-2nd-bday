import { useState, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'
import { party } from '../data/config.js'
import Candle2 from './Candle2.jsx'

const PINKS = ['#ffd9e6', '#f8c8dc', '#f3a8bf', '#e8829e', '#d65f86', '#c8a2e0']
const Z = 99999

// pink-shade balloon color pairs [highlight-ish, base]
const BALLOON_COLORS = [
  ['#ffd9e6', '#e8829e'],
  ['#ffe0ef', '#f3a8bf'],
  ['#f6d6f2', '#c8a2e0'],
  ['#ffccdd', '#d65f86'],
  ['#ffe9f0', '#ef8fb3'],
]

function fireworks(duration = 3000) {
  const end = Date.now() + duration
  const id = setInterval(() => {
    if (Date.now() > end) return clearInterval(id)
    for (let k = 0; k < 2; k++) {
      confetti({
        particleCount: 80,
        startVelocity: 38,
        spread: 360,
        ticks: 90,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
        colors: PINKS,
        scalar: 1.2,
        zIndex: Z,
      })
    }
  }, 220)
}

export default function Hero() {
  const [balloons, setBalloons] = useState([])
  const seq = useRef(0)

  const launchBalloons = useCallback(() => {
    const batch = Array.from({ length: 12 }, () => {
      const [c1, c2] = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]
      const id = seq.current++
      const dur = 4.5 + Math.random() * 3
      return {
        id,
        left: Math.random() * 92,
        size: 44 + Math.random() * 36,
        drift: `${(Math.random() - 0.5) * 160}px`,
        dur,
        delay: Math.random() * 0.6,
        c1,
        c2,
      }
    })
    setBalloons((prev) => [...prev, ...batch])
    const maxLife = 8200
    setTimeout(() => {
      const ids = new Set(batch.map((b) => b.id))
      setBalloons((prev) => prev.filter((b) => !ids.has(b.id)))
    }, maxLife)
  }, [])

  const celebrate = useCallback((x = 0.5, y = 0.4) => {
    confetti({ particleCount: 140, spread: 90, origin: { x, y }, colors: PINKS, scalar: 1.2, zIndex: Z })
    fireworks()
    launchBalloons()
  }, [launchBalloons])

  return (
    <section className="hero" id="top">
      {/* floating pink balloons layer */}
      <div className="balloon-layer" aria-hidden="true">
        {balloons.map((b) => (
          <span
            key={b.id}
            className="cssballoon"
            style={{
              left: `${b.left}%`,
              '--s': `${b.size}px`,
              '--c1': b.c1,
              '--c2': b.c2,
              '--drift': b.drift,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <p className="hero-eyebrow">Join us to celebrate</p>
      <h1 className="hero-name">{party.name}</h1>
      <p className="hero-turns">turns {party.age}! 🎀</p>

      <div className="hero-stage">
        <span className="hero-emoji" role="img" aria-label="fairy">🧚</span>

        <span
          className="balloon-wrap"
          role="button"
          tabIndex={0}
          aria-label="Celebrate"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            celebrate((r.left + r.width / 2) / window.innerWidth, (r.top + r.height / 2) / window.innerHeight)
          }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); celebrate() } }}
        >
          {/* the number 2 as a sprinkle chocolate candle (SVG) */}
          <Candle2 />
        </span>

        <span className="hero-emoji" role="img" aria-label="cake">🍰</span>
      </div>

      <p className="hero-tap-hint">✨ tap the “{party.age}” for fireworks &amp; balloons · catch the butterflies ✨</p>
    </section>
  )
}
