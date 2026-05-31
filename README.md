# Clème.

> A production-deployed, single-file web app featuring a live world clock, Pomodoro focus timer, and generative SVG wave animations — built entirely in vanilla HTML, CSS, and JavaScript with zero dependencies.

**Live →** [cleme.designedbysaif.com](https://cleme.designedbysaif.com)

---

## Overview

Clème. was built around a single idea: make time feel calm rather than urgent. Most clock apps demand your attention. Clème. simply exists alongside you — soft colours, weightless typography, and slow-drifting waves that make you forget you're looking at a productivity tool.

Every design decision is intentional. The sage green palette eases eye strain during long sessions. Poppins at weight 300 feels almost weightless on screen. The layered SVG waves at the bottom drift at different speeds — 6 independent animations running simultaneously, creating a topographic depth with zero libraries.

---

## Features

### Clock
- Live local time with real-time updates every second
- Toggle between **12h** (with styled am./pm. indicator) and **24h** formats
- Large, centered display that scales fluidly across any screen size using `clamp()`

### World Clock
- Search across **75+ cities and timezones** from a single input
- Live time previews update every second inside the search panel
- Selected city label appears beneath the clock — subtle, never intrusive
- Powered entirely by the `Intl.DateTimeFormat` API — no external data

### Pomodoro Focus Timer
- Custom duration slider from **1 to 120 minutes**
- Runs silently in the background — switch to clock view without interrupting the session
- A small countdown indicator appears under the clock while the timer is active
- Soft three-note chime on completion using the **Web Audio API** (no audio files)
- Browser notification support
- Start, Pause, Reset, and Cancel controls

### Theming
- **4 font families** — Poppins, Playfair Display, DM Sans, Space Grotesk
- **21 colour palettes** spanning pastels, lights, and deep darks
- All colours defined as CSS custom properties — switching is instant and smooth
- Text and wave colours adapt automatically per palette for consistent readability

### Experience
- **Fullscreen mode** — hides the browser chrome entirely via the Fullscreen API
- Press `F` to toggle fullscreen from anywhere on the page
- Fully responsive — optimised for desktop, mobile portrait, and mobile landscape
- Animated SVG waves — 6 independently drifting layers, pure CSS `@keyframes`

---

## Technical Highlights

| Concern | Approach |
|---|---|
| Zero dependencies | Vanilla HTML, CSS, JavaScript only |
| Timezone handling | `Intl.DateTimeFormat` with `formatToParts` |
| Audio | Web Audio API oscillators — no audio files |
| Animations | Pure CSS `@keyframes` on SVG path elements |
| Responsive type | `clamp()` for fluid font scaling |
| Theming | CSS custom properties (`--bg`, `--text`, `--wave`) |
| Fullscreen | Native Fullscreen API |
| Deployment | Vercel, custom subdomain via Squarespace DNS |

---

## Project Structure

```
cleme/
├── index.html     # Markup and SVG wave layers
├── style.css      # Layout, theming, animations, responsive breakpoints
└── script.js      # Clock, timer, world clock, audio, font/palette switching
```

---

## Running Locally

No build step, no package manager, no configuration.

```bash
git clone https://github.com/saifDoesCode/cleme-clock.git
cd cleme-clock
open index.html
```

Or serve it locally:

```bash
npx serve .
```

---

## Design Philosophy

Clème. is part of a broader vision under [designedbysaif.com](https://designedbysaif.com) — a suite of minimal, aesthetic web tools that share the same design language. Calm colours, light typography, intentional interactions. Nothing loud, nothing wasted.

---

## Author

**Saif Ahmed**

[LinkedIn](https://www.linkedin.com/in/saif-ahmed-6ba859257/) · [GitHub](https://github.com/saifDoesCode) · [saifanis03@gmail.com](mailto:saifanis03@gmail.com) · [designedbysaif.com](https://designedbysaif.com)
