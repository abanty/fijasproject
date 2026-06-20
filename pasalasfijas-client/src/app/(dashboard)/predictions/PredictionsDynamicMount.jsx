'use client'

import dynamic from 'next/dynamic'

import { PredictionsPageLoading } from '@/components/loading/PageLoading'

const PredictionsView = dynamic(() => import('@/views/predictions'), {
  ssr: false,
  loading: () => <PredictionsPageLoading />
})

export default function PredictionsDynamicMount() {
  return <PredictionsView />
}
