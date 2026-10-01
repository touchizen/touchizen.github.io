import type { Metadata } from 'next';
import { Language, languages } from '@/lib/i18n';
import { getAllPosts, getPostBySlug, buildPostMetadata, buildPostJsonLd, relatedPosts, latestPosts, adjacentPosts, type BlogPost } from '@/lib/blog';
import BlogPostClient, { type PostSummary } from './BlogPostClient';

export function generateMetadata({ params }: { params: { lang: Language; slug: string } }): Metadata {
  return buildPostMetadata(params.lang, params.slug);
}

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

  const jsonLd = buildPostJsonLd(params.lang, params.slug, post);

  // Only what the links show, so other posts' bodies stay out of the page payload.
  const summary = ({ slug, title, date, image }: BlogPost): PostSummary => ({ slug, title, date, image });
  const posts = getAllPosts(params.lang);
  const related = relatedPosts(post, posts);
  const latest = latestPosts(post, posts, related);
  // With nothing related, the next newest posts take the related posts' place.
  const others = related.length > 0 ? [] : latestPosts(post, posts, latest);
  const { prev, next } = adjacentPosts(post, posts);

  return (
    <BlogPostClient
      lang={params.lang}
      post={post}
      related={related.map(summary)}
      others={others.map(summary)}
      latest={latest.map(summary)}
      prev={prev && summary(prev)}
      next={next && summary(next)}
      jsonLd={jsonLd}
    />
  );
}
