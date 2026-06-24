import { Plan, Subscription } from '@prisma/client'

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY'

export type ActiveSubscription = Subscription & { plan: Plan }

export interface SubscriptionRepository {
  findActiveByUserId(userId: number): Promise<ActiveSubscription | null>
  upgradeUserPlan(userId: number, planId: number): Promise<ActiveSubscription>
}
