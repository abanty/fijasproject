'use client'

import dynamic from 'next/dynamic'

import { DashboardPageLoading } from '@/components/loading/PageLoading'

const HistoryPageView = dynamic(() => import('@/views/history/HistoryPageView'), {
  ssr: false,
  loading: () => <DashboardPageLoading />
})

export default function HistoryDynamicMount() {
  return <HistoryPageView />
}
