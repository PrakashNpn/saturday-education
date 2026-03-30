import BlogPost from "@/features/blog/components/BlogPost"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main>
      <BlogPost slug={slug} />
    </main>
  )
}
