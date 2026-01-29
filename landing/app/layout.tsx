import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Touchizen Creator Tools - AI-Powered Tools for Content Creators',
  description:
    'Streamline your creative workflow with AI-powered tools. Whisk2CapCut for bulk image generation, SRT2Short for TikTok automation, and more.',
  keywords: [
    'creator tools',
    'AI tools',
    'CapCut',
    'Whisk',
    'video editing',
    'content creation',
    'TikTok',
    'automation',
  ],
  authors: [{ name: 'Touchizen' }],
  openGraph: {
    title: 'Touchizen Creator Tools',
    description: 'AI-powered tools connecting creativity and video editing',
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
    title: 'Touchizen Creator Tools',
    description: 'AI-powered tools connecting creativity and video editing',
  },
  robots: {
    index: true,
    follow: true,
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
