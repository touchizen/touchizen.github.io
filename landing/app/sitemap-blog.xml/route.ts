import { categorySitemapResponse } from '@/lib/blog-sitemap';
import { TECH } from '@/lib/blog-categories';

// Emitted as out/sitemap-blog.xml by the static export (indexed by app/sitemap.xml).
export const dynamic = 'force-static';

export function GET() {
  return categorySitemapResponse(TECH);
}
