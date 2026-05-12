import GiftPage from '@/components/GiftPage';
import { GIFTS } from '@/lib/gifts';

export const metadata = {
  title: 'Free Faceless YouTube Guide · 111-page PDF · Touchizen',
  description: 'Complete playbook to launch a faceless YouTube channel in 30 days.',
};

export default function Page() {
  return <GiftPage gift={GIFTS.help} />;
}
