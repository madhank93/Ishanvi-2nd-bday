import { useState } from 'react'
import confetti from 'canvas-confetti'
import { googleForm, party } from '../data/config.js'

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
  const [status, setStatus] = useState('idle') // idle | sending | done

  async function handleSubmit(e) {
    e.preventDefault()
    const f = e.target
    const { entries, action } = googleForm
    const body = new URLSearchParams()
    body.append(entries.name, f.name.value)
    body.append(entries.guests, f.guests.value)
    body.append(entries.attending, f.attending.value)
    if (f.message.value) body.append(entries.message, f.message.value)

    setStatus('sending')
    try {
      // Google Forms doesn't send CORS headers; no-cors fire-and-forget still records the response.
      await fetch(action, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
    } catch {
      /* opaque response is expected with no-cors */
    }
    setStatus('done')
    celebrate()
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
                <input id="name" name="name" required placeholder="e.g. Priya" />
              </div>
              <div className="field">
                <label htmlFor="guests">Number of guests</label>
                <select id="guests" name="guests" defaultValue="1">
                  {googleForm.guestOptions.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="attending">Will you attend?</label>
                <select id="attending" name="attending" defaultValue={googleForm.attendingOptions[0]}>
                  {googleForm.attendingOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">A wish for Ishanvi (optional)</label>
                <textarea id="message" name="message" rows="3" placeholder="Happy birthday, little fairy!" />
              </div>
              <button className="btn rsvp-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send RSVP 🦋'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
