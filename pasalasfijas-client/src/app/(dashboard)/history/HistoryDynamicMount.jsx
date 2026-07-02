'use client'

import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { createRouteLazyMount } from '@/components/loading/createRouteLazyMount'
import { queryKeys } from '@/lib/query/queryKeys'

export default createRouteLazyMount({
  routeKey: '/history',
  cacheKey: queryKeys.predictions.history,
  loadView: () => import('@/views/history/HistoryPageView'),
  Loading: DashboardPageLoading
})
