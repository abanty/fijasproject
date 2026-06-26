'use client'

import { useEffect, useLayoutEffect } from 'react'

import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const syncHeaderHeight = () => {
  const header = document.querySelector(`.${horizontalLayoutClasses.header}`)
  const wrapper = document.querySelector(`.${horizontalLayoutClasses.contentWrapper}`)
  const navbar = header?.querySelector(`.${horizontalLayoutClasses.navbar}`)

  if (!header || !wrapper) return

  const navbarHeight = Math.ceil((navbar ?? header).getBoundingClientRect().height)
  const stackHeight = Math.ceil(header.getBoundingClientRect().height)
  const nextNavbarHeight = `${navbarHeight}px`
  const nextStackHeight = `${stackHeight}px`
  const currentNavbarHeight = wrapper.style.getPropertyValue('--header-navbar-height')
  const currentStackHeight = wrapper.style.getPropertyValue('--header-height')

  if (currentNavbarHeight !== nextNavbarHeight) {
    wrapper.style.setProperty('--header-navbar-height', nextNavbarHeight)
  }

  if (currentStackHeight !== nextStackHeight) {
    wrapper.style.setProperty('--header-height', nextStackHeight)
  }
}

const HeaderHeightSync = () => {
  useLayoutEffect(() => {
    syncHeaderHeight()
  }, [])

  useEffect(() => {
    syncHeaderHeight()

    const header = document.querySelector(`.${horizontalLayoutClasses.header}`)
    const navbar = header?.querySelector(`.${horizontalLayoutClasses.navbar}`)

    if (!header) return undefined

    const observer = new ResizeObserver(syncHeaderHeight)

    observer.observe(header)

    if (navbar) {
      observer.observe(navbar)
    }

    const navBand = header.querySelector('.header-nav-band--adaptive, .header-nav-band--detached')

    if (navBand) {
      observer.observe(navBand)
    }

    window.addEventListener('resize', syncHeaderHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncHeaderHeight)
    }
  }, [])

  return null
}

export default HeaderHeightSync
