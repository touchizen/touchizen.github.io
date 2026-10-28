import { blogSitemapEntries, blogSitemapXml } from '@/lib/blog-sitemap';

// Emitted as out/sitemap-blog.xml by the static export (indexed by app/sitemap.xml).
export const dynamic = 'force-static';

export function GET() {
  return new Response(blogSitemapXml(blogSitemapEntries()), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
