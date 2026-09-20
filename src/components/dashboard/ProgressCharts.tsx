import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { SessionRecord } from '../../types'

interface ProgressChartsProps {
  sessions: SessionRecord[]
}

function formatLabel(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function ProgressCharts({ sessions }: ProgressChartsProps) {
  const data = sessions.map((s, i) => ({
    name: formatLabel(s.at),
    index: i + 1,
    wpm: s.wpm,
    comprehension: s.comprehension,
  }))

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-16 text-center text-ink-muted">
        Complete a practice session to see WPM and comprehension over time.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <h2 className="font-ui text-lg font-semibold text-ink">
        Speed vs comprehension
      </h2>
      <p className="mt-1 text-sm text-ink-muted">
        Both metrics together — raising WPM only counts when understanding holds.
      </p>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d8dce0" />
            <XAxis dataKey="name" tick={{ fill: '#8a9198', fontSize: 12 }} />
            <YAxis
              yAxisId="wpm"
              tick={{ fill: '#8a9198', fontSize: 12 }}
              domain={[0, 'auto']}
              width={40}
            />
            <YAxis
              yAxisId="comp"
              orientation="right"
              tick={{ fill: '#8a9198', fontSize: 12 }}
              domain={[0, 100]}
              width={40}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: '#d8dce0',
                fontFamily: 'Outfit, sans-serif',
              }}
            />
            <Legend />
            <Line
              yAxisId="wpm"
              type="monotone"
              dataKey="wpm"
              name="WPM"
              stroke="#2a6f6a"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive
            />
            <Line
              yAxisId="comp"
              type="monotone"
              dataKey="comprehension"
              name="Comprehension %"
              stroke="#8a5a2b"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              dot={{ r: 3 }}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
