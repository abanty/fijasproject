import type { HistoryPickRecord } from '../../domain/repositories/prediction.repository'

const decimalToNumber = (value: HistoryPickRecord['odd']) => {
  if (value == null) return null
  if (typeof value === 'number') return value

  return Number(value)
}

export const mapPickHistoryItem = (pick: HistoryPickRecord) => ({
  id: pick.id,
  match: `${pick.match.homeTeam.name} vs ${pick.match.awayTeam.name}`,
  market: pick.market,
  selection: pick.selection,
  confidence: pick.confidence,
  stakeIndex: pick.suggestedStakePercent,
  odd: decimalToNumber(pick.odd),
  resultStatus: pick.resultStatus,
})
