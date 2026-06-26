'use client'

import { useCurrentUserContext } from '@/contexts/CurrentUserProvider'

export const useCurrentUser = () => useCurrentUserContext()
