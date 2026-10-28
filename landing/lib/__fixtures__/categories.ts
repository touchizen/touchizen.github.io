import type { BlogCategory } from '../blog-categories';

/** IT posts sent to other addresses — checks that addresses come from the category, not from IT. */
export const FAKE: BlogCategory = {
  id: 'drama',
  contentDir: 'blog',
  postBase: 'x/y',
  listBase: 'x/list',
  sitemapFile: 'sitemap-x.xml',
  nameKey: 'blog_cat_tech',
  subtitleKey: 'blog_subtitle',
};
