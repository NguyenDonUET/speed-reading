import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildChunks } from '../../lib/chunking'
import { clampWpm, estimateSecondsRemaining, msPerChunk } from '../../lib/timing'
import type { HighlightMode } from '../../types'
import { ChunkHighlighter } from './ChunkHighlighter'
import { ProgressStrip } from './ProgressStrip'
import { SessionChrome } from './SessionChrome'
import { RsvpDisplay } from './RsvpDisplay'

interface ReadingSessionViewProps {
  text: string
  mode: HighlightMode
  initialWpm: number
  onComplete: (finalWpm: number) => void
  onWpmChange?: (wpm: number) => void
}

export function ReadingSessionView({
  text,
  mode,
  initialWpm,
  onComplete,
  onWpmChange,
}: ReadingSessionViewProps) {
  const chunks = useMemo(() => buildChunks(text, mode), [text, mode])
  const totalWords = useMemo(
    () => chunks.reduce((sum, c) => sum + c.wordCount, 0),
    [chunks],
  )

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [wpm, setWpm] = useState(initialWpm)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const completedRef = useRef(false)

  const wordsRead = useMemo(() => {
    return chunks.slice(0, index).reduce((sum, c) => sum + c.wordCount, 0)
  }, [chunks, index])

  const percent = totalWords === 0 ? 0 : (wordsRead / totalWords) * 100
  const remainingWords = Math.max(0, totalWords - wordsRead)
  const secondsRemaining = estimateSecondsRemaining(remainingWords, wpm)

  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete(wpm)
  }, [onComplete, wpm])

  useEffect(() => {
    if (paused || completedRef.current) return
    if (index >= chunks.length) {
      finish()
      return
    }

    const chunk = chunks[index]
    const delay = msPerChunk(wpm, chunk.wordCount)
    let cancelled = false
    const timer = window.setTimeout(() => {
      if (cancelled || completedRef.current) return
      setIndex((i) => i + 1)
    }, delay)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [index, paused, wpm, chunks, finish])

  const adjustWpm = (delta: number) => {
    setWpm((prev) => {
      const next = clampWpm(prev + delta)
      onWpmChange?.(next)
      return next
    })
  }

  const isRsvp = mode === 'rsvp'
  const activeChunk = chunks[Math.min(index, chunks.length - 1)]

  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-paper">
      <ProgressStrip
        percent={Math.min(100, percent)}
        secondsRemaining={secondsRemaining}
        wpm={wpm}
      />

      {isRsvp ? (
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-14">
          <RsvpDisplay text={activeChunk?.text ?? ''} paused={paused} />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain px-3 pt-12 sm:px-6 sm:pt-14"
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="mx-auto w-full max-w-3xl pb-[40vh] pt-[18vh] sm:pb-[35vh] sm:pt-[28vh]">
            <ChunkHighlighter
              chunks={chunks}
              activeIndex={Math.min(index, chunks.length - 1)}
              containerRef={containerRef}
            />
          </div>
        </div>
      )}

      <SessionChrome
        paused={paused}
        wpm={wpm}
        onTogglePause={() => setPaused((p) => !p)}
        onWpmDelta={adjustWpm}
        showFinish
        onFinish={finish}
      />
    </div>
  )
}
