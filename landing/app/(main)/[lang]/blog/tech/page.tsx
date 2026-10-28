import type { Metadata } from 'next';
import { Language, languages, translations } from '@/lib/i18n';
import { buildListMetadata, getAllPosts, toCardPost } from '@/lib/blog';
import { TECH, categoryListPath } from '@/lib/blog-categories';
import BlogPageClient from '../BlogPageClient';

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export function generateMetadata({ params }: { params: { lang: Language } }): Metadata {
  const t = translations[params.lang];
  return buildListMetadata(params.lang, (l) => categoryListPath(TECH, l), `${t[TECH.nameKey]} — ${t.blog_title} | Touchizen`, t.blog_subtitle);
}

export default function TechBlogPage({ params }: { params: { lang: Language } }) {
  return <BlogPageClient lang={params.lang} posts={getAllPosts(params.lang, TECH).map(toCardPost)} category={TECH} />;
}
