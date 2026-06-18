import { Inject, Injectable } from '@nestjs/common'
import { SUBSCRIPTION_REPOSITORY, SubscriptionRepository } from '../../domain/repositories/subscription.repository'

@Injectable()
export class GetCurrentSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  execute(userId: string) {
    return this.subscriptionRepository.findActiveByUserId(userId)
  }
}
