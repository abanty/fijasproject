'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import themeConfig from '@configs/themeConfig'
import { getAccessToken } from '@/lib/authToken'

const GuestGuard = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    if (getAccessToken()) {
      router.replace(themeConfig.homePageUrl)
    }
  }, [router])

  return children
}

export default GuestGuard
