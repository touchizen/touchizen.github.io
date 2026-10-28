'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categoryListPath, type BlogCategory } from '@/lib/blog-categories';
import type { CardPost } from '@/lib/blog';
import { PostCard } from './BlogPageClient';

export interface HubSection {
  category: BlogCategory;
  posts: CardPost[];
  /** The category has more posts than shown — link its full list. */
  more: boolean;
}

/** /{lang}/blog/: each blog category under its own heading, newest first. */
export default function BlogHubClient({ lang, sections }: { lang: Language; sections: HubSection[] }) {
  const router = useRouter();
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={(newLang) => router.push(`/${newLang}/blog/`)} />

      <div className="pt-24 pb-16">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 gradient-text">{t('blog_title')}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-12">{t('blog_hub_subtitle')}</p>

            <div className="space-y-16">
              {sections.map(({ category, posts, more }) => (
                <section key={category.id} aria-labelledby={`blog-${category.id}`}>
                  <h2 id={`blog-${category.id}`} className="text-2xl font-bold mb-6">
                    <a href={categoryListPath(category, lang)} className="hover:text-primary-500 transition-colors">
                      {t(category.nameKey)}
                    </a>
                  </h2>
                  <div className="space-y-8">
                    {posts.map((post) => (
                      <PostCard key={post.slug} lang={lang} category={category} post={post} heading="h3" />
                    ))}
                  </div>
                  {more && (
                    <a href={categoryListPath(category, lang)} className="inline-block mt-6 text-primary-500 hover:text-primary-600 font-medium transition-colors">
                      {t('blog_read_more')} &rarr;
                    </a>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
