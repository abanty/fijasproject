import type { MatchWithRelations } from '../../domain/repositories/match.repository'

type RawExtras = {
  stageLabel?: string
}

export const mapMatchItem = (match: MatchWithRelations, matchNumber?: number) => {
  const analysis = match.analyses[0]
  const extras = (analysis?.rawOutputJson as RawExtras | null) ?? {}

  return {
    id: match.id,
    matchNumber: matchNumber ?? null,
    homeTeam: match.homeTeam.name,
    homeCountryCode: match.homeTeam.country ?? undefined,
    awayTeam: match.awayTeam.name,
    awayCountryCode: match.awayTeam.country ?? undefined,
    competition: match.competition.name,
    competitionSlug:
      match.competition.externalId ?? match.competition.name.toLowerCase().replace(/\s+/g, '-'),
    kickoffAt: match.kickoffAt.toISOString(),
    status: match.status,
    stageLabel: match.stageLabel ?? extras.stageLabel ?? null,
    venue: match.venue ?? null,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    analysis: analysis
      ? {
          confidence: analysis.confidence,
          riskScore: analysis.riskScore,
        }
      : null,
  }
}
