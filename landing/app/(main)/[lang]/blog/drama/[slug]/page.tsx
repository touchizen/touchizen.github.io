import type { Language } from '@/lib/i18n';
import { DRAMA } from '@/lib/blog-categories';
import { postMetadata, postStaticParams, renderPostPage } from '../../postRoute';

type Props = { params: { lang: Language; slug: string } };

export function generateMetadata({ params }: Props) {
  return postMetadata(params, DRAMA);
}

export function generateStaticParams() {
  return postStaticParams(DRAMA);
}

export default function DramaPostPage({ params }: Props) {
  return renderPostPage(params, DRAMA);
}
