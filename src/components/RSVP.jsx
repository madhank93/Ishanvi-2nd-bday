import { useState } from 'react'
import confetti from 'canvas-confetti'
import { FORMSPREE_ID, party } from '../data/config.js'

const COLORS = ['#f8c8dc', '#e8829e', '#c8a2e0', '#ffd9e6']

function celebrate() {
  const end = Date.now() + 800
  ;(function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors: COLORS })
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors: COLORS })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

export default function RSVP() {
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Demo mode if no Formspree id set yet.
    if (!FORMSPREE_ID) {
      setStatus('sending')
      setTimeout(() => { setStatus('done'); celebrate() }, 600)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('done'); celebrate() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="rsvp" id="rsvp">
      <h2 className="section-title">RSVP</h2>
      <div className="rsvp-wrap">
        <div className="card rsvp-card">
          {status === 'done' ? (
            <div className="rsvp-thanks">
              <div className="big">Yay! See you there 🎉</div>
              <p>Thank you for celebrating {party.name}’s big day with us. 🦋</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" required placeholder="e.g. Auntie Priya" />
              </div>
              <div className="field">
                <label htmlFor="guests">Number of guests</label>
                <select id="guests" name="guests" defaultValue="1">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="attending">Will you attend?</label>
                <select id="attending" name="attending" defaultValue="Yes">
                  <option>Yes, can’t wait! 🎀</option>
                  <option>Sorry, can’t make it 💔</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">A wish for Ishanvi (optional)</label>
                <textarea id="message" name="message" rows="3" placeholder="Happy birthday, little fairy!" />
              </div>
              <button className="btn rsvp-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send RSVP 🦋'}
              </button>
              {status === 'error' && <p className="rsvp-note" style={{ color: '#c0492f' }}>Oops, something went wrong. Try again.</p>}
              {!FORMSPREE_ID && <p className="rsvp-note">Demo mode — add a Formspree ID in config.js to collect real replies.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
