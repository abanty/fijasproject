import { Competition, Match, Team } from '@prisma/client'

export const MATCH_REPOSITORY = 'MATCH_REPOSITORY'

export type MatchAnalysisPreview = {
  confidence: string
  riskScore: number | null
  rawOutputJson: unknown
}

export type MatchWithRelations = Match & {
  homeTeam: Team
  awayTeam: Team
  competition: Competition
  analyses: MatchAnalysisPreview[]
}

export interface MatchRepository {
  findToday(referenceDate: Date): Promise<MatchWithRelations[]>
  findByCompetitionExternalId(competitionExternalId: string): Promise<MatchWithRelations[]>
  findById(matchId: number): Promise<Match | null>
}
