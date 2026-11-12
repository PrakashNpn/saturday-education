-- MANUAL ONLY. Apply updated application code/assets before running this file.
-- Corrects exactly four items; no new tables/columns, migrations or RLS changes.
-- Originals (including former scoring policy) are preserved in review_notes.
-- Run the entire file once. A mismatch or repeated run aborts all changes.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';
LOCK TABLE public.imat_papers, public.imat_questions,
  public.imat_question_options, public.imat_answer_keys IN SHARE ROW EXCLUSIVE MODE;
DO $corrections$
DECLARE
  item jsonb;
  correction jsonb;
  question_record record;
  current_snapshot jsonb;
  affected integer;
  owner_review text := 'Codex source comparison and calculated practice correction; owner-authorized, not an official erratum';
BEGIN
  FOR item IN SELECT value FROM jsonb_array_elements($payload$[{"slug":"imat-2013-published","number":5,"expected":{"prompt":"The pasta that I buy in the local supermarket usually costs €1.60 per packet. This week the packet is marked '€0.20 off normal price'. In addition the following sign is on display '10% off all bills when you spend €10 or more'. Assuming that I spend over €10 altogether, how much will the packet of cereal cost?","image":null,"options":[{"key":"A","text":"€1.26","image":null},{"key":"B","text":"€1.12","image":null},{"key":"C","text":"€1.24","image":null},{"key":"D","text":"€1.30","image":null},{"key":"E","text":"€1.18","image":null}],"key":"A","scoringPolicy":{"kind":"all-options-accepted","note":"The official archive accepts every answer option for this question. Saturday Education awards full credit in this practice paper, including a blank response. Inclusion of blanks is a disclosed practice rule, not a verified historical decision.","basis":"practice-adjustment","evidenceUrl":"https://accessoprogrammato.mur.gov.it/2013/","blankTreatment":"full-credit","acceptedOptionKeys":["A","B","C","D","E"],"nominalSourceOption":"A"}},"correction":{"id":"imat-2013-q5-source-correction-v1","year":2013,"number":5,"prompt":"The pasta that I buy in the local supermarket usually costs €1.60 per packet. This week the packet is marked '€0.20 off normal price'. In addition the following sign is on display '10% off all bills when you spend €10 or more'. Assuming that I spend over €10 altogether, how much will the packet of pasta cost?","options":[{"key":"A","text":"€1.26"},{"key":"B","text":"€1.12"},{"key":"C","text":"€1.24"},{"key":"D","text":"€1.30"},{"key":"E","text":"€1.18"}],"image":null,"correctKey":"A","reason":"The item name changes from pasta to cereal in the source. Use pasta consistently.","explanation":"The reduced price is €1.60 − €0.20 = €1.40. Applying the additional 10% discount gives €1.40 × 0.90 = €1.26."}},{"slug":"imat-2013-published","number":54,"expected":{"prompt":"A uniform beam, 3.0m long, of weight 100N has a 300N weight placed 0.50m from one end. The beam is suspended by a string 1.0m from the same end. A diagram of the weights placed on the beam is given below: How far from the other end must a weight of 80N be placed for the beam to be balanced?","image":{"alt":"Beam suspended by a string with 300 N and 80 N loads and distances.","src":"/images/imat/2013/q54-figure.png","width":879,"height":312},"options":[{"key":"A","text":"0.75m","image":null},{"key":"B","text":"1.25m","image":null},{"key":"C","text":"2.25m","image":null},{"key":"D","text":"1.875m","image":null},{"key":"E","text":"0.125m","image":null}],"key":"A","scoringPolicy":{"kind":"all-options-accepted","note":"The official archive accepts every answer option for this question. Saturday Education awards full credit in this practice paper, including a blank response. Inclusion of blanks is a disclosed practice rule, not a verified historical decision.","basis":"practice-adjustment","evidenceUrl":"https://accessoprogrammato.mur.gov.it/2013/","blankTreatment":"full-credit","acceptedOptionKeys":["A","B","C","D","E"],"nominalSourceOption":"A"}},"correction":{"id":"imat-2013-q54-source-correction-v1","year":2013,"number":54,"prompt":"A uniform beam, 3.0m long, of weight 100N has a 300N weight placed 0.50m from one end. The beam is suspended by a string 1.0m from the same end. A diagram of the weights placed on the beam is given below: How far from the other end must a weight of 80N be placed for the beam to be balanced?","options":[{"key":"A","text":"0.75m"},{"key":"B","text":"1.25m"},{"key":"C","text":"2.25m"},{"key":"D","text":"1.875m"},{"key":"E","text":"0.125m"}],"image":{"src":"/images/imat/2013/q54-corrected.svg","alt":"A 3.0 m uniform beam. From its left end: 300 N load at 0.50 m, supporting string at 1.0 m, beam weight 100 N at its centre, and an 80 N load at an unknown distance from its right end.","width":900,"height":350},"correctKey":"A","reason":"The original figure places the load and support at distances inconsistent with the text. Replace the figure to follow the stated 0.50 m load and 1.0 m support positions.","explanation":"Take moments about the string, 1.0 m from the left end. The 300 N load produces 300 × 0.50 = 150 N m anticlockwise. The beam weight acts at its centre, producing 100 × 0.50 = 50 N m clockwise. The 80 N load must therefore act 100/80 = 1.25 m to the right of the string, at 2.25 m from the left end. Its distance from the right end is 3.0 − 2.25 = 0.75 m."}},{"slug":"imat-2024-published","number":55,"expected":{"prompt":"A boat is moving in a uniform straight motion at a certain speed v. If a braking force of 210 N is applied for a distance of 5 m, how much power is developed by the braking force?","image":null,"options":[{"key":"A","text":"210 W","image":null},{"key":"B","text":"105 W","image":null},{"key":"C","text":"1050 W","image":null},{"key":"D","text":"8,4 W","image":null},{"key":"E","text":"420 W","image":null}],"key":"A","scoringPolicy":{"kind":"all-options-accepted","note":"The published question does not give a numerical speed or elapsed time needed to calculate numerical power. Its original wording and options are retained. Full credit, including blanks, is awarded under our disclosed practice rule; no historical cancellation decision is claimed.","basis":"practice-adjustment","evidenceUrl":"https://accessoprogrammato.mur.gov.it/compiti/CompitoInglese2024.pdf","blankTreatment":"full-credit","acceptedOptionKeys":["A","B","C","D","E"],"nominalSourceOption":"A"}},"correction":{"id":"imat-2024-q55-source-correction-v1","year":2024,"number":55,"prompt":"A boat is moving in a uniform straight motion at a certain speed v. If a braking force of 210 N is applied for a distance of 5 m, how much power is developed by the braking force?","options":[{"key":"A","text":"210 W"},{"key":"B","text":"105 W"},{"key":"C","text":"1050 W"},{"key":"D","text":"8,4 W"},{"key":"E","text":"Cannot be determined from the information given"}],"image":null,"correctKey":"E","reason":"No numerical speed or elapsed time is given, so no numerical power follows. Replace option E with the missing-data answer; do not invent a speed.","explanation":"The braking force does work of magnitude 210 × 5 = 1050 J. Power is work divided by time, or force multiplied by speed at an instant. Neither a numerical speed nor the elapsed time is specified, so a numerical power cannot be determined."}},{"slug":"imat-2025-published","number":52,"expected":{"prompt":"In a rectangle ABCD the base AB is 5/4 of the height BC and the perimeter is 72 cm. What are the dimensions of the rectangle?","image":null,"options":[{"key":"A","text":"AB = 20 m; BC = 16 m","image":null},{"key":"B","text":"AB = 10 m; BC = 8 m","image":null},{"key":"C","text":"AB = 12 m; BC = 10 m","image":null},{"key":"D","text":"AB = 18 m; BC = 16 m","image":null},{"key":"E","text":"AB = 20 m; BC = 18 m","image":null}],"key":"A","scoringPolicy":{"kind":"all-options-accepted","note":"The numerical dimensions implied by a 72 cm perimeter are 20 cm by 16 cm, but the published options use metres. We retain the source wording and options. Full credit, including blanks, is awarded under our disclosed practice rule, not a verified historical cancellation decision.","basis":"practice-adjustment","evidenceUrl":"https://accessoprogrammato.mur.gov.it/compiti/CompitoInglese2025.pdf","blankTreatment":"full-credit","acceptedOptionKeys":["A","B","C","D","E"],"nominalSourceOption":"A"}},"correction":{"id":"imat-2025-q52-source-correction-v1","year":2025,"number":52,"prompt":"In a rectangle ABCD the base AB is 5/4 of the height BC and the perimeter is 72 cm. What are the dimensions of the rectangle?","options":[{"key":"A","text":"AB = 20 cm; BC = 16 cm"},{"key":"B","text":"AB = 10 cm; BC = 8 cm"},{"key":"C","text":"AB = 12 cm; BC = 10 cm"},{"key":"D","text":"AB = 18 cm; BC = 16 cm"},{"key":"E","text":"AB = 20 cm; BC = 18 cm"}],"image":null,"correctKey":"A","reason":"The perimeter is in centimetres but all dimensions in the source choices are labelled in metres. Use centimetres consistently in every choice.","explanation":"Let BC = h cm and AB = 5h/4 cm. Since 2(5h/4 + h) = 72, 9h/2 = 72 and h = 16. Thus BC = 16 cm and AB = 20 cm."}}]$payload$::jsonb) LOOP
    correction := item->'correction';
    SELECT q.*, p.exam_year, p.slug, p.is_published, p.format_evidence,
      to_jsonb(a) AS original_answer
    INTO STRICT question_record
    FROM public.imat_questions q
    JOIN public.imat_papers p ON p.id=q.paper_id
    JOIN public.imat_answer_keys a ON a.question_id=q.id
    WHERE p.slug=item->>'slug' AND q.original_number=(item->>'number')::integer;
    IF NOT question_record.is_published OR question_record.review_status <> 'reviewed'
      OR question_record.exam_year <> (correction->>'year')::integer
      OR question_record.mock_eligible OR question_record.shuffle_options THEN
      RAISE EXCEPTION 'Unexpected publication/review/eligibility state for % Q%', item->>'slug', item->>'number';
    END IF;
    SELECT jsonb_build_object(
      'prompt', question_record.prompt, 'image', question_record.image,
      'options', (SELECT jsonb_agg(jsonb_build_object('key',o.option_key,'text',o.body,'image',o.image) ORDER BY o.option_key)
                  FROM public.imat_question_options o WHERE o.question_id=question_record.id),
      'key', question_record.original_answer->>'correct_option_key',
      'scoringPolicy', question_record.review_notes::jsonb->'scoringPolicy'
    ) INTO current_snapshot;
    IF current_snapshot IS DISTINCT FROM item->'expected'
       OR question_record.review_notes::jsonb ? 'practiceCorrection'
       OR nullif(question_record.format_evidence::jsonb->>'publicationNotice','') IS NULL THEN
      RAISE EXCEPTION 'Source snapshot changed or correction already applied for % Q%; transaction cancelled', item->>'slug', item->>'number';
    END IF;
    UPDATE public.imat_questions SET
      prompt=correction->>'prompt', image=nullif(correction->'image','null'::jsonb),
      review_notes=((review_notes::jsonb - 'scoringPolicy') || jsonb_build_object(
        'practiceCorrection', jsonb_build_object(
          'id',correction->>'id','reason',correction->>'reason',
          'reviewedBy',owner_review,'reviewedAt',now(),
          'original',current_snapshot || jsonb_build_object('answer',question_record.original_answer,
            'reviewNotes',question_record.review_notes::jsonb)
        )))::text,
      reviewed_by=owner_review, reviewed_at=now(), updated_at=now()
    WHERE id=question_record.id;
    UPDATE public.imat_question_options o SET body=choice.value->>'text', updated_at=now()
    FROM jsonb_array_elements(correction->'options') choice
    WHERE o.question_id=question_record.id AND o.option_key=choice.value->>'key';
    GET DIAGNOSTICS affected=ROW_COUNT;
    IF affected <> 5 THEN RAISE EXCEPTION 'Expected exactly five options'; END IF;
    UPDATE public.imat_answer_keys SET
      correct_option_key=correction->>'correctKey',
      evidence_reference='Saturday Education corrected practice version: ' || (correction->>'reason'),
      explanation=correction->>'explanation', explanation_reviewed_by=owner_review,
      explanation_reviewed_at=now(), reviewed_by=owner_review, reviewed_at=now(), updated_at=now()
    WHERE question_id=question_record.id;
    GET DIAGNOSTICS affected=ROW_COUNT;
    IF affected <> 1 THEN RAISE EXCEPTION 'Expected exactly one answer key'; END IF;
  END LOOP;
  UPDATE public.imat_papers SET
    format_evidence=((format_evidence::jsonb - 'publicationNotice') || jsonb_build_object(
      'previousPublicationNotice',format_evidence::jsonb->'publicationNotice',
      'minorSourceCorrections',true,
      'minorSourceCorrectionsNotice','Minor source errors have been corrected for practice.'
    ))::text,
    content_version=content_version+1, reviewed_by=owner_review, reviewed_at=now(), updated_at=now()
  WHERE slug IN ('imat-2013-published','imat-2024-published','imat-2025-published');
  GET DIAGNOSTICS affected=ROW_COUNT;
  IF affected <> 3 THEN RAISE EXCEPTION 'Expected exactly three papers'; END IF;
END
$corrections$;
SELECT p.slug,q.original_number AS question,a.correct_option_key,
  q.review_notes::jsonb->'practiceCorrection'->>'id' AS correction,
  NOT(q.review_notes::jsonb ? 'scoringPolicy') AS normal_scoring,
  p.format_evidence::jsonb->>'minorSourceCorrectionsNotice' AS notice
FROM public.imat_questions q
JOIN public.imat_papers p ON p.id=q.paper_id
JOIN public.imat_answer_keys a ON a.question_id=q.id
WHERE (p.exam_year=2013 AND q.original_number IN(5,54))
  OR(p.exam_year=2024 AND q.original_number=55)
  OR(p.exam_year=2025 AND q.original_number=52)
ORDER BY p.exam_year,q.original_number;
COMMIT;
