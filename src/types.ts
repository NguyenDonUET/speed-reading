export type HighlightMode = 'word' | 'phrase' | 'rsvp'
export type PassageTopic = 'fiction' | 'nonfiction' | 'news'
export type PassageLength = 'short' | 'medium' | 'long'

export interface QuizQuestion {
  id: string
  prompt: string
  choices: string[]
  correctIndex: number
}

export interface VocabWord {
  word: string
  definition: string
}

export interface Passage {
  id: string
  title: string
  topic: PassageTopic
  length: PassageLength
  text: string
  vocab: VocabWord[]
  quiz: QuizQuestion[]
  isBaseline?: boolean
}

export interface SessionSettings {
  mode: HighlightMode
  passageId: string
  length: PassageLength
  topic: PassageTopic | 'any'
  vocabFlash: boolean
  wpm: number
}

export interface BaselineRecord {
  wpm: number
  comprehension: number
  at: string
}

export interface SessionRecord {
  id: string
  at: string
  wpm: number
  comprehension: number
  mode: HighlightMode
  passageId: string
}

export interface StreakRecord {
  lastDate: string
  count: number
}

export interface PaceStore {
  baseline: BaselineRecord | null
  currentWpm: number
  settings: SessionSettings
  streak: StreakRecord
  sessions: SessionRecord[]
}

export type WpmDelta = 'increase' | 'hold' | 'decrease'

export interface ProgressiveResult {
  nextWpm: number
  delta: WpmDelta
  deltaAmount: number
  threshold: number
}
