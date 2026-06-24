import { ConfidenceLevel, PickMarket, PickResultStatus, PickType } from '@prisma/client'

export class PickEntity {
  id!: number
  analysisId!: number
  matchId!: number
  market!: PickMarket
  selection!: string
  pickType!: PickType
  confidence!: ConfidenceLevel
  riskScore?: number | null
  valueScore?: number | null
  suggestedStakePercent?: number | null
  resultStatus!: PickResultStatus
}
