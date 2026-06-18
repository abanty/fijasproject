import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'

@Injectable()
export class CreateBankrollUseCase {
  constructor(private readonly prisma: PrismaService) {}

  execute(userId: string, input: { initialAmount: number; currency?: string }) {
    return this.prisma.userBankroll.upsert({
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
  }
}
