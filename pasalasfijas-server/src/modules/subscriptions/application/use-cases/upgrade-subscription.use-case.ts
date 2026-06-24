import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PLAN_REPOSITORY, type PlanRepository } from '../../../plans/domain/repositories/plan.repository'
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from '../../domain/repositories/subscription.repository'
import { mapSubscriptionMe } from '../mappers/map-subscription-me'

@Injectable()
export class UpgradeSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepository,
    @Inject(PLAN_REPOSITORY) private readonly planRepository: PlanRepository,
  ) {}

  async execute(userId: number, planCode: string) {
    const plan = await this.planRepository.findByCode(planCode)
    if (!plan || !plan.isActive) {
      throw new NotFoundException('Plan no encontrado')
    }

    if (plan.code === 'FREE') {
      throw new BadRequestException('No puedes activar el plan gratuito desde esta accion')
    }

    const subscription = await this.subscriptionRepository.upgradeUserPlan(userId, plan.id)

    return mapSubscriptionMe(subscription)
  }
}
