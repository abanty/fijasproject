import { AiAnalysis, ComboBet, Pick } from '@prisma/client'

export const PREDICTION_REPOSITORY = 'PREDICTION_REPOSITORY'

export type PredictionBundle = AiAnalysis & {
  picks: Pick[]
  comboBets: ComboBet[]
}

export interface PredictionRepository {
  findTodayPublished(referenceDate: Date): Promise<PredictionBundle[]>
  findByMatchId(matchId: string): Promise<PredictionBundle | null>
}
