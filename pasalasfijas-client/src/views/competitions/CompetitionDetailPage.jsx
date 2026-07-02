'use client'

import { notFound } from 'next/navigation'

import { getCompetitionBySlug } from '@/data/competitions/catalog'
import { WORLD_CUP_SLUG } from '@/data/competitions/worldCupHub'
import CompetitionDetailView from '@/views/competitions/CompetitionDetailView'
import WorldCupHubPage from '@/views/competitions/world-cup-2026/WorldCupHubPage'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { useCachedQuery } from '@/hooks/useCachedQuery'
import { queryKeys } from '@/lib/query/queryKeys'
import { getCompetitionMatches } from '@/services/competitionsService'

const StandardCompetitionDetail = ({ competition, slug }) => {
  const { data: matches, isLoading } = useCachedQuery(
    queryKeys.competitions.matches(slug),
    () => getCompetitionMatches(slug).then(result => result.items),
    { onError: () => [] }
  )

  if (isLoading) return <DashboardPageLoading />

  return <CompetitionDetailView competition={competition} matches={matches} />
}

const CompetitionDetailPage = ({ slug }) => {
  const competition = getCompetitionBySlug(slug)

  if (!competition) notFound()

  if (competition.slug === WORLD_CUP_SLUG) {
    return <WorldCupHubPage competition={competition} />
  }

  return <StandardCompetitionDetail competition={competition} slug={slug} />
}

export default CompetitionDetailPage
