import { useEffect, useState } from 'react'
import type { VocabWord } from '../../types'

interface VocabFlashProps {
  words: VocabWord[]
  onDone: () => void
  onSkip: () => void
  secondsPerCard?: number
}

export function VocabFlash({
  words,
  onDone,
  onSkip,
  secondsPerCard = 1.5,
}: VocabFlashProps) {
  const [index, setIndex] = useState(0)
  const list = words.slice(0, 10)

  useEffect(() => {
    if (list.length === 0) {
      onDone()
      return
    }
    if (index >= list.length) {
      onDone()
      return
    }
    const timer = window.setTimeout(() => {
      setIndex((i) => i + 1)
    }, secondsPerCard * 1000)
    return () => window.clearTimeout(timer)
  }, [index, list.length, onDone, secondsPerCard])

  if (list.length === 0) return null

  const current = list[Math.min(index, list.length - 1)]
  const progress = Math.min(100, ((index + 1) / list.length) * 100)

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
      <p className="mb-6 text-sm font-medium uppercase tracking-wider text-ink-faint">
        Vocabulary pre-flash · {Math.min(index + 1, list.length)}/{list.length}
      </p>
      <div
        key={current.word}
        className="w-full rounded-2xl border border-border bg-surface px-8 py-12 shadow-sm animate-[fadeUp_200ms_ease-out]"
      >
        <h2 className="font-reading text-4xl font-semibold text-ink">{current.word}</h2>
        <p className="mt-4 text-lg text-ink-muted">{current.definition}</p>
      </div>
      <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="mt-8 text-sm text-ink-muted underline-offset-2 hover:text-accent hover:underline"
      >
        Skip vocabulary
      </button>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0.4; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
