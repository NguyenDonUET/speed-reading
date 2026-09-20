import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { pickPassage } from '../lib/passages'
import { loadStore, saveSettings } from '../lib/storage'
import type { HighlightMode, Passage, SessionSettings } from '../types'

export interface ActiveSession {
  passage: Passage
  mode: HighlightMode
  wpm: number
  vocabFlash: boolean
  startedAt: string
}

export interface SessionContextValue {
  settings: SessionSettings
  active: ActiveSession | null
  updateSettings: (partial: Partial<SessionSettings>) => void
  beginSession: (overrides?: Partial<SessionSettings>) => ActiveSession
  clearActive: () => void
  setActiveWpm: (wpm: number) => void
}

export const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SessionSettings>(() => loadStore().settings)
  const [active, setActive] = useState<ActiveSession | null>(null)

  const updateSettings = useCallback((partial: Partial<SessionSettings>) => {
    const next = saveSettings(partial)
    setSettings(next)
  }, [])

  const beginSession = useCallback(
    (overrides?: Partial<SessionSettings>) => {
      const merged = { ...settings, ...overrides }
      const passage = pickPassage(merged.topic, merged.length, merged.passageId)
      const session: ActiveSession = {
        passage,
        mode: merged.mode,
        wpm: merged.wpm,
        vocabFlash: merged.vocabFlash,
        startedAt: new Date().toISOString(),
      }
      saveSettings({
        ...merged,
        passageId: passage.id,
      })
      setSettings((s) => ({ ...s, ...merged, passageId: passage.id }))
      setActive(session)
      return session
    },
    [settings],
  )

  const clearActive = useCallback(() => setActive(null), [])

  const setActiveWpm = useCallback((wpm: number) => {
    setActive((prev) => (prev ? { ...prev, wpm } : prev))
  }, [])

  const value = useMemo(
    () => ({
      settings,
      active,
      updateSettings,
      beginSession,
      clearActive,
      setActiveWpm,
    }),
    [settings, active, updateSettings, beginSession, clearActive, setActiveWpm],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
