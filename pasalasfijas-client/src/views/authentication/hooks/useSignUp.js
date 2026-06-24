'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import themeConfig from '@configs/themeConfig'
import { login as loginRequest, register as registerRequest } from '@/services/authService'
import { withProgress } from '@/lib/withProgress'

export const useSignUp = () => {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const handleClickShowPassword = useCallback(() => {
    setIsPasswordShown(show => !show)
  }, [])

  const onSubmit = useCallback(
    async values => {
      setFormError('')
      setLoading(true)
      let succeeded = false

      try {
        await withProgress(async () => {
          await registerRequest({
            email: values.email.trim(),
            password: values.password,
            name: values.name.trim() || undefined
          })
          await loginRequest({ email: values.email.trim(), password: values.password })
        })
        succeeded = true
        router.replace(themeConfig.homePageUrl)
      } catch (error) {
        if (error.status === 409) {
          setError('email', { type: 'server', message: error.message || 'Este correo ya está registrado' })
          return
        }

        setFormError(error.message || 'Error al crear la cuenta')
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
    formError,
    loading,
    handleClickShowPassword,
    handleSubmit: handleSubmit(onSubmit)
  }
}
