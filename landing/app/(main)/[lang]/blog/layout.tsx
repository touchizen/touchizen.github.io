import { languages } from '@/lib/i18n';

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
