'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TECH, categoryListPath, categoryPostPath, type BlogCategory } from '@/lib/blog-categories';
import type { CardPost } from '@/lib/blog';

// Same image a post shares as when it sets none (lib/blog.ts DEFAULT_OG_IMAGE) — a square logo.
export const FALLBACK_THUMBNAIL = '/images/touchizen.png';

/** One post in a list: thumbnail, tags, title, excerpt, date — linked to the post. */
export function PostCard({ lang, category, post }: { lang: Language; category: BlogCategory; post: CardPost }) {
  return (
    <article className="group">
      <a href={categoryPostPath(category, lang, post.slug)} className="flex items-start gap-4 sm:gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg">
        {/* Decorative: the title beside it already names the post. The logo fallback is square, so it's contained, not cropped. */}
        <img
          src={post.image ?? FALLBACK_THUMBNAIL}
          alt=""
          loading="lazy"
          decoding="async"
          className={`shrink-0 w-24 sm:w-48 aspect-video rounded-lg border border-gray-200 dark:border-gray-800 ${
            post.image ? 'object-cover' : 'object-contain p-2 bg-gray-50 dark:bg-gray-900'
          }`}
        />
        <div className="min-w-0 flex-1">
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
        </div>
      </a>
    </article>
  );
}

export default function BlogPageClient({ lang, posts, category = TECH }: { lang: Language; posts: CardPost[]; category?: BlogCategory }) {
  const router = useRouter();
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={(newLang) => router.push(categoryListPath(category, newLang))} />

      <div className="pt-24 pb-16">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 gradient-text">{t(category.nameKey)}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-12">{t('blog_subtitle' as TranslationKey)}</p>

            {posts.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} lang={lang} category={category} post={post} />
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
