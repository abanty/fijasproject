import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { mapBankrollSummary } from '../mappers/map-bankroll-summary'

@Injectable()
export class GetBankrollUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number) {
    const [bankroll, trackings] = await Promise.all([
      this.prisma.userBankroll.findUnique({ where: { userId } }),
      this.prisma.userBetTracking.findMany({ where: { userId } }),
    ])

    return mapBankrollSummary(bankroll, trackings)
  }
}
