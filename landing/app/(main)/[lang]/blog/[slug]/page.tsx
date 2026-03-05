import { Language, languages } from '@/lib/i18n';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const l of languages) {
    const posts = getAllPosts(l.code);
    for (const post of posts) {
      params.push({ lang: l.code, slug: post.slug });
    }
  }
  // When no posts exist, return a placeholder to satisfy output: 'export'.
  // The page component handles missing posts gracefully.
  if (params.length === 0) {
    return languages.map((l) => ({ lang: l.code, slug: '_placeholder' }));
  }
  return params;
}

export default function BlogPostPage({ params }: { params: { lang: Language; slug: string } }) {
  const post = getPostBySlug(params.lang, params.slug);
  if (!post) return <div>Post not found</div>;

  return <BlogPostClient lang={params.lang} post={post} />;
}
