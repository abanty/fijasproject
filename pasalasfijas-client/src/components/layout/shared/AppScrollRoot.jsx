'use client'

import { useEffect, useState } from 'react'

import PerfectScrollbar from 'react-perfect-scrollbar'

export const APP_SCROLL_ROOT_SELECTOR = '.app-scroll-root'

export const getAppScrollElement = () => document.querySelector(APP_SCROLL_ROOT_SELECTOR)

export const getAppScrollTop = () => getAppScrollElement()?.scrollTop ?? window.scrollY ?? 0

export const useAppScrollTrigger = ({ threshold = 0, disableHysteresis = true } = {}) => {
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    let cleanup

    const bind = () => {
      const node = getAppScrollElement()

      if (!node) return false

      const onScroll = () => {
        const offset = node.scrollTop

        setTrigger(prev => {
          if (disableHysteresis) return offset > threshold

          return offset > threshold ? true : offset <= threshold ? false : prev
        })
      }

      onScroll()
      node.addEventListener('scroll', onScroll, { passive: true })
      cleanup = () => node.removeEventListener('scroll', onScroll)

      return true
    }

    if (!bind()) {
      const rafId = requestAnimationFrame(() => bind())

      
return () => {
        cancelAnimationFrame(rafId)
        cleanup?.()
      }
    }

    return () => cleanup?.()
  }, [threshold, disableHysteresis])

  return trigger
}

const AppScrollRoot = ({ children }) => (
  <PerfectScrollbar
    className='app-scroll-root flex flex-col flex-auto min-bs-0 is-full'
    options={{ suppressScrollX: true }}
  >
    {children}
  </PerfectScrollbar>
)

export default AppScrollRoot
