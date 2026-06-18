import { ConflictException, Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { USER_REPOSITORY, UserRepository } from '../../../users/domain/repositories/user.repository'

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(input: { email: string; password: string; name?: string }) {
    const existingUser = await this.userRepository.findByEmail(input.email)
    if (existingUser) throw new ConflictException('Email already registered')

    const passwordHash = await bcrypt.hash(input.password, 10)
    const user = await this.userRepository.create({
      email: input.email.toLowerCase(),
      passwordHash,
      name: input.name,
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  }
}
