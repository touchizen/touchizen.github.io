import { Language, languages } from '@/lib/i18n';
import { getAllPosts, toCardPost } from '@/lib/blog';
import { TECH } from '@/lib/blog-categories';
import BlogPageClient from '../BlogPageClient';

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export default function TechBlogPage({ params }: { params: { lang: Language } }) {
  return <BlogPageClient lang={params.lang} posts={getAllPosts(params.lang, TECH).map(toCardPost)} category={TECH} />;
}
