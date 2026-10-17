// Client-safe aptitude question bank — 40 original items, 10 per area.
// Correct answers live separately in `aptitudeAnswerKey.ts` (server-only) so they
// are never shipped to the browser. Option order is fixed; question order is
// shuffled within the area per attempt. Spatial graphics are built in ./aptitudeSvg.

import {
  isoStack, poly, T, holesSquare, foldPrompt, net, boardWithGap, piece, regularPolygon,
} from './aptitudeSvg'

export type AptitudeArea = 'numerical' | 'verbal' | 'logical' | 'spatial'

export interface AptitudeQuestion {
  id: string
  text: string
  options: string[] // text labels (also a11y labels when optionsSvg is set)
  svg?: string // prompt graphic (trusted, inlined)
  optionsSvg?: string[] // when present, render these as the option graphics (parallel to options[])
}

export const APTITUDE_AREA_ORDER: AptitudeArea[] = ['numerical', 'verbal', 'logical', 'spatial']

export const APTITUDE_AREA_LABELS: Record<AptitudeArea, string> = {
  numerical: 'Numerical reasoning',
  verbal: 'Verbal reasoning',
  logical: 'Logical reasoning',
  spatial: 'Spatial reasoning',
}

// area is kept out of the public type (the flow tags questions via the section),
// but we need it to group/shuffle — stored alongside in this internal list.
export const APTITUDE_QUESTIONS: (AptitudeQuestion & { area: AptitudeArea })[] = [
  // ── Numerical ──────────────────────────────────────────────────────────────
  { id: 'NUM1', area: 'numerical', text: 'What number comes next?  2, 4, 8, 16, …', options: ['24', '30', '32', '48'] },
  { id: 'NUM2', area: 'numerical', text: 'A jacket costs $80. In a sale it is reduced by 25%. What is the sale price?', options: ['$55', '$60', '$65', '$70'] },
  { id: 'NUM3', area: 'numerical', text: 'If 3 pens cost $7.50, how much do 5 pens cost (same price each)?', options: ['$10.00', '$11.50', '$12.50', '$15.00'] },
  { id: 'NUM4', area: 'numerical', text: 'What number comes next?  81, 27, 9, 3, …', options: ['0', '1', '2', '3'] },
  { id: 'NUM5', area: 'numerical', text: 'The average of four numbers is 20. Three are 18, 22 and 25. What is the fourth?', options: ['13', '15', '17', '19'] },
  { id: 'NUM6', area: 'numerical', text: 'What is 15% of 200?', options: ['25', '30', '35', '40'] },
  { id: 'NUM7', area: 'numerical', text: 'What number comes next?  3, 6, 11, 18, 27, …', options: ['36', '38', '40', '42'] },
  { id: 'NUM8', area: 'numerical', text: 'A train travels 240 km in 3 hours. What is its average speed?', options: ['60 km/h', '70 km/h', '80 km/h', '90 km/h'] },
  { id: 'NUM9', area: 'numerical', text: 'If 5 workers build a wall in 8 days, how many days would 10 workers take (same rate)?', options: ['2', '4', '6', '16'] },
  { id: 'NUM10', area: 'numerical', text: 'A recipe uses flour and sugar in a 3 : 2 ratio. With 9 cups of flour, how much sugar?', options: ['4 cups', '5 cups', '6 cups', '7 cups'] },

  // ── Verbal ─────────────────────────────────────────────────────────────────
  { id: 'VRB1', area: 'verbal', text: 'Glove is to hand as sock is to:', options: ['Arm', 'Foot', 'Shoe', 'Knee'] },
  { id: 'VRB2', area: 'verbal', text: 'Which word is closest in meaning to “abundant”?', options: ['Scarce', 'Plentiful', 'Heavy', 'Costly'] },
  { id: 'VRB3', area: 'verbal', text: 'Which word is most nearly OPPOSITE to “expand”?', options: ['Grow', 'Stretch', 'Contract', 'Develop'] },
  { id: 'VRB4', area: 'verbal', text: 'Which word does NOT belong with the others?', options: ['Happy', 'Joyful', 'Cheerful', 'Gloomy'] },
  { id: 'VRB5', area: 'verbal', text: 'Complete: “Despite the heavy rain, the team stayed ___ about winning.”', options: ['Pessimistic', 'Optimistic', 'Indifferent', 'Confused'] },
  { id: 'VRB6', area: 'verbal', text: 'Which word is closest in meaning to “reluctant”?', options: ['Eager', 'Unwilling', 'Careful', 'Tired'] },
  { id: 'VRB7', area: 'verbal', text: 'Bird is to nest as bee is to:', options: ['Honey', 'Hive', 'Flower', 'Wing'] },
  { id: 'VRB8', area: 'verbal', text: 'Which word does NOT belong with the others?', options: ['Apple', 'Banana', 'Carrot', 'Mango'] },
  { id: 'VRB9', area: 'verbal', text: 'Complete: “The explanation was so ___ that even beginners understood it.”', options: ['Confusing', 'Clear', 'Technical', 'Lengthy'] },
  { id: 'VRB10', area: 'verbal', text: 'Which word is most nearly OPPOSITE to “generous”?', options: ['Kind', 'Wealthy', 'Stingy', 'Helpful'] },

  // ── Logical ────────────────────────────────────────────────────────────────
  { id: 'LOG1', area: 'logical', text: 'All roses are flowers. Some flowers fade quickly. Which MUST be true?', options: ['All roses fade quickly', 'No roses are flowers', 'Some flowers are roses', 'All flowers are roses'] },
  { id: 'LOG2', area: 'logical', text: 'What comes next?  A, C, E, G, …', options: ['H', 'I', 'J', 'K'] },
  { id: 'LOG3', area: 'logical', text: 'Which number does NOT belong with the others?', options: ['5', '7', '9', '11'] },
  { id: 'LOG4', area: 'logical', text: 'FRIEND is coded GSJFOE (each letter +1). Using the same rule, CAT is:', options: ['DBU', 'EBV', 'DCU', 'BZS'] },
  { id: 'LOG5', area: 'logical', text: 'Tom is taller than Sam. Sam is taller than Ben. Who is shortest?', options: ['Tom', 'Sam', 'Ben', 'Cannot be determined'] },
  { id: 'LOG6', area: 'logical', text: 'What comes next?  1, 4, 9, 16, 25, …', options: ['30', '36', '49', '81'] },
  { id: 'LOG7', area: 'logical', text: 'All Bloops are Razzies. All Razzies are Lazzies. So all Bloops are definitely:', options: ['Lazzies', 'Not Lazzies', 'Sometimes Razzies', 'None of these'] },
  { id: 'LOG8', area: 'logical', text: 'What comes next?  Z, X, V, T, …', options: ['S', 'R', 'Q', 'P'] },
  { id: 'LOG9', area: 'logical', text: 'A is B’s brother. B is C’s mother. How is A related to C?', options: ['Father', 'Uncle', 'Brother', 'Cousin'] },
  { id: 'LOG10', area: 'logical', text: 'Find the odd one out:  8, 27, 64, 100, 125', options: ['27', '64', '100', '125'] },

  // ── Spatial (polished SVG; rotation/reflection options use real transforms) ──
  // SPA1 — 3D cube counting (staircase of 6)
  { id: 'SPA1', area: 'spatial', text: 'How many cubes make up this stack?', svg: isoStack([[0, 0, 0], [0, 0, 1], [0, 0, 2], [1, 0, 0], [1, 0, 1], [2, 0, 0]]), options: ['5', '6', '7', '8'] },
  // SPA2 — 3D cube counting incl. hidden (2×2 base + 3 on top = 7)
  { id: 'SPA2', area: 'spatial', text: 'How many cubes make up this solid (including any hidden from view)?', svg: isoStack([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1]]), options: ['6', '7', '8', '9'] },
  // SPA3 — paper folding, single fold
  {
    id: 'SPA3', area: 'spatial', text: 'The square is folded along the dashed line, then a hole is punched. Which shows it unfolded?', svg: foldPrompt([[0.62, 0.34]], ['v']),
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsSvg: [holesSquare([[0.62, 0.34]]), holesSquare([[0.62, 0.34], [0.62, 0.66]]), holesSquare([[0.38, 0.34], [0.62, 0.34]]), holesSquare([[0.38, 0.34], [0.62, 0.34], [0.38, 0.66], [0.62, 0.66]])],
  },
  // SPA4 — paper folding, double fold
  {
    id: 'SPA4', area: 'spatial', text: 'The square is folded along both dashed lines, then one hole is punched. Which shows it unfolded?', svg: foldPrompt([[0.66, 0.3]], ['v', 'h']),
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsSvg: [holesSquare([[0.34, 0.3], [0.66, 0.3], [0.34, 0.7], [0.66, 0.7]]), holesSquare([[0.34, 0.3], [0.66, 0.3]]), holesSquare([[0.2, 0.5], [0.4, 0.5], [0.6, 0.5], [0.8, 0.5]]), holesSquare([[0.34, 0.3], [0.66, 0.3], [0.5, 0.7]])],
  },
  // SPA5 — mental rotation (mirror is the distractor)
  {
    id: 'SPA5', area: 'spatial', text: 'Which option is the figure on the left simply rotated (not flipped)?', svg: poly([[0, 0], [1, 0], [2, 0], [2, 1]]),
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsSvg: [poly([[0, 0], [1, 0], [2, 0], [2, 1]], T.mirror), poly([[0, 0], [1, 0], [2, 0], [2, 1]], T.rot90), poly([[0, 0], [1, 0], [2, 0], [2, 1]], T.mirrorRot90), poly([[1, 0], [1, 1], [0, 1], [0, 2]])],
  },
  // SPA6 — odd one out: which 3D stack is different
  {
    id: 'SPA6', area: 'spatial', text: 'Three of these stacks are identical. Which one is different?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsSvg: [
      isoStack([[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1]]),
      isoStack([[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1]]),
      isoStack([[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 0, 1]]),
      isoStack([[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1]]),
    ],
  },
  // SPA7 — complete the shape (L-shaped gap)
  {
    id: 'SPA7', area: 'spatial', text: 'Which piece exactly fills the dashed gap to complete the large square?', svg: boardWithGap([[0, 2], [0, 3], [1, 3]]),
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsSvg: [piece([[0, 0], [0, 1]]), piece([[0, 0], [0, 1], [0, 2]]), piece([[0, 0], [0, 1], [1, 1]]), piece([[0, 0], [0, 1], [1, 0], [1, 1]])],
  },
  // SPA8 — which is a valid cube net
  {
    id: 'SPA8', area: 'spatial', text: 'Which of these is a valid net that folds into a cube?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsSvg: [net([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]]), net([[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]]), net([[0, 0], [0, 1], [1, 0], [1, 1], [2, 1], [3, 1]]), net([[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]])],
  },
  // SPA9 — complete the shape
  {
    id: 'SPA9', area: 'spatial', text: 'Which piece exactly fills the dashed gap to complete the square?', svg: boardWithGap([[0, 2], [0, 3], [1, 2], [1, 3]]),
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsSvg: [piece([[0, 0], [0, 1]]), piece([[0, 0], [1, 0], [1, 1]]), piece([[0, 0], [0, 1], [1, 0], [1, 1]]), piece([[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]])],
  },
  // SPA10 — lines of symmetry of a regular pentagon
  { id: 'SPA10', area: 'spatial', text: 'How many lines of symmetry does this regular shape have?', svg: regularPolygon(5), options: ['3', '4', '5', '6'] },
]
