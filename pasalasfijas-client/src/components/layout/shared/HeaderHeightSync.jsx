'use client'

import { useEffect } from 'react'

import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const syncHeaderHeight = () => {
  const header = document.querySelector(`.${horizontalLayoutClasses.header}`)
  const wrapper = document.querySelector(`.${horizontalLayoutClasses.contentWrapper}`)

  if (!header || !wrapper) return

  const navbarHeight = Math.ceil(header.getBoundingClientRect().height)
  let stackHeight = navbarHeight

  let node = header.nextElementSibling

  while (node && !node.classList.contains('app-body-shell-outer')) {
    if (node.classList.contains('header-nav-band--detached')) {
      stackHeight += Math.ceil(node.getBoundingClientRect().height)
    }

    node = node.nextElementSibling
  }

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
  useEffect(() => {
    syncHeaderHeight()

    const header = document.querySelector(`.${horizontalLayoutClasses.header}`)

    if (!header) return undefined

    const observer = new ResizeObserver(syncHeaderHeight)

    observer.observe(header)

    let node = header.nextElementSibling

    while (node && !node.classList.contains('app-body-shell-outer')) {
      if (node.classList.contains('header-nav-band--detached')) {
        observer.observe(node)
      }

      node = node.nextElementSibling
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
