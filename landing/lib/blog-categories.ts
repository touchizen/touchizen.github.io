import type { Language, TranslationKey } from './i18n';

// The header and footer import this, so it must stay free of node modules (fs, path).

export type BlogCategoryId = 'tech' | 'drama' | 'economy';

export interface BlogCategory {
  id: BlogCategoryId;
  /** Folder under landing/content/ holding `{lang}/{slug}.md`. */
  contentDir: string;
  /** URL segments before a post's slug. */
  postBase: string;
  /** URL segments of the category's post list. */
  listBase: string;
  /** Generated sitemap of the category's posts, served at the site root. */
  sitemapFile: string;
  nameKey: TranslationKey;
  /** Line under the list heading. */
  subtitleKey: TranslationKey;
  /** YouTube channel the category's videos come from — its posts end with a subscribe link. */
  youtubeChannel?: string;
}

/** IT posts keep their original addresses (/{lang}/blog/{slug}/) and sitemap; only the list is new. */
export const TECH: BlogCategory = {
  id: 'tech',
  contentDir: 'blog',
  postBase: 'blog',
  listBase: 'blog/tech',
  sitemapFile: 'sitemap-blog.xml',
  nameKey: 'blog_cat_tech',
  subtitleKey: 'blog_subtitle',
};

/** Drama analysis posts — each the written side of a Gordon Insight video (front matter `youtube`). */
export const DRAMA: BlogCategory = {
  id: 'drama',
  contentDir: 'drama',
  postBase: 'blog/drama',
  listBase: 'blog/drama',
  sitemapFile: 'sitemap-drama.xml',
  nameKey: 'blog_cat_drama',
  subtitleKey: 'blog_drama_subtitle',
  youtubeChannel: 'UCF79bfcre5z5WZmN8ncsA2Q',
};

/**
 * Only categories with posts in every language. A category opens together with its first post —
 * a static export can't build an empty one without placeholder pages (lib/blog-categories.test.ts).
 */
export const BLOG_CATEGORIES: readonly BlogCategory[] = [TECH, DRAMA];

// trailingSlash: true in next.config.js — same shape as the emitted pages.
export function categoryListPath(category: BlogCategory, lang: Language): string {
  return `/${lang}/${category.listBase}/`;
}

export function categoryPostPath(category: BlogCategory, lang: Language, slug: string): string {
  return `/${lang}/${category.postBase}/${slug}/`;
}
