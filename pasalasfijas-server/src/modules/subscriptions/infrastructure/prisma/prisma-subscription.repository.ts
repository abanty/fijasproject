import { Injectable } from '@nestjs/common'
import { SubscriptionStatus } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { ActiveSubscription, SubscriptionRepository } from '../../domain/repositories/subscription.repository'

@Injectable()
export class PrismaSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  findActiveByUserId(userId: string): Promise<ActiveSubscription | null> {
    return this.prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING] },
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: { plan: true },
      orderBy: { startedAt: 'desc' },
    })
  }
}
