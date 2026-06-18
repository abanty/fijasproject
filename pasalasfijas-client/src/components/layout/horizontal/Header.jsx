'use client'

// Component Imports
import HorizontalNavBreakpoint from './HorizontalNavBreakpoint'
import Navigation from './Navigation'
import NavbarContent from './NavbarContent'
import Navbar from '@layouts/components/horizontal/Navbar'
import LayoutHeader from '@layouts/components/horizontal/Header'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

const Header = () => {
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <>
      <HorizontalNavBreakpoint />
      <LayoutHeader>
        <Navbar>
          <NavbarContent />
        </Navbar>
        {!isBreakpointReached && <Navigation />}
      </LayoutHeader>
      {isBreakpointReached && <Navigation />}
    </>
  )
}

export default Header
