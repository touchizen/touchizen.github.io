import { sitemapIndexXml } from '@/lib/blog-sitemap';

// Emitted as out/sitemap.xml by the static export — the index robots.txt points to.
export const dynamic = 'force-static';

export function GET() {
  return new Response(sitemapIndexXml(), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
