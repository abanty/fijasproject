import { apiClient } from '@/lib/apiClient'
import { mockBankroll } from '@/data/mock/predictions'

const shouldUseMock = () => process.env.NEXT_PUBLIC_USE_MOCKS !== 'false'

export const getBankrollSummary = async () => {
  if (shouldUseMock()) return mockBankroll

  return apiClient('/bankroll')
}

export const createBankroll = input =>
  apiClient('/bankroll', {
    method: 'POST',
    body: JSON.stringify(input)
  })
