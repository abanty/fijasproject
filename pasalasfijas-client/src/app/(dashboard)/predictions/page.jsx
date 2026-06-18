import PredictionsView from '@/views/predictions'
import { getTodayPredictions } from '@/services/predictionsService'

export default async function PredictionsPage() {
  const data = await getTodayPredictions()

  return <PredictionsView data={data} />
}
