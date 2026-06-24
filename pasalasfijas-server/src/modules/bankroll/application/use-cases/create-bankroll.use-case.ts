import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { mapBankrollSummary } from '../mappers/map-bankroll-summary'

@Injectable()
export class CreateBankrollUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number, input: { initialAmount: number; currency?: string }) {
    const bankroll = await this.prisma.userBankroll.upsert({
      where: { userId },
      update: {
        initialAmount: input.initialAmount,
        currentAmount: input.initialAmount,
        currency: input.currency ?? 'USD',
      },
      create: {
        userId,
        initialAmount: input.initialAmount,
        currentAmount: input.initialAmount,
        currency: input.currency ?? 'USD',
      },
    })

    const trackings = await this.prisma.userBetTracking.findMany({ where: { userId } })

    return mapBankrollSummary(bankroll, trackings)
  }
}
