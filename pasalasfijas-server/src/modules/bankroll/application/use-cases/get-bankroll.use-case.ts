import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'

@Injectable()
export class GetBankrollUseCase {
  constructor(private readonly prisma: PrismaService) {}

  execute(userId: string) {
    return this.prisma.userBankroll.findUnique({ where: { userId } })
  }
}
