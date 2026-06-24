import { ConflictException, Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { mapUserMe } from '../../../users/application/mappers/map-user-me'
import { USER_REPOSITORY } from '../../../users/domain/repositories/user.repository'
import type { UserRepository } from '../../../users/domain/repositories/user.repository'

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(input: { email: string; password: string; name?: string }) {
    const existingUser = await this.userRepository.findByEmail(input.email)
    if (existingUser) throw new ConflictException('Este correo ya está registrado')

    const passwordHash = await bcrypt.hash(input.password, 10)
    const user = await this.userRepository.create({
      email: input.email.toLowerCase(),
      passwordHash,
      name: input.name,
    })

    const me = await this.userRepository.findByIdForMe(user.id)
    if (!me) throw new ConflictException('No pudimos crear tu cuenta. Intenta de nuevo.')

    return mapUserMe(me)
  }
}
