import { useState, useEffect, useRef } from 'react'
import { gallery } from '../data/config.js'

const SLOTS = 6        // visible tiles (keeps the original lineup)
const INTERVAL = 2600  // ms between swaps

function sampleDistinct(pool, n) {
  const a = [...pool.keys()]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

export default function Gallery() {
  const [slots, setSlots] = useState(() => sampleDistinct(gallery, Math.min(SLOTS, gallery.length)))
  const [open, setOpen] = useState(null)
  const [flash, setFlash] = useState(-1) // slot currently animating in
  const slotsRef = useRef(slots)
  slotsRef.current = slots

  useEffect(() => {
    if (gallery.length <= SLOTS) return // nothing left to rotate in
    const id = setInterval(() => {
      const current = slotsRef.current
      const shown = new Set(current)
      const candidates = gallery.map((_, i) => i).filter((i) => !shown.has(i))
      if (!candidates.length) return
      const slot = Math.floor(Math.random() * current.length)
      const next = candidates[Math.floor(Math.random() * candidates.length)]
      setSlots((prev) => prev.map((v, i) => (i === slot ? next : v)))
      setFlash(slot)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Sweet moments</h2>
      <div className="gallery-grid">
        {slots.map((idx, slot) => {
          const g = gallery[idx]
          const cls = slot === flash ? 'swap-in' : ''
          return (
            <div className="gallery-item" key={slot} onClick={() => setOpen(g)}>
              {g.type === 'video' ? (
                <>
                  <video key={idx} src={g.src} className={cls} muted loop autoPlay playsInline preload="metadata" />
                  <span className="play-badge" aria-hidden="true">▶</span>
                </>
              ) : (
                <img key={idx} src={g.src} alt={g.caption} loading="lazy" className={cls} />
              )}
            </div>
          )
        })}
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="lb-close" aria-label="Close">×</button>
          {open.type === 'video' ? (
            <video src={open.src} controls autoPlay loop muted playsInline onClick={(e) => e.stopPropagation()} />
          ) : (
            <img src={open.src} alt={open.caption} onClick={(e) => e.stopPropagation()} />
          )}
        </div>
      )}
    </section>
  )
}
