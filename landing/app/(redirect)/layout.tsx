import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Touchizen Creator Tools - Save Your Time with AI-Powered Tools',
  description:
    'Save hours of work with AI-powered creator tools. Generate 100+ images in minutes and instantly convert to CapCut projects. Turn repetitive tasks into automated efficiency.',
  metadataBase: new URL('https://touchizen.com'),
  alternates: {
    canonical: 'https://touchizen.com/en/',
  },
  robots: {
    index: false,
    follow: true,
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
