import confetti from 'canvas-confetti'
import { party } from '../data/config.js'

const COLORS = ['#f8c8dc', '#e8829e', '#c8a2e0', '#ffd9e6', '#fff5f0']

function burst(x = 0.5, y = 0.4) {
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { x, y },
    colors: COLORS,
    scalar: 1.1,
    shapes: ['circle'],
  })
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <p className="hero-eyebrow">Join us to celebrate</p>
      <h1 className="hero-name">{party.name}</h1>
      <p className="hero-turns">turns {party.age}! 🎀</p>

      <div className="hero-stage">
        <span className="hero-emoji" role="img" aria-label="fairy">🧚</span>
        <span
          className="balloon-2"
          role="button"
          tabIndex={0}
          aria-label="Pop confetti"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            burst((r.left + r.width / 2) / window.innerWidth, (r.top + r.height / 2) / window.innerHeight)
          }}
        >
          {party.age}
        </span>
        <span className="hero-emoji" role="img" aria-label="cake">🍰</span>
      </div>

      <p className="hero-tap-hint">✨ tap the “{party.age}” for a surprise · catch the butterflies ✨</p>
    </section>
  )
}
