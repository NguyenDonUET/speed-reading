import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageTitle } from '../components/AppShell'
import { QuizCard } from '../components/quiz/QuizCard'
import { useSession } from '../context/useSession'
import { applyNextWpm, recordSession } from '../lib/storage'

export function QuizPage() {
  const navigate = useNavigate()
  const { active, clearActive } = useSession()
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!active) navigate('/session/setup', { replace: true })
  }, [active, navigate])

  if (!active) return null

  return (
    <AppShell>
      <PageTitle
        title="Comprehension check"
        subtitle="A short quiz right after reading — then an honest update to your next target WPM."
      />
      <QuizCard
        questions={active.passage.quiz}
        sessionWpm={active.wpm}
        onFinished={({ comprehension, progressive }) => {
          recordSession({
            wpm: active.wpm,
            comprehension,
            mode: active.mode,
            passageId: active.passage.id,
          })
          applyNextWpm(progressive.nextWpm)
          setFinished(true)
        }}
      />
      {finished ? (
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              clearActive()
              navigate('/')
            }}
            className="rounded-xl bg-accent px-5 py-3 font-semibold text-paper hover:bg-accent-hover"
          >
            Back to dashboard
          </button>
          <button
            type="button"
            onClick={() => {
              clearActive()
              navigate('/session/setup')
            }}
            className="rounded-xl border border-border bg-surface px-5 py-3 font-semibold text-ink hover:border-accent"
          >
            Practice again
          </button>
        </div>
      ) : null}
    </AppShell>
  )
}
