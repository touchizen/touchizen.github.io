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

  const languages = [
    { code: 'en', name: 'English', href: '/en/' },
    { code: 'ko', name: '한국어', href: '/ko/' },
    { code: 'ja', name: '日本語', href: '/ja/' },
    { code: 'de', name: 'Deutsch', href: '/de/' },
  ] as const;

  // SEO: Crawlers don't execute JS, so they see this full content.
  // Real users get auto-redirected to their detected language via useEffect above.
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/en/" />
      </noscript>
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
          Touchizen
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
          Creator tools for Google Whisk, CapCut, and AI content workflows
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          Start with Whisk2CapCut to turn Google Whisk image batches into editable CapCut projects
          with subtitles, timing, and motion already in place.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/en/whisk2capcut/"
            className="rounded-xl bg-violet-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-violet-500"
          >
            Explore Whisk2CapCut
          </a>
          <a
            href="/en/"
            className="rounded-xl border border-violet-200 bg-white px-6 py-3 text-base font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:bg-gray-900 dark:text-violet-300"
          >
            View English Homepage
          </a>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {languages.map((language) => (
            <a
              key={language.code}
              href={language.href}
              className="rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 transition hover:border-violet-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400">Language</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {language.name}
              </div>
            </a>
          ))}
        </div>
        <div className="mt-14 grid gap-4 text-sm text-gray-600 dark:text-gray-300 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 dark:border-gray-800 dark:bg-gray-900/70">
            Batch-generate 100+ Google Whisk images with a consistent visual style.
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 dark:border-gray-800 dark:bg-gray-900/70">
            Export a ready-to-edit CapCut project instead of downloading images one by one.
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 dark:border-gray-800 dark:bg-gray-900/70">
            Use localized homepages for English, Korean, Japanese, and German visitors.
          </div>
        </div>
      </section>
    </main>
  );
}
