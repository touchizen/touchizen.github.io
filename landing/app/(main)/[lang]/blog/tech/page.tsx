import { Language, languages } from '@/lib/i18n';
import { TECH } from '@/lib/blog-categories';
import { listMetadata, renderListPage } from '../listRoute';

type Props = { params: { lang: Language } };

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export function generateMetadata({ params }: Props) {
  return listMetadata(params.lang, TECH);
}

export default function TechBlogPage({ params }: Props) {
  return renderListPage(params.lang, TECH);
}
