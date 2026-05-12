import GiftPage from '@/components/GiftPage';
import { GIFTS } from '@/lib/gifts';

export const metadata = {
  title: 'Free Style Pack · 108 AI prompts · Touchizen',
  description: '108 hand-curated AI image generation style prompts.',
};

export default function Page() {
  return <GiftPage gift={GIFTS.look} />;
}
