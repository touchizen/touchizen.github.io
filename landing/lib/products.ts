export interface Product {
  id: string;
  nameKey: string;
  sloganKey?: string;
  descKey: string;
  features: string[];
  ctaKey: string;
  link: string;
  isExternal: boolean;
  gradient: string;
  icon: string;
  iconImage?: string;
  hasDetailPage: boolean;
}

export const products: Product[] = [
  // Video Creation Tools
  {
    id: 'autoflowcut',
    nameKey: 'autoflowcut_name',
    sloganKey: 'autoflowcut_slogan',
    descKey: 'autoflowcut_desc',
    features: ['autoflowcut_feature1', 'autoflowcut_feature2', 'autoflowcut_feature3'],
    ctaKey: 'autoflowcut_cta',
    link: '/autoflowcut/',
    isExternal: false,
    gradient: 'from-cyan-500 to-blue-600',
    icon: '🎥',
    iconImage: '/images/autoflowcut.svg',
    hasDetailPage: true,
  },
  // whisk2capcut removed from main page — service ended (the standalone
  // /whisk2capcut/ subpage and its components are kept for reference and
  // can be cleaned up separately if no longer needed)
  // Smart Life Apps
  {
    id: 'calorie-shot',
    nameKey: 'calorieshot_name',
    sloganKey: 'calorieshot_slogan',
    descKey: 'calorieshot_desc',
    features: ['calorieshot_feature1', 'calorieshot_feature2', 'calorieshot_feature3'],
    ctaKey: 'calorieshot_cta',
    link: '/calorie-shot/',
    isExternal: false,
    gradient: 'from-blue-500 to-green-500',
    icon: '📸',
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
    id: 'save-time',
    titleKey: 'feature1_title',
    descKey: 'feature1_desc',
    icon: '⏱️',
  },
  {
    id: 'bulk-images',
    titleKey: 'feature2_title',
    descKey: 'feature2_desc',
    icon: '🖼️',
  },
  {
    id: 'capcut-export',
    titleKey: 'feature3_title',
    descKey: 'feature3_desc',
    icon: '🎬',
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
    url: 'https://discord.gg/DTMMs8TZDN',
    icon: 'discord',
  },
  {
    name: 'X',
    url: 'https://x.com/touchizen',
    icon: 'x',
  },
];

// Language-specific YouTube channel URLs
// ko: Korean channel (@터치즌)
// default (en/ja/de): English channel (@touchizen)
export function getSocialLinks(lang: string) {
  const youtubeUrl =
    lang === 'ko'
      ? 'https://youtube.com/@터치즌'
      : 'https://youtube.com/@touchizen';
  return socialLinks.map((link) =>
    link.name === 'YouTube' ? { ...link, url: youtubeUrl } : link
  );
}
