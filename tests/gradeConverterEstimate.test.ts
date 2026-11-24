import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { TARGET_COUNTRIES } from '../features/grade-converter/data/countries'
import {
  DESTINATION_FORMAT,
  DESTINATION_SCALE_LABEL,
  SCALE_TYPES,
  STRENGTH_TO_BAND,
  defaultTargetStudyLevel,
} from '../features/grade-converter/data/estimate-model'
import { estimateGrade, instantConvert, normalizeToPercent } from '../features/grade-converter/services/estimate'
import { buildGradeLeadSummary } from '../features/grade-converter/services/leadSummary'

describe('grade converter estimates', () => {
  test('every target country has a destination format and scale label', () => {
    for (const country of TARGET_COUNTRIES) {
      const format = DESTINATION_FORMAT[country.key]
      assert.ok(format, `missing format for ${country.key}`)
      assert.ok(DESTINATION_SCALE_LABEL[format], `missing scale label for ${country.key}`)
      assert.ok(STRENGTH_TO_BAND[format]?.length, `missing strength map for ${format}`)
    }
  })

  test('offers percentage plus 4.0 and 5.0 GPA scales', () => {
    assert.deepEqual([...SCALE_TYPES], ['percent100', 'gpa4', 'gpa5'])
  })

  test('auto-selects the usual next study level', () => {
    assert.equal(defaultTargetStudyLevel('highSchool'), 'bachelor')
    assert.equal(defaultTargetStudyLevel('bachelor'), 'master')
    assert.equal(defaultTargetStudyLevel('master'), 'master')
  })

  test('maps 4.0 and 5.0 GPA into qualitative planning strengths', () => {
    assert.equal(normalizeToPercent('percent100', '80'), 85)
    assert.equal(normalizeToPercent('gpa4', '3.2'), 76)
    assert.equal(normalizeToPercent('gpa4', '4.5'), null)
    assert.equal(normalizeToPercent('gpa5', '4.0'), 76)
    assert.equal(normalizeToPercent('gpa5', '5.5'), null)
  })

  test('builds a transparent linear GPA ↔ percentage reference', () => {
    const fromGpa4 = instantConvert('gpa4', '3.2')
    assert.ok(fromGpa4)
    assert.equal(fromGpa4!.percent, 80)
    assert.equal(fromGpa4!.gpa4, 3.2)
    assert.equal(fromGpa4!.gpa5, 4)
    assert.equal(fromGpa4!.formula, 'gpa4')

    const fromGpa5 = instantConvert('gpa5', '4.0')
    assert.ok(fromGpa5)
    assert.equal(fromGpa5!.percent, 80)
    assert.equal(fromGpa5!.gpa4, 3.2)
    assert.equal(fromGpa5!.formula, 'gpa5')

    const fromPercent = instantConvert('percent100', '80')
    assert.ok(fromPercent)
    assert.equal(fromPercent!.gpa4, 3.2)
    assert.equal(fromPercent!.gpa5, 4)
    assert.equal(fromPercent!.formula, 'percent')
  })

  test('maps a Vietnam Good GPA into a UK 2:1 planning band', () => {
    const result = estimateGrade({
      origin: 'vietnam',
      target: 'uk',
      scale: 'gpa4',
      score: '3.0',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'upperSecond')
    assert.equal(result.displayValue, '2:1')
    assert.equal(result.sourceBandLabel, '3.00 - 3.49 (Good)')
  })

  test('maps a Good 5.0 GPA into the same UK 2:1 planning band as 4.0', () => {
    const result = estimateGrade({
      origin: 'singapore',
      target: 'uk',
      scale: 'gpa5',
      score: '3.8',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'upperSecond')
    assert.equal(result.displayValue, '2:1')
    assert.equal(result.submittedLabel, '3.8 / 5.0')
    assert.equal(result.sourceBandLabel, '3.80 - 4.39 (Good)')
  })

  test('maps a Satisfactory GPA into a UK 2:1 planning band', () => {
    const result = estimateGrade({
      origin: 'vietnam',
      target: 'uk',
      scale: 'gpa4',
      score: '2.6',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'upperSecond')
    assert.equal(result.displayValue, '2:1')
  })

  test('maps an Excellent GPA into a UK First planning band', () => {
    const result = estimateGrade({
      origin: 'vietnam',
      target: 'uk',
      scale: 'gpa4',
      score: '3.8',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'first')
    assert.equal(result.displayValue, '1st')
  })

  test('maps Thailand 3.2/4 into a Canadian percentage band like Expert', () => {
    const result = estimateGrade({
      origin: 'thailand',
      target: 'canada',
      scale: 'gpa4',
      score: '3.2',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'pct_good')
    assert.equal(result.displayValue, '73-79%')
    assert.equal(result.sourceBandLabel, '3.00 - 3.49 (Good)')
    assert.equal(result.destinationScaleLabel, 'Percentage')
  })

  test('maps a Good percentage into a UK 2:1 planning band', () => {
    const result = estimateGrade({
      origin: 'myanmar',
      target: 'uk',
      scale: 'percent100',
      score: '74',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'upperSecond')
    assert.equal(result.displayValue, '2:1')
  })

  test('maps a Good percentage into a solid US GPA band', () => {
    const result = estimateGrade({
      origin: 'myanmar',
      target: 'usa',
      scale: 'percent100',
      score: '70',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'gpa4_30')
    assert.equal(result.displayValue, '3.0-3.2 GPA')
  })

  test('leads Australia results with the class name, not only the GPA range', () => {
    const result = estimateGrade({
      origin: 'thailand',
      target: 'australia',
      scale: 'gpa4',
      score: '3.2',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'gpa7_d')
    assert.equal(result.displayValue, 'Distinction (D)')
    assert.equal(result.detailLabel, '5.5-6.4 / 7.0')
    assert.equal(result.destinationScaleLabel, '7.0 GPA / Class')
  })

  test('maps a Good percentage into a French Bien band', () => {
    const result = estimateGrade({
      origin: 'myanmar',
      target: 'france',
      scale: 'percent100',
      score: '70',
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.bandId, 'fr_14')
    assert.equal(result.displayValue, 'Bien')
    assert.equal(result.detailLabel, '14-15.9 / 20')
  })

  test('uses native formats for Netherlands and Hungary', () => {
    const nl = estimateGrade({ origin: 'thailand', target: 'netherlands', scale: 'gpa4', score: '3.2' })
    assert.equal(nl.ok, true)
    if (nl.ok) {
      assert.equal(nl.format, 'scale10')
      assert.equal(nl.displayValue, '7.0-8.9')
    }

    const hu = estimateGrade({ origin: 'thailand', target: 'hungary', scale: 'gpa4', score: '3.2' })
    assert.equal(hu.ok, true)
    if (hu.ok) {
      assert.equal(hu.format, 'scale5')
      assert.equal(hu.displayValue, '4 / 5')
      assert.equal(hu.detailLabel, 'Good')
    }
  })

  test('returns an estimate with source-band metadata for every target', () => {
    for (const country of TARGET_COUNTRIES) {
      const result = estimateGrade({
        origin: 'thailand',
        target: country.key,
        scale: 'gpa4',
        score: '3.0',
      })
      assert.equal(result.ok, true, country.key)
      if (!result.ok) continue
      assert.ok(result.sourceBandLabel, country.key)
      assert.ok(result.destinationScaleLabel, country.key)
      assert.ok(result.displayValue, country.key)
    }
  })

  test('rejects unknown targets and out-of-range scores', () => {
    assert.equal(estimateGrade({ origin: 'usa', target: 'atlantis', scale: 'gpa4', score: '3' }).ok, false)
    assert.equal(estimateGrade({ origin: 'uk', target: 'uk', scale: 'percent100', score: '120' }).ok, false)
  })

  test('builds a counsellor-facing grade lead summary', () => {
    const summary = buildGradeLeadSummary({
      originLabel: 'Myanmar (Burma)',
      targetLabel: 'Canada',
      qualificationLabel: "Bachelor's",
      studyLevelLabel: "Master's",
      subjectLabel: 'Business and management',
      scaleLabel: 'Percentage (0 - 100%)',
      submittedGrade: '72%',
      sourceBandLabel: '70 - 79% (Good)',
      estimateDisplay: '73-79%',
      estimateDetail: null,
      destinationScaleLabel: 'Percentage',
      instantReference: '~72% · ~2.88/4.0 · ~3.60/5.0',
    })
    assert.match(summary, /\[Via Grade Converter\]/)
    assert.match(summary, /Country of study: Myanmar/)
    assert.match(summary, /Quick conversion: ~72%/)
    assert.match(summary, /Destination estimate: 73-79%/)
  })
})
