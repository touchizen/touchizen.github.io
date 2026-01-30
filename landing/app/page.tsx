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

  // Loading spinner while detecting language and redirecting
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
