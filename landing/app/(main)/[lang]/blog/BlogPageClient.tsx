'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function BlogPageClient({ lang, posts }: { lang: Language; posts: BlogPost[] }) {
  const router = useRouter();
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={(newLang) => router.push(`/${newLang}/blog`)} />

      <div className="pt-24 pb-16">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 gradient-text">{t('blog_title' as TranslationKey)}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-12">{t('blog_subtitle' as TranslationKey)}</p>

            {posts.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <a href={`/${lang}/blog/${post.slug}/`} className="block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{post.excerpt}</p>
                      <time className="text-sm text-gray-400 dark:text-gray-500">{post.date}</time>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
