'use client'

import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { createRouteLazyMount } from '@/components/loading/createRouteLazyMount'

export default createRouteLazyMount({
  routeKey: '/admin',
  loadView: () => import('@/views/admin/AdminPageView'),
  Loading: DashboardPageLoading
})
