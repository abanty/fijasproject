'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { getAccessToken } from '@/lib/authToken'
import { prefetchCoreRoutes } from '@/lib/query/prefetchNavData'

const schedulePrefetch = () => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(() => prefetchCoreRoutes())
    return
  }

  setTimeout(() => prefetchCoreRoutes(), 300)
}

const AuthGuard = ({ children }) => {
  const router = useRouter()
  const prefetchedRef = useRef(false)

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/login')
      return
    }

    if (prefetchedRef.current) return

    prefetchedRef.current = true
    schedulePrefetch()
  }, [router])

  return children
}

export default AuthGuard
