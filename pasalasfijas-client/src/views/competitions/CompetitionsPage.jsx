'use client'

import CompetitionsView from '@/views/competitions'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { useCachedQuery } from '@/hooks/useCachedQuery'
import { queryKeys } from '@/lib/query/queryKeys'
import { loadCompetitionsPageData } from '@/services/competitionsService'

const CompetitionsPage = () => {
  const { data, isLoading } = useCachedQuery(queryKeys.competitions.matchCounts, loadCompetitionsPageData)

  if (isLoading) return <DashboardPageLoading />

  return <CompetitionsView competitions={data.competitions} matchCounts={data.matchCounts} />
}

export default CompetitionsPage
