import type { HighlightMode } from '../types'

export interface TextChunk {
  text: string
  wordCount: number
  startWordIndex: number
}

/** Split text into whitespace-separated word tokens. */
export function tokenizeWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean)
}

export function countWords(text: string): number {
  return tokenizeWords(text).length
}

function bare(word: string): string {
  return word.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, '').toLowerCase()
}

function hasStrongBreak(word: string): boolean {
  return /[.!?;:]["')\]]*$/.test(word)
}

function hasCommaBreak(word: string): boolean {
  return /,$/.test(word) || /,"$/.test(word)
}

function isCapitalized(word: string): boolean {
  const core = word.replace(/^[^A-Za-z]+/, '')
  return /^[A-Z]/.test(core)
}

const DETERMINERS = new Set([
  'a', 'an', 'the', 'this', 'that', 'these', 'those',
  'my', 'your', 'his', 'her', 'its', 'our', 'their',
  'some', 'any', 'no', 'every', 'each', 'another', 'both',
  'few', 'many', 'much', 'several', 'all', 'half', 'such',
  'what', 'which', 'whose',
])

const PREPOSITIONS = new Set([
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
  'into', 'onto', 'upon', 'over', 'under', 'about', 'after',
  'before', 'between', 'among', 'through', 'during', 'without',
  'within', 'against', 'across', 'along', 'around', 'behind',
  'beyond', 'near', 'toward', 'towards', 'until', 'via', 'above',
  'below', 'beside', 'besides', 'inside', 'outside', 'since',
  'unlike', 'per', 'plus', 'except', 'despite', 'throughout',
  'underneath',
])

const AUXILIARIES = new Set([
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing',
  'will', 'would', 'shall', 'should', 'can', 'could', 'may',
  'might', 'must', 'ought',
])

const NEGATION = new Set(['not', "n't", 'never', 'nor'])

const COORD_CONJ = new Set(['and', 'but', 'or', 'nor', 'yet', 'so'])

const CLAUSE_STARTERS = new Set([
  'when', 'while', 'although', 'though', 'because', 'if', 'unless',
  'whether', 'whereas', 'where', 'why', 'how', 'who', 'whom', 'whose',
  'which', 'that',
])

const PRONOUNS = new Set([
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her',
  'us', 'them', 'myself', 'yourself', 'himself', 'herself', 'itself',
  'ourselves', 'themselves',
])

/** Frequent English verbs — helps end NPs before predicates. */
const COMMON_VERBS = new Set([
  'found', 'find', 'finds', 'finding', 'left', 'leave', 'leaves', 'leaving',
  'know', 'knows', 'knew', 'knowing', 'known', 'set', 'sets', 'setting',
  'slipped', 'slip', 'slips', 'returned', 'return', 'kept', 'keep', 'keeps',
  'bringing', 'bring', 'brings', 'brought', 'called', 'call', 'calls',
  'followed', 'follow', 'follows', 'learned', 'learn', 'helped', 'help',
  'seemed', 'seem', 'carried', 'carry', 'gathered', 'gather', 'settled',
  'settle', 'flickered', 'flicker', 'moved', 'move', 'walked', 'walk',
  'bought', 'buy', 'stood', 'stand', 'watching', 'watch', 'continued',
  'continue', 'finished', 'finish', 'brushed', 'noticed', 'notice',
  'listening', 'listen', 'looking', 'look', 'looked', 'said', 'say',
  'says', 'made', 'make', 'makes', 'making', 'took', 'take', 'takes',
  'taking', 'came', 'come', 'comes', 'coming', 'went', 'go', 'goes', 'going',
  'got', 'get', 'gets', 'getting', 'saw', 'see', 'sees', 'seeing', 'seen',
  'thought', 'think', 'thinks', 'thinking', 'told', 'tell', 'tells',
  'asked', 'ask', 'asks', 'tried', 'try', 'tries', 'trying', 'used', 'use',
  'uses', 'using', 'wanted', 'want', 'wants', 'needing', 'need', 'needs',
  'needed', 'began', 'begin', 'begins', 'beginning', 'started', 'start',
  'starts', 'ended', 'end', 'ends', 'worked', 'work', 'works', 'working',
  'played', 'play', 'plays', 'running', 'run', 'runs', 'ran', 'lived',
  'live', 'lives', 'living', 'died', 'die', 'dies', 'dying', 'felt', 'feel',
  'feels', 'feeling', 'became', 'become', 'becomes', 'becoming', 'remained',
  'remain', 'appears', 'appear', 'appeared', 'appearing', 'showed', 'show',
  'shows', 'showing', 'shown', 'gave', 'give', 'gives', 'giving', 'given',
  'held', 'hold', 'holds', 'holding', 'opened', 'open', 'opens', 'opening',
  'closed', 'close', 'closes', 'closing', 'turned', 'turn', 'turns',
  'turning', 'passed', 'pass', 'passes', 'passing', 'reached', 'reach',
  'reaches', 'reaching', 'raised', 'raise', 'raises', 'raising', 'lowered',
  'protect', 'protects', 'protected', 'protecting', 'describe', 'describes',
  'described', 'describing', 'improve', 'improves', 'improved', 'improving',
  'measure', 'measures', 'measured', 'measuring', 'read', 'reads', 'reading',
  'write', 'writes', 'wrote', 'writing', 'written', 'speak', 'speaks', 'spoke',
  'speaking', 'spoken',   'buried', 'bury', 'named', 'name', 'names', 'naming',
  'cracked', 'crack', 'cracks',
])

const PARTICLES = new Set([
  'up', 'down', 'out', 'off', 'away', 'back', 'over', 'under', 'on', 'in',
  'along', 'around', 'through', 'aside', 'apart',
])

/** Sentence adverbs — end an NP before these (then form a verb group). */
const ADVERBS = new Set([
  'still', 'already', 'just', 'only', 'even', 'also', 'always', 'often',
  'sometimes', 'usually', 'finally', 'suddenly', 'slowly', 'quickly',
  'quietly', 'carefully', 'nearly', 'almost', 'really', 'very', 'too',
  'quite', 'rather', 'soon', 'later', 'again', 'once', 'ever', 'never',
  'here', 'there', 'now', 'then', 'instead', 'however', 'therefore',
])

function isDeterminer(token: string): boolean {
  return DETERMINERS.has(bare(token))
}

function isPreposition(token: string): boolean {
  return PREPOSITIONS.has(bare(token))
}

function isAuxiliary(token: string): boolean {
  return AUXILIARIES.has(bare(token))
}

function isNegation(token: string): boolean {
  return NEGATION.has(bare(token))
}

function isCoord(token: string): boolean {
  return COORD_CONJ.has(bare(token))
}

function isClauseStarter(token: string): boolean {
  const w = bare(token)
  // "that" / "as" / "since" / "after" / "before" are ambiguous; treat as
  // clause starters only when they begin a chunk boundary decision mid-unit.
  return CLAUSE_STARTERS.has(w)
}

function isPronoun(token: string): boolean {
  return PRONOUNS.has(bare(token))
}

function isOpenGlue(token: string): boolean {
  const w = bare(token)
  return (
    DETERMINERS.has(w) ||
    PREPOSITIONS.has(w) ||
    AUXILIARIES.has(w) ||
    NEGATION.has(w) ||
    w === 'to'
  )
}

function isLikelyModifier(token: string): boolean {
  const w = bare(token)
  if (!w || w.length < 2) return false
  if (ADVERBS.has(w)) return false
  if (
    DETERMINERS.has(w) ||
    PREPOSITIONS.has(w) ||
    AUXILIARIES.has(w) ||
    COORD_CONJ.has(w) ||
    CLAUSE_STARTERS.has(w) ||
    PRONOUNS.has(w) ||
    COMMON_VERBS.has(w)
  ) {
    return false
  }
  return (
    /ly$/.test(w) ||
    /ous$|ful$|less$|ish$|ive$|al$|ic$|able$|ible$|ary$|ory$|ent$|ant$|ern$|ish$/.test(
      w,
    ) ||
    /^(old|new|good|bad|great|small|large|long|short|high|low|young|dark|light|soft|hard|warm|cold|quiet|faint|brass|pine|lost|hollow|modest|steady|rapid|brief|next|last|first|second|little|pale|gold|green|gray|grey|clear|strong|weak|early|late|ordinary|distant|overnight|plain|careful|uncertain|fragile|useful|sensible|natural|visual|chronic|modest)$/.test(
      w,
    )
  )
}

function isLikelyVerb(token: string): boolean {
  const w = bare(token)
  if (!w) return false
  if (COMMON_VERBS.has(w)) return true
  if (AUXILIARIES.has(w)) return true
  // Avoid treating clear nouns as verbs
  if (DETERMINERS.has(w) || PREPOSITIONS.has(w) || PRONOUNS.has(w)) return false
  if (isLikelyModifier(token)) return false
  return /^(re|un|over|out)?[a-z]+(ed|ing)$/.test(w) && w.length > 4
}

function isContentWord(token: string): boolean {
  const w = bare(token)
  if (!w) return false
  return !(
    DETERMINERS.has(w) ||
    PREPOSITIONS.has(w) ||
    AUXILIARIES.has(w) ||
    NEGATION.has(w) ||
    COORD_CONJ.has(w) ||
    CLAUSE_STARTERS.has(w) ||
    PRONOUNS.has(w) ||
    w === 'to'
  )
}

function isPhraseBoundaryStarter(token: string): boolean {
  const w = bare(token)
  if (COORD_CONJ.has(w)) return true
  if (CLAUSE_STARTERS.has(w)) return true
  if (PREPOSITIONS.has(w) && w !== 'of') return true
  if (DETERMINERS.has(w)) return true
  if (PRONOUNS.has(w)) return true
  if (AUXILIARIES.has(w)) return true
  if (w === 'to') return true
  return false
}

/**
 * After a determiner / preposition, keep modifiers + head noun (+ proper name).
 * Example: "a faint gold light", "a fox named Lumen", "the pine forest"
 */
function extendNounPhrase(words: string[], start: number, i: number): number {
  const n = words.length
  let contentTaken = 0

  while (i < n) {
    const prev = words[i - 1]
    const curr = words[i]
    const len = i - start
    const currBare = bare(curr)

    if (hasStrongBreak(prev) || (hasCommaBreak(prev) && len >= 2)) break
    if (len >= 6) break

    // "named Lumen" / proper name after head
    if (isCapitalized(curr) && contentTaken >= 1 && len < 6) {
      i += 1
      contentTaken += 1
      continue
    }

    // "of X" continues the NP briefly
    if (currBare === 'of' && len < 5) {
      i += 1
      // take of + following NP head
      while (i < n && isOpenGlue(words[i - 1]) && i - start < 7) {
        i += 1
      }
      if (i < n && (isLikelyModifier(words[i]) || isContentWord(words[i]))) {
        i += 1
        contentTaken += 1
      }
      continue
    }

    // Stop before a new phrase, adverb, or clear verb predicate
    if (isCoord(curr) || (isClauseStarter(curr) && contentTaken >= 1)) break
    if (ADVERBS.has(currBare) && contentTaken >= 1) break
    if (isPreposition(curr) && currBare !== 'of' && contentTaken >= 1) break
    if (isDeterminer(curr) && contentTaken >= 1) break
    if (isAuxiliary(curr) && contentTaken >= 1) break
    if (isLikelyVerb(curr) && contentTaken >= 1 && !isLikelyModifier(curr)) {
      // "named" can be participle inside NP: "a fox named Lumen"
      if (currBare === 'named' || currBare === 'called') {
        i += 1
        continue
      }
      break
    }

    if (isOpenGlue(curr)) {
      // Don't start a nested open glue mid-NP except "of"
      break
    }

    if (isLikelyModifier(curr) || isContentWord(curr)) {
      i += 1
      contentTaken += 1
      continue
    }

    break
  }

  return i
}

function takeNaturalPhrase(words: string[], start: number): number {
  const n = words.length
  if (start >= n) return start

  let i = start + 1
  const first = words[start]
  const firstBare = bare(first)

  // Coordinators stand alone as a light pause, then the next unit begins
  if (isCoord(first)) {
    return start + 1
  }

  // --- Noun phrase / PP object path ---
  if (isDeterminer(first) || isPreposition(first)) {
    // prep alone → take object; det → take NP
    while (i < n && isOpenGlue(words[i - 1]) && !hasStrongBreak(words[i - 1])) {
      i += 1
      if (i - start >= 3) break
    }
    i = extendNounPhrase(words, start, i)
    return Math.max(start + 1, Math.min(i, n))
  }

  // --- Pronoun / proper-name subject + optional light predicate ---
  if (isPronoun(first) || isCapitalized(first)) {
    if (i < n && (isAuxiliary(words[i]) || isNegation(words[i]) || isLikelyVerb(words[i]))) {
      // Take aux/verb group only — leave object NPs for the next chunk
      while (i < n) {
        const prev = words[i - 1]
        if (hasStrongBreak(prev) || hasCommaBreak(prev)) break
        if (isOpenGlue(prev) || isNegation(prev) || isAuxiliary(prev)) {
          i += 1
          continue
        }
        if (isLikelyVerb(words[i]) || ADVERBS.has(bare(words[i]))) {
          i += 1
          continue
        }
        if (isLikelyVerb(prev)) {
          if (i < n && PARTICLES.has(bare(words[i])) && !isPreposition(words[i])) {
            i += 1
          }
          break
        }
        break
      }
    }
    while (i < n && isOpenGlue(words[i - 1]) && !hasStrongBreak(words[i - 1])) {
      i += 1
      if (i - start >= 5) break
    }
    return Math.max(start + 1, Math.min(i, n))
  }

  // Adverb + verb: "still flickered", "quietly slipped"
  if (ADVERBS.has(firstBare) || /ly$/.test(firstBare)) {
    if (i < n && (isLikelyVerb(words[i]) || isAuxiliary(words[i]))) {
      i += 1
      while (i < n && (isOpenGlue(words[i - 1]) || isNegation(words[i - 1]))) {
        i += 1
        if (i - start >= 4) break
      }
      if (i < n && isLikelyVerb(words[i])) i += 1
    }
    return Math.max(start + 1, Math.min(i, n))
  }

  // --- Aux / modal verb group: "did not know", "was cracked" ---
  if (isAuxiliary(first) || firstBare === 'to') {
    while (i < n) {
      const prev = words[i - 1]
      if (hasStrongBreak(prev)) break
      if (isOpenGlue(prev) || isNegation(prev)) {
        i += 1
        continue
      }
      if (isLikelyVerb(words[i]) || isContentWord(words[i])) {
        i += 1
        if (i < n && PARTICLES.has(bare(words[i]))) i += 1
        break
      }
      break
    }
    return Math.max(start + 1, Math.min(i, n))
  }

  // --- Default speech unit ---
  while (i < n) {
    const prev = words[i - 1]
    const curr = words[i]
    const len = i - start

    if (hasStrongBreak(prev)) break
    if (hasCommaBreak(prev) && len >= 2) break

    if (isOpenGlue(prev)) {
      i += 1
      continue
    }

    // Verb then particle: "slipped into" — if into is prep, let next chunk take PP
    if (isLikelyVerb(prev) && isPreposition(curr)) break
    if (isLikelyVerb(prev) && isDeterminer(curr)) break

    if (isLikelyModifier(prev) && isContentWord(curr) && len < 5) {
      i += 1
      continue
    }

    if (len >= 2 && isPhraseBoundaryStarter(curr)) break
    if (len >= 4 && isContentWord(prev) && isContentWord(curr) && !isLikelyModifier(prev)) {
      break
    }
    if (len >= 5 && isContentWord(prev)) break
    if (len >= 6) break

    i += 1
  }

  while (i < n && isOpenGlue(words[i - 1]) && !hasStrongBreak(words[i - 1])) {
    i += 1
    if (i - start >= 7) break
  }

  return Math.max(start + 1, Math.min(i, n))
}

function buildPhraseChunks(words: string[]): TextChunk[] {
  const chunks: TextChunk[] = []
  let i = 0
  while (i < words.length) {
    const end = takeNaturalPhrase(words, i)
    const slice = words.slice(i, end)
    chunks.push({
      text: slice.join(' '),
      wordCount: slice.length,
      startWordIndex: i,
    })
    i = end
  }
  return chunks
}

/**
 * Build reading chunks:
 * - word: one word each
 * - phrase / rsvp: natural speech units (NPs, PPs, verb groups)
 */
export function buildChunks(text: string, mode: HighlightMode): TextChunk[] {
  const words = tokenizeWords(text)
  if (words.length === 0) return []

  if (mode === 'word') {
    return words.map((word, i) => ({
      text: word,
      wordCount: 1,
      startWordIndex: i,
    }))
  }

  return buildPhraseChunks(words)
}
