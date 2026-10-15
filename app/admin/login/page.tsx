export const metadata = { title: 'Admin Login — Saturday Education' }

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-gray-900">Saturday Admin</h1>
        <p className="mb-6 text-sm text-gray-500">Sign in to manage content</p>

        <form action="/api/admin/login" method="POST" className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-action focus:outline-none focus:ring-1 focus:ring-action"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-action px-4 py-2 text-sm font-medium text-white hover:bg-action-hover focus:outline-none"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
