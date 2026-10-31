'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blogEntryPath } from '@/lib/blog-entry';

const HUBS = [
  { name: 'English', href: '/en/blog/' },
  { name: '한국어', href: '/ko/blog/' },
  { name: '日本語', href: '/ja/blog/' },
  { name: 'Deutsch', href: '/de/blog/' },
  { name: 'Español (drama)', href: '/es/blog/drama/' },
] as const;

/** touchizen.com/blog/ — static hosting has no server redirect, so the reader's language is picked here, like /. */
export default function BlogEntryPage() {
  const router = useRouter();

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('language');
    } catch {}
    router.replace(blogEntryPath(saved, navigator.language));
  }, [router]);

  // Without JavaScript: straight to the English hub, and the language hubs as plain links.
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/en/blog/" />
      </noscript>
      <nav aria-label="Blog languages" className="text-center text-gray-500">
        <p className="mb-4">Touchizen Blog</p>
        <ul className="flex flex-wrap justify-center gap-4">
          {HUBS.map((hub) => (
            <li key={hub.href}>
              <a href={hub.href} className="hover:text-primary-500">{hub.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
