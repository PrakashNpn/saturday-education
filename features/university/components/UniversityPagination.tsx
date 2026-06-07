import { ChevronLeft, ChevronRight } from 'lucide-react'

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const left = Math.max(2, current - 2)
  const right = Math.min(total - 1, current + 2)
  const pages: (number | '...')[] = [1]
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('...')
  pages.push(total)
  return pages
}

interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  previousLabel: string
  nextLabel: string
}

export function UniversityPagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = getPages(page, totalPages)

  return (
    <div className="flex items-center justify-center gap-3 mt-10">

      {/* Prev arrow — ghost style, fills on hover */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="w-9 h-9 rounded-full flex items-center justify-center
          border border-brand-purple/30 text-brand-purple
          hover:bg-brand-purple hover:text-white hover:border-brand-purple hover:shadow-[0_4px_16px_rgba(89,13,130,0.35)]
          active:scale-95 transition-all duration-200
          disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand-purple disabled:hover:border-brand-purple/30 disabled:hover:shadow-none"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers — floating glass card */}
      <div className="flex items-center gap-0.5 bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] border border-gray-100 px-2 py-1.5">
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="w-7 text-center text-gray-300 select-none text-sm leading-none">
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-xl text-sm font-medium transition-all duration-200 ${
                p === page
                  ? 'bg-brand-purple text-white shadow-[0_2px_10px_rgba(89,13,130,0.4)] scale-105'
                  : 'text-gray-500 hover:bg-brand-purple-50 hover:text-brand-purple'
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Next arrow — ghost style, fills on hover */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="w-9 h-9 rounded-full flex items-center justify-center
          border border-brand-purple/30 text-brand-purple
          hover:bg-brand-purple hover:text-white hover:border-brand-purple hover:shadow-[0_4px_16px_rgba(89,13,130,0.35)]
          active:scale-95 transition-all duration-200
          disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand-purple disabled:hover:border-brand-purple/30 disabled:hover:shadow-none"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

    </div>
  )
}
