'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

interface ProductsProps {
  lang: Language;
}

export default function Products({ lang }: ProductsProps) {
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <section id="products" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('products_title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('products_subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-6 max-w-md w-full">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`animate-fade-in stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <ProductCard product={product} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
