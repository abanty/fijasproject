import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { mapMatchItem } from '../../../football/application/mappers/map-match-item'
import type { CreateAdminMatchDto } from '../../presentation/dto/create-admin-match.dto'

@Injectable()
export class CreateAdminMatchUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private async upsertTeam(team: CreateAdminMatchDto['homeTeam']) {
    if (team.externalId) {
      return this.prisma.team.upsert({
        where: { externalId: team.externalId },
        update: { name: team.name, country: team.country },
        create: {
          externalId: team.externalId,
          name: team.name,
          country: team.country,
        },
      })
    }

    const existing = await this.prisma.team.findFirst({ where: { name: team.name } })
    if (existing) {
      return this.prisma.team.update({
        where: { id: existing.id },
        data: { country: team.country },
      })
    }

    return this.prisma.team.create({
      data: { name: team.name, country: team.country },
    })
  }

  private async resolveCompetition(dto: CreateAdminMatchDto) {
    const externalId = dto.competitionExternalId ?? dto.competitionName.toLowerCase().replace(/\s+/g, '-')

    return this.prisma.competition.upsert({
      where: { externalId },
      update: { name: dto.competitionName },
      create: {
        externalId,
        name: dto.competitionName,
        type: 'international',
      },
    })
  }

  async execute(dto: CreateAdminMatchDto) {
    const competition = await this.resolveCompetition(dto)
    const homeTeam = await this.upsertTeam(dto.homeTeam)
    const awayTeam = await this.upsertTeam(dto.awayTeam)

    const match = await this.prisma.match.create({
      data: {
        externalId: dto.externalId,
        competitionId: competition.id,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        kickoffAt: new Date(dto.kickoffAt),
        venue: dto.venue,
        odds: dto.odds
          ? {
              create: [
                { market: '1X2', selection: 'HOME', odd: dto.odds.home, provider: 'admin' },
                { market: '1X2', selection: 'DRAW', odd: dto.odds.draw, provider: 'admin' },
                { market: '1X2', selection: 'AWAY', odd: dto.odds.away, provider: 'admin' },
              ],
            }
          : undefined,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        competition: true,
        analyses: { select: { confidence: true, riskScore: true, rawOutputJson: true }, take: 0 },
      },
    })

    return mapMatchItem(match)
  }
}
