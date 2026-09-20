import type { ProgressiveResult } from '../types'
import { clampWpm } from './timing'

export const COMPREHENSION_THRESHOLD = 75
export const WPM_STEP = 25
export const HOLD_FLOOR = 50

export function nextWpmFromScore(
  currentWpm: number,
  comprehensionPercent: number,
): ProgressiveResult {
  const score = Math.round(comprehensionPercent)

  if (score >= COMPREHENSION_THRESHOLD) {
    const next = clampWpm(currentWpm + WPM_STEP)
    return {
      nextWpm: next,
      delta: next > currentWpm ? 'increase' : 'hold',
      deltaAmount: next - currentWpm,
      threshold: COMPREHENSION_THRESHOLD,
    }
  }

  if (score >= HOLD_FLOOR) {
    return {
      nextWpm: clampWpm(currentWpm),
      delta: 'hold',
      deltaAmount: 0,
      threshold: COMPREHENSION_THRESHOLD,
    }
  }

  const next = clampWpm(currentWpm - WPM_STEP)
  return {
    nextWpm: next,
    delta: next < currentWpm ? 'decrease' : 'hold',
    deltaAmount: next - currentWpm,
    threshold: COMPREHENSION_THRESHOLD,
  }
}

export function scoreQuiz(correct: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((correct / total) * 100)
}

export function describeWpmDelta(result: ProgressiveResult): string {
  if (result.delta === 'increase') {
    return `Next session target: ${result.nextWpm} WPM (+${result.deltaAmount}). Comprehension met the ${result.threshold}% threshold.`
  }
  if (result.delta === 'decrease') {
    return `Next session target: ${result.nextWpm} WPM (${result.deltaAmount}). Comprehension was below 50%, so pace steps down.`
  }
  return `Next session target stays at ${result.nextWpm} WPM. Keep practicing until comprehension reaches ${result.threshold}%.`
}
