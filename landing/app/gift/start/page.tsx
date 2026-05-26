import GiftPage from '@/components/GiftPage';
import { GIFTS } from '@/lib/gifts';

export const metadata = {
  title: 'Free Economy Shortform Starter · Meta prompts + samples + ebook · Touchizen',
  description: 'Complete beginner starter kit for AI-driven economic shortform creation. 2 meta prompts + sample SRT/MP3 + beginner ebook.',
};

export default function Page() {
  return <GiftPage gift={GIFTS.start} />;
}
