import { Injectable, NotFoundException } from '@nestjs/common'
import { AnalysisStatus, PickType } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import type { PublishMockPredictionDto } from '../../presentation/dto/publish-mock-prediction.dto'

@Injectable()
export class PublishMockPredictionUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(matchId: number, dto: PublishMockPredictionDto) {
    const match = await this.prisma.match.findUnique({ where: { id: matchId } })
    if (!match) throw new NotFoundException('Partido no encontrado')

    const analysis = await this.prisma.aiAnalysis.create({
      data: {
        matchId,
        model: 'mock-v1',
        promptVersion: 'admin-manual',
        status: AnalysisStatus.COMPLETED,
        confidence: dto.confidence,
        riskScore: dto.riskScore,
        summary: dto.summary,
        reasonToBet: dto.reasonToBet,
        reasonToAvoid: dto.reasonToAvoid,
        rawOutputJson: { dataQuality: 'sufficient' },
      },
    })

    const pick = await this.prisma.pick.create({
      data: {
        analysisId: analysis.id,
        matchId,
        market: dto.mainPick.market,
        selection: dto.mainPick.selection,
        pickType: PickType.MAIN,
        confidence: dto.confidence,
        riskScore: dto.riskScore,
        valueScore: dto.mainPick.valueScore,
        suggestedStakePercent: dto.mainPick.stake,
        odd: dto.mainPick.odd,
        rationale: dto.reasonToBet,
      },
    })

    return {
      matchId,
      analysisId: analysis.id,
      pickId: pick.id,
      confidence: analysis.confidence,
      mainPick: {
        market: pick.market,
        selection: pick.selection,
        odd: pick.odd ? Number(pick.odd) : null,
      },
    }
  }
}
