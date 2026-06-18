import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { UserEntity } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { email } })
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
}
