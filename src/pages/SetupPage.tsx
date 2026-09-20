import { useNavigate } from 'react-router-dom'
import { AppShell, PageTitle } from '../components/AppShell'
import { DifficultyPanel } from '../components/settings/DifficultyPanel'
import { useSession } from '../context/useSession'

export function SetupPage() {
  const navigate = useNavigate()
  const { settings, updateSettings, beginSession } = useSession()

  return (
    <AppShell>
      <PageTitle
        title="Session setup"
        subtitle="Choose pace, display mode, and passage. Raise WPM only when comprehension stays strong."
      />
      <div className="rounded-2xl border border-border bg-surface/80 p-5 sm:p-8">
        <DifficultyPanel
          settings={settings}
          onChange={updateSettings}
          onStart={() => {
            const session = beginSession()
            if (session.vocabFlash && session.passage.vocab.length > 0) {
              navigate('/session/vocab')
            } else {
              navigate('/session/read')
            }
          }}
        />
      </div>
    </AppShell>
  )
}
