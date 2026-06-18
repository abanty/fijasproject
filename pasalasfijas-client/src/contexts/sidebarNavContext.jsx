'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const SidebarNavContext = createContext(null)

export const SidebarNavProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])
  const toggleMobile = useCallback(() => setMobileOpen(open => !open), [])

  const value = useMemo(
    () => ({
      mobileOpen,
      openMobile,
      closeMobile,
      toggleMobile
    }),
    [mobileOpen, openMobile, closeMobile, toggleMobile]
  )

  return <SidebarNavContext.Provider value={value}>{children}</SidebarNavContext.Provider>
}

export const useSidebarNav = () => {
  const context = useContext(SidebarNavContext)

  if (!context) {
    throw new Error('useSidebarNav must be used within SidebarNavProvider')
  }

  return context
}
