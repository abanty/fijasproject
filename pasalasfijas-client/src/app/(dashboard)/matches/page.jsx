import MatchesView from '@/views/matches'
import { getTodayPredictions } from '@/services/predictionsService'

export default async function MatchesPage() {
  const data = await getTodayPredictions()

  return <MatchesView matches={data.items} />
}
