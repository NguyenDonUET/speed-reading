interface RsvpDisplayProps {
  text: string
  paused: boolean
}

export function RsvpDisplay({ text, paused }: RsvpDisplayProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center px-2">
      <div className="relative w-full max-w-xl">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-accent/30 sm:h-12"
          aria-hidden
        />
        <div
          key={text}
          className={[
            'px-1 text-center font-reading text-2xl font-semibold tracking-tight text-ink break-words sm:text-4xl',
            'animate-[rsvpIn_180ms_ease-out]',
            paused ? 'opacity-60' : '',
          ].join(' ')}
        >
          {text || '…'}
        </div>
      </div>
      <p className="mt-8 text-xs text-ink-faint sm:mt-10 sm:text-sm">
        Focus point — eyes stay here
      </p>
      <style>{`
        @keyframes rsvpIn {
          from { opacity: 0.35; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes rsvpIn {
            from { opacity: 1; transform: none; }
            to { opacity: 1; transform: none; }
          }
        }
      `}</style>
    </div>
  )
}
