'use client'

import GuestGuard from '@components/auth/GuestGuard'

const GuestAuthShell = ({ children }) => {
  return <GuestGuard>{children}</GuestGuard>
}

export default GuestAuthShell
