// RIASEC (Holland) interest items — 60 activities, 10 per category.
// Adapted from the public-domain O*NET Interest Profiler. Students rate how much
// they would enjoy each activity on a 1–5 Like scale (see LIKERT_LIKE in types).
//
// Categories: R = Realistic, I = Investigative, A = Artistic,
//             S = Social, E = Enterprising, C = Conventional

export type RiasecCategory = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

export interface RiasecQuestion {
  id: string // e.g. "R1"
  category: RiasecCategory
  text: string
}

export const RIASEC_QUESTIONS: RiasecQuestion[] = [
  // ── Realistic (hands-on, practical, physical, tools/machines/outdoors) ──
  { id: 'R1', category: 'R', text: 'Build kitchen cabinets or furniture' },
  { id: 'R2', category: 'R', text: 'Repair a car or motorcycle engine' },
  { id: 'R3', category: 'R', text: 'Assemble electronic equipment' },
  { id: 'R4', category: 'R', text: 'Operate a drone, machine, or piece of heavy equipment' },
  { id: 'R5', category: 'R', text: 'Set up and maintain a computer network' },
  { id: 'R6', category: 'R', text: 'Lay brick, tile, or build something with your hands' },
  { id: 'R7', category: 'R', text: 'Work outdoors planting and caring for crops or gardens' },
  { id: 'R8', category: 'R', text: 'Fix a broken household appliance' },
  { id: 'R9', category: 'R', text: 'Test the quality of parts before they are shipped' },
  { id: 'R10', category: 'R', text: 'Put out fires or respond to physical emergencies' },

  // ── Investigative (analyze, research, solve abstract/scientific problems) ──
  { id: 'I1', category: 'I', text: 'Study how the human body works' },
  { id: 'I2', category: 'I', text: 'Investigate the cause of a disease or health problem' },
  { id: 'I3', category: 'I', text: 'Develop a new theory or test a scientific idea' },
  { id: 'I4', category: 'I', text: 'Solve complex maths or logic problems' },
  { id: 'I5', category: 'I', text: 'Write computer programs to analyse data' },
  { id: 'I6', category: 'I', text: 'Conduct experiments in a laboratory' },
  { id: 'I7', category: 'I', text: 'Study the structure of molecules or the stars' },
  { id: 'I8', category: 'I', text: 'Examine data to find patterns and draw conclusions' },
  { id: 'I9', category: 'I', text: 'Read scientific articles to understand a topic deeply' },
  { id: 'I10', category: 'I', text: 'Work out why a machine or system is not performing as expected' },

  // ── Artistic (create, design, express, work without strict rules) ──
  { id: 'A1', category: 'A', text: 'Design a poster, logo, or piece of branding' },
  { id: 'A2', category: 'A', text: 'Write stories, poems, or articles' },
  { id: 'A3', category: 'A', text: 'Play a musical instrument or compose music' },
  { id: 'A4', category: 'A', text: 'Direct or edit a short film or video' },
  { id: 'A5', category: 'A', text: 'Paint, draw, or create digital artwork' },
  { id: 'A6', category: 'A', text: 'Design the layout of a magazine or website' },
  { id: 'A7', category: 'A', text: 'Perform in a play, dance, or musical' },
  { id: 'A8', category: 'A', text: 'Come up with creative ideas for an advertising campaign' },
  { id: 'A9', category: 'A', text: 'Photograph people, places, or events artistically' },
  { id: 'A10', category: 'A', text: 'Decorate or design the interior of a room or space' },

  // ── Social (help, teach, care for, work closely with people) ──
  { id: 'S1', category: 'S', text: 'Help people with their personal or emotional problems' },
  { id: 'S2', category: 'S', text: 'Teach or tutor students in a subject' },
  { id: 'S3', category: 'S', text: 'Care for sick or injured people' },
  { id: 'S4', category: 'S', text: 'Volunteer to support a community in need' },
  { id: 'S5', category: 'S', text: 'Help new students or colleagues settle in' },
  { id: 'S6', category: 'S', text: 'Give advice and guidance to someone making a big decision' },
  { id: 'S7', category: 'S', text: 'Lead a group discussion or workshop' },
  { id: 'S8', category: 'S', text: 'Coach a sports team or train others in a skill' },
  { id: 'S9', category: 'S', text: 'Work to improve the lives of children or families' },
  { id: 'S10', category: 'S', text: 'Listen to people and help them feel understood' },

  // ── Enterprising (lead, persuade, sell, start ventures, take charge) ──
  { id: 'E1', category: 'E', text: 'Start and run your own business' },
  { id: 'E2', category: 'E', text: 'Persuade people to buy a product or back an idea' },
  { id: 'E3', category: 'E', text: 'Lead a team toward an ambitious goal' },
  { id: 'E4', category: 'E', text: 'Negotiate a deal or contract' },
  { id: 'E5', category: 'E', text: 'Give a presentation to win over an audience' },
  { id: 'E6', category: 'E', text: 'Manage a project, budget, and the people on it' },
  { id: 'E7', category: 'E', text: 'Market or promote an event or campaign' },
  { id: 'E8', category: 'E', text: 'Make decisions that affect how a company is run' },
  { id: 'E9', category: 'E', text: 'Pitch an idea to investors or decision-makers' },
  { id: 'E10', category: 'E', text: 'Take the lead when a group is unsure what to do' },

  // ── Conventional (organize, follow procedures, work with data/records) ──
  { id: 'C1', category: 'C', text: 'Keep detailed, accurate financial records' },
  { id: 'C2', category: 'C', text: 'Organise information into clear spreadsheets or databases' },
  { id: 'C3', category: 'C', text: 'Follow a precise set of procedures to complete a task' },
  { id: 'C4', category: 'C', text: 'Check documents carefully for errors' },
  { id: 'C5', category: 'C', text: 'Manage schedules, files, and office systems' },
  { id: 'C6', category: 'C', text: 'Prepare invoices, reports, or budgets' },
  { id: 'C7', category: 'C', text: 'Process and verify forms or applications' },
  { id: 'C8', category: 'C', text: 'Use accounting or data-entry software accurately' },
  { id: 'C9', category: 'C', text: 'Sort and label data so it is easy to find later' },
  { id: 'C10', category: 'C', text: 'Make sure rules and standards are followed exactly' },
]
