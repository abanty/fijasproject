import { UserEntity } from '../entities/user.entity'

export const USER_REPOSITORY = 'USER_REPOSITORY'

export type UserMeRecord = UserEntity & {
  profile: {
    firstName: string | null
    lastName: string | null
    phone: string | null
    document: string | null
    address: string | null
    city: string | null
    country: string | null
    postalCode: string | null
    timezone: string | null
    preferredLanguage: string | null
    avatarUrl: string | null
    gender: string | null
    occupation: string | null
    riskPreference: string | null
  } | null
  subscriptions: Array<{
    id: number
    status: string
    startedAt: Date
    expiresAt: Date | null
    plan: {
      code: string
      name: string
      dailyFreePredictions: number
      canViewAllPredictions: boolean
      canViewCombos: boolean
      canViewStake: boolean
      canViewHistory: boolean
    }
  }>
}

export interface UserRepository {
  findById(id: number): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  findByIdForMe(id: number): Promise<UserMeRecord | null>
  create(data: { email: string; passwordHash: string; name?: string }): Promise<UserEntity>
  updateLastLoginAt(id: number): Promise<void>
}
