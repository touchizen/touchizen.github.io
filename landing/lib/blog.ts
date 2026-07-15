import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Metadata } from 'next';
import { Language, languages } from './i18n';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  content: string;
  htmlContent: string;
  noindex: boolean;
  image?: string;
}

const contentDir = path.join(process.cwd(), 'content', 'blog');

const SITE_URL = 'https://touchizen.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/touchizen.png`;
const localeMap: Record<Language, string> = {
  en: 'en_US',
  ko: 'ko_KR',
  ja: 'ja_JP',
  de: 'de_DE',
};

function postUrl(lang: Language, slug: string): string {
  // trailingSlash: true in next.config.js — keep the trailing slash so URLs match the emitted static pages.
  return `${SITE_URL}/${lang}/blog/${slug}/`;
}

function resolveOgImage(post: BlogPost): string {
  if (!post.image) return DEFAULT_OG_IMAGE;
  return post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
}

export function getPostSlugs(lang: Language): string[] {
  const langDir = path.join(contentDir, lang);
  if (!fs.existsSync(langDir)) return [];
  return fs.readdirSync(langDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

export function getPostBySlug(lang: Language, slug: string): BlogPost | null {
  const filePath = path.join(contentDir, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const htmlContent = marked(content) as string;

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    author: data.author || 'Touchizen',
    content,
    htmlContent,
    noindex: data.noindex === true,
    image: data.image || undefined,
  };
}

/** Languages that actually have a published post for this slug (drives per-post hreflang). */
export function getPostLanguages(slug: string): Language[] {
  return languages
    .map((l) => l.code)
    .filter((code) => fs.existsSync(path.join(contentDir, code, `${slug}.md`)));
}

/** Per-post SEO metadata: real title/description/canonical/OG/Twitter/hreflang instead of inheriting the language home. */
export function buildPostMetadata(lang: Language, slug: string): Metadata {
  const post = getPostBySlug(lang, slug);
  if (!post) return {};

  const url = postUrl(lang, slug);
  const ogImage = resolveOgImage(post);

  const availableLangs = getPostLanguages(slug);
  const languageAlternates: Record<string, string> = Object.fromEntries(
    availableLangs.map((code) => [code, postUrl(code, slug)])
  );
  if (availableLangs.includes('en')) {
    languageAlternates['x-default'] = postUrl('en', slug);
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: languageAlternates,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'Touchizen',
      type: 'article',
      locale: localeMap[lang],
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@touchizen',
      creator: '@touchizen',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    robots: post.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/** BlogPosting JSON-LD structured data. Pure (no fs) — safe to build in the server page and pass to the client. */
export function buildPostJsonLd(lang: Language, slug: string, post: BlogPost) {
  const url = postUrl(lang, slug);
  const ogImage = resolveOgImage(post);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Touchizen',
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.join(', '),
  };
}

export function getAllPosts(lang: Language): BlogPost[] {
  const slugs = getPostSlugs(lang);
  return slugs
    .map(slug => getPostBySlug(lang, slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
