import { DRAMA } from '@/lib/blog-categories';
import { listMetadata, renderListPage } from '@/app/(main)/[lang]/blog/listRoute';

export function generateMetadata() {
  return listMetadata('es', DRAMA);
}

export default function SpanishDramaBlogPage() {
  return renderListPage('es', DRAMA);
}
