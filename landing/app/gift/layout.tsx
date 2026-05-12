import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Gift · Touchizen',
  description: 'Free gift for AutoFlowCut tutorial viewers.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function GiftLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a14]">{children}</body>
    </html>
  );
}
