import { getBlogPosts } from "../services/blogService"
import BlogCard from "./BlogCard"

export default async function BlogGrid() {
  const posts = await getBlogPosts()
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  )
}
