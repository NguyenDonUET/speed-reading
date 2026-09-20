interface StreakCardProps {
  streakCount: number
  totalSessions: number
  currentWpm: number
  baselineWpm: number | null
  baselineComprehension: number | null
}

export function StreakCard({
  streakCount,
  totalSessions,
  currentWpm,
  baselineWpm,
  baselineComprehension,
}: StreakCardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat label="Practice streak" value={`${streakCount} day${streakCount === 1 ? '' : 's'}`} />
      <Stat label="Sessions completed" value={String(totalSessions)} />
      <Stat label="Current target" value={`${currentWpm} WPM`} />
      <Stat
        label="Baseline"
        value={
          baselineWpm != null
            ? `${baselineWpm} WPM · ${baselineComprehension ?? '—'}%`
            : 'Not set'
        }
      />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-2 font-ui text-xl font-semibold text-ink">{value}</p>
    </div>
  )
}
