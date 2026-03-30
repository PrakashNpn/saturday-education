import { Link } from "@/i18n/navigation"

export default function Footer() {
  return (
    <footer className="bg-[#590D82] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold">Saturday Education</Link>
            <p className="mt-2 text-purple-200 text-sm">Global Education, Within Reach</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-purple-200">
              <li><Link href="/universities" className="hover:text-white transition-colors">Universities</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-purple-200">
              <li><Link href="/#consultation" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/#consultation" className="hover:text-white transition-colors">Book Consultation</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-700 text-center text-sm text-purple-300">
          © 2026 Saturday Education. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
