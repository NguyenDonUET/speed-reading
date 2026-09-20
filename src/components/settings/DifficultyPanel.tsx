import { filterPassages } from '../../lib/passages'
import { clampWpm } from '../../lib/timing'
import type {
  HighlightMode,
  PassageLength,
  PassageTopic,
  SessionSettings,
} from '../../types'

interface DifficultyPanelProps {
  settings: SessionSettings
  onChange: (partial: Partial<SessionSettings>) => void
  onStart: () => void
}

const MODES: { id: HighlightMode; label: string; hint: string }[] = [
  { id: 'word', label: 'Word-by-word', hint: 'Highlight one word at a time in the passage' },
  { id: 'phrase', label: 'Phrase chunking', hint: 'Highlight 2–4 word phrases in context' },
  { id: 'rsvp', label: 'Fixed RSVP', hint: 'Chunks appear at one center focus point' },
]

const TOPICS: { id: PassageTopic | 'any'; label: string }[] = [
  { id: 'any', label: 'Any topic' },
  { id: 'fiction', label: 'Fiction' },
  { id: 'nonfiction', label: 'Non-fiction' },
  { id: 'news', label: 'News' },
]

const LENGTHS: { id: PassageLength; label: string }[] = [
  { id: 'short', label: 'Short' },
  { id: 'medium', label: 'Medium' },
  { id: 'long', label: 'Long' },
]

export function DifficultyPanel({
  settings,
  onChange,
  onStart,
}: DifficultyPanelProps) {
  const available = filterPassages(
    settings.topic,
    settings.length,
  )
  const passageOptions =
    available.length > 0
      ? available
      : filterPassages('any', settings.length)

  return (
    <div className="space-y-8">
      <section>
        <label className="block text-sm font-semibold text-ink" htmlFor="wpm">
          Target pace: {settings.wpm} WPM
        </label>
        <input
          id="wpm"
          type="range"
          min={100}
          max={600}
          step={25}
          value={settings.wpm}
          onChange={(e) => onChange({ wpm: clampWpm(Number(e.target.value)) })}
          className="mt-3 w-full accent-accent"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-faint">
          <span>100</span>
          <span>600</span>
        </div>
      </section>

      <section>
        <p className="text-sm font-semibold text-ink">Highlight mode</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {MODES.map((mode) => {
            const active = settings.mode === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onChange({ mode: mode.id })}
                className={[
                  'rounded-xl border px-3 py-3 text-left transition',
                  active
                    ? 'border-accent bg-accent-soft'
                    : 'border-border bg-surface hover:border-accent/40',
                ].join(' ')}
              >
                <span className="block text-sm font-semibold text-ink">
                  {mode.label}
                </span>
                <span className="mt-1 block text-xs text-ink-muted">{mode.hint}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-ink">Topic</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange({ topic: t.id })}
                className={[
                  'rounded-lg border px-3 py-1.5 text-sm transition',
                  settings.topic === t.id
                    ? 'border-accent bg-accent text-paper'
                    : 'border-border bg-surface text-ink hover:border-accent/40',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Passage length</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LENGTHS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onChange({ length: l.id })}
                className={[
                  'rounded-lg border px-3 py-1.5 text-sm transition',
                  settings.length === l.id
                    ? 'border-accent bg-accent text-paper'
                    : 'border-border bg-surface text-ink hover:border-accent/40',
                ].join(' ')}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <label className="text-sm font-semibold text-ink" htmlFor="passage">
          Passage
        </label>
        <select
          id="passage"
          className="mt-2 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-ink"
          value={
            passageOptions.some((p) => p.id === settings.passageId)
              ? settings.passageId
              : passageOptions[0]?.id
          }
          onChange={(e) => onChange({ passageId: e.target.value })}
        >
          {passageOptions.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} ({p.topic})
            </option>
          ))}
        </select>
      </section>

      <section>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3">
          <input
            type="checkbox"
            className="mt-1 accent-accent"
            checked={settings.vocabFlash}
            onChange={(e) => onChange({ vocabFlash: e.target.checked })}
          />
          <span>
            <span className="block text-sm font-semibold text-ink">
              Pre-reading vocabulary flash
            </span>
            <span className="mt-0.5 block text-sm text-ink-muted">
              Briefly show difficult words and short definitions before the passage.
            </span>
          </span>
        </label>
      </section>

      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-xl bg-accent px-4 py-3 text-base font-semibold text-paper transition hover:bg-accent-hover sm:w-auto sm:min-w-48"
      >
        Start session
      </button>
    </div>
  )
}
