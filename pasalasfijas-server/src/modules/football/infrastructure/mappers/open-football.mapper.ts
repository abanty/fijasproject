import { MatchStatus } from '@prisma/client'
import {
  SportsDataFixture,
  WORLD_CUP_2026_COMPETITION_EXTERNAL_ID,
} from '../../domain/ports/sports-data.provider.port'
import { slugifyTeamName } from './team-slug.mapper'

export type OpenFootballMatch = {
  round?: string
  date: string
  time: string
  team1: string
  team2: string
  score?: { ft?: [number, number] }
  group?: string
  ground?: string
}

export type OpenFootballResponse = {
  name?: string
  matches: OpenFootballMatch[]
}

export const parseOpenFootballKickoff = (date: string, time: string): Date => {
  const match = time.match(/^(\d{2}):(\d{2})\s+UTC([+-]\d+)$/)
  if (!match) {
    throw new Error(`Formato de hora Open Football invalido: ${time}`)
  }

  const [, hourStr, minuteStr, offsetStr] = match
  const localHours = Number(hourStr)
  const localMinutes = Number(minuteStr)
  const offsetHours = Number(offsetStr)
  const utcHours = localHours - offsetHours
  const [year, month, day] = date.split('-').map(Number)

  return new Date(Date.UTC(year, month - 1, day, utcHours, localMinutes, 0))
}

const resolveCompetitionExternalId = (season: number): string =>
  season === 2026 ? WORLD_CUP_2026_COMPETITION_EXTERNAL_ID : `openfootball-wc-${season}`

const formatStageLabel = (group?: string, round?: string): string | undefined => {
  if (group) {
    const match = group.match(/Group\s+([A-L])/i)

    return match ? `Grupo ${match[1].toUpperCase()}` : group
  }

  return round ?? undefined
}

export const mapOpenFootballResponse = (
  body: OpenFootballResponse,
  season: number,
): SportsDataFixture[] => {
  if (!Array.isArray(body.matches) || body.matches.length === 0) {
    return []
  }

  const competitionName = body.name ?? `World Cup ${season}`
  const competitionExternalId = resolveCompetitionExternalId(season)

  return body.matches.map(match => {
    const homeName = match.team1.trim()
    const awayName = match.team2.trim()
    const homeSlug = slugifyTeamName(homeName)
    const awaySlug = slugifyTeamName(awayName)
    const ft = match.score?.ft

    return {
      externalId: `openfootball-${season}-${homeSlug}-${awaySlug}-${match.date}`,
      kickoffAt: parseOpenFootballKickoff(match.date, match.time),
      status: ft ? MatchStatus.FINISHED : MatchStatus.SCHEDULED,
      venue: match.ground,
      stageLabel: formatStageLabel(match.group, match.round),
      homeScore: ft?.[0] ?? null,
      awayScore: ft?.[1] ?? null,
      homeTeam: {
        externalId: `openfootball-team-${homeSlug}`,
        name: homeName,
      },
      awayTeam: {
        externalId: `openfootball-team-${awaySlug}`,
        name: awayName,
      },
      competition: {
        externalId: competitionExternalId,
        name: competitionName,
        country: 'International',
      },
    }
  })
}
