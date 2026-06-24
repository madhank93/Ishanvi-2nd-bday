import { useState, useCallback } from 'react'
import Butterfly from './Butterfly.jsx'

// Floating butterfly field. Tap/hover a butterfly -> it flutters away with a
// sparkle, then respawns after a moment. Pointer-follow on a couple of them.
const PALETTE = [
  { wing: '#f8c8dc', wingDeep: '#e8829e' },
  { wing: '#e6d5f2', wingDeep: '#c8a2e0' },
  { wing: '#ffd9e6', wingDeep: '#f2a0c0' },
  { wing: '#f3e0f7', wingDeep: '#d8a8ea' },
]

function makeButterfly(i) {
  const c = PALETTE[i % PALETTE.length]
  return {
    id: `${i}-${Math.random().toString(36).slice(2, 7)}`,
    top: Math.random() * 80 + 5,
    left: Math.random() * 88 + 2,
    size: Math.round(Math.random() * 16 + 26),
    dur: (Math.random() * 14 + 16).toFixed(1),
    delay: (Math.random() * -20).toFixed(1),
    fx: Math.round((Math.random() - 0.5) * 320),
    fy: -(Math.random() * 160 + 140),
    ...c,
  }
}

const COUNT = 3

export default function Butterflies() {
  const [list, setList] = useState(() => Array.from({ length: COUNT }, (_, i) => makeButterfly(i)))

  const spook = useCallback((id) => {
    setList((prev) => prev.map((b) => (b.id === id ? { ...b, spooked: true } : b)))
    // respawn a fresh one after it flies off
    setTimeout(() => {
      setList((prev) => {
        const next = prev.filter((b) => b.id !== id)
        return [...next, makeButterfly(Math.floor(Math.random() * 999))]
      })
    }, 1500)
  }, [])

  return (
    <div className="butterfly-layer" aria-hidden="true">
      {list.map((b) => (
        <span
          key={b.id}
          className={`butterfly${b.spooked ? ' spooked' : ''}`}
          onMouseEnter={() => spook(b.id)}
          onClick={() => spook(b.id)}
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            '--dur': `${b.dur}s`,
            '--fx': `${b.fx}px`,
            '--fy': `${b.fy}px`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <Butterfly size={b.size} wing={b.wing} wingDeep={b.wingDeep} />
        </span>
      ))}
    </div>
  )
}
