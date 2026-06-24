'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { getAccessToken } from '@/lib/authToken'

const AuthGuard = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/login')
    }
  }, [router])

  return children
}

export default AuthGuard
