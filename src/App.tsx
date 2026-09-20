import { Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from './context/session-context'
import { BaselinePage } from './pages/BaselinePage'
import { DashboardPage } from './pages/DashboardPage'
import { QuizPage } from './pages/QuizPage'
import { ReadPage } from './pages/ReadPage'
import { SetupPage } from './pages/SetupPage'
import { VocabPage } from './pages/VocabPage'

export default function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/baseline" element={<BaselinePage />} />
        <Route path="/session/setup" element={<SetupPage />} />
        <Route path="/session/vocab" element={<VocabPage />} />
        <Route path="/session/read" element={<ReadPage />} />
        <Route path="/session/quiz" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SessionProvider>
  )
}
