import { formatDuration } from '../../lib/timing'

interface ProgressStripProps {
  percent: number
  secondsRemaining: number
  wpm: number
}

export function ProgressStrip({
  percent,
  secondsRemaining,
  wpm,
}: ProgressStripProps) {
  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-[env(safe-area-inset-top)]">
      <div className="h-1 w-full bg-border/40">
        <div
          className="h-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className="flex justify-between gap-2 px-3 pt-2 text-[11px] text-ink-faint sm:px-6 sm:text-xs">
        <span className="truncate">
          {Math.round(clamped)}% · {wpm} WPM
        </span>
        <span className="shrink-0">~{formatDuration(secondsRemaining)} left</span>
      </div>
    </div>
  )
}
