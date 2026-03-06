import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Touchizen Creator Tools | AI Tools for Google Whisk and CapCut',
  description:
    'Explore Touchizen creator tools for Google Whisk, CapCut, and AI-powered content workflows. Choose your language and start with Whisk2CapCut.',
  metadataBase: new URL('https://touchizen.com'),
  alternates: {
    canonical: 'https://touchizen.com/',
    languages: {
      en: 'https://touchizen.com/en/',
      ko: 'https://touchizen.com/ko/',
      ja: 'https://touchizen.com/ja/',
      de: 'https://touchizen.com/de/',
      'x-default': 'https://touchizen.com/',
    },
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

export default function RedirectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S0JLFKK5G0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S0JLFKK5G0');
            `,
          }}
        />
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
