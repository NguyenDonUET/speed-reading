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
  const [reachedEnd, setReachedEnd] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const finishedRef = useRef(false)

  const wordsRead = useMemo(() => {
    if (reachedEnd || index >= chunks.length) {
      return totalWords
    }
    return chunks.slice(0, index).reduce((sum, c) => sum + c.wordCount, 0)
  }, [chunks, index, reachedEnd, totalWords])

  const percent = totalWords === 0 ? 0 : (wordsRead / totalWords) * 100
  const remainingWords = Math.max(0, totalWords - wordsRead)
  const secondsRemaining = estimateSecondsRemaining(remainingWords, wpm)

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    onComplete(wpm)
  }, [onComplete, wpm])

  useEffect(() => {
    if (paused || finishedRef.current || reachedEnd) return
    if (index >= chunks.length) {
      setReachedEnd(true)
      setPaused(true)
      return
    }

    const chunk = chunks[index]
    const delay = msPerChunk(wpm, chunk.wordCount)
    let cancelled = false
    const timer = window.setTimeout(() => {
      if (cancelled || finishedRef.current) return
      setIndex((i) => i + 1)
    }, delay)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [index, paused, wpm, chunks, reachedEnd])

  const adjustWpm = (delta: number) => {
    setWpm((prev) => {
      const next = clampWpm(prev + delta)
      onWpmChange?.(next)
      return next
    })
  }

  const replay = useCallback(() => {
    finishedRef.current = false
    setIndex(0)
    setReachedEnd(false)
    setPaused(false)
  }, [])

  const isRsvp = mode === 'rsvp'
  const activeChunk = chunks[Math.min(index, Math.max(0, chunks.length - 1))]
  const displayPercent = reachedEnd ? 100 : Math.min(100, percent)

  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-paper">
      <ProgressStrip
        percent={displayPercent}
        secondsRemaining={reachedEnd ? 0 : secondsRemaining}
        wpm={wpm}
      />

      {isRsvp ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-3 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-14">
          <RsvpDisplay text={activeChunk?.text ?? ''} paused={paused} />
          {reachedEnd ? (
            <p className="mt-6 text-sm text-ink-muted">
              End of passage — tap Finish for the quiz, or Replay to practice again
            </p>
          ) : null}
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
          <div className="mx-auto w-full max-w-3xl pb-[22vh] pt-[8vh] sm:pb-[20vh] sm:pt-[14vh]">
            <ChunkHighlighter
              chunks={chunks}
              activeIndex={Math.min(index, Math.max(0, chunks.length - 1))}
              containerRef={containerRef}
            />
            {reachedEnd ? (
              <p className="mt-8 text-center text-sm text-ink-muted">
                End of passage — tap Finish for the quiz
              </p>
            ) : null}
          </div>
        </div>
      )}

      <SessionChrome
        paused={paused}
        wpm={wpm}
        onTogglePause={() => {
          if (reachedEnd) return
          setPaused((p) => !p)
        }}
        onWpmDelta={adjustWpm}
        showFinish
        onFinish={finish}
        endReached={reachedEnd}
        showReplay={isRsvp}
        onReplay={replay}
      />
    </div>
  )
}
