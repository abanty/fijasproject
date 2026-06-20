'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import themeConfig from '@configs/themeConfig'

export const useSignIn = () => {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = useCallback(() => {
    setIsPasswordShown(show => !show)
  }, [])

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      router.push(themeConfig.homePageUrl)
    },
    [router]
  )

  return {
    isPasswordShown,
    handleClickShowPassword,
    handleSubmit
  }
}
