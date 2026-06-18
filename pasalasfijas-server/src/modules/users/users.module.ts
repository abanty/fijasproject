import { Module } from '@nestjs/common'
import { USER_REPOSITORY } from './domain/repositories/user.repository'
import { PrismaUserRepository } from './infrastructure/prisma/prisma-user.repository'
import { GetCurrentUserUseCase } from './application/use-cases/get-current-user.use-case'
import { UsersController } from './presentation/controllers/users.controller'

@Module({
  controllers: [UsersController],
  providers: [
    GetCurrentUserUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
