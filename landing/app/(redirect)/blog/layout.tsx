import type { Metadata } from 'next';
import { translations } from '@/lib/i18n';
import { buildListMetadata } from '@/lib/blog';

// /blog/ only redirects (see page.tsx). Search engines get the English hub as the page and every language hub
// as its alternates — the same cluster the hubs themselves declare, x-default included.
const en = translations.en;
export const metadata: Metadata = buildListMetadata('en', (l) => `/${l}/blog/`, `${en.blog_title} | Touchizen`, en.blog_hub_subtitle);

export default function BlogEntryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
