import type { Passage, PassageLength, PassageTopic } from '../types'

export const passages: Passage[] = [
  {
    id: 'baseline-morning',
    title: 'A Quiet Morning',
    topic: 'nonfiction',
    length: 'short',
    isBaseline: true,
    text: `The street was still damp from overnight rain when Mara left her apartment. She walked without headphones, listening to the soft slap of her shoes on the pavement and the distant hum of a bus turning the corner. At the bakery, the windows fogged from the warmth inside. She bought a plain roll and stood under the awning for a minute, watching a courier lock a bicycle to a signpost. Nothing urgent waited for her. That was the point of the morning: to notice how ordinary minutes feel when no one is measuring them. She finished the roll, brushed crumbs from her coat, and continued toward the river, where the water moved the same steady gray it always did.`,
    vocab: [
      { word: 'awning', definition: 'A sheet of canvas or metal that shades a doorway or window.' },
      { word: 'courier', definition: 'A person who delivers packages or messages.' },
    ],
    quiz: [
      {
        id: 'b1',
        prompt: 'What had happened overnight?',
        choices: ['Snow fell heavily', 'It rained', 'There was a power outage', 'The bakery closed'],
        correctIndex: 1,
      },
      {
        id: 'b2',
        prompt: 'What did Mara buy?',
        choices: ['Coffee only', 'A plain roll', 'A newspaper', 'Fresh fruit'],
        correctIndex: 1,
      },
      {
        id: 'b3',
        prompt: 'Where did she walk after eating?',
        choices: ['Toward the river', 'Back home immediately', 'Into a museum', 'Onto a train'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'fox-forest',
    title: 'The Fox and the Lantern',
    topic: 'fiction',
    length: 'medium',
    text: `In the pine forest beyond the village, a fox named Lumen found a brass lantern half buried in moss. Its glass was cracked, yet when dusk settled between the trunks, a faint gold light still flickered inside. Lumen did not know who had left it there. She only knew that moths gathered near the glow and that the path home grew clearer when she carried it carefully in her mouth. One evening a child from the mill wandered too far, calling for a lost dog. Lumen set the lantern on a stump where the child could see it, then slipped into the underbrush. The child followed the light to the mill road and never learned what animal had helped. Lumen returned later for the lantern, proud in a quiet way. From then on she kept it under a hollow root, bringing it out only when travelers seemed uncertain of the dark.`,
    vocab: [
      { word: 'moss', definition: 'A soft green plant that grows in damp places.' },
      { word: 'flickered', definition: 'Shone unsteadily; flashed on and off.' },
      { word: 'underbrush', definition: 'Low shrubs and bushes growing under trees.' },
      { word: 'hollow', definition: 'Having an empty space inside.' },
      { word: 'uncertain', definition: 'Not sure; hesitant or unclear.' },
    ],
    quiz: [
      {
        id: 'f1',
        prompt: 'Where did Lumen find the lantern?',
        choices: ['In a village shop', 'Half buried in moss', 'Floating in a river', 'Inside the mill'],
        correctIndex: 1,
      },
      {
        id: 'f2',
        prompt: 'Why was a child in the forest?',
        choices: ['Collecting pine cones', 'Looking for a lost dog', 'Hunting foxes', 'Building a cabin'],
        correctIndex: 1,
      },
      {
        id: 'f3',
        prompt: 'How did Lumen help the child?',
        choices: ['Barked loudly', 'Led them by the hand', 'Left the lantern where it could be seen', 'Brought villagers'],
        correctIndex: 2,
      },
      {
        id: 'f4',
        prompt: 'Where did Lumen store the lantern afterward?',
        choices: ['Under a hollow root', 'In the mill', 'On a rooftop', 'Inside a cave of ice'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'sleep-science',
    title: 'Why Sleep Protects Memory',
    topic: 'nonfiction',
    length: 'medium',
    text: `Sleep is not merely rest for the body. During deep sleep, the brain replays recent patterns of activity, strengthening connections that encode facts and skills. Researchers describe this as consolidation: fragile daytime traces become more stable overnight. Rapid eye movement sleep appears especially important for linking new information with older knowledge, which is why insights sometimes arrive after a night away from a hard problem. Chronic short sleep does the opposite. Attention drifts, working memory shrinks, and the hippocampus—the region that helps form new memories—works less efficiently. Even a modest extension of sleep, such as thirty extra minutes for someone who is chronically short, can improve next-day recall. The practical lesson is simple. If you want to learn faster, protect sleep as carefully as you protect study time. Caffeine can mask fatigue for a few hours, but it cannot replace the overnight work your brain needs to keep what you practiced.`,
    vocab: [
      { word: 'consolidation', definition: 'The process of making memories more stable.' },
      { word: 'hippocampus', definition: 'A brain region important for forming new memories.' },
      { word: 'chronically', definition: 'In a long-lasting or constantly recurring way.' },
      { word: 'recall', definition: 'The ability to remember information.' },
      { word: 'fatigue', definition: 'Extreme tiredness.' },
    ],
    quiz: [
      {
        id: 's1',
        prompt: 'What does consolidation refer to here?',
        choices: ['Muscle growth', 'Making memory traces more stable', 'Drinking more water', 'Avoiding caffeine forever'],
        correctIndex: 1,
      },
      {
        id: 's2',
        prompt: 'Which brain region is mentioned for forming new memories?',
        choices: ['Cerebellum only', 'Hippocampus', 'Spinal cord', 'Retina'],
        correctIndex: 1,
      },
      {
        id: 's3',
        prompt: 'What can modest extra sleep improve?',
        choices: ['Next-day recall', 'Bone length', 'Eye color', 'Hearing range'],
        correctIndex: 0,
      },
      {
        id: 's4',
        prompt: 'According to the passage, caffeine…',
        choices: ['Fully replaces sleep', 'Can mask fatigue but not replace sleep work', 'Damages the hippocampus instantly', 'Only helps athletes'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'harbor-news',
    title: 'Harbor Bridge Reopens After Repairs',
    topic: 'news',
    length: 'short',
    text: `City officials reopened the East Harbor Bridge on Monday morning after six weeks of overnight repairs. Traffic cameras showed steady but moderate flows through the first rush hour. The transportation department said crews replaced worn expansion joints and upgraded lighting along the south walkway. Commuters who had diverted through the tunnel reported shorter trips today, though buses still ran a temporary schedule until Wednesday. Mayor Ellison thanked night-shift workers and asked drivers to keep speeds down while sensors finish calibration. A follow-up inspection is planned for next month.`,
    vocab: [
      { word: 'expansion joints', definition: 'Gaps that let a bridge expand and contract with temperature.' },
      { word: 'diverted', definition: 'Sent along a different route.' },
      { word: 'calibration', definition: 'Fine-tuning instruments so measurements are accurate.' },
    ],
    quiz: [
      {
        id: 'n1',
        prompt: 'How long did repairs take?',
        choices: ['Two days', 'Six weeks', 'One year', 'A single night'],
        correctIndex: 1,
      },
      {
        id: 'n2',
        prompt: 'What was upgraded on the south walkway?',
        choices: ['Lighting', 'Ticket gates', 'Murals', 'Bike elevators'],
        correctIndex: 0,
      },
      {
        id: 'n3',
        prompt: 'Until when would buses keep a temporary schedule?',
        choices: ['Monday night', 'Wednesday', 'Next month', 'Indefinitely'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'desert-well',
    title: 'The Well at Ash Ridge',
    topic: 'fiction',
    length: 'long',
    text: `Ash Ridge looked empty from a distance, a pale spine of rock above scrubland where heat made the air shiver. Caravans rarely stopped there unless their water was already low. Jonas had been warned that the old well was unreliable, yet the map in his satchel still marked it with a confident blue circle. He reached the ridge at late afternoon, throat dry, and found the stone rim half collapsed. A rope hung into darkness. When he lowered a tin cup, it returned with brackish water that smelled of minerals but was drinkable. He filled two skins and sat with his back to the warm rock, watching a hawk turn above the flats. Footprints in the dust suggested someone had visited days earlier. Jonas left a small packet of dried fruit under a flat stone as payment for whoever maintained the rope. Night came quickly. He did not sleep well, startled by wind through the ridge cracks, but by dawn he felt strong enough to continue. Years later he would tell students that survival is often a chain of modest mercies: a usable rope, a cup that does not leak, a stranger's earlier care.`,
    vocab: [
      { word: 'scrubland', definition: 'Dry land with low bushes rather than trees.' },
      { word: 'satchel', definition: 'A bag carried over the shoulder.' },
      { word: 'brackish', definition: 'Slightly salty; not fresh.' },
      { word: 'minerals', definition: 'Natural substances found in rock and water.' },
      { word: 'mercies', definition: 'Acts of kindness or relief.' },
      { word: 'spine', definition: 'Here, a long narrow ridge of rock.' },
    ],
    quiz: [
      {
        id: 'd1',
        prompt: 'Why did caravans rarely stop at Ash Ridge?',
        choices: ['It was illegal', 'Usually only if water was already low', 'There were tolls', 'Wolves blocked the road'],
        correctIndex: 1,
      },
      {
        id: 'd2',
        prompt: 'What was wrong with the well rim?',
        choices: ['It was half collapsed', 'It was made of glass', 'It was locked', 'It was underwater'],
        correctIndex: 0,
      },
      {
        id: 'd3',
        prompt: 'What did Jonas leave as payment?',
        choices: ['Coins', 'A map', 'Dried fruit under a stone', 'His tin cup'],
        correctIndex: 2,
      },
      {
        id: 'd4',
        prompt: 'What lesson did he later teach?',
        choices: ['Never travel alone', 'Survival is a chain of modest mercies', 'Maps are always wrong', 'Hawks bring bad luck'],
        correctIndex: 1,
      },
      {
        id: 'd5',
        prompt: 'How did the water taste or smell?',
        choices: ['Sweet like juice', 'Of minerals but drinkable', 'Like smoke', 'Completely fresh spring water'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'eye-saccades',
    title: 'How Eyes Move Across a Page',
    topic: 'nonfiction',
    length: 'medium',
    text: `Fluent reading depends on rapid eye movements called saccades, separated by brief pauses known as fixations. During a fixation lasting roughly two hundred to three hundred milliseconds, the brain identifies words in the center of vision. Between fixations the eyes jump forward, often spanning several characters or a short phrase. Skilled readers make fewer regressions—backward jumps—because prediction and vocabulary reduce uncertainty. Training that simply flashes words faster does not automatically create better comprehension; the visual system still needs time to recognize orthography and retrieve meaning. Useful practice pairs a controlled pace with checks that meaning was understood. Progressive overload works here as it does in physical training: raise speed only when accuracy stays above a sensible threshold. Measuring words per minute without measuring comprehension is like timing a runner while ignoring whether they stayed on the course.`,
    vocab: [
      { word: 'saccades', definition: 'Quick jumps of the eyes from one point to another.' },
      { word: 'fixations', definition: 'Short pauses when the eyes hold still to take in information.' },
      { word: 'regressions', definition: 'Backward eye movements to re-read text.' },
      { word: 'orthography', definition: 'The spelling system of a language.' },
      { word: 'threshold', definition: 'A level that must be reached for something to happen.' },
    ],
    quiz: [
      {
        id: 'e1',
        prompt: 'What are saccades?',
        choices: ['Slow blinks', 'Rapid eye jumps between pauses', 'Ear movements', 'Hand gestures while reading'],
        correctIndex: 1,
      },
      {
        id: 'e2',
        prompt: 'About how long does a typical fixation last?',
        choices: ['2–3 seconds', '200–300 milliseconds', 'Ten minutes', 'One microsecond'],
        correctIndex: 1,
      },
      {
        id: 'e3',
        prompt: 'What are regressions?',
        choices: ['Forward jumps only', 'Backward jumps to re-read', 'Closing the book', 'Skipping chapters'],
        correctIndex: 1,
      },
      {
        id: 'e4',
        prompt: 'What does the passage compare measuring WPM without comprehension to?',
        choices: ['Cooking without salt', 'Timing a runner while ignoring the course', 'Painting a house', 'Flying a kite'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'market-brief',
    title: 'City Market Extends Evening Hours',
    topic: 'news',
    length: 'medium',
    text: `The Central Market will stay open until 9 p.m. on Fridays and Saturdays beginning next week, according to a notice posted by the vendors' association. Organizers hope longer hours will help stalls that sell prepared food and crafts, which often see stronger evening traffic in warmer months. Lighting on the north arcade was tested Thursday night, and security staff will increase from two to four officers after 6 p.m. Nearby residents raised concerns about noise, so live music will end by 8:30. Transit officials added that the late tram on Line 4 will make an extra stop at Market Square on those nights. Shoppers are encouraged to bring reusable bags; plastic bag fees remain unchanged.`,
    vocab: [
      { word: 'vendors', definition: 'People who sell goods.' },
      { word: 'arcade', definition: 'A covered walkway with arches or shops.' },
      { word: 'tram', definition: 'A streetcar that runs on rails in the city.' },
    ],
    quiz: [
      {
        id: 'm1',
        prompt: 'Until what time will the market stay open on Fri/Sat?',
        choices: ['6 p.m.', '9 p.m.', 'Midnight', 'Noon'],
        correctIndex: 1,
      },
      {
        id: 'm2',
        prompt: 'How many security officers after 6 p.m.?',
        choices: ['One', 'Two', 'Four', 'Ten'],
        correctIndex: 2,
      },
      {
        id: 'm3',
        prompt: 'When must live music end?',
        choices: ['By 8:30', 'By 6:00', 'At midnight', 'It is banned'],
        correctIndex: 0,
      },
      {
        id: 'm4',
        prompt: 'Which transit change was mentioned?',
        choices: ['New airport bus', 'Extra late tram stop on Line 4', 'Free taxis', 'Closed subway'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'library-dust',
    title: 'Dust in the Reading Room',
    topic: 'fiction',
    length: 'short',
    text: `Eli arrived early to claim the corner desk where the afternoon light fell across the dictionary stand. The reading room smelled faintly of paper and floor wax. He opened a biography he had started twice before and promised himself he would finish the chapter before checking the clock. Outside, a bicycle bell rang twice. Inside, only the soft turn of pages and the occasional cough. When he finally looked up, an hour had passed, and the dust motes in the sunbeam had shifted like a slow constellation.`,
    vocab: [
      { word: 'biography', definition: 'A book about someone\'s life.' },
      { word: 'motes', definition: 'Tiny particles, such as dust floating in light.' },
      { word: 'constellation', definition: 'A group of stars; here, a scattered pattern.' },
    ],
    quiz: [
      {
        id: 'l1',
        prompt: 'Where did Eli sit?',
        choices: ['At a corner desk', 'On the stairs', 'In a cafe', 'At the librarian\'s counter'],
        correctIndex: 0,
      },
      {
        id: 'l2',
        prompt: 'What did he promise himself?',
        choices: ['To leave immediately', 'To finish the chapter before checking the clock', 'To sleep', 'To buy a bicycle'],
        correctIndex: 1,
      },
      {
        id: 'l3',
        prompt: 'How much time had passed when he looked up?',
        choices: ['Five minutes', 'An hour', 'A full day', 'Three seconds'],
        correctIndex: 1,
      },
    ],
  },
]

export function getPassage(id: string): Passage | undefined {
  return passages.find((p) => p.id === id)
}

export function getBaselinePassage(): Passage {
  return passages.find((p) => p.isBaseline) ?? passages[0]
}

export function filterPassages(
  topic: PassageTopic | 'any',
  length: PassageLength,
): Passage[] {
  return passages.filter((p) => {
    if (p.isBaseline) return false
    if (topic !== 'any' && p.topic !== topic) return false
    return p.length === length
  })
}

export function pickPassage(
  topic: PassageTopic | 'any',
  length: PassageLength,
  preferredId?: string,
): Passage {
  const filtered = filterPassages(topic, length)
  if (preferredId) {
    const preferred = filtered.find((p) => p.id === preferredId)
    if (preferred) return preferred
  }
  if (filtered.length > 0) return filtered[0]
  const nonBaseline = passages.filter((p) => !p.isBaseline)
  return nonBaseline[0] ?? passages[0]
}
