import type { Metadata } from 'next';
import { Language, translations } from '@/lib/i18n';
import { buildListMetadata, getAllPosts, toCardPost } from '@/lib/blog';
import { categoryListPath, type BlogCategory } from '@/lib/blog-categories';
import BlogPageClient from './BlogPageClient';

// Everything a category's list route does, given the category — like postRoute.tsx for posts.

export function listMetadata(lang: Language, category: BlogCategory): Metadata {
  const t = translations[lang];
  return buildListMetadata(lang, (l) => categoryListPath(category, l), `${t[category.nameKey]} — ${t.blog_title} | Touchizen`, t[category.subtitleKey]);
}

export function renderListPage(lang: Language, category: BlogCategory) {
  return <BlogPageClient lang={lang} posts={getAllPosts(lang, category).map(toCardPost)} category={category} />;
}
