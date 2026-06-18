import { Controller, Get, UseGuards } from '@nestjs/common'
import { Roles } from '../../../../shared/security/roles.decorator'
import { RolesGuard } from '../../../../shared/security/roles.guard'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { GetAdminHealthUseCase } from '../../application/use-cases/get-admin-health.use-case'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly getAdminHealthUseCase: GetAdminHealthUseCase) {}

  @Get('health')
  health() {
    return this.getAdminHealthUseCase.execute()
  }
}
