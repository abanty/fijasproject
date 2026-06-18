import { Controller, Get } from '@nestjs/common'
import { GetActivePlansUseCase } from '../../application/use-cases/get-active-plans.use-case'

@Controller('plans')
export class PlansController {
  constructor(private readonly getActivePlansUseCase: GetActivePlansUseCase) {}

  @Get()
  findAll() {
    return this.getActivePlansUseCase.execute()
  }
}
