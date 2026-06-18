import { mockBankroll } from '@/data/mock/predictions'
import { apiClient } from '@/lib/apiClient'

const shouldUseMock = () => process.env.NEXT_PUBLIC_USE_MOCKS !== 'false'

export const getBankrollSummary = async () => {
  if (shouldUseMock()) return mockBankroll

  return apiClient('/bankroll')
}
