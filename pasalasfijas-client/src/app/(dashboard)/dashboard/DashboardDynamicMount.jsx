'use client'

import dynamic from 'next/dynamic'

import { DashboardPageLoading } from '@/components/loading/PageLoading'

const DashboardView = dynamic(() => import('@/views/dashboard'), {
  ssr: false,
  loading: () => <DashboardPageLoading />
})

export default function DashboardDynamicMount() {
  return <DashboardView />
}
