import { Language, languages } from '@/lib/i18n';
import { DRAMA } from '@/lib/blog-categories';
import { listMetadata, renderListPage } from '../listRoute';

type Props = { params: { lang: Language } };

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export function generateMetadata({ params }: Props) {
  return listMetadata(params.lang, DRAMA);
}

export default function DramaBlogPage({ params }: Props) {
  return renderListPage(params.lang, DRAMA);
}
