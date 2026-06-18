import { Match } from '@prisma/client'

export const MATCH_REPOSITORY = 'MATCH_REPOSITORY'

export interface MatchRepository {
  findToday(referenceDate: Date): Promise<Match[]>
  findById(matchId: string): Promise<Match | null>
}
