// Big Five (OCEAN) personality items — 50 statements, 10 per trait (full IPIP-50).
// Adapted from the public-domain International Personality Item Pool (IPIP).
// Students rate agreement on a 1–5 scale (see LIKERT_AGREE in types).
// `reverse: true` items are scored as (6 - value) so a high raw score always
// means more of the trait.
//
// Traits: O = Openness, C = Conscientiousness, E = Extraversion,
//         A = Agreeableness, N = Neuroticism (emotional sensitivity)

export type BigFiveTrait = 'O' | 'C' | 'E' | 'A' | 'N'

export interface BigFiveQuestion {
  id: string // "B"-prefixed (e.g. "BO1") so ids never collide with RIASEC's R/I/A/S/E/C
  trait: BigFiveTrait
  text: string
  reverse: boolean
}

export const BIG_FIVE_QUESTIONS: BigFiveQuestion[] = [
  // ── Openness (curiosity, imagination, openness to new ideas) ──
  { id: 'BO1', trait: 'O', text: 'I have a vivid imagination', reverse: false },
  { id: 'BO2', trait: 'O', text: 'I enjoy thinking about abstract ideas', reverse: false },
  { id: 'BO3', trait: 'O', text: 'I am full of new ideas', reverse: false },
  { id: 'BO4', trait: 'O', text: 'I love learning about new subjects', reverse: false },
  { id: 'BO5', trait: 'O', text: 'I enjoy exploring art, music, or new experiences', reverse: false },
  { id: 'BO6', trait: 'O', text: 'I am not interested in abstract or theoretical ideas', reverse: true },
  { id: 'BO7', trait: 'O', text: 'I prefer routine and dislike change', reverse: true },
  { id: 'BO8', trait: 'O', text: 'I have difficulty imagining things', reverse: true },
  { id: 'BO9', trait: 'O', text: 'I have a rich vocabulary and enjoy using words precisely', reverse: false },
  { id: 'BO10', trait: 'O', text: 'I am quick to grasp new ideas and concepts', reverse: false },

  // ── Conscientiousness (organization, discipline, reliability) ──
  { id: 'BC1', trait: 'C', text: 'I am always prepared', reverse: false },
  { id: 'BC2', trait: 'C', text: 'I pay attention to details', reverse: false },
  { id: 'BC3', trait: 'C', text: 'I like to keep things organised', reverse: false },
  { id: 'BC4', trait: 'C', text: 'I follow through on my plans and commitments', reverse: false },
  { id: 'BC5', trait: 'C', text: 'I get my tasks done right away rather than putting them off', reverse: false },
  { id: 'BC6', trait: 'C', text: 'I often leave my belongings around in a mess', reverse: true },
  { id: 'BC7', trait: 'C', text: 'I frequently forget to put things back in their proper place', reverse: true },
  { id: 'BC8', trait: 'C', text: 'I tend to procrastinate on important tasks', reverse: true },
  { id: 'BC9', trait: 'C', text: 'I stick to a schedule and plan my time well', reverse: false },
  { id: 'BC10', trait: 'C', text: 'I avoid my duties and responsibilities when I can', reverse: true },

  // ── Extraversion (sociability, energy from others, assertiveness) ──
  { id: 'BE1', trait: 'E', text: 'I feel comfortable around people', reverse: false },
  { id: 'BE2', trait: 'E', text: 'I start conversations easily', reverse: false },
  { id: 'BE3', trait: 'E', text: 'I enjoy being the centre of attention', reverse: false },
  { id: 'BE4', trait: 'E', text: 'I feel energised after spending time with a group of people', reverse: false },
  { id: 'BE5', trait: 'E', text: 'I make friends easily', reverse: false },
  { id: 'BE6', trait: 'E', text: 'I am quiet around strangers', reverse: true },
  { id: 'BE7', trait: 'E', text: 'I prefer to stay in the background', reverse: true },
  { id: 'BE8', trait: 'E', text: 'I find it draining to be around people for too long', reverse: true },
  { id: 'BE9', trait: 'E', text: 'I keep conversations going and enjoy meeting new people', reverse: false },
  { id: 'BE10', trait: 'E', text: 'I have little to say in group settings', reverse: true },

  // ── Agreeableness (compassion, cooperation, trust) ──
  { id: 'BA1', trait: 'A', text: 'I sympathise with others’ feelings', reverse: false },
  { id: 'BA2', trait: 'A', text: 'I take time out for other people', reverse: false },
  { id: 'BA3', trait: 'A', text: 'I make people feel at ease', reverse: false },
  { id: 'BA4', trait: 'A', text: 'I treat everyone with kindness and respect', reverse: false },
  { id: 'BA5', trait: 'A', text: 'I trust that most people have good intentions', reverse: false },
  { id: 'BA6', trait: 'A', text: 'I am not really interested in other people’s problems', reverse: true },
  { id: 'BA7', trait: 'A', text: 'I can be cold and distant when I disagree with someone', reverse: true },
  { id: 'BA8', trait: 'A', text: 'I tend to put my own interests ahead of others’', reverse: true },
  { id: 'BA9', trait: 'A', text: 'I genuinely care about how other people are doing', reverse: false },
  { id: 'BA10', trait: 'A', text: 'I feel little concern for people I don’t know', reverse: true },

  // ── Neuroticism (emotional sensitivity, tendency to worry) ──
  { id: 'BN1', trait: 'N', text: 'I get stressed out easily', reverse: false },
  { id: 'BN2', trait: 'N', text: 'I worry about things a lot', reverse: false },
  { id: 'BN3', trait: 'N', text: 'My mood changes often', reverse: false },
  { id: 'BN4', trait: 'N', text: 'I get upset or irritated easily', reverse: false },
  { id: 'BN5', trait: 'N', text: 'I often feel anxious about what might go wrong', reverse: false },
  { id: 'BN6', trait: 'N', text: 'I am relaxed most of the time', reverse: true },
  { id: 'BN7', trait: 'N', text: 'I rarely feel sad or down', reverse: true },
  { id: 'BN8', trait: 'N', text: 'I handle stress and pressure calmly', reverse: true },
  { id: 'BN9', trait: 'N', text: 'I often feel down or low without a clear reason', reverse: false },
  { id: 'BN10', trait: 'N', text: 'I rarely feel tense or on edge', reverse: true },
]
