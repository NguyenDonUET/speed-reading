import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReadingSessionView } from '../components/reading/ReadingSessionView'
import { useSession } from '../context/useSession'
import { setCurrentWpm } from '../lib/storage'

const DEFAULT_SESSION_WPM = 150

export function ReadPage() {
  const navigate = useNavigate()
  const { active, setActiveWpm } = useSession()

  useEffect(() => {
    if (!active) navigate('/session/setup', { replace: true })
  }, [active, navigate])

  useEffect(() => {
    if (!active) return
    setActiveWpm(DEFAULT_SESSION_WPM)
  }, [active?.passage.id, setActiveWpm])

  if (!active) return null

  return (
    <ReadingSessionView
      key={`${active.passage.id}-150`}
      text={active.passage.text}
      mode={active.mode}
      initialWpm={DEFAULT_SESSION_WPM}
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
