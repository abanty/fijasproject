import CompetitionsView from '@/views/competitions'
import { getCompetitionMatchCounts, getCompetitions } from '@/services/competitionsService'

export default async function MatchesPage() {
  const competitions = getCompetitions()
  const matchCounts = await getCompetitionMatchCounts()

  return <CompetitionsView competitions={competitions} matchCounts={matchCounts} />
}
