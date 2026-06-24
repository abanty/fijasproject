import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { mapUserMe } from '../../../users/application/mappers/map-user-me'
import { USER_REPOSITORY } from '../../../users/domain/repositories/user.repository'
import type { UserRepository } from '../../../users/domain/repositories/user.repository'

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(input.email.toLowerCase())
    if (!user) throw new UnauthorizedException('Correo o contraseña incorrectos')

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash)
    if (!isValidPassword) throw new UnauthorizedException('Correo o contraseña incorrectos')

    await this.userRepository.updateLastLoginAt(user.id)

    const me = await this.userRepository.findByIdForMe(user.id)
    if (!me) throw new UnauthorizedException('No pudimos iniciar tu sesión. Intenta de nuevo.')

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      accessToken,
      user: mapUserMe(me),
    }
  }
}
