import { UserBankroll, UserBetTracking } from '@prisma/client'

const decimalToNumber = (value: { toNumber(): number } | number) =>
  typeof value === 'number' ? value : Number(value)

export const mapBankrollSummary = (
  bankroll: UserBankroll | null,
  trackings: UserBetTracking[] = [],
) => {
  if (!bankroll) return null

  const initialAmount = decimalToNumber(bankroll.initialAmount)
  const currentAmount = decimalToNumber(bankroll.currentAmount)
  const roi = initialAmount > 0 ? Number((((currentAmount - initialAmount) / initialAmount) * 100).toFixed(1)) : 0

  const settled = trackings.filter(item => item.status === 'WON' || item.status === 'LOST')
  const won = settled.filter(item => item.status === 'WON').length
  const winRate = settled.length ? Number(((won / settled.length) * 100).toFixed(1)) : 0

  return {
    currency: bankroll.currency,
    initialAmount,
    currentAmount,
    roi,
    winRate,
    totalTrackedPicks: trackings.length,
  }
}
