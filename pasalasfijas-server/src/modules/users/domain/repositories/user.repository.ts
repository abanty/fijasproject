import { UserEntity } from '../entities/user.entity'

export const USER_REPOSITORY = 'USER_REPOSITORY'

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  create(data: { email: string; passwordHash: string; name?: string }): Promise<UserEntity>
}
