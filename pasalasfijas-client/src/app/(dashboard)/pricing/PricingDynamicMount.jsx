'use client'

import dynamic from 'next/dynamic'

const PricingPageView = dynamic(() => import('@/views/pricing/PricingPageView'), {
  ssr: false
})

export default function PricingDynamicMount() {
  return <PricingPageView />
}
