import { mockTodayPredictions, mockPredictionHistory } from '@/data/mock/predictions'
import { apiClient } from '@/lib/apiClient'

const shouldUseMock = () => process.env.NEXT_PUBLIC_USE_MOCKS !== 'false'

export const getTodayPredictions = async () => {
  if (shouldUseMock()) return mockTodayPredictions

  return apiClient('/predictions/today')
}

export const getPredictionHistory = async () => {
  if (shouldUseMock()) return mockPredictionHistory

  return apiClient('/predictions/history')
}
