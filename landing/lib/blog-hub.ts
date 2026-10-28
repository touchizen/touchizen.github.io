import { getAllPosts, toCardPost } from './blog';
import { BLOG_CATEGORIES, type BlogCategory } from './blog-categories';
import type { Language } from './i18n';
import type { HubSection } from '@/app/(main)/[lang]/blog/BlogHubClient';

const HUB_POSTS_PER_CATEGORY = 3;

/**
 * The hub's sections: each category's newest posts, newest first, and whether it has more.
 * With a single category the hub is that category's whole list — the old /blog/ page, no less.
 */
export function hubSections(lang: Language, categories: readonly BlogCategory[] = BLOG_CATEGORIES): HubSection[] {
  const several = categories.length > 1;
  return categories.map((category) => {
    const posts = getAllPosts(lang, category);
    const shown = several ? posts.slice(0, HUB_POSTS_PER_CATEGORY) : posts;
    return { category, posts: shown.map(toCardPost), more: posts.length > shown.length };
  }).filter((s) => s.posts.length > 0);
}
