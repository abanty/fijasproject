import PricingView from '@/views/pricing'
import { mockPricingPlans } from '@/data/mock/pricing'

export default function PricingPage() {
  return <PricingView data={mockPricingPlans} />
}
