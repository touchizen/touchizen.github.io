import type { Metadata } from 'next';
import { languages, type BlogLanguage } from '@/lib/i18n';
import { getAllPosts, getPostBySlug, buildPostMetadata, buildPostJsonLd, relatedPosts, latestPosts, adjacentPosts, type BlogPost } from '@/lib/blog';
import type { BlogCategory } from '@/lib/blog-categories';
import BlogPostClient, { type PostSummary } from './[slug]/BlogPostClient';

// Everything a category's post route does, given the category. Each route file only names its category
// (blog/[slug]/page.tsx → TECH), so a copied route can't silently fall back to IT posts or addresses.

type Params = { lang: BlogLanguage; slug: string };

/**
 * Static params of the [lang] tree: the site languages the category is written in — its blog-only languages
 * have their own tree, and an undeclared language would be built with an English canonical.
 */
export function postStaticParams(category: BlogCategory): { lang: string; slug: string }[] {
  const langs = languages.filter((l) => category.languages.includes(l.code));
  const params = langs.flatMap((l) => getAllPosts(l.code, category).map((post) => ({ lang: l.code, slug: post.slug })));
  // When no posts exist, return a placeholder to satisfy output: 'export'.
  // The page component handles missing posts gracefully.
  if (params.length === 0) {
    return langs.map((l) => ({ lang: l.code, slug: '_placeholder' }));
  }
  return params;
}

/** Static params of a blog-only language's own route tree (app/(main)/es/…): the slugs of its posts. */
export function postSlugParams(lang: BlogLanguage, category: BlogCategory): { slug: string }[] {
  return getAllPosts(lang, category).map((post) => ({ slug: post.slug }));
}

export function postMetadata(params: Params, category: BlogCategory): Metadata {
  return buildPostMetadata(params.lang, params.slug, category);
}

export function renderPostPage(params: Params, category: BlogCategory) {
  const post = getPostBySlug(params.lang, params.slug, category);
  if (!post) return <div>Post not found</div>;

  const jsonLd = buildPostJsonLd(params.lang, params.slug, post, category);

  // Only what the links show, so other posts' bodies stay out of the page payload.
  const summary = ({ slug, title, date, image }: BlogPost): PostSummary => ({ slug, title, date, image });
  const posts = getAllPosts(params.lang, category);
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
      category={category}
    />
  );
}
