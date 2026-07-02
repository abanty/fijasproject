'use client'

// Component Imports
import classnames from 'classnames'

import Link from '@components/Link'
import HeaderSearch from '@components/layout/shared/HeaderSearch'
import HeaderSearchIcon from '@components/layout/shared/HeaderSearchIcon'
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  return (
    <div
      className={classnames(
        horizontalLayoutClasses.navbarContent,
        'header-navbar-shell header-navbar-shell--adaptive relative flex items-center justify-between is-full'
      )}
    >
      <div className='relative z-[1] flex items-center gap-3 shrink-0'>
        <Link href={themeConfig.homePageUrl} className='flex items-center'>
          <Logo />
        </Link>
      </div>

      <div className='header-search-slot header-viewport-desktop-only pointer-events-none'>
        <HeaderSearch className='pointer-events-auto' />
      </div>

      <div className='relative z-[1] flex items-center gap-0.5 shrink-0'>
        <span className='header-viewport-mobile-only inline-flex'>
          <HeaderSearchIcon />
        </span>
        <span className='header-viewport-desktop-only inline-flex'>
          <ModeDropdown />
        </span>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
