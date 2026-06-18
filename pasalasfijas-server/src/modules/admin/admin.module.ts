import { Module } from '@nestjs/common'
import { GetAdminHealthUseCase } from './application/use-cases/get-admin-health.use-case'
import { AdminController } from './presentation/controllers/admin.controller'

@Module({
  controllers: [AdminController],
  providers: [GetAdminHealthUseCase],
})
export class AdminModule {}
