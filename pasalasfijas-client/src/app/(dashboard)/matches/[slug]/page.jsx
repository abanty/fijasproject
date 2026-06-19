import { notFound } from 'next/navigation'

import { getCompetitionBySlug } from '@/data/competitions/catalog'
import CompetitionDetailView from '@/views/competitions/CompetitionDetailView'
import { getCompetitionMatches } from '@/services/competitionsService'

export default async function CompetitionPage({ params }) {
  const { slug } = await params
  const competition = getCompetitionBySlug(slug)

  if (!competition) notFound()

  const matches = await getCompetitionMatches(slug)

  return <CompetitionDetailView competition={competition} matches={matches} />
}
