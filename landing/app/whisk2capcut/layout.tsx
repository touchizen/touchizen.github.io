import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whisk2CapCut - Convert Google Whisk Images to CapCut Projects Instantly',
  description:
    'Save hours of manual work. Generate 100+ AI images with Google Whisk and convert them to CapCut video projects in seconds. Free Chrome extension for content creators.',
  keywords: [
    'Whisk2CapCut',
    'Google Whisk',
    'CapCut',
    'AI image generation',
    'bulk image creation',
    'video editing automation',
    'Chrome extension',
    'content creation',
    'CapCut project export',
    'image to video',
    'AI video tools',
  ],
  authors: [{ name: 'Touchizen' }],
  alternates: {
    canonical: 'https://touchizen.com/whisk2capcut/',
    languages: {
      en: 'https://touchizen.com/whisk2capcut/',
      ko: 'https://touchizen.com/whisk2capcut/',
    },
  },
  openGraph: {
    title: 'Whisk2CapCut - Save Your Time with AI Image to Video Conversion',
    description:
      'Generate 100+ AI images in minutes with Google Whisk, then convert to CapCut projects in one click. Free Chrome extension.',
    url: 'https://touchizen.com/whisk2capcut/',
    siteName: 'Touchizen',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@touchizen',
    creator: '@touchizen',
    title: 'Whisk2CapCut - AI Images to CapCut in Seconds',
    description:
      'Generate 100+ AI images with Google Whisk and convert to CapCut projects instantly. Save hours of work.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Whisk2CapCutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
