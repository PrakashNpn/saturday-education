'use client'
import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { RANKING_FILTERS } from '../utils/universityUtils'
import type { UniversityFinderData } from '../types/university.types'

const SLIDER_MAX = 100000

interface Props {
  data: UniversityFinderData
  selectedCountries: string[]
  selectedDegrees: string[]
  selectedCourses: string[]
  tuitionMin: number
  tuitionMax: number
  rankingMax: number | null
  studyType: string
  onToggleCountry: (name: string) => void
  onToggleDegree: (degree: string) => void
  onToggleCourse: (course: string) => void
  onTuitionMinChange: (v: number) => void
  onTuitionMaxChange: (v: number) => void
  onRankingChange: (v: number | null) => void
  onStudyTypeChange: (v: string) => void
  onResetAll: () => void
  translations: {
    advancedFilters: string
    resetAll: string
    filterCountry: string
    filterDegree: string
    filterCourses: string
    filterTuition: string
    filterRanking: string
    filterStudyType: string
    tuitionMin: string
    tuitionMax: string
    rankTop50: string
    rankTop100: string
    rankTop300: string
    onCampus: string
    hybrid: string
    online: string
    noLimit: string
  }
  degreeLabels: Record<string, string>
}

const rankLabelKeys: Record<number, 'rankTop50' | 'rankTop100' | 'rankTop300'> = {
  50: 'rankTop50',
  100: 'rankTop100',
  999: 'rankTop300',
}

const thumbClass =
  'absolute inset-0 w-full h-6 appearance-none bg-transparent cursor-pointer pointer-events-none ' +
  '[&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent ' +
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 ' +
  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-purple ' +
  '[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white ' +
  '[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab ' +
  '[&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:pointer-events-auto ' +
  '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full ' +
  '[&::-moz-range-thumb]:bg-brand-purple [&::-moz-range-thumb]:border-[3px] ' +
  '[&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab ' +
  '[&::-moz-range-thumb]:pointer-events-auto'

// ── Sub-components defined outside to avoid remount on each render ────────────

function SectionHeader({
  label,
  count,
  open,
  onToggle,
}: {
  label: string
  count: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between mb-3 group"
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        {count > 0 && (
          <span className="w-4 h-4 bg-brand-purple text-white text-[9px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
            {count}
          </span>
        )}
      </div>
      <ChevronDown
        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      />
    </button>
  )
}

