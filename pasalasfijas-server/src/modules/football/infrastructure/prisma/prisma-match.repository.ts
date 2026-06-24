import { Injectable } from '@nestjs/common'
import { Match } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { MatchRepository, MatchWithRelations } from '../../domain/repositories/match.repository'

@Injectable()
export class PrismaMatchRepository implements MatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  findToday(referenceDate: Date): Promise<MatchWithRelations[]> {
    const start = new Date(referenceDate)
    start.setHours(0, 0, 0, 0)
    const end = new Date(referenceDate)
    end.setHours(23, 59, 59, 999)

    return this.prisma.match.findMany({
      where: { kickoffAt: { gte: start, lte: end } },
      include: this.matchInclude,
      orderBy: { kickoffAt: 'asc' },
    }) as Promise<MatchWithRelations[]>
  }

  findByCompetitionExternalId(competitionExternalId: string): Promise<MatchWithRelations[]> {
    return this.prisma.match.findMany({
      where: { competition: { externalId: competitionExternalId } },
      include: this.matchInclude,
      orderBy: { kickoffAt: 'asc' },
    }) as Promise<MatchWithRelations[]>
  }

  private readonly matchInclude = {
    homeTeam: true,
    awayTeam: true,
    competition: true,
    analyses: {
      where: { status: 'COMPLETED' },
      orderBy: { createdAt: 'desc' },
      take: 1,
      select: { confidence: true, riskScore: true, rawOutputJson: true },
    },
  } as const

  findById(matchId: number): Promise<Match | null> {
    return this.prisma.match.findUnique({ where: { id: matchId } })
  }
}
