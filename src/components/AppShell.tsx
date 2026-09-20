import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function AppShell({
  children,
  bare = false,
}: {
  children: ReactNode
  bare?: boolean
}) {
  if (bare) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/70 bg-surface/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-baseline gap-2 no-underline">
            <span className="font-ui text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
              Pace
            </span>
            <span className="hidden text-sm text-ink-muted sm:inline">
              measured speed reading
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium">
            <Link
              to="/"
              className="text-ink-muted no-underline transition-colors hover:text-accent"
            >
              Dashboard
            </Link>
            <Link
              to="/session/setup"
              className="rounded-lg bg-accent px-3 py-1.5 text-paper no-underline transition-colors hover:bg-accent-hover"
            >
              Practice
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}

export function PageTitle({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-8">
      <h1 className="font-ui text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-base text-ink-muted">{subtitle}</p>
      ) : null}
    </div>
  )
}
