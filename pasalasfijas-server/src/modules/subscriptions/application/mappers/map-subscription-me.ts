import type { ActiveSubscription } from '../../domain/repositories/subscription.repository'
import { mapPlanItem } from '../../../plans/application/mappers/map-plan-item'

export const mapSubscriptionMe = (subscription: ActiveSubscription | null) => {
  if (!subscription) {
    return { subscription: null, tier: 'FREE' }
  }

  return {
    tier: subscription.plan.code,
    subscription: {
      id: subscription.id,
      status: subscription.status,
      startedAt: subscription.startedAt,
      expiresAt: subscription.expiresAt,
      plan: mapPlanItem(subscription.plan),
    },
  }
}
