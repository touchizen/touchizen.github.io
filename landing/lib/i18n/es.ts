import type { en } from './en';

// Spanish is a drama-blog language only (lib/blog-categories.ts DRAMA), not a site language, so this file
// holds just the words the drama list and post pages show — header, footer and blog. Every other key falls
// back to English (blogTranslations in ./index.ts). It is not one of the four line-parallel files.
export const es = {
  // Header
  brand_name: 'Touchizen',
  brand_slogan: 'Crea más, trabaja menos',
  nav_products: 'Productos',
  nav_features: 'Funciones',

  // Footer
  footer_tagline: 'Herramientas de IA para creadores',
  footer_products: 'Productos',
  footer_legal: 'Legal',
  footer_privacy: 'Política de privacidad',
  footer_terms: 'Términos del servicio',
  nav_affiliate: 'Afiliados',
  footer_affiliate: 'Hazte afiliado (30% de comisión)',
  footer_copyright: '2026 Touchizen. Todos los derechos reservados.',
  autoflowcut_name: 'AutoFlowCut',
  calorieshot_name: 'Calorie Shot',
  mathshorts_name: 'MathShorts',
  datrans_name: 'DaTrans',
  ghstars_name: 'Rastreador de estrellas de GitHub',

  // Blog
  nav_blog: 'Blog',
  blog_title: 'Blog',
  blog_back: 'Volver al blog',
  blog_related: 'Artículos relacionados',
  blog_others: 'Más artículos',
  blog_latest: 'Artículos recientes',
  blog_prev: 'Artículo anterior',
  blog_next: 'Artículo siguiente',
  blog_cat_tech: 'Tecnología e IA',
  blog_cat_drama: 'Dramas',
  blog_drama_subtitle: 'Análisis de dramas y predicciones del próximo episodio: los videos de Gordon Insight, por escrito',
  blog_watch_youtube: 'Ver en YouTube',
  blog_subscribe_channel: 'Suscríbete a Gordon Insight',
} satisfies Partial<Record<keyof typeof en, string>>;
