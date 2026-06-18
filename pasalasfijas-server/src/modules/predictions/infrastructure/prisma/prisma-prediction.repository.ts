import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { PredictionBundle, PredictionRepository } from '../../domain/repositories/prediction.repository'

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
      include: { picks: true, comboBets: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  findByMatchId(matchId: string): Promise<PredictionBundle | null> {
    return this.prisma.aiAnalysis.findFirst({
      where: { matchId, status: 'COMPLETED' },
      include: { picks: true, comboBets: true },
      orderBy: { createdAt: 'desc' },
    })
  }
}
