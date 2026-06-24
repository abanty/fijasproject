'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { configureProgress, doneProgress } from '@/lib/withProgress'

const NavigationProgress = () => {
  const pathname = usePathname()

  useEffect(() => {
    configureProgress()
  }, [])

  useEffect(() => {
    doneProgress()
  }, [pathname])

  return null
}

export default NavigationProgress
