import { party } from '../data/config.js'

function pad(n) { return String(n).padStart(2, '0') }
function toICSDate(d) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
}

function downloadICS() {
  const start = new Date(party.dateISO)
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000) // 3h party
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ishanvi Birthday//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@ishanvi-birthday`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${party.name}'s ${party.age}nd Birthday 🎂`,
    `LOCATION:${party.venue}`,
    'DESCRIPTION:Come celebrate with us! 🦋🎀',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ishanvi-birthday.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Details() {
  return (
    <section className="details" id="details">
      <h2 className="section-title">Party details</h2>
      <div className="details-grid">
        <div className="card detail">
          <div className="ico">📅</div>
          <h3>When</h3>
          <p>{party.dateLabel}</p>
        </div>
        <div className="card detail">
          <div className="ico">⏰</div>
          <h3>Time</h3>
          <p>{party.timeLabel}</p>
        </div>
        <div className="card detail">
          <div className="ico">📍</div>
          <h3>Where</h3>
          <p>{party.venue}</p>
        </div>
      </div>
      <div className="details-actions">
        <a className="btn" href={party.mapUrl} target="_blank" rel="noopener noreferrer">Open map 🗺️</a>
        <button className="btn" onClick={downloadICS}>Add to calendar 📆</button>
      </div>
    </section>
  )
}
