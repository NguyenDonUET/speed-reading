import { useMemo, useRef, useState } from 'react'
import {
  COMPREHENSION_THRESHOLD,
  describeWpmDelta,
  nextWpmFromScore,
  scoreQuiz,
} from '../../lib/progressive'
import type { ProgressiveResult, QuizQuestion } from '../../types'

interface QuizCardProps {
  questions: QuizQuestion[]
  sessionWpm: number
  variant?: 'practice' | 'baseline'
  onFinished: (result: {
    comprehension: number
    progressive: ProgressiveResult
    answers: number[]
  }) => void
}

export function QuizCard({
  questions,
  sessionWpm,
  variant = 'practice',
  onFinished,
}: QuizCardProps) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const finishedRef = useRef(false)

  const result = useMemo(() => {
    if (!done) return null
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct += 1
    })
    const comprehension = scoreQuiz(correct, questions.length)
    const progressive = nextWpmFromScore(sessionWpm, comprehension)
    return { comprehension, progressive, correct }
  }, [done, answers, questions, sessionWpm])

  const question = questions[index]

  const submitAnswer = (choiceIndex: number) => {
    if (selected != null) return
    setSelected(choiceIndex)
    const nextAnswers = [...answers, choiceIndex]
    setAnswers(nextAnswers)

    window.setTimeout(() => {
      if (index + 1 >= questions.length) {
        setDone(true)
        let correct = 0
        questions.forEach((q, i) => {
          if (nextAnswers[i] === q.correctIndex) correct += 1
        })
        const comprehension = scoreQuiz(correct, questions.length)
        const progressive = nextWpmFromScore(sessionWpm, comprehension)
        if (!finishedRef.current) {
          finishedRef.current = true
          onFinished({ comprehension, progressive, answers: nextAnswers })
        }
      } else {
        setIndex((i) => i + 1)
        setSelected(null)
      }
    }, 350)
  }

  if (done && result) {
    const met = result.comprehension >= COMPREHENSION_THRESHOLD
    const deltaLabel =
      result.progressive.delta === 'increase'
        ? 'Increase'
        : result.progressive.delta === 'decrease'
          ? 'Decrease'
          : 'Hold'

    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-sm font-medium uppercase tracking-wider text-ink-faint">
          {variant === 'baseline' ? 'Baseline result' : 'Session result'}
        </p>
        <h2 className="mt-2 font-ui text-3xl font-semibold text-ink">
          {result.comprehension}% comprehension
        </h2>
        <p className="mt-2 text-ink-muted">
          {variant === 'baseline' ? 'Natural pace' : 'Session pace'} {sessionWpm}{' '}
          WPM · {result.correct}/{questions.length} correct
          {variant === 'practice'
            ? ` · threshold ${COMPREHENSION_THRESHOLD}%`
            : ''}
        </p>
        {variant === 'practice' ? (
          <>
            <div
              className={[
                'mt-6 rounded-xl px-4 py-3 text-sm font-medium',
                met ? 'bg-accent-soft text-accent' : 'bg-paper-cool text-warn',
              ].join(' ')}
            >
              {met
                ? `At or above ${COMPREHENSION_THRESHOLD}% — pace can progress.`
                : `Below ${COMPREHENSION_THRESHOLD}% — pace will hold or step down.`}
            </div>
            <div className="mt-4 rounded-xl border border-border px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                Next WPM · {deltaLabel}
              </p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {result.progressive.nextWpm} WPM
                {result.progressive.deltaAmount !== 0
                  ? ` (${result.progressive.deltaAmount > 0 ? '+' : ''}${result.progressive.deltaAmount})`
                  : ''}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {describeWpmDelta(result.progressive)}
              </p>
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-xl border border-border px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Starting practice pace
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">{sessionWpm} WPM</p>
            <p className="mt-1 text-sm text-ink-muted">
              Guided sessions will begin from this natural measurement. Raise speed
              later only when comprehension stays at or above {COMPREHENSION_THRESHOLD}%.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium text-ink-faint">
        Question {index + 1} of {questions.length}
      </p>
      <h2 className="mt-3 font-ui text-xl font-semibold text-ink sm:text-2xl">
        {question.prompt}
      </h2>
      <ul className="mt-6 space-y-2">
        {question.choices.map((choice, i) => {
          const isSelected = selected === i
          return (
            <li key={choice}>
              <button
                type="button"
                disabled={selected != null}
                onClick={() => submitAnswer(i)}
                className={[
                  'w-full rounded-xl border px-4 py-3 text-left text-base transition',
                  isSelected
                    ? 'border-accent bg-accent-soft text-ink'
                    : 'border-border bg-paper hover:border-accent/50',
                ].join(' ')}
              >
                {choice}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
