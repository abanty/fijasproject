import { Injectable } from '@nestjs/common'

@Injectable()
export class GetAdminHealthUseCase {
  execute() {
    return {
      status: 'ok',
      module: 'admin',
      nextTasks: [
        'sync matches',
        'generate AI analysis',
        'publish prediction',
        'settle pick result',
      ],
    }
  }
}
