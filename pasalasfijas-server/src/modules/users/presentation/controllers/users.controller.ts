import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser, type CurrentUserPayload } from '../../../../shared/security/current-user.decorator'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.use-case'

@Controller('users')
export class UsersController {
  constructor(private readonly getCurrentUserUseCase: GetCurrentUserUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: CurrentUserPayload) {
    return this.getCurrentUserUseCase.execute(user.sub)
  }
}
