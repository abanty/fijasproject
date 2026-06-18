import DashboardView from '@/views/dashboard'
import { getTodayPredictions } from '@/services/predictionsService'

export default async function DashboardPage() {
  const data = await getTodayPredictions()

  return <DashboardView data={data} />
}
