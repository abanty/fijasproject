'use client'

import AuthGuard from '@components/auth/AuthGuard'

const DashboardAuthShell = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>
}

export default DashboardAuthShell
