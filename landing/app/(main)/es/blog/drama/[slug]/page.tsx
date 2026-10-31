import { DRAMA } from '@/lib/blog-categories';
import { postMetadata, postSlugParams, renderPostPage } from '@/app/(main)/[lang]/blog/postRoute';

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props) {
  return postMetadata({ lang: 'es', slug: params.slug }, DRAMA);
}

export function generateStaticParams() {
  return postSlugParams('es', DRAMA);
}

export default function SpanishDramaPostPage({ params }: Props) {
  return renderPostPage({ lang: 'es', slug: params.slug }, DRAMA);
}
