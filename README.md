# Ishanvi's 2nd Birthday 🦋

A playful, pastel butterfly-themed invite site for Ishanvi's 2nd birthday.

**Live:** https://madhank93.github.io/Ishanvi-2nd-bday/

🎀 **26th June 2026 · Friday · 7:00 PM · Amaravathi Restaurant**

## Features
- Animated hero with tappable confetti balloon
- Live countdown to the party
- Party details + add-to-calendar (.ics) + map link
- Photo/video gallery — 6-tile lineup that randomly rotates through 25 memories
- Interactive SVG butterflies (catch them!)
- RSVP form (Formspree)

## Tech
React + Vite. Auto-deploys to GitHub Pages via GitHub Actions on push to `main`.

```bash
npm install
npm run dev      # local dev
npm run build    # production build -> dist/
```

## Config
Edit `src/data/config.js`:
- `party` — date / time / venue / map
- `FORMSPREE_ID` — paste a Formspree form id to collect real RSVPs
- gallery photos live in `public/gallery/` (`photo-NN.jpg`, `clip-NN.mp4`)
