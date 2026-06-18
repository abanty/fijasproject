import { UserRole, UserStatus } from '@prisma/client'

export class UserEntity {
  id!: string
  email!: string
  passwordHash!: string
  name?: string | null
  role!: UserRole
  status!: UserStatus
  createdAt!: Date
  updatedAt!: Date
}
