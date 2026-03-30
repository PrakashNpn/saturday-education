import { getBlogPostBySlug } from "../services/blogService"

export default async function BlogPost({ slug }: { slug: string }) {
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Post not found</h1>
        <a href="/blog" className="text-[#590D82] mt-4 inline-block hover:underline">← Back to Blog</a>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <a href="/blog" className="text-[#590D82] text-sm hover:underline mb-6 inline-block">← Back to Blog</a>
      {post.category && <span className="inline-block mb-4 px-3 py-1 bg-purple-50 text-[#590D82] text-sm font-medium rounded-full">{post.category}</span>}
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-100">
        <span>{post.author}</span><span>·</span>
        <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</span>
      </div>
      <p className="text-neutral-700 text-lg leading-relaxed mb-8">{post.excerpt}</p>
      <div className="bg-neutral-50 rounded-2xl p-6 text-center text-neutral-500 text-sm">
        Full article content will be available in Phase 3 via Sanity CMS.
      </div>
    </article>
  )
}
