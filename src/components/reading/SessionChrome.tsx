interface SessionChromeProps {
  paused: boolean
  wpm: number
  onTogglePause: () => void
  onWpmDelta: (delta: number) => void
  onFinish?: () => void
  showFinish?: boolean
}

export function SessionChrome({
  paused,
  wpm,
  onTogglePause,
  onWpmDelta,
  onFinish,
  showFinish = false,
}: SessionChromeProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-paper from-40% via-paper/95 to-transparent pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-12">
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 px-3 opacity-100 sm:gap-3 sm:px-4 sm:opacity-70 sm:transition-opacity sm:hover:opacity-100 sm:focus-within:opacity-100">
        <button
          type="button"
          onClick={() => onWpmDelta(-25)}
          className="min-h-11 min-w-11 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-ink shadow-sm transition active:scale-[0.98] hover:border-accent hover:text-accent"
          aria-label="Decrease speed by 25 WPM"
        >
          −25
        </button>
        <button
          type="button"
          onClick={onTogglePause}
          className="min-h-11 min-w-28 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-paper shadow-sm transition active:scale-[0.98] hover:bg-accent-hover"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={() => onWpmDelta(25)}
          className="min-h-11 min-w-11 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-ink shadow-sm transition active:scale-[0.98] hover:border-accent hover:text-accent"
          aria-label="Increase speed by 25 WPM"
        >
          +25
        </button>
        <span className="w-full text-center text-sm text-ink-muted tabular-nums sm:ml-1 sm:w-auto sm:text-left">
          {wpm} WPM
        </span>
        {showFinish && onFinish ? (
          <button
            type="button"
            onClick={onFinish}
            className="min-h-11 rounded-lg border border-accent/40 bg-accent-soft px-3 py-2.5 text-sm font-medium text-accent transition active:scale-[0.98] hover:bg-accent hover:text-paper sm:ml-2"
          >
            Finish
          </button>
        ) : null}
      </div>
    </div>
  )
}
