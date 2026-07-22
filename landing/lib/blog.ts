import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import type { Metadata } from 'next';
import { Language, languages } from './i18n';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  /** Set when a published post is materially revised — drives JSON-LD dateModified. */
  modified?: string;
  excerpt: string;
  tags: string[];
  author: string;
  content: string;
  htmlContent: string;
  noindex: boolean;
  image?: string;
}

const contentDir = path.join(process.cwd(), 'content', 'blog');
const publicDir = path.join(process.cwd(), 'public');

/**
 * Intrinsic size of a local raster image, read from the file header.
 * Used so <img> can carry width/height — without them the browser reserves no space and every
 * image in a post shifts the layout as it loads (CLS), and so OG tags declare the real box.
 *
 * Sniffs the magic bytes rather than trusting the extension: some existing thumbnails are named
 * `.png` but are actually JPEG. Returns null for anything it can't read.
 */
function imageSize(srcPath: string): { width: number; height: number } | null {
  if (!srcPath.startsWith('/')) return null;
  const file = path.join(publicDir, srcPath);
  if (!fs.existsSync(file)) return null;
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }

  // PNG: full 8-byte signature, then an IHDR chunk carrying width/height at bytes 16..24.
  const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.length >= 24 && buf.subarray(0, 8).equals(PNG_SIG) && buf.toString('ascii', 12, 16) === 'IHDR') {
    // IHDR is fixed at 13 bytes; a different length means the header is truncated or not really
    // a PNG, and the numbers that follow would be garbage rather than dimensions.
    if (buf.readUInt32BE(8) !== 13) return null;
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return width > 0 && height > 0 ? { width, height } : null;
  }

  // JPEG: walk the marker segments to the first start-of-frame, which holds the dimensions.
  if (buf.length >= 4 && buf.readUInt16BE(0) === 0xffd8) {
    let i = 2;
    while (i + 1 < buf.length) {
      if (buf[i] !== 0xff) { i += 1; continue; }                 // resync on stray padding
      // 0xFF may be repeated as fill bytes before the marker — skip to the real one.
      let j = i + 1;
      while (j < buf.length && buf[j] === 0xff) j += 1;
      if (j >= buf.length) return null;
      const marker = buf[j];
      // Standalone markers carry no length payload.
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i = j + 1; continue; }
      if (marker === 0xd9 || marker === 0xda) return null;       // end of image / start of scan — no SOF found
      if (j + 2 >= buf.length) return null;
      const len = buf.readUInt16BE(j + 1);
      if (len < 2 || j + 1 + len > buf.length) return null;      // malformed segment
      // SOF0..SOF15, excluding DHT (0xC4), JPG (0xC8), and DAC (0xCC), which share the range.
      const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSof) {
        if (len < 8) return null;                                // SOF payload is too short to hold the size
        return { height: buf.readUInt16BE(j + 4), width: buf.readUInt16BE(j + 6) };
      }
      i = j + 1 + len;
    }
  }
  return null;
}

const attr = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Markdown images get intrinsic width/height so the browser reserves space (without them every
 * image in a post shifts the layout as it loads — CLS). All but the first are lazy-loaded; the
 * first stays eager because it may be the LCP element, and lazy-loading the LCP element delays it.
 *
 * This is a marked renderer rather than a regex over the emitted HTML: a regex can't tell an
 * attribute-quoted `>` from the tag's own, and would also rewrite raw <img> tags an author wrote
 * by hand. Only markdown `![]()` images go through here.
 */
function renderMarkdown(content: string): string {
  let seen = 0;
  const md = new Marked({
    renderer: {
      image({ href, title, text }: { href: string; title?: string | null; text: string }) {
        const size = imageSize(href);
        const dims = size ? ` width="${size.width}" height="${size.height}"` : '';
        const t = title ? ` title="${attr(title)}"` : '';
        const loading = seen++ === 0 ? '' : ' loading="lazy"';
        return `<img src="${attr(href)}" alt="${attr(text)}"${t}${dims}${loading} decoding="async">`;
      },
    },
  });
  return md.parse(content, { async: false }) as string;
}

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
  const htmlContent = renderMarkdown(content);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    modified: data.modified || undefined,
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
      // Real intrinsic size when we can read it — the old hardcoded 1200×630 lied about every
      // post whose image is a different ratio, and crawlers crop to the declared box.
      images: [{ url: ogImage, ...(post.image ? imageSize(post.image) ?? {} : {}), alt: post.title }],
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
    dateModified: post.modified || post.date,
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
