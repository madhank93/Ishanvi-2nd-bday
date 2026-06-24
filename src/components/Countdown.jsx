import { useEffect, useState } from 'react'
import { party } from '../data/config.js'

const target = new Date(party.dateISO).getTime()

function diff() {
  const ms = target - Date.now()
  if (ms <= 0) return null
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

export default function Countdown() {
  const [t, setT] = useState(diff)

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="countdown" id="countdown">
      <h2 className="section-title">The countdown is on!</h2>
      {t ? (
        <div className="cd-grid">
          {[
            ['Days', t.days],
            ['Hours', t.hours],
            ['Minutes', t.minutes],
            ['Seconds', t.seconds],
          ].map(([label, val]) => (
            <div className="card cd-cell" key={label}>
              <div className="cd-num">{String(val).padStart(2, '0')}</div>
              <div className="cd-label">{label}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="cd-over">🎉 It’s party time! Happy 2nd Birthday, {party.name}! 🎂</p>
      )}
    </section>
  )
}
