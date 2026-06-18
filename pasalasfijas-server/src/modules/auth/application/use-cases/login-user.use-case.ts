import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { USER_REPOSITORY, UserRepository } from '../../../users/domain/repositories/user.repository'

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(input.email.toLowerCase())
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash)
    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials')

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  }
}
