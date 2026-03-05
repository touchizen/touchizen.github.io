import { Language, languages } from '@/lib/i18n';
import { getAllPosts } from '@/lib/blog';
import BlogPageClient from './BlogPageClient';

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export default function BlogPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang;
  const posts = getAllPosts(lang);

  return <BlogPageClient lang={lang} posts={posts} />;
}
