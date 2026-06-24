// Party config — edit placeholders here.
export const party = {
  name: 'Ishanvi',
  age: 2,
  // Local time of the party (used for countdown). 26 June 2026, Friday, 7:00 PM.
  dateISO: '2026-06-26T19:00:00',
  dateLabel: '26th June 2026 · Friday',
  timeLabel: '7:00 PM',
  venue: 'Amaravathi Restaurant',
  // PLACEHOLDER — replace with real address / Google Maps link.
  venueAddress: 'Amaravathi Restaurant (address TBD)',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Amaravathi+Restaurant',
}

// PLACEHOLDER — paste your Formspree form id (e.g. "xrgkabcd").
// Get one free at https://formspree.io. Until set, the form runs in demo mode.
export const FORMSPREE_ID = ''

// Gallery photos live in /public/gallery (photo-01.jpg ... photo-22.jpg).
// Captions cycle through this list; order is shuffled randomly on each load.
const CAPTIONS = [
  'Our little fairy 🧚', 'Sweet as cake 🍓', 'Butterfly kisses 🦋',
  'Giggles & bows 🎀', 'Tiny dancer 💕', 'Two & adorable ✨',
  'Snow princess ❄️', 'Pumpkin cutie 🎃', 'Little mermaid 🧜', 'Heart stealer ❤️',
]

const PHOTO_COUNT = 22

const VIDEO_COUNT = 3 // clip-01.mp4 ... clip-03.mp4 in /public/gallery

const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  type: 'image',
  src: `${import.meta.env.BASE_URL}gallery/photo-${String(i + 1).padStart(2, '0')}.jpg`,
  caption: CAPTIONS[i % CAPTIONS.length],
}))

const clips = Array.from({ length: VIDEO_COUNT }, (_, i) => ({
  type: 'video',
  src: `${import.meta.env.BASE_URL}gallery/clip-${String(i + 1).padStart(2, '0')}.mp4`,
  caption: 'Caught on camera 🎥',
}))

// Photos + videos share one rotation pool.
export const gallery = [...photos, ...clips]

// PLACEHOLDER featured highlight video (e.g. the decor/theme clip).
// Set src to show a big player section; leave '' to hide it.
export const featuredVideo = {
  src: '',          // e.g. '/videos/highlight.mp4'
  poster: '',       // e.g. '/videos/highlight.jpg'
  title: 'A little sneak peek 🎀',
}
