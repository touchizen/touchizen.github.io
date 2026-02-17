'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { detectLanguage } from '@/lib/i18n';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const lang = detectLanguage();
    router.replace(`/${lang}`);
  }, [router]);

  // SEO: noscript fallback + meta refresh for bots that don't execute JS
  // The canonical in root layout.tsx points to /en/ so Google knows this is not the primary page
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/en/" />
      </noscript>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
