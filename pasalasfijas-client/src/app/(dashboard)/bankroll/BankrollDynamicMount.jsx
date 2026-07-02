'use client'

import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { createRouteLazyMount } from '@/components/loading/createRouteLazyMount'
import { queryKeys } from '@/lib/query/queryKeys'

export default createRouteLazyMount({
  routeKey: '/bankroll',
  cacheKey: queryKeys.bankroll.summary,
  loadView: () => import('@/views/bankroll/BankrollPageView'),
  Loading: DashboardPageLoading
})
