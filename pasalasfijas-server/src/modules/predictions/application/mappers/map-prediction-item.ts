import { Pick, PickType, Prisma } from '@prisma/client'
import type { PredictionBundle } from '../../domain/repositories/prediction.repository'

type RawExtras = {
  modelProbabilities?: { home: number; draw: number; away: number }
  expectedGoals?: { home: number; away: number }
  favoriteSide?: string
  stageLabel?: string
  dataQuality?: string
}

const decimalToNumber = (value: Prisma.Decimal | number | null | undefined) => {
  if (value == null) return null

  return Number(value)
}

const mapPick = (pick: Pick) => ({
  market: pick.market,
  selection: pick.selection,
  confidence: pick.confidence,
  riskScore: pick.riskScore,
  stakeIndex: pick.suggestedStakePercent,
  odd: decimalToNumber(pick.odd),
  valueScore: pick.valueScore,
})

const buildOdds = (odds: PredictionBundle['match']['odds']) => {
  const home = odds.find(item => item.market === '1X2' && item.selection === 'HOME')
  const draw = odds.find(item => item.market === '1X2' && item.selection === 'DRAW')
  const away = odds.find(item => item.market === '1X2' && item.selection === 'AWAY')

  if (!home && !draw && !away) return undefined

  return {
    home: decimalToNumber(home?.odd),
    draw: decimalToNumber(draw?.odd),
    away: decimalToNumber(away?.odd),
  }
}

export const mapPredictionItem = (bundle: PredictionBundle, isLocked: boolean) => {
  const { match } = bundle
  const extras = (bundle.rawOutputJson as RawExtras | null) ?? {}
  const mainPickEntity = bundle.picks.find(pick => pick.pickType === PickType.MAIN)
  const alternativePicks = bundle.picks.filter(pick => pick.pickType === PickType.ALTERNATIVE)
  const combo = bundle.comboBets[0]

  const base = {
    id: match.id,
    homeTeam: match.homeTeam.name,
    homeCountryCode: match.homeTeam.country ?? undefined,
    awayTeam: match.awayTeam.name,
    awayCountryCode: match.awayTeam.country ?? undefined,
    competition: match.competition.name,
    competitionSlug: match.competition.externalId ?? match.competition.name.toLowerCase().replace(/\s+/g, '-'),
    kickoffAt: match.kickoffAt.toISOString(),
    status: match.status,
    stageLabel: extras.stageLabel,
    modelProbabilities: extras.modelProbabilities,
    expectedGoals: extras.expectedGoals,
    favoriteSide: extras.favoriteSide,
    dataQuality: extras.dataQuality ?? 'sufficient',
    odds: buildOdds(match.odds),
    isLocked,
  }

  if (isLocked) {
    return {
      ...base,
      analysis: {
        confidence: bundle.confidence,
        riskScore: bundle.riskScore,
        mainPick: mainPickEntity
          ? {
              market: mainPickEntity.market,
              selection: 'Bloqueado',
              stakeIndex: null,
              odd: null,
              valueScore: null,
            }
          : null,
      },
    }
  }

  return {
    ...base,
    analysis: {
      confidence: bundle.confidence,
      riskScore: bundle.riskScore,
      summary: bundle.summary,
      reasonToBet: bundle.reasonToBet,
      reasonToAvoid: bundle.reasonToAvoid,
      mainPick: mainPickEntity ? mapPick(mainPickEntity) : null,
      alternativePicks: alternativePicks.map(mapPick),
      comboBet: combo
        ? {
            title: combo.title,
            confidence: combo.confidence,
            riskScore: combo.riskScore,
            stakeIndex: combo.suggestedStakePercent,
            totalOdd: decimalToNumber(combo.totalOdd),
            legs: combo.legs.map(leg => leg.pick.selection),
          }
        : null,
    },
  }
}
