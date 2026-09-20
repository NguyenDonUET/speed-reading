# Pace

Local-first English speed-reading trainer. Practice with guided chunk highlighting or RSVP, check comprehension, and raise WPM only when understanding holds.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Recharts
- Progress persisted in `localStorage` (`pace.v1`)
- Package manager: **pnpm**

## Develop

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Flow

1. **Dashboard** — start practice anytime; optional baseline test
2. **Setup** — WPM, mode, topic/length, vocab flash
3. **Optional vocab flash** — rapid definitions
4. **Reading session** — word / phrase / RSVP with pause and ±WPM
5. **Quiz** — score vs 75% threshold; next WPM +25 / hold / −25
6. **Baseline (optional)** — unassisted read + quiz to compare natural pace
