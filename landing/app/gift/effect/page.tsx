import GiftPage from '@/components/GiftPage';
import { GIFTS } from '@/lib/gifts';

export const metadata = {
  title: 'Free SFX Pack · 222 sounds · Touchizen',
  description: '222 CC0 sound effects, click-ready for video editors.',
};

export default function Page() {
  return <GiftPage gift={GIFTS.effect} />;
}
