import { MatchStatus } from '@prisma/client'
import { LiveScoreUpdate } from '../../domain/ports/live-score.provider.port'

export type WorldCup26Game = {
  id: string
  home_team_name_en?: string | null
  away_team_name_en?: string | null
  home_score?: string | null
  away_score?: string | null
  finished?: string | null
  time_elapsed?: string | null
}

export type WorldCup26GamesResponse = {
  games: WorldCup26Game[]
}

const parseScore = (value?: string | null): number | null => {
  if (value == null || value === 'null' || value === '') {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const mapGameStatus = (game: WorldCup26Game): MatchStatus => {
  const finished = game.finished?.toUpperCase() === 'TRUE'
  const elapsed = (game.time_elapsed ?? '').toLowerCase()

  if (finished || elapsed === 'finished') {
    return MatchStatus.FINISHED
  }

  if (elapsed === 'live' || (elapsed !== 'notstarted' && elapsed !== '' && !Number.isNaN(Number(elapsed)))) {
    return MatchStatus.LIVE
  }

  return MatchStatus.SCHEDULED
}

export const mapWorldCup26Games = (body: WorldCup26GamesResponse): LiveScoreUpdate[] => {
  if (!Array.isArray(body.games)) {
    return []
  }

  return body.games.flatMap(game => {
    const homeTeamName = game.home_team_name_en?.trim()
    const awayTeamName = game.away_team_name_en?.trim()

    if (!homeTeamName || !awayTeamName) {
      return []
    }

    return [
      {
        sourceEventId: game.id,
        homeTeamName,
        awayTeamName,
        homeScore: parseScore(game.home_score),
        awayScore: parseScore(game.away_score),
        status: mapGameStatus(game),
      },
    ]
  })
}
