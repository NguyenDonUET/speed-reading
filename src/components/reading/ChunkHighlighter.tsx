import { useEffect, useRef } from 'react'
import type { TextChunk } from '../../lib/chunking'

interface ChunkHighlighterProps {
  chunks: TextChunk[]
  activeIndex: number
  containerRef: React.RefObject<HTMLDivElement | null>
}

/** Keep the active highlight near ~1/3 down the visible reading area. */
function scrollHighlightIntoView(
  el: HTMLElement,
  container: HTMLElement,
): void {
  const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Reserve space for progress strip (top) and session chrome (bottom)
  const topInset = Math.min(56, container.clientHeight * 0.12)
  const bottomInset = Math.min(120, container.clientHeight * 0.22)
  const usable = Math.max(80, container.clientHeight - topInset - bottomInset)
  const targetFromTop = topInset + usable * 0.33

  const containerRect = container.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  const elTopInView = elRect.top - containerRect.top
  const elBottomInView = elRect.bottom - containerRect.top
  const visibleTop = topInset
  const visibleBottom = container.clientHeight - bottomInset

  const fullyVisible =
    elTopInView >= visibleTop && elBottomInView <= visibleBottom

  // Still nudge toward the anchor so the line doesn't drift to the edges
  const elMid = elTopInView + elRect.height / 2
  const drift = elMid - targetFromTop
  const needsNudge = Math.abs(drift) > usable * 0.12

  if (fullyVisible && !needsNudge) return

  const nextScroll = container.scrollTop + drift
  const maxScroll = container.scrollHeight - container.clientHeight
  const clamped = Math.max(0, Math.min(maxScroll, nextScroll))

  if (preferReduced) {
    container.scrollTop = clamped
    return
  }

  container.scrollTo({
    top: clamped,
    behavior: 'smooth',
  })
}

export function ChunkHighlighter({
  chunks,
  activeIndex,
  containerRef,
}: ChunkHighlighterProps) {
  const activeRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = activeRef.current
    const container = containerRef.current
    if (!el || !container) return

    // Wait a frame so layout/highlight paint before measuring
    const frame = window.requestAnimationFrame(() => {
      scrollHighlightIntoView(el, container)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [activeIndex, containerRef])

  return (
    <p className="font-reading text-[1.125rem] leading-[1.8] text-ink sm:text-[1.35rem] sm:leading-[1.85]">
      {chunks.map((chunk, i) => {
        const isActive = i === activeIndex
        const isPast = i < activeIndex
        return (
          <span key={`${chunk.startWordIndex}-${i}`}>
            <span
              ref={isActive ? activeRef : undefined}
              className={[
                'rounded-sm px-0.5 transition-colors duration-200',
                isActive
                  ? 'bg-highlight text-ink shadow-[0_0_0_1px_rgba(42,111,106,0.25)]'
                  : isPast
                    ? 'text-ink-muted'
                    : 'text-ink',
              ].join(' ')}
            >
              {chunk.text}
            </span>{' '}
          </span>
        )
      })}
    </p>
  )
}
