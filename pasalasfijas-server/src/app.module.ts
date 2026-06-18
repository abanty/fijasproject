import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './modules/admin/admin.module'
import { AiAnalysisModule } from './modules/ai-analysis/ai-analysis.module'
import { AuthModule } from './modules/auth/auth.module'
import { BankrollModule } from './modules/bankroll/bankroll.module'
import { FootballModule } from './modules/football/football.module'
import { PlansModule } from './modules/plans/plans.module'
import { PredictionsModule } from './modules/predictions/predictions.module'
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaModule } from './shared/prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PlansModule,
    SubscriptionsModule,
    FootballModule,
    PredictionsModule,
    AiAnalysisModule,
    BankrollModule,
    AdminModule,
  ],
})
export class AppModule {}
