import { AiAnalysis, ComboBet, ComboBetLeg, Competition, Match, OddsSnapshot, Pick, Team } from '@prisma/client'

export const PREDICTION_REPOSITORY = 'PREDICTION_REPOSITORY'

export type ComboBetWithLegs = ComboBet & {
  legs: (ComboBetLeg & { pick: Pick })[]
}

export type MatchWithRelations = Match & {
  homeTeam: Team
  awayTeam: Team
  competition: Competition
  odds: OddsSnapshot[]
}

export type PredictionBundle = AiAnalysis & {
  picks: Pick[]
  comboBets: ComboBetWithLegs[]
  match: MatchWithRelations
}

export interface PredictionRepository {
  findTodayPublished(referenceDate: Date): Promise<PredictionBundle[]>
  findByMatchId(matchId: number): Promise<PredictionBundle | null>
  findHistoryMainPicks(limit?: number): Promise<HistoryPickRecord[]>
}

export type HistoryPickRecord = {
  id: number
  market: string
  selection: string
  confidence: string
  suggestedStakePercent: number | null
  odd: { toNumber(): number } | number | null
  resultStatus: string
  match: {
    homeTeam: { name: string }
    awayTeam: { name: string }
  }
}
