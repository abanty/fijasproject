import { Module } from '@nestjs/common'
import { FootballModule } from '../football/football.module'
import { CreateAdminMatchUseCase } from './application/use-cases/create-admin-match.use-case'
import { GetAdminHealthUseCase } from './application/use-cases/get-admin-health.use-case'
import { PublishMockPredictionUseCase } from './application/use-cases/publish-mock-prediction.use-case'
import { AdminController } from './presentation/controllers/admin.controller'

@Module({
  imports: [FootballModule],
  controllers: [AdminController],
  providers: [GetAdminHealthUseCase, CreateAdminMatchUseCase, PublishMockPredictionUseCase],
})
export class AdminModule {}
