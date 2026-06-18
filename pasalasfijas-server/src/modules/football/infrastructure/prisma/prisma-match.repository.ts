import { Injectable } from '@nestjs/common'
import { Match } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { MatchRepository } from '../../domain/repositories/match.repository'

@Injectable()
export class PrismaMatchRepository implements MatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  findToday(referenceDate: Date): Promise<Match[]> {
    const start = new Date(referenceDate)
    start.setHours(0, 0, 0, 0)
    const end = new Date(referenceDate)
    end.setHours(23, 59, 59, 999)

    return this.prisma.match.findMany({
      where: { kickoffAt: { gte: start, lte: end } },
      include: { homeTeam: true, awayTeam: true, competition: true },
      orderBy: { kickoffAt: 'asc' },
    }) as unknown as Promise<Match[]>
  }

  findById(matchId: string): Promise<Match | null> {
    return this.prisma.match.findUnique({ where: { id: matchId } })
  }
}
