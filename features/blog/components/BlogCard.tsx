import type { BlogPost } from "../types/blog.types"

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a href={`/blog/${post.slug}`} className="group block bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gradient-to-br from-[#590D82] to-[#3D0A5A] flex items-center justify-center text-white">
        {post.category && <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{post.category}</span>}
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-[#590D82] transition-colors">{post.title}</h3>
        <p className="text-sm text-neutral-500 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>{post.author}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </a>
  )
}
