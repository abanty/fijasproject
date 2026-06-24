import { Injectable } from '@nestjs/common'
import { MatchStatus, Prisma } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import {
  LIVE_SCORE_PROVIDER_IDS,
  LiveScoreProviderId,
  LiveScoreUpdate,
} from '../../domain/ports/live-score.provider.port'
import { WORLD_CUP_2026_COMPETITION_EXTERNAL_ID } from '../../domain/ports/sports-data.provider.port'
import { buildTeamPairKey } from '../../infrastructure/mappers/team-slug.mapper'
import { LiveScoreProviderRegistry } from '../../infrastructure/providers/live-score-provider.registry'

@Injectable()
export class SyncLiveScoresUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly liveScoreProviderRegistry: LiveScoreProviderRegistry,
  ) {}

  async execute(input: {
    provider?: LiveScoreProviderId
    competitionExternalId?: string
  }) {
    const providerId = input.provider ?? LIVE_SCORE_PROVIDER_IDS[0]
    const competitionExternalId =
      input.competitionExternalId ?? WORLD_CUP_2026_COMPETITION_EXTERNAL_ID
    const liveScoreProvider = this.liveScoreProviderRegistry.get(providerId)
    const status = liveScoreProvider.getStatus()

    if (!status.configured) {
      return {
        ok: false,
        provider: status.provider,
        message: status.message,
        fetched: 0,
        matched: 0,
        updated: 0,
      }
    }

    let updates: LiveScoreUpdate[]

    try {
      updates = await liveScoreProvider.fetchLiveScores()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo consultar el proveedor live'
      return {
        ok: false,
        provider: status.provider,
        message,
        fetched: 0,
        matched: 0,
        updated: 0,
      }
    }

    if (updates.length === 0) {
      return {
        ok: false,
        provider: status.provider,
        message: 'El proveedor live no devolvio partidos.',
        fetched: 0,
        matched: 0,
        updated: 0,
      }
    }

    const matches = await this.prisma.match.findMany({
      where: { competition: { externalId: competitionExternalId } },
      include: { homeTeam: true, awayTeam: true },
    })

    const matchByPair = new Map(
      matches.map(match => [
        buildTeamPairKey(match.homeTeam.name, match.awayTeam.name),
        match,
      ]),
    )

    let matched = 0
    let updated = 0

    for (const update of updates) {
      const pairKey = buildTeamPairKey(update.homeTeamName, update.awayTeamName)
      const target = matchByPair.get(pairKey)
      if (!target) continue

      matched++

      const swapped = target.homeTeam.name !== update.homeTeamName
      const homeScore = swapped ? update.awayScore : update.homeScore
      const awayScore = swapped ? update.homeScore : update.awayScore

      const data: Prisma.MatchUpdateInput = {
        status: update.status as MatchStatus,
        homeScore: homeScore ?? undefined,
        awayScore: awayScore ?? undefined,
      }

      if (update.status === MatchStatus.FINISHED && homeScore != null && awayScore != null) {
        data.winnerTeamId =
          homeScore > awayScore
            ? target.homeTeamId
            : awayScore > homeScore
              ? target.awayTeamId
              : null
      }

      const hasChanges =
        target.status !== update.status ||
        target.homeScore !== homeScore ||
        target.awayScore !== awayScore

      if (!hasChanges) continue

      await this.prisma.match.update({
        where: { id: target.id },
        data,
      })
      updated++
    }

    return {
      ok: true,
      provider: status.provider,
      message: `Live sync: ${updates.length} partidos del proveedor, ${matched} emparejados, ${updated} actualizados (${competitionExternalId}).`,
      fetched: updates.length,
      matched,
      updated,
    }
  }

  getProvidersStatus() {
    return this.liveScoreProviderRegistry.getAllStatus()
  }
}
