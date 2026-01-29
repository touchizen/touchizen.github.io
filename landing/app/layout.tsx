import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Touchizen Creator Tools - Save Your Time with AI-Powered Tools',
  description:
    'Save hours of work with AI-powered creator tools. Generate 100+ images in minutes and instantly convert to CapCut projects. Turn repetitive tasks into automated efficiency.',
  keywords: [
    'creator tools',
    'AI image generation',
    'CapCut automation',
    'Google Whisk',
    'bulk image creation',
    'video editing automation',
    'content creation',
    'time saving tools',
    'AI video tools',
    'CapCut project export',
  ],
  authors: [{ name: 'Touchizen' }],
  metadataBase: new URL('https://touchizen.com'),
  alternates: {
    canonical: 'https://touchizen.com',
    languages: {
      'en': 'https://touchizen.com',
      'ko': 'https://touchizen.com',
    },
  },
  openGraph: {
    title: 'Touchizen Creator Tools - Save Your Time',
    description: 'Generate 100+ AI images in minutes, convert to CapCut in seconds. Save hours of repetitive work.',
    url: 'https://touchizen.com',
    siteName: 'Touchizen',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@touchizen',
    creator: '@touchizen',
    title: 'Touchizen Creator Tools - Save Your Time',
    description: 'Generate 100+ AI images in minutes, convert to CapCut in seconds. Save hours of repetitive work.',
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
  verification: {
    google: 'abab50d830b4ddf2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
