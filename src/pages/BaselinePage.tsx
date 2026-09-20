import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageTitle } from '../components/AppShell'
import { QuizCard } from '../components/quiz/QuizCard'
import { countWords } from '../lib/chunking'
import { getBaselinePassage } from '../lib/passages'
import {
  applyNextWpm,
  recordBaseline,
  recordSession,
} from '../lib/storage'
import { calculateNaturalWpm } from '../lib/timing'

type Phase = 'intro' | 'reading' | 'quiz' | 'done'

export function BaselinePage() {
  const navigate = useNavigate()
  const passage = useMemo(() => getBaselinePassage(), [])
  const wordCount = useMemo(() => countWords(passage.text), [passage.text])

  const [phase, setPhase] = useState<Phase>('intro')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [naturalWpm, setNaturalWpm] = useState(0)
  const [comprehension, setComprehension] = useState<number | null>(null)

  const startReading = () => {
    setStartedAt(Date.now())
    setPhase('reading')
  }

  const finishReading = () => {
    if (startedAt == null) return
    const elapsed = Date.now() - startedAt
    const wpm = calculateNaturalWpm(wordCount, elapsed)
    setNaturalWpm(Math.max(100, Math.min(600, wpm || 100)))
    setPhase('quiz')
  }

  return (
    <AppShell bare={phase === 'reading'}>
      {phase === 'intro' ? (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            Baseline test
          </p>
          <PageTitle
            title="Measure your natural pace"
            subtitle="Read without highlighting or auto-scroll. We only time you and check comprehension — useful as a comparison point for guided practice."
          />
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-ink-muted">
            <p>
              Passage: <span className="font-medium text-ink">{passage.title}</span> ·{' '}
              {wordCount} words · no assistance
            </p>
          </div>
          <button
            type="button"
            onClick={startReading}
            className="mt-8 rounded-xl bg-accent px-5 py-3 font-semibold text-paper hover:bg-accent-hover"
          >
            Start baseline
          </button>
        </div>
      ) : null}

      {phase === 'reading' ? (
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-24 pt-10 sm:px-6">
          <p className="mb-6 text-sm text-ink-faint">
            Unassisted reading · tap Finish when done
          </p>
          <article className="font-reading text-[1.25rem] leading-[1.85] text-ink sm:text-[1.35rem]">
            {passage.text}
          </article>
          <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-paper via-paper/95 to-transparent py-6">
            <div className="mx-auto flex max-w-3xl justify-center px-4">
              <button
                type="button"
                onClick={finishReading}
                className="rounded-xl bg-accent px-6 py-3 font-semibold text-paper hover:bg-accent-hover"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {phase === 'quiz' || phase === 'done' ? (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <p className="mb-6 text-center text-sm text-ink-muted">
            Natural pace measured at{' '}
            <span className="font-semibold text-ink">{naturalWpm} WPM</span>. Answer a
            few questions to check comprehension.
          </p>
          <QuizCard
            questions={passage.quiz}
            sessionWpm={naturalWpm}
            variant="baseline"
            onFinished={({ comprehension: score }) => {
              setComprehension(score)
              recordBaseline(naturalWpm, score)
              recordSession({
                wpm: naturalWpm,
                comprehension: score,
                mode: 'word',
                passageId: passage.id,
              })
              applyNextWpm(naturalWpm)
              setPhase('done')
            }}
          />
          {phase === 'done' && comprehension != null ? (
            <div className="mt-8 text-center">
              <p className="text-ink-muted">
                Baseline saved: {naturalWpm} WPM with {comprehension}% comprehension.
                Practice will start from this pace.
              </p>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="mt-6 rounded-xl bg-accent px-5 py-3 font-semibold text-paper hover:bg-accent-hover"
              >
                Go to dashboard
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </AppShell>
  )
}
