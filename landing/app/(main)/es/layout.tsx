import type { Metadata } from 'next';
import SiteDocument, { SITE_ROBOTS } from '@/components/SiteDocument';
import '../../globals.css';

// Root layout of the Spanish pages. Spanish is a drama-blog language only (lib/blog-categories.ts DRAMA), so
// this tree holds just blog/drama/ — putting es in [lang]/layout.tsx would build Spanish copies of every page.
export const metadata: Metadata = {
  metadataBase: new URL('https://touchizen.com'),
  robots: SITE_ROBOTS,
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="es">{children}</SiteDocument>;
}
