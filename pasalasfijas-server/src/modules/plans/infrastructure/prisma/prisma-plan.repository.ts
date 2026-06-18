import { Injectable } from '@nestjs/common'
import { Plan } from '@prisma/client'
import { PrismaService } from '../../../../shared/prisma/prisma.service'
import { PlanRepository } from '../../domain/repositories/plan.repository'

@Injectable()
export class PrismaPlanRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllActive(): Promise<Plan[]> {
    return this.prisma.plan.findMany({ where: { isActive: true }, orderBy: { price: 'asc' } })
  }

  findByCode(code: string): Promise<Plan | null> {
    return this.prisma.plan.findUnique({ where: { code } })
  }
}
