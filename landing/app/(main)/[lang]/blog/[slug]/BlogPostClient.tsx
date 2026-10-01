'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FALLBACK_THUMBNAIL } from '../BlogPageClient';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  htmlContent: string;
}

/** Just what a sidebar entry shows — post bodies stay out of the page payload. */
export interface RelatedPost {
  slug: string;
  title: string;
  date: string;
  image?: string;
}

export default function BlogPostClient({ lang, post, related = [], jsonLd }: { lang: Language; post: BlogPost; related?: RelatedPost[]; jsonLd?: object }) {
  const router = useRouter();
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <main className="min-h-screen">
      {/*
        Inline <style> (not a Tailwind class / globals rule) so the CSS minifier
        can't drop it: the prose-code:* utilities style inline code but also leak
        into <pre><code>, painting a light chip over the dark code block and
        hiding its text. Reset block code to inherit the <pre> background/text.
      */}
      <style dangerouslySetInnerHTML={{ __html: '.prose pre code{background-color:transparent!important;padding:0!important;border-radius:0!important;color:inherit!important;font-weight:inherit!important}' }} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Header lang={lang} onLanguageChange={(newLang) => router.push(`/${newLang}/blog/${post.slug}`)} />

      <article className="pt-24 pb-16">
        <div className="container-custom px-4 lg:flex lg:justify-center lg:gap-12">
          <div className="max-w-3xl mx-auto lg:mx-0 lg:flex-1 min-w-0">
            {/* Back link */}
            <a href={`/${lang}/blog/`} className="inline-flex items-center text-sm text-primary-500 hover:text-primary-600 mb-8 transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {t('blog_back' as TranslationKey)}
            </a>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              <span>{post.author}</span>
              <span>&middot;</span>
              <time>{post.date}</time>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:rounded-xl
                prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
          </div>

          {/* Beside the post on wide screens (follows the scroll), below it on phones. */}
          {related.length > 0 && (
            <aside aria-labelledby="related-heading" className="max-w-3xl mx-auto mt-16 lg:mx-0 lg:mt-0 lg:w-72 lg:shrink-0">
              <div className="lg:sticky lg:top-24">
                <h2 id="related-heading" className="text-lg font-bold mb-4">{t('blog_related' as TranslationKey)}</h2>
                <ul className="space-y-4">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <a href={`/${lang}/blog/${p.slug}/`} className="group flex items-start gap-3">
                        {/* Decorative, as in the blog list: the title beside it names the post. */}
                        <img
                          src={p.image ?? FALLBACK_THUMBNAIL}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className={`shrink-0 w-28 aspect-video rounded-md border border-gray-200 dark:border-gray-800 ${
                            p.image ? 'object-cover' : 'object-contain p-1 bg-gray-50 dark:bg-gray-900'
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug line-clamp-3 group-hover:text-primary-500 transition-colors">{p.title}</p>
                          <time className="text-xs text-gray-400 dark:text-gray-500">{p.date}</time>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
