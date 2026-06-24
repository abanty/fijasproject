import { Inject, Injectable } from '@nestjs/common'
import { MatchStatus, Prisma } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import {
  type SportsDataFixture,
  type SportsDataProviderId,
} from '../../domain/ports/sports-data.provider.port'
import { SportsDataProviderRegistry } from '../../infrastructure/providers/sports-data-provider.registry'

@Injectable()
export class SyncCompetitionMatchesUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sportsDataProviderRegistry: SportsDataProviderRegistry,
  ) {}

  private async upsertTeam(team: SportsDataFixture['homeTeam']) {
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

  async execute(input: { leagueId: number; season: number; provider?: SportsDataProviderId }) {
    const providerId = input.provider ?? 'api-football'
    const sportsDataProvider = this.sportsDataProviderRegistry.get(providerId)
    const status = sportsDataProvider.getStatus()
    if (!status.configured) {
      return {
        ok: false,
        provider: status.provider,
        message: status.message,
        synced: 0,
        created: 0,
        updated: 0,
      }
    }

    let fixtures: SportsDataFixture[]

    try {
      fixtures = await sportsDataProvider.fetchFixturesByLeague(input.leagueId, input.season)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo consultar el proveedor deportivo'
      return {
        ok: false,
        provider: status.provider,
        message,
        synced: 0,
        created: 0,
        updated: 0,
      }
    }

    if (fixtures.length === 0) {
      return {
        ok: false,
        provider: status.provider,
        message: `La API no devolvio partidos para provider=${providerId}, league=${input.leagueId}, season=${input.season}.`,
        synced: 0,
        created: 0,
        updated: 0,
      }
    }

    let created = 0
    let updated = 0

    for (const fixture of fixtures) {
      const competition = await this.prisma.competition.upsert({
        where: { externalId: fixture.competition.externalId },
        update: {
          name: fixture.competition.name,
          country: fixture.competition.country,
        },
        create: {
          externalId: fixture.competition.externalId,
          name: fixture.competition.name,
          country: fixture.competition.country,
          type: 'international',
        },
      })

      const homeTeam = await this.upsertTeam(fixture.homeTeam)
      const awayTeam = await this.upsertTeam(fixture.awayTeam)

      const existing = await this.prisma.match.findUnique({
        where: { externalId: fixture.externalId },
      })

      const data: Prisma.MatchUncheckedCreateInput = {
        externalId: fixture.externalId,
        competitionId: competition.id,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        kickoffAt: fixture.kickoffAt,
        status: fixture.status as MatchStatus,
        venue: fixture.venue,
        stageLabel: fixture.stageLabel,
        homeScore: fixture.homeScore ?? undefined,
        awayScore: fixture.awayScore ?? undefined,
      }

      if (existing) {
        await this.prisma.match.update({
          where: { id: existing.id },
          data,
        })
        updated += 1
      } else {
        await this.prisma.match.create({ data })
        created += 1
      }
    }

    return {
      ok: true,
      provider: status.provider,
      message: `Sincronizados ${fixtures.length} partidos (${providerId}, league=${input.leagueId}, season=${input.season}).`,
      synced: fixtures.length,
      created,
      updated,
    }
  }

  getProvidersStatus() {
    return this.sportsDataProviderRegistry.getAllStatus()
  }
}
