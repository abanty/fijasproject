import { Injectable } from '@nestjs/common'
import { SubscriptionStatus } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { UserEntity } from '../../domain/entities/user.entity'
import type { UserMeRecord, UserRepository } from '../../domain/repositories/user.repository'

const activeSubscriptionInclude = {
  where: {
    status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING] },
    OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
  },
  include: { plan: true },
  orderBy: { startedAt: 'desc' as const },
  take: 1,
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findByIdForMe(id: number): Promise<UserMeRecord | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        subscriptions: activeSubscriptionInclude,
      },
    })
  }

  create(data: { email: string; passwordHash: string; name?: string }): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
        profile: { create: {} },
        subscriptions: {
          create: {
            plan: { connect: { code: 'FREE' } },
          },
        },
      },
    })
  }

  updateLastLoginAt(id: number): Promise<void> {
    return this.prisma.user
      .update({
        where: { id },
        data: { lastLoginAt: new Date() },
      })
      .then(() => undefined)
  }
}
