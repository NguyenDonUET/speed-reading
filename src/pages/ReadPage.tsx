import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReadingSessionView } from '../components/reading/ReadingSessionView'
import { useSession } from '../context/useSession'
import { setCurrentWpm } from '../lib/storage'

export function ReadPage() {
  const navigate = useNavigate()
  const { active, setActiveWpm } = useSession()

  useEffect(() => {
    if (!active) navigate('/session/setup', { replace: true })
  }, [active, navigate])

  if (!active) return null

  return (
    <ReadingSessionView
      text={active.passage.text}
      mode={active.mode}
      initialWpm={active.wpm}
      onWpmChange={(wpm) => {
        setActiveWpm(wpm)
        setCurrentWpm(wpm)
      }}
      onComplete={(finalWpm) => {
        setActiveWpm(finalWpm)
        setCurrentWpm(finalWpm)
        navigate('/session/quiz')
      }}
    />
  )
}
