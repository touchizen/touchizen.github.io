import type { Metadata } from 'next';
import { Language, languages, translations } from '@/lib/i18n';
import { buildListMetadata, getAllPosts, toCardPost } from '@/lib/blog';
import { BLOG_CATEGORIES } from '@/lib/blog-categories';
import BlogHubClient, { type HubSection } from './BlogHubClient';

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export function generateMetadata({ params }: { params: { lang: Language } }): Metadata {
  const t = translations[params.lang];
  return buildListMetadata(params.lang, (l) => `/${l}/blog/`, `${t.blog_title} | Touchizen`, t.blog_hub_subtitle);
}

const HUB_POSTS_PER_CATEGORY = 3;

export default function BlogHubPage({ params }: { params: { lang: Language } }) {
  // With a single category the hub is that category's whole list — the old /blog/ page, no less.
  const several = BLOG_CATEGORIES.length > 1;
  const sections: HubSection[] = BLOG_CATEGORIES.map((category) => {
    const posts = getAllPosts(params.lang, category);
    const shown = several ? posts.slice(0, HUB_POSTS_PER_CATEGORY) : posts;
    return { category, posts: shown.map(toCardPost), more: posts.length > shown.length };
  }).filter((s) => s.posts.length > 0);

  return <BlogHubClient lang={params.lang} sections={sections} />;
}
