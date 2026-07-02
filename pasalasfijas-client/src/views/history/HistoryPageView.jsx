'use client'

import HistoryView from '@/views/history'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { useCachedQuery } from '@/hooks/useCachedQuery'
import { queryKeys } from '@/lib/query/queryKeys'
import { getPredictionHistory } from '@/services/predictionsService'

const HistoryPageView = () => {
  const { data, isLoading } = useCachedQuery(queryKeys.predictions.history, getPredictionHistory, {
    onError: () => ({ locked: true, reason: 'PREMIUM_REQUIRED', items: [] })
  })

  if (isLoading) return <DashboardPageLoading />

  return <HistoryView historyData={data} />
}

export default HistoryPageView
