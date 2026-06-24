import { UserRole, UserStatus } from '@prisma/client'

export class UserEntity {
  id!: number
  email!: string
  passwordHash!: string
  name!: string | null
  emailVerified!: boolean
  lastLoginAt?: Date | null
  role!: UserRole
  status!: UserStatus
  createdAt!: Date
  updatedAt!: Date
}
