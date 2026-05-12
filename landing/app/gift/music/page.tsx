import GiftPage from '@/components/GiftPage';
import { GIFTS } from '@/lib/gifts';

export const metadata = {
  title: 'Free BGM Pack · 88 tracks · Touchizen',
  description: '88 background music tracks (CC0 / Public Domain).',
};

export default function Page() {
  return <GiftPage gift={GIFTS.music} />;
}
