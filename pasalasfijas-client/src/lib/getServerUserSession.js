import { cookies } from 'next/headers'

import { parseUserSessionCookie, SESSION_COOKIE_NAME } from '@/lib/authUserSession'

export const getServerUserSession = async () => {
  const cookieStore = await cookies()

  return parseUserSessionCookie(cookieStore.get(SESSION_COOKIE_NAME)?.value)
}
