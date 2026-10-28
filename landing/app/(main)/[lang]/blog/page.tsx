import type { Metadata } from 'next';
import { Language, languages, translations } from '@/lib/i18n';
import { buildListMetadata } from '@/lib/blog';
import { hubSections } from '@/lib/blog-hub';
import BlogHubClient from './BlogHubClient';

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export function generateMetadata({ params }: { params: { lang: Language } }): Metadata {
  const t = translations[params.lang];
  return buildListMetadata(params.lang, (l) => `/${l}/blog/`, `${t.blog_title} | Touchizen`, t.blog_hub_subtitle);
}

export default function BlogHubPage({ params }: { params: { lang: Language } }) {
  return <BlogHubClient lang={params.lang} sections={hubSections(params.lang)} />;
}
