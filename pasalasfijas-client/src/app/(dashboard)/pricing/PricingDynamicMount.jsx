'use client'

import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { createRouteLazyMount } from '@/components/loading/createRouteLazyMount'

export default createRouteLazyMount({
  routeKey: '/pricing',
  loadView: () => import('@/views/pricing/PricingPageView'),
  Loading: DashboardPageLoading
})
