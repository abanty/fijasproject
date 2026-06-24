import { Inject, Injectable } from '@nestjs/common'
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from '../../domain/repositories/subscription.repository'
import { mapSubscriptionMe } from '../mappers/map-subscription-me'

@Injectable()
export class GetCurrentSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: number) {
    const subscription = await this.subscriptionRepository.findActiveByUserId(userId)

    return mapSubscriptionMe(subscription)
  }
}
