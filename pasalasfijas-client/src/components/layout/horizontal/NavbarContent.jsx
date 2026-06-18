'use client'

// Component Imports
import Link from '@components/Link'
import NavToggle from './NavToggle'
import HeaderSearch from '@components/layout/shared/HeaderSearch'
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(
        horizontalLayoutClasses.navbarContent,
        'header-navbar-shell relative flex items-center justify-between is-full'
      )}
    >
      <div className='relative z-[1] flex items-center gap-4 shrink-0'>
        <NavToggle />
        {!isBreakpointReached && (
          <Link href='/dashboard' className='flex items-center'>
            <Logo />
          </Link>
        )}
      </div>

      <div className='header-search-slot pointer-events-none'>
        <HeaderSearch className='pointer-events-auto' />
      </div>

      <div className='relative z-[1] flex items-center shrink-0'>
        <ModeDropdown />
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
