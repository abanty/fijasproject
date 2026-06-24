'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Typography from '@mui/material/Typography'

import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const isAdminRole = role => role === 'ADMIN' || role === 'SUPER_ADMIN'

const AdminGuard = ({ children }) => {
  const router = useRouter()
  const { user, loading } = useCurrentUser()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/login')
      return
    }
    if (!isAdminRole(user.role)) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  if (loading || !user) return <DashboardPageLoading />

  if (!isAdminRole(user.role)) {
    return (
      <Typography color='text.secondary'>
        No tienes permisos de administrador.
      </Typography>
    )
  }

  return children
}

export default AdminGuard
