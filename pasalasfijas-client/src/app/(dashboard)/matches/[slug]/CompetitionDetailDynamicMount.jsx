'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { DashboardPageLoading } from '@/components/loading/PageLoading'

const CompetitionDetailPage = dynamic(() => import('@/views/competitions/CompetitionDetailPage'), {
  ssr: false,
  loading: () => <DashboardPageLoading />
})

export default function CompetitionDetailDynamicMount({ slug }) {
  return (
    <Suspense fallback={<DashboardPageLoading />}>
      <CompetitionDetailPage slug={slug} />
    </Suspense>
  )
}
