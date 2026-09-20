import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { AppShell, PageTitle } from '../components/AppShell'
import { ProgressCharts } from '../components/dashboard/ProgressCharts'
import { StreakCard } from '../components/dashboard/StreakCard'
import {
  STORAGE_KEY,
  getStoreSnapshot,
  invalidateStoreCache,
} from '../lib/storage'

function subscribe(onStoreChange: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      invalidateStoreCache()
      onStoreChange()
    }
  }
  window.addEventListener('storage', handler)
  window.addEventListener('pace-store-updated', onStoreChange)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener('pace-store-updated', onStoreChange)
  }
}

export function DashboardPage() {
  const store = useSyncExternalStore(subscribe, getStoreSnapshot, getStoreSnapshot)

  return (
    <AppShell>
      <PageTitle
        title="Your pace"
        subtitle="WPM and comprehension stay paired. Progress means both moving in the right direction."
      />

      <StreakCard
        streakCount={store.streak.count}
        totalSessions={store.sessions.length}
        currentWpm={store.currentWpm}
      />

      <div className="mt-6">
        <Link
          to="/session/setup"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-base font-semibold text-paper no-underline transition hover:bg-accent-hover"
        >
          Start practice
        </Link>
      </div>

      <div className="mt-10">
        <ProgressCharts sessions={store.sessions} />
      </div>

      {store.sessions.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-ui text-lg font-semibold text-ink">Recent sessions</h2>
          <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
            {[...store.sessions]
              .reverse()
              .slice(0, 8)
              .map((s) => (
                <li
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
                >
                  <span className="text-ink-muted">
                    {new Date(s.at).toLocaleString()}
                  </span>
                  <span className="font-medium text-ink">
                    {s.wpm} WPM · {s.comprehension}% · {s.mode}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ) : null}
    </AppShell>
  )
}
