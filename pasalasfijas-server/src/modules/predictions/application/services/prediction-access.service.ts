import { Injectable } from '@nestjs/common'
import { AccessType } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'

export type UserAccessContext = {
  isPremium: boolean
  dailyLimit: number
  todayViewsCount: number
  viewedMatchIds: Set<number>
}

@Injectable()
export class PredictionAccessService {
  constructor(private readonly prisma: PrismaService) {}

  private dayBounds(referenceDate = new Date()) {
    const start = new Date(referenceDate)
    start.setHours(0, 0, 0, 0)
    const end = new Date(referenceDate)
    end.setHours(23, 59, 59, 999)

    return { start, end }
  }

  async getUserAccessContext(userId: number, referenceDate = new Date()): Promise<UserAccessContext> {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: ['ACTIVE', 'TRIALING'] },
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: { plan: true },
      orderBy: { startedAt: 'desc' },
    })

    const { start, end } = this.dayBounds(referenceDate)
    const views = await this.prisma.userPredictionView.findMany({
      where: { userId, viewedAt: { gte: start, lte: end } },
      select: { matchId: true },
    })

    return {
      isPremium: subscription?.plan.canViewAllPredictions ?? false,
      dailyLimit: subscription?.plan.dailyFreePredictions ?? 2,
      todayViewsCount: views.length,
      viewedMatchIds: new Set(views.map(view => view.matchId)),
    }
  }

  async canViewPrediction(userId: number, matchId: number) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: ['ACTIVE', 'TRIALING'] },
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: { plan: true },
      orderBy: { startedAt: 'desc' },
    })

    if (subscription?.plan.canViewAllPredictions) {
      return { allowed: true, accessType: AccessType.PREMIUM }
    }

    const { start, end } = this.dayBounds()
    const existingView = await this.prisma.userPredictionView.findFirst({
      where: { userId, matchId, viewedAt: { gte: start, lte: end } },
    })

    if (existingView) {
      return { allowed: true, accessType: existingView.accessType }
    }

    const dailyLimit = subscription?.plan.dailyFreePredictions ?? 2
    const todayViews = await this.prisma.userPredictionView.count({
      where: { userId, viewedAt: { gte: start, lte: end } },
    })

    if (todayViews < dailyLimit) {
      await this.prisma.userPredictionView.create({
        data: { userId, matchId, accessType: AccessType.FREE_UNLOCK },
      })
      return { allowed: true, accessType: AccessType.FREE_UNLOCK }
    }

    return { allowed: false, accessType: null, reason: 'FREE_LIMIT_REACHED' }
  }
}
