/** Milliseconds to display a chunk at the given WPM. */
export function msPerChunk(wpm: number, wordCount: number): number {
  const safeWpm = Math.max(60, wpm)
  const words = Math.max(1, wordCount)
  return (60_000 / safeWpm) * words
}

/** Estimated remaining time in seconds for unread words. */
export function estimateSecondsRemaining(
  remainingWords: number,
  wpm: number,
): number {
  const safeWpm = Math.max(60, wpm)
  return Math.max(0, (remainingWords / safeWpm) * 60)
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds))
  const m = Math.floor(s / 60)
  const rem = s % 60
  if (m <= 0) return `${rem}s`
  return `${m}:${rem.toString().padStart(2, '0')}`
}

export function calculateNaturalWpm(wordCount: number, elapsedMs: number): number {
  const minutes = elapsedMs / 60_000
  if (minutes <= 0) return 0
  return Math.round(wordCount / minutes)
}

export function clampWpm(wpm: number, min = 100, max = 600): number {
  return Math.min(max, Math.max(min, Math.round(wpm)))
}
