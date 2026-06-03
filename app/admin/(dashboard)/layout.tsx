import { requireAdmin } from '@/shared/lib/admin-auth'
import AdminSidebar from '@/features/admin/components/AdminSidebar'

export const metadata = { title: 'Admin — Saturday Education' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
