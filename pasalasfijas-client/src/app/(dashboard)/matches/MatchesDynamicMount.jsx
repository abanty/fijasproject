'use client'

import dynamic from 'next/dynamic'

import { DashboardPageLoading } from '@/components/loading/PageLoading'

const CompetitionsPage = dynamic(() => import('@/views/competitions/CompetitionsPage'), {
  ssr: false,
  loading: () => <DashboardPageLoading />
})

export default function MatchesDynamicMount() {
  return <CompetitionsPage />
}
