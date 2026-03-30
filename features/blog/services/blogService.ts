import type { BlogPost } from "../types/blog.types"

export const STATIC_BLOG_POSTS: BlogPost[] = [
  { id: "1", slug: "how-to-apply-uk-universities", title: "How to Apply to UK Universities", excerpt: "A complete guide for Asian students applying to the UK.", author: "Saturday Education", publishedAt: "2026-03-01", category: "UK" },
  { id: "2", slug: "australia-student-visa-guide", title: "Australia Student Visa Guide 2026", excerpt: "Everything you need to know about the Australian student visa process.", author: "Saturday Education", publishedAt: "2026-02-15", category: "Australia" },
  { id: "3", slug: "top-scholarships-asian-students", title: "Top Scholarships for Asian Students", excerpt: "Discover the best scholarship opportunities available for students from Asia.", author: "Saturday Education", publishedAt: "2026-02-01", category: "Scholarships" },
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  return STATIC_BLOG_POSTS
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug)
}
