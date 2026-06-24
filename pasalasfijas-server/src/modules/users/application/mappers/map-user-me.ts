import type { UserMeRecord } from '../../domain/repositories/user.repository'

export function mapUserMe(user: UserMeRecord) {
  const subscription = user.subscriptions[0] ?? null
  const plan = subscription?.plan ?? null

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerified,
    lastLoginAt: user.lastLoginAt ?? null,
    createdAt: user.createdAt,
    profile: user.profile,
    tier: plan?.code ?? 'FREE',
    subscription: subscription
      ? {
          id: subscription.id,
          status: subscription.status,
          startedAt: subscription.startedAt,
          expiresAt: subscription.expiresAt,
          plan,
        }
      : null,
  }
}