function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          checked
            ? 'bg-brand-purple border-brand-purple'
            : 'bg-white border-gray-300 group-hover:border-brand-purple'
        }`}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
      </div>
      <span
        className={`text-sm transition-colors leading-snug ${
          checked ? 'text-brand-purple font-semibold' : 'text-gray-600 group-hover:text-gray-800'
        }`}
      >
        {label}
      </span>
    </label>
  )
}

function RadioRow({
  selected,
  onChange,
  label,
  name,
}: {
  selected: boolean
  onChange: () => void
  label: string
  name: string
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="radio" name={name} className="sr-only" checked={selected} onChange={onChange} />
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          selected
            ? 'border-brand-purple bg-white'
            : 'bg-white border-gray-300 group-hover:border-brand-purple'
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-brand-purple" />}
      </div>
      <span
        className={`text-sm transition-colors ${
          selected ? 'text-brand-purple font-semibold' : 'text-gray-600 group-hover:text-gray-800'
        }`}
      >
        {label}
      </span>
    </label>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function UniversityFilters({
  data,
  selectedCountries,
  selectedDegrees,
  selectedCourses,
  tuitionMin,
  tuitionMax,
  rankingMax,
  studyType,
  onToggleCountry,
  onToggleDegree,
  onToggleCourse,
  onTuitionMinChange,
  onTuitionMaxChange,
  onRankingChange,
  onStudyTypeChange,
  onResetAll,
  translations: t,
  degreeLabels,
}: Props) {
  const [open, setOpen] = useState({
    country: true,
    degree: true,
    courses: true,
    tuition: true,
    ranking: true,
    studyType: true,
  })

  const toggle = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }))

  const hasActiveFilters =
    selectedCountries.length > 0 ||
    selectedDegrees.length > 0 ||
    selectedCourses.length > 0 ||
    tuitionMin > 0 ||
    tuitionMax < SLIDER_MAX ||
    rankingMax !== null ||
    studyType !== ''

  const minPct = (tuitionMin / SLIDER_MAX) * 100
  const maxPct = (tuitionMax / SLIDER_MAX) * 100
  const divider = 'border-t border-gray-100 pt-5 mt-1'

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-brand-purple rounded-full" />
          <h2 className="text-sm font-bold text-gray-800">{t.advancedFilters}</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetAll}
            className="text-[10px] font-bold bg-brand-purple text-white px-2.5 py-1 rounded-full hover:bg-brand-purple-dark transition-colors"
          >
            {t.resetAll}
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Country */}
        <div>
          <SectionHeader
            label={t.filterCountry}
            count={selectedCountries.length}
            open={open.country}
            onToggle={() => toggle('country')}
          />
          {open.country && (
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin space-y-2.5 pr-1">
              {data.countries.map((c) => (
                <CheckRow
                  key={c.id}
                  checked={selectedCountries.includes(c.name)}
                  onChange={() => onToggleCountry(c.name)}
                  label={c.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Degree */}
        <div className={divider}>
          <SectionHeader
            label={t.filterDegree}
            count={selectedDegrees.length}
            open={open.degree}
            onToggle={() => toggle('degree')}
          />
          {open.degree && (
            <div className="space-y-2.5">
              {data.degreeLevels.map((d) => (
                <CheckRow
                  key={d}
                  checked={selectedDegrees.includes(d)}
                  onChange={() => onToggleDegree(d)}
                  label={degreeLabels[d] ?? d}
                />
              ))}
            </div>
          )}
        </div>

        {/* Courses */}
        <div className={divider}>
          <SectionHeader
            label={t.filterCourses}
            count={selectedCourses.length}
            open={open.courses}
            onToggle={() => toggle('courses')}
          />
          {open.courses && (
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin space-y-2.5 pr-1">
              {data.programFields.map((f) => (
                <CheckRow
                  key={f}
                  checked={selectedCourses.includes(f)}
                  onChange={() => onToggleCourse(f)}
                  label={f}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tuition Fees */}
        <div className={divider}>
          <SectionHeader
            label={t.filterTuition}
            count={tuitionMin > 0 || tuitionMax < SLIDER_MAX ? 1 : 0}
            open={open.tuition}
            onToggle={() => toggle('tuition')}
          />
          {open.tuition && (
            <>
              <div className="flex items-end gap-2 mt-1">
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    {t.tuitionMin}
                  </p>
                  <input
                    type="number"
                    value={tuitionMin}
                    min={0}
                    max={tuitionMax - 1000}
                    step={1000}
                    onChange={(e) =>
                      onTuitionMinChange(
                        Math.max(0, Math.min(Number(e.target.value), tuitionMax - 1000)),
                      )
                    }
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 bg-white outline-none focus:border-brand-purple transition-colors"
                  />
                </div>

                <span className="text-gray-400 font-medium pb-2 flex-shrink-0">–</span>

                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    {t.tuitionMax}
                  </p>
                  {tuitionMax >= SLIDER_MAX ? (
                    <div className="py-1.5 px-3 border border-brand-purple-100 bg-brand-purple-50 rounded-lg text-xs font-semibold text-brand-purple">
                      {t.noLimit}
                    </div>
                  ) : (
                    <input
                      type="number"
                      value={tuitionMax}
                      min={tuitionMin + 1000}
                      max={SLIDER_MAX}
                      step={1000}
                      onChange={(e) =>
                        onTuitionMaxChange(
                          Math.max(tuitionMin + 1000, Number(e.target.value)),
                        )
                      }
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 bg-white outline-none focus:border-brand-purple transition-colors"
                    />
                  )}
                </div>
              </div>

              <div className="relative h-6 mt-4">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full pointer-events-none" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-brand-purple rounded-full pointer-events-none"
                  style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
                />
                <input
                  type="range" min={0} max={SLIDER_MAX} step={1000} value={tuitionMin}
                  onChange={(e) => {
                    const v = Math.min(Number(e.target.value), tuitionMax - 1000)
                    onTuitionMinChange(Math.max(0, v))
                  }}
                  style={{ zIndex: 5 }}
                  className={thumbClass}
                />
                <input
                  type="range" min={0} max={SLIDER_MAX} step={1000} value={tuitionMax}
                  onChange={(e) => {
                    const v = Math.max(Number(e.target.value), tuitionMin + 1000)
                    onTuitionMaxChange(v)
                  }}
                  style={{ zIndex: 4 }}
                  className={thumbClass}
                />
              </div>
            </>
          )}
        </div>

        {/* Global Ranking */}
        <div className={divider}>
          <SectionHeader
            label={t.filterRanking}
            count={rankingMax !== null ? 1 : 0}
            open={open.ranking}
            onToggle={() => toggle('ranking')}
          />
          {open.ranking && (
            <div className="space-y-2.5">
              {RANKING_FILTERS.map(({ value }) => (
                <RadioRow
                  key={value}
                  name="ranking"
                  selected={rankingMax === value}
                  onChange={() => onRankingChange(rankingMax === value ? null : value)}
                  label={t[rankLabelKeys[value]]}
                />
              ))}
            </div>
          )}
        </div>

        {/* Study Type */}
        <div className={divider}>
          <SectionHeader
            label={t.filterStudyType}
            count={studyType !== '' ? 1 : 0}
            open={open.studyType}
            onToggle={() => toggle('studyType')}
          />
          {open.studyType && (
            <div className="space-y-2.5">
              {[
                { value: 'on-campus', label: t.onCampus },
                { value: 'hybrid', label: t.hybrid },
                { value: 'online', label: t.online },
              ].map(({ value, label }) => (
                <RadioRow
                  key={value}
                  name="studyType"
                  selected={studyType === value}
                  onChange={() => onStudyTypeChange(studyType === value ? '' : value)}
                  label={label}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
