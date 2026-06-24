import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { mapUserMe } from '../mappers/map-user-me'
import { USER_REPOSITORY } from '../../domain/repositories/user.repository'
import type { UserRepository } from '../../domain/repositories/user.repository'

@Injectable()
export class GetCurrentUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(userId: number) {
    const user = await this.userRepository.findByIdForMe(userId)
    if (!user) throw new NotFoundException('No encontramos tu cuenta')

    return mapUserMe(user)
  }
}
