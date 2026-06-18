'use client'

// Next Imports
import { usePathname } from 'next/navigation'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'

// Data Imports
import headerMenuData from '@/data/navigation/headerMenuData'

// Util Imports
import { isNavActive } from '@/lib/navigation/isNavActive'

const navItems = headerMenuData()

const PrimaryNavLinks = () => {
  const pathname = usePathname()

  return (
    <nav className='header-tab-nav flex items-stretch gap-0 min-is-0 flex-1 overflow-x-auto'>
      {navItems.map(item => {
        const isActive = isNavActive(pathname, item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={classnames(
              'header-tab-link flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors shrink-0',
              isActive ? 'header-tab-link-active' : 'header-tab-link-idle'
            )}
          >
            <i className={classnames(item.icon, 'text-lg')} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default PrimaryNavLinks
