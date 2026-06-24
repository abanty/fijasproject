import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CurrentUser, type CurrentUserPayload } from '../../../../shared/security/current-user.decorator'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { CreateBankrollUseCase } from '../../application/use-cases/create-bankroll.use-case'
import { GetBankrollUseCase } from '../../application/use-cases/get-bankroll.use-case'
import { CreateBankrollDto } from '../dto/create-bankroll.dto'

@UseGuards(JwtAuthGuard)
@Controller('bankroll')
export class BankrollController {
  constructor(
    private readonly getBankrollUseCase: GetBankrollUseCase,
    private readonly createBankrollUseCase: CreateBankrollUseCase,
  ) {}

  @Get()
  get(@CurrentUser() user: CurrentUserPayload) {
    return this.getBankrollUseCase.execute(user.sub)
  }

  @Post()
  create(@CurrentUser() user: CurrentUserPayload, @Body() dto: CreateBankrollDto) {
    return this.createBankrollUseCase.execute(user.sub, dto)
  }
}
