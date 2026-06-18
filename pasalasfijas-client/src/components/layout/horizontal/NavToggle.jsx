'use client'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'
import { useSidebarNav } from '@/contexts/sidebarNavContext'

const NavToggle = () => {
  const { isBreakpointReached } = useHorizontalNav()
  const { toggleMobile } = useSidebarNav()

  if (!isBreakpointReached) {
    return null
  }

  return (
    <button
      type='button'
      aria-label='Abrir menu'
      className='header-action-btn flex items-center justify-center is-10 bs-10 rounded-md hover:bg-actionHover'
      onClick={toggleMobile}
    >
      <i className='ri-menu-line text-xl' />
    </button>
  )
}

export default NavToggle
