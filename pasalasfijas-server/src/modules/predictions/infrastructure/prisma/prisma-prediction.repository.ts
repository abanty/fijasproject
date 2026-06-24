import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { PredictionBundle, PredictionRepository, HistoryPickRecord } from '../../domain/repositories/prediction.repository'

const predictionInclude = {
  picks: true,
  comboBets: { include: { legs: { include: { pick: true }, orderBy: { order: 'asc' as const } } } },
  match: {
    include: {
      homeTeam: true,
      awayTeam: true,
      competition: true,
      odds: true,
    },
  },
}

@Injectable()
export class PrismaPredictionRepository implements PredictionRepository {
  constructor(private readonly prisma: PrismaService) {}

  findTodayPublished(referenceDate: Date): Promise<PredictionBundle[]> {
    const start = new Date(referenceDate)
    start.setHours(0, 0, 0, 0)
    const end = new Date(referenceDate)
    end.setHours(23, 59, 59, 999)

    return this.prisma.aiAnalysis.findMany({
      where: {
        match: { kickoffAt: { gte: start, lte: end } },
        status: 'COMPLETED',
      },
      include: predictionInclude,
      orderBy: { match: { kickoffAt: 'asc' } },
    }) as Promise<PredictionBundle[]>
  }

  findByMatchId(matchId: number): Promise<PredictionBundle | null> {
    return this.prisma.aiAnalysis.findFirst({
      where: { matchId, status: 'COMPLETED' },
      include: predictionInclude,
      orderBy: { createdAt: 'desc' },
    }) as Promise<PredictionBundle | null>
  }

  findHistoryMainPicks(limit = 50): Promise<HistoryPickRecord[]> {
    return this.prisma.pick.findMany({
      where: {
        pickType: 'MAIN',
        status: 'PUBLISHED',
        resultStatus: { not: 'PENDING' },
      },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: limit,
    }) as Promise<HistoryPickRecord[]>
  }
}
