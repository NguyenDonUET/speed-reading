import type {
  BaselineRecord,
  PaceStore,
  SessionRecord,
  SessionSettings,
  StreakRecord,
} from '../types'
import { clampWpm } from './timing'

const STORAGE_KEY = 'pace.v1'

const DEFAULT_SETTINGS: SessionSettings = {
  mode: 'phrase',
  passageId: 'fox-forest',
  length: 'medium',
  topic: 'any',
  vocabFlash: true,
  wpm: 150,
}

let cachedStore: PaceStore | null = null

function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

function defaultStore(): PaceStore {
  return {
    baseline: null,
    currentWpm: 150,
    settings: { ...DEFAULT_SETTINGS },
    streak: { lastDate: '', count: 0 },
    sessions: [],
  }
}

function parseStore(raw: string | null): PaceStore {
  if (!raw) return defaultStore()
  try {
    const parsed = JSON.parse(raw) as Partial<PaceStore>
    return {
      ...defaultStore(),
      ...parsed,
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
      streak: { lastDate: '', count: 0, ...parsed.streak },
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
    }
  } catch {
    return defaultStore()
  }
}

export function loadStore(): PaceStore {
  if (cachedStore) return cachedStore
  cachedStore = parseStore(localStorage.getItem(STORAGE_KEY))
  return cachedStore
}

/** Invalidate in-memory cache (e.g. other tab wrote to localStorage). */
export function invalidateStoreCache(): void {
  cachedStore = null
}

/** Stable snapshot for useSyncExternalStore. */
export function getStoreSnapshot(): PaceStore {
  return loadStore()
}

export function saveStore(store: PaceStore): void {
  cachedStore = store
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  window.dispatchEvent(new Event('pace-store-updated'))
}

function updateStreak(streak: StreakRecord, at = new Date()): StreakRecord {
  const today = todayKey(at)
  if (streak.lastDate === today) return streak

  const yesterday = new Date(at)
  yesterday.setDate(yesterday.getDate() - 1)
  const yKey = todayKey(yesterday)

  if (streak.lastDate === yKey) {
    return { lastDate: today, count: streak.count + 1 }
  }
  return { lastDate: today, count: 1 }
}

export function getCurrentWpm(): number {
  return loadStore().currentWpm
}

export function saveSettings(partial: Partial<SessionSettings>): SessionSettings {
  const store = { ...loadStore(), settings: { ...loadStore().settings } }
  store.settings = {
    ...store.settings,
    ...partial,
    wpm: clampWpm(partial.wpm ?? store.settings.wpm),
  }
  if (partial.wpm != null) {
    store.currentWpm = clampWpm(partial.wpm)
  }
  saveStore(store)
  return store.settings
}

export function setCurrentWpm(wpm: number): number {
  const prev = loadStore()
  const store: PaceStore = {
    ...prev,
    currentWpm: clampWpm(wpm),
    settings: { ...prev.settings, wpm: clampWpm(wpm) },
  }
  saveStore(store)
  return store.currentWpm
}

export function recordBaseline(
  wpm: number,
  comprehension: number,
): BaselineRecord {
  const prev = loadStore()
  const record: BaselineRecord = {
    wpm: Math.round(wpm),
    comprehension: Math.round(comprehension),
    at: new Date().toISOString(),
  }
  const nextWpm = clampWpm(record.wpm)
  const store: PaceStore = {
    ...prev,
    baseline: record,
    currentWpm: nextWpm,
    settings: { ...prev.settings, wpm: nextWpm },
    streak: updateStreak(prev.streak),
  }
  saveStore(store)
  return record
}

export function recordSession(
  input: Omit<SessionRecord, 'id' | 'at'> & { at?: string },
): SessionRecord {
  const prev = loadStore()
  const record: SessionRecord = {
    id: crypto.randomUUID(),
    at: input.at ?? new Date().toISOString(),
    wpm: Math.round(input.wpm),
    comprehension: Math.round(input.comprehension),
    mode: input.mode,
    passageId: input.passageId,
  }
  const store: PaceStore = {
    ...prev,
    sessions: [...prev.sessions, record].slice(-100),
    streak: updateStreak(prev.streak, new Date(record.at)),
  }
  saveStore(store)
  return record
}

export function applyNextWpm(nextWpm: number): number {
  return setCurrentWpm(nextWpm)
}

export { DEFAULT_SETTINGS, STORAGE_KEY }
