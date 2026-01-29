'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  lang: Language;
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <div className="card-hover bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
      {/* Icon with gradient background */}
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-2xl mb-4`}
      >
        {product.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
        {t(product.nameKey as TranslationKey)}
      </h3>

      {/* Slogan */}
      {product.sloganKey && (
        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
          {t(product.sloganKey as TranslationKey)}
        </p>
      )}

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
        {t(product.descKey as TranslationKey)}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-6">
        {product.features.map((featureKey) => (
          <span
            key={featureKey}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            {t(featureKey as TranslationKey)}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href={product.link}
        target={product.isExternal ? '_blank' : undefined}
        rel={product.isExternal ? 'noopener noreferrer' : undefined}
        className={`inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${product.gradient} text-white hover:shadow-lg hover:opacity-90 active:scale-95`}
      >
        {t(product.ctaKey as TranslationKey)}
        {product.isExternal && (
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    </div>
  );
}
