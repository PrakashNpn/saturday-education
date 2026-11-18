# Practice test UI

Presentation shared by IMAT and CSCA. Features pass translated labels, question
content, state and callbacks. This directory does not import feature code or know
about exam formats, scoring, answer keys, storage, API endpoints or email delivery.

- `PracticeButton`: common actions and button classes.
- `PracticeHeader`: Saturday logo, test context, timer display and action slot.
  Each feature supplies its own timer values and urgency threshold.
- `QuestionPanel` / `QuestionOption`: question shell and native radio answers.
  Features retain their answer IDs, option order, diagrams and handlers.
- `QuestionNavigator`: bounded question map, current/answered/flagged states,
  mobile expand control and finish callback. It never submits an attempt itself.
- `PracticeDialog` / `InstructionColumns`: native modal focus containment, Escape
  handling, scroll restoration and a responsive instructions layout. A busy modal
  cannot be dismissed through Escape. Feature-specific rules remain in the feature.
- `PracticeContactFields` / `PracticeContactCard`: the same split contact layout,
  required name/email/phone fields and consent control for both tests. Validation,
  consent wording and submission are feature-owned. CSCA now uses this full-page
  layout instead of a contact modal; result gating remains unchanged.

Import individual modules; there is deliberately no barrel that pulls contact or
phone-field code into the test header/navigator. The phone widget stays behind
`LazyPhoneField`; IMAT's result contact gate is still loaded through React.lazy.
Keep helpers such as scoring and deadline reconciliation out of these components.

No database change is required for this UI refactor. The browser checks use sample
questions and fake contact handlers in a temporary preview app, never live APIs.
This refactor does not establish a load-time improvement; measure production
bundles and real navigation separately before making that claim.
