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
  author: string;
  htmlContent: string;
}

export default function BlogPostClient({ lang, post }: { lang: Language; post: BlogPost }) {
  const router = useRouter();
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={(newLang) => router.push(`/${newLang}/blog/${post.slug}`)} />

      <article className="pt-24 pb-16">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
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
        </div>
      </article>

      <Footer lang={lang} />
    </main>
  );
}
