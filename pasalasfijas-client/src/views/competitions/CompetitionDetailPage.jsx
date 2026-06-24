'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

import { getCompetitionBySlug } from '@/data/competitions/catalog'
import { WORLD_CUP_SLUG } from '@/data/competitions/worldCupHub'
import CompetitionDetailView from '@/views/competitions/CompetitionDetailView'
import WorldCupHubPage from '@/views/competitions/world-cup-2026/WorldCupHubPage'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { getCompetitionMatches } from '@/services/competitionsService'

const CompetitionDetailPage = ({ slug }) => {
  const competition = getCompetitionBySlug(slug)
  const [matches, setMatches] = useState(null)

  useEffect(() => {
    if (!competition || competition.slug === WORLD_CUP_SLUG) return

    let active = true

    getCompetitionMatches(slug)
      .then(result => {
        if (active) setMatches(result.items)
      })
      .catch(() => {
        if (active) setMatches([])
      })

    return () => {
      active = false
    }
  }, [competition, slug])

  if (!competition) notFound()

  if (competition.slug === WORLD_CUP_SLUG) {
    return <WorldCupHubPage competition={competition} />
  }

  if (!matches) return <DashboardPageLoading />

  return <CompetitionDetailView competition={competition} matches={matches} />
}

export default CompetitionDetailPage
