import CompetitionDetailDynamicMount from './CompetitionDetailDynamicMount'
import { getCompetitionBySlug } from '@/data/competitions/catalog'
import { notFound } from 'next/navigation'

export default async function CompetitionPage({ params }) {
  const { slug } = await params

  if (!getCompetitionBySlug(slug)) notFound()

  return <CompetitionDetailDynamicMount slug={slug} />
}
