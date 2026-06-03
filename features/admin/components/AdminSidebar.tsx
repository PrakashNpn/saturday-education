'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin/countries', label: 'Countries' },
  { href: '/admin/universities', label: 'Universities' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-700">Saturday Admin</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith(href)
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-3">
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
