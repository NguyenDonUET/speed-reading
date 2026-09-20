import type { HighlightMode } from '../types'

export interface TextChunk {
  text: string
  wordCount: number
  startWordIndex: number
}

/** Split text into whitespace-preserving word tokens. */
export function tokenizeWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean)
}

export function countWords(text: string): number {
  return tokenizeWords(text).length
}

/**
 * Build reading chunks:
 * - word: one word each
 * - phrase / rsvp: 2–4 words, preferring breaks near punctuation
 */
export function buildChunks(text: string, mode: HighlightMode): TextChunk[] {
  const words = tokenizeWords(text)
  if (words.length === 0) return []

  if (mode === 'word') {
    return words.map((word, i) => ({
      text: word,
      wordCount: 1,
      startWordIndex: i,
    }))
  }

  const chunks: TextChunk[] = []
  let i = 0
  while (i < words.length) {
    const remaining = words.length - i
    let size = Math.min(3, remaining)

    // Prefer ending a chunk after sentence/clause punctuation
    for (let look = Math.min(4, remaining); look >= 2; look--) {
      const candidate = words[i + look - 1]
      if (/[.!?;:,"']$/.test(candidate)) {
        size = look
        break
      }
    }

    // Vary between 2–4 when no punctuation cue
    if (size === 3 && remaining >= 4 && i % 5 === 0) {
      size = 4
    }
    if (size === 3 && remaining >= 2 && i % 7 === 3) {
      size = 2
    }
    size = Math.max(1, Math.min(size, remaining))

    const slice = words.slice(i, i + size)
    chunks.push({
      text: slice.join(' '),
      wordCount: slice.length,
      startWordIndex: i,
    })
    i += size
  }

  return chunks
}
