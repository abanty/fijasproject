import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CurrentUser, CurrentUserPayload } from '../../../../shared/security/current-user.decorator'
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case'
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LoginDto } from '../dto/login.dto'
import { RegisterDto } from '../dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUserUseCase.execute(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUserUseCase.execute(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: CurrentUserPayload) {
    return user
  }
}
