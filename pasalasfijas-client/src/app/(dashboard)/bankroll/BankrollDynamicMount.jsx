'use client'

import dynamic from 'next/dynamic'

import { DashboardPageLoading } from '@/components/loading/PageLoading'

const BankrollPageView = dynamic(() => import('@/views/bankroll/BankrollPageView'), {
  ssr: false,
  loading: () => <DashboardPageLoading />
})

export default function BankrollDynamicMount() {
  return <BankrollPageView />
}
