import GiftPage from '@/components/GiftPage';
import { GIFTS } from '@/lib/gifts';

export const metadata = {
  title: 'Free Creator Templates · Hook patterns + checklists · Touchizen',
  description: '5 actionable templates for faceless YouTube creators.',
};

export default function Page() {
  return <GiftPage gift={GIFTS.kit} />;
}
