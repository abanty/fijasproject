import { Module } from '@nestjs/common'
import { GetCurrentSubscriptionUseCase } from './application/use-cases/get-current-subscription.use-case'
import { SUBSCRIPTION_REPOSITORY } from './domain/repositories/subscription.repository'
import { PrismaSubscriptionRepository } from './infrastructure/prisma/prisma-subscription.repository'
import { SubscriptionsController } from './presentation/controllers/subscriptions.controller'

@Module({
  controllers: [SubscriptionsController],
  providers: [
    GetCurrentSubscriptionUseCase,
    { provide: SUBSCRIPTION_REPOSITORY, useClass: PrismaSubscriptionRepository },
  ],
  exports: [GetCurrentSubscriptionUseCase, SUBSCRIPTION_REPOSITORY],
})
export class SubscriptionsModule {}
