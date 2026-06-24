'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import themeConfig from '@configs/themeConfig'
import { login as loginRequest } from '@/services/authService'
import { withProgress } from '@/lib/withProgress'

export const useSignIn = () => {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleClickShowPassword = useCallback(() => {
    setIsPasswordShown(show => !show)
  }, [])

  const onSubmit = useCallback(
    async values => {
      setLoading(true)
      let succeeded = false

      try {
        await withProgress(() =>
          loginRequest({ email: values.email.trim(), password: values.password })
        )
        succeeded = true
        router.replace(themeConfig.homePageUrl)
      } catch (error) {
        setError('password', { type: 'server', message: error.message || 'Error al iniciar sesión' })
      } finally {
        if (!succeeded) setLoading(false)
      }
    },
    [router, setError]
  )

  return {
    control,
    errors,
    isPasswordShown,
    loading,
    handleClickShowPassword,
    handleSubmit: handleSubmit(onSubmit)
  }
}
