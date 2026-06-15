// SERVER-ONLY answer key — never imported by client components, so correct answers
// are not shipped to the browser. Maps question id → correct option index.

import 'server-only'

export const APTITUDE_ANSWER_KEY: Record<string, number> = {
  // Numerical
  NUM1: 2, // 32
  NUM2: 1, // $60
  NUM3: 2, // $12.50
  NUM4: 1, // 1
  NUM5: 1, // 15
  NUM6: 1, // 30
  NUM7: 1, // 38
  NUM8: 2, // 80 km/h
  NUM9: 1, // 4
  NUM10: 2, // 6 cups
  // Verbal
  VRB1: 1, // Foot
  VRB2: 1, // Plentiful
  VRB3: 2, // Contract
  VRB4: 3, // Gloomy
  VRB5: 1, // Optimistic
  VRB6: 1, // Unwilling
  VRB7: 1, // Hive
  VRB8: 2, // Carrot
  VRB9: 1, // Clear
  VRB10: 2, // Stingy
  // Logical
  LOG1: 2, // Some flowers are roses
  LOG2: 1, // I
  LOG3: 2, // 9
  LOG4: 0, // DBU
  LOG5: 2, // Ben
  LOG6: 1, // 36
  LOG7: 0, // Lazzies
  LOG8: 1, // R
  LOG9: 1, // Uncle
  LOG10: 2, // 100
  // Spatial
  SPA1: 1, // 6 cubes (staircase)
  SPA2: 1, // 7 cubes (2×2 base + 3)
  SPA3: 2, // unfolded: 2 holes mirrored across the vertical fold
  SPA4: 0, // unfolded: 4 holes, one per quadrant
  SPA5: 1, // the true rotation (others are flips / a different shape)
  SPA6: 2, // the odd stack (top cube on the other end)
  SPA7: 2, // the L-tromino piece fits the L-shaped gap
  SPA8: 3, // the cross net (others contain a 2×2 / are a line / rectangle)
  SPA9: 2, // the 2×2 piece
  SPA10: 2, // pentagon → 5 lines of symmetry
}
