export default function UniversityFilters() {
  return (
    <div className="bg-neutral-50 border-b border-neutral-100 py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
        <select className="px-4 py-2 border border-neutral-200 rounded-lg text-sm bg-white">
          <option>All Countries</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>USA</option>
          <option>Canada</option>
        </select>
        <select className="px-4 py-2 border border-neutral-200 rounded-lg text-sm bg-white">
          <option>All Levels</option>
          <option>Bachelor</option>
          <option>Master</option>
          <option>PhD</option>
        </select>
        <p className="text-sm text-neutral-400 ml-auto">Filters coming in Phase 4</p>
      </div>
    </div>
  )
}
