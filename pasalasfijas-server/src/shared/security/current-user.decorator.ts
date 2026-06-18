import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type CurrentUserPayload = {
  sub: string
  email: string
  role: string
}

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user?: CurrentUserPayload }>()
  return request.user
})
