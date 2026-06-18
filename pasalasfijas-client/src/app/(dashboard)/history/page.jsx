import HistoryView from '@/views/history'
import { getPredictionHistory } from '@/services/predictionsService'

export default async function HistoryPage() {
  const history = await getPredictionHistory()

  return <HistoryView history={history} />
}
