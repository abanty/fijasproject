import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository'

@Injectable()
export class GetCurrentUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new NotFoundException('User not found')

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    }
  }
}
