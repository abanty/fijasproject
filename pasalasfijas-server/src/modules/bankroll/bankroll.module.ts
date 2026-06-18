import { Module } from '@nestjs/common'
import { CreateBankrollUseCase } from './application/use-cases/create-bankroll.use-case'
import { GetBankrollUseCase } from './application/use-cases/get-bankroll.use-case'
import { BankrollController } from './presentation/controllers/bankroll.controller'

@Module({
  controllers: [BankrollController],
  providers: [GetBankrollUseCase, CreateBankrollUseCase],
})
export class BankrollModule {}
