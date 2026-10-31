import type { Metadata } from 'next';
import { blogTranslations, type BlogLanguage } from '@/lib/i18n';
import { buildListMetadata, getAllPosts, toCardPost } from '@/lib/blog';
import { categoryListPath, type BlogCategory } from '@/lib/blog-categories';
import BlogPageClient from './BlogPageClient';

// Everything a category's list route does, given the category — like postRoute.tsx for posts.

export function listMetadata(lang: BlogLanguage, category: BlogCategory): Metadata {
  const t = blogTranslations[lang];
  return buildListMetadata(lang, (l) => categoryListPath(category, l), `${t[category.nameKey]} — ${t.blog_title} | Touchizen`, t[category.subtitleKey], category.languages);
}

export function renderListPage(lang: BlogLanguage, category: BlogCategory) {
  return <BlogPageClient lang={lang} posts={getAllPosts(lang, category).map(toCardPost)} category={category} />;
}
