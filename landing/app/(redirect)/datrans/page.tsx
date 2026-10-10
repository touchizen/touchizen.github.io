'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { detectLanguage } from '@/lib/i18n';

export default function DatransRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const lang = detectLanguage();
    router.replace(`/${lang}/datrans`);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/en/datrans" />
      </noscript>
      <div className="text-center text-gray-500">
        Redirecting to your language...
      </div>
    </main>
  );
}
