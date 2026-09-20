import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageTitle } from '../components/AppShell'
import { VocabFlash } from '../components/vocab/VocabFlash'
import { useSession } from '../context/useSession'

export function VocabPage() {
  const navigate = useNavigate()
  const { active } = useSession()

  useEffect(() => {
    if (!active) navigate('/session/setup', { replace: true })
  }, [active, navigate])

  if (!active) return null

  const goRead = () => navigate('/session/read')

  return (
    <AppShell>
      <PageTitle
        title="Quick vocabulary"
        subtitle="Words likely to slow you down in the next passage. Glance and move on."
      />
      <VocabFlash
        words={active.passage.vocab}
        onDone={goRead}
        onSkip={goRead}
      />
    </AppShell>
  )
}
