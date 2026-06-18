import { BadRequestException, Injectable } from '@nestjs/common'

const allowedConfidence = ['HIGH', 'MEDIUM', 'LOW', 'NO_BET']
const allowedMarkets = [
  'MATCH_WINNER',
  'DOUBLE_CHANCE',
  'OVER_UNDER_GOALS',
  'BTTS',
  'HANDICAP',
  'CORNERS',
  'CARDS',
]

@Injectable()
export class AiPredictionValidatorService {
  validate(output: Record<string, unknown>) {
    const confidence = output.confidence
    const riskScore = output.riskScore

    if (typeof confidence !== 'string' || !allowedConfidence.includes(confidence)) {
      throw new BadRequestException('Invalid AI confidence')
    }

    if (typeof riskScore !== 'number' || riskScore < 0 || riskScore > 100) {
      throw new BadRequestException('Invalid AI riskScore')
    }

    const mainPick = output.mainPick as Record<string, unknown> | null | undefined

    if (confidence === 'NO_BET' && mainPick) {
      throw new BadRequestException('NO_BET analysis cannot publish a main pick')
    }

    if (mainPick) {
      this.validatePick(mainPick)
    }

    const alternativePicks = output.alternativePicks
    if (Array.isArray(alternativePicks)) {
      alternativePicks.forEach((pick) => this.validatePick(pick as Record<string, unknown>))
    }

    return output
  }

  private validatePick(pick: Record<string, unknown>) {
    if (typeof pick.market !== 'string' || !allowedMarkets.includes(pick.market)) {
      throw new BadRequestException('Invalid AI pick market')
    }

    const riskScore = pick.riskScore
    const valueScore = pick.valueScore
    const suggestedStakePercent = pick.suggestedStakePercent

    if (typeof riskScore === 'number' && (riskScore < 0 || riskScore > 100)) {
      throw new BadRequestException('Invalid pick riskScore')
    }

    if (typeof valueScore === 'number' && (valueScore < 0 || valueScore > 100)) {
      throw new BadRequestException('Invalid pick valueScore')
    }

    if (
      typeof suggestedStakePercent === 'number' &&
      (suggestedStakePercent < 0 || suggestedStakePercent > 100)
    ) {
      throw new BadRequestException('Invalid pick suggestedStakePercent')
    }

    if (typeof riskScore === 'number' && riskScore > 75 && pick.confidence === 'HIGH') {
      throw new BadRequestException('High-risk picks cannot be HIGH confidence')
    }
  }
}
