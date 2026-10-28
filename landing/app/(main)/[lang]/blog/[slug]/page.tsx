import type { Language } from '@/lib/i18n';
import { TECH } from '@/lib/blog-categories';
import { postMetadata, postStaticParams, renderPostPage } from '../postRoute';

type Props = { params: { lang: Language; slug: string } };

export function generateMetadata({ params }: Props) {
  return postMetadata(params, TECH);
}

export function generateStaticParams() {
  return postStaticParams(TECH);
}

export default function BlogPostPage({ params }: Props) {
  return renderPostPage(params, TECH);
}
