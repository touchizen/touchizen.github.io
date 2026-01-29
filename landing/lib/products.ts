export interface Product {
  id: string;
  nameKey: string;
  descKey: string;
  features: string[];
  ctaKey: string;
  link: string;
  isExternal: boolean;
  gradient: string;
  icon: string;
  hasDetailPage: boolean;
}

export const products: Product[] = [
  {
    id: 'whisk2capcut',
    nameKey: 'whisk2capcut_name',
    descKey: 'whisk2capcut_desc',
    features: ['whisk2capcut_feature1', 'whisk2capcut_feature2', 'whisk2capcut_feature3'],
    ctaKey: 'whisk2capcut_cta',
    link: '/whisk2capcut/',
    isExternal: false,
    gradient: 'from-violet-500 to-purple-600',
    icon: '🎬',
    hasDetailPage: true,
  },
];

export interface Feature {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
}

export const features: Feature[] = [
  {
    id: 'multilingual',
    titleKey: 'feature1_title',
    descKey: 'feature1_desc',
    icon: '🌐',
  },
  {
    id: 'privacy',
    titleKey: 'feature2_title',
    descKey: 'feature2_desc',
    icon: '🔒',
  },
  {
    id: 'opensource',
    titleKey: 'feature3_title',
    descKey: 'feature3_desc',
    icon: '💻',
  },
];

export const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://youtube.com/@touchizen',
    icon: 'youtube',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/touchizen',
    icon: 'github',
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/touchizen',
    icon: 'discord',
  },
  {
    name: 'X',
    url: 'https://x.com/touchizen',
    icon: 'x',
  },
];
